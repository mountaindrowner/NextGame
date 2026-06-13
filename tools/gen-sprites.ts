/**
 * Authors the slice Ohm sprites with the spritekit (npm run gen:sprites).
 * Original designs — style homage to Gen 3 / Arc Raiders / Digimon energy,
 * never traced. Each sprite: ≤16 colors incl. transparency (enforced),
 * top-left light, outline + sel-out, contact shadow, expressive face.
 *
 * Design language for evolution lines: stage 1 is a clean, almost-cute base;
 * stage 2 grows limbs/vents; stage 3 sprouts appendages and "weapons"
 * (claws, spikes, cannons, crowns) and a fiercer face.
 *
 * Covers the first 25 Ohms encountered + their full lines (species 1–26),
 * plus a few Field bonuses (30/32/41). Writes PNGs to public/sprites/ohms/
 * with prompt sidecars and emits the availability manifest the game preloads.
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
const WHITE = hexRGBA('f4f0e4');
const DARK = hexRGBA('1c160f');
const EMBER = hexRGBA('ffd27a');
const EMBER_HOT = hexRGBA('ff8a30');
const VOLT = hexRGBA('bdf0ff');
const COOL = hexRGBA('bfe6ff');
const HIVE = hexRGBA('7ad0c0');

// ---- shared feature helpers ---------------------------------------------

/** Expressive eye. glow = mechanical lens (glowing iris); else a creature
 * eye (sclera + dark pupil + glint) for that Digimon-ish life. */
function eye(s: Sprite, cx: number, cy: number, r: number, glow?: RGBA): void {
  s.ellipse(cx, cy, r + 0.4, r + 0.4, DARK); // socket
  if (glow) {
    s.ellipse(cx, cy, r - 0.3, r - 0.3, glow);
    s.set(Math.round(cx), Math.round(cy), WHITE);
  } else {
    s.ellipse(cx, cy, r - 0.3, r - 0.3, WHITE); // sclera
    s.ellipse(cx, cy, Math.max(1, r - 1.4), Math.max(1, r - 1.4), DARK); // pupil
    s.set(Math.round(cx - r / 2), Math.round(cy - r / 2), WHITE); // glint
  }
}

/** Angry brow stroke above an eye (expression). */
function brow(s: Sprite, x0: number, y0: number, x1: number, y1: number): void {
  s.line(x0, y0, x1, y1, OUTLINE);
  s.line(x0, y0 + 1, x1, y1 + 1, OUTLINE);
}

/** Tapered spike/claw/icicle from base center to tip. */
function spike(s: Sprite, bx: number, by: number, tx: number, ty: number, half: number, color: RGBA): void {
  const steps = Math.max(2, Math.round(Math.hypot(tx - bx, ty - by)));
  let nx = -(ty - by);
  let ny = tx - bx;
  const nl = Math.hypot(nx, ny) || 1;
  nx /= nl;
  ny /= nl;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = bx + (tx - bx) * t;
    const cy = by + (ty - by) * t;
    const w = half * (1 - t);
    for (let k = -w; k <= w; k += 1) s.set(Math.round(cx + nx * k), Math.round(cy + ny * k), color);
  }
}

/** A toothy grille / maw. */
function maw(s: Sprite, x0: number, y0: number, w: number, h: number, glow: RGBA): void {
  s.rect(x0, y0, w, h, DARK);
  for (let x = x0 + 1; x < x0 + w; x += 3) s.line(x, y0, x, y0 + h - 1, glow);
}

// ---- palettes (reused across a line for cohesion) -----------------------
const RUST = ramp('a85420');
const FURNACE_DARK = ramp('6a3418');
const STEEL = ramp('6e6660');
const STEEL_BLUE = ramp('8088a0');
const COPPER = ramp('b87038');
const PUMP = ramp('5a86a8');
const GLASS_C = ramp('cfeaf2', { spread: 0.26 });
const GLASS_W = ramp('f6e08a', { spread: 0.3 });
const BRASS = ramp('9a8048');
const CHROME = ramp('aab0b8', { spread: 0.3 });
const APPLIANCE = ramp('8a7e74');
const ICE = ramp('bcdcea', { spread: 0.3 });
const VEND = ramp('9a4030');

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
const S = (): Sprite => new Sprite(64, 64);

