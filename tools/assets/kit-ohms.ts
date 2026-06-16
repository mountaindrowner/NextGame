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

// ---- starter evolutions (the player's own Ohm, grown) -------------------
function smolderig(): Sprite { // 002 — furnace stage 2
  const g = base();
  foot(g, 24, 82, 13); foot(g, 59, 82, 13);
  g.box(20, 28, 56, 54, 'l', 'a', 'A'); // bigger firebox
  for (let y = 34; y < 80; y += 7) g.hline(20, y, 56, 'A');
  g.box(30, 52, 36, 26, 'E', 'x', 'x'); // firebox mouth
  g.rect(34, 56, 28, 18, 'Z'); g.rect(38, 60, 20, 12, 'z'); g.rect(44, 64, 8, 6, '*');
  g.box(28, 12, 14, 18, 'a', 'A', 'x'); g.box(54, 12, 14, 18, 'a', 'A', 'x'); // twin stovepipes
  g.set(34, 10, 'z'); g.set(60, 10, 'Z'); // embers
  eyes(g, 28, 60, 38);
  for (const [x, y] of [[22, 30], [72, 30], [22, 76], [72, 76]] as Array<[number, number]>) g.set(x, y, 'l');
  g.outline('X');
  const s = g.render(); glow(s, 48, 62, 26, [140, 70, 20]); return s;
}
function pyrofurnax(): Sprite { // 003 — furnace final
  const g = base();
  foot(g, 22, 84, 14); foot(g, 60, 84, 14);
  g.box(16, 22, 64, 62, 'l', 'a', 'A'); // massive industrial furnace
  for (let y = 28; y < 82; y += 6) g.hline(16, y, 64, 'A');
  g.box(26, 46, 44, 32, 'E', 'x', 'x'); // roaring firebox
  g.rect(30, 50, 36, 24, 'Z'); g.rect(34, 54, 28, 16, 'z'); g.rect(42, 58, 12, 8, '*');
  for (let x = 30; x < 66; x += 6) g.vline(x, 50, 24, 'A'); // grate teeth
  g.box(24, 8, 12, 16, 'a', 'A', 'x'); g.box(42, 4, 12, 18, 'a', 'A', 'x'); g.box(60, 8, 12, 16, 'a', 'A', 'x'); // 3 stovepipes
  g.set(30, 6, 'z'); g.set(48, 2, '*'); g.set(66, 6, 'Z'); // ember plumes
  eyes(g, 24, 64, 32, 'Z');
  for (const [x, y] of [[18, 24], [76, 24], [18, 78], [76, 78]] as Array<[number, number]>) g.set(x, y, 'l');
  g.outline('X');
  const s = g.render(); glow(s, 48, 60, 30, [170, 80, 18]); return s;
}
function amperig(): Sprite { // 005 — generator stage 2
  const g = base();
  foot(g, 24, 82, 13); foot(g, 59, 82, 13);
  g.box(20, 34, 56, 48, 'l', 'a', 'A');
  g.box(24, 22, 48, 14, 'n', 'k', 'K'); // wider copper coil bank
  for (let x = 26; x < 70; x += 3) g.vline(x, 22, 14, 'q');
  eyes(g, 28, 60, 44);
  g.box(34, 60, 28, 10, 'A', 'x', 'x'); for (let x = 36; x < 62; x += 4) g.vline(x, 62, 6, '1'); // vent
  g.line(16, 30, 6, 16, '1'); g.line(80, 30, 90, 16, '1'); g.set(6, 16, '*'); g.set(90, 16, '*');
  g.line(48, 20, 48, 8, '1'); g.set(48, 8, '*');
  g.outline('X');
  const s = g.render(); glow(s, 48, 28, 24, [40, 90, 150]); return s;
}
function generatlas(): Sprite { // 006 — generator final (HAUL)
  const g = base();
  foot(g, 22, 84, 14); foot(g, 60, 84, 14);
  g.box(16, 30, 64, 54, 'l', 'a', 'A'); // big frame
  for (let y = 36; y < 82; y += 7) g.hline(16, y, 64, 'A');
  g.box(20, 16, 56, 16, 'n', 'k', 'K'); // massive coil bank crown
  for (let x = 22; x < 74; x += 3) g.vline(x, 16, 16, 'q');
  g.box(8, 40, 12, 24, 'n', 'k', 'K'); g.box(76, 40, 12, 24, 'n', 'k', 'K'); // shoulder coils (HAUL)
  eyes(g, 26, 62, 42, '1');
  g.box(34, 62, 28, 12, 'A', 'x', 'x'); for (let x = 36; x < 62; x += 4) g.vline(x, 64, 8, '1');
  g.line(20, 14, 30, 4, '1'); g.line(76, 14, 66, 4, '1'); g.line(48, 14, 48, 2, '*'); // arcs
  g.set(30, 4, '*'); g.set(66, 4, '*');
  g.outline('X');
  const s = g.render(); glow(s, 48, 24, 30, [40, 100, 160]); return s;
}
function flowrig(): Sprite { // 008 — pump stage 2
  const g = base();
  foot(g, 24, 82, 13); foot(g, 59, 82, 13);
  g.box(22, 36, 52, 46, 'i', 'I', 'C');
  g.box(58, 20, 12, 22, 'a', 'A', 'x'); g.rect(56, 18, 18, 6, 'a'); // taller spout
  for (let i = 0; i < 4; i++) g.set(74, 26 + i * 4, 'v'); // drips
  eyes(g, 30, 58, 46);
  g.box(36, 60, 22, 10, 'C', 'c', 'C'); g.hline(38, 64, 18, 'v');
  g.ellipse(28, 56, 5, 5, 'a'); g.ellipse(28, 56, 2, 2, 'l'); // gauges
  g.ellipse(66, 56, 5, 5, 'a'); g.ellipse(66, 56, 2, 2, 'l');
  g.outline('X');
  const s = g.render(); glow(s, 48, 56, 24, [20, 70, 120]); return s;
}
function aquaducton(): Sprite { // 009 — pump final
  const g = base();
  foot(g, 22, 84, 14); foot(g, 60, 84, 14);
  g.box(18, 30, 60, 54, 'i', 'I', 'C'); // big pump tower
  for (let y = 36; y < 82; y += 7) g.hline(18, y, 60, 'C');
  for (let ax = 24; ax < 72; ax += 16) { g.ellipse(ax + 6, 50, 7, 10, 'C'); g.ellipse(ax + 6, 50, 5, 8, 'c'); } // aqueduct arches
  g.box(40, 12, 16, 20, 'a', 'A', 'x'); g.rect(36, 10, 24, 6, 'a'); // central spout crown
  for (let i = 0; i < 3; i++) { g.set(44 + i * 4, 6 - i, 'v'); g.set(44 + i * 4, 4, '*'); } // jet
  eyes(g, 28, 62, 38, '1');
  g.box(38, 66, 24, 10, 'C', 'c', 'C'); g.hline(40, 70, 20, 'v');
  g.outline('X');
  const s = g.render(); glow(s, 48, 50, 30, [20, 80, 140]); return s;
}

