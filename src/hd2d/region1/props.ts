import * as THREE from 'three';
import { rng } from '../noise';
import { textTexture } from '../textures';
import { box, cyl, beam, boxGeo, cylGeo, colMat, shade, planeGeo } from '../geo';
import { heightAt, addSolid } from '../world';
import { M, put, vines, windowAt, type Built } from '../field/buildings';
import { powerLine } from '../field/props';

/**
 * Railhead Country's shared props (docs/design/region1-railhead-country.md):
 * the region kit every section draws from, plus the visual threads that run
 * through it unsaid: the Garrison's grey stencil, Redbed's red hand,
 * Grandpa's brass tag, the Static's silver grass, and the machines still
 * doing their old jobs.
 */

const SAND = ['#a8865e', '#9a7a54', '#b89670', '#8a6c4a'];

/** A weathered sandstone boulder. */
export function rock(scene: THREE.Scene, x: number, z: number, s: number, seed: number): void {
  const r = rng(seed);
  const m = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), colMat(SAND[Math.floor(r() * SAND.length)]!, { roughness: 1 }));
  m.scale.set(1 + r() * 0.4, 0.55 + r() * 0.35, 1 + r() * 0.3);
  m.rotation.set(r() * 0.4, r() * 6, r() * 0.4);
  m.position.set(x, heightAt(x, z) + s * 0.25, z);
  scene.add(shade(m));
  if (s > 0.45) addSolid(x - s * 0.8, z - s * 0.6, x + s * 0.8, z + s * 0.6);
}

/** A hoodoo: a pillar of soft stone with a harder cap, left standing by the wind. */
export function hoodoo(scene: THREE.Scene, x: number, z: number, h: number, seed: number): void {
  const r = rng(seed);
  const g = new THREE.Group();
  let y = 0;
  for (let i = 0; i < 4; i++) {
    const rad = (0.55 - i * 0.08) * (0.85 + r() * 0.3);
    const seg = h / 4;
    g.add(cyl(rad * 0.85, rad, seg, colMat(SAND[(i + 1) % SAND.length]!, { roughness: 1 }), (r() - 0.5) * 0.06, y, 0, 7));
    y += seg;
  }
  const cap = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55, 0), colMat('#6e5a44', { roughness: 1 }));
  cap.scale.set(1.2, 0.45, 1.1);
  cap.position.set(0, y + 0.1, 0);
  g.add(shade(cap));
  g.position.set(x, heightAt(x, z) - 0.1, z);
  scene.add(g);
  addSolid(x - 0.55, z - 0.55, x + 0.55, z + 0.55);
}

/** A hand-painted board on a post: the only kind of sign anyone still makes. */
export function boardSign(scene: THREE.Scene, x: number, z: number, text: string, rotY = 0, seed = 3): void {
  const g = new THREE.Group();
  g.add(box(0.1, 1.45, 0.1, M.wood(), 0, 0, 0));
  const face = new THREE.MeshStandardMaterial({ map: textTexture(text, { w: 96, h: 24, bg: '#6f6656', fg: '#efe8d6', font: 'bold 12px monospace', worn: 0.3, seed }), roughness: 1 });
  const b = new THREE.Mesh(boxGeo(1.35, 0.4, 0.05), [M.wood(), M.wood(), M.wood(), M.wood(), face, M.wood()]);
  b.position.set(0, 1.25, 0.06);
  b.rotation.z = (rng(seed)() - 0.5) * 0.12;
  g.add(shade(b));
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rotY;
  scene.add(g);
  addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
}

/** A round galvanized stock tank, still holding water. */
export function stockTank(scene: THREE.Scene, x: number, z: number, rad = 0.95): void {
  const g = new THREE.Group();
  const side = new THREE.Mesh(cylGeo(rad, rad, 0.55, 20, true), colMat('#8f9498', { metalness: 0.5, roughness: 0.55, side: THREE.DoubleSide }));
  side.position.y = 0.27;
  g.add(shade(side));
  g.add(cyl(rad + 0.03, rad + 0.03, 0.05, colMat('#6e7378', { metalness: 0.5 }), 0, 0.53, 0, 20));
  const wtr = new THREE.Mesh(new THREE.CircleGeometry(rad - 0.04, 20), colMat('#3f6a62', { roughness: 0.2, metalness: 0.2 }));
  wtr.rotation.x = -Math.PI / 2;
  wtr.position.y = 0.44;
  g.add(wtr);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - rad, z - rad, x + rad, z + rad);
}

/** A round hay bale on its side, gone grey on top. */
export function bale(scene: THREE.Scene, x: number, z: number, rotY = 0): void {
  const m = new THREE.Mesh(cylGeo(0.62, 0.62, 1.1, 14), [M.hay(), colMat('#a89464', { roughness: 1 }), colMat('#a89464', { roughness: 1 })]);
  m.rotation.set(Math.PI / 2, 0, rotY);
  m.position.set(x, heightAt(x, z) + 0.58, z);
  scene.add(shade(m));
  addSolid(x - 0.6, z - 0.6, x + 0.6, z + 0.6);
}

// ------------------------------------------------------------- the threads

let stencilTex: THREE.CanvasTexture | null = null;
/** The Garrison's grey stencil: a chevron over a tally. Marks what they've "cleared". */
export function stencil(parent: THREE.Object3D, x: number, y: number, z: number, rotY = 0, s = 0.6): void {
  if (!stencilTex) {
    const c = document.createElement('canvas');
    c.width = 32; c.height = 32;
    const g = c.getContext('2d')!;
    g.fillStyle = '#c9ccce';
    g.beginPath(); g.moveTo(4, 14); g.lineTo(16, 4); g.lineTo(28, 14); g.lineTo(28, 19); g.lineTo(16, 10); g.lineTo(4, 19); g.closePath(); g.fill();
    for (let i = 0; i < 4; i++) g.fillRect(6 + i * 5, 22, 2, 7);
    g.fillRect(4, 25, 22, 2);
    stencilTex = new THREE.CanvasTexture(c);
    stencilTex.magFilter = THREE.NearestFilter;
    stencilTex.colorSpace = THREE.SRGBColorSpace;
  }
  const m = new THREE.Mesh(planeGeo(s, s), new THREE.MeshStandardMaterial({ map: stencilTex, transparent: true, alphaTest: 0.3, roughness: 1, opacity: 0.9 }));
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  parent.add(m);
}