// ============================================================ CHARKIT line
function charkit(): Sprite {
  const s = S();
  s.contactShadow(32, 58, 17, 5, SHADOW);
  s.roundedRect(15, 46, 34, 11, 5, STEEL, { dither: true }); // treads
  for (let x = 18; x < 46; x += 4) s.line(x, 48, x, 55, OUTLINE);
  s.rect(40, 12, 4, 9, STEEL[1] ?? OUTLINE); // little stack
  s.roundedRect(18, 18, 28, 30, 6, RUST, { dither: true }); // furnace box
  maw(s, 24, 36, 16, 6, EMBER_HOT); // ember grate mouth
  eye(s, 27, 28, 3, EMBER);
  eye(s, 37, 28, 3, EMBER);
  s.outline(OUTLINE, RUST[4]);
  return s;
}
function smolderig(): Sprite {
  const s = S();
  s.contactShadow(32, 59, 21, 5, SHADOW);
  s.roundedRect(12, 47, 40, 12, 5, FURNACE_DARK, { dither: true });
  for (let x = 16; x < 48; x += 4) s.line(x, 49, x, 57, OUTLINE);
  // twin boiler stacks (new appendages)
  s.rect(20, 8, 5, 12, FURNACE_DARK[2] ?? OUTLINE);
  s.rect(39, 8, 5, 12, FURNACE_DARK[2] ?? OUTLINE);
  s.set(22, 8, EMBER_HOT);
  s.set(41, 8, EMBER_HOT);
  s.roundedRect(14, 18, 36, 32, 7, RUST, { dither: true }); // bigger body
  s.roundedRect(18, 22, 28, 12, 3, FURNACE_DARK, { dither: true }); // furnace door
  maw(s, 22, 38, 20, 7, EMBER_HOT);
  eye(s, 25, 27, 3, EMBER);
  eye(s, 39, 27, 3, EMBER);
  brow(s, 22, 23, 28, 25);
  brow(s, 42, 25, 36, 23);
  s.outline(OUTLINE, RUST[4]);
  return s;
}
function pyrofurnax(): Sprite {
  const s = S();
  s.contactShadow(32, 60, 24, 5, SHADOW);
  s.roundedRect(10, 48, 44, 12, 5, FURNACE_DARK, { dither: true });
  for (let x = 14; x < 50; x += 4) s.line(x, 50, x, 58, OUTLINE);
  // chimney horns (weapons)
  spike(s, 18, 14, 13, 2, 3, FURNACE_DARK[2] ?? OUTLINE);
  spike(s, 46, 14, 51, 2, 3, FURNACE_DARK[2] ?? OUTLINE);
  s.set(13, 3, EMBER_HOT);
  s.set(51, 3, EMBER_HOT);
  s.roundedRect(12, 16, 40, 36, 8, RUST, { dither: true }); // foundry body
  // molten claw arms
  spike(s, 12, 30, 4, 40, 3, RUST[2] ?? OUTLINE);
  spike(s, 52, 30, 60, 40, 3, RUST[2] ?? OUTLINE);
  s.set(4, 40, EMBER_HOT);
  s.set(60, 40, EMBER_HOT);
  s.roundedRect(17, 22, 30, 14, 3, FURNACE_DARK, { dither: true }); // grand furnace door
  maw(s, 20, 38, 24, 9, EMBER_HOT); // blazing maw with teeth
  eye(s, 24, 27, 4, EMBER);
  eye(s, 40, 27, 4, EMBER);
  brow(s, 20, 22, 29, 25);
  brow(s, 44, 25, 35, 22);
  s.outline(OUTLINE, RUST[4]);
  return s;
}

// ============================================================ SPARKIT line
function sparkit(): Sprite {
  const s = S();
  s.contactShadow(32, 58, 17, 5, SHADOW);
  s.roundedRect(18, 44, 28, 13, 5, STEEL_BLUE, { dither: true });
  s.roundedRect(16, 16, 32, 30, 7, STEEL_BLUE, { dither: true });
  s.sphere(32, 30, 10, COPPER, { dither: true }); // coil drum
  for (let y = 23; y <= 37; y += 3) s.line(24, y, 40, y, OUTLINE);
  s.line(22, 19, 26, 14, STEEL_BLUE[1] ?? OUTLINE);
  s.line(42, 19, 38, 14, STEEL_BLUE[1] ?? OUTLINE);
  eye(s, 27, 26, 3, VOLT);
  eye(s, 37, 26, 3, VOLT);
  s.outline(OUTLINE, STEEL_BLUE[4]);
  return s;
}
function amperig(): Sprite {
  const s = S();
  s.contactShadow(32, 59, 21, 5, SHADOW);
  s.roundedRect(14, 45, 36, 13, 5, STEEL_BLUE, { dither: true });
  // busbar shoulders + terminal prongs (appendages)
  s.roundedRect(8, 24, 8, 8, 2, STEEL_BLUE, { dither: true });
  s.roundedRect(48, 24, 8, 8, 2, STEEL_BLUE, { dither: true });
  spike(s, 11, 24, 8, 14, 2, VOLT);
  spike(s, 53, 24, 56, 14, 2, VOLT);
  s.roundedRect(15, 16, 34, 32, 7, STEEL_BLUE, { dither: true });
  s.sphere(32, 30, 12, COPPER, { dither: true });
  for (let y = 21; y <= 39; y += 3) s.line(22, y, 42, y, OUTLINE);
  eye(s, 26, 26, 3, VOLT);
  eye(s, 38, 26, 3, VOLT);
  brow(s, 23, 22, 29, 24);
  brow(s, 41, 24, 35, 22);
  s.line(30, 33, 34, 33, VOLT); // grin spark
  s.outline(OUTLINE, STEEL_BLUE[4]);
  return s;
}
function generatlas(): Sprite {
  const s = S();
  s.contactShadow(32, 60, 24, 5, SHADOW);
  s.roundedRect(12, 47, 40, 13, 5, STEEL_BLUE, { dither: true });
  // pylon shoulder masts with arc cannons (weapons)
  s.roundedRect(6, 18, 9, 14, 2, STEEL_BLUE, { dither: true });
  s.roundedRect(49, 18, 9, 14, 2, STEEL_BLUE, { dither: true });
  spike(s, 10, 18, 8, 6, 3, VOLT);
  spike(s, 53, 18, 55, 6, 3, VOLT);
  s.line(8, 8, 12, 12, VOLT); // arcs
  s.line(56, 8, 52, 12, VOLT);
  s.roundedRect(14, 16, 36, 36, 8, STEEL_BLUE, { dither: true });
  s.sphere(32, 32, 15, COPPER, { dither: true }); // turbine torso
  for (let y = 19; y <= 45; y += 3) s.line(19, y, 45, y, OUTLINE);
  s.ellipse(32, 26, 6, 6, DARK); // turbine eye socket
  eye(s, 32, 26, 4, VOLT);
  brow(s, 22, 18, 30, 22);
  brow(s, 42, 18, 34, 22);
  s.outline(OUTLINE, STEEL_BLUE[4]);
  return s;
}

