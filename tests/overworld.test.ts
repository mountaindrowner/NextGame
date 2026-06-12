import { describe, expect, it } from 'vitest';
import { rollEncounter } from '../src/core/encounter';
import { Rng } from '../src/core/rng';
import { ENCOUNTER_ZONES } from '../src/data/encounters';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { isSolid, parseTmj, tileAt } from '../src/game/tilemap';

const ROOT = new URL('..', import.meta.url).pathname;

describe('encounters (statistical, seeded)', () => {
  const zone = ENCOUNTER_ZONES[0]!;

  it('fires near rate/255 per step', () => {
    const rng = new Rng(99);
    let hits = 0;
    const steps = 20000;
    for (let i = 0; i < steps; i++) if (rollEncounter(zone, rng)) hits += 1;
    const expected = steps * (zone.rate / 255);
    expect(hits).toBeGreaterThan(expected * 0.9);
    expect(hits).toBeLessThan(expected * 1.1);
  });

  it('respects slot weights and level bands', () => {
    const rng = new Rng(7);
    const counts = new Map<number, number>();
    let total = 0;
    for (let i = 0; i < 50000; i++) {
      const spawn = rollEncounter(zone, rng);
      if (!spawn) continue;
      total += 1;
      counts.set(spawn.speciesNum, (counts.get(spawn.speciesNum) ?? 0) + 1);
      const slot = zone.slots.find((s) => s.speciesNum === spawn.speciesNum)!;
      expect(spawn.level).toBeGreaterThanOrEqual(slot.minLevel);
      expect(spawn.level).toBeLessThanOrEqual(slot.maxLevel);
    }
    for (const slot of zone.slots) {
      const share = ((counts.get(slot.speciesNum) ?? 0) / total) * 100;
      expect(Math.abs(share - slot.weight), `slot ${slot.speciesNum}`).toBeLessThan(3);
    }
  });

  it('signal dampener cuts the rate to a third', () => {
    const rng = new Rng(5);
    let plain = 0;
    let damp = 0;
    for (let i = 0; i < 20000; i++) {
      if (rollEncounter(zone, rng)) plain += 1;
      if (rollEncounter(zone, rng, true)) damp += 1;
    }
    expect(damp).toBeLessThan(plain * 0.5);
  });
});

describe('Tiled map loading', () => {
  const raw = JSON.parse(readFileSync(join(ROOT, 'public/maps/the-field.tmj'), 'utf8'));
  const map = parseTmj('the-field', raw);

  it('parses dimensions, layers, and spawns', () => {
    expect(map.width).toBeGreaterThan(10);
    expect(map.ground.length).toBe(map.width * map.height);
    expect(map.spawns.some((s) => s.name === 'P')).toBe(true);
    expect(map.spawns.some((s) => s.name === 'N')).toBe(true);
  });

  it('keeps the border solid and the spawn walkable', () => {
    expect(isSolid(map, 0, 0)).toBe(true);
    expect(isSolid(map, -1, 3)).toBe(true);
    const p = map.spawns.find((s) => s.name === 'P')!;
    expect(isSolid(map, p.tileX, p.tileY)).toBe(false);
  });

  it('has encounter zones painted where the grass is', () => {
    let zoned = 0;
    for (let y = 0; y < map.height; y++)
      for (let x = 0; x < map.width; x++) if (tileAt(map, map.zones, x, y) > 0) zoned += 1;
    expect(zoned).toBeGreaterThan(20);
  });
});
