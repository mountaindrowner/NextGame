/**
 * Bastion — map composition (npm run gen:bastion). The quarry-fortress
 * (Critical Path §7): you enter through the great Wall's gate into a quarry
 * courtyard — the cement plant (silos, kiln, conveyor, crane) on one side, the
 * Pit cave-mouth (the trial), watchtowers, cut-stone and rubble, scree-bed
 * encounters (heavy BRUTE Ohms), and the first LIGHT HIVE OVERLAY creeping in
 * from the siege. Builds public/world/bastion.png + .json. Linked from the Cistern.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import {
  brazier, cementSilo, conveyor, crane, cutStone, gateWinch, gravelGround, kiln,
  pitMouth, quarryWall, rubbleHeap, sandbags, scaffold, scree, theWall, watchtower,
} from './assets/kit-bastion';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 44;
const ROWS = 28;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

// # wall · . gravel · s scree(encounter) · c cutstone(solid)
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '.'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(COLS - 1, y, '#'); }
// the great Wall (rampart band) with a central gate gap
rectG(1, 19, COLS - 2, 2, '#');
rectG(20, 19, 4, 2, '.'); // gate
// scree-bed encounters in the quarry + a feral patch under the hive creep
rectG(6, 12, 7, 4, 's');
rectG(30, 14, 6, 3, 's');
rectG(2, 2, 6, 4, 's'); // the besieged NW corner (hive)
// a few cut-stone obstacles
for (const [x, y] of [[16, 8], [17, 8], [26, 6], [14, 14]] as Array<[number, number]>) setG(x, y, 'c');

// ---- props (baked, footprint solid) --------------------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: theWall(), col: 22, row: 20, solid: 0 }, // the hero rampart visual over the wall band
  { s: watchtower(), col: 4, row: 20, solid: 2 },
  { s: watchtower(), col: 40, row: 20, solid: 2 },
  { s: gateWinch(), col: 25, row: 21, solid: 1 },
  // cement plant (NE)
  { s: cementSilo(), col: 36, row: 12, solid: 2 },
  { s: cementSilo(), col: 39, row: 12, solid: 2 },
  { s: kiln(), col: 32, row: 7, solid: 1 },
  { s: conveyor(), col: 33, row: 11, solid: 1 },
  { s: crane(), col: 39, row: 7, solid: 1 },
  { s: scaffold(), col: 30, row: 4, solid: 1 },
  // the Pit (trial cave-mouth) — center-north
  { s: pitMouth(), col: 21, row: 8, solid: 2 },
  // siege dressing
  { s: sandbags(), col: 14, row: 18 },
  { s: sandbags(), col: 28, row: 18 },
  { s: rubbleHeap(), col: 10, row: 6 },
  { s: rubbleHeap(), col: 24, row: 15 },
  { s: brazier(), col: 19, row: 21 },
  { s: brazier(), col: 24, row: 21 },
  { s: brazier(), col: 12, row: 10 },
];

const WALL = [quarryWall(1), quarryWall(2)];
const GV = [gravelGround(11), gravelGround(12), gravelGround(13)];
const SC = [scree(21), scree(22)];
const CS = cutStone(31);
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
    const t = ch === '#' ? pick(WALL) : ch === 's' ? pick(SC) : ch === 'c' ? CS : pick(GV);
    blit(t, c * T, r * T, false);
  }
function glow(cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const p = big.get(x, y); big.set(x, y, [Math.min(255, Math.round(p[0] + col[0] * a)), Math.min(255, Math.round(p[1] + col[1] * a)), Math.min(255, Math.round(p[2] + col[2] * a)), 255]); }
}
// LIGHT hive overlay creeping in from the NW siege corner (R3: Bastion = light)
function hiveCreep(cx: number, cy: number, n: number, seed: number): void {
  const r = new Rng(seed);
  for (let k = 0; k < n; k++) {
    const x = cx + r.int(-44, 44);
    const y = cy + r.int(-36, 36);
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { if (dx * dx + dy * dy > 5) continue; const px = x + dx; const py = y + dy; if (px < 0 || py < 0 || px >= W || py >= H) continue; const p = big.get(px, py); const a = 0.55; const col = r.chance(60) ? [120, 60, 150] : [60, 150, 130]; big.set(px, py, [Math.round(col[0]! * a + p[0] * (1 - a)), Math.round(col[1]! * a + p[1] * (1 - a)), Math.round(col[2]! * a + p[2] * (1 - a)), 255]); }
    if (r.chance(40)) big.set(x, y, [150, 240, 220, 255]); // a bright vein node
  }
}
hiveCreep(5 * T, 4 * T, 70, 99);

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
for (const o of objs) if (o.s.h === 24 && o.s.w === 18) glow(o.col * T + 16, o.row * T + T - 14, 22, [120, 70, 22]); // braziers

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'cluttered', biome: 'quarry', seed: 4205, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || ch === 'c' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'bastion.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    collision.push(ch === '#' || ch === 'c' || extraSolid.has(`${c},${r}`) ? 1 : 0);
    grass.push(ch === 's' ? 1 : 0); // scree beds = encounters
    grassAny.push(ch === 's' ? 1 : 0);
  }

writeFileSync(
  join(OUT, 'bastion.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: [], placements: [],
    zone: 'bastion-scree',
    spawn: { x: 21, y: 24 }, // the gate approach (south)
    exits: [
      { x: 21, y: 26, scene: 'fieldhd', mapId: 'cistern' }, // south → back toward the Cistern
      { x: 2, y: 13, scene: 'fieldhd', mapId: 'redoubt' }, // west quarry edge → the Military Road to Redoubt
    ],
    trainers: [
      { char: 'npc_rancher', col: 16, row: 14, facing: 'e', name: 'Quarryman Cobb', range: 4, team: [{ num: 52, level: 13 }], bark: "Quarryman Cobb: You don't pass the stone 'til you earn it." },
      { char: 'npc_kid', col: 28, row: 13, facing: 'w', name: 'Wall-watch Rue', range: 4, team: [{ num: 138, level: 13 }, { num: 135, level: 14 }], bark: 'Wall-watch Rue: Eyes up. The wild ones move like they share one mind.' },
    ],
    items: [
      { col: 8, row: 6, credits: 280, hidden: true, label: 'Under the rubble' },
      { col: 33, row: 16, credits: 300, label: 'A node by the cement plant' },
    ],
    signs: [
      { col: 21, row: 22, text: 'BASTION — Colony 3. Trust no one. The gate weighs every stranger.' },
    ],
    npcs: [
      { char: 'npc_elder', col: 17, row: 11, name: 'Warden Calder Stone', lines: [
        'Bastion survived by trusting no one. You are no exception. Prove yourself at the Pit, or get gone.',
        "Hear that on the walls? Feral Ohms. The ordinary hack won't reach them — they answer to something deeper.",
        "Beat my Stoneguard and you'll have the colony's respect. It's all we've left worth giving.",
      ] },
      { char: 'npc_kid', col: 9, row: 9, name: 'Flint', lines: [
        "Stone says wall up and wait. I say somebody's got to watch. So I watch. You should too.",
        'The siege Ohms move like one animal — same step, same turn. Not natural. Coordinated.',
        'Defy the Warden and help anyway. Only way this place lives to see past tomorrow.',
      ] },
      { char: 'npc_rancher', col: 23, row: 22, name: 'Gate-keeper Boon', lines: [
        'No papers, no proof, no passage. The gate weighs everyone. Even you, key-bearer.',
        'Dust never settles here — crushers run day and night, walling us in tighter.',
        'Prove yourself inside and the gate opens. Fail, and the quarry is a long way down.',
      ] },
    ],
  }),
);
console.log(`bastion: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props`);