// ============================================================ DRIPKIT line
function dripkit(): Sprite {
  const s = S();
  s.contactShadow(32, 58, 17, 5, SHADOW);
  s.roundedRect(18, 45, 28, 12, 5, PUMP, { dither: true });
  s.roundedRect(17, 16, 30, 31, 8, PUMP, { dither: true });
  s.sphere(32, 26, 9, GLASS_C, { dither: true }); // gauge dome
  s.line(32, 26, 35, 21, OUTLINE);
  eye(s, 27, 31, 2.5, COOL);
  eye(s, 37, 31, 2.5, COOL);
  s.rect(31, 41, 2, 5, PUMP[1] ?? OUTLINE);
  s.set(32, 47, COOL); // drip
  s.outline(OUTLINE, GLASS_C[4]);
  return s;
}
function flowrig(): Sprite {
  const s = S();
  s.contactShadow(32, 59, 21, 5, SHADOW);
  s.roundedRect(14, 46, 36, 12, 5, PUMP, { dither: true });
  // manifold arms (appendages)
  s.roundedRect(7, 28, 9, 6, 3, PUMP, { dither: true });
  s.roundedRect(48, 28, 9, 6, 3, PUMP, { dither: true });
  s.set(8, 31, COOL);
  s.set(56, 31, COOL);
  s.roundedRect(15, 16, 34, 32, 8, PUMP, { dither: true });
  s.sphere(32, 26, 11, GLASS_C, { dither: true }); // big gauge chest
  s.line(32, 26, 36, 20, OUTLINE);
  eye(s, 26, 24, 3, COOL);
  eye(s, 38, 24, 3, COOL);
  s.ellipse(32, 40, 5, 2, DARK); // calm mouth
  s.rect(30, 46, 4, 4, PUMP[1] ?? OUTLINE);
  s.outline(OUTLINE, GLASS_C[4]);
  return s;
}
function aquaducton(): Sprite {
  const s = S();
  s.contactShadow(32, 60, 24, 5, SHADOW);
  s.roundedRect(12, 48, 40, 12, 5, PUMP, { dither: true });
  // aqueduct arch crown (appendage)
  s.roundedRect(14, 8, 36, 8, 4, PUMP, { dither: true });
  for (let x = 18; x < 48; x += 6) s.rect(x, 12, 3, 4, DARK); // arch openings
  // water-spout cannons (weapons)
  s.roundedRect(6, 26, 10, 7, 3, PUMP, { dither: true });
  s.roundedRect(48, 26, 10, 7, 3, PUMP, { dither: true });
  spike(s, 7, 29, 1, 27, 2, COOL);
  spike(s, 57, 29, 63, 27, 2, COOL);
  s.roundedRect(14, 16, 36, 36, 8, PUMP, { dither: true });
  s.sphere(32, 30, 13, GLASS_C, { dither: true });
  s.line(32, 30, 37, 23, OUTLINE);
  eye(s, 25, 27, 3, COOL);
  eye(s, 39, 27, 3, COOL);
  s.ellipse(32, 44, 6, 2, DARK);
  s.outline(OUTLINE, GLASS_C[4]);
  return s;
}

