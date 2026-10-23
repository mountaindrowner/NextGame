import * as THREE from 'three';
import { T, textTexture } from '../textures';
import { box, cyl, beam, boxGeo, cylGeo, texMat, colMat, shade } from '../geo';
import { addSolid, heightAt, COLS, ROWS, cell } from './layout';
import { rng, vnoise } from '../noise';
import type { Built } from './buildings';

const M = {
  bark: () => texMat('bark', T.bark()),
  wood: () => texMat('oldWood', T.oldWood()),
  rust: () => texMat('rustTank', T.rustTank(), { metalness: 0.25, roughness: 0.7 }),
  steel: () => texMat('steel', T.steel(), { metalness: 0.35, roughness: 0.65 }),
  concrete: () => texMat('concrete', T.concrete()),
  vine: () => texMat('vines', T.vines(), { alphaTest: 0.5, side: THREE.DoubleSide }),
  dark: () => colMat('#0d0c0b', { roughness: 1 }),
};

// ------------------------------------------------------------------ trees

/** An irregular foliage blob: displaced icosahedron, flat-shaded facets,
 *  leaf texture tiled at world density. */
function blobGeo(r: number, seed: number): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(r, 1);
  const pos = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const k = 0.82 + vnoise(v.x * 2.1 + seed, v.y * 2.1 + v.z * 1.3, seed) * 0.36;
    v.multiplyScalar(k);
    v.y *= 0.82;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * r * 6, uv.getY(i) * r * 3);
  g.computeVertexNormals();
  return g;
}

const leafMats = new Map<string, THREE.MeshStandardMaterial>();
function leafMat(tint: string, olive = false): THREE.MeshStandardMaterial {
  const k = tint + olive;
  let m = leafMats.get(k);
  if (!m) {
    m = new THREE.MeshStandardMaterial({ map: olive ? T.leavesOlive() : T.leaves(), color: tint, roughness: 0.95, flatShading: true });
    leafMats.set(k, m);
  }
  return m;
}

type Sway = { obj: THREE.Object3D; phase: number; amp: number };
const sways: Sway[] = [];

function cottonwood(x: number, z: number, s: number, seed: number): THREE.Group {
  const g = new THREE.Group();
  const r = rng(seed);
  const trunkH = 1.7 * s;
  g.add(cyl(0.13 * s, 0.24 * s, trunkH, M.bark(), 0, -0.1, 0, 8));
  const crown = new THREE.Group();
  crown.position.y = trunkH * 0.92;
  const tints = ['#ffffff', '#e8f2d0', '#d6e8b8', '#f2f6dc'];
  const tint = tints[Math.floor(r() * tints.length)]!;
  for (let i = 0; i < 6; i++) {
    const a = r() * Math.PI * 2, d = (i === 0 ? 0 : 0.55 + r() * 0.45) * s;
    const b = new THREE.Mesh(blobGeo((0.62 + r() * 0.38) * s, seed + i), leafMat(tint));
    b.position.set(Math.cos(a) * d, (0.35 + r() * 0.75) * s, Math.sin(a) * d);
    crown.add(shade(b));
    if (i > 0 && r() > 0.4) crown.add(beam(new THREE.Vector3(0, -0.2 * s, 0), b.position.clone().multiplyScalar(0.7), 0.07 * s, M.bark()));
  }
  g.add(crown);
  sways.push({ obj: crown, phase: r() * 6.28, amp: 0.018 });
  g.position.set(x, heightAt(x, z), z);
  return g;
}

function mesquite(x: number, z: number, s: number, seed: number): THREE.Group {
  const g = new THREE.Group();
  const r = rng(seed);
  const crown = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * 6.28 + r();
    const top = new THREE.Vector3(Math.cos(a) * 0.55 * s, 1.2 * s + r() * 0.3, Math.sin(a) * 0.55 * s);
    g.add(beam(new THREE.Vector3(0, -0.1, 0), top, 0.1 * s, M.bark()));
    const b = new THREE.Mesh(blobGeo((0.55 + r() * 0.25) * s, seed + i), leafMat('#ffffff', true));
    b.scale.y = 0.55;
    b.position.copy(top).add(new THREE.Vector3(0, 0.1, 0));
    crown.add(shade(b));
  }
  g.add(crown);
  sways.push({ obj: crown, phase: r() * 6.28, amp: 0.012 });
  g.position.set(x, heightAt(x, z), z);
  return g;
}

