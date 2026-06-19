/**
 * What each colony counter stocks (GDD §10.8). Tiers climb with the critical
 * path: the Field stocks basics, colony counters add the mid kit + revive, and
 * the deep-route depot carries the top kit and a Resonance Core. A `shop`
 * interact in a map names its tier; salvage is sold here, never bought.
 */
export const SHOP_STOCK: Record<string, string[]> = {
  field: ['storage-node', 'repair-kit', 'coolant-flush', 'surge-tape', 'antivirus', 'wake-signal', 'thaw-coil', 'signal-dampener'],
  colony: ['storage-node', 'repair-kit', 'repair-kit-plus', 'd-fib', 'coolant-flush', 'surge-tape', 'antivirus', 'wake-signal', 'thaw-coil', 'signal-dampener'],
  depot: ['storage-node', 'repair-kit-plus', 'repair-kit-max', 'full-repair', 'd-fib', 'resonance-core', 'coolant-flush', 'surge-tape', 'antivirus', 'wake-signal', 'thaw-coil', 'signal-dampener'],
};

/** Fallback tier for a `shop` interact that names nothing recognizable. */
export const DEFAULT_SHOP = 'colony';
