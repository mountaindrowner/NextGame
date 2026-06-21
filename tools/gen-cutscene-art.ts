/**
 * Cutscene art (npm run gen:cutscene-art) — the cold-open title cards and the
 * cinematic protagonist portraits (SAL / WREN / Mabel), grid method
 * (tools/gridart.ts) with spritekit colour/lighting post-process (ramp, sphere,
 * antialias, glow, vignette). Cards are 240×160 (the legacy cutscene canvas).
 * Portraits are authored on-method (the locked pipeline), high-detail busts.
 * Writes public/ui/cutscene/*.png and public/world/char/{sal,wren,mabel}_96.png.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { ramp, Sprite, type RGBA } from './spritekit';
import { Rng } from '../src/core/rng';

const ROOT = new URL('..', import.meta.url).pathname;
const UI = join(ROOT, 'public/ui/cutscene');
const CHAR = join(ROOT, 'public/world/char');
mkdirSync(UI, { recursive: true });
mkdirSync(CHAR, { recursive: true });
const W = 240;
const H = 160;
const save = (s: Sprite, path: string): void => { const p = new PNG({ width: s.w, height: s.h }); p.data.set(s.data); writeFileSync(path, PNG.sync.write(p)); };

/** Additive bloom — soft radial light added over what's there. */
function glow(s: Sprite, cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, Math.round(c[0] + col[0] * a)), Math.min(255, Math.round(c[1] + col[1] * a)), Math.min(255, Math.round(c[2] + col[2] * a)), 255]); }
}
/** Cinematic edge grade — darken + cool the card edges for framing. */
function vignette(s: Sprite, strength = 0.5): void {
  for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) {
    const dx = (x - s.w / 2) / (s.w / 2);
    const dy = (y - s.h / 2) / (s.h / 2);
    const d = Math.min(1, Math.hypot(dx, dy) / 1.25);
    const v = d * d * strength;
    if (v <= 0) continue;
    const c = s.get(x, y);
    s.set(x, y, [Math.round(c[0] * (1 - v)), Math.round(c[1] * (1 - v)), Math.round(c[2] * (1 - v * 0.85)), c[3] ?? 255]);
  }
}
/** A faint atmospheric haze band (distance fade) over a y-range. */
function haze(s: Sprite, y0: number, y1: number, col: [number, number, number], a: number): void {
  for (let y = y0; y < y1; y++) { const t = a * (1 - (y - y0) / Math.max(1, y1 - y0)); for (let x = 0; x < s.w; x++) { const c = s.get(x, y); s.set(x, y, [Math.round(c[0] * (1 - t) + col[0] * t), Math.round(c[1] * (1 - t) + col[1] * t), Math.round(c[2] * (1 - t) + col[2] * t), 255]); } }
}
const band = (g: Grid, y0: number, y1: number, ch: string): void => { for (let y = y0; y < y1; y++) g.hline(0, y, W, ch); };

// ---- the Waking — night sky, machines waking, motes rising ---------------
function waking(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, 40, '6'); band(g, 40, 78, '3'); band(g, 78, 118, 'C'); band(g, 118, H, 'x');
  // a dead town on the horizon, depth-faded
  const r = new Rng(3);
  for (let x = 6; x < W; x += 13) { const h = r.int(6, 18); g.box(x, 120 - h, 11, h, 'x', 'X', 'X'); }
  // the windmill the swarm is waking
  g.line(150, 122, 150, 64, 'X'); g.line(150, 64, 130, 92, 'X'); g.line(150, 64, 170, 92, 'X'); g.line(136, 108, 164, 108, 'X');
  g.box(40, 110, 30, 18, 'x', 'X', 'X');
  const s = g.render();
  // stars, varied brightness + depth
  const st = new Rng(11);
  for (let k = 0; k < 140; k++) { const x = st.int(0, W - 1); const y = st.int(0, 96); const b = st.int(120, 255); s.set(x, y, [b, b, Math.min(255, b + 20), 255]); }
  // the Waking: a bright core on the windmill + a rising column of cyan motes
  const cyan = ramp('#5fd8ff', { steps: 7, spread: 0.5 });
  s.sphere(150, 64, 7, cyan, { dither: true, specular: true });
  const m = new Rng(7);
  for (let k = 0; k < 170; k++) { const x = 150 + Math.round(m.int(-18, 18) * (1 - m.next() * 0.3)); const y = m.int(40, 122); const a = m.next(); s.set(x, y, a < 0.5 ? [159, 226, 255, 255] : a < 0.8 ? [125, 240, 210, 255] : [220, 250, 255, 255]); }
  glow(s, 150, 80, 46, [22, 64, 86]);
  haze(s, 96, 124, [40, 70, 110], 0.35);
  vignette(s, 0.55);
  return s;
}

