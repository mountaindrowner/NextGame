import * as THREE from 'three';
import { box, colMat } from '../geo';
import { cell, heightAt, addSolid } from '../world';
import { cottonwood, mesquite, bush, tumbleweed } from '../field/props';
import { wreck, type Kind } from '../scar/area';
import { section } from './section';
import { driveInScreen, speakerPost, projectorBooth, boardSign } from './props';

/**
 * THE DRIVE-IN — side spot at the end of Drive-In Road. Rows of dead cars
 * facing a blank screen. Routine: every night the projector Ohm lights the
 * screen with nothing (come back after dark). Thread 3: the projector
 * wears Grandpa's brass tag; someone has kept it oiled. LUMEN runs the old
 * projector for the night event (later).
 */

const SCREEN_Z = 5.5;

function ticketBooth(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  g.add(box(1.4, 2.0, 1.2, colMat('#c8c0aa'), 0, 0, 0));
  g.add(box(1.7, 0.1, 1.5, colMat('#8a3a2e'), 0, 2.0, 0));
  g.add(box(0.05, 0.6, 0.8, colMat('#1e262c', { roughness: 0.2 }), 0.71, 1.0, 0));
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.75, z - 0.65, x + 0.75, z + 0.65);
}

export const buildDriveIn = section({
  id: 'drivein',
  title: 'THE DRIVE-IN',
  sub: 'Dead cars facing a blank screen',
  kind: 'side',
  region: 'road',
  cols: 42, rows: 36, seed: 5947,
  zone: 'drivein-lot',
  edges: { n: 'trees', s: 'scrub', w: 'fence', e: 'trees' },
  exits: [{ side: 'w', at: 26.5, to: 'driveinrd', spawn: 'east', name: 'west' }],
  ground(g) {
    g.rect(6, 9, 30, 19, 'v');
    for (const z of [12, 16, 20, 24]) g.rect(7, z, 28, 2, 'd'); // parking rows
    g.line([[-1, 26.5], [8, 26.5]], 2.6, 'e');
    g.blob(38.0, 30.0, 2.6, 3.0, 'T', 131);
    g.blob(3.0, 8.0, 2.0, 3.0, 'T', 132);
    g.blob(20.0, 31.5, 5.0, 2.0, 'T', 133);
  },
  dress(d) {
    const { scene, night } = d;
    d.built.push(driveInScreen(scene, 21.0, SCREEN_Z, 15.0, night));
    d.built.push(projectorBooth(scene, 21.0, 30.0, night, SCREEN_Z));
    ticketBooth(scene, 4.0, 24.2);
    const kinds: Kind[] = ['sedan', 'hatch', 'pickup', 'van', 'sedan', 'hatch'];
    let n = 0;
    for (const z of [12.9, 16.9, 20.9, 24.9]) {
      for (let x = 9.0; x < 34; x += 3.4) {
        n++;
        if (d.r() < 0.22) { if (d.r() > 0.5) speakerPost(scene, x, z + 0.9, d.seed()); continue; }
        wreck(scene, x, z, Math.PI + (d.r() - 0.5) * 0.25, kinds[n % kinds.length]!, d.seed());
        if (d.r() > 0.35) speakerPost(scene, x + 1.7, z + 0.6, d.seed());
      }
    }
    for (const [x, z, k] of [[3.0, 31.0, 'c'], [39.0, 20.0, 'c'], [38.6, 9.0, 'm'], [12.0, 32.6, 'm'], [31.0, 32.8, 'c']] as Array<[number, number, string]>)
      d.tree(k === 'c' ? cottonwood(x, z, 1.05, d.seed()) : mesquite(x, z, 1.0, d.seed()));
    for (let i = 0; i < 14; i++) {
      const x = 2 + d.r() * 38, z = 2 + d.r() * 32;
      if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
      d.tree(bush(x, z, 0.5 + d.r() * 0.4, d.seed(), d.r() > 0.5), 0.15);
    }
    tumbleweed(scene, 27.0, 18.6, 3);
    boardSign(scene, 7.0, 29.0, 'SHOW AT DARK', 0, 101);

    d.things.push(
      { x: 21.0, z: 28.2, height: 3.2, label: 'Look', reach: 1.8, say: { lines: ['The projector hums. Its lamp is warm. Someone has kept it oiled.', 'A small brass tag on the housing. Three notches stamped in it.'] } },
      { x: 21.0, z: SCREEN_Z + 1.2, height: 2.6, label: 'Look', reach: 2.2, say: { lines: night ? ['The screen glows faintly, flickering, with nothing on it at all.'] : ['The screen is blank and peeling. People say it lights up after dark.'] } },
    );
    d.npcs.push({ char: 'card_sharp', col: 8, row: 27, name: 'Night-owl Vess', facing: 'e', lines: ['Come back after dark. The screen lights up. Nothing plays.', 'Every Ohm in the lot turns to face it anyway.'] });
    d.roamers.push({ num: 15, level: 9, x: 20.0, z: 31.0, range: 2.6 }, { num: 89, level: 9, x: 38.0, z: 30.0, range: 1.8 }, ...(night ? [{ num: 99, level: 10, x: 21.0, z: 9.0, range: 2.0 }] : []));
  },
});
