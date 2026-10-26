import { describe, expect, it } from 'vitest';
import { coverage, cooldownOf, patternOf, hitDamage, canStand, moveOrigin, teach, specialOf, MOD_CHIPS, COLS, ROWS, HALF, clockOf, turnOrder, cooldownTurns, specialTurns, statusGate, statusChip, inflict, type Cell } from '../src/hd2d/battle/rules';
import { GAME_DATA } from '../src/data/dataview';
import { SPECIES } from '../src/data/species';
import { makeBattler } from '../src/core/battle/engine';
import { Rng } from '../src/core/rng';

const none = (): boolean => false;
const at = (col: number, row: number): Cell => ({ col, row });

describe('squad grid rules [PROPOSAL]', () => {
  it('is a 5×5 per side', () => {
    expect([COLS, ROWS, HALF]).toEqual([10, 5, 5]);
  });

  it('keeps each side on its own five columns', () => {
    expect(canStand('player', at(4, 4))).toBe(true);
    expect(canStand('player', at(5, 1))).toBe(false);
    expect(canStand('foe', at(5, 0))).toBe(true);
    expect(canStand('foe', at(4, 0))).toBe(false);
    expect(canStand('foe', at(9, 5))).toBe(false);
  });

  it('shot hits the first Ohm down the row, else streaks the lane', () => {
    const foeAt = (c: Cell): boolean => c.col === 7 && c.row === 1;
    expect(coverage('shot', at(1, 1), 'player', foeAt)).toEqual([at(7, 1)]);
    expect(coverage('shot', at(1, 0), 'player', foeAt)).toEqual([at(5, 0), at(6, 0), at(7, 0), at(8, 0), at(9, 0)]);
  });

  it('melee reaches only the panel in front — from the front column', () => {
    expect(coverage('melee', at(4, 2), 'player', none)).toEqual([at(5, 2)]);
    expect(coverage('melee', at(2, 2), 'player', none)).toEqual([]);
  });

  it('wide covers the enemy front column; cross splashes a plus on the aimed panel', () => {
    expect(coverage('wide', at(0, 0), 'player', none)).toEqual([at(5, 0), at(5, 1)]);
    expect(coverage('wide', at(2, 2), 'player', none)).toEqual([at(5, 1), at(5, 2), at(5, 3)]);
    const c = coverage('cross', at(7, 2), 'foe', none, at(2, 2));
    expect(c).toHaveLength(5);
    expect(c.every((x) => x.col < HALF)).toBe(true);
  });

  it('foe patterns face the other way', () => {
    expect(coverage('melee', at(5, 0), 'foe', none)).toEqual([at(4, 0)]);
    expect(coverage('row', at(6, 2), 'foe', none)).toEqual([at(4, 2), at(3, 2), at(2, 2), at(1, 2), at(0, 2)]);
  });

  it('maps moves to patterns and heavier moves to longer cooldowns', () => {
    expect(patternOf(GAME_DATA.move('pounce'))).toBe('dash');
    expect(patternOf(GAME_DATA.move('chassis-bash'))).toBe('melee');
    expect(patternOf(GAME_DATA.move('brace'))).toBe('self');
    expect(cooldownOf(GAME_DATA.move('anchor-drop'))).toBeGreaterThan(cooldownOf(GAME_DATA.move('chassis-bash')));
  });

  it('damage is the Gen 3 formula, and HOBBLE never downs', () => {
    const dog = makeBattler(GAME_DATA.species(7), 5, GAME_DATA);
    const toast = makeBattler(GAME_DATA.species(10), 3, GAME_DATA);
    const hit = hitDamage(dog, toast, GAME_DATA.move('chassis-bash'), GAME_DATA, new Rng(1));
    expect(hit.amount).toBeGreaterThan(0);
    expect(hitDamage(dog, toast, GAME_DATA.move('chassis-bash'), GAME_DATA, new Rng(1), true).crit).toBe(true);
    toast.integrity = 2;
    expect(hitDamage(dog, toast, GAME_DATA.move('hobble'), GAME_DATA, new Rng(2)).amount).toBeLessThanOrEqual(1);
  });
});

