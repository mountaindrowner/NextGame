import type { EncounterZone } from '../core/defs';

/** The Field — slice encounter tables (weights sum to 100, Gen 3 shape). */
export const ENCOUNTER_ZONES: readonly EncounterZone[] = [
  {
    id: 'field-grass',
    rate: 32, // /255 per step, Gen 3 walking-grass rate
    slots: [
      { speciesNum: 10, weight: 20, minLevel: 2, maxLevel: 4 }, // Toastlet
      { speciesNum: 19, weight: 20, minLevel: 2, maxLevel: 4 }, // Vacuette
      { speciesNum: 21, weight: 15, minLevel: 2, maxLevel: 4 }, // Fanlet
      { speciesNum: 24, weight: 10, minLevel: 3, maxLevel: 4 }, // Mailstrom
      { speciesNum: 15, weight: 10, minLevel: 3, maxLevel: 5 }, // Filaglow
      { speciesNum: 12, weight: 10, minLevel: 3, maxLevel: 5 }, // Wavelet
      { speciesNum: 18, weight: 5, minLevel: 3, maxLevel: 5 }, // Beeplet
      { speciesNum: 32, weight: 5, minLevel: 3, maxLevel: 5 }, // Staplejaw
      { speciesNum: 30, weight: 4, minLevel: 4, maxLevel: 5 }, // Vendlet
      { speciesNum: 41, weight: 1, minLevel: 4, maxLevel: 5 }, // Tumblet (rare)
    ],
  },
  {
    id: 'field-debris',
    rate: 25,
    slots: [
      { speciesNum: 32, weight: 30, minLevel: 3, maxLevel: 5 },
      { speciesNum: 30, weight: 25, minLevel: 4, maxLevel: 6 },
      { speciesNum: 46, weight: 20, minLevel: 4, maxLevel: 6 }, // Barbwyre
      { speciesNum: 29, weight: 15, minLevel: 4, maxLevel: 6 }, // Registill
      { speciesNum: 36, weight: 10, minLevel: 5, maxLevel: 6 }, // Digitall
    ],
  },
];

export const ZONES_BY_ID: ReadonlyMap<string, EncounterZone> = new Map(
  ENCOUNTER_ZONES.map((z) => [z.id, z]),
);
