import { describe, expect, it } from 'vitest';
import { Battle, makeBattler } from '../src/core/battle/engine';
import { applyEvolution, pendingEvolutions } from '../src/core/evolution';
import { computeStats } from '../src/core/stats';
import { GAME_DATA } from '../src/data/dataview';

const mk = (num: number, level: number, plating?: 'heavy' | 'light' | 'factory') =>
  makeBattler(GAME_DATA.species(num), level, GAME_DATA, plating ? { plating } : {});

describe('evolution eligibility (GDD §10.7)', () => {
  it('needs both the level threshold and the right core in the bag', () => {
    const scootlet = mk(1, 16); // Scootlet evolves at 16 with a resonance-core
    expect(pendingEvolutions([scootlet], {}, GAME_DATA)).toHaveLength(0); // no core
    expect(pendingEvolutions([mk(1, 15)], { 'resonance-core': 1 }, GAME_DATA)).toHaveLength(0); // under level
    const offers = pendingEvolutions([scootlet], { 'resonance-core': 1 }, GAME_DATA);
    expect(offers).toHaveLength(1);
    expect(offers[0]).toMatchObject({ fromNum: 1, toNum: 2, item: 'resonance-core', toName: 'Boltbike' });
  });

  it('a stage-3 hop demands a Prime Core, not a Resonance Core', () => {
    const boltbike = mk(2, 36); // Boltbike → Velocrash needs prime-core
    expect(pendingEvolutions([boltbike], { 'resonance-core': 5 }, GAME_DATA)).toHaveLength(0);
    expect(pendingEvolutions([boltbike], { 'prime-core': 1 }, GAME_DATA)).toHaveLength(1);
  });

  it('reserves cores so one core cannot evolve two Ohms at once', () => {
    const two = [mk(1, 16), mk(4, 16)]; // both want a resonance-core
    expect(pendingEvolutions(two, { 'resonance-core': 1 }, GAME_DATA)).toHaveLength(1);
    expect(pendingEvolutions(two, { 'resonance-core': 2 }, GAME_DATA)).toHaveLength(2);
  });

  it('singles and final stages never offer', () => {
    expect(pendingEvolutions([mk(18, 50)], { 'resonance-core': 9, 'prime-core': 9 }, GAME_DATA)).toHaveLength(0); // Beeplet (single)
    expect(pendingEvolutions([mk(3, 100)], { 'prime-core': 9 }, GAME_DATA)).toHaveLength(0); // Velocrash (final)
  });
});

describe('applyEvolution transform', () => {
  it('becomes the next species and recomputes stats at the same level', () => {
    const scootlet = mk(1, 16);
    const before = { ...scootlet.stats };
    const { from, to } = applyEvolution(scootlet, GAME_DATA);
    expect(from).toBe('Scootlet');
    expect(to).toBe('Boltbike');
    expect(scootlet.speciesNum).toBe(2);
    expect(scootlet.name).toBe('Boltbike');
    expect(scootlet.stats.integrity).toBeGreaterThan(before.integrity); // the e-bike has a bigger frame
    expect(scootlet.stats).toEqual(computeStats(GAME_DATA.species(2), 16));
  });

  it('keeps the Bench plating lean across evolution', () => {
    const heavy = mk(1, 16, 'heavy');
    applyEvolution(heavy, GAME_DATA);
    expect(heavy.stats).toEqual(computeStats(GAME_DATA.species(2), 16, { plating: 'heavy' }));
  });

  it('preserves the integrity ratio and keeps a nickname', () => {
    const scootlet = makeBattler(GAME_DATA.species(1), 16, GAME_DATA, { name: 'Zippy' });
    scootlet.integrity = Math.floor(scootlet.stats.integrity / 2);
    applyEvolution(scootlet, GAME_DATA);
    expect(scootlet.name).toBe('Zippy'); // nickname survives
    expect(scootlet.integrity).toBeGreaterThan(0);
    expect(scootlet.integrity / scootlet.stats.integrity).toBeCloseTo(0.5, 1);
  });
});

describe('level-up keeps the plating lean (regression)', () => {
  it('a heavy-plating Ohm still leans heavy after gaining a level', () => {
    const heavy = mk(4, 5, 'heavy'); // Dronelet, heavy
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
