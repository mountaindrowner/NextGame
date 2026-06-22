/**
 * Field abilities (GDD): traversal powers an Ohm grants in the overworld —
 * SHEAR · BREACH · HAUL · LUMEN · HOVER (FLIGHT later). v1 ships HOVER, the
 * Cistern's gate: an Ohm in the party that hovers carries you across flooded
 * water. Pure data (no Phaser); the scene reads partyHasFieldAbility.
 */
export type FieldAbility = 'SHEAR' | 'BREACH' | 'HAUL' | 'LUMEN' | 'HOVER';

/** Species that grant each field ability. HOVER = the Drone starter line
 * (Dronelet→Buzzhawk→Sentinad), which the canon says "learns HOVER". */
export const FIELD_ABILITY_SPECIES: Record<FieldAbility, ReadonlySet<number>> = {
  HOVER: new Set([4, 5, 6]),
  SHEAR: new Set<number>(),
  BREACH: new Set<number>(),
  HAUL: new Set<number>(),
  LUMEN: new Set<number>(),
};

/** The Cistern lends a survey Dronelet so any party can cross the flood. */
export const HOVER_GIFT_SPECIES = 4;

export function partyHasFieldAbility(party: ReadonlyArray<{ speciesNum: number }>, ability: FieldAbility): boolean {
  const set = FIELD_ABILITY_SPECIES[ability];
  return party.some((p) => set.has(p.speciesNum));
}
