import * as THREE from 'three';
import { COLS, ROWS, HALF } from './rules';
import type { Mood } from '../mood';
import { cottonwood, bush } from '../field/props';
import { colMat, box } from '../geo';
import { rng } from '../noise';
import type { Side } from './rules';

/**
 * The battle grid belongs to the place you're fighting in (Mark: it looked
 * too much like Battle Network). Each region turns the 6×3 field into its own
 * ground — prairie earth plots, cracked blacktop, bunker deck plate — and
 * dresses the clearing around it. Sides read through material, not neon:
 * your side is worn and familiar, theirs is foreign ground.
 */

export type ThemeId = 'field' | 'road' | 'bunker' | 'cistern';

export interface ArenaTheme {
  id: ThemeId;
  /** panel height (a raised plot, a slab, a plate) */
  panelH: number;
  roughness: number;
  metalness: number;
  paintPanel(side: Side, seed: number, night: boolean): THREE.CanvasTexture;
  ground(mood: Mood): THREE.Mesh;
  /** set dressing around (and between) the panels */
  dress(scene: THREE.Scene, mood: Mood, panelAt: (col: number, row: number) => THREE.Vector3, pw: number, pd: number): void;
  /** the glow under your Ohm's panel, and the ground's warning before a hit */
  standGlow: string;
  warnGlow: string;
}

type RGB = [number, number, number];
const hex = (h: string): RGB => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/** Paint a 32×32 pixel texture from a per-pixel function. */
function paint(fn: (x: number, y: number, r: () => number) => RGB, seed: number): THREE.CanvasTexture {
  const S = 32, c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d')!;
  const img = g.createImageData(S, S);
  const r = rng(seed);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const v = fn(x, y, r), i = (y * S + x) * 4;
    img.data[i] = v[0]; img.data[i + 1] = v[1]; img.data[i + 2] = v[2]; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function groundDisc(colors: [string, string], speck: string[], night: boolean): THREE.Mesh {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 8, 64, 64, 64);
  grd.addColorStop(0, colors[0]);
  grd.addColorStop(1, colors[1]);
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const r = rng(91);
  g.globalAlpha = night ? 0.25 : 0.4;
  for (let i = 0; i < 1400; i++) { g.fillStyle = speck[i % speck.length]!; g.fillRect(r() * 128, r() * 128, 1, 1); }
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.CircleGeometry(16, 48), new THREE.MeshStandardMaterial({ map: t, roughness: 1 }));
  m.rotation.x = -Math.PI / 2;
  m.receiveShadow = true;
  return m;
}

/** Wild grass tufts: little crossed blade cards. */
function tufts(scene: THREE.Scene, spots: Array<[number, number]>, color: string, seed: number): void {
  const r = rng(seed);
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 1, side: THREE.DoubleSide });
  for (const [x, z] of spots) {
    for (let k = 0; k < 3; k++) {
      const h = 0.18 + r() * 0.22;
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.05, h, 3), mat);
      blade.position.set(x + (r() - 0.5) * 0.25, h / 2, z + (r() - 0.5) * 0.18);
      blade.rotation.z = (r() - 0.5) * 0.5;
      blade.castShadow = true;
      scene.add(blade);
    }
  }
}

// ------------------------------------------------------------- the Field

