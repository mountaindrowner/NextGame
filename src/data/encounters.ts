import type { EncounterZone } from '../core/defs';

/**
 * Encounter tables — one biome-themed zone per route/colony, levels climbing
 * the critical path so grinding keeps pace (the auto-player found a flat curve
 * and a Chancel cliff). Weights sum to 100 per zone. Rideables (47 Mowlet line,
 * 70 Rustbed line, 75 Kartwheel) are seeded so fast-travel unlocks mid-game.
 */
export const ENCOUNTER_ZONES: readonly EncounterZone[] = [
  {
    // the-field — prairie commons (the opening, L2-5)
    id: 'field-grass',
    rate: 32, // /255 per step, Gen 3 walking-grass rate
    slots: [
      { speciesNum: 10, weight: 18, minLevel: 2, maxLevel: 4 }, // Toastlet
      { speciesNum: 19, weight: 16, minLevel: 2, maxLevel: 4 }, // Vacuette
      { speciesNum: 21, weight: 14, minLevel: 2, maxLevel: 4 }, // Fanlet
      { speciesNum: 24, weight: 10, minLevel: 3, maxLevel: 4 }, // Mailstrom
      { speciesNum: 12, weight: 10, minLevel: 3, maxLevel: 5 }, // Wavelet
      { speciesNum: 15, weight: 9, minLevel: 3, maxLevel: 5 }, // Filaglow
      { speciesNum: 47, weight: 8, minLevel: 3, maxLevel: 5 }, // Mowlet (rideable line — Mowrauder rides)
      { speciesNum: 32, weight: 7, minLevel: 3, maxLevel: 5 }, // Staplejaw
      { speciesNum: 18, weight: 5, minLevel: 3, maxLevel: 5 }, // Beeplet
      { speciesNum: 41, weight: 3, minLevel: 4, maxLevel: 5 }, // Tumblet (rare VERDANT)
    ],
  },
  {
    // farm road — prairie → early Westward (L4-7)
    id: 'farmroad-fence',
    rate: 28,
    slots: [
      { speciesNum: 10, weight: 14, minLevel: 4, maxLevel: 6 }, // Toastlet
      { speciesNum: 49, weight: 14, minLevel: 5, maxLevel: 7 }, // Sawlet (BREAKER)
      { speciesNum: 54, weight: 14, minLevel: 4, maxLevel: 6 }, // Cellet (VOLT)
      { speciesNum: 30, weight: 14, minLevel: 5, maxLevel: 7 }, // Vendlet (FRAME)
      { speciesNum: 21, weight: 12, minLevel: 4, maxLevel: 6 }, // Fanlet
      { speciesNum: 19, weight: 12, minLevel: 4, maxLevel: 6 }, // Vacuette
      { speciesNum: 70, weight: 12, minLevel: 5, maxLevel: 7 }, // Rustbed (rideable line — Rustler rides)
      { speciesNum: 41, weight: 8, minLevel: 6, maxLevel: 7 }, // Tumblet (VERDANT)
    ],
  },
  {
    // railhead — rail-yard industrial (L6-9); Kartwheel = instant rideable here
    id: 'railhead-yard',
    rate: 26,
    slots: [
      { speciesNum: 49, weight: 18, minLevel: 6, maxLevel: 9 }, // Sawlet (BREAKER)
      { speciesNum: 30, weight: 16, minLevel: 6, maxLevel: 9 }, // Vendlet (FRAME)
      { speciesNum: 54, weight: 16, minLevel: 6, maxLevel: 8 }, // Cellet (VOLT)
      { speciesNum: 51, weight: 12, minLevel: 7, maxLevel: 9 }, // Buzzsawyer (BREAKER)
      { speciesNum: 58, weight: 12, minLevel: 7, maxLevel: 9 }, // Insulet (VOLT)
      { speciesNum: 75, weight: 10, minLevel: 7, maxLevel: 9 }, // Kartwheel (RIDEABLE — unlocks fast-travel)
      { speciesNum: 46, weight: 10, minLevel: 6, maxLevel: 8 }, // Barbwyre (FRAME)
      { speciesNum: 36, weight: 6, minLevel: 7, maxLevel: 9 }, // Digitall (SIGNAL)
    ],
  },
  {
    // cistern — flooded waterworks (L8-11): COOLANT + early SONIC/OPTIC + VERDANT
    id: 'cistern-reeds',
    rate: 25,
    slots: [
      { speciesNum: 38, weight: 16, minLevel: 8, maxLevel: 10 }, // Spoutlet (COOLANT)
      { speciesNum: 25, weight: 14, minLevel: 8, maxLevel: 11 }, // Frostbox (COOLANT)
      { speciesNum: 88, weight: 14, minLevel: 8, maxLevel: 10 }, // Tweetle (SONIC)
      { speciesNum: 128, weight: 12, minLevel: 8, maxLevel: 11 }, // Cubelet (COOLANT)
      { speciesNum: 15, weight: 12, minLevel: 9, maxLevel: 11 }, // Filaglow (OPTIC)
      { speciesNum: 108, weight: 12, minLevel: 9, maxLevel: 11 }, // Lampyre (OPTIC, LUMEN)
      { speciesNum: 43, weight: 10, minLevel: 9, maxLevel: 11 }, // Pricklet (VERDANT, rare)
      { speciesNum: 40, weight: 10, minLevel: 10, maxLevel: 11 }, // Suppressure (COOLANT)
    ],
  },
  {
    // bastion — quarry-fortress (L10-13): FRAME/BREAKER stone & iron
    id: 'bastion-scree',
    rate: 27,
    slots: [
      { speciesNum: 52, weight: 16, minLevel: 10, maxLevel: 13 }, // Drillbit (BREAKER)
      { speciesNum: 135, weight: 14, minLevel: 10, maxLevel: 13 }, // Towertank (FRAME)
      { speciesNum: 138, weight: 14, minLevel: 10, maxLevel: 12 }, // Binlet (FRAME)
      { speciesNum: 30, weight: 14, minLevel: 10, maxLevel: 13 }, // Vendlet (FRAME)
      { speciesNum: 136, weight: 12, minLevel: 11, maxLevel: 13 }, // Forklet (FRAME, HAUL)
      { speciesNum: 85, weight: 12, minLevel: 10, maxLevel: 12 }, // Smokelet (THERM)
      { speciesNum: 46, weight: 10, minLevel: 11, maxLevel: 13 }, // Barbwyre (FRAME)
      { speciesNum: 51, weight: 8, minLevel: 11, maxLevel: 13 }, // Buzzsawyer (BREAKER)
    ],
  },
  {
    // redoubt — the Bunker yard (L13-16): MOTOR/military + UTILITY
    id: 'redoubt-scrap',
    rate: 24,
    slots: [
      { speciesNum: 82, weight: 16, minLevel: 13, maxLevel: 16 }, // Tillbit (MOTOR)
      { speciesNum: 80, weight: 14, minLevel: 13, maxLevel: 16 }, // Balelet (MOTOR)
      { speciesNum: 30, weight: 14, minLevel: 13, maxLevel: 15 }, // Vendlet (FRAME)
      { speciesNum: 68, weight: 12, minLevel: 13, maxLevel: 16 }, // Nozzlet (THERM)
      { speciesNum: 76, weight: 12, minLevel: 13, maxLevel: 15 }, // Remotorist (MOTOR)
      { speciesNum: 120, weight: 12, minLevel: 13, maxLevel: 16 }, // Inkjetsam (UTILITY)
      { speciesNum: 108, weight: 10, minLevel: 14, maxLevel: 16 }, // Lampyre (OPTIC)
      { speciesNum: 46, weight: 10, minLevel: 14, maxLevel: 16 }, // Barbwyre (FRAME)
    ],
  },
  {
    // trinity — the drowned forest (L16-20): VERDANT/hybrid + wetland
    id: 'trinity-reeds',
    rate: 22,
    slots: [
      { speciesNum: 43, weight: 18, minLevel: 16, maxLevel: 19 }, // Pricklet (VERDANT)
      { speciesNum: 88, weight: 16, minLevel: 16, maxLevel: 19 }, // Tweetle (SONIC)
      { speciesNum: 41, weight: 14, minLevel: 16, maxLevel: 19 }, // Tumblet (VERDANT)
      { speciesNum: 62, weight: 14, minLevel: 17, maxLevel: 20 }, // Whirlet (VOLT)
      { speciesNum: 108, weight: 12, minLevel: 17, maxLevel: 20 }, // Lampyre (OPTIC)
      { speciesNum: 15, weight: 10, minLevel: 17, maxLevel: 20 }, // Filaglow (OPTIC)
      { speciesNum: 38, weight: 10, minLevel: 17, maxLevel: 20 }, // Spoutlet (COOLANT)
      { speciesNum: 45, weight: 6, minLevel: 18, maxLevel: 20 }, // Bonnetbloom (VERDANT, very rare)
    ],
  },
  {
    // The Chancel catacombs (Colony 5, Act II): SIGNAL/OPTIC/SONIC. Levels eased
    // so a player who climbed the route zones (arriving ~Lv20-22) isn't walled.
    id: 'chancel-crypt',
    rate: 28,
    slots: [
      { speciesNum: 109, weight: 22, minLevel: 23, maxLevel: 26 }, // Staticub (SIGNAL)
      { speciesNum: 112, weight: 20, minLevel: 23, maxLevel: 26 }, // Cartrudge (SIGNAL)
      { speciesNum: 115, weight: 18, minLevel: 24, maxLevel: 27 }, // Pinglet (SIGNAL)
      { speciesNum: 98, weight: 15, minLevel: 24, maxLevel: 27 }, // Glowtube (OPTIC)
      { speciesNum: 102, weight: 12, minLevel: 25, maxLevel: 28 }, // Peeplens (OPTIC)
      { speciesNum: 96, weight: 8, minLevel: 25, maxLevel: 28 }, // Spoolturn (SONIC)
      { speciesNum: 108, weight: 5, minLevel: 26, maxLevel: 29 }, // Lampyre (OPTIC, LUMEN)
    ],
  },
];

export const ZONES_BY_ID: ReadonlyMap<string, EncounterZone> = new Map(
  ENCOUNTER_ZONES.map((z) => [z.id, z]),
);
