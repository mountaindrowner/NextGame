/**
 * Atlas extraction tool (npm run extract -- <file>).
 *
 * The creator's cattle-town sheets have no alpha — objects sit on a baked
 * near-white "transparency checkerboard" (~241–254, low saturation). This
 * tool:
 *   1. classifies that light/low-sat background,
 *   2. connected-component labels the foreground (8-connectivity) into
 *      discrete objects,
 *   3. crops each, and border-flood-fills the background to transparent so
 *      interior whites (signs, highlights) survive,
 *   4. writes individual PNGs + an index.json (bounding boxes).
 *
 * Works for the object atlas (separated items). Seamless terrain grids that
 * touch get merged — use --grid <px> for those (regular slicing).
 */
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;

interface Args {
  file: string;
  minArea: number;
  grid?: number;
  bgLight: number;
  bgSat: number;
  pad: number;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const get = (flag: string): string | undefined => {
    const i = argv.indexOf(flag);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const file = argv.find((a) => !a.startsWith('--') && a.endsWith('.png'));
  if (!file) throw new Error('usage: npm run extract -- <file.png> [--grid 32] [--min 200]');
  return {
    file,
    minArea: Number(get('--min') ?? 180),
    grid: get('--grid') ? Number(get('--grid')) : undefined,
    bgLight: Number(get('--bg-light') ?? 232),
    bgSat: Number(get('--bg-sat') ?? 14),
    pad: Number(get('--pad') ?? 1),
  };
}

function isBackground(r: number, g: number, b: number, args: Args): boolean {
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return min >= args.bgLight && max - min <= args.bgSat;
}

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  area: number;
}

function extractIslands(img: PNG, args: Args): Box[] {
  const { width: W, height: H } = img;
  const fg = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = img.data[i * 4] ?? 0;
    const g = img.data[i * 4 + 1] ?? 0;
    const b = img.data[i * 4 + 2] ?? 0;
    fg[i] = isBackground(r, g, b, args) ? 0 : 1;
  }
  const seen = new Uint8Array(W * H);
  const boxes: Box[] = [];
  const stack: number[] = [];
  for (let start = 0; start < W * H; start++) {
    if (fg[start] === 0 || seen[start]) continue;
    stack.length = 0;
    stack.push(start);
    seen[start] = 1;
    let x0 = W;
    let y0 = H;
    let x1 = 0;
    let y1 = 0;
    let area = 0;
    while (stack.length) {
      const p = stack.pop() as number;
      const px = p % W;
      const py = (p / W) | 0;
      area++;
      if (px < x0) x0 = px;
      if (px > x1) x1 = px;
      if (py < y0) y0 = py;
      if (py > y1) y1 = py;
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = px + dx;
          const ny = py + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const np = ny * W + nx;
          if (fg[np] && !seen[np]) {
            seen[np] = 1;
            stack.push(np);
          }
        }
    }
    if (area >= args.minArea) boxes.push({ x0, y0, x1, y1, area });
  }
  // reading order: top-to-bottom rows, then left-to-right
  boxes.sort((a, b) => (Math.abs(a.y0 - b.y0) > 24 ? a.y0 - b.y0 : a.x0 - b.x0));
  return boxes;
}

function cropTransparent(img: PNG, box: Box, args: Args): PNG {
  const w = box.x1 - box.x0 + 1 + args.pad * 2;
  const h = box.y1 - box.y0 + 1 + args.pad * 2;
  const out = new PNG({ width: w, height: h });
  // copy region; mark background pixels
  const bg = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sx = box.x0 - args.pad + x;
      const sy = box.y0 - args.pad + y;
      const o = (y * w + x) * 4;
      if (sx < 0 || sy < 0 || sx >= img.width || sy >= img.height) {
        bg[y * w + x] = 1;
        continue;
      }
      const s = (sy * img.width + sx) * 4;
      out.data[o] = img.data[s] ?? 0;
      out.data[o + 1] = img.data[s + 1] ?? 0;
      out.data[o + 2] = img.data[s + 2] ?? 0;
      out.data[o + 3] = 255;
      const r = img.data[s] ?? 0;
      const g = img.data[s + 1] ?? 0;
      const b = img.data[s + 2] ?? 0;
      if (isBackground(r, g, b, args)) bg[y * w + x] = 1;
    }
  }
  // flood transparency from the border so interior whites survive
  const clear = new Uint8Array(w * h);
  const stack: number[] = [];
  const push = (x: number, y: number): void => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (bg[p] && !clear[p]) {
      clear[p] = 1;
      stack.push(p);
    }
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (stack.length) {
    const p = stack.pop() as number;
    const x = p % w;
    const y = (p / w) | 0;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }
  for (let p = 0; p < w * h; p++) if (clear[p]) out.data[p * 4 + 3] = 0;
  return out;
}

function gridSlice(img: PNG, cell: number, outDir: string): number {
  const cols = Math.floor(img.width / cell);
  const rows = Math.floor(img.height / cell);
  let n = 0;
  const index: Array<Record<string, number>> = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const out = new PNG({ width: cell, height: cell });
      let nonEmpty = 0;
      for (let y = 0; y < cell; y++)
        for (let x = 0; x < cell; x++) {
          const s = ((r * cell + y) * img.width + (c * cell + x)) * 4;
          const o = (y * cell + x) * 4;
          out.data[o] = img.data[s] ?? 0;
          out.data[o + 1] = img.data[s + 1] ?? 0;
          out.data[o + 2] = img.data[s + 2] ?? 0;
          out.data[o + 3] = 255;
          if ((out.data[o] ?? 0) < 240 || (out.data[o + 1] ?? 0) < 240) nonEmpty++;
        }
      if (nonEmpty < cell) continue; // skip blank cells
      writeFileSync(join(outDir, `tile_${r}_${c}.png`), PNG.sync.write(out));
      index.push({ row: r, col: c });
      n++;
    }
  }
  writeFileSync(join(outDir, 'index.json'), JSON.stringify({ cell, cols, rows, tiles: index }, null, 2));
  return n;
}

const args = parseArgs();
const name = basename(args.file).replace(/\.png$/, '');
const outDir = join(ROOT, 'assets/extracted', name);
mkdirSync(outDir, { recursive: true });
const img = PNG.sync.read(
  (await import('node:fs')).readFileSync(
    args.file.startsWith('/') ? args.file : join(ROOT, args.file),
  ),
);

if (args.grid) {
  const n = gridSlice(img, args.grid, outDir);
  console.log(`grid-sliced ${n} non-blank ${args.grid}px tiles → ${outDir}`);
} else {
  const boxes = extractIslands(img, args);
  const index = boxes.map((b, i) => ({
    id: i,
    file: `obj_${i}.png`,
    x: b.x0,
    y: b.y0,
    w: b.x1 - b.x0 + 1,
    h: b.y1 - b.y0 + 1,
  }));
  boxes.forEach((b, i) => {
    const crop = cropTransparent(img, b, args);
    writeFileSync(join(outDir, `obj_${i}.png`), PNG.sync.write(crop));
  });
  writeFileSync(join(outDir, 'index.json'), JSON.stringify({ source: name, count: boxes.length, objects: index }, null, 2));
  console.log(`extracted ${boxes.length} objects → ${outDir}`);
  const sizes = boxes.map((b) => `${b.x1 - b.x0 + 1}x${b.y1 - b.y0 + 1}`);
  console.log('sizes:', sizes.slice(0, 40).join('  '));
}
void readdirSync;
