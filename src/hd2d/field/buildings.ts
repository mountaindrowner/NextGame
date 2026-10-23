import * as THREE from 'three';
import { T, Pix, textTexture } from '../textures';
import { box, cyl, beam, boxGeo, cylGeo, planeGeo, texMat, colMat, shade, prism } from '../geo';
import { addSolid, heightAt } from '../world';
import { rng } from '../noise';

/**
 * Version B — bespoke buildings, each modeled by hand. Fronts face +z (south,
 * toward the fixed camera). Every structure is a ruin being reclaimed: rust,
 * peeling paint and missing shingles, with vines, moss and wildflowers
 * climbing back over it. Each builder registers its collision footprint.
 */

export interface Built { update?: (t: number) => void }

// ------------------------------------------------------------- materials
export const M = {
  barn: () => texMat('barnRed', T.barnRed()),
  grey: () => texMat('greyBoards', T.greyBoards()),
  white: () => texMat('whiteSiding', T.whiteSiding()),
  tin: () => texMat('corrugated', T.corrugated(), { metalness: 0.25, roughness: 0.7 }),
  shingle: () => texMat('shingles', T.shingles()),
  concrete: () => texMat('concrete', T.concrete()),
  steel: () => texMat('steel', T.steel(), { metalness: 0.35, roughness: 0.65 }),
  tank: () => texMat('rustTank', T.rustTank(), { metalness: 0.25, roughness: 0.7 }),
  bin: () => texMat('binRibs', T.binRibs(), { metalness: 0.3, roughness: 0.7 }),
  brick: () => texMat('brick', T.brick()),
  deck: () => texMat('deck', T.deck()),
  wood: () => texMat('oldWood', T.oldWood()),
  hazard: () => texMat('hazard', T.hazard()),
  hay: () => texMat('hay', T.hay()),
  vine: () => texMat('vines', T.vines(), { alphaTest: 0.5, side: THREE.DoubleSide }),
  trim: () => colMat('#cdc5b2'),
  dark: () => colMat('#0d0c0b', { roughness: 1 }),
  glass: () => texMat('glass', T.glass(), { roughness: 0.25 }),
  boarded: () => texMat('boarded', T.boarded()),
};

let cageTex: THREE.Texture | null = null;
export function cageMat(): THREE.MeshStandardMaterial {
  if (!cageTex) {
    const p = new Pix(16, 16);
    for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
      const on = x % 4 === 0 || y % 4 === 0;
      p.set(x, y, [70, 76, 82], on ? 255 : 0);
    }
    cageTex = p.texture();
  }
  return texMat('cage', cageTex, { alphaTest: 0.5, side: THREE.DoubleSide, metalness: 0.4 });
}

// --------------------------------------------------------------- helpers

/** Ground level for a footprint (its average), so a foundation skirt can hide any roll. */
export function baseY(cx: number, cz: number, w: number, d: number): number {
  const pts: Array<[number, number]> = [[0, 0], [-w / 2, -d / 2], [w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2]];
  return pts.reduce((s, [dx, dz]) => s + heightAt(cx + dx, cz + dz), 0) / pts.length;
}

export function foundation(g: THREE.Group, w: number, d: number, mat: THREE.Material = M.concrete()): void {
  g.add(box(w + 0.12, 0.7, d + 0.12, mat, 0, -0.62, 0));
}

/** A roof skin segment in the XY profile plane, extruded along Z. */
export function slab(ax: number, ay: number, bx: number, by: number, depth: number, mat: THREE.Material, thick = 0.09): THREE.Mesh {
  const len = Math.hypot(bx - ax, by - ay), ang = Math.atan2(by - ay, bx - ax);
  const m = new THREE.Mesh(boxGeo(len + 0.14, thick, depth), mat);
  m.position.set((ax + bx) / 2 - Math.sin(ang) * thick * 0.6, (ay + by) / 2 + Math.cos(ang) * thick * 0.6, 0);
  m.rotation.z = ang;
  return shade(m);
}

export function shapeOf(pts: Array<[number, number]>): THREE.Shape {
  const s = new THREE.Shape();
  pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)));
  s.closePath();
  return s;
}

/** A window: glass (or boarded planks) in a trim frame, on a +z-facing wall. */
export function windowAt(g: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, rotY = 0, kind: 'glass' | 'boarded' = 'glass'): THREE.Mesh {
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(w, h), kind === 'glass' ? M.glass().clone() : M.boarded());
  const holder = new THREE.Group();
  holder.position.set(x, y, z);
  holder.rotation.y = rotY;
  pane.position.z = 0.012;
  holder.add(pane);
  // sill + header
  holder.add(box(w + 0.16, 0.06, 0.08, M.trim(), 0, -h / 2 - 0.06, 0.03));
  holder.add(box(w + 0.12, 0.06, 0.06, M.trim(), 0, h / 2, 0.02));
  g.add(holder);
  return pane;
}

/** Vines climbing a wall: a cut-out decal hugging a +z face. */
export function vines(g: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, rotY = 0): void {
  const m = new THREE.Mesh(planeGeo(w, h), M.vine());
  m.position.set(x, y + h / 2, z);
  m.rotation.y = rotY;
  m.castShadow = true;
  m.receiveShadow = true;
  g.add(m);
}

