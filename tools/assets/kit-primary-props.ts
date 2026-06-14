/**
 * Primary Kit — props/barriers/obstacles art (npm run assets:primary:props).
 *
 * Second Primary batch: the shared outdoor objects every map reuses. Grid
 * method, shared palette, depth+density laws (each prop modeled hi/base/shadow,
 * contact shadow, reads as what it is). Trees split canopy (walk-behind top)
 * over a solid trunk base. Field-ability obstacles ship blocked + cleared
 * (R9). Emits PNGs to assets/tiles/primary/<cat>/ + a contact sheet.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';
import { Rng } from '../../src/core/rng';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/tiles/primary');
const save = (s: Sprite, rel: string): void => {
  const dir = join(OUT, rel.split('/').slice(0, -1).join('/'));
  mkdirSync(dir, { recursive: true });
  const png = new PNG({ width: s.w, height: s.h });
  png.data.set(s.data);
  writeFileSync(join(OUT, `${rel}.png`), PNG.sync.write(png));
};

/** A shaded leaf mass: base green, lit top-left, shadow bottom-right. */
function leafmass(g: Grid, cx: number, cy: number, rx: number, ry: number, seed: number): void {
  const r = new Rng(seed);
  g.ellipse(cx, cy, rx, ry, 'g');
  g.ellipse(cx - 1, cy - 1, rx - 1, ry - 1, 'f');
  g.ellipse(cx - rx * 0.4, cy - ry * 0.4, rx * 0.5, ry * 0.5, 'F'); // hi
  for (let k = 0; k < rx; k++) g.set(cx + r.int(-rx, rx) * 0.4, cy + ry * 0.5 + r.int(0, 1), 'G'); // shadow stipple
}

// ---- vegetation ----------------------------------------------------------
function treeMesquite(): Sprite {
  const g = new Grid(96, 128);
  g.shadow(48, 126, 30, 5);
  g.box(42, 78, 10, 46, 'n', 'k', 'K'); // trunk
  g.line(47, 90, 30, 70, 'k');
  g.line(47, 90, 66, 68, 'k'); // boughs
  leafmass(g, 34, 64, 22, 16, 1);
  leafmass(g, 64, 60, 24, 18, 2);
  leafmass(g, 48, 44, 26, 18, 3);
  g.outline('X');
  return g.render();
}
function treeOak(): Sprite {
  const g = new Grid(96, 128);
  g.shadow(48, 126, 32, 5);
  g.box(43, 84, 12, 40, 'n', 'k', 'K');
  leafmass(g, 38, 60, 26, 22, 4);
  leafmass(g, 60, 58, 26, 22, 5);
  leafmass(g, 48, 40, 30, 22, 6);
  g.outline('X');
  return g.render();
}
function treeCypress(): Sprite {
  const g = new Grid(64, 160);
  g.shadow(32, 158, 18, 4);
  g.box(28, 120, 8, 38, 'n', 'k', 'K');
  for (let i = 0; i < 5; i++) leafmass(g, 32, 110 - i * 22, 18 - i * 2, 16, 10 + i);
  g.outline('X');
  return g.render();
}
function treeDead(): Sprite {
  const g = new Grid(80, 128);
  g.shadow(40, 126, 22, 4);
  g.box(36, 70, 9, 54, 'W', 'A', 'x'); // grey trunk
  for (const [x, y] of [[40, 80, 18, 50], [40, 70, 64, 44], [40, 60, 30, 36], [40, 64, 56, 30]] as Array<[number, number, number, number]>)
    void g.line(x, y, x, y, 'A');
  g.line(40, 80, 18, 50, 'A');
  g.line(40, 70, 64, 44, 'A');
  g.line(40, 60, 30, 34, 'W');
  g.line(40, 64, 56, 30, 'W');
  g.line(30, 34, 22, 22, 'A');
  g.line(56, 30, 64, 20, 'A');
  g.outline('X');
  return g.render();
}
function bush(): Sprite {
  const g = new Grid(40, 32);
  g.shadow(20, 30, 14, 3);
  leafmass(g, 14, 18, 12, 10, 21);
  leafmass(g, 26, 16, 12, 10, 22);
  g.outline('X');
  return g.render();
}
function shrub(): Sprite {
  const g = new Grid(28, 26);
  g.shadow(14, 24, 9, 2);
  leafmass(g, 14, 14, 11, 9, 23);
  g.outline('X');
  return g.render();
}
function stump(): Sprite {
  const g = new Grid(28, 24);
  g.shadow(14, 22, 9, 2);
  g.box(7, 10, 14, 11, 'n', 'k', 'K');
  g.ellipse(14, 10, 7, 3, 'n');
  g.ellipse(14, 10, 4, 2, 'K'); // rings
  g.outline('X');
  return g.render();
}
function cactus(): Sprite {
  const g = new Grid(32, 48);
  g.shadow(16, 46, 9, 2);
  g.box(12, 14, 8, 32, 'F', 'f', 'G');
  g.box(4, 22, 6, 10, 'F', 'f', 'G'); // left arm
  g.box(22, 18, 6, 12, 'F', 'f', 'G'); // right arm
  for (let y = 16; y < 44; y += 4) { g.set(15, y, 'G'); g.set(17, y, 'G'); }
  g.outline('X');
  return g.render();
}
function log(): Sprite {
  const g = new Grid(48, 20);
  g.shadow(24, 18, 20, 2);
  g.box(2, 5, 44, 10, 'n', 'k', 'K');
  g.ellipse(44, 10, 3, 5, 'n');
  g.ellipse(44, 10, 2, 3, 'K');
  g.outline('X');
  return g.render();
}
function tumbleweed(): Sprite {
  const g = new Grid(28, 26);
  const r = new Rng(7);
  g.shadow(14, 24, 8, 2);
  for (let k = 0; k < 18; k++) {
    const a = r.next() * 6.28;
    const x0 = 14 + Math.cos(a) * 3;
    const y0 = 12 + Math.sin(a) * 3;
    g.line(x0, y0, 14 + Math.cos(a) * 10, 12 + Math.sin(a) * 9, r.chance(50) ? 'j' : 'h');
  }
  g.outline('X');
  return g.render();
}

