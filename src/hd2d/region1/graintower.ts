import * as THREE from 'three';
import { box, colMat } from '../geo';
import { addSolid } from '../world';
import { KM, wallLamp, pendant, crate, drum } from '../ohmstead/kit';
import { interior, exitDoor, stairLight, type InteriorDress } from './interior';
import type { Grid } from './section';
import { bucketLoop, wheel, stairs, hopper, binTop } from './dungeon-props';

/**
 * THE GRAIN TOWER — the first dungeon, off the Grain Line (Act I content per
 * the GDD). Three floors: the pit at the bottom, the gallery of catwalks over
 * the bins, the headhouse at the top. Routine: the bucket leg runs the whole
 * height, cups climbing full of nothing and tipping out nothing at the head.
 * Something up there runs the loop.
 */

type RGB = [number, number, number];
const H = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
/** Dusty concrete, grain sifted into the joints and drifted along the walls. */
function grainFloor(gl: string, x: number, z: number, fine: number): RGB {
  const n = Math.sin(x * 1.7) * Math.sin(z * 1.3) * 0.5 + 0.5;
  let c = mix(H('#7a7266'), H('#8c8476'), n * 0.6 + fine * 0.4);
  if (((x % 2) < 0.06 || (z % 2) < 0.06)) c = mix(c, H('#b8964a'), 0.6); // grain in the joints
  if (gl === 'r') c = mix(H('#b89048'), H('#d4ac5a'), fine);
  if (fine > 0.985) c = H('#c8a050');
  return c;
}

export const buildGrainTower = interior({
  id: 'graintower',
  title: 'THE GRAIN TOWER',
  sub: 'The pit',
  cols: 28, rows: 18, seed: 7101,
  zone: 'graintower-bins',
  wall: 'concrete',
  start: { x: 14, z: 16.4, face: 'N' },
  ground(g: Grid) {
    g.rect(13, 17, 3, 1, '.'); // the door
    g.rect(9, 6, 9, 4, 'v'); // the dump pit
    g.rect(9, 8, 9, 1, '='); // a grate across it
    g.blob(5.0, 12.5, 2.6, 2.0, 'r', 11, (q) => q === '.');
    g.blob(22.0, 12.0, 2.4, 2.2, 'r', 12, (q) => q === '.');
    g.blob(5.0, 4.0, 2.0, 1.6, 'r', 13, (q) => q === '.');
  },
  floor: grainFloor,
  dress(d) {
    const { root, pool } = d;
    exitDoor(d, 14.5, 'grainline', 'tower');
    d.spawns.top = { x: 25.0, z: 5.6, face: 'S' };
    const back = d.mount(0);
    for (const x of [6.5, 14.5, 21.5]) wallLamp(back, pool, x, 1.0, 2.1);
    for (const x of [4.5, 9.5, 19.5]) hopper(root, x, 2.6);
    d.built.push(bucketLoop(root, 24.2, 8.5, 0.3, 2.7, 10));
    d.built.push(wheel(root, 24.2, 0.3, 8.5, 0.42, 1.2));
    root.add(box(1.6, 0.5, 1.6, KM.rust(), 24.2, 0, 8.5)); // the boot
    addSolid(23.3, 7.6, 25.1, 9.4);
    stairs(root, 25.0, 4.2);
    stairLight(d, 25.0, 5.2);
    pendant(root, pool, 9.5, 12.0, true);
    pendant(root, pool, 19.5, 12.0, true);
    for (const [x, z] of [[2.2, 15.2], [2.8, 15.6]] as Array<[number, number]>) drum(root, x, z);
    for (const [x, z] of [[25.4, 15.0], [25.9, 15.5], [25.2, 15.8]] as Array<[number, number]>) crate(root, x, z, 0.5);
    addSolid(1.8, 14.8, 3.2, 16.0); addSolid(24.8, 14.6, 26.3, 16.2);
    d.things.push(
      { x: 25.0, z: 4.6, height: 2.2, label: 'Climb', reach: 1.6, say: { lines: ['The stairs climb into the dark. Buckets knock somewhere above.'] }, go: { to: 'graintower2', spawn: 'stairs' } },
      { x: 23.4, z: 9.9, height: 1.6, label: 'Look', reach: 1.8, say: { lines: ['At the foot of the leg, buckets swing round the boot pulley and start back up. Empty.'] } },
      { x: 13.5, z: 10.4, height: 0.8, label: 'Look', reach: 1.6, say: { lines: ['The dump pit. Under the grate, darkness and the smell of old dust.'] } },
    );
    d.roamers.push({ num: 53, level: 8, x: 5.0, z: 12.5, range: 1.6 }, { num: 52, level: 8, x: 21.0, z: 12.0, range: 1.8 });
  },
});

