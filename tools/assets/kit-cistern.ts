/**
 * The Cistern — sec.cistern secondary art (npm run assets:cistern). The flooded
 * waterworks colony (Asset Bible Part 6 + Critical Path §5): sluice gates, big
 * pipes & valves, pump machinery, catwalks/footbridges over water, reeds &
 * cattails, the Nursery (planters + glowing Ohm-cradles — hero), the Grange
 * long tables, and the seed-vault (hero). Grid method, depth/density laws.
 * Emits assets/tiles/sec_cistern/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_cistern');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};
function glow(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + col[0] * a), Math.min(255, c[1] + col[1] * a), Math.min(255, c[2] + col[2] * a), Math.max(c[3] ?? 0, Math.round(50 * a))]); }
}

// ---- tiles ---------------------------------------------------------------
export function channelWall(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.box(0, 0, 32, 32, 'l', 'a', 'A');
  for (let y = 0; y < 32; y += 8) g.hline(0, y, 32, 'A'); // courses
  for (let k = 0; k < 10; k++) g.set(r.int(0, 31), r.int(0, 31), 'W'); // stains
  for (let k = 0; k < 8; k++) { const x = r.int(0, 31); const y = r.int(20, 31); g.set(x, y, r.chance(50) ? 'g' : 'G'); g.set(x, y - 1, 'f'); } // moss creep from base
  return g.render();
}
export function concreteFloor(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'a');
  for (let k = 0; k < 12; k++) g.set(r.int(0, 31), r.int(0, 31), r.chance(50) ? 'A' : 'l');
  if (r.chance(60)) { const x = r.int(4, 28); g.line(x, r.int(2, 28), x + r.int(-7, 7), r.int(2, 28), 'A'); } // crack
  for (let k = 0; k < 4; k++) g.ellipse(r.int(4, 28), r.int(4, 28), r.int(2, 4), 2, 'W'); // water stain
  return g.render();
}
export function water(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'C');
  for (let k = 0; k < 6; k++) g.hline(r.int(2, 26), r.int(2, 30), r.int(3, 6), 'c');
  for (let k = 0; k < 4; k++) g.hline(r.int(2, 28), r.int(2, 30), r.int(2, 3), '7'); // teal glints
  for (let k = 0; k < 3; k++) g.set(r.int(0, 31), r.int(0, 31), 'g'); // algae fleck
  return g.render();
}
export function catwalk(seed: number): Sprite {
  const g = new Grid(32, 32);
  g.rect(0, 0, 32, 32, 'A'); // dark gap (water shows where holes are — composited)
  g.box(0, 4, 32, 24, 'l', 'a', 'A'); // plank deck
  for (let x = 2; x < 32; x += 6) g.vline(x, 4, 24, 'A'); // grating slots
  g.hline(0, 4, 32, 'l'); g.hline(0, 27, 32, 'A'); // rails edges
  void seed;
  return g.render();
}

// ---- props ---------------------------------------------------------------
export function sluiceGate(): Sprite {
  const g = new Grid(40, 44);
  g.shadow(20, 42, 16, 3);
  g.box(4, 6, 32, 34, 'l', 'a', 'A'); // frame
  g.box(10, 12, 20, 24, 'A', 'a', 'x'); // gate plate
  for (let y = 14; y < 36; y += 4) g.hline(10, y, 20, 'A');
  g.ellipse(20, 6, 5, 4, 'a'); g.ellipse(20, 6, 2, 2, 'l'); // wheel valve
  g.rect(19, 2, 2, 4, 'A');
  g.outline('X');
  return g.render();
}
export function pipeValve(): Sprite {
  const g = new Grid(48, 28);
  g.shadow(24, 26, 20, 2);
  g.box(2, 8, 44, 12, 'l', 'a', 'A'); // pipe
  g.hline(2, 9, 44, 'l');
  g.box(18, 4, 12, 4, 'a', 'A', 'x'); // flange
  g.ellipse(24, 4, 4, 3, 'a'); g.ellipse(24, 4, 2, 1, 'l'); // wheel
  g.set(8, 14, 'W'); g.set(40, 14, 'W'); // bolts
  g.outline('X');
  return g.render();
}
export function pumpMachine(): Sprite {
  const g = new Grid(44, 40);
  g.shadow(22, 38, 18, 3);
  g.box(4, 10, 36, 28, 'l', 'a', 'A'); // housing
  g.box(8, 14, 14, 10, 'i', 'I', 'C'); // gauge window
  g.ellipse(15, 19, 4, 3, 'w'); g.line(15, 19, 17, 16, 'b'); // gauge needle
  g.box(26, 14, 10, 16, 'A', 'a', 'x'); // motor block
  g.ellipse(31, 22, 4, 4, 'A'); g.ellipse(31, 22, 2, 2, 'z'); // running light
  g.vline(40, 12, 24, 'a'); g.rect(40, 12, 4, 2, 'a'); // pipe out
  g.outline('X');
  return g.render();
}
export function planter(): Sprite {
  const g = new Grid(44, 26);
  g.shadow(22, 24, 18, 2);
  g.box(2, 12, 40, 12, 'n', 'k', 'K'); // trough
  g.rect(4, 10, 36, 3, 'M'); // soil
  for (let x = 6; x < 38; x += 4) { g.vline(x, 4, 7, 'g'); g.set(x, 3, 'F'); g.set(x + 1, 5, 'f'); } // sprouts
  g.outline('X');
  return g.render();
}
export function ohmCradle(): Sprite {
  const g = new Grid(34, 32);
  g.shadow(17, 30, 12, 3);
  g.box(4, 16, 26, 12, 'l', 'a', 'A'); // basin stand
  g.ellipse(17, 16, 13, 5, 'a'); g.ellipse(17, 15, 11, 4, 'C'); // basin pool
  g.ellipse(17, 13, 6, 7, '2'); g.ellipse(17, 12, 4, 5, '1'); // the cradled Ohm-egg, glowing
  g.set(17, 8, '*');
  const s = g.render();
  glow(s, 17, 13, 16, [30, 70, 130]);
  return s;
}
export function grangeTable(): Sprite {
  const g = new Grid(64, 28);
  g.shadow(32, 26, 28, 2);
  g.box(2, 8, 60, 8, 'n', 'k', 'K'); // top
  g.rect(6, 16, 3, 10, 'K'); g.rect(55, 16, 3, 10, 'K'); // legs
  g.box(10, 3, 8, 5, 'q', 'e', 'E'); // bread
  g.box(24, 2, 6, 6, 'i', 'I', 'C'); // jar
  g.box(38, 3, 7, 5, 'F', 'g', 'G'); // greens
  g.ellipse(52, 5, 4, 3, 'e'); // bowl
  g.outline('X');
  return g.render();
}
export function seedVault(): Sprite {
  const g = new Grid(48, 46);
  g.shadow(24, 44, 20, 3);
  g.box(2, 2, 44, 42, 'n', 'k', 'K'); // shelving
  for (let y = 8; y < 44; y += 9) g.hline(2, y, 44, 'K');
  for (let y = 4; y < 40; y += 9) for (let x = 6; x < 42; x += 7) { g.box(x, y, 4, 6, 'i', 'I', 'C'); g.rect(x + 1, y + 2, 2, 3, '7'); } // glowing vials
  const s = g.render();
  glow(s, 24, 22, 22, [20, 90, 80]);
  return s;
}
export function reeds(): Sprite {
  const g = new Grid(26, 34);
  const r = new Rng(6);
  for (let k = 0; k < 9; k++) { const x = r.int(2, 24); const h = r.int(14, 30); for (let y = 33; y > 33 - h; y--) g.set(x, y, r.chance(60) ? 'g' : 'f'); g.set(x, 33 - h, 'F'); if (r.chance(40)) { g.set(x, 33 - h + 2, 'k'); g.set(x, 33 - h + 3, 'k'); } } // cattail heads
  return g.render();
}
export function footbridge(): Sprite {
  const g = new Grid(64, 26);
  g.shadow(32, 24, 28, 2);
  for (let x = 2; x < 62; x += 4) g.rect(x, 8, 3, 12, x % 8 ? 'k' : 'n'); // planks
  g.rect(0, 6, 64, 2, 'n'); g.rect(0, 20, 64, 2, 'K'); // edges
  for (const x of [4, 58]) { g.rect(x, 2, 2, 6, 'k'); } // rail posts
  g.outline('X');
  return g.render();
}
export function ladder(): Sprite {
  const g = new Grid(16, 32);
  g.vline(3, 0, 32, 'a'); g.vline(12, 0, 32, 'a');
  for (let y = 3; y < 32; y += 5) g.hline(3, y, 9, 'l');
  return g.render();
}
export function lantern(): Sprite {
  const g = new Grid(16, 24);
  g.rect(7, 0, 2, 6, 'A');
  g.box(3, 5, 10, 9, 'a', 'A', 'x');
  g.box(5, 7, 6, 5, 'z', 'z', 'E');
  const s = g.render();
  glow(s, 8, 9, 22, [110, 75, 25]);
  return s;
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['wall/sec.cistern.channel_wall', channelWall(1)],
  ['ground/sec.cistern.floor', concreteFloor(2)],
  ['water/sec.cistern.water', water(3)],
  ['track/sec.cistern.catwalk', catwalk(4)],
  ['obj/sec.cistern.sluice_gate', sluiceGate()],
  ['prop/sec.cistern.pipe_valve', pipeValve()],
  ['prop/sec.cistern.pump', pumpMachine()],
  ['prop/sec.cistern.planter', planter()],
  ['prop/sec.cistern.ohm_cradle', ohmCradle()],
  ['prop/sec.cistern.grange_table', grangeTable()],
  ['prop/sec.cistern.seed_vault', seedVault()],
  ['prop/sec.cistern.reeds', reeds()],
  ['prop/sec.cistern.footbridge', footbridge()],
  ['prop/sec.cistern.ladder', ladder()],
  ['prop/sec.cistern.lantern', lantern()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 110;
const COLS = 5;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [30, 46, 50, 255]);
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
console.log(`sec.cistern: ${items.length} waterworks pieces → assets/tiles/sec_cistern/`);
