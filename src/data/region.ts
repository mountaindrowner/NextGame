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
};

export type Dir4 = 'n' | 's' | 'e' | 'w';
export const OPPOSITE: Record<Dir4, Dir4> = { n: 's', s: 'n', e: 'w', w: 'e' };

export function neighbor(mapId: string, dir: Dir4): string | undefined {
  return REGION[mapId]?.[dir];
}
