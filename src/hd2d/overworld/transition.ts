import * as THREE from 'three';
import { fbm, rng } from '../noise';
import { textTexture } from '../textures';
import { box, boxGeo, shade, colMat } from '../geo';
import { setWorld, cell, heightAt, hitsSolid, addSolid, type TileWorld } from '../world';
import { buildGround, buildGrass } from '../terrain';
import { M, vines, farmhouse, windmill, cattlePen, binCluster, concreteSilo, type Built } from '../field/buildings';
import { cottonwood, mesquite, deadTree, bush, tumbleweed, powerLine, truck, swayTrees, motes } from '../field/props';
import { fence, roadSign, railLine, boxcar, crossbuck } from '../farmroad/area';
import type { Area } from '../area';
import { DAY, NIGHT } from '../mood';

/**
 * A transition stretch — open country between two places, so the world has
 * real distance in it (Mark: "space that is crossed"). [PROPOSAL] content:
 * procedural prairie a few screens long, a road winding from the southern
 * neighbour's exit to the northern neighbour's entrance, tall grass, groves,
 * telephone poles, fences, and one landmark per stretch. At each seam the
 * ground blends into the neighbour's edge so there's no step or gap.
 */

export interface TransitionSpec {
  id: string;
  cols: number;
  rows: number;
  /** road x at the north and south edges (local) */
  roadN: number;
  roadS: number;
  /** neighbour edge heights, sampled in local x (one per 0.25 units) */
  profN: number[];
  profS: number[];
  landmark: 'homestead' | 'grain' | 'onramp';
  zone: string;
  seed: number;
}

const ROAD_HALF = 1.5;

