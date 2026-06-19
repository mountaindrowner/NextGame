import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BIOME_COLORS, RIDEABLES, WORLD_LINKS, WORLD_MAP } from '../src/data/region';
import { SPECIES_BY_NUM } from '../src/data/species';
import { ZONES_BY_ID } from '../src/data/encounters';

interface MapJson {
  cols: number;
  rows: number;
  collision: number[];
  grass: number[];
  zone?: string;
  spawn: { x: number; y: number };
  exits?: Array<{ x: number; y: number; mapId?: string; to?: { x: number; y: number } }>;
  npcs?: Array<{ name?: string; lines?: string[]; shop?: string }>;
}
const loadMap = (id: string): MapJson => JSON.parse(readFileSync(join(ROOT, `public/world/${id}.json`), 'utf8')) as MapJson;
const flood = (m: MapJson): boolean[] => {
  const seen = new Array(m.cols * m.rows).fill(false);
  const i = (x: number, y: number): number => y * m.cols + x;
  const q = [[m.spawn.x, m.spawn.y]];
  seen[i(m.spawn.x, m.spawn.y)] = true;
  while (q.length) {
    const [x, y] = q.pop()!;
    for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]] as Array<[number, number]>) {
      const nx = x! + dx;
      const ny = y! + dy;
      if (nx < 0 || ny < 0 || nx >= m.cols || ny >= m.rows) continue;
      const k = i(nx, ny);
      if (seen[k] || m.collision[k] === 1) continue;
      seen[k] = true;
      q.push([nx, ny]);
    }
  }
  return seen;
};

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

describe('the Chancel (Colony 5)', () => {
  const chancel = loadMap('chancel');
  const trinity = loadMap('trinity');

  it('uses its own crypt encounter zone, weights summing to 100', () => {
    expect(chancel.zone).toBe('chancel-crypt');
    const zone = ZONES_BY_ID.get('chancel-crypt');
    expect(zone).toBeDefined();
    expect(zone!.slots.reduce((s, x) => s + x.weight, 0)).toBe(100);
    for (const slot of zone!.slots) expect(SPECIES_BY_NUM.get(slot.speciesNum), `species ${slot.speciesNum}`).toBeDefined();
  });

  it('is fully reachable — every walkable cell, encounter, exit, and NPC', () => {
    const seen = flood(chancel);
    const i = (x: number, y: number): number => y * chancel.cols + x;
    let walk = 0;
    let reach = 0;
    let enc = 0;
    let encReach = 0;
    for (let k = 0; k < chancel.cols * chancel.rows; k++) {
      if (chancel.collision[k] === 0) {
        walk++;
        if (seen[k]) reach++;
      }
      if (chancel.grass[k] === 1) {
        enc++;
        if (seen[k]) encReach++;
      }
    }
    expect(reach).toBe(walk);
    expect(encReach).toBe(enc);
    expect(enc).toBeGreaterThan(0);
    // story NPCs are fleshed out; a counter-clerk's interaction is the shop, not dialogue
    for (const n of chancel.npcs ?? []) if (!n.shop) expect(n.lines?.length ?? 0, n.name).toBeGreaterThanOrEqual(3);
  });

  it('round-trips with Trinity through portal exits with landings', () => {
    const up = trinity.exits?.find((e) => e.mapId === 'chancel');
    const down = chancel.exits?.find((e) => e.mapId === 'trinity');
    expect(up?.to, 'trinity→chancel landing').toBeDefined();
    expect(down?.to, 'chancel→trinity landing').toBeDefined();
    // each landing is a walkable cell in the destination map
    expect(chancel.collision[up!.to!.y * chancel.cols + up!.to!.x]).toBe(0);
    expect(trinity.collision[down!.to!.y * trinity.cols + down!.to!.x]).toBe(0);
  });

  it('is on the world-map, linked, and a fast-travel garage hub', () => {
    expect(WORLD_MAP.chancel?.garage).toBe(true);
    expect(WORLD_LINKS.some(([a, b]) => (a === 'trinity' && b === 'chancel') || (a === 'chancel' && b === 'trinity'))).toBe(true);
  });
});