/** A dead tree — the bleak part — with green life already climbing it. */
function deadTree(x: number, z: number, s: number, seed: number): THREE.Group {
  const g = new THREE.Group();
  const r = rng(seed);
  const grow = (from: THREE.Vector3, dir: THREE.Vector3, len: number, th: number, depth: number): void => {
    const to = from.clone().add(dir.clone().multiplyScalar(len));
    g.add(beam(from, to, th, M.bark()));
    if (depth > 0 && r() > 0.25) {
      for (let i = 0; i < 2; i++) {
        const d = dir.clone().add(new THREE.Vector3(r() - 0.5, r() * 0.3, r() - 0.5).multiplyScalar(1.4)).normalize();
        grow(to, d, len * 0.65, th * 0.62, depth - 1);
      }
    } else if (r() > 0.45) {
      const leaf = new THREE.Mesh(blobGeo(0.18 + r() * 0.12, seed + depth), leafMat('#ffffff'));
      leaf.position.copy(to);
      g.add(shade(leaf));
    }
  };
  grow(new THREE.Vector3(0, -0.1, 0), new THREE.Vector3(0.05, 1, 0), 1.6 * s, 0.2 * s, 3);
  const v = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 1.4), M.vine());
  v.position.set(0, 0.7, 0.13);
  g.add(v);
  g.position.set(x, heightAt(x, z), z);
  return g;
}

function bush(x: number, z: number, s: number, seed: number, olive = false): THREE.Group {
  const g = new THREE.Group();
  const r = rng(seed);
  for (let i = 0; i < 3; i++) {
    const b = new THREE.Mesh(blobGeo((0.35 + r() * 0.2) * s, seed + i * 3), leafMat('#ffffff', olive));
    b.position.set((r() - 0.5) * 0.6 * s, 0.22 * s, (r() - 0.5) * 0.5 * s);
    g.add(shade(b));
  }
  g.position.set(x, heightAt(x, z), z);
  return g;
}

// ---------------------------------------------------------- power lines

function powerLine(scene: THREE.Scene, poles: Array<[number, number, number]>, links: Array<[number, number]>): void {
  const r = rng(515);
  const tips: THREE.Vector3[][] = [];
  for (const [x, z, lean] of poles) {
    const g = new THREE.Group();
    g.add(cyl(0.07, 0.1, 4.3, M.wood(), 0, -0.2, 0, 7));
    const armBroken = r() < 0.15;
    const arm = box(1.3, 0.1, 0.1, M.wood(), 0, 3.85, 0);
    if (armBroken) arm.rotation.z = 0.35;
    g.add(arm);
    for (const dx of [-0.55, 0, 0.55]) g.add(cyl(0.035, 0.035, 0.13, colMat('#6f8f7a', { roughness: 0.3 }), dx, 3.95, 0, 6));
    g.rotation.z = lean;
    g.position.set(x, heightAt(x, z), z);
    g.updateMatrixWorld(true);
    scene.add(g);
    addSolid(x - 0.12, z - 0.12, x + 0.12, z + 0.12);
    tips.push([-0.55, 0, 0.55].map((dx) => new THREE.Vector3(dx, 4.05, 0).applyMatrix4(g.matrixWorld)));
  }
  const wireMat = new THREE.MeshBasicMaterial({ color: '#1c1b1a' });
  for (const [a, b] of links) {
    for (let w = 0; w < 3; w++) {
      const p = tips[a]![w]!, q = tips[b]![w]!;
      const mid = p.clone().lerp(q, 0.5);
      mid.y -= 0.35 + p.distanceTo(q) * 0.035; // catenary sag
      const curve = new THREE.QuadraticBezierCurve3(p, mid, q);
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 16, 0.014, 3, false), wireMat));
    }
  }
}

// ---------------------------------------------------------- set dressing

