/**
 * Ohmstead underground colony — terrain + assets (npm run gen:underground).
 * Grid method, shared palette. The opening stage, reimagined as a carved-out
 * cavern colony (ref: moody dungeon-town): organic rock walls, warm cobble
 * floors, grey stone chambers linked by winding paths, glowing Resonance
 * crystal clusters, amber lamps, and water pools — with the colony's machine
 * tech (Grandpa's Bench, consoles, tanks, the lift up to the Field) set into
 * the stone. Real additive lighting sells the glow. Composes
 * public/world/ohmstead.png + .json (collision, exits, interacts, npcs, spawn).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { scatterClutter } from './scatter';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

const T = 32;
const COLS = 36;
const ROWS = 24;
const W = COLS * T;
const H = ROWS * T;

// ---- tiles (32×32) -------------------------------------------------------
/** Dark organic cavern rock — the colony is dug out of this. */
function rockTile(seed: number): Sprite {
  const g = new Grid(T, T);
  const rng = new Rng(seed);
  g.rect(0, 0, T, T, 'd');
  for (let k = 0; k < 5; k++) g.ellipse(rng.int(3, T - 4), rng.int(3, T - 4), rng.int(2, 4), rng.int(2, 3), 'D');
  for (let k = 0; k < 3; k++) {
    const x0 = rng.int(2, T - 3);
    const y0 = rng.int(2, T - 3);
    g.line(x0, y0, x0 + rng.int(-6, 6), y0 + rng.int(-6, 6), 'D'); // cracks
  }
  for (let k = 0; k < 9; k++) g.set(rng.int(0, T - 1), rng.int(0, T - 1), rng.chance(55) ? 'D' : 'N');
  return g.render();
}

/** Warm earthen cobblestone floor (brick-offset stones over dark mortar). */
function dirtTile(seed: number): Sprite {
  const g = new Grid(T, T);
  const rng = new Rng(seed);
  g.rect(0, 0, T, T, 'Q'); // mortar
  let row = 0;
  for (let y = -1; y < T; y += 6, row++) {
    const off = row % 2 ? -3 : 0;
    for (let x = off; x < T; x += 7) {
      g.ellipse(x + 3, y + 3, 3, 2, 'M'); // stone body
      g.hline(x + 1, y + 1, 4, 'T'); // lit top
      g.set(x + 3, y + 4, 'Q'); // contact shade
    }
  }
  for (let k = 0; k < 7; k++) g.set(rng.int(0, T - 1), rng.int(0, T - 1), rng.chance(50) ? 'Q' : 'T');
  return g.render();
}

/** Grey stone block wall (the chamber walls). */
function wallTile(): Sprite {
  const g = new Grid(T, T);
  g.box(0, 0, T, T, 'l', 'a', 'A');
  let r = 0;
  for (let y = 0; y < T; y += 8, r++) {
    g.hline(0, y, T, 'A'); // mortar course
    g.hline(0, y + 1, T, 'l'); // lit under-edge
    const off = r % 2 ? 8 : 0;
    for (let x = off; x < T; x += 16) g.vline(x, y + 2, 6, 'A'); // head joints
  }
  return g.render();
}

/** Deep cave water with teal glints. */
function waterTile(seed: number): Sprite {
  const g = new Grid(T, T);
  const rng = new Rng(seed);
  g.rect(0, 0, T, T, 'C');
  for (let k = 0; k < 5; k++) g.hline(rng.int(2, T - 7), rng.int(2, T - 2), rng.int(3, 6), 'c');
  for (let k = 0; k < 3; k++) g.hline(rng.int(2, T - 5), rng.int(2, T - 2), rng.int(2, 4), '7');
  return g.render();
}

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

