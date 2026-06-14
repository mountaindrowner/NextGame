/**
 * Animated world-layer assets (npm run gen:foliage). Limited palette, built
 * for motion: grass blade-tufts and leaf clusters that the scene sways in
 * wind, and depth-shaded water frames the scene cycles for flow. These overlay
 * the baked ground (gen-world.ts). Style law: layered + animated, not flat.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { hexRGBA, Sprite, type RGBA } from './spritekit';
import { Rng } from '../src/core/rng';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/world/fx');
mkdirSync(OUT, { recursive: true });

// limited, cohesive palette (earthy western)
const P = {
  ink: hexRGBA('161310'),
  g0: hexRGBA('24331c'),
  g1: hexRGBA('33491f'),
  g2: hexRGBA('466126'),
  g3: hexRGBA('5e7e30'),
  g4: hexRGBA('84a046'),
  k0: hexRGBA('32230f'),
  k1: hexRGBA('4f3a20'),
  k2: hexRGBA('6e5230'),
  w0: hexRGBA('18324e'),
  w1: hexRGBA('244a6e'),
  w2: hexRGBA('356a92'),
  w3: hexRGBA('5a92b6'),
  w4: hexRGBA('9cc8dc'),
} as const;

const save = (name: string, s: Sprite): void => {
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${name}.png`), PNG.sync.write(png));
};

// ---- grass blade-tufts (anchored at bottom; the scene rotates them) ------
function grassTuft(seed: number): Sprite {
  const s = new Sprite(16, 18);
  const rng = new Rng(seed);
  const blades = 7 + rng.int(0, 3);
  for (let i = 0; i < blades; i++) {
    const x = 2 + rng.int(0, 11);
    const h = 6 + rng.int(0, 9);
    const lean = rng.int(-1, 1);
    const tone = [P.g2, P.g3, P.g4][rng.int(0, 2)] ?? P.g3;
    for (let j = 0; j < h; j++) {
      const yy = 17 - j;
      const xx = x + Math.round((lean * j) / h);
      s.set(xx, yy, j > h - 3 ? P.g4 : tone); // lit tip
      if (j === 0) s.set(xx, yy, P.g1); // dark base
    }
  }
  return s;
}

// ---- leaf clusters (grouped foliage blobs for trees) ---------------------
function leafCluster(seed: number): Sprite {
  const s = new Sprite(26, 22);
  const rng = new Rng(seed);
  // a few overlapping blobs make one irregular cluster
  const blobs = 3 + rng.int(0, 2);
  for (let b = 0; b < blobs; b++) {
    const cx = 7 + rng.int(0, 11);
    const cy = 7 + rng.int(0, 8);
    const r = 4 + rng.int(0, 3);
    s.sphere(cx, cy, r, [P.g1, P.g1, P.g2, P.g2, P.g3, P.g3, P.g4], { dither: false, light: [-1, -1] });
  }
  // dappled depth + lit top-left
  for (let i = 0; i < 14; i++) {
    const x = rng.int(0, 25);
    const y = rng.int(0, 21);
    if (s.opaque(x, y)) s.set(x, y, rng.chance(50) ? P.g1 : P.g4);
  }
  s.outline(P.ink);
  return s;
}

// ---- tree trunk + branches (static base under the clusters) --------------
function trunk(): Sprite {
  const s = new Sprite(22, 30);
  s.contactShadow(11, 29, 9, 3, [16, 12, 10, 110]);
  s.rect(8, 12, 6, 17, P.k1);
  s.rect(8, 12, 2, 17, P.k2); // lit
  s.rect(13, 12, 1, 17, P.k0); // shade
  // roots flare
  s.line(8, 28, 4, 29, P.k1);
  s.line(14, 28, 18, 29, P.k1);
  // branches up to where clusters sit
  s.line(10, 14, 4, 6, P.k1);
  s.line(12, 13, 18, 5, P.k1);
  s.line(11, 12, 11, 4, P.k2);
  s.outline(P.ink, P.k2);
  return s;
}

// ---- water frames (depth shading + moving ripple highlights) -------------
function waterFrame(f: number, frames: number): Sprite {
  const s = new Sprite(32, 32);
  // depth: deeper (darker) toward the centre band, shallower at edges
  for (let y = 0; y < 32; y++)
    for (let x = 0; x < 32; x++) {
      const d = Math.abs(y - 16) / 16; // 0 centre .. 1 edge
      const tone = d < 0.25 ? P.w0 : d < 0.55 ? P.w1 : P.w2;
      s.set(x, y, tone);
    }
  // moving ripple highlights — sine lines shifted by frame phase
  const phase = (f / frames) * Math.PI * 2;
  for (let ly = 3; ly < 32; ly += 7) {
    for (let x = 0; x < 32; x++) {
      const yy = ly + Math.round(Math.sin((x / 32) * Math.PI * 2 + phase + ly) * 1.6);
      s.set(x, yy, P.w3);
      if ((x + f) % 6 === 0) s.set(x, yy - 1, P.w4); // sparkle crest
    }
  }
  return s;
}

for (let i = 0; i < 3; i++) save(`grass_${i}`, grassTuft(i * 13 + 1));
for (let i = 0; i < 3; i++) save(`leaf_${i}`, leafCluster(i * 29 + 7));
save('trunk', trunk());
const WATER_FRAMES = 6;
for (let f = 0; f < WATER_FRAMES; f++) save(`water_${f}`, waterFrame(f, WATER_FRAMES));

console.log(`foliage: 3 grass tufts, 3 leaf clusters, trunk, ${WATER_FRAMES} water frames -> public/world/fx/`);
