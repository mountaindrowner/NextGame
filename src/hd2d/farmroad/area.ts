import * as THREE from 'three';
import { fbm, rng } from '../noise';
import { T, textTexture } from '../textures';
import { box, cyl, beam, boxGeo, cylGeo, colMat, texMat, shade, prism } from '../geo';
import { setWorld, cell, heightAt, hitsSolid, addSolid, type TileWorld } from '../world';
import { buildGround, buildGrass } from '../terrain';
import { M, slab, shapeOf, vines, windowAt, put, waterTower, type Built } from '../field/buildings';
import { cottonwood, mesquite, deadTree, bush, tumbleweed, motes, swayTrees, truck } from '../field/props';
import { maskAt } from '../field/layout';
import { DAY, NIGHT } from '../mood';
import { castOf, loadMap, type AreaBuilder } from '../area';

/**
 * The Farm Road — the cracked farm-to-market blacktop north of the Field.
 * Layout 1:1 from tools/gen-farmroad.ts (28×30): the road winds from the
 * Field (south) to the Railhead (north) between tree-line walls, with
 * fence-line tall grass, an abandoned cotton gin, the water-tower lookout,
 * the start of the old rail line, and a one-way ledge across the lower road.
 */

const COLS = 28, ROWS = 30;
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 'g'));
const inb = (x: number, z: number): boolean => x >= 0 && z >= 0 && x < COLS && z < ROWS;
const rect = (x0: number, z0: number, w: number, h: number, c: string): void => {
  for (let z = z0; z < z0 + h; z++) for (let x = x0; x < x0 + w; x++) if (inb(x, z)) MAP[z]![x] = c;
};
for (let z = 0; z < ROWS; z++) { MAP[z]![0] = MAP[z]![1] = MAP[z]![COLS - 1] = MAP[z]![COLS - 2] = '#'; }
for (let x = 0; x < COLS; x++) { MAP[0]![x] = '#'; MAP[ROWS - 1]![x] = '#'; }
rect(12, ROWS - 1, 3, 1, 'd'); // south opening → the Field
rect(12, 22, 3, 8, 'd');
rect(12, 20, 9, 3, 'd'); // bend east
rect(18, 10, 3, 12, 'd');
rect(8, 8, 13, 3, 'd'); // bend west
rect(8, 1, 3, 9, 'd');
rect(8, 0, 3, 1, 'd'); // north opening → Railhead
rect(4, 14, 6, 5, 'T');
rect(20, 14, 5, 6, 'T');
rect(12, 4, 6, 4, 'T');
rect(4, 24, 5, 3, 'T');

const get = (x: number, z: number): string => (inb(x, z) ? MAP[z]![x]! : '#');

/** The ledge: the land steps down along this line. Hop down southbound on the road only. */
const LEDGE_Z = 24.3;
const LEDGE_X0 = 12.15, LEDGE_X1 = 14.85;

function height(x: number, z: number): number {
  let h = (fbm(x * 0.1, z * 0.1, 15, 3) - 0.5) * 0.5;
  h *= 1 - maskAt(get, 'd', x, z) * 0.85;
  // the lower terrace south of the ledge
  h -= THREE.MathUtils.smoothstep(z, LEDGE_Z - 0.05, LEDGE_Z + 0.2) * 0.55;
  // tree-line berms frame the road
  const edge = Math.min(x - 1.2, COLS - 1.2 - x, z, ROWS - z);
  if (edge < 1.4) h += (1.4 - edge) * 0.5;
  if (z < 1.6 && x > 7.6 && x < 11.4) h = Math.min(h, 0.05);
  if (z > ROWS - 1.6 && x > 11.6 && x < 15.4) h = Math.min(h, -0.5);
  return h;
}

const WORLD: TileWorld = {
  cols: COLS, rows: ROWS, cell: get, height, seed: 4202,
  openings: [{ side: 'n', x0: 7.6, x1: 11.4 }, { side: 's', x0: 11.6, x1: 15.4 }],
};

