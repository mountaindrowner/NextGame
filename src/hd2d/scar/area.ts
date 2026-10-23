import * as THREE from 'three';
import { fbm, rng, vnoise } from '../noise';
import { textTexture } from '../textures';
import { box, cyl, beam, boxGeo, cylGeo, colMat, shade, planeGeo } from '../geo';
import { setWorld, cell, heightAt, hitsSolid, addSolid, type TileWorld } from '../world';
import { buildGround, buildGrass } from '../terrain';
import { M, vines, windowAt, slab, type Built } from '../field/buildings';
import { cottonwood, mesquite, bush, tumbleweed, motes, swayTrees, blobGeo, leafMat } from '../field/props';
import { roadSign } from '../farmroad/area';
import { DAY, NIGHT } from '../mood';
import type { AreaBuilder } from '../area';

/**
 * THE 45 SCAR — route (Critical Path §4): a ruined interstate, miles of dead
 * cars. Layout is [PROPOSAL] (no map existed): a six-lane highway running
 * north, jammed with wrecks and split by a jersey-barrier median; a collapsed
 * overpass across it; the rental lot to the west and Mobile Ohm Park to the
 * east, where vehicle Ohms gather. Visible wild vehicle Ohms roam the lot,
 * the park and the shoulder — the first vehicle catch lives here.
 */

const COLS = 52, ROWS = 34;
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'g'));
const inb = (x: number, z: number): boolean => x >= 0 && z >= 0 && x < COLS && z < ROWS;
const rect = (x0: number, z0: number, w: number, h: number, c: string): void => {
  for (let z = z0; z < z0 + h; z++) for (let x = x0; x < x0 + w; x++) if (inb(x, z)) MAP[z]![x] = c;
};
for (let x = 0; x < COLS; x++) { MAP[0]![x] = '#'; MAP[ROWS - 1]![x] = '#'; }
for (let z = 0; z < ROWS; z++) { MAP[z]![0] = '#'; MAP[z]![COLS - 1] = '#'; }
rect(17, 0, 1, ROWS, 's'); rect(34, 0, 1, ROWS, 's'); // shoulders
rect(18, 0, 7, ROWS, 'h'); // southbound
rect(25, 0, 2, ROWS, 'm'); // median
rect(27, 0, 7, ROWS, 'h'); // northbound
rect(3, 15, 12, 13, 'p'); // the rental lot
rect(15, 20, 2, 3, 'p'); // its off-ramp to the highway
rect(4, 25, 10, 2, 'T'); // grass up through the back row
rect(36, 3, 14, 15, 'c'); // Mobile Ohm Park
rect(35, 9, 1, 2, 'd'); // its gravel spur off the highway
rect(37, 9, 7, 3, 'T');
rect(44, 15, 5, 3, 'T');
rect(2, 3, 10, 7, 'T'); // wild prairie north-west
rect(2, 29, 12, 3, 'T');
rect(38, 21, 10, 6, 'T');

const get = (x: number, z: number): string => (inb(x, z) ? MAP[z]![x]! : '#');
type RGB = [number, number, number];
const H = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const ASPH = ['#3e3c39', '#4a4844', '#55524d', '#363431'].map(H);
const pick = (pal: RGB[], k: number): RGB => pal[Math.min(pal.length - 1, Math.max(0, Math.floor(k * pal.length)))]!;

function paint(g: string, x: number, z: number, fine: number): RGB | undefined {
  const n = fbm(x * 0.45, z * 0.45, 81, 3);
  const crack = Math.abs(fbm(x * 0.5, z * 0.5, 82, 3) - 0.5) < 0.014;
  if (g === 'h') {
    let c = pick(ASPH, n * 0.8 + fine * 0.3);
    const dash = Math.floor(z * 0.5) % 2 === 0 && fbm(x, z * 0.3, 83, 2) > 0.3; // worn dashes
    for (const lx of [20.33, 22.67, 29.33, 31.67]) if (Math.abs(x - lx) < 0.05 && dash) c = H('#c8c4b4');
    if (Math.abs(x - 18.12) < 0.05 || Math.abs(x - 33.88) < 0.05) c = H('#b8b4a4');
    if (Math.abs(x - 24.88) < 0.05 || Math.abs(x - 27.12) < 0.05) c = H('#b89a44');
    if (crack) c = vnoise(x * 3, z * 3, 84) > 0.5 ? H('#5e8a32') : H('#262422');
    if (fbm(x * 0.3, z * 0.3, 85, 2) > 0.76) c = fine > 0.5 ? H('#5a4a38') : H('#4a3c2e'); // potholes
    return c;
  }
  if (g === 's') return fine > 0.8 ? H('#7a7466') : crack || fine < 0.15 ? H('#5e8a32') : pick(ASPH, 0.4 + n * 0.6).map((v) => v + 14) as RGB;
  if (g === 'm') return pick(['#4f7a2c', '#5e8a32', '#6a7a3c', '#3d6a26'].map(H), n * 0.7 + fine * 0.4);
  if (g === 'p') {
    let c = pick(ASPH, n * 0.6 + fine * 0.3).map((v) => v + 12) as RGB;
    const stall = Math.abs(((x - 3) % 1.6 + 1.6) % 1.6) < 0.06 && [16.5, 19.5, 22.5].some((r) => Math.abs(z - r) < 1.0);
    if (stall && fbm(x, z, 86, 2) > 0.35) c = H('#c8c4b4');
    if (crack) c = H('#5e8a32');
    return c;
  }
  if (g === 'c') return fine > 0.95 ? H('#b0a898') : pick(['#8a7e6a', '#9a8e78', '#7a6e5a'].map(H), n * 0.7 + fine * 0.4);
  if (g === 'd') return pick(['#6a5238', '#7a5e40'].map(H), n + fine * 0.2);
  return undefined;
}

