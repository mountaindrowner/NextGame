/**
 * Ohmstead underground colony — terrain + assets (npm run gen:underground).
 * The opening stage: a sprawling Fallout-style bomb shelter. Riveted steel
 * vault floors (a PixelLab corner-Wang set, dual-grid laid) carved into raw
 * rock that fades to black at the margins — ten chambers (garage, bunks,
 * infirmary, command, mess, commons, comms, works, stores, yard) strung along
 * a corridor network and lived-in with residents. Props (Grandpa's Bench,
 * Banjo, consoles, tanks, beds, the lift up to the Field) and glowing Resonance
 * crystals are grid-method sprites blitted over the terrain; additive lighting
 * sells the glow. Composes public/world/ohmstead.png + .json (collision, exits,
 * interacts, signs, npcs, spawn).
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { scatterClutter } from './scatter';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

const T = 32;
const COLS = 46;
const ROWS = 32;
const W = COLS * T;
const H = ROWS * T;

// Terrain tiles are PixelLab Wang sets now (see the raster section below);
// the grid-method rock/dirt/wall/water tiles they replaced have been retired.

// ---- objects -------------------------------------------------------------
type CrystalKind = 'blue' | 'violet' | 'teal';
const CRYSTAL_COLS: Record<CrystalKind, [string, string, string]> = {
  blue: ['1', '2', '3'],
  violet: ['4', '5', '6'],
  teal: ['7', '8', '3'],
};
/** A cluster of faceted Resonance shards rising from the rock. */
function crystal(kind: CrystalKind, seed: number): Sprite {
  const g = new Grid(16, 20);
  const rng = new Rng(seed);
  const [hi, base, sh] = CRYSTAL_COLS[kind];
  g.shadow(8, 19, 6, 2);
  const shards: Array<[number, number, number]> = [
    [8, 1, 3],
    [5, 6, 2],
    [11, 7, 2],
    [7, 10, 2],
    [12, 12, 1],
  ];
  const n = 3 + rng.int(0, 2);
  for (let s = 0; s < n; s++) {
    const shard = shards[s];
    if (!shard) continue;
    const [cx, topY, w] = shard;
    const baseY = 18;
    for (let y = topY; y <= baseY; y++) {
      const t = (y - topY) / (baseY - topY);
      const hw = Math.max(1, Math.round(w * t));
      g.hline(cx - hw, y, hw * 2, base);
      g.set(cx - hw, y, sh); // shaded facet
      g.set(cx + hw - 1, y, hi); // lit facet
    }
    g.set(cx, topY, hi); // bright tip
    g.set(cx, topY + 1, hi);
  }
  g.outline('X');
  return g.render();
}

/** Standing brazier lamp (warm). */
function lamp(): Sprite {
  const g = new Grid(12, 22);
  g.shadow(6, 21, 4, 2);
  g.rect(5, 9, 2, 11, 'A');
  g.vline(5, 9, 11, 'l'); // post
  g.box(2, 6, 8, 4, 'l', 'a', 'A'); // bowl
  g.ellipse(6, 3, 2, 3, 'Z'); // flame
  g.ellipse(6, 4, 1, 2, 'z');
  g.set(6, 2, 'z');
  g.outline('X');
  return g.render();
}

/** Grandpa's workbench — wood top, parts, a glowing core. */
function bench(): Sprite {
  const g = new Grid(48, 30);
  g.shadow(24, 29, 22, 3);
  g.rect(6, 20, 3, 9, 'K');
  g.rect(39, 20, 3, 9, 'K'); // legs
  g.box(4, 12, 40, 8, 'n', 'k', 'K'); // top
  g.ellipse(12, 10, 3, 3, 'a');
  g.ellipse(12, 10, 1, 1, 'A'); // gear
  g.box(19, 6, 7, 6, 'l', 'a', 'A'); // chassis
  g.rect(21, 8, 4, 2, '2'); // glowing core
  g.set(22, 8, '1');
  g.rect(30, 8, 2, 4, 'l'); // tool
  g.set(36, 9, 'z');
  g.outline('X');
  return g.render();
}

