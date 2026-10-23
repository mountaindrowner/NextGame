import * as THREE from 'three';
import { fbm, rng, vnoise } from '../noise';
import { Pix, T, textTexture } from '../textures';
import { box, cyl, beam, cylGeo, colMat, texMat, shade } from '../geo';
import { setWorld, cell, heightAt, hitsSolid, addSolid, type TileWorld } from '../world';
import { buildGround, buildGrass } from '../terrain';
import { M, slab, vines, windowAt, put, waterTower, type Built } from '../field/buildings';
import { cottonwood, mesquite, bush, tumbleweed, motes, swayTrees, crates } from '../field/props';
import { railLine, boxcar, fence } from '../farmroad/area';
import { DAY, NIGHT } from '../mood';
import { castOf, loadMap, type AreaBuilder } from '../area';

/**
 * RAILHEAD — Colony 1, the crossroads trade-town on an old rail junction.
 * Layout 1:1 from tools/gen-railhead.ts (44×28): a ballast yard of four
 * parallel tracks; the roundhouse and turntable at the west end; boxcars,
 * platforms, semaphores, a signal gantry and switch levers in the yard; the
 * sabotaged switch-house relay on the north side; the market sprawl to the
 * east; the road in from the Farm Road (south) and out to the Cistern (north,
 * held by the Warden).
 */

const COLS = 44, ROWS = 28;
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'e'));
const inb = (x: number, z: number): boolean => x >= 0 && z >= 0 && x < COLS && z < ROWS;
const rect = (x0: number, z0: number, w: number, h: number, c: string): void => {
  for (let z = z0; z < z0 + h; z++) for (let x = x0; x < x0 + w; x++) if (inb(x, z)) MAP[z]![x] = c;
};
for (let x = 0; x < COLS; x++) { MAP[0]![x] = '#'; MAP[ROWS - 1]![x] = '#'; }
for (let z = 0; z < ROWS; z++) { MAP[z]![0] = '#'; MAP[z]![COLS - 1] = '#'; }
rect(6, 8, 36, 12, 'b'); // the yard's ballast bed
const TRACK_ROWS = [9, 12, 15, 18];
for (const r of TRACK_ROWS) rect(8, r, 33, 1, 'r');
rect(2, 7, 16, 14, 'v'); // gravel apron west (roundhouse, turntable)
rect(34, 20, 9, 6, 'v'); // market apron east
rect(21, 19, 3, ROWS - 19, 'd'); // the road in from the Farm Road
rect(21, 0, 3, 7, 'd'); // the road out to the Cistern
rect(2, 2, 8, 5, 'T');
rect(34, 2, 8, 5, 'T');
rect(2, 22, 6, 4, 'g');
rect(36, 8, 6, 4, 'T');

const get = (x: number, z: number): string => (inb(x, z) ? MAP[z]![x]! : '#');
type RGB = [number, number, number];
const H = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const pick = (pal: RGB[], k: number): RGB => pal[Math.min(pal.length - 1, Math.max(0, Math.floor(k * pal.length)))]!;
const EARTH = ['#6e5a44', '#7d684e', '#8a7458', '#5e4c3a'].map(H);
const GRAVEL = ['#7a746a', '#8e877a', '#9a9284', '#666056'].map(H);
const BALLAST = ['#4e4a45', '#5e5952', '#6a645b', '#433f3a'].map(H);
const DIRT = ['#6a5238', '#7a5e40', '#5a442e'].map(H);

function paint(g: string, x: number, z: number, fine: number): RGB | undefined {
  const n = fbm(x * 0.5, z * 0.5, 71, 3);
  if (g === 'e') {
    let c = pick(EARTH, n * 0.8 + fine * 0.3);
    if (fine > 0.985) c = H('#9a9284'); // pebbles
    if (fbm(x * 0.2, z * 0.2, 72, 2) > 0.62 && fine > 0.6) c = H('#5e7a32'); // weeds coming back
    return c;
  }
  if (g === 'v') return fine > 0.97 ? H('#b0a898') : pick(GRAVEL, n * 0.7 + fine * 0.4);
  if (g === 'b' || g === 'r') {
    let c = pick(BALLAST, n * 0.6 + fine * 0.5);
    if (fbm(x * 0.3, z * 0.3, 73, 2) > 0.7) c = [c[0] * 1.15 + 18, c[1] * 1.0, c[2] * 0.85]; // rust run-off
    if (g === 'b' && vnoise(x * 2, z * 2, 74) > 0.86) c = H('#4f7a2c'); // grass through the stone
    return c;
  }
  if (g === 'd') {
    let c = pick(DIRT, n * 0.7 + fine * 0.35);
    if (Math.abs(((x % 3) + 3) % 3 - 1.5) < 0.18 && fine > 0.3) c = H('#4e3c2a'); // cart ruts
    return c;
  }
  return undefined;
}

function height(x: number, z: number): number {
  let h = (fbm(x * 0.09, z * 0.09, 25, 3) - 0.5) * 0.3;
  const yard = (get(Math.floor(x), Math.floor(z)) === 'b' || get(Math.floor(x), Math.floor(z)) === 'r') ? 0.2 : 1;
  h *= yard;
  const edge = Math.min(x, z, COLS - x, ROWS - z);
  if (edge < 1.5) h += (1.5 - edge) * 0.5;
  if (z < 1.6 && x > 20.6 && x < 24.4) h = Math.min(h, 0.05);
  if (z > ROWS - 1.6 && x > 20.6 && x < 24.4) h = Math.min(h, 0.05);
  return h;
}

