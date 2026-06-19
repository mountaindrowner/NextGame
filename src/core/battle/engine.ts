import { MAJOR_STATUSES, SPECIAL_TYPES, type BattleStatKey, type MoveDef, type PassiveId, type SpeciesDef, type StatusName } from '../defs';
import { Rng } from '../rng';
import { accuracyMultiplier, computeStats, levelForXp, stageMultiplier, xpForLevel, type Plating } from '../stats';
import { puzzleBudget } from '../capture';
import { gen3Damage } from './damage';
import type { BattleAction, BattleEvent, BattlePhase, BattleSetup, Battler, DataView, Side } from './contract';

const STATUS_IMMUNITY: Partial<Record<PassiveId, StatusName>> = {
  'heat-sink': 'OVERHEAT',
  grounded: 'SHORT',
  insulated: 'LOCKED',
  'firmware-lock': 'GLITCHED',
  loudspeaker: 'STANDBY',
  firewall: 'CORRUPTED',
};

const STAGE_GUARD: Partial<Record<PassiveId, BattleStatKey>> = {
  backlit: 'accuracy',
  momentum: 'clock',
  'heavy-duty': 'output',
  'scrap-tough': 'armor',
};

export function makeBattler(
  species: SpeciesDef,
  level: number,
  data: DataView,
  opts: { name?: string; plating?: Plating; expansionBoard?: boolean; extraMove?: string } = {},
): Battler {
  const stats = computeStats(species, level, opts);
  const learned = species.learnset.filter((e) => e.level <= level).map((e) => e.move);
  const picked = [...new Set(opts.extraMove ? [opts.extraMove, ...learned.reverse()] : learned.reverse())]
    .slice(0, 4)
    .reverse();
  return {
    speciesNum: species.num,
    name: opts.name ?? species.name,
    level,
    xp: xpForLevel(species.growth, level),
    stats,
    integrity: stats.integrity,
    moves: picked.map((id) => {
      const def = data.move(id);
      return { id, pp: def.pp, maxPp: def.pp };
    }),
    statusTurns: 0,
    glitchedTurns: 0,
    stages: { integrity: 0, output: 0, armor: 0, surge: 0, shielding: 0, clock: 0, accuracy: 0, evasion: 0 },
    rage: 0,
    ...(opts.plating ? { plating: opts.plating } : {}),
    ...(opts.expansionBoard ? { expansionBoard: true } : {}),
  };
}

export class Battle {
  phase: BattlePhase = 'choosing';
  private rng: Rng;
  private playerIndex = 0;
  private foeIndex = 0;
  private fleeAttempts = 0;
  private participants = new Set<number>();

  constructor(
    public readonly setup: BattleSetup,
    private readonly data: DataView,
  ) {
    this.rng = new Rng(setup.seed);
    this.participants.add(0);
  }

  get active(): Battler {
    const b = this.setup.party[this.playerIndex];
    if (!b) throw new Error('no active battler');
    return b;
  }

  get foe(): Battler {
    const b = this.setup.foes[this.foeIndex];
    if (!b) throw new Error('no active foe');
    return b;
  }

  get partyAlive(): boolean {
    return this.setup.party.some((b) => b.integrity > 0);
  }

  intro(): BattleEvent[] {
    const ev: BattleEvent[] = [];
    if (this.setup.kind === 'wild') {
      ev.push({ type: 'message', text: `A wild ${this.foe.name} crackles with static!` });
    } else {
      ev.push({ type: 'message', text: `${this.setup.foeName ?? 'Raider'} wants to battle!` });
      ev.push(this.switchInEvent('foe', this.foe));
    }
    ev.push({ type: 'message', text: `Go, ${this.active.name}!` });
    ev.push(this.switchInEvent('player', this.active));
    return ev;
  }

