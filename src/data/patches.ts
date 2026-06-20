/**
 * Colony Patches (the locked-canon colony token; GDD §10.8). Each colony's
 * Warden grants one when beaten — the gym-badge analog that gates progress.
 * Pure data, node-testable, mirrors src/data/shops.ts.
 *
 * Reconciled to canon (2026-06-20): the colony + Warden names follow the
 * creator's Critical Path Locations + Principal Cast — Railhead/Cistern/Bastion/
 * Redoubt/Chancel/Redbed/Array/Verge with Wardens Marrow·Bloom·Stone·Pike·Hale·
 * Sol·Frost·Amos. (An earlier docs/compendium/factions.md draft had invented a
 * different set — Possum Crown / Damkeeper Lyle / … — now corrected.) Patch
 * display names are [PROPOSAL] pending Mark's lock. The first 5 colonies are
 * built; the last 3 are defined here for the full "/8" set and auto-wire when
 * their maps land.
 */
export interface PatchDef {
  id: string;
  name: string; // [PROPOSAL]
  colony: string;
  warden: string;
  mapId: string;
  built: boolean;
}

export const PATCHES: Record<string, PatchDef> = {
  'patch-railhead': { id: 'patch-railhead', name: 'Junction Patch', colony: 'Railhead', warden: 'Warden Dell Marrow', mapId: 'railhead', built: true },
  'patch-cistern': { id: 'patch-cistern', name: 'Tide Patch', colony: 'The Cistern', warden: 'Warden Etta Bloom', mapId: 'cistern', built: true },
  'patch-bastion': { id: 'patch-bastion', name: 'Bulwark Patch', colony: 'Bastion', warden: 'Warden Calder Stone', mapId: 'bastion', built: true },
  'patch-redoubt': { id: 'patch-redoubt', name: 'Vigil Patch', colony: 'Redoubt', warden: 'Warden Augusta Pike', mapId: 'redoubt', built: true },
  'patch-chancel': { id: 'patch-chancel', name: 'Choir Patch', colony: 'The Chancel', warden: 'Warden Verity Hale', mapId: 'chancel', built: true },
  'patch-redbed': { id: 'patch-redbed', name: 'Hand Patch', colony: 'Redbed', warden: 'Warden Sol', mapId: 'redbed', built: false },
  'patch-array': { id: 'patch-array', name: 'Lattice Patch', colony: 'The Array', warden: 'Warden Tobias Frost', mapId: 'array', built: false },
  'patch-verge': { id: 'patch-verge', name: 'Holdout Patch', colony: 'The Verge', warden: 'Warden Ruth Amos', mapId: 'verge', built: false },
};

/** The Patch a given colony map awards (for lookups). */
export const PATCH_BY_MAP: Record<string, string> = Object.fromEntries(
  Object.values(PATCHES).map((p) => [p.mapId, p.id]),
);

export const patchName = (id: string): string => PATCHES[id]?.name ?? id;

/** Total colonies on the critical path (the "/8 Patches" denominator, GDD canon). */
export const TOTAL_PATCHES = 8;