export function put(g: THREE.Group, cx: number, cz: number, w: number, d: number, scene: THREE.Scene): THREE.Group {
  g.position.set(cx, baseY(cx, cz, w, d), cz);
  scene.add(g);
  return g;
}

// ===================================================================== BARN

export function barn(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const W = 5, D = 3.2, WH = 2.4;
  foundation(g, W, D, M.wood());
  g.add(box(W, WH, D, M.barn()));
  // gambrel gable volume + roof skin
  const prof: Array<[number, number]> = [[-W / 2, WH], [-1.95, 3.45], [0, 4.05], [1.95, 3.45], [W / 2, WH]];
  g.add(prism(shapeOf(prof), D, M.barn()));
  const eave: Array<[number, number]> = [[-W / 2 - 0.22, WH - 0.12], ...prof.slice(1, 4), [W / 2 + 0.22, WH - 0.12]];
  for (let i = 0; i < eave.length - 1; i++) g.add(slab(eave[i]![0], eave[i]![1], eave[i + 1]![0], eave[i + 1]![1], D + 0.5, M.tin()));
  // white trim: corners, gambrel edge on the front gable
  for (const sx of [-1, 1]) g.add(box(0.12, WH, 0.12, M.trim(), sx * (W / 2), 0, D / 2 + 0.02));
  for (let i = 0; i < prof.length - 1; i++) {
    const a = new THREE.Vector3(prof[i]![0], prof[i]![1], D / 2 + 0.04), b = new THREE.Vector3(prof[i + 1]![0], prof[i + 1]![1], D / 2 + 0.04);
    g.add(beam(a, b, 0.1, M.trim()));
  }
  // big double doors: left leaf hung, right leaf slid open onto darkness
  g.add(box(1.9, 1.95, 0.05, M.dark(), 0, 0.02, D / 2 + 0.01));
  const leaf = (x: number): THREE.Group => {
    const l = new THREE.Group();
    l.add(box(0.9, 1.9, 0.07, M.barn(), 0, 0, 0));
    for (const [dx, dy, w, h] of [[0, 0, 0.9, 0.08], [0, 1.82, 0.9, 0.08], [-0.41, 0, 0.08, 1.9], [0.41, 0, 0.08, 1.9]] as Array<[number, number, number, number]>)
      l.add(box(w, h, 0.09, M.trim(), dx, dy, 0.01));
    l.add(beam(new THREE.Vector3(-0.4, 0.08, 0.05), new THREE.Vector3(0.4, 1.82, 0.05), 0.07, M.trim()));
    l.add(beam(new THREE.Vector3(0.4, 0.08, 0.05), new THREE.Vector3(-0.4, 1.82, 0.05), 0.07, M.trim()));
    l.position.set(x, 0.02, D / 2 + 0.07);
    return l;
  };
  g.add(leaf(-0.47), leaf(1.35)); // the right leaf has slid aside on its track
  g.add(box(2.9, 0.07, 0.07, M.steel(), 0.45, 1.98, D / 2 + 0.06)); // door track
  // hay-loft door hanging open
  g.add(box(0.95, 0.85, 0.05, M.dark(), 0, 2.7, D / 2 + 0.01));
  const loft = box(0.5, 0.85, 0.06, M.barn(), 0, 0, 0);
  const loftPivot = new THREE.Group();
  loftPivot.position.set(-0.48, 2.7, D / 2 + 0.04);
  loft.position.set(0.25, 0.425, 0);
  loftPivot.add(loft);
  loftPivot.rotation.y = -1.1;
  g.add(loftPivot);
  g.add(box(1.1, 0.07, 0.3, M.trim(), 0, 3.6, D / 2 + 0.05)); // hay hood beam
  // cupola + weathervane on the ridge
  g.add(box(0.7, 0.55, 0.7, M.barn(), 0, 3.95, 0));
  g.add(box(0.72, 0.3, 0.72, M.dark(), 0, 4.05, 0));
  const cap = new THREE.Mesh(cylGeo(0.02, 0.62, 0.45, 4), M.tin());
  cap.rotation.y = Math.PI / 4;
  cap.position.set(0, 4.72, 0);
  g.add(shade(cap));
  g.add(box(0.03, 0.55, 0.03, M.steel(), 0, 4.9, 0));
  g.add(box(0.5, 0.04, 0.04, M.steel(), 0.06, 5.3, 0));
  // side windows (one boarded) and the long walls
  windowAt(g, -W / 2 - 0.01, 1.4, 0.6, 0.6, 0.6, -Math.PI / 2, 'boarded');
  windowAt(g, W / 2 + 0.01, 1.4, -0.3, 0.6, 0.6, Math.PI / 2);
  // round bales spilled by the door
  for (const [x, z, ry] of [[-2.0, 2.15, 0.2], [-1.2, 2.45, -0.4]] as Array<[number, number, number]>) {
    const b = new THREE.Mesh(cylGeo(0.48, 0.48, 0.8, 14), M.hay());
    b.rotation.set(0, ry, Math.PI / 2);
    b.position.set(x, 0.46, z);
    g.add(shade(b));
  }
  // reclaimed: vines up the front corner and the far side
  vines(g, -1.9, 0, D / 2 + 0.06, 1.3, 2.2);
  vines(g, W / 2 + 0.07, 0, 0.6, 1.6, 1.6, Math.PI / 2);
  vines(g, 1.9, 0, D / 2 + 0.06, 0.8, 1.1);
  put(g, cx, cz, W, D, scene);
  addSolid(cx - W / 2, cz - D / 2, cx + W / 2, cz + D / 2);
  addSolid(cx - 2.5, cz + D / 2, cx - 0.7, cz + D / 2 + 0.95); // the bales
  return {};
}

