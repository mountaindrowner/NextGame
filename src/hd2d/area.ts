import type * as THREE from 'three';
import type { Mood } from './mood';
import type { Dir } from './sprites';

/**
 * One explorable area. A builder fills a fresh THREE.Scene and returns this
 * description; main.ts owns the player, camera, UI and transitions.
 */

export interface Spot { x: number; z: number; face?: Dir }

/** A line of speech (or a sign), shown in the dialogue panel. */
export interface Line { name?: string; portrait?: string; lines: string[] }

/** Something the player can face and press A on. */
export interface Thing {
  x: number;
  z: number;
  /** Prompt height above the ground. */
  height: number;
  label: string;
  /** Interaction reach (default 1.6). */
  reach?: number;
  say?: Line;
  /** Travel after the speech (or at once if there is none). */
  go?: { to: string; spawn: string };
}

/** Walking into this box travels (or, with only `say`, turns you back). */
export interface Trigger {
  x0: number; z0: number; x1: number; z1: number;
  go?: { to: string; spawn: string };
  say?: Line;
}

export interface NPC {
  char: string;
  col: number;
  row: number;
  name: string;
  lines?: string[];
  facing?: string;
  bark?: string;
  /** a colony Warden (challenge bark; their trial isn't built yet) */
  warden?: { bark?: string };
}

export interface Area {
  id: string;
  title: string;
  sub: string;
  mood: Mood;
  /** Camera look-target clamp (world units). */
  cam: { x0: number; x1: number; z0: number; z1: number };
  /** May a body of radius r stand here, coming from (fx, fz)? */
  blocked(x: number, z: number, r: number, fx: number, fz: number): boolean;
  ground(x: number, z: number): number;
  spawns: Record<string, Spot>;
  triggers: Trigger[];
  things: Thing[];
  npcs: NPC[];
  /** True where wild Ohms hide (tall grass). */
  wild?(x: number, z: number): boolean;
  /** Encounter table for the wild cells (src/data/encounters.ts id). */
  zone?: string;
  /** Wild Ohms you can see, wandering near (x, z); touching one starts a battle. */
  roamers?: Array<{ num: number; level: number; x: number; z: number; range: number }>;
  /** Allow the Day/Night toggle (outdoor areas). */
  sky: boolean;
  update(t: number, focus: THREE.Vector3, camTarget: THREE.Vector3): void;
}

export type AreaBuilder = (scene: THREE.Scene, night: boolean) => Promise<Area>;

/** Old map JSON (public/world/<id>.json) — the NPC/sign/trainer source of record. */
export interface MapData {
  spawn: { x: number; y: number };
  npcs?: NPC[];
  trainers?: NPC[];
  signs?: Array<{ col: number; row: number; text: string }>;
  interacts?: Array<{ x: number; y: number; kind: string }>;
}

export async function loadMap(id: string): Promise<MapData> {
  // retried: a throttled host can drop a request
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(`./world/${id}.json`);
      if (!r.ok) throw new Error(`${id}.json: HTTP ${r.status}`);
      return (await r.json()) as MapData;
    } catch (e) {
      if (i >= 3) throw e;
      await new Promise((res) => setTimeout(res, 500 * (i + 1)));
    }
  }
}

/** Trainers speak their bark (without the "Name:" prefix) until combat lands. */
export function castOf(d: MapData): NPC[] {
  return [
    ...(d.npcs ?? []).map((n) => ({ ...n, lines: n.lines ?? (n.warden?.bark ? [n.warden.bark.replace(/^[^:]+:\s*/, '')] : []) })),
    ...(d.trainers ?? []).map((t) => ({ ...t, lines: t.lines ?? (t.bark ? [t.bark.replace(/^[^:]+:\s*/, '')] : []) })),
  ];
}