  submit(action: BattleAction): BattleEvent[] {
    if (this.phase !== 'choosing') return [];
    const ev: BattleEvent[] = [];
    const mustSwitch = this.active.integrity <= 0;
    if (mustSwitch && action.type !== 'switch') return [{ type: 'message', text: 'Send out which Ohm?' }];

    switch (action.type) {
      case 'run': {
        if (this.setup.kind === 'trainer') {
          ev.push({ type: 'message', text: "Can't back out of a Raider battle!" });
          return ev;
        }
        this.fleeAttempts += 1;
        const a = this.effectiveStat(this.active, 'clock');
        const b = Math.max(1, this.effectiveStat(this.foe, 'clock'));
        const f = ((a * 128) / b + 30 * this.fleeAttempts) % 256;
        if (this.rng.int(0, 255) < f) {
          ev.push({ type: 'fled', ok: true }, { type: 'end', outcome: 'fled' });
          this.phase = 'done';
          return ev;
        }
        ev.push({ type: 'fled', ok: false }, { type: 'message', text: "Couldn't disengage!" });
        ev.push(...this.foeTurn());
        break;
      }
      case 'switch': {
        const target = this.setup.party[action.index];
        if (!target || target.integrity <= 0 || action.index === this.playerIndex) {
          return [{ type: 'message', text: "Can't send that one out." }];
        }
        this.playerIndex = action.index;
        this.participants.add(action.index);
        this.resetVolatile(target);
        ev.push({ type: 'message', text: `${this.active.name}, clear the air!` });
        ev.push(this.switchInEvent('player', this.active));
        if (!mustSwitch) ev.push(...this.foeTurn()); // switching costs the turn
        break;
      }
      case 'item': {
        ev.push(...this.useItem(action.itemId, action.targetIndex));
        ev.push(...this.foeTurn());
        break;
      }
      case 'capture': {
        if (this.setup.kind === 'trainer') {
          return [{ type: 'message', text: "You can't recalibrate a Raider's Ohm!" }];
        }
        const species = this.data.species(this.foe.speciesNum);
        const budget = puzzleBudget(species, this.foe.stats.integrity, this.foe.integrity, this.foe.status);
        this.phase = 'capturePuzzle';
        ev.push({ type: 'message', text: 'Node deployed. Clearing the static…' });
        ev.push({ type: 'captureBudget', timerSeconds: budget.timerSeconds, gridSize: budget.gridSize, decoys: budget.decoys });
        break;
      }
      case 'move': {
        ev.push(...this.exchangeMoves(action.index));
        break;
      }
    }
    ev.push(...this.checkEnd());
    return ev;
  }

  /** Scene reports the node-puzzle outcome. */
  resolveCapture(success: boolean): BattleEvent[] {
    if (this.phase !== 'capturePuzzle') return [];
    this.phase = 'choosing';
    const ev: BattleEvent[] = [];
    if (success) {
      ev.push({ type: 'captureSuccess', speciesNum: this.foe.speciesNum, name: this.foe.name });
      ev.push({ type: 'message', text: `${this.foe.name} recalibrated! The static clears.` });
      ev.push({ type: 'end', outcome: 'captured' });
      this.phase = 'done';
      return ev;
    }
    this.foe.rage += 1;
    ev.push({ type: 'captureFail', rage: this.foe.rage });
    ev.push({ type: 'message', text: `${this.foe.name} rages against the hack!` });
    ev.push(...this.applyStageChange('foe', this.foe, 'output', 1));
    if (this.foe.rage >= 3 || this.rng.chance(this.foe.rage * 35)) {
      ev.push({ type: 'rageFlee' }, { type: 'message', text: `${this.foe.name} tore away into the ruins!` });
      ev.push({ type: 'end', outcome: 'foeFled' });
      this.phase = 'done';
      return ev;
    }
    ev.push(...this.foeTurn());
    ev.push(...this.checkEnd());
    return ev;
  }

  // ----- turn internals -------------------------------------------------

  private exchangeMoves(playerMoveIndex: number): BattleEvent[] {
    const ev: BattleEvent[] = [];
    const playerMove = this.moveFor(this.active, playerMoveIndex);
    const foeMove = this.pickFoeMove();
    const pPrio = playerMove?.priority ?? 0;
    const fPrio = foeMove?.priority ?? 0;
    const playerFirst =
      pPrio !== fPrio
        ? pPrio > fPrio
        : this.effectiveStat(this.active, 'clock') === this.effectiveStat(this.foe, 'clock')
          ? this.rng.chance(50)
          : this.effectiveStat(this.active, 'clock') > this.effectiveStat(this.foe, 'clock');

    const order: Array<['player' | 'foe', MoveDef | undefined, number]> = playerFirst
      ? [['player', playerMove, playerMoveIndex], ['foe', foeMove, -1]]
      : [['foe', foeMove, -1], ['player', playerMove, playerMoveIndex]];

    for (const [side, move, idx] of order) {
      const user = side === 'player' ? this.active : this.foe;
      const target = side === 'player' ? this.foe : this.active;
      if (user.integrity <= 0 || target.integrity <= 0) continue;
      ev.push(...this.performMove(side, user, target, move, idx));
    }
    ev.push(...this.endOfTurn());
    return ev;
  }