export const buildGrainTower2 = interior({
  id: 'graintower2',
  title: 'THE GRAIN TOWER',
  sub: 'The gallery',
  cols: 28, rows: 16, seed: 7103,
  zone: 'graintower-bins',
  wall: 'concrete',
  start: { x: 3.0, z: 13.2, face: 'N' },
  ground(g: Grid) {
    g.rect(1, 1, 26, 14, 'v');
    g.rect(1, 11, 6, 4, '.'); // the landing from below
    g.rect(21, 1, 6, 4, '.'); // the landing to the head
    g.rect(2, 7, 23, 1, '=');
    for (const x of [4, 13, 23]) g.rect(x, 2, 1, 10, '=');
    g.rect(2, 13, 2, 1, 'r');
  },
  floor: grainFloor,
  dress(d) {
    const { root, pool } = d;
    d.spawns.stairs = { x: 3.0, z: 12.6, face: 'N' };
    d.spawns.down = { x: 24.0, z: 3.2, face: 'S' };
    for (const [x, z] of [[8.5, 4.0], [8.5, 10.5], [18.0, 4.0], [18.0, 10.5]] as Array<[number, number]>) binTop(root, x, z, 2.6);
    d.built.push(bucketLoop(root, 25.6, 9.0, -1.2, 2.8, 10));
    const back = d.mount(0);
    for (const x of [6.5, 16.5]) wallLamp(back, pool, x, 1.0, 2.1);
    pendant(root, pool, 13.5, 7.5, true);
    pendant(root, pool, 3.5, 12.5, true);
    stairs(root, 24.0, 3.4);
    stairLight(d, 24.0, 4.4);
    stairLight(d, 3.0, 13.2);
    // light falling in through a broken high window
    const shaft = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 5), new THREE.MeshBasicMaterial({ color: '#ffe0a0', transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    shaft.position.set(11.0, 2.0, 6.0);
    shaft.rotation.set(-0.5, 0.3, 0);
    root.add(shaft);
    d.things.push(
      { x: 3.0, z: 13.8, height: 1.4, label: 'Down', reach: 1.6, go: { to: 'graintower', spawn: 'top' } },
      { x: 24.0, z: 3.8, height: 2.2, label: 'Climb', reach: 1.6, say: { lines: ['One more flight. The knocking is loud up here.'] }, go: { to: 'graintower3', spawn: 'stairs' } },
      { x: 13.5, z: 6.5, height: 0.8, label: 'Look', reach: 1.4, say: { lines: ['Through the grate: the open top of a bin, and nothing in it but dark.'] } },
    );
    d.roamers.push({ num: 21, level: 9, x: 13.5, z: 7.5, range: 1.2 });
  },
});

export const buildGrainTower3 = interior({
  id: 'graintower3',
  title: 'THE GRAIN TOWER',
  sub: 'The headhouse',
  cols: 22, rows: 14, seed: 7107,
  zone: 'graintower-bins',
  wall: 'tin',
  start: { x: 3.0, z: 11.4, face: 'N' },
  ground(g: Grid) {
    g.rect(1, 1, 20, 2, 'v'); // the leg's head drops away behind the wheel
    g.blob(15.0, 9.0, 2.2, 1.8, 'r', 31, (q) => q === '.');
  },
  floor: grainFloor,
  dress(d) {
    const { root, pool } = d;
    d.spawns.stairs = { x: 3.0, z: 11.0, face: 'N' };
    stairLight(d, 3.0, 11.6);
    // the head pulley: the wheel the whole tower turns on, cups cresting and tipping out nothing
    d.built.push(bucketLoop(root, 11.0, 3.2, 0.2, 3.0, 14, 0.5));
    d.built.push(wheel(root, 11.0, 3.0, 3.2, 0.5, 1.3));
    root.add(box(2.4, 0.5, 1.6, KM.rust(), 11.0, 3.5, 3.2));
    // the distributor: a spout swinging over a ring of chutes
    const dist = new THREE.Group();
    dist.position.set(16.5, 0, 5.0);
    dist.add(box(0.6, 1.8, 0.6, KM.steel(), 0, 0, 0));
    const spout = box(0.2, 0.2, 1.5, KM.rust(), 0, 1.6, 0.7);
    const arm = new THREE.Group();
    arm.add(spout);
    dist.add(arm);
    root.add(dist);
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2; root.add(box(0.3, 0.6, 0.3, KM.steel(), 16.5 + Math.cos(a) * 1.4, 0, 5.0 + Math.sin(a) * 1.4)); }
    addSolid(15.0, 3.5, 18.0, 6.5);
    d.built.push({ update(t) { arm.rotation.y = t * 0.35; } });
    const back = d.mount(0);
    for (const x of [4.5, 17.5]) wallLamp(back, pool, x, 1.0, 2.1);
    for (const x of [7.0, 15.0]) back.add(box(1.0, 0.7, 0.05, colMat('#ffe8b0', { emissive: '#ffd890', emissiveIntensity: 1.4 }), x, 1.8, 1.05)); // windows, sun behind them
    pool.add({ pos: new THREE.Vector3(11.0, 2.4, 6.0), color: new THREE.Color('#ffd8a0'), intensity: 2.2, dist: 7 });
    d.things.push(
      { x: 3.0, z: 11.8, height: 1.4, label: 'Down', reach: 1.6, go: { to: 'graintower2', spawn: 'down' } },
      { x: 11.0, z: 5.2, height: 3.0, label: 'Look', reach: 2.0, say: { lines: ['The head pulley turns. Each bucket crests the wheel, tips, and pours out nothing.', 'It has done this every day for longer than anyone has been counting.'] } },
    );
    d.roamers.push({ num: 84, level: 11, x: 11.0, z: 8.5, range: 2.0 });
  },
});