const WORLD: TileWorld = {
  cols: COLS, rows: ROWS, cell: get, height, seed: 4207, paint,
  openings: [{ side: 'n', x0: 20.6, x1: 24.4 }, { side: 's', x0: 20.6, x1: 24.4 }],
};

function blocked(x: number, z: number, r: number): boolean {
  if (x - r < 0.15 || x + r > COLS - 0.15 || z < -0.2) return true;
  if (z - r < 0.05 && !(x > 21.2 && x < 23.8)) return true;
  if (z + r > ROWS - 0.05 && !(x > 21.2 && x < 23.8)) return true;
  for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r], [0, 0]] as Array<[number, number]>) {
    const zz = z + dz;
    if (zz < 0 || zz >= ROWS) continue;
    if (cell(Math.floor(x + dx), Math.floor(zz)) === '#') return true;
  }
  return hitsSolid(x, z, r);
}

const glow = (hex: string, k: number): THREE.MeshStandardMaterial => colMat(hex, { emissive: hex, emissiveIntensity: k, roughness: 0.4 });
const steel = (): THREE.MeshStandardMaterial => M.steel();
const rust = (): THREE.MeshStandardMaterial => M.tank();

// ============================================================ roundhouse

/** The roundhouse: a long brick engine shed with three arched bays facing the
 *  turntable, a clerestory roof, soot-stained stacks — and a dead locomotive
 *  still nosing out of the middle bay, rusted where it stopped. */
function roundhouse(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const W = 7.4, D = 3.0, Hh = 3.2;
  g.add(box(W + 0.12, 0.6, D + 0.12, M.concrete(), 0, -0.55, 0));
  g.add(box(W, Hh, D, M.brick()));
  // clerestory roof: two low slopes and a raised glazed monitor along the ridge
  const roof = new THREE.Group();
  roof.add(slab(-D / 2 - 0.25, Hh - 0.1, -0.5, Hh + 0.55, W + 0.4, M.tin()));
  roof.add(slab(0.5, Hh + 0.55, D / 2 + 0.25, Hh - 0.1, W + 0.4, M.tin()));
  roof.rotation.y = Math.PI / 2;
  g.add(roof);
  g.add(box(W - 0.6, 0.55, 1.0, M.brick(), 0, Hh + 0.45, 0));
  for (let x = -W / 2 + 0.7; x < W / 2 - 0.5; x += 0.7) windowAt(g, x, Hh + 0.75, 0.51, 0.46, 0.3, 0, x > 1 && x < 2 ? 'boarded' : 'glass');
  g.add(slab(-0.65, Hh + 1.0, 0, Hh + 1.2, W - 0.4, M.tin()).rotateY(Math.PI / 2));
  g.add(slab(0, Hh + 1.2, 0.65, Hh + 1.0, W - 0.4, M.tin()).rotateY(Math.PI / 2));
  // three arched bays facing south toward the turntable
  const fz = D / 2 + 0.01;
  for (const bx of [-2.4, 0, 2.4]) {
    g.add(box(1.7, 2.45, 0.06, M.dark(), bx, 0, fz));
    const arch = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.06, 16, 1, false, -Math.PI / 2, Math.PI), M.dark());
    arch.rotation.x = Math.PI / 2;
    arch.position.set(bx, 2.45, fz);
    g.add(arch);
    const voussoir = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.09, 4, 16, Math.PI), M.concrete());
    voussoir.position.set(bx, 2.45, fz + 0.03);
    g.add(shade(voussoir));
    // half-open timber doors on the outer bays
    if (bx !== 0) {
      const leaf = box(0.8, 2.3, 0.08, M.wood(), 0, 0, 0);
      const piv = new THREE.Group();
      piv.position.set(bx + (bx < 0 ? -0.85 : 0.85), 0, fz + 0.05);
      leaf.position.x = bx < 0 ? 0.4 : -0.4;
      piv.add(leaf);
      piv.rotation.y = bx < 0 ? -1.2 : 1.2;
      g.add(piv);
    }
  }
  for (const px of [-3.6, -1.2, 1.2, 3.6]) g.add(box(0.28, Hh, 0.18, M.brick(), px, 0, fz + 0.05));
  // the dead locomotive in the middle bay
  const loco = new THREE.Group();
  const boiler = new THREE.Mesh(cylGeo(0.55, 0.55, 1.9, 16), rust());
  boiler.rotation.x = Math.PI / 2;
  boiler.position.set(0, 1.15, 0.35);
  loco.add(shade(boiler));
  const face = new THREE.Mesh(cylGeo(0.57, 0.57, 0.08, 16), M.dark());
  face.rotation.x = Math.PI / 2;
  face.position.set(0, 1.15, 1.32);
  loco.add(face);
  loco.add(cyl(0.16, 0.2, 0.6, rust(), 0, 1.6, 0.95, 10)); // smokestack
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 8), colMat('#8a7a50', { roughness: 0.3, metalness: 0.4 }));
  lamp.position.set(0, 1.62, 1.33);
  loco.add(lamp);
  loco.add(box(1.25, 0.32, 1.9, M.dark(), 0, 0.3, 0.35));
  for (const sz of [-0.2, 0.55]) for (const sx of [-0.62, 0.62]) {
    const w = new THREE.Mesh(cylGeo(0.36, 0.36, 0.1, 14), colMat('#2a221c', { metalness: 0.5 }));
    w.rotation.z = Math.PI / 2;
    w.position.set(sx, 0.36, sz);
    loco.add(shade(w));
  }
  const cow = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.55, 4, 1), rust());
  cow.rotation.set(Math.PI / 2, Math.PI / 4, 0);
  cow.scale.set(1, 1, 0.45);
  cow.position.set(0, 0.32, 1.5);
  loco.add(shade(cow));
  vines(loco, -0.4, 0.4, 1.36, 0.8, 1.0);
  loco.position.set(0, 0, fz - 0.4);
  g.add(loco);
  // soot-black stacks
  for (const sx of [-2.6, 2.2]) {
    g.add(cyl(0.28, 0.32, 1.6, M.brick(), sx, Hh + 0.3, -0.6, 10));
    g.add(cyl(0.3, 0.3, 0.12, colMat('#1d1b19'), sx, Hh + 1.9, -0.6, 10));
  }
  // a ghost-painted name across the brick
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.4), new THREE.MeshStandardMaterial({
    map: textTexture('ROUNDHOUSE NO. 2', { w: 120, h: 14, fg: '#e8dcc0', font: 'bold 11px monospace', worn: 0.4, seed: 12 }), transparent: true, alphaTest: 0.4, roughness: 1,
  }));
  sign.position.set(0, 2.95, fz + 0.02);
  g.add(sign);
  vines(g, -W / 2 + 0.3, 0, fz + 0.04, 1.2, 2.4);
  vines(g, W / 2 + 0.07, 0, 0.2, 1.8, 2.2, Math.PI / 2);
  vines(g, 3.0, 1.6, fz + 0.04, 0.9, 1.4);
  put(g, cx, cz, W, D, scene);
  addSolid(cx - W / 2, cz - D / 2, cx + W / 2, cz + D / 2);
  addSolid(cx - 0.75, cz + D / 2, cx + 0.75, cz + D / 2 + 1.2);
  return {};
}

