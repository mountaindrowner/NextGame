/**
 * Shared PixelLab tiling + building helpers for the map generators.
 *
 * - loadWang(dir): read a create-tileset Wang set (assets/tiles-pixellab/<dir>/)
 *   into a corner-mask → PNG map (NW<<3 | NE<<2 | SW<<1 | SE, 1 = upper terrain).
 * - layWang(...): lay a set on a DUAL GRID — each rendered tile sits at the
 *   intersection of four data cells (offset by half a tile), so a feature blends
 *   seamlessly into the base. `skip` drops the all-background tile so overlays
 *   only paint where their feature actually appears.
 * - loadBuilding(name, h): load a PixelLab building/prop sprite, trim to content,
 *   and box-filter down to a target height (or null if the PNG is absent).
 */
import { PNG } from 'pngjs';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Sprite } from './spritekit';

const ROOT = new URL('..', import.meta.url).pathname;
const TILES = join(ROOT, 'assets/tiles-pixellab');
const REF = join(ROOT, 'assets/reference');

export function loadWang(dir: string): Map<number, PNG> {
  const meta = JSON.parse(readFileSync(join(TILES, dir, 'tileset.json'), 'utf8')) as {
    tiles: Array<{ id?: string; name?: string; corners: Record<'NW' | 'NE' | 'SW' | 'SE', string> }>;
  };
  const byMask = new Map<number, PNG>();
  meta.tiles.forEach((t, i) => {
    const fname = `tile_${String(i).padStart(2, '0')}_${t.id ?? t.name ?? i}`.replace(/[^\w]+/g, '_') + '.png';
    const png = PNG.sync.read(readFileSync(join(TILES, dir, fname)));
    const cr = t.corners;
    const bit = (k: 'NW' | 'NE' | 'SW' | 'SE'): number => (cr[k] === 'upper' ? 1 : 0);
    byMask.set((bit('NW') << 3) | (bit('NE') << 2) | (bit('SW') << 1) | bit('SE'), png);
  });
  return byMask;
}

/** Alpha-blend a tile onto `big` at pixel (x0,y0), clipped to its bounds. */
export function blitTile(big: Sprite, png: PNG, x0: number, y0: number): void {
  for (let y = 0; y < png.height; y++) {
    const py = y0 + y; if (py < 0 || py >= big.h) continue;
    for (let x = 0; x < png.width; x++) {
      const px = x0 + x; if (px < 0 || px >= big.w) continue;
      const si = (y * png.width + x) * 4; const a = png.data[si + 3]! / 255; if (a === 0) continue;
      const d = big.get(px, py);
      big.set(px, py, [Math.round(png.data[si]! * a + d[0] * (1 - a)), Math.round(png.data[si + 1]! * a + d[1] * (1 - a)), Math.round(png.data[si + 2]! * a + d[2] * (1 - a)), 255]);
    }
  }
}

/** Dual-grid lay; tile (i,j) samples corners (i-1,j-1)=NW … (i,j)=SE. `skip`
 *  drops tiles whose mask equals it (e.g. 15 = all-base, for an overlay layer). */
export function layWang(big: Sprite, T: number, cols: number, rows: number, wang: Map<number, PNG>, up: (c: number, r: number) => boolean, skip = -1): void {
  for (let j = 0; j <= rows; j++)
    for (let i = 0; i <= cols; i++) {
      const mask = ((up(i - 1, j - 1) ? 1 : 0) << 3) | ((up(i, j - 1) ? 1 : 0) << 2) | ((up(i - 1, j) ? 1 : 0) << 1) | (up(i, j) ? 1 : 0);
      if (mask === skip) continue;
      const png = wang.get(mask);
      if (png) blitTile(big, png, i * T - T / 2, j * T - T / 2);
    }
}

/** Load a PixelLab building/prop sprite (assets/reference/<name>.png), trim to
 *  content, box-filter to a target height. Returns null if the PNG is absent. */
export function loadBuilding(name: string, targetH: number): Sprite | null {
  const path = join(REF, `${name}.png`);
  if (!existsSync(path)) return null;
  const png = PNG.sync.read(readFileSync(path));
  let x0 = png.width, y0 = png.height, x1 = -1, y1 = -1;
  for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++)
    if (png.data[(y * png.width + x) * 4 + 3]! >= 16) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  if (x1 < 0) return null;
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1, scale = targetH / bh;
  const ow = Math.max(1, Math.round(bw * scale)), oh = Math.max(1, Math.round(bh * scale));
  const s = new Sprite(ow, oh);
  for (let ty = 0; ty < oh; ty++) for (let tx = 0; tx < ow; tx++) {
    const sx0 = x0 + Math.floor(tx / scale), sx1 = x0 + Math.max(Math.floor((tx + 1) / scale), Math.floor(tx / scale) + 1);
    const sy0 = y0 + Math.floor(ty / scale), sy1 = y0 + Math.max(Math.floor((ty + 1) / scale), Math.floor(ty / scale) + 1);
    let pr = 0, pg = 0, pb = 0, pa = 0, n = 0;
    for (let sy = sy0; sy < sy1 && sy <= y1; sy++) for (let sx = sx0; sx < sx1 && sx <= x1; sx++) {
      const i = (sy * png.width + sx) * 4, al = png.data[i + 3]! / 255;
      pr += png.data[i]! * al; pg += png.data[i + 1]! * al; pb += png.data[i + 2]! * al; pa += png.data[i + 3]!; n++;
    }
    if (!n) continue;
    const avgA = pa / n;
    if (avgA > 0) { const k = 255 / (avgA * n); s.set(tx, ty, [Math.min(255, Math.round(pr * k)), Math.min(255, Math.round(pg * k)), Math.min(255, Math.round(pb * k)), Math.round(avgA)]); }
  }
  return s;
}
