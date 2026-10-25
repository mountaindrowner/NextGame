import * as THREE from 'three';
import { box, cyl, beam, colMat, shade, cylGeo } from '../geo';
import { addSolid } from '../world';
import { KM, wallLamp, pendant, crate, drum, table, shelf } from '../ohmstead/kit';
import { interior, exitDoor } from './interior';
import type { Grid } from './section';

/**
 * THE ROUNDHOUSE — Railhead's trial dungeon (Critical Path §3): the engine
 * shed's three stalls over their pits, the dead engine that never came out,
 * the Brokers at their tables, Warden Dell Marrow at the back. The trial
 * battles aren't wired yet; the cast is placed and speaks. Routine: the
 * gantry hook swings slowly over the middle stall.
 */

type RGB = [number, number, number];
const H = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

/** The engine that never came out: boiler, smokebox, cab eaten to lace, drivers sunk in the pit. */
function deadEngine(root: THREE.Object3D, x: number, z: number): void {
  const g = new THREE.Group();
  const iron = colMat('#3a3430', { metalness: 0.5, roughness: 0.65 });
  const boiler = new THREE.Mesh(cylGeo(0.75, 0.75, 6.0, 18), KM.rust());
  boiler.rotation.x = Math.PI / 2;
  boiler.position.set(0, 1.55, -0.4);
  g.add(shade(boiler));
  g.add(cyl(0.8, 0.8, 0.6, iron, 0, 0.75, -3.4).rotateX(Math.PI / 2));
  g.add(cyl(0.22, 0.3, 0.9, iron, 0, 2.2, -2.6, 10)); // the stack
  g.add(cyl(0.3, 0.3, 0.45, KM.rust(), 0, 2.25, -0.6, 10)); // the dome
  g.add(box(1.7, 1.9, 1.6, KM.rust(), 0, 0.9, 3.0)); // the cab
  for (const dx of [-0.6, 0.6]) g.add(box(0.05, 0.8, 0.9, colMat('#0d0c0b'), dx * 1.45, 1.6, 3.0)); // windows gone
  for (const dz of [-1.8, -0.6, 0.6, 1.8]) for (const dx of [-0.72, 0.72]) {
    const w = new THREE.Mesh(cylGeo(0.62, 0.62, 0.12, 16), iron);
    w.rotation.z = Math.PI / 2;
    w.position.set(dx, 0.35, dz);
    g.add(shade(w));
  }
  g.add(beam(new THREE.Vector3(-0.8, 0.4, -1.8), new THREE.Vector3(-0.8, 0.4, 1.8), 0.1, iron)); // side rods
  g.add(beam(new THREE.Vector3(0.8, 0.4, -1.8), new THREE.Vector3(0.8, 0.4, 1.8), 0.1, iron));
  g.add(box(1.8, 0.2, 7.6, iron, 0, 0.5, -0.1)); // the frame
  g.position.set(x, -0.15, z);
  root.add(g);
  addSolid(x - 1.0, z - 4.1, x + 1.0, z + 3.9);
}

