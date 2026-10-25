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
    // the Rust Mile — the dead interstate (L7-10): vehicle Ohms nest in the wrecks. [PROPOSAL] table
    id: 'scar-wrecks',
    rate: 26,
    slots: [
      { speciesNum: 70, weight: 18, minLevel: 7, maxLevel: 10 }, // Rustbed (RIDEABLE pickup)
      { speciesNum: 73, weight: 16, minLevel: 7, maxLevel: 9 }, // Quadlet (ATV)
      { speciesNum: 47, weight: 14, minLevel: 7, maxLevel: 9 }, // Mowlet (RIDEABLE line)
      { speciesNum: 76, weight: 14, minLevel: 7, maxLevel: 9 }, // Remotorist (RC car)
      { speciesNum: 49, weight: 12, minLevel: 7, maxLevel: 10 }, // Sawlet (BREAKER)
      { speciesNum: 46, weight: 10, minLevel: 7, maxLevel: 9 }, // Barbwyre (FRAME)
      { speciesNum: 75, weight: 8, minLevel: 8, maxLevel: 10 }, // Kartwheel (RIDEABLE)
      { speciesNum: 54, weight: 8, minLevel: 7, maxLevel: 9 }, // Cellet (VOLT)
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
  // ---- Railhead Country sections (docs/design/region1-railhead-country.md) — [PROPOSAL] tables
  {
    // the Pickett Place — pasture and yard (L5-7): pump, bale and till Ohms of the working ranch
    id: 'pickett-pasture',
    rate: 24,
    slots: [
      { speciesNum: 65, weight: 20, minLevel: 5, maxLevel: 7 }, // Pumplet
      { speciesNum: 80, weight: 18, minLevel: 5, maxLevel: 7 }, // Balelet
      { speciesNum: 82, weight: 16, minLevel: 5, maxLevel: 7 }, // Tillbit
      { speciesNum: 38, weight: 14, minLevel: 5, maxLevel: 6 }, // Spoutlet
      { speciesNum: 47, weight: 12, minLevel: 5, maxLevel: 7 }, // Mowlet
      { speciesNum: 46, weight: 12, minLevel: 5, maxLevel: 7 }, // Barbwyre
      { speciesNum: 45, weight: 8, minLevel: 6, maxLevel: 7 }, // Bonnetbloom (rare VERDANT)
    ],
  },
  {
    // the Grain Line — rails and grain cars (L7-9): augers, balers, crossing signals; the north end hums. [PROPOSAL]
    id: 'grainline-rail',
    rate: 26,
    slots: [
      { speciesNum: 53, weight: 18, minLevel: 7, maxLevel: 9 }, // Augerlock
      { speciesNum: 80, weight: 16, minLevel: 7, maxLevel: 9 }, // Balelet
      { speciesNum: 82, weight: 14, minLevel: 7, maxLevel: 9 }, // Tillbit
      { speciesNum: 70, weight: 14, minLevel: 7, maxLevel: 9 }, // Rustbed
      { speciesNum: 54, weight: 14, minLevel: 7, maxLevel: 9 }, // Cellet
      { speciesNum: 36, weight: 12, minLevel: 7, maxLevel: 9 }, // Digitall
      { speciesNum: 107, weight: 8, minLevel: 8, maxLevel: 9 }, // Crossignal (rare)
      { speciesNum: 84, weight: 4, minLevel: 9, maxLevel: 9 }, // Combinator (rare)
    ],
  },
  {
    // the Breaks — dry gullies at the edge of the west (L5-8): cactus, wind and sun Ohms. [PROPOSAL]
    id: 'breaks-dry',
    rate: 24,
    slots: [
      { speciesNum: 43, weight: 20, minLevel: 5, maxLevel: 7 }, // Pricklet
      { speciesNum: 41, weight: 18, minLevel: 5, maxLevel: 7 }, // Tumblet
      { speciesNum: 62, weight: 16, minLevel: 5, maxLevel: 8 }, // Whirlet
      { speciesNum: 60, weight: 14, minLevel: 5, maxLevel: 7 }, // Sunplate
      { speciesNum: 46, weight: 12, minLevel: 5, maxLevel: 7 }, // Barbwyre
      { speciesNum: 63, weight: 10, minLevel: 6, maxLevel: 8 }, // Windlass
      { speciesNum: 44, weight: 10, minLevel: 7, maxLevel: 8 }, // Cactacomb (rare)
    ],
  },
  {
    // Stockyard Lane — pens and chutes (L4-6): fence, cart and mailbox Ohms. [PROPOSAL]
    id: 'stockyard-lane',
    rate: 28,
    slots: [
      { speciesNum: 46, weight: 18, minLevel: 4, maxLevel: 6 }, // Barbwyre
      { speciesNum: 47, weight: 16, minLevel: 4, maxLevel: 6 }, // Mowlet
      { speciesNum: 77, weight: 16, minLevel: 4, maxLevel: 6 }, // Cartlet
      { speciesNum: 24, weight: 14, minLevel: 4, maxLevel: 6 }, // Mailstrom
      { speciesNum: 80, weight: 14, minLevel: 4, maxLevel: 6 }, // Balelet
      { speciesNum: 19, weight: 12, minLevel: 4, maxLevel: 5 }, // Vacuette
      { speciesNum: 41, weight: 10, minLevel: 5, maxLevel: 6 }, // Tumblet
    ],
  },
  {
    // the Stockyards — heavy herd Ohms in the pens (L7-10). [PROPOSAL]
    id: 'stockyards-pens',
    rate: 24,
    slots: [
      { speciesNum: 80, weight: 22, minLevel: 7, maxLevel: 9 }, // Balelet
      { speciesNum: 73, weight: 18, minLevel: 7, maxLevel: 9 }, // Quadlet
      { speciesNum: 74, weight: 16, minLevel: 8, maxLevel: 10 }, // Trailbronc
      { speciesNum: 66, weight: 14, minLevel: 7, maxLevel: 9 }, // Jacklift
      { speciesNum: 46, weight: 14, minLevel: 7, maxLevel: 9 }, // Barbwyre
      { speciesNum: 81, weight: 10, minLevel: 9, maxLevel: 10 }, // Baleron
      { speciesNum: 31, weight: 6, minLevel: 9, maxLevel: 10 }, // Vendetta (rare)
    ],
  },
  {
    // the Creek Road — Mule Creek and the ford (L4-7): water, pump and bird Ohms. [PROPOSAL]
    id: 'creek-ford',
    rate: 28,
    slots: [
      { speciesNum: 38, weight: 20, minLevel: 4, maxLevel: 6 }, // Spoutlet
      { speciesNum: 65, weight: 18, minLevel: 4, maxLevel: 7 }, // Pumplet
      { speciesNum: 88, weight: 16, minLevel: 4, maxLevel: 6 }, // Tweetle
      { speciesNum: 12, weight: 14, minLevel: 5, maxLevel: 7 }, // Wavelet
      { speciesNum: 15, weight: 12, minLevel: 5, maxLevel: 7 }, // Filaglow
      { speciesNum: 21, weight: 12, minLevel: 4, maxLevel: 6 }, // Fanlet
      { speciesNum: 39, weight: 8, minLevel: 6, maxLevel: 7 }, // Hydrantler (rare)
    ],
  },
  {
    // Depot Road — the ghost road to the warehouse (L3-6): tool and cart Ohms. [PROPOSAL]
    id: 'depot-road',
    rate: 30,
    slots: [
      { speciesNum: 49, weight: 18, minLevel: 3, maxLevel: 6 }, // Sawlet
      { speciesNum: 52, weight: 16, minLevel: 3, maxLevel: 6 }, // Drillbit
      { speciesNum: 77, weight: 16, minLevel: 3, maxLevel: 5 }, // Cartlet
      { speciesNum: 32, weight: 14, minLevel: 3, maxLevel: 5 }, // Staplejaw
      { speciesNum: 54, weight: 14, minLevel: 3, maxLevel: 6 }, // Cellet
      { speciesNum: 78, weight: 12, minLevel: 4, maxLevel: 6 }, // Stampecart
      { speciesNum: 40, weight: 10, minLevel: 5, maxLevel: 6 }, // Suppressure
    ],
  },
  {
    // Drive-In Road — the edge of a forgotten town (L7-9). [PROPOSAL]
    id: 'driveinroad',
    rate: 26,
    slots: [
      { speciesNum: 68, weight: 18, minLevel: 7, maxLevel: 9 }, // Nozzlet
      { speciesNum: 76, weight: 16, minLevel: 7, maxLevel: 9 }, // Remotorist
      { speciesNum: 33, weight: 14, minLevel: 7, maxLevel: 9 }, // Snoozebox
      { speciesNum: 88, weight: 14, minLevel: 7, maxLevel: 9 }, // Tweetle
      { speciesNum: 29, weight: 14, minLevel: 7, maxLevel: 9 }, // Registill
      { speciesNum: 37, weight: 14, minLevel: 7, maxLevel: 9 }, // Flashbat
      { speciesNum: 36, weight: 10, minLevel: 8, maxLevel: 9 }, // Digitall
    ],
  },
  {
    // the Drive-In — dead cars facing the screen (L8-10): light, sound and screen Ohms. [PROPOSAL]
    id: 'drivein-lot',
    rate: 24,
    slots: [
      { speciesNum: 15, weight: 20, minLevel: 8, maxLevel: 10 }, // Filaglow
      { speciesNum: 37, weight: 18, minLevel: 8, maxLevel: 10 }, // Flashbat
      { speciesNum: 89, weight: 16, minLevel: 8, maxLevel: 10 }, // Wooferal
      { speciesNum: 16, weight: 14, minLevel: 9, maxLevel: 10 }, // Lumenaire
      { speciesNum: 18, weight: 14, minLevel: 8, maxLevel: 10 }, // Beeplet
      { speciesNum: 36, weight: 12, minLevel: 8, maxLevel: 10 }, // Digitall
      { speciesNum: 99, weight: 6, minLevel: 10, maxLevel: 10 }, // Marqueen (rare)
    ],
  },
  {
    // the On-Ramp — the climb onto the interstate (L7-9): few, and wary. [PROPOSAL]
    id: 'onramp',
    rate: 14,
    slots: [
      { speciesNum: 70, weight: 24, minLevel: 7, maxLevel: 9 }, // Rustbed
      { speciesNum: 75, weight: 20, minLevel: 7, maxLevel: 9 }, // Kartwheel
      { speciesNum: 73, weight: 18, minLevel: 7, maxLevel: 9 }, // Quadlet
      { speciesNum: 76, weight: 16, minLevel: 7, maxLevel: 9 }, // Remotorist
      { speciesNum: 54, weight: 14, minLevel: 7, maxLevel: 9 }, // Cellet
      { speciesNum: 59, weight: 8, minLevel: 8, maxLevel: 9 }, // Gridlock (rare)
    ],
  },
  {
    // the Grain Tower — the first dungeon (L8-10): auger, drill and fan Ohms in the dust; the loop-keeper waits at the head. [PROPOSAL]
    id: 'graintower-bins',
    rate: 30,
    slots: [
      { speciesNum: 53, weight: 20, minLevel: 8, maxLevel: 10 }, // Augerlock
      { speciesNum: 52, weight: 18, minLevel: 8, maxLevel: 10 }, // Drillbit
      { speciesNum: 21, weight: 16, minLevel: 8, maxLevel: 10 }, // Fanlet
      { speciesNum: 22, weight: 12, minLevel: 9, maxLevel: 10 }, // Oscillord
      { speciesNum: 80, weight: 14, minLevel: 8, maxLevel: 10 }, // Balelet
      { speciesNum: 82, weight: 12, minLevel: 8, maxLevel: 10 }, // Tillbit
      { speciesNum: 81, weight: 8, minLevel: 9, maxLevel: 10 }, // Baleron (rare)
    ],
  },
  {
    // Ohm Depot — the aisles (L5-9): tool, cart and register Ohms. [PROPOSAL]
    id: 'ohmdepot-aisles',
    rate: 30,
    slots: [
      { speciesNum: 49, weight: 18, minLevel: 5, maxLevel: 8 }, // Sawlet
      { speciesNum: 52, weight: 16, minLevel: 5, maxLevel: 8 }, // Drillbit
      { speciesNum: 78, weight: 14, minLevel: 6, maxLevel: 8 }, // Stampecart
      { speciesNum: 29, weight: 12, minLevel: 6, maxLevel: 8 }, // Registill
      { speciesNum: 66, weight: 12, minLevel: 6, maxLevel: 9 }, // Jacklift
      { speciesNum: 51, weight: 10, minLevel: 7, maxLevel: 9 }, // Buzzsawyer
      { speciesNum: 40, weight: 10, minLevel: 6, maxLevel: 8 }, // Suppressure
      { speciesNum: 50, weight: 8, minLevel: 8, maxLevel: 9 }, // Chainsawrus (rare)
    ],
  },
];

export const ZONES_BY_ID: ReadonlyMap<string, EncounterZone> = new Map(
  ENCOUNTER_ZONES.map((z) => [z.id, z]),
);
