/**
 * The Cistern — map composition (npm run gen:cistern). The flooded waterworks
 * colony (Critical Path §5): a central water basin crossed by catwalks, four
 * chambers around it — the Nursery (glowing Ohm-cradles), the Grange + seed-
 * vault, the pump room, and a reed-bed (encounters) — with mossy channel walls.
 * Open water is the HOVER gate (blocked); the main path crosses on catwalks.
 * Builds public/world/cistern.png + .json. Linked from Railhead.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import {
  catwalk, channelWall, concreteFloor, footbridge, grangeTable, ladder, lantern,
  ohmCradle, pipeValve, planter, pumpMachine, reeds, seedVault, sluiceGate, water,
} from './assets/kit-cistern';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 40;
const ROWS = 28;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

// ground glyphs: # wall · . floor · ~ water(HOVER gate) · = catwalk · r reeds(encounter)
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '.'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };
for (let x = 0; x < COLS; x++) { setG(x, 0, '#'); setG(x, ROWS - 1, '#'); }
for (let y = 0; y < ROWS; y++) { setG(0, y, '#'); setG(COLS - 1, y, '#'); }
// central water basin + catwalk cross through it
rectG(14, 6, 13, 16, '~');
rectG(20, 6, 1, 16, '='); // vertical catwalk
rectG(14, 13, 13, 2, '='); // horizontal catwalk
// chamber-dividing walls (mossy concrete) framing the four rooms
rectG(2, 12, 12, 1, '#'); rectG(27, 12, 11, 1, '#');
// reed beds (encounters) along the SE chamber + a couple basin fringes
rectG(28, 18, 6, 3, 'r');
rectG(4, 4, 4, 2, 'r');
// south entry dock + a catwalk spur to it
rectG(19, 22, 3, 4, '.');
setG(20, 22, '=');

// ---- props (baked, footprint solid) --------------------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  // NW — the Nursery
  { s: ohmCradle(), col: 4, row: 8, solid: 1 },
  { s: ohmCradle(), col: 9, row: 8, solid: 1 },
  { s: planter(), col: 5, row: 11, solid: 1 },
  { s: planter(), col: 10, row: 11, solid: 1 },
  { s: lantern(), col: 7, row: 5 },
  // NE — the Grange + seed-vault
  { s: grangeTable(), col: 30, row: 8, solid: 1 },
  { s: grangeTable(), col: 30, row: 11, solid: 1 },
  { s: seedVault(), col: 35, row: 9, solid: 1 },
  { s: lantern(), col: 33, row: 5 },
  // SW — the pump room
  { s: pumpMachine(), col: 4, row: 19, solid: 1 },
  { s: pumpMachine(), col: 8, row: 19, solid: 1 },
  { s: pipeValve(), col: 11, row: 22, solid: 1 },
  { s: sluiceGate(), col: 6, row: 24, solid: 1 },
  { s: lantern(), col: 10, row: 17 },
  // SE — reeds + machinery
  { s: pipeValve(), col: 34, row: 24, solid: 1 },
  { s: reeds(), col: 35, row: 21 },
  { s: lantern(), col: 30, row: 17 },
  { s: ladder(), col: 26, row: 16 },
  // basin dressing
  { s: footbridge(), col: 20, row: 13 },
  { s: reeds(), col: 14, row: 21 },
  { s: reeds(), col: 26, row: 7 },
];

const WALL = [channelWall(1), channelWall(2)];
const FL = [concreteFloor(11), concreteFloor(12), concreteFloor(13)];
const WA = [water(21), water(22), water(23)];
const CW = catwalk(0);
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
    if (ch === '~') blit(pick(WA), c * T, r * T, false);
    else if (ch === '=') { blit(pick(WA), c * T, r * T, false); blit(CW, c * T, r * T); }
    else if (ch === '#') blit(pick(WALL), c * T, r * T, false);
    else blit(pick(FL), c * T, r * T, false); // '.', 'r'
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
// glow pools: cradles (blue), seed-vault (teal), lanterns (amber)
glow(4 * T + 16, 8 * T + 16, 24, [25, 60, 110]);
glow(9 * T + 16, 8 * T + 16, 24, [25, 60, 110]);
glow(35 * T + 16, 9 * T + 20, 26, [18, 80, 70]);
for (const o of objs) if (o.s.h === 24 && o.s.w === 16) glow(o.col * T + 16, o.row * T + T - 14, 24, [110, 75, 25]);

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'lived_in', biome: 'flooded', seed: 4204, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || ch === '~' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'cistern.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
const waterArr: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || ch === '~' || extraSolid.has(`${c},${r}`);
    collision.push(solid ? 1 : 0);
    grass.push(ch === 'r' ? 1 : 0); // reed beds = encounters
    grassAny.push(ch === 'r' ? 1 : 0);
    waterArr.push(0); // cave/cistern water is baked, not the animated surface overlay
  }

writeFileSync(
  join(OUT, 'cistern.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: waterArr, placements: [],
    zone: 'cistern-reeds',
    spawn: { x: 20, y: 24 }, // the south entry dock
    exits: [
      { x: 20, y: 26, scene: 'fieldhd', mapId: 'railhead' }, // south → back toward Railhead
      { x: 20, y: 1, scene: 'fieldhd', mapId: 'bastion' }, // north → on toward Bastion
    ],
    interacts: [{ x: 20, y: 22, kind: 'heal' }], // the waterworks recharge station by the dock
    trainers: [
      { char: 'npc_kid', col: 10, row: 19, facing: 'n', name: 'Mud Cole', range: 4, team: [{ num: 12, level: 11 }], bark: 'Mud Cole: Careful — my Ohms are slippery as a wet rope.' },
      { char: 'npc_rancher', col: 31, row: 9, facing: 'w', name: 'Sower Tansy', range: 4, team: [{ num: 38, level: 11 }, { num: 25, level: 12 }], bark: 'Sower Tansy: Raised mine from a flicker. Go gentle now.' },
    ],
    items: [
      { col: 6, row: 7, credits: 220, hidden: true, label: 'Behind the nursery shelf' },
      { col: 32, row: 23, credits: 250, label: 'A node in the pump room' },
    ],
    signs: [
      { col: 20, row: 23, text: "THE CISTERN — Colony 2. Mind the water; you'll need a way across it to reach the heart." },
    ],
    npcs: [
      { char: 'npc_elder', col: 7, row: 7, name: 'Warden Etta Bloom', lines: [
        "We don't catch Ohms here, child. We raise them. Every one is kin, the same as you.",
        "Trust the Militarists least of all. I've watched good water poisoned by men sure they meant well.",
        "The trial's heart sits past the flood. You'll need a vehicle Ohm that hovers to cross — no other way.",
      ] },
      { char: 'npc_rancher', col: 32, row: 9, name: 'Mud Cole', lines: [
        "Mud's the name, mud's the trade. I move the herd-Ohms between chambers. They're shy, like me.",
        "Sela could show you the gentle side of these machines. They feel, you know. World just won't say it.",
        "Weather-Watcher swears the EM shimmer rolls in tonight. He's wrong every time — till the time he isn't.",
      ] },
      { char: 'npc_kid', col: 9, row: 18, name: 'Cistern-keeper Reeva', lines: [
        'I work the sluices. Open the wrong gate and the whole nursery floods. No pressure.',
        'Word is the Militarists are fracturing — some turning on their own. Why would a man fight himself?',
        "Mind the deep channels. The slippery Ohms down there'll drag you under and call it a hug.",
      ] },
    ],
  }),
);
console.log(`cistern: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props`);