function blocked(x: number, z: number, r: number, fx: number, fz: number): boolean {
  if (x - r < 0.15 || x + r > COLS - 0.15 || z < -0.2) return true;
  if (z - r < 0.05 && !(x > 8.2 && x < 10.8)) return true;
  if (z + r > ROWS - 0.05 && !(x > 12.2 && x < 14.8)) return true;
  for (const [dx, dz] of [[-r, -r], [r, -r], [-r, r], [r, r], [0, 0]] as Array<[number, number]>) {
    const zz = z + dz;
    if (zz < 0 || zz >= ROWS) continue; // the road runs on past the edge
    if (cell(Math.floor(x + dx), Math.floor(zz)) === '#') return true;
  }
  // one-way ledge: never climb back up; hop down only on the road
  if (fz >= LEDGE_Z && z - r * 0.5 < LEDGE_Z) return true;
  if (fz < LEDGE_Z && z + r * 0.5 >= LEDGE_Z && !(x > LEDGE_X0 && x < LEDGE_X1)) return true;
  return hitsSolid(x, z, r);
}

// ================================================================ the gin

/** The abandoned cotton gin: tin gin-house, a taller press tower, lint
 *  cyclones on the roof, the suction arm out over a cotton trailer. */
function cottonGin(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const W = 5.0, D = 3.2, H = 2.8;
  g.add(box(W + 0.12, 0.6, D + 0.12, M.concrete(), 0, -0.55, 0));
  g.add(box(W, H, D, M.tin()));
  // gable roof, ridge along x
  const attic = prism(shapeOf([[-D / 2, H], [D / 2, H], [0, H + 1.0]]), W, M.tin());
  attic.rotation.y = Math.PI / 2;
  g.add(attic);
  const roof = new THREE.Group();
  roof.add(slab(-D / 2 - 0.3, H - 0.15, 0, H + 1.0, W + 0.4, M.tin()));
  roof.add(slab(0, H + 1.0, D / 2 + 0.3, H - 0.15, W + 0.4, M.tin()));
  roof.rotation.y = Math.PI / 2;
  g.add(roof);
  // the press tower at the east end, rising above the roofline
  g.add(box(1.5, 5.2, 1.6, M.tin(), W / 2 - 0.2, 0, -0.4));
  g.add(slab(W / 2 - 1.05, 5.2, W / 2 + 0.65, 5.55, 1.8, M.tin()).translateZ(-0.4));
  windowAt(g, W / 2 - 0.2, 3.7, 0.41, 0.5, 0.5, 0, 'boarded');
  // lint cyclones: inverted cones on legs atop the roof, ducted together
  for (const x of [-1.6, -0.5]) {
    const cone = new THREE.Mesh(cylGeo(0.42, 0.08, 1.1, 14), M.steel());
    cone.position.set(x, H + 1.65, -0.3);
    g.add(shade(cone));
    g.add(cyl(0.42, 0.42, 0.55, M.steel(), x, H + 2.2, -0.3, 14));
    g.add(cyl(0.1, 0.1, 0.5, M.steel(), x, H + 2.75, -0.3, 8));
  }
  g.add(beam(new THREE.Vector3(-1.6, H + 3.15, -0.3), new THREE.Vector3(W / 2 - 0.3, H + 2.6, -0.3), 0.16, M.tank()));
  // the suction arm swung out over the trailer bay
  const arm = beam(new THREE.Vector3(-W / 2 + 0.2, H + 0.4, 0.6), new THREE.Vector3(-W / 2 - 1.5, H - 0.3, 1.6), 0.22, M.tank());
  g.add(arm);
  g.add(cyl(0.14, 0.2, 0.9, M.steel(), -W / 2 - 1.55, H - 1.2, 1.65, 10));
  // doors: a big rolling door (half open) and a man door
  const fz = D / 2 + 0.01;
  g.add(box(1.8, 2.1, 0.04, M.dark(), -0.6, 0, fz));
  g.add(box(1.0, 2.1, 0.08, M.tin(), -1.05, 0, fz + 0.04));
  g.add(box(2.4, 0.08, 0.08, M.steel(), -0.6, 2.12, fz + 0.06));
  g.add(box(0.7, 1.6, 0.05, M.wood(), 1.2, 0, fz));
  // a ghost sign, nearly gone
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.55), new THREE.MeshStandardMaterial({
    map: textTexture('CO-OP GIN', { w: 96, h: 20, fg: '#e8e0cc', font: 'bold 15px monospace', worn: 0.45, seed: 41 }), transparent: true, alphaTest: 0.4, roughness: 1,
  }));
  sign.position.set(-0.3, 2.45, fz + 0.02);
  g.add(sign);
  // the cotton trailer under the arm, still heaped white
  const tr = new THREE.Group();
  tr.add(box(1.4, 0.5, 2.2, M.tin(), 0, 0.35, 0));
  for (let i = 0; i < 4; i++) tr.add(box(0.05, 0.6, 2.2, M.steel(), -0.7 + (i % 2) * 1.4, 0.85, 0));
  const fluff = colMat('#e4ddd0', { roughness: 1 });
  const r = rng(77);
  for (let i = 0; i < 22; i++) {
    const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18 + r() * 0.12, 1), fluff);
    b.scale.y = 0.7;
    b.position.set((r() - 0.5) * 1.1, 0.95 + r() * 0.35, (r() - 0.5) * 1.9);
    tr.add(shade(b));
  }
  for (const [x, z] of [[-0.6, -0.9], [0.6, -0.9], [-0.6, 0.9], [0.6, 0.9]] as Array<[number, number]>) {
    const w = new THREE.Mesh(cylGeo(0.26, 0.26, 0.15, 10), colMat('#1d1b19'));
    w.rotation.z = Math.PI / 2;
    w.position.set(x * 1.12, 0.26, z);
    tr.add(shade(w));
  }
  tr.position.set(-W / 2 - 1.5, 0, 1.7);
  tr.rotation.y = 0.08;
  g.add(tr);
  // wrapped bales stacked by the press
  for (const [x, z, y] of [[W / 2 + 0.75, 0.9, 0], [W / 2 + 0.75, 1.75, 0], [W / 2 + 0.75, 1.3, 0.62]] as Array<[number, number, number]>)
    g.add(box(0.75, 0.6, 0.8, colMat('#cfc6b0', { roughness: 1 }), x, y, z));
  // reclaimed
  vines(g, -W / 2 - 0.07, 0, -0.5, 2.0, 2.2, -Math.PI / 2);
  vines(g, 1.9, 0, fz + 0.03, 1.0, 2.6);
  vines(g, W / 2 - 0.2, 2.2, 0.42, 1.1, 2.4);
  put(g, cx, cz, W, D, scene);
  addSolid(cx - W / 2, cz - D / 2, cx + W / 2 + 0.2, cz + D / 2);
  addSolid(cx - W / 2 - 2.3, cz + 0.4, cx - W / 2 - 0.7, cz + 2.9);
  addSolid(cx + W / 2 + 0.3, cz + 0.4, cx + W / 2 + 1.2, cz + 2.2);
  return {};
}

