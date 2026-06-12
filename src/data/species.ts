import type {
  Growth,
  PassiveId,
  SpeciesDef,
  StatBlock,
  StatKey,
  TypeName,
  LearnsetEntry,
} from '../core/defs';
import { SPECIAL_TYPES, STAT_KEYS } from '../core/defs';
import { ROSTER, type Kind } from './roster';

/**
 * Species are built deterministically from the canon roster: archetype
 * weight vectors distribute a stage-band BST (Gen 3 bands), with hand
 * overrides for the Bench trio. Reproducible by construction — no JSON
 * snapshot to drift.
 */

type Archetype = 'balanced' | 'tank' | 'bruiser' | 'zapper' | 'fast' | 'support';

const WEIGHTS: Record<Archetype, [number, number, number, number, number, number]> = {
  // integrity, output, armor, surge, shielding, clock
  balanced: [0.18, 0.17, 0.16, 0.17, 0.16, 0.16],
  tank: [0.22, 0.13, 0.22, 0.11, 0.21, 0.11],
  bruiser: [0.18, 0.24, 0.18, 0.1, 0.16, 0.14],
  zapper: [0.16, 0.1, 0.14, 0.25, 0.16, 0.19],
  fast: [0.15, 0.2, 0.12, 0.16, 0.12, 0.25],
  support: [0.22, 0.12, 0.18, 0.14, 0.22, 0.12],
};

const TYPE_ARCHETYPE: Record<TypeName, Archetype> = {
  VOLT: 'zapper',
  THERM: 'zapper',
  COOLANT: 'support',
  FRAME: 'tank',
  OPTIC: 'zapper',
  SONIC: 'zapper',
  SIGNAL: 'zapper',
  MOTOR: 'fast',
  BREAKER: 'bruiser',
  UTILITY: 'balanced',
  VERDANT: 'support',
};

/** Flavor overrides where the compendium reads differently from the type default. */
const ARCHETYPE_OVERRIDES: Record<number, Archetype> = {
  18: 'fast', // Beeplet
  29: 'tank', // Registill
  31: 'tank', // Vendetta (the line)
  30: 'tank',
  39: 'tank', // Hydrantler
  55: 'tank', // Batterram
  57: 'tank', // Magnetide
  76: 'fast', // Remotorist
  79: 'tank', // Treadmillipede
  84: 'bruiser', // Combinator
  90: 'fast', // Subwoolf pack
  97: 'tank', // Sirenado
  111: 'zapper',
  135: 'tank', // Towertank
  142: 'bruiser',
  143: 'bruiser',
};

const BST: Record<Kind, number> = {
  S1: 305,
  S2: 410,
  S3: 520,
  T1: 310,
  T2: 460,
  X: 420,
  L: 580,
};

const GROWTH: Record<Kind, Growth> = {
  S1: 'medium-slow',
  S2: 'medium-slow',
  S3: 'medium-slow',
  T1: 'medium-fast',
  T2: 'medium-fast',
  X: 'medium-fast',
  L: 'slow',
};

const CATCH: Record<Kind, number> = {
  S1: 45, // Bench trio — never wild anyway
  S2: 45,
  S3: 45,
  T1: 190,
  T2: 75,
  X: 120,
  L: 3,
};

const PASSIVE_BY_TYPE: Record<TypeName, PassiveId> = {
  THERM: 'heat-sink',
  VOLT: 'grounded',
  COOLANT: 'insulated',
  FRAME: 'firmware-lock',
  OPTIC: 'backlit',
  SONIC: 'loudspeaker',
  SIGNAL: 'firewall',
  MOTOR: 'momentum',
  BREAKER: 'heavy-duty',
  UTILITY: 'scrap-tough',
  VERDANT: 'photosynth',
};

/** wild T1 catch rates loosen for the Field commons; rares tighten */
const CATCH_OVERRIDES: Record<number, number> = {
  41: 90,
  42: 45,
  43: 90,
  44: 45,
  45: 60, // VERDANT rares
  124: 45,
  125: 25, // net-only satellites
};

const jabs: Record<TypeName, string> = {
  VOLT: 'static-jab',
  THERM: 'heat-tick',
  COOLANT: 'drip-shot',
  OPTIC: 'glint',
  SONIC: 'chirp',
  SIGNAL: 'ping',
  FRAME: 'chassis-bash',
  MOTOR: 'bump-start',
  BREAKER: 'chip-away',
  UTILITY: 'bump',
  VERDANT: 'thorn-flick',
};
const mids: Record<TypeName, string> = {
  VOLT: 'arc-lash',
  THERM: 'vent-flare',
  COOLANT: 'pressure-jet',
  OPTIC: 'focus-beam',
  SONIC: 'feedback',
  SIGNAL: 'packet-storm',
  FRAME: 'girder-swing',
  MOTOR: 'run-down',
  BREAKER: 'teardown',
  UTILITY: 'thump',
  VERDANT: 'root-crack',
};
const heavies: Record<TypeName, string> = {
  VOLT: 'surge-bolt',
  THERM: 'convection',
  COOLANT: 'flash-flood',
  OPTIC: 'floodlight',
  SONIC: 'bass-drop',
  SIGNAL: 'broadcast',
  FRAME: 'anchor-drop',
  MOTOR: 'redline',
  BREAKER: 'demolish',
  UTILITY: 'haymaker',
  VERDANT: 'overgrowth',
};
const typeStatus: Record<TypeName, string> = {
  VOLT: 'live-wire',
  THERM: 'slow-roast',
  COOLANT: 'cold-snap',
  OPTIC: 'dazzle',
  SONIC: 'standby-hum',
  SIGNAL: 'bad-sector',
  FRAME: 'bulkhead',
  MOTOR: 'rev-up',
  BREAKER: 'pry',
  UTILITY: 'rattle',
  VERDANT: 'spore-static',
};

