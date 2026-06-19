import { describe, expect, it } from 'vitest';
import { buyItem, sellItem, sellValue, rollSalvage, type Wallet } from '../src/core/shop';
import { Rng } from '../src/core/rng';
import { ITEMS_BY_ID } from '../src/data/items';
import { SHOP_STOCK } from '../src/data/shops';

const item = (id: string) => ITEMS_BY_ID.get(id)!;

describe('colony counter (GDD §10.8)', () => {
  it('buys when affordable and debits credits', () => {
    const w: Wallet = { bag: {}, credits: 1000 };
    const r = buyItem(w, item('repair-kit'), 2);
    expect(r.ok).toBe(true);
    expect(w.credits).toBe(1000 - 300 * 2);
    expect(w.bag['repair-kit']).toBe(2);
  });

  it('refuses a purchase you cannot afford', () => {
    const w: Wallet = { bag: {}, credits: 100 };
    const r = buyItem(w, item('d-fib'), 1);
    expect(r.ok).toBe(false);
    expect(w.credits).toBe(100);
    expect(w.bag['d-fib'] ?? 0).toBe(0);
  });

  it('sells salvage at full value and removes it from the bag', () => {
    const w: Wallet = { bag: { relic: 1, scrap: 3 }, credits: 0 };
    const r = sellItem(w, item('relic'), 1);
    expect(r.ok).toBe(true);
    expect(w.credits).toBe(650);
    expect(w.bag['relic']).toBe(0);
  });

  it('will not buy back ordinary stock (salvage is the only faucet)', () => {
    expect(sellValue(item('repair-kit'))).toBe(0);
    const w: Wallet = { bag: { 'repair-kit': 1 }, credits: 0 };
    const r = sellItem(w, item('repair-kit'), 1);
    expect(r.ok).toBe(false);
    expect(w.bag['repair-kit']).toBe(1);
  });

  it("won't sell more than you hold", () => {
    const w: Wallet = { bag: { scrap: 1 }, credits: 0 };
    expect(sellItem(w, item('scrap'), 2).ok).toBe(false);
    expect(w.bag['scrap']).toBe(1);
  });

  it('every stock tier lists only real, buyable items', () => {
    for (const [tier, ids] of Object.entries(SHOP_STOCK)) {
      for (const id of ids) {
        const def = ITEMS_BY_ID.get(id);
        expect(def, `${tier}: unknown item ${id}`).toBeDefined();
        expect(def!.price, `${tier}: ${id} not buyable`).toBeGreaterThan(0);
        expect(def!.kind, `${tier}: ${id} is salvage`).not.toBe('salvage');
      }
    }
  });
});

describe('salvage drops', () => {
  it('are deterministic for a seed and only ever scrap/alloy/relic', () => {
    const ids = new Set<string>();
    const a: (string | undefined)[] = [];
    const rngA = new Rng(99);
    const rngB = new Rng(99);
    for (let i = 0; i < 50; i++) {
      const da = rollSalvage(25, rngA);
      const db = rollSalvage(25, rngB);
      expect(da).toBe(db); // same seed → same stream
      if (da) ids.add(da);
      a.push(da);
    }
    for (const id of ids) expect(['scrap', 'alloy', 'relic']).toContain(id);
    expect(a.some((x) => x === undefined)).toBe(true); // not every wild drops
  });

  it('never yields the better grades below their level gates', () => {
    const rng = new Rng(3);
    for (let i = 0; i < 100; i++) {
      const d = rollSalvage(5, rng);
      expect(d === undefined || d === 'scrap').toBe(true); // L5 < alloy/relic gates
    }
  });
});