  private foeTurn(): BattleEvent[] {
    if (this.foe.integrity <= 0 || this.active.integrity <= 0 || this.phase === 'done') return [];
    const ev = this.performMove('foe', this.foe, this.active, this.pickFoeMove(), -1);
    ev.push(...this.endOfTurn());
    return ev;
  }

  private performMove(
    side: Side,
    user: Battler,
    target: Battler,
    move: MoveDef | undefined,
    moveIndex: number,
  ): BattleEvent[] {
    const ev: BattleEvent[] = [];
    if (!this.canAct(user, side, ev)) return ev;
    if (!move) {
      ev.push({ type: 'message', text: `${user.name} has no charge left for any move!` });
      move = this.data.move('bump');
    }
    if (side === 'player' && moveIndex >= 0) {
      const slot = user.moves[moveIndex];
      if (slot) slot.pp = Math.max(0, slot.pp - 1);
    } else if (side === 'foe') {
      const slot = user.moves.find((m) => m.id === move?.id);
      if (slot) slot.pp = Math.max(0, slot.pp - 1);
    }
    ev.push({ type: 'moveUsed', side, name: user.name, moveName: move.name });

    if (move.accuracy > 0) {
      const stage = user.stages.accuracy - target.stages.evasion;
      const chance = move.accuracy * accuracyMultiplier(stage);
      if (!this.rng.chance(Math.min(100, chance))) {
        ev.push({ type: 'message', text: `${user.name}'s attack missed!` });
        return ev;
      }
    }

    if (move.power > 0) {
      ev.push(...this.dealDamage(side, user, target, move));
      if (target.integrity <= 0) {
        ev.push(...this.handleFaint(side === 'player' ? 'foe' : 'player', target));
        return ev;
      }
    }

    const fx = move.effect;
    // noKO carries no secondary effect — its only job is the damage clamp above
    if (fx && fx.kind !== 'noKO' && (fx.kind === 'heal' || this.rng.chance(fx.chance))) {
      if (fx.kind === 'status') {
        ev.push(...this.applyStatus(side === 'player' ? 'foe' : 'player', target, fx.status));
      } else if (fx.kind === 'statStage') {
        const who = fx.target === 'self' ? user : target;
        const whoSide: Side = fx.target === 'self' ? side : side === 'player' ? 'foe' : 'player';
        ev.push(...this.applyStageChange(whoSide, who, fx.stat, fx.delta));
      } else if (fx.kind === 'heal') {
        const amount = Math.floor(user.stats.integrity * fx.fraction);
        const healed = Math.min(user.stats.integrity, user.integrity + amount);
        const gained = healed - user.integrity;
        user.integrity = healed;
        ev.push({ type: 'heal', side, amount: gained, integrity: user.integrity, max: user.stats.integrity });
      }
    }
    return ev;
  }

