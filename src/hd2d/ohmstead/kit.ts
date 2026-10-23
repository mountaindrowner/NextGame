import * as THREE from 'three';
import { Pix, T, textTexture } from '../textures';
import { rng, fbm, vnoise } from '../noise';
import { box, cyl, beam, boxGeo, cylGeo, texMat, colMat, shade } from '../geo';
import { addSolid } from '../world';

/**
 * Ohmstead's interior kit: the metal bomb-shelter look Mark set for the
 * colony (big riveted floor plates, thick steel walls), plus the furniture
 * and lamps that make it lived-in. Everything sits on a flat floor at y = 0.
 */

type RGB = [number, number, number];
const hex = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const mul = (a: RGB, k: number): RGB => [a[0] * k, a[1] * k, a[2] * k];

export const C = {
  steel: hex('#566068'),
  steelLight: hex('#7c8790'),
  steelDark: hex('#2b3136'),
  plate: hex('#68727a'),
  rust: hex('#7c4424'),
  rustLight: hex('#a8622e'),
  grime: hex('#23211d'),
  hazard: hex('#d2a22a'),
  moss: hex('#4f7a2c'),
  mossLight: hex('#7aa83c'),
  black: hex('#0b0c0e'),
};

const cache = new Map<string, THREE.Texture>();
const once = (k: string, make: () => THREE.Texture): THREE.Texture => {
  let t = cache.get(k);
  if (!t) { t = make(); cache.set(k, t); }
  return t;
};

// ------------------------------------------------------------- textures

/** Wall panels: 1-unit riveted plates, a seam at 1.2, a dark kick plate. 2×3 units. */
function wallTex(): THREE.Texture {
  return once('ohm-wall', () => {
    const W = 32, H = 48, p = new Pix(W, H), r = rng(51);
    const tone = [0.95, 1.05, 0.9, 1.0];
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const up = H - 1 - y; // texels above the floor
        const panel = Math.floor(x / 16) + (up >= 19 ? 2 : 0);
        let c = mul(C.steel, tone[panel % 4]! * (0.94 + vnoise(x * 0.5, y * 0.5, 52) * 0.1));
        // seams: vertical every unit, horizontal at 1.2 units, kick plate below 0.5
        const vx = x % 16;
        if (vx === 0) c = C.steelDark;
        else if (vx === 1) c = mul(C.steelLight, 0.95);
        if (up === 19) c = C.steelDark;
        if (up === 20) c = mul(C.steelLight, 0.92);
        if (up < 8) c = mul(C.steel, 0.62 + (up === 7 ? 0.25 : 0));
        if (up < 8 && (x + up) % 8 < 1) c = mul(C.steel, 0.5); // tread lines
        // rivets beside seams
        if ((vx === 3 || vx === 13) && (up % 6 === 3) && up > 8) c = up === 9 ? C.steelLight : mix(C.steelLight, C.steel, 0.3);
        // rust streaks bleeding down from the seams, grime rising from the floor
        const streak = vnoise(x * 1.1, y * 0.08, 53);
        if (streak > 0.8 && up > 6) c = mix(c, C.rust, (streak - 0.8) * 3);
        const grime = fbm(x * 0.15, y * 0.15, 54, 3);
        if (up < 14) c = mix(c, C.grime, Math.max(0, (14 - up) / 14) * 0.45 * grime);
        if (r() < 0.01) c = mul(c, 0.8);
        p.set(x, y, c);
      }
    return p.texture();
  });
}

/** Wall tops: the black of the rock beyond — a cut wall draws a crisp dark
 *  outline round the lit room, the way HD-2D interiors read. */
function capTex(): THREE.Texture {
  return once('ohm-cap', () => {
    const S = 16, p = new Pix(S, S);
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const c = mul(hex('#121417'), 0.85 + vnoise(x * 0.6, y * 0.6, 55) * 0.3);
        p.set(x, y, c);
      }
    return p.texture();
  });
}