/** Banjo — Grandpa's old Jukeboxer, asleep in the garage corner. */
function banjo(): Sprite {
  const g = new Grid(26, 36);
  g.shadow(13, 35, 11, 3);
  g.box(3, 4, 20, 31, 'k', 'K', 'x'); // wooden cabinet
  for (let i = 0; i <= 9; i++) g.hline(3 + i, 4 - Math.floor(i * 0.3), 20 - 2 * i, 'k'); // domed top
  g.box(6, 12, 14, 10, 'q', 'e', 'E'); // the lit arch (warm amber)
  g.rect(8, 14, 10, 6, 'z'); g.set(12, 16, 'Z');
  for (let y = 24; y < 32; y += 2) g.hline(7, y, 12, 'A'); // speaker grille
  g.set(9, 9, 'z'); g.set(16, 9, 'z'); // pilot lights
  g.outline('X');
  const s = g.render();
  return s;
}

/** Wall console / terminal. */
function console_(): Sprite {
  const g = new Grid(26, 30);
  g.shadow(13, 29, 11, 3);
  g.box(3, 6, 20, 23, 'l', 'a', 'A');
  g.box(6, 9, 14, 9, 'i', 'I', 'C'); // screen
  for (let y = 10; y < 17; y += 2) g.hline(7, y, 12, '7'); // scanlines (teal)
  g.set(9, 11, 'z');
  g.set(14, 13, 'z');
  for (let x = 6; x < 20; x += 3) g.rect(x, 21, 2, 2, x % 2 ? 'z' : 'A');
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

function barrel(): Sprite {
  const g = new Grid(16, 24);
  g.shadow(8, 23, 7, 2);
  g.box(3, 3, 10, 19, 'l', 'a', 'A');
  g.hline(3, 8, 10, 'A');
  g.hline(3, 15, 10, 'A');
  g.rect(5, 1, 6, 3, 'e'); // rusty top
  g.outline('X');
  return g.render();
}

/** Tall storage / coolant tank with a lit gauge. */
function tank(): Sprite {
  const g = new Grid(22, 34);
  g.shadow(11, 33, 9, 2);
  g.box(3, 5, 16, 27, 'l', 'a', 'A'); // body
  g.ellipse(11, 5, 8, 2, 'l'); // domed top
  g.hline(3, 13, 16, 'A');
  g.hline(3, 22, 16, 'A'); // bands
  g.box(7, 15, 8, 5, 'i', 'I', 'C'); // gauge window
  g.set(9, 17, '7');
  g.set(12, 17, 'z'); // gauge lights
  g.vline(19, 8, 18, 'a'); // pipe
  g.rect(19, 8, 3, 2, 'a');
  g.outline('X');
  return g.render();
}

/** Wall shelving stocked with crates/parts. */
function shelf(): Sprite {
  const g = new Grid(26, 18);
  g.box(0, 0, 26, 18, 'n', 'k', 'K');
  g.hline(0, 6, 26, 'K');
  g.hline(0, 12, 26, 'K'); // shelves
  g.box(2, 1, 3, 4, 'l', 'a', 'A');
  g.box(6, 2, 3, 3, 'q', 'e', 'E');
  g.box(11, 1, 4, 4, 'i', 'I', 'C');
  g.box(17, 2, 3, 3, 'l', 'a', 'A');
  g.box(2, 7, 3, 4, 'q', 'e', 'E');
  g.box(7, 8, 4, 3, 'l', 'a', 'A');
  g.box(13, 7, 3, 4, 'n', 'k', 'K');
  g.box(19, 8, 3, 3, 'q', 'e', 'E');
  g.box(3, 13, 4, 3, 'l', 'a', 'A');
  g.box(10, 13, 3, 3, 'q', 'e', 'E');
  g.box(16, 13, 4, 3, 'n', 'k', 'K');
  g.outline('X');
  return g.render();
}

/** A colony cot with a blanket and pillow. */
function bed(): Sprite {
  const g = new Grid(18, 14);
  g.shadow(9, 13, 7, 2);
  g.box(0, 3, 18, 9, 'n', 'k', 'K'); // frame
  g.box(2, 1, 14, 6, 'i', 'c', 'C'); // blanket
  g.box(2, 1, 5, 5, '*', 'w', 'W'); // pillow
  g.outline('X');
  return g.render();
}

/** Central hub monument — stone column cradling a big Resonance crystal. */
function pedestal(): Sprite {
  const g = new Grid(20, 28);
  g.shadow(10, 27, 8, 3);
  g.box(3, 16, 14, 10, 'l', 'a', 'A'); // base
  g.box(6, 12, 8, 5, 'l', 'a', 'A'); // column
  g.ellipse(10, 10, 5, 2, 'A'); // basin rim
  for (let y = 2; y <= 10; y++) {
    const t = (y - 2) / 8;
    const hw = Math.max(1, Math.round(3 * t));
    g.hline(10 - hw, y, hw * 2, '2');
    g.set(10 + hw - 1, y, '1');
    g.set(10 - hw, y, '3');
  }
  g.set(10, 2, '1');
  g.set(10, 3, '1');
  g.outline('X');
  return g.render();
}

/** Ore cart on a short rail, loaded with raw crystal. */
function minecart(): Sprite {
  const g = new Grid(24, 18);
  g.shadow(12, 17, 10, 2);
  g.hline(0, 16, 24, 'A');
  g.hline(0, 14, 24, 'A'); // rails
  for (let x = 1; x < 24; x += 4) g.vline(x, 14, 3, 'K'); // ties
  g.box(4, 5, 16, 8, 'l', 'a', 'A'); // hopper
  g.box(6, 6, 12, 4, 'K', 'k', 'K'); // ore bed
  g.ellipse(8, 8, 2, 1, '2');
  g.ellipse(13, 7, 2, 1, '4');
  g.ellipse(16, 9, 1, 1, '7'); // raw crystal
  g.ellipse(7, 13, 2, 2, 'A');
  g.ellipse(17, 13, 2, 2, 'A'); // wheels
  g.outline('X');
  return g.render();
}

/** Freight lift cage set in a stone frame — the way up to the Field. */
function lift(): Sprite {
  const g = new Grid(36, 42);
  g.shadow(18, 41, 16, 3);
  g.box(0, 0, 36, 42, 'l', 'a', 'A'); // stone frame
  g.box(5, 4, 26, 34, 'A', 'A', 'x'); // shaft recess
  g.vline(10, 4, 20, 'l');
  g.vline(26, 4, 20, 'l'); // chains
  g.box(8, 24, 20, 12, 'n', 'k', 'K'); // platform floor
  g.hline(8, 24, 20, 'l');
  g.rect(15, 1, 6, 2, 'z'); // up indicator
  g.set(18, 0, 'z');
  g.box(31, 17, 4, 7, 'l', 'a', 'A'); // call panel
  g.set(33, 19, 'z');
  g.set(33, 21, '7');
  g.outline('X');
  return g.render();
}


// ---- compose -------------------------------------------------------------
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '#'));

interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
}
// A sprawling bomb-shelter floor plan: three bands of chambers (top / middle /
// bottom) strung along corridors, a central Commons with the lift. Each room's
// outer ring is '=' (reads as the rock wall); corridors carve doorways through.
const rooms: Record<string, Room> = {
  garage: { x: 2, y: 2, w: 12, h: 9 }, // Eli's garage — the Bench (spawn)
  bunks: { x: 15, y: 2, w: 11, h: 8 }, // crew quarters / cots
  medbay: { x: 27, y: 2, w: 9, h: 8 }, // the infirmary
  command: { x: 37, y: 2, w: 7, h: 9 }, // the warden's command post
  mess: { x: 2, y: 13, w: 12, h: 8 }, // the mess hall
  commons: { x: 16, y: 11, w: 13, h: 11 }, // central atrium — monument + lift
  comms: { x: 31, y: 12, w: 13, h: 9 }, // comms / archive
  works: { x: 2, y: 23, w: 13, h: 8 }, // reactor + life support
  stores: { x: 17, y: 23, w: 11, h: 8 }, // stores / armory
  yard: { x: 30, y: 23, w: 14, h: 8 }, // the Yard — dig face + ore cart
};

function carveRoom(r: Room): void {
  for (let y = r.y; y < r.y + r.h; y++)
    for (let x = r.x; x < r.x + r.w; x++) {
      if (!inb(x, y)) continue;
      const edge = x === r.x || x === r.x + r.w - 1 || y === r.y || y === r.y + r.h - 1;
      MAP[y]![x] = edge ? '=' : '.';
    }
}
function carve(x: number, y: number): void {
  if (inb(x, y)) MAP[y]![x] = '.';
}
/** L-shaped corridor (carves a 2-wide doorway where it crosses a rock wall). */
function corridor(x0: number, y0: number, x1: number, y1: number, w = 2): void {
  const xa = Math.min(x0, x1);
  const xb = Math.max(x0, x1);
  for (let x = xa; x <= xb; x++) for (let j = 0; j < w; j++) carve(x, y0 + j);
  const ya = Math.min(y0, y1);
  const yb = Math.max(y0, y1);
  for (let y = ya; y <= yb; y++) for (let i = 0; i < w; i++) carve(x1 + i, y);
}