// ---- legendaries (story-critical individuals) ---------------------------
function cottongin(): Sprite { // 144 COTTONGIN — FRAME, ancient cotton gin
  const g = base();
  g.box(14, 26, 68, 56, 'n', 'k', 'K'); // heavy timber frame
  for (let y = 32; y < 80; y += 8) g.hline(14, y, 68, 'K');
  g.box(22, 50, 52, 22, 'a', 'A', 'x'); // the toothed gin roller = mouth
  for (let x = 24; x < 74; x += 5) { g.vline(x, 50, 22, 'l'); g.set(x, 49, '*'); } // saw teeth
  g.ellipse(28, 61, 4, 6, 'X'); g.ellipse(68, 61, 4, 6, 'X'); // roller ends
  g.ellipse(78, 44, 9, 9, 'k'); g.ellipse(78, 44, 6, 6, 'K'); g.set(78, 44, 'n'); // crank wheel
  for (const [x, y] of [[30, 48], [44, 47], [58, 48], [38, 74], [54, 74]] as Array<[number, number]>) g.ellipse(x, y, 3, 2, 'w'); // cotton tufts
  eyes(g, 26, 60, 32, 'z'); // amber machine-eyes
  g.box(20, 80, 8, 6, 'k', 'K', 'x'); g.box(68, 80, 8, 6, 'k', 'K', 'x'); // legs
  g.outline('X');
  const s = g.render(); glow(s, 48, 32, 16, [120, 90, 30]); return s;
}
function telegrapheme(): Sprite { // 145 TELEGRAPHEME — SIGNAL, telegraph exchange
  const g = base();
  foot(g, 26, 82, 12); foot(g, 58, 82, 12);
  g.box(22, 34, 52, 48, 'n', 'k', 'K'); // wooden cabinet
  for (let y = 40; y < 80; y += 8) g.hline(22, y, 52, 'K');
  g.box(30, 62, 36, 12, 'Y', 'y', 'A'); // brass key board (mouth)
  for (let x = 33; x < 64; x += 5) { g.ellipse(x, 68, 2, 2, 'A'); g.set(x, 67, '*'); } // keys
  eyes(g, 30, 58, 42, '7'); // patch-panel jacks
  for (let i = 0; i < 5; i++) { const x = 30 + i * 8; g.rect(x, 24 - (i % 3) * 3, i % 2 ? 4 : 2, 2, '7'); } // dot-dash sparks
  g.line(20, 38, 8, 26, 'K'); g.line(76, 38, 88, 26, 'K'); g.set(8, 26, '7'); g.set(88, 26, '7'); // wires out
  g.outline('X');
  const s = g.render(); glow(s, 48, 26, 18, [40, 140, 110]); return s;
}
function locomotiva(): Sprite { // 146 LOCOMOTIVA — MOTOR, steam locomotive
  const g = base();
  g.ellipse(30, 80, 12, 11, 'x'); g.ellipse(64, 80, 12, 11, 'x'); // driving wheels
  g.ellipse(30, 80, 6, 5, 'A'); g.ellipse(64, 80, 6, 5, 'A');
  g.set(30, 80, 'l'); g.set(64, 80, 'l');
  g.box(18, 40, 60, 32, 'l', 'a', 'A'); // boiler body
  for (let x = 24; x < 76; x += 8) g.vline(x, 40, 32, 'x'); // boiler bands
  g.box(26, 18, 14, 22, 'a', 'A', 'x'); g.rect(24, 16, 18, 5, 'a'); // smokestack
  g.ellipse(33, 12, 7, 4, 'w'); g.ellipse(40, 8, 5, 3, 'w'); // steam plume
  g.ellipse(62, 50, 8, 8, 'a'); g.ellipse(62, 50, 5, 5, 'z'); g.set(62, 50, '*'); // headlamp cyclops eye
  g.box(70, 58, 12, 16, 'A', 'x', 'x'); for (let i = 0; i < 4; i++) g.line(70, 58 + i * 4, 82, 64 + i * 3, 'l'); // cowcatcher
  g.ellipse(44, 48, 4, 4, 'X'); g.set(45, 47, '*'); // second eye
  g.outline('X');
  const s = g.render(); glow(s, 62, 50, 14, [120, 80, 20]); return s;
}
function starbottle(): Sprite { // 147 STARBOTTLE — THERM, fusion reactor (star in a jar)
  const g = base();
  foot(g, 30, 84, 12); foot(g, 54, 84, 12);
  g.ellipse(48, 48, 30, 30, 'I'); g.ellipse(46, 44, 24, 24, 'i'); // containment sphere (glass)
  for (let i = 0; i < 28; i++) { const a = (i / 28) * 6.283; g.set(48 + Math.cos(a) * 30, 48 + Math.sin(a) * 28, 'a'); } // steel ring
  for (let i = 0; i < 8; i++) { const a = (i / 8) * 6.283; g.line(48, 48, 48 + Math.cos(a) * 18, 48 + Math.sin(a) * 18, 'z'); } // rays
  g.ellipse(48, 48, 12, 12, 'Z'); g.ellipse(48, 48, 8, 8, 'z'); g.ellipse(48, 48, 4, 4, '*'); // star core
  g.box(34, 74, 28, 10, 'a', 'A', 'x'); // base collar
  eyes(g, 36, 54, 40, 'Z');
  g.outline('X');
  const s = g.render(); glow(s, 48, 48, 40, [200, 150, 60]); return s;
}
function pecantheon(): Sprite { // 148 PECANTHEON — VERDANT, ancient pecan tree
  const g = base();
  g.box(40, 50, 16, 36, 'n', 'k', 'K'); // trunk
  for (let y = 54; y < 84; y += 6) g.hline(40, y, 16, 'K'); // bark
  g.line(48, 84, 44, 60, '7'); g.line(48, 84, 52, 64, '8'); g.set(44, 60, '*'); // cables in heartwood
  g.ellipse(48, 36, 34, 26, 'f'); // canopy
  let st = (148 * 2654435761) & 0x7fffffff;
  const rnd = (): number => { st = (st * 1103515245 + 12345) & 0x7fffffff; return st / 0x7fffffff; };
  for (let k = 0; k < 40; k++) { const a = rnd() * 6.283; const d = rnd() * 30; g.ellipse(48 + Math.cos(a) * d, 36 + Math.sin(a) * (d * 0.8), 3, 3, rnd() < 0.5 ? 'F' : 'g'); }
  for (const [x, y] of [[34, 30], [60, 28], [46, 46], [58, 44], [38, 46]] as Array<[number, number]>) { g.ellipse(x, y, 3, 4, 'l'); g.set(x, y - 1, '*'); } // chrome pecans
  eyes(g, 40, 50, 60, 'z'); // trunk face
  g.set(45, 72, 'x'); g.set(51, 72, 'x');
  g.outline('X');
  const s = g.render(); glow(s, 48, 36, 26, [40, 100, 40]); return s;
}
function rosarithm(): Sprite { // 149 ROSARITHM — VERDANT, fractal rose garden
  const g = base();
  const cx = 48; const cy = 50;
  let st = (149 * 2654435761) & 0x7fffffff;
  const rnd = (): number => { st = (st * 1103515245 + 12345) & 0x7fffffff; return st / 0x7fffffff; };
  g.ellipse(cx, cy + 4, 30, 26, 'g'); // foliage base
  for (let k = 0; k < 30; k++) { const a = rnd() * 6.283; const d = rnd() * 26; g.ellipse(cx + Math.cos(a) * d, cy + 4 + Math.sin(a) * d * 0.8, 2, 2, 'F'); }
  for (let i = 0; i < 26; i++) { // fractal spiral of blooms
    const a = i * 0.62; const r = 3 + i;
    const x = cx + Math.cos(a) * r; const y = cy + Math.sin(a) * r * 0.85;
    const sz = 4 - Math.min(3, Math.floor(i / 9));
    g.ellipse(x, y, sz, sz, 'b'); g.ellipse(x, y, Math.max(1, sz - 1), Math.max(1, sz - 1), 'B'); g.set(x, y, '*');
  }
  eyes(g, cx - 10, cx + 5, cy - 8); // a face above the spiral
  g.outline('X');
  const s = g.render(); glow(s, cx, cy, 28, [90, 30, 50]); return s;
}
function exemplar(): Sprite { // 150 EXEMPLAR — SIGNAL, PERSISTENCE's avatar (final boss)
  const g = base();
  g.box(34, 70, 10, 16, 'a', 'A', 'x'); g.box(52, 70, 10, 16, 'a', 'A', 'x'); // legs
  g.box(28, 30, 40, 44, 'l', 'a', 'A'); // body slab
  for (let y = 36; y < 72; y += 6) g.hline(28, y, 40, 'A');
  g.box(34, 40, 28, 26, 'l', '7', 'A'); // glowing scripture screen-chest
  g.rect(38, 44, 20, 4, '*'); g.rect(38, 52, 14, 3, '*'); g.rect(38, 58, 18, 3, '8'); // scripture lines
  for (let i = 0; i < 16; i++) { const a = (i / 16) * 6.283; g.set(48 + Math.cos(a) * 16, 18 + Math.sin(a) * 8, '7'); } // halo
  g.ellipse(48, 18, 11, 6, '8'); g.ellipse(48, 18, 8, 4, 'A'); // hollow halo center
  g.box(40, 8, 16, 16, 'l', 'a', 'A'); // head
  eyes(g, 41, 50, 12, '*'); // blank radiant eyes
  g.box(20, 32, 10, 18, 'l', 'a', 'A'); g.box(66, 32, 10, 18, 'l', 'a', 'A'); // shoulder mantles
  g.outline('X');
  const s = g.render(); glow(s, 48, 52, 26, [40, 160, 130]); glow(s, 48, 18, 14, [60, 200, 160]); return s;
}

