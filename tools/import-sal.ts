/**
 * Wire a creator-supplied 4x4 character walk sheet into the game at NATIVE
 * resolution (no downscale — the game renders it down smoothly with a LINEAR
 * filter). Slices assets/reference/sal_walk_source.png (768x768, 192px RGBA
 * cells), trims each frame, and composes public/world/char/sal_walk.png as a
 * 4-column x 3-row (S/N/W) sheet, plus sal_walk.meta.json with the frame size,
 * origin, and content height the game uses to place + scale it.
 *
 * Config below: row->direction, which 4 columns are the walk, and per-row flip.
 * Side (W) is flipped so it faces LEFT; the game mirrors it to the right.
 */
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'assets/reference/sal_walk_source.png');
const OUT = join(ROOT, 'public/world/char/sal_walk.png');
const META = join(ROOT, 'public/world/char/sal_walk.meta.json');
const PREVIEW = join(ROOT, 'assets/reference/sal_walk_preview.png');

const CELL = 192;
const MARGIN_X = 6, MARGIN_TOP = 10, MARGIN_BOTTOM = 6; // transparent gutter (LINEAR-safe, no frame bleed)
const FPS = 8;

// source rows: 0=front(S), 1=side(faces right→flip to W-left), 2=back(N).
const MAP: Record<'s' | 'n' | 'w', { row: number; cols: number[]; flip: boolean }> = {
  s: { row: 0, cols: [0, 1, 2, 3], flip: false },
  n: { row: 2, cols: [0, 1, 2, 3], flip: false },
  w: { row: 1, cols: [0, 1, 2, 3], flip: true }, // mirrored so W faces left; E = mirror in-game
};
const ORDER: Array<'s' | 'n' | 'w'> = ['s', 'n', 'w'];

const src = PNG.sync.read(readFileSync(SRC));
const sa = (x: number, y: number): [number, number, number, number] => {
  if (x < 0 || y < 0 || x >= src.width || y >= src.height) return [0, 0, 0, 0];
  const i = (y * src.width + x) * 4;
  return [src.data[i]!, src.data[i + 1]!, src.data[i + 2]!, src.data[i + 3]!];
};
const isBg = (p: [number, number, number, number]): boolean => p[3] < 16;

interface Box { x0: number; y0: number; w: number; h: number }
function bbox(cx: number, cy: number): Box | null {
  let x0 = CELL, y0 = CELL, x1 = -1, y1 = -1;
  for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++)
    if (!isBg(sa(cx + x, cy + y))) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  return x1 < 0 ? null : { x0, y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

type Frame = { dir: 's' | 'n' | 'w'; ci: number; cx: number; cy: number; box: Box; flip: boolean };
const frames: Frame[] = [];
for (const dir of ORDER) {
  const m = MAP[dir];
  m.cols.forEach((col, ci) => {
    const box = bbox(col * CELL, m.row * CELL);
    if (box) frames.push({ dir, ci, cx: col * CELL, cy: m.row * CELL, box, flip: m.flip });
  });
}
const maxW = Math.max(...frames.map((f) => f.box.w));
const maxH = Math.max(...frames.map((f) => f.box.h));
const FW = maxW + MARGIN_X * 2;
const FH = maxH + MARGIN_TOP + MARGIN_BOTTOM;
const feetY = FH - MARGIN_BOTTOM;
const COLS = Math.max(...ORDER.map((d) => MAP[d].cols.length));

const out = new PNG({ width: FW * COLS, height: FH * ORDER.length });
out.data.fill(0);
const put = (img: PNG, x: number, y: number, p: [number, number, number, number]): void => {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const i = (y * img.width + x) * 4;
  img.data[i] = p[0]; img.data[i + 1] = p[1]; img.data[i + 2] = p[2]; img.data[i + 3] = p[3];
};

for (const f of frames) {
  const baseX = f.ci * FW + Math.round((FW - f.box.w) / 2); // h-centre
  const baseY = ORDER.indexOf(f.dir) * FH + (feetY - f.box.h); // feet planted
  for (let y = 0; y < f.box.h; y++)
    for (let x = 0; x < f.box.w; x++) {
      const p = sa(f.cx + f.box.x0 + x, f.cy + f.box.y0 + y);
      if (isBg(p)) continue;
      put(out, baseX + (f.flip ? f.box.w - 1 - x : x), baseY + y, p);
    }
}
writeFileSync(OUT, PNG.sync.write(out));

const meta = { frameW: FW, frameH: FH, cols: COLS, rows: ORDER.length, fps: FPS, originY: feetY / FH, contentH: maxH };
writeFileSync(META, JSON.stringify(meta));

// 2x preview for eyeballing
const Z = 2;
const prev = new PNG({ width: out.width * Z, height: out.height * Z });
prev.data.fill(0);
for (let y = 0; y < out.height; y++) for (let x = 0; x < out.width; x++) {
  const i = (y * out.width + x) * 4;
  const p: [number, number, number, number] = [out.data[i]!, out.data[i + 1]!, out.data[i + 2]!, out.data[i + 3]!];
  const bg = p[3] < 16;
  for (let zy = 0; zy < Z; zy++) for (let zx = 0; zx < Z; zx++) put(prev, x * Z + zx, y * Z + zy, bg ? [30, 26, 20, 255] : p);
}
writeFileSync(PREVIEW, PNG.sync.write(prev));

console.log(`sal_walk: ${frames.length} frames @ native res, frame ${FW}x${FH}, content ${maxW}x${maxH} → ${OUT} (${out.width}x${out.height})`);
console.log(`meta → ${META}: ${JSON.stringify(meta)}`);