// ---- ruin props ----------------------------------------------------------
function carSedan(): Sprite {
  const g = new Grid(96, 56);
  g.shadow(48, 54, 42, 4);
  g.box(8, 26, 80, 22, 'e', 'E', 'x'); // rusted body
  g.box(24, 12, 48, 16, 'a', 'A', 'x'); // cabin
  g.box(28, 14, 18, 11, 'C', 'c', 'C'); // windows
  g.box(50, 14, 18, 11, 'C', 'c', 'C');
  g.ellipse(26, 48, 8, 8, 'x'); // wheels
  g.ellipse(70, 48, 8, 8, 'x');
  g.ellipse(26, 48, 4, 4, 'A');
  g.ellipse(70, 48, 4, 4, 'A');
  for (let k = 0; k < 14; k++) g.set(new Rng(k + 1).int(10, 86), new Rng(k * 3 + 2).int(28, 44), 'q'); // rust spots
  g.outline('X');
  return g.render();
}
function scrapHeap(): Sprite {
  const g = new Grid(48, 40);
  const r = new Rng(3);
  g.shadow(24, 38, 20, 3);
  for (let k = 0; k < 16; k++) {
    const x = r.int(4, 40);
    const y = r.int(14, 34);
    g.box(x, y, r.int(4, 9), r.int(3, 6), 'l', 'a', 'A');
  }
  for (let k = 0; k < 6; k++) g.set(r.int(6, 42), r.int(14, 30), 'q'); // rust
  g.outline('X');
  return g.render();
}
function rubblePile(): Sprite {
  const g = new Grid(44, 32);
  const r = new Rng(4);
  g.shadow(22, 30, 18, 3);
  for (let k = 0; k < 20; k++) g.ellipse(r.int(4, 40), r.int(14, 28), r.int(2, 4), r.int(2, 3), r.chance(50) ? 'a' : 'W');
  g.outline('X');
  return g.render();
}
function oilDrum(): Sprite {
  const g = new Grid(22, 32);
  g.shadow(11, 30, 8, 2);
  g.box(4, 6, 14, 24, 'e', 'E', 'x');
  g.hline(4, 12, 14, 'x');
  g.hline(4, 22, 14, 'x');
  g.ellipse(11, 6, 7, 2, 'q');
  g.outline('X');
  return g.render();
}
function crate(): Sprite {
  const g = new Grid(28, 28);
  g.shadow(14, 26, 11, 2);
  g.box(3, 5, 22, 21, 'n', 'k', 'K');
  g.line(3, 5, 24, 25, 'n');
  g.line(24, 5, 3, 25, 'n');
  g.outline('X');
  return g.render();
}
function barrel(): Sprite {
  const g = new Grid(20, 30);
  g.shadow(10, 28, 8, 2);
  g.box(4, 4, 12, 24, 'l', 'a', 'A');
  g.hline(4, 10, 12, 'A');
  g.hline(4, 20, 12, 'A');
  g.outline('X');
  return g.render();
}
function tire(): Sprite {
  const g = new Grid(24, 24);
  g.shadow(12, 22, 9, 2);
  g.ellipse(12, 12, 10, 9, 'x');
  g.ellipse(12, 12, 5, 4, 'A');
  g.ellipse(12, 12, 2, 2, 'a');
  g.outline('X');
  return g.render();
}
function utilityPole(): Sprite {
  const g = new Grid(28, 112);
  g.shadow(14, 110, 8, 3);
  g.box(11, 16, 6, 94, 'n', 'k', 'K');
  g.rect(2, 26, 24, 3, 'K'); // crossarm
  g.set(5, 24, 'a'); g.set(23, 24, 'a'); // insulators
  g.line(2, 27, 0, 34, 'A');
  g.line(26, 27, 28, 34, 'A'); // sagging lines
  g.outline('X');
  return g.render();
}
function fallenSign(): Sprite {
  const g = new Grid(36, 28);
  g.shadow(18, 26, 14, 2);
  g.box(6, 8, 24, 12, 'l', 'a', 'A');
  g.rect(9, 11, 18, 2, 'W');
  g.rect(9, 15, 12, 2, 'W');
  g.line(28, 18, 33, 26, 'A'); // bent post
  g.outline('X');
  return g.render();
}