function height(x: number, z: number): number {
  const g = get(Math.floor(x), Math.floor(z));
  let h = (fbm(x * 0.08, z * 0.08, 87, 3) - 0.5) * 0.4;
  if ('hsmp'.includes(g)) h *= 0.15; // the roadbed and the lot are graded flat
  const edge = Math.min(x, COLS - x);
  if (edge < 1.5) h += (1.5 - edge) * 0.5;
  if (z < 1.5 && !(x > 16.6 && x < 35.4)) h += (1.5 - z) * 0.5;
  if (z > ROWS - 1.5 && !(x > 16.6 && x < 35.4)) h += (z - (ROWS - 1.5)) * 0.5;
  return h;
}

const WORLD: TileWorld = {
  cols: COLS, rows: ROWS, cell: get, height, seed: 4545, paint,
  openings: [{ side: 'n', x0: 16.6, x1: 35.4 }, { side: 's', x0: 16.6, x1: 35.4 }],
};

function blocked(x: number, z: number, r: number): boolean {
  if (x - r < 0.15 || x + r > COLS - 0.15) return true;
  if (z < -0.2 || z > ROWS + 0.2) return true;
  if ((z - r < 0.05 || z + r > ROWS - 0.05) && !(x > 17.2 && x < 34.8)) return true;
  for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r], [0, 0]] as Array<[number, number]>) {
    const zz = z + dz;
    if (zz < 0 || zz >= ROWS) continue;
    if (cell(Math.floor(x + dx), Math.floor(zz)) === '#') return true;
  }
  return hitsSolid(x, z, r);
}

// =============================================================== wrecks

type Kind = 'sedan' | 'hatch' | 'pickup' | 'van' | 'semi';
const PAINT = ['#6a7a86', '#8a3a2e', '#3e5a4a', '#c8c0aa', '#2e3a4a', '#7a6a4a', '#5a5a5e', '#8a7a3a'];

/** A dead car: faded paint over rust, flat tyres, a door hanging, glass gone
 *  or grimed, and something growing out of it. Lengths run along z. */
