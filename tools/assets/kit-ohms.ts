/**
 * Ohm battle sprites — grid-method retool (npm run assets:ohms). The 150 Ohms
 * are "objects woken into individuals": each reads as its household object in
 * silhouette, with a minimal face made of the object's own features (lenses,
 * grilles, slots, lights) and little legs/treads — per the art canon. Emits
 * 96x96 fronts to public/sprites/ohms/<n>_front_hd.png (overwriting the legacy
 * spritekit set the battle already loads) + starter backs. Slice species first.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';

const S = 96;
const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/sprites/ohms');
mkdirSync(OUT, { recursive: true });
const writePng = (s: Sprite, path: string): void => { const p = new PNG({ width: s.w, height: s.h }); p.data.set(s.data); writeFileSync(path, PNG.sync.write(p)); };
function glow(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + col[0] * a), Math.min(255, c[1] + col[1] * a), Math.min(255, c[2] + col[2] * a), Math.max(c[3] ?? 0, Math.round(60 * a))]); }
}
/** common base: a fresh grid + a contact shadow. */
function base(): Grid { const g = new Grid(S, S); g.shadow(48, 90, 26, 4); return g; }
/** big friendly Pokémon-style eyes (lenses). */
function eyes(g: Grid, lx: number, rx: number, y: number, col = 'X'): void {
  for (const x of [lx, rx]) { g.rect(x, y, 5, 6, col); g.set(x + 1, y + 1, '*'); g.set(x + 3, y + 4, 'i'); }
}
function foot(g: Grid, x: number, y: number, w: number, base_ = 'A'): void { g.box(x, y, w, 7, 'a', base_, 'x'); }

// ---- the Bench trio (stage 1) -------------------------------------------
function charkit(): Sprite { // 001 furnace rig — THERM
  const g = base();
  foot(g, 28, 80, 12); foot(g, 56, 80, 12);
  g.box(24, 30, 48, 52, 'l', 'a', 'A'); // welded firebox body
  for (let y = 34; y < 80; y += 8) g.hline(24, y, 48, 'A'); // panel seams
  g.box(34, 56, 28, 20, 'E', 'x', 'x'); // the firebox door (mouth) — opens to flame
  g.rect(38, 60, 20, 12, 'Z'); g.rect(40, 62, 16, 8, 'z');
  g.box(40, 14, 14, 18, 'a', 'A', 'x'); // stovepipe (head crest)
  g.set(47, 12, 'z'); // ember puff
  eyes(g, 32, 56, 40);
  for (const [x, y] of [[26, 32], [68, 32], [26, 76], [68, 76]] as Array<[number, number]>) g.set(x, y, 'l'); // rivets
  g.outline('X');
  const s = g.render(); glow(s, 48, 66, 22, [120, 60, 18]); return s;
}
function sparkit(): Sprite { // 004 generator rig — VOLT
  const g = base();
  foot(g, 28, 80, 12); foot(g, 56, 80, 12);
  g.box(24, 36, 48, 46, 'l', 'a', 'A'); // generator box
  g.box(30, 26, 36, 12, 'n', 'k', 'K'); // hand-wound copper coil (head)
  for (let x = 32; x < 64; x += 3) g.vline(x, 26, 12, 'q');
  eyes(g, 32, 56, 46);
  g.box(38, 60, 20, 8, 'A', 'x', 'x'); g.hline(40, 64, 16, '7'); // vent grille mouth
  g.line(20, 30, 12, 18, '1'); g.line(76, 30, 84, 18, '1'); g.set(12, 18, '*'); g.set(84, 18, '*'); // arcs
  g.outline('X');
  const s = g.render(); glow(s, 48, 32, 20, [30, 80, 130]); return s;
}
function dripkit(): Sprite { // 007 pump rig — COOLANT
  const g = base();
  foot(g, 28, 80, 12); foot(g, 56, 80, 12);
  g.box(26, 38, 44, 44, 'i', 'I', 'C'); // pump body (cool metal)
  g.box(60, 24, 10, 20, 'a', 'A', 'x'); g.rect(60, 24, 16, 6, 'a'); // spout (head)
  for (let i = 0; i < 3; i++) g.set(74, 30 + i * 4, 'v'); // drips
  eyes(g, 34, 56, 48);
  g.box(38, 62, 18, 8, 'C', 'c', 'C'); // mouth (water window)
  g.ellipse(30, 60, 4, 4, 'a'); g.ellipse(30, 60, 2, 2, 'l'); // pressure gauge
  g.outline('X');
  const s = g.render(); glow(s, 48, 56, 20, [20, 60, 110]); return s;
}