// ============================================================ TOASTLET line
function toastlet(): Sprite {
  const s = S();
  s.contactShadow(32, 57, 18, 5, SHADOW);
  s.roundedRect(14, 20, 36, 26, 7, CHROME, { dither: true });
  s.rect(20, 24, 8, 4, DARK);
  s.rect(36, 24, 8, 4, DARK);
  s.line(21, 25, 27, 25, EMBER_HOT);
  s.line(37, 25, 43, 25, EMBER_HOT);
  eye(s, 26, 36, 3, EMBER);
  eye(s, 38, 36, 3, EMBER);
  s.rect(48, 28, 4, 8, CHROME[1] ?? OUTLINE); // lever
  s.line(18, 46, 18, 50, OUTLINE);
  s.line(46, 46, 46, 50, OUTLINE);
  s.outline(OUTLINE, CHROME[4]);
  return s;
}
function crumbustion(): Sprite {
  const s = S();
  s.contactShadow(32, 58, 21, 5, SHADOW);
  // flame tufts erupting from the slots (weapons)
  spike(s, 22, 18, 20, 6, 2.5, EMBER_HOT);
  spike(s, 28, 18, 30, 4, 2.5, EMBER);
  spike(s, 40, 18, 42, 6, 2.5, EMBER_HOT);
  s.roundedRect(12, 20, 40, 30, 7, CHROME, { dither: true });
  s.rect(18, 24, 12, 5, DARK); // wide ejector slots
  s.rect(34, 24, 12, 5, DARK);
  s.line(19, 26, 29, 26, EMBER_HOT);
  s.line(35, 26, 45, 26, EMBER_HOT);
  eye(s, 25, 37, 3.5, EMBER_HOT);
  eye(s, 39, 37, 3.5, EMBER_HOT);
  brow(s, 20, 32, 29, 35); // furious brow
  brow(s, 44, 32, 35, 35);
  maw(s, 26, 43, 12, 5, EMBER_HOT);
  s.line(14, 50, 14, 54, OUTLINE); // splayed feet
  s.line(50, 50, 50, 54, OUTLINE);
  s.outline(OUTLINE, CHROME[4]);
  return s;
}

// ============================================================ WAVELET line
function wavelet(): Sprite {
  const s = S();
  s.contactShadow(32, 57, 20, 5, SHADOW);
  s.roundedRect(12, 18, 40, 30, 5, APPLIANCE, { dither: true });
  s.roundedRect(16, 22, 24, 22, 3, ramp('3a5040', { spread: 0.3 }), { dither: true });
  eye(s, 24, 31, 2.5, EMBER);
  eye(s, 32, 31, 2.5, EMBER);
  s.ellipse(28, 37, 3, 1, DARK); // little mouth in the window
  s.rect(43, 23, 6, 20, APPLIANCE[1] ?? OUTLINE); // control panel
  s.rect(44, 25, 4, 4, EMBER);
  for (let y = 31; y < 42; y += 2) s.line(44, y, 47, y, OUTLINE);
  s.line(16, 48, 16, 51, OUTLINE);
  s.line(48, 48, 48, 51, OUTLINE);
  s.outline(OUTLINE, APPLIANCE[4]);
  return s;
}
function nukenook(): Sprite {
  const s = S();
  s.contactShadow(32, 59, 22, 5, SHADOW);
  s.roundedRect(12, 14, 40, 36, 5, APPLIANCE, { dither: true }); // cabinet body
  // stubby cabinet arms (appendages)
  s.roundedRect(7, 28, 7, 6, 2, APPLIANCE, { dither: true });
  s.roundedRect(50, 28, 7, 6, 2, APPLIANCE, { dither: true });
  s.roundedRect(15, 18, 26, 20, 3, ramp('30463a', { spread: 0.3 }), { dither: true }); // microwave heart
  eye(s, 23, 26, 3, EMBER);
  eye(s, 33, 26, 3, EMBER);
  maw(s, 20, 32, 16, 4, EMBER_HOT);
  s.rect(43, 18, 7, 24, APPLIANCE[1] ?? OUTLINE); // panel column
  for (let y = 20; y < 40; y += 3) s.line(44, y, 48, y, OUTLINE);
  s.rect(44, 20, 4, 4, EMBER);
  s.line(16, 50, 16, 54, OUTLINE);
  s.line(48, 50, 48, 54, OUTLINE);
  s.outline(OUTLINE, APPLIANCE[4]);
  return s;
}
function gourmagnet(): Sprite {
  const s = S();
  s.contactShadow(32, 60, 25, 5, SHADOW);
  // burner crown (weapons: four lit rings)
  for (let i = 0; i < 4; i++) {
    const x = 16 + i * 11;
    s.ellipse(x, 10, 4, 4, DARK);
    s.ellipse(x, 10, 2, 2, EMBER_HOT);
  }
  s.roundedRect(10, 14, 44, 8, 3, APPLIANCE, { dither: true }); // hood brow
  s.roundedRect(12, 20, 40, 32, 5, APPLIANCE, { dither: true }); // range body
  s.roundedRect(16, 24, 32, 16, 3, ramp('2c4034', { spread: 0.3 }), { dither: true }); // oven window
  eye(s, 24, 30, 3.5, EMBER_HOT);
  eye(s, 40, 30, 3.5, EMBER_HOT);
  brow(s, 19, 25, 28, 28);
  brow(s, 45, 25, 36, 28);
  maw(s, 20, 42, 24, 7, EMBER_HOT); // oven maw with rack teeth
  s.line(16, 52, 16, 56, OUTLINE);
  s.line(48, 52, 48, 56, OUTLINE);
  s.outline(OUTLINE, APPLIANCE[4]);
  return s;
}

