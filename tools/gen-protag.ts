/**
 * Protagonist sprites authored with the YoYoPixel grid method (npm run
 * gen:protag): a { palette, pixels[] } grid with highlight/base/shadow per
 * material, placed pixel-by-pixel. Original art (homage to Mark's reference:
 * goggle-cap, red bandana, scrappy jacket, denim + knee pads, boots).
 * Emits the .yoyo.json grid + a PNG (via the same path as yoyo2png) for
 * SAL (brown hair) and WREN (blonde ponytail). 18×28, front-facing.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/world/char');
mkdirSync(OUT, { recursive: true });

const PALETTE: Record<string, string> = {
  '.': 'transparent',
  c: '#6f6658', l: '#938a78', C: '#474134', // cap hi/base/shadow
  k: '#26201c', // goggle frame
  g: '#a6dde2', G: '#5f9aa1', // glass hi/shadow
  r: '#6a4426', R: '#3f2916', // brown hair
  y: '#e6c356', Y: '#b3902e', // blonde hair
  S: '#e0a878', s: '#b87d54', H: '#f2c89a', // skin shadow/base/hi
  X: '#20180f', // dark (eyes, deep outline)
  b: '#c23a2a', B: '#8a2418', // bandana base/shadow
  j: '#7d6c3c', J: '#554823', h: '#9d8a4e', // jacket shadow/base/hi
  p: '#5b4a28', t: '#33291a', // pouch / strap
  d: '#3f5476', D: '#2a3a55', e: '#5e7398', // denim shadow/base/hi
  o: '#5c3e24', O: '#38240f', // boot base/dark
};

const W = 18;
const H = 28;

type Hair = 'brown' | 'blonde';

function build(hair: Hair, ponytail: boolean): string[] {
  const g: string[][] = Array.from({ length: H }, () => Array.from({ length: W }, () => '.'));
  const set = (x: number, y: number, ch: string): void => {
    if (x >= 0 && y >= 0 && x < W && y < H) g[y]![x] = ch;
  };
  const rect = (x: number, y: number, w: number, hh: number, ch: string): void => {
    for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) set(x + i, y + j, ch);
  };
  const vline = (x: number, y: number, hh: number, ch: string): void => {
    for (let j = 0; j < hh; j++) set(x, y + j, ch);
  };
  const HR = hair === 'blonde' ? 'y' : 'r';
  const HRd = hair === 'blonde' ? 'Y' : 'R';

  // boots
  rect(5, 25, 4, 3, 'o');
  rect(9, 25, 4, 3, 'o');
  rect(5, 27, 4, 1, 'O');
  rect(9, 27, 4, 1, 'O');
  // legs / denim
  rect(5, 20, 4, 5, 'd');
  rect(9, 20, 4, 5, 'd');
  vline(5, 20, 5, 'e');
  vline(12, 20, 5, 'D');
  rect(5, 22, 4, 2, 'p'); // knee pads
  rect(9, 22, 4, 2, 'p');
  set(5, 22, 'h');
  set(9, 22, 'h');
  // torso jacket
  rect(4, 13, 10, 8, 'j');
  vline(4, 13, 8, 'h'); // lit edge
  vline(13, 13, 8, 'J'); // shaded edge
  rect(4, 13, 10, 1, 'J'); // collar
  vline(8, 14, 6, 't'); // zipper
  vline(9, 14, 6, 't');
  rect(4, 20, 10, 1, 't'); // belt
  rect(5, 16, 3, 3, 'p'); // chest pouches
  rect(10, 16, 3, 3, 'p');
  rect(5, 16, 3, 1, 'h');
  rect(10, 16, 3, 1, 'h');
  // arms + hands
  rect(2, 14, 2, 6, 'j');
  rect(14, 14, 2, 6, 'j');
  vline(2, 14, 6, 'h');
  vline(15, 14, 6, 'J');
  rect(2, 20, 2, 2, 'S');
  rect(14, 20, 2, 2, 'S');
  set(2, 20, 'H');
  // bandana
  rect(5, 11, 8, 1, 'b');
  rect(6, 12, 6, 1, 'b');
  rect(7, 13, 4, 1, 'B');
  set(8, 12, 'B');
  set(9, 12, 'B');
  // face (y6–10)
  rect(6, 6, 6, 5, 'S');
  vline(11, 6, 4, 's'); // shaded right cheek
  set(7, 8, 'X'); // eyes
  set(10, 8, 'X');
  set(7, 7, 'H'); // brow glint
  set(10, 7, 'H');
  set(8, 10, 's'); // mouth
  set(9, 10, 's');
  // hair fringe peeking under the brim (top of face) + sideburns
  rect(6, 5, 6, 1, HR);
  set(6, 5, HRd);
  set(11, 5, HRd);
  set(5, 6, HR);
  set(12, 6, HR);
  if (ponytail) {
    rect(12, 5, 3, 2, HR);
    rect(13, 7, 3, 5, HR);
    vline(14, 8, 4, HRd);
    set(15, 6, HR);
  }
  // cap crown
  rect(6, 2, 6, 3, 'c');
  vline(6, 2, 3, 'l');
  vline(11, 2, 3, 'C');
  rect(4, 4, 10, 1, 'C'); // brim
  rect(5, 4, 8, 1, 'c');
  // goggles: dark band + two glass lenses on the brow
  rect(5, 3, 8, 1, 'k');
  set(6, 3, 'G');
  set(7, 3, 'g');
  set(10, 3, 'g');
  set(11, 3, 'G');
  set(7, 2, 'g');
  set(10, 2, 'g');

  return g.map((row) => row.join(''));
}

const hex = (h: string): [number, number, number, number] =>
  h === 'transparent'
    ? [0, 0, 0, 0]
    : [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16), 255];

function write(name: string, pixels: string[]): void {
  writeFileSync(join(OUT, `${name}.yoyo.json`), JSON.stringify({ palette: PALETTE, pixels }, null, 0));
  const png = new PNG({ width: W, height: H });
  pixels.forEach((row, y) => {
    for (let x = 0; x < W; x++) {
      const c = hex(PALETTE[row[x] ?? '.'] ?? 'transparent');
      const i = (y * W + x) * 4;
      png.data[i] = c[0];
      png.data[i + 1] = c[1];
      png.data[i + 2] = c[2];
      png.data[i + 3] = c[3];
    }
  });
  writeFileSync(join(OUT, `${name}.png`), PNG.sync.write(png));
}

write('sal_yoyo', build('brown', false));
write('wren_yoyo', build('blonde', true));
console.log(`protag (YoYoPixel grid method): sal_yoyo + wren_yoyo (${W}x${H}) -> public/world/char/`);