// ---- type palettes & archetype renderers (the other 136) -----------------
type Pal = { body: [string, string, string]; accent: string; glow?: [number, number, number] };
type TypeName = 'THERM' | 'VOLT' | 'COOLANT' | 'OPTIC' | 'SONIC' | 'UTILITY' | 'FRAME' | 'SIGNAL' | 'MOTOR' | 'VERDANT' | 'BREAKER';
const TYPEPAL: Record<TypeName, Pal> = {
  THERM: { body: ['l', 'a', 'A'], accent: 'z', glow: [120, 60, 18] },
  VOLT: { body: ['l', 'a', 'A'], accent: '1', glow: [30, 80, 130] },
  COOLANT: { body: ['i', 'I', 'C'], accent: 'v', glow: [20, 60, 110] },
  OPTIC: { body: ['l', 'a', 'A'], accent: 'z', glow: [140, 120, 50] },
  SONIC: { body: ['l', 'w', 'W'], accent: '4', glow: [90, 40, 120] },
  UTILITY: { body: ['l', 'a', 'A'], accent: 'c' },
  FRAME: { body: ['l', 'a', 'A'], accent: 'e' },
  SIGNAL: { body: ['l', 'a', 'A'], accent: '7', glow: [40, 130, 110] },
  MOTOR: { body: ['m', 'u', 'U'], accent: 'e' },
  VERDANT: { body: ['F', 'f', 'g'], accent: 'b', glow: [40, 90, 30] },
  BREAKER: { body: ['l', 'a', 'A'], accent: 'Z', glow: [110, 55, 20] },
};