function wreck(scene: THREE.Scene, x: number, z: number, rot: number, kind: Kind, seed: number, fleet?: string): void {
  const r = rng(seed);
  const g = new THREE.Group();
  const paint = colMat(fleet ?? PAINT[Math.floor(r() * PAINT.length)]!, { roughness: 0.85, metalness: 0.25 });
  const rust = M.tank();
  const glass = colMat('#1e262c', { roughness: 0.2, metalness: 0.1 });
  const tyre = colMat('#1a1918', { roughness: 1 });
  const dims = { sedan: [1.0, 2.1, 0.5, 0.42], hatch: [0.95, 1.75, 0.5, 0.45], pickup: [1.05, 2.3, 0.6, 0.48], van: [1.05, 2.2, 1.15, 0.0], semi: [1.15, 1.6, 1.25, 0.0] } as const;
  const [w, l, bh, ch] = dims[kind];
  const y0 = 0.22;
  if (kind === 'van' || kind === 'semi') {
    // boxy bodies: one tall block, a sloped nose, a dark windscreen band
    g.add(box(w, bh, l, paint, 0, y0, 0));
    g.add(box(w - 0.04, 0.4, 0.05, glass, 0, y0 + bh - 0.55, l / 2 + 0.005));
    if (kind === 'semi') g.add(box(0.12, 0.9, 0.12, M.steel(), w / 2 - 0.05, y0 + bh, -0.5)); // exhaust stack
  } else {
    // a real car profile in the side plane: bumper, hood, slanted windscreen, roof, rear glass, trunk
    const lh = l / 2, hood = kind === 'hatch' ? 0.35 : kind === 'pickup' ? 0.55 : 0.5;
    const roofF = kind === 'pickup' ? lh - hood - 0.35 : lh - hood - 0.3, roofB = kind === 'hatch' ? -lh + 0.12 : kind === 'pickup' ? -0.05 : -lh + 0.45;
    const prof: Array<[number, number]> = [
      [-lh, y0 + 0.05], [lh, y0 + 0.05], [lh, y0 + bh * 0.85], [lh - hood, y0 + bh],
      [roofF, y0 + bh + ch], [roofB, y0 + bh + ch], [kind === 'hatch' ? -lh : roofB - 0.3, y0 + bh], [-lh, y0 + bh * 0.9],
    ];
    const shape = new THREE.Shape(prof.map(([zz, yy]) => new THREE.Vector2(zz, yy)));
    const body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: false }), paint);
    body.geometry.translate(0, 0, -w / 2);
    body.rotation.y = -Math.PI / 2;
    g.add(shade(body));
    // glass on both flanks and the windscreen, set just proud of the body
    const gl: Array<[number, number]> = [[lh - hood - 0.04, y0 + bh + 0.03], [roofF + 0.02, y0 + bh + ch - 0.06], [roofB + 0.02, y0 + bh + ch - 0.06], [kind === 'hatch' ? -lh + 0.06 : roofB - 0.25, y0 + bh + 0.03]];
    const gs = new THREE.Shape(gl.map(([zz, yy]) => new THREE.Vector2(zz, yy)));
    const glassMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(gs, { depth: w + 0.02, bevelEnabled: false }), glass);
    glassMesh.geometry.translate(0, 0, -(w + 0.02) / 2);
    glassMesh.rotation.y = -Math.PI / 2;
    g.add(glassMesh);
    if (kind === 'pickup') g.add(box(w - 0.08, 0.06, -roofB + lh - 0.4, rust, 0, y0 + bh - 0.1, (roofB - 0.3 - lh) / 2 - 0.05)); // rusted bed floor
    // headlights and the rust that's eating the sills
    for (const sx of [-w / 2 + 0.16, w / 2 - 0.16]) g.add(box(0.16, 0.09, 0.03, colMat('#b8b4a0', { roughness: 0.3 }), sx, y0 + bh * 0.62, lh + 0.005));
    g.add(box(w + 0.01, 0.1, l * 0.7, rust, 0, y0 + 0.05, (r() - 0.5) * 0.3));
  }
  for (const sz of [-l / 2 + 0.38, l / 2 - 0.38]) for (const sx of [-w / 2, w / 2]) {
    const t = new THREE.Mesh(cylGeo(0.24, 0.24, 0.16, 10), tyre);
    t.rotation.z = Math.PI / 2;
    t.position.set(sx, 0.2 - (r() < 0.4 ? 0.06 : 0), sz); // flats
    g.add(shade(t));
  }
  // a door left open on one side
  if (kind !== 'semi' && r() < 0.45) {
    const door = box(0.05, bh * 0.85, 0.75, paint, 0, 0, 0);
    const piv = new THREE.Group();
    piv.position.set(w / 2, 0.32, -0.1);
    door.position.z = 0.37;
    piv.add(door);
    piv.rotation.y = 0.9;
    g.add(piv);
  }
  // life taking it back: a sapling through the roof or vines down the side
  if (r() < 0.12) {
    // a sapling rooted in the cabin, its trunk up through the sunroof
    g.add(box(0.06, 0.55, 0.06, M.wood(), 0.1, 0.22 + bh + ch - 0.1, -0.1));
    const sap = new THREE.Mesh(blobGeo(0.3 + r() * 0.12, seed), leafMat('#ffffff'));
    sap.position.set(0.1, 0.22 + bh + ch + 0.55, -0.1);
    g.add(shade(sap));
  } else if (r() < 0.55) {
    vines(g, w / 2 + 0.03, 0.2, 0, l * 0.6, 0.6, Math.PI / 2);
  }
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rot;
  scene.add(g);
  // collision: the rotated footprint's bounding box (a touch generous on diagonals)
  const c = Math.abs(Math.cos(rot)), s = Math.abs(Math.sin(rot));
  const hx = (w * c + l * s) / 2, hz = (w * s + l * c) / 2;
  addSolid(x - hx, z - hz, x + hx, z + hz);
}

