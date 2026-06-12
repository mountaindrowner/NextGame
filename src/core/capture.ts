import type { SpeciesDef, StatusName } from './defs';

/**
 * IFF Recalibration economics (GDD §10.6): Gen 3 catch value drives the
 * node-puzzle budget. Statuses ease the hack by slowing the timer.
 */

export interface PuzzleBudget {
  catchValue: number; // 1..255, Gen 3 scale
  timerSeconds: number;
  gridSize: number; // puzzle grid edge
  decoys: number;
}

const STRONG_STATUS: ReadonlySet<StatusName> = new Set(['STANDBY', 'LOCKED']);

export function statusBonus(status?: StatusName): number {
  if (!status) return 1;
  return STRONG_STATUS.has(status) ? 2 : 1.5;
}

export function catchValue(
  species: SpeciesDef,
  maxIntegrity: number,
  currentIntegrity: number,
  status?: StatusName,
): number {
  const raw =
    ((3 * maxIntegrity - 2 * currentIntegrity) * species.catchRate * statusBonus(status)) /
    (3 * maxIntegrity);
  return Math.max(1, Math.min(255, Math.floor(raw)));
}

export function puzzleBudget(
  species: SpeciesDef,
  maxIntegrity: number,
  currentIntegrity: number,
  status?: StatusName,
): PuzzleBudget {
  const a = catchValue(species, maxIntegrity, currentIntegrity, status);
  let timer = 5 + Math.round((10 * a) / 255); // 5..15s
  if (status) timer = Math.round(timer * (STRONG_STATUS.has(status) ? 1.5 : 1.25));
  const gridSize = a >= 150 ? 4 : a >= 60 ? 5 : 6;
  return { catchValue: a, timerSeconds: timer, gridSize, decoys: gridSize - 2 };
}
