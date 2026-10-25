import * as THREE from 'three';
import { box } from '../geo';
import { cell, heightAt, addSolid } from '../world';
import { M } from '../field/buildings';
import { cottonwood, mesquite, bush, tumbleweed, truck } from '../field/props';
import { section } from './section';
import { boardSign, blankBillboard, signFlipper, brickShell, poles, stencil } from './props';

/**
 * DRIVE-IN ROAD — road, east out of Railhead to the Drive-In. The edge of an
 * old town nobody can name: billboards peeled blank, a roadside stop's brick
 * shell. Routine: a sign Ohm keeps flipping its last letters, spelling
 * nothing (the old-world rule). A branch south dead-ends where the bridge
 * over Mule Creek went down (the HAUL shortcut to the Creek Road, later).
 */

function barricade(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  for (const dx of [-1.0, 1.0]) g.add(box(0.12, 0.9, 0.12, M.wood(), dx, 0, 0));
  for (const y of [0.45, 0.8]) g.add(box(2.4, 0.18, 0.06, M.hazard(), 0, y, 0));
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 1.2, z - 0.15, x + 1.2, z + 0.15);
}

export const buildDriveInRoad = section({
  id: 'driveinrd',
  title: 'DRIVE-IN ROAD',
  sub: 'East out of Railhead',
  kind: 'road',
  region: 'road',
  cols: 58, rows: 28, seed: 5839,
  zone: 'driveinroad',
  edges: { n: 'trees', s: 'none', w: 'scrub', e: 'trees' },
  exits: [
    { side: 'w', at: 12.5, to: 'railhead', spawn: 'east', name: 'west' },
    { side: 'e', at: 12.5, to: 'drivein', spawn: 'west', name: 'east' },
  ],
  ground(g) {
    g.line([[-1, 12.5], [18, 12.2], [34, 13.0], [59, 12.5]], 3.0, 'd');
    g.line([[31.0, 13.0], [31.0, 21.5]], 2.6, 'd'); // the dead branch south
    g.rect(0, 24, 58, 4, 'w'); // Mule Creek along the south edge
    g.line([[0, 23.4], [58, 23.4]], 1.6, 'v', (q) => q === 'g');
    g.rect(9, 3, 9, 6, 'v'); // the roadside stop's lot
    g.blob(46.0, 20.0, 4.0, 2.2, 'T', 121);
    g.blob(22.0, 5.0, 3.4, 2.4, 'T', 122);
    g.blob(52.0, 5.0, 2.6, 2.4, 'T', 123);
    g.blob(5.0, 19.0, 3.0, 2.4, 'T', 124);
  },
  height(x, z, h) {
    // the creek bank falls away along the south edge
    return z > 21.5 ? h - Math.min(1, (z - 21.5) / 2.4) * 0.7 : h;
  },
  dress(d) {
    const { scene } = d;
    for (const [x, z, a] of [[24.0, 9.2, 0.05], [41.0, 8.8, -0.08], [50.0, 17.8, Math.PI + 0.1]] as Array<[number, number, number]>) blankBillboard(scene, x, z, a);
    d.built.push(signFlipper(scene, 37.5, 16.6));
    const stop = brickShell(scene, 13.5, 5.4, 6.0, 4.0, 2.6, d.seed());
    stencil(stop, 1.6, 1.6, 2.16, 0, 0.5);
    truck(scene, 16.6, 8.6);
    barricade(scene, 31.0, 21.2);
    poles(scene, [[2.0, 9.6], [12.0, 9.4], [22.0, 9.8], [32.0, 10.0], [42.0, 9.8], [52.0, 9.6]]);
    for (const [x, z, k] of [[6.0, 4.0, 'c'], [30.0, 4.0, 'm'], [46.0, 3.6, 'c'], [20.0, 19.0, 'c'], [40.0, 20.6, 'c'], [55.0, 20.0, 'm']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.0, d.seed()));
    for (let i = 0; i < 18; i++) {
      const x = 2 + d.r() * 54, z = 2 + d.r() * 19;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), d.r() > 0.5), 0.15);
    }
    for (const [x, z, s] of [[28.0, 15.6, 1], [48.0, 14.6, 2]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);
    boardSign(scene, 52.0, 15.6, 'DRIVE-IN >', 0, 91);
    boardSign(scene, 4.0, 15.6, '< RAILHEAD', 0, 92);

    d.things.push(
      { x: 31.0, z: 20.4, height: 1.0, label: 'Look', reach: 1.6, say: { lines: ['The road drops off into Mule Creek. The bridge is gone.', 'Across the water, the Creek Road runs south.'] } },
      { x: 37.5, z: 17.4, height: 3.6, label: 'Look', say: { lines: ['The letter board clacks. The first letters stuck years ago. The last two still turn, and never spell anything.'] } },
    );
    d.npcs.push({ char: 'conscript', col: 44, row: 14, name: 'Courier Tam', facing: 'w', lines: ['The sign up there changes every time I pass. Never says a word.', 'People used to come out here for something. Nobody remembers what.'] });
    d.roamers.push({ num: 68, level: 8, x: 46.0, z: 20.0, range: 2.0 }, { num: 76, level: 7, x: 22.0, z: 5.0, range: 2.2 });
  },
});