let handTex: THREE.CanvasTexture | null = null;
/** Redbed's red handprint: raiders sign what they've taken. */
export function redHand(parent: THREE.Object3D, x: number, y: number, z: number, rotY = 0, s = 0.45): void {
  if (!handTex) {
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const g = c.getContext('2d')!;
    g.fillStyle = '#9a2a1e';
    g.fillRect(4, 7, 8, 7);
    for (const [fx, h] of [[4, 5], [6, 6], [8, 6], [10, 5]] as Array<[number, number]>) g.fillRect(fx, 7 - h, 2, h);
    g.fillRect(12, 8, 3, 2);
    g.fillRect(3, 14, 1, 2); g.fillRect(9, 14, 1, 2); // drips
    handTex = new THREE.CanvasTexture(c);
    handTex.magFilter = THREE.NearestFilter;
    handTex.colorSpace = THREE.SRGBColorSpace;
  }
  const m = new THREE.Mesh(planeGeo(s, s), new THREE.MeshStandardMaterial({ map: handTex, transparent: true, alphaTest: 0.3, roughness: 1 }));
  m.position.set(x, y, z);
  m.rotation.y = rotY;
  parent.add(m);
}

/** Grandpa's mark: a small brass tag with three notches, on machines someone kept running. */
export function brassTag(parent: THREE.Object3D, x: number, y: number, z: number, rotY = 0): void {
  const g = new THREE.Group();
  const brass = colMat('#c8a050', { metalness: 0.75, roughness: 0.35, emissive: '#3a2a08', emissiveIntensity: 0.4 });
  g.add(box(0.2, 0.12, 0.015, brass, 0, -0.06, 0));
  for (const dx of [-0.05, 0, 0.05]) g.add(box(0.018, 0.05, 0.02, colMat('#4a3a1c'), dx, -0.01, 0.004));
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  parent.add(g);
}

/** A decommissioned Ohm, left where the Garrison dropped it: eye dark, stencilled. */
export function husk(scene: THREE.Scene, x: number, z: number, rot: number, seed: number): void {
  const r = rng(seed);
  const g = new THREE.Group();
  const shell = colMat(['#8a8f88', '#b8a888', '#6a7a86', '#a86a48'][Math.floor(r() * 4)]!, { metalness: 0.35, roughness: 0.6 });
  const w = 0.7 + r() * 0.4, h = 0.55 + r() * 0.3, d = 0.6 + r() * 0.3;
  g.add(box(w, h, d, shell, 0, 0, 0));
  g.add(box(w * 0.5, 0.18, 0.04, colMat('#121212'), 0, h * 0.55, d / 2 + 0.01)); // the dead eye
  for (const sx of [-1, 1]) g.add(beam(new THREE.Vector3(sx * w * 0.45, 0.2, 0), new THREE.Vector3(sx * (w * 0.45 + 0.45), 0.02, 0.2 * sx), 0.07, M.steel()));
  stencil(g, 0, h * 0.25, d / 2 + 0.02, 0, 0.32);
  g.rotation.set(0, rot, 0.55 + r() * 0.3); // tipped on its side
  g.position.set(x, heightAt(x, z) + 0.12, z);
  scene.add(shade(g));
  addSolid(x - 0.5, z - 0.5, x + 0.5, z + 0.5);
}

// ------------------------------------------------- machines on the old jobs

/** A wheel-line sprinkler Ohm crawling its arc, keeping one field green. */
export function sprinkler(scene: THREE.Scene, cx: number, cz: number, len: number): Built {
  const pivot = new THREE.Group();
  pivot.position.set(cx, heightAt(cx, cz), cz);
  pivot.add(cyl(0.12, 0.16, 1.6, M.steel(), 0, 0, 0, 8));
  const arm = new THREE.Group();
  arm.position.y = 1.35;
  pivot.add(arm);
  const pipe = colMat('#c8cccc', { metalness: 0.5, roughness: 0.45 });
  arm.add(beam(new THREE.Vector3(0, 0, 0), new THREE.Vector3(len, 0, 0), 0.08, pipe));
  const wheels: THREE.Object3D[] = [];
  for (let k = 1; k <= 3; k++) {
    const x = (len * k) / 3;
    const tower = new THREE.Group();
    tower.position.x = x;
    tower.add(beam(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-0.35, -1.3, 0.25), 0.05, M.steel()));
    tower.add(beam(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.35, -1.3, -0.25), 0.05, M.steel()));
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.05, 5, 12), colMat('#2a2622'));
    wheel.position.set(0, -1.05, 0);
    tower.add(shade(wheel));
    wheels.push(wheel);
    arm.add(tower);
  }
  // spray: little additive droplets falling under the arm
  const N = 90, pos = new Float32Array(N * 3), seeds = new Float32Array(N);
  for (let i = 0; i < N; i++) seeds[i] = Math.random();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const spray = new THREE.Points(geo, new THREE.PointsMaterial({ color: '#d8ecf0', size: 0.07, transparent: true, opacity: 0.7, depthWrite: false }));
  arm.add(spray);
  scene.add(pivot);
  addSolid(cx - 0.25, cz - 0.25, cx + 0.25, cz + 0.25);
  return {
    update(t) {
      arm.rotation.y = Math.sin(t * 0.05) * 1.1 - 0.4;
      for (const w of wheels) w.rotation.z = -t * 0.6;
      for (let i = 0; i < N; i++) {
        const s = seeds[i]!, k = (t * 0.9 + s * 7) % 1;
        pos[i * 3] = (s * 9.7 % 1) * len;
        pos[i * 3 + 1] = -k * 1.3;
        pos[i * 3 + 2] = Math.sin(s * 40) * 0.35 * (0.3 + k);
      }
      geo.attributes.position!.needsUpdate = true;
    },
  };
}

/** A weather-vane Ohm on a leaning post, still turning to the wind. */
export function weatherVane(scene: THREE.Scene, x: number, z: number): Built {
  const g = new THREE.Group();
  g.add(box(0.1, 2.4, 0.1, M.wood(), 0, 0, 0));
  const head = new THREE.Group();
  head.position.y = 2.45;
  head.add(box(1.0, 0.05, 0.05, M.tank(), 0, 0, 0));
  const tail = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5, -0.2, 0), new THREE.Vector3(-0.5, 0.25, 0), new THREE.Vector3(-0.2, 0.03, 0)]), colMat('#8a5a3a', { side: THREE.DoubleSide, metalness: 0.3 }));
  tail.geometry.computeVertexNormals();
  head.add(shade(tail));
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 4), M.tank());
  tip.rotation.z = -Math.PI / 2;
  tip.position.x = 0.55;
  head.add(shade(tip));
  // the cups: a little anemometer spinning above
  const cups = new THREE.Group();
  cups.position.y = 0.35;
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    cups.add(beam(new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3), 0.025, M.steel()));
    const c = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 4, 0, Math.PI), M.steel());
    c.position.set(Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3);
    cups.add(c);
  }
  head.add(cups);
  g.add(head);
  g.rotation.z = 0.05;
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.12, z - 0.12, x + 0.12, z + 0.12);
  return { update(t) { head.rotation.y = 0.6 + Math.sin(t * 0.21) * 0.5 + Math.sin(t * 0.83) * 0.12; cups.rotation.y = -t * 3.1; } };
}

