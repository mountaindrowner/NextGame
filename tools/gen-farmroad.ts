/**
 * Farm Road — route map (npm run gen:farmroad). The cracked farm-to-market
 * route between the Field and Railhead (Critical Path §2): a winding dirt road
 * through prairie + fence-line tall grass (encounters), an abandoned cotton gin
 * and a water-tower lookout, mesquite, and tumbleweeds. A vertical route with
 * OPEN top/bottom edges so the walker edge-warps seamlessly: south → the Field,
 * north → Railhead. Builds public/world/farmroad.png + .json.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { barn, watertower } from './world-builders';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 28;
const ROWS = 30;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

function prairie(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'g');
  for (let k = 0; k < 18; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'G');
  for (let k = 0; k < 22; k++) { const x = r.int(0, T - 1); const y = r.int(2, T - 1); g.set(x, y, 'f'); g.set(x, y - 1, r.chance(40) ? 'F' : 'f'); }
  for (let k = 0; k < 6; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'h');
  return g.render();
}
function tall(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'G');
  for (let k = 0; k < 24; k++) { const x = r.int(0, T - 1); const h = r.int(6, 12); const base = T - r.int(0, 2); for (let y = base; y > base - h; y--) g.set(x, y, 'g'); g.set(x, base - h, r.chance(50) ? 'F' : 'f'); }
  return g.render();
}
function road(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'k');
  for (let k = 0; k < 6; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 4), r.int(1, 2), 'n');
  for (let k = 0; k < 4; k++) g.hline(r.int(1, T - 8), r.int(3, T - 3), r.int(5, 9), 'K');
  for (let k = 0; k < 12; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(55) ? 'K' : 'n');
  return g.render();
}
function treeline(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'G'); // dense dark canopy wall
  for (let k = 0; k < 20; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(3, 5), r.int(3, 4), r.chance(50) ? 'g' : 'G');
  for (let k = 0; k < 14; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'f');
  return g.render();
}
function tumbleweed(seed: number): Sprite {
  const g = new Grid(24, 22);
  const r = new Rng(seed);
  g.shadow(12, 20, 7, 2);
  for (let k = 0; k < 16; k++) { const a = r.next() * 6.28; g.line(12 + Math.cos(a) * 3, 11 + Math.sin(a) * 3, 12 + Math.cos(a) * 9, 11 + Math.sin(a) * 8, r.chance(50) ? 'j' : 'h'); }
  g.outline('X');
  return g.render();
}

// ground glyphs: g prairie · T tall(encounter) · d road · # tree-line
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'g'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
// tree-line walls on the sides; top/bottom open only at the road
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(1, y, '#'); setG(COLS - 1, y, '#'); setG(COLS - 2, y, '#'); }
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
// the winding road: bottom (south → Field) up to top (north → Railhead)
rectG(12, ROWS - 1, 3, 1, 'd'); // bottom opening
rectG(12, 22, 3, 8, 'd');
rectG(12, 20, 9, 3, 'd'); // bend east
rectG(18, 10, 3, 12, 'd');
rectG(8, 8, 13, 3, 'd'); // bend west
rectG(8, 1, 3, 9, 'd');
rectG(8, 0, 3, 1, 'd'); // top opening
// tall-grass encounter patches flanking the road
rectG(4, 14, 6, 5, 'T');
rectG(20, 14, 5, 6, 'T');
rectG(12, 4, 6, 4, 'T');
rectG(4, 24, 5, 3, 'T');

// props (baked) — the cotton gin (barn), the water-tower lookout, dressing
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: barn(), col: 22, row: 6, solid: 1 }, // the abandoned cotton gin
  { s: watertower(), col: 5, row: 8, solid: 1 }, // the lookout
  { s: tumbleweed(1), col: 16, row: 26 },
  { s: tumbleweed(2), col: 23, row: 17 },
  { s: tumbleweed(3), col: 6, row: 20 },
];

const PR = [prairie(1), prairie(2), prairie(3)];
const TA = [tall(11), tall(12)];
const RD = [road(21), road(22)];
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
    const t = ch === '#' ? pick(BO) : ch === 'T' ? pick(TA) : ch === 'd' ? pick(RD) : pick(PR);
    blit(t, c * T, r * T, false);
  }
// organic road↔grass edge crumble
const erng = new Rng(9);
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    if (MAP[r]![c] !== 'd') continue;
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]] as Array<[number, number]>) {
      if (MAP[r + dy]?.[c + dx] !== 'g') continue;
      for (let i = 0; i < T; i++) if (erng.chance(30)) { const x = dx === 0 ? c * T + i : c * T + (dx === 1 ? T - 1 : 0); const y = dy === 0 ? r * T + i : r * T + (dy === 1 ? T - 1 : 0); big.set(x, y, [70, 90, 40, 255]); }
    }
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

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'lived_in', biome: 'prairie', seed: 4202, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'farmroad.png'), PNG.sync.write(png));

const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
const placements: Array<{ type: string; col: number; row: number }> = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    collision.push(ch === '#' || extraSolid.has(`${c},${r}`) ? 1 : 0);
    grass.push(ch === 'T' ? 1 : 0);
    grassAny.push(ch === 'T' || ch === 'g' ? 1 : 0);
  }
for (const [c, r] of [[4, 6], [23, 12], [5, 18], [22, 24], [10, 12]] as Array<[number, number]>)
  if (!extraSolid.has(`${c},${r}`) && MAP[r]?.[c] === 'g') placements.push({ type: 'tree', col: c, row: r });

writeFileSync(
  join(OUT, 'farmroad.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: [], placements,
    spawn: { x: 13, y: ROWS - 2 }, // fallback (edge-warps set the real entry)
    npcs: [{ char: 'npc_elder', col: 19, row: 26 }], // a traveler resting by the road
    trainers: [
      { char: 'npc_kid', col: 10, row: 24, facing: 'e', name: 'Runner Dusty', range: 5, team: [{ num: 10, level: 5 }], bark: "Runner Dusty: Found my Ohm in a dumpster — still tougher than yours!" },
      { char: 'npc_rancher', col: 22, row: 11, facing: 'w', name: 'Wrangler Wade', range: 5, team: [{ num: 19, level: 5 }, { num: 21, level: 6 }], bark: 'Wrangler Wade: Yeehp. You spook the herd, you answer for it.' },
      { char: 'npc_kid', col: 16, row: 16, facing: 'e', name: 'Picker Junie', range: 5, team: [{ num: 12, level: 6 }], bark: 'Picker Junie: Mine lights up! Wanna see?' },
    ],
  }),
);
console.log(`farmroad: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props, ${placements.length} trees`);
