import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BIOME_COLORS, RIDEABLES, WORLD_LINKS, WORLD_MAP } from '../src/data/region';
import { SPECIES_BY_NUM } from '../src/data/species';

const ROOT = new URL('..', import.meta.url).pathname;

describe('world-map data', () => {
  it('every node has a biome colour and a unique grid cell', () => {
    const cells = new Set<string>();
    for (const [id, m] of Object.entries(WORLD_MAP)) {
      expect(BIOME_COLORS[m.biome], `${id} biome ${m.biome}`).toBeDefined();
      const cell = `${m.col},${m.row}`;
      expect(cells.has(cell), `${id} overlaps cell ${cell}`).toBe(false);
      cells.add(cell);
    }
  });

  it('every link connects two real nodes', () => {
    for (const [a, b] of WORLD_LINKS) {
      expect(WORLD_MAP[a], a).toBeDefined();
      expect(WORLD_MAP[b], b).toBeDefined();
    }
  });

  it('has at least two garage hubs to fast-travel between', () => {
    const hubs = Object.values(WORLD_MAP).filter((m) => m.garage);
    expect(hubs.length).toBeGreaterThanOrEqual(2);
  });

  it('every rideable is a real species', () => {
    for (const num of RIDEABLES) expect(SPECIES_BY_NUM.get(num), `species ${num}`).toBeDefined();
  });
});

describe('ledges (one-way drops)', () => {
  const farmroad = JSON.parse(readFileSync(join(ROOT, 'public/world/farmroad.json'), 'utf8')) as {
    cols: number;
    rows: number;
    collision: number[];
    ledges?: Array<{ col: number; row: number; dir: string }>;
  };
  const DELTA: Record<string, [number, number]> = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] };

  it('the farm road defines ledges', () => {
    expect(farmroad.ledges?.length ?? 0).toBeGreaterThan(0);
  });

  it('each ledge lands somewhere walkable two tiles past the lip', () => {
    for (const l of farmroad.ledges ?? []) {
      const d = DELTA[l.dir];
      expect(d, `dir ${l.dir}`).toBeDefined();
      const [dx, dy] = d!;
      const lx = l.col + 2 * dx;
      const ly = l.row + 2 * dy;
      expect(lx >= 0 && ly >= 0 && lx < farmroad.cols && ly < farmroad.rows, 'landing in bounds').toBe(true);
      expect(farmroad.collision[ly * farmroad.cols + lx], 'landing walkable').toBe(0);
    }
  });
});
