import * as THREE from 'three';
import { box, beam, colMat } from '../geo';
import { heightAt, addSolid } from '../world';
import { M, farmhouse, barn, windmill } from '../field/buildings';
import { cottonwood, mesquite, bush, truck, crates, powerLine, tumbleweed } from '../field/props';
import { fence } from '../farmroad/area';
import { section } from './section';
import { boardSign, stockTank, bale, sprinkler, brassTag } from './props';

/**
 * THE PICKETT PLACE — a small town (Railhead Country, docs/design/
 * region1-railhead-country.md). An old ranch homestead where one family
 * never went under. Thread 7 (people who stayed) and 3 (Grandpa's brass tag
 * on the windmill). Signature: the one green field, kept by a sprinkler Ohm.
 * Exits: south → Farm Road · north → the Grain Line · east → the Creek Road.
 */

/** A clothesline between two T-posts, the week's wash hung out. */
function clothesline(scene: THREE.Scene, x0: number, x1: number, z: number): void {
  const g = new THREE.Group();
  for (const x of [x0, x1]) {
    g.add(box(0.08, 1.7, 0.08, M.wood(), x, heightAt(x, z), z));
    g.add(box(0.7, 0.06, 0.06, M.wood(), x, heightAt(x, z) + 1.62, z));
  }
  const y = Math.max(heightAt(x0, z), heightAt(x1, z)) + 1.6;
  g.add(beam(new THREE.Vector3(x0, y, z - 0.25), new THREE.Vector3(x1, y - 0.08, z - 0.25), 0.015, colMat('#d8d0c0')));
  const cloth = ['#c9b48a', '#8a9ab0', '#e8e0cc', '#a85a48', '#7a8a5a'];
  let x = x0 + 0.5;
  for (let i = 0; x < x1 - 0.6; i++) {
    const w = 0.45 + (i % 3) * 0.15, h = 0.5 + ((i * 7) % 3) * 0.12;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), colMat(cloth[i % cloth.length]!, { side: THREE.DoubleSide, roughness: 1 }));
    m.position.set(x + w / 2, y - h / 2 - 0.04, z - 0.25);
    m.castShadow = true;
    g.add(m);
    x += w + 0.18;
  }
  scene.add(g);
  addSolid(x0 - 0.1, z - 0.1, x0 + 0.1, z + 0.1);
  addSolid(x1 - 0.1, z - 0.1, x1 + 0.1, z + 0.1);
}

/** Two porch chairs and a crate table: where Ada sits and watches the field. */
function porchSet(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  for (const dx of [-0.6, 0.6]) {
    g.add(box(0.5, 0.42, 0.5, M.wood(), dx, 0, 0));
    g.add(box(0.5, 0.6, 0.08, M.wood(), dx, 0.42, -0.22));
  }
  g.add(box(0.4, 0.45, 0.4, M.grey(), 0, 0, 0.1));
  g.add(box(0.16, 0.12, 0.16, colMat('#c8c0a8'), 0, 0.45, 0.1)); // a pitcher
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
}

/** Hob's trade shed: an open lean-to of shelves under a tin roof. */
function tradeShed(scene: THREE.Scene, cx: number, cz: number): void {
  const g = new THREE.Group();
  for (const [x, zz] of [[-1.3, -0.8], [1.3, -0.8], [-1.3, 0.8], [1.3, 0.8]] as Array<[number, number]>) g.add(box(0.12, zz < 0 ? 2.3 : 1.9, 0.12, M.wood(), x, 0, zz));
  const roof = box(3.0, 0.07, 2.0, M.tin(), 0, 2.05, 0);
  roof.rotation.x = 0.2;
  g.add(roof);
  g.add(box(2.7, 1.4, 0.5, M.grey(), 0, 0, -0.65)); // back shelves
  const goods = ['#c8a050', '#8a5a3a', '#6a8a5a', '#d8d0c0', '#7a8a9a'];
  for (let i = 0; i < 10; i++) g.add(box(0.3, 0.25, 0.3, colMat(goods[i % 5]!), -1.1 + (i % 5) * 0.55, 0.45 + Math.floor(i / 5) * 0.5, -0.55));
  g.add(box(2.4, 0.85, 0.5, M.wood(), 0, 0, 0.7)); // counter
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - 1.45, cz - 1.0, cx + 1.45, cz + 1.0);
}