// ---- under — the colony, low ceilings, warm lamps ------------------------
function under(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, H, 'd');
  band(g, 0, 22, 'D'); // low ceiling
  const cr = new Rng(2);
  for (let k = 0; k < 40; k++) g.ellipse(cr.int(0, W), cr.int(0, 30), cr.int(8, 22), cr.int(5, 12), 'D'); // ceiling lumps
  band(g, 126, H, 'M'); g.hline(0, 126, W, 'Q'); g.hline(0, 127, W, 'Q'); // floor
  // pillars receding (parallax depth via size)
  for (const [x, w, top] of [[18, 18, 28], [92, 16, 34], [176, 16, 34], [214, 18, 28]] as Array<[number, number, number]>) g.box(x, top, w, 126 - top, 'N', 'd', 'D');
  g.box(118, 54, 38, 72, 'Q', 'x', 'x'); // a deeper doorway
  // stone cracks + bricks on a near pillar
  for (let y = 30; y < 120; y += 6) { g.hline(18, y, 18, 'D'); g.hline(214, y, 18, 'D'); }
  const s = g.render();
  // warm lamps (sphere + glow)
  const warm = ramp('#ffb24a', { steps: 7, spread: 0.45 });
  for (const [x, y] of [[58, 66], [150, 60], [198, 80]] as Array<[number, number]>) { s.sphere(x, y, 3, warm, { dither: true, specular: true }); glow(s, x, y, 24, [80, 50, 14]); }
  // bioluminescent crystals
  for (const [x, y, hex, col] of [[44, 100, '#9fe2ff', [60, 90, 120]], [186, 108, '#e0b0ff', [80, 50, 110]], [110, 118, '#7df0d2', [40, 110, 90]]] as Array<[number, number, string, [number, number, number]]>) { s.sphere(x, y, 3, ramp(hex, { steps: 6 }), { dither: true }); glow(s, x, y, 14, col); }
  // hanging dust motes
  const du = new Rng(9);
  for (let k = 0; k < 50; k++) { const x = du.int(0, W - 1); const y = du.int(24, 120); s.set(x, y, [120, 100, 80, 255]); }
  vignette(s, 0.6);
  return s;
}

// ---- surface — ruined cattle town under a pale dawn ----------------------
function surface(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, 26, 'u'); band(g, 26, 52, 'm'); band(g, 52, 84, 'w'); band(g, 84, 100, 'i');
  band(g, 100, 116, 'k'); band(g, 116, H, 'g'); // ground + grass
  const s = g.render();
  haze(s, 70, 104, [210, 200, 180], 0.4); // morning haze on the horizon
  // ruined town silhouettes (mid), depth-faded
  const r = new Rng(3);
  const tone: RGBA = [58, 50, 46, 255];
  for (let x = 0; x < W; x += 15) { const h = r.int(10, 28); for (let yy = 100 - h; yy < 100; yy++) for (let xx = x; xx < x + 12; xx++) s.set(xx, yy, tone); if (r.chance(40)) s.set(x + 6, 100 - h - 2, [40, 34, 30, 255]); }
  // a barn gable + windmill + water tower (mid hero)
  for (let i = 0; i <= 13; i++) s.line(150 + i, 80 - i, 176 - i, 80 - i, [70, 38, 28, 255]);
  s.rect(150, 80, 26, 22, [70, 38, 28, 255]);
  s.rect(58, 70, 5, 30, [60, 56, 50, 255]); s.rect(52, 60, 17, 11, [60, 56, 50, 255]); // water tower
  // foreground grass + scattered rocks/posts (near)
  const gr = new Rng(14);
  for (let k = 0; k < 320; k++) { const x = gr.int(0, W - 1); const y = gr.int(116, H - 1); s.set(x, y, gr.chance(50) ? [88, 120, 44, 255] : [128, 156, 66, 255]); }
  for (let k = 0; k < 10; k++) { const x = gr.int(8, W - 8); const y = gr.int(132, H - 6); s.ellipse(x, y, gr.int(4, 9), gr.int(2, 4), [70, 66, 56, 255]); } // rocks
  for (const fx of [24, 210]) { s.rect(fx, 120, 3, 30, [44, 34, 24, 255]); s.line(fx, 122, fx + 14, 126, [44, 34, 24, 255]); } // foreground fence posts
  vignette(s, 0.38);
  // the dawn sun, kept bright over the grade
  s.sphere(196, 36, 20, ramp('#ffe9b0', { steps: 7, spread: 0.45 }), { dither: true, specular: true });
  s.ellipse(196, 36, 6, 6, [255, 248, 224, 255]);
  glow(s, 196, 36, 72, [120, 100, 50]);
  return s;
}