// =============================================================== FARMHOUSE

export function farmhouse(scene: THREE.Scene, cx: number, cz: number, variant: 0 | 1, night: boolean): Built {
  const g = new THREE.Group();
  const W = 4.2, BD = 2.0, H = 2.2, PD = 1.0; // body depth + porch depth
  const bodyZ = -PD / 2;
  const siding = variant === 0 ? M.grey() : M.white();
  foundation(g, W, BD + PD, M.brick());
  g.add(box(W, H, BD, siding, 0, 0, bodyZ));
  // gable attic (ridge runs east–west) + shingle roof
  const attic = prism(shapeOf([[-BD / 2, H], [BD / 2, H], [0, H + 1.0]]), W, siding);
  attic.rotation.y = Math.PI / 2;
  attic.position.z = bodyZ;
  g.add(attic);
  const roof = new THREE.Group();
  roof.add(slab(-BD / 2 - 0.35, H - 0.18, 0, H + 1.0, W + 0.5, M.shingle()));
  roof.add(slab(0, H + 1.0, BD / 2 + 0.35, H - 0.18, W + 0.5, M.shingle()));
  roof.rotation.y = Math.PI / 2;
  roof.position.z = bodyZ;
  g.add(roof);
  // brick chimney, leaning a touch on the derelict one
  const ch = box(0.42, 1.9, 0.42, M.brick(), 1.25, 1.6, bodyZ - 0.25);
  if (variant === 1) ch.rotation.z = 0.06;
  g.add(ch);
  // porch: deck, posts, rails, sloped roof, steps
  const pz = BD / 2 + bodyZ + PD / 2;
  g.add(box(W + 0.2, 0.22, PD, M.deck(), 0, 0, pz));
  for (const x of [-W / 2, -0.7, 0.7, W / 2]) g.add(box(0.12, 1.95, 0.12, M.trim(), x, 0.22, pz + PD / 2 - 0.08));
  for (const x of [-1.4, 1.4]) g.add(box(1.3, 0.06, 0.05, M.trim(), x, 0.85, pz + PD / 2 - 0.08));
  const proof = slab(-PD / 2 - 0.3, 1.95, PD / 2 + 0.2, 2.24, W + 0.4, M.shingle(), 0.08);
  const proofG = new THREE.Group();
  proofG.add(proof);
  proofG.rotation.y = Math.PI / 2;
  proofG.position.z = pz;
  if (variant === 1) proofG.rotation.x = 0.07; // sagging
  g.add(proofG);
  g.add(box(1.0, 0.11, 0.35, M.deck(), 0, 0, pz + PD / 2 + 0.17));
  // front door + windows (some boarded)
  const fz = bodyZ + BD / 2 + 0.01;
  g.add(box(0.78, 1.55, 0.05, M.wood(), 0, 0.22, fz));
  g.add(box(0.9, 0.08, 0.06, M.trim(), 0, 1.78, fz + 0.01));
  const panes: THREE.Mesh[] = [];
  panes.push(windowAt(g, -1.35, 1.3, fz, 0.7, 0.75, 0, variant === 1 ? 'boarded' : 'glass'));
  panes.push(windowAt(g, 1.35, 1.3, fz, 0.7, 0.75, 0, 'glass'));
  windowAt(g, -W / 2 - 0.01, 1.3, bodyZ, 0.6, 0.7, -Math.PI / 2, 'boarded');
  windowAt(g, W / 2 + 0.01, 1.3, bodyZ, 0.6, 0.7, Math.PI / 2);
  // rain barrel + a bench
  g.add(cyl(0.26, 0.26, 0.7, M.steel(), W / 2 + 0.2, 0, bodyZ + BD / 2 + 0.25, 10));
  g.add(box(0.9, 0.38, 0.32, M.wood(), -1.4, 0.22, pz - 0.25));
  // reclaimed
  vines(g, -W / 2 + 0.6, 0.2, pz + PD / 2 - 0.02, 0.9, 1.9);
  vines(g, W / 2 + 0.07, 0, bodyZ, 1.4, 1.7, Math.PI / 2);
  if (variant === 1) vines(g, 0.9, H - 0.4, fz + 0.02, 1.4, 0.9);
  put(g, cx, cz, W, BD + PD, scene);
  addSolid(cx - W / 2 - 0.1, cz - (BD + PD) / 2, cx + W / 2 + 0.1, cz + (BD + PD) / 2 + 0.3);

  // "Keep off the dead houses. Some flicker — there, then gone." (Rivet)
  const lit = panes[1]!;
  const litMat = lit.material as THREE.MeshStandardMaterial;
  litMat.emissive = new THREE.Color('#ffb05a');
  litMat.emissiveMap = T.glassLit();
  litMat.emissiveIntensity = 0;
  const r = rng(variant + 9);
  let next = 0, on = false;
  return {
    update(t) {
      if (!night) return;
      if (t > next) {
        on = !on;
        next = t + (on ? 0.05 + r() * 0.25 : 2.5 + r() * 6);
      }
      litMat.emissiveIntensity = on ? 2.2 : 0;
    },
  };
}

