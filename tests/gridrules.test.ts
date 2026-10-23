import { describe, expect, it } from 'vitest';
import { coverage, cooldownOf, patternOf, hitDamage, canStand, type Cell } from '../src/hd2d/battle/rules';
import { GAME_DATA } from '../src/data/dataview';
import { makeBattler } from '../src/core/battle/engine';
import { Rng } from '../src/core/rng';

const none = (): boolean => false;
const at = (col: number, row: number): Cell => ({ col, row });

describe('grid rules [PROPOSAL]', () => {
  it('keeps each side on its own three columns', () => {
    expect(canStand('player', at(2, 1))).toBe(true);
    expect(canStand('player', at(3, 1))).toBe(false);
    expect(canStand('foe', at(3, 0))).toBe(true);
    expect(canStand('foe', at(6, 0))).toBe(false);
  });

  it('shot hits the first Ohm down the row, else streaks the lane', () => {
    const foeAt = (c: Cell): boolean => c.col === 4 && c.row === 1;
    expect(coverage('shot', at(1, 1), 'player', foeAt)).toEqual([at(4, 1)]);
    expect(coverage('shot', at(1, 0), 'player', foeAt)).toEqual([at(3, 0), at(4, 0), at(5, 0)]);
  });

  it('melee reaches only the panel in front — from the front column', () => {
    expect(coverage('melee', at(2, 2), 'player', none)).toEqual([at(3, 2)]);
    expect(coverage('melee', at(1, 2), 'player', none)).toEqual([]);
  });

  it('wide covers the enemy front column; cross splashes a plus on the aimed panel', () => {
    expect(coverage('wide', at(0, 0), 'player', none)).toEqual([at(3, 0), at(3, 1), at(3, 2)]);
    const c = coverage('cross', at(4, 1), 'foe', none, at(1, 1));
    expect(c).toHaveLength(5);
    expect(c.every((x) => x.col < 3)).toBe(true);
  });

  it('foe patterns face the other way', () => {
    expect(coverage('melee', at(3, 0), 'foe', none)).toEqual([at(2, 0)]);
    expect(coverage('row', at(4, 2), 'foe', none)).toEqual([at(2, 2), at(1, 2), at(0, 2)]);
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
    toast.integrity = 2;
    expect(hitDamage(dog, toast, GAME_DATA.move('hobble'), GAME_DATA, new Rng(2)).amount).toBeLessThanOrEqual(1);
  });
});