// ============================================================ rail + boxcar

export function railLine(scene: THREE.Scene, z: number, x0: number, x1: number): void {
  const g = new THREE.Group();
  const tie = M.wood(), rail = colMat('#5a4a3c', { metalness: 0.5, roughness: 0.55 });
  const r = rng(31);
  for (let x = x0; x < x1; x += 0.55) {
    if (r() < 0.12) continue; // missing ties
    const t = box(0.22, 0.08, 1.5, tie, x, heightAt(x, z) - 0.03, z + (r() - 0.5) * 0.08);
    t.rotation.y = (r() - 0.5) * 0.12;
    g.add(t);
  }
  for (const dz of [-0.45, 0.45]) {
    // rails sag into the dirt where nobody runs them anymore
    const n = Math.ceil((x1 - x0) / 1.5);
    for (let i = 0; i < n; i++) {
      const ax = x0 + i * 1.5, bx = Math.min(x1, ax + 1.5);
      g.add(beam(new THREE.Vector3(ax, heightAt(ax, z + dz) + 0.1, z + dz), new THREE.Vector3(bx, heightAt(bx, z + dz) + 0.1, z + dz), 0.07, rail));
    }
  }
  scene.add(g);
}

export function boxcar(scene: THREE.Scene, cx: number, cz: number): void {
  const g = new THREE.Group();
  const L = 4.2, Wd = 1.5, H = 1.9;
  g.add(box(L, H, Wd, M.barn(), 0, 0.55, 0));
  g.add(box(L + 0.1, 0.12, Wd + 0.1, M.tank(), 0, 0.5, 0));
  const top = new THREE.Mesh(cylGeo(Wd * 0.62, Wd * 0.62, L, 16), M.tank());
  top.rotation.z = Math.PI / 2;
  top.scale.set(1, 1, 0.3);
  top.position.set(0, 0.55 + H - 0.05, 0);
  g.add(shade(top));
  // the slider door stands open on darkness, a sapling growing out of it
  g.add(box(1.3, 1.6, 0.04, M.dark(), 0.2, 0.7, Wd / 2 + 0.01));
  g.add(box(1.3, 1.6, 0.07, M.barn(), 1.45, 0.7, Wd / 2 + 0.06));
  for (const x of [-1.5, 1.5]) for (const dz of [-0.5, 0.5]) {
    const w = new THREE.Mesh(cylGeo(0.26, 0.26, 0.12, 10), colMat('#2a221c', { metalness: 0.4 }));
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0.32, dz);
    g.add(shade(w));
  }
  const st = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), new THREE.MeshStandardMaterial({
    map: textTexture('PLAINS & PACIFIC', { w: 96, h: 16, fg: '#e8dcc0', font: 'bold 10px monospace', worn: 0.35, seed: 5 }), transparent: true, alphaTest: 0.4, roughness: 1,
  }));
  st.position.set(-1.1, 1.95, Wd / 2 + 0.02);
  g.add(st);
  vines(g, -1.9, 0.55, Wd / 2 + 0.05, 1.2, 1.4);
  vines(g, 1.4, 1.2, Wd / 2 + 0.1, 0.9, 1.1);
  g.position.set(cx, heightAt(cx, cz) - 0.05, cz);
  g.rotation.y = 0.04;
  scene.add(g);
  addSolid(cx - L / 2, cz - Wd / 2, cx + L / 2, cz + Wd / 2);
}

