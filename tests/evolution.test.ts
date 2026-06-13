import { describe, expect, it } from 'vitest';
import { Battle, makeBattler } from '../src/core/battle/engine';
import { applyEvolution, pendingEvolutions } from '../src/core/evolution';
import { computeStats } from '../src/core/stats';
import { GAME_DATA } from '../src/data/dataview';

const mk = (num: number, level: number, plating?: 'heavy' | 'light' | 'factory') =>
  makeBattler(GAME_DATA.species(num), level, GAME_DATA, plating ? { plating } : {});

describe('evolution eligibility (GDD §10.7)', () => {
  it('needs both the level threshold and the right core in the bag', () => {
    const charkit = mk(1, 16); // Charkit evolves at 16 with a resonance-core
    expect(pendingEvolutions([charkit], {}, GAME_DATA)).toHaveLength(0); // no core
    expect(pendingEvolutions([mk(1, 15)], { 'resonance-core': 1 }, GAME_DATA)).toHaveLength(0); // under level
    const offers = pendingEvolutions([charkit], { 'resonance-core': 1 }, GAME_DATA);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({ fromNum: 1, toNum: 2, item: 'resonance-core', toName: 'Smolderig' });
  });

  it('a stage-3 hop demands a Prime Core, not a Resonance Core', () => {
    const smolderig = mk(2, 36); // Smolderig → Pyrofurnax needs prime-core
    expect(pendingEvolutions([smolderig], { 'resonance-core': 5 }, GAME_DATA)).toHaveLength(0);
    expect(pendingEvolutions([smolderig], { 'prime-core': 1 }, GAME_DATA)).toHaveLength(1);
  });

  it('reserves cores so one core cannot evolve two Ohms at once', () => {
    const two = [mk(1, 16), mk(4, 16)]; // both want a resonance-core
    expect(pendingEvolutions(two, { 'resonance-core': 1 }, GAME_DATA)).toHaveLength(1);
    expect(pendingEvolutions(two, { 'resonance-core': 2 }, GAME_DATA)).toHaveLength(2);
  });

  it('singles and final stages never offer', () => {
    expect(pendingEvolutions([mk(18, 50)], { 'resonance-core': 9, 'prime-core': 9 }, GAME_DATA)).toHaveLength(0); // Beeplet (single)
    expect(pendingEvolutions([mk(3, 100)], { 'prime-core': 9 }, GAME_DATA)).toHaveLength(0); // Pyrofurnax (final)
  });
});

describe('applyEvolution transform', () => {
  it('becomes the next species and recomputes stats at the same level', () => {
    const charkit = mk(1, 16);
    const before = { ...charkit.stats };
    const { from, to } = applyEvolution(charkit, GAME_DATA);
    expect(from).toBe('Charkit');
    expect(to).toBe('Smolderig');
    expect(charkit.speciesNum).toBe(2);
    expect(charkit.name).toBe('Smolderig');
    expect(charkit.stats.integrity).toBeGreaterThan(before.integrity); // Smolderig has a bigger frame
    expect(charkit.stats).toEqual(computeStats(GAME_DATA.species(2), 16));
  });

  it('keeps the Bench plating lean across evolution', () => {
    const heavy = mk(1, 16, 'heavy');
    applyEvolution(heavy, GAME_DATA);
    expect(heavy.stats).toEqual(computeStats(GAME_DATA.species(2), 16, { plating: 'heavy' }));
  });

  it('preserves the integrity ratio and keeps a nickname', () => {
    const charkit = makeBattler(GAME_DATA.species(1), 16, GAME_DATA, { name: 'Sparky' });
    charkit.integrity = Math.floor(charkit.stats.integrity / 2);
    applyEvolution(charkit, GAME_DATA);
    expect(charkit.name).toBe('Sparky'); // nickname survives
    expect(charkit.integrity).toBeGreaterThan(0);
    expect(charkit.integrity / charkit.stats.integrity).toBeCloseTo(0.5, 1);
  });
});

describe('level-up keeps the plating lean (regression)', () => {
  it('a heavy-plating Ohm still leans heavy after gaining a level', () => {
    const heavy = mk(4, 5, 'heavy'); // Sparkit, heavy
    const foe = mk(10, 30, undefined); // a strong wild Toastlet for plenty of XP
    const battle = new Battle({ kind: 'wild', seed: 3, party: [heavy], foes: [foe] }, GAME_DATA);
    battle.intro();
    foe.integrity = 1; // one hit downs it, awarding XP and a level
    let guard = 0;
    while (battle.phase === 'choosing' && guard++ < 10) battle.submit({ type: 'move', index: 0 });
    expect(heavy.level).toBeGreaterThan(5);
    expect(heavy.stats).toEqual(computeStats(GAME_DATA.species(4), heavy.level, { plating: 'heavy' }));
  });
});
