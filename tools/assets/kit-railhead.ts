/**
 * Railhead — sec.railhead secondary art (npm run assets:railhead). The rail-
 * junction trade town (Asset Bible Part 6 + Critical Path §3): tracks, boxcars,
 * the roundhouse + turntable (heroes), switch levers & semaphores, platforms,
 * market stalls, broker desks, coal piles, the signal gantry, buffer stops, and
 * lanterns. Grid method, depth/density laws. Emits assets/tiles/sec_railhead/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';
import { watertower } from '../world-builders';

const T = 32;
const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_railhead');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};

// ---- track tiles ---------------------------------------------------------
export function ballast(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A');
  for (let k = 0; k < 40; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'a' : 'l');
  return g.render();
}
export function railH(seed: number): Sprite {
  const g = ballastGrid(seed);
  for (let x = 1; x < T; x += 5) g.rect(x, 4, 3, 24, 'K'); // ties
  g.hline(0, 9, T, 'l'); g.hline(0, 10, T, 'A');
  g.hline(0, 22, T, 'l'); g.hline(0, 23, T, 'A'); // rails
  return g.render();
}
export function railV(seed: number): Sprite {
  const g = ballastGrid(seed);
  for (let y = 1; y < T; y += 5) g.rect(4, y, 24, 3, 'K');
  g.vline(9, 0, T, 'l'); g.vline(10, 0, T, 'A');
  g.vline(22, 0, T, 'l'); g.vline(23, 0, T, 'A');
  return g.render();
}
export function railCross(seed: number): Sprite {
  const g = ballastGrid(seed);
  g.hline(0, 9, T, 'l'); g.hline(0, 22, T, 'l');
  g.vline(9, 0, T, 'l'); g.vline(22, 0, T, 'l');
  g.hline(0, 10, T, 'A'); g.hline(0, 23, T, 'A');
  g.vline(10, 0, T, 'A'); g.vline(23, 0, T, 'A');
  return g.render();
}
function ballastGrid(seed: number): Grid {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A');
  for (let k = 0; k < 30; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'a' : 'l');
  return g;
}

// ---- props ---------------------------------------------------------------
export function boxcar(): Sprite {
  const g = new Grid(128, 60);
  g.shadow(64, 58, 56, 4);
  g.box(4, 6, 120, 40, 'e', 'E', 'x'); // rusted body
  g.hline(4, 6, 120, 'q'); // lit roof edge
  g.box(40, 12, 22, 30, 'E', 'x', 'x'); // sliding door
  g.box(66, 12, 22, 30, 'E', 'x', 'x');
  g.vline(51, 12, 30, 'x'); g.vline(77, 12, 30, 'x');
  for (let x = 10; x < 120; x += 16) g.vline(x, 8, 36, 'x'); // plank seams
  for (const x of [16, 60, 110]) { g.ellipse(x, 50, 6, 6, 'x'); g.ellipse(x, 50, 3, 3, 'A'); } // wheels
  for (let k = 0; k < 18; k++) g.set(new Rng(k + 1).int(6, 122), new Rng(k * 3 + 2).int(8, 44), 'q'); // rust
  g.outline('X');
  return g.render();
}
export function roundhouse(): Sprite {
  const g = new Grid(184, 120);
  g.shadow(92, 118, 84, 5);
  // curved brick engine shed
  g.box(6, 30, 172, 86, 'e', 'E', 'x');
  for (let y = 32; y < 116; y += 5) g.hline(6, y, 172, 'x'); // brick courses
  // arched bay doors
  for (let b = 0; b < 5; b++) {
    const bx = 16 + b * 34;
    g.box(bx, 56, 26, 58, 'x', 'X', 'X'); // dark bay
    for (let i = 0; i <= 10; i++) g.hline(bx + i, 56 - Math.floor(i * 0.7), 26 - 2 * i, 'E'); // arch
    if (b % 2) { g.set(bx + 13, 70, 'z'); g.set(bx + 13, 74, 'z'); } // a lit forge inside
  }
  // low roof + clerestory
  g.rect(2, 24, 180, 8, 'a'); g.hline(2, 24, 180, 'l');
  for (let x = 20; x < 170; x += 24) g.box(x, 16, 12, 8, 'i', 'I', 'C'); // skylights
  g.outline('X');
  return g.render();
}
export function turntable(): Sprite {
  const g = new Grid(128, 120);
  g.shadow(64, 118, 56, 4);
  g.ellipse(64, 64, 60, 52, 'A'); // pit rim
  g.ellipse(64, 64, 56, 48, 'x'); // pit
  g.ellipse(64, 64, 54, 46, 'X');
  // the rotating rail bridge
  g.rect(8, 60, 112, 8, 'a'); g.hline(8, 60, 112, 'l'); g.hline(8, 67, 112, 'A');
  for (let x = 12; x < 116; x += 6) g.rect(x, 61, 3, 6, 'K'); // ties
  g.vline(20, 60, 8, 'l'); g.vline(108, 60, 8, 'l'); // bridge rails
  g.ellipse(64, 64, 8, 7, 'a'); g.ellipse(64, 64, 4, 3, 'l'); // hub
  g.outline('X');
  return g.render();
}
export function semaphore(): Sprite {
  const g = new Grid(24, 96);
  g.shadow(12, 94, 6, 3);
  g.rect(10, 8, 4, 86, 'A'); g.vline(10, 8, 86, 'l'); // mast
  g.rect(14, 16, 8, 3, 'b'); // raised arm (red)
  g.set(20, 16, '*');
  g.box(8, 22, 8, 14, 'a', 'A', 'x'); // lamp housing
  g.set(11, 26, 'b'); g.set(11, 31, 'f'); // red/green lamps
  g.outline('X');
  return g.render();
}
export function switchLever(): Sprite {
  const g = new Grid(24, 30);
  g.shadow(12, 28, 7, 2);
  g.box(6, 16, 12, 12, 'a', 'A', 'x'); // base
  g.line(12, 16, 18, 2, 'A'); // lever
  g.ellipse(18, 2, 3, 3, 'b'); // red handle ball
  g.set(17, 1, '*');
  g.outline('X');
  return g.render();
}
export function marketStall(): Sprite {
  const g = new Grid(64, 64);
  g.shadow(32, 62, 28, 4);
  for (const x of [6, 56]) g.rect(x, 28, 4, 34, 'k'); // posts
  // striped tarp roof
  for (let x = 2; x < 62; x += 6) g.vline(2 + x, 18, 12, x % 12 ? 'e' : 'w');
  g.hline(0, 16, 64, 'k'); g.hline(0, 30, 64, 'K');
  g.box(8, 40, 48, 16, 'n', 'k', 'K'); // counter
  // wares
  g.box(12, 34, 8, 7, 'e', 'E', 'x'); g.box(24, 35, 7, 6, 'l', 'a', 'A'); g.box(38, 34, 9, 7, 'j', 'J', 'J');
  g.outline('X');
  return g.render();
}
export function coalPile(): Sprite {
  const g = new Grid(48, 32);
  const r = new Rng(5);
  g.shadow(24, 30, 20, 3);
  g.ellipse(24, 22, 22, 11, 'X');
  for (let k = 0; k < 30; k++) { const x = r.int(4, 44); const y = r.int(12, 28); g.set(x, y, r.chance(40) ? 'A' : 'x'); if (r.chance(20)) g.set(x, y, 'a'); }
  g.outline('X');
  return g.render();
}
export function brokerDesk(): Sprite {
  const g = new Grid(64, 32);
  g.shadow(32, 30, 28, 2);
  g.box(2, 10, 60, 12, 'n', 'k', 'K'); // desk
  g.box(6, 4, 14, 7, 'w', 'W', 'A'); // ledger papers
  g.box(44, 14, 14, 14, 'a', 'A', 'x'); // a small safe
  g.ellipse(51, 21, 3, 3, 'A'); g.ellipse(51, 21, 1, 1, 'z'); // dial
  g.set(26, 8, 'z'); // lamp
  g.outline('X');
  return g.render();
}
export function commodityCrate(): Sprite {
  const g = new Grid(28, 28);
  g.shadow(14, 26, 11, 2);
  g.box(2, 4, 24, 22, 'n', 'k', 'K');
  g.rect(5, 11, 18, 6, 'w'); // label panel
  g.hline(7, 13, 6, 'x'); g.hline(7, 15, 10, 'x'); // stencil (abstract)
  g.outline('X');
  return g.render();
}
export function signalGantry(): Sprite {
  const g = new Grid(128, 44);
  g.rect(4, 6, 120, 4, 'a'); g.hline(4, 6, 120, 'l'); // top chord
  g.rect(4, 22, 120, 4, 'a'); // bottom chord
  for (let x = 8; x < 124; x += 12) { g.line(x, 10, x + 6, 22, 'A'); g.line(x + 6, 10, x, 22, 'A'); } // truss
  for (const x of [30, 70, 100]) { g.box(x, 26, 8, 12, 'a', 'A', 'x'); g.set(x + 3, 30, 'b'); g.set(x + 3, 34, 'f'); } // signal heads
  return g.render();
}
export function bufferStop(): Sprite {
  const g = new Grid(40, 32);
  g.shadow(20, 30, 16, 2);
  g.box(6, 8, 28, 14, 'b', 'B', 'x'); // red/black bumper
  for (let x = 8; x < 32; x += 6) g.vline(x, 8, 14, 'X');
  g.rect(12, 22, 4, 8, 'A'); g.rect(24, 22, 4, 8, 'A'); // legs
  g.outline('X');
  return g.render();
}
export function platform(): Sprite {
  const g = new Grid(96, 24);
  g.shadow(48, 22, 44, 2);
  g.box(2, 4, 92, 16, 'w', 'W', 'A'); // concrete edge
  g.hline(2, 4, 92, 'w'); g.hline(2, 12, 92, 'A');
  for (let x = 6; x < 92; x += 8) g.set(x, 18, 'z'); // edge studs
  g.outline('X');
  return g.render();
}
export function lantern(): Sprite {
  const g = new Grid(16, 26);
  g.rect(7, 0, 2, 6, 'A');
  g.box(3, 5, 10, 9, 'a', 'A', 'x');
  g.box(5, 7, 6, 5, 'z', 'z', 'E');
  const s = g.render();
  for (let y = 2; y < 18; y++) for (let x = 0; x < 16; x++) { const d = Math.hypot(x - 8, y - 9); if (d > 9) continue; const a = (1 - d / 9) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + 120 * a), Math.min(255, c[1] + 80 * a), Math.min(255, c[2] + 25 * a), Math.max(c[3] ?? 0, Math.round(45 * a))]); }
  return s;
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['track/sec.railhead.rail_h', railH(1)],
  ['track/sec.railhead.rail_v', railV(2)],
  ['track/sec.railhead.rail_cross', railCross(3)],
  ['track/sec.railhead.ballast', ballast(4)],
  ['prop/sec.railhead.boxcar', boxcar()],
  ['prop/sec.railhead.roundhouse', roundhouse()],
  ['prop/sec.railhead.turntable', turntable()],
  ['prop/sec.railhead.semaphore', semaphore()],
  ['obj/sec.railhead.switch_lever', switchLever()],
  ['prop/sec.railhead.market_stall', marketStall()],
  ['prop/sec.railhead.coal_pile', coalPile()],
  ['prop/sec.railhead.broker_desk', brokerDesk()],
  ['prop/sec.railhead.commodity_crate', commodityCrate()],
  ['prop/sec.railhead.signal_gantry', signalGantry()],
  ['prop/sec.railhead.buffer_stop', bufferStop()],
  ['prop/sec.railhead.platform', platform()],
  ['prop/sec.railhead.rail_watertower', watertower()],
  ['prop/sec.railhead.lantern', lantern()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 150;
const COLS = 5;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [58, 56, 52, 255]);
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
  writeFileSync(join(OUT, '_contact.png'), PNG.sync.write(png));
}
console.log(`sec.railhead: ${items.length} rail-town pieces → assets/tiles/sec_railhead/`);
