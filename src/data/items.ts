import type { ItemDef } from '../core/defs';

/** v1 item set (GDD §10.8). Prices draft — economy pass lands at M13. */
export const ITEMS: readonly ItemDef[] = [
  { id: 'storage-node', name: 'Storage Node', kind: 'node', price: 200 },
  { id: 'repair-kit', name: 'Repair Kit', kind: 'heal', price: 300, heal: 20 },
  { id: 'repair-kit-plus', name: 'Repair Kit+', kind: 'heal', price: 700, heal: 50 },
  { id: 'repair-kit-max', name: 'Repair Kit MAX', kind: 'heal', price: 1200, heal: 120 },
  { id: 'full-repair', name: 'Full Repair', kind: 'heal', price: 2500, heal: -1 },
  { id: 'd-fib', name: 'D-FIB', kind: 'revive', price: 1500 },
  { id: 'coolant-flush', name: 'Coolant Flush', kind: 'cure', price: 250, cures: 'OVERHEAT' },
  { id: 'surge-tape', name: 'Surge Tape', kind: 'cure', price: 250, cures: 'SHORT' },
  { id: 'antivirus', name: 'Antivirus', kind: 'cure', price: 250, cures: 'CORRUPTED' },
  { id: 'wake-signal', name: 'Wake Signal', kind: 'cure', price: 250, cures: 'STANDBY' },
  { id: 'thaw-coil', name: 'Thaw Coil', kind: 'cure', price: 250, cures: 'LOCKED' },
  { id: 'resonance-core', name: 'Resonance Core', kind: 'evolution', price: 2100 },
  { id: 'prime-core', name: 'Prime Core', kind: 'evolution', price: 4600 },
  { id: 'signal-dampener', name: 'Signal Dampener', kind: 'field', price: 350 },
  // Salvage — the sellable credit faucet (GDD §10.7). Dropped by wild Ohms and
  // found on Ohm Runs; never consumed by evolution. `price` is the sell value.
  { id: 'scrap', name: 'Scrap', kind: 'salvage', price: 60 },
  { id: 'alloy', name: 'Alloy', kind: 'salvage', price: 180 },
  { id: 'relic', name: 'Relic', kind: 'salvage', price: 650 },
];

export const ITEMS_BY_ID: ReadonlyMap<string, ItemDef> = new Map(ITEMS.map((i) => [i.id, i]));