// ---- the Field commons --------------------------------------------------
function toastlet(): Sprite { // 010 toaster — THERM
  const g = base();
  foot(g, 30, 78, 11); foot(g, 55, 78, 11);
  g.box(22, 40, 52, 40, 'l', 'a', 'A'); // chrome toaster body, rounded
  g.set(22, 40, '.'); g.set(73, 40, '.');
  g.box(30, 34, 36, 8, 'x', 'X', 'X'); // the two slots (top) — glowing
  g.rect(32, 36, 13, 4, 'z'); g.rect(51, 36, 13, 4, 'z');
  g.set(40, 30, 'Z'); g.set(56, 30, 'Z'); // a hot crumb pops
  eyes(g, 30, 58, 52);
  g.ellipse(68, 64, 4, 5, 'a'); g.ellipse(68, 64, 2, 2, 'b'); // the lever (cheek dial)
  g.set(44, 66, 'x'); g.set(50, 66, 'x'); // tiny smile slot
  g.outline('X');
  const s = g.render(); glow(s, 48, 38, 18, [120, 70, 20]); return s;
}
function wavelet(): Sprite { // 012 microwave — THERM
  const g = base();
  foot(g, 30, 80, 12); foot(g, 54, 80, 12);
  g.box(20, 34, 56, 48, 'l', 'a', 'A'); // microwave body
  g.box(26, 40, 34, 34, 'C', 'c', 'C'); // door window = face plate
  g.box(62, 40, 10, 30, 'A', 'a', 'x'); // keypad panel
  for (let y = 42; y < 68; y += 6) for (let x = 64; x < 72; x += 4) g.set(x, y, 'z');
  eyes(g, 32, 48, 48, 'X'); // eyes behind the glass
  g.rect(34, 62, 18, 5, '7'); // glowing mouth-line (turntable hum)
  g.outline('X');
  const s = g.render(); glow(s, 43, 56, 20, [60, 30, 20]); return s;
}
function filaglow(): Sprite { // 015 light bulb — OPTIC
  const g = base();
  g.box(40, 76, 16, 10, 'a', 'A', 'x'); // screw base (feet)
  for (let y = 78; y < 84; y += 2) g.hline(40, y, 16, 'l');
  g.ellipse(48, 46, 26, 30, 'i'); // glass bulb body
  g.ellipse(46, 42, 20, 24, 'I');
  // glowing filament face
  g.line(40, 50, 48, 38, 'z'); g.line(48, 38, 56, 50, 'z'); g.line(44, 44, 52, 44, '*');
  eyes(g, 38, 52, 40, 'X');
  g.set(46, 56, 'z'); g.set(50, 56, 'z'); // bright smile
  g.outline('X');
  const s = g.render(); glow(s, 48, 44, 30, [140, 120, 50]); return s;
}
function beeplet(): Sprite { // 018 smoke detector — SONIC
  const g = base();
  foot(g, 34, 78, 10); foot(g, 52, 78, 10);
  g.ellipse(48, 52, 30, 26, 'w'); g.ellipse(48, 50, 26, 22, 'W'); // round white disc body
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.28; g.set(48 + Math.cos(a) * 22, 50 + Math.sin(a) * 18, 'A'); } // vent ring
  eyes(g, 38, 52, 46);
  g.ellipse(48, 38, 3, 3, 'b'); g.set(48, 38, '*'); // the blinking LED (forehead)
  g.set(45, 60, 'x'); g.set(51, 60, 'x'); g.set(48, 62, 'x'); // little mouth
  g.outline('X');
  const s = g.render(); glow(s, 48, 38, 10, [120, 20, 20]); return s;
}
function vacuette(): Sprite { // 019 vacuum — UTILITY
  const g = base();
  g.ellipse(40, 84, 7, 5, 'x'); g.ellipse(62, 84, 7, 5, 'x'); // wheels
  g.box(30, 40, 40, 44, 'e', 'E', 'x'); // canister body (dust bag)
  g.box(60, 26, 12, 22, 'a', 'A', 'x'); g.rect(58, 24, 18, 6, 'a'); // hose/nozzle (head)
  eyes(g, 36, 54, 50);
  g.box(38, 66, 18, 8, 'X', 'x', 'x'); // suction mouth (open)
  g.hline(40, 70, 14, 'A');
  g.outline('X');
  return g.render();
}
function fanlet(): Sprite { // 021 ceiling fan — UTILITY
  const g = base();
  foot(g, 32, 80, 11); foot(g, 53, 80, 11);
  g.ellipse(48, 48, 32, 30, 'a'); g.ellipse(48, 48, 30, 28, 'A'); // round cage body
  for (let i = 0; i < 3; i++) { const a = (i / 3) * 6.28; g.line(48, 48, 48 + Math.cos(a) * 26, 48 + Math.sin(a) * 24, 'l'); } // blades
  g.ellipse(48, 48, 10, 9, 'l'); g.ellipse(48, 48, 8, 7, 'a'); // hub (face plate)
  eyes(g, 40, 52, 44);
  g.set(46, 54, 'x'); g.set(50, 54, 'x'); // mouth
  for (let i = 0; i < 24; i++) { const a = (i / 24) * 6.28; g.set(48 + Math.cos(a) * 31, 48 + Math.sin(a) * 29, 'A'); } // cage ring
  g.outline('X');
  return g.render();
}
function mailstrom(): Sprite { // 024 mailbox — UTILITY
  const g = base();
  g.box(44, 60, 8, 26, 'k', 'K', 'x'); // post (leg)
  g.box(26, 32, 44, 32, 'u', 'U', 'U'); // mailbox body (rounded top)
  for (let i = 0; i <= 10; i++) g.hline(26 + i, 32 - Math.floor(i * 0.5), 44 - 2 * i, 'm'); // domed lid
  g.box(30, 50, 24, 8, 'X', 'x', 'x'); // the slot mouth
  eyes(g, 32, 52, 38);
  g.rect(68, 36, 4, 14, 'b'); g.rect(64, 36, 6, 4, 'b'); // the flag (up!)
  g.outline('X');
  return g.render();
}
function frostbox(): Sprite { // 025 refrigerator — COOLANT
  const g = base();
  foot(g, 30, 82, 12); foot(g, 54, 82, 12);
  g.box(26, 22, 44, 62, 'i', 'I', 'C'); // tall fridge body
  g.hline(26, 50, 44, 'C'); // door split
  g.rect(64, 30, 4, 14, 'l'); g.rect(64, 56, 4, 14, 'l'); // handles
  eyes(g, 36, 54, 34);
  g.rect(40, 42, 12, 4, 'C'); // chilly mouth
  for (let i = 0; i < 5; i++) g.set(30 + i * 8, 26, 'b'); // fridge magnets
  g.set(34, 20, 'i'); g.set(40, 18, 'i'); g.set(46, 20, 'i'); // cold mist
  g.outline('X');
  const s = g.render(); glow(s, 48, 40, 22, [20, 50, 90]); return s;
}
function vendlet(): Sprite { // 030 vending machine — FRAME
  const g = base();
  foot(g, 30, 82, 12); foot(g, 54, 82, 12);
  g.box(24, 18, 48, 66, 'e', 'E', 'x'); // tall vending body (red)
  g.box(30, 24, 26, 40, 'C', 'c', 'C'); // glowing product display
  for (let y = 28; y < 60; y += 8) for (let x = 32; x < 54; x += 6) g.box(x, y, 4, 5, 'z', 'q', 'E'); // cans
  g.box(58, 28, 10, 30, 'A', 'a', 'x'); // coin/keypad panel
  for (let y = 30; y < 52; y += 5) g.set(62, y, 'z');
  eyes(g, 34, 46, 28, 'X');
  g.box(40, 68, 16, 6, 'X', 'x', 'x'); // the dispenser slot (mouth)
  g.outline('X');
  const s = g.render(); glow(s, 43, 44, 22, [80, 30, 20]); return s;
}
function staplejaw(): Sprite { // 032 stapler — FRAME (a biter)
  const g = base();
  foot(g, 32, 80, 11); foot(g, 53, 80, 11);
  g.box(22, 56, 52, 22, 'b', 'B', 'x'); // lower jaw (base)
  g.box(20, 40, 56, 16, 'e', 'E', 'x'); // upper jaw (lid), raised to bite
  for (let x = 28; x < 68; x += 4) g.set(x, 54, '*'); // staple teeth
  for (let x = 28; x < 68; x += 4) g.set(x, 56, 'l');
  eyes(g, 30, 58, 30);
  g.outline('X');
  return g.render();
}
function snoozebox(): Sprite { // 033 alarm clock — SONIC
  const g = base();
  foot(g, 34, 80, 10); foot(g, 52, 80, 10);
  g.ellipse(34, 30, 9, 8, 'l'); g.ellipse(62, 30, 9, 8, 'l'); // two bells (ears)
  g.ellipse(34, 30, 6, 5, 'a'); g.ellipse(62, 30, 6, 5, 'a');
  g.ellipse(48, 54, 28, 26, 'l'); g.ellipse(48, 54, 24, 22, 'w'); // round clock body = face
  for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.28; g.set(48 + Math.cos(a) * 20, 54 + Math.sin(a) * 18, 'A'); } // ticks
  eyes(g, 38, 52, 46);
  g.line(48, 54, 48, 42, 'X'); g.line(48, 54, 56, 56, 'X'); // clock hands (nose)
  g.set(45, 64, 'x'); g.set(51, 64, 'x'); // mouth
  g.rect(46, 18, 4, 6, 'a'); // the snooze button (top knob)
  g.outline('X');
  return g.render();
}

