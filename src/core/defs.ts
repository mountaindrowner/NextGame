/**
 * Canonical data shapes. Core owns these types; data modules import from
 * here (never the reverse) so the core stays pure (contract §2.1).
 */

export const TYPES = [
  'VOLT',
  'THERM',
  'COOLANT',
  'FRAME',
  'OPTIC',
  'SONIC',
  'SIGNAL',
  'MOTOR',
  'BREAKER',
  'UTILITY',
  'VERDANT',
] as const;
export type TypeName = (typeof TYPES)[number];

/** Gen 3 splits damage category by type, never by move. */
export const SPECIAL_TYPES: ReadonlySet<TypeName> = new Set([
  'VOLT',
  'THERM',
  'COOLANT',
  'OPTIC',
  'SONIC',
  'SIGNAL',
]);

export const STAT_KEYS = ['integrity', 'output', 'armor', 'surge', 'shielding', 'clock'] as const;
export type StatKey = (typeof STAT_KEYS)[number];
export type StatBlock = Record<StatKey, number>;

/** Locked status names (GDD §10.4). */
export const STATUSES = ['OVERHEAT', 'SHORT', 'CORRUPTED', 'STANDBY', 'LOCKED', 'GLITCHED'] as const;
export type StatusName = (typeof STATUSES)[number];
/** GLITCHED is volatile (confusion analog); the rest are major. */
export const MAJOR_STATUSES: readonly StatusName[] = [
  'OVERHEAT',
  'SHORT',
  'CORRUPTED',
  'STANDBY',
  'LOCKED',
];

export type Growth = 'fast' | 'medium-fast' | 'medium-slow' | 'slow';

export type BattleStatKey = StatKey | 'accuracy' | 'evasion';

export type MoveEffect =
  | { kind: 'status'; status: StatusName; chance: number }
  | { kind: 'statStage'; target: 'self' | 'foe'; stat: BattleStatKey; delta: number; chance: number }
  | { kind: 'heal'; fraction: number }
  | { kind: 'noKO' }; // a False-Swipe analog: deals damage but never downs the target

export interface MoveDef {
  id: string;
  name: string;
  type: TypeName;
  /** 0 = status move. Category derives from type (Gen 3 rule). */
  power: number;
  /** 0 = never misses. */
  accuracy: number;
  pp: number;
  priority: number;
  effect?: MoveEffect;
}

export type PassiveId =
  | 'heat-sink' // immune to OVERHEAT
  | 'grounded' // immune to SHORT
  | 'insulated' // immune to LOCKED
  | 'firmware-lock' // immune to GLITCHED
  | 'backlit' // accuracy cannot drop
  | 'loudspeaker' // immune to STANDBY
  | 'firewall' // immune to CORRUPTED
  | 'momentum' // CLOCK cannot drop
  | 'heavy-duty' // OUTPUT cannot drop
  | 'scrap-tough' // ARMOR cannot drop
  | 'photosynth'; // restores 1/16 INTEGRITY each turn

export interface Evolution {
  toNum: number;
  level: number;
  item: 'resonance-core' | 'prime-core';
}

export interface LearnsetEntry {
  level: number;
  move: string;
}

export interface SpeciesDef {
  num: number;
  name: string;
  object: string;
  type: TypeName;
  base: StatBlock;
  growth: Growth;
  catchRate: number; // 3..255, Gen 3 scale
  passive: PassiveId;
  evolution?: Evolution;
  learnset: LearnsetEntry[];
  tags: readonly string[];
}

export interface ItemDef {
  id: string;
  name: string;
  kind: 'node' | 'heal' | 'revive' | 'cure' | 'evolution' | 'field';
  price: number;
  /** heal amount in INTEGRITY points; -1 = full */
  heal?: number;
  cures?: StatusName;
}

export interface EncounterSlot {
  speciesNum: number;
  weight: number; // percent
  minLevel: number;
  maxLevel: number;
}

export interface EncounterZone {
  id: string;
  /** chance per step, /255 like Gen 3 grass */
  rate: number;
  slots: EncounterSlot[];
}

export type TypeChart = Readonly<Record<TypeName, Partial<Record<TypeName, number>>>>;