/** The turntable: a stone-rimmed pit with a girder bridge that once swung
 *  engines into their bays. Still turns, very slowly, when the wind leans on it. */
function turntable(scene: THREE.Scene, cx: number, cz: number, r: number): Built {
  const g = new THREE.Group();
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(r + 0.18, r + 0.18, 0.3, 32, 1, true), M.concrete());
  rim.position.y = 0.05;
  g.add(shade(rim));
  const lip = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.24, 32), M.concrete());
  lip.rotation.x = -Math.PI / 2;
  lip.position.y = 0.2;
  g.add(lip);
  const pit = new THREE.Mesh(new THREE.CircleGeometry(r, 32), colMat('#2c2722', { roughness: 1 }));
  pit.rotation.x = -Math.PI / 2;
  pit.position.y = -0.08;
  pit.receiveShadow = true;
  g.add(pit);
  const ringRail = new THREE.Mesh(new THREE.TorusGeometry(r - 0.2, 0.04, 4, 40), colMat('#5a4a3c', { metalness: 0.5 }));
  ringRail.rotation.x = Math.PI / 2;
  ringRail.position.y = -0.04;
  g.add(ringRail);
  const bridge = new THREE.Group();
  bridge.add(box(2 * r - 0.1, 0.22, 0.9, steel(), 0, -0.02, 0));
  for (const dz of [-0.36, 0.36]) bridge.add(box(2 * r - 0.1, 0.06, 0.07, colMat('#5a4a3c', { metalness: 0.5 }), 0, 0.2, dz));
  for (let x = -r + 0.3; x < r; x += 0.45) bridge.add(box(0.14, 0.05, 1.0, M.wood(), x, 0.18, 0));
  bridge.add(box(0.5, 0.9, 0.6, M.wood(), r - 0.4, 0.2, 0.75)); // the hand-crank cabin
  bridge.rotation.y = 0.35;
  g.add(bridge);
  g.add(cyl(0.22, 0.22, 0.3, steel(), 0, 0, 0, 12));
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - r - 0.15, cz - r - 0.15, cx + r + 0.15, cz + r + 0.15);
  return { update: (t) => { bridge.rotation.y = 0.35 + Math.sin(t * 0.05) * 0.08; } };
}

/** Radial rails from each roundhouse bay to the turntable. */
function bayRails(scene: THREE.Scene, from: THREE.Vector2[], to: THREE.Vector2): void {
  const rail = colMat('#5a4a3c', { metalness: 0.5, roughness: 0.55 });
  for (const f of from) {
    const dir = new THREE.Vector2().subVectors(to, f);
    const len = dir.length() - 1.8;
    dir.normalize();
    const nrm = new THREE.Vector2(-dir.y, dir.x);
    for (const off of [-0.42, 0.42]) {
      const a = new THREE.Vector3(f.x + nrm.x * off, 0.1, f.y + nrm.y * off);
      const b = new THREE.Vector3(a.x + dir.x * len, 0.1, a.z + dir.y * len);
      scene.add(beam(a, b, 0.07, rail));
    }
    for (let d = 0.2; d < len; d += 0.55) {
      const tie = box(1.4, 0.07, 0.2, M.wood(), f.x + dir.x * d, heightAt(f.x, f.y) - 0.02, f.y + dir.y * d);
      tie.rotation.y = -Math.atan2(dir.y, dir.x) + Math.PI / 2 + Math.PI / 2;
      scene.add(tie);
    }
  }
}

// ============================================================ yard pieces

