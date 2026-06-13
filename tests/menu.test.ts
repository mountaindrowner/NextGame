import { describe, expect, it } from 'vitest';
import { xpForLevel, xpProgress } from '../src/core/stats';
import { GAME_DATA } from '../src/data/dataview';

describe('xpProgress (party screen)', () => {
  it('is zero-span at the cap', () => {
    expect(xpProgress('medium-fast', 100, 1_000_000)).toEqual({ into: 0, span: 0 });
  });

  it('reports XP earned into the current level and the level span', () => {
    const growth = GAME_DATA.species(1).growth; // medium-slow
    const floor = xpForLevel(growth, 16);
    const ceil = xpForLevel(growth, 17);
    const p = xpProgress(growth, 16, floor + 5);
    expect(p.into).toBe(5);
    expect(p.span).toBe(ceil - floor);
    expect(p.into).toBeLessThanOrEqual(p.span);
  });

  it('clamps under-floor XP to zero into', () => {
    expect(xpProgress('fast', 10, 0).into).toBe(0);
  });
});