/** Rough rock: the Yard's dig face. */
function rockTex(): THREE.Texture {
  return once('ohm-rock', () => {
    const S = 32, p = new Pix(S, S);
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const n = fbm(x * 0.18, y * 0.18, 56, 3);
        let c = mix(hex('#3a3430'), hex('#6a5e52'), n);
        if (Math.abs(fbm(x * 0.12, y * 0.12, 57, 2) - 0.5) < 0.025) c = hex('#1e1a17');
        if (n > 0.7) c = mix(c, hex('#8a7a66'), 0.5);
        p.set(x, y, c);
      }
    return p.texture();
  });
}

/** World-space UVs (triplanar by face normal): instanced walls of any height
 *  keep the same texel density, so a wall can drop low without its panels squashing. */
function worldUV(m: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  m.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
      #ifdef USE_MAP
      {
        mat4 im = mat4(1.0);
        #ifdef USE_INSTANCING
        im = instanceMatrix;
        #endif
        vec3 wp = (modelMatrix * im * vec4(transformed, 1.0)).xyz;
        vec3 wn = abs(normalize(mat3(modelMatrix * im) * objectNormal));
        vec2 w = wn.y > 0.5 ? wp.xz : (wn.x > 0.5 ? wp.zy : wp.xy);
        vMapUv = (mapTransform * vec3(w, 1.0)).xy;
      }
      #endif`);
  };
  m.customProgramCacheKey = () => 'worldUV';
  return m;
}

export const KM = {
  wall: (): THREE.MeshStandardMaterial => texMat('ohm-wall-mat', wallTex(), { metalness: 0.35, roughness: 0.7 }),
  cap: (): THREE.MeshStandardMaterial => texMat('ohm-cap-mat', capTex(), { roughness: 1 }),
  rock: (): THREE.MeshStandardMaterial => texMat('ohm-rock-mat', rockTex(), { roughness: 1 }),
  steel: (): THREE.MeshStandardMaterial => texMat('steel', T.steel(), { metalness: 0.35, roughness: 0.65 }),
  rust: (): THREE.MeshStandardMaterial => texMat('rustTank', T.rustTank(), { metalness: 0.25, roughness: 0.7 }),
  wood: (): THREE.MeshStandardMaterial => texMat('oldWood', T.oldWood()),
  deck: (): THREE.MeshStandardMaterial => texMat('deck', T.deck()),
  concrete: (): THREE.MeshStandardMaterial => texMat('concrete', T.concrete()),
  hazard: (): THREE.MeshStandardMaterial => texMat('hazard', T.hazard()),
  dark: (): THREE.MeshStandardMaterial => colMat('#101113', { roughness: 1 }),
  paintRed: (): THREE.MeshStandardMaterial => colMat('#8a2e24', { roughness: 0.6, metalness: 0.3 }),
  paintGreen: (): THREE.MeshStandardMaterial => colMat('#3f5a3c', { roughness: 0.7, metalness: 0.2 }),
  paintBlue: (): THREE.MeshStandardMaterial => colMat('#34506a', { roughness: 0.7, metalness: 0.2 }),
  cloth: (hexc: string): THREE.MeshStandardMaterial => colMat(hexc, { roughness: 1, side: THREE.DoubleSide }),
  vine: (): THREE.MeshStandardMaterial => texMat('vines', T.vines(), { alphaTest: 0.5, side: THREE.DoubleSide }),
  leaves: (): THREE.MeshStandardMaterial => texMat('leaves-flat', T.leaves(), { roughness: 0.95, flatShading: true }),
};

/** Wall + cap materials for the instanced walls (world-space UVs). */
export function wallMaterials(rock = false): THREE.Material[] {
  const side = worldUV(new THREE.MeshStandardMaterial({ map: rock ? rockTex() : wallTex(), metalness: rock ? 0 : 0.35, roughness: rock ? 1 : 0.7 }));
  const cap = worldUV(new THREE.MeshStandardMaterial({ map: capTex(), roughness: 1 }));
  // BoxGeometry groups: +x, -x, +y (cap), -y, +z, -z
  return [side, side, cap, cap, side, side];
}

// --------------------------------------------------------------- floor

/** Paint the colony floor: 2×2 riveted plates, scuffed walk-lines, oil and
 *  rust, hazard paint at thresholds, moss pushing up through the seams. */
