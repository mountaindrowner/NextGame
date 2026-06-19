import type { SpeciesDef, StatBlock, StatKey } from './defs';

/** Plating lean from the Bench (GDD §8.2). */
export type Plating = 'heavy' | 'light' | 'factory';

/**
 * Gen 3 stat math with the flattened model (no IVs/EVs/natures, GDD §10.1):
 *   INTEGRITY = ⌊2·base·L/100⌋ + L + 15
 *   other     = ⌊2·base·L/100⌋ + 5
 * Plating: heavy +10% ARMOR/SHIELDING −10% CLOCK · light +10% CLOCK −10% ARMOR.
 * Expansion Board: −10% OUTPUT and SURGE (GDD §10.5).
 * (INTEGRITY base bumped +5 over Gen 3 to soften 2-3-hit-KO swinginess.)
 */
export function computeStats(
  species: SpeciesDef,
  level: number,
  opts: { plating?: Plating; expansionBoard?: boolean } = {},
): StatBlock {
  const out = {} as StatBlock;
  for (const key of Object.keys(species.base) as StatKey[]) {
    const base = species.base[key];
    const core = Math.floor((2 * base * level) / 100);
    out[key] = key === 'integrity' ? core + level + 15 : core + 5;
  }
  const lean = (key: StatKey, mult: number): void => {
    out[key] = Math.max(1, Math.floor(out[key] * mult));
  };
  if (opts.plating === 'heavy') {
    lean('armor', 1.1);
    lean('shielding', 1.1);
    lean('clock', 0.9);
  } else if (opts.plating === 'light') {
    lean('clock', 1.1);
    lean('armor', 0.9);
  }
  if (opts.expansionBoard) {
    lean('output', 0.9);
    lean('surge', 0.9);
  }
  return out;
}

/** Gen 3 growth-rate families: total XP to reach a level. */
export function xpForLevel(growth: SpeciesDef['growth'], level: number): number {
  const n = level;
  switch (growth) {
    case 'fast':
      return Math.floor((4 * n ** 3) / 5);
    case 'medium-fast':
      return n ** 3;
    case 'medium-slow':
      return Math.max(0, Math.floor((6 / 5) * n ** 3 - 15 * n ** 2 + 100 * n - 140));
    case 'slow':
      return Math.floor((5 * n ** 3) / 4);
  }
}

export function levelForXp(growth: SpeciesDef['growth'], xp: number): number {
  let level = 1;
  while (level < 100 && xpForLevel(growth, level + 1) <= xp) level += 1;
  return level;
}

/** Gen 3 battle-stat stage multipliers (±6). */
export function stageMultiplier(stage: number): number {
  const s = Math.max(-6, Math.min(6, stage));
  return s >= 0 ? (2 + s) / 2 : 2 / (2 - s);
}

/** Gen 3 accuracy/evasion stage table (255-based simplified to ratio form). */
export function accuracyMultiplier(stage: number): number {
  const s = Math.max(-6, Math.min(6, stage));
  return s >= 0 ? (3 + s) / 3 : 3 / (3 - s);
}

/** Progress through the current level: XP earned into it and the level's span.
 * At level 100 the span is 0 (capped). */
export function xpProgress(
  growth: SpeciesDef['growth'],
  level: number,
  xp: number,
): { into: number; span: number } {
  if (level >= 100) return { into: 0, span: 0 };
  const floor = xpForLevel(growth, level);
  const ceil = xpForLevel(growth, level + 1);
  return { into: Math.max(0, xp - floor), span: Math.max(1, ceil - floor) };
}