/** A wind turbine down in the dirt: the tower on its side, two blades flat, one stuck upright. */
export function fallenTurbine(scene: THREE.Scene, x: number, z: number, rot: number): void {
  const g = new THREE.Group();
  const white = colMat('#d8d4c8', { roughness: 0.7 });
  const tower = new THREE.Mesh(cylGeo(0.32, 0.5, 9, 14), white);
  tower.rotation.z = Math.PI / 2;
  tower.position.set(4.5, 0.42, 0);
  g.add(shade(tower));
  g.add(box(1.3, 0.8, 0.8, white, -0.4, 0.05, 0)); // the nacelle
  g.add(box(0.5, 0.5, 0.5, colMat('#8a8a84'), -1.1, 0.2, 0));
  const blade = (): THREE.Mesh => {
    const b = new THREE.Mesh(boxGeo(0.35, 4.6, 0.08), white);
    b.geometry.translate(0, 2.3, 0);
    return shade(b);
  };
  const b1 = blade(); b1.rotation.set(Math.PI / 2, 0, 0.5); b1.position.set(-1.2, 0.1, 0.3); g.add(b1);
  const b2 = blade(); b2.rotation.set(-Math.PI / 2 + 0.05, 0, -0.9); b2.position.set(-1.3, 0.1, -0.2); g.add(b2);
  const b3 = blade(); b3.rotation.set(0.3, 0, 0.25); b3.position.set(-2.8, -0.6, 1.2); g.add(b3); // driven into the ground
  vines(g, 3.0, 0.0, 0.52, 2.4, 0.6);
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rot;
  scene.add(g);
  const c = Math.cos(rot), s = Math.sin(rot);
  for (let k = -1.5; k <= 9; k += 1.5) { const px = x + c * k, pz = z - s * k; addSolid(px - 0.55, pz - 0.55, px + 0.55, pz + 0.55); }
}

/** A railroad crossing signal still flashing for trains that never come. */
export function crossingSignal(scene: THREE.Scene, x: number, z: number, night: boolean): Built {
  const g = new THREE.Group();
  g.add(box(0.12, 2.7, 0.12, M.steel(), 0, 0, 0));
  const mat = new THREE.MeshStandardMaterial({ map: textTexture('RAILROAD', { w: 64, h: 12, bg: '#e8e2d2', fg: '#1d1b19', font: 'bold 9px monospace', worn: 0.25 }), roughness: 1 });
  for (const a of [0.6, -0.6]) {
    const b = new THREE.Mesh(boxGeo(1.2, 0.2, 0.03), [M.steel(), M.steel(), M.steel(), M.steel(), mat, M.steel()]);
    b.position.set(0, 2.45, 0.08);
    b.rotation.z = a;
    g.add(shade(b));
  }
  g.add(box(1.1, 0.07, 0.07, M.steel(), 0, 1.75, 0.05));
  const lamps: THREE.MeshStandardMaterial[] = [];
  for (const dx of [-0.45, 0.45]) {
    const m = colMat('#ff3a22', { emissive: '#ff2a12', emissiveIntensity: 0 }).clone();
    lamps.push(m);
    const l = new THREE.Mesh(new THREE.CircleGeometry(0.13, 12), m);
    l.position.set(dx, 1.75, 0.12);
    g.add(l);
    g.add(box(0.34, 0.34, 0.08, colMat('#151515'), dx, 1.58, 0.06));
  }
  const glow = new THREE.PointLight('#ff4020', 0, 4, 1.8);
  glow.position.set(0, 1.8, 0.4);
  g.add(glow);
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
  return {
    update(t) {
      const on = Math.floor(t * 1.6) % 2;
      lamps[0]!.emissiveIntensity = on ? 3 : 0.1;
      lamps[1]!.emissiveIntensity = on ? 0.1 : 3;
      glow.intensity = night ? 2.4 : 0.6;
      glow.position.x = on ? -0.45 : 0.45;
    },
  };
}

/** A covered grain hopper car, rust-red, sloped bays underneath (rotY π/2 runs it along z). */
export function hopperCar(scene: THREE.Scene, cx: number, cz: number, paint = '#8a3a2e', rotY = 0): void {
  const g = new THREE.Group();
  const body = colMat(paint, { roughness: 0.75, metalness: 0.2 });
  g.add(box(4.4, 1.5, 1.55, body, 0, 0.85, 0));
  for (const x of [-1.4, 0, 1.4]) {
    const bay = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.6, 4), body);
    bay.rotation.set(Math.PI, Math.PI / 4, 0);
    bay.position.set(x, 0.6, 0);
    g.add(shade(bay));
  }
  g.add(box(4.5, 0.08, 1.65, M.tank(), 0, 2.35, 0));
  for (let x = -2; x <= 2; x += 0.5) g.add(box(0.04, 1.5, 0.04, colMat('#5a2a22'), x, 0.85, 0.79)); // ribs
  for (const x of [-1.7, 1.7]) for (const dz of [-0.5, 0.5]) {
    const w = new THREE.Mesh(cylGeo(0.26, 0.26, 0.12, 10), colMat('#2a221c', { metalness: 0.4 }));
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0.3, dz);
    g.add(shade(w));
  }
  vines(g, -2.0, 0.6, 0.8, 1.3, 1.2);
  g.position.set(cx, heightAt(cx, cz) - 0.05, cz);
  g.rotation.y = rotY;
  scene.add(g);
  const along = Math.abs(Math.sin(rotY)) > 0.5;
  addSolid(cx - (along ? 0.8 : 2.2), cz - (along ? 2.2 : 0.8), cx + (along ? 0.8 : 2.2), cz + (along ? 2.2 : 0.8));
}

