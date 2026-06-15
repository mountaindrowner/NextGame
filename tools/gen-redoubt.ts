/**
 * Redoubt & the Bunker — map composition (npm run gen:redoubt). The military
 * colony / midpoint reveal (Critical Path §9): a fortified yard (checkpoint,
 * sandbags, razorwire, generators, scrap encounters) leading into the dark
 * Bunker — the command center with consoles, server banks, the map table, the
 * audio-log terminal, and the Eli Vane photo + logbook (Grandpa's first trace),
 * under a MEDIUM hive overlay. Builds public/world/redoubt.png + .json.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import {
  armoryRack, audioLog, blastRamp, checkpointGate, commandConsole, concreteFloor, eliPhoto,
  emergencyLight, generator, grate, hazardFloor, mapTable, prefabWall, razorwire, sandbags, serverBank,
} from './assets/kit-redoubt';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 44;
const ROWS = 28;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

function scrapGround(seed: number): Sprite {
  const g = new Grid(32, 32);
  const r = new Rng(seed);
  g.rect(0, 0, 32, 32, 'a');
  for (let k = 0; k < 10; k++) g.box(r.int(1, 26), r.int(1, 26), r.int(3, 6), r.int(2, 4), 'l', 'A', 'x'); // scrap chunks
  for (let k = 0; k < 6; k++) g.set(r.int(0, 31), r.int(0, 31), 'e'); // rust
  return g.render();
}

// # wall · . floor · h hazard · s scrap(encounter) · D bunker-dark floor · g grate
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '.'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(COLS - 1, y, '#'); }
// the Bunker — a walled dark chamber (the command center), north
rectG(11, 1, 23, 10, '#');
rectG(12, 2, 21, 8, 'D'); // dark interior
rectG(20, 9, 4, 2, 'D'); // door + threshold out
rectG(20, 11, 4, 2, 'h'); // hazard apron at the bunker mouth
// scrap-yard encounter beds
rectG(4, 14, 6, 4, 's');
rectG(34, 14, 6, 5, 's');
// grate floor strip by the generators
rectG(4, 22, 5, 3, 'g');

// ---- props (baked) -------------------------------------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  // the command center (inside the Bunker)
  { s: commandConsole(), col: 16, row: 5, solid: 1 },
  { s: serverBank(), col: 30, row: 5, solid: 1 },
  { s: mapTable(), col: 22, row: 6, solid: 1 },
  { s: audioLog(), col: 14, row: 8, solid: 1 },
  { s: eliPhoto(), col: 27, row: 8, solid: 1 }, // Grandpa's trace — hero
  { s: emergencyLight(), col: 13, row: 2 },
  { s: emergencyLight(), col: 31, row: 2 },
  { s: blastRamp(), col: 21, row: 11, solid: 0 }, // the bunker mouth (walk through)
  // the fortified yard
  { s: checkpointGate(), col: 21, row: 17, solid: 0 },
  { s: sandbags(), col: 16, row: 16 },
  { s: sandbags(), col: 27, row: 16 },
  { s: razorwire(), col: 14, row: 20 },
  { s: razorwire(), col: 29, row: 20 },
  { s: generator(), col: 5, row: 24, solid: 1 },
  { s: generator(), col: 8, row: 24, solid: 1 },
  { s: armoryRack(), col: 38, row: 23, solid: 1 },
  { s: emergencyLight(), col: 21, row: 13 },
];

const WALL = [prefabWall(1), prefabWall(2)];
const FL = [concreteFloor(11), concreteFloor(12)];
const HZ = hazardFloor(21);
const SCR = [scrapGround(31), scrapGround(32)];
const GR = grate(41);
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
    const t = ch === '#' ? pick(WALL) : ch === 'h' ? HZ : ch === 's' ? pick(SCR) : ch === 'g' ? GR : pick(FL);
    blit(t, c * T, r * T, false);
  }
// LUMEN: darken the Bunker interior (dark corridors), glows punch through
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    if (MAP[r]![c] !== 'D') continue;
    for (let y = 0; y < T; y++) for (let x = 0; x < T; x++) { const p = big.get(c * T + x, r * T + y); big.set(c * T + x, r * T + y, [Math.round(p[0] * 0.42), Math.round(p[1] * 0.42), Math.round(p[2] * 0.46), 255]); }
  }
function glow(cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const p = big.get(x, y); big.set(x, y, [Math.min(255, Math.round(p[0] + col[0] * a)), Math.min(255, Math.round(p[1] + col[1] * a)), Math.min(255, Math.round(p[2] + col[2] * a)), 255]); }
}
function hiveCreep(cx: number, cy: number, n: number, seed: number): void {
  const r = new Rng(seed);
  for (let k = 0; k < n; k++) {
    const x = cx + r.int(-60, 60); const y = cy + r.int(-52, 52);
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { if (dx * dx + dy * dy > 5) continue; const px = x + dx; const py = y + dy; if (px < 0 || py < 0 || px >= W || py >= H) continue; const p = big.get(px, py); const a = 0.6; const col = r.chance(60) ? [120, 60, 150] : [55, 150, 130]; big.set(px, py, [Math.round(col[0]! * a + p[0] * (1 - a)), Math.round(col[1]! * a + p[1] * (1 - a)), Math.round(col[2]! * a + p[2] * (1 - a)), 255]); }
    if (r.chance(40)) big.set(x, y, [150, 240, 220, 255]);
  }
}
// MEDIUM hive — two creeping fronts (R3: Redoubt = med)
hiveCreep(40 * T, 6 * T, 120, 51);
hiveCreep(38 * T, 22 * T, 90, 52);

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
// glows: command screens (blue), the Eli photo (warm), emergency lights (red)
glow(16 * T + 16, 5 * T + 4, 30, [18, 45, 80]);
glow(30 * T + 16, 5 * T, 26, [18, 55, 30]);
glow(27 * T + 16, 8 * T + 4, 24, [70, 50, 20]); // Eli photo
for (const o of objs) if (o.s.h === 14 && o.s.w === 14) glow(o.col * T + 16, o.row * T + T - 8, 22, [120, 22, 22]); // emergency lights

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'cluttered', biome: 'military', seed: 4206, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'redoubt.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    collision.push(ch === '#' || extraSolid.has(`${c},${r}`) ? 1 : 0);
    grass.push(ch === 's' ? 1 : 0); // scrap beds = encounters
    grassAny.push(ch === 's' ? 1 : 0);
  }

writeFileSync(
  join(OUT, 'redoubt.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: [], placements: [],
    spawn: { x: 21, y: 24 }, // the yard, entered from the Military Road (south)
    exits: [
      { x: 21, y: 26, scene: 'fieldhd', mapId: 'bastion' }, // south → back toward Bastion
      { x: 40, y: 15, scene: 'fieldhd', mapId: 'trinity' }, // east yard → on into the Trinity Bottoms (Act II)
    ],
    interacts: [{ x: 27, y: 8, kind: 'eli' }], // the Eli Vane photo + logbook
    trainers: [
      { char: 'npc_kid', col: 9, row: 16, facing: 'e', name: 'Conscript Pax', range: 4, team: [{ num: 24, level: 13 }], bark: 'Conscript Pax: We. Serve. The order. ...why did I stop?' },
      { char: 'npc_rancher', col: 34, row: 16, facing: 'w', name: 'Deserter Sully', range: 4, team: [{ num: 32, level: 13 }, { num: 45, level: 14 }], bark: 'Deserter Sully: Broke free of the Static early. You should run while you can.' },
    ],
    items: [
      { col: 6, row: 13, credits: 300, label: 'A node in the yard' },
      { col: 39, row: 23, credits: 340, hidden: true, label: 'Stashed by the armory' },
    ],
    signs: [
      { col: 21, row: 22, text: 'REDOUBT — Colony 4. The Bunker is sealed. Command has not answered in days.' },
    ],
    npcs: [
      { char: 'npc_rancher', col: 21, row: 5 }, // Commander Reyes (command center)
      { char: 'npc_elder', col: 18, row: 7 }, // Warden Augusta Pike
      { char: 'npc_kid', col: 9, row: 16 }, // a freed Conscript
    ],
  }),
);
console.log(`redoubt: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props`);