const field: ArenaTheme = {
  id: 'field',
  panelH: 0.1,
  roughness: 1,
  metalness: 0,
  // your side: dark worked loam with green coming through; theirs: dry, cracked red clay
  paintPanel(side, seed, night) {
    const base = side === 'player' ? hex('#5a4630') : hex('#8a5a3a');
    const dark = side === 'player' ? hex('#3a2c1e') : hex('#5e3a24');
    const life = side === 'player' ? hex('#5e8a32') : hex('#8a8a4a');
    return paint((x, y, r) => {
      let c = mix(base, dark, r() * 0.45);
      if (side === 'player' && (y % 6 === 2)) c = mix(c, dark, 0.5); // furrows
      if (side === 'foe' && (Math.abs(((x * 7 + y * 3) % 23) - 11) < 1 || Math.abs(((x * 3 - y * 5 + 64) % 19) - 9) < 1)) c = dark; // drying cracks
      if (r() < 0.05) c = life;
      if (x === 0 || y === 0) c = mix(c, hex('#a08868'), 0.35);
      if (x === 31 || y === 31) c = mix(c, dark, 0.6);
      return night ? mix(c, hex('#1a2230'), 0.25) : c;
    }, seed);
  },
  ground: (mood) => groundDisc(mood.night ? ['#2c3a26', '#141c14'] : ['#5b7f34', '#34501f'], ['#6f9a3c', '#4f7a2c', '#8a8a4a', '#3d5e24'], mood.night),
  dress(scene, mood, at, pw, pd) {
    let seed = 7100;
    for (const [x, z, s] of [[-9, -5.5, 1.3], [-6.2, -6.4, 1.1], [-2, -7.2, 1.25], [2.6, -7.0, 1.2], [6.4, -6.2, 1.15], [9.4, -5.2, 1.3], [-10.5, -1.5, 1.1], [10.8, -1.0, 1.2]] as Array<[number, number, number]>) {
      const t = cottonwood(x, z, s, seed++);
      t.position.y = 0;
      scene.add(t);
    }
    for (const [x, z] of [[-7.5, 3.5], [7.8, 3.2], [-4.6, -4.4], [4.4, -4.6], [0.3, -5.1], [-8.6, 0.8], [8.8, 0.4]] as Array<[number, number]>) {
      const b = bush(x, z, 0.9, seed++);
      b.position.y = 0;
      scene.add(b);
    }
    for (let x = -6; x <= 6; x += 1.5) {
      const post = box(0.1, 0.9, 0.1, colMat('#5a4a3a'), x, 0, -3.4);
      post.rotation.z = Math.sin(x * 3) * 0.08;
      scene.add(post);
    }
    // wild grass growing up between the plots, and a line of field stones down the middle
    const gaps: Array<[number, number]> = [];
    for (let c = 0; c < COLS - 1; c++) if (c !== HALF - 1) for (let r = 0; r < ROWS; r++) gaps.push([at(c, r).x + pw / 2, at(c, r).z]); // between columns
    for (let r = 0; r < ROWS - 1; r++) for (let c = 0; c < COLS; c++) gaps.push([at(c, r).x, at(c, r).z + pd / 2]); // between rows
    tufts(scene, gaps, mood.night ? '#2e4a24' : '#6a9a3a', 33);
    const stone = colMat('#8a8478', { roughness: 1 });
    for (let k = 0; k < ROWS * 2 + 1; k++) {
      const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12 + (k % 3) * 0.03, 0), stone);
      s.position.set(0, 0.05, at(0, 0).z - pd * 0.7 + k * (pd * (ROWS + 0.4)) / (ROWS * 2 + 1));
      s.scale.y = 0.55;
      s.castShadow = true;
      scene.add(s);
    }
  },
  standGlow: '#ffd08a',
  warnGlow: '#ff6a1a',
};

// ------------------------------------------------------------- the Farm Road