let peelTex: THREE.CanvasTexture | null = null;
/** A billboard peeled down to nothing: layers of paper, no word left on any of them. */
export function blankBillboard(scene: THREE.Scene, x: number, z: number, rotY = 0): void {
  if (!peelTex) {
    const c = document.createElement('canvas');
    c.width = 96; c.height = 40;
    const g = c.getContext('2d')!;
    const r = rng(12);
    g.fillStyle = '#cfc4a8'; g.fillRect(0, 0, 96, 40);
    for (let i = 0; i < 26; i++) {
      g.fillStyle = ['#b8a888', '#8a9aa0', '#c8b890', '#a87a5a', '#e0d8c4'][Math.floor(r() * 5)]!;
      g.fillRect(r() * 90, r() * 36, 8 + r() * 30, 4 + r() * 14);
    }
    g.fillStyle = 'rgba(60,50,40,0.35)';
    for (let i = 0; i < 40; i++) g.fillRect(r() * 96, r() * 40, 1, 2 + r() * 8); // water streaks
    peelTex = new THREE.CanvasTexture(c);
    peelTex.magFilter = THREE.NearestFilter;
    peelTex.colorSpace = THREE.SRGBColorSpace;
  }
  const g = new THREE.Group();
  for (const dx of [-1.7, 1.7]) g.add(box(0.2, 3.6, 0.2, M.wood(), dx, 0, 0));
  g.add(beam(new THREE.Vector3(-1.7, 1.4, 0), new THREE.Vector3(1.7, 2.6, 0), 0.08, M.wood()));
  const face = new THREE.MeshStandardMaterial({ map: peelTex, roughness: 1 });
  const b = new THREE.Mesh(boxGeo(4.4, 1.9, 0.1), [M.wood(), M.wood(), M.wood(), M.wood(), face, M.wood()]);
  b.position.set(0, 3.4, 0.08);
  g.add(shade(b));
  vines(g, -1.8, 0, 0.14, 0.7, 3.0);
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rotY;
  scene.add(g);
  addSolid(x - 1.9, z - 0.25, x + 1.9, z + 0.25);
}

/** A grassed-over mound where a house used to be: one chimney still pokes out. */
export function hump(scene: THREE.Scene, x: number, z: number, rad: number, seed: number): void {
  const r = rng(seed);
  const m = new THREE.Mesh(new THREE.SphereGeometry(rad, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), colMat(r() > 0.5 ? '#6a7a3a' : '#7d7a45', { roughness: 1 }));
  m.scale.y = 0.35 + r() * 0.15;
  m.position.set(x, heightAt(x, z) - 0.05, z);
  scene.add(shade(m));
  if (r() > 0.3) {
    const ch = box(0.4, 0.9, 0.4, M.brick(), x + (r() - 0.5) * rad * 0.6, heightAt(x, z) + rad * 0.15, z + (r() - 0.5) * rad * 0.5);
    ch.rotation.z = (r() - 0.5) * 0.3;
    scene.add(ch);
  } else {
    const tin = box(1.1, 0.05, 0.7, M.tin(), x + rad * 0.3, heightAt(x, z) + rad * 0.3, z);
    tin.rotation.z = 0.5;
    scene.add(tin);
  }
  addSolid(x - rad * 0.8, z - rad * 0.8, x + rad * 0.8, z + rad * 0.8);
}

/** A yellow road-grader Ohm working a dirt road back and forth, keeping it smooth for no one. */
export function grader(scene: THREE.Scene, path: Array<[number, number]>, speed = 0.7): Built {
  const g = new THREE.Group();
  const yel = colMat('#c99a2a', { roughness: 0.6, metalness: 0.2 });
  g.add(box(1.0, 1.0, 1.0, yel, -0.9, 0.35, 0)); // cab
  g.add(box(0.9, 0.55, 0.95, colMat('#2a3a3a', { roughness: 0.3 }), -0.9, 0.95, 0)); // glass
  g.add(box(0.8, 0.08, 1.05, yel, -0.9, 1.5, 0));
  g.add(box(2.6, 0.28, 0.4, yel, 0.5, 0.65, 0)); // the long frame
  g.add(box(0.35, 0.5, 1.7, M.steel(), 0.3, 0.05, 0)); // the blade
  for (const [wx, wz] of [[-1.2, 0.55], [-1.2, -0.55], [1.6, 0.5], [1.6, -0.5], [-0.6, 0.55], [-0.6, -0.55]] as Array<[number, number]>) {
    const w = new THREE.Mesh(cylGeo(0.32, 0.32, 0.25, 12), colMat('#1d1b19'));
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.32, wz);
    g.add(shade(w));
  }
  const eye = new THREE.Mesh(new THREE.CircleGeometry(0.09, 10), colMat('#ffd27a', { emissive: '#ffb84a', emissiveIntensity: 2.5 }));
  eye.position.set(2.0, 0.6, 0);
  eye.rotation.y = Math.PI / 2;
  g.add(eye);
  scene.add(g);
  const seg = path.slice(1).map((q, i) => Math.hypot(q[0] - path[i]![0], q[1] - path[i]![1]));
  const total = seg.reduce((a, b) => a + b, 0);
  const at = (d: number): [number, number, number] => {
    for (let i = 0; i < seg.length; i++) {
      if (d <= seg[i]! || i === seg.length - 1) {
        const a = path[i]!, b = path[i + 1]!, f = Math.min(1, d / seg[i]!);
        return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, Math.atan2(-(b[1] - a[1]), b[0] - a[0])];
      }
      d -= seg[i]!;
    }
    return [path[0]![0], path[0]![1], 0];
  };
  return {
    update(t) {
      // there and back along the road, turning at each end
      const k = (t * speed) % (total * 2), fwd = k < total, dd = fwd ? k : total * 2 - k;
      const [x, z, a] = at(dd);
      g.position.set(x, heightAt(x, z), z);
      g.rotation.y = a + (fwd ? 0 : Math.PI);
    },
  };
}

/** A Garrison checkpoint: barrier arm, concrete blocks, sandbags, the stencil. */
export function checkpoint(scene: THREE.Scene, x: number, z: number, armLen: number): void {
  const g = new THREE.Group();
  const conc = M.concrete();
  g.add(box(0.6, 1.0, 0.6, conc, 0, 0, 0));
  stencil(g, 0, 0.55, 0.31, 0, 0.42);
  const arm = new THREE.Group();
  arm.position.set(0, 0.95, 0);
  arm.rotation.z = -0.04;
  const stripes = M.hazard();
  arm.add(beam(new THREE.Vector3(0, 0, 0), new THREE.Vector3(armLen, 0, 0), 0.12, stripes));
  g.add(arm);
  for (let i = 0; i < 5; i++) {
    const s = box(0.55, 0.22, 0.32, colMat('#8a7a5a', { roughness: 1 }), -0.9 - (i % 3) * 0.55, Math.floor(i / 3) * 0.22, 0.2);
    s.rotation.y = (i % 2) * 0.15;
    g.add(s);
  }
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 2.4, z - 0.35, x + 0.35, z + 0.45);
}

