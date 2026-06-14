/**
 * Building / Interior kit art (npm run assets:building) — Asset Bible Part 5.
 * Reused on every interior map: floors, walls, furniture, and the hero assets
 * (Grandpa's Bench, the garage healing machine). Grid method, depth/density
 * laws. Floors are 32px seeded tiles; furniture are shaded props with contact
 * shadows. Emits assets/tiles/building/<cat>/ + a contact sheet.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const T = 32;
const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/building');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};

// ---- floors (32px) -------------------------------------------------------
function floorWood(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'k');
  for (let y = 0; y < T; y += 8) { g.hline(0, y, T, 'K'); g.hline(0, y + 1, T, 'n'); } // plank seams
  for (let k = 0; k < 10; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'K' : 'n'); // grain
  return g.render();
}
function floorTile(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'W');
  for (let y = 0; y < T; y += 16) for (let x = 0; x < T; x += 16) {
    g.box(x + 1, y + 1, 14, 14, 'w', (x + y) % 32 ? 'W' : 'w', 'A');
  }
  void r;
  return g.render();
}
function floorConcrete(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'a');
  for (let k = 0; k < 12; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'A' : 'l');
  if (r.chance(70)) { const x = r.int(4, 28); g.line(x, r.int(2, 28), x + r.int(-8, 8), r.int(2, 28), 'A'); }
  return g.render();
}
function floorGrate(seed: number): Sprite {
  const g = new Grid(T, T);
  g.rect(0, 0, T, T, 'A');
  for (let y = 2; y < T; y += 5) for (let x = 2; x < T; x += 5) { g.rect(x, y, 3, 3, 'a'); g.set(x, y, 'l'); }
  void seed;
  return g.render();
}
function floorCarpet(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'E');
  for (let k = 0; k < 40; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'e' : 'q'); // pile
  g.box(1, 1, T - 2, T - 2, 'q', 'E', 'E');
  return g.render();
}
function wallInterior(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.box(0, 0, T, T, 'n', 'k', 'K');
  g.rect(0, T - 5, T, 5, 'K'); // baseboard
  g.hline(0, T - 5, T, 'n');
  for (let k = 0; k < 6; k++) g.set(r.int(0, T - 1), r.int(0, T - 6), 'n');
  return g.render();
}

// ---- furniture -----------------------------------------------------------
function bed(): Sprite {
  const g = new Grid(40, 30);
  g.shadow(20, 28, 17, 3);
  g.box(2, 8, 36, 20, 'n', 'k', 'K'); // frame
  g.box(4, 4, 32, 14, 'm', 'u', 'U'); // blanket
  g.box(4, 4, 11, 11, '*', 'w', 'W'); // pillow
  g.outline('X');
  return g.render();
}
function bunk(): Sprite {
  const g = new Grid(36, 44);
  g.shadow(18, 42, 15, 3);
  g.box(2, 22, 32, 16, 'n', 'k', 'K');
  g.box(4, 24, 28, 8, 'm', 'u', 'U');
  g.box(2, 4, 32, 14, 'n', 'k', 'K'); // upper
  g.box(4, 6, 28, 8, 'm', 'u', 'U');
  g.vline(3, 4, 36, 'K'); g.vline(32, 4, 36, 'K'); // posts
  g.outline('X');
  return g.render();
}
function table(): Sprite {
  const g = new Grid(40, 28);
  g.shadow(20, 26, 17, 2);
  g.box(2, 6, 36, 8, 'n', 'k', 'K'); // top
  g.rect(5, 14, 3, 11, 'K'); g.rect(32, 14, 3, 11, 'K'); // legs
  g.outline('X');
  return g.render();
}
function chair(): Sprite {
  const g = new Grid(18, 26);
  g.shadow(9, 24, 6, 2);
  g.box(3, 2, 12, 3, 'n', 'k', 'K'); // back top
  g.vline(4, 2, 12, 'k'); g.vline(13, 2, 12, 'k');
  g.box(3, 12, 12, 4, 'n', 'k', 'K'); // seat
  g.rect(4, 16, 2, 8, 'K'); g.rect(12, 16, 2, 8, 'K');
  g.outline('X');
  return g.render();
}
function shelf(): Sprite {
  const g = new Grid(30, 40);
  g.shadow(15, 38, 12, 2);
  g.box(0, 0, 30, 40, 'n', 'k', 'K');
  for (let y = 8; y < 40; y += 11) g.hline(0, y, 30, 'K');
  g.box(3, 1, 4, 6, 'l', 'a', 'A'); g.box(9, 2, 4, 5, 'e', 'E', 'x'); g.box(16, 1, 5, 6, 'i', 'I', 'C');
  g.box(3, 9, 4, 6, 'e', 'E', 'x'); g.box(10, 10, 5, 5, 'l', 'a', 'A'); g.box(18, 9, 5, 6, 'n', 'k', 'K');
  g.box(4, 20, 5, 6, 'l', 'a', 'A'); g.box(12, 21, 5, 5, 'e', 'E', 'x');
  g.outline('X');
  return g.render();
}
function stove(): Sprite {
  const g = new Grid(28, 30);
  g.shadow(14, 28, 11, 2);
  g.box(2, 6, 24, 22, 'l', 'a', 'A');
  g.box(5, 9, 18, 8, 'C', 'c', 'C'); // oven window
  g.set(8, 12, 'Z'); g.set(14, 13, 'z'); // flame
  for (const x of [7, 13, 19]) g.set(x, 7, 'A'); // dials
  g.outline('X');
  return g.render();
}
function sink(): Sprite {
  const g = new Grid(28, 24);
  g.shadow(14, 22, 11, 2);
  g.box(2, 8, 24, 14, 'l', 'a', 'A');
  g.box(6, 10, 16, 7, 'W', 'a', 'A'); // basin
  g.vline(14, 4, 6, 'l'); g.rect(12, 4, 4, 2, 'l'); // faucet
  g.outline('X');
  return g.render();
}
function counter(): Sprite {
  const g = new Grid(48, 26);
  g.shadow(24, 24, 21, 2);
  g.box(2, 8, 44, 16, 'n', 'k', 'K');
  g.box(0, 4, 48, 5, 'l', 'a', 'A'); // countertop
  g.outline('X');
  return g.render();
}
function locker(): Sprite {
  const g = new Grid(22, 38);
  g.shadow(11, 36, 8, 2);
  g.box(2, 2, 18, 34, 'l', 'a', 'A');
  g.vline(11, 2, 34, 'A'); // door split
  for (const y of [10, 26]) { g.set(8, y, 'A'); g.set(14, y, 'A'); } // vents
  g.outline('X');
  return g.render();
}
function desk(): Sprite {
  const g = new Grid(42, 28);
  g.shadow(21, 26, 18, 2);
  g.box(2, 8, 38, 7, 'n', 'k', 'K'); // top
  g.box(28, 15, 12, 11, 'n', 'k', 'K'); // drawers
  g.hline(28, 20, 12, 'K');
  g.rect(4, 15, 3, 11, 'K'); // leg
  g.box(8, 2, 14, 7, 'C', 'c', 'C'); // a terminal
  g.set(11, 5, 'z');
  g.outline('X');
  return g.render();
}
function plant(): Sprite {
  const g = new Grid(22, 30);
  g.shadow(11, 28, 7, 2);
  g.box(5, 20, 12, 8, 'e', 'E', 'x'); // pot
  for (let k = 0; k < 14; k++) { const a = (k / 14) * 3.14; g.line(11, 20, 11 + Math.cos(a) * 9, 20 - Math.abs(Math.sin(a)) * 16, k % 2 ? 'g' : 'f'); }
  g.outline('X');
  return g.render();
}
function rug(): Sprite {
  const g = new Grid(44, 30);
  g.box(0, 0, 44, 30, 'q', 'e', 'E');
  g.box(4, 4, 36, 22, 'E', 'b', 'B');
  g.box(10, 9, 24, 12, 'q', 'e', 'E');
  return g.render();
}

// ---- HERO assets ---------------------------------------------------------
function benchHero(): Sprite {
  const g = new Grid(96, 64);
  g.shadow(48, 62, 42, 4);
  // pegboard with tools
  g.box(8, 2, 80, 18, 'n', 'k', 'K');
  for (const [x, y] of [[14, 6], [22, 5], [30, 7], [40, 5], [50, 6]] as Array<[number, number]>) { g.rect(x, y, 2, 8, 'A'); g.set(x, y, 'l'); }
  g.box(60, 4, 10, 12, 'l', 'a', 'A'); // hung wrench/tool
  g.box(74, 5, 8, 10, 'l', 'a', 'A');
  // bench top + legs
  g.box(4, 40, 88, 10, 'n', 'k', 'K');
  g.rect(8, 50, 4, 12, 'K'); g.rect(84, 50, 4, 12, 'K');
  // vise
  g.box(10, 32, 12, 8, 'l', 'a', 'A');
  // half-built Ohm with glowing core
  g.box(40, 26, 18, 14, 'l', 'a', 'A');
  g.box(45, 30, 8, 6, '3', '2', '3');
  g.rect(47, 31, 4, 3, '1'); // glowing core
  g.ellipse(34, 38, 3, 2, 'a'); // a loose gear
  // Ohm's Law book
  g.box(66, 33, 12, 7, 'B', 'b', 'B');
  g.hline(67, 34, 10, 'z');
  // soldering rig glow
  g.set(28, 34, 'z');
  const s = g.render();
  for (let y = 24; y < 40; y++) for (let x = 40; x < 60; x++) { const d = Math.hypot(x - 49, y - 32); if (d > 14) continue; const a = (1 - d / 14) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + 20 * a), Math.min(255, c[1] + 60 * a), Math.min(255, c[2] + 110 * a), c[3] ?? 0]); }
  return s;
}
function healingMachine(): Sprite {
  const g = new Grid(56, 60);
  g.shadow(28, 58, 22, 4);
  g.box(6, 10, 44, 46, 'l', 'a', 'A'); // cabinet
  g.box(12, 16, 32, 16, 'C', 'c', 'C'); // screen
  for (let y = 18; y < 30; y += 3) g.hline(14, y, 28, 'v');
  g.set(18, 20, 'z'); g.set(30, 24, '1');
  // three recharge cradles (lit)
  for (const x of [14, 26, 38]) { g.box(x, 38, 8, 8, '3', '2', '3'); g.rect(x + 2, 40, 4, 3, '1'); }
  g.box(6, 4, 44, 6, 'l', 'a', 'A'); // header
  g.hline(8, 7, 40, 'z');
  const s = g.render();
  for (let y = 34; y < 50; y++) for (let x = 10; x < 50; x++) { const c = s.get(x, y); if (c[2] > 120) { } } // (glow baked via cradle colors)
  return s;
}
function interiorDoor(): Sprite {
  const g = new Grid(28, 40);
  g.box(2, 2, 24, 38, 'n', 'k', 'K');
  g.box(6, 6, 16, 30, 'K', 'k', 'K'); // recessed panel
  g.set(20, 22, 'z'); // knob
  g.outline('X');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, string, Sprite]> = [];
const add = (cat: string, id: string, s: Sprite): void => { items.push([cat, id, s]); save(s, `${cat}/${id}`); };
// floors (3 variants each)
for (const [id, fn] of [['wood', floorWood], ['tile', floorTile], ['concrete', floorConcrete], ['grate', floorGrate], ['carpet', floorCarpet]] as Array<[string, (n: number) => Sprite]>)
  for (let v = 0; v < 3; v++) add('floor', `building.floor.${id}__v${v}`, fn(id.length * 7 + v + 1));
for (let v = 0; v < 3; v++) add('shell', `building.shell.wall__v${v}`, wallInterior(v + 3));
add('furn', 'building.furn.bed', bed());
add('furn', 'building.furn.bunk', bunk());
add('furn', 'building.furn.table', table());
add('furn', 'building.furn.chair', chair());
add('furn', 'building.furn.shelf', shelf());
add('furn', 'building.furn.stove', stove());
add('furn', 'building.furn.sink', sink());
add('furn', 'building.furn.counter', counter());
add('furn', 'building.furn.locker', locker());
add('furn', 'building.furn.desk', desk());
add('furn', 'building.furn.plant', plant());
add('furn', 'building.furn.rug', rug());
add('bench', 'building.bench.workbench', benchHero());
add('obj', 'building.obj.healing_machine', healingMachine());
add('obj', 'building.obj.interior_door', interiorDoor());

// ---- contact sheet -------------------------------------------------------
const cell = 110;
const COLS = 6;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [30, 28, 34, 255]);
items.forEach(([, , s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 6;
  const sc = Math.min(2, Math.max(1, Math.floor((cell - 8) / Math.max(s.w, s.h))));
  const ox = Math.round(cx - (s.w * sc) / 2);
  const oy = Math.round(cy - s.h * sc);
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if ((c[3] ?? 0) === 0) continue;
      for (let dy = 0; dy < sc; dy++) for (let dx = 0; dx < sc; dx++) sheet.set(ox + x * sc + dx, oy + y * sc + dy, c);
    }
});
{
  const png = new PNG({ width: sheet.w, height: sheet.h });
  png.data.set(sheet.data);
  writeFileSync(join(OUT, '_contact.png'), PNG.sync.write(png));
}
console.log(`building kit: ${items.length} pieces → assets/tiles/building/`);