// ---- barriers ------------------------------------------------------------
function fenceWood(): Sprite {
  const g = new Grid(96, 40);
  g.shadow(48, 38, 44, 2);
  for (const x of [8, 44, 80]) { g.box(x, 8, 6, 28, 'n', 'k', 'K'); }
  g.rect(8, 14, 78, 4, 'k'); // rails
  g.rect(8, 26, 78, 4, 'k');
  g.hline(8, 14, 78, 'n');
  g.hline(8, 26, 78, 'n');
  g.outline('X');
  return g.render();
}
function fenceChain(): Sprite {
  const g = new Grid(96, 40);
  const r = new Rng(8);
  g.shadow(48, 38, 44, 2);
  for (const x of [6, 90]) g.box(x, 6, 4, 30, 'l', 'a', 'A');
  g.rect(6, 8, 88, 2, 'a'); // top rail
  for (let x = 8; x < 90; x += 3) for (let y = 12; y < 34; y += 3) g.set(x + (r.chance(50) ? 1 : 0), y, 'W'); // mesh
  g.outline('X');
  return g.render();
}
function fenceScrap(): Sprite {
  const g = new Grid(96, 44);
  const r = new Rng(9);
  g.shadow(48, 42, 44, 2);
  for (let x = 4; x < 92; x += 11) {
    const h = r.int(24, 38);
    g.box(x, 42 - h, 10, h, 'l', 'a', 'A');
    if (r.chance(40)) g.rect(x + 2, 44 - h, 6, 3, 'q'); // rust cap
  }
  g.outline('X');
  return g.render();
}
function wallConcrete(): Sprite {
  const g = new Grid(96, 44);
  g.shadow(48, 42, 44, 2);
  g.box(2, 8, 92, 34, 'w', 'W', 'x');
  for (let x = 2; x < 94; x += 16) g.vline(x, 8, 34, 'x'); // panel seams
  g.hline(2, 8, 92, 'w');
  g.outline('X');
  return g.render();
}
function wallBrick(): Sprite {
  const g = new Grid(96, 44);
  g.shadow(48, 42, 44, 2);
  g.box(2, 8, 92, 34, 'e', 'E', 'x');
  let row = 0;
  for (let y = 8; y < 42; y += 6, row++) {
    g.hline(2, y, 92, 'x');
    const off = row % 2 ? 8 : 0;
    for (let x = 2 + off; x < 94; x += 16) g.vline(x, y, 6, 'x');
  }
  g.outline('X');
  return g.render();
}
function boulder(): Sprite {
  const g = new Grid(56, 48);
  const r = new Rng(11);
  g.shadow(28, 46, 24, 3);
  g.ellipse(28, 28, 24, 18, 'a');
  g.ellipse(24, 24, 18, 13, 'l'); // lit
  for (let k = 0; k < 6; k++) g.line(r.int(12, 44), r.int(16, 38), r.int(12, 44), r.int(16, 38), 'A'); // cracks
  g.ellipse(36, 38, 14, 8, 'A'); // bottom shadow
  g.outline('X');
  return g.render();
}