/** A semi: the cab plus a long box trailer, here jackknifed across the lanes. */
function semi(scene: THREE.Scene, x: number, z: number, cabRot: number, trailerRot: number): void {
  wreck(scene, x, z, cabRot, 'semi', 4501);
  const g = new THREE.Group();
  const L = 6.4;
  g.add(box(1.25, 1.7, L, colMat('#d8d0bc', { roughness: 0.9, metalness: 0.2 }), 0, 0.5, 0));
  g.add(box(1.27, 0.5, L * 0.5, M.tank(), 0, 1.6, -L * 0.2));
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 0.6), new THREE.MeshStandardMaterial({ map: textTexture('LONE STAR FREIGHT', { w: 120, h: 16, fg: '#7a2a22', font: 'bold 12px monospace', worn: 0.45, seed: 4 }), transparent: true, alphaTest: 0.4, roughness: 1 }));
  sign.rotation.y = Math.PI / 2;
  sign.position.set(0.64, 1.45, 0);
  g.add(sign);
  for (const sz of [L / 2 - 0.6, L / 2 - 1.3]) for (const sx of [-0.6, 0.6]) {
    const t = new THREE.Mesh(cylGeo(0.3, 0.3, 0.2, 10), colMat('#1a1918'));
    t.rotation.z = Math.PI / 2;
    t.position.set(sx, 0.28, sz);
    g.add(shade(t));
  }
  vines(g, 0.65, 0.3, 1.2, 2.6, 1.3, Math.PI / 2);
  const off = new THREE.Vector3(0, 0, -(1.6 / 2 + L / 2 + 0.2)).applyAxisAngle(new THREE.Vector3(0, 1, 0), cabRot);
  const tx = x + off.x * 0.6 + Math.sin(trailerRot) * -L * 0.35, tz = z + off.z * 0.6 + Math.cos(trailerRot) * -L * 0.35;
  g.position.set(tx, heightAt(tx, tz), tz);
  g.rotation.y = trailerRot;
  scene.add(g);
  // the trailer's footprint as a run of boxes along its length
  for (let k = -2; k <= 2; k++) {
    const px = tx + Math.sin(trailerRot) * k * (L / 5), pz = tz + Math.cos(trailerRot) * k * (L / 5);
    addSolid(px - 0.7, pz - 0.7, px + 0.7, pz + 0.7);
  }
}

function jersey(scene: THREE.Scene, z0: number, z1: number, gaps: Array<[number, number]>): void {
  const mat = M.concrete();
  for (let z = z0; z < z1; z += 1.25) {
    if (gaps.some(([a, b]) => z + 1.2 > a && z < b)) continue;
    const g = new THREE.Group();
    g.add(box(0.55, 0.3, 1.2, mat, 0, 0, 0));
    g.add(box(0.28, 0.45, 1.2, mat, 0, 0.3, 0));
    g.position.set(26.0, heightAt(26, z), z + 0.6);
    g.rotation.y = (vnoise(z, 1, 9) - 0.5) * 0.08;
    scene.add(shade(g));
    addSolid(25.7, z, 26.3, z + 1.2);
  }
}

/** The overpass that crossed the interstate — its middle span lies on the road. */
function overpass(scene: THREE.Scene, z: number): void {
  const deck = M.concrete();
  const g = new THREE.Group();
  const spans: Array<[number, number]> = [[6, 17.2], [34.8, 37.6]];
  for (const [x0, x1] of spans) {
    g.add(box(x1 - x0, 0.55, 2.2, deck, (x0 + x1) / 2, 3.9, z));
    g.add(box(x1 - x0, 0.45, 0.15, deck, (x0 + x1) / 2, 4.45, z - 1.02));
    g.add(box(x1 - x0, 0.45, 0.15, deck, (x0 + x1) / 2, 4.45, z + 1.02));
  }
  // the pillars, and the snapped ends of rebar where the span let go
  for (const px of [8, 12, 16.2, 35.8]) for (const dz of [-0.6, 0.6]) {
    g.add(cyl(0.32, 0.38, 3.9, deck, px, 0, z + dz, 12));
    addSolid(px - 0.4, z + dz - 0.4, px + 0.4, z + dz + 0.4);
  }
  const rebar = colMat('#5a3a26', { metalness: 0.5 });
  for (const ex of [17.2, 34.8, 37.6]) for (let k = 0; k < 6; k++) g.add(beam(new THREE.Vector3(ex, 3.95, z - 0.9 + k * 0.36), new THREE.Vector3(ex + (ex === 34.8 ? -0.6 : 0.6), 3.4 - k * 0.1, z - 0.9 + k * 0.36), 0.03, rebar));
  scene.add(g);
  // the fallen span, broken in three across the lanes
  const chunks: Array<[number, number, number, number]> = [[19.6, z - 0.4, 0.18, 0.06], [23.0, z + 0.5, -0.12, -0.08], [30.4, z - 0.2, 0.08, 0.1]];
  for (const [cx, cz, rz, ry] of chunks) {
    const c = box(3.0, 0.5, 2.0, deck, 0, 0, 0);
    c.position.set(cx, heightAt(cx, cz) + 0.05, cz);
    c.rotation.set(0, ry, rz);
    scene.add(c);
    addSolid(cx - 1.45, cz - 1.0, cx + 1.45, cz + 1.0);
  }
  for (let i = 0; i < 18; i++) {
    const r = rng(300 + i);
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12 + r() * 0.2, 0), deck);
    s.position.set(18 + r() * 16, 0.08, z + (r() - 0.5) * 3.2);
    s.rotation.set(r() * 3, r() * 3, r() * 3);
    scene.add(shade(s));
  }
}

