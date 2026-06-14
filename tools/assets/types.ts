/**
 * Asset system — label/record schema (Asset Bible Part A §1–§2, translated to
 * the locked HD grid method per Mark 2026-06-14).
 *
 * The Asset Bible governs *organization*: stable IDs, a full label set per
 * asset, kits as scope gates, the R1–R12 placement rules, the Area×Kit allow
 * matrix, and variant/prop templates. We keep all of that. We DROP the Bible's
 * Gen-3 art numbers (16×16, ≤16 colors, Tiled .tsj) in favor of canon: 32px
 * tiles, the grid method (`tools/gridart.ts`), a cohesive limited palette per
 * kit, and the depth+density laws. So `tile_px = 32`, palettes are "limited &
 * cohesive" rather than a hard 16-cap, and assets are emitted as grid-method
 * PNGs the map composers bake — not Tiled tilesets.
 */

export const TILE_PX = 32; // HD (was Gen-3 16)

export type Kit =
  | 'primary'
  | 'building'
  | 'dungeon.cave'
  | 'dungeon.mine'
  | 'overlay.hive'
  | `sec.${string}`;

export type Biome =
  | 'prairie'
  | 'urban'
  | 'quarry'
  | 'flooded'
  | 'forest'
  | 'red_hardpan'
  | 'industrial'
  | 'sacred'
  | 'military'
  | 'data'
  | 'interior'
  | 'underground'
  | 'multi';

export type AssetType = 'autotile' | 'single' | 'prop' | 'object' | 'anim';
export type Layer = 'bottom' | 'top' | 'object';
export type Collision = 'pass' | 'solid' | 'ledge_n' | 'ledge_s' | 'ledge_e' | 'ledge_w' | 'water' | 'mask';
export type Gate = 'none' | 'shear' | 'breach' | 'haul' | 'lumen';
export type GateState = 'blocked' | 'cleared';
export type Phase = 'slice' | 'act1' | 'act2' | 'act3' | 'optional' | 'postgame';

/**
 * Variant templates (Asset Bible §5), retuned for the HD grid method. The
 * Bible's Gen-3 counts assume full Wang/edge tilesets (47-blob, 16-edge); our
 * composers bake maps and blend material seams procedurally (e.g. Ohmstead's
 * rock↔floor crumble pass), so a ground "autotile" is a small set of seeded
 * variants (≥3 per the density law) plus procedural edges — not a 47-tile set.
 * These counts reflect what the generators actually emit.
 */
export const TEMPLATES = {
  terrain_blob: 4, // ≥3 seeded variants; edges procedural
  edge16: 3,
  cliff: 6, // face, face_tall, top, 2 corners, ramp
  fence_run: 8, // h, v, post, 2 corners, tee, gate_open, gate_closed
  wall_run: 8,
  door: 3, // closed, mid, open
} as const;
export type TemplateName = keyof typeof TEMPLATES;

export interface AssetRecord {
  id: string; // kit.category.subcategory.name (lowercase snake)
  display_name: string;
  kit: Kit;
  biome: Biome;
  type: AssetType;
  layer: Layer;
  collision: Collision;
  elev: string; // "0".."n" or "na"
  pal: number; // 0–5 primary, 6–12 secondary
  phase: Phase;
  gen_prompt: string;
  // type-specific
  template?: TemplateName; // autotile
  footprint?: [number, number]; // prop: cols × rows (tiles)
  anchor?: [number, number];
  layer_split?: { bottom: number[]; top: number[] };
  collision_mask?: number[][];
  variants?: string[]; // weathering etc.
  anim?: { frames: number; fps: number } | null;
  gate?: Gate;
  state?: GateState; // required when gate !== 'none'
  hero?: boolean; // a focal landmark asset (density law)
}

/** Saturation tiers for the hive overlay (R3). */
export type Saturation = 'none' | 'light' | 'med' | 'heavy' | 'max';

export interface AreaDef {
  area: string; // e.g. "ohmstead", "field"
  display: string;
  biome: Biome;
  /** which secondary-class kit the map uses: its own sec, or a dungeon kit, or building */
  secondary: Kit;
  building: boolean; // may enter/compose building interiors
  dungeon: 'none' | 'cave' | 'mine';
  saturation: Saturation; // overlay.hive intensity allowed (R3)
  phase: Phase;
  optional?: boolean;
}