// ================================================================== CHAPEL

export function chapel(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const W = 3.0, D = 3.0, H = 2.5;
  foundation(g, W, D + 0.6, M.concrete());
  g.add(box(W, H, D, M.white(), 0, 0, -0.3));
  g.add(prism(shapeOf([[-W / 2, H], [W / 2, H], [0, H + 1.3]]), D, M.white()).translateZ(-0.3));
  const roof = new THREE.Group();
  roof.add(slab(-W / 2 - 0.25, H - 0.18, 0, H + 1.3, D + 0.4, M.shingle()));
  roof.add(slab(0, H + 1.3, W / 2 + 0.25, H - 0.18, D + 0.4, M.shingle()));
  roof.position.z = -0.3;
  g.add(roof);
  // the bell tower stands proud of the front gable
  const tz = D / 2 - 0.05;
  g.add(box(1.1, 3.6, 1.1, M.white(), 0, 0, tz));
  // open belfry: corner posts, floor, the silent bell
  for (const [x, z] of [[-0.48, -0.48], [0.48, -0.48], [-0.48, 0.48], [0.48, 0.48]] as Array<[number, number]>)
    g.add(box(0.13, 0.8, 0.13, M.white(), x, 3.6, tz + z));
  const bell = new THREE.Mesh(cylGeo(0.14, 0.3, 0.42, 12), colMat('#6b5a3a', { metalness: 0.6, roughness: 0.45 }));
  bell.position.set(0, 3.95, tz);
  g.add(shade(bell));
  g.add(box(1.24, 0.12, 1.24, M.trim(), 0, 4.4, tz));
  const spire = new THREE.Mesh(cylGeo(0.02, 0.88, 1.9, 4), M.shingle());
  spire.rotation.y = Math.PI / 4;
  spire.position.set(0, 4.52 + 0.95, tz);
  g.add(shade(spire));
  // a weathered cross, knocked slightly askew
  const cross = new THREE.Group();
  cross.add(box(0.05, 0.5, 0.05, M.steel(), 0, 0, 0));
  cross.add(box(0.28, 0.05, 0.05, M.steel(), 0, 0.3, 0));
  cross.position.set(0, 6.4, tz);
  cross.rotation.z = 0.12;
  g.add(cross);
  // doors + tall windows (a couple broken out)
  g.add(box(0.72, 1.55, 0.05, M.wood(), 0, 0, tz + 0.56));
  g.add(box(0.06, 1.55, 0.06, M.dark(), 0, 0, tz + 0.59));
  for (const side of [-1, 1]) {
    windowAt(g, side * (W / 2 + 0.01), 1.4, -0.9, 0.45, 1.0, side * Math.PI / 2, side < 0 ? 'boarded' : 'glass');
    windowAt(g, side * (W / 2 + 0.01), 1.4, 0.4, 0.45, 1.0, side * Math.PI / 2);
  }
  windowAt(g, -0.95, 1.4, D / 2 - 0.29, 0.4, 0.9, 0);
  windowAt(g, 0.95, 1.4, D / 2 - 0.29, 0.4, 0.9, 0, 'boarded');
  // reclaimed: ivy over the west wall, flowers at the base
  vines(g, -W / 2 - 0.07, 0, -0.3, 2.6, 2.4, -Math.PI / 2);
  vines(g, -0.4, 0, tz + 0.57, 0.7, 1.4);
  vines(g, 0.55, 1.8, tz + 0.57, 0.5, 1.1);
  put(g, cx, cz, W, D + 0.6, scene);
  addSolid(cx - W / 2, cz - D / 2 - 0.3, cx + W / 2, cz + D / 2 + 0.5);
  return {};
}

// ============================================================= WATER TOWER

export function waterTower(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const top = 4.1;
  const legs: Array<[number, number]> = [[-1.05, -1.05], [1.05, -1.05], [-1.05, 1.05], [1.05, 1.05]];
  const legTop = (x: number, z: number): THREE.Vector3 => new THREE.Vector3(x * 0.8, top, z * 0.8);
  for (const [x, z] of legs) {
    g.add(beam(new THREE.Vector3(x, 0, z), legTop(x, z), 0.13, M.steel()));
    g.add(box(0.34, 0.3, 0.34, M.concrete(), x, -0.1, z));
  }
  // X-bracing on every face, two tiers
  const faces: Array<[number, number]> = [[0, 1], [1, 3], [3, 2], [2, 0]];
  for (const [a, b] of faces) {
    const [ax, az] = legs[a]!, [bx, bz] = legs[b]!;
    for (const [y0, y1] of [[0.35, 2.1], [2.1, 3.9]]) {
      const k0 = 1 - (y0! / top) * 0.2, k1 = 1 - (y1! / top) * 0.2;
      const p0 = new THREE.Vector3(ax * k0, y0!, az * k0), p1 = new THREE.Vector3(bx * k1, y1!, bz * k1);
      const q0 = new THREE.Vector3(bx * k0, y0!, bz * k0), q1 = new THREE.Vector3(ax * k1, y1!, az * k1);
      g.add(beam(p0, p1, 0.04, M.steel()), beam(q0, q1, 0.04, M.steel()));
    }
  }
  // the tank, its conical roof, a catwalk and railing
  g.add(cyl(1.35, 1.35, 1.9, M.tank(), 0, top + 0.05, 0, 22));
  const roof = new THREE.Mesh(cylGeo(0.06, 1.5, 0.95, 22), M.tank());
  roof.position.set(0, top + 1.95 + 0.47, 0);
  g.add(shade(roof));
  g.add(cyl(1.75, 1.75, 0.06, M.steel(), 0, top, 0, 22));
  const rail = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.025, 4, 32), M.steel());
  rail.rotation.x = Math.PI / 2;
  rail.position.y = top + 0.55;
  g.add(shade(rail));
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    g.add(box(0.03, 0.55, 0.03, M.steel(), Math.cos(a) * 1.72, top, Math.sin(a) * 1.72));
  }
  // faded paint band (no name: freed towers repaint their own)
  const band = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.36, 0.36, 22, 1, true, -0.9, 1.8), colMat('#9aa6a2', { roughness: 0.8 }));
  band.position.set(0, top + 1.2, 0);
  g.add(band);
  // ladder up the front-right leg
  const lx = 0.62, lz = 1.18;
  for (const dx of [-0.16, 0.16]) g.add(box(0.035, top, 0.035, M.steel(), lx + dx, 0, lz));
  for (let y = 0.3; y < top; y += 0.3) g.add(box(0.32, 0.03, 0.03, M.steel(), lx, y, lz));
  // reclaimed: vines up two legs
  vines(g, -1.0, 0, 1.06, 0.55, 2.4);
  vines(g, 1.0, 0, -1.0, 0.55, 1.6, Math.PI);
  put(g, cx, cz, 2.2, 2.2, scene);
  for (const [x, z] of legs) addSolid(cx + x - 0.2, cz + z - 0.2, cx + x + 0.2, cz + z + 0.2);
  return {};
}

