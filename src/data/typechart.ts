import type { TypeChart } from '../core/defs';

/**
 * The locked 11-type matrix (GDD §10.3). Listed as attacker → defender
 * multiplier; anything absent is 1×. The validator suite proves this table
 * mirrors the GDD's strong-vs / weak-to columns exactly.
 */
export const TYPE_CHART: TypeChart = {
  VOLT: { COOLANT: 2, SIGNAL: 2 },
  THERM: { VOLT: 2, VERDANT: 2 },
  COOLANT: { THERM: 2, MOTOR: 2 },
  FRAME: { VOLT: 2, SONIC: 2, OPTIC: 2 },
  OPTIC: { SONIC: 2, VERDANT: 2 },
  SONIC: { SIGNAL: 2 },
  SIGNAL: { MOTOR: 2, BREAKER: 2 },
  MOTOR: { BREAKER: 2, OPTIC: 2 },
  BREAKER: { FRAME: 2, UTILITY: 2 },
  UTILITY: {},
  VERDANT: { COOLANT: 2, FRAME: 2 },
};

/** Defender resistances implied by the GDD flavor text: none in v1 beyond
 * the 2× table — every non-listed matchup is neutral. Kept explicit so a
 * future ½×/0× pass is one edit. */
