import type { ItemDef } from './defs';
import type { Rng } from './rng';

/**
 * The colony-counter economy (GDD §10.8): buy consumables with credits, sell
 * salvage for credits. Pure — scenes mutate a Wallet, the core owns the rules.
 */

/** Just the spendable slice of game state a counter touches. */
export interface Wallet {
  bag: Record<string, number>;
  credits: number;
}

export interface ShopResult {
  ok: boolean;
  message: string;
}

/** Salvage sells at full `price`; ordinary stock isn't resellable (no buy-low loop). */
export function sellValue(def: ItemDef): number {
  return def.kind === 'salvage' ? def.price : 0;
}

export function buyItem(w: Wallet, def: ItemDef, qty = 1): ShopResult {
  if (def.price <= 0) return { ok: false, message: `${def.name} isn't for sale.` };
  if (qty <= 0) return { ok: false, message: 'Buy how many?' };
  const cost = def.price * qty;
  if (w.credits < cost) return { ok: false, message: `Not enough credits — that's ${cost} cr.` };
  w.credits -= cost;
  w.bag[def.id] = (w.bag[def.id] ?? 0) + qty;
  return { ok: true, message: `Bought ${def.name}${qty > 1 ? ` x${qty}` : ''}. −${cost} cr.` };
}

export function sellItem(w: Wallet, def: ItemDef, qty = 1): ShopResult {
  const have = w.bag[def.id] ?? 0;
  if (qty <= 0) return { ok: false, message: 'Sell how many?' };
  if (have < qty) return { ok: false, message: `You don't have ${qty} ${def.name}.` };
  const value = sellValue(def) * qty;
  if (value <= 0) return { ok: false, message: `The counter won't take ${def.name}.` };
  w.bag[def.id] = have - qty;
  w.credits += value;
  return { ok: true, message: `Sold ${def.name}${qty > 1 ? ` x${qty}` : ''}. +${value} cr.` };
}

/**
 * Salvage drop off a downed wild Ohm: a chance to leave scrap, scaling up to the
 * better grades with the wild's level. IDs are stable canon, so the core owns
 * the ladder (the engine emits the id; consumers resolve the display name).
 */
export function rollSalvage(level: number, rng: Rng): string | undefined {
  if (!rng.chance(35)) return undefined; // most wilds leave nothing
  if (level >= 22 && rng.chance(30)) return 'relic';
  if (level >= 10 && rng.chance(45)) return 'alloy';
  return 'scrap';
}