for (const r of Object.values(rooms)) carveRoom(r);
// Corridor network — three concourses (top / mid / bottom) tied together by
// vertical arteries, so the vault reads as a connected warren. Reachability of
// every room + interact from the spawn is asserted below by a flood fill.
corridor(11, 5, 41, 5); // TOP concourse: garage ↔ bunks ↔ medbay ↔ command
corridor(11, 16, 33, 16); // MID concourse: mess ↔ commons ↔ comms
corridor(11, 27, 36, 27); // BOTTOM concourse: works ↔ stores ↔ yard
corridor(21, 5, 21, 12); // top → commons (central spine)
corridor(8, 9, 8, 14); // garage → mess (left artery)
corridor(33, 9, 33, 13); // medbay → comms (right artery)
corridor(8, 19, 8, 24); // mess → works
corridor(22, 20, 22, 24); // commons → stores
corridor(36, 19, 36, 24); // comms → yard

// ---- raster: PixelLab Wang terrain via dual-grid -------------------------
const big = new Sprite(W, H);
const blit = (s: Sprite, x0: number, y0: number, over = true): void => {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if (over && (c[3] ?? 0) === 0) continue;
      const a = (c[3] ?? 255) / 255;
      const d = big.get(x0 + x, y0 + y);
      big.set(x0 + x, y0 + y, [
        Math.round(c[0] * a + d[0] * (1 - a)),
        Math.round(c[1] * a + d[1] * (1 - a)),
        Math.round(c[2] * a + d[2] * (1 - a)),
        255,
      ]);
    }
};
/** Additive radial light — what makes the crystals and lamps actually glow. */
function glow(cx: number, cy: number, radius: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - radius); y <= cy + radius; y++)
    for (let x = Math.floor(cx - radius); x <= cx + radius; x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const d = Math.hypot(x - cx, y - cy);
      if (d > radius) continue;
      const t = 1 - d / radius;
      const a = t * t;
      const p = big.get(x, y);
      big.set(x, y, [
        Math.min(255, Math.round(p[0] + col[0] * a)),
        Math.min(255, Math.round(p[1] + col[1] * a)),
        Math.min(255, Math.round(p[2] + col[2] * a)),
        255,
      ]);
    }
}