describe('three kinds of ability [PROPOSAL]', () => {
  it('tells shared, own and taught moves apart', () => {
    const dog = makeBattler(GAME_DATA.species(7), 8, GAME_DATA);
    const origins = dog.moves.map((m) => moveOrigin(7, m.id, GAME_DATA, SPECIES));
    expect(origins.every((o) => o !== 'taught')).toBe(true);
    teach(dog, 'patch-up', GAME_DATA);
    expect(dog.moves.some((m) => m.id === 'patch-up')).toBe(true);
    expect(dog.moves.length).toBeLessThanOrEqual(4);
    expect(moveOrigin(7, 'patch-up', GAME_DATA, SPECIES)).toBe('taught');
  });

  it('every mod chip is a real move', () => {
    for (const id of MOD_CHIPS) expect(GAME_DATA.move(id).id).toBe(id);
  });

  it('every Ohm has a special; the starters have their own', () => {
    expect(specialOf(7, 'FRAME').name).toBe('Guard Dog');
    expect(specialOf(1, 'MOTOR').kind).toBe('ram');
    expect(specialOf(4, 'SIGNAL').kind).toBe('lockon');
    for (const s of SPECIES) expect(specialOf(s.num, s.type).cooldown).toBeGreaterThan(0);
  });
});

describe('turns by CLOCK [PROPOSAL]', () => {
  const mk = (num: number, lv: number) => makeBattler(GAME_DATA.species(num), lv, GAME_DATA);

  it('orders a round fastest first, your side winning ties', () => {
    const a = { id: 0, side: 'player' as const, b: mk(7, 10) };
    const b = { id: 1, side: 'foe' as const, b: mk(7, 10) };
    const c = { id: 2, side: 'foe' as const, b: mk(7, 10) };
    c.b.stats.clock += 50;
    expect(turnOrder([b, a, c]).map((x) => x.id)).toEqual([2, 0, 1]);
  });

  it('SHORT quarters CLOCK and stages scale it, as in the core', () => {
    const b = mk(1, 20);
    const base = clockOf(b);
    b.stages.clock = 2;
    expect(clockOf(b)).toBe(Math.floor(b.stats.clock * 2));
    b.stages.clock = 0;
    b.status = 'SHORT';
    expect(clockOf(b)).toBe(Math.max(1, Math.floor(base / 4)));
  });

  it('light moves every turn, heavy ones rest; specials charge over turns', () => {
    expect(cooldownTurns(GAME_DATA.move('chassis-bash'))).toBe(0);
    expect(cooldownTurns(GAME_DATA.move('anchor-drop'))).toBeGreaterThanOrEqual(1);
    expect(cooldownTurns(GAME_DATA.move('brace'))).toBe(1);
    expect(specialTurns(specialOf(7, 'FRAME'))).toBeGreaterThanOrEqual(2);
  });

  it('statuses follow the core: STANDBY sleeps, OVERHEAT chips 1/8, passives can be immune', () => {
    const b = mk(10, 10);
    const rng = new Rng(4);
    expect(inflict(b, 'STANDBY', GAME_DATA, rng)).toBe(true);
    const turns = b.statusTurns;
    let slept = 0;
    for (let i = 0; i < 6 && b.status === 'STANDBY'; i++) if (!statusGate(b, rng).acts) slept++;
    expect(slept).toBe(turns - 1);
    b.status = 'OVERHEAT';
    expect(statusChip(b)).toBe(Math.max(1, Math.floor(b.stats.integrity / 8)));
    expect(inflict(b, 'SHORT', GAME_DATA, rng)).toBe(false); // one major fault at a time
  });
});
