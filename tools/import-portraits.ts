/**
 * Wire creator-supplied character bust portraits into the game. Each source
 * (assets/reference/<name>_portrait_source.png, large RGBA, transparent bg) is
 * trimmed to the art and downscaled (premultiplied-alpha box filter, so edges
 * stay clean) to public/world/char/<name>_96.png — the portrait the cutscene
 * player and the WHO-RUNS-TOPSIDE select already load.
 */
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const REF = join(ROOT, 'assets/reference');
const OUTDIR = join(ROOT, 'public/world/char');
const TARGET_H = 192; // output height; scenes scale it by height, aspect preserved

const CHARS = ['sal', 'wren'] as const;

for (const name of CHARS) {
  const src = PNG.sync.read(readFileSync(join(REF, `${name}_portrait_source.png`)));
  const a = (x: number, y: number): number => src.data[(y * src.width + x) * 4 + 3]!;

  // trim to the opaque art
  let x0 = src.width, y0 = src.height, x1 = -1, y1 = -1;
  for (let y = 0; y < src.height; y++) for (let x = 0; x < src.width; x++)
    if (a(x, y) >= 16) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;

  const scale = TARGET_H / bh;
  const ow = Math.max(1, Math.round(bw * scale));
  const oh = TARGET_H;
  const out = new PNG({ width: ow, height: oh });
  out.data.fill(0);

  for (let ty = 0; ty < oh; ty++)
    for (let tx = 0; tx < ow; tx++) {
      const sx0 = x0 + Math.floor(tx / scale), sx1 = x0 + Math.max(Math.floor((tx + 1) / scale), Math.floor(tx / scale) + 1);
      const sy0 = y0 + Math.floor(ty / scale), sy1 = y0 + Math.max(Math.floor((ty + 1) / scale), Math.floor(ty / scale) + 1);
      let pr = 0, pg = 0, pb = 0, pa = 0, n = 0;
      for (let sy = sy0; sy < sy1 && sy <= y1; sy++)
        for (let sx = sx0; sx < sx1 && sx <= x1; sx++) {
          const i = (sy * src.width + sx) * 4;
          const al = src.data[i + 3]! / 255;
          pr += src.data[i]! * al; pg += src.data[i + 1]! * al; pb += src.data[i + 2]! * al; pa += src.data[i + 3]!; n++;
        }
      if (!n) continue;
      const al = pa / n; // average alpha (0..255)
      const o = (ty * ow + tx) * 4;
      out.data[o + 3] = Math.round(al);
      if (al > 0) { // un-premultiply
        const k = 255 / (al * n);
        out.data[o] = Math.min(255, Math.round(pr * k));
        out.data[o + 1] = Math.min(255, Math.round(pg * k));
        out.data[o + 2] = Math.min(255, Math.round(pb * k));
      }
    }

  writeFileSync(join(OUTDIR, `${name}_96.png`), PNG.sync.write(out));
  console.log(`${name}_96.png: trimmed ${bw}x${bh} → ${ow}x${oh}`);
}
