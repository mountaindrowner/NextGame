/**
 * Universal clutter / set-dressing art (npm run assets:clutter) — the lived-in
 * layer (Clutter doc §4–§6). Small scatter sprites across the four planes:
 * floor litter/stains/wear, object-plane clutter + habitation, wall occluders,
 * and translucent FX. Grid method, depth where it earns it. Emits
 * assets/tiles/clutter/<plane>/ + a contact sheet. Per-area dressing.<area>
 * art follows alongside each colony's secondary kit.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/clutter');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};
function alphaize(s: Sprite, a: number): Sprite {
  for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const c = s.get(x, y); if ((c[3] ?? 0) > 0) s.set(x, y, [c[0], c[1], c[2], a]); }
  return s;
}

// ---- floor litter / stains / wear ----------------------------------------
function paper(): Sprite { const g = new Grid(16, 12); const r = new Rng(1); for (let k = 0; k < 4; k++) { const x = r.int(1, 11); const y = r.int(1, 9); g.box(x, y, r.int(3, 5), r.int(2, 3), '*', 'w', 'W'); } g.outline('X'); return g.render(); }
function cans(): Sprite { const g = new Grid(14, 10); g.box(2, 3, 6, 4, 'l', 'a', 'A'); g.box(7, 5, 4, 3, 'l', 'a', 'A'); g.set(4, 3, 'b'); g.outline('X'); return g.render(); }
function bottles(): Sprite { const g = new Grid(14, 14); g.box(3, 2, 3, 10, 'F', 'g', 'G'); g.box(8, 6, 3, 6, 'i', 'I', 'C'); g.outline('X'); return g.render(); }
function bolts(): Sprite { const g = new Grid(12, 10); const r = new Rng(2); for (let k = 0; k < 7; k++) { g.set(r.int(1, 10), r.int(1, 8), 'a'); g.set(r.int(1, 10), r.int(1, 8), 'l'); } return g.render(); }
function glass(): Sprite { const g = new Grid(14, 10); const r = new Rng(3); for (let k = 0; k < 8; k++) { const x = r.int(1, 12); const y = r.int(1, 8); g.line(x, y, x + r.int(-2, 2), y + r.int(-1, 1), 'i'); } return alphaize(g.render(), 220); }
function stain(col: string, seed: number): Sprite { const g = new Grid(18, 14); const r = new Rng(seed); for (let k = 0; k < 6; k++) g.ellipse(r.int(3, 14), r.int(3, 10), r.int(2, 5), r.int(2, 3), col); return alphaize(g.render(), 150); }
function puddle(): Sprite { const g = new Grid(20, 14); g.ellipse(10, 8, 8, 4, 'C'); g.ellipse(8, 7, 5, 2, 'c'); g.set(7, 6, 'v'); return alphaize(g.render(), 170); }
function crack(): Sprite { const g = new Grid(18, 14); const r = new Rng(4); let x = 1; let y = 7; for (let k = 0; k < 8; k++) { const nx = x + 2; const ny = y + r.int(-1, 1); g.line(x, y, nx, ny, 'x'); x = nx; y = ny; } return alphaize(g.render(), 200); }
function bootPrints(): Sprite { const g = new Grid(16, 16); g.ellipse(5, 5, 2, 3, 'x'); g.ellipse(11, 10, 2, 3, 'x'); return alphaize(g.render(), 140); }

// ---- object-plane clutter ------------------------------------------------
function boxStack(): Sprite { const g = new Grid(22, 26); g.shadow(11, 24, 9, 2); g.box(3, 12, 16, 12, 'n', 'k', 'K'); g.box(6, 2, 12, 11, 'n', 'k', 'K'); g.line(6, 2, 17, 12, 'n'); g.outline('X'); return g.render(); }
function boxToppled(): Sprite { const g = new Grid(24, 18); g.shadow(12, 16, 10, 2); g.box(2, 6, 14, 10, 'n', 'k', 'K'); g.rect(4, 8, 10, 6, 'K'); g.outline('X'); return g.render(); }
function sack(): Sprite { const g = new Grid(16, 20); g.shadow(8, 18, 6, 2); g.ellipse(8, 12, 6, 7, 'j'); g.box(5, 3, 6, 4, 'j', 'J', 'J'); g.outline('X'); return g.render(); }
function bucket(): Sprite { const g = new Grid(16, 18); g.shadow(8, 16, 6, 2); g.box(3, 5, 10, 11, 'l', 'a', 'A'); g.ellipse(8, 5, 5, 2, 'l'); g.line(3, 5, 13, 2, 'A'); g.outline('X'); return g.render(); }
function toolbox(): Sprite { const g = new Grid(22, 14); g.shadow(11, 12, 9, 2); g.box(2, 5, 18, 8, 'e', 'E', 'x'); g.rect(8, 2, 6, 3, 'A'); g.set(11, 3, 'a'); g.outline('X'); return g.render(); }
function tarp(): Sprite { const g = new Grid(26, 16); g.shadow(13, 14, 11, 2); for (let x = 0; x < 22; x += 2) { const h = 6 + Math.round(Math.sin(x) * 2); g.vline(2 + x, 14 - h, h, x % 4 ? 'u' : 'm'); } g.outline('X'); return g.render(); }
function pallet(): Sprite { const g = new Grid(24, 12); g.shadow(12, 10, 10, 2); for (let x = 1; x < 23; x += 4) g.rect(x, 2, 2, 8, 'k'); g.rect(1, 2, 22, 2, 'n'); g.rect(1, 8, 22, 2, 'n'); g.outline('X'); return g.render(); }

// ---- habitation ----------------------------------------------------------
function bedroll(): Sprite { const g = new Grid(28, 14); g.shadow(14, 12, 12, 2); g.box(2, 5, 24, 7, 'u', 'U', 'U'); g.box(2, 5, 8, 7, 'm', 'u', 'U'); g.outline('X'); return g.render(); }
function dishes(): Sprite { const g = new Grid(16, 12); g.shadow(8, 10, 6, 2); g.ellipse(8, 7, 6, 3, 'w'); g.ellipse(8, 6, 5, 2, 'W'); g.ellipse(8, 5, 4, 2, 'w'); g.outline('X'); return g.render(); }
function lantern(): Sprite { const g = new Grid(14, 20); g.shadow(7, 18, 4, 2); g.box(3, 5, 8, 11, 'A', 'a', 'A'); g.box(5, 7, 4, 7, 'z', 'z', 'E'); g.rect(6, 1, 2, 4, 'A'); const s = g.render(); for (let y = 4; y < 16; y++) for (let x = 1; x < 13; x++) { const d = Math.hypot(x - 7, y - 10); if (d > 9) continue; const a = (1 - d / 9) ** 2; const c = s.get(x, y); s.set(x, y, [Math.min(255, c[0] + 110 * a), Math.min(255, c[1] + 70 * a), Math.min(255, c[2] + 20 * a), Math.max(c[3] ?? 0, Math.round(50 * a))]); } return s; }
function candle(): Sprite { const g = new Grid(10, 16); g.shadow(5, 14, 3, 1); g.box(3, 6, 4, 8, 'W', 'w', 'A'); g.ellipse(5, 3, 1, 2, 'Z'); g.set(5, 2, 'z'); return g.render(); }
function blueprints(): Sprite { const g = new Grid(16, 12); g.shadow(8, 10, 6, 2); g.box(2, 3, 12, 7, 'm', 'u', 'U'); g.hline(3, 5, 10, 'i'); g.hline(3, 7, 7, 'i'); g.outline('X'); return g.render(); }

// ---- wall occluders (walk-behind, over player) ---------------------------
function hangingCable(): Sprite { const g = new Grid(32, 18); const r = new Rng(5); for (let b = 0; b < 3; b++) { let x = r.int(0, 8) + b * 10; for (let y = 0; y < 16; y++) { g.set(x, y, 'x'); if (y % 4 === 0) x += r.int(-1, 1); } } return g.render(); }
function pipeCross(): Sprite { const g = new Grid(32, 12); g.rect(0, 3, 32, 5, 'a'); g.hline(0, 3, 32, 'l'); g.hline(0, 7, 32, 'A'); for (let x = 4; x < 32; x += 10) g.vline(x, 2, 8, 'A'); return g.render(); }
function ceilingBeam(): Sprite { const g = new Grid(32, 12); g.box(0, 2, 32, 7, 'n', 'k', 'K'); for (let x = 3; x < 32; x += 8) g.set(x, 5, 'K'); return g.render(); }
function banner(): Sprite { const g = new Grid(18, 26); g.rect(2, 0, 14, 2, 'k'); for (let y = 2; y < 24; y++) { const w = 12 - Math.round(Math.sin(y / 4) * 1); g.hline(2 + (12 - w) / 2 + 1, y, w, y < 20 ? 'e' : 'E'); } g.outline('X'); return g.render(); }
function vineDrape(): Sprite { const g = new Grid(26, 24); const r = new Rng(6); for (let b = 0; b < 5; b++) { let x = b * 5 + 1; for (let y = 0; y < 22; y++) { g.set(x, y, r.chance(60) ? 'g' : 'f'); if (y % 3 === 0) x += r.int(-1, 1); if (r.chance(20)) g.set(x + 1, y, 'F'); } } return g.render(); }
function laundry(): Sprite { const g = new Grid(34, 20); g.hline(0, 1, 34, 'W'); for (const [x, col] of [[4, 'b'], [12, 'u'], [20, 'j'], [27, 'w']] as Array<[number, string]>) g.box(x, 2, 6, 12, col, col, col); g.outline('X'); return g.render(); }

// ---- FX (translucent) ----------------------------------------------------
function motes(col: string, seed: number, a: number): Sprite { const g = new Grid(28, 28); const r = new Rng(seed); for (let k = 0; k < 16; k++) g.set(r.int(0, 27), r.int(0, 27), col); return alphaize(g.render(), a); }
function wisp(col: string, seed: number): Sprite { const g = new Grid(28, 28); const r = new Rng(seed); for (let k = 0; k < 8; k++) g.ellipse(r.int(6, 22), r.int(6, 22), r.int(3, 6), r.int(2, 4), col); return alphaize(g.render(), 90); }
function lampGlow(): Sprite { const s = new Sprite(40, 40); for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) { const d = Math.hypot(x - 20, y - 20); if (d > 20) continue; const a = (1 - d / 20) ** 2; s.set(x, y, [255, 200, 110, Math.round(120 * a)]); } return s; }
function godRay(): Sprite { const s = new Sprite(36, 40); for (let y = 0; y < 40; y++) for (let x = 0; x < 36; x++) { const band = x - y * 0.4; if (band > 6 && band < 16) s.set(x, y, [255, 250, 220, 40]); } return s; }

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [];
const add = (rel: string, s: Sprite): void => { items.push([rel, s]); save(s, rel); };
add('floor/clutter.trash.paper_scatter', paper());
add('floor/clutter.trash.crushed_cans', cans());
add('floor/clutter.trash.bottles', bottles());
add('floor/clutter.trash.bolts', bolts());
add('floor/clutter.trash.glass_shards', glass());
add('floor/clutter.stain.water_stain', stain('C', 11));
add('floor/clutter.stain.oil_slick', stain('x', 12));
add('floor/clutter.stain.scorch', stain('X', 13));
add('floor/clutter.stain.mold', stain('G', 14));
add('floor/clutter.wear.puddle', puddle());
add('floor/clutter.wear.floor_crack', crack());
add('floor/clutter.wear.boot_prints', bootPrints());
add('object/clutter.obj.box_stack', boxStack());
add('object/clutter.obj.box_toppled', boxToppled());
add('object/clutter.obj.sack', sack());
add('object/clutter.obj.bucket', bucket());
add('object/clutter.obj.toolbox', toolbox());
add('object/clutter.obj.tarp', tarp());
add('object/clutter.obj.pallet', pallet());
add('object/clutter.home.bedroll', bedroll());
add('object/clutter.home.dishes', dishes());
add('object/clutter.home.lantern', lantern());
add('object/clutter.home.candle', candle());
add('object/clutter.home.blueprints', blueprints());
add('occluder/clutter.occ.hanging_cable', hangingCable());
add('occluder/clutter.occ.pipe_cross', pipeCross());
add('occluder/clutter.occ.ceiling_beam', ceilingBeam());
add('occluder/clutter.occ.banner_cloth', banner());
add('occluder/clutter.occ.vine_drape', vineDrape());
add('occluder/clutter.occ.laundry_line', laundry());
add('fx/clutter.fx.dust_motes', motes('w', 21, 90));
add('fx/clutter.fx.embers', motes('Z', 22, 160));
add('fx/clutter.fx.steam_puff', wisp('w', 23));
add('fx/clutter.fx.fog_wisp', wisp('W', 24));
add('fx/clutter.fx.lamp_glow', lampGlow());
add('fx/clutter.fx.god_ray', godRay());

// ---- contact sheet (over mid grey so floor/fx read) ----------------------
const cell = 64;
const COLS = 9;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [70, 72, 76, 255]);
items.forEach(([, s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 4;
  const sc = Math.min(2, Math.max(1, Math.floor((cell - 6) / Math.max(s.w, s.h))));
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
console.log(`universal clutter: ${items.length} dressing pieces → assets/tiles/clutter/`);