function signGantry(scene: THREE.Scene, z: number): void {
  const g = new THREE.Group();
  const st = M.steel();
  for (const x of [16.8, 35.2]) g.add(box(0.25, 5.2, 0.25, st, x, 0, z));
  g.add(box(18.6, 0.3, 0.3, st, 26, 5.0, z));
  g.add(box(18.6, 0.18, 0.18, st, 26, 4.5, z));
  const face = (text: string): THREE.MeshStandardMaterial => new THREE.MeshStandardMaterial({ map: textTexture(text, { w: 96, h: 32, bg: '#2f5a3a', fg: '#e8eadc', font: 'bold 13px monospace', worn: 0.2, seed: text.length }), roughness: 0.8 });
  for (const [x, text] of [[21.5, '45  NORTH'], [30.5, 'CISTERN']] as Array<[number, string]>) {
    const s = new THREE.Mesh(boxGeo(4.2, 1.4, 0.06), [st, st, st, st, face(text), st]);
    s.position.set(x, 4.4, z + 0.18);
    s.rotation.z = x < 26 ? -0.04 : 0.02;
    g.add(shade(s));
  }
  vines(g, 16.9, 0, z + 0.14, 0.5, 3.4);
  g.position.y = 0;
  scene.add(g);
  for (const x of [16.8, 35.2]) addSolid(x - 0.2, z - 0.2, x + 0.2, z + 0.2);
}

// ========================================================= the rental lot

function lightPole(scene: THREE.Scene, x: number, z: number, lean: number): void {
  const g = new THREE.Group();
  g.add(box(0.14, 5.0, 0.14, M.steel()));
  g.add(box(1.2, 0.08, 0.1, M.steel(), 0.5, 4.95, 0));
  g.add(box(0.5, 0.12, 0.3, colMat('#3a3a3a'), 1.0, 4.85, 0));
  g.position.set(x, heightAt(x, z), z);
  g.rotation.z = lean;
  scene.add(shade(g));
  addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
}

function booth(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  g.add(box(1.8, 2.1, 1.4, M.white()));
  windowAt(g, 0, 1.35, 0.71, 1.3, 0.7);
  g.add(slab(-0.9, 2.25, 0.9, 2.15, 2.0, M.tin()).rotateY(Math.PI / 2));
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.4), new THREE.MeshStandardMaterial({ map: textTexture('RENTAL RETURN', { w: 96, h: 18, bg: '#2a5a6a', fg: '#f0e8c8', font: 'bold 11px monospace', worn: 0.3, seed: 6 }), roughness: 0.8 }));
  sign.position.set(0, 2.42, 0.72);
  g.add(sign);
  g.add(box(0.75, 0.05, 0.3, colMat('#c8c0aa'), 0, 0.95, 0.85)); // the key-drop counter
  vines(g, -0.9, 0, 0.72, 0.9, 1.8);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.95, z - 0.75, x + 0.95, z + 1.0);
}

function chainFence(scene: THREE.Scene, pts: Array<[number, number]>): void {
  const p = new THREE.MeshStandardMaterial({ color: '#7a7e82', transparent: true, opacity: 0.55, side: THREE.DoubleSide, metalness: 0.4, roughness: 0.6, depthWrite: false });
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i]!, [bx, bz] = pts[i + 1]!;
    const len = Math.hypot(bx - ax, bz - az);
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(len, 1.6), p);
    panel.position.set((ax + bx) / 2, 0.8, (az + bz) / 2);
    panel.rotation.y = -Math.atan2(bz - az, bx - ax);
    scene.add(panel);
    for (let k = 0; k <= Math.ceil(len / 2.4); k++) {
      const t = k / Math.ceil(len / 2.4);
      scene.add(box(0.06, 1.7, 0.06, M.steel(), ax + (bx - ax) * t, 0, az + (bz - az) * t));
    }
    const n = Math.ceil(len / 0.6);
    for (let k = 0; k < n; k++) {
      const t0 = k / n, t1 = (k + 1) / n;
      const sx = ax + (bx - ax) * t0, sz = az + (bz - az) * t0, ex = ax + (bx - ax) * t1, ez = az + (bz - az) * t1;
      addSolid(Math.min(sx, ex) - 0.08, Math.min(sz, ez) - 0.08, Math.max(sx, ex) + 0.08, Math.max(sz, ez) + 0.08);
    }
  }
}

// ======================================================= Mobile Ohm Park

