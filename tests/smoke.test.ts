import { describe, expect, it } from 'vitest';
import { Battle, makeBattler } from '../src/core/battle/engine';
import { generatePuzzle, isSolved, solve } from '../src/core/puzzle';
import { Rng } from '../src/core/rng';
import { GAME_DATA } from '../src/data/dataview';
import { newGame, type BenchPicks } from '../src/game/state';
import { deserialize, MemoryStorage, SaveSlots, serialize } from '../src/save/save';

/**
 * The binding smoke test (CLAUDE.md / contract M7), headless at core level:
 * new game → the Bench → wild battle → node capture → save → load.
 */
describe('SMOKE: bench → battle → capture → save → load', () => {
  it('runs the whole loop', () => {
    // new game at the Bench — the dog (the sturdy starter) for a stable smoke
    const picks: BenchPicks = { starter: 'dog' };
    const state = newGame('WREN', picks);
    expect(state.party).toHaveLength(1);
    const starter = state.party[0]!;
    expect(starter.speciesNum).toBe(7); // Scraplet (the dog line)
    expect(starter.moves.some((m) => m.id === 'pounce')).toBe(true); // dog signature

    // wild battle in the Field — a tanky, low-level foe so it weakens, never downs
    const foe = makeBattler(GAME_DATA.species(25), 5, GAME_DATA); // wild Frostbox (bulky)
    const battle = new Battle({ kind: 'wild', seed: 2024, party: state.party, foes: [foe] }, GAME_DATA);
    battle.intro();
    let guard = 0;
    while (battle.phase === 'choosing' && foe.integrity > foe.stats.integrity / 2 && guard++ < 6) {
      battle.submit({ type: 'move', index: 0 });
    }
    expect(battle.phase).not.toBe('done'); // weakened, never downed — capture window open

    // spend a node, run the hack
    state.bag['storage-node'] = (state.bag['storage-node'] ?? 0) - 1;
    const ev = battle.submit({ type: 'capture' });
    const budget = ev.find((e) => e.type === 'captureBudget');
    expect(budget).toBeDefined();
    if (budget?.type !== 'captureBudget') throw new Error('unreachable');
    const puzzle = generatePuzzle(budget.gridSize, new Rng(555));
    solve(puzzle);
    expect(isSolved(puzzle)).toBe(true);
    const done = battle.resolveCapture(true);
    expect(done.some((e) => e.type === 'captureSuccess')).toBe(true);
    state.party.push(foe);
    state.manifest.freed.push(foe.speciesNum);
    expect(state.party).toHaveLength(2);

    // save → load roundtrip
    const slots = new SaveSlots(new MemoryStorage());
    slots.save(0, state);
    const loaded = slots.load(0);
    expect(loaded).toBeDefined();
    expect(JSON.parse(serialize(loaded!)).state).toEqual(JSON.parse(serialize(state)).state);
    expect(loaded!.party[1]!.speciesNum).toBe(25);
    expect(loaded!.manifest.freed).toContain(25);
  });

  it('migrates a v0 save through the chain', () => {
    const picks: BenchPicks = { starter: 'drone' };
    const state = newGame('SAL', picks);
    const v0 = JSON.parse(serialize(state)) as Record<string, unknown>;
    delete (v0['state'] as Record<string, unknown>)['garage'];
    delete (v0['state'] as Record<string, unknown>)['manifest'];
    v0['version'] = 0;
    const migrated = deserialize(JSON.stringify(v0));
    expect(migrated.garage).toEqual([]);
    expect(migrated.manifest).toEqual({ seen: [], freed: [] });
  });

  it('each starter pick builds the right line, signature, and Manifest seed', () => {
    const picks = [
      ['scooter', 1, 'burnout'],
      ['drone', 4, 'mark-strike'],
      ['dog', 7, 'pounce'],
    ] as const;
    for (const [starter, num, sig] of picks) {
      const s = newGame('SAL', { starter });
      const b = s.party[0]!;
      expect(b.speciesNum).toBe(num);
      expect(b.moves.some((m) => m.id === sig)).toBe(true);
      expect(s.manifest.seen).toContain(num);
    }
  });
});

describe('save fixtures load through the migration chain', () => {
  it('loads every committed fixture', async () => {
    const { readdirSync, readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const dir = join(new URL('..', import.meta.url).pathname, 'src/save/fixtures');
    const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
    expect(files.length).toBeGreaterThan(0);
    for (const f of files) {
      const state = deserialize(readFileSync(join(dir, f), 'utf8'));
      expect(state.party.length).toBeGreaterThan(0);
    }
  });
});
