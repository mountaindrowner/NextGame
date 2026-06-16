import type { ItemDef } from './defs';
import type { Battler } from './battle/contract';

export interface ItemUseResult {
  ok: boolean;
  message: string;
}

/**
 * Apply a target-item (heal / revive / cure) to one Ohm, in place. Pure of
 * inventory — the caller owns the bag and decrements on `ok`. Mirrors the
 * battle engine's effects so out-of-battle (the field menu) and in-battle use
 * stay consistent. Non-target items (node/evolution/field) are handled by the
 * caller and return `ok:false` here.
 */
export function applyItemToBattler(item: ItemDef, target: Battler): ItemUseResult {
  if (item.kind === 'heal') {
    if (target.integrity <= 0) return { ok: false, message: `${target.name} is offline — needs a D-FIB.` };
    if (target.integrity >= target.stats.integrity) return { ok: false, message: `${target.name} is already at full INTEGRITY.` };
    const full = item.heal === undefined || item.heal < 0;
    const amount = full ? target.stats.integrity : item.heal!;
    const before = target.integrity;
    target.integrity = Math.min(target.stats.integrity, target.integrity + amount);
    return { ok: true, message: `${target.name} recovered ${target.integrity - before} INTEGRITY.` };
  }
  if (item.kind === 'revive') {
    if (target.integrity > 0) return { ok: false, message: `${target.name} is still online.` };
    target.integrity = Math.max(1, Math.floor(target.stats.integrity / 2));
    target.status = undefined;
    target.statusTurns = 0;
    target.glitchedTurns = 0;
    return { ok: true, message: `D-FIB! ${target.name} jolts back online.` };
  }
  if (item.kind === 'cure') {
    if (!target.status || target.status !== item.cures) return { ok: false, message: `It had no effect on ${target.name}.` };
    const cleared = target.status;
    target.status = undefined;
    target.statusTurns = 0;
    target.glitchedTurns = 0;
    return { ok: true, message: `${target.name}'s ${cleared} cleared.` };
  }
  return { ok: false, message: 'It had no effect.' };
}
