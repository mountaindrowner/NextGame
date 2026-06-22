/**
 * Wire creator-supplied 4x4 character walk sheets into the game at NATIVE
 * resolution (no downscale — the game renders them down smoothly with a LINEAR
 * filter). Each source (assets/reference/<name>_source.png, 768x768, 192px RGBA
 * cells) is sliced, each frame trimmed, and composed into
 * public/world/char/<name>.png as a 4-column x 3-row (S/N/W) sheet, plus
 * <name>.meta.json with the frame size / origin / content height the game uses.
 *
 * Layout is shared (front=S row0, side=W row1 flipped to face left, back=N
 * row2). Add a character by dropping <name>_source.png in and listing it below.
 */
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const REF = join(ROOT, 'assets/reference');
const OUTDIR = join(ROOT, 'public/world/char');

const CELL = 192;
const MARGIN_X = 6, MARGIN_TOP = 10, MARGIN_BOTTOM = 6; // transparent gutter (LINEAR-safe)
const FPS = 8;

// source rows: 0=front(S), 1=side(faces right→flip to W-left), 2=back(N).
const MAP: Record<'s' | 'n' | 'w', { row: number; cols: number[]; flip: boolean }> = {
  s: { row: 0, cols: [0, 1, 2, 3], flip: false },
  n: { row: 2, cols: [0, 1, 2, 3], flip: false },
  w: { row: 1, cols: [0, 1, 2, 3], flip: true },
};
const ORDER: Array<'s' | 'n' | 'w'> = ['s', 'n', 'w'];

const CHARS = ['sal', 'wren'] as const; // each needs assets/reference/<name>_source.png

type P = [number, number, number, number];
const isBg = (p: P): boolean => p[3] < 16;

function importChar(name: string): void {
  const src = PNG.sync.read(readFileSync(join(REF, `${name}_walk_source.png`)));
  const sa = (x: number, y: number): P => {
    if (x < 0 || y < 0 || x >= src.width || y >= src.height) return [0, 0, 0, 0];
    const i = (y * src.width + x) * 4;
    return [src.data[i]!, src.data[i + 1]!, src.data[i + 2]!, src.data[i + 3]!];
  };
  interface Box { x0: number; y0: number; w: number; h: number }
  const bbox = (cx: number, cy: number): Box | null => {
    let x0 = CELL, y0 = CELL, x1 = -1, y1 = -1;
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++)
      if (!isBg(sa(cx + x, cy + y))) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
    return x1 < 0 ? null : { x0, y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
  };

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
  const put = (img: PNG, x: number, y: number, p: P): void => {
    if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
    const i = (y * img.width + x) * 4;
    img.data[i] = p[0]; img.data[i + 1] = p[1]; img.data[i + 2] = p[2]; img.data[i + 3] = p[3];
  };
  for (const f of frames) {
    const baseX = f.ci * FW + Math.round((FW - f.box.w) / 2);
    const baseY = ORDER.indexOf(f.dir) * FH + (feetY - f.box.h);
    for (let y = 0; y < f.box.h; y++) for (let x = 0; x < f.box.w; x++) {
      const p = sa(f.cx + f.box.x0 + x, f.cy + f.box.y0 + y);
      if (isBg(p)) continue;
      put(out, baseX + (f.flip ? f.box.w - 1 - x : x), baseY + y, p);
    }
  }
  writeFileSync(join(OUTDIR, `${name}_walk.png`), PNG.sync.write(out));

  const meta = { frameW: FW, frameH: FH, cols: COLS, rows: ORDER.length, fps: FPS, originY: feetY / FH, contentH: maxH };
  writeFileSync(join(OUTDIR, `${name}_walk.meta.json`), JSON.stringify(meta));

  const Z = 2;
  const prev = new PNG({ width: out.width * Z, height: out.height * Z });
  prev.data.fill(0);
  for (let y = 0; y < out.height; y++) for (let x = 0; x < out.width; x++) {
    const i = (y * out.width + x) * 4;
    const p: P = [out.data[i]!, out.data[i + 1]!, out.data[i + 2]!, out.data[i + 3]!];
    for (let zy = 0; zy < Z; zy++) for (let zx = 0; zx < Z; zx++) put(prev, x * Z + zx, y * Z + zy, p[3] < 16 ? [30, 26, 20, 255] : p);
  }
  writeFileSync(join(REF, `${name}_walk_preview.png`), PNG.sync.write(prev));
  console.log(`${name}_walk: ${frames.length} frames @ native, frame ${FW}x${FH}, content ${maxW}x${maxH} (sheet ${out.width}x${out.height})`);
}

for (const c of CHARS) importChar(c);