export async function buildTransition(scene: THREE.Scene, night: boolean, sp: TransitionSpec): Promise<Area> {
  const { cols: COLS, rows: ROWS } = sp;
  const r = rng(sp.seed);
  // the road's centre line: from the south exit to the north entrance, with a lazy S-curve between
  const wig = (r() < 0.5 ? -1 : 1) * (5 + r() * 4);
  const roadX = (z: number): number => {
    const s = z / ROWS; // 0 north … 1 south
    const e = s * s * (3 - 2 * s);
    return sp.roadN + (sp.roadS - sp.roadN) * e + Math.sin(s * Math.PI) * wig * Math.sin(s * Math.PI * 1.4 + 0.3);
  };
  // ground glyphs
  const MAP: string[][] = Array.from({ length: ROWS }, (_, z) => Array.from({ length: COLS }, (_, x) => {
    const onRoad = Math.abs(x + 0.5 - roadX(z + 0.5)) < ROAD_HALF;
    if (onRoad) return 'd';
    const edge = x < 2 || x >= COLS - 2;
    const seam = (z < 4 || z >= ROWS - 4) && Math.abs(x + 0.5 - roadX(z + 0.5)) > ROAD_HALF + 1.5;
    if (edge || seam) return '#';
    return 'g';
  }));
  // tall-grass patches, kept off the road
  for (let k = 0; k < 6; k++) {
    const pz = 7 + Math.floor(r() * (ROWS - 16)), w = 4 + Math.floor(r() * 5), h = 3 + Math.floor(r() * 4);
    const side = r() < 0.5 ? -1 : 1;
    const px = Math.floor(roadX(pz) + side * (3 + r() * 6) - (side < 0 ? w : 0));
    for (let z = pz; z < pz + h; z++) for (let x = px; x < px + w; x++) if (MAP[z]?.[x] === 'g') MAP[z]![x] = 'T';
  }
  const get = (x: number, z: number): string => (x >= 0 && z >= 0 && x < COLS && z < ROWS ? MAP[z]![x]! : '#');
  const prof = (arr: number[], x: number): number => arr[Math.max(0, Math.min(arr.length - 1, Math.round(x * 4)))] ?? 0.88;
  const height = (x: number, z: number): number => {
    let h = (fbm(x * 0.07, z * 0.07, sp.seed, 3) - 0.5) * 0.55;
    const d = Math.abs(x - roadX(z));
    if (d < ROAD_HALF + 1) h *= THREE.MathUtils.smoothstep(d, ROAD_HALF - 0.4, ROAD_HALF + 1); // the road is graded flat
    const e = Math.min(x, COLS - x);
    if (e < 1.6) h += (1.6 - e) * 0.55;
    // blend into the neighbours along the seams
    const kN = 1 - THREE.MathUtils.smoothstep(z, 0, 4), kS = THREE.MathUtils.smoothstep(z, ROWS - 4, ROWS);
    h = h + (prof(sp.profN, x) - h) * kN;
    h = h + (prof(sp.profS, x) - h) * kS;
    return h;
  };
  const W: TileWorld = {
    cols: COLS, rows: ROWS, cell: get, height, seed: sp.seed,
    centerLine: (x, z) => Math.abs(x - roadX(z)) < 0.06 && Math.floor(z * 1.2) % 3 !== 0 && fbm(2, z * 0.5, 36, 2) > 0.38,
  };
  setWorld(W);

  const built: Built[] = [];
  let seed = sp.seed * 7;
  const tree = (o: THREE.Object3D, s = 0.25): void => { scene.add(o); addSolid(o.position.x - s, o.position.z - s, o.position.x + s, o.position.z + s); };
  const clear = (x: number, z: number, pad: number): boolean => get(Math.floor(x), Math.floor(z)) === 'g' && Math.abs(x - roadX(z)) > ROAD_HALF + pad && !hitsSolid(x, z, 1.2);

  // ---- the landmark
  const side = r() < 0.5 ? -1 : 1;
  const lz = ROWS * (0.35 + r() * 0.3), lx = roadX(lz) + side * 9;
  if (sp.landmark === 'homestead') {
    // an abandoned homestead off the road: house, windmill, an empty pen
    built.push(farmhouse(scene, lx, lz, 1, night));
    built.push(windmill(scene, lx + side * 5.5, lz + 1.5));
    built.push(cattlePen(scene, lx - 3, lz + 3.5, lx + 2.5, lz + 7.5));
    fence(scene, [[lx - 4, lz - 2.5], [lx - 4, lz + 2.6]], seed++);
    roadSign(scene, roadX(lz - 4) - side * 2.6, lz - 4, 'FARM RD ^');
  } else if (sp.landmark === 'grain') {
    // a grain elevator and bins on the old main line, a boxcar left on the siding
    built.push(concreteSilo(scene, lx, lz));
    built.push(binCluster(scene, [lx + side * 2.2, lx + side * 3.9, lx + side * 5.5], lz + 0.4));
    const rz = Math.round(lz + 4) + 0.5;
    railLine(scene, rz, 2, COLS - 2);
    boxcar(scene, lx + side * 1.5, rz);
    crossbuck(scene, roadX(rz) + 2.4, rz - 1.3);
    roadSign(scene, roadX(lz - 6) - side * 2.6, lz - 6, 'RAILHEAD ^');
  } else {
    // the approach to the interstate: dead trucks on the shoulder, a sun-bleached billboard
    for (let k = 0; k < 4; k++) {
      const z = ROWS * (0.2 + k * 0.17);
      truck(scene, roadX(z) + (k % 2 ? 2.8 : -2.8), z);
    }
    const g = new THREE.Group();
    for (const dx of [-1.6, 1.6]) g.add(box(0.18, 3.4, 0.18, M.wood(), dx, 0, 0));
    const face = new THREE.MeshStandardMaterial({ map: textTexture('NEXT EXIT · FUEL · FOOD', { w: 128, h: 32, bg: '#d8c8a0', fg: '#8a2e24', font: 'bold 12px monospace', worn: 0.45, seed: 77 }), roughness: 1 });
    const b = new THREE.Mesh(boxGeo(4.2, 1.8, 0.1), [M.wood(), M.wood(), M.wood(), M.wood(), face, M.wood()]);
    b.position.set(0, 3.2, 0.05);
    g.add(shade(b));
    vines(g, -1.7, 0, 0.12, 0.6, 2.8);
    g.position.set(lx, heightAt(lx, lz), lz);
    scene.add(g);
    addSolid(lx - 1.8, lz - 0.2, lx + 1.8, lz + 0.2);
    roadSign(scene, roadX(lz - 6) - side * 2.6, lz - 6, '45  NORTH');
  }

  // ---- telephone poles marching beside the road
  const poles: Array<[number, number, number]> = [];
  for (let z = 3; z < ROWS - 3; z += 7) poles.push([roadX(z) + 2.7, z, (r() - 0.5) * 0.1]);
  powerLine(scene, poles, poles.slice(1).map((_, i) => [i, i + 1] as [number, number]));
  for (const [x, z] of poles) addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);

  // ---- old barbed-wire fences in runs along the road
  for (let z = 6; z < ROWS - 8; z += 9 + r() * 6) {
    const len = 4 + r() * 5, sx = -1 * (ROAD_HALF + 1.2);
    fence(scene, [[roadX(z) + sx, z], [roadX(z + len) + sx, z + len]], seed++);
  }

  // ---- treelines along the seams and edges; groves and scrub across the prairie
  for (let x = 0; x < COLS; x += 1.3 + r() * 1.1) {
    for (const z of [1.2 + r() * 2, ROWS - 1.2 - r() * 2]) {
      if (Math.abs(x - roadX(z)) < ROAD_HALF + 1.6) continue;
      scene.add(cottonwood(x, z, 1.0 + r() * 0.45, seed++));
    }
  }
  for (let z = 0; z < ROWS; z += 1.4 + r() * 1.2) {
    scene.add(cottonwood(0.6 + r() * 0.8, z, 1.0 + r() * 0.4, seed++));
    scene.add(cottonwood(COLS - 0.6 - r() * 0.8, z, 1.0 + r() * 0.4, seed++));
  }
  for (let k = 0; k < Math.round((COLS * ROWS) / 70); k++) {
    // groves: two to five trees huddled together
    const gx = 4 + r() * (COLS - 8), gz = 6 + r() * (ROWS - 12);
    if (!clear(gx, gz, 3)) continue;
    const n = 2 + Math.floor(r() * 4);
    for (let i = 0; i < n; i++) {
      const x = gx + (r() - 0.5) * 3, z = gz + (r() - 0.5) * 3;
      if (!clear(x, z, 2.2)) continue;
      const k2 = r();
      tree(k2 < 0.6 ? cottonwood(x, z, 0.9 + r() * 0.4, seed++) : k2 < 0.85 ? mesquite(x, z, 1.0, seed++) : deadTree(x, z, 1.0, seed++));
    }
  }
  for (let k = 0; k < Math.round((COLS * ROWS) / 45); k++) {
    const x = 3 + r() * (COLS - 6), z = 5 + r() * (ROWS - 10);
    if (!clear(x, z, 1.4)) continue;
    tree(bush(x, z, 0.5 + r() * 0.5, seed++, r() > 0.5), 0.15);
  }
  for (let k = 0; k < 4; k++) { const z = 6 + r() * (ROWS - 12); tumbleweed(scene, roadX(z) + (r() - 0.5) * 5, z, seed++); }

  buildGround(scene);
  const grass = buildGrass(scene);
  const dust = motes(scene, night);

  return {
    id: sp.id,
    title: '',
    sub: '',
    mood: night ? NIGHT : DAY,
    sky: true,
    cam: { x0: 8.2, x1: COLS - 8.2, z0: 0, z1: ROWS },
    blocked: (x, z, rad) => {
      if (x - rad < 0.15 || x + rad > COLS - 0.15) return true;
      for (const [dx, dz] of [[-rad, -rad], [rad, -rad], [-rad, rad], [rad, rad], [0, 0]] as Array<[number, number]>) if (cell(Math.floor(x + dx), Math.floor(z + dz)) === '#') return true;
      return hitsSolid(x, z, rad);
    },
    ground: (x, z) => heightAt(x, z),
    wild: (x, z) => cell(Math.floor(x), Math.floor(z)) === 'T',
    zone: sp.zone,
    spawns: { start: { x: roadX(ROWS - 6), z: ROWS - 6, face: 'N' } },
    triggers: [],
    things: [],
    npcs: [],
    update(t, focus) {
      grass(t);
      swayTrees(t);
      for (const b of built) b.update?.(t);
      dust(t, focus);
    },
  };
}
