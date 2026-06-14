/**
 * pixelify — convert any image into clean, palette-locked pixel art
 * (npm run pixelify -- <input.png> [opts]).
 *
 * Pipeline: optional background-removal (flood from borders) → area-average
 * downscale to a target pixel size → median-cut palette quantization (optional
 * Floyd–Steinberg dither) → optional dark outline. Writes the native-resolution
 * pixel PNG plus an upscaled preview. No GPU/network — pure image processing,
 * so it turns any source (Midjourney/SDXL/PixelLab/photo) into game-ready,
 * style-consistent pixel art.
 *
 * Options:
 *   --size N      longest edge of the output in pixels (default 96)
 *   --colors N    palette size (default 24)
 *   --dither      Floyd–Steinberg error diffusion
 *   --outline     add a dark outline around the subject (needs --bg or alpha)
 *   --bg          remove a near-uniform background to transparency
 *   --bg-tol N    background match tolerance 0..120 (default 36)
 *   --preview N   upscale factor for the preview png (default 6)
 *   --palette hex,hex,...   snap to a fixed palette instead of median-cut
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { PNG } from 'pngjs';

type RGB = [number, number, number];

function arg(name: string, def?: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : def;
}
const has = (name: string): boolean => process.argv.includes(name);

const input = process.argv.slice(2).find((a) => !a.startsWith('--') && /\.(png|jpg|jpeg)$/i.test(a));
if (!input) {
  console.error('usage: npm run pixelify -- <input.png> [--size 96] [--colors 24] [--dither] [--outline] [--bg]');
  process.exit(1);
}
const SIZE = Number(arg('--size', '96'));
const COLORS = Number(arg('--colors', '24'));
const DITHER = has('--dither');
const OUTLINE = has('--outline');
const BG = has('--bg');
const BG_TOL = Number(arg('--bg-tol', '36'));
const PREVIEW = Number(arg('--preview', '6'));
const FIXED = arg('--palette');

const src = PNG.sync.read(readFileSync(input));

// ---- 1. optional background removal (flood from the borders) -------------
const alpha = new Uint8Array(src.width * src.height).fill(255);
if (BG) {
  const cornerIdx = [0, src.width - 1, (src.height - 1) * src.width, src.height * src.width - 1];
  const bg: RGB = [0, 0, 0];
  for (const ci of cornerIdx) {
    bg[0] += src.data[ci * 4] ?? 0;
    bg[1] += src.data[ci * 4 + 1] ?? 0;
    bg[2] += src.data[ci * 4 + 2] ?? 0;
  }
  bg[0] = Math.round(bg[0] / 4);
  bg[1] = Math.round(bg[1] / 4);
  bg[2] = Math.round(bg[2] / 4);
  const near = (i: number): boolean =>
    Math.abs((src.data[i * 4] ?? 0) - bg[0]) +
      Math.abs((src.data[i * 4 + 1] ?? 0) - bg[1]) +
      Math.abs((src.data[i * 4 + 2] ?? 0) - bg[2]) <=
    BG_TOL * 3;
  const stack: number[] = [];
  const push = (x: number, y: number): void => {
    if (x < 0 || y < 0 || x >= src.width || y >= src.height) return;
    const i = y * src.width + x;
    if (alpha[i] === 0) return;
    if (near(i)) {
      alpha[i] = 0;
      stack.push(i);
    }
  };
  for (let x = 0; x < src.width; x++) {
    push(x, 0);
    push(x, src.height - 1);
  }
  for (let y = 0; y < src.height; y++) {
    push(0, y);
    push(src.width - 1, y);
  }
  while (stack.length) {
    const i = stack.pop() as number;
    const x = i % src.width;
    const y = (i / src.width) | 0;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }
}

// ---- 2. area-average downscale to the target pixel grid ------------------
const scale = SIZE / Math.max(src.width, src.height);
const OW = Math.max(1, Math.round(src.width * scale));
const OH = Math.max(1, Math.round(src.height * scale));
const out = new PNG({ width: OW, height: OH });
const sx = src.width / OW;
const sy = src.height / OH;
for (let oy = 0; oy < OH; oy++) {
  for (let ox = 0; ox < OW; ox++) {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    let n = 0;
    const x0 = Math.floor(ox * sx);
    const x1 = Math.max(x0 + 1, Math.floor((ox + 1) * sx));
    const y0 = Math.floor(oy * sy);
    const y1 = Math.max(y0 + 1, Math.floor((oy + 1) * sy));
    for (let yy = y0; yy < y1; yy++)
      for (let xx = x0; xx < x1; xx++) {
        const i = yy * src.width + xx;
        const al = (alpha[i] ?? 255) / 255;
        r += (src.data[i * 4] ?? 0) * al;
        g += (src.data[i * 4 + 1] ?? 0) * al;
        b += (src.data[i * 4 + 2] ?? 0) * al;
        a += alpha[i] ?? 255;
        n += al;
      }
    const o = (oy * OW + ox) * 4;
    const count = (x1 - x0) * (y1 - y0);
    out.data[o] = n > 0 ? Math.round(r / n) : 0;
    out.data[o + 1] = n > 0 ? Math.round(g / n) : 0;
    out.data[o + 2] = n > 0 ? Math.round(b / n) : 0;
    out.data[o + 3] = Math.round(a / count);
  }
}

// ---- 3. palette quantization (median cut or fixed) -----------------------
function medianCut(pixels: RGB[], target: number): RGB[] {
  if (pixels.length === 0) return [[0, 0, 0]];
  let boxes: RGB[][] = [pixels];
  const rangeOf = (box: RGB[]): { ch: number; range: number } => {
    const mn = [255, 255, 255];
    const mx = [0, 0, 0];
    for (const p of box)
      for (let c = 0; c < 3; c++) {
        const v = p[c] ?? 0;
        if (v < (mn[c] ?? 255)) mn[c] = v;
        if (v > (mx[c] ?? 0)) mx[c] = v;
      }
    let ch = 0;
    let range = -1;
    for (let c = 0; c < 3; c++) {
      const r = (mx[c] ?? 0) - (mn[c] ?? 0);
      if (r > range) {
        range = r;
        ch = c;
      }
    }
    return { ch, range };
  };
  while (boxes.length < target) {
    let bi = -1;
    let best = 0;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i]!.length < 2) continue;
      const { range } = rangeOf(boxes[i]!);
      if (range > best) {
        best = range;
        bi = i;
      }
    }
    if (bi < 0) break;
    const box = boxes[bi]!;
    const { ch } = rangeOf(box);
    box.sort((a, b) => (a[ch] ?? 0) - (b[ch] ?? 0));
    const mid = box.length >> 1;
    boxes.splice(bi, 1, box.slice(0, mid), box.slice(mid));
  }
  return boxes.map((box) => {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    for (const p of box) {
      s0 += p[0];
      s1 += p[1];
      s2 += p[2];
    }
    return [Math.round(s0 / box.length), Math.round(s1 / box.length), Math.round(s2 / box.length)] as RGB;
  });
}

const opaque: RGB[] = [];
for (let i = 0; i < OW * OH; i++) {
  if ((out.data[i * 4 + 3] ?? 0) >= 128) opaque.push([out.data[i * 4]!, out.data[i * 4 + 1]!, out.data[i * 4 + 2]!]);
}
const palette: RGB[] = FIXED
  ? FIXED.split(',').map((h) => [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)] as RGB)
  : medianCut(opaque.slice(), COLORS);

const nearest = (r: number, g: number, b: number): RGB => {
  let best = palette[0]!;
  let bd = Infinity;
  for (const p of palette) {
    const d = (p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2;
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return best;
};

// map (with optional Floyd–Steinberg)
const err = DITHER ? new Float32Array(OW * OH * 3) : undefined;
for (let y = 0; y < OH; y++) {
  for (let x = 0; x < OW; x++) {
    const i = y * OW + x;
    if ((out.data[i * 4 + 3] ?? 0) < 128) {
      out.data[i * 4 + 3] = 0;
      continue;
    }
    let r = out.data[i * 4]!;
    let g = out.data[i * 4 + 1]!;
    let b = out.data[i * 4 + 2]!;
    if (err) {
      r = Math.max(0, Math.min(255, r + (err[i * 3] ?? 0)));
      g = Math.max(0, Math.min(255, g + (err[i * 3 + 1] ?? 0)));
      b = Math.max(0, Math.min(255, b + (err[i * 3 + 2] ?? 0)));
    }
    const p = nearest(r, g, b);
    out.data[i * 4] = p[0];
    out.data[i * 4 + 1] = p[1];
    out.data[i * 4 + 2] = p[2];
    out.data[i * 4 + 3] = 255;
    if (err) {
      const E = err;
      const d0 = r - p[0];
      const d1 = g - p[1];
      const d2 = b - p[2];
      const spread = (nx: number, ny: number, f: number): void => {
        if (nx < 0 || ny < 0 || nx >= OW || ny >= OH) return;
        const j = (ny * OW + nx) * 3;
        E[j] = (E[j] ?? 0) + d0 * f;
        E[j + 1] = (E[j + 1] ?? 0) + d1 * f;
        E[j + 2] = (E[j + 2] ?? 0) + d2 * f;
      };
      spread(x + 1, y, 7 / 16);
      spread(x - 1, y + 1, 3 / 16);
      spread(x, y + 1, 5 / 16);
      spread(x + 1, y + 1, 1 / 16);
    }
  }
}

// ---- 4. optional outline -------------------------------------------------
if (OUTLINE) {
  // darkest palette colour for the outline
  const dark = palette.reduce((a, b) => (a[0] + a[1] + a[2] < b[0] + b[1] + b[2] ? a : b));
  const ink: RGB = [Math.round(dark[0] * 0.5), Math.round(dark[1] * 0.5), Math.round(dark[2] * 0.4)];
  const solid = (x: number, y: number): boolean =>
    x >= 0 && y >= 0 && x < OW && y < OH && (out.data[(y * OW + x) * 4 + 3] ?? 0) >= 255;
  const edges: number[] = [];
  for (let y = 0; y < OH; y++)
    for (let x = 0; x < OW; x++) {
      if (solid(x, y)) continue;
      if (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1)) edges.push((y * OW + x) * 4);
    }
  for (const o of edges) {
    out.data[o] = ink[0];
    out.data[o + 1] = ink[1];
    out.data[o + 2] = ink[2];
    out.data[o + 3] = 255;
  }
}

// ---- write -------------------------------------------------------------
const dir = dirname(input);
const stem = basename(input).replace(/\.(png|jpg|jpeg)$/i, '');
const outPath = join(dir, `${stem}.pix.png`);
writeFileSync(outPath, PNG.sync.write(out));

// upscaled preview (nearest)
const pv = new PNG({ width: OW * PREVIEW, height: OH * PREVIEW });
for (let y = 0; y < pv.height; y++)
  for (let x = 0; x < pv.width; x++) {
    const si = ((Math.floor(y / PREVIEW) * OW + Math.floor(x / PREVIEW)) * 4);
    const di = (y * pv.width + x) * 4;
    pv.data[di] = out.data[si]!;
    pv.data[di + 1] = out.data[si + 1]!;
    pv.data[di + 2] = out.data[si + 2]!;
    pv.data[di + 3] = out.data[si + 3]!;
  }
const pvPath = join(dir, `${stem}.pix@${PREVIEW}x.png`);
writeFileSync(pvPath, PNG.sync.write(pv));

mkdirSync(dir, { recursive: true });
console.log(`pixelify: ${src.width}x${src.height} -> ${OW}x${OH}, ${palette.length} colours`);
console.log(`  ${outPath}`);
console.log(`  ${pvPath} (preview ${PREVIEW}x)`);
