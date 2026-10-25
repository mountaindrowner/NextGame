import { cell } from '../world';
import { mesquite, bush, deadTree, tumbleweed } from '../field/props';
import { addSolid } from '../world';
import { section, distToPath } from './section';
import { boardSign, rock, hoodoo, fallenTurbine, weatherVane, hump } from './props';

/**
 * THE BREAKS — side spot off Farm Road's west side. Pasture at the edge of
 * the dry country, broken into gullies and hoodoos: the land coming apart as
 * it runs west toward Sundog. A fallen wind tower says what's out there.
 * Routine: a weather-vane Ohm still turning to the wind. A dead end, with a
 * SHEAR-gated thicket guarding a rare-Ohm nook in the north-west corner.
 */

const WASH: Array<[number, number]> = [[35, 29], [29, 22], [21, 20], [13, 23], [4, 21], [-1, 22]];

export const buildBreaks = section({
  id: 'breaks',
  title: 'THE BREAKS',
  sub: 'Where the pasture comes apart',
  kind: 'side',
  region: 'field',
  cols: 40, rows: 30, seed: 5307,
  zone: 'breaks-dry',
  edges: { n: 'bluff', w: 'bluff', s: 'scrub', e: 'fence' },
  exits: [{ side: 'e', at: 15.5, to: 'farmroad', spawn: 'west', name: 'east' }],
  ground(g) {
    g.rect(0, 0, 40, 30, 'x');
    for (const [x, z, rx, rz, s] of [[30, 6, 5, 3, 71], [16, 27, 6, 2.4, 72], [8, 14, 4, 3, 73], [34, 24, 3, 3, 74], [22, 10, 3.5, 2.5, 75]] as Array<[number, number, number, number, number]>) g.blob(x, z, rx, rz, 'g', s, (q) => q === 'x');
    g.line(WASH, 2.4, 'v');
    g.line([[41, 15.5], [31, 15.5], [24, 13], [20, 11]], 2.2, 'e'); // the track out to the turbine
    g.blob(13.0, 7.0, 3.4, 2.4, 'T', 76, (q) => q === 'x' || q === 'g');
    g.blob(31.0, 25.0, 3.6, 2.4, 'T', 77, (q) => q === 'x' || q === 'g');
    g.blob(23.0, 23.5, 2.6, 2.0, 'T', 78, (q) => q === 'x' || q === 'g');
  },
  height(x, z, h) {
    // the dry wash cuts a gully through the middle
    const d = distToPath(x, z, WASH);
    return h - Math.max(0, 1 - d / 2.6) * 0.75 + (cell(Math.floor(x), Math.floor(z)) === 'x' ? 0.08 : 0);
  },
  grassTint: (x, z) => (cell(Math.floor(x), Math.floor(z)) === 'T' ? ['#d8c890', '#c8b878', '#e0d4a0', '#b8a870'][Math.floor(Math.abs(x * 5 + z * 11)) % 4] : undefined),
  dress(d) {
    const { scene } = d;
    fallenTurbine(scene, 21.0, 5.6, 0.18);
    d.built.push(weatherVane(scene, 29.5, 17.6));
    for (const [x, z, h] of [[10.0, 18.0, 2.6], [12.2, 17.0, 1.8], [26.0, 26.4, 2.2], [35.0, 10.0, 2.8], [5.6, 25.4, 2.0]] as Array<[number, number, number]>) hoodoo(scene, x, z, h, d.seed());
    for (let i = 0; i < 26; i++) {
      const x = 3 + d.r() * 34, z = 3 + d.r() * 24;
      const c = cell(Math.floor(x), Math.floor(z));
      if (c !== 'x' && c !== 'g') continue;
      rock(scene, x, z, 0.2 + d.r() * 0.45, d.seed());
    }
    // the humps on the rise to the south-west: a whole little town under the grass
    for (const [x, z, r] of [[6.0, 28.0, 1.6], [9.4, 27.6, 1.2], [12.2, 28.4, 1.4]] as Array<[number, number, number]>) hump(scene, x, z, r, d.seed());
    for (const [x, z, k] of [[17.0, 15.0, 'm'], [33.0, 4.0, 'd'], [26.0, 20.0, 'm'], [4.0, 9.0, 'd'], [37.0, 26.0, 'm']] as Array<[number, number, string]>)
      d.tree(k === 'm' ? mesquite(x, z, 1.0, d.seed()) : deadTree(x, z, 1.0, d.seed()));
    for (let i = 0; i < 14; i++) {
      const x = 3 + d.r() * 34, z = 3 + d.r() * 24;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.3, d.seed(), true), 0.15);
    }
    for (const [x, z, s] of [[24.0, 16.0, 4], [15.0, 25.0, 5], [34.0, 20.0, 6], [8.0, 11.0, 7]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);
    // the thicket: a wall of mesquite grown solid round the north-west nook
    for (let a = 0; a <= 1.0001; a += 1 / 14) {
      const x = 2.4 + a * 8.6, z = 10.2 - Math.sin(a * Math.PI) * 0.6;
      d.tree(mesquite(x, z, 0.85 + d.r() * 0.25, d.seed()), 0);
    }
    for (let a = 0; a <= 1.0001; a += 1 / 9) d.tree(mesquite(11.0 + Math.sin(a * 3) * 0.3, 2.4 + a * 7.6, 0.85 + d.r() * 0.25, d.seed()), 0);
    addSolid(2.0, 9.6, 11.6, 10.8);
    addSolid(10.4, 2.0, 11.6, 10.8);
    boardSign(scene, 36.0, 17.6, 'NO WATER', -0.2, 41);

    d.things.push(
      { x: 7.0, z: 11.0, height: 1.6, label: 'Look', reach: 1.8, say: { lines: ['A wall of thorny mesquite, grown solid. Something moves behind it.', 'You\'d need an Ohm that can cut a way through.'] } },
      { x: 22.0, z: 7.2, height: 1.4, label: 'Look', reach: 2.0, say: { lines: ['A wind tower, down in the dirt. One blade still stands where it speared the ground.', 'Out west there are whole fields of them, people say. All down.'] } },
      { x: 29.5, z: 18.3, height: 2.8, label: 'Look', say: { lines: ['The vane swings to the wind, and its little cups spin. It is the only thing out here keeping track.'] } },
    );
    d.npcs.push({ char: 'deserter', col: 32, row: 13, name: 'Drifter Kell', facing: 'w', lines: ['Further west it only gets drier. The ground opens up like this for days.', 'I came back. Most don\'t bother.'] });
    d.roamers.push({ num: 43, level: 7, x: 30.0, z: 24.5, range: 2.0 }, { num: 62, level: 7, x: 24.0, z: 12.5, range: 2.4 }, { num: 44, level: 10, x: 6.0, z: 5.5, range: 1.6 });
  },
});