function truck(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  const paint = colMat('#4f6a78', { roughness: 0.85, metalness: 0.2 });
  g.add(box(1.0, 0.55, 1.3, M.rust(), -0.55, 0.32, 0));
  g.add(box(0.95, 0.42, 1.25, paint, 0.42, 0.32, 0));
  g.add(box(0.82, 0.5, 1.2, paint, -0.12, 0.87, 0));
  g.add(box(0.05, 0.36, 1.0, colMat('#26313a', { roughness: 0.2 }), 0.3, 0.95, 0));
  g.add(box(1.0, 0.25, 0.06, M.rust(), -0.55, 0.87, 0.62));
  g.add(box(1.0, 0.25, 0.06, M.rust(), -0.55, 0.87, -0.62));
  g.add(box(0.06, 0.25, 1.3, M.rust(), -1.05, 0.87, 0));
  for (const [wx, wz, sink] of [[0.55, 0.62, 0], [0.55, -0.62, 0.08], [-0.75, 0.62, 0.12], [-0.75, -0.62, 0]] as Array<[number, number, number]>) {
    const w = new THREE.Mesh(cylGeo(0.27, 0.27, 0.2, 12), colMat('#1d1b19'));
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.27 - sink, wz);
    g.add(shade(w));
  }
  // a sapling has rooted in the bed — life over ruin
  const sap = new THREE.Mesh(blobGeo(0.4, 71), leafMat('#ffffff'));
  sap.position.set(-0.55, 1.35, 0);
  g.add(shade(sap));
  g.add(box(0.06, 0.6, 0.06, M.bark(), -0.55, 0.7, 0));
  const v = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), M.vine());
  v.position.set(-0.1, 0.62, 0.66);
  g.add(v);
  g.position.set(x, heightAt(x, z) - 0.05, z);
  g.rotation.y = 0.18;
  scene.add(g);
  addSolid(x - 1.2, z - 0.75, x + 1.0, z + 0.75);
}

function crates(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  g.add(box(0.6, 0.6, 0.6, M.wood(), 0, 0, 0));
  g.add(box(0.5, 0.5, 0.5, M.wood(), 0.62, 0, 0.05));
  g.add(box(0.45, 0.45, 0.45, M.wood(), 0.15, 0.6, 0.02).rotateY(0.3));
  g.add(cyl(0.26, 0.26, 0.75, M.rust(), 1.25, 0, 0.1, 10));
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.35, z - 0.35, x + 1.55, z + 0.4);
}

function fieldSign(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  g.add(box(0.09, 1.25, 0.09, M.wood(), -0.5, 0, 0));
  g.add(box(0.09, 1.1, 0.09, M.wood(), 0.5, 0, 0));
  const board = new THREE.Mesh(boxGeo(1.3, 0.5, 0.06), [M.wood(), M.wood(), M.wood(), M.wood(),
    new THREE.MeshStandardMaterial({ map: textTexture('THE FIELD', { w: 64, h: 24, bg: '#7d6b52', fg: '#efe6d0', font: 'bold 11px monospace', worn: 0.3, seed: 3 }), roughness: 1 }),
    M.wood()]);
  board.position.set(0, 1.0, 0.05);
  board.rotation.z = -0.05;
  g.add(shade(board));
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = -0.25;
  scene.add(g);
  addSolid(x - 0.6, z - 0.12, x + 0.6, z + 0.12);
}

function hitchingPost(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  g.add(box(0.1, 0.9, 0.1, M.wood(), -0.6, 0, 0));
  g.add(box(0.1, 0.9, 0.1, M.wood(), 0.6, 0, 0));
  g.add(box(1.4, 0.08, 0.08, M.wood(), 0, 0.82, 0));
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.7, z - 0.1, x + 0.7, z + 0.1);
}

function churchyard(scene: THREE.Scene): void {
  const stones: Array<[number, number, number]> = [[8.9, 23.35, 0.08], [9.8, 23.5, -0.15], [11.15, 23.35, 0.05]];
  for (const [x, z, tilt] of stones) {
    const g = new THREE.Group();
    g.add(box(0.36, 0.42, 0.1, M.concrete(), 0, 0, 0));
    const top = new THREE.Mesh(cylGeo(0.18, 0.18, 0.1, 10).rotateX(Math.PI / 2), M.concrete());
    top.position.y = 0.42;
    g.add(shade(top));
    g.rotation.z = tilt;
    g.position.set(x, heightAt(x, z) - 0.04, z);
    scene.add(g);
    addSolid(x - 0.2, z - 0.1, x + 0.2, z + 0.1);
  }
  const cross = new THREE.Group();
  cross.add(box(0.06, 0.7, 0.06, M.wood(), 0, 0, 0));
  cross.add(box(0.36, 0.06, 0.06, M.wood(), 0, 0.48, 0));
  cross.position.set(10.45, heightAt(10.45, 23.6), 23.6);
  cross.rotation.z = -0.2;
  scene.add(cross);
}

