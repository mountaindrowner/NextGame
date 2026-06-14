/**
 * Hive / Static Corruption Overlay art (npm run assets:hive) — Asset Bible
 * Part 7. A cross-area overlay composited over saturated maps (R3) from Bastion
 * onward: flesh-and-metal growth, glowing veins, corrupted grass/water, the
 * Static screen-shimmer, and the relay-tower prop — in light→heavy tiers.
 * Overlay tiles are semi-transparent so they read over any base. Grid method,
 * sickly cyan/magenta palette + additive glow. Emits assets/tiles/overlay_hive/.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const T = 32;
const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/overlay_hive');
mkdirSync(OUT, { recursive: true });
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};
/** Drop the alpha of every colored pixel to `a` (overlay translucency). */
function alphaize(s: Sprite, a: number): Sprite {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if ((c[3] ?? 0) > 0) s.set(x, y, [c[0], c[1], c[2], a]);
    }
  return s;
}

const COV = { light: 0.16, med: 0.34, heavy: 0.6 } as const;
type Tier = keyof typeof COV;

/** Flesh-and-metal growth blotches creeping over the tile. */
function growth(tier: Tier, seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  const n = Math.round(COV[tier] * 30);
  for (let k = 0; k < n; k++) {
    const x = r.int(2, T - 3);
    const y = r.int(2, T - 3);
    g.ellipse(x, y, r.int(2, 4), r.int(2, 3), r.chance(60) ? '5' : '6'); // violet flesh
    g.set(x - 1, y - 1, '4'); // lit
    if (r.chance(40)) g.set(x, y, '7'); // teal node
  }
  return alphaize(g.render(), 200);
}
/** Branching glowing veins. */
function veins(tier: Tier, seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  const branches = Math.round(COV[tier] * 8) + 2;
  for (let b = 0; b < branches; b++) {
    let x = r.int(0, T - 1);
    let y = r.int(0, T - 1);
    const steps = r.int(6, 14);
    for (let s = 0; s < steps; s++) {
      const nx = x + r.int(-2, 2);
      const ny = y + r.int(-2, 2);
      g.line(x, y, nx, ny, r.chance(50) ? '7' : '1'); // teal/cyan glow
      if (r.chance(30)) g.set(nx, ny, '4'); // magenta node
      x = nx;
      y = ny;
    }
  }
  return alphaize(g.render(), 220);
}
function corruptGrass(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  for (let k = 0; k < 24; k++) {
    const x = r.int(0, T - 1);
    const y = r.int(2, T - 1);
    g.set(x, y, '8'); // sickly teal-green
    g.set(x, y - 1, r.chance(50) ? '7' : '5'); // cyan/violet tip
  }
  return alphaize(g.render(), 190);
}
function corruptWater(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  for (let k = 0; k < 7; k++) g.hline(r.int(0, T - 6), r.int(0, T - 1), r.int(3, 6), r.chance(50) ? '5' : '7'); // magenta/teal sheen
  return alphaize(g.render(), 150);
}
function staticShimmer(frame: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(100 + frame);
  for (let y = frame % 2; y < T; y += 2) g.hline(0, y, T, '1'); // scanlines
  for (let k = 0; k < 30; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? '*' : '7'); // noise
  return alphaize(g.render(), 70);
}
/** The hive relay-tower prop (additive glow baked into a dark sky). */
function relayTower(): Sprite {
  const g = new Grid(64, 160);
  g.shadow(32, 158, 18, 4);
  // fused steel mast + flesh sheath
  g.box(28, 30, 8, 128, 'a', 'A', 'x');
  for (let y = 40; y < 150; y += 8) { g.rect(24, y, 16, 2, 'A'); } // lattice rungs
  for (let k = 0; k < 40; k++) { const y = new Rng(k + 1).int(40, 150); g.ellipse(32 + new Rng(k * 3).int(-6, 6), y, 3, 4, k % 2 ? '5' : '6'); } // creeping flesh
  // glowing crown
  g.ellipse(32, 24, 12, 10, '6');
  g.ellipse(32, 22, 8, 7, '5');
  g.ellipse(32, 20, 4, 4, '1');
  g.set(32, 16, '1');
  g.line(32, 14, 32, 2, '7'); // antenna spike
  const s = g.render();
  // additive cyan glow at the crown
  for (let y = 0; y < 48; y++)
    for (let x = 0; x < 64; x++) {
      const d = Math.hypot(x - 32, y - 22);
      if (d > 26) continue;
      const a = (1 - d / 26) ** 2;
      const c = s.get(x, y);
      s.set(x, y, [Math.min(255, c[0] + 20 * a), Math.min(255, c[1] + 90 * a), Math.min(255, c[2] + 80 * a), Math.max(c[3] ?? 0, Math.round(70 * a))]);
    }
  return s;
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [];
for (const tier of ['light', 'med', 'heavy'] as const) {
  const gr = growth(tier, 10 + tier.length);
  const ve = veins(tier, 20 + tier.length);
  save(gr, `growth/overlay.hive.growth.${tier}`);
  save(ve, `veins/overlay.hive.veins.${tier}`);
  items.push([`growth.${tier}`, gr], [`veins.${tier}`, ve]);
}
const cg = corruptGrass(31);
const cw = corruptWater(32);
const ss = staticShimmer(0);
const rt = relayTower();
save(cg, 'corrupt/overlay.hive.corrupt_grass');
save(cw, 'corrupt/overlay.hive.corrupt_water');
for (let f = 0; f < 4; f++) save(staticShimmer(f), `fx/overlay.hive.static_shimmer__f${f}`);
save(rt, 'prop/overlay.hive.relay_tower');
items.push(['corrupt_grass', cg], ['corrupt_water', cw], ['static_shimmer', ss], ['relay_tower', rt]);

// ---- contact sheet (composited over a mid grey so translucency reads) ----
const cell = 132;
const COLS = 5;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [60, 64, 60, 255]); // grey backdrop
items.forEach(([, s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 6;
  const sc = Math.min(2, Math.max(1, Math.floor((cell - 8) / Math.max(s.w, s.h))));
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
console.log(`hive overlay: ${items.length} overlays → assets/tiles/overlay_hive/`);
