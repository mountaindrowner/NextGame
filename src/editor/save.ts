import type { FieldData } from './types';
import { CELL_LAYERS } from './types';

/** Fetch a map's JSON (relative to the editor page, works in dev and on githack). */
export async function loadMapData(id: string): Promise<FieldData> {
  const res = await fetch(`world/${id}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`could not load world/${id}.json (${res.status})`);
  return normalize((await res.json()) as FieldData);
}

/** Load a map's background image; resolves to null if it isn't there. */
export function loadMapImage(id: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = `world/${id}.png?ts=${Date.now()}`;
  });
}

/** Make sure every cell array exists at cols*rows length and width/height agree. */
export function normalize(d: FieldData): FieldData {
  const n = d.cols * d.rows;
  for (const layer of CELL_LAYERS) {
    const arr = (d[layer.key] as number[] | undefined) ?? [];
    const fixed = arr.slice(0, n);
    while (fixed.length < n) fixed.push(0);
    (d as Record<string, unknown>)[layer.key] = fixed;
  }
  d.width = d.cols * d.tile;
  d.height = d.rows * d.tile;
  return d;
}

/** Resize the grid, preserving overlapping cells and zeroing new ones. */
export function resize(d: FieldData, cols: number, rows: number): FieldData {
  const remap = (arr: number[] | undefined): number[] => {
    const out = new Array<number>(cols * rows).fill(0);
    if (!arr) return out;
    for (let r = 0; r < Math.min(rows, d.rows); r++)
      for (let c = 0; c < Math.min(cols, d.cols); c++) out[r * cols + c] = arr[r * d.cols + c] ?? 0;
    return out;
  };
  for (const layer of CELL_LAYERS) (d as Record<string, unknown>)[layer.key] = remap(d[layer.key] as number[] | undefined);
  d.cols = cols;
  d.rows = rows;
  d.width = cols * d.tile;
  d.height = rows * d.tile;
  return d;
}

/** Stable, game-shaped JSON (cell arrays inline-ish, key order close to the gen tools). */
export function serialize(d: FieldData): string {
  normalize(d);
  // strip empty optional arrays so exports stay tidy
  const out: Record<string, unknown> = { ...d };
  for (const k of ['grassAny', 'water', 'placements', 'npcs', 'trainers', 'items', 'signs', 'exits', 'interacts', 'ledges']) {
    const v = out[k];
    if (Array.isArray(v) && v.length === 0) delete out[k];
  }
  return JSON.stringify(out);
}

export function download(filename: string, text: string): void {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Try to write back to disk via the dev-server endpoint (npm run dev only). */
export async function saveToDisk(id: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`/__save_map?id=${encodeURIComponent(id)}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: text });
    return res.ok;
  } catch {
    return false;
  }
}
