/**
 * Hand-authored protagonist sprites (npm run gen:protags). Built pixel-by-pixel
 * in spritekit from Mark's reference (goggle-cap, red bandana, scrappy jacket,
 * knee pads, boots) — original art, a style homage, NOT a downscale of the
 * source image. SAL (brown hair) and WREN (blonde ponytail), front-facing,
 * 32×44. Writes public/world/char/sal_hand.png + wren_hand.png and previews.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { hexRGBA, Sprite, type RGBA } from './spritekit';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/world/char');
mkdirSync(OUT, { recursive: true });

const C = {
  ink: hexRGBA('17110b'),
  skin: hexRGBA('e0a878'),
  skinDk: hexRGBA('b07a50'),
  skinHi: hexRGBA('f0c498'),
  brown: hexRGBA('6a4426'),
  brownDk: hexRGBA('472c17'),
  blonde: hexRGBA('e6c356'),
  blondeDk: hexRGBA('b3902e'),
  cap: hexRGBA('6f675a'),
  capDk: hexRGBA('474134'),
  capHi: hexRGBA('938a78'),
  goFrame: hexRGBA('2a2420'),
  glass: hexRGBA('9ad6dd'),
  glassDk: hexRGBA('5a979e'),
  band: hexRGBA('c23a2a'),
  bandDk: hexRGBA('8a2418'),
  bandHi: hexRGBA('e0604a'),
  jkt: hexRGBA('7d6c3c'),
  jktDk: hexRGBA('554823'),
  jktHi: hexRGBA('9d8a4e'),
  pouch: hexRGBA('5b4a28'),
  strap: hexRGBA('362c1c'),
  denim: hexRGBA('3b4d6e'),
  denimDk: hexRGBA('283750'),
  denimHi: hexRGBA('56688a'),
  boot: hexRGBA('5c3e24'),
  bootDk: hexRGBA('3a2614'),
} as const;

interface Opts {
  hair: RGBA;
  hairDk: RGBA;
  ponytail?: boolean;
}

function protag(o: Opts): Sprite {
  const s = new Sprite(32, 44);
  const P = (x: number, y: number, c: RGBA): void => s.set(x, y, c);
  const box = (x: number, y: number, w: number, h: number, c: RGBA): void => s.rect(x, y, w, h, c);

  s.contactShadow(16, 43, 9, 2, [18, 12, 10, 110]);

  // ---- legs + boots --------------------------------------------------
  box(11, 31, 5, 9, C.denim); // left leg
  box(17, 31, 5, 9, C.denim); // right leg
  box(11, 31, 1, 9, C.denimHi);
  box(21, 31, 1, 9, C.denimDk);
  box(11, 33, 5, 3, C.pouch); // left knee pad
  box(17, 33, 5, 3, C.pouch); // right knee pad
  P(11, 34, C.jktHi);
  P(17, 34, C.jktHi);
  box(10, 40, 6, 4, C.boot); // boots
  box(17, 40, 6, 4, C.boot);
  box(10, 43, 6, 1, C.bootDk);
  box(17, 43, 6, 1, C.bootDk);
  box(10, 40, 6, 1, C.skinDk); // boot cuff

  // ---- torso / jacket ------------------------------------------------
  box(8, 17, 16, 14, C.jkt);
  box(8, 17, 2, 14, C.jktHi); // lit left edge
  box(22, 17, 2, 14, C.jktDk); // shaded right edge
  box(8, 17, 16, 1, C.jktDk); // collar shadow
  box(15, 18, 2, 12, C.strap); // zipper
  box(8, 29, 16, 2, C.strap); // belt
  P(15, 30, C.jktHi);
  box(10, 24, 4, 5, C.pouch); // chest pouches
  box(18, 24, 4, 5, C.pouch);
  box(10, 24, 4, 1, C.jktHi);
  box(18, 24, 4, 1, C.jktHi);
  // arms
  box(5, 18, 4, 10, C.jkt);
  box(23, 18, 4, 10, C.jkt);
  box(5, 18, 1, 10, C.jktHi);
  box(26, 18, 1, 10, C.jktDk);
  box(6, 28, 3, 2, C.skin); // hands
  box(23, 28, 3, 2, C.skin);
  P(6, 28, C.skinHi);

  // ---- bandana -------------------------------------------------------
  box(10, 15, 13, 1, C.band);
  box(11, 16, 11, 1, C.band);
  box(13, 17, 7, 1, C.bandDk);
  P(11, 15, C.bandHi);
  P(15, 16, C.bandHi);
  P(16, 17, C.bandDk); // knot

  // ---- head / face ---------------------------------------------------
  box(11, 8, 10, 8, C.skin);
  box(11, 8, 1, 8, C.skinHi); // lit cheek
  box(20, 9, 1, 6, C.skinDk); // shaded cheek
  box(13, 14, 6, 1, C.skinDk); // jaw/neck shade
  // eyes
  P(13, 11, C.ink);
  P(14, 11, C.ink);
  P(18, 11, C.ink);
  P(19, 11, C.ink);
  P(13, 10, C.skinHi);
  P(18, 10, C.skinHi);
  P(16, 13, C.skinDk); // nose/mouth hint

  // ---- hair ----------------------------------------------------------
  box(10, 7, 12, 2, o.hair); // fringe under cap
  box(10, 8, 1, 3, o.hair); // sideburns
  box(21, 8, 1, 3, o.hair);
  box(10, 7, 12, 1, o.hairDk);
  if (o.ponytail) {
    box(22, 6, 4, 3, o.hair); // ponytail base
    box(24, 8, 3, 6, o.hair);
    box(25, 11, 2, 4, o.hairDk);
    P(26, 9, o.hair);
  }

  // ---- cap + goggles -------------------------------------------------
  box(10, 2, 12, 5, C.cap); // crown
  box(10, 2, 12, 1, C.capHi);
  box(10, 6, 1, 1, C.capDk);
  box(8, 6, 16, 2, C.capDk); // brim
  box(8, 6, 16, 1, C.cap);
  // goggle strap over the cap
  box(9, 4, 14, 1, C.goFrame);
  // lenses
  box(11, 3, 4, 3, C.goFrame);
  box(17, 3, 4, 3, C.goFrame);
  box(12, 4, 2, 1, C.glass);
  box(18, 4, 2, 1, C.glass);
  P(12, 4, C.glass);
  P(18, 4, C.glass);
  P(13, 4, C.glassDk);
  P(19, 4, C.glassDk);

  s.outline(C.ink);
  return s;
}

function write(name: string, s: Sprite): void {
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${name}.png`), PNG.sync.write(png));
}

write('sal_hand', protag({ hair: C.brown, hairDk: C.brownDk }));
write('wren_hand', protag({ hair: C.blonde, hairDk: C.blondeDk, ponytail: true }));
console.log('hand-authored SAL + WREN -> public/world/char/{sal,wren}_hand.png (32x44)');