function templateLearnset(type: TypeName): LearnsetEntry[] {
  return [
    { level: 1, move: 'bump' },
    { level: 1, move: jabs[type] },
    { level: 8, move: SPECIAL_TYPES.has(type) ? 'dust-cloud' : 'rattle' },
    { level: 14, move: typeStatus[type] },
    { level: 20, move: mids[type] },
    { level: 27, move: 'brace' },
    { level: 34, move: heavies[type] },
  ];
}

/** Starters: signature move slots in at the Bench by Locomotion (M6). */
const LEARNSET_OVERRIDES: Record<number, LearnsetEntry[]> = {
  10: [
    { level: 1, move: 'bump' },
    { level: 1, move: 'heat-tick' },
    { level: 9, move: 'crumb-smog' },
    { level: 14, move: 'slow-roast' },
    { level: 20, move: 'vent-flare' },
    { level: 34, move: 'convection' },
  ],
  30: [
    { level: 1, move: 'chassis-bash' },
    { level: 7, move: 'exact-change' },
    { level: 14, move: 'bulkhead' },
    { level: 20, move: 'girder-swing' },
    { level: 34, move: 'anchor-drop' },
  ],
  97: [
    { level: 1, move: 'chirp' },
    { level: 12, move: 'standby-hum' },
    { level: 20, move: 'siren-wail' },
    { level: 34, move: 'bass-drop' },
  ],
  112: [
    { level: 1, move: 'ping' },
    { level: 8, move: 'mind-game' },
    { level: 14, move: 'dazzle' },
    { level: 20, move: 'packet-storm' },
    { level: 34, move: 'broadcast' },
  ],
};

function distribute(bst: number, archetype: Archetype): StatBlock {
  const w = WEIGHTS[archetype];
  const block = {} as StatBlock;
  let used = 0;
  STAT_KEYS.forEach((key: StatKey, i) => {
    const v = i === STAT_KEYS.length - 1 ? bst - used : Math.round(bst * (w[i] ?? 0));
    block[key] = Math.max(15, v);
    used += v;
  });
  return block;
}

const STAT_OVERRIDES: Record<number, Partial<StatBlock>> = {
  // Bench trio leans (pre-Plating): THERM hits, VOLT speeds, COOLANT lasts
  1: { integrity: 50, output: 48, armor: 50, surge: 62, shielding: 50, clock: 45 },
  4: { integrity: 46, output: 45, armor: 44, surge: 60, shielding: 46, clock: 64 },
  7: { integrity: 60, output: 46, armor: 56, surge: 52, shielding: 58, clock: 33 },
};

const TAGS: Record<number, string[]> = {
  15: ['LUMEN'],
  16: ['LUMEN'],
  17: ['LUMEN'],
  37: ['LUMEN'],
  108: ['LUMEN'],
  47: ['SHEAR'],
  48: ['SHEAR', 'ride'],
  49: ['SHEAR'],
  50: ['SHEAR'],
  51: ['SHEAR'],
  52: ['BREACH'],
  53: ['BREACH'],
  142: ['BREACH'],
  143: ['BREACH'],
  6: ['HAUL'],
  84: ['HAUL'],
  136: ['HAUL'],
  137: ['HAUL'],
  140: ['HAUL'],
  141: ['HAUL'],
  80: ['HOVER'],
  81: ['HOVER'],
  124: ['HOVER', 'net-only'],
  125: ['HOVER', 'net-only'],
  71: ['ride'],
  72: ['ride'],
  74: ['ride'],
  75: ['ride'],
  116: ['net-only'],
  119: ['net-only'],
  144: ['legendary', 'ancient'],
  145: ['legendary', 'ancient'],
  146: ['legendary', 'ancient'],
  147: ['legendary', 'prototype'],
  148: ['legendary', 'organic-hybrid'],
  149: ['legendary', 'organic-hybrid'],
  150: ['legendary', 'prototype', 'story'],
};

function evoItem(kind: Kind): 'resonance-core' | 'prime-core' {
  return kind === 'S2' ? 'prime-core' : 'resonance-core';
}

export const SPECIES: readonly SpeciesDef[] = ROSTER.map(
  ([num, name, type, kind, object, evoTo, evoLevel]) => {
    const archetype = ARCHETYPE_OVERRIDES[num] ?? TYPE_ARCHETYPE[type];
    const base = { ...distribute(BST[kind], archetype), ...STAT_OVERRIDES[num] };
    const def: SpeciesDef = {
      num,
      name,
      object,
      type,
      base,
      growth: GROWTH[kind],
      catchRate: CATCH_OVERRIDES[num] ?? CATCH[kind],
      passive: PASSIVE_BY_TYPE[type],
      learnset: LEARNSET_OVERRIDES[num] ?? templateLearnset(type),
      tags: TAGS[num] ?? [],
    };
    if (evoTo !== undefined && evoLevel !== undefined) {
      def.evolution = { toNum: evoTo, level: evoLevel, item: evoItem(kind) };
    }
    return def;
  },
);

export const SPECIES_BY_NUM: ReadonlyMap<number, SpeciesDef> = new Map(
  SPECIES.map((s) => [s.num, s]),
);