  /** Gen 3 damage pipeline (GDD §10.1: clone exactly; goldens pin this). */
  private dealDamage(side: Side, user: Battler, target: Battler, move: MoveDef): BattleEvent[] {
    const special = SPECIAL_TYPES.has(move.type);
    const atkKey = special ? 'surge' : 'output';
    const defKey = special ? 'shielding' : 'armor';
    const crit = this.rng.chance(100 / 20); // 5% (eased from Gen 3's 1/16 to reduce swinginess)
    const atk = this.effectiveStat(user, atkKey, crit ? 'ignore-negative' : undefined);
    const def = this.effectiveStat(target, defKey, crit ? 'ignore-positive' : undefined);

    const userSpecies = this.data.species(user.speciesNum);
    const targetSpecies = this.data.species(target.speciesNum);
    const eff = this.data.chart[move.type]?.[targetSpecies.type] ?? 1;
    const d = gen3Damage({
      level: user.level,
      power: move.power,
      atk,
      def,
      physical: !special,
      attackerOverheated: user.status === 'OVERHEAT',
      crit,
      stab: move.type === userSpecies.type,
      effectiveness: eff,
      rand: this.rng.int(85, 100),
    });

    // a noKO move (HOBBLE) chips a wild down but never downs it — for capture setup
    const floor = move.effect?.kind === 'noKO' && target.integrity > 0 ? 1 : 0;
    target.integrity = Math.max(floor, target.integrity - d);
    return [
      {
        type: 'damage',
        side: side === 'player' ? 'foe' : 'player',
        amount: d,
        integrity: target.integrity,
        max: target.stats.integrity,
        effectiveness: eff,
        crit,
      },
    ];
  }

  private canAct(user: Battler, side: Side, ev: BattleEvent[]): boolean {
    if (user.status === 'STANDBY') {
      user.statusTurns -= 1;
      if (user.statusTurns <= 0) {
        user.status = undefined;
        ev.push({ type: 'statusCleared', side, status: 'STANDBY' });
        ev.push({ type: 'message', text: `${user.name} powers back on!` });
      } else {
        ev.push({ type: 'message', text: `${user.name} is on STANDBY…` });
        return false;
      }
    }
    if (user.status === 'LOCKED') {
      if (this.rng.chance(20)) {
        user.status = undefined;
        ev.push({ type: 'statusCleared', side, status: 'LOCKED' });
        ev.push({ type: 'message', text: `${user.name} grinds back into motion!` });
      } else {
        ev.push({ type: 'message', text: `${user.name} is LOCKED solid!` });
        return false;
      }
    }
    if (user.glitchedTurns > 0) {
      user.glitchedTurns -= 1;
      if (user.glitchedTurns === 0) {
        ev.push({ type: 'statusCleared', side, status: 'GLITCHED' });
        ev.push({ type: 'message', text: `${user.name} cleared its own static!` });
      } else {
        ev.push({ type: 'message', text: `${user.name} is GLITCHED!` });
        if (this.rng.chance(50)) {
          const atk = this.effectiveStat(user, 'output');
          const def = this.effectiveStat(user, 'armor');
          let d = Math.floor((Math.floor((2 * user.level) / 5 + 2) * 40 * atk) / Math.max(1, def));
          d = Math.max(1, Math.floor(d / 50) + 2);
          user.integrity = Math.max(0, user.integrity - d);
          ev.push({ type: 'message', text: 'It thrashed its own chassis!' });
          ev.push({ type: 'damage', side, amount: d, integrity: user.integrity, max: user.stats.integrity, effectiveness: 1, crit: false });
          if (user.integrity <= 0) ev.push(...this.handleFaint(side, user));
          return false;
        }
      }
    }
    if (user.status === 'SHORT' && this.rng.chance(25)) {
      ev.push({ type: 'message', text: `${user.name} SHORTed out and can't move!` });
      return false;
    }
    return user.integrity > 0;
  }

  private endOfTurn(): BattleEvent[] {
    const ev: BattleEvent[] = [];
    for (const [side, b] of [['player', this.active], ['foe', this.foe]] as Array<[Side, Battler]>) {
      if (b.integrity <= 0 || this.phase === 'done') continue;
      if (b.status === 'OVERHEAT' || b.status === 'CORRUPTED') {
        const d = Math.max(1, Math.floor(b.stats.integrity / 8));
        b.integrity = Math.max(0, b.integrity - d);
        ev.push({ type: 'message', text: `${b.name} is hurt by ${b.status}!` });
        ev.push({ type: 'damage', side, amount: d, integrity: b.integrity, max: b.stats.integrity, effectiveness: 1, crit: false });
        if (b.integrity <= 0) {
          ev.push(...this.handleFaint(side, b));
          continue;
        }
      }
      if (this.data.species(b.speciesNum).passive === 'photosynth' && b.integrity < b.stats.integrity) {
        const h = Math.max(1, Math.floor(b.stats.integrity / 16));
        b.integrity = Math.min(b.stats.integrity, b.integrity + h);
        ev.push({ type: 'heal', side, amount: h, integrity: b.integrity, max: b.stats.integrity });
      }
    }
    return ev;
  }

