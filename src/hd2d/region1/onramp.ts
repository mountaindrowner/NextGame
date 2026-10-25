import { cell } from '../world';
import { cottonwood, mesquite, bush, truck, tumbleweed } from '../field/props';
import { wreck } from '../scar/area';
import { section, distToPath, type RGB } from './section';
import { checkpoint, guardrail, scope, boardSign } from './props';
import { TO_RUST_MILE } from './travel';

/**
 * THE ON-RAMP — the travel space out of Railhead Country: the long climb up
 * onto the old interstate. Quiet, wide sky, few wild Ohms. Threads 1 (the
 * pin on the northern horizon, through the scope), 4 (a Garrison checkpoint,
 * stencilled) and 6 (silver grass up top). At the top, the travel card.
 */

const RAMP: Array<[number, number]> = [[20.5, 40], [22.5, 28], [24.5, 15], [22.5, -1]];
const rise = (z: number): number => 2.4 * Math.min(1, Math.max(0, (40 - z) / 36));

export const buildOnRamp = section({
  id: 'onramp',
  title: 'THE ON-RAMP',
  sub: 'Up onto the old interstate',
  kind: 'travel',
  region: 'road',
  cols: 42, rows: 50, seed: 6053,
  zone: 'onramp',
  edges: { n: 'open', s: 'trees', w: 'scrub', e: 'scrub' },
  exits: [
    { side: 's', at: 20.5, to: 'railhead', spawn: 'north', name: 'south' },
    { side: 'n', at: 22.5, w: 4.4, to: 'scar', spawn: 'south', name: 'north', travel: { line: 'North on the old interstate. Half a day on foot.', path: TO_RUST_MILE } },
  ],
  ground(g) {
    g.line([[20.5, 51], [20.5, 40]], 2.6, 'e');
    g.line(RAMP, 4.6, 'd');
    g.blob(9.0, 10.0, 4.0, 3.0, 'T', 141);
    g.blob(34.0, 8.0, 3.6, 3.0, 'T', 142);
    g.blob(8.0, 36.0, 3.0, 3.0, 'T', 143);
  },
  height(x, z, h) {
    // the embankment: the ramp rides up on a fill that falls away to either side
    const dd = distToPath(x, z, RAMP);
    const k = 1 - Math.min(1, Math.max(0, (dd - 3.0) / 5.0));
    return h + rise(z) * k * k * (3 - 2 * k);
  },
  grassTint: (x, z) => (z < 16 && cell(Math.floor(x), Math.floor(z)) === 'T' ? ['#c8ccd0', '#b0b8c0', '#d8dce0', '#a8b0b8'][Math.floor(Math.abs(x * 7 + z * 3)) % 4] : undefined),
  paint(gl, x, z, fine): RGB | undefined {
    if (gl === 'T' && z < 16) return ([[120, 128, 134], [138, 146, 150], [104, 112, 118], [150, 156, 160]] as RGB[])[Math.floor(fine * 4)]!;
    return undefined;
  },
  dress(d) {
    const { scene } = d;
    // guardrails along both shoulders of the climb
    const side = (off: number): Array<[number, number]> => [[20.5 + off, 38], [22.5 + off, 28], [24.5 + off, 15], [23.0 + off, 1]];
    guardrail(scene, side(-2.8));
    guardrail(scene, side(2.8));
    checkpoint(scene, 26.4, 19.0, 2.6);
    scope(scene, 28.0, 17.0);
    wreck(scene, 21.6, 31.0, 0.1, 'semi', d.seed());
    wreck(scene, 25.6, 9.0, -0.2, 'sedan', d.seed());
    truck(scene, 15.0, 42.0);
    for (const [x, z, k] of [[6.0, 44.0, 'c'], [34.0, 44.0, 'c'], [12.0, 24.0, 'm'], [34.0, 30.0, 'm'], [4.0, 20.0, 'm']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.0, d.seed()));
    for (let i = 0; i < 16; i++) {
      const x = 2 + d.r() * 38, z = 2 + d.r() * 46;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g' || distToPath(x, z, RAMP) < 4) continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), true), 0.15);
    }
    tumbleweed(scene, 18.0, 36.0, 4);
    tumbleweed(scene, 27.0, 26.0, 5);
    boardSign(scene, 17.0, 45.0, 'NORTH ^', 0, 111);

    d.things.push(
      { x: 28.0, z: 17.8, height: 1.5, label: 'Look', say: { lines: ['Through the scope: the old interstate, running north to the edge of the sky.', 'At the very end, a thin pin catches the light.'] } },
      { x: 26.4, z: 20.2, height: 1.4, label: 'Look', reach: 1.6, say: { lines: ['A checkpoint barrier, stencilled grey: a chevron and a row of tally marks. The arm is down. The road goes round it.'] } },
    );
    d.npcs.push({ char: 'conscript', col: 25, row: 21, name: 'Garrison Sentry', facing: 's', lines: ['Checkpoint\'s closed.', '...It\'s always closed. Go on through.'] });
    d.roamers.push({ num: 70, level: 8, x: 9.0, z: 36.0, range: 2.0 }, { num: 75, level: 8, x: 34.0, z: 8.0, range: 2.0 });
  },
});
