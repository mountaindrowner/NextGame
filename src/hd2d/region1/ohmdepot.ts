import * as THREE from 'three';
import { box, beam, colMat } from '../geo';
import { addSolid } from '../world';
import { KM, wallLamp, pendant, crate } from '../ohmstead/kit';
import { interior } from './interior';
import type { Grid } from './section';
import { rack, forklift } from './dungeon-props';
import { shoppingCart } from './props';

/**
 * OHM DEPOT — the optional mega-dungeon at the end of Depot Road (wider-world
 * §1): the orange warehouse's aisles of tool Ohms, the registers up front,
 * the dead garden centre, the lumber yard where the Crane-Ohm works, and the
 * dark back stock behind the strip curtain (LUMEN, later). Routine: a
 * forklift Ohm keeps restocking shelves that stay empty.
 */

type RGB = [number, number, number];
const H = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const RACKS = [6, 10, 14, 18, 22, 26, 30];

/** A checkout lane: belt counter, the register (an Ohm), a candy rack gone to dust. */
function register(root: THREE.Object3D, x: number, z: number): THREE.Mesh {
  root.add(box(0.8, 0.9, 2.2, colMat('#c8c0b0'), x, 0, z));
  root.add(box(0.7, 0.04, 2.0, colMat('#2a2a28'), x, 0.9, z));
  const reg = box(0.5, 0.35, 0.4, colMat('#3a3a38', { metalness: 0.3 }), x, 0.94, z + 0.7);
  root.add(reg);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.16), colMat('#7dff9a', { emissive: '#3dff7a', emissiveIntensity: 1.2 }));
  scr.position.set(x - 0.26, 1.15, z + 0.7);
  scr.rotation.y = -Math.PI / 2;
  root.add(scr);
  addSolid(x - 0.45, z - 1.15, x + 0.45, z + 1.15);
  return scr;
}

