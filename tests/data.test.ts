import { describe, expect, it } from 'vitest';
import { STAT_KEYS, TYPES, type TypeName } from '../src/core/defs';
import { ENCOUNTER_ZONES } from '../src/data/encounters';
import { ITEMS } from '../src/data/items';
import { MOVES, MOVES_BY_ID } from '../src/data/moves';
import { SPECIES, SPECIES_BY_NUM } from '../src/data/species';
import { TYPE_CHART } from '../src/data/typechart';

describe('the Manifest (species)', () => {
  it('holds exactly 150, contiguously numbered', () => {
    expect(SPECIES.length).toBe(150);
    SPECIES.forEach((s, i) => expect(s.num).toBe(i + 1));
  });

  it('keeps the contract stage ratios: 16 three-stage, 32 two-stage, 31 singles, 7 legendaries', () => {
    const threeStage = SPECIES.filter((s) => s.evolution && SPECIES_BY_NUM.get(s.evolution.toNum)?.evolution);
    const finals = SPECIES.filter((s) => s.evolution?.item === 'prime-core');
    const legendaries = SPECIES.filter((s) => s.tags.includes('legendary'));
    const inLines = new Set<number>();
    for (const s of SPECIES) {
      if (s.evolution) {
        inLines.add(s.num);
        inLines.add(s.evolution.toNum);
      }
    }
    const singles = SPECIES.filter((s) => !inLines.has(s.num) && !s.tags.includes('legendary'));
    expect(threeStage.length).toBe(16); // stage-1s of 3-stage lines
    expect(finals.length).toBe(16); // stage-2s holding prime-core evolutions
    expect(singles.length).toBe(31);
    expect(legendaries.length).toBe(7);
  });

  it('gives every species a valid type, passive, catch rate, and learnset', () => {
    for (const s of SPECIES) {
      expect(TYPES).toContain(s.type);
      expect(s.catchRate).toBeGreaterThanOrEqual(3);
      expect(s.catchRate).toBeLessThanOrEqual(255);
      expect(s.learnset.length).toBeGreaterThan(0);
      for (const { move } of s.learnset) {
        expect(MOVES_BY_ID.has(move), `${s.name} learnset move ${move}`).toBe(true);
      }
      for (const key of STAT_KEYS) {
        expect(s.base[key]).toBeGreaterThanOrEqual(15);
      }
    }
  });

  it('points every evolution at the next Manifest entry with the right core grade', () => {
    for (const s of SPECIES) {
      if (!s.evolution) continue;
      const target = SPECIES_BY_NUM.get(s.evolution.toNum);
      expect(target, `${s.name} evolves to missing #${s.evolution.toNum}`).toBeDefined();
      expect(s.evolution.toNum).toBe(s.num + 1);
      expect(s.evolution.level).toBeGreaterThanOrEqual(16);
      const isMidOfThree = target?.evolution !== undefined ? false : undefined;
      void isMidOfThree;
      const grade = s.evolution.item;
      // stage-2 → stage-3 requires a Prime Core; everything else Resonance
      const isSecondHop = SPECIES.some((p) => p.evolution?.toNum === s.num);
      expect(grade).toBe(isSecondHop ? 'prime-core' : 'resonance-core');
    }
  });
});

describe('the type chart', () => {
  // strong-vs columns exactly as the GDD §10.3 table prints them
  const GDD_STRONG: Record<TypeName, TypeName[]> = {
    VOLT: ['COOLANT', 'SIGNAL'],
    THERM: ['VOLT', 'VERDANT'],
    COOLANT: ['THERM', 'MOTOR'],
    FRAME: ['VOLT', 'SONIC', 'OPTIC'],
    OPTIC: ['SONIC', 'VERDANT'],
    SONIC: ['SIGNAL'],
    SIGNAL: ['MOTOR', 'BREAKER'],
    MOTOR: ['BREAKER', 'OPTIC'],
    BREAKER: ['FRAME', 'UTILITY'],
    UTILITY: [],
    VERDANT: ['COOLANT', 'FRAME'],
  };
  const GDD_WEAK: Record<TypeName, TypeName[]> = {
    VOLT: ['THERM', 'FRAME'],
    THERM: ['COOLANT'],
    COOLANT: ['VOLT', 'VERDANT'],
    FRAME: ['BREAKER', 'VERDANT'],
    OPTIC: ['FRAME', 'MOTOR'],
    SONIC: ['FRAME', 'OPTIC'],
    SIGNAL: ['VOLT', 'SONIC'],
    MOTOR: ['COOLANT', 'SIGNAL'],
    BREAKER: ['SIGNAL', 'MOTOR'],
    UTILITY: ['BREAKER'],
    VERDANT: ['THERM', 'OPTIC'],
  };

  it('matches the GDD strong-vs columns', () => {
    for (const atk of TYPES) {
      const expected = [...GDD_STRONG[atk]].sort();
      const actual = Object.entries(TYPE_CHART[atk])
        .filter(([, mult]) => mult === 2)
        .map(([t]) => t)
        .sort();
      expect(actual, `${atk} strong-vs`).toEqual(expected);
    }
  });

  it('mirrors: weak-to columns equal the transposed strong-vs columns', () => {
    for (const def of TYPES) {
      const expected = [...GDD_WEAK[def]].sort();
      const actual = TYPES.filter((atk) => TYPE_CHART[atk][def] === 2).sort();
      expect(actual, `${def} weak-to`).toEqual(expected);
    }
  });
});

describe('moves & items & encounters', () => {
  it('move ids are unique, PP generous, accuracy sane', () => {
    expect(new Set(MOVES.map((m) => m.id)).size).toBe(MOVES.length);
    for (const m of MOVES) {
      expect(m.pp).toBeGreaterThanOrEqual(10);
      expect(m.accuracy === 0 || (m.accuracy >= 60 && m.accuracy <= 100)).toBe(true);
    }
  });

  it('item ids are unique and every status has a cure', () => {
    expect(new Set(ITEMS.map((i) => i.id)).size).toBe(ITEMS.length);
    const cured = new Set(ITEMS.filter((i) => i.kind === 'cure').map((i) => i.cures));
    for (const status of ['OVERHEAT', 'SHORT', 'CORRUPTED', 'STANDBY', 'LOCKED']) {
      expect(cured.has(status as never), `cure for ${status}`).toBe(true);
    }
  });

  it('encounter slots reference real species and weights sum to 100', () => {
    for (const zone of ENCOUNTER_ZONES) {
      const total = zone.slots.reduce((acc, s) => acc + s.weight, 0);
      expect(total, zone.id).toBe(100);
      for (const slot of zone.slots) {
        expect(SPECIES_BY_NUM.has(slot.speciesNum)).toBe(true);
        expect(slot.minLevel).toBeLessThanOrEqual(slot.maxLevel);
      }
    }
  });
});
