import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PATCHES, PATCH_BY_MAP, TOTAL_PATCHES } from '../src/data/patches';

const ROOT = new URL('..', import.meta.url).pathname;
const loadMap = (id: string) => JSON.parse(readFileSync(join(ROOT, `public/world/${id}.json`), 'utf8'));

// the built colonies whose Wardens are wired now (5 of the 8)
const COLONIES: Array<[string, string]> = [
  ['railhead', 'cistern'],
  ['cistern', 'bastion'],
  ['bastion', 'redoubt'],
  ['redoubt', 'trinity'],
  ['chancel', ''], // last built colony — no forward gate
];

describe('colony Patches', () => {
  it('ids are unique and well-formed', () => {
    const ids = Object.values(PATCHES).map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of Object.values(PATCHES)) {
      expect(p.id).toBe(`patch-${p.mapId}`);
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.warden).toMatch(/Warden/);
    }
  });

  it('there are 5 obtainable now, of the canon 8', () => {
    expect(Object.keys(PATCHES).length).toBe(5);
    expect(TOTAL_PATCHES).toBe(8);
  });

  it('PATCH_BY_MAP maps each colony map to its patch', () => {
    for (const [map, id] of Object.entries(PATCH_BY_MAP)) expect(PATCHES[id]?.mapId).toBe(map);
  });
});

describe('each colony map wires its Warden boss', () => {
  for (const [map, nextMap] of COLONIES) {
    it(`${map}: one Warden npc with a 3-Ohm team + its Patch`, () => {
      const j = loadMap(map);
      const wardens = (j.npcs ?? []).filter((n: { warden?: unknown }) => n.warden);
      expect(wardens.length, `${map} warden count`).toBe(1);
      const w = wardens[0].warden;
      expect(w.patch).toBe(PATCH_BY_MAP[map]);
      expect(Array.isArray(w.team) && w.team.length).toBe(3);
      for (const m of w.team) {
        expect(typeof m.num).toBe('number');
        expect(m.level).toBeGreaterThan(0);
      }
      // the Warden keeps story lines for after the fight
      expect((wardens[0].lines ?? []).length).toBeGreaterThanOrEqual(3);
    });

    if (nextMap) {
      it(`${map}: the forward exit to ${nextMap} is Warden-gated`, () => {
        const j = loadMap(map);
        const gated = (j.exits ?? []).filter((e: { gate?: string }) => e.gate === 'warden');
        expect(gated.length, `${map} gated exits`).toBe(1);
        expect(gated[0].mapId).toBe(nextMap);
      });
    }
  }
});