function tumbleweed(scene: THREE.Scene, x: number, z: number, seed: number): void {
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 1), new THREE.MeshStandardMaterial({ color: '#8a7246', wireframe: true }));
  const r = rng(seed);
  m.rotation.set(r() * 3, r() * 3, r() * 3);
  m.position.set(x, heightAt(x, z) + 0.26, z);
  m.castShadow = true;
  scene.add(m);
}

function reeds(scene: THREE.Scene): void {
  const r = rng(909);
  const stalk = new THREE.CylinderGeometry(0.012, 0.018, 1, 3).translate(0, 0.5, 0);
  const head = new THREE.CylinderGeometry(0.035, 0.035, 0.18, 5).translate(0, 1.0, 0);
  const n = 160;
  const sm = new THREE.InstancedMesh(stalk, new THREE.MeshLambertMaterial({ color: '#5f7a34' }), n);
  const hm = new THREE.InstancedMesh(head, new THREE.MeshLambertMaterial({ color: '#5a3a22' }), n);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  for (let i = 0; i < n; i++) {
    const x = 1.2 + r() * 17.2;
    const z = r() < 0.75 ? 23.75 + r() * 0.45 : 26.8 + r() * 0.3;
    e.set((r() - 0.5) * 0.25, 0, (r() - 0.5) * 0.25);
    q.setFromEuler(e);
    const s = 0.55 + r() * 0.5;
    m4.compose(new THREE.Vector3(x, heightAt(x, z) - 0.05, z), q, new THREE.Vector3(1, s, 1));
    sm.setMatrixAt(i, m4);
    hm.setMatrixAt(i, m4);
  }
  sm.receiveShadow = hm.receiveShadow = true;
  scene.add(sm, hm);
  // stones along the bank
  for (let i = 0; i < 22; i++) {
    const x = 1.2 + r() * 17, z = 23.9 + r() * 0.3;
    const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1 + r() * 0.15, 0), M.concrete());
    s.position.set(x, heightAt(x, z), z);
    s.scale.y = 0.6;
    scene.add(shade(s));
  }
}

// ---------------------------------------------------------------- motes

function motes(scene: THREE.Scene, night: boolean): (t: number, focus: THREE.Vector3) => void {
  const N = night ? 140 : 220;
  const g = new THREE.BufferGeometry();
  const base = new Float32Array(N * 3), pos = new Float32Array(N * 3);
  const r = rng(321);
  for (let i = 0; i < N; i++) {
    base[i * 3] = (r() - 0.5) * 26;
    base[i * 3 + 1] = 0.3 + r() * (night ? 2.2 : 3.5);
    base[i * 3 + 2] = (r() - 0.5) * 18;
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    color: night ? '#c8ff70' : '#fff2c8', size: night ? 0.09 : 0.055, transparent: true, opacity: night ? 1 : 0.75,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
  });
  const pts = new THREE.Points(g, mat);
  pts.frustumCulled = false;
  scene.add(pts);
  return (t, f) => {
    for (let i = 0; i < N; i++) {
      const bx = base[i * 3]!, by = base[i * 3 + 1]!, bz = base[i * 3 + 2]!;
      // drift on the breeze, wrapped into a box that travels with the player
      let x = bx + Math.sin(t * 0.21 + i) * 0.6 + t * 0.12;
      let z = bz + Math.cos(t * 0.17 + i * 1.3) * 0.5;
      x = ((((x - f.x) % 26) + 39) % 26) - 13 + f.x;
      z = ((((z - f.z) % 18) + 27) % 18) - 9 + f.z;
      pos[i * 3] = x;
      pos[i * 3 + 1] = by + Math.sin(t * 0.6 + i * 0.7) * 0.18;
      pos[i * 3 + 2] = z;
    }
    g.attributes.position!.needsUpdate = true;
    if (night) mat.opacity = 0.65 + Math.sin(t * 3.1) * 0.35;
  };
}

// ------------------------------------------------------------------ build

