/**
 * Ohmstead underground colony — terrain + assets (npm run gen:underground).
 * Grid method, shared palette. The opening stage: industrial bunker corridors,
 * Grandpa's garage with the Bench, the elevator up to the Field. Composes
 * public/world/ohmstead.png + .json (collision, exits, placements, npcs,
 * spawn). Part of the "do the stages" build, starting underground.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

const T = 32;

// ---- tiles (32×32) -------------------------------------------------------
function floorTile(seed: number): Sprite {
  const g = new Grid(T, T);
  g.rect(0, 0, T, T, 'A'); // dark steel base
  const rng = new Rng(seed);
  // plate seams
  g.hline(0, 0, T, 'x');
  g.vline(0, 0, T, 'x');
  g.hline(0, 16, T, 'x');
  g.vline(16, 0, T, 'x');
  // rivets at plate corners
  for (const [x, y] of [[2, 2], [14, 2], [2, 14], [14, 14], [18, 18], [30, 30]] as Array<[number, number]>) g.set(x, y, 'a');
  for (let i = 0; i < 8; i++) g.set(rng.int(1, 30), rng.int(1, 30), 'a'); // speckle
  return g.render();
}
function wallTile(): Sprite {
  const g = new Grid(T, T);
  g.box(0, 0, T, T, 'l', 'a', 'A'); // riveted panel
  g.hline(0, 0, T, 'l'); // lit top edge
  g.hline(0, T - 2, T, 'A'); // shaded base
  g.vline(16, 2, 28, 'A'); // central seam
  for (const [x, y] of [[4, 4], [27, 4], [4, 27], [27, 27]] as Array<[number, number]>) {
    g.set(x, y, 'l');
    g.set(x + 1, y + 1, 'A');
  }
  return g.render();
}
function voidTile(): Sprite {
  const g = new Grid(T, T);
  g.rect(0, 0, T, T, 'x');
  return g.render();
}

// ---- assets --------------------------------------------------------------
function bench(): Sprite {
  const g = new Grid(48, 30);
  g.shadow(24, 29, 22, 3);
  // legs
  g.rect(6, 20, 3, 9, 'A');
  g.rect(39, 20, 3, 9, 'A');
  // top
  g.box(4, 12, 40, 8, 'n', 'k', 'K');
  // parts strewn: gears, a glowing core, tools
  g.ellipse(12, 10, 3, 3, 'a');
  g.ellipse(12, 10, 1, 1, 'A');
  g.rect(20, 7, 6, 5, 'a'); // a chassis
  g.rect(21, 8, 4, 2, 'z'); // glowing core
  g.rect(30, 9, 2, 3, 'l'); // tool
  g.set(36, 9, 'z');
  g.rect(8, 13, 32, 1, 'n'); // top hi
  g.outline();
  return g.render();
}
function console_(): Sprite {
  const g = new Grid(26, 30);
  g.shadow(13, 29, 11, 3);
  g.box(3, 6, 20, 23, 'l', 'a', 'A');
  g.box(6, 9, 14, 9, 'I', 'i', 'C'); // screen
  for (let y = 10; y < 17; y += 2) g.hline(7, y, 12, 'v'); // scanlines
  g.set(9, 11, 'z');
  g.set(14, 13, 'z');
  for (let x = 6; x < 20; x += 3) g.rect(x, 21, 2, 2, x % 2 ? 'z' : 'A'); // buttons
  g.outline();
  return g.render();
}
function crate(): Sprite {
  const g = new Grid(22, 22);
  g.shadow(11, 21, 9, 2);
  g.box(2, 4, 18, 17, 'n', 'k', 'K');
  g.line(2, 4, 19, 20, 'n');
  g.line(19, 4, 2, 20, 'n'); // X braces
  g.outline();
  return g.render();
}
function barrel(): Sprite {
  const g = new Grid(16, 24);
  g.shadow(8, 23, 7, 2);
  g.box(3, 3, 10, 19, 'l', 'a', 'A');
  g.hline(3, 8, 10, 'A');
  g.hline(3, 15, 10, 'A');
  g.rect(5, 1, 6, 3, 'e'); // rusty top
  g.outline();
  return g.render();
}
function lamp(): Sprite {
  const g = new Grid(14, 16);
  g.rect(6, 0, 2, 6, 'A'); // bracket
  g.box(2, 5, 10, 6, 'z', 'z', 'E'); // amber housing
  g.ellipse(7, 8, 4, 3, 'z');
  g.outline();
  return g.render();
}
function elevator(): Sprite {
  const g = new Grid(40, 44);
  g.shadow(20, 43, 18, 3);
  g.box(2, 2, 36, 40, 'l', 'a', 'A'); // frame
  g.box(7, 6, 26, 34, 'A', 'A', 'x'); // recessed doors
  g.vline(20, 6, 34, 'x'); // door split
  g.vline(19, 6, 34, 'A');
  // call panel + arrow
  g.box(34, 14, 5, 8, 'l', 'a', 'A');
  g.set(36, 16, 'z');
  g.set(36, 18, 'z');
  // up-arrow indicator
  g.rect(18, 3, 4, 1, 'z');
  g.set(20, 1, 'z');
  g.outline();
  return g.render();
}

// ---- compose the colony --------------------------------------------------
// 30×18 cells. '#' wall, '.' floor, ' ' void.
const MAP = [
  '##############################',
  '#............................#',
  '#..........................#.#',
  '#..........................#E#',
  '#..........................#.#',
  '#..####################.....##',
  '#..#..................#......#',
  '#..#..................#......#',
  '#..#..................+......#',
  '#..#..................#......#',
  '#..#..................#......#',
  '#..####################......#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '#............................#',
  '##############################',
];
const COLS = MAP[0]!.length;
const ROWS = MAP.length;
const W = COLS * T;
const H = ROWS * T;

const FLOOR = [floorTile(1), floorTile(7), floorTile(13)];
const WALL = wallTile();
const VOID = voidTile();
const big = new Sprite(W, H);
const blit = (s: Sprite, x0: number, y0: number, alpha = true): void => {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if (alpha && (c[3] ?? 0) === 0) continue;
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
const rng = new Rng(99);
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const t = ch === '#' ? WALL : ch === ' ' ? VOID : FLOOR[rng.int(0, 2)]!;
    blit(t, c * T, r * T, false);
  }

// placements (baked) — bench/console/crate/barrel/lamp; elevator special
const objs: Array<{ s: Sprite; col: number; row: number; solid?: boolean }> = [
  { s: bench(), col: 3, row: 13, solid: true },
  { s: console_(), col: 8, row: 13, solid: true },
  { s: crate(), col: 12, row: 14, solid: true },
  { s: crate(), col: 13, row: 14, solid: true },
  { s: barrel(), col: 24, row: 14, solid: true },
  { s: lamp(), col: 6, row: 1 },
  { s: lamp(), col: 20, row: 1 },
  { s: elevator(), col: 26, row: 1, solid: true },
];
const extraSolid = new Set<string>();
for (const o of objs) {
  const ax = o.col * T + T / 2;
  const ay = o.row * T + T;
  blit(o.s, Math.round(ax - o.s.w / 2), Math.round(ay - o.s.h));
  if (o.solid) {
    const c0 = Math.floor((ax - o.s.w / 2) / T);
    const c1 = Math.floor((ax + o.s.w / 2 - 1) / T);
    for (let cc = c0; cc <= c1; cc++) {
      extraSolid.add(`${cc},${o.row}`);
      extraSolid.add(`${cc},${o.row - 1}`);
    }
  }
}

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'ohmstead.png'), PNG.sync.write(png));

const collision: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || ch === ' ' || extraSolid.has(`${c},${r}`);
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
    spawn: { x: 14, y: 9 },
    // the '+' door cell opens between the garage and the elevator hall; the
    // elevator pad is the cell below the lift → exit up to the Field
    exits: [{ x: 27, y: 4, scene: 'elevator' }],
    interacts: [{ x: 4, y: 14, kind: 'bench' }],
    npcs: [
      { char: 'npc_elder', col: 6, row: 13 }, // Grandpa Harlan at the bench
      { char: 'npc_rancher', col: 22, row: 8 },
    ],
  }),
);

console.log(`ohmstead: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} objects`);
