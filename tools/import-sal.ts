/**
 * Wire a creator-supplied 4x4 character walk sheet into the game's overworld
 * sprite format. The source (assets/reference/sal_walk_source.png, 768x768,
 * 192px RGBA cells) is sliced, each frame trimmed to its art, scaled uniformly
 * (feet planted, no per-frame bob), and composed into public/world/char/
 * sal_walk.png as a 3-row S/N/W sheet of 20x32 frames (60x96) — exactly what
 * FieldHDScene already loads, so it drops in with no code change.
 *
 * All mapping is config below: if a direction faces the wrong way in game, flip
 * FLIP or swap which source row feeds s/n/w, and re-run `npx tsx tools/import-sal.ts`.
 */
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'assets/reference/sal_walk_source.png');
const OUT = join(ROOT, 'public/world/char/sal_walk.png');
const PREVIEW = join(ROOT, 'assets/reference/sal_walk_preview.png');

const CELL = 192; // source grid cell
const FW = 20, FH = 32; // target frame
const PAD_TOP = 1; // px of headroom in the cell

// source rows: 0=front(S), 1=side(left→W), 2=back(N), 3=back-angle (unused).
// columns 0..3 are the walk frames; we use 3 for the [0,1,0,2] cycle.
const MAP: Record<'s' | 'n' | 'w', { row: number; cols: [number, number, number]; flip: boolean }> = {
  s: { row: 0, cols: [0, 1, 2], flip: false },
  n: { row: 2, cols: [0, 1, 2], flip: false },
  w: { row: 1, cols: [0, 1, 2], flip: false }, // mirrored to E in-game
};
const OUT_ORDER: Array<'s' | 'n' | 'w'> = ['s', 'n', 'w']; // matches existing sal_walk layout

const src = PNG.sync.read(readFileSync(SRC));
const sa = (x: number, y: number): [number, number, number, number] => {
  if (x < 0 || y < 0 || x >= src.width || y >= src.height) return [0, 0, 0, 0];
  const i = (y * src.width + x) * 4;
  return [src.data[i]!, src.data[i + 1]!, src.data[i + 2]!, src.data[i + 3]!];
};
const isBg = (p: [number, number, number, number]): boolean => p[3] < 16;

interface Box { x0: number; y0: number; x1: number; y1: number; w: number; h: number }
function bbox(cx: number, cy: number): Box | null {
  let x0 = CELL, y0 = CELL, x1 = -1, y1 = -1;
  for (let y = 0; y < CELL; y++)
    for (let x = 0; x < CELL; x++)
      if (!isBg(sa(cx + x, cy + y))) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  if (x1 < 0) return null;
  return { x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

// gather every used frame's source cell + bbox, then a single global scale so
// the character is the same size across all frames/directions.
type Frame = { dir: 's' | 'n' | 'w'; ci: number; cx: number; cy: number; box: Box; flip: boolean };
const frames: Frame[] = [];
for (const dir of OUT_ORDER) {
  const m = MAP[dir];
  m.cols.forEach((col, ci) => {
    const cx = col * CELL;
    const cy = m.row * CELL;
    const box = bbox(cx, cy);
    if (box) frames.push({ dir, ci, cx, cy, box, flip: m.flip });
  });
}
const maxH = Math.max(...frames.map((f) => f.box.h));
const maxW = Math.max(...frames.map((f) => f.box.w));
const scale = Math.min((FH - PAD_TOP) / maxH, FW / maxW);

const out = new PNG({ width: FW * 3, height: FH * 3 });
out.data.fill(0);
const put = (img: PNG, x: number, y: number, p: [number, number, number, number]): void => {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const i = (y * img.width + x) * 4;
  img.data[i] = p[0]; img.data[i + 1] = p[1]; img.data[i + 2] = p[2]; img.data[i + 3] = p[3];
};

for (const f of frames) {
  const dw = Math.round(f.box.w * scale);
  const dh = Math.round(f.box.h * scale);
  const colIndex = f.ci; // 0..2 across
  const rowIndex = OUT_ORDER.indexOf(f.dir); // 0..2 down
  const ox = colIndex * FW + Math.round((FW - dw) / 2); // h-centre
  const oy = rowIndex * FH + (FH - dh); // bottom-align (feet planted)
  for (let ty = 0; ty < dh; ty++)
    for (let tx = 0; tx < dw; tx++) {
      const srcX = f.box.x0 + Math.min(f.box.w - 1, Math.floor((tx / dw) * f.box.w));
      const srcY = f.box.y0 + Math.min(f.box.h - 1, Math.floor((ty / dh) * f.box.h));
      const p = sa(f.cx + srcX, f.cy + srcY);
      if (isBg(p)) continue;
      const dx = f.flip ? dw - 1 - tx : tx;
      put(out, ox + dx, oy + ty, p);
    }
}
writeFileSync(OUT, PNG.sync.write(out));

// a 6x nearest-neighbour preview so the result can be eyeballed without booting
const Z = 6;
const prev = new PNG({ width: out.width * Z, height: out.height * Z });
prev.data.fill(0);
for (let y = 0; y < out.height; y++)
  for (let x = 0; x < out.width; x++) {
    const i = (y * out.width + x) * 4;
    const p: [number, number, number, number] = [out.data[i]!, out.data[i + 1]!, out.data[i + 2]!, out.data[i + 3]!];
    const bg = p[3] < 16;
    for (let zy = 0; zy < Z; zy++) for (let zx = 0; zx < Z; zx++) put(prev, x * Z + zx, y * Z + zy, bg ? [30, 26, 20, 255] : p);
  }
writeFileSync(PREVIEW, PNG.sync.write(prev));

console.log(`sal_walk: ${frames.length} frames, scale ${scale.toFixed(3)} → ${OUT} (${out.width}x${out.height})`);
console.log(`preview → ${PREVIEW}`);