export function crossbuck(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  g.add(box(0.1, 2.1, 0.1, M.steel(), 0, 0, 0));
  const mat = new THREE.MeshStandardMaterial({ map: textTexture('RAILROAD', { w: 64, h: 12, bg: '#e8e2d2', fg: '#1d1b19', font: 'bold 9px monospace', worn: 0.2 }), roughness: 1 });
  for (const a of [0.6, -0.6]) {
    const b = new THREE.Mesh(boxGeo(1.2, 0.2, 0.03), [M.steel(), M.steel(), M.steel(), M.steel(), mat, M.steel()]);
    b.position.set(0, 1.75, 0.07);
    b.rotation.z = a;
    g.add(shade(b));
  }
  g.position.set(x, heightAt(x, z), z);
  g.rotation.z = 0.06;
  scene.add(g);
  addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
}

// ============================================================ fences, signs

/** Old barbed-wire fence: leaning cedar posts, three sagging strands. */
export function fence(scene: THREE.Scene, pts: Array<[number, number]>, seed: number): void {
  const g = new THREE.Group();
  const r = rng(seed);
  const wire = colMat('#6a6560', { metalness: 0.5, roughness: 0.6 });
  const posts: THREE.Vector3[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i]!, [bx, bz] = pts[i + 1]!;
    const n = Math.max(1, Math.round(Math.hypot(bx - ax, bz - az) / 1.4));
    for (let k = 0; k <= n; k++) {
      if (i > 0 && k === 0) continue;
      const x = ax + ((bx - ax) * k) / n, z = az + ((bz - az) * k) / n;
      posts.push(new THREE.Vector3(x, heightAt(x, z), z));
    }
  }
  posts.forEach((p, i) => {
    const post = box(0.09, 0.95, 0.09, M.wood(), p.x, p.y - 0.05, p.z);
    post.rotation.set((r() - 0.5) * 0.15, 0, (r() - 0.5) * 0.18);
    g.add(post);
    if (i === posts.length - 1 || r() < 0.08) return; // a cut span
    const q = posts[i + 1]!;
    for (const y of [0.3, 0.55, 0.8]) {
      const mid = p.clone().lerp(q, 0.5);
      mid.y -= 0.07;
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(p.x, p.y + y, p.z), new THREE.Vector3(mid.x, mid.y + y, mid.z), new THREE.Vector3(q.x, q.y + y, q.z));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 6, 0.01, 3, false), wire));
    }
  });
  scene.add(g);
}

