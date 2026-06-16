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
  {
    // The Chancel catacombs (Colony 5, Act II): SIGNAL/OPTIC/SONIC — the cult's
    // eerie INFO/HACK Ohms and the saints in the crypt dust. Post-Redoubt levels.
    id: 'chancel-crypt',
    rate: 28,
    slots: [
      { speciesNum: 109, weight: 22, minLevel: 26, maxLevel: 30 }, // Staticub (SIGNAL)
      { speciesNum: 112, weight: 20, minLevel: 26, maxLevel: 30 }, // Cartrudge (SIGNAL)
      { speciesNum: 115, weight: 18, minLevel: 27, maxLevel: 31 }, // Pinglet (SIGNAL)
      { speciesNum: 98, weight: 15, minLevel: 27, maxLevel: 31 }, // Glowtube (OPTIC)
      { speciesNum: 102, weight: 12, minLevel: 28, maxLevel: 32 }, // Peeplens (OPTIC)
      { speciesNum: 96, weight: 8, minLevel: 28, maxLevel: 32 }, // Spoolturn (SONIC, archives confessions)
      { speciesNum: 108, weight: 5, minLevel: 29, maxLevel: 33 }, // Lampyre (OPTIC, LUMEN)
    ],
  },
];

export const ZONES_BY_ID: ReadonlyMap<string, EncounterZone> = new Map(
  ENCOUNTER_ZONES.map((z) => [z.id, z]),
);