function platform(scene: THREE.Scene, cx: number, cz: number): void {
  const g = new THREE.Group();
  g.add(box(3.4, 0.42, 1.05, M.concrete()));
  g.add(box(3.4, 0.05, 0.12, M.hazard(), 0, 0.42, 0.47));
  g.add(box(3.4, 0.05, 0.12, M.hazard(), 0, 0.42, -0.47));
  for (const x of [-1.4, 1.4]) g.add(box(0.1, 2.0, 0.1, steel(), x, 0.42, 0));
  g.add(slab(-0.5, 2.32, 0.5, 2.22, 3.2, M.tin()).rotateY(Math.PI / 2));
  g.add(box(1.1, 0.06, 0.32, M.wood(), -0.5, 0.82, -0.1));
  for (const x of [-0.9, -0.1]) g.add(box(0.06, 0.4, 0.28, steel(), x, 0.42, -0.1));
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.26), new THREE.MeshStandardMaterial({ map: textTexture('RAILHEAD', { w: 64, h: 14, bg: '#1d3a2c', fg: '#e8eadc', font: 'bold 10px monospace', worn: 0.15 }), roughness: 0.8 }));
  sign.position.set(0.6, 2.05, 0.06);
  g.add(sign);
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - 1.7, cz - 0.52, cx + 1.7, cz + 0.52);
}

function semaphore(scene: THREE.Scene, x: number, z: number, night: boolean): Built {
  const g = new THREE.Group();
  g.add(box(0.12, 3.4, 0.12, steel()));
  g.add(box(0.06, 0.06, 0.6, steel(), 0, 3.0, -0.2));
  const arm = new THREE.Group();
  arm.position.set(0.12, 3.1, 0);
  const blade = box(1.0, 0.16, 0.04, colMat('#b8402e'), 0.5, -0.08, 0);
  arm.add(blade);
  arm.add(box(0.12, 0.17, 0.05, colMat('#e8e2d2'), 0.75, -0.085, 0.01));
  arm.rotation.z = -0.5; // the old "proceed" angle
  g.add(arm);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), glow('#ff5a3a', night ? 4 : 1.5));
  lamp.position.set(0.12, 2.85, 0.08);
  g.add(lamp);
  g.add(box(0.06, 3.0, 0.06, steel(), -0.22, 0, 0)); // ladder rail
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.2, z - 0.2, x + 0.2, z + 0.2);
  return { update: (t) => { (lamp.material as THREE.MeshStandardMaterial).emissiveIntensity = (night ? 4 : 1.5) * (Math.floor(t * 1.1) % 2 ? 1 : 0.35); } };
}

/** An overhead signal gantry spanning the four tracks, a lamp over each. */
function gantry(scene: THREE.Scene, x: number, z0: number, z1: number, night: boolean): Built {
  const g = new THREE.Group();
  const mat = steel();
  for (const z of [z0, z1]) {
    g.add(box(0.14, 4.2, 0.14, mat, -0.2, 0, z));
    g.add(box(0.14, 4.2, 0.14, mat, 0.2, 0, z));
    for (let y = 0.6; y < 4; y += 0.9) g.add(beam(new THREE.Vector3(-0.2, y, z), new THREE.Vector3(0.2, y + 0.8, z), 0.04, mat));
  }
  g.add(box(0.5, 0.3, z1 - z0 + 0.3, mat, 0, 4.1, (z0 + z1) / 2));
  const lamps: THREE.Mesh[] = [];
  for (const tz of TRACK_ROWS) {
    g.add(box(0.36, 0.6, 0.3, colMat('#1d1b19'), 0, 3.45, tz + 0.5));
    const l = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), glow(tz % 2 ? '#7dff9a' : '#ff5a3a', night ? 4 : 1.6));
    l.position.set(0.17, 3.7, tz + 0.5);
    g.add(l);
    lamps.push(l);
  }
  g.position.set(x, heightAt(x, (z0 + z1) / 2), 0);
  scene.add(g);
  for (const z of [z0, z1]) addSolid(x - 0.35, z - 0.2, x + 0.35, z + 0.2);
  return { update: (t) => lamps.forEach((l, i) => { (l.material as THREE.MeshStandardMaterial).emissiveIntensity = (night ? 4 : 1.6) * (Math.sin(t * 2 + i) > -0.3 ? 1 : 0.25); }) };
}

function switchLever(scene: THREE.Scene, x: number, z: number, lean: number): void {
  const g = new THREE.Group();
  g.add(box(0.5, 0.25, 0.3, M.wood()));
  const lever = beam(new THREE.Vector3(0, 0.25, 0), new THREE.Vector3(Math.sin(lean) * 0.9, 0.25 + Math.cos(lean) * 0.9, 0), 0.06, colMat('#a83a2a'));
  g.add(lever);
  g.add(box(0.18, 0.14, 0.18, colMat('#d8d0bc'), Math.sin(lean) * 0.9 - 0.09, 0.2 + Math.cos(lean) * 0.9, -0.09));
  g.add(box(0.4, 0.06, 0.06, steel(), 0, 0.05, 0.3));
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.3, z - 0.2, x + 0.3, z + 0.2);
}

function bufferStop(scene: THREE.Scene, x: number, z: number, night: boolean): void {
  const g = new THREE.Group();
  for (const dz of [-0.45, 0.45]) g.add(beam(new THREE.Vector3(-0.6, 0.1, dz), new THREE.Vector3(0, 0.75, dz), 0.1, steel()));
  g.add(box(0.25, 0.4, 1.3, M.wood(), 0, 0.45, 0));
  g.add(box(0.27, 0.12, 1.3, M.hazard(), 0, 0.85, 0));
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), glow('#ff4a2a', night ? 4 : 1.4));
  lamp.position.set(0.05, 1.05, 0);
  g.add(lamp);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.45, z - 0.7, x + 0.25, z + 0.7);
}

