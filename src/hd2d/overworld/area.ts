import * as THREE from 'three';
import { currentChunk, useChunk, type Chunk } from '../world';
import { setAprons, scrubTex } from '../terrain';
import { planeGeo } from '../geo';
import { DAY, NIGHT } from '../mood';
import type { Area, AreaBuilder, NPC, Spot, Thing, Trigger } from '../area';
import { buildField } from '../field/area';
import { buildFarmRoad } from '../farmroad/area';
import { buildRailhead } from '../railhead/area';
import { buildScar } from '../scar/area';
import { buildTransition, type TransitionSpec } from './transition';

/**
 * The surface as ONE continuous world (Mark: seamless, with real distance
 * crossed between places). Each map keeps its own layout and code and is
 * placed at an offset; between neighbours runs a transition stretch of open
 * country. North is −z. Interiors (Ohmstead, the Cistern) stay separate areas
 * reached through the lift and the culvert.
 *
 *   z     −224 … −190   the Rust Mile
 *         −190 … −146   (transition: the interstate approach)
 *         −146 … −118   Railhead
 *         −118 …  −74   (transition: the grain line)
 *          −74 …  −44   the Farm Road
 *          −44 …    0   (transition: the old homestead)
 *            0 …   28   the Field
 */

interface Placed { id: string; area: Area; chunk: Chunk; group: THREE.Group; ox: number; oz: number; cols: number; rows: number; named: boolean }

/** Map chunks: builder, size and offset. Offsets are whole units so NPC tiles stay on the grid. */
const MAPS = [
  { id: 'field', build: buildField, cols: 40, rows: 28, ox: 0, oz: 0, exitN: 20.5, entryS: 0 },
  { id: 'farmroad', build: buildFarmRoad, cols: 28, rows: 30, ox: 6, oz: -74, exitN: 9.5, entryS: 13.5 },
  { id: 'railhead', build: buildRailhead, cols: 44, rows: 28, ox: -4, oz: -146, exitN: 22.5, entryS: 22.5 },
  { id: 'scar', build: buildScar, cols: 52, rows: 34, ox: -8, oz: -224, exitN: 26, entryS: 26 },
] as const;
export const OVERWORLD_IDS = new Set<string>(MAPS.map((m) => m.id));
export function overworldOffset(id: string): { ox: number; oz: number } | undefined {
  const m = MAPS.find((q) => q.id === id);
  return m ? { ox: m.ox, oz: m.oz } : undefined;
}

const TRANSITIONS: Array<{ id: string; south: string; north: string; landmark: TransitionSpec['landmark']; zone: string; seed: number }> = [
  { id: 't-homestead', south: 'field', north: 'farmroad', landmark: 'homestead', zone: 'field-grass', seed: 811 },
  { id: 't-grain', south: 'farmroad', north: 'railhead', landmark: 'grain', zone: 'farmroad-fence', seed: 823 },
  { id: 't-onramp', south: 'railhead', north: 'scar', landmark: 'onramp', zone: 'railhead-yard', seed: 837 },
];