export const buildOhmDepot = interior({
  id: 'ohmdepot',
  title: 'OHM DEPOT',
  sub: 'The orange warehouse',
  cols: 46, rows: 32, seed: 7307,
  zone: 'ohmdepot-aisles',
  wall: 'block',
  start: { x: 9.5, z: 30.4, face: 'N' },
  ground(g: Grid) {
    g.rect(8, 31, 3, 1, '.'); // the entrance
    g.rect(1, 1, 34, 3, 'v'); // the back stock, pitch dark
    g.rect(36, 1, 9, 13, '.'); // the lumber yard
    for (const [x, z, rx, rz, s] of [[8.0, 14.0, 0.9, 2.4, 51], [16.0, 9.0, 0.9, 2.0, 52], [24.0, 18.0, 0.9, 2.6, 53], [32.0, 12.0, 0.9, 2.2, 54], [40.0, 22.0, 2.4, 2.4, 55], [40.0, 8.0, 2.4, 2.0, 56]] as Array<[number, number, number, number, number]>)
      g.blob(x, z, rx, rz, 'r', s, (q) => q === '.');
  },
  floor(gl, x, z, fine): RGB {
    // sealed concrete, polished once, scuffed grey lanes down the aisles
    let c = mix(H('#9a968c'), H('#a8a498'), fine * 0.5 + 0.25);
    if ((x % 4) < 0.04 || (z % 4) < 0.04) c = mix(c, H('#6a665c'), 0.6); // saw cuts
    if (x > 36 && z < 14) c = mix(H('#8a7a5a'), H('#9a8a68'), fine); // lumber-yard dirt
    if (z > 26.5 && z < 29) c = mix(c, H('#d0702a'), 0.25); // the orange stripe at the checkouts
    if (gl === 'r') c = mix(H('#b89a6a'), H('#8a7050'), fine); // spilled boxes, sawdust
    return c;
  },
  dress(d) {
    const { root, pool } = d;
    d.spawns.door = { x: 9.5, z: 30.4, face: 'N' };
    d.triggers.push({ x0: 8.0, x1: 11.0, z0: 31.8, z1: 34, go: { to: 'depotroad', spawn: 'depot' } });
    RACKS.forEach((x, i) => rack(root, x, 5.0, 23.0, 900 + i));
    d.built.push(forklift(root, 12.0, 6.0, 22.0, 0.55), forklift(root, 28.0, 7.0, 22.5, 0.45));
    const screens = [6, 12, 18, 24].map((x) => register(root, x, 27.2));
    d.built.push({ update(t) { screens.forEach((s, i) => { s.visible = Math.sin(t * (0.7 + i * 0.2) + i) > -0.5; }); } });
    // the strip curtain across the back stock
    for (let x = 1.5; x < 35; x += 0.35) root.add(box(0.28, 2.6, 0.02, colMat('#c8ccc8', { transparent: true, opacity: 0.55, roughness: 0.3 }), x, 0, 4.2));
    addSolid(1.0, 4.0, 35.0, 4.4);
    // the lumber yard: stacked boards, and the crane gantry the Crane-Ohm rides
    for (const [x, z] of [[38.0, 4.0], [42.5, 4.0], [38.0, 10.5], [42.5, 10.5]] as Array<[number, number]>) {
      for (let k = 0; k < 5; k++) root.add(box(2.4, 0.22, 1.6, KM.wood(), x, k * 0.24, z));
      addSolid(x - 1.25, z - 0.85, x + 1.25, z + 0.85);
    }
    for (const x of [36.6, 44.4]) root.add(box(0.3, 4.0, 0.3, KM.steel(), x, 0, 7.2));
    root.add(box(8.2, 0.35, 0.4, KM.hazard(), 40.5, 4.0, 7.2));
    root.add(beam(new THREE.Vector3(40.5, 4.0, 7.2), new THREE.Vector3(40.5, 2.0, 7.2), 0.04, colMat('#2a2622')));
    addSolid(36.4, 7.0, 36.8, 7.4); addSolid(44.2, 7.0, 44.6, 7.4);
    // the dead garden centre: pots of dust, a shopping cart or three
    for (let i = 0; i < 12; i++) {
      const x = 37.5 + (i % 4) * 2.0, z = 17.0 + Math.floor(i / 4) * 3.0;
      root.add(box(0.6, 0.5, 0.6, colMat('#8a5a3a'), x, 0, z));
      root.add(box(0.1, 0.5, 0.1, colMat('#4a3a2a'), x, 0.5, z));
      addSolid(x - 0.35, z - 0.35, x + 0.35, z + 0.35);
    }
    shoppingCart(root as unknown as THREE.Scene, 34.0, 25.0, 0.4);
    shoppingCart(root as unknown as THREE.Scene, 20.0, 25.5, 2.2);
    shoppingCart(root as unknown as THREE.Scene, 35.0, 16.0, 1.2, true);
    for (const [x, z] of [[2.4, 26.0], [3.0, 26.6], [2.6, 25.4]] as Array<[number, number]>) crate(root, x, z, 0.55);
    addSolid(2.0, 25.0, 3.4, 27.0);
    const back = d.mount(0);
    for (const x of [8.0, 20.0, 32.0]) wallLamp(back, pool, x, 1.0, 2.2, false);
    for (const [x, z] of [[8, 12], [20, 12], [32, 16], [8, 24], [20, 24], [40, 9], [40, 22]] as Array<[number, number]>) pendant(root, pool, x, z, z > 20);
    d.things.push(
      { x: 18.0, z: 5.4, height: 1.6, label: 'Look', reach: 2.2, say: { lines: ['Past the strip curtain, the back stock is black as a well. Too dark to go further without a light.'] } },
      { x: 12.0, z: 28.6, height: 1.4, label: 'Look', say: { lines: ['The register drawer is open. It chimes when you walk past, and asks for nothing.'] } },
      { x: 9.5, z: 16.0, height: 1.8, label: 'Look', reach: 1.4, say: { lines: ['Empty shelves, faced up neat. Somewhere a forklift backs up, beeping, to put nothing on them.'] } },
    );
    d.roamers.push(
      { num: 49, level: 6, x: 8.0, z: 14.0, range: 1.4 },
      { num: 52, level: 6, x: 24.0, z: 18.0, range: 1.4 },
      { num: 78, level: 7, x: 30.0, z: 25.5, range: 2.4 },
      { num: 66, level: 7, x: 40.0, z: 22.0, range: 1.6 },
      { num: 57, level: 10, x: 40.5, z: 7.6, range: 1.4 },
    );
  },
});
