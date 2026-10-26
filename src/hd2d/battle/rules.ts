import type { Battler, DataView } from '../../core/battle/contract';
import { gen3Damage } from '../../core/battle/damage';
import { SPECIAL_TYPES, type MoveDef, type TypeName } from '../../core/defs';
import { stageMultiplier } from '../../core/stats';
import type { Rng } from '../../core/rng';

/**
 * Squad grid combat — [PROPOSAL] (Mark, 2026-10-26: "a 5x5 on each side battle
 * area… the player can play from 1–3 Ohms… shared abilities and teachable
 * abilities but also special abilities in combat that influence the combat").
 *
 * A 10×5 field of panels: columns 0–4 are the player's 5×5, 5–9 the foe's.
 * Up to three Ohms a side, each on its own panel, moving in real time. You
 * steer one and swap between them; the others fight on their own. Moves fire
 * with a PATTERN (which panels they hit) and a COOLDOWN (from their power).
 * Every Ohm also has one SPECIAL that changes the field itself (scorched,
 * iced, cracked, live panels, a barrier, a push…). Damage is the unchanged
 * Gen 3 formula on the canon stats and type chart.
 */

export const COLS = 10;
export const ROWS = 5;
/** Columns per side. */
export const HALF = 5;
export type Side = 'player' | 'foe';
export interface Cell { col: number; row: number }

export const sideOf = (c: Cell): Side => (c.col < HALF ? 'player' : 'foe');
export const onGrid = (c: Cell): boolean => c.col >= 0 && c.col < COLS && c.row >= 0 && c.row < ROWS;
export const canStand = (side: Side, c: Cell): boolean => onGrid(c) && sideOf(c) === side;
/** The column of `side` that faces the enemy. */
export const frontCol = (side: Side): number => (side === 'player' ? HALF - 1 : HALF);

/** How a move reaches the other side. */
export type Pattern =
  | 'shot' // a bolt down your row: hits the first thing in it
  | 'dash' // you lunge down your row and strike the first Ohm in it
  | 'melee' // the panel right in front of you (from your front column)
  | 'wide' // a wave: three rows of the enemy's front column, centred on yours
  | 'row' // a surge: every panel of their side in your row
  | 'lob' // arcs onto the panel you're aiming at
  | 'cross' // lands on the aimed panel and splashes a plus
  | 'self'; // no attack: buffs or heals the user

/** [PROPOSAL] signature moves get their own shape; everything else by type. */
const BY_MOVE: Record<string, Pattern> = {
  'chassis-bash': 'melee', bump: 'melee', pounce: 'dash', burnout: 'dash', 'run-down': 'dash',
  'mark-strike': 'lob', hobble: 'shot', 'heat-tick': 'cross', 'crumb-smog': 'wide', 'girder-swing': 'wide', 'anchor-drop': 'cross',
};
const BY_TYPE: Record<TypeName, Pattern> = {
  VOLT: 'shot', OPTIC: 'shot', UTILITY: 'shot',
  SIGNAL: 'lob', THERM: 'cross', VERDANT: 'cross',
  SONIC: 'wide', COOLANT: 'row',
  FRAME: 'melee', MOTOR: 'dash', BREAKER: 'lob',
};

export function patternOf(m: MoveDef): Pattern {
  if (m.power === 0 && (!m.effect || (m.effect.kind === 'statStage' && m.effect.target === 'self') || m.effect.kind === 'heal')) return 'self';
  return BY_MOVE[m.id] ?? BY_TYPE[m.type];
}

/** Seconds before a move can fire again: heavier moves recharge longer. */
export function cooldownOf(m: MoveDef): number {
  return m.power === 0 ? 2.6 : 0.6 + m.power / 55;
}

/**
 * The panels a move covers. `from` is the user's panel; `aim` is the panel it
 * is aimed at (aimed patterns land there). `blocks` answers whether something
 * stands in a panel and stops a lane (an Ohm, a barrier).
 */