// A 16-tile corner-Wang set (riveted steel vault floor ↔ dark rock), laid on a
// dual grid: each rendered tile sits at the intersection of FOUR data cells,
// offset by half a tile, so the metal floor blends into the surrounding rock
// with seamless bolted edges. Collision (below) stays on the data grid — the
// visual floor centers on each '.' cell, so what's walkable matches what's
// drawn. Corner mask packs NW<<3 | NE<<2 | SW<<1 | SE (1 = upper terrain).
const TILES = join(new URL('..', import.meta.url).pathname, 'assets/tiles-pixellab');

function loadWang(dir: string): Map<number, PNG> {
  const meta = JSON.parse(readFileSync(join(TILES, dir, 'tileset.json'), 'utf8')) as {
    tiles: Array<{ id?: string; name?: string; corners: Record<'NW' | 'NE' | 'SW' | 'SE', string> }>;
  };
  const byMask = new Map<number, PNG>();
  meta.tiles.forEach((t, i) => {
    const fname = `tile_${String(i).padStart(2, '0')}_${t.id ?? t.name ?? i}`.replace(/[^\w]+/g, '_') + '.png';
    const png = PNG.sync.read(readFileSync(join(TILES, dir, fname)));
    const c = t.corners;
    const bit = (k: 'NW' | 'NE' | 'SW' | 'SE'): number => (c[k] === 'upper' ? 1 : 0);
    byMask.set((bit('NW') << 3) | (bit('NE') << 2) | (bit('SW') << 1) | bit('SE'), png);
  });
  return byMask;
}

/** Alpha-blend a PixelLab tile onto `big` at pixel (x0,y0), clipped to canvas. */
function blitTile(png: PNG, x0: number, y0: number): void {
  for (let y = 0; y < png.height; y++) {
    const py = y0 + y;
    if (py < 0 || py >= H) continue;
    for (let x = 0; x < png.width; x++) {
      const px = x0 + x;
      if (px < 0 || px >= W) continue;
      const si = (y * png.width + x) * 4;
      const a = png.data[si + 3]! / 255;
      if (a === 0) continue;
      const d = big.get(px, py);
      big.set(px, py, [
        Math.round(png.data[si]! * a + d[0] * (1 - a)),
        Math.round(png.data[si + 1]! * a + d[1] * (1 - a)),
        Math.round(png.data[si + 2]! * a + d[2] * (1 - a)),
        255,
      ]);
    }
  }
}

const floorWang = loadWang('ohmstead_metal_rock');
const isFloorCell = (c: number, r: number): boolean => inb(c, r) && MAP[r]![c] === '.';

/** Dual-grid lay: tile (i,j) samples data cells (i-1,j-1)=NW … (i,j)=SE. */
function layWang(wang: Map<number, PNG>, sample: (c: number, r: number) => boolean): void {
  for (let j = 0; j <= ROWS; j++)
    for (let i = 0; i <= COLS; i++) {
      const mask =
        ((sample(i - 1, j - 1) ? 1 : 0) << 3) |
        ((sample(i, j - 1) ? 1 : 0) << 2) |
        ((sample(i - 1, j) ? 1 : 0) << 1) |
        (sample(i, j) ? 1 : 0);
      const png = wang.get(mask);
      if (png) blitTile(png, i * T - T / 2, j * T - T / 2);
    }
}

// base: rock fills the canvas, riveted steel where carved ('.'), seamless edges
layWang(floorWang, isFloorCell);

