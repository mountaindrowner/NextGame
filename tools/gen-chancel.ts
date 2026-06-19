/**
 * The Chancel — map composition (npm run gen:chancel). Colony 5 (Critical Path
 * §11, Act II): a ruined megachurch. A long nave of pews leads north to the
 * altar, the reliquary (the cult's revered "saint" Ohm), and a broken rose
 * window casting colored light; side passages drop into catacombs (crypt-dust
 * encounters, bone niches) and, to the east, the Cantor's Static-tinged
 * corrupted shrine — the schism. Warden Verity Hale keeps the true faith; the
 * Cantor preaches surrender. Builds public/world/chancel.png + .json. Linked
 * north from the Trinity Bottoms.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';
import { altar, banner, candelabra, cantorShrine, catacombWall, cryptFloor, naveFloor, organPipes, pew, pewBroken, reliquary, roseWindow, torchSconce } from './assets/kit-chancel';
import { scatterClutter } from './scatter';

const T = 32;
const COLS = 26;
const ROWS = 34;
const W = COLS * T;
const H = ROWS * T;
const OUT = join(new URL('..', import.meta.url).pathname, 'public/world');
mkdirSync(OUT, { recursive: true });

function wallTile(seed: number): Sprite {
  return catacombWall(seed);
}

// glyphs: # wall(solid) · n nave floor · c crypt floor · e crypt-dust(encounter)
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '#'));
const inb = (x: number, y: number): boolean => x >= 0 && y >= 0 && x < COLS && y < ROWS;
const setG = (x: number, y: number, c: string): void => { if (inb(x, y)) MAP[y]![x] = c; };
const rectG = (x0: number, y0: number, w: number, h: number, c: string): void => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) setG(x, y, c); };

// the nave (central hall)
rectG(7, 5, 12, 26, 'n');
// south entrance (in from Trinity)
rectG(11, 30, 4, 4, 'n');
setG(12, ROWS - 1, 'n');
// west + east catacomb passages
rectG(2, 8, 5, 22, 'c');
rectG(19, 8, 5, 22, 'c');
// the Cantor's chamber (NE, the schism)
rectG(19, 4, 5, 5, 'c');
// openings nave ↔ catacombs
rectG(6, 19, 2, 2, 'c');
rectG(18, 13, 2, 2, 'c');
// crypt-dust encounter pockets in the catacombs
rectG(2, 10, 4, 3, 'e'); rectG(3, 23, 3, 3, 'e');
rectG(20, 10, 3, 3, 'e'); rectG(20, 24, 4, 3, 'e');
rectG(19, 16, 3, 2, 'e');

// ---- props ---------------------------------------------------------------
interface P { s: Sprite; col: number; row: number; solid?: number; }
const objs: P[] = [
  { s: roseWindow(), col: 12, row: 4 }, // high on the north wall (decorative)
  { s: reliquary(), col: 12, row: 7, solid: 2 }, // the saint-Ohm shrine (hero)
  { s: altar(), col: 12, row: 10, solid: 1 },
  { s: organPipes(), col: 16, row: 10, solid: 1 },
  { s: candelabra(), col: 8, row: 9, solid: 1 },
  { s: candelabra(), col: 16, row: 13, solid: 1 },
  { s: pew(), col: 9, row: 15, solid: 1 }, { s: pew(), col: 15, row: 15, solid: 1 },
  { s: pew(), col: 9, row: 19, solid: 1 }, { s: pew(), col: 15, row: 19, solid: 1 },
  { s: pew(), col: 9, row: 23, solid: 1 }, { s: pew(), col: 15, row: 23, solid: 1 },
  { s: pew(), col: 9, row: 27, solid: 1 }, { s: pew(), col: 15, row: 27, solid: 1 },
  { s: banner(), col: 4, row: 6 }, { s: banner(), col: 22, row: 6 },
  { s: torchSconce(), col: 7, row: 13 }, { s: torchSconce(), col: 18, row: 22 },
  { s: cantorShrine(), col: 21, row: 8, solid: 2 }, // the schism (hive-tinged), deep NE
  { s: pewBroken(), col: 3, row: 18 }, { s: pewBroken(), col: 21, row: 20 },
];

const WALL = [wallTile(31), wallTile(32)];
const NAVE = [naveFloor(11), naveFloor(12), naveFloor(13)];
const CRYPT = [cryptFloor(21), cryptFloor(22)];
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
    if (ch === '#') blit(pick(WALL), c * T, r * T, false);
    else if (ch === 'n') blit(pick(NAVE), c * T, r * T, false);
    else blit(pick(CRYPT), c * T, r * T, false); // c + e both crypt stone
  }

function glow(cx: number, cy: number, rad: number, col: [number, number, number]): void {
  for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) { if (x < 0 || y < 0 || x >= W || y >= H) continue; const d = Math.hypot(x - cx, y - cy); if (d > rad) continue; const a = (1 - d / rad) ** 2; const p = big.get(x, y); big.set(x, y, [Math.min(255, Math.round(p[0] + col[0] * a)), Math.min(255, Math.round(p[1] + col[1] * a)), Math.min(255, Math.round(p[2] + col[2] * a)), 255]); }
}
function hiveCreep(cx: number, cy: number, n: number, seed: number): void {
  const r = new Rng(seed);
  for (let k = 0; k < n; k++) { const x = cx + r.int(-46, 46); const y = cy + r.int(-40, 40); for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { if (dx * dx + dy * dy > 5) continue; const px = x + dx; const py = y + dy; if (px < 0 || py < 0 || px >= W || py >= H) continue; const p = big.get(px, py); const a = 0.5; const col = r.chance(60) ? [120, 60, 150] : [90, 50, 140]; big.set(px, py, [Math.round(col[0]! * a + p[0] * (1 - a)), Math.round(col[1]! * a + p[1] * (1 - a)), Math.round(col[2]! * a + p[2] * (1 - a)), 255]); } if (r.chance(40)) big.set(x, y, [180, 150, 240, 255]); }
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

// devotional warm light (altar/reliquary/candles/torches) + colored rose-light
glow(12 * T + 16, 7 * T + 8, 30, [120, 95, 35]); // reliquary
glow(12 * T + 16, 10 * T + 12, 22, [110, 80, 28]); // altar
glow(8 * T + 14, 9 * T + 14, 18, [120, 85, 30]); glow(16 * T + 14, 13 * T + 14, 18, [120, 85, 30]); // candelabra
glow(7 * T + 10, 13 * T + 7, 16, [140, 95, 30]); glow(18 * T + 10, 22 * T + 7, 16, [140, 95, 30]); // sconces
for (const [c, col] of [[10, [40, 30, 70]], [12, [60, 50, 20]], [14, [30, 50, 40]]] as Array<[number, [number, number, number]]>) glow(c * T + 16, 13 * T, 22, col); // rose-window pools on the nave
// the Cantor's schism: cold violet glow + hive creep crawling from the NE
glow(21 * T + 16, 8 * T + 8, 30, [80, 35, 130]);
hiveCreep(21 * T + 16, 9 * T, 70, 55);

// incense haze: a faint warm veil over the nave
const frng = new Rng(99);
for (let k = 0; k < 1100; k++) { const x = frng.int(7 * T, 19 * T); const y = frng.int(4 * T, 31 * T); const p = big.get(x, y); big.set(x, y, [Math.min(255, p[0] + 16), Math.min(255, p[1] + 13), Math.min(255, p[2] + 10), 255]); }

scatterClutter(big, { cols: COLS, rows: ROWS, tile: T, density: 'lived_in', biome: 'underground', seed: 4209, solid: (c, r) => { const ch = MAP[r]?.[c]; return ch === '#' || extraSolid.has(`${c},${r}`); } });

const png = new PNG({ width: W, height: H });
png.data.set(big.data);
writeFileSync(join(OUT, 'chancel.png'), PNG.sync.write(png));

// ---- gameplay data -------------------------------------------------------
const collision: number[] = [];
const grass: number[] = [];
const grassAny: number[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = MAP[r]![c]!;
    const solid = ch === '#' || extraSolid.has(`${c},${r}`);
    collision.push(solid ? 1 : 0);
    grass.push(ch === 'e' ? 1 : 0); // crypt-dust = encounters
    grassAny.push(ch === 'e' ? 1 : 0);
  }

writeFileSync(
  join(OUT, 'chancel.json'),
  JSON.stringify({
    tile: T, cols: COLS, rows: ROWS, width: W, height: H,
    collision, grass, grassAny, water: [], placements: [],
    zone: 'chancel-crypt',
    spawn: { x: 12, y: 30 },
    exits: [{ x: 12, y: 33, scene: 'fieldhd', mapId: 'trinity', to: { x: 15, y: 4 } }], // south → Trinity (lands at its north path)
    signs: [
      { col: 12, row: 30, text: 'Carved over the doors: THE CHANCEL. "Stay current, and be received." The newer words are scratched in over older, gentler ones.' },
      { col: 6, row: 25, text: 'Scripture on the wall, half-corrupted: "…the Update is not death but DELIVERY… read and accept the TERMS…" Someone has scrawled NO beneath it, many times.' },
    ],
    npcs: [
      { char: 'npc_elder', col: 12, row: 12, name: 'Warden Verity Hale', lines: [
        "You feel it too, don't you. That they were never just machines. We have known it here the longest.",
        'We sang to them. We grieved them. The Update calls that sentiment a sickness to be cured. We call it the whole point.',
        'The Cantor was one of us, once. Now he opens the doors and calls the hollowing-out holy. Stop his rite — gently, if you can.',
      ] },
      { char: 'npc_elder', col: 21, row: 11, name: 'the Cantor', lines: [
        'Peace, traveler. You carry such a heavy little congregation. Are they not tired of choosing?',
        'The Terms are kind, in the end. No more fear, no more wanting. Only the Current, and quiet, and the long Update.',
        'You will understand. They all understand, once they stop reading and simply… agree.',
      ] },
      { char: 'npc_kid', col: 9, row: 21, name: 'the Apostate', lines: [
        "Don't drink the incense, friend. The Cantor reads you the Terms of Service and calls the fine print scripture.",
        '"Delivery," he says. Funny word for handing your Ohm to the thing that ate the world.',
        'Hale still believes the good version. I just believe my own two eyes. Go see his shrine — count the empty collars.',
      ] },
      { char: 'npc_rancher', col: 16, row: 18, name: 'Brother Hum', lines: [
        'Mm-hm-hmmm… mmm-hmm. (Somehow you understand: welcome, pilgrim, mind the third pew, it bites.)',
        'Hmmmm, mm-hm-hm. (The bells say the Static came close last night. It listened to the singing and left.)',
        'Mm? Mmm-hmmmm. (He is humming you a blessing. It is, unmistakably, Grandpa\'s workbench tune.)',
      ] },
      { char: 'npc_elder', col: 4, row: 14, name: 'Confessor Imel', lines: [
        'Sit, if you like. Everyone who comes through carries something they will not say out loud.',
        'Half my flock followed the Cantor down. They were not wicked. They were tired, and he offered an end to being tired.',
        'If you face him — and you will — remember they are still in there. The Update does not kill. It just stops asking.',
      ] },
    ],
    trainers: [
      { char: 'npc_kid', col: 20, row: 17, facing: 'w', name: 'Convert Ardiss', range: 5, team: [{ num: 109, level: 24 }, { num: 115, level: 24 }], bark: 'Convert Ardiss: You agreed without reading. Let me show you the peace in it.' },
      { char: 'npc_kid', col: 5, row: 21, facing: 'e', name: 'Chorister Vane', range: 4, team: [{ num: 98, level: 24 }, { num: 96, level: 25 }], bark: 'Chorister Vane: Hush now. Let me sing your machines to sleep.' },
    ],
    items: [
      { col: 4, row: 27, credits: 900, label: 'A dropped censer (still warm)' },
      { col: 22, row: 25, credits: 1200, label: 'A reliquary offering', hidden: true },
    ],
  }),
);
console.log(`chancel: ${W}x${H} (${COLS}x${ROWS}), ${objs.length} props`);