// ============================================================ FILAGLOW line
function filaglow(): Sprite {
  const s = S();
  s.contactShadow(32, 57, 13, 4, SHADOW);
  s.sphere(32, 26, 15, GLASS_W, { dither: true }); // bulb
  s.line(29, 22, 31, 30, EMBER_HOT); // filament
  s.line(31, 30, 35, 22, EMBER_HOT);
  eye(s, 27, 24, 2.5);
  eye(s, 37, 24, 2.5);
  s.ellipse(32, 31, 3, 1, DARK); // smile
  s.roundedRect(25, 38, 14, 12, 3, BRASS, { dither: true }); // screw base
  for (let y = 40; y < 49; y += 2) s.line(26, y, 38, y, OUTLINE);
  s.outline(OUTLINE, GLASS_W[4]);
  return s;
}
function lumenaire(): Sprite {
  const s = S();
  s.contactShadow(32, 59, 20, 4, SHADOW);
  // three-bulb candelabra arms (appendages)
  s.line(20, 30, 10, 22, BRASS[2] ?? OUTLINE);
  s.line(44, 30, 54, 22, BRASS[2] ?? OUTLINE);
  s.sphere(9, 20, 5, GLASS_W, { dither: true });
  s.sphere(55, 20, 5, GLASS_W, { dither: true });
  s.set(9, 20, EMBER);
  s.set(55, 20, EMBER);
  s.sphere(32, 26, 14, GLASS_W, { dither: true }); // main bulb head
  s.line(29, 22, 31, 30, EMBER_HOT);
  s.line(31, 30, 35, 22, EMBER_HOT);
  eye(s, 27, 24, 3);
  eye(s, 37, 24, 3);
  s.ellipse(32, 31, 3, 1, DARK);
  s.roundedRect(22, 38, 20, 14, 3, BRASS, { dither: true }); // fixture base
  for (let y = 40; y < 51; y += 2) s.line(23, y, 41, y, OUTLINE);
  s.outline(OUTLINE, GLASS_W[4]);
  return s;
}
function chandelux(): Sprite {
  const s = S();
  s.contactShadow(32, 60, 24, 5, SHADOW);
  s.roundedRect(20, 8, 24, 6, 2, BRASS, { dither: true }); // crown rail
  // candelabra tiers with lit sockets + glass blade drips (weapons)
  for (let i = 0; i < 5; i++) {
    const x = 14 + i * 9;
    s.line(x, 16, x, 10, BRASS[2] ?? OUTLINE);
    s.ellipse(x, 9, 2, 3, GLASS_W[3] ?? EMBER);
    s.set(x, 8, EMBER_HOT);
    spike(s, x, 40, x, 50, 1.5, GLASS_C[3] ?? COOL); // crystal drips
  }
  s.sphere(32, 28, 15, GLASS_W, { dither: true }); // grand body
  s.line(28, 24, 30, 33, EMBER_HOT);
  s.line(30, 33, 36, 24, EMBER_HOT);
  eye(s, 26, 26, 3.5);
  eye(s, 38, 26, 3.5);
  brow(s, 22, 22, 30, 24);
  brow(s, 42, 22, 34, 24);
  s.ellipse(32, 34, 4, 2, DARK);
  s.roundedRect(24, 40, 16, 8, 3, BRASS, { dither: true });
  s.outline(OUTLINE, GLASS_W[4]);
  return s;
}