export const buildOverworld: AreaBuilder = async (scene, night) => {
  setAprons(false);
  const placed: Placed[] = [];
  const place = async (id: string, build: AreaBuilder | ((g: THREE.Scene, n: boolean) => Promise<Area>), ox: number, oz: number, cols: number, rows: number, named: boolean): Promise<Placed> => {
    const group = new THREE.Group();
    scene.add(group);
    const area = await build(group as unknown as THREE.Scene, night);
    const chunk = currentChunk();
    group.position.set(ox, 0, oz);
    // shader water reads world z for its bank shading: shift it with the chunk
    group.traverse((o) => {
      const u = ((o as THREE.Mesh).material as THREE.ShaderMaterial | undefined)?.uniforms;
      if (u?.bankA && u.bankB) { u.bankA.value += oz; u.bankB.value += oz; }
    });
    const p: Placed = { id, area, chunk, group, ox, oz, cols, rows, named };
    placed.push(p);
    return p;
  };
  try {
    for (const m of MAPS) await place(m.id, m.build, m.ox, m.oz, m.cols, m.rows, true);
    // each transition spans both neighbours (plus a margin) and blends into their edges
    for (const t of TRANSITIONS) {
      const S = placed.find((p) => p.id === t.south)!, N = placed.find((p) => p.id === t.north)!;
      const ms = MAPS.find((m) => m.id === t.south)!, mn = MAPS.find((m) => m.id === t.north)!;
      const x0 = Math.min(S.ox, N.ox) - 8, x1 = Math.max(S.ox + S.cols, N.ox + N.cols) + 8;
      const oz = N.oz + N.rows, rows = S.oz - oz, cols = x1 - x0;
      const profile = (p: Placed, lz: number): number[] => {
        useChunk(p.chunk);
        const out: number[] = [];
        for (let lx = 0; lx <= cols; lx += 0.25) {
          const wx = x0 + lx - p.ox;
          out.push(wx >= 0 && wx <= p.cols ? p.chunk.w.height(Math.min(p.cols - 0.01, Math.max(0.01, wx)), lz) : 0.88);
        }
        return out;
      };
      const spec: TransitionSpec = {
        id: t.id, cols, rows, landmark: t.landmark, zone: t.zone, seed: t.seed,
        roadS: S.ox + ms.exitN - x0, roadN: N.ox + mn.entryS - x0,
        profS: profile(S, 0.01), profN: profile(N, N.rows - 0.01),
      };
      await place(t.id, (g, n) => buildTransition(g, n, spec), x0, oz, cols, rows, false);
    }
  } finally {
    setAprons(true);
  }

  // scrubland beyond the sides of every chunk, level with the berm tops — no void at the edges
  const minX = Math.min(...placed.map((p) => p.ox)) - 50, maxX = Math.max(...placed.map((p) => p.ox + p.cols)) + 50;
  const minZ = Math.min(...placed.map((p) => p.oz)), maxZ = Math.max(...placed.map((p) => p.oz + p.rows));
  const apron = new THREE.MeshStandardMaterial({ map: scrubTex(), roughness: 1 });
  const slab = (x0: number, z0: number, x1: number, z1: number): void => {
    if (x1 - x0 < 0.01 || z1 - z0 < 0.01) return;
    const m = new THREE.Mesh(planeGeo(x1 - x0, z1 - z0), apron);
    m.rotation.x = -Math.PI / 2;
    m.position.set((x0 + x1) / 2, 0.84, (z0 + z1) / 2);
    m.receiveShadow = true;
    scene.add(m);
  };
  for (const p of placed) { slab(minX, p.oz, p.ox + 0.4, p.oz + p.rows); slab(p.ox + p.cols - 0.4, p.oz, maxX, p.oz + p.rows); }
  slab(minX, minZ - 50, maxX, minZ + 0.4);
  slab(minX, maxZ - 0.4, maxX, maxZ + 50);

  const at = (x: number, z: number): Placed | undefined => placed.find((p) => x >= p.ox && x < p.ox + p.cols && z >= p.oz && z < p.oz + p.rows);
  const local = <T>(p: Placed, fn: () => T): T => { useChunk(p.chunk); return fn(); };

  // merge spawns, things, NPCs and the triggers that leave the overworld (lift, culvert)
  const spawns: Record<string, Spot> = {};
  const things: Thing[] = [], npcs: NPC[] = [], triggers: Trigger[] = [];
  const roamers: NonNullable<Area['roamers']> = [];
  for (const p of placed) {
    for (const [k, s] of Object.entries(p.area.spawns)) spawns[`${p.id}:${k}`] = { ...s, x: s.x + p.ox, z: s.z + p.oz };
    for (const t of p.area.things) things.push({ ...t, x: t.x + p.ox, z: t.z + p.oz });
    for (const n of p.area.npcs) npcs.push({ ...n, col: n.col + p.ox, row: n.row + p.oz });
    for (const t of p.area.triggers) if (!t.go || !OVERWORLD_IDS.has(t.go.to)) triggers.push({ ...t, x0: t.x0 + p.ox, x1: t.x1 + p.ox, z0: t.z0 + p.oz, z1: t.z1 + p.oz });
    for (const r of p.area.roamers ?? []) roamers.push({ ...r, x: r.x + p.ox, z: r.z + p.oz });
  }
  spawns.start = spawns['field:start']!;

  let current = placed[0]!;
  let lastNamed = placed[0]!;
  const ow: Area = {
    id: 'overworld',
    get title() { return lastNamed.area.title; },
    get sub() { return lastNamed.area.sub; },
    get region() { return current.id.startsWith('t-') ? lastNamed.id : current.id; },
    get zone() { return current.area.zone; },
    mood: night ? NIGHT : DAY,
    sky: true,
    // the camera keeps to the chunk you're in sideways, and runs the whole world north–south
    get cam() {
      const c = current.area.cam;
      return { x0: c.x0 + current.ox, x1: c.x1 + current.ox, z0: minZ + 4.2, z1: maxZ - 4.6 };
    },
    bounds: { x0: Math.min(...placed.map((p) => p.ox)), x1: Math.max(...placed.map((p) => p.ox + p.cols)), z0: minZ, z1: maxZ },
    blocked(x, z, r, fx, fz, hover) {
      // sample the body's corners each in its own chunk, so you can walk across seams
      for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r], [0, 0]] as Array<[number, number]>) {
        const px = x + dx, pz = z + dz, p = at(px, pz);
        if (!p) return true;
        if (local(p, () => p.area.blocked(px - p.ox, pz - p.oz, 0, fx + dx - p.ox, fz + dz - p.oz, hover))) return true;
      }
      return false;
    },
    ground(x, z) { const p = at(x, z); return p ? local(p, () => p.area.ground(x - p.ox, z - p.oz)) : 0.84; },
    water(x, z) { const p = at(x, z); return !!p && local(p, () => !!p.area.water?.(x - p.ox, z - p.oz)); },
    wild(x, z) { const p = at(x, z); return !!p && local(p, () => !!p.area.wild?.(x - p.ox, z - p.oz)); },
    spawns, triggers, things, npcs, roamers,
    update(t, focus, cam) {
      const here = at(focus.x, focus.z);
      if (here && here !== current) {
        current = here;
        if (here.named && here !== lastNamed) { lastNamed = here; ow.onRegion?.(here.area.title, here.area.sub); }
      }
      const lf = new THREE.Vector3(), lc = new THREE.Vector3();
      for (const p of placed) {
        // only the chunks near you are drawn and animated
        const dx = Math.max(p.ox - focus.x, 0, focus.x - (p.ox + p.cols)), dz = Math.max(p.oz - focus.z, 0, focus.z - (p.oz + p.rows));
        const near = Math.hypot(dx, dz) < (focus.y > 500 ? 70 : 30); // (focus.y > 500: the top-down map shows a wider ring)
        p.group.visible = near;
        if (!near) continue;
        lf.set(focus.x - p.ox, focus.y, focus.z - p.oz);
        lc.set(cam.x - p.ox, cam.y, cam.z - p.oz);
        local(p, () => p.area.update(t, lf, lc));
      }
    },
  };
  return ow;
};