export function paintFloor(cols: number, rows: number, floor: (x: number, z: number) => boolean, extra: (x: number, z: number, c: RGB) => RGB): THREE.CanvasTexture {
  const S = 16, W = cols * S, H = rows * S;
  const p = new Pix(W, H);
  const r = rng(77);
  const plateTone = new Map<number, number>();
  for (let py = 0; py < H; py++)
    for (let px = 0; px < W; px++) {
      const x = (px + 0.5) / S, z = (py + 0.5) / S;
      const cx = Math.floor(x), cz = Math.floor(z);
      if (!floor(cx, cz)) { p.set(px, py, C.black); continue; }
      const bx = Math.floor(x / 2), bz = Math.floor(z / 2), key = bz * 1000 + bx;
      let tone = plateTone.get(key);
      if (tone === undefined) { tone = 0.86 + r() * 0.22; plateTone.set(key, tone); }
      const u = px % 32, v = py % 32;
      let c = mul(C.plate, tone * (0.95 + vnoise(px * 0.4, py * 0.4, 61) * 0.08));
      // diamond tread on alternate plates
      if ((bx + bz) % 3 === 0 && (u + v) % 6 === 0) c = mul(c, 1.18);
      if ((bx + bz) % 3 === 0 && (u - v + 64) % 6 === 0) c = mul(c, 0.86);
      // seams + bevel highlight, corner rivets
      if (u === 0 || v === 0) c = C.steelDark;
      else if (u === 1 || v === 1) c = mul(C.steelLight, tone * 0.9);
      if ((u === 3 || u === 29) && (v === 3 || v === 29)) c = C.steelLight;
      if ((u === 4 || u === 30) && (v === 4 || v === 30)) c = C.steelDark;
      // grime, oil, rust blooms
      const g = fbm(x * 0.35, z * 0.35, 62, 3);
      c = mix(c, C.grime, Math.max(0, g - 0.5) * 0.7);
      if (fbm(x * 0.6, z * 0.6, 63, 2) > 0.85) c = mix(c, hex('#1f1c17'), 0.4);
      const ru = fbm(x * 0.25, z * 0.25, 64, 3);
      if (ru > 0.66) c = mix(c, ru > 0.74 ? C.rust : C.rustLight, Math.min(1, (ru - 0.66) * 4) * 0.7);
      // moss and tiny leaves in the seams near the edges of rooms
      if ((u <= 1 || v <= 1) && fbm(x * 0.3, z * 0.3, 65, 2) > 0.7 && vnoise(px * 0.7, py * 0.7, 66) > 0.55) c = r() < 0.5 ? C.moss : C.mossLight;
      p.set(px, py, extra(x, z, c));
    }
  const t = p.texture({ repeat: false, worldSize: false });
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}
export { hex as kitHex, mix as kitMix, mul as kitMul };
export type { RGB };

// -------------------------------------------------------------- lamps

export interface Lamp { pos: THREE.Vector3; color: THREE.Color; intensity: number; dist: number; flicker?: number }

/** A small pool of point lights moved each frame to the lamps nearest the
 *  camera — dozens of lamps for the price of a few lights. */
export class LightPool {
  private readonly lights: THREE.PointLight[] = [];
  private readonly lamps: Lamp[] = [];
  constructor(scene: THREE.Scene, n = 10) {
    for (let i = 0; i < n; i++) {
      const l = new THREE.PointLight('#ffffff', 0, 6, 1.7);
      scene.add(l);
      this.lights.push(l);
    }
  }
  add(l: Lamp): void { this.lamps.push(l); }
  update(t: number, focus: THREE.Vector3): void {
    const near = this.lamps
      .map((l) => ({ l, d: (l.pos.x - focus.x) ** 2 + ((l.pos.z - focus.z) * 1.3) ** 2 }))
      .sort((a, b) => a.d - b.d);
    this.lights.forEach((light, i) => {
      const e = near[i];
      if (!e) { light.intensity = 0; return; }
      const { l } = e;
      light.position.copy(l.pos);
      light.color.copy(l.color);
      light.distance = l.dist;
      const fl = l.flicker ? 1 - l.flicker * (0.5 + 0.5 * Math.sin(t * 23 + l.pos.x * 7) * Math.sin(t * 5.1 + l.pos.z)) : 1;
      // fade with distance so a light handed to a new lamp doesn't pop
      const fade = THREE.MathUtils.clamp(1.6 - Math.sqrt(e.d) / 11, 0, 1);
      light.intensity = l.intensity * fl * fade;
    });
  }
}

