/**
 * Procedural HD cattle-town world (npm run gen:world). All Claude-made pixel
 * art via spritekit — no imported assets. Authors 32px terrain tiles + town
 * objects + overworld characters, composes the Field (ground + baked objects)
 * into public/world/the-field.png with a collision/grass/NPC json, and writes
 * the player + NPC character sprites.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { hexRGBA, ramp, Sprite, type RGBA } from './spritekit';
import { Rng } from '../src/core/rng';
import { barn, house, npcChar, storefront, watertower, windmill } from './world-builders';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/world');
mkdirSync(join(OUT, 'char'), { recursive: true });

const T = 32;
const OUTLINE = hexRGBA('1a1410');
const SHADOW: RGBA = [20, 14, 12, 110];

// ---- terrain tiles (32×32, seamless-ish, no outline) --------------------
function fleck(s: Sprite, rng: Rng, n: number, colors: RGBA[]): void {
  for (let i = 0; i < n; i++) s.set(rng.int(0, T - 1), rng.int(0, T - 1), colors[rng.int(0, colors.length - 1)] ?? colors[0]!);
}
function grass(seed: number): Sprite {
  const s = new Sprite(T, T);
  const g = ramp('5c8a38', { steps: 5, spread: 0.3 });
  s.rect(0, 0, T, T, g[2]!);
  const rng = new Rng(seed);
  fleck(s, rng, 36, [g[1]!, g[3]!]);
  for (let i = 0; i < 10; i++) {
    const x = rng.int(1, T - 2);
    const y = rng.int(2, T - 2);
    s.set(x, y, g[1]!);
    s.set(x, y - 1, g[0]!); // tiny blade
  }
  return s;
}
function tallgrass(seed: number): Sprite {
  const s = grass(seed);
  const g = ramp('46741f', { steps: 5, spread: 0.34 });
  const rng = new Rng(seed ^ 0x9e3779);
  for (let i = 0; i < 22; i++) {
    const x = rng.int(1, T - 2);
    const y = rng.int(6, T - 2);
    const h = rng.int(4, 8);
    s.line(x, y, x, y - h, g[1]!);
    s.set(x, y - h, g[3]!);
  }
  return s;
}
function dirt(seed: number): Sprite {
  const s = new Sprite(T, T);
  const d = ramp('9a7a48', { steps: 5, spread: 0.26 });
  s.rect(0, 0, T, T, d[2]!);
  const rng = new Rng(seed);
  fleck(s, rng, 30, [d[1]!, d[3]!]);
  for (let i = 0; i < 5; i++) s.set(rng.int(0, T - 1), rng.int(0, T - 1), d[0]!); // pebbles
  return s;
}
function water(seed: number): Sprite {
  const s = new Sprite(T, T);
  const w = ramp('356a9c', { steps: 5, spread: 0.3 });
  s.rect(0, 0, T, T, w[1]!);
  const rng = new Rng(seed);
  for (let y = 2; y < T; y += 5) {
    const off = rng.int(0, 6);
    for (let x = 0; x < T; x += 8) s.line((x + off) % T, y, (x + off + 4) % T, y, w[3]!);
  }
  return s;
}

const TILES: Record<string, Sprite> = {
  '.': grass(1),
  g: grass(7),
  ',': tallgrass(3),
  d: dirt(5),
  w: water(9),
};

// ---- objects (outline + contact shadow, anchored bottom-centre) ----------
function tree(): Sprite {
  const s = new Sprite(40, 52);
  const trunk = ramp('5a3c24', { steps: 4, spread: 0.3 });
  const leaf = ramp('3e6a28', { steps: 6, spread: 0.34 });
  s.contactShadow(20, 49, 15, 4, SHADOW);
  s.rect(17, 30, 6, 18, trunk[2]!);
  s.sphere(20, 20, 13, leaf, { dither: true });
  s.sphere(11, 24, 8, leaf, { dither: true });
  s.sphere(29, 24, 8, leaf, { dither: true });
  s.outline(OUTLINE, leaf[5]!);
  return s;
}
function cactus(): Sprite {
  const s = new Sprite(28, 44);
  const g = ramp('4e7a36', { steps: 6, spread: 0.32 });
  s.contactShadow(14, 41, 9, 3, SHADOW);
  s.roundedRect(10, 10, 8, 32, 4, g, { dither: true });
  s.roundedRect(2, 20, 6, 12, 3, g, { dither: true });
  s.roundedRect(20, 16, 6, 14, 3, g, { dither: true });
  for (let y = 12; y < 40; y += 4) s.set(9, y, hexRGBA('e8e8d0'));
  s.outline(OUTLINE, g[5]!);
  return s;
}
function rock(): Sprite {
  const s = new Sprite(28, 22);
  const g = ramp('8a8278', { steps: 6, spread: 0.36 });
  s.contactShadow(14, 20, 11, 3, SHADOW);
  s.sphere(14, 13, 9, g, { dither: true });
  s.outline(OUTLINE, g[5]!);
  return s;
}
function hay(): Sprite {
  const s = new Sprite(30, 24);
  const g = ramp('c8a048', { steps: 5, spread: 0.3 });
  s.contactShadow(15, 22, 12, 3, SHADOW);
  s.sphere(15, 13, 10, g, { dither: true });
  for (let y = 6; y < 22; y += 3) s.line(6, y, 24, y, g[1]!);
  s.outline(OUTLINE, g[4]!);
  return s;
}
function fence(): Sprite {
  const s = new Sprite(32, 18);
  const w = ramp('8a6e44', { steps: 4, spread: 0.3 });
  s.rect(0, 6, 32, 3, w[2]!);
  s.rect(0, 12, 32, 3, w[1]!);
  s.rect(4, 2, 3, 14, w[3]!);
  s.rect(25, 2, 3, 14, w[3]!);
  s.outline(OUTLINE, w[3]!);
  return s;
}

// ---- overworld characters (≈22×34, crisp, outlined) ----------------------

// ---- compose the Field ---------------------------------------------------
// 30×20 cells. ground codes; objects placed below.
const GROUND = [
  '..............................',
  '..g..,,,..g..........g...,,...g',
  '..ddddddddddddddddddddddddddd..',
  '..d........................d...',
  '..d..g..,,......g....g.....d...',
  '..d.............d..........d...',
  '..d..ddddddddddddddddddd...d...',
  '..d..d..............w..d...d...',
  '..d..d..,,,,,...,,..w..d...d...',
  '..d..d..,,,,,...,,..w..d...d...',
  '..d..d..,,,,,...,,..ww.d...d...',
  '..d..d.............w..ddd..d...',
  '..d..ddddddddddddd.w......d....',
  '..d...............,w......d....',
  '..d..g....g....,,.,w...g..d....',
  '..ddddddddddddddddw.dddddd.....',
  '..............,,..w...........',
  '..g..,,...g.......w....g..,,..g',
  '...........,,.........,,.......',
  '..............................',
];
const COLS = GROUND[0]!.length;
const ROWS = GROUND.length;
const W = COLS * T;
const H = ROWS * T;

interface Placed {
  s: Sprite;
  col: number;
  row: number;
}
// baked static objects (buildings, rocks, hay)
const OBJECTS: Placed[] = [
  { s: barn(), col: 2, row: 3 },
  { s: storefront('k', 'n', 'K'), col: 6, row: 3 },
  { s: storefront('u', 'm', 'U'), col: 9, row: 3 },
  { s: storefront('e', 'q', 'E'), col: 12, row: 3 },
  { s: house(), col: 20, row: 3 },
  { s: windmill(), col: 25, row: 4 },
  { s: watertower(), col: 23, row: 14 },
  { s: rock(), col: 9, row: 18 },
  { s: rock(), col: 19, row: 16 },
  { s: hay(), col: 17, row: 4 },
  { s: hay(), col: 18, row: 4 },
  { s: cactus(), col: 5, row: 17 },
  { s: cactus(), col: 22, row: 17 },
];

// placed as animated overlays in the scene (trunk + swaying leaf clusters)
const PLACEMENTS = [
  { type: 'tree', col: 1, row: 17 },
  { type: 'tree', col: 28, row: 1 },
  { type: 'tree', col: 27, row: 17 },
];

const map = new Sprite(W, H);
// ground
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const code = GROUND[r]![c]!;
    const tile = TILES[code] ?? TILES['.']!;
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) map.set(c * T + x, r * T + y, tile.get(x, y));
  }
}
// bake objects (anchored bottom-centre on their cell)
const collisionExtra: Array<[number, number, number, number]> = []; // x0,y0,x1,y1 footprint cells
for (const o of OBJECTS) {
  const ax = o.col * T + T / 2;
  const ay = o.row * T + T; // bottom sits at cell bottom
  const x0 = Math.round(ax - o.s.w / 2);
  const y0 = Math.round(ay - o.s.h);
  for (let y = 0; y < o.s.h; y++)
    for (let x = 0; x < o.s.w; x++) {
      const c = o.s.get(x, y);
      if ((c[3] ?? 0) === 0) continue;
      const px = x0 + x;
      const py = y0 + y;
      const di = map.get(px, py);
      const a = (c[3] ?? 0) / 255;
      map.set(px, py, [
        Math.round(c[0] * a + di[0] * (1 - a)),
        Math.round(c[1] * a + di[1] * (1 - a)),
        Math.round(c[2] * a + di[2] * (1 - a)),
        255,
      ]);
    }
  // footprint collision: the base ~1.2 tiles of the object
  const fpCols0 = Math.floor(x0 / T);
  const fpCols1 = Math.floor((x0 + o.s.w - 1) / T);
  const fpRow = o.row; // the object's anchor row (its base)
  collisionExtra.push([fpCols0, fpRow - 1, fpCols1, fpRow]);
}

mkdirSync(OUT, { recursive: true });
const png = new PNG({ width: W, height: H });
png.data.set(map.data);
writeFileSync(join(OUT, 'the-field.png'), PNG.sync.write(png));

// collision + grass + water + npc/object placements
const placeBlock = new Set(PLACEMENTS.map((p) => `${p.col},${p.row}`));
const collision: number[] = [];
const grass2: number[] = [];
const waterGrid: number[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const code = GROUND[r]![c]!;
    let solid = code === 'w' || placeBlock.has(`${c},${r}`);
    for (const [x0, y0, x1, y1] of collisionExtra) if (c >= x0 && c <= x1 && r >= y0 && r <= y1) solid = true;
    collision.push(solid ? 1 : 0);
    grass2.push(code === '.' || code === 'g' || code === ',' ? 1 : 0); // any grass (for tuft scatter)
    waterGrid.push(code === 'w' ? 1 : 0);
  }
}
// the tall-grass encounter cells (subset)
const encounter: number[] = GROUND.flatMap((row) => [...row].map((ch) => (ch === ',' ? 1 : 0)));
const npcs = [
  { char: 'npc_rancher', col: 7, row: 6 },
  { char: 'npc_elder', col: 21, row: 6 },
  { char: 'npc_kid', col: 14, row: 14 },
];
writeFileSync(
  join(OUT, 'the-field.json'),
  JSON.stringify({
    tile: T,
    cols: COLS,
    rows: ROWS,
    width: W,
    height: H,
    collision,
    grass: encounter, // encounter cells (tall grass) — keeps FieldHD encounter logic
    grassAny: grass2, // any-grass cells for tuft scatter
    water: waterGrid,
    placements: PLACEMENTS,
    npcs,
  }),
);

// characters
const writeChar = (name: string, s: Sprite): void => {
  const p = new PNG({ width: s.w, height: s.h });
  p.data.set(s.data);
  writeFileSync(join(OUT, 'char', `${name}.png`), PNG.sync.write(p));
};
writeChar('player', npcChar({ shirt: ['u', 'm', 'U'], hat: 'k', hair: 'r', hairDk: 'R' }));
writeChar('npc_rancher', npcChar({ shirt: ['j', 'h', 'J'], hat: 'K', hair: 'R', hairDk: 'R' }));
writeChar('npc_elder', npcChar({ shirt: ['a', 'l', 'A'], hat: 'w', hair: 'w', hairDk: 'W', apron: true }));
writeChar('npc_kid', npcChar({ shirt: ['e', 'q', 'E'], hat: 'k', hair: 'y', hairDk: 'Y' }));

console.log(`world: the-field.png ${W}x${H}, ${OBJECTS.length} objects, ${npcs.length} NPCs, 4 chars`);
