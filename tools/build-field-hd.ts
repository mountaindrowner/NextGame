/**
 * Builds the playable HD Field from the creator's example map
 * (npm run gen:field). Area-downscales the painted town to a 32px grid and
 * derives a collision + grass-encounter mask straight from the art: water and
 * dark structures (buildings, tree canopy) block; grass and dirt roads pass;
 * saturated grass also rolls encounters. Outputs public/field/.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/field');
mkdirSync(OUT, { recursive: true });

const TILE = 32;
const COLS = 30;
const ROWS = 22;
const W = COLS * TILE; // 960
const H = ROWS * TILE; // 704

const src = PNG.sync.read(readFileSync(join(ROOT, 'assets/reference/cattle-town/example-map.png')));

// area-average downscale src -> WxH
const out = new PNG({ width: W, height: H });
const sx = src.width / W;
const sy = src.height / H;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let r = 0;
    let g = 0;
    let b = 0;
    let n = 0;
    const x0 = Math.floor(x * sx);
    const x1 = Math.max(x0 + 1, Math.floor((x + 1) * sx));
    const y0 = Math.floor(y * sy);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * sy));
    for (let yy = y0; yy < y1; yy++)
      for (let xx = x0; xx < x1; xx++) {
        const i = (yy * src.width + xx) * 4;
        r += src.data[i] ?? 0;
        g += src.data[i + 1] ?? 0;
        b += src.data[i + 2] ?? 0;
        n++;
      }
    const o = (y * W + x) * 4;
    out.data[o] = Math.round(r / n);
    out.data[o + 1] = Math.round(g / n);
    out.data[o + 2] = Math.round(b / n);
    out.data[o + 3] = 255;
  }
}
writeFileSync(join(OUT, 'the-field.png'), PNG.sync.write(out));

// classify each 32px cell from its average colour
const collision: number[] = [];
const grass: number[] = [];
for (let cy = 0; cy < ROWS; cy++) {
  for (let cx = 0; cx < COLS; cx++) {
    let r = 0;
    let g = 0;
    let b = 0;
    for (let y = 0; y < TILE; y++)
      for (let x = 0; x < TILE; x++) {
        const i = ((cy * TILE + y) * W + (cx * TILE + x)) * 4;
        r += out.data[i] ?? 0;
        g += out.data[i + 1] ?? 0;
        b += out.data[i + 2] ?? 0;
      }
    const n = TILE * TILE;
    r /= n;
    g /= n;
    b /= n;
    const luma = 0.3 * r + 0.59 * g + 0.11 * b;
    const isWater = b > r + 6 && b > g + 2 && b > 70;
    const isDark = luma < 96; // buildings, tree canopy, deep shade
    const isRoof = r > g + 18 && r > 90 && g < 120; // reddish/brown roofs & wood
    const solid = isWater || isDark || isRoof;
    const isGrass = !solid && g > r + 10 && g > b + 18 && luma < 180;
    collision.push(solid ? 1 : 0);
    grass.push(isGrass ? 1 : 0);
  }
}

writeFileSync(
  join(OUT, 'the-field.json'),
  JSON.stringify({ tile: TILE, cols: COLS, rows: ROWS, width: W, height: H, collision, grass }),
);

const solidCount = collision.filter((c) => c).length;
const grassCount = grass.filter((c) => c).length;
console.log(`built the-field.png ${W}x${H} (${COLS}x${ROWS} tiles)`);
console.log(`collision: ${solidCount}/${COLS * ROWS} solid · grass: ${grassCount} encounter cells`);
