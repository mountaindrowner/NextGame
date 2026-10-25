import { cell } from '../world';
import { cottonwood, mesquite, bush, deadTree, truck, tumbleweed } from '../field/props';
import { binCluster } from '../field/buildings';
import { fence } from '../farmroad/area';
import { section, type RGB } from './section';
import { boardSign, hopperCar, crossingSignal, railLineV, grainElevator, poles, rock } from './props';

/**
 * THE GRAIN LINE — road, Pickett Place → Railhead. The old main rail line
 * north, grain cars left on the siding, the grain elevator (the first
 * dungeon) on its gravel apron. Threads 1 (everything runs north: rails,
 * poles, road) and 6 (the Static's first silver grass at the northern end).
 * Routine: the crossing signal still flashes for trains that never come.
 */

const STATIC_Z = 17;
const silver = (x: number, z: number): boolean => z < STATIC_Z && cell(Math.floor(x), Math.floor(z)) === 'T';

export const buildGrainLine = section({
  id: 'grainline',
  title: 'THE GRAIN LINE',
  sub: 'The old rail line north',
  kind: 'road',
  region: 'road',
  cols: 36, rows: 62, seed: 5203,
  zone: 'grainline-rail',
  edges: { n: 'trees', s: 'trees', w: 'fence', e: 'scrub' },
  exits: [
    { side: 's', at: 17.5, to: 'pickett', spawn: 'north', name: 'south' },
    { side: 'n', at: 18.5, to: 'railhead', spawn: 'south', name: 'north' },
  ],
  ground(g) {
    g.rect(24, 0, 4, 62, 'b'); // main line ballast
    g.rect(28, 16, 3, 28, 'b'); // the siding
    g.line([[17.5, 63], [17, 52], [13.5, 44], [12.5, 34], [14.5, 24], [17.5, 14], [18.5, -1]], 2.6, 'e');
    g.line([[13.5, 46], [34, 46]], 2.0, 'e'); // farm track over the line to the bins
    g.rect(2, 28, 12, 6, 'v'); // the elevator's apron
    g.blob(30.5, 8.0, 3.0, 4.0, 'T', 61);
    g.blob(6.5, 10.0, 3.6, 3.2, 'T', 62);
    g.blob(6.0, 48.0, 3.4, 4.0, 'T', 63);
    g.blob(31.0, 54.0, 2.4, 3.2, 'T', 64);
    g.blob(20.5, 38.0, 2.2, 3.0, 'T', 65);
  },
  // the Static's first touch: the northern grass gone silver
  grassTint: (x, z) => (silver(x, z) ? ['#c8ccd0', '#b0b8c0', '#d8dce0', '#a8b0b8'][Math.floor((x * 7 + z * 3) % 4 + 4) % 4] : undefined),
  paint(gl, x, z, fine): RGB | undefined {
    if (gl === 'T' && z < STATIC_Z) return ([[120, 128, 134], [138, 146, 150], [104, 112, 118], [150, 156, 160]] as RGB[])[Math.floor(fine * 4)]!;
    return undefined;
  },
  dress(d) {
    const { scene, night } = d;
    railLineV(scene, 26, -4, 66, 7);
    railLineV(scene, 29.5, 16.5, 43.5, 8);
    for (const [z, c] of [[21, '#8a3a2e'], [26, '#7a5a3a'], [35.5, '#8a3a2e'], [40.5, '#6a6a5e']] as Array<[number, string]>) hopperCar(scene, 29.5, z, c, Math.PI / 2);
    hopperCar(scene, 26, 55, '#7a3a2e', Math.PI / 2);
    d.built.push(crossingSignal(scene, 23.0, 47.6, night));
    d.built.push(binCluster(scene, [31.0, 32.7, 34.3], 49.4));
    d.built.push(grainElevator(scene, 7.0, 25.0, night));
    poles(scene, [[15.5, 58], [10.6, 48], [9.8, 38], [10.8, 30], [12.6, 20], [15.2, 10], [16.0, 2]]);
    fence(scene, [[3.0, 40.5], [9.6, 40.5], [9.6, 57.0]], d.seed());
    fence(scene, [[3.0, 18.0], [9.0, 18.0]], d.seed());
    truck(scene, 4.6, 36.4);
    for (const [x, z, s] of [[20.0, 30.0, 1], [8.0, 55.0, 2], [31.0, 12.0, 3]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);
    for (const [x, z, k] of [[4.0, 4.0, 'c'], [21.0, 20.0, 'm'], [33.0, 30.0, 'd'], [3.6, 52.0, 'c'], [20.6, 56.0, 'm'], [11.0, 6.0, 'd'], [33.5, 58.0, 'c']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : k === 'm' ? mesquite(x, z, 1.0, d.seed()) : deadTree(x, z, 1.0, d.seed()));
    for (let i = 0; i < 26; i++) {
      const x = 2 + d.r() * 32, z = 2 + d.r() * 58;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), d.r() > 0.5), 0.15);
    }
    for (let i = 0; i < 6; i++) rock(scene, 20 + d.r() * 3, 4 + d.r() * 50, 0.25 + d.r() * 0.2, d.seed());
    boardSign(scene, 21.0, 3.0, 'RAILHEAD ^', 0, 31);
    boardSign(scene, 20.4, 59.0, 'PICKETT PL.', 0, 32);
    boardSign(scene, 11.0, 32.6, 'TOWER', 0, 33);

    d.spawns.tower = { x: 5.0, z: 30.6, face: 'S' };
    d.things.push(
      { x: 5.0, z: 29.2, height: 2.2, label: 'Enter', reach: 1.6, say: { lines: ['The dump shed\'s door stands slid open. Somewhere above, buckets knock.'] }, go: { to: 'graintower', spawn: 'door' } },
      { x: 5.6, z: 28.0, height: 1.6, label: 'Look', reach: 1.4, say: { lines: ['A small brass tag on the lift motor by the door. Three notches stamped in it.'] } },
      { x: 23.0, z: 47.6, height: 2.4, label: 'Look', say: { lines: ['The crossing lights flash, left, right, left. No train has come down this line in anyone\'s memory.'] } },
    );
    d.npcs.push(
      { char: 'lookout', col: 16, row: 12, name: 'Traveler Pell', facing: 's', lines: ['Grass up the line\'s gone grey. The Ohms in it twitch all at once, like they hear the same song.', 'Don\'t stand in it long.'] },
      { char: 'base_scrapper', col: 12, row: 36, name: 'Grain-hand Sutter', facing: 'e', lines: ['The tower still lifts. Buckets go up full of nothing and come down the same.', 'Something in there runs the whole loop. I don\'t go past the shed.'] },
    );
    d.roamers.push({ num: 53, level: 8, x: 32.5, z: 46.5, range: 1.6 }, { num: 107, level: 8, x: 21.0, z: 44.0, range: 1.4 }, { num: 54, level: 8, x: 30.5, z: 8.0, range: 2.0 });
  },
});