/** rectangular appliance — toasters, fridges, vending, consoles, ACs. */
function archBox(p: Pal, tier: number): Sprite {
  const g = base();
  const w = 40 + tier * 8;
  const h = 38 + tier * 8;
  const x = Math.round((S - w) / 2);
  const yb = 80;
  const y = yb - h;
  foot(g, x + 5, yb, 12, p.body[1]); foot(g, x + w - 17, yb, 12, p.body[1]);
  g.box(x, y, w, h, p.body[0], p.body[1], p.body[2]);
  for (let yy = y + 8; yy < yb - 2; yy += 9) g.hline(x + 1, yy, w - 2, p.body[2]); // panel seams
  g.box(x + 8, yb - 18, w - 16, 12, p.body[0], p.accent, p.body[2]); // glowing face panel
  for (let xx = x + 11; xx < x + w - 11; xx += 4) g.vline(xx, yb - 16, 8, p.body[2]); // grille slots
  eyes(g, x + 9, x + w - 19, y + Math.round(h * 0.26));
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, S / 2, yb - 12, 12 + tier * 3, p.glow);
  return s;
}

/** disc — fans, clocks, saw blades, wrecking balls, reels. */
function archRound(p: Pal, tier: number): Sprite {
  const g = base();
  const rad = 24 + tier * 5;
  const cx = S / 2;
  const cy = 78 - rad;
  foot(g, cx - 17, 78, 11, p.body[1]); foot(g, cx + 6, 78, 11, p.body[1]);
  g.ellipse(cx, cy, rad, rad - 2, p.body[1]);
  g.ellipse(cx, cy - 2, rad - 3, rad - 5, p.body[0]);
  for (let i = 0; i < 28; i++) { const a = (i / 28) * 6.283; g.set(cx + Math.cos(a) * (rad - 1), cy + Math.sin(a) * (rad - 3), p.body[2]); } // rim
  g.ellipse(cx, cy, 10, 9, p.accent); // face plate
  eyes(g, cx - 11, cx + 6, cy - 4);
  g.set(cx - 3, cy + 7, 'x'); g.set(cx + 3, cy + 7, 'x');
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, cx, cy, rad - 4, p.glow);
  return s;
}

/** tower — transformers, towers, hydrants, sirens, water heaters, lamps. */
function archTall(p: Pal, tier: number): Sprite {
  const g = base();
  const w = 28 + tier * 4;
  const h = 56 + tier * 7;
  const x = Math.round((S - w) / 2);
  const yb = 82;
  const y = yb - h;
  foot(g, x + 3, yb, 10, p.body[1]); foot(g, x + w - 13, yb, 10, p.body[1]);
  g.box(x, y, w, h, p.body[0], p.body[1], p.body[2]);
  for (let yy = y + 9; yy < yb - 2; yy += 9) g.hline(x + 1, yy, w - 2, p.body[2]);
  g.box(Math.round(S / 2) - 5, y - 9, 10, 11, p.body[0], p.accent, p.body[2]); // top light
  eyes(g, x + 5, x + w - 15, y + 14);
  g.box(x + 5, y + 30, w - 10, 6, p.body[0], p.accent, p.body[2]); // mouth band
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, S / 2, y - 3, 10 + tier * 2, p.glow);
  return s;
}

/** wheeled — trucks, karts, drones, tractors, mowers, carts, mixers. */
function archVehicle(p: Pal, tier: number): Sprite {
  const g = base();
  const w = 46 + tier * 8;
  const h = 24 + tier * 4;
  const x = Math.round((S - w) / 2);
  const yb = 80;
  const y = yb - h - 6;
  for (const wx of [x + 13, x + w - 13]) { g.ellipse(wx, yb, 8, 7, 'x'); g.ellipse(wx, yb, 4, 3, p.body[2]); g.set(wx, yb, p.body[0]); }
  g.box(x, y, w, h, p.body[0], p.body[1], p.body[2]);
  g.box(x + w - 28, y - 12, 24, 15, p.body[0], p.accent, p.body[2]); // cab / windshield
  eyes(g, x + w - 24, x + w - 13, y - 6);
  g.box(x + 4, y + h - 12, 14, 9, p.body[0], p.accent, p.body[2]); // grille mouth
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, x + w - 15, y - 4, 10, p.glow);
  return s;
}

/** handheld tool — chainsaws, drills, flashlights, cameras, blenders. */
function archTool(p: Pal, tier: number): Sprite {
  const g = base();
  foot(g, 33, 80, 11, p.body[1]); foot(g, 52, 80, 11, p.body[1]);
  g.box(27, 42, 42, 36, p.body[0], p.body[1], p.body[2]); // motor housing
  g.box(40, 18, 16, 24, p.body[0], p.body[1], p.body[2]); // neck to working end
  g.box(41, 12, 14, 8, p.body[0], p.accent, p.body[2]); // working tip
  eyes(g, 33, 55, 52);
  g.box(37, 66, 22, 6, p.body[0], p.accent, p.body[2]); // mouth
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, 48, 14, 9 + tier * 2, p.glow);
  return s;
}

