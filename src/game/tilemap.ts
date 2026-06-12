/** Minimal Tiled .tmj reader for orthogonal CSV-data maps. */

export interface SpawnObject {
  name: string;
  type: string;
  tileX: number;
  tileY: number;
}

export interface LoadedMap {
  id: string;
  width: number;
  height: number;
  ground: number[];
  collision: number[];
  zones: number[];
  spawns: SpawnObject[];
}

interface TmjLayer {
  type: string;
  name: string;
  data?: number[];
  objects?: Array<{ name: string; type: string; x: number; y: number }>;
}

interface Tmj {
  width: number;
  height: number;
  layers: TmjLayer[];
}

export function parseTmj(id: string, raw: unknown): LoadedMap {
  const tmj = raw as Tmj;
  const layer = (name: string): number[] =>
    tmj.layers.find((l) => l.type === 'tilelayer' && l.name === name)?.data ?? [];
  const objects = tmj.layers.find((l) => l.type === 'objectgroup')?.objects ?? [];
  return {
    id,
    width: tmj.width,
    height: tmj.height,
    ground: layer('ground'),
    collision: layer('collision'),
    zones: layer('encounters'),
    spawns: objects.map((o) => ({
      name: o.name,
      type: o.type,
      tileX: Math.floor(o.x / 16),
      tileY: Math.floor(o.y / 16),
    })),
  };
}

export const tileAt = (map: LoadedMap, layer: number[], x: number, y: number): number =>
  x < 0 || y < 0 || x >= map.width || y >= map.height ? 1 : (layer[y * map.width + x] ?? 0);

export const isSolid = (map: LoadedMap, x: number, y: number): boolean =>
  x < 0 || y < 0 || x >= map.width || y >= map.height || tileAt(map, map.collision, x, y) === 1;
