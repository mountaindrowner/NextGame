/**
 * Redoubt & the Bunker — sec.redoubt secondary art (npm run assets:redoubt).
 * The military colony / midpoint reveal (Asset Bible Part 6 + Critical Path §9):
 * prefab facades, the bunker blast-door + ramp (hero), the command center
 * (consoles/monitors, server banks, map table, the audio-log terminal, and the
 * Eli Vane photo + logbook — Grandpa's first trace, hero), armory racks,
 * checkpoint gates, generators, sandbags, razorwire, hazard stencils, and
 * flickering emergency lights. Grid method, depth/density. Medium hive overlay.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_redoubt');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};
function glowS(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + col[0] * a), Math.min(255, c[1] + col[1] * a), Math.min(255, c[2] + col[2] * a), Math.max(c[3] ?? 0, Math.round(50 * a))]); }
}

// ---- tiles ---------------------------------------------------------------
export function prefabWall(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.box(0, 0, 32, 32, 'h', 'j', 'J'); // olive prefab panel
  for (let x = 0; x < 32; x += 8) g.vline(x, 0, 32, 'J'); // corrugation
  g.hline(0, 0, 32, 'h');
  for (let k = 0; k < 4; k++) { g.set(r.int(1, 30), r.int(1, 30), 'a'); } // rivets
  return g.render();
}
export function concreteFloor(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'a');
  for (let k = 0; k < 12; k++) g.set(r.int(0, 31), r.int(0, 31), r.chance(50) ? 'A' : 'W');
  if (r.chance(50)) { const x = r.int(4, 28); g.line(x, r.int(2, 28), x + r.int(-7, 7), r.int(2, 28), 'A'); }
  return g.render();
}
export function hazardFloor(seed: number): Sprite {
  const g = new Grid(32, 32);
  g.rect(0, 0, 32, 32, 'a');
  for (let x = -32; x < 32; x += 10) for (let i = 0; i < 5; i++) g.line(x + i, 31, x + i + 31, 0, i < 3 ? 'z' : 'X'); // hazard stripes
  void seed;
  return g.render();
}
export function grate(seed: number): Sprite {
  const g = new Grid(32, 32);
  g.rect(0, 0, 32, 32, 'A');
  for (let y = 2; y < 32; y += 5) for (let x = 2; x < 32; x += 5) { g.rect(x, y, 3, 3, 'a'); g.set(x, y, 'l'); }
  void seed;
  return g.render();
}

// ---- props ---------------------------------------------------------------
export function blastRamp(): Sprite {
  const g = new Grid(120, 80);
  g.shadow(60, 78, 54, 4);
  g.box(8, 6, 104, 30, 'l', 'a', 'A'); // bunker headwall
  for (let y = 8; y < 34; y += 6) g.hline(8, y, 104, 'A');
  // the blast door (heavy, half-open into dark)
  g.box(40, 12, 40, 24, 'A', 'a', 'x');
  g.box(46, 16, 28, 18, 'x', 'X', 'X'); // dark interior
  for (let y = 18; y < 34; y += 4) g.hline(46, y, 28, 'A');
  g.set(60, 24, 'z'); g.set(64, 27, 'z'); // a light inside
  // ramp down (perspective bands)
  for (let i = 0; i < 12; i++) { const w = 60 - i * 3; g.hline(60 - w / 2, 36 + i * 3, w, i % 2 ? 'A' : 'a'); }
  g.box(4, 4, 6, 32, 'z', 'Z', 'E'); g.box(110, 4, 6, 32, 'z', 'Z', 'E'); // hazard pillars
  g.outline('X');
  return g.render();
}
export function commandConsole(): Sprite {
  const g = new Grid(96, 40);
  g.shadow(48, 38, 42, 3);
  g.box(2, 14, 92, 24, 'l', 'a', 'A'); // console bank
  for (let i = 0; i < 4; i++) { g.box(6 + i * 22, 4, 18, 12, 'i', 'I', 'C'); for (let y = 6; y < 14; y += 2) g.hline(8 + i * 22, y, 14, i === 1 ? '7' : 'v'); }
  g.set(11, 8, 'z'); g.set(33, 10, 'b'); g.set(55, 8, '7'); g.set(77, 10, 'z'); // status lights
  for (let x = 6; x < 90; x += 4) g.rect(x, 28, 2, 2, x % 8 ? 'A' : 'z'); // keys
  const s = g.render();
  glowS(s, 48, 10, 30, [20, 50, 80]);
  return s;
}
export function serverBank(): Sprite {
  const g = new Grid(40, 56);
  g.shadow(20, 54, 16, 3);
  g.box(2, 2, 36, 52, 'l', 'a', 'A');
  for (let y = 6; y < 52; y += 6) { g.hline(4, y, 32, 'A'); for (let x = 6; x < 36; x += 4) g.set(x, y + 2, x % 8 ? 'f' : 'b'); } // blinking LEDs
  const s = g.render();
  glowS(s, 20, 28, 22, [20, 60, 30]);
  return s;
}
export function mapTable(): Sprite {
  const g = new Grid(56, 34);
  g.shadow(28, 32, 24, 2);
  g.box(4, 8, 48, 16, 'n', 'k', 'K'); // table
  g.box(8, 10, 40, 11, 'g', 'G', 'G'); // lit map surface (greenish)
  for (let k = 0; k < 6; k++) g.set(12 + k * 6, 15, 'b'); // pins
  g.line(10, 12, 44, 19, 'h');
  g.rect(8, 24, 3, 8, 'K'); g.rect(45, 24, 3, 8, 'K'); // legs
  g.outline('X');
  return g.render();
}
export function audioLog(): Sprite {
  const g = new Grid(28, 32);
  g.shadow(14, 30, 10, 2);
  g.box(4, 6, 20, 24, 'l', 'a', 'A');
  g.box(7, 9, 14, 8, 'i', 'I', 'C'); // small screen
  g.ellipse(14, 22, 4, 4, 'A'); g.ellipse(14, 22, 2, 2, 'b'); // play/rec light
  for (let x = 7; x < 20; x += 4) g.rect(x, 26, 2, 2, 'z'); // buttons
  const s = g.render();
  glowS(s, 14, 22, 16, [90, 25, 25]);
  return s;
}
/** The Eli Vane photo + logbook — Grandpa's first trace (story hero). */
export function eliPhoto(): Sprite {
  const g = new Grid(32, 30);
  g.shadow(16, 28, 12, 2);
  g.box(2, 18, 28, 10, 'n', 'k', 'K'); // a desk/ledge
  // the framed photo (a figure — old scrapper)
  g.box(5, 2, 14, 16, 'l', 'a', 'A'); // frame
  g.box(7, 4, 10, 12, 'C', 'c', 'C'); // photo bg
  g.ellipse(12, 8, 3, 3, 'S'); g.rect(10, 11, 5, 4, 'w'); // a face + grey coat
  g.set(11, 7, 'W'); g.set(13, 7, 'W'); // grey hair
  // the logbook beside it
  g.box(20, 8, 9, 12, 'B', 'b', 'B');
  g.hline(21, 10, 7, 'z'); g.hline(21, 13, 5, 'w'); g.hline(21, 15, 6, 'w'); // pages/initials
  const s = g.render();
  glowS(s, 16, 14, 18, [70, 50, 20]); // a warm, drawing-the-eye glow
  return s;
}
export function armoryRack(): Sprite {
  const g = new Grid(28, 36);
  g.shadow(14, 34, 11, 2);
  g.box(2, 4, 24, 30, 'l', 'a', 'A');
  for (let i = 0; i < 4; i++) { g.rect(6 + i * 5, 8, 2, 18, 'A'); g.ellipse(7 + i * 5, 8, 2, 2, 'k'); g.set(7 + i * 5, 24, 'z'); } // stun-batons (no firearms)
  g.outline('X');
  return g.render();
}
export function checkpointGate(): Sprite {
  const g = new Grid(48, 32);
  g.shadow(24, 30, 20, 2);
  g.box(2, 14, 8, 16, 'l', 'a', 'A'); g.box(38, 14, 8, 16, 'l', 'a', 'A'); // posts
  for (let x = 4; x < 44; x += 6) g.rect(x, 16, 4, 3, x % 12 ? 'z' : 'X'); // striped barrier arm
  g.set(6, 12, 'b'); // a light
  g.outline('X');
  return g.render();
}
export function generator(): Sprite {
  const g = new Grid(36, 32);
  g.shadow(18, 30, 14, 2);
  g.box(4, 8, 28, 22, 'l', 'a', 'A');
  g.box(8, 12, 12, 10, 'A', 'a', 'x'); // engine block
  g.ellipse(26, 16, 4, 4, 'A'); g.ellipse(26, 16, 2, 2, 'z'); // dial
  g.vline(32, 6, 18, 'a'); g.rect(32, 6, 4, 2, 'a'); // exhaust
  g.set(14, 14, 'b'); // running light
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
export function razorwire(): Sprite {
  const g = new Grid(40, 18);
  const r = new Rng(3);
  for (let x = 2; x < 38; x += 1) { const y = 9 + Math.round(Math.sin(x * 0.6) * 5); g.set(x, y, 'l'); if (r.chance(30)) { g.set(x, y - 1, 'l'); g.set(x + 1, y, 'W'); } } // coiled wire + barbs
  return g.render();
}
export function emergencyLight(): Sprite {
  const g = new Grid(14, 14);
  g.box(2, 4, 10, 6, 'A', 'a', 'x');
  g.box(4, 5, 6, 4, 'b', 'B', 'B'); // red dome
  const s = g.render();
  glowS(s, 7, 7, 20, [120, 20, 20]);
  return s;
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['wall/sec.redoubt.prefab', prefabWall(1)],
  ['ground/sec.redoubt.floor', concreteFloor(2)],
  ['ground/sec.redoubt.hazard', hazardFloor(3)],
  ['ground/sec.redoubt.grate', grate(4)],
  ['prop/sec.redoubt.blast_ramp', blastRamp()],
  ['prop/sec.redoubt.command_console', commandConsole()],
  ['prop/sec.redoubt.server_bank', serverBank()],
  ['prop/sec.redoubt.map_table', mapTable()],
  ['obj/sec.redoubt.audio_log', audioLog()],
  ['obj/sec.redoubt.eli_photo', eliPhoto()],
  ['prop/sec.redoubt.armory_rack', armoryRack()],
  ['obj/sec.redoubt.checkpoint', checkpointGate()],
  ['prop/sec.redoubt.generator', generator()],
  ['prop/sec.redoubt.sandbags', sandbags()],
  ['prop/sec.redoubt.razorwire', razorwire()],
  ['prop/sec.redoubt.emergency_light', emergencyLight()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 130;
const COLS = 4;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [40, 44, 38, 255]);
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
console.log(`sec.redoubt: ${items.length} military/bunker pieces → assets/tiles/sec_redoubt/`);