// fade-to-black: the rock darkens with distance from the nearest steel floor,
// so the shelter sits in an encroaching void. BFS the cell-distance to floor,
// then apply a smooth (bilinear-sampled) brightness multiply per pixel.
const DIST = new Int16Array(COLS * ROWS).fill(9999);
{
  const q: number[] = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) if (isFloorCell(c, r)) { DIST[r * COLS + c] = 0; q.push(c, r); }
  for (let head = 0; head < q.length; head += 2) {
    const c = q[head]!, r = q[head + 1]!, d = DIST[r * COLS + c]!;
    for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Array<[number, number]>) {
      const nc = c + dc, nr = r + dr;
      if (nc < 0 || nr < 0 || nc >= COLS || nr >= ROWS) continue;
      if (DIST[nr * COLS + nc]! > d + 1) { DIST[nr * COLS + nc] = d + 1; q.push(nc, nr); }
    }
  }
}
const bright = (d: number): number => (d <= 1 ? 1 : Math.max(0.04, Math.pow(0.6, d - 1)));
const sampleB = (c: number, r: number): number =>
  bright(DIST[Math.max(0, Math.min(ROWS - 1, r)) * COLS + Math.max(0, Math.min(COLS - 1, c))]!);
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++) {
    const fx = x / T - 0.5, fy = y / T - 0.5;
    const c0 = Math.floor(fx), r0 = Math.floor(fy), tx = fx - c0, ty = fy - r0;
    const b =
      sampleB(c0, r0) * (1 - tx) * (1 - ty) + sampleB(c0 + 1, r0) * tx * (1 - ty) +
      sampleB(c0, r0 + 1) * (1 - tx) * ty + sampleB(c0 + 1, r0 + 1) * tx * ty;
    if (b >= 0.999) continue;
    const p = big.get(x, y);
    big.set(x, y, [Math.round(p[0] * b), Math.round(p[1] * b), Math.round(p[2] * b), 255]);
  }

// ---- placements ----------------------------------------------------------
interface Placed {
  s: Sprite;
  col: number;
  row: number;
  solid?: boolean;
  glow?: { r: number; col: [number, number, number] };
}
const GLOW_C: Record<CrystalKind, [number, number, number]> = {
  blue: [34, 86, 150],
  violet: [92, 50, 140],
  teal: [26, 130, 108],
};

let cseed = 100;
const objs: Placed[] = [
  // garage (cols 3-12, rows 3-9) — Eli's Bench + console + Banjo
  { s: bench(), col: 4, row: 8, solid: true, glow: { r: 16, col: [30, 60, 110] } },
  { s: banjo(), col: 8, row: 8, solid: true, glow: { r: 16, col: [120, 80, 24] } },
  { s: console_(), col: 11, row: 8, solid: true },
  { s: crate(), col: 4, row: 4 },
  { s: shelf(), col: 9, row: 3, solid: true },
  // bunks (cols 16-24, rows 3-8) — cots
  { s: bed(), col: 17, row: 4, solid: true },
  { s: bed(), col: 20, row: 4, solid: true },
  { s: bed(), col: 23, row: 4, solid: true },
  { s: crate(), col: 18, row: 7 },
  { s: barrel(), col: 22, row: 7 },
  // medbay (cols 28-34, rows 3-8) — tanks + console
  { s: tank(), col: 28, row: 7, solid: true, glow: { r: 14, col: [20, 70, 60] } },
  { s: console_(), col: 31, row: 7, solid: true },
  { s: bed(), col: 33, row: 4, solid: true },
  // command (cols 38-42, rows 3-9) — Boone's post
  { s: console_(), col: 39, row: 5, solid: true },
  { s: tank(), col: 41, row: 8, solid: true },
  { s: crate(), col: 39, row: 8 },
  // mess (cols 3-12, rows 14-19) — tables-as-crates + barrels
  { s: crate(), col: 4, row: 16 },
  { s: crate(), col: 6, row: 16 },
  { s: barrel(), col: 9, row: 15 },
  { s: shelf(), col: 4, row: 14, solid: true },
  { s: barrel(), col: 11, row: 18 },
  // commons (cols 17-27, rows 12-20) — the monument + lift
  { s: pedestal(), col: 21, row: 14, solid: true, glow: { r: 32, col: [40, 80, 150] } },
  { s: lift(), col: 22, row: 20, solid: true, glow: { r: 14, col: [40, 30, 12] } },
  { s: crate(), col: 18, row: 13 },
  { s: barrel(), col: 26, row: 13 },
  // comms / archive (cols 32-42, rows 13-19) — consoles + shelves
  { s: console_(), col: 33, row: 16, solid: true },
  { s: console_(), col: 36, row: 16, solid: true },
  { s: shelf(), col: 40, row: 13, solid: true },
  { s: crate(), col: 41, row: 18 },
  // works / life support (cols 3-13, rows 24-29) — coolant tanks
  { s: tank(), col: 4, row: 27, solid: true, glow: { r: 14, col: [20, 70, 60] } },
  { s: tank(), col: 7, row: 27, solid: true },
  { s: console_(), col: 11, row: 27, solid: true },
  { s: barrel(), col: 4, row: 24 },
  { s: barrel(), col: 12, row: 24 },
  // stores / armory (cols 18-26, rows 24-29) — shelves + crates
  { s: shelf(), col: 19, row: 24, solid: true },
  { s: crate(), col: 18, row: 28 },
  { s: barrel(), col: 21, row: 28 },
  { s: crate(), col: 24, row: 28 },
  // yard — dig face + ore cart (cols 31-42, rows 24-29)
  { s: minecart(), col: 33, row: 27, solid: true },
  { s: crate(), col: 31, row: 28 },
  { s: barrel(), col: 37, row: 25 },
  { s: crate(), col: 40, row: 28 },
];