/** glowing bulb — light bulbs, neon, fixtures. */
function archBulb(p: Pal, tier: number): Sprite {
  const g = base();
  g.box(40, 76, 16, 10, 'a', 'A', 'x'); // screw base
  for (let y = 78; y < 84; y += 2) g.hline(40, y, 16, 'l');
  const rad = 23 + tier * 4;
  g.ellipse(48, 50 - tier, rad, rad + 3, p.body[1]);
  g.ellipse(46, 46 - tier, rad - 4, rad - 1, p.body[0]);
  g.line(40, 54, 48, 42, p.accent); g.line(48, 42, 56, 54, p.accent); g.set(48, 42, '*'); // filament
  eyes(g, 38, 53, 44, 'X');
  g.set(46, 58, p.accent); g.set(49, 58, p.accent);
  g.outline('X');
  const s = g.render();
  glow(s, 48, 48, rad + 6, p.glow ?? [140, 120, 50]);
  return s;
}

/** organic — tumbleweeds, cacti, blooms, virus-taken flora. */
function archPlant(p: Pal, tier: number, seed: number): Sprite {
  const g = base();
  const cx = 48;
  const cy = 54;
  const rx = 24 + tier * 3;
  const ry = 22 + tier * 3;
  g.ellipse(cx, cy, rx, ry, p.body[1]);
  let st = (seed * 2654435761) & 0x7fffffff;
  const rnd = (): number => { st = (st * 1103515245 + 12345) & 0x7fffffff; return st / 0x7fffffff; };
  for (let k = 0; k < 26; k++) { const a = rnd() * 6.283; const d = rnd() * (rx - 3); g.ellipse(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 3, 3, rnd() < 0.5 ? p.body[0] : p.body[2]); } // leafy texture
  eyes(g, cx - 10, cx + 5, cy - 4);
  g.set(cx - 3, cy + 8, 'x'); g.set(cx + 3, cy + 8, 'x');
  for (const [bx, by] of [[cx + 13, cy - 13], [cx - 15, cy + 6], [cx + 8, cy + 14]] as Array<[number, number]>) { g.ellipse(bx, by, 4, 4, p.accent); g.set(bx, by, '*'); } // blooms
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, cx, cy, rx - 2, p.glow);
  return s;
}

/** speaker stack — woofers, boomboxes (cones for eyes). */
function archSpeaker(p: Pal, tier: number): Sprite {
  const g = base();
  const w = 40 + tier * 6;
  const h = 46 + tier * 8;
  const x = Math.round((S - w) / 2);
  const yb = 80;
  const y = yb - h;
  foot(g, x + 5, yb, 11, p.body[1]); foot(g, x + w - 16, yb, 11, p.body[1]);
  g.box(x, y, w, h, p.body[0], p.body[1], p.body[2]);
  const c1 = x + Math.round(w * 0.3);
  const c2 = x + Math.round(w * 0.7);
  const cyy = y + Math.round(h * 0.4);
  for (const cc of [c1, c2]) { g.ellipse(cc, cyy, 9, 9, p.body[2]); g.ellipse(cc, cyy, 6, 6, p.accent); g.ellipse(cc, cyy, 2, 2, '*'); } // cones
  g.ellipse(Math.round(S / 2), y + h - 12, 6, 5, p.accent); // tweeter mouth
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, S / 2, cyy, 16, p.glow);
  return s;
}

/** orbital — satellites, solar arrays (twin panels + dish). */
function archOrb(p: Pal, tier: number): Sprite {
  const g = base();
  const cx = 48;
  const cy = 50;
  for (const px of [8, 70]) { g.box(px, cy - 11, 18, 22, '2', '3', '3'); for (let yy = cy - 9; yy < cy + 10; yy += 3) g.hline(px, yy, 18, 'X'); for (let xx = px + 5; xx < px + 18; xx += 6) g.vline(xx, cy - 11, 22, 'X'); } // solar wings
  g.ellipse(cx, cy, 17, 17, p.body[1]);
  g.ellipse(cx, cy - 2, 13, 13, p.body[0]);
  g.ellipse(cx, cy - 3, 7, 6, p.accent); // dish
  eyes(g, cx - 9, cx + 4, cy + 1);
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, cx, cy, 16 + tier * 2, p.glow);
  return s;
}

/** legendary — oversized, crowned, fiercely emissive. */
function archLegend(p: Pal): Sprite {
  const g = base();
  const w = 58;
  const h = 58;
  const x = Math.round((S - w) / 2);
  const yb = 84;
  const y = yb - h;
  foot(g, x + 6, yb, 14, p.body[1]); foot(g, x + w - 20, yb, 14, p.body[1]);
  g.box(x, y, w, h, p.body[0], p.body[1], p.body[2]);
  for (let i = 0; i < 5; i++) g.box(x + 5 + i * 11, y - 10, 7, 12, p.body[0], p.accent, p.body[2]); // crown
  g.box(x + 12, y + 14, w - 24, 24, p.body[0], p.accent, p.body[2]); // core face
  eyes(g, x + 16, x + w - 26, y + 20, '*');
  g.box(x + 18, y + 34, w - 36, 5, p.body[0], p.accent, p.body[2]); // mouth
  for (const [rx, ry] of [[x + 3, y + 3], [x + w - 4, y + 3], [x + 3, yb - 4], [x + w - 4, yb - 4]] as Array<[number, number]>) g.set(rx, ry, p.body[0]); // corner bolts
  g.outline('X');
  const s = g.render();
  glow(s, S / 2, y + 24, 30, p.glow ?? [130, 110, 70]);
  return s;
}

