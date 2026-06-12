import type { TypeName } from '../core/defs';

/** Placeholder sprite tints until the style-guide gate (contract M8). */
export const TYPE_COLORS: Record<TypeName, number> = {
  VOLT: 0xe8c830,
  THERM: 0xd05828,
  COOLANT: 0x4888c8,
  FRAME: 0x888078,
  OPTIC: 0xf0e8a0,
  SONIC: 0xa060b8,
  SIGNAL: 0x48b0a8,
  MOTOR: 0xb84830,
  BREAKER: 0x986038,
  UTILITY: 0xb0a890,
  VERDANT: 0x68a040,
};

export const UI = {
  paper: 0xf8f8e8,
  ink: 0x303030,
  frame: 0x586068,
  good: 0x40a050,
  warn: 0xd0a030,
  bad: 0xc04030,
} as const;
