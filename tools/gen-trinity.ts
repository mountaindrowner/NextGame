/**
 * The Trinity Bottoms — map composition (npm run gen:trinity). The drowned
 * bottomland forest (Critical Path §10, Act II): a winding muck path through
 * murky deep water (the HOVER stretches, blocked), past drowned cypress, reed-
 * bed encounters (organic-hybrid Ohms), glowing hybrid flora, a sunken car,
 * and the half-submerged chapel landmark — under fog + a light hive creep.
 * Builds public/world/trinity.png + .json. Linked from Redoubt.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { chapel, cypress, deepWater, hybridFlora, logBridge, muckFloor, reeds, shallowReed, stump, sunkenCar } from './assets/kit-trinity';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 30;
const ROWS = 34;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

function treeline(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'G');
  for (let k = 0; k < 18; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(3, 5), r.int(3, 4), r.chance(50) ? 'g' : 'G');
  for (let k = 0; k < 10; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'f');
  return g.render();
}

// ~ deep water(HOVER) · m muck(walk) · r reed(encounter,walk) · L log(walk) · # tree-line
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '~'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(1, y, '#'); setG(COLS - 1, y, '#'); setG(COLS - 2, y, '#'); }
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
// the winding muck path (south entry → north), bridged across the water
rectG(13, 30, 3, 4, 'm'); setG(14, ROWS - 1, 'm'); // south opening (from Redoubt portal)
rectG(13, 26, 9, 4, 'm');
rectG(19, 18, 3, 9, 'm');
rectG(8, 16, 14, 3, 'm');
rectG(8, 7, 3, 10, 'm');
rectG(8, 5, 9, 3, 'm');
rectG(14, 2, 3, 4, 'm');
// log-bridge crossings (walkable spans over water)
rectG(16, 22, 4, 1, 'L'); rectG(11, 12, 1, 4, 'L');
// the chapel island (off the path, west)
rectG(3, 9, 5, 5, 'm');
rectG(7, 11, 2, 1, 'L'); // a plank to the island
// reed-bed encounters fringing the path (each adjacent to walkable muck)
rectG(15, 24, 3, 2, 'r'); rectG(20, 14, 3, 2, 'r'); rectG(11, 19, 3, 2, 'r');

// ---- props ---------------------------------------------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: chapel(), col: 5, row: 13, solid: 2 }, // the half-submerged chapel (hero, on its island)
  { s: cypress(), col: 24, row: 9, solid: 1 },
  { s: cypress(), col: 23, row: 26, solid: 1 },
  { s: cypress(), col: 4, row: 25, solid: 1 },
  { s: cypress(), col: 26, row: 18, solid: 1 },
  { s: sunkenCar(), col: 22, row: 31, solid: 1 },
  { s: hybridFlora(), col: 9, row: 18 },
  { s: hybridFlora(), col: 21, row: 16 },
  { s: hybridFlora(), col: 12, row: 9 },
  { s: stump(), col: 16, row: 28 },
  { s: reeds(), col: 18, row: 24 },
  { s: reeds(), col: 9, row: 6 },
  { s: logBridge(), col: 17, row: 22 },
];

const WATER = [deepWater(1), deepWater(2)];
const MUCK = [muckFloor(11), muckFloor(12), muckFloor(13)];
const REED = [shallowReed(21), shallowReed(22)];
const LOG = logBridge();
const BO = [treeline(31), treeline(32)];
const big = new Sprite(W, H);
const trng = new Rng(7);
const pick = (a: Sprite[]): Sprite => a[trng.int(0, a.length - 1)]!;
const blit = (s: Sprite, x0: number, y0: number, over = true): void => {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if (over && (c[3] ?? 0) === 0) continue;
      const a = (c[3] ?? 255) / 255;
      const d = big.get(x0 + x, y0 + y);
      big.set(x0 + x, y0 + y, [Math.round(c[0] * a + d[0] * (1 - a)), Math.round(c[1] * a + d[1] * (1 - a)), Math.round(c[2] * a + d[2] * (1 - a)), 255]);
    }
};
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    if (ch === '#') blit(pick(BO), c * T, r * T, false);
    else if (ch === 'm') blit(pick(MUCK), c * T, r * T, false);
    else if (ch === 'r') blit(pick(REED), c * T, r * T, false);
    else if (ch === 'L') { blit(pick(WATER), c * T, r * T, false); blit(LOG, c * T, r * T - 2); }
    else blit(pick(WATER), c * T, r * T, false);
  }
function glow(cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const p = big.get(x, y); big.set(x, y, [Math.min(255, Math.round(p[0] + col[0] * a)), Math.min(255, Math.round(p[1] + col[1] * a)), Math.min(255, Math.round(p[2] + col[2] * a)), 255]); }
}
function hiveCreep(cx: number, cy: number, n: number, seed: number): void {
  const r = new Rng(seed);
  for (let k = 0; k < n; k++) { const x = cx + r.int(-50, 50); const y = cy + r.int(-44, 44); for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { if (dx * dx + dy * dy > 5) continue; const px = x + dx; const py = y + dy; if (px < 0 || py < 0 || px >= W || py >= H) continue; const p = big.get(px, py); const a = 0.5; const col = r.chance(60) ? [120, 60, 150] : [55, 150, 130]; big.set(px, py, [Math.round(col[0]! * a + p[0] * (1 - a)), Math.round(col[1]! * a + p[1] * (1 - a)), Math.round(col[2]! * a + p[2] * (1 - a)), 255]); } if (r.chance(40)) big.set(x, y, [150, 240, 220, 255]); }
}

const extraSolid = new Set<string>();
for (const o of objs) {
  const ax = o.col * T + T / 2;
  const ay = o.row * T + T;
  blit(o.s, Math.round(ax - o.s.w / 2), Math.round(ay - o.s.h));
  if (o.solid) {
    const c0 = Math.floor((ax - o.s.w / 2) / T);
    const c1 = Math.floor((ax + o.s.w / 2 - 1) / T);
    for (let cc = c0; cc <= c1; cc++) for (let rr = o.row - o.solid + 1; rr <= o.row; rr++) extraSolid.add(`${cc},${rr}`);
  }
}
// hybrid-flora bio-glow + a light hive creep
for (const o of objs) if (o.s.h === 40 && o.s.w === 28) glow(o.col * T + 14, o.row * T + T - 24, 18, [18, 80, 70]);
hiveCreep(24 * T, 22 * T, 60, 51);
// fog: a faint pale veil over the water (atmosphere)
const frng = new Rng(99);
for (let k = 0; k < 1400; k++) { const x = frng.int(0, W - 1); const y = frng.int(0, H - 1); const p = big.get(x, y); big.set(x, y, [Math.min(255, p[0] + 22), Math.min(255, p[1] + 24), Math.min(255, p[2] + 24), 255]); }

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'squalid', biome: 'flooded', seed: 4208, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || ch === '~' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'trinity.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || ch === '~' || extraSolid.has(`${c},${r}`);
    collision.push(solid ? 1 : 0);
    grass.push(ch === 'r' ? 1 : 0); // reed beds = encounters
    grassAny.push(ch === 'r' ? 1 : 0);
  }

writeFileSync(
  join(OUT, 'trinity.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: [], placements: [],
    spawn: { x: 14, y: 31 }, // the south end of the path (in from Redoubt)
    exits: [{ x: 14, y: 33, scene: 'fieldhd', mapId: 'redoubt' }], // south → back to Redoubt
    signs: [
      { col: 14, row: 30, text: 'A leaning marker: THE TRINITY BOTTOMS. The road drowns here. Keep to the muck and the logs.' },
      { col: 14, row: 3, text: 'Half-sunk milepost: …THE CHANCEL, ahead. (The way north is not yet open.)' },
    ],
    npcs: [{ char: 'npc_elder', col: 5, row: 10 }], // a Net-Medium by the chapel
  }),
);
console.log(`trinity: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props`);