function glow(hexc: string, intensity: number): THREE.MeshStandardMaterial {
  return colMat(hexc, { emissive: hexc, emissiveIntensity: intensity, roughness: 0.4 });
}

/** A caged bulb on a wall bracket (+z facing wall at z), pooled light. */
export function wallLamp(g: THREE.Object3D, pool: LightPool, x: number, z: number, y = 2.1, warm = true): void {
  g.add(box(0.1, 0.1, 0.32, KM.steel(), x, y + 0.1, z + 0.16));
  g.add(box(0.26, 0.05, 0.26, KM.steel(), x, y + 0.2, z + 0.36));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), glow(warm ? '#ffcf7a' : '#bfe8ff', 5));
  bulb.position.set(x, y + 0.08, z + 0.36);
  g.add(bulb);
  const cage = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.22, 6, 1, true), new THREE.MeshStandardMaterial({ color: '#202428', wireframe: true }));
  cage.position.set(x, y + 0.08, z + 0.36);
  g.add(cage);
  pool.add({ pos: new THREE.Vector3(x, y, z + 0.7), color: new THREE.Color(warm ? '#ffb35c' : '#9ad8ff'), intensity: warm ? 11 : 8, dist: 8, flicker: Math.random() < 0.12 ? 0.6 : 0 });
}

/** A pendant lamp hanging on a cord from the dark overhead. */
export function pendant(g: THREE.Object3D, pool: LightPool, x: number, z: number, warm = true, y = 2.5): void {
  g.add(box(0.015, 3.5, 0.015, colMat('#111214'), x, y + 0.2, z));
  const sh = new THREE.Mesh(cylGeo(0.07, 0.3, 0.2, 10, true), colMat('#3d5248', { side: THREE.DoubleSide, metalness: 0.4, roughness: 0.5 }));
  sh.position.set(x, y + 0.1, z);
  g.add(sh); // no shadow: a shade's blot on the floor reads as a hole
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), glow(warm ? '#ffd590' : '#cfeeff', 5));
  bulb.position.set(x, y - 0.02, z);
  g.add(bulb);
  pool.add({ pos: new THREE.Vector3(x, y - 0.3, z), color: new THREE.Color(warm ? '#ffc477' : '#a8dcff'), intensity: 12, dist: 9 });
}

/** A string of bare bulbs strung across a room on a wire. */
export function stringLights(g: THREE.Object3D, pool: LightPool, a: THREE.Vector3, b: THREE.Vector3, n: number): void {
  const mid = a.clone().lerp(b, 0.5);
  mid.y -= 0.35;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.012, 3, false), colMat('#15161a')));
  const mat = glow('#ffd590', 4);
  for (let i = 1; i < n; i++) {
    const p = curve.getPoint(i / n);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), mat);
    bulb.position.copy(p).add(new THREE.Vector3(0, -0.07, 0));
    g.add(bulb);
  }
  pool.add({ pos: mid.clone().add(new THREE.Vector3(0, -0.2, 0)), color: new THREE.Color('#ffc477'), intensity: 6, dist: 7 });
}