/** Mossy patch for water edges. */
function moss(seed: number): Sprite {
  const g = new Grid(14, 7);
  const rng = new Rng(seed);
  g.ellipse(7, 4, 6, 2, 'g');
  for (let k = 0; k < 6; k++) g.set(rng.int(1, 12), rng.int(2, 4), 'F');
  for (let k = 0; k < 4; k++) g.set(rng.int(1, 12), rng.int(3, 5), 'f');
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
const rooms: Record<string, Room> = {
  garage: { x: 3, y: 2, w: 12, h: 8 }, // Grandpa's garage (the Bench)
  quarters: { x: 16, y: 1, w: 9, h: 6 }, // living quarters
  storage: { x: 26, y: 3, w: 9, h: 9 }, // stores + shelves
  hub: { x: 16, y: 9, w: 8, h: 7 }, // central plaza
  works: { x: 3, y: 12, w: 13, h: 10 }, // machinery / tanks
  yard: { x: 24, y: 13, w: 11, h: 8 }, // the Yard — ore cart, scrap
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
/** L-shaped dirt corridor (carves doorways where it crosses stone walls). */
function corridor(x0: number, y0: number, x1: number, y1: number, w = 2): void {
  const xa = Math.min(x0, x1);
  const xb = Math.max(x0, x1);
  for (let x = xa; x <= xb; x++) for (let j = 0; j < w; j++) carve(x, y0 + j);
  const ya = Math.min(y0, y1);
  const yb = Math.max(y0, y1);
  for (let y = ya; y <= yb; y++) for (let i = 0; i < w; i++) carve(x1 + i, y);
}
function pool(cx: number, cy: number, rx: number, ry: number): void {
  for (let y = cy - ry; y <= cy + ry; y++)
    for (let x = cx - rx; x <= cx + rx; x++) {
      const nx = (x - cx) / rx;
      const ny = (y - cy) / ry;
      if (nx * nx + ny * ny <= 1 && inb(x, y) && MAP[y]![x] === '#') MAP[y]![x] = '~';
    }
}

for (const r of Object.values(rooms)) carveRoom(r);
// winding paths linking each chamber's interior to the central hub
corridor(13, 7, 18, 11); // garage → hub
corridor(20, 4, 20, 11); // quarters → hub
corridor(27, 8, 22, 11); // storage → hub
corridor(14, 16, 18, 13); // works → hub
corridor(25, 16, 21, 13); // yard → hub
corridor(19, 15, 19, 20); // hub → lift alcove (south)
carve(18, 19);
carve(20, 19);
carve(18, 20);
carve(20, 20); // lift apron
// water pools tucked into the rock margins
pool(2, 21, 3, 2);
pool(33, 22, 3, 2);
pool(34, 13, 2, 3);

// ---- raster --------------------------------------------------------------
const ROCK = [rockTile(1), rockTile(2), rockTile(3), rockTile(4), rockTile(5)];
const DIRT = [dirtTile(11), dirtTile(12), dirtTile(13), dirtTile(14)];
const WATER = [waterTile(21), waterTile(22)];
const WALL = wallTile();

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

const trng = new Rng(99);
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const t =
      ch === '=' ? WALL : ch === '~' ? WATER[trng.int(0, 1)]! : ch === '.' ? DIRT[trng.int(0, 3)]! : ROCK[trng.int(0, 4)]!;
    blit(t, c * T, r * T, false);
  }

// organic edge: crumble dark rock pixels along dirt↔rock seams
const erng = new Rng(7);
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    if (MAP[r]![c] !== '.') continue;
    const sides: Array<[number, number, number, number]> = [
      [0, -1, c * T, r * T], // up edge
      [0, 1, c * T, r * T + T - 1], // down
      [-1, 0, c * T, r * T], // left
      [1, 0, c * T + T - 1, r * T], // right
    ];
    for (const [dx, dy, ex, ey] of sides) {
      if (MAP[r + dy]?.[c + dx] !== '#') continue;
      for (let i = 0; i < T; i++) {
        if (!erng.chance(38)) continue;
        const x = dx === 0 ? ex + i : ex;
        const y = dy === 0 ? ey + i : ey;
        const depth = erng.int(0, 2);
        const px = x + (dx === 1 ? -depth : dx === -1 ? depth : 0);
        const py = y + (dy === 1 ? -depth : dy === -1 ? depth : 0);
        big.set(px, py, [28, 20, 12, 255]);
      }
    }
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
  // garage — Grandpa's Bench + console + Banjo in the corner
  { s: bench(), col: 5, row: 8, solid: true, glow: { r: 16, col: [30, 60, 110] } },
  { s: banjo(), col: 9, row: 8, solid: true, glow: { r: 16, col: [120, 80, 24] } },
  { s: console_(), col: 13, row: 8, solid: true },
  { s: crate(), col: 12, row: 4 },
  // quarters — cots + a crate
  { s: bed(), col: 18, row: 3, solid: true },
  { s: bed(), col: 22, row: 3, solid: true },
  { s: crate(), col: 20, row: 5 },
  // storage — shelves + crates
  { s: shelf(), col: 29, row: 5, solid: true },
  { s: crate(), col: 28, row: 9 },
  { s: barrel(), col: 31, row: 9 },
  { s: crate(), col: 32, row: 9 },
  // works — tanks + machinery
  { s: tank(), col: 5, row: 16, solid: true, glow: { r: 14, col: [20, 70, 60] } },
  { s: tank(), col: 8, row: 16, solid: true },
  { s: console_(), col: 12, row: 16, solid: true },
  { s: barrel(), col: 5, row: 20 },
  { s: barrel(), col: 13, row: 20 },
  // yard — ore cart + scrap
  { s: minecart(), col: 28, row: 17, solid: true },
  { s: crate(), col: 26, row: 18 },
  { s: barrel(), col: 32, row: 18 },
  // hub — the monument
  { s: pedestal(), col: 19, row: 13, solid: true, glow: { r: 30, col: [40, 80, 150] } },
  // the lift up to the Field
  { s: lift(), col: 18, row: 21, solid: true, glow: { r: 12, col: [40, 30, 12] } },
];