/** A sagging run of steel guardrail on stub posts. */
export function guardrail(scene: THREE.Scene, pts: Array<[number, number]>): void {
  const g = new THREE.Group();
  const steel = colMat('#9a9890', { metalness: 0.5, roughness: 0.55 });
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i]!, [bx, bz] = pts[i + 1]!;
    const n = Math.max(1, Math.round(Math.hypot(bx - ax, bz - az) / 1.8));
    for (let k = 0; k <= n; k++) {
      const x = ax + ((bx - ax) * k) / n, zz = az + ((bz - az) * k) / n;
      g.add(box(0.1, 0.6, 0.1, M.wood(), x, heightAt(x, zz) - 0.05, zz));
    }
    g.add(beam(new THREE.Vector3(ax, heightAt(ax, az) + 0.48, az), new THREE.Vector3(bx, heightAt(bx, bz) + 0.42, bz), 0.12, steel));
  }
  scene.add(g);
}

/** A tripod spotting scope the Garrison left at the checkpoint, still aimed north. */
export function scope(scene: THREE.Scene, x: number, z: number): void {
  const g = new THREE.Group();
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    g.add(beam(new THREE.Vector3(0, 1.1, 0), new THREE.Vector3(Math.cos(a) * 0.35, 0, Math.sin(a) * 0.35), 0.04, M.steel()));
  }
  const tube = new THREE.Mesh(cylGeo(0.06, 0.08, 0.6, 10), colMat('#4a5048', { metalness: 0.4 }));
  tube.rotation.x = Math.PI / 2 - 0.15;
  tube.position.set(0, 1.18, -0.1);
  g.add(shade(tube));
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.25, z - 0.25, x + 0.25, z + 0.25);
}

/** A ruined brick shell: four walls with the roof long gone, windows blown out. */
export function brickShell(scene: THREE.Scene, cx: number, cz: number, w: number, d: number, h: number, seed: number): THREE.Group {
  const r = rng(seed);
  const g = new THREE.Group();
  const brick = M.brick();
  const wall = (len: number, x: number, z: number, rot: number): void => {
    const seg = 1.0;
    for (let a = -len / 2 + seg / 2; a < len / 2; a += seg) {
      const hh = h * (0.45 + r() * 0.55);
      if (r() < 0.12) continue; // a gap blown through
      const b = box(seg + 0.02, hh, 0.3, brick, 0, 0, 0);
      const holder = new THREE.Group();
      holder.add(b);
      holder.position.set(x + Math.cos(rot) * a, 0, z - Math.sin(rot) * a);
      holder.rotation.y = rot;
      g.add(holder);
    }
  };
  wall(w, 0, -d / 2, 0); wall(w, 0, d / 2, 0);
  wall(d, -w / 2, 0, Math.PI / 2); wall(d, w / 2, 0, Math.PI / 2);
  for (let i = 0; i < 8; i++) {
    const b = box(0.4 + r() * 0.5, 0.2, 0.3 + r() * 0.3, brick, (r() - 0.5) * w * 0.8, 0, (r() - 0.5) * d * 0.8);
    b.rotation.y = r() * 3;
    g.add(b);
  }
  vines(g, -w / 2 + 0.6, 0, d / 2 + 0.16, 1.6, h * 0.7);
  put(g, cx, cz, w, d, scene);
  addSolid(cx - w / 2 - 0.15, cz - d / 2 - 0.15, cx + w / 2 + 0.15, cz - d / 2 + 0.2);
  addSolid(cx - w / 2 - 0.15, cz + d / 2 - 0.2, cx + w / 2 + 0.15, cz + d / 2 + 0.15);
  addSolid(cx - w / 2 - 0.15, cz - d / 2, cx - w / 2 + 0.2, cz + d / 2);
  addSolid(cx + w / 2 - 0.2, cz - d / 2, cx + w / 2 + 0.15, cz + d / 2);
  return g;
}

/** A cattle loading chute: a wooden ramp between two plank walls. */
export function loadingChute(scene: THREE.Scene, x: number, z: number, rotY: number): void {
  const g = new THREE.Group();
  const wood = M.grey();
  const ramp = box(1.0, 0.1, 3.0, M.wood(), 0, 0, 0);
  ramp.rotation.x = -0.25;
  ramp.position.y = 0.4;
  g.add(ramp);
  for (const sx of [-0.55, 0.55]) {
    for (let k = 0; k < 4; k++) g.add(box(0.08, 1.4 + k * 0.1, 0.08, M.wood(), sx, 0, -1.3 + k * 0.85));
    for (const y of [0.45, 0.85, 1.25]) g.add(box(0.05, 0.16, 3.0, wood, sx, y, 0));
  }
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rotY;
  scene.add(g);
  const c = Math.abs(Math.cos(rotY)), s = Math.abs(Math.sin(rotY));
  addSolid(x - (0.7 * c + 1.6 * s), z - (1.6 * c + 0.7 * s), x + (0.7 * c + 1.6 * s), z + (1.6 * c + 0.7 * s));
}

/** A steel tube gate that swings open at dusk and shut at dawn, for cattle that never come. */
export function swingGate(scene: THREE.Scene, x: number, z: number, w: number, rotY: number): Built {
  const g = new THREE.Group();
  const pipe = colMat('#8a8f88', { metalness: 0.5, roughness: 0.5 });
  g.add(cyl(0.09, 0.09, 1.5, pipe, 0, 0, 0, 8));
  g.add(cyl(0.09, 0.09, 1.5, pipe, w, 0, 0, 8));
  const leaf = new THREE.Group();
  for (const y of [0.35, 0.7, 1.05, 1.3]) leaf.add(beam(new THREE.Vector3(0.1, y, 0), new THREE.Vector3(w - 0.15, y, 0), 0.05, pipe));
  leaf.add(beam(new THREE.Vector3(0.1, 0.3, 0), new THREE.Vector3(w - 0.15, 1.3, 0), 0.04, pipe));
  stencil(leaf, w / 2, 0.85, 0.04, 0, 0.36);
  g.add(leaf);
  g.position.set(x, heightAt(x, z), z);
  g.rotation.y = rotY;
  scene.add(g);
  return { update(t) { leaf.rotation.y = -(0.5 + 0.5 * Math.sin(t * 0.08)) * 1.3; } };
}

/** A concrete bridge deck broken into the creek, rebar curling out of the ends. */
export function brokenBridge(scene: THREE.Scene, x0: number, x1: number, z: number, y: number): void {
  const g = new THREE.Group();
  const conc = M.concrete();
  const rebar = colMat('#6a4a32', { metalness: 0.4 });
  const L = x1 - x0;
  const a = box(L * 0.34, 0.35, 2.4, conc, x0 + L * 0.17, y + 0.2, z); a.rotation.z = -0.12; g.add(a);
  const b = box(L * 0.3, 0.35, 2.4, conc, x0 + L * 0.52, y - 0.55, z + 0.2); b.rotation.z = 0.35; b.rotation.y = 0.15; g.add(b);
  const c = box(L * 0.3, 0.35, 2.4, conc, x1 - L * 0.15, y + 0.2, z); c.rotation.z = 0.1; g.add(c);
  for (const [bx, s] of [[x0 + L * 0.34, 1], [x1 - L * 0.3, -1]] as Array<[number, number]>)
    for (const dz of [-0.8, -0.2, 0.4, 0.9]) g.add(beam(new THREE.Vector3(bx, y + 0.35, z + dz), new THREE.Vector3(bx + s * 0.5, y - 0.1, z + dz + 0.1), 0.04, rebar));
  for (const px of [x0 + L * 0.33, x1 - L * 0.33]) g.add(box(0.5, 1.6, 0.5, conc, px, y - 1.4, z));
  scene.add(g);
}