// ---- field-ability obstacles (blocked + cleared) -------------------------
function overgrowthBlocked(): Sprite {
  const g = new Grid(36, 40);
  const r = new Rng(12);
  for (let k = 0; k < 60; k++) {
    const x = r.int(2, 33);
    const h = r.int(8, 22);
    for (let y = 38; y > 38 - h; y--) g.set(x, y, r.chance(60) ? 'g' : 'f');
    g.set(x, 38 - h, 'F');
  }
  g.outline('X');
  return g.render();
}
function overgrowthCleared(): Sprite {
  const g = new Grid(36, 16);
  const r = new Rng(13);
  for (let k = 0; k < 24; k++) { const x = r.int(2, 33); g.set(x, r.int(10, 14), 'G'); g.set(x, r.int(10, 14) - 1, 'g'); } // stubble
  g.outline('X');
  return g.render();
}
function rockBlocked(): Sprite {
  const g = new Grid(34, 34);
  g.shadow(17, 32, 14, 2);
  g.box(4, 6, 26, 26, 'l', 'a', 'A'); // cut rock block
  g.line(4, 6, 30, 32, 'A');
  g.line(30, 6, 4, 32, 'A');
  g.outline('X');
  return g.render();
}
function rockCleared(): Sprite {
  const g = new Grid(40, 24);
  const r = new Rng(14);
  g.shadow(20, 22, 16, 2);
  for (let k = 0; k < 14; k++) g.ellipse(r.int(4, 36), r.int(14, 20), r.int(2, 4), 2, r.chance(50) ? 'a' : 'A'); // shards
  g.outline('X');
  return g.render();
}
function debrisBlocked(): Sprite {
  const g = new Grid(40, 34);
  const r = new Rng(15);
  g.shadow(20, 32, 17, 2);
  for (let k = 0; k < 10; k++) { const x = r.int(2, 32); const y = r.int(10, 28); g.box(x, y, r.int(6, 10), r.int(4, 7), 'n', 'k', 'K'); } // heaped beams
  g.outline('X');
  return g.render();
}
function debrisCleared(): Sprite {
  const g = new Grid(40, 18);
  const r = new Rng(16);
  g.shadow(20, 16, 16, 2);
  for (let k = 0; k < 4; k++) g.box(r.int(2, 30), r.int(8, 12), 7, 4, 'n', 'k', 'K'); // a couple stacked aside
  g.outline('X');
  return g.render();
}
function darkBlocked(): Sprite {
  const g = new Grid(36, 36);
  g.box(0, 0, 36, 36, 'x', 'X', 'X'); // a dark veil
  for (let y = 2; y < 34; y += 4) for (let x = 2; x < 34; x += 4) g.set(x, y, 'x');
  g.outline('X');
  return g.render();
}
function darkCleared(): Sprite {
  const g = new Grid(36, 36);
  const r = new Rng(17);
  g.rect(0, 0, 36, 36, 'z'); // lit (lumen)
  for (let k = 0; k < 30; k++) g.set(r.int(0, 35), r.int(0, 35), 'E');
  return g.render();
}
function flame(): Sprite {
  const g = new Grid(24, 32);
  g.ellipse(12, 22, 8, 9, 'E');
  g.ellipse(12, 22, 6, 8, 'e');
  g.ellipse(12, 24, 4, 7, 'z');
  g.ellipse(12, 26, 2, 5, 'Z');
  g.set(12, 14, 'z');
  return g.render();
}

