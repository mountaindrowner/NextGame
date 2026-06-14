/**
 * The Field — sec.field secondary art (npm run assets:field). The ruined
 * cattle-town props (Asset Bible Part 6 + Critical Path §1): grain silos, water
 * tower, barn, windmill, ruined farmhouse, the Co-op Vault (hero — the prologue
 * safe), a church facade, cattle fencing, troughs, hay, hitching posts, and the
 * elevator surface hatch (the Field spawn). Grid method, depth/density laws.
 * Emits assets/tiles/sec_field/ + a contact sheet. Reuses world-builders shapes.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { barn, house, watertower, windmill } from '../world-builders';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/sec_field');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};

export function silo(): Sprite {
  const g = new Grid(40, 112);
  g.shadow(20, 110, 16, 4);
  g.box(6, 24, 28, 86, 'l', 'a', 'A'); // corrugated cylinder
  for (let x = 8; x < 33; x += 3) g.vline(x, 24, 86, x % 2 ? 'A' : 'l'); // corrugation
  g.hline(6, 50, 28, 'A');
  g.hline(6, 78, 28, 'A'); // bands
  for (let i = 0; i <= 12; i++) g.hline(8 + i, 24 - Math.floor(i * 1.4), 24 - 2 * i, i < 4 ? 'w' : 'W'); // conical roof
  g.set(20, 2, 'A'); // cap
  g.outline('X');
  return g.render();
}
export function siloCluster(): Sprite {
  const g = new Grid(72, 112);
  g.shadow(36, 110, 30, 4);
  const one = (ox: number, h: number): void => {
    g.box(ox, 112 - h, 24, h - 2, 'l', 'a', 'A');
    for (let x = ox + 2; x < ox + 22; x += 3) g.vline(x, 112 - h, h - 2, x % 2 ? 'A' : 'l');
    for (let i = 0; i <= 10; i++) g.hline(ox + 2 + i, 112 - h - Math.floor(i * 1.2), 20 - 2 * i, i < 3 ? 'w' : 'W');
  };
  one(4, 96);
  one(44, 104);
  one(26, 88);
  g.outline('X');
  return g.render();
}
/** Co-op building with the broken-open Vault safe — the Breaker site (hero). */
export function coopVault(): Sprite {
  const g = new Grid(120, 96);
  g.shadow(60, 94, 52, 5);
  g.box(8, 30, 104, 64, 'W', 'w', 'A'); // concrete co-op building
  g.rect(4, 16, 112, 16, 'w'); // false front
  g.hline(4, 16, 112, 'l');
  g.hline(4, 30, 112, 'A');
  g.rect(20, 22, 60, 6, 'k'); // signboard
  for (let x = 24; x < 78; x += 6) g.rect(x, 23, 3, 4, 'n'); // (sign letters, abstract)
  g.box(14, 40, 26, 54, 'i', 'I', 'C'); // big window left
  g.line(27, 40, 27, 93, 'A');
  // the vault — a heavy steel safe set in the wall, door swung open
  g.box(64, 48, 40, 40, 'A', 'a', 'x');
  g.box(70, 54, 28, 28, 'x', 'X', 'X'); // dark interior
  g.ellipse(84, 68, 5, 5, 'z'); // a faint glow where the Breaker was
  g.box(46, 50, 18, 36, 'l', 'a', 'A'); // swung-open door
  g.ellipse(54, 68, 4, 4, 'A');
  g.ellipse(54, 68, 2, 2, 'l'); // dial
  g.outline('X');
  return g.render();
}
export function church(): Sprite {
  const g = new Grid(80, 120);
  g.shadow(40, 118, 30, 4);
  g.box(16, 50, 48, 64, 'n', 'k', 'K'); // nave
  for (let i = 0; i <= 24; i++) { const xL = 16 + i; const xR = 64 - i; if (xL > xR) break; g.hline(xL, 50 - Math.floor(i * 0.7), xR - xL + 1, i < 4 ? 'E' : 'e'); } // gable roof
  // steeple
  g.box(34, 14, 12, 38, 'w', 'W', 'A');
  for (let i = 0; i <= 8; i++) g.hline(34 + i, 14 - i, 12 - 2 * i, 'W'); // spire
  g.vline(40, 2, 6, 'k');
  g.hline(38, 4, 5, 'k'); // cross
  g.box(36, 24, 8, 10, 'i', 'I', 'C'); // belfry window
  g.rect(34, 84, 12, 30, 'O'); // door
  g.box(22, 60, 8, 12, 'i', 'I', 'C');
  g.box(50, 60, 8, 12, 'i', 'I', 'C'); // windows
  g.outline('X');
  return g.render();
}
export function trough(): Sprite {
  const g = new Grid(52, 22);
  g.shadow(26, 20, 22, 2);
  g.box(2, 6, 48, 12, 'n', 'k', 'K');
  g.box(5, 8, 42, 6, 'c', 'C', 'C'); // water
  g.hline(6, 9, 40, 'v');
  g.outline('X');
  return g.render();
}
export function hayBale(): Sprite {
  const g = new Grid(30, 26);
  g.shadow(15, 24, 12, 2);
  g.ellipse(15, 14, 13, 11, 'j');
  g.ellipse(15, 14, 13, 11, 'j');
  for (let a = 0; a < 6; a++) g.line(4, 8 + a * 3, 26, 8 + a * 3, 'J'); // banding
  g.ellipse(15, 14, 5, 11, 'h'); // lit core ring
  g.outline('X');
  return g.render();
}
export function hitchingPost(): Sprite {
  const g = new Grid(40, 28);
  g.shadow(20, 26, 16, 2);
  g.rect(4, 8, 4, 18, 'k');
  g.rect(32, 8, 4, 18, 'k'); // posts
  g.rect(4, 10, 32, 4, 'n'); // rail
  g.hline(4, 10, 32, 'k');
  g.outline('X');
  return g.render();
}
/** The elevator surface hatch — where you emerge into the Field (spawn). */
export function elevatorHatch(): Sprite {
  const g = new Grid(56, 44);
  g.shadow(28, 42, 24, 3);
  g.box(2, 6, 52, 34, 'l', 'a', 'A'); // raised frame
  g.box(8, 12, 40, 24, 'A', 'A', 'x'); // recessed doors
  g.vline(28, 12, 24, 'x');
  g.vline(27, 12, 24, 'A'); // door split
  for (const [x, y] of [[6, 10], [49, 10], [6, 37], [49, 37]] as Array<[number, number]>) { g.set(x, y, 'l'); g.set(x + 1, y + 1, 'A'); } // bolts
  g.box(46, 16, 6, 8, 'l', 'a', 'A'); // call panel
  g.set(48, 18, 'z');
  g.set(48, 20, 'z');
  g.rect(24, 3, 8, 2, 'z'); // up indicator
  g.outline('X');
  return g.render();
}
export function cattleFence(): Sprite {
  const g = new Grid(96, 36);
  g.shadow(48, 34, 44, 2);
  for (const x of [6, 48, 90]) g.box(x, 6, 5, 26, 'n', 'k', 'K'); // posts
  g.rect(6, 12, 84, 3, 'k');
  g.rect(6, 22, 84, 3, 'k'); // rails
  g.hline(6, 12, 84, 'n');
  g.hline(6, 22, 84, 'n');
  g.outline('X');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
const items: Array<[string, Sprite]> = [
  ['prop/sec.field.silo_tall', silo()],
  ['prop/sec.field.silo_cluster', siloCluster()],
  ['prop/sec.field.water_tower', watertower()],
  ['prop/sec.field.barn', barn()],
  ['prop/sec.field.farmhouse', house()],
  ['prop/sec.field.windmill', windmill()],
  ['prop/sec.field.coop_vault', coopVault()],
  ['prop/sec.field.church', church()],
  ['prop/sec.field.feed_trough', trough()],
  ['prop/sec.field.hay_bale', hayBale()],
  ['prop/sec.field.hitching_post', hitchingPost()],
  ['fence/sec.field.cattle', cattleFence()],
  ['obj/sec.field.elevator_hatch', elevatorHatch()],
];
for (const [rel, s] of items) save(s, rel);

// ---- contact sheet -------------------------------------------------------
const cell = 140;
const COLS = 5;
const rows = Math.ceil(items.length / COLS);
const sheet = new Sprite(COLS * cell, rows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [120, 110, 84, 255]); // sun-bleached prairie backdrop
items.forEach(([, s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 8;
  const sc = Math.min(2, Math.max(1, Math.floor((cell - 10) / Math.max(s.w, s.h))));
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
console.log(`sec.field: ${items.length} cattle-town props → assets/tiles/sec_field/`);
