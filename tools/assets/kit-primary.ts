/**
 * Primary Kit — ground/grass/water art (npm run assets:primary).
 *
 * First art batch in the locked production order (the foundation that unblocks
 * every outdoor map). Grid method, shared limited palette, depth+density laws:
 * each material reads as what it is (hi/base/shadow + decals), ≥3 seeded
 * variants per ground/grass type, top-left light. Emits 32px tile PNGs to
 * assets/tiles/primary/<category>/ plus a contact sheet for review. Records
 * live in tools/assets/catalog.ts.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const T = 32;
const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/primary');

const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};

// ---- ground materials ----------------------------------------------------
function dirt(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'k'); // packed tan base
  for (let k = 0; k < 6; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 4), r.int(1, 2), 'n'); // lit humps
  for (let k = 0; k < 4; k++) g.hline(r.int(1, T - 8), r.int(3, T - 3), r.int(4, 8), 'K'); // ruts (shadow)
  for (let k = 0; k < 14; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(55) ? 'K' : 'n'); // pebbles
  return g.render();
}
function earth(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'M');
  for (let k = 0; k < 7; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 3), r.int(1, 2), 'T');
  for (let k = 0; k < 16; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(55) ? 'Q' : 'T');
  return g.render();
}
function gravel(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A'); // dark base = shadow gaps
  for (let k = 0; k < 40; k++) {
    const x = r.int(1, T - 2);
    const y = r.int(1, T - 2);
    g.set(x, y, r.chance(50) ? 'a' : 'l');
    if (r.chance(40)) g.set(x, y + 1, 'A');
  }
  return g.render();
}
function concrete(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'w'); // pale slab
  for (let k = 0; k < 10; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'W'); // stains
  g.hline(0, 0, T, 'W'); // expansion seam (top/left)
  g.vline(0, 0, T, 'W');
  for (let k = 0; k < 2; k++) {
    const x0 = r.int(4, T - 4);
    const y0 = r.int(4, T - 4);
    g.line(x0, y0, x0 + r.int(-7, 7), y0 + r.int(-7, 7), 'W'); // cracks
  }
  return g.render();
}
function cobble(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A'); // mortar
  let row = 0;
  for (let y = -1; y < T; y += 6, row++) {
    const off = row % 2 ? -3 : 0;
    for (let x = off; x < T; x += 7) {
      g.ellipse(x + 3, y + 3, 3, 2, 'a'); // stone
      g.hline(x + 1, y + 1, 4, 'l'); // lit top
      g.set(x + 3, y + 4, 'A');
    }
  }
  void r;
  return g.render();
}

// ---- grass ---------------------------------------------------------------
function grassShort(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'g'); // deep green underlayer
  for (let k = 0; k < 20; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'G'); // shadow mottle
  for (let k = 0; k < 26; k++) {
    const x = r.int(0, T - 1);
    const y = r.int(2, T - 1);
    g.set(x, y, 'f'); // blade
    g.set(x, y - 1, r.chance(45) ? 'F' : 'f'); // lit tip
  }
  return g.render();
}
function grassTall(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'G'); // darker, denser cover (encounter)
  for (let k = 0; k < 22; k++) {
    const x = r.int(0, T - 1);
    const h = r.int(5, 11);
    const base = T - r.int(0, 3);
    for (let y = base; y > base - h; y--) g.set(x, y, 'g');
    g.set(x, base - h, 'f');
    g.set(x, base - h - 1, r.chance(50) ? 'F' : 'f'); // lit tip
  }
  return g.render();
}
function grassDead(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'J'); // dry olive base
  for (let k = 0; k < 24; k++) {
    const x = r.int(0, T - 1);
    const y = r.int(2, T - 1);
    g.set(x, y, 'j');
    g.set(x, y - 1, r.chance(50) ? 'h' : 'j'); // bleached tip
  }
  for (let k = 0; k < 8; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'n'); // tan thatch
  return g.render();
}

// ---- water ---------------------------------------------------------------
function water(seed: number, frame: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'C'); // deep base
  for (let k = 0; k < 6; k++) {
    const y = (r.int(0, T - 1) + frame * 2) % T;
    g.hline(r.int(0, T - 6), y, r.int(3, 6), 'c'); // mid ripples drift down
  }
  for (let k = 0; k < 4; k++) {
    const y = (r.int(0, T - 1) + frame * 2) % T;
    g.hline(r.int(0, T - 4), y, r.int(2, 3), 'v'); // bright glints
  }
  return g.render();
}

// ---- emit ----------------------------------------------------------------
interface Mat {
  id: string;
  cat: string;
  draw: (seed: number) => Sprite;
  variants: number;
}
const MATS: Mat[] = [
  { id: 'dirt', cat: 'ground', draw: dirt, variants: 4 },
  { id: 'earth', cat: 'ground', draw: earth, variants: 4 },
  { id: 'gravel', cat: 'ground', draw: gravel, variants: 4 },
  { id: 'concrete', cat: 'ground', draw: concrete, variants: 4 },
  { id: 'cobble', cat: 'ground', draw: cobble, variants: 3 },
  { id: 'grass_short', cat: 'grass', draw: grassShort, variants: 4 },
  { id: 'grass_tall', cat: 'grass', draw: grassTall, variants: 4 },
  { id: 'grass_dead', cat: 'grass', draw: grassDead, variants: 4 },
];

const rows: Sprite[][] = [];
for (const m of MATS) {
  const row: Sprite[] = [];
  for (let v = 0; v < m.variants; v++) {
    const s = m.draw((m.id.length * 31 + v * 7 + 1) >>> 0);
    save(s, `${m.cat}/primary.${m.cat}.${m.id}__v${v}`);
    row.push(s);
  }
  rows.push(row);
}
// water (still + 4 flow frames)
{
  const still = water(5, 0);
  save(still, 'water/primary.water.still__v0');
  const flow: Sprite[] = [];
  for (let f = 0; f < 4; f++) {
    const s = water(9, f);
    save(s, `water/primary.water.flowing__f${f}`);
    flow.push(s);
  }
  rows.push([still, ...flow]);
}

// ---- contact sheet (x3, padded grid) -------------------------------------
const SC = 3;
const pad = 4;
const cols = Math.max(...rows.map((r) => r.length));
const cw = T * SC + pad;
const sheetW = cols * cw + pad;
const sheetH = rows.length * cw + pad;
const sheet = new Sprite(sheetW, sheetH);
sheet.rect(0, 0, sheetW, sheetH, [24, 22, 28, 255]);
rows.forEach((row, ri) => {
  row.forEach((s, ci) => {
    const ox = pad + ci * cw;
    const oy = pad + ri * cw;
    for (let y = 0; y < T; y++)
      for (let x = 0; x < T; x++) {
        const c = s.get(x, y);
        if ((c[3] ?? 0) === 0) continue;
        for (let dy = 0; dy < SC; dy++) for (let dx = 0; dx < SC; dx++) sheet.set(ox + x * SC + dx, oy + y * SC + dy, c);
      }
  });
});
{
  const png = new PNG({ width: sheetW, height: sheetH });
  png.data.set(sheet.data);
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, '_contact.png'), PNG.sync.write(png));
}

const tiles = MATS.reduce((n, m) => n + m.variants, 0) + 5;
console.log(`primary kit art: ${tiles} tiles across ${rows.length} materials → assets/tiles/primary/`);