/** Grow light: a magenta-white bar over a planter of lush green. */
export function growBed(g: THREE.Object3D, pool: LightPool, x0: number, z0: number, x1: number, z1: number, seed: number): void {
  const w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  g.add(box(w, 0.42, d, KM.steel(), cx, 0, cz));
  g.add(box(w - 0.12, 0.05, d - 0.12, colMat('#2a1f16', { roughness: 1 }), cx, 0.4, cz));
  const r = rng(seed);
  const greens = ['#3f7f2c', '#5ea83c', '#2f6b2a', '#79b84a', '#4f8f36'];
  for (let i = 0; i < Math.round(w * d * 9); i++) {
    const px = x0 + 0.12 + r() * (w - 0.24), pz = z0 + 0.12 + r() * (d - 0.24);
    const h = 0.15 + r() * 0.4;
    const leafy = r() < 0.6;
    const leaf = new THREE.Mesh(leafy ? new THREE.IcosahedronGeometry(0.11 + r() * 0.07, 0) : new THREE.ConeGeometry(0.07 + r() * 0.06, h, 4), colMat(greens[Math.floor(r() * greens.length)]!, { roughness: 0.9, flatShading: true }));
    if (leafy) leaf.scale.y = 0.7;
    leaf.position.set(px, 0.45 + (leafy ? 0.08 : h / 2), pz);
    leaf.rotation.set((r() - 0.5) * 0.5, r() * 3, (r() - 0.5) * 0.5);
    g.add(shade(leaf));
    if (r() < 0.12) {
      const fl = new THREE.Mesh(new THREE.SphereGeometry(0.04, 5, 3), colMat(['#f0c63a', '#d8483a', '#f2ece0'][Math.floor(r() * 3)]!));
      fl.position.set(px, 0.45 + h + 0.02, pz);
      g.add(fl);
    }
  }
  // the light bar on two posts
  for (const sx of [x0 + 0.08, x1 - 0.08]) g.add(box(0.05, 1.6, 0.05, KM.steel(), sx, 0.4, cz));
  g.add(box(w, 0.06, 0.18, KM.steel(), cx, 2.0, cz));
  g.add(box(w - 0.1, 0.03, 0.12, glow('#ffb8f0', 3.5), cx, 1.97, cz));
  pool.add({ pos: new THREE.Vector3(cx, 1.6, cz), color: new THREE.Color('#ffaee8'), intensity: 4, dist: 4.5 });
  addSolid(x0, z0, x1, z1);
}

// ----------------------------------------------------------- furniture

export function crate(g: THREE.Object3D, x: number, z: number, s = 0.55, y = 0, rot = 0): THREE.Mesh {
  const c = box(s, s, s, KM.wood(), x, y, z);
  c.rotation.y = rot;
  g.add(c);
  const f = box(s + 0.03, 0.06, s + 0.03, KM.steel(), x, y + s - 0.03, z);
  f.rotation.y = rot;
  g.add(f);
  return c;
}

export function drum(g: THREE.Object3D, x: number, z: number, mat = KM.rust(), tipped = false): void {
  if (tipped) {
    const d = new THREE.Mesh(cylGeo(0.26, 0.26, 0.8, 12), mat);
    d.rotation.z = Math.PI / 2;
    d.position.set(x, 0.26, z);
    g.add(shade(d));
    return;
  }
  g.add(cyl(0.26, 0.26, 0.8, mat, x, 0, z, 12));
  g.add(cyl(0.27, 0.27, 0.04, KM.steel(), x, 0.25, z, 12));
  g.add(cyl(0.27, 0.27, 0.04, KM.steel(), x, 0.55, z, 12));
}

/** Steel shelving against a wall, stocked with tins, crates and jars. */
export function shelf(g: THREE.Object3D, x: number, z: number, w: number, seed: number, h = 2.0, d = 0.5): void {
  const r = rng(seed);
  for (const sx of [-w / 2, w / 2]) for (const sz of [-d / 2, d / 2]) g.add(box(0.05, h, 0.05, KM.steel(), x + sx, 0, z + sz));
  const levels = [0.15, 0.7, 1.25, 1.8].filter((y) => y < h);
  const stock = ['#8a6a3a', '#5a6a72', '#a8463a', '#c9a24a', '#46603c', '#d8d0bc'];
  for (const y of levels) {
    g.add(box(w, 0.04, d, KM.steel(), x, y, z));
    let px = x - w / 2 + 0.08;
    while (px < x + w / 2 - 0.15) {
      const k = r();
      if (k < 0.18) { px += 0.2; continue; }
      if (k < 0.45) {
        const s = 0.28 + r() * 0.12;
        g.add(box(s, s * 0.8, d * 0.8, KM.wood(), px + s / 2, y + 0.04, z));
        px += s + 0.04;
      } else {
        const n = 2 + Math.floor(r() * 3);
        const col = colMat(stock[Math.floor(r() * stock.length)]!, { roughness: 0.6, metalness: 0.3 });
        for (let i = 0; i < n; i++) g.add(cyl(0.06, 0.06, 0.16 + r() * 0.06, col, px + 0.07 + i * 0.13, y + 0.04, z + (r() - 0.5) * 0.15, 6));
        px += n * 0.13 + 0.06;
      }
    }
  }
  addSolid(x - w / 2 - 0.05, z - d / 2 - 0.05, x + w / 2 + 0.05, z + d / 2 + 0.05);
}