const TRAILER = ['#d8d0bc', '#c8d0c8', '#d8c8a8', '#b8c4cc'];
function trailer(scene: THREE.Scene, x: number, z: number, rot: number, seed: number): Built {
  const r = rng(seed);
  const g = new THREE.Group();
  const L = 4.4, D = 1.7, Hh = 1.7;
  const skin = colMat(TRAILER[Math.floor(r() * TRAILER.length)]!, { roughness: 0.8, metalness: 0.2 });
  g.add(box(L, 0.4, D - 0.1, M.concrete(), 0, 0, 0)); // cinder-block skirt
  g.add(box(L, Hh, D, skin, 0, 0.4, 0));
  g.add(box(L + 0.05, 0.22, D + 0.05, colMat('#8a3a2e', { roughness: 0.8 }), 0, 0.4 + Hh * 0.45, 0)); // the stripe
  g.add(box(L + 0.1, 0.1, D + 0.15, M.tin(), 0, 0.4 + Hh, 0));
  const panes: THREE.Mesh[] = [];
  for (const wx of [-1.4, -0.4, 1.4]) panes.push(windowAt(g, wx, 1.45, D / 2 + 0.01, 0.6, 0.45, 0, r() < 0.25 ? 'boarded' : 'glass'));
  g.add(box(0.6, 1.25, 0.05, M.wood(), 0.6, 0.4, D / 2 + 0.01)); // the door
  for (let i = 0; i < 2; i++) g.add(box(0.7, 0.2, 0.3, M.concrete(), 0.6, i * 0.2, D / 2 + 0.2 - i * 0.12)); // steps
  // an awning on two poles, a lawn chair under it
  g.add(slab(-0.8, 2.05, 0.8, 1.85, 2.2, colMat(['#3f6a5a', '#8a5a2e', '#5a4a6a'][seed % 3]!, { side: THREE.DoubleSide }), 0.04).rotateY(Math.PI / 2).translateX(-1.4).translateZ(0));
  for (const px of [-2.4, -0.4]) g.add(box(0.05, 1.9, 0.05, M.steel(), px, 0, D / 2 + 0.75));
  if (r() < 0.6) {
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 6, 0, Math.PI * 2, 0, Math.PI / 3), M.steel());
    dish.rotation.x = -1.0;
    dish.position.set(1.5, 0.4 + Hh + 0.35, -0.2);
    g.add(shade(dish));
  }
  vines(g, -L / 2 - 0.02, 0.2, 0, 1.2, 1.2, -Math.PI / 2);
  if (r() < 0.5) vines(g, L / 2 - 0.8, 0.4, D / 2 + 0.02, 1.0, 1.1);
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rot;
  scene.add(g);
  const c = Math.abs(Math.cos(rot)), s = Math.abs(Math.sin(rot));
  addSolid(x - (L * c + D * s) / 2, z - (L * s + D * c) / 2 - 0.1, x + (L * c + D * s) / 2, z + (L * s + D * c) / 2 + 0.35);
  return {};
}

function parkSign(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  for (const dx of [-1.1, 1.1]) g.add(box(0.12, 2.3, 0.12, M.wood(), dx, 0, 0));
  const face = new THREE.MeshStandardMaterial({ map: textTexture('MOBILE OHM PARK', { w: 112, h: 24, bg: '#e8dcc0', fg: '#3a5a8a', font: 'bold 12px monospace', worn: 0.35, seed: 9 }), roughness: 1 });
  const b = new THREE.Mesh(boxGeo(2.6, 0.7, 0.06), [M.wood(), M.wood(), M.wood(), M.wood(), face, M.wood()]);
  b.position.set(0, 1.85, 0.06);
  b.rotation.z = 0.05;
  g.add(shade(b));
  // a little star on top, its bulbs long dead
  const star = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 5), colMat('#c9a24a', { metalness: 0.4 }));
  star.rotation.x = Math.PI / 2;
  star.position.set(1.25, 2.4, 0.06);
  g.add(star);
  vines(g, -1.15, 0, 0.1, 0.5, 1.6);
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = -0.15;
  scene.add(g);
  for (const dx of [-1.1, 1.1]) addSolid(x + dx - 0.12, z - 0.12, x + dx + 0.12, z + 0.12);
}

