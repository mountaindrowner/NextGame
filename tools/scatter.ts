/**
 * Lived-in scatter pass (Clutter & Detail Layer doc) — bakes the universal
 * floor/decal/reclamation layer onto a composed map so it reads inhabited and
 * worn, not a clean tilemap. Decals only (no collision change → reachability is
 * preserved). Scatter logic per the doc §3: clutter pools at walls/corners,
 * wear on desire lines, weeds/moss reclaim from the edges; density-tiered;
 * biome-filtered; keep-clear honoured (never on spawn/exits/interacts/NPCs).
 */
import { Grid } from './gridart';
import { Sprite } from './spritekit';
import { Rng } from '../src/core/rng';

export type Density = 'tidy' | 'lived_in' | 'cluttered' | 'squalid' | 'ruined';
const RATE: Record<Density, number> = { tidy: 0.05, lived_in: 0.12, cluttered: 0.22, squalid: 0.34, ruined: 0.46 };

// ---- tiny clutter drawers (6–14px) --------------------------------------
const D = {
  paper: (): Sprite => { const g = new Grid(9, 6); const r = new Rng(1); for (let k = 0; k < 3; k++) g.box(r.int(0, 5), r.int(0, 3), r.int(3, 4), 2, '*', 'w', 'W'); g.outline('X'); return g.render(); },
  can: (): Sprite => { const g = new Grid(8, 6); g.box(1, 2, 5, 3, 'l', 'a', 'A'); g.set(3, 2, 'b'); g.outline('X'); return g.render(); },
  bolts: (): Sprite => { const g = new Grid(7, 6); const r = new Rng(2); for (let k = 0; k < 4; k++) { g.set(r.int(1, 5), r.int(1, 4), 'a'); g.set(r.int(1, 5), r.int(1, 4), 'l'); } return g.render(); },
  pebbles: (): Sprite => { const g = new Grid(8, 6); const r = new Rng(3); for (let k = 0; k < 5; k++) g.set(r.int(0, 7), r.int(0, 5), r.chance(50) ? 'W' : 'n'); return g.render(); },
  scrap: (): Sprite => { const g = new Grid(9, 7); g.box(1, 2, 6, 4, 'l', 'a', 'A'); g.set(3, 3, 'e'); g.outline('X'); return g.render(); },
  coal: (): Sprite => { const g = new Grid(8, 6); const r = new Rng(4); for (let k = 0; k < 6; k++) g.set(r.int(0, 7), r.int(0, 5), r.chance(50) ? 'X' : 'x'); return g.render(); },
  leaf: (): Sprite => { const g = new Grid(8, 5); const r = new Rng(5); for (let k = 0; k < 4; k++) g.set(r.int(0, 7), r.int(0, 4), r.chance(50) ? 'j' : 'h'); return g.render(); },
  weed: (): Sprite => { const g = new Grid(8, 9); const r = new Rng(6); for (let k = 0; k < 5; k++) { const x = r.int(1, 6); g.set(x, 8, 'g'); g.set(x, 7, 'g'); g.set(x, 6 - r.int(0, 2), r.chance(50) ? 'F' : 'f'); } return g.render(); },
  moss: (): Sprite => { const g = new Grid(10, 6); g.ellipse(5, 4, 4, 2, 'g'); const r = new Rng(7); for (let k = 0; k < 4; k++) g.set(r.int(1, 8), r.int(2, 4), 'F'); return g.render(); },
  twig: (): Sprite => { const g = new Grid(9, 4); g.line(0, 3, 8, 1, 'K'); g.line(4, 2, 6, 3, 'k'); return g.render(); },
};
// decals (translucent, sit on the floor)
function alphaize(s: Sprite, a: number): Sprite { for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const c = s.get(x, y); if ((c[3] ?? 0) > 0) s.set(x, y, [c[0], c[1], c[2], a]); } return s; }
const DECAL = {
  crack: (): Sprite => { const g = new Grid(12, 7); const r = new Rng(8); let x = 0; let y = 3; for (let k = 0; k < 6; k++) { const nx = x + 2; const ny = y + r.int(-1, 1); g.line(x, y, nx, ny, 'x'); x = nx; y = ny; } return alphaize(g.render(), 150); },
  stain: (c: string): (() => Sprite) => () => { const g = new Grid(13, 9); const r = new Rng(9); for (let k = 0; k < 5; k++) g.ellipse(r.int(2, 10), r.int(2, 6), r.int(2, 4), r.int(1, 2), c); return alphaize(g.render(), 120); },
  puddle: (): Sprite => { const g = new Grid(13, 8); g.ellipse(6, 5, 5, 2, 'C'); g.ellipse(5, 4, 3, 1, 'c'); return alphaize(g.render(), 150); },
  dust: (): Sprite => { const g = new Grid(13, 7); const r = new Rng(10); for (let k = 0; k < 4; k++) g.ellipse(r.int(2, 10), r.int(2, 5), r.int(2, 4), 2, 'W'); return alphaize(g.render(), 90); },
};

