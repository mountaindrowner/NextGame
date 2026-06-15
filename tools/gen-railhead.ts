/**
 * Railhead — map composition (npm run gen:railhead). The rail-junction trade
 * town (Critical Path §3): a yard of parallel tracks with the roundhouse +
 * turntable at the west end, boxcars on sidings, buffer stops, platforms,
 * semaphores and switch levers, a market sprawl (stalls, coal, broker desks),
 * and lanterns — on industrial ground with dry-grass encounter edges. Entry
 * from the south (Farm Road). Builds public/world/railhead.png + .json.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { watertower } from './world-builders';
import {
  ballast, boxcar, brokerDesk, bufferStop, coalPile, commodityCrate, lantern,
  marketStall, platform, railH, roundhouse, semaphore, signalGantry, switchLever, turntable,
} from './assets/kit-railhead';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 44;
const ROWS = 28;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

// ---- ground tiles --------------------------------------------------------
function packed(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'M');
  for (let k = 0; k < 7; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 3), r.int(1, 2), 'T');
  for (let k = 0; k < 16; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(50) ? 'Q' : 'T');
  return g.render();
}
function gravel(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'A');
  for (let k = 0; k < 40; k++) { const x = r.int(1, T - 2); const y = r.int(1, T - 2); g.set(x, y, r.chance(50) ? 'a' : 'l'); }
  return g.render();
}
function dryGrass(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'J');
  for (let k = 0; k < 22; k++) { const x = r.int(0, T - 1); const y = r.int(2, T - 1); g.set(x, y, 'j'); g.set(x, y - 1, r.chance(45) ? 'h' : 'j'); }
  for (let k = 0; k < 8; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), 'g');
  return g.render();
}
function tallDry(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'J');
  for (let k = 0; k < 22; k++) { const x = r.int(0, T - 1); const h = r.int(6, 11); const base = T - r.int(0, 2); for (let y = base; y > base - h; y--) g.set(x, y, 'j'); g.set(x, base - h, r.chance(50) ? 'h' : 'g'); }
  return g.render();
}
function dirt(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'k');
  for (let k = 0; k < 6; k++) g.ellipse(r.int(2, T - 3), r.int(2, T - 3), r.int(2, 4), r.int(1, 2), 'n');
  for (let k = 0; k < 4; k++) g.hline(r.int(1, T - 8), r.int(3, T - 3), r.int(5, 9), 'K');
  for (let k = 0; k < 12; k++) g.set(r.int(0, T - 1), r.int(0, T - 1), r.chance(55) ? 'K' : 'n');
  return g.render();
}
function border(seed: number): Sprite {
  const g = new Grid(T, T);
  const r = new Rng(seed);
  g.rect(0, 0, T, T, 'G');
  for (let k = 0; k < 30; k++) { const x = r.int(0, T - 1); const y = r.int(2, T - 1); g.set(x, y, r.chance(50) ? 'g' : 'J'); g.set(x, y - 1, 'G'); }
  return g.render();
}

// ---- layout --------------------------------------------------------------
// e packed · v gravel · g dry grass · T tall(encounter) · r rail · b ballast
// d dirt(entry) · # border
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'e'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(COLS - 1, y, '#'); }
// the rail yard — ballast bed + parallel tracks
rectG(6, 8, 36, 12, 'b');
const TRACK_ROWS = [9, 12, 15, 18];
for (const ry of TRACK_ROWS) rectG(8, ry, 33, 1, 'r');
// gravel apron west (roundhouse/turntable), market apron east
rectG(2, 7, 16, 14, 'v');
rectG(34, 20, 9, 6, 'v');
// entry road from the south
rectG(21, 19, 3, ROWS - 19, 'd'); // entry road opens the SOUTH edge → Farm Road
// dry-grass encounter edges
rectG(2, 2, 8, 5, 'T');
rectG(34, 2, 8, 5, 'T');
rectG(2, 22, 6, 4, 'g');
rectG(36, 8, 6, 4, 'T');

// ---- props (baked, footprint solid) --------------------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: roundhouse(), col: 8, row: 9, solid: 3 }, // hero — west end
  { s: turntable(), col: 8, row: 16, solid: 3 }, // hero — in front of the bays
  { s: boxcar(), col: 22, row: 9, solid: 1 },
  { s: boxcar(), col: 32, row: 12, solid: 1 },
  { s: boxcar(), col: 18, row: 18, solid: 1 },
  { s: bufferStop(), col: 40, row: 9, solid: 1 },
  { s: bufferStop(), col: 40, row: 15, solid: 1 },
  { s: platform(), col: 27, row: 16, solid: 1 },
  { s: platform(), col: 27, row: 13, solid: 1 },
  { s: semaphore(), col: 15, row: 8, solid: 1 },
  { s: semaphore(), col: 37, row: 8, solid: 1 },
  { s: signalGantry(), col: 26, row: 8 }, // overhead truss (non-solid)
  { s: switchLever(), col: 19, row: 12 },
  { s: switchLever(), col: 30, row: 15 },
  { s: watertower(), col: 13, row: 7, solid: 1 },
  // market sprawl (east)
  { s: marketStall(), col: 35, row: 22, solid: 1 },
  { s: marketStall(), col: 39, row: 23, solid: 1 },
  { s: brokerDesk(), col: 37, row: 25, solid: 1 },
  { s: coalPile(), col: 33, row: 12, solid: 1 },
  { s: commodityCrate(), col: 34, row: 24 },
  { s: commodityCrate(), col: 41, row: 25 },
  // lanterns for glow
  { s: lantern(), col: 24, row: 21 },
  { s: lantern(), col: 11, row: 21 },
  { s: lantern(), col: 36, row: 21 },
];

const PK = [packed(1), packed(2), packed(3)];
const GV = [gravel(11), gravel(12)];
const DG = [dryGrass(21), dryGrass(22), dryGrass(23)];
const TD = [tallDry(31), tallDry(32)];
const RA = [railH(41), railH(42)];
const BA = [ballast(51), ballast(52)];
const DR = [dirt(61), dirt(62)];
const BO = [border(71), border(72)];
const big = new Sprite(W, H);
const trng = new Rng(7);
const pick = (a: Sprite[]): Sprite => a[trng.int(0, a.length - 1)]!;
const blit = (s: Sprite, x0: number, y0: number, over = true): void => {
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if (over && (c[3] ?? 0) === 0) continue;
      const a = (c[3] ?? 255) / 255;
      const d = big.get(x0 + x, y0 + y);
      big.set(x0 + x, y0 + y, [Math.round(c[0] * a + d[0] * (1 - a)), Math.round(c[1] * a + d[1] * (1 - a)), Math.round(c[2] * a + d[2] * (1 - a)), 255]);
    }
};
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const t = ch === 'r' ? pick(RA) : ch === 'b' ? pick(BA) : ch === 'v' ? pick(GV) : ch === 'g' ? pick(DG) : ch === 'T' ? pick(TD) : ch === 'd' ? pick(DR) : ch === '#' ? pick(BO) : pick(PK);
    blit(t, c * T, r * T, false);
  }

function glow(cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const p = big.get(x, y); big.set(x, y, [Math.min(255, Math.round(p[0] + col[0] * a)), Math.min(255, Math.round(p[1] + col[1] * a)), Math.min(255, Math.round(p[2] + col[2] * a)), 255]); }
}

const extraSolid = new Set<string>();
for (const o of objs) {
  const ax = o.col * T + T / 2;
  const ay = o.row * T + T;
  blit(o.s, Math.round(ax - o.s.w / 2), Math.round(ay - o.s.h));
  if (o.solid) {
    const c0 = Math.floor((ax - o.s.w / 2) / T);
    const c1 = Math.floor((ax + o.s.w / 2 - 1) / T);
    for (let cc = c0; cc <= c1; cc++) for (let rr = o.row - o.solid + 1; rr <= o.row; rr++) extraSolid.add(`${cc},${rr}`);
  }
}
// lantern glow pools
for (const o of objs) if (o.s.h === 26 && o.s.w === 16) glow(o.col * T + T / 2, o.row * T + T - 16, 26, [120, 75, 22]);

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'cluttered', biome: 'industrial', seed: 4203, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'railhead.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    collision.push(ch === '#' || extraSolid.has(`${c},${r}`) ? 1 : 0);
    grass.push(ch === 'T' ? 1 : 0);
    grassAny.push(ch === 'T' || ch === 'g' ? 1 : 0);
  }

writeFileSync(
  join(OUT, 'railhead.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: [], placements: [],
    spawn: { x: 22, y: 25 }, // entry from Farm Road (south)
    exits: [
      { x: 22, y: 1, scene: 'fieldhd', mapId: 'cistern' }, // north → on toward the Cistern
    ],
    trainers: [
      { char: 'npc_rancher', col: 24, row: 22, facing: 'w', name: 'Salt Broker', range: 5, team: [{ num: 32, level: 7 }], bark: 'Salt Broker: Coin first, story later. Beat me, then I listen.' },
      { char: 'npc_kid', col: 38, row: 24, facing: 'w', name: 'Card Sharp', range: 4, team: [{ num: 19, level: 6 }, { num: 21, level: 7 }], bark: "Card Sharp: Double or nothing — let's see your hand." },
    ],
    items: [
      { col: 25, row: 24, credits: 180, label: 'A node by the platform' },
      { col: 33, row: 11, credits: 220, hidden: true, label: 'Tucked in the coal' },
    ],
    signs: [
      { col: 22, row: 23, text: 'RAILHEAD — Colony 1. Brokers trade salt, scrap, and water. No credit, no exceptions.' },
    ],
    npcs: [
      { char: 'npc_elder', col: 11, row: 14, name: 'Warden Dell Marrow', lines: [
        "A key that frees every machine on Earth. I've heard taller tales, kid — none that walked in on their own feet.",
        "Clear our sabotaged relay and you'll have Railhead's ear. Coin talks here. Results talk louder.",
        'One thing gnaws at me: the wild Ohms lately move *together*. Like something is conducting them.',
      ] },
      { char: 'npc_rancher', col: 36, row: 24, name: 'Scrap Broker', lines: [
        "Salt, scrap, water — the three things that keep a colony breathing. I corner the scrap.",
        "Credits are numbers backed by trust. I'm very trustworthy. Ask anyone I haven't cheated.",
        'You want a relay fixed, see the switch-house. You want it fixed *cheap*, keep walking.',
      ] },
      { char: 'npc_kid', col: 24, row: 20, name: 'Rail-runner Pax', lines: [
        'I sprint the tracks before the boxcars roll. Fastest feet in Railhead — wanna race?',
        "Captain Holt's been barking orders by the relay. Something's off — his words land a half-second late.",
        "Earn the Freight Master's trust and the rail carries you colony to colony. Beats walking.",
      ] },
    ],
  }),
);
console.log(`railhead: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props`);