// ---- backs (player view) — a generic rear by type palette ----------------
function backArch(p: Pal): Sprite {
  const g = base();
  foot(g, 28, 80, 12, p.body[1]); foot(g, 56, 80, 12, p.body[1]);
  g.box(24, 32, 48, 50, p.body[0], p.body[1], p.body[2]);
  for (let y = 37; y < 80; y += 8) g.hline(25, y, 46, p.body[2]);
  g.box(36, 22, 24, 12, p.body[0], p.body[1], p.body[2]); // head from behind
  g.rect(44, 44, 8, 18, p.accent); // vent strip
  g.outline('X');
  const s = g.render();
  if (p.glow) glow(s, 48, 30, 12, p.glow);
  return s;
}

// ---- bespoke starter backs (the player's own Ohm, seen from behind) ------
// No face (we see the back of the head); the silhouette features carry it.
function thermBack(tier: number): Sprite { // 001/002/003 furnace rear — 1/2/3 stovepipes
  const g = base();
  const w = 48 + tier * 8;
  const h = 48 + tier * 8;
  const x = Math.round((S - w) / 2);
  const yb = 82 + tier;
  const y = yb - h;
  foot(g, x + 4, yb, 13); foot(g, x + w - 17, yb, 13);
  g.box(x, y, w, h, 'l', 'a', 'A'); // welded firebox from behind
  for (let yy = y + 7; yy < yb - 2; yy += 7) g.hline(x + 1, yy, w - 2, 'A'); // panel seams
  const vx0 = x + Math.round(w / 2) - 12;
  const vy0 = y + Math.round(h * 0.42);
  g.box(vx0, vy0, 24, 16, 'A', 'x', 'x'); // back vent grille (glows hot)
  for (let vx = vx0 + 2; vx < vx0 + 22; vx += 4) g.vline(vx, vy0 + 2, 12, 'Z');
  const pw = 12;
  const gap = (w - tier * pw) / (tier + 1);
  for (let i = 0; i < tier; i++) { const px = Math.round(x + gap * (i + 1) + pw * i); g.box(px, y - 16, pw, 18, 'a', 'A', 'x'); g.set(px + 6, y - 18, 'z'); } // stovepipes + embers
  for (const [rx, ry] of [[x + 2, y + 2], [x + w - 3, y + 2], [x + 2, yb - 3], [x + w - 3, yb - 3]] as Array<[number, number]>) g.set(rx, ry, 'l');
  g.outline('X');
  const s = g.render(); glow(s, S / 2, vy0 + 8, 18 + tier * 3, [130, 65, 18]); return s;
}
function voltBack(tier: number): Sprite { // 004/005/006 generator rear — coil bank + arcs
  const g = base();
  const w = 48 + tier * 8;
  const h = 46 + tier * 8;
  const x = Math.round((S - w) / 2);
  const yb = 82 + tier;
  const y = yb - h;
  foot(g, x + 4, yb, 13); foot(g, x + w - 17, yb, 13);
  g.box(x, y, w, h, 'l', 'a', 'A');
  for (let yy = y + 7; yy < yb - 2; yy += 7) g.hline(x + 1, yy, w - 2, 'A');
  const cbw = w - 16;
  g.box(x + 8, y - 16, cbw, 16, 'n', 'k', 'K'); // copper coil bank from behind
  for (let cx = x + 10; cx < x + 8 + cbw; cx += 3) g.vline(cx, y - 16, 16, 'q');
  if (tier >= 3) { g.box(x - 6, y + 8, 12, 22, 'n', 'k', 'K'); g.box(x + w - 6, y + 8, 12, 22, 'n', 'k', 'K'); } // HAUL shoulder coils
  const vx0 = x + Math.round(w / 2) - 12;
  const vy0 = y + Math.round(h * 0.45);
  g.box(vx0, vy0, 24, 12, 'A', 'x', 'x');
  for (let vx = vx0 + 2; vx < vx0 + 22; vx += 4) g.vline(vx, vy0 + 2, 8, '1');
  g.line(x + 8, y - 14, x - 2, y - 26, '1'); g.line(x + 8 + cbw, y - 14, x + 8 + cbw + 10, y - 26, '1'); // arcs
  g.set(x - 2, y - 26, '*'); g.set(x + 8 + cbw + 10, y - 26, '*');
  if (tier >= 2) { g.line(Math.round(S / 2), y - 16, Math.round(S / 2), y - 28, '1'); g.set(Math.round(S / 2), y - 28, '*'); }
  for (const [rx, ry] of [[x + 2, y + 2], [x + w - 3, y + 2], [x + 2, yb - 3], [x + w - 3, yb - 3]] as Array<[number, number]>) g.set(rx, ry, 'l');
  g.outline('X');
  const s = g.render(); glow(s, S / 2, y - 6, 16 + tier * 3, [40, 95, 155]); return s;
}
function coolantBack(tier: number): Sprite { // 007/008/009 pump rear — spout + drips
  const g = base();
  const w = 46 + tier * 8;
  const h = 46 + tier * 8;
  const x = Math.round((S - w) / 2);
  const yb = 82 + tier;
  const y = yb - h;
  foot(g, x + 4, yb, 13); foot(g, x + w - 17, yb, 13);
  g.box(x, y, w, h, 'i', 'I', 'C'); // cool pump body from behind
  for (let yy = y + 7; yy < yb - 2; yy += 7) g.hline(x + 1, yy, w - 2, 'C');
  g.box(x + w - 22, y - 18, 12, 22, 'a', 'A', 'x'); g.rect(x + w - 26, y - 20, 18, 6, 'a'); // spout over the top
  for (let i = 0; i < 3 + tier; i++) g.set(x + w - 8, y - 14 + i * 4, 'v'); // drips down the back
  const vy0 = y + Math.round(h * 0.4);
  if (tier >= 3) for (let ax = x + 8; ax < x + w - 10; ax += 16) { g.ellipse(ax + 6, vy0, 6, 9, 'C'); g.ellipse(ax + 6, vy0, 4, 7, 'c'); } // aqueduct arches
  else { g.box(x + Math.round(w / 2) - 11, vy0, 22, 12, 'C', 'c', 'C'); g.hline(x + Math.round(w / 2) - 9, vy0 + 6, 18, 'v'); }
  g.ellipse(x + 12, vy0 + 2, 5, 5, 'a'); g.ellipse(x + 12, vy0 + 2, 2, 2, 'l'); // pressure gauge
  for (const [rx, ry] of [[x + 2, y + 2], [x + w - 3, y + 2], [x + 2, yb - 3], [x + w - 3, yb - 3]] as Array<[number, number]>) g.set(rx, ry, 'l');
  g.outline('X');
  const s = g.render(); glow(s, S / 2, vy0 + 2, 16 + tier * 3, [20, 75, 130]); return s;
}
const BACK_OVERRIDES: Record<number, () => Sprite> = {
  1: () => thermBack(1), 2: () => thermBack(2), 3: () => thermBack(3),
  4: () => voltBack(1), 5: () => voltBack(2), 6: () => voltBack(3),
  7: () => coolantBack(1), 8: () => coolantBack(2), 9: () => coolantBack(3),
};