function parkClutter(scene: THREE.Scene): void {
  // picnic table, grill, propane tanks, a clothesline, a kiddie pool gone green
  const t = new THREE.Group();
  t.add(box(1.6, 0.06, 0.7, M.wood(), 0, 0.72, 0));
  for (const dz of [-0.6, 0.6]) t.add(box(1.6, 0.05, 0.25, M.wood(), 0, 0.42, dz));
  for (const sx of [-0.65, 0.65]) t.add(beam(new THREE.Vector3(sx, 0, -0.6), new THREE.Vector3(sx, 0.72, 0.4), 0.06, M.wood()), beam(new THREE.Vector3(sx, 0, 0.6), new THREE.Vector3(sx, 0.72, -0.4), 0.06, M.wood()));
  t.position.set(43.5, heightAt(43.5, 13.0), 13.0);
  scene.add(shade(t));
  addSolid(42.6, 12.2, 44.4, 13.8);
  scene.add(cyl(0.28, 0.25, 0.6, colMat('#1d1b19', { metalness: 0.4 }), 41.6, 0.4, 7.6, 12));
  scene.add(box(0.05, 0.6, 0.05, M.steel(), 41.6, 0, 7.6));
  addSolid(41.3, 7.3, 41.9, 7.9);
  for (const [x, z] of [[49.0, 5.0], [49.0, 5.7], [49.3, 11.6]] as Array<[number, number]>) {
    scene.add(cyl(0.22, 0.22, 0.75, colMat('#e8e2d2', { metalness: 0.3 }), x, heightAt(x, z), z, 12));
    addSolid(x - 0.25, z - 0.25, x + 0.25, z + 0.25);
  }
  const lineA = new THREE.Vector3(42.6, 1.7, 7.4), lineB = new THREE.Vector3(46.0, 1.7, 7.6);
  for (const p of [lineA, lineB]) { scene.add(box(0.06, 1.7, 0.06, M.wood(), p.x, 0, p.z)); addSolid(p.x - 0.08, p.z - 0.08, p.x + 0.08, p.z + 0.08); }
  scene.add(beam(lineA, lineB, 0.01, colMat('#d8d0bc')));
  for (let i = 0; i < 5; i++) {
    const sh = new THREE.Mesh(planeGeo(0.38, 0.5), colMat(['#8a5a5a', '#e8e2d2', '#3f5a7a', '#c9a24a', '#5e7a4a'][i]!, { side: THREE.DoubleSide, roughness: 1 }));
    sh.position.copy(lineA.clone().lerp(lineB, (i + 0.5) / 5)).add(new THREE.Vector3(0, -0.28, 0));
    sh.rotation.y = 0.06;
    scene.add(sh);
  }
  const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.25, 16, 1, true), colMat('#3a7aa8', { side: THREE.DoubleSide }));
  pool.position.set(38.8, 0.12, 4.6);
  scene.add(pool);
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.78, 16), colMat('#4a6a2e', { roughness: 0.3 }));
  water.rotation.x = -Math.PI / 2;
  water.position.set(38.8, 0.2, 4.6);
  scene.add(water);
  addSolid(38.0, 3.8, 39.6, 5.4);
}

// ================================================================ build

