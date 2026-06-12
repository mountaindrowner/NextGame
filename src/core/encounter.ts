import type { EncounterZone } from './defs';
import type { Rng } from './rng';

export interface WildSpawn {
  speciesNum: number;
  level: number;
}

/** Gen 3 walking-encounter roll: rate/255 per step, then weighted slot. */
export function rollEncounter(
  zone: EncounterZone,
  rng: Rng,
  dampened = false,
): WildSpawn | undefined {
  const rate = dampened ? Math.floor(zone.rate / 3) : zone.rate;
  if (rng.int(0, 255) >= rate) return undefined;
  let roll = rng.int(1, 100);
  for (const slot of zone.slots) {
    roll -= slot.weight;
    if (roll <= 0) {
      return { speciesNum: slot.speciesNum, level: rng.int(slot.minLevel, slot.maxLevel) };
    }
  }
  const last = zone.slots[zone.slots.length - 1];
  return last ? { speciesNum: last.speciesNum, level: last.minLevel } : undefined;
}