export function buildProps(scene: THREE.Scene, night: boolean): Built & { motes: (t: number, f: THREE.Vector3) => void } {
  const add = (o: THREE.Object3D, solid?: [number, number]): void => {
    scene.add(o);
    if (solid) addSolid(o.position.x - solid[0], o.position.z - solid[1], o.position.x + solid[0], o.position.z + solid[1]);
  };
  // trees from the original layout (nudged clear of the new building footprints)
  const T2: Array<[number, number, 'c' | 'm' | 'd', number]> = [
    [4.5, 10.5, 'c', 1.0], [13.5, 5.5, 'c', 1.15], [27.5, 7.4, 'm', 1.2], [37.5, 16.6, 'c', 0.95],
    [3.5, 16.6, 'm', 1.0], [34.5, 16.6, 'c', 0.9], [6.5, 8.4, 'd', 1.0], [24.5, 4.5, 'c', 1.05],
    [11.6, 18.4, 'm', 0.9], [30.5, 25.5, 'c', 1.0], [16.6, 5.0, 'd', 1.1],
  ];
  let seed = 1000;
  for (const [x, z, k, s] of T2) {
    const tree = k === 'c' ? cottonwood(x, z, s, seed++) : k === 'm' ? mesquite(x, z, s, seed++) : deadTree(x, z, s, seed++);
    add(tree, [0.25, 0.25]);
  }
  // framing woods along the berm and beyond the edge (the diorama's walls)
  const r = rng(4242);
  for (let x = -6; x < COLS + 6; x += 1.6 + r() * 1.2) {
    if (x > 17.6 && x < 23.4) continue; // keep the road out to the Farm Road clear
    add(cottonwood(x, -0.4 - r() * 3.5, 1.15 + r() * 0.5, seed++));
    if (r() > 0.5) add(cottonwood(x + 0.8, 0.5 + r() * 0.4, 0.8 + r() * 0.3, seed++));
  }
  for (let z = 1; z < ROWS + 2; z += 1.5 + r() * 1.3) {
    add(r() > 0.3 ? cottonwood(-0.6 - r() * 2.5, z, 1.0 + r() * 0.4, seed++) : mesquite(-0.5, z, 1.2, seed++));
    add(r() > 0.3 ? cottonwood(COLS + 0.6 + r() * 2.5, z, 1.0 + r() * 0.4, seed++) : mesquite(COLS + 0.5, z, 1.2, seed++));
  }
  for (let x = 0; x < COLS; x += 1.1 + r() * 1.4) add(bush(x, ROWS - 0.35 + r() * 0.6, 0.9 + r() * 0.5, seed++, r() > 0.6));
  // bushes against walls and in corners: life pressing back in
  for (const [x, z, s] of [[5.0, 12.9, 0.8], [9.9, 12.9, 0.7], [14.0, 12.85, 0.9], [26.3, 12.8, 0.8], [31.6, 12.75, 0.9], [8.4, 22.2, 0.8], [17.9, 22.6, 0.7], [24.0, 21.6, 0.8], [33.5, 22.9, 0.7]] as Array<[number, number, number]>)
    add(bush(x, z, s, seed++));
  for (let i = 0; i < 26; i++) {
    const x = 1.5 + r() * (COLS - 3), z = 1.5 + r() * (ROWS - 3);
    const c = cell(Math.floor(x), Math.floor(z));
    if (c !== 'g') continue;
    add(bush(x, z, 0.55 + r() * 0.4, seed++, r() > 0.5));
  }

  // power line along the north side of main street, plus the spur up the north road
  powerLine(scene,
    [[2.6, 12.85, 0.02], [10.4, 12.85, -0.04], [18.85, 12.85, 0.0], [25.6, 12.85, 0.09], [33.1, 12.85, 0.01], [38.4, 12.85, -0.05], [22.35, 8.4, 0.03], [22.35, 3.4, -0.07]],
    [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7]]);

  truck(scene, 7.1, 16.9);
  crates(scene, 22.5, 12.1);
  fieldSign(scene, 22.7, 16.7);
  hitchingPost(scene, 15.2, 16.5);
  churchyard(scene);
  reeds(scene);
  for (const [x, z, s] of [[26.8, 16.4, 1], [6.6, 14.2, 2], [14.4, 9.0, 3]] as Array<[number, number, number]>) tumbleweed(scene, x, z, s);

  return {
    update(t) {
      for (const s of sways) s.obj.rotation.z = Math.sin(t * 0.9 + s.phase) * s.amp;
    },
    motes: motes(scene, night),
  };
}
