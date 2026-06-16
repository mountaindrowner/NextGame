import { describe, expect, it } from 'vitest';
import { makeBattler } from '../src/core/battle/engine';
import { applyItemToBattler } from '../src/core/items';
import { ITEMS_BY_ID } from '../src/data/items';
import { GAME_DATA } from '../src/data/dataview';

const mk = (num = 1, level = 20) => makeBattler(GAME_DATA.species(num), level, GAME_DATA);
const item = (id: string) => ITEMS_BY_ID.get(id)!;

describe('item use (out of battle)', () => {
  it('a Repair Kit restores its INTEGRITY and no more', () => {
    const b = mk();
    b.integrity = 1;
    const res = applyItemToBattler(item('repair-kit'), b);
    expect(res.ok).toBe(true);
    expect(b.integrity).toBe(Math.min(b.stats.integrity, 21));
  });

  it('a Full Repair tops an Ohm off', () => {
    const b = mk();
    b.integrity = 3;
    expect(applyItemToBattler(item('full-repair'), b).ok).toBe(true);
    expect(b.integrity).toBe(b.stats.integrity);
  });

  it('a heal is a no-op at full INTEGRITY or when offline', () => {
    const full = mk();
    expect(applyItemToBattler(item('repair-kit'), full).ok).toBe(false);
    const down = mk();
    down.integrity = 0;
    expect(applyItemToBattler(item('repair-kit'), down).ok).toBe(false);
    expect(down.integrity).toBe(0);
  });

  it('a D-FIB only revives a downed Ohm, to half', () => {
    const up = mk();
    expect(applyItemToBattler(item('d-fib'), up).ok).toBe(false);
    const down = mk();
    down.integrity = 0;
    expect(applyItemToBattler(item('d-fib'), down).ok).toBe(true);
    expect(down.integrity).toBe(Math.max(1, Math.floor(down.stats.integrity / 2)));
  });

  it('a cure clears only its matching status', () => {
    const b = mk();
    b.status = 'SHORT';
    b.statusTurns = 3;
    expect(applyItemToBattler(item('coolant-flush'), b).ok).toBe(false); // cures OVERHEAT
    expect(b.status).toBe('SHORT');
    expect(applyItemToBattler(item('surge-tape'), b).ok).toBe(true); // cures SHORT
    expect(b.status).toBeUndefined();
  });

  it('non-target items report no effect here', () => {
    expect(applyItemToBattler(item('storage-node'), mk()).ok).toBe(false);
    expect(applyItemToBattler(item('resonance-core'), mk()).ok).toBe(false);
  });
});
