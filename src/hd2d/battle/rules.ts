import type { Battler, DataView } from '../../core/battle/contract';
import { gen3Damage } from '../../core/battle/damage';
import { SPECIAL_TYPES, type MoveDef, type TypeName } from '../../core/defs';
import { stageMultiplier } from '../../core/stats';
import type { Rng } from '../../core/rng';

/**
 * Grid combat rules — [PROPOSAL], pending Mark's rules pass (the direction
 * doc leaves "grid size, movement, how Ohm attacks map to grid patterns" open).
 *
 * A 6×3 field of panels: columns 0–2 are the player's side, 3–5 the foe's.
 * Each Ohm stands on one panel of its own side and moves freely in real time.
 * Moves are fired, not picked from a menu: each has a PATTERN (which panels it
 * hits) and a COOLDOWN (from its power). Damage is the unchanged Gen 3 formula
 * on the canon stats and type chart, so the battle core stays the source of
 * truth for numbers; the grid decides only whether a hit lands.
 */

export const COLS = 6;
export const ROWS = 3;
export type Side = 'player' | 'foe';
export interface Cell { col: number; row: number }

export const sideOf = (c: Cell): Side => (c.col < 3 ? 'player' : 'foe');
export const onGrid = (c: Cell): boolean => c.col >= 0 && c.col < COLS && c.row >= 0 && c.row < ROWS;
export const canStand = (side: Side, c: Cell): boolean => onGrid(c) && sideOf(c) === side;

/** How a move reaches the other side. */
export type Pattern =
  | 'shot' // a bolt down your row: hits the first Ohm in it
  | 'dash' // you lunge down your row and strike the first Ohm in it
  | 'melee' // the one panel right in front of you
  | 'wide' // a wave: the whole column at the near edge of their side
  | 'row' // a surge: every panel of their side in your row
  | 'lob' // arcs three panels ahead in your row
  | 'cross' // lands three ahead (or on the aimed panel) and splashes a plus
  | 'self'; // no attack: buffs the user

/** [PROPOSAL] signature moves get their own shape; everything else by type. */
const BY_MOVE: Record<string, Pattern> = {
  'chassis-bash': 'melee',
  bump: 'melee',
  pounce: 'dash',
  burnout: 'dash',
  'run-down': 'dash',
  'mark-strike': 'lob',
  hobble: 'shot',
  'heat-tick': 'cross',
  'crumb-smog': 'wide',
  'girder-swing': 'wide',
  'anchor-drop': 'cross',
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
 * The panels a move covers. `from` is the user's panel; `aim` (foe AI) is the
 * panel it is aiming at — aimed patterns land there instead of a fixed range.
 * `occupied` answers whether an enemy Ohm stands on a panel (for first-hit shapes).
 */
export function coverage(p: Pattern, from: Cell, side: Side, occupied: (c: Cell) => boolean, aim?: Cell): Cell[] {
  const fwd = side === 'player' ? 1 : -1;
  const row = (r: number): Cell[] => {
    const out: Cell[] = [];
    for (let c = from.col + fwd; c >= 0 && c < COLS; c += fwd) out.push({ col: c, row: r });
    return out.filter((c) => sideOf(c) !== side);
  };
  const near = side === 'player' ? 3 : 2; // the enemy's front column
  const plus = (c: Cell): Cell[] => [c, { col: c.col + 1, row: c.row }, { col: c.col - 1, row: c.row }, { col: c.col, row: c.row + 1 }, { col: c.col, row: c.row - 1 }]
    .filter((x) => onGrid(x) && sideOf(x) !== side);
  switch (p) {
    case 'shot':
    case 'dash': {
      const lane = row(from.row);
      const hit = lane.find(occupied);
      return hit ? [hit] : lane; // a miss still streaks the whole lane
    }
    case 'melee': {
      const c = { col: from.col + fwd, row: from.row };
      return onGrid(c) && sideOf(c) !== side ? [c] : [];
    }
    case 'wide':
      return [0, 1, 2].map((r) => ({ col: near, row: r }));
    case 'row':
      return row(from.row);
    case 'lob': {
      const c = aim ?? { col: from.col + 3 * fwd, row: from.row };
      return onGrid(c) && sideOf(c) !== side ? [c] : [];
    }
    case 'cross':
      return plus(aim ?? { col: from.col + 3 * fwd, row: from.row });
    case 'self':
      return [];
  }
}

/** Gen 3 damage for one landed hit (crit 1/16, 85–100 roll, STAB, chart, stages). */
export function hitDamage(user: Battler, target: Battler, m: MoveDef, data: DataView, rng: Rng): { amount: number; effectiveness: number; crit: boolean } {
  const userType = data.species(user.speciesNum).type;
  const targetType = data.species(target.speciesNum).type;
  const physical = !SPECIAL_TYPES.has(m.type);
  const atk = Math.floor((physical ? user.stats.output : user.stats.surge) * stageMultiplier(physical ? user.stages.output : user.stages.surge));
  const def = Math.floor((physical ? target.stats.armor : target.stats.shielding) * stageMultiplier(physical ? target.stages.armor : target.stages.shielding));
  const effectiveness = data.chart[m.type]?.[targetType] ?? 1;
  const crit = rng.int(1, 16) === 1;
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