// ---- the Static — the hive whisper, cold and patient ---------------------
function staticCard(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, H, 'x');
  const cl = new Rng(5);
  for (let k = 0; k < 44; k++) g.ellipse(cl.int(0, W), cl.int(0, H), cl.int(8, 22), cl.int(6, 14), '6');
  g.box(116, 36, 8, 100, 'X', 'X', 'X'); // the signal spine
  g.line(120, 36, 100, 18, 'X'); g.line(120, 36, 140, 18, 'X');
  const s = g.render();
  // concentric cold rings radiating from the antenna
  const rr = new Rng(31);
  for (let ring = 1; ring < 8; ring++) { const rad = ring * 16; for (let a = 0; a < 6.283; a += 0.05) { const x = 120 + Math.cos(a) * rad; const y = 28 + Math.sin(a) * rad * 0.7; if (x < 0 || y < 0 || x >= W || y >= H) continue; if (rr.next() < 0.55) s.set(Math.round(x), Math.round(y), ring % 2 ? [95, 58, 143, 255] : [47, 156, 132, 255]); } }
  // the node itself
  s.sphere(120, 28, 6, ramp('#9a63cf', { steps: 7, spread: 0.5 }), { dither: true, specular: true });
  const fl = new Rng(13);
  for (let k = 0; k < 110; k++) s.set(fl.int(0, W - 1), fl.int(0, H - 1), fl.chance(50) ? [125, 240, 210, 255] : [154, 99, 207, 255]);
  glow(s, 120, 28, 56, [54, 22, 86]);
  vignette(s, 0.6);
  return s;
}

// ---- the garage — Eli's workshop, warm and lived-in ----------------------
function garage(): Sprite {
  const g = new Grid(W, H);
  band(g, 0, 112, 'A'); band(g, 112, H, 'M'); g.hline(0, 112, W, 'Q');
  for (let y = 8; y < 110; y += 13) g.hline(0, y, W, 'x'); // wall courses
  for (let x = 0; x < W; x += 28) g.vline(x, 112, H - 112, 'Q'); // floorboards
  // pegboard of tools
  g.box(18, 14, 64, 42, 'k', 'K', 'x');
  for (const [x, y] of [[28, 24], [42, 22], [56, 28], [34, 40], [62, 42], [48, 24]] as Array<[number, number]>) { g.vline(x, y, 11, 'a'); g.set(x, y, 'l'); g.set(x - 1, y + 11, 'A'); }
  // the workbench + a half-built rig with a glowing core
  g.box(16, 96, 152, 16, 'n', 'k', 'K'); g.vline(22, 112, 26, 'K'); g.vline(160, 112, 26, 'K');
  g.box(108, 66, 44, 30, 'l', 'a', 'A'); for (let yy = 70; yy < 94; yy += 5) g.hline(108, yy, 44, 'A');
  g.box(120, 74, 20, 14, 'E', 'x', 'x');
  // Banjo's cabinet in the corner
  g.box(192, 56, 32, 56, 'k', 'K', 'x'); for (let i = 0; i <= 9; i++) g.hline(192 + i, 56 - Math.floor(i * 0.3), 32 - 2 * i, 'k'); g.box(198, 64, 20, 14, 'q', 'e', 'E');
  const s = g.render();
  // the glowing core (sphere) + warm lamp + Banjo's amber
  s.sphere(130, 80, 6, ramp('#ffcf66', { steps: 7, spread: 0.5 }), { dither: true, specular: true });
  glow(s, 130, 80, 28, [120, 80, 24]);
  glow(s, 60, 26, 34, [70, 50, 18]);
  s.sphere(208, 70, 5, ramp('#ffb24a', { steps: 6 }), { dither: true });
  glow(s, 208, 71, 22, [70, 44, 16]);
  // warm dust motes in the lamplight
  const du = new Rng(21);
  for (let k = 0; k < 40; k++) { const x = du.int(20, 180); const y = du.int(20, 100); s.set(x, y, [150, 120, 80, 255]); }
  vignette(s, 0.5);
  return s;
}