  private applyStatus(side: Side, target: Battler, status: StatusName): BattleEvent[] {
    const species = this.data.species(target.speciesNum);
    if (STATUS_IMMUNITY[species.passive] === status) {
      return [{ type: 'message', text: `${target.name}'s ${species.passive} shrugs it off!` }];
    }
    if (status === 'GLITCHED') {
      if (target.glitchedTurns > 0) return [{ type: 'message', text: `${target.name} is already GLITCHED!` }];
      target.glitchedTurns = this.rng.int(2, 5);
      return [{ type: 'statusSet', side, status }];
    }
    if (target.status && MAJOR_STATUSES.includes(status)) {
      return [{ type: 'message', text: 'It already has a fault condition!' }]; // one major at a time
    }
    target.status = status;
    if (status === 'STANDBY') target.statusTurns = this.rng.int(1, 4);
    return [{ type: 'statusSet', side, status }];
  }

  private applyStageChange(side: Side, target: Battler, stat: BattleStatKey, delta: number): BattleEvent[] {
    const species = this.data.species(target.speciesNum);
    if (delta < 0 && STAGE_GUARD[species.passive] === stat) {
      return [{ type: 'message', text: `${target.name}'s ${species.passive} holds firm!` }];
    }
    const before = target.stages[stat];
    const after = Math.max(-6, Math.min(6, before + delta));
    if (after === before) return [{ type: 'message', text: 'Nothing more to change!' }];
    target.stages[stat] = after;
    return [{ type: 'stageChange', side, stat, delta: after - before }];
  }

  private useItem(itemId: string, targetIndex: number): BattleEvent[] {
    // Inventory ownership lives with the caller; the engine applies effects.
    const target = this.setup.party[targetIndex] ?? this.active;
    const heals: Record<string, number> = {
      'repair-kit': 20,
      'repair-kit-plus': 50,
      'repair-kit-max': 120,
      'full-repair': -1,
    };
    if (itemId in heals) {
      const amt = heals[itemId] === -1 ? target.stats.integrity : (heals[itemId] ?? 0);
      const healed = Math.min(target.stats.integrity, target.integrity + amt);
      const gained = healed - target.integrity;
      target.integrity = healed;
      return [
        { type: 'message', text: `Used the kit on ${target.name}.` },
        { type: 'heal', side: 'player', amount: gained, integrity: target.integrity, max: target.stats.integrity },
      ];
    }
    if (itemId === 'd-fib' && target.integrity <= 0) {
      target.integrity = Math.floor(target.stats.integrity / 2);
      return [
        { type: 'message', text: `D-FIB! ${target.name} jolts back online!` },
        { type: 'heal', side: 'player', amount: target.integrity, integrity: target.integrity, max: target.stats.integrity },
      ];
    }
    // status cures (hardcoded by id, like heals — the engine can't import data)
    const cures: Partial<Record<string, StatusName>> = {
      'coolant-flush': 'OVERHEAT',
      'surge-tape': 'SHORT',
      antivirus: 'CORRUPTED',
      'wake-signal': 'STANDBY',
      'thaw-coil': 'LOCKED',
    };
    const cure = cures[itemId];
    if (cure) {
      if (target.status !== cure) return [{ type: 'message', text: `It had no effect on ${target.name}.` }];
      target.status = undefined;
      target.statusTurns = 0;
      target.glitchedTurns = 0;
      return [{ type: 'message', text: `${target.name}'s ${cure} cleared.` }];
    }
    return [{ type: 'message', text: 'It had no effect.' }];
  }

  private handleFaint(side: Side, b: Battler): BattleEvent[] {
    const ev: BattleEvent[] = [{ type: 'faint', side, name: b.name }];
    if (side === 'foe') {
      ev.push(...this.awardXp(b));
      const next = this.setup.foes.findIndex((f) => f.integrity > 0);
      if (next >= 0 && this.setup.kind === 'trainer') {
        this.foeIndex = next;
        ev.push(this.switchInEvent('foe', this.foe));
      }
    }
    return ev;
  }

