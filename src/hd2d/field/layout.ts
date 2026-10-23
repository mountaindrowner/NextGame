import { fbm } from '../noise';

/**
 * The Field's layout, carried over 1:1 from tools/gen-field.ts (Mark: keep
 * existing layouts). 1 tile = 1 world unit. x = column (west→east), z = row
 * (north→south). Ground glyphs: g prairie · T tall grass (encounters) ·
 * d road · w creek · # border scrub.
 */
export const COLS = 40;
export const ROWS = 28;

export const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'g'));
const inb = (x: number, z: number): boolean => x >= 0 && z >= 0 && x < COLS && z < ROWS;
const rect = (x0: number, z0: number, w: number, h: number, c: string): void => {
  for (let z = z0; z < z0 + h; z++) for (let x = x0; x < x0 + w; x++) if (inb(x, z)) MAP[z]![x] = c;
};
for (let x = 0; x < COLS; x++) { MAP[0]![x] = '#'; MAP[ROWS - 1]![x] = '#'; }
for (let z = 0; z < ROWS; z++) { MAP[z]![0] = '#'; MAP[z]![COLS - 1] = '#'; }
rect(1, 13, COLS - 2, 3, 'd'); // main street (E–W)
rect(19, 0, 3, ROWS - 1, 'd'); // crossing road; opens the north edge → Farm Road
rect(1, 24, 18, 3, 'w'); // the creek
rect(19, 24, 3, 3, 'd'); // bridge
rect(3, 3, 6, 5, 'T');
rect(30, 4, 7, 6, 'T');
rect(4, 18, 7, 4, 'T');
rect(29, 18, 8, 4, 'T');

export const cell = (x: number, z: number): string => (inb(x, z) ? MAP[z]![x]! : '#');

/** Solid footprints (world-space AABBs) registered by the scene builders. */
export interface Rect { x0: number; z0: number; x1: number; z1: number }
const solids: Rect[] = [];
export function addSolid(x0: number, z0: number, x1: number, z1: number): void {
  solids.push({ x0: Math.min(x0, x1), z0: Math.min(z0, z1), x1: Math.max(x0, x1), z1: Math.max(z0, z1) });
}
export function solidRects(): readonly Rect[] { return solids; }

/** True where nothing may stand: border scrub, water, any registered solid. */
export function blocked(x: number, z: number, r = 0): boolean {
  if (x - r < 0.15 || x + r > COLS - 0.15 || z + r > ROWS - 0.15) return true;
  if (z - r < 0.05) return !(x > 19.2 && x < 21.8); // north edge opens only on the road
  for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r], [0, 0]] as Array<[number, number]>) {
    const c = cell(Math.floor(x + dx), Math.floor(z + dz));
    if (c === '#' || c === 'w') return true;
  }
  for (const s of solids) if (x + r > s.x0 && x - r < s.x1 && z + r > s.z0 && z - r < s.z1) return true;
  return false;
}

// ---------------------------------------------------------------- terrain

/** Smoothed water mask in [0,1] (bilinear over cell centres). */
function waterAt(x: number, z: number): number {
  const fx = x - 0.5, fz = z - 0.5;
  const x0 = Math.floor(fx), z0 = Math.floor(fz), tx = fx - x0, tz = fz - z0;
  const w = (cx: number, cz: number): number => (cell(cx, cz) === 'w' ? 1 : 0);
  return w(x0, z0) * (1 - tx) * (1 - tz) + w(x0 + 1, z0) * tx * (1 - tz) + w(x0, z0 + 1) * (1 - tx) * tz + w(x0 + 1, z0 + 1) * tx * tz;
}
function roadAt(x: number, z: number): number {
  const fx = x - 0.5, fz = z - 0.5;
  const x0 = Math.floor(fx), z0 = Math.floor(fz), tx = fx - x0, tz = fz - z0;
  const w = (cx: number, cz: number): number => (cell(cx, cz) === 'd' ? 1 : 0);
  return w(x0, z0) * (1 - tx) * (1 - tz) + w(x0 + 1, z0) * tx * (1 - tz) + w(x0, z0 + 1) * (1 - tx) * tz + w(x0 + 1, z0 + 1) * tx * tz;
}

/** Ground height: gentle prairie roll, flat roads, a sunken creek bed, a
 *  raised scrub berm round the edge that frames the diorama. */
export function heightAt(x: number, z: number): number {
  let h = (fbm(x * 0.09, z * 0.09, 5, 3) - 0.5) * 0.45;
  h *= 1 - roadAt(x, z) * 0.9;
  h -= waterAt(x, z) * 0.55;
  const edge = Math.min(x, z, COLS - x, ROWS - z);
  if (edge < 1.6) h += (1.6 - edge) * 0.55;
  if (z < 1.6 && x > 18.6 && x < 22.4) h = Math.min(h, 0.05); // the road out stays level
  return h;
}

export const WATER_Y = -0.3;