// ---- protagonist busts (grid method, the locked pipeline) ----------------
interface BustOpts { ponytail?: boolean; grin?: boolean; freckles?: boolean; smudge?: boolean }
function protagBust(hair: string, hairDk: string, o: BustOpts): Sprite {
  const g = new Grid(88, 112);
  const cx = 44;
  // jacket shoulders + collar (olive)
  g.box(6, 90, 76, 22, 'h', 'j', 'J');
  g.box(26, 84, 36, 18, 'h', 'j', 'J');
  g.line(28, 86, 38, 100, 'J'); g.line(60, 86, 50, 100, 'J'); // collar V
  g.set(30, 88, 'h'); g.set(58, 88, 'h');
  // bandana at the neck (red)
  g.box(32, 78, 24, 10, 'q', 'b', 'B');
  g.set(43, 80, '*'); // knot glint
  for (let i = 0; i < 4; i++) { g.set(38, 86 + i, 'B'); g.set(50, 86 + i, 'B'); }
  // neck
  g.box(37, 68, 14, 12, 'H', 'S', 's');
  g.set(38, 79, 's'); g.set(49, 79, 's');
  // head — lit base, top-left highlight, thin rim shadow only
  g.ellipse(cx, 46, 20, 24, 'S');
  g.ellipse(cx - 4, 42, 14, 17, 'H'); // top-left light
  for (let a = -0.2; a < 2.2; a += 0.08) { g.set(cx + Math.cos(a) * 20, 46 + Math.sin(a) * 24, 's'); } // bottom-right rim
  g.ellipse(cx, 64, 9, 5, 's'); g.ellipse(cx, 62, 10, 5, 'S'); // soft chin + under-shadow
  // ears
  g.ellipse(cx - 21, 47, 4, 6, 's'); g.ellipse(cx + 21, 47, 4, 6, 's'); g.set(cx - 21, 47, 'S'); g.set(cx + 21, 47, 'S');
  // hair: sideburns + fringe under the brim
  g.ellipse(cx - 19, 42, 4, 12, hairDk); g.ellipse(cx + 19, 42, 4, 12, hairDk);
  for (let x = cx - 18; x < cx + 18; x += 1) { g.set(x, 32, (x % 3 ? hair : hairDk)); g.set(x, 33, (x % 4 ? hair : hairDk)); if ((x - cx) % 5 === 0) g.set(x, 34, hairDk); }
  if (o.ponytail) { g.ellipse(cx + 23, 30, 6, 8, hair); g.rect(cx + 25, 30, 9, 26, hair); g.vline(cx + 31, 32, 22, hairDk); g.vline(cx + 26, 32, 22, hair); }
  // cap + goggles pushed up on the brim
  g.box(cx - 23, 12, 46, 14, 'l', 'a', 'A');
  for (let i = 0; i <= 12; i++) g.hline(cx - 23 + i, 12 - Math.floor(i * 0.45), 46 - 2 * i, 'a'); // dome
  g.box(cx - 25, 25, 50, 5, 'a', 'A', 'x'); // brim
  g.box(cx - 23, 19, 46, 6, 'A', 'x', 'x'); // goggle strap
  for (const ex of [cx - 12, cx + 12]) { g.ellipse(ex, 22, 7, 6, 'l'); g.ellipse(ex, 22, 5, 4, 'I'); g.ellipse(ex - 1, 21, 3, 2, '1'); g.set(ex - 2, 20, '*'); } // lenses + cyan shine
  // brows
  g.hline(cx - 14, 40, 7, hairDk); g.hline(cx + 8, 40, 7, hairDk);
  if (o.grin) { g.set(cx + 15, 38, hairDk); g.set(cx + 14, 39, hairDk); } // cocked brow
  // eyes — whites, iris, catchlight, a soft upper lid
  for (const ex of [cx - 9, cx + 10]) { g.rect(ex - 3, 44, 6, 4, '*'); g.hline(ex - 3, 43, 6, hairDk); g.rect(ex, 45, 2, 2, 'X'); g.set(ex + 1, 44, 'I'); g.set(ex - 1, 44, '*'); }
  // nose
  g.set(cx, 49, 'H'); g.set(cx - 1, 52, 's'); g.set(cx, 53, 's'); g.set(cx + 1, 52, 's');
  // mouth
  if (o.grin) { g.line(cx - 7, 59, cx + 6, 56, 'x'); g.set(cx + 7, 57, 'x'); g.rect(cx - 2, 57, 6, 1, '*'); } // upward smirk + tooth glint
  else { g.line(cx - 6, 58, cx + 6, 58, 'x'); g.set(cx - 7, 57, 's'); g.set(cx + 7, 57, 's'); } // level/deadpan
  // cheek light + freckles / grease smudge
  g.set(cx - 13, 53, 'H'); g.set(cx + 14, 53, 'H');
  if (o.freckles) for (const [fx, fy] of [[cx - 12, 54], [cx - 9, 55], [cx + 11, 54], [cx + 13, 55]] as Array<[number, number]>) g.set(fx, fy, 's');
  if (o.smudge) { g.set(cx + 12, 56, 'A'); g.set(cx + 13, 57, 'A'); g.set(cx + 11, 57, 'x'); }
  g.outline('X');
  const s = g.render();
  s.antialias([24, 17, 9, 255], 90);
  return s;
}

