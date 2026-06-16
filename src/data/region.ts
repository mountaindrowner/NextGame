/**
 * The Blackland — region graph (docs/world-structure.md). Each playable map is
 * a node with up to four edge neighbours (N/S/E/W) plus a biome + hive tier.
 * The overworld walker reads this to cross map edges seamlessly (edge-warps),
 * turning the linear chain into a connected, expansive region. Portal warps
 * (the elevator, doors, caves) stay as per-map `exits`.
 */
export type HiveTier = 'none' | 'light' | 'med' | 'heavy' | 'max';

export interface RegionNode {
  biome: string;
  hive: HiveTier;
  n?: string;
  s?: string;
  e?: string;
  w?: string;
}

// n/s/e/w here are the OPEN-EDGE (seamless edge-warp) connections only. Portal
// connections (the elevator, Railhead→Cistern, Cistern→Bastion, Bastion→Redoubt)
// stay as per-map `exits` until those maps' borders are opened too.
export const REGION: Record<string, RegionNode> = {
  ohmstead: { biome: 'underground', hive: 'none' },
  'the-field': { biome: 'prairie', hive: 'none', n: 'farmroad' },
  farmroad: { biome: 'prairie', hive: 'none', s: 'the-field', n: 'railhead' },
  railhead: { biome: 'industrial', hive: 'none', s: 'farmroad' },
  cistern: { biome: 'flooded', hive: 'none' },
  bastion: { biome: 'quarry', hive: 'light' },
  redoubt: { biome: 'military', hive: 'med' },
  trinity: { biome: 'flooded', hive: 'med' },
  chancel: { biome: 'sacred', hive: 'med' },
};

export type Dir4 = 'n' | 's' | 'e' | 'w';
export const OPPOSITE: Record<Dir4, Dir4> = { n: 's', s: 'n', e: 'w', w: 'e' };

export function neighbor(mapId: string, dir: Dir4): string | undefined {
  return REGION[mapId]?.[dir];
}

// ---- world-map layout (the Town-Map screen + fast-travel) ----------------
// A schematic placement of each built map on a small grid, plus the visible
// links (open-edge + portal) between them, so the world-map can draw the
// region as a node diagram. `garage` maps are the recharge hubs you can
// fast-travel to (once visited, on a rideable Ohm).
export interface MapMeta {
  label: string;
  col: number;
  row: number;
  biome: string;
  garage: boolean;
}

export const WORLD_MAP: Record<string, MapMeta> = {
  ohmstead: { label: 'Ohmstead', col: 0, row: 4, biome: 'underground', garage: false },
  'the-field': { label: 'The Field', col: 0, row: 3, biome: 'prairie', garage: true },
  farmroad: { label: 'Farm Road', col: 0, row: 2, biome: 'prairie', garage: false },
  railhead: { label: 'Railhead', col: 0, row: 1, biome: 'industrial', garage: true },
  cistern: { label: 'Cistern', col: 1, row: 1, biome: 'flooded', garage: false },
  bastion: { label: 'Bastion', col: 2, row: 1, biome: 'quarry', garage: true },
  redoubt: { label: 'Redoubt', col: 3, row: 1, biome: 'military', garage: true },
  trinity: { label: 'Trinity', col: 3, row: 2, biome: 'flooded', garage: false },
  chancel: { label: 'Chancel', col: 4, row: 2, biome: 'sacred', garage: true },
};

/** Drawn connections between world-map nodes (both open-edge and portal). */
export const WORLD_LINKS: Array<[string, string]> = [
  ['ohmstead', 'the-field'],
  ['the-field', 'farmroad'],
  ['farmroad', 'railhead'],
  ['railhead', 'cistern'],
  ['cistern', 'bastion'],
  ['bastion', 'redoubt'],
  ['redoubt', 'trinity'],
  ['trinity', 'chancel'],
];

export const BIOME_COLORS: Record<string, number> = {
  underground: 0x6a5638,
  prairie: 0x6e8a3a,
  industrial: 0x868e98,
  flooded: 0x3a7894,
  quarry: 0xa89058,
  military: 0x6e7660,
  sacred: 0x9a7ab0,
};

/** Species numbers that grant ground fast-travel (Manifest distribution note:
 * Zoomoped, Rustler/Longhauler, Kartwheel, Mowrauder). */
export const RIDEABLES: ReadonlySet<number> = new Set([48, 71, 72, 74, 75]);