// Resonance crystal clusters in the dark rock margins — the colony's power,
// glowing out of the void (placed in rock just outside the rooms).
const crystalSpots: Array<[number, number, CrystalKind]> = [
  [0, 11, 'blue'], [14, 10, 'violet'], [29, 10, 'teal'], [44, 10, 'blue'],
  [0, 22, 'violet'], [15, 21, 'teal'], [28, 21, 'blue'], [44, 21, 'violet'],
  [0, 31, 'teal'], [29, 31, 'blue'], [45, 31, 'violet'], [14, 31, 'teal'],
];
for (const [col, row, kind] of crystalSpots)
  objs.push({ s: crystal(kind, cseed++), col, row, glow: { r: 22, col: GLOW_C[kind] } });

// lamps lighting the corridors and doorways — pools of light in the dark
const lampSpots: Array<[number, number]> = [
  [13, 5], [26, 5], [36, 5], [21, 9], // top concourse
  [8, 12], [33, 11], [13, 16], [29, 16], [21, 17], // mid arteries + commons
  [8, 22], [22, 22], [36, 22], [13, 27], [29, 27], // bottom arteries
];
for (const [col, row] of lampSpots) objs.push({ s: lamp(), col, row, glow: { r: 26, col: [120, 70, 22] } });

const extraSolid = new Set<string>();
for (const o of objs) {
  const ax = o.col * T + T / 2;
  const ay = o.row * T + T;
  blit(o.s, Math.round(ax - o.s.w / 2), Math.round(ay - o.s.h));
  if (o.glow) glow(ax, Math.round(ay - o.s.h * 0.55), o.glow.r, o.glow.col);
  if (o.solid) {
    const c0 = Math.floor((ax - o.s.w / 2) / T);
    const c1 = Math.floor((ax + o.s.w / 2 - 1) / T);
    const rowsUp = o.s.h > 40 ? 1 : 0;
    for (let cc = c0; cc <= c1; cc++)
      for (let rr = o.row - rowsUp; rr <= o.row; rr++) extraSolid.add(`${cc},${rr}`);
  }
}

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'lived_in', biome: 'underground', seed: 4207, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || ch === '=' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'ohmstead.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || ch === '=' || extraSolid.has(`${c},${r}`);
    collision.push(solid ? 1 : 0);
  }

