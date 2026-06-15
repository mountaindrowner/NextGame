/**
 * Bastion — sec.bastion secondary art (npm run assets:bastion). The paranoid
 * quarry-fortress (Asset Bible Part 6 + Critical Path §7): quarry rock + scree,
 * the great Wall (hero rampart + gate), watchtowers, the cement plant (silos,
 * kiln, hoppers), cranes/conveyors/scaffolding, cut-stone blocks, sandbags,
 * rubble, the Pit cave-mouth (hero), and a gate winch. Grid method, depth/
 * density. Emits assets/tiles/sec_bastion/. Bastion is the first map that takes
 * the light hive overlay (siege).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_bastion');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};

// ---- tiles ---------------------------------------------------------------
export function quarryWall(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.box(0, 0, 32, 32, 'l', 'a', 'A'); // grey quarry stone
  for (let k = 0; k < 4; k++) { const x = r.int(2, 29); const y = r.int(2, 29); g.line(x, y, x + r.int(-6, 6), y + r.int(-6, 6), 'A'); } // cut lines
  for (let k = 0; k < 10; k++) g.set(r.int(0, 31), r.int(0, 31), r.chance(50) ? 'A' : 'w');
  g.hline(0, 0, 32, 'l'); // lit top ledge
  return g.render();
}
export function scree(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'A');
  for (let k = 0; k < 42; k++) { const x = r.int(1, 30); const y = r.int(1, 30); g.set(x, y, r.chance(50) ? 'a' : 'l'); if (r.chance(30)) g.set(x, y + 1, 'A'); }
  return g.render();
}
export function gravelGround(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'a');
  for (let k = 0; k < 16; k++) g.set(r.int(0, 31), r.int(0, 31), r.chance(50) ? 'A' : 'l');
  for (let k = 0; k < 5; k++) g.ellipse(r.int(3, 28), r.int(3, 28), r.int(2, 4), 2, 'W'); // dust patch
  return g.render();
}
export function cutStone(seed: number): Sprite {
  const g = new Grid(32, 32);
  g.box(0, 0, 32, 32, 'w', 'a', 'A');
  g.hline(0, 16, 32, 'A'); g.vline(16, 0, 32, 'A'); // block joints
  g.hline(0, 0, 32, 'w'); g.vline(0, 0, 32, 'w');
  void seed;
  return g.render();
}

// ---- props ---------------------------------------------------------------
export function theWall(): Sprite {
  const g = new Grid(192, 96);
  g.shadow(96, 94, 88, 5);
  g.box(4, 28, 184, 64, 'l', 'a', 'A'); // rampart body
  for (let y = 30; y < 92; y += 8) g.hline(4, y, 184, 'A'); // courses
  for (let x = 4; x < 188; x += 16) g.vline(x, 28, 64, 'A');
  // battlements (merlons) on top
  for (let x = 6; x < 186; x += 16) g.box(x, 18, 10, 12, 'l', 'a', 'A');
  // the gate (dark arch, center)
  g.box(78, 50, 36, 42, 'x', 'X', 'X');
  for (let i = 0; i <= 16; i++) g.hline(78 + i, 50 - Math.floor(i * 0.5), 36 - 2 * i, 'A'); // arch
  g.rect(94, 50, 4, 42, 'A'); // gate seam
  g.outline('X');
  return g.render();
}
export function watchtower(): Sprite {
  const g = new Grid(56, 120);
  g.shadow(28, 118, 22, 4);
  g.box(8, 40, 40, 78, 'l', 'a', 'A'); // shaft
  for (let y = 44; y < 116; y += 8) g.hline(8, y, 40, 'A');
  g.box(2, 22, 52, 20, 'l', 'a', 'A'); // wider top
  for (let x = 4; x < 52; x += 10) g.box(x, 14, 6, 8, 'l', 'a', 'A'); // crenellations
  g.box(20, 28, 16, 10, 'x', 'X', 'X'); // dark window
  g.set(27, 32, 'z'); // a watch-lamp
  g.outline('X');
  return g.render();
}
export function cementSilo(): Sprite {
  const g = new Grid(48, 120);
  g.shadow(24, 118, 20, 4);
  g.box(6, 24, 36, 94, 'w', 'W', 'A'); // concrete cylinder
  for (let x = 8; x < 40; x += 4) g.vline(x, 24, 94, x % 8 ? 'W' : 'w');
  g.hline(6, 60, 36, 'A'); g.hline(6, 90, 36, 'A'); // bands
  for (let i = 0; i <= 10; i++) g.hline(8 + i, 24 - i, 32 - 2 * i, 'a'); // conical top
  g.rect(40, 70, 6, 30, 'a'); // discharge chute
  g.outline('X');
  return g.render();
}
export function kiln(): Sprite {
  const g = new Grid(96, 48);
  g.shadow(48, 46, 42, 3);
  g.box(4, 14, 88, 22, 'e', 'E', 'x'); // rotary kiln drum (rusty)
  for (let x = 8; x < 90; x += 10) g.vline(x, 14, 22, 'E');
  g.box(2, 10, 12, 30, 'a', 'A', 'x'); // intake ring
  g.box(82, 12, 14, 26, 'a', 'A', 'x'); // outlet hood
  g.set(86, 24, 'Z'); g.set(88, 26, 'z'); // burner glow
  g.outline('X');
  return g.render();
}
export function crane(): Sprite {
  const g = new Grid(72, 120);
  g.shadow(36, 118, 16, 4);
  g.line(12, 116, 24, 24, 'a'); g.line(48, 116, 36, 24, 'a'); // legs
  for (let y = 40; y < 112; y += 10) g.line(14 + (116 - y) * 0.1, y, 46 - (116 - y) * 0.1, y, 'A');
  g.rect(8, 20, 60, 5, 'l'); // jib
  g.rect(58, 20, 4, 5, 'A');
  g.vline(60, 24, 28, 'W'); g.box(57, 52, 8, 8, 'e', 'E', 'x'); // cable + hook load
  g.outline('X');
  return g.render();
}
export function conveyor(): Sprite {
  const g = new Grid(96, 28);
  g.shadow(48, 26, 42, 2);
  g.box(2, 8, 92, 8, 'A', 'a', 'x'); // belt frame
  g.hline(2, 9, 92, 'l');
  for (let x = 6; x < 92; x += 8) g.set(x, 12, 'k'); // material on belt
  g.ellipse(6, 12, 4, 4, 'a'); g.ellipse(90, 12, 4, 4, 'a'); // rollers
  for (let x = 12; x < 90; x += 14) g.rect(x, 16, 2, 8, 'A'); // legs
  g.outline('X');
  return g.render();
}
export function scaffold(): Sprite {
  const g = new Grid(56, 80);
  for (let x = 4; x < 52; x += 16) g.vline(x, 4, 74, 'a');
  for (let y = 8; y < 78; y += 16) { g.hline(4, y, 48, 'a'); g.rect(6, y - 6, 44, 2, 'k'); } // planks
  for (let y = 8; y < 74; y += 16) g.line(4, y, 20, y + 16, 'A'); // braces
  g.outline('X');
  return g.render();
}
export function pitMouth(): Sprite {
  const g = new Grid(96, 64);
  g.shadow(48, 62, 44, 4);
  g.box(2, 8, 92, 54, 'l', 'a', 'A'); // rock frame
  g.ellipse(48, 44, 40, 24, 'x'); // dark mouth
  g.ellipse(48, 46, 36, 20, 'X');
  for (let i = 0; i < 5; i++) { const a = (i / 4) * 3.14; g.line(48 + Math.cos(a) * 30, 30 - Math.abs(Math.sin(a)) * 6, 48 + Math.cos(a) * 26, 38, 'A'); } // jagged rim
  g.rect(38, 56, 20, 6, 'k'); // mine-cart rail lip
  g.outline('X');
  return g.render();
}
export function gateWinch(): Sprite {
  const g = new Grid(36, 36);
  g.shadow(18, 34, 14, 2);
  g.box(4, 14, 28, 18, 'l', 'a', 'A'); // housing
  g.ellipse(18, 20, 8, 7, 'a'); g.ellipse(18, 20, 4, 3, 'A'); // drum/gear
  for (let i = 0; i < 8; i++) { const an = (i / 8) * 6.28; g.set(18 + Math.cos(an) * 8, 20 + Math.sin(an) * 7, 'l'); } // teeth
  g.rect(30, 6, 2, 12, 'A'); g.ellipse(31, 6, 3, 3, 'b'); // lever
  g.outline('X');
  return g.render();
}
export function sandbags(): Sprite {
  const g = new Grid(40, 22);
  g.shadow(20, 20, 16, 2);
  for (let row = 0; row < 2; row++) for (let x = 2 + (row % 2) * 5; x < 38; x += 10) g.ellipse(x + 4, 16 - row * 6, 5, 4, row % 2 ? 'J' : 'j');
  g.outline('X');
  return g.render();
}
export function rubbleHeap(): Sprite {
  const g = new Grid(44, 28);
  const r = new Rng(4);
  g.shadow(22, 26, 18, 2);
  for (let k = 0; k < 18; k++) g.box(r.int(2, 38), r.int(10, 24), r.int(4, 8), r.int(3, 6), 'l', 'a', 'A');
  g.outline('X');
  return g.render();
}
export function brazier(): Sprite {
  const g = new Grid(18, 24);
  g.shadow(9, 22, 6, 2);
  g.box(4, 12, 10, 8, 'a', 'A', 'x');
  g.ellipse(9, 9, 4, 3, 'Z'); g.ellipse(9, 10, 2, 2, 'z'); g.set(9, 6, 'z');
  const s = g.render();
  for (let y = 2; y < 18; y++) for (let x = 0; x < 18; x++) { const d = Math.hypot(x - 9, y - 9); if (d > 12) continue; const a = (1 - d / 12) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + 120 * a), Math.min(255, c[1] + 70 * a), Math.min(255, c[2] + 20 * a), Math.max(c[3] ?? 0, Math.round(45 * a))]); }
  return s;
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['wall/sec.bastion.quarry_wall', quarryWall(1)],
  ['ground/sec.bastion.scree', scree(2)],
  ['ground/sec.bastion.gravel', gravelGround(3)],
  ['ground/sec.bastion.cutstone', cutStone(4)],
  ['prop/sec.bastion.wall', theWall()],
  ['prop/sec.bastion.watchtower', watchtower()],
  ['prop/sec.bastion.cement_silo', cementSilo()],
  ['prop/sec.bastion.kiln', kiln()],
  ['prop/sec.bastion.crane', crane()],
  ['prop/sec.bastion.conveyor', conveyor()],
  ['prop/sec.bastion.scaffold', scaffold()],
  ['prop/sec.bastion.pit_mouth', pitMouth()],
  ['obj/sec.bastion.gate_winch', gateWinch()],
  ['prop/sec.bastion.sandbags', sandbags()],
  ['prop/sec.bastion.rubble', rubbleHeap()],
  ['prop/sec.bastion.brazier', brazier()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 150;
const COLS = 4;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [64, 60, 54, 255]);
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
console.log(`sec.bastion: ${items.length} quarry-fortress pieces → assets/tiles/sec_bastion/`);
