import * as THREE from 'three';
import { box, colMat } from '../geo';
import { cell, heightAt, addSolid } from '../world';
import { M } from '../field/buildings';
import { cottonwood, mesquite, bush, deadTree, tumbleweed } from '../field/props';
import { section, distToPath } from './section';
import { boardSign, pumpTrough, brokenBridge, hump, redHand, rock } from './props';

/**
 * THE CREEK ROAD — road, Stockyard Lane → the Pickett Place: the east side of
 * the loop home, along Mule Creek under the cottonwoods. Quiet and green.
 * Routine: a pump Ohm at the ford keeps the trough full. The humps on the far
 * bank are a town under the grass; a stripped truck carries Redbed's red hand
 * (thread 5). The washed-out bridge (north-east) is the later HAUL shortcut
 * to Drive-In Road.
 */

const CREEK: Array<[number, number]> = [[36, 60], [28, 53], [24.5, 41], [26.5, 29], [22.5, 19], [24.5, 9], [36, 3]];

/** A pickup stripped to the frame, a red handprint on the door. */
function strippedTruck(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  const rust = M.tank();
  g.add(box(2.2, 0.2, 0.9, rust, 0, 0.35, 0));
  g.add(box(0.9, 0.7, 0.95, colMat('#6a4a3a', { metalness: 0.3, roughness: 0.8 }), 0.7, 0.55, 0));
  g.add(box(0.05, 0.4, 0.8, colMat('#1a1a1a'), 1.16, 0.85, 0));
  for (const [wx, wz] of [[-0.7, 0.45], [0.7, 0.45]] as Array<[number, number]>) g.add(box(0.5, 0.12, 0.12, colMat('#2a2420'), wx, 0.15, wz));
  redHand(g, 0.7, 0.75, 0.49, 0, 0.34);
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = 0.4;
  scene.add(g);
  addSolid(x - 1.2, z - 0.7, x + 1.2, z + 0.7);
}

export const buildCreekRoad = section({
  id: 'creekroad',
  title: 'THE CREEK ROAD',
  sub: 'Along Mule Creek',
  kind: 'road',
  region: 'field',
  cols: 36, rows: 64, seed: 5623,
  zone: 'creek-ford',
  waterY: -0.36,
  edges: { n: 'trees', s: 'scrub', w: 'trees', e: 'trees' },
  exits: [
    { side: 's', at: 12.5, to: 'stocklane', spawn: 'north', name: 'south' },
    { side: 'w', at: 10.5, to: 'pickett', spawn: 'east', name: 'west' },
  ],
  ground(g) {
    g.line(CREEK, 6.0, 'v', (q) => q === 'g'); // gravel bars either side of the water
    g.line(CREEK, 3.4, 'w');
    g.line([[12.5, 65], [12.5, 53], [15.5, 41], [13.5, 29], [10.5, 18], [6.5, 11.5], [-1, 10.5]], 2.6, 'e');
    g.line([[15.5, 41], [21.0, 40.5]], 2.0, 'e'); // down to the ford
    g.blob(5.0, 46.0, 3.0, 4.0, 'T', 101);
    g.blob(5.0, 26.0, 3.2, 3.6, 'T', 102);
    g.blob(18.0, 56.0, 2.6, 2.6, 'T', 103);
    g.blob(31.5, 40.0, 2.4, 4.0, 'T', 104);
  },
  height(x, z, h) {
    // the creek bed is deeper than the kit's dip, the bars slope down to it
    const d = distToPath(x, z, CREEK);
    return h - Math.max(0, 1 - d / 3.2) * 0.35;
  },
  dress(d) {
    const { scene } = d;
    d.built.push(pumpTrough(scene, 20.4, 38.6));
    brokenBridge(scene, 20.0, 30.0, 9.0, heightAt(20.0, 9.0));
    strippedTruck(scene, 7.4, 31.0);
    for (const [x, z, r] of [[31.0, 48.0, 1.6], [33.2, 51.4, 1.2], [31.6, 22.0, 1.4], [33.0, 33.0, 1.1]] as Array<[number, number, number]>) hump(scene, x, z, r, d.seed());
    // cottonwoods follow the water; mesquite on the dry side
    for (let k = 0; k < 22; k++) {
      const t = d.r(), i = Math.min(CREEK.length - 2, Math.floor(t * (CREEK.length - 1))), f = t * (CREEK.length - 1) - i;
      const [ax, az] = CREEK[i]!, [bx, bz] = CREEK[i + 1]!;
      const side = d.r() > 0.5 ? 1 : -1, off = 3.4 + d.r() * 1.6;
      const x = ax + (bx - ax) * f + side * off, z = az + (bz - az) * f;
      if (x < 2 || x > 34 || z < 2 || z > 62) continue;
      const c = cell(Math.floor(x), Math.floor(z));
      if (c !== 'g' && c !== 'v') continue;
      d.tree(cottonwood(x, z, 1.05 + d.r() * 0.35, d.seed()));
    }
    for (const [x, z, k] of [[4.0, 56.0, 'm'], [8.0, 40.0, 'm'], [3.4, 20.0, 'd'], [17.0, 30.0, 'm'], [4.0, 4.0, 'c']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : k === 'm' ? mesquite(x, z, 1.0, d.seed()) : deadTree(x, z, 1.0, d.seed()));
    for (let i = 0; i < 20; i++) {
      const x = 2 + d.r() * 32, z = 2 + d.r() * 60;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), d.r() > 0.6), 0.15);
    }
    for (let i = 0; i < 10; i++) {
      const t = d.r(), i2 = Math.min(CREEK.length - 2, Math.floor(t * (CREEK.length - 1))), f = t * (CREEK.length - 1) - i2;
      const [ax, az] = CREEK[i2]!, [bx, bz] = CREEK[i2 + 1]!;
      rock(scene, ax + (bx - ax) * f + (d.r() - 0.5) * 3.6, az + (bz - az) * f, 0.2 + d.r() * 0.25, d.seed());
    }
    tumbleweed(scene, 9.0, 50.0, 8);
    boardSign(scene, 4.0, 13.4, 'PICKETT PL. <', 0, 71);
    boardSign(scene, 15.0, 61.0, 'STOCKYARD LN', 0, 72);

    d.things.push(
      { x: 20.4, z: 39.6, height: 1.3, label: 'Look', say: { lines: ['A little pump Ohm works the handle, up and down, keeping the trough brimming for no one.'] } },
      { x: 18.6, z: 9.0, height: 1.2, label: 'Look', reach: 1.8, say: { lines: ['The bridge is out. Its middle lies broken in the creek.', 'A strong Ohm could drag a beam across, some day.'] } },
      { x: 7.4, z: 32.2, height: 1.2, label: 'Look', say: { lines: ['A pickup stripped to the frame. A red handprint on the door.'] } },
    );
    d.npcs.push(
      { char: 'weather_watcher', col: 18, row: 44, name: 'Old Ruel', facing: 'e', lines: ['Mule Creek runs east to the big brown river. Everything out here runs somewhere.', 'Those mounds across the water were houses, once. Don\'t dig. Leave them their quiet.'] },
      { char: 'knock_twice', col: 11, row: 22, name: 'Runner Fen', facing: 's', lines: ['Creek Road\'s the long way home. It\'s also the only way nobody watches.'] },
    );
    d.roamers.push({ num: 38, level: 6, x: 27.0, z: 46.0, range: 1.8 }, { num: 88, level: 6, x: 5.0, z: 26.0, range: 2.2 }, { num: 12, level: 6, x: 18.0, z: 56.0, range: 1.6 });
  },
});