export function coverage(p: Pattern, from: Cell, side: Side, blocks: (c: Cell) => boolean, aim?: Cell): Cell[] {
  const fwd = side === 'player' ? 1 : -1;
  const lane = (r: number): Cell[] => {
    const out: Cell[] = [];
    for (let c = from.col + fwd; c >= 0 && c < COLS; c += fwd) out.push({ col: c, row: r });
    return out.filter((c) => sideOf(c) !== side);
  };
  const enemyFront = frontCol(side === 'player' ? 'foe' : 'player');
  const theirs = (c: Cell): boolean => onGrid(c) && sideOf(c) !== side;
  const plus = (c: Cell): Cell[] => [c, { col: c.col + 1, row: c.row }, { col: c.col - 1, row: c.row }, { col: c.col, row: c.row + 1 }, { col: c.col, row: c.row - 1 }].filter(theirs);
  const ahead = (n: number): Cell => ({ col: from.col + n * fwd, row: from.row });
  switch (p) {
    case 'shot':
    case 'dash': {
      const l = lane(from.row);
      const hit = l.find(blocks);
      return hit ? [hit] : l; // a miss still streaks the whole lane
    }
    case 'melee': {
      const c = ahead(1);
      return theirs(c) ? [c] : [];
    }
    case 'wide':
      return [from.row - 1, from.row, from.row + 1].filter((r) => r >= 0 && r < ROWS).map((row) => ({ col: enemyFront, row }));
    case 'row':
      return lane(from.row);
    case 'lob': {
      const c = aim ?? ahead(HALF);
      return theirs(c) ? [c] : [];
    }
    case 'cross':
      return plus(aim ?? ahead(HALF));
    case 'self':
      return [];
  }
}

/** Gen 3 damage for one landed hit (crit 1/16, 85–100 roll, STAB, chart, stages). */
export function hitDamage(user: Battler, target: Battler, m: MoveDef, data: DataView, rng: Rng, forceCrit = false): { amount: number; effectiveness: number; crit: boolean } {
  const userType = data.species(user.speciesNum).type;
  const targetType = data.species(target.speciesNum).type;
  const physical = !SPECIAL_TYPES.has(m.type);
  const atk = Math.floor((physical ? user.stats.output : user.stats.surge) * stageMultiplier(physical ? user.stages.output : user.stages.surge));
  const def = Math.floor((physical ? target.stats.armor : target.stats.shielding) * stageMultiplier(physical ? target.stages.armor : target.stages.shielding));
  const effectiveness = data.chart[m.type]?.[targetType] ?? 1;
  const crit = forceCrit || rng.int(1, 16) === 1;
  let amount = gen3Damage({
    level: user.level, power: m.power, atk, def, physical,
    attackerOverheated: user.status === 'OVERHEAT', crit, stab: userType === m.type, effectiveness, rand: rng.int(85, 100),
  });
  if (m.effect?.kind === 'noKO') amount = Math.min(amount, Math.max(0, target.integrity - 1));
  return { amount, effectiveness, crit };
}

/** Accuracy check — on the grid, dodging is your evasion, so only <100 moves can whiff. */
export function landsRoll(m: MoveDef, rng: Rng): boolean {
  return m.accuracy === 0 || rng.int(1, 100) <= m.accuracy;
}

// ------------------------------------------------------- the three kinds of ability

/**
 * Where a move in an Ohm's kit comes from [PROPOSAL]:
 * - shared: a move many Ohms learn (Bump, Brace, each type's family of moves)
 * - own: learned by only this line (its signature moves)
 * - taught: not in its learnset at all, so it came from a mod chip
 */
export type MoveOrigin = 'shared' | 'own' | 'taught';

let learnCounts: Map<string, number> | null = null;
export function moveOrigin(speciesNum: number, moveId: string, data: DataView, everySpecies: ReadonlyArray<{ learnset: ReadonlyArray<{ move: string }> }>): MoveOrigin {
  if (!learnCounts) {
    learnCounts = new Map();
    for (const s of everySpecies) for (const e of s.learnset) learnCounts.set(e.move, (learnCounts.get(e.move) ?? 0) + 1);
  }
  if (!data.species(speciesNum).learnset.some((e) => e.move === moveId)) return 'taught';
  return (learnCounts.get(moveId) ?? 0) >= 4 ? 'shared' : 'own';
}