function coalPile(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  const r = rng(61);
  const coal = colMat('#1d1c1b', { roughness: 0.55, metalness: 0.2 });
  for (let i = 0; i < 26; i++) {
    const a = r() * Math.PI * 2, d = r() * 1.0;
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22 + r() * 0.22, 0), coal);
    s.position.set(Math.cos(a) * d, 0.12 + (1 - d) * 0.55 * r(), Math.sin(a) * d * 0.7);
    s.rotation.set(r() * 3, r() * 3, r() * 3);
    g.add(shade(s));
  }
  g.add(beam(new THREE.Vector3(0.9, 0, -0.6), new THREE.Vector3(0.4, 1.6, -0.3), 0.08, rust()));
  g.add(box(0.7, 0.4, 0.5, rust(), 0.35, 1.45, -0.3));
  vines(g, -0.9, 0, 0.5, 0.6, 0.5);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 1.1, z - 0.8, x + 1.1, z + 0.8);
}

// ============================================================ the relay

/** The switch-house: a brick-and-timber signal box with the colony relay on
 *  its roof. Someone's cut the feed — the line dangles and spits sparks. */
function switchHouse(scene: THREE.Scene, cx: number, cz: number, night: boolean): Built {
  const g = new THREE.Group();
  g.add(box(2.8, 1.25, 2.0, M.brick()));
  g.add(box(3.0, 1.5, 2.2, M.wood(), 0, 1.25, 0));
  const panes: THREE.Mesh[] = [];
  for (const x of [-0.95, -0.32, 0.32, 0.95]) panes.push(windowAt(g, x, 2.0, 1.11, 0.5, 0.75));
  windowAt(g, 1.51, 2.0, 0, 0.5, 0.75, Math.PI / 2);
  const roof = new THREE.Group();
  roof.add(slab(-1.3, 2.75, 0, 3.45, 3.3, M.shingle()));
  roof.add(slab(0, 3.45, 1.3, 2.75, 3.3, M.shingle()));
  roof.rotation.y = Math.PI / 2;
  g.add(roof);
  g.add(box(0.8, 1.2, 0.05, M.wood(), -0.6, 0, 1.01)); // door
  // stairs up the side
  for (let i = 0; i < 5; i++) g.add(box(0.7, 0.08, 0.3, M.wood(), -1.75, i * 0.28, 0.6 - i * 0.28));
  // the relay mast: lattice, cross-arms, insulators, a blinking beacon
  const mast = new THREE.Group();
  mast.position.set(0.6, 3.3, -0.3);
  for (const [sx, sz] of [[-0.18, -0.18], [0.18, -0.18], [0.18, 0.18], [-0.18, 0.18]] as Array<[number, number]>)
    mast.add(beam(new THREE.Vector3(sx, 0, sz), new THREE.Vector3(sx * 0.3, 3.0, sz * 0.3), 0.04, steel()));
  for (const y of [1.6, 2.4]) {
    mast.add(box(1.3, 0.05, 0.05, steel(), 0, y, 0));
    for (const x of [-0.55, 0.55]) mast.add(cyl(0.04, 0.05, 0.14, colMat('#cfe0e8', { roughness: 0.2 }), x, y + 0.05, 0, 6));
  }
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), glow('#ff3a2a', 4));
  beacon.position.y = 3.05;
  mast.add(beacon);
  g.add(mast);
  // the cut feed line: dangling from the mast to the ground, sparking at the break
  const cable = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(1.15, 5.0, -0.3), new THREE.Vector3(1.8, 2.0, 0.4), new THREE.Vector3(1.7, 0.35, 1.3)), 10, 0.025, 4), colMat('#151515'));
  g.add(cable);
  const sparkMat = new THREE.PointsMaterial({ color: '#ffe08a', size: 0.06, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const sparkGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(24 * 3);
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  sparks.position.set(1.7, 0.35, 1.3);
  g.add(sparks);
  const spark = new THREE.PointLight('#ffd08a', 0, 3, 1.8);
  spark.position.set(1.7, 0.5, 1.3);
  g.add(spark);
  // spools and a toolbox left in a hurry
  const spool = new THREE.Mesh(cylGeo(0.35, 0.35, 0.3, 12), M.wood());
  spool.rotation.x = Math.PI / 2;
  spool.position.set(-1.0, 0.35, 1.4);
  g.add(shade(spool));
  g.add(box(0.5, 0.25, 0.25, colMat('#8a2e24', { metalness: 0.3 }), 0.2, 0, 1.45));
  vines(g, -1.41, 0, -0.2, 1.4, 1.3, -Math.PI / 2);
  put(g, cx, cz, 2.8, 2.0, scene);
  addSolid(cx - 2.1, cz - 1.1, cx + 1.6, cz + 1.15);
  const r = rng(5);
  let burst = 0;
  return {
    update(t) {
      (beacon.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.floor(t * 1.6) % 2 ? 5 : 0.4;
      for (const p of panes) (p.material as THREE.MeshStandardMaterial).emissiveIntensity = night ? 1.2 : 0;
      burst -= 1 / 60;
      if (burst < -0.4 - r() * 1.6) burst = 0.25;
      const on = burst > 0;
      spark.intensity = on ? (night ? 6 : 3) * (0.5 + r() * 0.5) : 0;
      for (let i = 0; i < 24; i++) {
        sp[i * 3] = on ? (r() - 0.5) * 0.5 : 0;
        sp[i * 3 + 1] = on ? r() * 0.4 : -10;
        sp[i * 3 + 2] = on ? (r() - 0.5) * 0.5 : 0;
      }
      sparkGeo.attributes.position!.needsUpdate = true;
    },
  };
}

// ============================================================ the market

let stripeCache: Record<string, THREE.Texture> = {};
function stripes(a: string, b: string): THREE.Texture {
  const k = a + b;
  if (stripeCache[k]) return stripeCache[k]!;
  const p = new Pix(16, 16);
  const ca = parseInt(a.slice(1), 16), cb = parseInt(b.slice(1), 16);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const c = Math.floor(x / 4) % 2 ? cb : ca;
    const shade = 0.88 + vnoise(x * 0.5, y * 0.5, 7) * 0.2;
    p.set(x, y, [((c >> 16) & 255) * shade, ((c >> 8) & 255) * shade, (c & 255) * shade]);
  }
  return (stripeCache[k] = p.texture());
}

function stall(scene: THREE.Scene, cx: number, cz: number, colors: [string, string], goods: 'supply' | 'salt' | 'scrap', label?: string): void {
  const g = new THREE.Group();
  for (const [x, z] of [[-1.0, -0.55], [1.0, -0.55], [-1.0, 0.55], [1.0, 0.55]] as Array<[number, number]>) g.add(box(0.08, 2.1, 0.08, M.wood(), x, 0, z));
  const canopy = new THREE.MeshStandardMaterial({ map: stripes(...colors), roughness: 1, side: THREE.DoubleSide });
  g.add(slab(-0.75, 2.35, 0.85, 1.95, 2.4, canopy, 0.04).rotateY(Math.PI / 2));
  // a scalloped valance
  for (let x = -1.1; x < 1.1; x += 0.22) {
    const v = new THREE.Mesh(new THREE.CircleGeometry(0.11, 8, 0, Math.PI), canopy);
    v.rotation.set(Math.PI, 0, 0);
    v.position.set(x + 0.11, 1.98, 0.86);
    g.add(v);
  }
  g.add(box(2.1, 0.85, 0.6, M.wood(), 0, 0, 0.25));
  const r = rng(Math.round(cx * 13));
  if (goods === 'supply') {
    for (let i = 0; i < 7; i++) g.add(cyl(0.07, 0.07, 0.18, colMat(['#8a6a3a', '#5a6a72', '#a8463a', '#c9a24a'][i % 4]!, { metalness: 0.3 }), -0.8 + i * 0.26, 0.85, 0.25 + (r() - 0.5) * 0.2, 8));
    g.add(box(0.36, 0.3, 0.3, colMat('#3f5a3c'), 0.55, 0.85, 0.15));
  } else if (goods === 'salt') {
    for (let i = 0; i < 4; i++) {
      const sack = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), colMat('#e6dfcf', { roughness: 1 }));
      sack.scale.set(1, 0.8, 0.8);
      sack.position.set(-0.7 + i * 0.45, 1.02, 0.25);
      g.add(shade(sack));
    }
    g.add(box(0.5, 0.06, 0.35, steel(), 0.5, 1.2, 0.1)); // scale pan
  } else {
    for (let i = 0; i < 9; i++) g.add(box(0.12 + r() * 0.2, 0.08 + r() * 0.15, 0.12 + r() * 0.2, r() < 0.5 ? rust() : steel(), -0.85 + r() * 1.7, 0.85, 0.1 + r() * 0.3));
  }
  if (label) {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.28), new THREE.MeshStandardMaterial({ map: textTexture(label, { w: 64, h: 16, bg: '#2b2620', fg: '#e8d9a8', font: 'bold 11px monospace', worn: 0.1 }), roughness: 1 }));
    s.position.set(0, 0.55, 0.56);
    g.add(s);
  }
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - 1.1, cz - 0.62, cx + 1.1, cz + 0.62);
}