export function roadSign(scene: THREE.Scene, x: number, z: number, text: string): void {
  const g = new THREE.Group();
  for (const dx of [-0.45, 0.45]) g.add(box(0.07, 1.7, 0.07, M.steel(), dx, 0, 0));
  const face = new THREE.MeshStandardMaterial({ map: textTexture(text, { w: 64, h: 20, bg: '#2f5a3a', fg: '#e8eadc', font: 'bold 11px monospace', worn: 0.18, seed: 9 }), roughness: 0.8 });
  const b = new THREE.Mesh(boxGeo(1.3, 0.48, 0.04), [M.steel(), M.steel(), M.steel(), M.steel(), face, M.steel()]);
  b.position.set(0, 1.55, 0.04);
  b.rotation.z = -0.07;
  g.add(shade(b));
  vines(g, -0.5, 0, 0.06, 0.4, 0.9);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.55, z - 0.1, x + 0.55, z + 0.1);
}

// ======================================================= Sully's camp

function wagonCamp(scene: THREE.Scene, night: boolean): Built {
  // covered wagon east of where Sully rests
  const g = new THREE.Group();
  g.add(box(2.4, 0.45, 1.2, M.wood(), 0, 0.5, 0));
  const canvas = colMat('#d9cfb6', { roughness: 1, side: THREE.DoubleSide });
  const hoop = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.66, 2.2, 12, 1, true, -Math.PI / 2, Math.PI), canvas);
  hoop.rotation.z = Math.PI / 2;
  hoop.position.set(0, 0.95, 0);
  g.add(shade(hoop));
  for (const x of [-0.75, 0, 0.75]) {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(0.67, 0.025, 4, 12, Math.PI), M.wood());
    rib.rotation.y = Math.PI / 2;
    rib.position.set(x, 0.95, 0);
    g.add(rib);
  }
  g.add(box(0.5, 0.35, 0.02, colMat('#a89c80', { roughness: 1 }), -0.4, 1.3, 0.62)); // patch
  for (const [x, z] of [[-0.85, 0.62], [0.85, 0.62], [-0.85, -0.62], [0.85, -0.62]] as Array<[number, number]>) {
    const w = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.04, 4, 14), M.wood());
    w.position.set(x, 0.36, z);
    g.add(shade(w));
    for (let s = 0; s < 4; s++) {
      const sp = box(0.03, 0.62, 0.03, M.wood(), 0, -0.31, 0);
      const pivot = new THREE.Group();
      pivot.position.set(x, 0.36, z);
      pivot.rotation.z = (s / 4) * Math.PI;
      pivot.add(sp);
      g.add(pivot);
    }
  }
  g.add(beam(new THREE.Vector3(1.2, 0.55, 0), new THREE.Vector3(2.2, 0.1, 0), 0.07, M.wood())); // tongue
  g.add(box(0.5, 0.4, 0.4, M.wood(), -0.6, 0.95, 0.1)); // crate in the bed
  g.position.set(22.3, heightAt(22.3, 26.4), 26.4);
  g.rotation.y = -0.12;
  scene.add(g);
  addSolid(21.0, 25.7, 24.6, 27.1);

  // the recharge cot: canvas cot, a battery bank and cable, a dim ready light
  const c = new THREE.Group();
  c.add(box(1.5, 0.08, 0.65, colMat('#7b8a6a', { roughness: 1 }), 0, 0.38, 0));
  for (const [x, z] of [[-0.68, -0.28], [0.68, -0.28], [-0.68, 0.28], [0.68, 0.28]] as Array<[number, number]>) c.add(box(0.05, 0.38, 0.05, M.wood(), x, 0, z));
  c.add(box(0.45, 0.42, 0.35, M.steel(), 1.15, 0, -0.1));
  const ready = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), colMat('#7dff9a', { emissive: '#3dff7a', emissiveIntensity: 3 }));
  ready.position.set(1.15, 0.47, 0.08);
  c.add(ready);
  c.add(beam(new THREE.Vector3(0.95, 0.2, 0), new THREE.Vector3(0.6, 0.42, 0.1), 0.03, colMat('#151515')));
  c.position.set(17.4, heightAt(17.4, 26.6), 26.6);
  scene.add(c);
  addSolid(16.6, 26.2, 18.8, 27.0);

  // campfire: stone ring, logs, flickering flame cards and a warm light
  const f = new THREE.Group();
  const r = rng(9);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.13, 0), M.concrete());
    s.position.set(Math.cos(a) * 0.38, 0.05, Math.sin(a) * 0.38);
    s.rotation.set(r(), r(), r());
    f.add(shade(s));
  }
  for (const a of [0.3, 1.9, 3.6]) {
    const l = new THREE.Mesh(cylGeo(0.05, 0.05, 0.6, 6), texMat('bark', T.bark()));
    l.rotation.set(Math.PI / 2 - 0.3, a, 0);
    l.position.set(Math.cos(a) * 0.1, 0.1, Math.sin(a) * 0.1);
    f.add(shade(l));
  }
  const flameMat = new THREE.MeshBasicMaterial({ color: '#ffb347', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const flames: THREE.Mesh[] = [];
  for (let i = 0; i < 3; i++) {
    const fl = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.55, 5, 1, true), flameMat);
    fl.position.set((i - 1) * 0.07, 0.35, 0);
    f.add(fl);
    flames.push(fl);
  }
  const light = new THREE.PointLight('#ff9a40', night ? 10 : 3, 6, 1.6);
  light.position.set(0, 0.6, 0);
  f.add(light);
  const fx = 19.6, fz = 27.75;
  f.position.set(fx, heightAt(fx, fz), fz);
  scene.add(f);
  addSolid(fx - 0.45, fz - 0.4, fx + 0.45, fz + 0.4);
  return {
    update(t) {
      flames.forEach((fl, i) => {
        const k = 0.75 + Math.sin(t * 13 + i * 2.1) * 0.15 + Math.sin(t * 7.3 + i) * 0.1;
        fl.scale.set(1, k, 1);
      });
      light.intensity = (night ? 10 : 3) * (0.85 + Math.sin(t * 11) * 0.1 + Math.sin(t * 4.7) * 0.05);
      ready.visible = Math.floor(t * 1.2) % 2 === 0;
    },
  };
}