/** Mod chips: moves any Ohm can be taught [PROPOSAL] — Patch-Up (no Ohm learns it), plus each type's opener. */
export const MOD_CHIPS = ['patch-up', 'static-jab', 'heat-tick', 'drip-shot', 'glint', 'chirp', 'ping', 'chip-away', 'thorn-flick', 'bump-start', 'chassis-bash'] as const;

/** Teach a mod chip: it takes the last slot (or a free one). */
export function teach(b: Battler, moveId: string, data: DataView): void {
  if (b.moves.some((m) => m.id === moveId)) return;
  const def = data.move(moveId);
  const slot = { id: moveId, pp: def.pp, maxPp: def.pp };
  if (b.moves.length < 4) b.moves.push(slot); else b.moves[3] = slot;
}

// ------------------------------------------------------------- specials

/** What a special does to the fight. */
export type SpecialKind = 'scorch' | 'frost' | 'livewire' | 'bulwark' | 'faultline' | 'ram' | 'gust' | 'lockon' | 'flare' | 'shockwave' | 'overgrowth';

export interface SpecialDef { name: string; kind: SpecialKind; desc: string; cooldown: number }

/** One special per Ohm [PROPOSAL]: by type, with signatures for the starters. */
const SPECIAL_BY_TYPE: Record<TypeName, SpecialDef> = {
  THERM: { name: 'Scorch', kind: 'scorch', desc: 'Sets three panels of their column burning', cooldown: 10 },
  COOLANT: { name: 'Frost Line', kind: 'frost', desc: 'Ices their row: they move slow', cooldown: 10 },
  VOLT: { name: 'Live Wire', kind: 'livewire', desc: 'Electrifies panels: standing there shorts them', cooldown: 10 },
  FRAME: { name: 'Bulwark', kind: 'bulwark', desc: 'Raises a barrier across your row', cooldown: 11 },
  BREAKER: { name: 'Fault Line', kind: 'faultline', desc: 'Cracks their column: panels give way', cooldown: 11 },
  MOTOR: { name: 'Ram', kind: 'ram', desc: 'Charges down the row and knocks them back', cooldown: 9 },
  UTILITY: { name: 'Gust', kind: 'gust', desc: 'Blows everything in your row back a panel', cooldown: 9 },
  SIGNAL: { name: 'Lock-On', kind: 'lockon', desc: 'Marks a foe: every hit on it is critical', cooldown: 11 },
  OPTIC: { name: 'Flare', kind: 'flare', desc: 'Blinds their column: attacks go wide', cooldown: 10 },
  SONIC: { name: 'Shockwave', kind: 'shockwave', desc: 'Stuns their column, cancelling wind-ups', cooldown: 11 },
  VERDANT: { name: 'Overgrowth', kind: 'overgrowth', desc: 'Grows your panels: allies on them heal', cooldown: 12 },
};
const SPECIAL_BY_SPECIES: Record<number, SpecialDef> = {
  1: { name: 'Kickstart', kind: 'ram', desc: 'Scootlet tears down the row and knocks them back', cooldown: 8 },
  4: { name: 'Spotter', kind: 'lockon', desc: 'Dronelet marks a foe: every hit on it is critical', cooldown: 10 },
  7: { name: 'Guard Dog', kind: 'bulwark', desc: 'Scraplet throws up a barrier and draws their fire', cooldown: 10 },
};
export function specialOf(speciesNum: number, type: TypeName): SpecialDef {
  return SPECIAL_BY_SPECIES[speciesNum] ?? SPECIAL_BY_TYPE[type];
}

/** What a panel can become. */
export type PanelState = 'normal' | 'cracked' | 'broken' | 'scorched' | 'iced' | 'charged' | 'grown';