function brokerDesk(scene: THREE.Scene, cx: number, cz: number): void {
  const g = new THREE.Group();
  g.add(box(1.8, 0.8, 0.7, M.wood()));
  g.add(box(1.85, 0.05, 0.75, colMat('#3a2a1e'), 0, 0.8, 0));
  g.add(box(0.5, 0.06, 0.36, colMat('#d8d0bc'), -0.3, 0.85, 0)); // the ledger
  g.add(box(0.34, 0.22, 0.26, colMat('#4a3a2a', { metalness: 0.4 }), 0.45, 0.85, -0.05)); // the cash box
  g.add(beam(new THREE.Vector3(0.75, 0.85, 0.1), new THREE.Vector3(0.75, 1.3, 0.1), 0.03, colMat('#a08030', { metalness: 0.6 })));
  for (const dx of [-0.15, 0.15]) g.add(cyl(0.1, 0.1, 0.02, colMat('#a08030', { metalness: 0.6 }), 0.75 + dx, 1.12, 0.1, 10)); // brass scales
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - 0.95, cz - 0.38, cx + 0.95, cz + 0.38);
}

function cardTable(scene: THREE.Scene, cx: number, cz: number): void {
  const g = new THREE.Group();
  g.add(cyl(0.45, 0.45, 0.06, colMat('#2f5a3a', { roughness: 1 }), 0, 0.68, 0, 16));
  g.add(cyl(0.08, 0.12, 0.68, M.wood(), 0, 0, 0, 8));
  const r = rng(77);
  for (let i = 0; i < 6; i++) {
    const c = box(0.1, 0.005, 0.14, colMat('#ece6da'), (r() - 0.5) * 0.6, 0.74, (r() - 0.5) * 0.5);
    c.rotation.y = r() * 3;
    g.add(c);
  }
  for (const [x, z] of [[-0.75, 0.1], [0.75, -0.1]] as Array<[number, number]>) g.add(box(0.4, 0.4, 0.4, M.wood(), x, 0, z));
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - 0.55, cz - 0.45, cx + 0.55, cz + 0.45);
}

