import type { Battler } from '../core/battle/contract';
import { makeBattler } from '../core/battle/engine';
import type { Plating } from '../core/stats';
import { GAME_DATA } from '../data/dataview';

/** Locked Bench parts (GDD §8.2). */
export type Locomotion = 'treads' | 'legs' | 'hover';
export type CoreChoice = 'furnace' | 'dynamo' | 'reservoir';

export interface BenchPicks {
  locomotion: Locomotion;
  core: CoreChoice;
  plating: Plating;
}

export interface GameState {
  schema: 1;
  preset: 'SAL' | 'WREN';
  party: Battler[]; // ≤3 (GDD §10.1)
  garage: Battler[]; // Network Garage, unlimited
  manifest: { seen: number[]; freed: number[] };
  patches: string[];
  bag: Record<string, number>;
  credits: number;
  location: { map: string; x: number; y: number };
  flags: Record<string, boolean>;
  playtimeSeconds: number;
  seedCounter: number;
}

const CORE_SPECIES: Record<CoreChoice, number> = { furnace: 1, dynamo: 4, reservoir: 7 };
const LOCO_MOVE: Record<Locomotion, string> = {
  treads: 'rumble-over',
  legs: 'close-the-gap',
  hover: 'static-drift',
};

export function buildStarter(picks: BenchPicks, preset: 'SAL' | 'WREN'): Battler {
  const species = GAME_DATA.species(CORE_SPECIES[picks.core]);
  const starter = makeBattler(species, 5, GAME_DATA, {
    plating: picks.plating,
    extraMove: LOCO_MOVE[picks.locomotion],
  });
  void preset;
  return starter;
}

export function newGame(preset: 'SAL' | 'WREN', picks: BenchPicks): GameState {
  return {
    schema: 1,
    preset,
    party: [buildStarter(picks, preset)],
    garage: [],
    manifest: { seen: [CORE_SPECIES[picks.core]], freed: [CORE_SPECIES[picks.core]] },
    patches: [],
    // Grandpa slips you one rare core off the Bench — the slice's evolution seed
    bag: { 'storage-node': 5, 'repair-kit': 3, 'resonance-core': 1 },
    credits: 600,
    location: { map: 'ohmstead-garage', x: 5, y: 4 },
    flags: {},
    playtimeSeconds: 0,
    seedCounter: 1,
  };
}

/** battle seeds stay deterministic per save (replayable bug reports) */
export function nextSeed(state: GameState): number {
  state.seedCounter = (state.seedCounter * 1103515245 + 12345) >>> 0;
  return state.seedCounter;
}

/** Singleton holder while scenes pass through; M7 persists it. */
let current: GameState | undefined;
export const setGameState = (s: GameState): void => {
  current = s;
};
export const getGameState = (): GameState => {
  if (!current) throw new Error('no game in progress');
  return current;
};
export const hasGameState = (): boolean => current !== undefined;