// ================================================================ WINDMILL

export function windmill(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  const top = 5.2, b = 0.65, t = 0.18;
  const corner = (sx: number, sz: number, y: number): THREE.Vector3 => {
    const k = y / top;
    const r = b + (t - b) * k;
    return new THREE.Vector3(sx * r, y, sz * r);
  };
  const cs: Array<[number, number]> = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (const [sx, sz] of cs) g.add(beam(corner(sx, sz, 0), corner(sx, sz, top), 0.07, M.steel()));
  const levels = [0.4, 1.5, 2.6, 3.6, 4.5, top];
  for (let i = 0; i < 4; i++) {
    const [ax, az] = cs[i]!, [bx, bz] = cs[(i + 1) % 4]!;
    for (const y of levels) g.add(beam(corner(ax, az, y), corner(bx, bz, y), 0.04, M.steel()));
    for (let l = 0; l < levels.length - 1; l++) {
      const y0 = levels[l]!, y1 = levels[l + 1]!;
      g.add(beam(corner(ax, az, y0), corner(bx, bz, y1), 0.03, M.steel()));
    }
  }
  g.add(box(0.6, 0.06, 0.6, M.wood(), 0, top, 0));
  // head: gearbox, pump rod, tail vane
  g.add(box(0.34, 0.3, 0.55, M.steel(), 0, top + 0.08, 0));
  g.add(box(0.04, top, 0.04, M.steel(), 0, 0, 0));
  g.add(box(0.06, 0.06, 1.4, M.steel(), 0, top + 0.2, -0.85));
  g.add(box(0.03, 0.62, 0.95, M.tin(), 0, top + 0.02, -1.55));
  // the wheel — a few blades lost to the wind
  const wheel = new THREE.Group();
  wheel.position.set(0, top + 0.24, 0.42);
  const N = 18;
  for (let i = 0; i < N; i++) {
    if (i === 3 || i === 4 || i === 11) continue;
    const a = (i / N) * Math.PI * 2;
    const bl = new THREE.Mesh(boxGeo(0.16, 0.95, 0.025), M.tin());
    bl.position.set(Math.sin(a) * 0.68, Math.cos(a) * 0.68, 0);
    bl.rotation.order = 'ZYX';
    bl.rotation.set(0, 0.35, -a);
    wheel.add(shade(bl));
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.025, 4, 28), M.steel());
  wheel.add(shade(ring));
  wheel.add(shade(new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 4, 18), M.steel())));
  wheel.add(shade(new THREE.Mesh(cylGeo(0.09, 0.09, 0.2, 8).rotateX(Math.PI / 2), M.steel())));
  g.add(wheel);
  // galvanized stock tank at the foot, still holding water
  g.add(cyl(0.75, 0.75, 0.5, M.steel(), 1.25, 0, 0.25, 18));
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.71, 18), colMat('#2e4a48', { roughness: 0.15, metalness: 0.1 }));
  water.rotation.x = -Math.PI / 2;
  water.position.set(1.25, 0.43, 0.25);
  g.add(water);
  vines(g, -0.55, 0, 0.6, 0.5, 1.9);
  put(g, cx, cz, 1.4, 1.4, scene);
  addSolid(cx - 0.7, cz - 0.7, cx + 0.7, cz + 0.7);
  addSolid(cx + 0.5, cz - 0.5, cx + 2.0, cz + 1.0);
  return { update: (t2) => { wheel.rotation.z = -t2 * 0.55; } };
}

// =========================================================== CO-OP VAULT