export const buildRoundhouse = interior({
  id: 'roundhouse',
  title: 'THE ROUNDHOUSE',
  sub: 'Railhead\'s trial',
  cols: 40, rows: 24, seed: 7203,
  zone: 'railhead-yard',
  wall: 'brick',
  start: { x: 19.5, z: 22.4, face: 'N' },
  ground(g: Grid) {
    g.rect(18, 23, 3, 1, '.'); // the door
    for (const x0 of [6, 18, 30]) { g.rect(x0, 4, 3, 13, 'v'); g.rect(x0, 11, 3, 1, '='); } // the stall pits, a plank across each
    g.blob(3.5, 18.5, 2.0, 2.0, 'r', 41, (q) => q === '.');
    g.blob(35.5, 19.0, 2.2, 2.0, 'r', 42, (q) => q === '.');
    g.blob(13.0, 6.0, 1.6, 2.4, 'r', 43, (q) => q === '.');
    g.blob(26.0, 15.0, 1.6, 2.0, 'r', 44, (q) => q === '.');
  },
  floor(gl, x, z, fine): RGB {
    // oil-black brick pavers, cinders, the grime of a hundred years of engines
    const row = Math.floor(z * 2), off = (row % 2) * 0.5;
    const joint = (z * 2) % 1 < 0.08 || ((x + off) % 1) < 0.05;
    let c = joint ? H('#3a3028') : mix(H('#7a6450'), H('#634f40'), fine * 0.6 + Math.sin(x * 0.7 + z) * 0.2 + 0.2);
    if (Math.sin(x * 0.4) * Math.cos(z * 0.5) > 0.6) c = mix(c, H('#1a1614'), 0.5); // oil stains
    if (gl === 'r') c = mix(H('#3a3430'), H('#6a5a4a'), fine);
    return c;
  },
  dress(d) {
    const { root, pool } = d;
    exitDoor(d, 19.5, 'railhead', 'roundhouse');
    deadEngine(root, 19.5, 10.0);
    // the gantry over the middle stall, its hook on a long chain, swinging
    for (const dx of [-3.4, 3.4]) root.add(box(0.25, 3.2, 0.25, KM.steel(), 19.5 + dx, 0, 6.0));
    root.add(box(7.2, 0.3, 0.35, KM.hazard(), 19.5, 3.2, 6.0));
    const hook = new THREE.Group();
    hook.position.set(19.5, 3.2, 6.0);
    hook.add(box(0.04, 1.6, 0.04, colMat('#2a2622'), 0, -1.6, 0));
    hook.add(box(0.25, 0.3, 0.1, KM.steel(), 0, -1.9, 0));
    root.add(hook);
    d.built.push({ update(t) { hook.rotation.x = Math.sin(t * 0.7) * 0.12; hook.rotation.z = Math.sin(t * 0.43) * 0.08; } });
    addSolid(15.9, 5.8, 16.3, 6.2); addSolid(22.7, 5.8, 23.1, 6.2);
    const back = d.mount(0);
    for (const x of [4.5, 13.5, 25.5, 34.5]) wallLamp(back, pool, x, 1.0, 2.2);
    for (const x of [7.5, 31.5]) pendant(root, pool, x, 18.0, true);
    pendant(root, pool, 19.5, 18.5, true);
    // the Brokers' tables, and Marrow's desk at the back between the stalls
    table(root, 12.5, 18.0, 1.8, 1.0);
    table(root, 26.5, 18.0, 1.8, 1.0);
    table(root, 14.0, 2.6, 2.2, 1.0);
    shelf(root, 34.5, 1.6, 3.0, d.seed());
    shelf(root, 3.5, 1.6, 2.6, d.seed());
    for (const [x, z] of [[37.0, 14.0], [37.5, 14.6], [2.4, 10.0]] as Array<[number, number]>) drum(root, x, z, KM.rust());
    for (const [x, z] of [[36.5, 21.2], [37.2, 21.6], [36.8, 20.6]] as Array<[number, number]>) crate(root, x, z, 0.55);
    addSolid(36.0, 13.6, 38.0, 15.0); addSolid(2.0, 9.6, 2.8, 10.4); addSolid(36.0, 20.2, 37.8, 22.0);

    d.npcs.push(
      { char: 'marrow', col: 14, row: 3, name: 'Warden Dell Marrow', facing: 's', warden: {}, lines: ['So you\'re the one carrying Eli\'s old handheld.', 'Railhead\'s trial runs through my Brokers first. Come back when the yard\'s ready for you.'] },
      { char: 'scrap_broker', col: 12, row: 19, name: 'Scrap Broker', facing: 'n', lines: ['Everything in this shed is for sale except the engine. The engine stays.'] },
      { char: 'salt_broker', col: 26, row: 19, name: 'Salt Broker', facing: 'n', lines: ['You want the Warden, you get past us. Fair\'s fair.'] },
    );
    d.things.push({ x: 21.2, z: 12.6, height: 2.2, label: 'Look', reach: 2.0, say: { lines: ['The engine that never came out. Rust has eaten the cab to lace.', 'Somebody has chalked a tally on the boiler. They stopped counting a long time ago.'] } });
    d.roamers.push({ num: 49, level: 8, x: 3.5, z: 18.5, range: 1.6 }, { num: 51, level: 9, x: 35.5, z: 19.0, range: 1.6 });
  },
});
