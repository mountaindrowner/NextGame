import * as THREE from 'three';
import { box } from '../geo';
import { cell, heightAt, addSolid } from '../world';
import { M, cattlePen } from '../field/buildings';
import { cottonwood, mesquite, bush, truck, tumbleweed } from '../field/props';
import { section } from './section';
import { stockTank, loadingChute, swingGate, stencil, brickShell, boardSign } from './props';
import { dressDoor, markDoor } from '../doorway';

/**
 * THE STOCKYARDS — side spot off Stockyard Lane. Rows of pens down a central
 * alley, the slaughterhouse a roofless brick shell, the big gate at the
 * mouth with the Garrison's grey stencil on it (thread 4). Heavy herd Ohms
 * graze the pens. Routine: every gate opens at dusk for cattle that never
 * come. The inner pen is blocked by fallen gates (HAUL, later).
 */

/** Gate panels fallen in a heap across a pen mouth, too heavy to shift by hand. */
function fallenGates(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  const pipe = M.steel();
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Group();
    for (const y of [0.0, 0.35, 0.7]) p.add(box(2.6, 0.06, 0.06, pipe, 0, y, 0));
    for (const x2 of [-1.25, 1.25]) p.add(box(0.07, 0.8, 0.07, pipe, x2, 0, 0));
    p.rotation.set(1.2 + i * 0.12, 0.2 * i, 0.15 * (i - 1.5));
    p.position.set(0, 0.15 + i * 0.12, (i - 1.5) * 0.35);
    g.add(p);
  }
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 1.5, z - 0.9, x + 1.5, z + 0.9);
}

export const buildStockyards = section({
  id: 'stockyards',
  title: 'THE STOCKYARDS',
  sub: 'Pens for herds that never come',
  kind: 'side',
  region: 'field',
  cols: 44, rows: 34, seed: 5519,
  zone: 'stockyards-pens',
  edges: { n: 'fence', s: 'fence', e: 'trees', w: 'scrub' },
  exits: [{ side: 'w', at: 16.5, to: 'stocklane', spawn: 'east', name: 'west' }],
  ground(g) {
    g.line([[-1, 16.5], [31, 16.5]], 3.0, 'e');
    for (const [x0, z0] of [[5, 4], [14, 4], [23, 4], [5, 20], [14, 20], [23, 20]] as Array<[number, number]>) g.rect(x0, z0, 8, 9, 'x');
    for (const [x0, z0] of [[6, 5], [15, 21], [24, 5]] as Array<[number, number]>) g.rect(x0, z0, 5, 4, 'T');
    g.rect(31, 5, 11, 10, 'v'); // the slaughterhouse yard
    g.blob(37.0, 26.0, 4.0, 3.0, 'T', 91);
  },
  dress(d) {
    const { scene } = d;
    for (const [x0, z0] of [[5, 4], [14, 4], [23, 4]] as Array<[number, number]>) d.built.push(cattlePen(scene, x0 + 0.2, z0 + 0.2, x0 + 7.8, z0 + 8.4));
    for (const [x0, z0] of [[5, 20], [14, 20]] as Array<[number, number]>) d.built.push(cattlePen(scene, x0 + 0.2, z0 + 0.6, x0 + 7.8, z0 + 8.8));
    // the inner pen: walled round, its mouth choked with fallen gates
    d.built.push(cattlePen(scene, 23.2, 20.6, 30.8, 28.8));
    fallenGates(scene, 25.8, 20.4);
    for (const x of [7.4, 16.4, 25.4]) d.built.push(swingGate(scene, x, 13.6, 1.1, Math.PI));
    for (const x of [7.4, 16.4]) d.built.push(swingGate(scene, x, 19.4, 1.1, 0));
    // the big gate at the mouth, stencilled grey
    d.built.push(swingGate(scene, 2.4, 14.9, 3.2, Math.PI / 2));
    const shell = brickShell(scene, 36.5, 9.5, 9.0, 7.0, 3.4, d.seed());
    stencil(shell, -1.8, 2.0, 3.66, 0, 0.7);
    dressDoor(shell, 0, 0, 3.66, 1.4, 2.2, 'chained', d.night, 0, { fresh: true });
    markDoor(36.5, 13.0, 'chained');
    loadingChute(scene, 33.6, 21.6, Math.PI / 2);
    stockTank(scene, 12.2, 17.9, 0.7);
    stockTank(scene, 21.0, 15.1, 0.7);
    truck(scene, 38.6, 18.4);
    for (const [x, z, k] of [[41.0, 30.0, 'c'], [30.0, 31.0, 'm'], [2.4, 28.0, 'm'], [42.0, 20.0, 'c'], [2.6, 4.0, 'c']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.0, d.seed()));
    for (let i = 0; i < 12; i++) {
      const x = 2 + d.r() * 40, z = 2 + d.r() * 30;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), true), 0.15);
    }
    for (const [x, z, s] of [[20.0, 17.0, 4], [33.0, 16.0, 5]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);
    boardSign(scene, 4.0, 19.6, 'PENS', 0, 61);

    d.things.push(
      { x: 25.8, z: 19.2, height: 1.2, label: 'Look', reach: 1.8, say: { lines: ['Gate panels, fallen in a heap across the pen mouth. Too heavy to shift by hand.', 'Something big shifts its weight inside.'] } },
      { x: 2.8, z: 16.5, height: 1.8, label: 'Look', reach: 1.6, say: { lines: ['The big gate swings slow on its hinge. Grey paint on it: a chevron, a row of tally marks.'] } },
      { x: 36.5, z: 13.6, height: 1.6, label: 'Look', reach: 1.6, say: { lines: ['The slaughterhouse door is chained. The chain is new.'] } },
    );
    d.roamers.push(
      { num: 80, level: 8, x: 8.5, z: 7.0, range: 2.0 },
      { num: 74, level: 9, x: 17.5, z: 24.5, range: 2.2 },
      { num: 73, level: 8, x: 27.0, z: 7.5, range: 2.0 },
      { num: 81, level: 11, x: 27.0, z: 25.0, range: 1.8 },
    );
  },
});