// ---- the full 150 spec (archetype + type per Manifest line) --------------
type Arch = 'box' | 'round' | 'tall' | 'vehicle' | 'tool' | 'bulb' | 'plant' | 'speaker' | 'orb' | 'legend';
interface Line { from: number; to: number; arch: Arch; type: TypeName }
const LINES: Line[] = [
  { from: 1, to: 3, arch: 'box', type: 'THERM' }, { from: 4, to: 6, arch: 'box', type: 'VOLT' }, { from: 7, to: 9, arch: 'box', type: 'COOLANT' },
  { from: 10, to: 11, arch: 'box', type: 'THERM' }, { from: 12, to: 14, arch: 'box', type: 'THERM' }, { from: 15, to: 17, arch: 'bulb', type: 'OPTIC' },
  { from: 18, to: 18, arch: 'round', type: 'SONIC' }, { from: 19, to: 20, arch: 'box', type: 'UTILITY' }, { from: 21, to: 22, arch: 'round', type: 'UTILITY' },
  { from: 23, to: 23, arch: 'box', type: 'THERM' }, { from: 24, to: 24, arch: 'box', type: 'UTILITY' }, { from: 25, to: 26, arch: 'box', type: 'COOLANT' },
  { from: 27, to: 28, arch: 'box', type: 'UTILITY' }, { from: 29, to: 29, arch: 'box', type: 'UTILITY' }, { from: 30, to: 31, arch: 'box', type: 'FRAME' },
  { from: 32, to: 32, arch: 'tool', type: 'FRAME' }, { from: 33, to: 33, arch: 'round', type: 'SONIC' }, { from: 34, to: 35, arch: 'box', type: 'UTILITY' },
  { from: 36, to: 36, arch: 'box', type: 'SIGNAL' }, { from: 37, to: 37, arch: 'tool', type: 'OPTIC' }, { from: 38, to: 39, arch: 'tall', type: 'COOLANT' },
  { from: 40, to: 40, arch: 'tall', type: 'COOLANT' }, { from: 41, to: 42, arch: 'plant', type: 'VERDANT' }, { from: 43, to: 44, arch: 'plant', type: 'VERDANT' },
  { from: 45, to: 45, arch: 'plant', type: 'VERDANT' }, { from: 46, to: 46, arch: 'round', type: 'FRAME' }, { from: 47, to: 48, arch: 'vehicle', type: 'MOTOR' },
  { from: 49, to: 50, arch: 'tool', type: 'BREAKER' }, { from: 51, to: 51, arch: 'round', type: 'BREAKER' }, { from: 52, to: 53, arch: 'tool', type: 'BREAKER' },
  { from: 54, to: 55, arch: 'box', type: 'VOLT' }, { from: 56, to: 56, arch: 'box', type: 'VOLT' }, { from: 57, to: 57, arch: 'tool', type: 'VOLT' },
  { from: 58, to: 59, arch: 'tall', type: 'VOLT' }, { from: 60, to: 61, arch: 'orb', type: 'VOLT' }, { from: 62, to: 64, arch: 'tall', type: 'VOLT' },
  { from: 65, to: 67, arch: 'tall', type: 'THERM' }, { from: 68, to: 69, arch: 'tall', type: 'THERM' }, { from: 70, to: 72, arch: 'vehicle', type: 'MOTOR' },
  { from: 73, to: 74, arch: 'vehicle', type: 'MOTOR' }, { from: 75, to: 75, arch: 'vehicle', type: 'MOTOR' }, { from: 76, to: 76, arch: 'vehicle', type: 'MOTOR' },
  { from: 77, to: 78, arch: 'vehicle', type: 'MOTOR' }, { from: 79, to: 79, arch: 'box', type: 'MOTOR' }, { from: 80, to: 81, arch: 'vehicle', type: 'MOTOR' },
  { from: 82, to: 84, arch: 'vehicle', type: 'MOTOR' }, { from: 85, to: 87, arch: 'box', type: 'THERM' }, { from: 88, to: 90, arch: 'speaker', type: 'SONIC' },
  { from: 91, to: 92, arch: 'speaker', type: 'SONIC' }, { from: 93, to: 94, arch: 'box', type: 'SONIC' }, { from: 95, to: 95, arch: 'box', type: 'SONIC' },
  { from: 96, to: 96, arch: 'round', type: 'SONIC' }, { from: 97, to: 97, arch: 'tall', type: 'SONIC' }, { from: 98, to: 99, arch: 'bulb', type: 'OPTIC' },
  { from: 100, to: 100, arch: 'box', type: 'OPTIC' }, { from: 101, to: 101, arch: 'box', type: 'OPTIC' }, { from: 102, to: 104, arch: 'tool', type: 'OPTIC' },
  { from: 105, to: 106, arch: 'tall', type: 'OPTIC' }, { from: 107, to: 107, arch: 'tall', type: 'SIGNAL' }, { from: 108, to: 108, arch: 'tall', type: 'OPTIC' },
  { from: 109, to: 111, arch: 'tall', type: 'SIGNAL' }, { from: 112, to: 114, arch: 'box', type: 'SIGNAL' }, { from: 115, to: 116, arch: 'box', type: 'SIGNAL' },
  { from: 117, to: 118, arch: 'box', type: 'SIGNAL' }, { from: 119, to: 119, arch: 'box', type: 'SIGNAL' }, { from: 120, to: 120, arch: 'box', type: 'UTILITY' },
  { from: 121, to: 123, arch: 'tall', type: 'SIGNAL' }, { from: 124, to: 125, arch: 'orb', type: 'SIGNAL' }, { from: 126, to: 126, arch: 'box', type: 'UTILITY' },
  { from: 127, to: 127, arch: 'tool', type: 'BREAKER' }, { from: 128, to: 128, arch: 'box', type: 'COOLANT' }, { from: 129, to: 129, arch: 'box', type: 'COOLANT' },
  { from: 130, to: 132, arch: 'box', type: 'COOLANT' }, { from: 133, to: 134, arch: 'tall', type: 'THERM' }, { from: 135, to: 135, arch: 'tall', type: 'FRAME' },
  { from: 136, to: 137, arch: 'vehicle', type: 'FRAME' }, { from: 138, to: 139, arch: 'box', type: 'FRAME' }, { from: 140, to: 141, arch: 'vehicle', type: 'FRAME' },
  { from: 142, to: 143, arch: 'round', type: 'BREAKER' }, { from: 144, to: 144, arch: 'legend', type: 'FRAME' }, { from: 145, to: 145, arch: 'legend', type: 'SIGNAL' },
  { from: 146, to: 146, arch: 'legend', type: 'MOTOR' }, { from: 147, to: 147, arch: 'legend', type: 'THERM' }, { from: 148, to: 148, arch: 'plant', type: 'VERDANT' },
  { from: 149, to: 149, arch: 'plant', type: 'VERDANT' }, { from: 150, to: 150, arch: 'legend', type: 'SIGNAL' },
];

