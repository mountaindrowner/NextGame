/**
 * The Field — map composition (npm run gen:field). Builds the playable ruined
 * cattle-town surface from the asset kits: primary prairie/road/water tiles +
 * the sec.field buildings (Co-op Vault, barn, church, silos, water tower,
 * windmill, farmhouses) + cattle pens + the elevator hatch (spawn) + animated
 * trees + clutter, at the depth/density bar. Replaces public/world/the-field.*.
 * The colony lift (ElevatorScene) deposits you at the hatch.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { barn, house, watertower, windmill } from './world-builders';
import { cattleFence, church, coopVault, elevatorHatch, hayBale, hitchingPost, silo, siloCluster, trough } from './assets/kit-field';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 40;
const ROWS = 28;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

// ---- ground tiles --------------------------------------------------------
function prairie(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'g');
  for (let k = 0; k < 18; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'G');
  for (let k = 0; k < 22; k++) { const x = r.int(0, T - 1); const y = r.int(2, T - 1); g.set(x, y, 'f'); g.set(x, y - 1, r.chance(40) ? 'F' : 'f'); }
  for (let k = 0; k < 6; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'h'); // dry thatch
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
  g.rect(0, 0, T, T, 'k'); // tan dirt
  for (let k = 0; k < 6; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 4), r.int(1, 2), 'n');
  for (let k = 0; k < 4; k++) g.hline(r.int(1, T - 8), r.int(3, T - 3), r.int(5, 9), 'K'); // ruts
  for (let k = 0; k < 12; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(55) ? 'K' : 'n');
  return g.render();
}
function packed(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'M');
  for (let k = 0; k < 16; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'Q' : 'T');
  return g.render();
}
function water(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'C');
  for (let k = 0; k < 5; k++) g.hline(r.int(2, T - 6), r.int(2, T - 2), r.int(3, 6), 'c');
  for (let k = 0; k < 3; k++) g.hline(r.int(2, T - 4), r.int(2, T - 2), r.int(2, 3), 'v');
  return g.render();
}
function border(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'G'); // dark scrub edge
  for (let k = 0; k < 30; k++) { const x = r.int(0, T - 1); const y = r.int(2, T - 1); g.set(x, y, r.chance(50) ? 'g' : 'J'); g.set(x, y - 1, 'G'); }
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
function crate(): Sprite {
  const g = new Grid(22, 22);
  g.shadow(11, 21, 9, 2);
  g.box(2, 4, 18, 17, 'n', 'k', 'K');
  g.line(2, 4, 19, 20, 'n');
  g.line(19, 4, 2, 20, 'n');
  g.outline('X');
  return g.render();
}

// ---- map layout ----------------------------------------------------------
// ground glyphs: g prairie · T tall(encounter) · d road · e packed · w water · # border
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'g'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
// border ring
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(COLS - 1, y, '#'); }
// roads: main street (H) + crossing (V); the V-road opens the NORTH edge → Farm Road
rectG(1, 13, COLS - 2, 3, 'd');
rectG(19, 0, 3, ROWS - 1, 'd');
// creek (SW pond), bridged by the vertical road
rectG(1, 24, 18, 3, 'w');
rectG(19, 24, 3, 3, 'd'); // bridge keeps the road
// tall-grass encounter patches
rectG(3, 3, 6, 5, 'T');
rectG(30, 4, 7, 6, 'T');
rectG(4, 18, 7, 4, 'T');
rectG(29, 18, 8, 4, 'T');

// ---- buildings & props (baked, footprint solid) --------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: coopVault(), col: 18, row: 12, solid: 3 }, // hero — the prologue Vault
  { s: barn(), col: 29, row: 12, solid: 2 },
  { s: house(), col: 7, row: 12, solid: 2 },
  { s: siloCluster(), col: 35, row: 11, solid: 2 },
  { s: silo(), col: 12, row: 11, solid: 2 },
  { s: church(), col: 9, row: 22, solid: 3 },
  { s: watertower(), col: 25, row: 21, solid: 1 },
  { s: windmill(), col: 32, row: 22, solid: 1 },
  { s: house(), col: 16, row: 22, solid: 2 },
  { s: elevatorHatch(), col: 20, row: 17, solid: 1 }, // spawn point
  // cattle pen (NE) + dressing
  { s: cattleFence(), col: 33, row: 24, solid: 1 },
  { s: cattleFence(), col: 36, row: 24, solid: 1 },
  { s: trough(), col: 34, row: 23 },
  { s: hayBale(), col: 36, row: 23 },
  { s: hitchingPost(), col: 15, row: 16 },
  // clutter scatter
  { s: crate(), col: 22, row: 12 },
  { s: crate(), col: 23, row: 12 },
  { s: tumbleweed(1), col: 26, row: 16 },
  { s: tumbleweed(2), col: 6, row: 16 },
  { s: tumbleweed(3), col: 14, row: 9 },
  { s: crate(), col: 11, row: 23 },
];

const PR = [prairie(1), prairie(2), prairie(3), prairie(4)];
const TA = [tall(11), tall(12), tall(13)];
const RD = [road(21), road(22), road(23)];
const PK = [packed(31), packed(32)];
const WA = [water(41), water(42)];
const BO = [border(51), border(52)];
const big = new Sprite(W, H);
const trng = new Rng(7);
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
const pick = (arr: Sprite[]): Sprite => arr[trng.int(0, arr.length - 1)]!;
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const t = ch === 'd' ? pick(RD) : ch === 'T' ? pick(TA) : ch === 'e' ? pick(PK) : ch === 'w' ? pick(WA) : ch === '#' ? pick(BO) : pick(PR);
    blit(t, c * T, r * T, false);
  }
// organic edge crumble where road/packed meets grass
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

// lived-in layer: floor litter, stains, weeds reclaiming the dead town
scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'squalid', biome: 'prairie', seed: 4201, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || ch === 'w' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'the-field.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
const waterArr: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || ch === 'w' || extraSolid.has(`${c},${r}`);
    collision.push(solid ? 1 : 0);
    grass.push(ch === 'T' ? 1 : 0);
    grassAny.push(ch === 'T' || ch === 'g' ? 1 : 0);
    waterArr.push(ch === 'w' ? 1 : 0);
  }
// trees as animated placements (FieldHDScene draws trunk + swaying leaves)
const placements: Array<{ type: string; col: number; row: number }> = [];
const prng = new Rng(13);
const treeSpots: Array<[number, number]> = [[4, 10], [13, 5], [27, 7], [37, 16], [3, 16], [34, 16], [6, 9], [24, 4], [11, 18], [30, 25]];
for (const [c, r] of treeSpots) if (!extraSolid.has(`${c},${r}`) && MAP[r]?.[c] !== 'w' && MAP[r]?.[c] !== 'd') placements.push({ type: 'tree', col: c, row: r });
void prng;

writeFileSync(
  join(OUT, 'the-field.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: waterArr, placements,
    zone: 'field-grass',
    spawn: { x: 20, y: 18 }, // just below the elevator hatch
    // north edge is open → Farm Road (handled by the region edge-warp, not a portal)
    npcs: [
      { char: 'npc_elder', col: 13, row: 13, name: 'Quartermaster Odell', shop: 'field', lines: ['Topside supply. Nodes, kits, and I buy salvage by the pound.'] },
      { char: 'npc_rancher', col: 16, row: 13, name: 'Scrapper Rivet', lines: [
        'First run topside? Keep off the dead houses. Some flicker — there, then gone. The Static does that.',
        "Co-op Vault stood sealed since my grandfather's day. Funny — somebody cracked it open just last night.",
        'Pick clean, walk soft, never linger. Standing still up here gets you noticed.',
      ] },
      { char: 'npc_kid', col: 9, row: 13, name: 'Picker Bex', lines: [
        'The tall grass is crawling with little ones — toasters, fans, a vacuum that spins like a dust devil!',
        'Weaken one first, then spend a storage node. Rush the catch and they rage and bolt.',
        'Odessa buzzed my handheld about some Manifest to fill. You get the assignment too?',
      ] },
      { char: 'npc_elder', col: 12, row: 23, name: 'Old-timer Mesa', lines: [
        'This was cattle country, kid, long before the bunkers. Squint and you can still read the brands.',
        "That church bell hasn't rung in five hundred years. Some folks still wait on it.",
        "Grass grows, water runs. The world's broken — and it's trying awful hard to heal.",
      ] },
    ],
    trainers: [
      { char: 'npc_kid', col: 24, row: 18, facing: 'w', name: 'Runner Cricket', range: 4, team: [{ num: 10, level: 4 }], bark: 'Runner Cricket: First one topside wins! ...usually.' },
    ],
    items: [
      { col: 28, row: 14, credits: 150, label: 'A dropped node' },
      { col: 5, row: 5, credits: 300, hidden: true, label: 'Buried in the dead grass' },
    ],
    signs: [
      { col: 22, row: 16, text: 'Faded sign: THE FIELD — Ohmstead surface. Tall grass ahead; keep your Ohm close.' },
    ],
  }),
);
console.log(`the-field: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props, ${placements.length} trees`);
