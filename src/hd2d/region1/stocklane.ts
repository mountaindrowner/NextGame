import * as THREE from 'three';
import { box } from '../geo';
import { cell, heightAt, addSolid } from '../world';
import { M, cattlePen } from '../field/buildings';
import { cottonwood, mesquite, bush, tumbleweed } from '../field/props';
import { section } from './section';
import { boardSign, stockTank, loadingChute, swingGate, redHand, poles } from './props';

/**
 * STOCKYARD LANE — road, east out of the Field to the Stockyards, with the
 * Creek Road branching north (the loop home). Pens and loading chutes line
 * the lane. Thread 5: Rook's raid — an Ohmstead cache pried open, a red
 * handprint on the lid. Routine: the chute gates swing at dusk.
 */

/** The raided cache: Ohmstead's supply crates, lids pried off, signed in red. */
function raidedCache(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  const wood = M.wood();
  for (const [dx, dz, rot] of [[0, 0, 0.1], [0.75, 0.2, -0.3], [-0.3, 0.8, 0.5]] as Array<[number, number, number]>) {
    const c = new THREE.Group();
    c.add(box(0.7, 0.5, 0.55, wood, 0, 0, 0));
    c.add(box(0.62, 0.05, 0.47, M.dark(), 0, 0.5, 0));
    c.position.set(dx, 0, dz);
    c.rotation.y = rot;
    g.add(c);
  }
  const lid = box(0.72, 0.05, 0.57, wood, -0.9, 0.0, -0.2);
  lid.rotation.set(0.1, 0.6, 0.2);
  g.add(lid);
  redHand(g, 0.0, 0.32, 0.29, 0.1, 0.3);
  redHand(lid, 0.05, 0.04, 0.0, 0, 0.26);
  lid.children[lid.children.length - 1]!.rotation.x = -Math.PI / 2;
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.5, z - 0.4, x + 1.1, z + 1.1);
}

export const buildStockLane = section({
  id: 'stocklane',
  title: 'STOCKYARD LANE',
  sub: 'East out of the Field',
  kind: 'road',
  region: 'field',
  cols: 52, rows: 26, seed: 5411,
  zone: 'stockyard-lane',
  edges: { n: 'fence', s: 'trees', w: 'trees', e: 'trees' },
  exits: [
    { side: 'w', at: 14.5, to: 'field', spawn: 'east', name: 'west' },
    { side: 'e', at: 13.5, to: 'stockyards', spawn: 'west', name: 'east' },
    { side: 'n', at: 40.5, to: 'creekroad', spawn: 'south', name: 'north' },
  ],
  ground(g) {
    g.line([[-1, 14.5], [16, 14.2], [30, 13.2], [53, 13.5]], 3.0, 'e');
    g.line([[40.5, 13.5], [40.5, -1]], 2.6, 'e');
    g.rect(4, 18, 12, 6, 'x'); g.rect(20, 18, 11, 6, 'x'); g.rect(9, 3, 11, 6, 'x');
    g.blob(30.0, 5.0, 4.0, 2.6, 'T', 81);
    g.blob(46.5, 20.0, 3.2, 2.6, 'T', 82);
    g.blob(46.0, 6.0, 2.6, 2.4, 'T', 83);
    g.blob(3.0, 7.0, 2.0, 3.0, 'T', 84);
  },
  dress(d) {
    const { scene } = d;
    d.built.push(cattlePen(scene, 4.2, 18.2, 15.6, 23.6));
    d.built.push(cattlePen(scene, 20.2, 18.2, 30.6, 23.6));
    d.built.push(cattlePen(scene, 9.2, 3.2, 19.6, 8.6));
    loadingChute(scene, 17.6, 19.6, 0);
    loadingChute(scene, 32.4, 19.4, 0);
    d.built.push(swingGate(scene, 6.2, 17.9, 1.1, 0), swingGate(scene, 22.2, 17.9, 1.1, 0), swingGate(scene, 11.2, 9.0, 1.1, Math.PI));
    stockTank(scene, 9.8, 21.0, 0.8);
    stockTank(scene, 25.4, 21.0, 0.8);
    raidedCache(scene, 34.6, 8.4);
    poles(scene, [[2.0, 11.4], [12.0, 11.2], [22.0, 10.6], [32.0, 10.4], [42.6, 10.6], [50.0, 10.8]]);
    for (const [x, z, k] of [[36.0, 3.6, 'c'], [44.0, 16.6, 'm'], [24.6, 4.0, 'm'], [48.4, 3.0, 'c'], [2.6, 21.0, 'c']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.0, d.seed()));
    for (let i = 0; i < 18; i++) {
      const x = 2 + d.r() * 48, z = 2 + d.r() * 22;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), d.r() > 0.5), 0.15);
    }
    for (const [x, z, s] of [[18.0, 16.0, 1], [38.0, 16.6, 2], [26.0, 11.0, 3]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);
    boardSign(scene, 48.6, 16.6, 'STOCKYARDS >', 0, 51);
    boardSign(scene, 42.6, 3.0, 'CREEK RD ^', 0, 52);
    boardSign(scene, 3.4, 17.4, 'THE FIELD <', 0, 53);

    d.things.push(
      { x: 35.0, z: 9.6, height: 1.0, label: 'Look', reach: 1.6, say: { lines: ['Ohmstead\'s supply crates, pried open and emptied. A red handprint on the lid.'] } },
      { x: 17.6, z: 21.4, height: 1.6, label: 'Look', say: { lines: ['A loading chute up into nothing. The gates along the lane swing by themselves at dusk.'] } },
    );
    d.npcs.push({ char: 'mud_cole', col: 27, row: 15, name: 'Drover Ames', facing: 'w', lines: ['The gates still open at dusk. Every one of them. Nothing ever comes in.', 'Saw Redbed kids on the lane last night. Took what they wanted and laughed about it.'] });
    d.roamers.push({ num: 46, level: 5, x: 30.0, z: 5.0, range: 2.4 }, { num: 77, level: 5, x: 46.0, z: 20.0, range: 1.8 });
  },
});