function lantern(scene: THREE.Scene, x: number, z: number, night: boolean): void {
  const g = new THREE.Group();
  g.add(box(0.1, 2.4, 0.1, M.wood()));
  g.add(box(0.5, 0.06, 0.06, M.wood(), 0.22, 2.35, 0));
  g.add(box(0.2, 0.28, 0.2, colMat('#2a2420', { metalness: 0.4 }), 0.42, 2.0, 0));
  const flame = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.14), glow('#ffc070', night ? 5 : 1.2));
  flame.position.set(0.42, 2.14, 0);
  g.add(flame);
  if (night) {
    const l = new THREE.PointLight('#ffb050', 7, 7, 1.7);
    l.position.set(0.42, 2.0, 0.2);
    g.add(l);
  }
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.12, z - 0.12, x + 0.12, z + 0.12);
}

/** Bunting strung across the market: little pennants on a sagging line. */
function bunting(scene: THREE.Scene, a: THREE.Vector3, b: THREE.Vector3): void {
  const mid = a.clone().lerp(b, 0.5);
  mid.y -= 0.4;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.01, 3, false), colMat('#2a2420')));
  const cols = ['#b8402e', '#c9a24a', '#3f6a8a', '#e8e2d2', '#5e8a3c'];
  for (let i = 1; i < 14; i++) {
    const p = curve.getPoint(i / 14);
    const f = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.26, 3), colMat(cols[i % cols.length]!, { side: THREE.DoubleSide }));
    f.rotation.x = Math.PI;
    f.position.copy(p).add(new THREE.Vector3(0, -0.15, 0));
    scene.add(f);
  }
}

function gateArch(scene: THREE.Scene, x: number, z: number, text: string): void {
  const g = new THREE.Group();
  for (const dx of [-1.9, 1.9]) g.add(box(0.2, 3.1, 0.2, M.wood(), dx, 0, 0));
  g.add(box(4.2, 0.22, 0.22, M.wood(), 0, 3.0, 0));
  const face = new THREE.MeshStandardMaterial({ map: textTexture(text, { w: 96, h: 16, bg: '#4a3a2a', fg: '#e8d9a8', font: 'bold 11px monospace', worn: 0.25, seed: 3 }), roughness: 1 });
  const board = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.45, 0.06), [M.wood(), M.wood(), M.wood(), M.wood(), face, face]);
  board.position.set(0, 2.55, 0);
  g.add(shade(board));
  vines(g, -1.95, 0, 0.12, 0.5, 2.0);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  for (const dx of [-1.9, 1.9]) addSolid(x + dx - 0.15, z - 0.15, x + dx + 0.15, z + 0.15);
}

// ================================================================ build

