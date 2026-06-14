/**
 * Cave + Mine dungeon kits art (npm run assets:cave) — Asset Bible Part 6
 * (reused dungeon set). Cave walls/floors/pools, stalactites/stalagmites,
 * glowing ore nodes, supports, ladders; mine rails, carts, timber beams,
 * ballast. Grid method, depth/density laws + additive glow on ore. Emits
 * assets/tiles/dungeon_cave/ and assets/tiles/dungeon_mine/ + a contact sheet.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const T = 32;
const ROOT = new URL('../..', import.meta.url).pathname;
const save = (s: Sprite, base: string, rel: string): void => {
  const dir = join(ROOT, `assets/tiles/${base}`, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(ROOT, `assets/tiles/${base}`, `${rel}.png`), PNG.sync.write(png));
};
function glow(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++)
    for (let x = Math.floor(cx - rad); x <= cx + rad; x++) {
      if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue;
      const d = Math.hypot(x - cx, y - cy);
      if (d > rad) continue;
      const a = (1 - d / rad) ** 2;
      const c = s.get(x, y);
      s.set(x, y, [Math.min(255, c[0] + col[0] * a), Math.min(255, c[1] + col[1] * a), Math.min(255, c[2] + col[2] * a), Math.max(c[3] ?? 0, Math.round(60 * a))]);
    }
}

// ---- cave tiles ----------------------------------------------------------
function caveWall(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'd');
  for (let k = 0; k < 5; k++) g.ellipse(r.int(3, T - 4), r.int(3, T - 4), r.int(2, 4), r.int(2, 3), 'D');
  for (let k = 0; k < 3; k++) { const x = r.int(2, T - 3); const y = r.int(2, T - 3); g.line(x, y, x + r.int(-6, 6), y + r.int(-6, 6), 'D'); }
  for (let k = 0; k < 9; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(55) ? 'D' : 'N');
  return g.render();
}
function caveFloor(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A');
  for (let k = 0; k < 10; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 3), r.int(1, 2), 'a');
  for (let k = 0; k < 14; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'x' : 'a');
  return g.render();
}
function cavePool(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'C');
  for (let k = 0; k < 5; k++) g.hline(r.int(2, T - 6), r.int(2, T - 2), r.int(3, 6), 'c');
  for (let k = 0; k < 3; k++) g.hline(r.int(2, T - 4), r.int(2, T - 2), r.int(2, 3), 'i');
  return g.render();
}
function stalactite(): Sprite {
  const g = new Grid(20, 32);
  for (let y = 0; y < 28; y++) { const w = Math.max(1, Math.round((28 - y) / 4)); g.hline(10 - w, y, w * 2, 'd'); g.set(10 + w - 1, y, 'D'); g.set(10 - w, y, 'N'); }
  g.outline('X');
  return g.render();
}
function stalagmite(): Sprite {
  const g = new Grid(20, 30);
  g.shadow(10, 28, 7, 2);
  for (let y = 28; y > 2; y--) { const w = Math.max(1, Math.round((28 - y) / 4)); g.hline(10 - w, y, w * 2, 'd'); g.set(10 - w, y, 'N'); g.set(10 + w - 1, y, 'D'); }
  g.outline('X');
  return g.render();
}
function oreNode(kind: 'blue' | 'amber'): Sprite {
  const g = new Grid(24, 24);
  g.shadow(12, 22, 8, 2);
  g.ellipse(12, 14, 10, 8, 'd'); // rock pocket
  const [hi, base] = kind === 'blue' ? ['1', '2'] : ['z', 'Z'];
  for (const [x, y, h] of [[10, 6, 6], [14, 8, 5], [12, 9, 4]] as Array<[number, number, number]>) {
    for (let i = 0; i < h; i++) g.set(x, y + i, base);
    g.set(x, y, hi);
  }
  const s = g.render();
  glow(s, 12, 9, 14, kind === 'blue' ? [30, 80, 140] : [120, 80, 20]);
  return s;
}
function support(): Sprite {
  const g = new Grid(28, 40);
  g.shadow(14, 38, 11, 2);
  g.rect(3, 4, 5, 34, 'k'); g.rect(20, 4, 5, 34, 'k'); g.vline(3, 4, 34, 'n'); g.vline(20, 4, 34, 'n');
  g.rect(2, 2, 24, 5, 'k'); g.hline(2, 2, 24, 'n'); // lintel
  g.outline('X');
  return g.render();
}
function ladder(): Sprite {
  const g = new Grid(18, 40);
  g.vline(3, 0, 40, 'k'); g.vline(4, 0, 40, 'n');
  g.vline(13, 0, 40, 'k'); g.vline(14, 0, 40, 'n');
  for (let y = 3; y < 40; y += 5) { g.hline(3, y, 11, 'n'); g.hline(3, y + 1, 11, 'K'); }
  return g.render();
}

// ---- mine tiles ----------------------------------------------------------
function mineFloor(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'K');
  for (let k = 0; k < 18; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'k' : 'A'); // gravel
  return g.render();
}
function rail(): Sprite {
  const g = new Grid(T, T);
  for (let x = 1; x < T; x += 5) g.rect(x, 6, 3, 20, 'K'); // ties
  g.vline(8, 0, T, 'l'); g.vline(9, 0, T, 'A');
  g.vline(22, 0, T, 'l'); g.vline(23, 0, T, 'A'); // rails
  return g.render();
}
function ballast(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A');
  for (let k = 0; k < 40; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'a' : 'l');
  return g.render();
}
function mineCart(): Sprite {
  const g = new Grid(28, 24);
  g.shadow(14, 22, 11, 2);
  g.hline(0, 21, 28, 'A'); g.hline(0, 19, 28, 'A');
  g.box(4, 6, 20, 10, 'l', 'a', 'A');
  g.box(6, 7, 16, 5, 'K', 'k', 'K');
  g.ellipse(9, 8, 2, 1, '2'); g.ellipse(15, 7, 2, 1, 'z'); // ore
  g.ellipse(8, 17, 2, 2, 'A'); g.ellipse(20, 17, 2, 2, 'A'); // wheels
  g.outline('X');
  return g.render();
}
function beam(): Sprite {
  const g = new Grid(20, 48);
  g.shadow(10, 46, 7, 2);
  g.box(4, 2, 12, 44, 'n', 'k', 'K');
  for (let y = 8; y < 44; y += 10) g.hline(4, y, 12, 'K'); // bolts band
  g.outline('X');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [];
const addCave = (id: string, s: Sprite): void => { items.push([id, s]); save(s, 'dungeon_cave', id); };
const addMine = (id: string, s: Sprite): void => { items.push([id, s]); save(s, 'dungeon_mine', id); };
for (let v = 0; v < 3; v++) addCave(`wall/dungeon.cave.wall__v${v}`, caveWall(v + 1));
for (let v = 0; v < 3; v++) addCave(`floor/dungeon.cave.floor__v${v}`, caveFloor(v + 11));
addCave('pool/dungeon.cave.pool', cavePool(21));
addCave('prop/dungeon.cave.stalactite', stalactite());
addCave('prop/dungeon.cave.stalagmite', stalagmite());
addCave('prop/dungeon.cave.ore_node_blue', oreNode('blue'));
addCave('prop/dungeon.cave.ore_node_amber', oreNode('amber'));
addCave('prop/dungeon.cave.support', support());
addCave('prop/dungeon.cave.ladder', ladder());
for (let v = 0; v < 2; v++) addMine(`floor/dungeon.mine.floor__v${v}`, mineFloor(v + 31));
addMine('rail/dungeon.mine.rail', rail());
addMine('ground/dungeon.mine.ballast', ballast(41));
addMine('prop/dungeon.mine.cart', mineCart());
addMine('prop/dungeon.mine.beam', beam());

// ---- contact sheet (over dark cave-grey) ---------------------------------
const cell = 108;
const COLS = 6;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [20, 16, 12, 255]);
items.forEach(([, s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 6;
  const sc = Math.min(2, Math.max(1, Math.floor((cell - 8) / Math.max(s.w, s.h))));
  const ox = Math.round(cx - (s.w * sc) / 2);
  const oy = Math.round(cy - s.h * sc);
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      const a = (c[3] ?? 0) / 255;
      if (a === 0) continue;
      for (let dy = 0; dy < sc; dy++)
        for (let dx = 0; dx < sc; dx++) {
          const px = ox + x * sc + dx;
          const py = oy + y * sc + dy;
          const d = sheet.get(px, py);
          sheet.set(px, py, [Math.round(c[0] * a + d[0] * (1 - a)), Math.round(c[1] * a + d[1] * (1 - a)), Math.round(c[2] * a + d[2] * (1 - a)), 255]);
        }
    }
});
{
  const png = new PNG({ width: sheet.w, height: sheet.h });
  png.data.set(sheet.data);
  writeFileSync(join(ROOT, 'assets/tiles/dungeon_cave/_contact.png'), PNG.sync.write(png));
}
console.log(`cave/mine kits: ${items.length} pieces → assets/tiles/dungeon_cave|mine/`);