/** bespoke drawers take priority over the archetype renderer: the slice set,
 * the full starter lines (the player's own Ohm), and the seven legendaries. */
const OVERRIDES: Record<number, () => Sprite> = {
  1: charkit, 2: smolderig, 3: pyrofurnax,
  4: sparkit, 5: amperig, 6: generatlas,
  7: dripkit, 8: flowrig, 9: aquaducton,
  10: toastlet, 12: wavelet, 15: filaglow,
  18: beeplet, 19: vacuette, 21: fanlet, 24: mailstrom, 25: frostbox, 30: vendlet,
  32: staplejaw, 33: snoozebox,
  144: cottongin, 145: telegrapheme, 146: locomotiva, 147: starbottle,
  148: pecantheon, 149: rosarithm, 150: exemplar,
};

function lineOf(n: number): Line {
  const ln = LINES.find((l) => n >= l.from && n <= l.to);
  if (!ln) throw new Error(`no Manifest line covers species ${n}`);
  return ln;
}
function drawFront(n: number): Sprite {
  const ov = OVERRIDES[n];
  if (ov) return ov();
  const ln = lineOf(n);
  const p = TYPEPAL[ln.type];
  const tier = Math.min(n - ln.from + 1, 3);
  const legend = n >= 144;
  switch (ln.arch) {
    case 'round': return archRound(p, tier);
    case 'tall': return archTall(p, tier);
    case 'vehicle': return archVehicle(p, tier);
    case 'tool': return archTool(p, tier);
    case 'bulb': return archBulb(p, tier);
    case 'plant': return archPlant(p, legend ? 4 : tier, n);
    case 'speaker': return archSpeaker(p, tier);
    case 'orb': return archOrb(p, tier);
    case 'legend': return archLegend(p);
    default: return archBox(p, tier);
  }
}

// ---- emit (all 150 fronts + backs) ---------------------------------------
const fronts: Sprite[] = [];
for (let n = 1; n <= 150; n++) { const s = drawFront(n); writePng(s, join(OUT, `${n}_front_hd.png`)); fronts.push(s); }
for (let n = 1; n <= 150; n++) { const ov = BACK_OVERRIDES[n]; writePng(ov ? ov() : backArch(TYPEPAL[lineOf(n).type]), join(OUT, `${n}_back_hd.png`)); }

// ---- contact sheet -------------------------------------------------------
const cell = 104;
const SHEET_COLS = 10;
const rows = Math.ceil(fronts.length / SHEET_COLS);
const sheet = new Sprite(SHEET_COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [40, 44, 52, 255]);
fronts.forEach((s, i) => {
  const ox = (i % SHEET_COLS) * cell + (cell - S) / 2;
  const oy = Math.floor(i / SHEET_COLS) * cell + (cell - S) / 2;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const c = s.get(x, y); if ((c[3] ?? 0) === 0) continue; sheet.set(ox + x, oy + y, c); }
});
mkdirSync(join(ROOT, 'assets/sprites/ohms'), { recursive: true });
writePng(sheet, join(ROOT, 'assets/sprites/ohms/_contact.png'));
console.log('ohm sprites: 150 fronts + 150 backs (grid method) → public/sprites/ohms/');
