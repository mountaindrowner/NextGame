/**
 * Cutscene art (npm run gen:cutscene-art) — the cold-open title cards and a
 * Mabel portrait, grid method (tools/gridart.ts). Cards are 240×160 (the
 * legacy cutscene canvas, drawn 1:1). Writes public/ui/cutscene/*.png and
 * public/world/char/mabel_96.png. Atmospheric, depth/density, locked palette.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';

const ROOT = new URL('..', import.meta.url).pathname;
const UI = join(ROOT, 'public/ui/cutscene');
const CHAR = join(ROOT, 'public/world/char');
mkdirSync(UI, { recursive: true });
mkdirSync(CHAR, { recursive: true });
const W = 240;
const H = 160;
const save = (s: Sprite, path: string): void => { const p = new PNG({ width: s.w, height: s.h }); p.data.set(s.data); writeFileSync(path, PNG.sync.write(p)); };
function glow(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, Math.round(c[0] + col[0] * a)), Math.min(255, Math.round(c[1] + col[1] * a)), Math.min(255, Math.round(c[2] + col[2] * a)), 255]); }
}
const band = (g: Grid, y0: number, y1: number, ch: string): void => { for (let y = y0; y < y1; y++) g.hline(0, y, W, ch); };

// ---- the Waking — night sky, machines waking, motes rising ---------------
function waking(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, 44, '6'); band(g, 44, 84, '3'); band(g, 84, 124, 'C'); band(g, 124, H, 'x');
  const r = new Rng(11);
  for (let k = 0; k < 90; k++) g.set(r.int(0, W - 1), r.int(0, 80), r.chance(60) ? '*' : '1'); // stars
  // a derrick / windmill silhouette on the horizon
  g.line(150, 124, 150, 70, 'X'); g.line(150, 70, 132, 96, 'X'); g.line(150, 70, 168, 96, 'X'); g.line(138, 110, 162, 110, 'X');
  g.box(40, 116, 30, 18, 'x', 'X', 'X'); // a dead shack
  const s = g.render();
  // the Waking: a column of cyan motes rising off the machine
  const m = new Rng(7);
  for (let k = 0; k < 120; k++) { const x = 150 + m.int(-16, 16); const y = m.int(40, 124); s.set(x, y, m.chance(50) ? [159, 226, 255, 255] : [125, 240, 210, 255]); }
  glow(s, 150, 96, 40, [20, 60, 80]);
  return s;
}

// ---- under — the colony, low ceilings, warm lamps ------------------------
function under(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, H, 'd');
  for (let k = 0; k < 60; k++) { const r = new Rng(k + 1); g.ellipse(r.int(0, W), r.int(0, 40), r.int(10, 26), r.int(6, 14), 'D'); } // dark ceiling lumps
  band(g, 0, 18, 'D'); // low ceiling
  band(g, 128, H, 'M'); g.hline(0, 128, W, 'Q'); // earthen floor
  // pillars + doorways
  for (const x of [30, 96, 170, 210]) { g.box(x, 30, 16, 100, 'N', 'd', 'D'); }
  g.box(120, 60, 36, 68, 'Q', 'x', 'x'); // a dark doorway deeper in
  const s = g.render();
  for (const [x, y] of [[60, 70], [150, 64], [200, 80]] as Array<[number, number]>) { s.set(x, y, [255, 210, 122, 255]); glow(s, x, y, 22, [70, 45, 12]); } // lamps
  for (const [x, y, c] of [[44, 100, [159, 226, 255]], [186, 110, [224, 176, 255]], [110, 120, [125, 240, 210]]] as Array<[number, number, [number, number, number]]>) { s.set(x, y, [c[0], c[1], c[2], 255]); glow(s, x, y, 12, [c[0] / 6, c[1] / 6, c[2] / 6]); } // crystals
  return s;
}

// ---- surface — ruined cattle town under a pale dawn ----------------------
function surface(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, 30, 'u'); band(g, 30, 60, 'm'); band(g, 60, 92, 'w'); band(g, 92, 104, 'i');
  band(g, 104, 122, 'k'); band(g, 122, H, 'g'); // ground + grass
  // ruined town silhouette on the horizon (~y 104)
  const r = new Rng(3);
  for (let x = 0; x < W; x += 14) { const h = r.int(8, 26); g.box(x, 104 - h, 12, h, 'A', 'x', 'x'); if (r.chance(40)) g.set(x + 6, 104 - h - 2, 'x'); }
  // a barn gable + a water tower
  g.box(150, 80, 26, 24, 'E', 'x', 'x'); for (let i = 0; i <= 13; i++) g.hline(150 + i, 80 - i, 26 - 2 * i, 'E');
  g.box(60, 70, 6, 34, 'a', 'A', 'x'); g.box(54, 60, 18, 12, 'a', 'A', 'x'); // water tower
  const s = g.render();
  glow(s, 200, 40, 46, [80, 70, 40]); // a low sun
  // grass texture
  const gr = new Rng(9);
  for (let k = 0; k < 240; k++) { const x = gr.int(0, W - 1); const y = gr.int(122, H - 1); s.set(x, y, gr.chance(50) ? [94, 126, 48, 255] : [132, 160, 70, 255]); }
  return s;
}

// ---- the Static — the hive whisper, cold and patient ---------------------
function staticCard(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, H, 'x');
  for (let k = 0; k < 50; k++) { const r = new Rng(k + 5); g.ellipse(r.int(0, W), r.int(0, H), r.int(8, 20), r.int(6, 14), '6'); }
  // a far tower silhouette, the signal's spine
  g.box(116, 40, 8, 96, 'X', 'X', 'X'); g.line(120, 40, 104, 24, 'X'); g.line(120, 40, 136, 24, 'X');
  const s = g.render();
  // concentric cold rings radiating from the tower top
  for (let ring = 1; ring < 7; ring++) { const rad = ring * 18; for (let a = 0; a < 6.28; a += 0.06) { const x = 120 + Math.cos(a) * rad; const y = 30 + Math.sin(a) * rad * 0.7; if (x < 0 || y < 0 || x >= W || y >= H) continue; if (Math.random() < 0.5) s.set(Math.round(x), Math.round(y), ring % 2 ? [95, 58, 143, 255] : [47, 156, 132, 255]); } }
  const fl = new Rng(13);
  for (let k = 0; k < 90; k++) s.set(fl.int(0, W - 1), fl.int(0, H - 1), fl.chance(50) ? [125, 240, 210, 255] : [154, 99, 207, 255]);
  glow(s, 120, 30, 50, [50, 20, 80]);
  return s;
}

// ---- the garage — Eli's workshop, warm and lived-in ----------------------
function garage(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, 110, 'A'); band(g, 110, H, 'M'); g.hline(0, 110, W, 'Q'); // wall + floor
  for (let y = 8; y < 108; y += 14) g.hline(0, y, W, 'x'); // wall courses
  // pegboard of tools
  g.box(20, 16, 60, 40, 'k', 'K', 'x'); for (const [x, y] of [[30, 26], [44, 24], [58, 30], [36, 42], [62, 44]] as Array<[number, number]>) { g.vline(x, y, 10, 'a'); g.set(x, y, 'l'); }
  // the workbench
  g.box(18, 96, 150, 14, 'n', 'k', 'K'); g.vline(24, 110, 24, 'K'); g.vline(158, 110, 24, 'K');
  g.box(110, 70, 40, 26, 'l', 'a', 'A'); // a half-built rig on the bench
  g.box(120, 76, 18, 12, 'E', 'x', 'x'); g.rect(124, 80, 10, 6, 'z'); // its glowing core
  g.box(190, 60, 30, 50, 'k', 'K', 'x'); // a cabinet / Banjo's corner
  const s = g.render();
  glow(s, 129, 82, 26, [120, 80, 24]); // core glow
  glow(s, 60, 30, 30, [60, 45, 18]); // a hanging lamp warmth
  glow(s, 205, 80, 24, [40, 30, 60]); // Banjo's faint light in the corner
  return s;
}

// ---- Mabel — a warm elder-woman bust portrait (96×96) --------------------
function mabel(): Sprite {
  const g = new Grid(96, 96);
  // shoulders / apron
  g.box(20, 74, 56, 22, 'w', 'W', 'A');
  g.box(36, 74, 24, 22, 'l', 'w', 'W'); // apron bib
  // neck
  g.box(42, 64, 12, 12, 'S', 's', 's');
  // head
  g.ellipse(48, 44, 18, 20, 'S');
  g.ellipse(46, 40, 15, 16, 'H');
  // grey hair, framing + a bun
  for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI; g.set(48 + Math.cos(a + Math.PI) * 19, 40 + Math.sin(a + Math.PI) * 20, 'w'); }
  g.ellipse(48, 24, 18, 10, 'w'); g.ellipse(48, 22, 16, 8, 'W');
  g.ellipse(30, 46, 5, 8, 'w'); g.ellipse(66, 46, 5, 8, 'w'); // side hair
  g.ellipse(48, 14, 7, 6, 'W'); // a bun
  // kind eyes + glasses
  for (const ex of [40, 56]) { g.ellipse(ex, 44, 3, 3, '*'); g.set(ex, 44, 'X'); g.ellipse(ex, 44, 4, 4, 'a'); }
  g.hline(48, 44, 0, 'a'); g.line(44, 44, 52, 44, 'a'); // glasses bridge
  g.set(40, 44, 'X'); g.set(56, 44, 'X'); // pupils
  // brows + a soft smile + cheeks
  g.hline(37, 38, 6, 'W'); g.hline(53, 38, 6, 'W');
  g.line(43, 56, 53, 56, 's'); g.set(42, 55, 's'); g.set(54, 55, 's');
  g.set(36, 50, 'H'); g.set(60, 50, 'H');
  g.outline('X');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
save(waking(), join(UI, 'co_waking.png'));
save(under(), join(UI, 'co_under.png'));
save(surface(), join(UI, 'co_surface.png'));
save(staticCard(), join(UI, 'co_static.png'));
save(garage(), join(UI, 'garage.png'));
save(mabel(), join(CHAR, 'mabel_96.png'));
console.log('cutscene art: 5 cards + Mabel portrait → public/ui/cutscene/ + public/world/char/mabel_96.png');