export function table(g: THREE.Object3D, x: number, z: number, w: number, d: number, top = KM.wood(), h = 0.78): void {
  g.add(box(w, 0.07, d, top, x, h - 0.07, z));
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) g.add(box(0.06, h - 0.07, 0.06, KM.steel(), x + sx * (w / 2 - 0.08), 0, z + sz * (d / 2 - 0.08)));
  addSolid(x - w / 2, z - d / 2, x + w / 2, z + d / 2);
}

export function benchSeat(g: THREE.Object3D, x: number, z: number, w: number, solid = true): void {
  g.add(box(w, 0.06, 0.32, KM.wood(), x, 0.42, z));
  for (const sx of [-1, 1]) g.add(box(0.05, 0.42, 0.28, KM.steel(), x + sx * (w / 2 - 0.1), 0, z));
  if (solid) addSolid(x - w / 2, z - 0.16, x + w / 2, z + 0.16);
}

export function locker(g: THREE.Object3D, x: number, z: number, n: number, paint = KM.paintGreen()): void {
  for (let i = 0; i < n; i++) {
    const lx = x + i * 0.46;
    g.add(box(0.44, 1.9, 0.45, paint, lx, 0, z));
    g.add(box(0.36, 0.04, 0.02, KM.dark(), lx, 1.6, z + 0.23));
    g.add(box(0.36, 0.04, 0.02, KM.dark(), lx, 1.5, z + 0.23));
    g.add(box(0.04, 0.12, 0.03, KM.steel(), lx + 0.13, 1.0, z + 0.24));
  }
  addSolid(x - 0.23, z - 0.23, x + (n - 1) * 0.46 + 0.23, z + 0.23);
}

/** A console desk: angled panel of lit screens + blinking buttons. */
export function console_(g: THREE.Object3D, pool: LightPool, x: number, z: number, w: number, screens: string[], seed: number): THREE.Mesh[] {
  g.add(box(w, 0.8, 0.6, KM.steel(), x, 0, z));
  g.add(box(w, 0.06, 0.66, KM.dark(), x, 0.8, z + 0.02));
  const lit: THREE.Mesh[] = [];
  const r = rng(seed);
  const tower = new THREE.Group();
  tower.position.set(x, 0.86, z - 0.2);
  tower.add(box(w, 0.75, 0.22, KM.steel(), 0, 0, 0));
  screens.forEach((col, i) => {
    const sw = (w - 0.2) / screens.length;
    const sx = -w / 2 + 0.1 + sw * (i + 0.5);
    const s = new THREE.Mesh(new THREE.PlaneGeometry(sw - 0.06, 0.42), screenMat(col, seed + i));
    s.position.set(sx, 0.4, 0.115);
    tower.add(s);
    lit.push(s);
  });
  tower.rotation.x = -0.18;
  g.add(tower);
  for (let i = 0; i < Math.floor(w * 6); i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.05), glow(['#ff5a4a', '#7dff9a', '#ffd04a'][Math.floor(r() * 3)]!, 2.5));
    b.position.set(x - w / 2 + 0.12 + r() * (w - 0.24), 0.88, z + 0.05 + r() * 0.2);
    g.add(b);
    lit.push(b);
  }
  pool.add({ pos: new THREE.Vector3(x, 1.4, z + 0.6), color: new THREE.Color(screens[0] ?? '#7fe0c8'), intensity: 2.6, dist: 3.5 });
  addSolid(x - w / 2, z - 0.35, x + w / 2, z + 0.32);
  return lit;
}