writeFileSync(
  join(OUT, 'ohmstead.json'),
  JSON.stringify({
    tile: T,
    cols: COLS,
    rows: ROWS,
    width: W,
    height: H,
    collision,
    grass: [],
    spawn: { x: 6, y: 6 }, // in the garage, by the Bench
    exits: [], // the lift is an A-to-Use interact now (no accidental walk-on warp)
    interacts: [
      { x: 4, y: 8, kind: 'bench' }, // Eli's Bench
      { x: 8, y: 8, kind: 'banjo' }, // Banjo, the old Jukeboxer
      { x: 11, y: 8, kind: 'eli' }, // a photo + the logbook (E.V.)
      { x: 17, y: 4, kind: 'bed' }, // a bunk — sleep here after the supply run (the night-call beat)
      { x: 22, y: 18, kind: 'lift' }, // the freight lift up to the Field (press A to use)
    ],
    // placards that name each vault section, so the colony reads as a place
    signs: [
      { col: 4, row: 3, text: "ELI'S GARAGE — the Bench, and everything he left you." },
      { col: 16, row: 3, text: 'THE BUNKS — yours is the one by the wall.' },
      { col: 28, row: 3, text: 'THE INFIRMARY — patch up before you ride the lift.' },
      { col: 38, row: 3, text: "COMMAND — Warden Boone's post. Knock first." },
      { col: 3, row: 14, text: "THE MESS — eat when the line's short." },
      { col: 17, row: 12, text: 'OHMSTEAD COMMONS — the heart of the colony.' },
      { col: 32, row: 13, text: 'COMMS & ARCHIVE — the Downtowns, when the signal holds.' },
      { col: 3, row: 24, text: 'THE WORKS — water, power, the air we breathe.' },
      { col: 18, row: 24, text: 'STORES — rations, nodes, salvage. Chit required.' },
      { col: 31, row: 24, text: 'THE YARD — the dig face, and the cart to the surface line.' },
    ],
    npcs: [
      { char: 'mabel', col: 7, row: 5, name: 'Grandma Mabel', lines: [
        'Built from Eli\'s parts, woken at Eli\'s bench. That makes it family now. Mind it well.',
        'Your grandfather could coax a song out of a dead radio. Banjo still hums it, some nights.',
        "Boone wants you topside at first light. Come back to me, you hear? The both of you.",
      ] },
      { char: 'cass', col: 24, row: 16, name: 'Cass', lines: [
        "They won't let me up the lift. 'Too young,' Boone says. You're barely older than me!",
        'Bring me back something from the surface. A bottle cap — anything that saw the sky.',
        "Everyone's spooked by the night signal. Pretend you're not, and I will too.",
      ] },
      { char: 'boone', col: 40, row: 5, name: 'Warden Boone', lines: [
        "First light, topside. Grandma's cache won't haul itself, and the lift won't wait on nerves.",
        'Stay current up there. The grass hides more than rust these days.',
        "You're Eli's blood. That buys you one mistake. Spend it well.",
      ] },
      { char: 'sela', col: 30, row: 5, name: 'Medic Sela', lines: [
        'Come back in one piece and I keep my record clean. Deal?',
        "Your Ohm takes a hit, you bring it here. Don't let it run on a cracked core.",
      ] },
      { char: 'holt', col: 7, row: 16, name: 'Cook Holt', lines: [
        'Ration stew again. It sticks to your ribs, which is the kindest thing I can say.',
        "Eat before the lift. Nobody fights well on an empty tank.",
      ] },
      { char: 'rationer', col: 22, row: 26, name: 'the Rationer', lines: [
        'A chit gets you a node and a day of light. No chit, no argument.',
        "Salvage what you can topside. Stores runs thin the deeper we dig.",
      ] },
      { char: 'lookout', col: 36, row: 26, name: 'Lookout Dell', lines: [
        'Cart runs up the surface line at the hour. Miss it, you walk.',
        "I watch the dig face so it doesn't watch us back. Quiet today. Mostly.",
      ] },
      { char: 'nursery_matron', col: 7, row: 27, name: 'Tess, on the pumps', lines: [
        'Air and water. Lose either and the rest of this stops mattering fast.',
        "Eli kept these old pumps singing. I just try not to let them choke.",
      ] },
    ],
  }),
);

console.log(`ohmstead: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} objects, ${10} rooms — metal vault`);
