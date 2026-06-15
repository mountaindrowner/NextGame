/**
 * The Trinity Bottoms — sec.trinity secondary art (npm run assets:trinity).
 * The drowned bottomland forest (Asset Bible Part 6 + Critical Path §10): a
 * flooded forest of cypress and dead trees, murky deep water (HOVER), SHEAR
 * overgrowth, reeds, hanging moss/vines, sunken cars, fallen-log bridges, the
 * half-submerged chapel (hero), and organic-hybrid plant-machine flora. Eerie
 * and beautiful; light hive. Grid method, depth/density. assets/tiles/sec_trinity/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_trinity');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};
function glowS(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + col[0] * a), Math.min(255, c[1] + col[1] * a), Math.min(255, c[2] + col[2] * a), Math.max(c[3] ?? 0, Math.round(40 * a))]); }
}

// ---- tiles ---------------------------------------------------------------
export function muckFloor(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'K'); // dark wet earth
  for (let k = 0; k < 8; k++) g.ellipse(r.int(2, 29), r.int(2, 29), r.int(2, 4), r.int(1, 2), 'k'); // mud humps
  for (let k = 0; k < 6; k++) { const x = r.int(1, 30); g.line(x, r.int(2, 28), x + r.int(-6, 6), r.int(2, 28), 'g'); } // roots
  for (let k = 0; k < 4; k++) g.ellipse(r.int(3, 28), r.int(3, 28), r.int(2, 3), 1, 'C'); // damp puddle
  for (let k = 0; k < 6; k++) g.set(r.int(0, 31), r.int(0, 31), 'G'); // moss
  return g.render();
}
export function deepWater(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'C'); // murky base
  for (let k = 0; k < 6; k++) g.set(r.int(0, 31), r.int(0, 31), 'x'); // dark depth
  for (let k = 0; k < 4; k++) g.hline(r.int(2, 26), r.int(2, 30), r.int(3, 6), 'c');
  for (let k = 0; k < 2; k++) g.hline(r.int(2, 28), r.int(2, 30), 2, '7'); // sickly teal sheen
  return g.render();
}
export function shallowReed(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'C');
  for (let k = 0; k < 5; k++) g.hline(r.int(2, 26), r.int(2, 30), r.int(3, 6), 'c');
  for (let k = 0; k < 10; k++) { const x = r.int(2, 30); const h = r.int(8, 16); for (let y = 31; y > 31 - h; y--) g.set(x, y, r.chance(60) ? 'g' : 'f'); g.set(x, 31 - h, 'F'); }
  return g.render();
}

// ---- props ---------------------------------------------------------------
export function cypress(): Sprite {
  const g = new Grid(96, 140);
  g.shadow(48, 138, 26, 4);
  g.box(40, 96, 16, 44, 'K', 'k', 'x'); // wet trunk
  g.line(48, 110, 30, 96, 'k'); g.line(48, 110, 66, 96, 'k'); // knees/roots in water
  // ragged drowned canopy (occluder)
  for (const [cx, cy, rx, ry] of [[34, 70, 22, 16], [62, 62, 24, 18], [48, 44, 28, 20], [40, 26, 20, 14]] as Array<[number, number, number, number]>) {
    g.ellipse(cx, cy, rx, ry, 'G'); g.ellipse(cx - 1, cy - 1, rx - 2, ry - 2, 'g'); g.ellipse(cx - rx * 0.4, cy - ry * 0.4, rx * 0.4, ry * 0.4, 'f');
  }
  for (let i = 0; i < 12; i++) g.set(40 + new Rng(i + 1).int(-18, 18), 36 + new Rng(i * 3).int(-8, 8), 'G'); // dark gaps
  g.outline('X');
  return g.render();
}
export function chapel(): Sprite {
  const g = new Grid(128, 112);
  g.shadow(64, 110, 56, 4);
  g.box(20, 48, 88, 56, 'l', 'a', 'A'); // stone nave, half-sunk
  for (let y = 50; y < 104; y += 8) g.hline(20, y, 88, 'A'); // courses
  // tilted steeple
  for (let i = 0; i < 30; i++) { g.vline(56 + i * 0.3, 16 + i, 10, 'a'); g.set(56 + i * 0.3, 16 + i, 'l'); }
  for (let i = 0; i <= 6; i++) g.hline(56 + i, 16 - i, 10 - 2 * i, 'a');
  g.box(50, 56, 18, 22, 'i', 'I', 'C'); // a broken stained-glass arch (dim colored)
  g.set(56, 62, '4'); g.set(60, 66, 'b'); g.set(54, 70, 'F'); // shards of colour
  g.box(76, 60, 14, 30, 'x', 'X', 'X'); // dark doorway
  // water line + moss creeping up
  g.rect(20, 92, 88, 12, 'C'); for (let x = 22; x < 106; x += 4) g.set(x, 92, 'g');
  for (let k = 0; k < 30; k++) g.set(20 + new Rng(k + 1).int(0, 87), 80 + new Rng(k * 3).int(0, 12), 'g'); // moss
  g.outline('X');
  return g.render();
}
export function logBridge(): Sprite {
  const g = new Grid(96, 28);
  g.shadow(48, 26, 44, 2);
  g.box(2, 6, 92, 14, 'n', 'k', 'K'); // log body
  for (let x = 6; x < 92; x += 10) g.ellipse(x, 13, 2, 5, 'K'); // bark texture
  g.ellipse(92, 13, 3, 6, 'n'); g.ellipse(92, 13, 2, 4, 'K'); // cut end rings
  for (let k = 0; k < 8; k++) g.set(new Rng(k + 1).int(6, 88), new Rng(k * 3).int(7, 18), 'g'); // moss
  g.outline('X');
  return g.render();
}
export function reeds(): Sprite {
  const g = new Grid(26, 34);
  const r = new Rng(6);
  for (let k = 0; k < 10; k++) { const x = r.int(2, 24); const h = r.int(16, 32); for (let y = 33; y > 33 - h; y--) g.set(x, y, r.chance(60) ? 'g' : 'f'); g.set(x, 33 - h, 'F'); if (r.chance(40)) { g.set(x, 33 - h + 2, 'k'); g.set(x, 33 - h + 3, 'k'); } }
  return g.render();
}
export function mossVine(): Sprite {
  const g = new Grid(28, 30);
  const r = new Rng(7);
  for (let b = 0; b < 5; b++) { let x = b * 5 + 2; for (let y = 0; y < 28; y++) { g.set(x, y, r.chance(60) ? 'G' : 'g'); if (y % 3 === 0) x += r.int(-1, 1); if (r.chance(20)) g.set(x + 1, y, 'f'); } }
  return g.render();
}
export function sunkenCar(): Sprite {
  const g = new Grid(80, 44);
  g.shadow(40, 42, 36, 3);
  g.box(6, 18, 68, 18, 'a', 'A', 'x'); // body, rusted, half under
  g.box(22, 8, 36, 12, 'C', 'c', 'C'); // cabin (waterlogged windows)
  g.rect(8, 30, 64, 8, 'C'); // water over the sills
  for (let k = 0; k < 10; k++) g.set(new Rng(k + 1).int(8, 70), new Rng(k * 3).int(20, 30), 'g'); // algae
  g.outline('X');
  return g.render();
}
export function hybridFlora(): Sprite {
  const g = new Grid(28, 40);
  g.shadow(14, 38, 9, 2);
  g.box(11, 22, 6, 16, 'a', 'A', 'x'); // metallic stalk
  for (const [cx, cy] of [[10, 14], [18, 16], [14, 8]] as Array<[number, number]>) { g.ellipse(cx, cy, 5, 4, 'g'); g.ellipse(cx, cy, 3, 2, '8'); g.set(cx, cy, '7'); } // petals: leaf + teal core
  g.set(14, 4, '1');
  const s = g.render();
  glowS(s, 14, 12, 16, [20, 90, 80]); // sickly bio-glow
  return s;
}
export function stump(): Sprite {
  const g = new Grid(28, 22);
  g.shadow(14, 20, 10, 2);
  g.box(5, 8, 18, 12, 'k', 'K', 'x');
  g.ellipse(14, 8, 9, 3, 'n'); g.ellipse(14, 8, 5, 2, 'K');
  for (let k = 0; k < 6; k++) g.set(new Rng(k + 1).int(6, 21), new Rng(k * 3).int(4, 9), 'g'); // moss top
  g.outline('X');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['ground/sec.trinity.muck', muckFloor(1)],
  ['water/sec.trinity.deep', deepWater(2)],
  ['water/sec.trinity.shallow_reed', shallowReed(3)],
  ['prop/sec.trinity.cypress', cypress()],
  ['prop/sec.trinity.chapel', chapel()],
  ['prop/sec.trinity.log_bridge', logBridge()],
  ['prop/sec.trinity.reeds', reeds()],
  ['prop/sec.trinity.moss_vine', mossVine()],
  ['prop/sec.trinity.sunken_car', sunkenCar()],
  ['prop/sec.trinity.hybrid_flora', hybridFlora()],
  ['prop/sec.trinity.stump', stump()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 150;
const COLS = 4;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [26, 34, 30, 255]);
items.forEach(([, s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 8;
  const sc = Math.min(2, Math.max(1, Math.floor((cell - 12) / Math.max(s.w, s.h))));
  const ox = Math.round(cx - (s.w * sc) / 2);
  const oy = Math.round(cy - s.h * sc);
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      const a = (c[3] ?? 0) / 255;
      if (a === 0) continue;
      for (let dy = 0; dy < sc; dy++) for (let dx = 0; dx < sc; dx++) { const px = ox + x * sc + dx; const py = oy + y * sc + dy; const d = sheet.get(px, py); sheet.set(px, py, [Math.round(c[0] * a + d[0] * (1 - a)), Math.round(c[1] * a + d[1] * (1 - a)), Math.round(c[2] * a + d[2] * (1 - a)), 255]); }
    }
});
{ const png = new PNG({ width: sheet.w, height: sheet.h }); png.data.set(sheet.data); writeFileSync(join(OUT, '_contact.png'), PNG.sync.write(png)); }
console.log(`sec.trinity: ${items.length} drowned-forest pieces → assets/tiles/sec_trinity/`);