/**
 * Area × Kit ALLOW MATRIX (Asset Bible Part A §3). The critical-path spine
 * plus the optional areas. `secondary` is the one secondary-class kit each
 * map pairs with the shared `primary` (outdoor) — R2's two-tileset rule.
 */
export const AREAS: AreaDef[] = [
  { area: 'ohmstead', display: 'Ohmstead (colony interior)', biome: 'underground', secondary: 'sec.ohmstead', building: true, dungeon: 'none', saturation: 'none', phase: 'slice' },
  { area: 'field', display: 'The Field', biome: 'prairie', secondary: 'sec.field', building: true, dungeon: 'none', saturation: 'none', phase: 'slice' },
  { area: 'railhead', display: 'Railhead — Colony 1', biome: 'industrial', secondary: 'sec.railhead', building: true, dungeon: 'none', saturation: 'none', phase: 'act1' },
  { area: 'cistern', display: 'The Cistern — Colony 2', biome: 'flooded', secondary: 'sec.cistern', building: true, dungeon: 'none', saturation: 'none', phase: 'act1' },
  { area: 'bastion', display: 'Bastion — Colony 3', biome: 'quarry', secondary: 'sec.bastion', building: true, dungeon: 'cave', saturation: 'light', phase: 'act1' },
  { area: 'redoubt', display: 'Redoubt + the Bunker — Colony 4', biome: 'military', secondary: 'sec.redoubt', building: true, dungeon: 'mine', saturation: 'med', phase: 'act1' },
  { area: 'trinity', display: 'Trinity Bottoms', biome: 'forest', secondary: 'sec.trinity', building: false, dungeon: 'none', saturation: 'light', phase: 'act2' },
  { area: 'chancel', display: 'The Chancel — Colony 5', biome: 'sacred', secondary: 'sec.chancel', building: true, dungeon: 'cave', saturation: 'med', phase: 'act2' },
  { area: 'redbed', display: 'Redbed — Colony 6', biome: 'red_hardpan', secondary: 'sec.redbed', building: true, dungeon: 'none', saturation: 'heavy', phase: 'act2' },
  { area: 'array', display: 'The Array — Colony 7', biome: 'data', secondary: 'sec.array', building: true, dungeon: 'none', saturation: 'med', phase: 'act2' },
  { area: 'verge', display: 'The Verge — Colony 8', biome: 'urban', secondary: 'sec.verge', building: true, dungeon: 'none', saturation: 'heavy', phase: 'act2' },
  { area: 'dallas', display: 'Dallas — Act III', biome: 'urban', secondary: 'sec.dallas', building: true, dungeon: 'mine', saturation: 'max', phase: 'act3' },
  { area: 'fortress', display: 'Mountain Fortress (post-game)', biome: 'military', secondary: 'sec.fortress', building: true, dungeon: 'cave', saturation: 'max', phase: 'postgame', optional: true },
  // optional-area lighter secondaries
  { area: 'depot', display: 'Ohm Depot', biome: 'industrial', secondary: 'sec.depot', building: true, dungeon: 'none', saturation: 'none', phase: 'optional', optional: true },
  { area: 'drivein', display: 'The Drive-In', biome: 'prairie', secondary: 'sec.drivein', building: true, dungeon: 'none', saturation: 'none', phase: 'optional', optional: true },
  { area: 'boneyard', display: 'The Boneyard', biome: 'red_hardpan', secondary: 'sec.boneyard', building: false, dungeon: 'none', saturation: 'none', phase: 'optional', optional: true },
  { area: 'silo', display: 'Site C / the Silo', biome: 'military', secondary: 'sec.silo', building: true, dungeon: 'mine', saturation: 'light', phase: 'optional', optional: true },
  { area: 'bogshrine', display: 'The Bog Shrine', biome: 'forest', secondary: 'sec.bogshrine', building: false, dungeon: 'none', saturation: 'light', phase: 'optional', optional: true },
  { area: 'stadium', display: 'The Stadium', biome: 'urban', secondary: 'sec.stadium', building: true, dungeon: 'none', saturation: 'light', phase: 'optional', optional: true },
];

/** Per-kit metatile budget (Asset Bible R8). */
export const BUDGET = { primaryClass: 512, secondaryClass: 512, perMap: 1024 } as const;