export const buildScar: AreaBuilder = async (scene, night) => {
  setWorld(WORLD);
  const built: Built[] = [];

  // the jam: wrecks strewn up both carriageways, leaving a winding way through
  const SB = [19.4, 21.5, 23.6], NB = [28.4, 30.5, 32.6];
  const jam: Array<[number, number, number, Kind]> = [
    [SB[0]!, 30.5, 0.05, 'sedan'], [SB[2]!, 29.2, -0.1, 'hatch'], [SB[1]!, 26.5, 0.2, 'van'], [SB[0]!, 24.0, -0.15, 'pickup'],
    [SB[2]!, 22.5, 0.4, 'sedan'], [SB[1]!, 19.0, -0.05, 'sedan'], [SB[0]!, 16.0, 0.3, 'hatch'], [SB[2]!, 14.4, -0.2, 'pickup'],
    [SB[1]!, 4.5, 0.1, 'van'], [SB[0]!, 2.2, -0.3, 'sedan'], [SB[2]!, 5.8, 0.15, 'hatch'],
    [NB[1]!, 31.0, 0.0, 'pickup'], [NB[2]!, 27.8, 0.25, 'sedan'], [NB[0]!, 25.0, -0.2, 'hatch'], [NB[2]!, 21.6, 0.05, 'van'],
    [NB[0]!, 15.5, 0.1, 'sedan'], [NB[1]!, 13.2, -0.35, 'hatch'], [NB[2]!, 4.0, 0.2, 'sedan'], [NB[0]!, 2.6, -0.1, 'pickup'], [NB[1]!, 6.4, 0.3, 'van'],
  ];
  jam.forEach(([x, z, rot, k], i) => wreck(scene, x, z, rot, k, 4600 + i));
  semi(scene, 31.0, 18.0, 0.55, 1.15); // jackknifed across the northbound lanes
  jersey(scene, 0, ROWS, [[12.0, 14.6], [24.0, 26.6]]);
  overpass(scene, 9.0);
  signGantry(scene, 28.6);

  // the rental lot: one fleet, one colour, parked in rows and never returned
  const FLEET = '#c8c4b4';
  [16.5, 19.5, 22.5].forEach((z, row) => {
    for (let k = 0; k < 7; k++) {
      if ((row + k) % 4 === 3) continue; // empty stalls
      wreck(scene, 3.8 + k * 1.6, z, Math.PI + (rng(row * 11 + k)() - 0.5) * 0.12, row === 1 && k === 2 ? 'van' : 'hatch', 4700 + row * 10 + k, FLEET);
    }
  });
  booth(scene, 12.8, 26.6);
  for (const [x, z, lean] of [[3.4, 18.0, 0.02], [8.8, 21.0, -0.05], [14.2, 18.0, 0.0], [8.8, 15.4, 0.08]] as Array<[number, number, number]>) lightPole(scene, x, z, lean);
  chainFence(scene, [[2.6, 14.6], [15.4, 14.6], [15.4, 19.6]]);
  chainFence(scene, [[15.4, 23.4], [15.4, 28.4], [2.6, 28.4]]);
  roadSign(scene, 16.4, 23.9, 'RENTAL RETURN');

  // Mobile Ohm Park
  built.push(trailer(scene, 40.2, 5.0, 0, 21), trailer(scene, 46.6, 5.2, 0.05, 22), trailer(scene, 47.0, 11.0, -0.04, 23), trailer(scene, 40.4, 15.2, 0.03, 24));
  parkSign(scene, 36.4, 12.8);
  parkClutter(scene);

  // the prairie on either side, taking it all back
  const r = rng(4545);
  let seed = 6000;
  const tree = (o: THREE.Object3D, s = 0.25): void => { scene.add(o); addSolid(o.position.x - s, o.position.z - s, o.position.x + s, o.position.z + s); };
  for (let z = -2; z < ROWS + 3; z += 1.3 + r() * 1.1) {
    scene.add(cottonwood(-1.0 - r() * 2.4, z, 1.1 + r() * 0.4, seed++));
    scene.add(cottonwood(COLS + 1.0 + r() * 2.4, z, 1.1 + r() * 0.4, seed++));
    tree(r() > 0.4 ? cottonwood(0.8 + r() * 0.6, z, 0.9 + r() * 0.3, seed++) : bush(0.9, z, 1.0, seed++));
    tree(r() > 0.4 ? cottonwood(COLS - 0.8 - r() * 0.6, z, 0.9 + r() * 0.3, seed++) : bush(COLS - 0.9, z, 1.0, seed++));
  }
  for (let x = 0; x < COLS; x += 1.4 + r()) {
    if (x > 16 && x < 36) continue;
    scene.add(cottonwood(x, -0.6 - r() * 2, 1.1 + r() * 0.4, seed++));
    scene.add(bush(x, ROWS + 0.4 + r(), 1.0 + r() * 0.4, seed++, r() > 0.5));
  }
  for (const [x, z, k] of [[13.0, 6.0, 'm'], [6.0, 12.0, 'c'], [38.0, 19.5, 'c'], [49.0, 19.5, 'm'], [44.0, 29.0, 'c'], [7.0, 31.0, 'm'], [35.8, 25.0, 'm'], [16.2, 31.5, 'c']] as Array<[number, number, string]>)
    tree(k === 'c' ? cottonwood(x, z, 1.05, seed++) : mesquite(x, z, 1.1, seed++));
  for (let i = 0; i < 26; i++) {
    const x = 2 + r() * (COLS - 4), z = 2 + r() * (ROWS - 4);
    if (cell(Math.floor(x), Math.floor(z)) !== 'g') continue;
    tree(bush(x, z, 0.5 + r() * 0.45, seed++, r() > 0.5), 0.15);
  }
  for (const [x, z, s] of [[24.0, 11.5, 1], [29.5, 23.0, 2], [10.0, 12.6, 3], [42.0, 20.0, 4]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);

  buildGround(scene);
  const grass = buildGrass(scene);
  const dust = motes(scene, night);

  return {
    id: 'scar',
    title: 'THE 45 SCAR',
    sub: 'Miles of dead cars',
    mood: night ? NIGHT : DAY,
    sky: true,
    cam: { x0: 8.2, x1: COLS - 8.2, z0: 4.4, z1: ROWS - 4.6 },
    blocked: (x, z, rad) => blocked(x, z, rad),
    ground: (x, z) => heightAt(x, z),
    wild: (x, z) => cell(Math.floor(x), Math.floor(z)) === 'T',
    zone: 'scar-wrecks',
    // vehicle Ohms you can see: touch one to fight it (the first vehicle catch lives here)
    roamers: [
      { num: 70, level: 9, x: 8.2, z: 21.0, range: 2.4 }, // Rustbed among the rental fleet
      { num: 73, level: 8, x: 43.0, z: 8.6, range: 2.6 }, // Quadlet in the trailer park
      { num: 75, level: 9, x: 17.4, z: 11.6, range: 2.0 }, // Kartwheel on the shoulder
    ],
    spawns: {
      start: { x: 24.0, z: 32.6, face: 'N' },
      south: { x: 24.0, z: 32.6, face: 'N' },
      north: { x: 24.0, z: 1.6, face: 'S' },
    },
    triggers: [
      { x0: 16.6, z0: 33.4, x1: 35.4, z1: 36, go: { to: 'railhead', spawn: 'north' } },
      { x0: 16.6, z0: -2, x1: 35.4, z1: 0.4, say: { lines: ['The highway runs on north toward the Cistern.'] } },
    ],
    things: [
      { x: 12.8, z: 27.5, height: 2.4, label: 'Look', say: { lines: ['A rental booth, its key-drop still full. Every car in the lot is the same make, the same faded white.'] } },
    ],
    npcs: [],
    update(t, focus) {
      grass(t);
      swayTrees(t);
      for (const b of built) b.update?.(t);
      dust(t, focus);
    },
  };
};