export function coopVault(scene: THREE.Scene, cx: number, cz: number, night: boolean): Built {
  const g = new THREE.Group();
  const W = 4.4, D = 3.6, H = 3.0;
  foundation(g, W, D);
  g.add(box(W, H, D, M.concrete()));
  g.add(box(W - 0.3, 0.35, D - 0.3, M.concrete(), 0, H, 0)); // stepped parapet
  // headhouse — the elevator leg tower — rising behind the east end
  g.add(box(1.3, 6.4, 1.5, M.concrete(), 1.45, 0, -0.6));
  g.add(slab(0.7, 6.4, 2.2, 6.75, 1.7, M.tin()).translateZ(-0.6));
  for (let y = 3.6; y < 6.2; y += 0.9) windowAt(g, 1.45, y, 0.16, 0.5, 0.35, 0, 'boarded');
  // twin silos behind, with domed caps and a gallery bridge to the headhouse
  for (const sx of [-1.25, 0.25]) {
    g.add(cyl(0.85, 0.85, 6.0, M.concrete(), sx, 0, -2.55, 20));
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.86, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.concrete());
    dome.position.set(sx, 6.0, -2.55);
    g.add(shade(dome));
    vines(g, sx - 0.3, 0, -1.68, 0.7, 2.6);
  }
  g.add(box(2.9, 0.55, 0.55, M.tin(), -0.25, 5.55, -1.65));
  // blast-door recess with hazard frame
  const fz = D / 2;
  g.add(box(1.9, 2.3, 0.22, M.concrete(), 0, 0, fz + 0.06));
  g.add(box(1.5, 2.0, 0.05, colMat('#ffcf8a', { emissive: '#ffb867', emissiveIntensity: night ? 3.2 : 1.6 }), 0, 0, fz + 0.1));
  for (const [x, y, w, h] of [[-0.86, 0, 0.14, 2.1], [0.86, 0, 0.14, 2.1], [0, 2.02, 1.86, 0.14]] as Array<[number, number, number, number]>)
    g.add(box(w, h, 0.06, M.hazard(), x, y, fz + 0.2));
  // left leaf shut, right leaf swung open — somebody cracked it last night
  g.add(box(0.74, 1.98, 0.14, M.steel(), -0.37, 0, fz + 0.18));
  const leafPivot = new THREE.Group();
  leafPivot.position.set(0.74, 0, fz + 0.2);
  const leafM = box(0.74, 1.98, 0.14, M.steel(), -0.37, 0, 0);
  leafPivot.add(leafM);
  leafPivot.add(box(0.1, 0.5, 0.06, M.steel(), -0.62, 0.8, 0.09)); // wheel-lock handle
  leafPivot.rotation.y = -1.05;
  g.add(leafPivot);
  // light spilling out of the vault
  const spill = new THREE.PointLight('#ffb867', night ? 14 : 6, 7, 1.6);
  spill.position.set(0, 1.0, fz + 0.7);
  g.add(spill);
  // "CO-OP" stenciled over the door
  const sten = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.6),
    new THREE.MeshStandardMaterial({ map: textTexture('CO-OP', { w: 64, h: 16, fg: '#24221c', font: 'bold 14px monospace', worn: 0.32 }), alphaTest: 0.5, roughness: 1 }),
  );
  sten.position.set(-0.05, 2.62, fz + 0.012);
  sten.receiveShadow = true;
  g.add(sten);
  // sodium lamp over the door
  g.add(box(0.06, 0.06, 0.4, M.steel(), 0, 2.38, fz + 0.2));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), colMat('#ffd27a', { emissive: '#ffb050', emissiveIntensity: night ? 6 : 0.4 }));
  bulb.position.set(0, 2.3, fz + 0.4);
  g.add(bulb);
  // loading dock + crates + a drainpipe
  g.add(box(1.3, 0.55, 0.9, M.concrete(), -1.5, 0, fz + 0.45));
  g.add(box(0.5, 0.5, 0.5, M.wood(), -1.75, 0.55, fz + 0.4));
  g.add(box(0.4, 0.4, 0.4, M.wood(), -1.25, 0.55, fz + 0.55));
  g.add(cyl(0.07, 0.07, H + 0.3, M.tank(), W / 2 - 0.05, 0, fz - 0.05, 8));
  // rubble at the foot
  const r = rng(404);
  for (let i = 0; i < 7; i++) {
    const c = new THREE.Mesh(new THREE.DodecahedronGeometry(0.1 + r() * 0.16, 0), M.concrete());
    c.position.set(-2.1 + r() * 4.2, 0.05, fz + 0.3 + r() * 0.4);
    c.rotation.set(r() * 3, r() * 3, r() * 3);
    if (Math.abs(c.position.x) > 0.95) g.add(shade(c));
  }
  // reclaimed: ivy sheets on the west face and front corner
  vines(g, -W / 2 - 0.07, 0, 0, 3.2, 2.6, -Math.PI / 2);
  vines(g, -1.7, 0.55, fz + 0.03, 0.9, 1.9);
  vines(g, 1.8, 0, fz + 0.03, 0.7, 2.4);
  put(g, cx, cz, W, D, scene);
  addSolid(cx - W / 2, cz - D / 2, cx + W / 2, cz + D / 2);
  addSolid(cx - 2.15, cz + D / 2, cx - 0.85, cz + D / 2 + 0.9);
  addSolid(cx - 2.2, cz - 3.5, cx + 1.2, cz - 1.6);
  return {};
}

// =================================================================== SILOS