// ---- starter backs (player view) ----------------------------------------
function backRig(body: string, accent: string): Sprite {
  const g = base();
  foot(g, 28, 80, 12); foot(g, 56, 80, 12);
  g.box(24, 32, 48, 50, body === 'i' ? 'i' : 'l', body, 'A'); // box from behind
  for (let y = 36; y < 80; y += 8) g.hline(24, y, 48, 'A');
  g.box(36, 22, 24, 12, 'a', 'A', 'x'); // crest from behind
  g.rect(44, 44, 8, 18, accent); // a vent strip
  g.outline('X');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
const FRONTS: Array<[number, Sprite]> = [
  [1, charkit()], [4, sparkit()], [7, dripkit()],
  [10, toastlet()], [12, wavelet()], [15, filaglow()], [18, beeplet()], [19, vacuette()],
  [21, fanlet()], [24, mailstrom()], [25, frostbox()], [30, vendlet()], [32, staplejaw()], [33, snoozebox()],
];
for (const [n, s] of FRONTS) writePng(s, join(OUT, `${n}_front_hd.png`));
const BACKS: Array<[number, Sprite]> = [[1, backRig('a', 'E')], [4, backRig('a', '7')], [7, backRig('i', 'v')]];
for (const [n, s] of BACKS) writePng(s, join(OUT, `${n}_back_hd.png`));

// ---- contact sheet -------------------------------------------------------
const all = [...FRONTS.map((f) => f[1]), ...BACKS.map((b) => b[1])];
const cell = 104;
const COLS = 6;
const rows = Math.ceil(all.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [40, 44, 52, 255]);
all.forEach((s, i) => {
  const ox = (i % COLS) * cell + (cell - S) / 2;
  const oy = Math.floor(i / COLS) * cell + (cell - S) / 2;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const c = s.get(x, y); if ((c[3] ?? 0) === 0) continue; sheet.set(ox + x, oy + y, c); }
});
mkdirSync(join(ROOT, 'assets/sprites/ohms'), { recursive: true });
writePng(sheet, join(ROOT, 'assets/sprites/ohms/_contact.png'));
console.log(`ohm sprites: ${FRONTS.length} fronts + ${BACKS.length} backs (grid method) → public/sprites/ohms/`);
