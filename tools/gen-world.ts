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
function barn(): Sprite {
  const s = new Sprite(72, 60);
  const body = ramp('a83228', { steps: 6, spread: 0.34 });
  const roof = ramp('6a4030', { steps: 5, spread: 0.3 });
  const trim = hexRGBA('e8e0d0');
  s.contactShadow(36, 56, 32, 5, SHADOW);
  s.roundedRect(8, 24, 56, 32, 3, body, { dither: true });
  // gambrel roof
  for (let i = 0; i < 14; i++) {
    const y = 10 + i;
    const inset = i < 7 ? 8 - i : 1 + (i - 7) * 1.6;
    s.line(8 + inset, y, 64 - inset, y, roof[Math.min(4, 1 + Math.floor(i / 3))] ?? roof[2]!);
  }
  s.rect(28, 34, 16, 22, hexRGBA('3a2418')); // door
  s.line(28, 34, 44, 56, trim);
  s.line(44, 34, 28, 56, trim); // X
  s.rect(14, 30, 8, 8, hexRGBA('cfe0e8')); // window
  s.rect(50, 30, 8, 8, hexRGBA('cfe0e8'));
  s.outline(OUTLINE, body[5]!);
  return s;
}
function storefront(hex: string): Sprite {
  const s = new Sprite(56, 56);
  const wood = ramp(hex, { steps: 6, spread: 0.32 });
  s.contactShadow(28, 52, 24, 5, SHADOW);
  s.roundedRect(8, 18, 40, 36, 2, wood, { dither: true });
  s.rect(6, 8, 44, 12, wood[2]!); // false front
  s.rect(6, 8, 44, 3, wood[4]!);
  s.rect(12, 36, 12, 18, hexRGBA('2a1c12')); // door
  s.rect(30, 24, 14, 12, hexRGBA('bcd4dc')); // window
  s.line(37, 24, 37, 36, OUTLINE);
  s.rect(28, 20, 18, 3, hexRGBA('c8a038')); // awning
  s.outline(OUTLINE, wood[5]!);
  return s;
}
function house(): Sprite {
  const s = new Sprite(52, 48);
  const wall = ramp('c8b48c', { steps: 6, spread: 0.3 });
  const roof = ramp('7a5238', { steps: 5, spread: 0.3 });
  s.contactShadow(26, 46, 22, 4, SHADOW);
  s.roundedRect(8, 22, 36, 24, 2, wall, { dither: true });
  for (let i = 0; i < 14; i++) s.line(6 + i, 22 - i, 46 - i, 22 - i, roof[Math.min(4, 1 + Math.floor(i / 4))] ?? roof[2]!); // gable
  s.rect(22, 32, 10, 14, hexRGBA('3a2418')); // door
  s.rect(12, 28, 7, 7, hexRGBA('bcd4dc'));
  s.rect(34, 28, 7, 7, hexRGBA('bcd4dc'));
  s.outline(OUTLINE, wall[5]!);
  return s;
}
function windmill(): Sprite {
  const s = new Sprite(40, 72);
  const wood = ramp('8a6e44', { steps: 5, spread: 0.3 });
  s.contactShadow(20, 68, 14, 4, SHADOW);
  // lattice tower
  s.line(8, 68, 17, 26, wood[2]!);
  s.line(32, 68, 23, 26, wood[2]!);
  for (let y = 30; y < 66; y += 8) s.line(9 + (y - 26) * 0.18, y, 31 - (y - 26) * 0.18, y, wood[1]!);
  // hub + blades
  s.sphere(20, 22, 3, ramp('555', { steps: 4 }), { dither: false });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    s.line(20, 22, 20 + Math.cos(a) * 14, 22 + Math.sin(a) * 14, wood[3]!);
  }
  s.line(20, 26, 26, 34, wood[2]!); // tail
  s.outline(OUTLINE, wood[4]!);
  return s;
}
function watertower(): Sprite {
  const s = new Sprite(48, 64);
  const metal = ramp('7c8088', { steps: 6, spread: 0.36 });
  const tank = ramp('8a7050', { steps: 6, spread: 0.32 });
  s.contactShadow(24, 60, 18, 4, SHADOW);
  s.line(10, 58, 16, 30, metal[2]!);
  s.line(38, 58, 32, 30, metal[2]!);
  s.line(16, 58, 18, 30, metal[2]!);
  s.line(32, 58, 30, 30, metal[2]!);
  s.line(12, 46, 36, 46, metal[1]!); // brace
  s.line(12, 52, 36, 52, metal[1]!);
  s.roundedRect(12, 14, 24, 18, 4, tank, { dither: true }); // tank
  for (let i = 0; i < 12; i++) s.line(12 + i, 14 - Math.floor(i * 0.5), 36 - i, 14 - Math.floor(i * 0.5), tank[3]!); // conical roof
  s.outline(OUTLINE, tank[5]!);
  return s;
}
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
function character(opts: { coat: string; hat: string; hair?: string; skin?: string }): Sprite {
  const s = new Sprite(24, 36);
  const coat = ramp(opts.coat, { steps: 5, spread: 0.3 });
  const skin = ramp(opts.skin ?? 'd8a070', { steps: 4, spread: 0.24 });
  const hat = ramp(opts.hat, { steps: 4, spread: 0.26 });
  s.contactShadow(12, 34, 8, 2, SHADOW);
  // legs
  s.rect(8, 28, 3, 7, hexRGBA('3a2a1c'));
  s.rect(13, 28, 3, 7, hexRGBA('3a2a1c'));
  // coat / torso
  s.roundedRect(6, 17, 12, 13, 3, coat, { dither: false });
  s.rect(11, 18, 2, 11, coat[0]!); // button line
  // arms
  s.rect(4, 18, 3, 8, coat[1]!);
  s.rect(17, 18, 3, 8, coat[1]!);
  // head
  s.sphere(12, 12, 5, skin, { dither: false });
  if (opts.hair) {
    const h = hexRGBA(opts.hair);
    s.rect(8, 8, 8, 3, h);
  }
  // eyes
  s.set(10, 12, OUTLINE);
  s.set(14, 12, OUTLINE);
  // hat: brim + crown
  s.rect(5, 8, 14, 2, hat[1]!);
  s.roundedRect(8, 3, 8, 6, 2, hat, { dither: false });
  s.outline(OUTLINE, coat[4]!);
  return s;
}

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
  { s: storefront('9a5a30'), col: 6, row: 3 },
  { s: storefront('40608a'), col: 9, row: 3 },
  { s: storefront('8a4040'), col: 12, row: 3 },
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
writeChar('player', character({ coat: '2f5aa0', hat: '5a3a22', hair: '3a2a18' }));
writeChar('npc_rancher', character({ coat: '7a5230', hat: '4a3020', hair: '241a10' }));
writeChar('npc_elder', character({ coat: '6a6a72', hat: '8a8a90', hair: 'd0d0d0' }));
writeChar('npc_kid', character({ coat: '9a3a3a', hat: '7a4a2a', hair: '5a3a20', skin: 'e0b080' }));

console.log(`world: the-field.png ${W}x${H}, ${OBJECTS.length} objects, ${npcs.length} NPCs, 4 chars`);