const road: ArenaTheme = {
  id: 'road',
  panelH: 0.06,
  roughness: 0.95,
  metalness: 0,
  // slabs of the old blacktop: yours darker and patched, theirs sun-bleached and crumbling
  paintPanel(side, seed, night) {
    const base = side === 'player' ? hex('#4a4844') : hex('#77736a');
    const dark = hex('#2c2a27');
    return paint((x, y, r) => {
      let c = mix(base, dark, r() * 0.3);
      if (r() < 0.04) c = mix(c, hex('#9a958a'), 0.6); // aggregate
      if (Math.abs(((x * 5 + y * 2) % 29) - 14) < 1 && r() < 0.8) c = r() < 0.4 ? hex('#5e8a32') : dark; // cracks with weeds
      if (side === 'player' && x > 18 && x < 26 && y > 6 && y < 14) c = mix(c, hex('#3a3936'), 0.6); // a tar patch
      if (x === 0 || y === 0 || x === 31 || y === 31) c = mix(c, dark, 0.55);
      return night ? mix(c, hex('#1a2230'), 0.25) : c;
    }, seed);
  },
  ground: (mood) => groundDisc(mood.night ? ['#2a3224', '#131812'] : ['#6a7a3c', '#3c4a22'], ['#8a8a4a', '#5e7a32', '#a09a68'], mood.night),
  dress(scene, mood, at, pw, pd) {
    // the faded centre line where the sides meet
    for (let k = 0; k < ROWS; k++) {
      const dash = box(0.08, 0.008, pd * 0.5, colMat('#c9a84a', { roughness: 1 }), 0, 0.065, at(0, k).z);
      scene.add(dash);
    }
    // telephone poles and a sagging line, barbed fence, tumbled hay
    const wood = colMat('#4e3b2b', { roughness: 1 });
    for (const x of [-8.5, 0, 8.5]) {
      scene.add(box(0.16, 4.2, 0.16, wood, x, 0, -6));
      scene.add(box(1.4, 0.1, 0.1, wood, x, 3.8, -6));
    }
    for (let x = -10; x <= 10; x += 1.6) {
      const post = box(0.08, 0.85, 0.08, wood, x, 0, -3.6);
      post.rotation.z = Math.sin(x * 2.3) * 0.1;
      scene.add(post);
    }
    scene.add(box(20, 0.02, 0.02, colMat('#6a6560', { metalness: 0.5 }), 0, 0.55, -3.6));
    scene.add(box(20, 0.02, 0.02, colMat('#6a6560', { metalness: 0.5 }), 0, 0.3, -3.6));
    for (const [x, z] of [[-7.2, 2.6], [7.4, 2.2], [6.6, 3.0]] as Array<[number, number]>) {
      const bale = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.75, 14), colMat('#c9a24a', { roughness: 1 }));
      bale.rotation.z = Math.PI / 2;
      bale.position.set(x, 0.45, z);
      bale.castShadow = true;
      scene.add(bale);
    }
    let seed = 7300;
    for (const [x, z, s] of [[-10, -7, 1.3], [-5, -8, 1.1], [5, -8.2, 1.2], [10.2, -7, 1.3]] as Array<[number, number, number]>) {
      const t = cottonwood(x, z, s, seed++);
      t.position.y = 0;
      scene.add(t);
    }
    // weeds at the slab joints
    const gaps: Array<[number, number]> = [];
    for (let c = 0; c < COLS; c++) gaps.push([at(c, 0).x, at(0, 0).z - pd / 2], [at(c, ROWS - 1).x + pw / 2, at(0, ROWS - 1).z + pd / 2]);
    tufts(scene, gaps, mood.night ? '#2e4a24' : '#7aa83c', 41);
  },
  standGlow: '#ffd08a',
  warnGlow: '#ff7a2a',
};

// ------------------------------------------------------------- underground

const bunker: ArenaTheme = {
  id: 'bunker',
  panelH: 0.08,
  roughness: 0.6,
  metalness: 0.45,
  // riveted deck plate: yours painted the colony's teal-grey, theirs bare rusting steel
  paintPanel(side, seed, night) {
    const base = side === 'player' ? hex('#4e6268') : hex('#6a5248');
    const dark = hex('#262b2e');
    return paint((x, y, r) => {
      let c = mix(base, dark, r() * 0.2);
      if ((x + y) % 6 === 0) c = mix(c, hex('#9aa4aa'), 0.18); // tread
      if (side === 'foe' && r() < 0.08) c = mix(c, hex('#8a4a26'), 0.7); // rust bloom
      if (x <= 1 || y <= 1 || x >= 30 || y >= 30) c = (x + y) % 4 < 2 ? hex('#c99a2a') : hex('#1d1b17'); // hazard edge
      if ((x === 4 || x === 27) && (y === 4 || y === 27)) c = hex('#b8c0c4'); // rivets
      return night ? mix(c, hex('#1a2230'), 0.15) : c;
    }, seed);
  },
  ground: () => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(16, 48), new THREE.MeshStandardMaterial({ color: '#23272b', roughness: 0.8, metalness: 0.3 }));
    m.rotation.x = -Math.PI / 2;
    m.receiveShadow = true;
    return m;
  },
  dress(scene) {
    const steel = colMat('#4a5258', { metalness: 0.4, roughness: 0.6 });
    scene.add(box(22, 3.2, 0.4, steel, 0, 0, -4.2));
    for (const x of [-7, -2, 3, 8]) {
      scene.add(box(0.3, 3.2, 0.5, colMat('#2b3136'), x, 0, -4.0));
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), colMat('#ffcf7a', { emissive: '#ffcf7a', emissiveIntensity: 4 }));
      bulb.position.set(x + 1.2, 2.3, -3.8);
      scene.add(bulb);
      const l = new THREE.PointLight('#ffb35c', 6, 7, 1.6);
      l.position.set(x + 1.2, 2.1, -3.2);
      scene.add(l);
    }
    for (const y of [1.7, 2.0]) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 22, 8), colMat('#7c4424', { metalness: 0.3 }));
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, y, -3.95);
      scene.add(pipe);
    }
    for (const [x, z] of [[-7.4, 2.4], [7.6, 2.0]] as Array<[number, number]>) scene.add(box(0.6, 0.6, 0.6, colMat('#6b5a44'), x, 0, z));
  },
  standGlow: '#9fe8ff',
  warnGlow: '#ff6a1a',
};

