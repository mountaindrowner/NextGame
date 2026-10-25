import * as THREE from 'three';
import { box, cyl, beam, colMat, shade, boxGeo } from '../geo';
import { addSolid } from '../world';
import { KM } from '../ohmstead/kit';
import type { Built } from '../field/buildings';

/** Props for the region's dungeon interiors. */

/** A bucket elevator: cups on a belt running a loop up one side and down the other (the y–z plane at x). */
export function bucketLoop(root: THREE.Object3D, x: number, z: number, y0: number, y1: number, n: number, speed = 0.45): Built {
  const R = 0.38, H = y1 - y0, L = 2 * H + 2 * Math.PI * R;
  const cups: THREE.Mesh[] = [];
  const mat = colMat('#8a5a3a', { metalness: 0.3, roughness: 0.7 });
  for (let i = 0; i < n; i++) { const c = new THREE.Mesh(boxGeo(0.34, 0.18, 0.22), mat); root.add(shade(c)); cups.push(c); }
  // the casing's open front shows the belt
  root.add(box(0.12, H + 0.8, 0.12, KM.steel(), x - 0.25, y0 - 0.4, z - R - 0.2));
  root.add(box(0.12, H + 0.8, 0.12, KM.steel(), x - 0.25, y0 - 0.4, z + R + 0.2));
  const pos = (s: number): [number, number, number] => {
    s = ((s % L) + L) % L;
    if (s < H) return [y0 + s, z + R, 0]; // up the front
    s -= H;
    if (s < Math.PI * R) { const a = s / R; return [y1 + Math.sin(a) * R, z + Math.cos(a) * R, a]; } // over the head
    s -= Math.PI * R;
    if (s < H) return [y1 - s, z - R, Math.PI]; // down the back
    s -= H;
    const a = s / R;
    return [y0 - Math.sin(a) * R, z - Math.cos(a) * R, Math.PI + a]; // round the boot
  };
  return {
    update(t) {
      cups.forEach((c, i) => {
        const [y, cz, a] = pos(t * speed + (i * L) / n);
        c.position.set(x, y, cz);
        c.rotation.x = -a; // tipping over the top: pouring out nothing
      });
    },
  };
}

/** A pulley wheel turning on an axle along x. */
export function wheel(root: THREE.Object3D, x: number, y: number, z: number, rad: number, speed: number): Built {
  const g = new THREE.Group();
  const rim = new THREE.Mesh(new THREE.TorusGeometry(rad, rad * 0.08, 6, 20), KM.steel());
  rim.rotation.y = Math.PI / 2;
  g.add(shade(rim));
  for (let k = 0; k < 6; k++) { const sp = new THREE.Mesh(boxGeo(0.05, rad * 2, 0.06), KM.steel()); sp.rotation.x = (k / 6) * Math.PI; g.add(sp); }
  g.add(cyl(0.08, 0.08, 0.6, KM.rust(), 0, -0.3, 0, 8).rotateZ(Math.PI / 2));
  g.position.set(x, y, z);
  root.add(g);
  return { update(t) { g.rotation.x = -t * speed; } };
}

/** A short flight of steel stairs climbing north, with a handrail. */
export function stairs(root: THREE.Object3D, x: number, z: number, up = true): void {
  for (let k = 0; k < 6; k++) root.add(box(1.4, 0.18, 0.35, KM.steel(), x, up ? k * 0.32 : 0, z - k * 0.35));
  for (const dx of [-0.72, 0.72]) root.add(beam(new THREE.Vector3(x + dx, 0.95, z + 0.1), new THREE.Vector3(x + dx, 2.8, z - 2.0), 0.05, KM.steel()));
  addSolid(x - 0.75, z - 2.1, x + 0.75, z - 0.5);
}

/** A concrete hopper cone: the bottom of a grain bin poking through the ceiling. */
export function hopper(root: THREE.Object3D, x: number, z: number): void {
  const c = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.25, 1.4, 16), KM.concrete());
  c.position.set(x, 2.4, z);
  root.add(shade(c));
  root.add(cyl(0.25, 0.25, 0.9, KM.steel(), x, 1.0, z, 10));
  root.add(box(0.5, 0.25, 0.5, KM.rust(), x, 0.8, z));
  addSolid(x - 0.35, z - 0.35, x + 0.35, z + 0.35);
}