/** A hand pump over a trough at the ford, worked by a small pump Ohm that keeps it full. */
export function pumpTrough(scene: THREE.Scene, x: number, z: number): Built {
  const g = new THREE.Group();
  g.add(box(1.6, 0.45, 0.6, M.wood(), 0, 0, 0));
  const w = new THREE.Mesh(planeGeo(1.5, 0.5), colMat('#3f6a62', { roughness: 0.2 }));
  w.rotation.x = -Math.PI / 2;
  w.position.set(0, 0.4, 0);
  g.add(w);
  g.add(cyl(0.07, 0.09, 1.2, colMat('#2f4a3a', { metalness: 0.4 }), 0.95, 0, 0, 8));
  const handle = new THREE.Group();
  handle.position.set(0.95, 1.15, 0);
  handle.add(beam(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.6, 0.1, 0), 0.05, M.steel()));
  g.add(handle);
  g.add(beam(new THREE.Vector3(0.95, 0.95, 0), new THREE.Vector3(0.55, 0.85, 0), 0.05, M.steel())); // spout
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.85, z - 0.35, x + 1.1, z + 0.35);
  return { update(t) { handle.rotation.z = Math.sin(t * 2.2) * 0.35; } };
}

/** A rail line running north–south (ties across x), sagging where nobody runs it. */
export function railLineV(scene: THREE.Scene, x: number, z0: number, z1: number, seed = 31): void {
  const g = new THREE.Group();
  const tie = M.wood(), rail = colMat('#5a4a3c', { metalness: 0.5, roughness: 0.55 });
  const r = rng(seed);
  for (let z = z0; z < z1; z += 0.55) {
    if (r() < 0.12) continue;
    const t = box(1.5, 0.08, 0.22, tie, x + (r() - 0.5) * 0.08, heightAt(x, z) - 0.03, z);
    t.rotation.y = (r() - 0.5) * 0.12;
    g.add(t);
  }
  for (const dx of [-0.45, 0.45]) {
    const n = Math.ceil((z1 - z0) / 1.5);
    for (let i = 0; i < n; i++) {
      const az = z0 + i * 1.5, bz = Math.min(z1, az + 1.5);
      g.add(beam(new THREE.Vector3(x + dx, heightAt(x + dx, az) + 0.1, az), new THREE.Vector3(x + dx, heightAt(x + dx, bz) + 0.1, bz), 0.07, rail));
    }
  }
  scene.add(g);
}

/** The grain elevator: a row of tall concrete silos, the headhouse on top,
 *  the bucket leg and spouts, and the dump shed at its foot (the dungeon door). */
export function grainElevator(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const conc = M.concrete();
  const n = 4, R = 1.0, H = 8.2;
  for (let i = 0; i < n; i++) {
    const x = (i - (n - 1) / 2) * (R * 2 - 0.08);
    g.add(cyl(R, R, H, conc, x, 0, 0, 22));
    g.add(box(0.06, H - 0.4, 0.06, colMat('#6a645b'), x + 0.2, 0.2, R - 0.02)); // stain streaks
  }
  g.add(box(n * R * 2, 0.25, R * 2, conc, 0, H, 0)); // the gallery deck
  g.add(box(2.4, 2.2, 1.8, M.tin(), 0.6, H + 0.25, 0)); // headhouse
  g.add(box(2.6, 0.12, 2.0, M.tank(), 0.6, H + 2.45, 0));
  windowAt(g, 0.2, H + 1.4, 0.91, 0.5, 0.45, 0, 'boarded');
  // the bucket leg climbs the front, spouts fan down to the shed
  g.add(box(0.5, H + 2.0, 0.5, M.tin(), -R * 2.9, 0, R + 0.4));
  for (const [ex, ez] of [[-3.4, 3.2], [-1.0, 3.4]] as Array<[number, number]>) g.add(beam(new THREE.Vector3(-R * 2.9, H + 1.2, R + 0.4), new THREE.Vector3(ex, 2.5, ez), 0.14, M.tank()));
  // the dump shed: tin lean-to over the truck pit, the door into the tower
  const shed = new THREE.Group();
  shed.add(box(4.2, 2.6, 2.4, M.tin(), 0, 0, 0));
  const roof = box(4.6, 0.08, 2.9, M.tin(), 0, 2.7, 0.1);
  roof.rotation.x = 0.12;
  shed.add(roof);
  shed.add(box(1.4, 2.0, 0.05, M.dark(), -0.6, 0, 1.21));
  shed.add(box(1.4, 2.0, 0.06, M.tin(), 0.3, 0, 1.24)); // the slid-open door
  shed.position.set(-2.0, 0, R + 1.6);
  g.add(shed);
  brassTag(shed, 0.6, 1.5, 1.23);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.5), new THREE.MeshStandardMaterial({ map: textTexture('CO-OP', { w: 96, h: 16, fg: '#d8d0bc', font: 'bold 12px monospace', worn: 0.6, seed: 17 }), transparent: true, alphaTest: 0.4, roughness: 1 }));
  sign.position.set(0, H - 1.2, R + 0.02);
  g.add(sign);
  vines(g, R * 1.5, 0, R - 0.05, 1.4, 3.2);
  vines(g, -R * 1.6, 0, R - 0.05, 1.0, 2.0);
  put(g, cx, cz, n * R * 2, R * 2, scene);
  addSolid(cx - n * R, cz - R, cx + n * R, cz + R);
  addSolid(cx - 4.2, cz + R + 0.4, cx + 0.2, cz + R + 2.8);
  addSolid(cx - R * 2.9 - 0.35, cz + R + 0.1, cx - R * 2.9 + 0.35, cz + R + 0.7);
  return {};
}