// ---- Mabel — a warm elder-woman bust, refined -----------------------------
function mabel(): Sprite {
  const g = new Grid(88, 112);
  const cx = 44;
  // shoulders + apron
  g.box(8, 90, 72, 22, 'l', 'w', 'W');
  g.box(32, 86, 24, 22, 'w', 'W', 'A'); // apron bib
  g.line(34, 88, 36, 110, 'A'); g.line(54, 88, 52, 110, 'A'); // apron straps
  // neck — runs down into the shoulders/apron so the head connects (no gap)
  g.box(38, 68, 12, 24, 'H', 'S', 's');
  // head
  g.ellipse(cx, 46, 20, 24, 's'); g.ellipse(cx - 2, 44, 18, 22, 'S'); g.ellipse(cx - 5, 40, 12, 15, 'H');
  g.ellipse(cx, 60, 12, 8, 'S');
  // grey hair — a soft bun + framing
  for (let i = 0; i < 22; i++) { const a = (i / 22) * Math.PI; g.set(cx + Math.cos(a + Math.PI) * 20, 40 + Math.sin(a + Math.PI) * 22, 'w'); }
  g.ellipse(cx, 22, 20, 11, 'w'); g.ellipse(cx, 20, 17, 9, 'W');
  for (let x = cx - 17; x < cx + 17; x += 2) g.set(x, 30, (x % 4 ? 'w' : 'W')); // wave
  g.ellipse(cx - 20, 44, 5, 9, 'w'); g.ellipse(cx + 20, 44, 5, 9, 'w'); // side hair
  g.ellipse(cx, 12, 8, 6, 'W'); g.ellipse(cx, 11, 6, 4, 'w'); // bun
  // glasses
  for (const ex of [cx - 10, cx + 11]) { g.ellipse(ex, 46, 5, 5, 'a'); g.ellipse(ex, 46, 3, 3, 'H'); g.set(ex - 1, 45, '*'); g.set(ex, 47, 'X'); } // lens + glint + eye
  g.line(cx - 5, 46, cx + 6, 46, 'a'); // bridge
  g.set(cx - 16, 46, 'a'); g.set(cx + 17, 46, 'a'); // temples
  // brows + soft smile + cheeks
  g.hline(cx - 14, 40, 6, 'W'); g.hline(cx + 9, 40, 6, 'W');
  g.line(cx - 7, 59, cx + 7, 59, 's'); g.set(cx - 8, 58, 's'); g.set(cx + 8, 58, 's'); g.set(cx, 60, 's');
  g.set(cx - 14, 53, 'H'); g.set(cx + 14, 53, 'H'); g.set(cx - 13, 55, 's'); g.set(cx + 13, 55, 's'); // laugh lines
  g.set(cx, 53, 's'); g.set(cx - 2, 54, 's'); // nose
  g.outline('X');
  const s = g.render();
  s.antialias([24, 17, 9, 255], 90);
  return s;
}

// ---- emit ----------------------------------------------------------------
save(waking(), join(UI, 'co_waking.png'));
save(under(), join(UI, 'co_under.png'));
save(surface(), join(UI, 'co_surface.png'));
save(staticCard(), join(UI, 'co_static.png'));
save(garage(), join(UI, 'garage.png'));
save(protagBust('r', 'R', { grin: true, freckles: true }), join(CHAR, 'sal_96.png'));
save(protagBust('y', 'Y', { ponytail: true, smudge: true }), join(CHAR, 'wren_96.png'));
save(mabel(), join(CHAR, 'mabel_96.png'));
console.log('cutscene art: 5 layered cards + SAL/WREN/Mabel portraits → public/ui/cutscene/ + public/world/char/');
