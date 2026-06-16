/**
 * The Chancel — sec.chancel secondary art (npm run assets:chancel). Colony 5:
 * a ruined megachurch + catacombs (Asset Bible + Critical Path §11). Nave with
 * pews, altar & dais, the reliquary (the cult's revered "saint" Ohm), broken
 * stained glass casting colored light, candelabra and torch sconces (LUMEN),
 * draped banners, organ pipes, catacomb walls with bone niches, and the
 * Cantor's Static-tinged corrupted shrine (hero). Sacred; med hive. Grid
 * method, depth/density. assets/tiles/sec_chancel/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_chancel');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};
function glowS(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + col[0] * a), Math.min(255, c[1] + col[1] * a), Math.min(255, c[2] + col[2] * a), Math.max(c[3] ?? 0, Math.round(45 * a))]); }
}

// ---- tiles ---------------------------------------------------------------
export function naveFloor(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'a'); // stone flags
  g.hline(0, 0, 32, 'A'); g.vline(0, 0, 32, 'A'); // grout
  g.hline(0, 16, 32, 'A'); g.vline(16, 0, 32, 'A'); // 4-flag grid
  for (let k = 0; k < 5; k++) g.set(r.int(1, 30), r.int(1, 30), 'l'); // chips of light
  for (let k = 0; k < 3; k++) g.line(r.int(2, 28), r.int(2, 14), r.int(2, 28), r.int(16, 30), 'A'); // hairline cracks
  return g.render();
}
export function cryptFloor(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'A'); // dark stone
  for (let k = 0; k < 7; k++) g.ellipse(r.int(2, 29), r.int(2, 29), r.int(2, 4), r.int(1, 2), 'x'); // worn hollows
  for (let k = 0; k < 8; k++) g.set(r.int(0, 31), r.int(0, 31), 'k'); // grave dirt
  for (let k = 0; k < 4; k++) g.set(r.int(0, 31), r.int(0, 31), 'w'); // bone dust
  return g.render();
}
export function catacombWall(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'a'); // stone
  for (let y = 0; y < 32; y += 8) g.hline(0, y, 32, 'A'); // courses
  for (let x = 0; x < 32; x += 8) for (let y = 0; y < 32; y += 8) g.set((x + (Math.floor(y / 8) % 2) * 4) % 32, y, 'A'); // brick offset
  // a bone niche
  g.box(10, 10, 12, 16, 'x', 'x', 'X');
  g.line(13, 22, 19, 22, 'w'); g.line(13, 23, 19, 23, 'W'); // stacked bones
  g.ellipse(16, 16, 3, 3, 'w'); g.set(15, 16, 'X'); g.set(17, 16, 'X'); // a skull
  void r;
  return g.render();
}

// ---- props ---------------------------------------------------------------
export function altar(): Sprite {
  const g = new Grid(72, 56);
  g.shadow(36, 54, 30, 4);
  g.box(8, 38, 56, 16, 'l', 'a', 'A'); // dais step
  g.box(20, 18, 32, 22, 'l', 'a', 'A'); // altar block
  for (let y = 22; y < 38; y += 5) g.hline(20, y, 32, 'A');
  g.box(28, 8, 16, 12, 'Y', 'y', 'A'); // a gilded plate
  g.ellipse(36, 14, 4, 4, 'z'); g.set(36, 13, '*'); // a votive flame
  const s = g.render(); glowS(s, 36, 14, 16, [120, 90, 30]); return s;
}
export function pew(): Sprite {
  const g = new Grid(72, 28);
  g.shadow(36, 26, 32, 3);
  g.box(4, 6, 64, 8, 'n', 'k', 'K'); // back rail
  g.box(4, 16, 64, 6, 'n', 'k', 'K'); // seat
  g.vline(8, 6, 18, 'K'); g.vline(63, 6, 18, 'K'); // legs
  for (let x = 10; x < 64; x += 8) g.set(x, 9, 'n'); // worn highlights
  g.outline('X');
  return g.render();
}
export function pewBroken(): Sprite {
  const g = new Grid(72, 28);
  g.shadow(36, 26, 30, 3);
  g.box(4, 10, 36, 7, 'n', 'k', 'K'); // half a bench, tilted
  for (let i = 0; i < 24; i++) g.set(40 + i, 16 - Math.floor(i * 0.4), 'k'); // snapped plank trailing
  g.vline(8, 10, 14, 'K');
  g.set(30, 20, 'K'); g.set(50, 22, 'K'); // splinters
  g.outline('X');
  return g.render();
}
export function reliquary(): Sprite {
  const g = new Grid(64, 96);
  g.shadow(32, 94, 24, 4);
  g.box(14, 60, 36, 34, 'l', 'a', 'A'); // stone plinth
  for (let y = 64; y < 92; y += 6) g.hline(14, y, 36, 'A');
  // gilded reliquary case
  g.box(18, 22, 28, 40, 'Y', 'y', 'A');
  g.box(22, 26, 20, 32, 'i', 'I', 'C'); // glass front
  // the "saint" Ohm enshrined within (a small revered machine)
  g.box(26, 36, 12, 18, 'l', 'a', 'A'); g.rect(28, 40, 8, 4, 'z'); // its lit core (eyes)
  g.set(29, 48, 'x'); g.set(34, 48, 'x');
  // a gabled gold crown
  for (let i = 0; i <= 8; i++) g.hline(18 + i, 22 - i, 28 - 2 * i, 'Y');
  g.set(32, 12, '*');
  g.outline('X');
  const s = g.render(); glowS(s, 32, 44, 26, [150, 120, 40]); return s;
}
export function candelabra(): Sprite {
  const g = new Grid(28, 56);
  g.shadow(14, 54, 9, 3);
  g.box(11, 26, 6, 28, 'l', 'a', 'A'); // brass stem
  g.box(4, 24, 20, 4, 'Y', 'y', 'A'); // arms
  for (const cx of [6, 14, 22]) { g.vline(cx, 16, 8, 'w'); g.ellipse(cx, 14, 2, 3, 'Z'); g.set(cx, 12, 'z'); g.set(cx, 11, '*'); } // 3 candles + flames
  const s = g.render(); glowS(s, 14, 14, 16, [130, 90, 30]); return s;
}
export function organPipes(): Sprite {
  const g = new Grid(80, 88);
  g.shadow(40, 86, 36, 3);
  g.box(6, 70, 68, 16, 'n', 'k', 'K'); // wooden case base
  const h = [40, 56, 72, 84, 72, 56, 40, 30]; // pipe heights, tallest centre
  for (let i = 0; i < h.length; i++) { const x = 8 + i * 9; const ph = h[i]!; g.box(x, 70 - ph, 7, ph, 'l', 'a', 'A'); g.ellipse(x + 3, 70 - ph, 3, 2, 'l'); g.rect(x + 1, 66, 5, 3, 'x'); } // pipes + mouths
  g.outline('X');
  return g.render();
}
export function roseWindow(): Sprite {
  const g = new Grid(72, 72);
  const cols = ['1', '4', 'b', 'F', 'z', '7', '5', 'I'];
  g.ellipse(36, 36, 34, 34, 'A'); // stone frame
  g.ellipse(36, 36, 30, 30, 'x');
  for (let i = 0; i < 12; i++) { // petal segments of colored glass
    const a0 = (i / 12) * Math.PI * 2;
    const col = cols[i % cols.length]!;
    for (let rr = 6; rr < 29; rr++) { const x = 36 + Math.cos(a0) * rr; const y = 36 + Math.sin(a0) * rr; g.ellipse(x, y, 3, 3, col); }
  }
  g.ellipse(36, 36, 7, 7, '*'); g.ellipse(36, 36, 5, 5, 'z'); // a bright oculus
  for (let i = 0; i < 12; i++) { const a0 = (i / 12) * Math.PI * 2; g.line(36, 36, 36 + Math.cos(a0) * 30, 36 + Math.sin(a0) * 30, 'A'); } // leading
  const s = g.render(); glowS(s, 36, 36, 36, [70, 60, 90]); return s;
}
export function banner(): Sprite {
  const g = new Grid(28, 60);
  g.box(2, 0, 24, 6, 'n', 'k', 'K'); // rod
  g.box(5, 6, 18, 48, 'b', 'B', 'B'); // draped cloth
  for (let y = 10; y < 52; y += 6) g.hline(5, y, 18, 'B'); // fold shadows
  // a cult sigil: a stylized circuit-halo
  g.ellipse(14, 24, 6, 6, 'Y'); g.ellipse(14, 24, 4, 4, 'B');
  g.vline(14, 30, 10, 'Y'); g.hline(10, 34, 9, 'Y');
  for (let i = 0; i < 6; i++) g.set(5 + new Rng(i + 1).int(0, 17), 50, 'B'); // frayed hem
  g.outline('X');
  return g.render();
}
export function torchSconce(): Sprite {
  const g = new Grid(20, 36);
  g.box(7, 14, 6, 20, 'a', 'A', 'x'); // iron bracket
  g.box(4, 10, 12, 6, 'a', 'A', 'x'); // basket
  g.ellipse(10, 6, 4, 5, 'Z'); g.ellipse(10, 5, 2, 3, 'z'); g.set(10, 3, '*'); // flame
  const s = g.render(); glowS(s, 10, 7, 16, [150, 100, 30]); return s; // LUMEN
}
export function cantorShrine(): Sprite {
  const g = new Grid(96, 104);
  g.shadow(48, 102, 40, 4);
  g.box(14, 64, 68, 38, 'a', 'A', 'x'); // a black-stone dais, hive-stained
  for (let y = 70; y < 100; y += 6) g.hline(14, y, 68, 'x');
  // a twisted spire of broadcast screens (the Update's pulpit)
  g.box(30, 16, 36, 50, 'a', 'A', 'x');
  g.box(34, 22, 28, 30, 'l', '5', 'x'); // a corrupted screen (violet)
  g.rect(38, 28, 20, 3, '*'); g.rect(38, 36, 14, 3, '4'); g.rect(38, 44, 18, 3, '*'); // scrolling scripture
  // cabling / hive growth crawling up
  for (let i = 0; i < 5; i++) { const x = 22 + i * 14; g.line(x, 100, x + new Rng(i).int(-6, 6), 60, '5'); g.set(x, 60, '7'); }
  // candle pair gone cold-violet
  for (const cx of [22, 74]) { g.box(cx - 2, 52, 4, 12, 'w', 'W', 'x'); g.ellipse(cx, 50, 2, 3, '4'); g.set(cx, 48, '6'); }
  g.outline('X');
  const s = g.render(); glowS(s, 48, 38, 30, [90, 40, 140]); glowS(s, 48, 80, 22, [60, 30, 110]); return s;
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['ground/sec.chancel.nave', naveFloor(1)],
  ['ground/sec.chancel.crypt', cryptFloor(2)],
  ['wall/sec.chancel.catacomb', catacombWall(3)],
  ['prop/sec.chancel.altar', altar()],
  ['prop/sec.chancel.pew', pew()],
  ['prop/sec.chancel.pew_broken', pewBroken()],
  ['prop/sec.chancel.reliquary', reliquary()],
  ['prop/sec.chancel.candelabra', candelabra()],
  ['prop/sec.chancel.organ_pipes', organPipes()],
  ['prop/sec.chancel.rose_window', roseWindow()],
  ['prop/sec.chancel.banner', banner()],
  ['prop/sec.chancel.torch_sconce', torchSconce()],
  ['prop/sec.chancel.cantor_shrine', cantorShrine()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 150;
const COLS = 4;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [24, 22, 30, 255]);
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
console.log(`sec.chancel: ${items.length} megachurch pieces → assets/tiles/sec_chancel/`);