// ============================================================ singles & 2s
function beeplet(): Sprite {
  const s = S();
  const body = ramp('d4cfc4', { spread: 0.24 });
  s.contactShadow(32, 49, 13, 3, SHADOW);
  s.sphere(32, 28, 15, body, { dither: true });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    s.line(32, 28, Math.round(32 + Math.cos(a) * 12), Math.round(28 + Math.sin(a) * 12), body[1] ?? OUTLINE);
  }
  s.ellipse(32, 28, 6, 6, body[3] ?? OUTLINE);
  s.set(38, 22, hexRGBA('c03028'));
  s.set(37, 22, hexRGBA('ff8060'));
  eye(s, 29, 27, 2);
  eye(s, 35, 27, 2);
  s.ellipse(32, 32, 3, 1, DARK);
  s.outline(OUTLINE, body[4]);
  return s;
}
function vacuette(): Sprite {
  const s = S();
  const body = ramp('9a5040');
  s.contactShadow(32, 57, 14, 4, SHADOW);
  s.roundedRect(24, 14, 18, 34, 6, body, { dither: true });
  s.sphere(33, 24, 6, ramp('cfd6dc'), { dither: true });
  eye(s, 31, 23, 2);
  eye(s, 36, 23, 2);
  s.roundedRect(22, 44, 22, 8, 4, STEEL, { dither: true });
  s.line(42, 20, 50, 40, STEEL[1] ?? OUTLINE); // hose
  s.line(50, 40, 48, 48, STEEL[1] ?? OUTLINE);
  s.outline(OUTLINE, body[4]);
  return s;
}
function dustdevil(): Sprite {
  const s = S();
  const body = ramp('9a5040');
  s.contactShadow(32, 58, 18, 5, SHADOW);
  const dust = hexRGBA('c8b890');
  // dust spiral base (appendage)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const r = 8 + (i % 3) * 3;
    s.set(32 + Math.cos(a) * r, 50 + Math.sin(a) * 2.2, dust);
  }
  s.roundedRect(22, 12, 20, 32, 7, body, { dither: true });
  // raised hose arms
  s.line(22, 20, 12, 12, body[1] ?? OUTLINE);
  s.line(42, 20, 52, 12, body[1] ?? OUTLINE);
  s.set(12, 12, dust);
  s.set(52, 12, dust);
  s.sphere(32, 22, 7, ramp('cfd6dc'), { dither: true });
  eye(s, 29, 21, 2.5);
  eye(s, 35, 21, 2.5);
  brow(s, 26, 17, 31, 19);
  brow(s, 38, 17, 33, 19);
  s.roundedRect(24, 40, 16, 6, 3, body, { dither: true });
  s.outline(OUTLINE, body[4]);
  return s;
}
function fanlet(): Sprite {
  const s = S();
  const blade = ramp('8a8478');
  const hub = ramp('b87038');
  s.contactShadow(32, 50, 18, 4, SHADOW);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.4;
    s.ellipse(32 + (Math.cos(a) * 17) / 2 + 8 * Math.cos(a), 30 + (Math.sin(a) * 12) / 2 + 6 * Math.sin(a), 7, 3, blade[2] ?? OUTLINE);
  }
  s.sphere(32, 30, 7, hub, { dither: true });
  eye(s, 30, 29, 2);
  eye(s, 34, 29, 2);
  s.line(32, 14, 32, 18, OUTLINE);
  s.set(32, 12, hub[3] ?? EMBER);
  s.outline(OUTLINE, blade[4]);
  return s;
}
function oscillord(): Sprite {
  const s = S();
  const blade = ramp('8a8478');
  const hub = ramp('b87038');
  s.contactShadow(32, 54, 20, 4, SHADOW);
  // five-blade crown (weapons)
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * 0.55;
    spike(s, 32, 30, Math.round(32 + Math.cos(a) * 22), Math.round(30 + Math.sin(a) * 20), 3, blade[2] ?? OUTLINE);
  }
  // oscillating side arms
  s.line(20, 34, 10, 40, STEEL[1] ?? OUTLINE);
  s.line(44, 34, 54, 40, STEEL[1] ?? OUTLINE);
  s.sphere(32, 32, 9, hub, { dither: true });
  eye(s, 29, 31, 2.5, EMBER);
  eye(s, 35, 31, 2.5, EMBER);
  brow(s, 26, 27, 31, 29);
  brow(s, 38, 27, 33, 29);
  s.roundedRect(28, 44, 8, 8, 2, STEEL, { dither: true }); // post
  s.outline(OUTLINE, blade[4]);
  return s;
}
function percolatte(): Sprite {
  const s = S();
  const body = ramp('7a5a48');
  s.contactShadow(32, 57, 15, 4, SHADOW);
  s.roundedRect(20, 18, 24, 30, 5, body, { dither: true }); // carafe body
  s.roundedRect(23, 30, 18, 14, 3, ramp('3a2418', { spread: 0.3 }), { dither: true }); // glass pot
  s.ellipse(31, 37, 5, 4, ramp('5a2e18')[2] ?? OUTLINE); // coffee
  eye(s, 27, 24, 3);
  eye(s, 37, 24, 3);
  s.ellipse(32, 28, 3, 1, DARK);
  s.line(44, 24, 50, 30, body[1] ?? OUTLINE); // spout/handle
  s.line(50, 30, 49, 36, body[1] ?? OUTLINE);
  s.set(24, 14, WHITE); // steam
  s.set(26, 11, WHITE);
  s.outline(OUTLINE, body[4]);
  return s;
}
function mailstrom(): Sprite {
  const s = S();
  const body = ramp('5a6e8a');
  s.contactShadow(32, 57, 14, 4, SHADOW);
  s.rect(30, 36, 4, 14, ramp('6a5238')[2] ?? OUTLINE); // post leg
  s.roundedRect(18, 18, 28, 20, 8, body, { dither: true }); // mailbox dome
  eye(s, 26, 26, 3);
  eye(s, 38, 26, 3);
  s.ellipse(32, 31, 4, 1, DARK);
  s.rect(20, 30, 8, 3, DARK); // letter slot
  s.rect(45, 20, 3, 8, hexRGBA('c03028')); // flag up
  s.rect(43, 20, 2, 3, hexRGBA('c03028'));
  // a letter swirling (appendage flavor)
  s.rect(48, 30, 6, 4, WHITE);
  s.line(48, 32, 51, 31, OUTLINE);
  s.outline(OUTLINE, body[4]);
  return s;
}
function frostbox(): Sprite {
  const s = S();
  s.contactShadow(32, 58, 16, 5, SHADOW);
  s.roundedRect(20, 14, 24, 36, 4, ICE, { dither: true }); // fridge body
  s.line(32, 16, 32, 48, STEEL[2] ?? OUTLINE); // door split
  s.rect(40, 20, 2, 8, STEEL[1] ?? OUTLINE); // handle
  eye(s, 27, 24, 3, COOL);
  eye(s, 37, 24, 3, COOL);
  s.ellipse(32, 30, 3, 1, DARK);
  s.set(25, 40, COOL); // frost
  s.set(38, 44, COOL);
  s.outline(OUTLINE, ICE[4]);
  return s;
}
function glacierator(): Sprite {
  const s = S();
  s.contactShadow(32, 60, 22, 5, SHADOW);
  // icicle spikes (weapons) along the top and chin
  for (let i = 0; i < 5; i++) spike(s, 16 + i * 8, 16, 16 + i * 8, 6, 2, ICE[3] ?? COOL);
  s.roundedRect(14, 16, 36, 38, 5, ICE, { dither: true }); // big double-door body
  s.line(32, 18, 32, 52, STEEL[2] ?? OUTLINE);
  s.rect(38, 26, 2, 10, STEEL[1] ?? OUTLINE);
  s.rect(25, 26, 2, 10, STEEL[1] ?? OUTLINE);
  eye(s, 25, 26, 3.5, COOL);
  eye(s, 39, 26, 3.5, COOL);
  brow(s, 21, 21, 29, 24);
  brow(s, 43, 21, 35, 24);
  // frost beard of icicles
  for (let i = 0; i < 4; i++) spike(s, 24 + i * 5, 40, 24 + i * 5, 50, 1.6, ICE[3] ?? COOL);
  s.ellipse(32, 36, 4, 1, DARK);
  s.outline(OUTLINE, ICE[4]);
  return s;
}