export const buildPickett = section({
  id: 'pickett',
  title: 'THE PICKETT PLACE',
  sub: 'The family that stayed topside',
  kind: 'town',
  region: 'field',
  cols: 40, rows: 30, seed: 5101,
  zone: 'pickett-pasture',
  edges: { n: 'trees', s: 'scrub', w: 'fence', e: 'trees' },
  exits: [
    { side: 's', at: 14.5, to: 'farmroad', spawn: 'north', name: 'south' },
    { side: 'n', at: 20.5, to: 'grainline', spawn: 'south', name: 'north' },
    { side: 'e', at: 17.5, to: 'creekroad', spawn: 'west', name: 'east' },
  ],
  ground(g) {
    // the lane in from Farm Road, up through the yard and on north; a branch east to the creek
    g.line([[14.5, 31], [14.5, 24], [18.5, 19], [20.5, 14], [20.5, -1]], 2.6, 'e');
    g.line([[19.5, 17.5], [30, 17.5], [41, 17.5]], 2.4, 'e');
    // the green field: crop rows inside the pasture fence
    g.rect(23, 20, 14, 7, 'c');
    // pasture tall grass west and north-west (wild Ohms), a little by the creek road
    g.blob(5.5, 21.5, 3.4, 4.2, 'T', 51);
    g.blob(6.0, 6.0, 3.6, 3.0, 'T', 52);
    g.blob(34.0, 6.5, 3.2, 2.6, 'T', 53);
    g.rect(15, 19, 4, 2, 'v'); // the yard's packed gravel
  },
  dress(d) {
    const { scene, night } = d;
    d.built.push(farmhouse(scene, 12.2, 12.0, 1, night));
    d.built.push(barn(scene, 28.0, 10.4));
    d.built.push(windmill(scene, 31.6, 15.0));
    stockTank(scene, 33.4, 15.4, 0.9);
    brassTag(scene, 31.6, heightAt(31.6, 15.0) + 1.6, 15.62);
    porchSet(scene, 12.2, 14.2);
    tradeShed(scene, 18.0, 23.6);
    clothesline(scene, 5.0, 9.4, 15.6);
    d.built.push(sprinkler(scene, 23.4, 23.5, 12.5));
    fence(scene, [[22.4, 19.4], [37.6, 19.4], [37.6, 27.6], [22.4, 27.6], [22.4, 24.6]], d.seed());
    for (const [x, z, a] of [[25.0, 12.6, 0.3], [26.4, 13.0, 1.2], [29.6, 12.9, 2.2]] as Array<[number, number, number]>) bale(scene, x, z, a);
    truck(scene, 7.4, 9.6);
    crates(scene, 20.6, 21.4);
    tumbleweed(scene, 26.0, 28.4, 7);
    // telephone poles running north up the lane (everything runs north)
    powerLine(scene, [[22.4, 26.0, 0.02], [22.4, 19.6, -0.04], [22.6, 12.0, 0.03], [22.6, 4.0, -0.06]], [[0, 1], [1, 2], [2, 3]]);
    for (const [x, z] of [[22.4, 26.0], [22.4, 19.6], [22.6, 12.0], [22.6, 4.0]] as Array<[number, number]>) addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
    // shade trees round the house and yard
    for (const [x, z, k] of [[8.0, 11.2, 'c'], [16.6, 9.0, 'c'], [3.2, 13.0, 'm'], [26.0, 6.4, 'c'], [36.6, 11.4, 'c'], [11.0, 27.0, 'm'], [30.0, 22.6, 'm']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.05, d.seed()));
    for (const [x, z] of [[15.2, 10.6], [9.4, 14.4], [24.6, 15.6], [35.2, 13.6], [3.8, 9.2], [20.6, 27.4]] as Array<[number, number]>) d.tree(bush(x, z, 0.7, d.seed(), true), 0.15);
    boardSign(scene, 16.2, 27.6, 'PICKETT PL.', 0, 21);
    boardSign(scene, 22.4, 2.6, 'GRAIN LINE ^', 0, 22);
    boardSign(scene, 37.0, 15.8, 'CREEK RD >', 0, 23);

    d.things.push(
      { x: 31.6, z: 15.9, height: 1.8, label: 'Look', reach: 1.6, say: { lines: ['A small brass tag on the windmill\'s gearbox. Three notches stamped in it.'] } },
      { x: 23.4, z: 23.5, height: 1.8, label: 'Look', reach: 1.8, say: { lines: ['The sprinkler crawls its arc, ticking. The rows under it are the greenest thing for miles.'] } },
      { x: 18.0, z: 24.6, height: 1.3, label: 'Trade', say: { name: 'Hob Pickett', lines: ['Seed, rope, Repair Kits. We trade for salvage.', 'Keep your credits. Credits don\'t grow.'] } },
    );
    d.npcs.push(
      { char: 'npc_elder', col: 11, row: 14, name: 'Ada Pickett', facing: 's', lines: ['Sit a minute. Your Ohms look run down.', 'We never went under. Somebody had to keep the windmill company.', 'You\'ve got Eli\'s jaw. Don\'t ask me to say more than that.'] },
      { char: 'npc_rancher', col: 19, row: 22, name: 'Hob Pickett', facing: 'n', lines: ['Ma\'ll patch your Ohms up if you ask. The shed\'s mine.'] },
      { char: 'npc_kid', col: 30, row: 17, name: 'Lettie', facing: 'w', lines: ['That\'s Mister Pump. That\'s Sprocket, in the barn.', 'The sprinkler is called Rain. She doesn\'t answer. She listens, though.'] },
    );
    // a heal at Ada's porch
    d.things.push({ x: 12.2, z: 14.6, height: 1.2, label: 'Rest', action: 'heal', say: { name: 'Ada Pickett', lines: ['There. Recharged. Stay current, and come back when they\'re tired.'] } });
    d.roamers.push({ num: 65, level: 6, x: 6.0, z: 22.0, range: 2.2 }, { num: 80, level: 6, x: 34.0, z: 6.5, range: 1.8 });
  },
});