export function concreteSilo(scene: THREE.Scene, cx: number, cz: number): Built {
  const g = new THREE.Group();
  g.add(cyl(0.78, 0.82, 4.6, M.concrete(), 0, -0.3, 0, 20));
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), M.tin());
  dome.position.y = 4.3;
  g.add(shade(dome));
  for (const dx of [-0.13, 0.13]) g.add(box(0.03, 4.2, 0.03, M.steel(), dx, 0, 0.82));
  for (let y = 0.3; y < 4.2; y += 0.3) g.add(box(0.26, 0.03, 0.03, M.steel(), 0, y, 0.82));
  vines(g, -0.55, 0, 0.6, 0.8, 2.0, -0.6);
  put(g, cx, cz, 1.6, 1.6, scene);
  addSolid(cx - 0.8, cz - 0.8, cx + 0.8, cz + 0.8);
  return {};
}

export function binCluster(scene: THREE.Scene, xs: number[], cz: number): Built {
  const g = new THREE.Group();
  const cx = (xs[0]! + xs[xs.length - 1]!) / 2;
  xs.forEach((x, i) => {
    const bin = new THREE.Group();
    bin.add(cyl(0.78, 0.78, 2.6, M.bin(), 0, 0, 0, 20));
    const cone = new THREE.Mesh(cylGeo(0.14, 0.86, 0.6, 20), M.tin());
    cone.position.y = 2.9;
    bin.add(shade(cone));
    bin.add(cyl(0.16, 0.16, 0.18, M.steel(), 0, 3.2, 0, 8));
    bin.position.x = x - cx;
    if (i === 1) bin.rotation.z = 0.04; // settling on a rotten pad
    g.add(bin);
  });
  // catwalk along the tops and an auger leaning up from the ground
  g.add(box(xs[xs.length - 1]! - xs[0]! + 0.6, 0.06, 0.42, M.steel(), 0, 3.25, 0));
  g.add(beam(new THREE.Vector3(xs[0]! - cx - 2.0, 0.25, 0.9), new THREE.Vector3(xs[0]! - cx - 0.2, 3.1, 0.15), 0.18, M.tank()));
  vines(g, xs[0]! - cx - 0.4, 0, 0.79, 0.9, 1.6);
  vines(g, xs[2]! - cx + 0.2, 0, 0.79, 0.7, 1.1);
  put(g, cx, cz, xs[xs.length - 1]! - xs[0]! + 1.6, 1.6, scene);
  addSolid(xs[0]! - 0.8, cz - 0.8, xs[xs.length - 1]! + 0.8, cz + 0.8);
  return {};
}

// ===================================================== THE LIFT FROM OHMSTEAD

export function liftHatch(scene: THREE.Scene, cx: number, cz: number, night: boolean): Built {
  const g = new THREE.Group();
  g.add(box(1.9, 0.18, 1.5, M.concrete(), 0, -0.05, 0));
  for (const [x, z, w, d] of [[0, -0.7, 1.9, 0.12], [0, 0.7, 1.9, 0.12], [-0.9, 0, 0.12, 1.5], [0.9, 0, 0.12, 1.5]] as Array<[number, number, number, number]>)
    g.add(box(w, 0.04, d, M.hazard(), x, 0.13, z));
  g.add(box(1.5, 0.05, 1.1, M.steel(), 0, 0.12, 0));
  // cage: posts, top frame, mesh on three sides (open toward the road south)
  const top = 2.2;
  for (const [x, z] of [[-0.7, -0.5], [0.7, -0.5], [-0.7, 0.5], [0.7, 0.5]] as Array<[number, number]>) g.add(box(0.08, top, 0.08, M.steel(), x, 0.12, z));
  g.add(box(1.5, 0.1, 1.1, M.steel(), 0, top + 0.1, 0));
  const mesh = cageMat();
  for (const [x, z, ry, w] of [[0, -0.5, 0, 1.4], [-0.7, 0, Math.PI / 2, 1.0], [0.7, 0, Math.PI / 2, 1.0]] as Array<[number, number, number, number]>) {
    const p = new THREE.Mesh(planeGeo(w, top - 0.1), mesh);
    p.position.set(x, 0.17 + (top - 0.1) / 2, z);
    p.rotation.y = ry;
    p.castShadow = true;
    g.add(p);
  }
  // cable sheave on top
  const sheave = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 6, 16), M.steel());
  sheave.position.set(0, top + 0.5, 0);
  g.add(shade(sheave));
  g.add(box(0.06, 0.4, 0.06, M.steel(), 0, top + 0.15, 0));
  // sodium lamp on a post: the way home, lit
  g.add(box(0.07, 2.6, 0.07, M.steel(), 1.15, 0, 0.55));
  g.add(box(0.5, 0.05, 0.05, M.steel(), 0.92, 2.55, 0.55));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), colMat('#ffd890', { emissive: '#ffb050', emissiveIntensity: night ? 7 : 1.2 }));
  bulb.position.set(0.7, 2.47, 0.55);
  g.add(bulb);
  const lamp = new THREE.PointLight('#ffb867', night ? 9 : 2.5, 6, 1.7);
  lamp.position.set(0.7, 2.3, 0.6);
  g.add(lamp);
  // call box with a green ready light
  g.add(box(0.2, 0.3, 0.12, M.steel(), -0.95, 0.9, 0.55));
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), colMat('#7dff9a', { emissive: '#3dff7a', emissiveIntensity: 3 }));
  led.position.set(-0.95, 1.12, 0.62);
  g.add(led);
  put(g, cx, cz, 1.9, 1.5, scene);
  addSolid(cx - 0.8, cz - 0.6, cx + 0.8, cz + 0.4);
  return { update: (t) => { led.visible = Math.floor(t * 1.4) % 2 === 0; } };
}