const screenCache = new Map<string, THREE.MeshStandardMaterial>();
function screenMat(col: string, seed: number): THREE.MeshStandardMaterial {
  const key = col + (seed % 4);
  let m = screenCache.get(key);
  if (!m) {
    const p = new Pix(24, 16), r = rng(seed);
    const c = hex(col);
    for (let y = 0; y < 16; y++)
      for (let x = 0; x < 24; x++) {
        let v: RGB = mul(c, 0.12);
        if (y % 3 === 1 && x > 1 && x < 4 + r() * 18) v = mul(c, 0.8 + r() * 0.2);
        if (y === 0 || y === 15 || x === 0 || x === 23) v = mul(c, 0.05);
        p.set(x, y, v);
      }
    const t = p.texture({ repeat: false, worldSize: false });
    t.minFilter = THREE.NearestFilter;
    m = new THREE.MeshStandardMaterial({ map: t, emissive: '#ffffff', emissiveMap: t, emissiveIntensity: 2.2, roughness: 0.3 });
    screenCache.set(key, m);
  }
  return m;
}

/** A painted plate on a wall with lettering (room names). */
export function wallPlate(g: THREE.Object3D, x: number, y: number, z: number, text: string, w = 2.4, bg = '#c99a2a', fg = '#16140f'): void {
  const tex = textTexture(text, { w: Math.round(w * 32), h: 16, bg, fg, font: 'bold 12px monospace', worn: 0.1, seed: text.length });
  const m = new THREE.Mesh(boxGeo(w, 0.5, 0.04), [KM.steel(), KM.steel(), KM.steel(), KM.steel(), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.2 }), KM.steel()]);
  m.position.set(x, y, z + 0.03);
  g.add(shade(m));
  for (const sx of [-w / 2 + 0.08, w / 2 - 0.08]) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.025, 5, 3), KM.steel());
    b.position.set(x + sx, y, z + 0.06);
    g.add(b);
  }
}

/** Pipe run along a wall: a few parallel pipes with flanges and a valve wheel. */
export function pipes(g: THREE.Object3D, x0: number, x1: number, z: number, ys: number[], seed: number): void {
  const r = rng(seed);
  const mats = [KM.rust(), KM.steel(), colMat('#5a6e52', { metalness: 0.3, roughness: 0.6 })];
  ys.forEach((y, i) => {
    const mat = mats[i % mats.length]!;
    const p = new THREE.Mesh(cylGeo(0.06 + i * 0.015, 0.06 + i * 0.015, x1 - x0, 8), mat);
    p.rotation.z = Math.PI / 2;
    p.position.set((x0 + x1) / 2, y, z + 0.12 + i * 0.04);
    g.add(shade(p));
    for (let x = x0 + 0.6 + r(); x < x1 - 0.3; x += 1.6 + r()) {
      const f = new THREE.Mesh(cylGeo(0.1 + i * 0.015, 0.1 + i * 0.015, 0.06, 8), KM.steel());
      f.rotation.z = Math.PI / 2;
      f.position.set(x, y, z + 0.12 + i * 0.04);
      g.add(shade(f));
    }
  });
  const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 4, 10), KM.paintRed());
  wheel.position.set(x0 + (x1 - x0) * (0.3 + r() * 0.4), ys[0]! + 0.2, z + 0.25);
  g.add(shade(wheel));
}

/** Vines and moss creeping over a wall from a crack: life underground too. */
export function creeper(g: THREE.Object3D, x: number, z: number, w: number, h: number): void {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), KM.vine());
  const uv = m.geometry.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w, uv.getY(i) * h);
  m.position.set(x, h / 2, z + 0.03);
  m.castShadow = true;
  g.add(m);
}

/** A cluster of Resonance crystals growing out of the rock, softly glowing. */
export function crystals(g: THREE.Object3D, pool: LightPool, x: number, z: number, col: string, seed: number, s = 1): void {
  const r = rng(seed);
  const mat = colMat(col, { emissive: col, emissiveIntensity: 1.8, roughness: 0.2, transparent: true, opacity: 0.92 });
  for (let i = 0; i < 5; i++) {
    const h = (0.35 + r() * 0.6) * s;
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.08 * s + r() * 0.06 * s, h, 5), mat);
    c.position.set(x + (r() - 0.5) * 0.4 * s, h / 2, z + (r() - 0.5) * 0.3 * s);
    c.rotation.set((r() - 0.5) * 0.7, r() * 3, (r() - 0.5) * 0.7);
    g.add(c);
  }
  pool.add({ pos: new THREE.Vector3(x, 0.6, z + 0.3), color: new THREE.Color(col), intensity: 3.5, dist: 3.5 });
}

export { glow, beam, box, cyl, rng };