type Drawer = () => Sprite;
interface Kit { floor: Drawer[]; decal: Drawer[]; reclaim: Drawer; }
function kitFor(biome: string): Kit {
  switch (biome) {
    case 'prairie': return { floor: [D.leaf, D.weed, D.pebbles, D.twig], decal: [DECAL.stain('K'), DECAL.dust], reclaim: D.weed };
    case 'industrial': return { floor: [D.bolts, D.can, D.paper, D.scrap, D.coal], decal: [DECAL.stain('x'), DECAL.crack], reclaim: D.weed };
    case 'flooded': return { floor: [D.moss, D.pebbles, D.leaf], decal: [DECAL.puddle, DECAL.stain('C')], reclaim: D.moss };
    case 'quarry': return { floor: [D.pebbles, D.scrap, D.bolts], decal: [DECAL.dust, DECAL.crack], reclaim: D.weed };
    case 'military': return { floor: [D.can, D.bolts, D.paper, D.scrap], decal: [DECAL.stain('x'), DECAL.crack, DECAL.stain('X')], reclaim: D.weed };
    case 'underground': default: return { floor: [D.bolts, D.pebbles, D.scrap], decal: [DECAL.crack, DECAL.stain('x')], reclaim: D.moss };
  }
}

export interface ScatterOpts {
  cols: number; rows: number; tile: number;
  solid: (c: number, r: number) => boolean; // a cell that blocks (wall/water/prop)
  keepClear?: (c: number, r: number) => boolean; // spawn/exits/interacts/NPCs
  density: Density; biome: string; seed: number;
}

export function scatterClutter(big: Sprite, o: ScatterOpts): number {
  const r = new Rng(o.seed);
  const T = o.tile;
  const kit = kitFor(o.biome);
  const cache = new Map<Drawer, Sprite>();
  const get = (d: Drawer): Sprite => { let s = cache.get(d); if (!s) { s = d(); cache.set(d, s); } return s; };
  const blit = (s: Sprite, x0: number, y0: number): void => {
    for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const c = s.get(x, y); const a = (c[3] ?? 0) / 255; if (a === 0) continue; const px = x0 + x; const py = y0 + y; if (px < 0 || py < 0 || px >= big.w || py >= big.h) continue; const dd = big.get(px, py); big.set(px, py, [Math.round(c[0] * a + dd[0] * (1 - a)), Math.round(c[1] * a + dd[1] * (1 - a)), Math.round(c[2] * a + dd[2] * (1 - a)), 255]); } };
  const open = (c: number, rr: number): boolean => c >= 0 && rr >= 0 && c < o.cols && rr < o.rows && !o.solid(c, rr);
  const nearSolid = (c: number, rr: number): boolean => o.solid(c - 1, rr) || o.solid(c + 1, rr) || o.solid(c, rr - 1) || o.solid(c, rr + 1);
  let n = 0;
  for (let row = 0; row < o.rows; row++)
    for (let c = 0; c < o.cols; c++) {
      if (!open(c, row) || o.keepClear?.(c, row)) continue;
      const edge = nearSolid(c, row);
      let p = RATE[o.density] * (edge ? 2.3 : 1); // clutter pools at walls/corners
      // floor clutter
      if (r.chance(p * 100)) {
        const s = get(kit.floor[r.int(0, kit.floor.length - 1)]!);
        const ox = c * T + r.int(2, T - s.w - 2);
        const oy = row * T + r.int(T / 2, T - s.h - 1); // weighted to lower half (depth)
        blit(s, ox, oy);
        n++;
      }
      // decal wear (sparser)
      if (r.chance(p * 55)) {
        const s = get(kit.decal[r.int(0, kit.decal.length - 1)]!);
        blit(s, c * T + r.int(1, T - s.w - 1), row * T + r.int(1, T - s.h - 1));
        n++;
      }
      // reclamation creeping from the edges
      if (edge && r.chance(p * 45)) {
        const s = get(kit.reclaim);
        blit(s, c * T + r.int(2, T - s.w - 2), row * T + r.int(4, T - s.h - 1));
        n++;
      }
    }
  return n;
}
