import { cell } from '../world';
import { cottonwood, mesquite, bush, tumbleweed } from '../field/props';
import { section } from './section';
import { boardSign, grader, shoppingCart, warehouseFront, blankBillboard, fuelCanopy, poles } from './props';

/**
 * DEPOT ROAD — road, west out of the Field to the orange warehouse colonists
 * call Ohm Depot (the optional mega-dungeon). A ghost road: a grader Ohm
 * works it end to end all day, so it's the smoothest road in the region and
 * goes nowhere anyone needs. Carts (Ohms, some of them) drift in the lot.
 */

export const buildDepotRoad = section({
  id: 'depotroad',
  title: 'DEPOT ROAD',
  sub: 'West out of the Field',
  kind: 'road',
  region: 'road',
  cols: 58, rows: 28, seed: 5731,
  zone: 'depot-road',
  edges: { n: 'trees', s: 'fence', w: 'scrub', e: 'trees' },
  exits: [{ side: 'e', at: 14.5, to: 'field', spawn: 'west', name: 'east' }],
  ground(g) {
    g.line([[59, 14.5], [40, 14.5], [27, 15.5]], 3.2, 'e');
    g.rect(2, 12, 26, 9, 'd'); // the lot
    g.rect(30, 19, 12, 6, 'd'); // the fuel stop's apron
    g.blob(46.0, 22.0, 4.0, 2.8, 'T', 111);
    g.blob(36.0, 5.0, 4.0, 2.4, 'T', 112);
    g.blob(52.0, 5.0, 2.6, 2.4, 'T', 113);
    g.blob(5.0, 24.0, 2.6, 2.0, 'T', 114);
  },
  dress(d) {
    const { scene } = d;
    warehouseFront(scene, 14.0, 6.2, 22.0);
    fuelCanopy(scene, 36.0, 22.0);
    blankBillboard(scene, 44.0, 9.0, 0);
    d.built.push(grader(scene, [[55.0, 14.6], [30.0, 15.2]], 0.8));
    for (const [x, z, a, tip] of [[6.0, 15.0, 0.3, false], [9.5, 18.5, 1.2, false], [14.0, 16.4, 2.6, true], [19.0, 19.0, 0.9, false], [23.5, 14.0, 2.0, false], [4.0, 19.4, 1.7, false], [26.0, 18.6, 0.4, true]] as Array<[number, number, number, boolean]>) shoppingCart(scene, x, z, a, tip);
    poles(scene, [[56.0, 11.6], [47.0, 11.8], [38.0, 12.0], [29.0, 12.2]]);
    for (const [x, z, k] of [[50.0, 24.0, 'c'], [27.0, 24.6, 'm'], [42.6, 3.0, 'c'], [28.6, 3.6, 'm'], [2.6, 3.0, 'm']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.0, d.seed()));
    for (let i = 0; i < 18; i++) {
      const x = 2 + d.r() * 54, z = 2 + d.r() * 24;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), d.r() > 0.5), 0.15);
    }
    for (const [x, z, s] of [[34.0, 16.6, 1], [12.0, 22.0, 2]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);
    boardSign(scene, 52.0, 11.4, 'DEPOT <', 0, 81);

    d.spawns.depot = { x: 9.6, z: 11.8, face: 'S' };
    d.things.push(
      { x: 9.6, z: 10.6, height: 2.6, label: 'Enter', reach: 1.6, say: { lines: ['The doors are long gone. Inside, in the dark, something is stacking shelves.'] }, go: { to: 'ohmdepot', spawn: 'door' } },
      { x: 44.0, z: 15.6, height: 1.6, label: 'Look', reach: 2.2, say: { lines: ['The grader works the road end to end, blade down, all day. There isn\'t a rut on it.'] } },
    );
    d.npcs.push(
      { char: 'rivet', col: 20, row: 17, name: 'Picker Rhee', facing: 'n', lines: ['Carts. Hundreds of them, inside and out. Some of them follow you.', 'Don\'t go in the back without a light.'] },
    );
    d.roamers.push({ num: 77, level: 4, x: 12.0, z: 17.0, range: 2.4 }, { num: 49, level: 5, x: 46.0, z: 22.0, range: 2.0 });
  },
});