// ======================================================= the ledge lip

function ledgeLip(scene: THREE.Scene): void {
  const g = new THREE.Group();
  const r = rng(24);
  // dry-stone edge along the step, a broken asphalt lip where the road drops
  for (let x = 1.8; x < COLS - 1.8; x += 0.32) {
    if (x > LEDGE_X0 - 0.1 && x < LEDGE_X1 + 0.1) continue;
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.15 + r() * 0.1, 0), M.concrete());
    s.position.set(x, heightAt(x, LEDGE_Z) + 0.02, LEDGE_Z + (r() - 0.5) * 0.1);
    s.scale.y = 0.75;
    s.rotation.set(r() * 3, r() * 3, r() * 3);
    g.add(shade(s));
  }
  g.add(box(LEDGE_X1 - LEDGE_X0 + 0.2, 0.55, 0.16, colMat('#4a4743', { roughness: 1 }), (LEDGE_X0 + LEDGE_X1) / 2, heightAt(13.5, LEDGE_Z + 0.3) - 0.02, LEDGE_Z + 0.12));
  scene.add(g);
}

// ================================================================ build

export const buildFarmRoad: AreaBuilder = async (scene, night) => {
  setWorld(WORLD);
  const data = await loadMap('farmroad');
  const built: Built[] = [
    cottonGin(scene, 23.0, 5.4),
    waterTower(scene, 5.5, 8.5),
    wagonCamp(scene, night),
  ];
  railLine(scene, 2.4, -4, COLS + 4);
  boxcar(scene, 15.8, 2.4);
  crossbuck(scene, 11.6, 3.4);
  roadSign(scene, 7.2, 4.6, 'RAILHEAD ^');
  roadSign(scene, 15.9, 27.8, 'THE FIELD');
  truck(scene, 6.2, 20.6);
  ledgeLip(scene);
  fence(scene, [[3.6, 13.6], [10.4, 13.6], [10.4, 19.3]], 1);
  fence(scene, [[17.6, 11.2], [17.6, 18.8]], 2);
  fence(scene, [[21.5, 13.5], [25.4, 13.5]], 3);
  fence(scene, [[11.6, 3.9], [11.6, 7.8], [17.8, 7.8]], 4);
  fence(scene, [[3.6, 23.6], [9.6, 23.6]], 5);

  // tree-line walls: dense cottonwoods on the berms, mesquite and dead snags inside
  const r = rng(808);
  let seed = 3000;
  const tree = (o: THREE.Object3D, solid = 0.25): void => {
    scene.add(o);
    addSolid(o.position.x - solid, o.position.z - solid, o.position.x + solid, o.position.z + solid);
  };
  for (let z = -2; z < ROWS + 3; z += 1.1 + r() * 0.9) {
    tree(cottonwood(0.6 + r() * 0.8, z, 1.0 + r() * 0.45, seed++));
    scene.add(cottonwood(-1.2 - r() * 2.5, z + r(), 1.1 + r() * 0.4, seed++));
    tree(cottonwood(COLS - 0.6 - r() * 0.8, z, 1.0 + r() * 0.45, seed++));
    scene.add(cottonwood(COLS + 1.2 + r() * 2.5, z + r(), 1.1 + r() * 0.4, seed++));
  }
  for (let x = 1; x < COLS - 1; x += 1.3 + r() * 1.1) {
    if (!(x > 7.0 && x < 12.0)) scene.add(cottonwood(x, -0.5 - r() * 1.6, 1.1 + r() * 0.4, seed++));
    if (!(x > 11.0 && x < 16.0)) {
      scene.add(bush(x, ROWS - 0.2 + r() * 0.6, 1.0 + r() * 0.5, seed++, r() > 0.5));
      // foreground woods past the south edge frame the bottom of the view
      if (r() > 0.35) scene.add(cottonwood(x + r() * 0.6, ROWS + 2.3 + r() * 1.2, 0.75 + r() * 0.3, seed++));
    }
  }
  for (const [x, z, k] of [[4.5, 6.5, 'm'], [23.5, 12.5, 'c'], [22.5, 23.6, 'm'], [10.5, 12.5, 'd'], [25.0, 20.8, 'm'], [3.0, 11.0, 'c'], [16.5, 22.8, 'c']] as Array<[number, number, string]>)
    tree(k === 'c' ? cottonwood(x, z, 1.0, seed++) : k === 'm' ? mesquite(x, z, 1.1, seed++) : deadTree(x, z, 1.0, seed++));
  for (let i = 0; i < 30; i++) {
    const x = 2.5 + r() * (COLS - 5), z = 1.5 + r() * (ROWS - 3);
    if (cell(Math.floor(x), Math.floor(z)) !== 'g' || Math.abs(z - LEDGE_Z) < 0.6) continue;
    tree(bush(x, z, 0.5 + r() * 0.45, seed++, r() > 0.5), 0.15);
  }
  for (const [x, z, s] of [[14.7, 24.6, 1], [23, 17, 2], [6, 21.2, 3]] as Array<[number, number, number]>) tumbleweed(scene, x + 0.5, z + 0.5, s);

  buildGround(scene);
  const grass = buildGrass(scene);
  const dust = motes(scene, night);

  return {
    id: 'farmroad',
    title: 'THE FARM ROAD',
    sub: 'North to the Railhead',
    mood: night ? NIGHT : DAY,
    sky: true,
    cam: { x0: 8.2, x1: COLS - 8.2, z0: 4.4, z1: ROWS - 4.6 },
    blocked,
    ground: (x, z) => heightAt(x, z),
    wild: (x, z) => cell(Math.floor(x), Math.floor(z)) === 'T',
    zone: 'farmroad-fence',
    spawns: {
      start: { x: 13.5, z: 28.4, face: 'N' },
      south: { x: 13.5, z: 28.9, face: 'N' },
      north: { x: 9.5, z: 0.9, face: 'S' },
    },
    triggers: [
      { x0: 11.6, z0: 29.6, x1: 15.4, z1: 32, go: { to: 'field', spawn: 'north' } },
      { x0: 7.6, z0: -2, x1: 11.4, z1: 0.3, go: { to: 'railhead', spawn: 'south' } },
    ],
    things: [
      { x: 17.4, z: 26.6, height: 1.0, label: 'Rest', say: { lines: ['A field medic tops off your Ohms. Recharged. Stay current.'] } },
      { x: 5.5, z: 9.6, height: 1.8, label: 'Look', reach: 1.5, say: { lines: ['The old water tower. Its ladder still holds — a lookout over the whole road.'] } },
    ],
    npcs: castOf(data),
    update(t, focus) {
      grass(t);
      swayTrees(t);
      for (const b of built) b.update?.(t);
      dust(t, focus);
    },
  };
};