// ============================================================ Field bonuses
function vendlet(): Sprite {
  const s = S();
  const glass = ramp('2e4636', { spread: 0.3 });
  s.contactShadow(32, 58, 16, 5, SHADOW);
  s.roundedRect(20, 12, 24, 38, 4, VEND, { dither: true });
  s.roundedRect(23, 16, 14, 26, 2, glass, { dither: true });
  for (let y = 18; y < 40; y += 6) for (let x = 25; x < 36; x += 5) s.ellipse(x, y, 1, 2, EMBER);
  s.rect(39, 18, 4, 10, VEND[1] ?? OUTLINE);
  s.set(40, 20, VOLT);
  eye(s, 28, 45, 2);
  eye(s, 35, 45, 2);
  s.outline(OUTLINE, VEND[4]);
  return s;
}
function staplejaw(): Sprite {
  const s = S();
  const body = ramp('8a8a92', { spread: 0.3 });
  s.contactShadow(32, 50, 18, 4, SHADOW);
  s.roundedRect(16, 22, 34, 9, 4, body, { dither: true, light: [-1, -1] });
  s.roundedRect(16, 33, 34, 8, 4, body, { dither: true });
  for (let x = 19; x < 47; x += 3) s.line(x, 31, x, 33, WHITE);
  eye(s, 44, 26, 3.5, hexRGBA('ff5040'));
  s.outline(OUTLINE, body[4]);
  return s;
}
function tumblet(): Sprite {
  const s = S();
  const wire = ramp('7a6848');
  s.contactShadow(32, 52, 16, 4, SHADOW);
  s.sphere(32, 30, 16, ramp('3a3424'), { dither: true, ambient: 0.4 });
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    s.line(Math.round(32 + Math.cos(a) * 6), Math.round(30 + Math.sin(a) * 6), Math.round(32 + Math.cos(a + 0.6) * 16), Math.round(30 + Math.sin(a + 0.6) * 16), wire[2] ?? OUTLINE);
  }
  eye(s, 29, 30, 2, HIVE);
  eye(s, 35, 31, 2, HIVE);
  s.outline(OUTLINE, wire[4]);
  return s;
}

// ---- backs (player-side: starter lines) ---------------------------------
function chassisBack(baseHex: string, accent: RGBA, scale: number): Sprite {
  const s = S();
  const body = ramp(baseHex); // single ramp keeps the back within budget
  const w = Math.round(28 * scale);
  const h = Math.round(28 * scale);
  const x0 = 32 - w / 2;
  const y0 = 46 - h;
  const treadW = Math.round(18 * scale);
  s.contactShadow(32, 58, Math.round(16 * scale), 5, SHADOW);
  s.roundedRect(32 - treadW / 2, 45, treadW, 12, 5, body, { dither: true }); // dark tread base
  s.roundedRect(x0, y0, w, h, 7, body, { dither: true }); // chassis seen from behind
  s.rect(x0 + 5, y0 + 6, w - 10, h - 12, DARK); // vent recess
  for (let y = y0 + 8; y < y0 + h - 6; y += 3) s.line(x0 + 6, y, x0 + w - 6, y, body[1] ?? OUTLINE);
  s.set(32 - 3, y0 + 3, accent);
  s.set(32 + 3, y0 + 3, accent);
  s.outline(OUTLINE, body[4]);
  return s;
}

