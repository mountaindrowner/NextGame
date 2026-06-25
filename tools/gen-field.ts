/**
 * The Field — map composition (npm run gen:field). Builds the playable ruined
 * cattle-town surface from the asset kits: primary prairie/road/water tiles +
 * the sec.field buildings (Co-op Vault, barn, church, silos, water tower,
 * windmill, farmhouses) + cattle pens + the elevator hatch (spawn) + animated
 * trees + clutter, at the depth/density bar. Replaces public/world/the-field.*.
 * The colony lift (ElevatorScene) deposits you at the hatch.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
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
// PixelLab building sprite (assets/reference/<name>.png): trim to content and
// box-filter down to a target height; falls back to the grid builder if the
// PNG isn't present, so the map always composes.
function bld(name: string, targetH: number): Sprite | null {
  const path = join(new URL('..', import.meta.url).pathname, 'assets/reference', `${name}.png`);
  if (!existsSync(path)) return null;
  const png = PNG.sync.read(readFileSync(path));
  let x0 = png.width, y0 = png.height, x1 = -1, y1 = -1;
  for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++)
    if (png.data[(y * png.width + x) * 4 + 3]! >= 16) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  if (x1 < 0) return null;
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1, scale = targetH / bh;
  const ow = Math.max(1, Math.round(bw * scale)), oh = Math.max(1, Math.round(bh * scale));
  const s = new Sprite(ow, oh);
  for (let ty = 0; ty < oh; ty++) for (let tx = 0; tx < ow; tx++) {
    const sx0 = x0 + Math.floor(tx / scale), sx1 = x0 + Math.max(Math.floor((tx + 1) / scale), Math.floor(tx / scale) + 1);
    const sy0 = y0 + Math.floor(ty / scale), sy1 = y0 + Math.max(Math.floor((ty + 1) / scale), Math.floor(ty / scale) + 1);
    let pr = 0, pg = 0, pb = 0, pa = 0, n = 0;
    for (let sy = sy0; sy < sy1 && sy <= y1; sy++) for (let sx = sx0; sx < sx1 && sx <= x1; sx++) {
      const i = (sy * png.width + sx) * 4, al = png.data[i + 3]! / 255;
      pr += png.data[i]! * al; pg += png.data[i + 1]! * al; pb += png.data[i + 2]! * al; pa += png.data[i + 3]!; n++;
    }
    if (!n) continue;
    const avgA = pa / n;
    if (avgA > 0) { const k = 255 / (avgA * n); s.set(tx, ty, [Math.min(255, Math.round(pr * k)), Math.min(255, Math.round(pg * k)), Math.min(255, Math.round(pb * k)), Math.round(avgA)]); }
  }
  return s;
}
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: bld('field_coopvault', 120) ?? coopVault(), col: 18, row: 12, solid: 3 }, // hero — the prologue Vault
  { s: bld('field_barn', 104) ?? barn(), col: 29, row: 12, solid: 2 },
  { s: bld('field_farmhouse', 96) ?? house(), col: 7, row: 12, solid: 2 },
  { s: bld('field_silo', 108) ?? siloCluster(), col: 35, row: 11, solid: 2 },
  { s: bld('field_silo', 92) ?? silo(), col: 12, row: 11, solid: 2 },
  { s: bld('field_church', 104) ?? church(), col: 9, row: 22, solid: 3 },
  { s: bld('field_watertower', 116) ?? watertower(), col: 25, row: 21, solid: 1 },
  { s: bld('field_windmill', 116) ?? windmill(), col: 32, row: 22, solid: 1 },
  { s: bld('field_farmhouse', 96) ?? house(), col: 16, row: 22, solid: 2 },
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

const big = new Sprite(W, H);
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

// ---- PixelLab Wang terrain (dual-grid, layered) --------------------------
// Three corner-Wang sets share the same dry-prairie grass as their UPPER
// terrain; the feature (road / creek / tall-grass) is the LOWER. Laid on a
// dual grid (each tile sits at the intersection of 4 data cells) so features
// blend seamlessly into the grass. Base draws everywhere; overlays only paint
// tiles that actually touch their feature (skip the all-grass tile, mask 15).
const TILES = join(new URL('..', import.meta.url).pathname, 'assets/tiles-pixellab');
function loadWang(dir: string): Map<number, PNG> {
  const meta = JSON.parse(readFileSync(join(TILES, dir, 'tileset.json'), 'utf8')) as {
    tiles: Array<{ id?: string; name?: string; corners: Record<'NW' | 'NE' | 'SW' | 'SE', string> }>;
  };
  const byMask = new Map<number, PNG>();
  meta.tiles.forEach((t, i) => {
    const fname = `tile_${String(i).padStart(2, '0')}_${t.id ?? t.name ?? i}`.replace(/[^\w]+/g, '_') + '.png';
    const png = PNG.sync.read(readFileSync(join(TILES, dir, fname)));
    const cr = t.corners;
    const bit = (k: 'NW' | 'NE' | 'SW' | 'SE'): number => (cr[k] === 'upper' ? 1 : 0);
    byMask.set((bit('NW') << 3) | (bit('NE') << 2) | (bit('SW') << 1) | bit('SE'), png);
  });
  return byMask;
}
function blitTile(png: PNG, x0: number, y0: number): void {
  for (let y = 0; y < png.height; y++) {
    const py = y0 + y; if (py < 0 || py >= H) continue;
    for (let x = 0; x < png.width; x++) {
      const px = x0 + x; if (px < 0 || px >= W) continue;
      const si = (y * png.width + x) * 4; const a = png.data[si + 3]! / 255; if (a === 0) continue;
      const d = big.get(px, py);
      big.set(px, py, [Math.round(png.data[si]! * a + d[0] * (1 - a)), Math.round(png.data[si + 1]! * a + d[1] * (1 - a)), Math.round(png.data[si + 2]! * a + d[2] * (1 - a)), 255]);
    }
  }
}
/** Dual-grid lay; `skip` drops tiles whose corner mask equals it (overlay = 15, all-grass). */
function layWang(wang: Map<number, PNG>, up: (c: number, r: number) => boolean, skip = -1): void {
  for (let j = 0; j <= ROWS; j++)
    for (let i = 0; i <= COLS; i++) {
      const mask = ((up(i - 1, j - 1) ? 1 : 0) << 3) | ((up(i, j - 1) ? 1 : 0) << 2) | ((up(i - 1, j) ? 1 : 0) << 1) | (up(i, j) ? 1 : 0);
      if (mask === skip) continue;
      const png = wang.get(mask);
      if (png) blitTile(png, i * T - T / 2, j * T - T / 2);
    }
}
const grassRoad = loadWang('field_grass_road');
const grassWater = loadWang('field_grass_water');
const grassTall = loadWang('field_grass_tall');
const isRoad = (c: number, r: number): boolean => inb(c, r) && MAP[r]![c] === 'd';
const isWater = (c: number, r: number): boolean => inb(c, r) && MAP[r]![c] === 'w';
const isTall = (c: number, r: number): boolean => inb(c, r) && MAP[r]![c] === 'T';
// base: grass everywhere, dirt road carved where 'd' (grass is the upper terrain)
layWang(grassRoad, (c, r) => !isRoad(c, r));
// overlays: creek + tall-grass patches, only where they actually appear
layWang(grassWater, (c, r) => !isWater(c, r), 15);
layWang(grassTall, (c, r) => !isTall(c, r), 15);
// darken the border ring so the map reads as fenced-in by dense scrub
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    if (MAP[r]![c] !== '#') continue;
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) {
      const p = big.get(c * T + x, r * T + y);
      big.set(c * T + x, r * T + y, [Math.round(p[0] * 0.62), Math.round(p[1] * 0.62), Math.round(p[2] * 0.62), 255]);
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
      { char: 'odell', col: 13, row: 13, name: 'Quartermaster Odell', shop: 'field', lines: ['Topside supply. Nodes, kits, and I buy salvage by the pound.'] },
      { char: 'rivet', col: 16, row: 13, name: 'Scrapper Rivet', lines: [
        'First run topside? Keep off the dead houses. Some flicker — there, then gone. The Static does that.',
        "Co-op Vault stood sealed since my grandfather's day. Funny — somebody cracked it open just last night.",
        'Pick clean, walk soft, never linger. Standing still up here gets you noticed.',
      ] },
      { char: 'bex', col: 9, row: 13, name: 'Picker Bex', lines: [
        'The tall grass is crawling with little ones — toasters, fans, a vacuum that spins like a dust devil!',
        'Weaken one first, then spend a storage node. Rush the catch and they rage and bolt.',
        'Odessa buzzed my handheld about some Manifest to fill. You get the assignment too?',
      ] },
      { char: 'mesa', col: 12, row: 23, name: 'Old-timer Mesa', lines: [
        'This was cattle country, kid, long before the bunkers. Squint and you can still read the brands.',
        "That church bell hasn't rung in five hundred years. Some folks still wait on it.",
        "Grass grows, water runs. The world's broken — and it's trying awful hard to heal.",
      ] },
    ],
    trainers: [
      { char: 'cricket', col: 24, row: 18, facing: 'w', name: 'Runner Cricket', range: 4, team: [{ num: 10, level: 4 }], bark: 'Runner Cricket: First one topside wins! ...usually.' },
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