/** A shopping cart, wheels rusted, nosed into the weeds. */
export function shoppingCart(scene: THREE.Scene, x: number, z: number, rot: number, tipped = false): void {
  const g = new THREE.Group();
  const wire = colMat('#9aa0a0', { metalness: 0.6, roughness: 0.4 });
  g.add(box(0.55, 0.03, 0.85, wire, 0, 0.35, 0));
  for (const sx of [-0.27, 0.27]) g.add(box(0.03, 0.45, 0.85, cageMatLite(), sx, 0.38, 0));
  g.add(box(0.55, 0.45, 0.03, cageMatLite(), 0, 0.38, 0.42));
  g.add(box(0.55, 0.45, 0.03, cageMatLite(), 0, 0.38, -0.42));
  g.add(beam(new THREE.Vector3(-0.28, 0.85, -0.5), new THREE.Vector3(0.28, 0.85, -0.5), 0.04, colMat('#b8402e')));
  for (const [wx, wz] of [[-0.22, 0.35], [0.22, 0.35], [-0.22, -0.35], [0.22, -0.35]] as Array<[number, number]>) g.add(cyl(0.05, 0.05, 0.3, colMat('#2a2a2a'), wx, 0, wz, 6));
  g.position.set(x, heightAt(x, z), z);
  g.rotation.set(0, rot, tipped ? 1.4 : 0);
  scene.add(g);
  addSolid(x - 0.4, z - 0.4, x + 0.4, z + 0.4);
}
let cageLite: THREE.MeshStandardMaterial | null = null;
function cageMatLite(): THREE.MeshStandardMaterial {
  if (!cageLite) {
    const c = document.createElement('canvas');
    c.width = 8; c.height = 8;
    const g = c.getContext('2d')!;
    g.fillStyle = '#a8aeae';
    for (let i = 0; i < 8; i += 2) { g.fillRect(i, 0, 1, 8); g.fillRect(0, i, 8, 1); }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    cageLite = new THREE.MeshStandardMaterial({ map: tex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide, metalness: 0.5 });
  }
  return cageLite;
}

/** The drive-in screen: a tall white panel on a braced steel frame. At night
 *  it glows faintly with nothing the projector shows. */
export function driveInScreen(scene: THREE.Scene, cx: number, cz: number, w: number, night: boolean): Built {
  const g = new THREE.Group();
  const H = 5.2, y0 = 1.4;
  const face = colMat('#e8e2d2', { roughness: 0.95, emissive: '#d8e0f0', emissiveIntensity: 0 }).clone();
  const panel = box(w, H, 0.15, [M.wood(), M.wood(), M.wood(), M.wood(), face, M.grey()], 0, y0, 0);
  g.add(panel);
  // weather has peeled whole strips off the panel
  for (let i = 0; i < 6; i++) g.add(box(0.3 + (i % 3) * 0.4, 0.5 + (i % 2) * 0.6, 0.02, colMat('#9a9282'), -w / 2 + 0.8 + i * (w / 6.5), y0 + 0.4 + ((i * 3) % 5) * 0.8, 0.09));
  for (let x = -w / 2; x <= w / 2 + 0.01; x += w / 4) {
    g.add(box(0.2, y0 + H + 0.2, 0.2, M.steel(), x, 0, -0.3));
    g.add(beam(new THREE.Vector3(x, y0 + H * 0.8, -0.3), new THREE.Vector3(x, 0, -2.4), 0.12, M.steel()));
  }
  vines(g, -w / 2 + 0.2, 0, 0.1, 1.4, 3.0);
  vines(g, w / 2 - 1.6, 0, 0.1, 1.2, 2.2);
  g.position.set(cx, heightAt(cx, cz), cz);
  scene.add(g);
  addSolid(cx - w / 2 - 0.2, cz - 2.6, cx + w / 2 + 0.2, cz + 0.2);
  return { update(t) { face.emissiveIntensity = night ? 0.35 + Math.sin(t * 13) * 0.05 + Math.sin(t * 2.3) * 0.08 : 0; } };
}

/** A speaker post between the parking rows, one speaker still hung on its hook. */
export function speakerPost(scene: THREE.Scene, x: number, z: number, seed: number): void {
  const r = rng(seed);
  const g = new THREE.Group();
  g.add(cyl(0.05, 0.06, 1.0, M.steel(), 0, 0, 0, 6));
  if (r() > 0.3) g.add(box(0.25, 0.2, 0.12, colMat('#5a5a52', { metalness: 0.4 }), 0.12, 0.85, 0));
  if (r() > 0.5) g.add(box(0.25, 0.2, 0.12, colMat('#6a5a42', { metalness: 0.4 }), -0.12, 0.85, 0));
  g.position.set(x, heightAt(x, z), z);
  g.rotation.z = (r() - 0.5) * 0.2;
  scene.add(g);
  addSolid(x - 0.1, z - 0.1, x + 0.1, z + 0.1);
}

/** The projection booth and snack bar. At night the projector Ohm throws a
 *  beam at the screen, flickering with nothing on it. */
export function projectorBooth(scene: THREE.Scene, cx: number, cz: number, night: boolean, screenZ: number): Built {
  const g = new THREE.Group();
  const block = colMat('#b8b0a0', { roughness: 1 });
  g.add(box(4.6, 2.4, 3.0, block, 0, 0, 0));
  g.add(box(4.9, 0.12, 3.3, M.tin(), 0, 2.4, 0));
  g.add(box(1.4, 0.9, 1.2, block, 0, 2.5, -0.6)); // the booth on the roof
  g.add(box(0.35, 0.25, 0.05, colMat('#1a1a1a'), 0, 2.95, -1.22)); // its port
  g.add(box(3.2, 0.8, 0.05, M.dark(), 0, 1.0, 1.51)); // the snack window
  g.add(box(3.4, 0.08, 0.5, M.tin(), 0, 2.0, 1.75)); // awning
  brassTag(g, 0.45, 2.92, -1.23);
  vines(g, 1.2, 0, 1.52, 1.0, 2.0);
  put(g, cx, cz, 4.6, 3.0, scene);
  addSolid(cx - 2.3, cz - 1.5, cx + 2.3, cz + 1.5);
  // the beam: a long additive cone from the port toward the screen
  const len = Math.max(4, cz - 1.2 - screenZ);
  const geo = new THREE.ConeGeometry(2.6, len, 16, 1, true);
  geo.translate(0, -len / 2, 0);
  const mat = new THREE.MeshBasicMaterial({ color: '#cfe0ff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const beamMesh = new THREE.Mesh(geo, mat);
  beamMesh.position.set(cx, (g.position.y || heightAt(cx, cz)) + 2.95, cz - 1.25);
  beamMesh.rotation.x = Math.PI / 2 + 0.06; // apex at the port, opening north toward the screen
  scene.add(beamMesh);
  const lamp = new THREE.PointLight('#d8e4ff', 0, 7, 1.6);
  lamp.position.set(cx, heightAt(cx, cz) + 3.0, cz - 1.6);
  scene.add(lamp);
  return {
    update(t) {
      const f = 0.85 + Math.sin(t * 17) * 0.08 + Math.sin(t * 5.3) * 0.07;
      mat.opacity = night ? 0.07 * f : 0;
      lamp.intensity = night ? 1.6 * f : 0;
    },
  };
}

/** A roadside letter board on a pole: a sign Ohm that keeps flipping its last letters, spelling nothing. */
export function signFlipper(scene: THREE.Scene, x: number, z: number): Built {
  const g = new THREE.Group();
  g.add(box(0.14, 3.0, 0.14, M.steel(), 0, 0, 0));
  g.add(box(2.4, 0.9, 0.12, colMat('#2a2a28'), 0, 3.0, 0));
  const letters = 'ABCDEHKLMNORSTW';
  const tiles: THREE.Mesh[][] = [];
  const mats = new Map<string, THREE.MeshStandardMaterial>();
  const matFor = (ch: string): THREE.MeshStandardMaterial => {
    let m = mats.get(ch);
    if (!m) { m = new THREE.MeshStandardMaterial({ map: textTexture(ch, { w: 12, h: 16, bg: '#e8e2d2', fg: '#1a1a1a', font: 'bold 13px monospace', worn: 0.15, seed: ch.charCodeAt(0) }), roughness: 0.9 }); mats.set(ch, m); }
    return m;
  };
  for (let i = 0; i < 5; i++) {
    const tile = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.5), matFor(letters[i * 3 % letters.length]!));
    tile.position.set(-0.9 + i * 0.45, 3.45, 0.07);
    g.add(tile);
    tiles.push([tile]);
  }
  g.position.set(x, heightAt(x, z), z);
  scene.add(g);
  addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
  let last = -1;
  return {
    update(t) {
      const k = Math.floor(t / 1.3);
      if (k === last) return;
      last = k;
      // only the last two tiles still turn; the first three stuck years ago
      for (const i of [3, 4]) tiles[i]![0]!.material = matFor(letters[(k * (i + 2) + i * 5) % letters.length]!);
    },
  };
}

