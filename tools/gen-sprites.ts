/**
 * Authors the slice Ohm sprites with the spritekit (npm run gen:sprites).
 * Original designs — style homage to Gen 3 / Arc Raiders / Digimon energy,
 * never traced. Each sprite: ≤16 colors incl. transparency (enforced),
 * top-left light, outline + sel-out, contact shadow. Writes PNGs to
 * public/sprites/ohms/ with prompt sidecars and emits the availability
 * manifest the game preloads from.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { hexRGBA, ramp, Sprite, type RGBA } from './spritekit';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/sprites/ohms');
mkdirSync(OUT, { recursive: true });

const OUTLINE = hexRGBA('1a1410');
const SHADOW: RGBA = [22, 16, 14, 120];
const ACCENT_EMBER = hexRGBA('ffd27a');
const ACCENT_VOLT = hexRGBA('bdf0ff');
const ACCENT_COOL = hexRGBA('bfe6ff');
const ACCENT_HIVE = hexRGBA('7ad0c0');

interface Built {
  num: number;
  kind: 'front' | 'back' | 'over';
  sprite: Sprite;
  note: string;
}
const built: Built[] = [];
const add = (num: number, kind: Built['kind'], sprite: Sprite, note: string): void => {
  built.push({ num, kind, sprite, note });
};

// ---------------------------------------------------------------- starters
function charkit(): Sprite {
  const s = new Sprite(64, 64);
  const rust = ramp('a85420');
  const steel = ramp('6e6660');
  s.contactShadow(32, 58, 19, 5, SHADOW);
  s.roundedRect(13, 46, 38, 11, 5, steel, { dither: true }); // tread base
  for (let x = 16; x < 48; x += 4) s.line(x, 48, x, 55, OUTLINE); // tread links
  s.rect(39, 11, 4, 9, steel[1] ?? OUTLINE); // exhaust stack
  s.roundedRect(17, 17, 30, 31, 6, rust, { dither: true }); // furnace box
  s.rect(23, 25, 18, 14, hexRGBA('241410')); // grate recess
  for (let i = 0; i < 3; i++) {
    const yy = 27 + i * 4;
    s.line(25, yy, 38, yy, (i === 1 ? ramp('ff9020')[4] : ramp('d86018')[3]) ?? ACCENT_EMBER); // ember bars
  }
  s.set(28, 33, ACCENT_EMBER);
  s.set(35, 29, ACCENT_EMBER);
  s.outline(OUTLINE, rust[4]);
  return s;
}
function sparkit(): Sprite {
  const s = new Sprite(64, 64);
  const steel = ramp('8088a0');
  const copper = ramp('b87038');
  s.contactShadow(32, 58, 18, 5, SHADOW);
  s.roundedRect(18, 44, 28, 13, 5, steel, { dither: true }); // base
  s.roundedRect(16, 16, 32, 30, 7, steel, { dither: true }); // housing
  s.sphere(32, 30, 11, copper, { dither: true }); // coil drum
  for (let y = 22; y <= 38; y += 3) s.line(24, y, 40, y, OUTLINE); // coil windings
  s.line(22, 19, 26, 14, steel[1] ?? OUTLINE); // terminal
  s.line(42, 19, 38, 14, steel[1] ?? OUTLINE);
  s.set(26, 27, ACCENT_VOLT);
  s.set(38, 27, ACCENT_VOLT);
  s.line(31, 24, 33, 28, ACCENT_VOLT); // arc spark
  s.outline(OUTLINE, steel[4]);
  return s;
}
function dripkit(): Sprite {
  const s = new Sprite(64, 64);
  const steel = ramp('5a86a8');
  const glass = ramp('cfeaf2', { spread: 0.26 });
  s.contactShadow(32, 58, 18, 5, SHADOW);
  s.roundedRect(18, 45, 28, 12, 5, steel, { dither: true });
  s.roundedRect(17, 16, 30, 31, 8, steel, { dither: true }); // pump housing
  s.sphere(32, 28, 9, glass, { dither: true }); // gauge dome
  s.line(32, 28, 35, 23, OUTLINE); // gauge needle
  s.rect(31, 40, 2, 6, steel[1] ?? OUTLINE); // spout
  s.set(32, 47, ACCENT_COOL); // drip
  s.set(28, 30, ACCENT_COOL);
  s.set(36, 30, ACCENT_COOL);
  s.outline(OUTLINE, glass[4]);
  return s;
}

// ------------------------------------------------------------------- backs
function chassisBack(num: number, baseHex: string, accent: RGBA): Sprite {
  const s = new Sprite(64, 64);
  const body = ramp(baseHex);
  const steel = ramp('6e6660');
  s.contactShadow(32, 58, 18, 5, SHADOW);
  s.roundedRect(15, 45, 34, 12, 5, steel, { dither: true });
  s.roundedRect(17, 17, 30, 30, 7, body, { dither: true, light: [1, -1] }); // lit from back-left
  s.rect(22, 24, 20, 14, hexRGBA('241a14')); // vent panel
  for (let y = 26; y < 38; y += 3) s.line(24, y, 39, y, body[1] ?? OUTLINE);
  s.set(30, 21, accent);
  s.set(34, 21, accent);
  s.outline(OUTLINE, body[4]);
  void num;
  return s;
}

// ------------------------------------------------------------- field wilds
function toastlet(): Sprite {
  const s = new Sprite(64, 64);
  const chrome = ramp('aab0b8', { spread: 0.3 });
  s.contactShadow(32, 57, 19, 5, SHADOW);
  s.roundedRect(14, 20, 36, 26, 7, chrome, { dither: true }); // toaster body
  s.rect(20, 24, 8, 4, hexRGBA('20170f')); // slot 1
  s.rect(36, 24, 8, 4, hexRGBA('20170f')); // slot 2
  s.line(21, 25, 27, 25, ramp('ff9830')[4] ?? ACCENT_EMBER); // slot glow
  s.line(37, 25, 43, 25, ramp('ff9830')[4] ?? ACCENT_EMBER);
  s.ellipse(26, 36, 3, 2, hexRGBA('241a12')); // eyes
  s.ellipse(38, 36, 3, 2, hexRGBA('241a12'));
  s.set(25, 35, ACCENT_EMBER);
  s.set(37, 35, ACCENT_EMBER);
  s.rect(48, 28, 4, 8, chrome[1] ?? OUTLINE); // lever
  s.line(18, 46, 18, 50, OUTLINE); // feet
  s.line(46, 46, 46, 50, OUTLINE);
  s.outline(OUTLINE, chrome[4]);
  return s;
}
function wavelet(): Sprite {
  const s = new Sprite(64, 64);
  const body = ramp('8a7e74');
  const glass = ramp('3a5040', { spread: 0.3 });
  s.contactShadow(32, 57, 20, 5, SHADOW);
  s.roundedRect(12, 18, 40, 30, 5, body, { dither: true });
  s.roundedRect(16, 22, 24, 22, 3, glass, { dither: true }); // door window face
  s.ellipse(24, 31, 2, 2, ACCENT_EMBER); // eye glints in window
  s.ellipse(32, 31, 2, 2, ACCENT_EMBER);
  s.rect(43, 23, 6, 20, body[1] ?? OUTLINE); // control panel
  s.rect(44, 25, 4, 4, ACCENT_EMBER); // timer dial
  for (let y = 31; y < 42; y += 2) s.line(44, y, 47, y, OUTLINE); // buttons
  s.line(16, 48, 16, 51, OUTLINE);
  s.line(48, 48, 48, 51, OUTLINE);
  s.outline(OUTLINE, body[4]);
  return s;
}
function filaglow(): Sprite {
  const s = new Sprite(64, 64);
  const glass = ramp('f6e08a', { spread: 0.3 });
  const brass = ramp('9a8048');
  s.contactShadow(32, 57, 13, 4, SHADOW);
  s.sphere(32, 26, 15, glass, { dither: true }); // bulb
  s.line(29, 22, 31, 30, ramp('ff8a30')[3] ?? ACCENT_EMBER); // filament
  s.line(31, 30, 35, 22, ramp('ff8a30')[3] ?? ACCENT_EMBER);
  s.set(27, 24, hexRGBA('241a10')); // eyes
  s.set(37, 24, hexRGBA('241a10'));
  s.roundedRect(25, 38, 14, 12, 3, brass, { dither: true }); // screw base
  for (let y = 40; y < 49; y += 2) s.line(26, y, 38, y, OUTLINE); // threads
  s.outline(OUTLINE, glass[4]);
  return s;
}
function vacuette(): Sprite {
  const s = new Sprite(64, 64);
  const body = ramp('9a5040');
  const steel = ramp('70686a');
  s.contactShadow(32, 57, 14, 4, SHADOW);
  s.roundedRect(24, 14, 18, 34, 6, body, { dither: true }); // upright bag body
  s.sphere(33, 24, 6, ramp('cfd6dc'), { dither: true }); // dust window
  s.set(31, 23, hexRGBA('20170f'));
  s.set(35, 23, hexRGBA('20170f'));
  s.roundedRect(22, 44, 22, 8, 4, steel, { dither: true }); // base/wheels
  s.line(42, 20, 50, 40, steel[1] ?? OUTLINE); // hose tail
  s.line(50, 40, 48, 48, steel[1] ?? OUTLINE);
  s.outline(OUTLINE, body[4]);
  return s;
}
function fanlet(): Sprite {
  const s = new Sprite(64, 64);
  const blade = ramp('8a8478');
  const hub = ramp('b87038');
  s.contactShadow(32, 50, 18, 4, SHADOW);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    const ex = 32 + Math.cos(a) * 17;
    const ey = 30 + Math.sin(a) * 12;
    s.ellipse((32 + ex) / 2, (30 + ey) / 2, 7, 3, blade[2] ?? OUTLINE); // blades
  }
  s.sphere(32, 30, 7, hub, { dither: true }); // motor hub
  s.set(30, 29, hexRGBA('20170f'));
  s.set(34, 29, hexRGBA('20170f'));
  s.line(32, 14, 32, 18, OUTLINE); // pull chain
  s.set(32, 12, hub[3] ?? ACCENT_EMBER);
  s.outline(OUTLINE, blade[4]);
  return s;
}
function beeplet(): Sprite {
  const s = new Sprite(64, 64);
  const body = ramp('d4cfc4', { spread: 0.24 });
  s.contactShadow(32, 49, 13, 3, SHADOW);
  s.sphere(32, 28, 15, body, { dither: true }); // detector disc
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    s.line(32, 28, Math.round(32 + Math.cos(a) * 12), Math.round(28 + Math.sin(a) * 12), body[1] ?? OUTLINE); // vent slots
  }
  s.ellipse(32, 28, 6, 6, body[3] ?? OUTLINE); // raised center
  s.set(38, 22, hexRGBA('c03028')); // blinking LED
  s.set(37, 22, hexRGBA('ff8060'));
  s.ellipse(29, 27, 1, 2, hexRGBA('241a14')); // eyes
  s.ellipse(35, 27, 1, 2, hexRGBA('241a14'));
  s.ellipse(32, 32, 3, 1, hexRGBA('241a14')); // test-button mouth
  s.outline(OUTLINE, body[4]);
  return s;
}
function vendlet(): Sprite {
  const s = new Sprite(64, 64);
  const body = ramp('9a4030');
  const glass = ramp('2e4636', { spread: 0.3 });
  s.contactShadow(32, 58, 16, 5, SHADOW);
  s.roundedRect(20, 12, 24, 38, 4, body, { dither: true }); // machine
  s.roundedRect(23, 16, 14, 26, 2, glass, { dither: true }); // can window chest
  for (let y = 18; y < 40; y += 6) for (let x = 25; x < 36; x += 5) s.ellipse(x, y, 1, 2, ACCENT_EMBER); // cans
  s.rect(39, 18, 4, 10, body[1] ?? OUTLINE); // coin panel
  s.set(40, 20, ACCENT_VOLT); // coin slot brow
  s.ellipse(28, 45, 2, 1, hexRGBA('20140e')); // eyes low
  s.ellipse(34, 45, 2, 1, hexRGBA('20140e'));
  s.outline(OUTLINE, body[4]);
  return s;
}
function staplejaw(): Sprite {
  const s = new Sprite(64, 64);
  const body = ramp('8a8a92', { spread: 0.3 });
  s.contactShadow(32, 50, 18, 4, SHADOW);
  s.roundedRect(16, 22, 34, 9, 4, body, { dither: true, light: [-1, -1] }); // upper jaw
  s.roundedRect(16, 33, 34, 8, 4, body, { dither: true }); // lower jaw
  for (let x = 19; x < 47; x += 3) s.line(x, 31, x, 33, hexRGBA('e8e8f0')); // staple teeth
  s.sphere(46, 26, 4, ramp('b03028'), { dither: true }); // hinge eye (red)
  s.set(45, 25, ACCENT_EMBER);
  s.outline(OUTLINE, body[4]);
  return s;
}
function tumblet(): Sprite {
  const s = new Sprite(64, 64);
  const wire = ramp('7a6848');
  s.contactShadow(32, 52, 16, 4, SHADOW);
  s.sphere(32, 30, 16, ramp('3a3424'), { dither: true, ambient: 0.4 }); // dark mass core
  // thorny wire strands
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const x0 = 32 + Math.cos(a) * 6;
    const y0 = 30 + Math.sin(a) * 6;
    const x1 = 32 + Math.cos(a + 0.6) * 16;
    const y1 = 30 + Math.sin(a + 0.6) * 16;
    s.line(Math.round(x0), Math.round(y0), Math.round(x1), Math.round(y1), wire[2] ?? OUTLINE);
  }
  s.set(30, 30, ACCENT_HIVE); // cold LED deep inside (hive accent)
  s.set(34, 31, ACCENT_HIVE);
  s.outline(OUTLINE, wire[4]);
  return s;
}

// --------------------------------------------------------- overworld micro
function playerMicro(): Sprite {
  const s = new Sprite(16, 16);
  const coat = ramp('3a6ea8');
  const skin = ramp('d8a070');
  s.contactShadow(8, 14, 5, 2, SHADOW);
  s.roundedRect(5, 7, 6, 6, 2, coat, { dither: false }); // torso
  s.sphere(8, 4, 3, skin, { dither: false }); // head
  s.rect(6, 2, 5, 2, hexRGBA('2a2018')); // hair/cap
  s.set(7, 4, OUTLINE);
  s.set(9, 4, OUTLINE);
  s.line(6, 13, 6, 15, hexRGBA('2a2018')); // legs
  s.line(10, 13, 10, 15, hexRGBA('2a2018'));
  s.outline(OUTLINE);
  return s;
}

// ------------------------------------------------------------------- build
add(1, 'front', charkit(), 'Charkit, THERM furnace Ohmlet on treads');
add(4, 'front', sparkit(), 'Sparkit, VOLT generator Ohmlet');
add(7, 'front', dripkit(), 'Dripkit, COOLANT pump Ohmlet');
add(1, 'back', chassisBack(1, 'a85420', ACCENT_EMBER), 'Charkit rear');
add(4, 'back', chassisBack(4, '8088a0', ACCENT_VOLT), 'Sparkit rear');
add(7, 'back', chassisBack(7, '5a86a8', ACCENT_COOL), 'Dripkit rear');
add(10, 'front', toastlet(), 'Toastlet, chrome toaster');
add(12, 'front', wavelet(), 'Wavelet, microwave');
add(15, 'front', filaglow(), 'Filaglow, light bulb (LUMEN)');
add(18, 'front', beeplet(), 'Beeplet, smoke detector');
add(19, 'front', vacuette(), 'Vacuette, vacuum cleaner');
add(21, 'front', fanlet(), 'Fanlet, ceiling fan');
add(30, 'front', vendlet(), 'Vendlet, vending machine');
add(32, 'front', staplejaw(), 'Staplejaw, stapler');
add(41, 'front', tumblet(), 'Tumblet, virus-taken tumbleweed (VERDANT)');
add(0, 'over', playerMicro(), 'Player overworld sprite');

// --------------------------------------------------------- write & validate
let failed = 0;
const manifest: Record<string, number[]> = { front: [], back: [], over: [] };
for (const b of built) {
  const colors = b.sprite.colorCount();
  const name = b.kind === 'over' && b.num === 0 ? 'player_over' : `${b.num}_${b.kind}`;
  if (colors > 16) {
    console.error(`FAIL ${name}: ${colors} colors (>16)`);
    failed += 1;
  } else {
    console.log(`ok ${name}: ${colors} colors`);
  }
  const png = new PNG({ width: b.sprite.w, height: b.sprite.h });
  png.data.set(b.sprite.data);
  writeFileSync(join(OUT, `${name}.png`), PNG.sync.write(png));
  writeFileSync(
    join(OUT, `${name}.prompt.txt`),
    `OHMFRONT sprite "${name}"\nGenerated by tools/gen-sprites.ts (npm run gen:sprites)\nAuthor: Claude, original design (style homage; not traced)\nRules: docs/style-guide.md — Gen 3 GBA, <=16 colors, top-left light,\nhue-shifted ramps, Bayer dither, sel-out outline, contact shadow.\n${b.note}\nColors: ${colors}/16\n`,
  );
  if (b.num > 0) manifest[b.kind]!.push(b.num);
}
manifest.front!.sort((a, z) => a - z);
manifest.back!.sort((a, z) => a - z);

writeFileSync(
  join(ROOT, 'src/data/sprite-manifest.ts'),
  `// AUTO-GENERATED by tools/gen-sprites.ts — do not edit by hand.\n` +
    `/** Species numbers with a generated battle front sprite. */\n` +
    `export const FRONT_SPRITES: readonly number[] = ${JSON.stringify(manifest.front)};\n` +
    `/** Species numbers with a generated battle back sprite. */\n` +
    `export const BACK_SPRITES: readonly number[] = ${JSON.stringify(manifest.back)};\n` +
    `export const hasFront = (n: number): boolean => FRONT_SPRITES.includes(n);\n` +
    `export const hasBack = (n: number): boolean => BACK_SPRITES.includes(n);\n`,
);

console.log(`\n${built.length} sprites written to public/sprites/ohms/`);
if (failed > 0) {
  console.error(`${failed} over the 16-color budget.`);
  process.exit(1);
}
