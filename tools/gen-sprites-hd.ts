/**
 * HD Ohm rework — batch 1 proof (npm run gen:sprites:hd).
 * 96×96 battle fronts, full color, 7–9 step ramps, anti-aliased outline,
 * soft contact shadow. Same creature designs as the GBA set, re-authored at
 * higher fidelity for the HD direction (style-guide, confirmed 2026-06-13).
 * Outputs <num>_front_hd.png alongside the GBA art (engine still shows the
 * 64px set until the 480×320 resolution bump lands).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { hexRGBA, ramp, Sprite, type RGBA } from './spritekit';

const OUT = join(new URL('..', import.meta.url).pathname, 'public/sprites/ohms');
mkdirSync(OUT, { recursive: true });

const OUTLINE = hexRGBA('171009');
const SHADOW: RGBA = [20, 14, 12, 110];
const WHITE = hexRGBA('fbf6ea');
const DARK = hexRGBA('1a130c');

const HD = 96;
const S = (): Sprite => new Sprite(HD, HD);

function rivets(s: Sprite, xs: number[], ys: number[], c: RGBA, hi: RGBA): void {
  for (const x of xs)
    for (const y of ys) {
      s.set(x, y, c);
      s.set(x, y - 1, hi);
    }
}
function eyeHD(s: Sprite, cx: number, cy: number, r: number, iris: RGBA, glowDark: RGBA): void {
  s.ellipse(cx, cy, r + 1, r + 1, glowDark);
  s.ellipse(cx, cy, r, r, iris);
  s.ellipse(cx, cy, Math.max(1, r - 2), Math.max(1, r - 2), [
    Math.min(255, iris[0] + 50),
    Math.min(255, iris[1] + 50),
    Math.min(255, iris[2] + 50),
    255,
  ]);
  s.set(cx - Math.round(r / 2), cy - Math.round(r / 2), WHITE); // glint
}

// --------------------------------------------------------------- Charkit HD
function charkit(): Sprite {
  const s = S();
  const rust = ramp('a8501c', { steps: 8, spread: 0.4 });
  const dark = ramp('5e2c12', { steps: 7, spread: 0.36 });
  const steel = ramp('6e665e', { steps: 8, spread: 0.42 });
  const ember = ramp('ff9026', { steps: 6, spread: 0.34 });
  s.contactShadow(48, 86, 30, 7, SHADOW);
  // treads
  s.roundedRect(20, 68, 56, 18, 8, steel, { dither: true });
  for (let x = 26; x < 72; x += 6) {
    s.line(x, 71, x, 83, OUTLINE);
    s.line(x + 2, 71, x + 2, 83, steel[6] ?? OUTLINE);
  }
  s.ellipse(28, 77, 5, 5, steel[2] ?? OUTLINE); // drive wheels
  s.ellipse(68, 77, 5, 5, steel[2] ?? OUTLINE);
  // exhaust stack
  s.roundedRect(60, 16, 7, 16, 3, steel, { dither: true });
  s.ellipse(63, 16, 4, 2, DARK);
  s.set(63, 15, ember[5] ?? WHITE);
  // furnace body
  s.roundedRect(24, 26, 48, 46, 10, rust, { dither: true });
  s.roundedRect(28, 30, 40, 22, 5, dark, { dither: true }); // upper door
  s.line(28, 41, 68, 41, rust[2] ?? OUTLINE); // door seam
  rivets(s, [31, 65], [33, 49], dark[1] ?? OUTLINE, rust[6] ?? WHITE);
  // ember grate maw
  s.rect(34, 56, 28, 12, DARK);
  for (let i = 0; i < 4; i++) {
    const yy = 58 + i * 2.4;
    s.line(36, yy, 60, yy, (i === 1 ? ember[5] : ember[3]) ?? WHITE);
  }
  // glowing eyes
  eyeHD(s, 39, 40, 5, ember[4] ?? WHITE, DARK);
  eyeHD(s, 57, 40, 5, ember[4] ?? WHITE, DARK);
  // brow
  s.line(33, 33, 45, 36, OUTLINE);
  s.line(63, 33, 51, 36, OUTLINE);
  s.outline(OUTLINE, rust[7]);
  s.antialias(OUTLINE, 90);
  return s;
}

// --------------------------------------------------------------- Sparkit HD
function sparkit(): Sprite {
  const s = S();
  const steel = ramp('818aa6', { steps: 8, spread: 0.44 });
  const copper = ramp('b87236', { steps: 8, spread: 0.4 });
  const volt = ramp('9fe6ff', { steps: 5, spread: 0.3 });
  s.contactShadow(48, 86, 28, 7, SHADOW);
  s.roundedRect(26, 66, 44, 18, 8, steel, { dither: true }); // base
  s.ellipse(34, 76, 5, 5, steel[2] ?? OUTLINE);
  s.ellipse(62, 76, 5, 5, steel[2] ?? OUTLINE);
  s.roundedRect(24, 24, 48, 44, 10, steel, { dither: true }); // housing
  s.sphere(48, 44, 16, copper, { dither: true }); // coil drum
  for (let y = 31; y <= 57; y += 3) s.line(34, y, 62, y, OUTLINE); // windings
  for (let y = 32; y <= 57; y += 3) s.line(34, y, 62, y, copper[6] ?? WHITE); // winding hilights
  // terminals
  s.roundedRect(28, 16, 7, 10, 2, steel, { dither: true });
  s.roundedRect(61, 16, 7, 10, 2, steel, { dither: true });
  s.line(31, 16, 31, 10, volt[3] ?? WHITE);
  s.line(64, 16, 64, 10, volt[3] ?? WHITE);
  s.set(31, 9, volt[4] ?? WHITE);
  s.set(64, 9, volt[4] ?? WHITE);
  // arc across the drum
  s.line(42, 38, 46, 44, volt[4] ?? WHITE);
  s.line(46, 44, 52, 40, volt[4] ?? WHITE);
  eyeHD(s, 40, 38, 5, volt[3] ?? WHITE, DARK);
  eyeHD(s, 56, 38, 5, volt[3] ?? WHITE, DARK);
  s.line(34, 31, 46, 34, OUTLINE);
  s.line(62, 31, 50, 34, OUTLINE);
  s.outline(OUTLINE, steel[7]);
  s.antialias(OUTLINE, 90);
  return s;
}

// --------------------------------------------------------------- Dripkit HD
function dripkit(): Sprite {
  const s = S();
  const body = ramp('5a86a8', { steps: 8, spread: 0.44 });
  const glass = ramp('cdeef6', { steps: 8, spread: 0.3 });
  const cool = ramp('7fd0ff', { steps: 5, spread: 0.3 });
  s.contactShadow(48, 86, 28, 7, SHADOW);
  s.roundedRect(26, 66, 44, 18, 8, body, { dither: true });
  s.ellipse(34, 76, 5, 5, body[2] ?? OUTLINE);
  s.ellipse(62, 76, 5, 5, body[2] ?? OUTLINE);
  s.roundedRect(24, 22, 48, 46, 12, body, { dither: true }); // pump housing
  s.line(28, 50, 68, 50, body[2] ?? OUTLINE); // seam
  rivets(s, [30, 66], [28, 60], body[1] ?? OUTLINE, body[6] ?? WHITE);
  s.sphere(48, 40, 13, glass, { dither: true }); // gauge dome
  s.line(48, 40, 54, 31, OUTLINE); // needle
  s.set(54, 31, hexRGBA('d83828'));
  // gauge ticks
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    s.set(48 + Math.cos(a) * 11, 40 + Math.sin(a) * 11, body[1] ?? OUTLINE);
  }
  eyeHD(s, 41, 38, 4, cool[3] ?? WHITE, DARK);
  eyeHD(s, 55, 38, 4, cool[3] ?? WHITE, DARK);
  // spout + drip
  s.roundedRect(45, 62, 6, 8, 2, body, { dither: true });
  s.ellipse(48, 72, 2, 3, cool[3] ?? WHITE);
  s.set(48, 76, cool[4] ?? WHITE);
  s.outline(OUTLINE, glass[7]);
  s.antialias(OUTLINE, 90);
  return s;
}

const built: Array<{ num: number; sprite: Sprite; note: string }> = [
  { num: 1, sprite: charkit(), note: 'Charkit HD — THERM furnace Ohmlet on treads' },
  { num: 4, sprite: sparkit(), note: 'Sparkit HD — VOLT generator Ohmlet' },
  { num: 7, sprite: dripkit(), note: 'Dripkit HD — COOLANT pump Ohmlet' },
];

for (const b of built) {
  const png = new PNG({ width: HD, height: HD });
  png.data.set(b.sprite.data);
  writeFileSync(join(OUT, `${b.num}_front_hd.png`), PNG.sync.write(png));
  writeFileSync(
    join(OUT, `${b.num}_front_hd.prompt.txt`),
    `OHMFRONT HD sprite "${b.num}_front_hd" (96x96)\nGenerated by tools/gen-sprites-hd.ts (npm run gen:sprites:hd)\nAuthor: Claude, original design (HD rework). Full color, AA outline.\n${b.note}\nColors: ${b.sprite.colorCount()}\n`,
  );
  console.log(`wrote ${b.num}_front_hd.png — ${b.sprite.colorCount()} colors`);
}
