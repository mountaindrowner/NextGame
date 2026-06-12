import type { GameState } from '../game/state';

/**
 * Save schema v1 — versioned from day one (contract §2.3). Format changes
 * ship a migration in MIGRATIONS; CI loads every committed fixture through
 * the chain. Manual save anywhere, multiple slots, no autosave (GDD §11).
 */

export interface SaveFile {
  version: number;
  savedAt: string;
  state: GameState;
}

export const CURRENT_VERSION = 1;

type Migration = (raw: Record<string, unknown>) => Record<string, unknown>;

/** v0 → v1: pre-release saves lacked the Network Garage and manifest split. */
const MIGRATIONS: Record<number, Migration> = {
  0: (raw) => {
    const state = (raw['state'] ?? {}) as Record<string, unknown>;
    state['garage'] ??= [];
    state['manifest'] ??= { seen: [], freed: [] };
    return { ...raw, version: 1, state };
  },
};

export function serialize(state: GameState): string {
  const file: SaveFile = { version: CURRENT_VERSION, savedAt: new Date().toISOString(), state };
  return JSON.stringify(file);
}

export function deserialize(json: string): GameState {
  let raw = JSON.parse(json) as Record<string, unknown>;
  let version = typeof raw['version'] === 'number' ? (raw['version'] as number) : 0;
  while (version < CURRENT_VERSION) {
    const migrate = MIGRATIONS[version];
    if (!migrate) throw new Error(`no migration from save version ${version}`);
    raw = migrate(raw);
    version = raw['version'] as number;
  }
  const state = raw['state'] as GameState;
  validate(state);
  return state;
}

export function validate(state: GameState): void {
  if (state.schema !== 1) throw new Error('bad schema');
  if (!Array.isArray(state.party) || state.party.length === 0 || state.party.length > 3) {
    throw new Error('party must hold 1-3 Ohms');
  }
  for (const b of state.party) {
    if (typeof b.speciesNum !== 'number' || typeof b.level !== 'number') throw new Error('bad battler');
  }
  if (!state.location?.map) throw new Error('missing location');
}

// ---- slots ---------------------------------------------------------------

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export class MemoryStorage implements StorageLike {
  private map = new Map<string, string>();
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
}

const KEY = (slot: number): string => `ohmfront-save-${slot}`;
export const SLOT_COUNT = 3;

export class SaveSlots {
  constructor(private storage: StorageLike) {}

  save(slot: number, state: GameState): void {
    this.storage.setItem(KEY(slot), serialize(state));
  }

  load(slot: number): GameState | undefined {
    const json = this.storage.getItem(KEY(slot));
    if (!json) return undefined;
    return deserialize(json);
  }

  summary(slot: number): string | undefined {
    const json = this.storage.getItem(KEY(slot));
    if (!json) return undefined;
    try {
      const file = JSON.parse(json) as SaveFile;
      const lead = file.state.party[0];
      return `${file.state.preset} — ${lead?.name ?? '?'} Lv${lead?.level ?? '?'} — ${file.state.location.map}`;
    } catch {
      return 'corrupted';
    }
  }
}

export function browserStorage(): StorageLike {
  return typeof localStorage === 'undefined' ? new MemoryStorage() : localStorage;
}