/** The orange warehouse front: a long tilt-up wall, an orange band with every
 *  letter long gone, loading docks, the entrance hall (the dungeon door). */
export function warehouseFront(scene: THREE.Scene, cx: number, cz: number, w: number): void {
  const g = new THREE.Group();
  const wall = colMat('#b8b0a2', { roughness: 1 });
  const D = 6, H = 5.0;
  g.add(box(w, H, D, wall, 0, 0, 0));
  g.add(box(w + 0.1, 0.9, D + 0.1, colMat('#d0702a', { roughness: 0.9 }), 0, H - 1.1, 0)); // the orange band
  for (let i = 0; i < 7; i++) g.add(box(0.5 + (i % 3) * 0.3, 0.55, 0.02, colMat('#c8b8a0'), -w / 2 + 1.5 + i * (w / 7.5), H - 0.95, D / 2 + 0.06)); // ghosts of lost letters
  // the entrance hall, set forward, doors gone dark
  const hall = new THREE.Group();
  hall.add(box(4.0, 3.4, 1.6, wall, 0, 0, 0));
  hall.add(box(4.2, 0.6, 1.8, colMat('#d0702a'), 0, 3.4, 0));
  hall.add(box(2.6, 2.4, 0.05, M.dark(), 0, 0, 0.81));
  for (const dx of [-0.65, 0.65]) hall.add(box(1.2, 2.3, 0.04, colMat('#2a3a3a', { roughness: 0.2, metalness: 0.2 }), dx, 0.05, 0.84));
  hall.position.set(-w * 0.18, 0, D / 2 + 0.8);
  g.add(hall);
  // loading docks down the east end
  for (let i = 0; i < 3; i++) {
    const x = w * 0.18 + i * 2.6;
    g.add(box(2.0, 2.6, 0.05, i === 1 ? M.dark() : M.tin(), x, 0.9, D / 2 + 0.03));
    g.add(box(2.4, 0.9, 1.2, M.concrete(), x, 0, D / 2 + 0.6));
  }
  vines(g, -w / 2 + 0.5, 0, D / 2 + 0.05, 2.4, 3.8);
  vines(g, w / 2 - 3.0, 0, D / 2 + 0.05, 1.8, 2.6);
  put(g, cx, cz, w, D, scene);
  addSolid(cx - w / 2, cz - D / 2, cx + w / 2, cz + D / 2 + 0.2);
  addSolid(cx - w * 0.18 - 2.0, cz + D / 2, cx - w * 0.18 + 2.0, cz + D / 2 + 1.5);
  addSolid(cx + w * 0.18 - 1.2, cz + D / 2, cx + w * 0.18 + 6.4, cz + D / 2 + 1.2);
}

/** An old fuel stop: a sagging canopy on four posts over two dead pump islands. */
export function fuelCanopy(scene: THREE.Scene, cx: number, cz: number): void {
  const g = new THREE.Group();
  for (const [x, z] of [[-3, -1.6], [3, -1.6], [-3, 1.6], [3, 1.6]] as Array<[number, number]>) g.add(box(0.3, 3.2, 0.3, colMat('#c8c4b8'), x, 0, z));
  const roof = box(7.4, 0.5, 4.4, colMat('#d8d4c8'), 0, 3.2, 0);
  roof.rotation.z = 0.04;
  g.add(roof);
  g.add(box(7.5, 0.25, 4.5, colMat('#8a3a2e'), 0, 3.15, 0));
  for (const x of [-1.5, 1.5]) {
    g.add(box(1.8, 0.2, 0.7, M.concrete(), x, 0, 0));
    for (const dx of [-0.45, 0.45]) {
      const pump = box(0.45, 1.2, 0.35, colMat(dx < 0 ? '#b8402e' : '#c8c0aa'), x + dx, 0.2, 0);
      pump.rotation.z = dx < 0 ? 0.05 : -0.1;
      g.add(pump);
    }
  }
  vines(g, -3.1, 0, 0.16, 0.6, 2.8);
  put(g, cx, cz, 7.4, 4.4, scene);
  for (const [x, z] of [[-3, -1.6], [3, -1.6], [-3, 1.6], [3, 1.6]] as Array<[number, number]>) addSolid(cx + x - 0.2, cz + z - 0.2, cx + x + 0.2, cz + z + 0.2);
  addSolid(cx - 2.4, cz - 0.4, cx + 2.4, cz + 0.4);
}

/** Telephone poles strung along a line of points (wires sag between them). */
export function poles(scene: THREE.Scene, pts: Array<[number, number]>): void {
  powerLine(scene, pts.map(([x, z], i) => [x, z, ((i * 37) % 7 - 3) * 0.02] as [number, number, number]), pts.slice(1).map((_, i) => [i, i + 1] as [number, number]));
  for (const [x, z] of pts) addSolid(x - 0.15, z - 0.15, x + 0.15, z + 0.15);
}