  private awardXp(downed: Battler): BattleEvent[] {
    const ev: BattleEvent[] = [];
    const species = this.data.species(downed.speciesNum);
    const yieldBase = Math.floor(
      (species.base.integrity + species.base.output + species.base.armor + species.base.surge + species.base.shielding + species.base.clock) / 3,
    );
    const gain = Math.max(1, Math.floor((yieldBase * downed.level) / 7));
    // party-wide XP share (GDD §10.7): the on-field earner takes a full share and
    // EVERY other party member — benched or downed — takes a half share, so the
    // lead keeps its pace while no teammate falls irrecoverably behind.
    const earner = this.active;
    const halfShare = Math.max(1, Math.floor(gain / 2));
    for (const member of this.setup.party) {
      const share = member === earner && member.integrity > 0 ? gain : halfShare;
      member.xp += share;
      ev.push({ type: 'xp', name: member.name, amount: share });
      const ms = this.data.species(member.speciesNum);
      let newLevel = levelForXp(ms.growth, member.xp);
      newLevel = Math.min(100, newLevel);
      const build = { plating: member.plating, expansionBoard: member.expansionBoard };
      while (member.level < newLevel) {
        member.level += 1;
        const grown = computeStats(ms, member.level, build);
        const gainedIntegrity = grown.integrity - member.stats.integrity;
        member.stats = grown;
        // a downed member levels but stays down — leveling never revives it
        member.integrity = member.integrity > 0 ? Math.min(grown.integrity, member.integrity + Math.max(0, gainedIntegrity)) : 0;
        ev.push({ type: 'levelUp', name: member.name, level: member.level });
        for (const entry of ms.learnset.filter((l) => l.level === member.level)) {
          if (member.moves.length < 4 && !member.moves.some((m) => m.id === entry.move)) {
            const def = this.data.move(entry.move);
            member.moves.push({ id: entry.move, pp: def.pp, maxPp: def.pp });
            ev.push({ type: 'moveLearned', name: member.name, moveName: def.name });
          }
        }
      }
    }
    return ev;
  }

  private checkEnd(): BattleEvent[] {
    if (this.phase === 'done') return [];
    if (!this.partyAlive) {
      this.phase = 'done';
      return [
        { type: 'message', text: 'Your squad is fully drained…' },
        { type: 'end', outcome: 'defeat' },
      ];
    }
    if (this.setup.foes.every((f) => f.integrity <= 0)) {
      this.phase = 'done';
      return [{ type: 'end', outcome: 'victory' }];
    }
    return [];
  }

  private pickFoeMove(): MoveDef | undefined {
    const usable = this.foe.moves.filter((m) => m.pp > 0);
    if (usable.length === 0) return undefined;
    const pick = usable[this.rng.int(0, usable.length - 1)];
    return pick ? this.data.move(pick.id) : undefined;
  }

  private moveFor(b: Battler, index: number): MoveDef | undefined {
    const slot = b.moves[index];
    if (!slot || slot.pp <= 0) return undefined;
    return this.data.move(slot.id);
  }

  private effectiveStat(
    b: Battler,
    key: 'output' | 'armor' | 'surge' | 'shielding' | 'clock',
    critRule?: 'ignore-negative' | 'ignore-positive',
  ): number {
    let stage = b.stages[key];
    if (critRule === 'ignore-negative' && stage < 0) stage = 0; // Gen 3 crit rule
    if (critRule === 'ignore-positive' && stage > 0) stage = 0;
    let value = Math.floor(b.stats[key] * stageMultiplier(stage));
    if (key === 'clock' && b.status === 'SHORT') value = Math.floor(value / 4);
    return Math.max(1, value);
  }

  private resetVolatile(b: Battler): void {
    b.glitchedTurns = 0;
    b.stages = { integrity: 0, output: 0, armor: 0, surge: 0, shielding: 0, clock: 0, accuracy: 0, evasion: 0 };
  }

  private switchInEvent(side: Side, b: Battler): BattleEvent {
    return {
      type: 'switchIn',
      side,
      name: b.name,
      speciesNum: b.speciesNum,
      level: b.level,
      integrity: b.integrity,
      max: b.stats.integrity,
    };
  }
}