export const buildRailhead: AreaBuilder = async (scene, night) => {
  setWorld(WORLD);
  const data = await loadMap('railhead');
  const built: Built[] = [
    roundhouse(scene, 8.0, 8.3),
    turntable(scene, 8.5, 16.0, 1.75),
    waterTower(scene, 13.6, 7.6),
    switchHouse(scene, 30.6, 6.1, night),
    semaphore(scene, 15.6, 8.4, night),
    semaphore(scene, 37.6, 8.4, night),
    gantry(scene, 26.2, 8.25, 19.75, night),
  ];
  bayRails(scene, [new THREE.Vector2(5.6, 9.8), new THREE.Vector2(8.0, 10.9), new THREE.Vector2(10.4, 9.8)], new THREE.Vector2(8.5, 16.0));
  // the four yard tracks (row 9 starts clear of the roundhouse; the rest meet the turntable)
  railLine(scene, 9.5, 12.2, 40.6);
  for (const z of [12.5, 15.5, 18.5]) railLine(scene, z, 10.3, 40.6);
  boxcar(scene, 22.5, 9.5);
  boxcar(scene, 32.5, 12.5);
  boxcar(scene, 18.5, 18.5);
  bufferStop(scene, 40.9, 9.5, night);
  bufferStop(scene, 40.9, 15.5, night);
  platform(scene, 27.6, 13.9);
  platform(scene, 27.6, 16.95);
  switchLever(scene, 19.5, 11.6, 0.5);
  switchLever(scene, 30.5, 14.6, -0.45);
  coalPile(scene, 34.6, 10.4);
  crates(scene, 13.5, 19.6);
  // the market
  stall(scene, 35.4, 22.0, ['#b8402e', '#e8e2d2'], 'supply', 'SUPPLY');
  stall(scene, 39.6, 22.4, ['#c9a24a', '#e8e2d2'], 'salt', 'SALT');
  stall(scene, 41.2, 19.9, ['#3f6a8a', '#e8e2d2'], 'scrap', 'SCRAP');
  brokerDesk(scene, 37.5, 25.6);
  cardTable(scene, 39.7, 24.9);
  crates(scene, 33.0, 25.6);
  bunting(scene, new THREE.Vector3(34.0, 2.6, 20.8), new THREE.Vector3(42.0, 2.6, 21.4));
  bunting(scene, new THREE.Vector3(34.2, 2.5, 23.6), new THREE.Vector3(41.8, 2.5, 24.0));
  for (const [x, z] of [[24.6, 21.6], [11.6, 21.6], [36.6, 21.0], [20.2, 24.6], [17.5, 13.6]] as Array<[number, number]>) lantern(scene, x, z, night);
  gateArch(scene, 22.5, 1.2, 'CISTERN  ^');
  gateArch(scene, 22.5, 26.4, 'RAILHEAD');
  fence(scene, [[2.5, 21.3], [8.6, 21.3]], 8);
  fence(scene, [[33.6, 7.4], [42.4, 7.4]], 9);

  // a frame of trees outside the colony fence; scrub inside the corners
  const r = rng(909);
  let seed = 5000;
  const tree = (o: THREE.Object3D, s = 0.25): void => { scene.add(o); addSolid(o.position.x - s, o.position.z - s, o.position.x + s, o.position.z + s); };
  for (let x = -4; x < COLS + 4; x += 1.4 + r() * 1.2) {
    if (!(x > 20.0 && x < 25.0)) scene.add(cottonwood(x, -0.8 - r() * 2.2, 1.1 + r() * 0.4, seed++));
    if (!(x > 20.0 && x < 25.0) && r() > 0.3) scene.add(bush(x, ROWS + 0.2 + r() * 0.8, 1.0 + r() * 0.4, seed++, r() > 0.5));
  }
  for (let z = 0; z < ROWS + 2; z += 1.5 + r() * 1.2) {
    scene.add(cottonwood(-1.0 - r() * 2.5, z, 1.0 + r() * 0.4, seed++));
    scene.add(cottonwood(COLS + 1.0 + r() * 2.5, z, 1.0 + r() * 0.4, seed++));
  }
  for (const [x, z, k] of [[3.0, 12.5, 'm'], [16.5, 4.0, 'c'], [29.0, 3.0, 'm'], [42.2, 13.0, 'c'], [3.2, 26.0, 'm'], [12.0, 24.6, 'c'], [30.5, 22.5, 'm']] as Array<[number, number, string]>)
    tree(k === 'c' ? cottonwood(x, z, 1.0, seed++) : mesquite(x, z, 1.1, seed++));
  for (let i = 0; i < 18; i++) {
    const x = 2 + r() * (COLS - 4), z = 2 + r() * (ROWS - 4);
    const c = cell(Math.floor(x), Math.floor(z));
    if (c !== 'e' && c !== 'g') continue;
    tree(bush(x, z, 0.5 + r() * 0.4, seed++, r() > 0.5), 0.15);
  }
  for (const [x, z, s] of [[27.0, 21.5, 1], [6.5, 23.0, 2], [33.0, 17.2, 3]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);

  buildGround(scene);
  const grass = buildGrass(scene);
  const dust = motes(scene, night);

  // Captain Holt stands at the relay he's meant to be guarding — "off", a half-second late
  const holt = { char: 'holt', col: 32, row: 7, name: 'Captain Holt', facing: 's',
    lines: ['A Garrison officer stands at the relay, eyes glassy. "Captain Holt. This is a... lawful checkpoint. Stand— stand down." His words land a half-second late.'] };
  const sign = data.signs?.[0];
  return {
    id: 'railhead',
    title: 'RAILHEAD',
    sub: 'Colony 1 · the rail junction',
    mood: night ? NIGHT : DAY,
    sky: true,
    cam: { x0: 8.2, x1: COLS - 8.2, z0: 4.4, z1: ROWS - 4.6 },
    blocked: (x, z, rad) => blocked(x, z, rad),
    ground: (x, z) => heightAt(x, z),
    wild: (x, z) => cell(Math.floor(x), Math.floor(z)) === 'T',
    zone: 'railhead-yard',
    spawns: {
      start: { x: 22.5, z: 26.0, face: 'N' },
      south: { x: 22.5, z: 26.9, face: 'N' },
      north: { x: 22.5, z: 1.8, face: 'S' },
    },
    triggers: [
      { x0: 20.6, z0: 27.6, x1: 24.4, z1: 30, go: { to: 'farmroad', spawn: 'north' } },
      // the Warden's gate: open for now (Marrow's trial isn't built yet) — the road north runs to the 45 Scar
      { x0: 20.6, z0: -2, x1: 24.4, z1: 0.5, go: { to: 'scar', spawn: 'south' } },
    ],
    things: [
      ...(sign ? [{ x: sign.col + 0.5, z: sign.row + 0.5, height: 1.6, label: 'Read', say: { name: 'Sign', lines: [sign.text] } }] : []),
      { x: 30.6, z: 7.4, height: 3.6, label: 'Relay', reach: 1.9, say: { lines: ['The switch-house relay spits sparks where its feed line has been cut clean through.'] } },
      { x: 35.4, z: 22.9, height: 1.4, label: 'Supply', say: { name: 'Counter-clerk Hettie', lines: ['Railhead supply. Kits, nodes, a D-FIB if you can spare the credits. Salvage bought here.'] } },
    ],
    npcs: [...castOf(data), holt],
    update(t, focus) {
      grass(t);
      swayTrees(t);
      for (const b of built) b.update?.(t);
      dust(t, focus);
    },
  };
};