/** A cylinder top seen down through the grates: a bin full of nothing. */
export function binTop(root: THREE.Object3D, x: number, z: number, rad: number): void {
  const t = new THREE.Mesh(new THREE.CylinderGeometry(rad, rad, 0.4, 20, 1, true), KM.concrete());
  t.position.set(x, -0.6, z);
  root.add(t);
  const dark = new THREE.Mesh(new THREE.CircleGeometry(rad - 0.05, 20), colMat('#050404'));
  dark.rotation.x = -Math.PI / 2;
  dark.position.set(x, -0.75, z);
  root.add(dark);
}

/** Tall orange warehouse racking: uprights, beams, shelves, a few boxes left. */
export function rack(root: THREE.Object3D, x: number, z0: number, z1: number, seed: number): void {
  const orange = colMat('#d0702a', { roughness: 0.6, metalness: 0.2 }), blue = colMat('#3a5a7a', { roughness: 0.6, metalness: 0.3 });
  let s = seed;
  const rnd = (): number => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let z = z0; z <= z1 + 0.01; z += 2.0) for (const dx of [-0.45, 0.45]) root.add(box(0.1, 3.6, 0.1, blue, x + dx, 0, z));
  for (const y of [0.3, 1.3, 2.3, 3.3]) {
    for (const dx of [-0.45, 0.45]) root.add(box(0.06, 0.12, z1 - z0, orange, x + dx, y, (z0 + z1) / 2));
    root.add(box(0.9, 0.04, z1 - z0, colMat('#8a8478'), x, y + 0.1, (z0 + z1) / 2));
    for (let z = z0 + 0.5; z < z1; z += 0.8) if (rnd() < 0.3) root.add(box(0.55, 0.3 + rnd() * 0.3, 0.6, colMat(['#b89a6a', '#a8885a', '#c8b088'][Math.floor(rnd() * 3)]!), x, y + 0.14, z));
  }
  addSolid(x - 0.55, z0 - 0.1, x + 0.55, z1 + 0.1);
}

/** A forklift Ohm working an aisle, forks rising and falling as it "restocks". */
export function forklift(root: THREE.Object3D, x: number, z0: number, z1: number, speed = 0.6): Built {
  const g = new THREE.Group();
  const yel = colMat('#d8a830', { roughness: 0.6, metalness: 0.2 });
  g.add(box(0.9, 0.7, 1.3, yel, 0, 0.15, 0));
  g.add(box(0.8, 0.5, 0.6, colMat('#2a2a28'), 0, 0.85, 0.2));
  const mast = new THREE.Group();
  mast.position.set(0, 0, -0.75);
  for (const dx of [-0.3, 0.3]) mast.add(box(0.08, 2.0, 0.08, KM.steel(), dx, 0, 0));
  const forks = new THREE.Group();
  for (const dx of [-0.22, 0.22]) forks.add(box(0.08, 0.05, 0.8, KM.steel(), dx, 0, -0.4));
  forks.add(box(0.7, 0.4, 0.05, KM.steel(), 0, 0, 0));
  mast.add(forks);
  g.add(mast);
  const eye = new THREE.Mesh(new THREE.CircleGeometry(0.07, 10), colMat('#ffd27a', { emissive: '#ffb84a', emissiveIntensity: 2.5 }));
  eye.position.set(0, 0.7, -0.66);
  eye.rotation.y = Math.PI;
  g.add(eye);
  root.add(g);
  const len = z1 - z0;
  return {
    update(t) {
      const k = (t * speed) % (len * 2), fwd = k < len, zz = fwd ? z0 + k : z1 - (k - len);
      g.position.set(x, 0, zz);
      g.rotation.y = fwd ? Math.PI : 0;
      forks.position.y = 0.15 + (0.5 + 0.5 * Math.sin(t * 0.9)) * 1.4;
    },
  };
}