// ------------------------------------------------------------------- build
add(1, 'front', charkit(), 'Charkit, THERM furnace Ohmlet on treads');
add(2, 'front', smolderig(), 'Smolderig, twin-stack furnace');
add(3, 'front', pyrofurnax(), 'Pyrofurnax, walking foundry with chimney horns and molten claws');
add(4, 'front', sparkit(), 'Sparkit, VOLT generator Ohmlet');
add(5, 'front', amperig(), 'Amperig, busbar shoulders and terminal prongs');
add(6, 'front', generatlas(), 'Generatlas, pylon masts and arc cannons');
add(7, 'front', dripkit(), 'Dripkit, COOLANT pump Ohmlet');
add(8, 'front', flowrig(), 'Flowrig, manifold arms');
add(9, 'front', aquaducton(), 'Aquaducton, aqueduct crown and water-spout cannons');
add(10, 'front', toastlet(), 'Toastlet, chrome toaster');
add(11, 'front', crumbustion(), 'Crumbustion, flame-tuft ejector, furious');
add(12, 'front', wavelet(), 'Wavelet, microwave');
add(13, 'front', nukenook(), 'Nukenook, cabinet with a microwave heart');
add(14, 'front', gourmagnet(), 'Gourmagnet, range with burner crown and oven maw');
add(15, 'front', filaglow(), 'Filaglow, light bulb (LUMEN)');
add(16, 'front', lumenaire(), 'Lumenaire, three-bulb candelabra');
add(17, 'front', chandelux(), 'Chandelux, chandelier regalia with crystal drips');
add(18, 'front', beeplet(), 'Beeplet, smoke detector');
add(19, 'front', vacuette(), 'Vacuette, upright vacuum');
add(20, 'front', dustdevil(), 'Dustdevil, dust-spiral with raised hose arms');
add(21, 'front', fanlet(), 'Fanlet, ceiling fan');
add(22, 'front', oscillord(), 'Oscillord, five-blade crown');
add(23, 'front', percolatte(), 'Percolatte, coffee maker');
add(24, 'front', mailstrom(), 'Mailstrom, mailbox with flag and letter');
add(25, 'front', frostbox(), 'Frostbox, refrigerator');
add(26, 'front', glacierator(), 'Glacierator, icicle spikes and frost beard');
add(30, 'front', vendlet(), 'Vendlet, vending machine');
add(32, 'front', staplejaw(), 'Staplejaw, stapler');
add(41, 'front', tumblet(), 'Tumblet, virus-taken tumbleweed (VERDANT)');

add(1, 'back', chassisBack('a85420', EMBER, 1), 'Charkit rear');
add(2, 'back', chassisBack('a85420', EMBER, 1.15), 'Smolderig rear');
add(3, 'back', chassisBack('a85420', EMBER, 1.3), 'Pyrofurnax rear');
add(4, 'back', chassisBack('8088a0', VOLT, 1), 'Sparkit rear');
add(5, 'back', chassisBack('8088a0', VOLT, 1.15), 'Amperig rear');
add(6, 'back', chassisBack('8088a0', VOLT, 1.3), 'Generatlas rear');
add(7, 'back', chassisBack('5a86a8', COOL, 1), 'Dripkit rear');
add(8, 'back', chassisBack('5a86a8', COOL, 1.15), 'Flowrig rear');
add(9, 'back', chassisBack('5a86a8', COOL, 1.3), 'Aquaducton rear');

// player overworld micro
function playerMicro(): Sprite {
  const s = new Sprite(16, 16);
  const coat = ramp('3a6ea8');
  const skin = ramp('d8a070');
  s.contactShadow(8, 14, 5, 2, SHADOW);
  s.roundedRect(5, 7, 6, 6, 2, coat, { dither: false });
  s.sphere(8, 4, 3, skin, { dither: false });
  s.rect(6, 2, 5, 2, hexRGBA('2a2018'));
  s.set(7, 4, OUTLINE);
  s.set(9, 4, OUTLINE);
  s.line(6, 13, 6, 15, hexRGBA('2a2018'));
  s.line(10, 13, 10, 15, hexRGBA('2a2018'));
  s.outline(OUTLINE);
  return s;
}
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
  }
  const png = new PNG({ width: b.sprite.w, height: b.sprite.h });
  png.data.set(b.sprite.data);
  writeFileSync(join(OUT, `${name}.png`), PNG.sync.write(png));
  writeFileSync(
    join(OUT, `${name}.prompt.txt`),
    `OHMFRONT sprite "${name}"\nGenerated by tools/gen-sprites.ts (npm run gen:sprites)\nAuthor: Claude, original design (style homage; not traced)\nRules: docs/style-guide.md — Gen 3 GBA, <=16 colors, top-left light,\nhue-shifted ramps, Bayer dither, sel-out outline, contact shadow, expressive face.\n${b.note}\nColors: ${colors}/16\n`,
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

console.log(`${built.length} sprites written to public/sprites/ohms/ (${manifest.front!.length} fronts, ${manifest.back!.length} backs)`);
if (failed > 0) {
  console.error(`${failed} over the 16-color budget.`);
  process.exit(1);
}
