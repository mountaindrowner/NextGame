/**
 * Colony Patches (the locked-canon colony token; GDD §10.8). Each colony's
 * Warden grants one when beaten — the gym-badge analog that gates progress.
 * Pure data, node-testable, mirrors src/data/shops.ts.
 *
 * Canon note (for Mark): docs/compendium/factions.md names the colonies/leaders
 * differently (Possum Crown / Damkeeper Lyle / Crown Patch …) than the in-game
 * warden cast actually placed in the maps (Marrow·Bloom·Stone·Pike·Hale, per
 * CLAUDE.md). These ids follow the built maps; the display names are [PROPOSAL]
 * pending a lock that reconciles the two.
 */
export interface PatchDef {
  id: string;
  name: string; // [PROPOSAL]
  colony: string;
  warden: string;
  mapId: string;
}

export const PATCHES: Record<string, PatchDef> = {
  'patch-railhead': { id: 'patch-railhead', name: 'Junction Patch', colony: 'Railhead', warden: 'Warden Dell Marrow', mapId: 'railhead' },
  'patch-cistern': { id: 'patch-cistern', name: 'Tide Patch', colony: 'The Cistern', warden: 'Warden Etta Bloom', mapId: 'cistern' },
  'patch-bastion': { id: 'patch-bastion', name: 'Bulwark Patch', colony: 'Bastion', warden: 'Warden Calder Stone', mapId: 'bastion' },
  'patch-redoubt': { id: 'patch-redoubt', name: 'Vigil Patch', colony: 'Redoubt', warden: 'Warden Augusta Pike', mapId: 'redoubt' },
  'patch-chancel': { id: 'patch-chancel', name: 'Choir Patch', colony: 'The Chancel', warden: 'Warden Verity Hale', mapId: 'chancel' },
};

/** The Patch a given colony map awards (for lookups). */
export const PATCH_BY_MAP: Record<string, string> = Object.fromEntries(
  Object.values(PATCHES).map((p) => [p.mapId, p.id]),
);

export const patchName = (id: string): string => PATCHES[id]?.name ?? id;

/** Total colonies on the critical path (the "/8 Patches" denominator, GDD canon). */
export const TOTAL_PATCHES = 8;
