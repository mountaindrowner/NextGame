import * as THREE from 'three';
import { box, cyl, colMat } from '../geo';
import { addSolid } from '../world';
import { KM, wallLamp, pendant, table, shelf, benchSeat } from '../ohmstead/kit';
import { interior, exitDoor } from './interior';
import type { Grid } from './section';

/**
 * THE PICKETT HOUSE — the one house in Railhead Country you can walk into,
 * because people live in it (the door language: a lived-in house is lit and
 * open). The kitchen the family runs the place from. Lettie's drawings of
 * every Ohm on the place, each one named.
 */

type RGB = [number, number, number];
const H = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];

export const buildPickettHouse = interior({
  id: 'pickett_house',
  title: 'THE PICKETT HOUSE',
  sub: 'Topside, and lived in',
  kind: 'town',
  cols: 18, rows: 12, seed: 7411,
  wall: 'boards',
  start: { x: 9, z: 10.6, face: 'N' },
  ground(g: Grid) {
    g.rect(8, 11, 3, 1, '.');
  },
  floor(_gl, x, z, fine): RGB {
    // scrubbed plank floor, a rag rug by the stove
    const board = Math.floor(x / 0.6);
    let c = mix(H('#8a6a48'), H('#7a5c3e'), ((board * 7) % 5) / 5 * 0.6 + fine * 0.4);
    if ((x % 0.6) < 0.04) c = H('#4a3624');
    if (Math.hypot(x - 5, z - 6) < 1.8) c = mix(H('#a85a48'), H('#c8a070'), Math.abs(Math.sin(Math.hypot(x - 5, z - 6) * 6)));
    return c;
  },
  dress(d) {
    const { root, pool } = d;
    exitDoor(d, 9.5, 'pickett', 'house');
    // the stove and its pipe, the kettle on it
    root.add(box(1.2, 0.9, 0.8, colMat('#2a2622', { metalness: 0.4, roughness: 0.6 }), 3.0, 0, 1.6));
    root.add(cyl(0.12, 0.12, 2.2, colMat('#3a3632', { metalness: 0.4 }), 3.3, 0.9, 1.4, 8));
    root.add(cyl(0.16, 0.2, 0.25, KM.steel(), 2.7, 0.9, 1.6, 10));
    const fire = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.25), colMat('#ff9a40', { emissive: '#ff7a20', emissiveIntensity: 2.5 }));
    fire.position.set(3.0, 0.35, 2.01);
    root.add(fire);
    pool.add({ pos: new THREE.Vector3(3.0, 0.8, 2.6), color: new THREE.Color('#ff9a50'), intensity: 2.2, dist: 4, flicker: 0.3 });
    addSolid(2.3, 1.1, 3.7, 2.1);
    // the table the family eats at, a bench either side
    table(root, 9.0, 5.5, 2.4, 1.1);
    benchSeat(root, 9.0, 4.6, 2.2);
    benchSeat(root, 9.0, 6.4, 2.2);
    for (const [x, c] of [[8.3, '#c8c0a8'], [9.0, '#8a9aa0'], [9.8, '#c8c0a8']] as Array<[number, string]>) root.add(box(0.22, 0.12, 0.22, colMat(c), x, 0.78, 5.5));
    // shelves of jars, seed tins, rope
    shelf(root, 14.5, 1.4, 3.0, d.seed());
    shelf(root, 6.5, 1.4, 2.4, d.seed());
    // the cots along the east wall
    for (const z of [5.0, 7.6]) {
      root.add(box(1.6, 0.35, 0.8, KM.wood(), 15.6, 0, z));
      root.add(box(1.5, 0.12, 0.72, colMat('#a8b090', { roughness: 1 }), 15.6, 0.35, z));
      addSolid(14.8, z - 0.4, 16.4, z + 0.4);
    }
    // Lettie's drawings: every Ohm on the place, named
    const back = d.mount(0);
    const pics = ['#e8e0cc', '#f0e8d0', '#e0d8c0', '#f4ecd8', '#e8dcc4'];
    for (let i = 0; i < 5; i++) {
      back.add(box(0.5, 0.42, 0.01, colMat(pics[i]!), 9.4 + i * 0.62, 1.5 + (i % 2) * 0.18, 1.03));
      back.add(box(0.22, 0.16, 0.012, colMat(['#4a7a8a', '#c8402e', '#5e8a32', '#c99a2a', '#7a5a9a'][i]!), 9.4 + i * 0.62, 1.56 + (i % 2) * 0.18, 1.04));
    }
    wallLamp(back, pool, 6.0, 1.0, 2.0);
    pendant(root, pool, 9.0, 5.5, true);
    d.things.push(
      { x: 10.6, z: 1.8, height: 1.8, label: 'Look', reach: 1.6, say: { lines: ['Crayon drawings pinned to the wall: a pump, a baler, a sprinkler with water coming out.', 'Under each one a name, written very carefully. MISTER PUMP. SPROCKET. RAIN.'] } },
      { x: 3.0, z: 2.6, height: 1.4, label: 'Look', say: { lines: ['A kettle ticks on the stove. Somebody always keeps it warm.'] } },
    );
    d.npcs.push({ char: 'npc_kid', col: 12, row: 3, name: 'Lettie', facing: 's', lines: ['You can look. Don\'t touch Rain\'s picture, it\'s not dry.'] });
  },
});