// crystal clusters tucked along the rock margins + grottos
const crystalSpots: Array<[number, number, CrystalKind]> = [
  [2, 6, 'blue'],
  [13, 11, 'violet'],
  [26, 2, 'teal'],
  [33, 6, 'blue'],
  [2, 15, 'violet'],
  [15, 8, 'teal'],
  [24, 12, 'blue'],
  [34, 17, 'violet'],
  [3, 22, 'teal'],
  [32, 22, 'blue'],
  [20, 22, 'violet'],
  [9, 11, 'teal'],
];
for (const [col, row, kind] of crystalSpots)
  objs.push({ s: crystal(kind, cseed++), col, row, glow: { r: 22, col: GLOW_C[kind] } });

// lamps along the paths and doorways
const lampSpots: Array<[number, number]> = [
  [17, 5],
  [21, 7],
  [19, 11],
  [16, 16],
  [23, 16],
  [19, 18],
  [15, 5],
  [25, 7],
  [10, 13],
  [28, 14],
];
for (const [col, row] of lampSpots) objs.push({ s: lamp(), col, row, glow: { r: 26, col: [120, 70, 22] } });

// mossy fringes on the water pools
for (const [col, row, sd] of [
  [2, 19, 1],
  [33, 20, 2],
  [34, 11, 3],
] as Array<[number, number, number]>)
  objs.push({ s: moss(sd), col, row });

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

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'lived_in', biome: 'underground', seed: 4207, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || ch === '=' || ch === '~' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'ohmstead.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || ch === '=' || ch === '~' || extraSolid.has(`${c},${r}`);
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
    spawn: { x: 6, y: 5 }, // in the garage, by the Bench
    exits: [{ x: 19, y: 19, scene: 'elevator' }], // step onto the lift apron → up to the Field
    interacts: [
      { x: 5, y: 7, kind: 'bench' }, // Eli's Bench
      { x: 9, y: 7, kind: 'banjo' }, // Banjo, the old Jukeboxer
      { x: 13, y: 7, kind: 'eli' }, // a photo + the logbook (E.V.)
      { x: 18, y: 3, kind: 'bed' }, // the kid's bunk — sleep here after the supply run (the night-call beat)
    ],
    // placards that name each chamber, so the colony reads as a place, not a maze
    signs: [
      { col: 4, row: 3, text: "ELI'S GARAGE — the Bench, and everything he left you." },
      { col: 17, row: 2, text: 'THE BUNKS — yours is the one by the wall.' },
      { col: 27, row: 4, text: 'STORES — rations, nodes, and salvage. Hands off without a chit.' },
      { col: 17, row: 10, text: 'OHMSTEAD COMMONS — the heart of the colony.' },
      { col: 4, row: 13, text: 'THE WORKS — water, power, and the air that keeps us all breathing.' },
      { col: 25, row: 14, text: 'THE YARD — scrap, ore, and the cart up to the surface line.' },
    ],
    npcs: [
      { char: 'npc_elder', col: 7, row: 6, name: 'Grandma Mabel', lines: [
        'Built from Eli\'s parts, woken at Eli\'s bench. That makes it family now. Mind it well.',
        'Your grandfather could coax a song out of a dead radio. Banjo still hums it, some nights.',
        "Boone wants you topside at first light. Come back to me, you hear? The both of you.",
      ] },
      { char: 'npc_rancher', col: 21, row: 12, name: 'Cass', lines: [
        "They won't let me up the lift. 'Too young,' Boone says. You're barely older than me!",
        'Bring me back something from the surface. A bottle cap — anything that saw the sky.',
        "Everyone's spooked by the night signal. Pretend you're not, and I will too.",
      ] },
    ],
  }),
);

console.log(`ohmstead: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} objects, cavern colony`);
