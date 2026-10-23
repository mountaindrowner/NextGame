/**
 * The active area's ground + collision. Builders (buildings, props, terrain)
 * read heights and register solid footprints here, so the same hand-modeled
 * pieces can be placed in any area. `setWorld` is called once per area load,
 * before anything is built.
 */

export interface Rect { x0: number; z0: number; x1: number; z1: number }

export interface TileWorld {
  cols: number;
  rows: number;
  /** Ground glyph at a cell: g prairie · T tall grass · d road · w water · # wall/scrub · . floor */
  cell(x: number, z: number): string;
  height(x: number, z: number): number;
  /** Gaps in the edge apron where a road runs off the map. */
  openings?: Array<{ side: 'n' | 's'; x0: number; x1: number }>;
  /** Painted road centre-line test (world units). */
  centerLine?(x: number, z: number): boolean;
  seed?: number;
  /** Paint a ground glyph the shared painter doesn't know (rail ballast, gravel…); return undefined to fall through. */
  paint?(glyph: string, x: number, z: number, fine: number): [number, number, number] | undefined;
}

const solids: Rect[] = [];
const resets: Array<() => void> = [];
let W: TileWorld = { cols: 1, rows: 1, cell: () => '#', height: () => 0 };

export function setWorld(w: TileWorld): void {
  W = w;
  solids.length = 0;
  for (const r of resets) r();
}
export const world = (): TileWorld => W;
export const cell = (x: number, z: number): string => (x >= 0 && z >= 0 && x < W.cols && z < W.rows ? W.cell(x, z) : '#');
export const heightAt = (x: number, z: number): number => W.height(x, z);

/** Register module state to clear whenever a new area loads. */
export function onWorldReset(fn: () => void): void { resets.push(fn); }

export function addSolid(x0: number, z0: number, x1: number, z1: number): void {
  solids.push({ x0: Math.min(x0, x1), z0: Math.min(z0, z1), x1: Math.max(x0, x1), z1: Math.max(z0, z1) });
}
export function solidRects(): readonly Rect[] { return solids; }
export function hitsSolid(x: number, z: number, r: number): boolean {
  for (const s of solids) if (x + r > s.x0 && x - r < s.x1 && z + r > s.z0 && z - r < s.z1) return true;
  return false;
}
export function insideSolid(x: number, z: number, pad = 0.1): boolean {
  for (const s of solids) if (x > s.x0 - pad && x < s.x1 + pad && z > s.z0 - pad && z < s.z1 + pad) return true;
  return false;
}