// ------------------------------------------------------------- the Cistern

const cistern: ArenaTheme = {
  id: 'cistern',
  panelH: 0.1,
  roughness: 0.5,
  metalness: 0.05,
  // wet channel concrete: yours scrubbed and drained, theirs slick with algae and standing water
  paintPanel(side, seed) {
    const base = side === 'player' ? hex('#6e7068') : hex('#4e5a52');
    const dark = hex('#2e3430');
    return paint((x, y, r) => {
      let c = mix(base, dark, r() * 0.25);
      if (side === 'foe' && Math.hypot(x - 16, y - 16) < 6 + r() * 2) c = mix(c, hex('#2e4a48'), 0.6); // a standing puddle
      if (r() < (side === 'foe' ? 0.12 : 0.04)) c = mix(c, hex('#4f7a2c'), 0.7); // algae
      if (x <= 0 || y <= 0) c = mix(c, hex('#9a9c90'), 0.4);
      if (x >= 31 || y >= 31) c = mix(c, dark, 0.6);
      return c;
    }, seed);
  },
  ground: () => {
    const m = new THREE.Mesh(new THREE.CircleGeometry(16, 48), new THREE.MeshStandardMaterial({ color: '#1e2a26', roughness: 0.3, metalness: 0.2 }));
    m.rotation.x = -Math.PI / 2;
    m.receiveShadow = true;
    return m;
  },
  dress(scene) {
    const wall = colMat('#5e5f58', { roughness: 0.9 });
    scene.add(box(22, 3.4, 0.5, wall, 0, 0, -4.3));
    const moss = colMat('#3d5e24', { roughness: 1 });
    for (const x of [-8, -3, 2, 7]) scene.add(box(1.6, 0.9 + (x % 3) * 0.2, 0.08, moss, x, 0, -4.0));
    for (const y of [1.8, 2.2]) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 22, 8), colMat('#7c4424', { metalness: 0.3 }));
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, y, -3.95);
      scene.add(pipe);
    }
    // a strip of open channel water behind the field, and lamps over it
    const water = new THREE.Mesh(new THREE.PlaneGeometry(22, 1.6), new THREE.MeshStandardMaterial({ color: '#1d3a38', roughness: 0.1, metalness: 0.3 }));
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, 0.02, -3.0);
    scene.add(water);
    for (const x of [-6, 0, 6]) {
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), colMat('#ffcf7a', { emissive: '#ffcf7a', emissiveIntensity: 4 }));
      bulb.position.set(x, 2.6, -3.8);
      scene.add(bulb);
      const l = new THREE.PointLight('#ffb35c', 6, 7, 1.6);
      l.position.set(x, 2.4, -3.2);
      scene.add(l);
    }
  },
  standGlow: '#9fe8ff',
  warnGlow: '#ff6a1a',
};

export const THEMES: Record<ThemeId, ArenaTheme> = { field, road, bunker, cistern };

/** Which grid a region fights on. */
export function themeFor(areaId: string): ThemeId {
  // a section can name its grid outright (region: 'road' | 'bunker' …)
  if (areaId === 'field' || areaId === 'road' || areaId === 'bunker' || areaId === 'cistern') return areaId;
  return areaId === 'farmroad' || areaId === 'railhead' || areaId === 'scar' ? 'road' : areaId === 'ohmstead' ? 'bunker' : areaId === 'cistern' ? 'cistern' : 'field';
}