// ---- emit ----------------------------------------------------------------
const ITEMS: Array<[string, string, Sprite]> = [
  ['tree', 'primary.tree.mesquite', treeMesquite()],
  ['tree', 'primary.tree.oak', treeOak()],
  ['tree', 'primary.tree.cypress', treeCypress()],
  ['tree', 'primary.tree.dead', treeDead()],
  ['veg', 'primary.veg.bush', bush()],
  ['veg', 'primary.veg.shrub', shrub()],
  ['veg', 'primary.veg.stump', stump()],
  ['veg', 'primary.veg.cactus', cactus()],
  ['veg', 'primary.veg.log', log()],
  ['veg', 'primary.veg.tumbleweed', tumbleweed()],
  ['ruin', 'primary.ruin.car_sedan', carSedan()],
  ['ruin', 'primary.ruin.scrap_heap', scrapHeap()],
  ['ruin', 'primary.ruin.rubble_pile', rubblePile()],
  ['ruin', 'primary.ruin.oil_drum', oilDrum()],
  ['ruin', 'primary.ruin.crate', crate()],
  ['ruin', 'primary.ruin.barrel', barrel()],
  ['ruin', 'primary.ruin.tire', tire()],
  ['ruin', 'primary.ruin.utility_pole', utilityPole()],
  ['ruin', 'primary.ruin.fallen_sign', fallenSign()],
  ['fence', 'primary.fence.wood', fenceWood()],
  ['fence', 'primary.fence.chain', fenceChain()],
  ['fence', 'primary.fence.scrap', fenceScrap()],
  ['wall', 'primary.wall.concrete', wallConcrete()],
  ['wall', 'primary.wall.brick', wallBrick()],
  ['barrier', 'primary.barrier.boulder', boulder()],
  ['gate', 'primary.gate.overgrowth.blocked', overgrowthBlocked()],
  ['gate', 'primary.gate.overgrowth.cleared', overgrowthCleared()],
  ['gate', 'primary.gate.rockblock.blocked', rockBlocked()],
  ['gate', 'primary.gate.rockblock.cleared', rockCleared()],
  ['gate', 'primary.gate.debris.blocked', debrisBlocked()],
  ['gate', 'primary.gate.debris.cleared', debrisCleared()],
  ['gate', 'primary.gate.dark.blocked', darkBlocked()],
  ['gate', 'primary.gate.dark.cleared', darkCleared()],
  ['fx', 'primary.fx.flame', flame()],
];
for (const [cat, id, s] of ITEMS) save(s, `${cat}/${id}`);

// ---- contact sheet -------------------------------------------------------
const cell = 132;
const COLS = 6;
const sheetRows = Math.ceil(ITEMS.length / COLS);
const sheet = new Sprite(COLS * cell, sheetRows * cell);
sheet.rect(0, 0, sheet.w, sheet.h, [24, 22, 28, 255]);
ITEMS.forEach(([, , s], i) => {
  const cx = (i % COLS) * cell + cell / 2;
  const cy = Math.floor(i / COLS) * cell + cell - 6;
  const sc = Math.min(2, Math.floor((cell - 8) / Math.max(s.w, s.h)) || 1);
  const ox = Math.round(cx - (s.w * sc) / 2);
  const oy = Math.round(cy - s.h * sc);
  for (let y = 0; y < s.h; y++)
    for (let x = 0; x < s.w; x++) {
      const c = s.get(x, y);
      if ((c[3] ?? 0) === 0) continue;
      for (let dy = 0; dy < sc; dy++) for (let dx = 0; dx < sc; dx++) sheet.set(ox + x * sc + dx, oy + y * sc + dy, c);
    }
});
{
  const png = new PNG({ width: sheet.w, height: sheet.h });
  png.data.set(sheet.data);
  writeFileSync(join(OUT, '_contact_props.png'), PNG.sync.write(png));
}
console.log(`primary props: ${ITEMS.length} objects → assets/tiles/primary/ (+ _contact_props.png)`);
