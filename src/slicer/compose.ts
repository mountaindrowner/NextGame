/**
 * Pure sprite-sheet slicing/compositing used by the Sprite Slicer tool (and
 * mirrors tools/import-sal.ts so an exported config can be baked into the game
 * pipeline 1:1). No DOM — operates on raw RGBA buffers.
 */
export type Dir = 's' | 'n' | 'w';

export interface DirMap { row: number; cols: number[]; flip: boolean }
export interface SliceConfig {
  cols: number; rows: number;
  cellW: number; cellH: number;
  offX: number; offY: number;
  spX: number; spY: number;
  fw: number; fh: number;
  padTop: number;
  trim: boolean;
  native: boolean; // keep frames at native res (scale 1; the game renders down)
  order: Dir[];
  map: Record<Dir, DirMap>;
}

export interface RGBA { w: number; h: number; data: Uint8ClampedArray }

const px = (img: RGBA, x: number, y: number): [number, number, number, number] => {
  if (x < 0 || y < 0 || x >= img.w || y >= img.h) return [0, 0, 0, 0];
  const i = (y * img.w + x) * 4;
  return [img.data[i]!, img.data[i + 1]!, img.data[i + 2]!, img.data[i + 3]!];
};
const isBg = (p: [number, number, number, number]): boolean => p[3] < 16;

function cellOrigin(c: SliceConfig, col: number, row: number): [number, number] {
  return [c.offX + col * (c.cellW + c.spX), c.offY + row * (c.cellH + c.spY)];
}

interface Box { x0: number; y0: number; w: number; h: number }
function bbox(src: RGBA, ox: number, oy: number, c: SliceConfig): Box {
  if (!c.trim) return { x0: ox, y0: oy, w: c.cellW, h: c.cellH };
  let x0 = c.cellW, y0 = c.cellH, x1 = -1, y1 = -1;
  for (let y = 0; y < c.cellH; y++)
    for (let x = 0; x < c.cellW; x++)
      if (!isBg(px(src, ox + x, oy + y))) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  if (x1 < 0) return { x0: ox, y0: oy, w: c.cellW, h: c.cellH };
  return { x0: ox + x0, y0: oy + y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

function blank(w: number, h: number): RGBA { return { w, h, data: new Uint8ClampedArray(w * h * 4) }; }
function set(img: RGBA, x: number, y: number, p: [number, number, number, number]): void {
  if (x < 0 || y < 0 || x >= img.w || y >= img.h) return;
  const i = (y * img.w + x) * 4;
  img.data[i] = p[0]; img.data[i + 1] = p[1]; img.data[i + 2] = p[2]; img.data[i + 3] = p[3];
}

/** Scale a source box into an fw×fh frame, bottom-aligned + h-centred (+flip). */
function renderFrame(src: RGBA, box: Box, c: SliceConfig, scale: number, flip: boolean): RGBA {
  const out = blank(c.fw, c.fh);
  const dw = Math.max(1, Math.round(box.w * scale));
  const dh = Math.max(1, Math.round(box.h * scale));
  const ox = Math.round((c.fw - dw) / 2);
  const oy = c.fh - dh;
  for (let ty = 0; ty < dh; ty++)
    for (let tx = 0; tx < dw; tx++) {
      const sx = box.x0 + Math.min(box.w - 1, Math.floor((tx / dw) * box.w));
      const sy = box.y0 + Math.min(box.h - 1, Math.floor((ty / dh) * box.h));
      const p = px(src, sx, sy);
      if (isBg(p)) continue;
      set(out, ox + (flip ? dw - 1 - tx : tx), oy + ty, p);
    }
  return out;
}

export interface Composed { sheet: RGBA; framesByDir: Record<Dir, RGBA[]>; maxCols: number; scale: number; contentW: number; contentH: number }

export function compose(src: RGBA, c: SliceConfig): Composed {
  // gather boxes for every used frame, then a single global scale
  const boxes: Array<{ dir: Dir; ci: number; box: Box; flip: boolean }> = [];
  for (const dir of c.order) {
    const m = c.map[dir];
    m.cols.forEach((col, ci) => {
      const [ox, oy] = cellOrigin(c, col, m.row);
      boxes.push({ dir, ci, box: bbox(src, ox, oy, c), flip: m.flip });
    });
  }
  const maxH = Math.max(1, ...boxes.map((b) => b.box.h));
  const maxW = Math.max(1, ...boxes.map((b) => b.box.w));
  const scale = c.native ? 1 : Math.min((c.fh - c.padTop) / maxH, c.fw / maxW);

  const framesByDir = { s: [], n: [], w: [] } as Record<Dir, RGBA[]>;
  const maxCols = Math.max(...c.order.map((d) => c.map[d].cols.length));
  const sheet = blank(c.fw * maxCols, c.fh * c.order.length);
  for (const b of boxes) {
    const frame = renderFrame(src, b.box, c, scale, b.flip);
    framesByDir[b.dir].push(frame);
    const rowIndex = c.order.indexOf(b.dir);
    blit(sheet, frame, b.ci * c.fw, rowIndex * c.fh);
  }
  return { sheet, framesByDir, maxCols, scale, contentW: maxW, contentH: maxH };
}

function blit(dst: RGBA, srcF: RGBA, dx: number, dy: number): void {
  for (let y = 0; y < srcF.h; y++)
    for (let x = 0; x < srcF.w; x++) {
      const i = (y * srcF.w + x) * 4;
      if (srcF.data[i + 3]! < 16) continue;
      set(dst, dx + x, dy + y, [srcF.data[i]!, srcF.data[i + 1]!, srcF.data[i + 2]!, srcF.data[i + 3]!]);
    }
}

export const DEFAULT_CONFIG: SliceConfig = {
  cols: 4, rows: 4, cellW: 192, cellH: 192, offX: 0, offY: 0, spX: 0, spY: 0,
  fw: 88, fh: 160, padTop: 1, trim: true, native: true,
  order: ['s', 'n', 'w'],
  map: { s: { row: 0, cols: [0, 1, 2, 3], flip: false }, n: { row: 2, cols: [0, 1, 2, 3], flip: false }, w: { row: 1, cols: [0, 1, 2, 3], flip: true } },
};
