/**
 * Gen 3 damage pipeline, pure and integer-faithful (GDD §10.1: clone
 * exactly). Golden vectors in tests/battle.test.ts pin every step.
 *
 *   d = ⌊⌊⌊(2L/5 + 2) · P · A / D⌋ / 50⌋⌋
 *   OVERHEAT halves physical here, then +2, then crit ×2, STAB ×1.5,
 *   type effectiveness, then random 85–100%.
 */
export interface DamageArgs {
  level: number;
  power: number;
  atk: number;
  def: number;
  physical: boolean;
  attackerOverheated: boolean;
  crit: boolean;
  stab: boolean;
  effectiveness: number;
  /** 85..100 */
  rand: number;
}

export function gen3Damage(a: DamageArgs): number {
  let d = Math.floor(
    (Math.floor((2 * a.level) / 5 + 2) * a.power * a.atk) / Math.max(1, a.def),
  );
  d = Math.floor(d / 50);
  if (a.physical && a.attackerOverheated) d = Math.floor(d / 2);
  d += 2;
  if (a.crit) d *= 2;
  if (a.stab) d = Math.floor(d * 1.5);
  d = Math.floor(d * a.effectiveness);
  d = Math.floor((d * a.rand) / 100);
  return Math.max(1, d);
}
