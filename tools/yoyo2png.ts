/**
 * yoyo2png — rasterize a YoYoPixel grid asset to a game-ready PNG
 * (npm run yoyo2png -- <input.json|input.html> [--preview 8]).
 *
 * YoYoPixel (MIT, github.com/SbName/yoyopixel) stores grid-mode pixel art as a
 * { palette: { char: '#hex' }, pixels: ['...rows...'] } structure — the same
 * representation as our ASCII sprites — so it rasterizes headlessly (no
 * browser). This adopts YoYoPixel's *methodology* (its palette/shading rules
 * produce the grid); we author original sprites that way and convert here.
 * (The procedural-canvas mode for buildings/tilesets needs a renderer — TODO.)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { PNG } from 'pngjs';

const input = process.argv.slice(2).find((a) => !a.startsWith('--'));
if (!input) {
  console.error('usage: npm run yoyo2png -- <input.json|input.html> [--preview 8]');
  process.exit(1);
}
const pvIdx = process.argv.indexOf('--preview');
const PREVIEW = pvIdx >= 0 ? Number(process.argv[pvIdx + 1]) : 8;

interface Grid {
  palette: Record<string, string>;
  pixels: string[];
}

function parse(file: string): Grid {
  const raw = readFileSync(file, 'utf8');
  if (file.endsWith('.json')) return JSON.parse(raw) as Grid;
  // extract the first palette {...} and pixels [...] from an .html/.js source
  const palM = raw.match(/palette:\s*\{([\s\S]*?)\}/);
  const pixM = raw.match(/pixels:\s*\[([\s\S]*?)\]/);
  if (!palM || !pixM) throw new Error('no palette/pixels found');
  const palette: Record<string, string> = {};
  for (const m of palM[1]!.matchAll(/'(.)':\s*'([^']+)'/g)) palette[m[1]!] = m[2]!;
  const pixels = [...pixM[1]!.matchAll(/'([^']*)'/g)].map((m) => m[1]!).filter((r) => r.length > 0);
  return { palette, pixels };
}

const grid = parse(input);
const H = grid.pixels.length;
const W = Math.max(...grid.pixels.map((r) => r.length));
const hex = (h: string): [number, number, number, number] =>
  !h || h === 'transparent'
    ? [0, 0, 0, 0]
    : [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), 255];

const png = new PNG({ width: W, height: H });
grid.pixels.forEach((row, y) => {
  for (let x = 0; x < W; x++) {
    const ch = row[x] ?? '.';
    const c = hex(grid.palette[ch] ?? 'transparent');
    const i = (y * W + x) * 4;
    png.data[i] = c[0];
    png.data[i + 1] = c[1];
    png.data[i + 2] = c[2];
    png.data[i + 3] = c[3];
  }
});

const dir = dirname(input);
const stem = basename(input).replace(/\.(json|html|js)$/i, '');
writeFileSync(join(dir, `${stem}.yoyo.png`), PNG.sync.write(png));
const pv = new PNG({ width: W * PREVIEW, height: H * PREVIEW });
for (let y = 0; y < pv.height; y++)
  for (let x = 0; x < pv.width; x++) {
    const si = (Math.floor(y / PREVIEW) * W + Math.floor(x / PREVIEW)) * 4;
    const di = (y * pv.width + x) * 4;
    pv.data[di] = png.data[si]!;
    pv.data[di + 1] = png.data[si + 1]!;
    pv.data[di + 2] = png.data[si + 2]!;
    pv.data[di + 3] = png.data[si + 3]!;
  }
writeFileSync(join(dir, `${stem}.yoyo@${PREVIEW}x.png`), PNG.sync.write(pv));
console.log(`yoyo2png: ${W}x${H}, ${Object.keys(grid.palette).length} colours -> ${stem}.yoyo.png`);