// =============================================================== CATTLE PEN

export function cattlePen(scene: THREE.Scene, x0: number, z0: number, x1: number, z1: number): Built {
  const g = new THREE.Group();
  const r = rng(808);
  const gate = [x0 + 2.0, x0 + 3.1]; // opening on the north rail
  const run = (ax: number, az: number, bx: number, bz: number): void => {
    const len = Math.hypot(bx - ax, bz - az), n = Math.ceil(len / 1.1);
    for (let i = 0; i <= n; i++) {
      const x = ax + ((bx - ax) * i) / n, z = az + ((bz - az) * i) / n;
      if (az === z0 && bz === z0 && x > gate[0]! && x < gate[1]!) continue;
      const post = box(0.12, 1.05, 0.12, M.wood(), x, heightAt(x, z) - 0.05, z);
      post.rotation.z = (r() - 0.5) * 0.12;
      g.add(post);
      if (i === n) continue;
      const nx = ax + ((bx - ax) * (i + 1)) / n, nz = az + ((bz - az) * (i + 1)) / n;
      if (az === z0 && bz === z0 && ((x > gate[0]! - 1.2 && x < gate[1]!) || (nx > gate[0]! && nx < gate[1]! + 1.2))) continue;
      for (const y of [0.42, 0.82]) {
        if (r() < 0.12) continue; // a broken rail
        const a = new THREE.Vector3(x, heightAt(x, z) + y, z), b = new THREE.Vector3(nx, heightAt(nx, nz) + y - (r() < 0.1 ? 0.3 : 0), nz);
        g.add(beam(a, b, 0.07, M.wood()));
      }
    }
  };
  run(x0, z0, x1, z0); run(x1, z0, x1, z1); run(x1, z1, x0, z1); run(x0, z1, x0, z0);
  // the gate hangs open
  const gp = new THREE.Group();
  gp.position.set(gate[1]!, heightAt(gate[1]!, z0), z0);
  for (const y of [0.35, 0.7, 1.0]) gp.add(box(1.1, 0.06, 0.05, M.wood(), -0.55, y, 0));
  gp.add(box(0.06, 1.0, 0.05, M.wood(), -1.08, 0, 0));
  gp.rotation.y = 1.15;
  g.add(gp);
  // trough + hay
  const tx = x0 + 2.0, tz = z0 + 1.1;
  g.add(box(1.4, 0.42, 0.5, M.steel(), tx, heightAt(tx, tz), tz));
  const tw = new THREE.Mesh(planeGeo(1.3, 0.4), colMat('#2e4a48', { roughness: 0.15 }));
  tw.rotation.x = -Math.PI / 2;
  tw.position.set(tx, heightAt(tx, tz) + 0.36, tz);
  g.add(tw);
  for (const [x, z, y] of [[x1 - 1.0, z1 - 0.8, 0], [x1 - 1.0, z1 - 0.8, 0.5], [x1 - 1.9, z1 - 0.8, 0]] as Array<[number, number, number]>)
    g.add(box(0.85, 0.5, 0.48, M.hay(), x, heightAt(x, z) + y, z));
  scene.add(g);
  const T2 = 0.22;
  addSolid(x0 - T2, z0 - T2, gate[0]!, z0 + T2);
  addSolid(gate[1]!, z0 - T2, x1 + T2, z0 + T2);
  addSolid(x1 - T2, z0, x1 + T2, z1);
  addSolid(x0 - T2, z1 - T2, x1 + T2, z1 + T2);
  addSolid(x0 - T2, z0, x0 + T2, z1);
  addSolid(tx - 0.7, tz - 0.25, tx + 0.7, tz + 0.25);
  addSolid(x1 - 2.4, z1 - 1.1, x1 - 0.5, z1 - 0.5);
  return {};
}

// ===================================================== CULVERT + GUARDRAILS

export function culvertCrossing(scene: THREE.Scene): Built {
  const g = new THREE.Group();
  // concrete headwall where the creek runs under the road, with the pipe mouth
  g.add(box(0.35, 1.0, 3.4, M.concrete(), 18.75, -0.75, 25.5));
  const mouth = new THREE.Mesh(new THREE.CircleGeometry(0.45, 14), M.dark());
  mouth.rotation.y = -Math.PI / 2;
  mouth.position.set(18.56, -0.3, 25.5);
  g.add(mouth);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.06, 6, 16), M.steel());
  lip.rotation.y = Math.PI / 2;
  lip.position.set(18.55, -0.3, 25.5);
  g.add(shade(lip));
  // wooden guardrails along both road edges
  for (const x of [18.85, 22.15]) {
    for (let z = 23.7; z <= 27.3; z += 0.9) g.add(box(0.12, 0.7, 0.12, M.wood(), x, heightAt(x, z) - 0.05, z));
    g.add(box(0.08, 0.14, 3.7, M.wood(), x, heightAt(x, 25.5) + 0.5, 25.5));
  }
  scene.add(g);
  addSolid(22.0, 23.6, 22.3, 27.4);
  return {};
}
