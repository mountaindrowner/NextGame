import type { Battler } from '../core/battle/contract';
import { makeBattler } from '../core/battle/engine';
import { GAME_DATA } from '../data/dataview';

/** The starter pick at the Bench (GDD §8.2 — a straight three-way choice). */
export type StarterChoice = 'scooter' | 'drone' | 'dog';

export interface BenchPicks {
  starter: StarterChoice;
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

/** scooter / drone / dog → each line's stage-1 species (roster 1 / 4 / 7). */
export const STARTER_SPECIES: Record<StarterChoice, number> = { scooter: 1, drone: 4, dog: 7 };

export function buildStarter(picks: BenchPicks, preset: 'SAL' | 'WREN'): Battler {
  const species = GAME_DATA.species(STARTER_SPECIES[picks.starter]);
  const starter = makeBattler(species, 5, GAME_DATA, { plating: 'factory' });
  void preset;
  return starter;
}

export function newGame(preset: 'SAL' | 'WREN', picks: BenchPicks): GameState {
  const num = STARTER_SPECIES[picks.starter];
  return {
    schema: 1,
    preset,
    party: [buildStarter(picks, preset)],
    garage: [],
    manifest: { seen: [num], freed: [num] },
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
