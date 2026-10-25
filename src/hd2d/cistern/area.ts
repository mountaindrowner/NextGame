import * as THREE from 'three';
import { fbm, rng, vnoise } from '../noise';
import { Pix, textTexture } from '../textures';
import { box, cyl, beam, cylGeo, boxGeo, colMat, shade } from '../geo';
import { setWorld, hitsSolid, addSolid } from '../world';
import { buildWater, buildGrass } from '../terrain';
import { CISTERN } from '../mood';
import { castOf, loadMap, type AreaBuilder, type Thing } from '../area';
import { KM, LightPool, worldUV, paintFloor, wallLamp, pendant, growBed, crate, drum, pipes, creeper, glow, kitHex, kitMix, type RGB } from '../ohmstead/kit';

/**
 * THE CISTERN — Colony 2, a gentle agrarian colony in flooded underground
 * waterworks (Critical Path §5). Layout 1:1 from tools/gen-cistern.ts (40×28):
 * four mossy-concrete chambers round a central basin crossed by catwalks —
 * the Nursery (NW), the Grange + seed-vault (NE), the pump room (SW), reeds
 * and machinery (SE) — and, between the colony and the south entry dock, a
 * full-width flooded band: THE HOVER GATE. The catwalk is out there; only an
 * Ohm that hovers carries you across. A survey Dronelet waits in its cradle
 * on the dock for any party that has none.
 */

const COLS = 40, ROWS = 28;
const MAP: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => '.'));
const inb = (x: number, z: number): boolean => x >= 0 && z >= 0 && x < COLS && z < ROWS;
const rect = (x0: number, z0: number, w: number, h: number, c: string): void => {
  for (let z = z0; z < z0 + h; z++) for (let x = x0; x < x0 + w; x++) if (inb(x, z)) MAP[z]![x] = c;
};
for (let x = 0; x < COLS; x++) { MAP[0]![x] = '#'; MAP[ROWS - 1]![x] = '#'; }
for (let z = 0; z < ROWS; z++) { MAP[z]![0] = '#'; MAP[z]![COLS - 1] = '#'; }
rect(14, 6, 13, 16, '~'); // the central basin
rect(20, 6, 1, 16, '='); // vertical catwalk
rect(14, 13, 13, 2, '='); // horizontal catwalk
rect(1, 20, 38, 2, '~'); // THE HOVER GATE — the catwalk is out here
rect(2, 12, 12, 1, '#'); rect(27, 12, 11, 1, '#'); // chamber walls
rect(28, 18, 6, 3, 'r'); // reed beds (encounters)
rect(4, 4, 4, 2, 'r');
rect(19, 22, 3, 4, '.'); // the south entry dock
MAP[22]![20] = '=';
MAP[0]![20] = MAP[0]![19] = MAP[0]![21] = 'n'; // the way north (Warden-held)
MAP[27]![19] = MAP[27]![20] = MAP[27]![21] = 's'; // the culvert back to the Rust Mile

const get = (x: number, z: number): string => (inb(x, z) ? MAP[z]![x]! : '#');
const isWall = (x: number, z: number): boolean => get(x, z) === '#';
const isWater = (x: number, z: number): boolean => get(x, z) === '~';

/** Mossy channel concrete: board-formed lifts, damp streaks, moss climbing from the waterline. */
let wallCache: THREE.Texture | null = null;
function wallTex(): THREE.Texture {
  if (wallCache) return wallCache;
  const W = 32, H = 48, p = new Pix(W, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const up = H - 1 - y;
    let c: RGB = kitMix(kitHex('#7a7a70'), kitHex('#5e5f58'), vnoise(x * 0.4, y * 0.4, 11));
    if (up % 12 === 0) c = kitMix(c, kitHex('#3e3f3a'), 0.6); // form-lift joints
    if (vnoise(x * 1.2, y * 0.07, 12) > 0.74) c = kitMix(c, kitHex('#3a4038'), 0.5); // damp streaks
    const moss = fbm(x * 0.2, y * 0.2, 13, 3) - up / 70;
    if (moss > 0.18) c = kitMix(c, moss > 0.3 ? kitHex('#4f7a2c') : kitHex('#3d5e24'), 0.75);
    if (up < 5) c = kitMix(c, kitHex('#2a3a30'), 0.5); // the waterline stain
    p.set(x, y, c);
  }
  return (wallCache = p.texture());
}

export const buildCistern: AreaBuilder = async (scene) => {
  setWorld({ cols: COLS, rows: ROWS, cell: (x, z) => (get(x, z) === 'r' ? 'T' : get(x, z) === '#' ? '#' : '.'), height: () => 0 });
  const data = await loadMap('cistern');
  const root = new THREE.Group();
  scene.add(root);
  const pool = new LightPool(scene, 12);
  scene.background = new THREE.Color('#040908');
  const r = rng(2525);

  // ------------------------------------------------------------- floor
  const H = kitHex;
  const floor = paintFloor(COLS, ROWS, (x, z) => !isWall(x, z), (x, z, c): RGB => {
    const g = get(Math.floor(x), Math.floor(z));
    const n = fbm(x * 0.4, z * 0.4, 21, 3), fine = vnoise(x * 16, z * 16, 22);
    if (g === '~') return kitMix(H('#1e2a26'), H('#2a3a32'), n); // the basin bed under the water
    // wet concrete with puddles, algae in the low spots
    let d: RGB = kitMix(H('#6a6c64'), H('#7e8076'), vnoise(Math.floor(x / 2) * 3.1, Math.floor(z / 2) * 2.3, 23));
    d = kitMix(d, H('#3e4038'), Math.max(0, n - 0.5) * 0.9);
    if (fbm(x * 0.7, z * 0.7, 24, 2) > 0.66) d = kitMix(d, H('#2e3a3a'), 0.55); // puddles
    if (fbm(x * 0.25, z * 0.25, 25, 3) > 0.6 && fine > 0.4) d = kitMix(d, fine > 0.75 ? H('#5e8a32') : H('#3d6a26'), 0.7);
    if ((x % 2) < 0.06 || (z % 2) < 0.06) d = kitMix(d, H('#34362f'), 0.6);
    return d;
  });
  const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(COLS, ROWS), new THREE.MeshStandardMaterial({ map: floor, roughness: 0.55, metalness: 0.05 }));
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(COLS / 2, 0, ROWS / 2);
  floorMesh.receiveShadow = true;
  root.add(floorMesh);

  // ------------------------------------------------------------- water
  const waterCells: Array<[number, number]> = [];
  for (let z = 0; z < ROWS; z++) for (let x = 0; x < COLS; x++) if (isWater(x, z)) waterCells.push([x, z]);
  const water = buildWater(scene, true, 0, 0, 0, 0, 0.06, waterCells);
  // a concrete lip wherever floor meets water
  const lip = KM.concrete();
  for (const [x, z] of waterCells) {
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Array<[number, number]>) {
      const n = get(x + dx, z + dz);
      if (n === '.' || n === 'r') {
        const along = dx === 0;
        root.add(box(along ? 1 : 0.14, 0.16, along ? 0.14 : 1, lip, x + 0.5 + dx * 0.43, 0, z + 0.5 + dz * 0.43));
      }
    }
  }

  // ------------------------------------------------------------- catwalks
  const grate = colMat('#4a5258', { metalness: 0.5, roughness: 0.5 });
  const rail = KM.steel();
  for (let z = 0; z < ROWS; z++) for (let x = 0; x < COLS; x++) {
    if (get(x, z) !== '=') continue;
    root.add(box(1.0, 0.08, 1.0, grate, x + 0.5, 0.12, z + 0.5));
    for (let k = 0; k < 4; k++) root.add(box(1.0, 0.012, 0.04, colMat('#2a2e32'), x + 0.5, 0.205, z + 0.15 + k * 0.23));
    // hand rails along the open-water sides
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as Array<[number, number]>) {
      if (!isWater(x + dx, z + dz)) continue;
      const px = x + 0.5 + dx * 0.47, pz = z + 0.5 + dz * 0.47;
      root.add(box(0.05, 0.85, 0.05, rail, px, 0.2, pz));
      root.add(box(dx === 0 ? 1.0 : 0.04, 0.04, dx === 0 ? 0.04 : 1.0, rail, px, 1.0, pz));
    }
  }
  // the broken end where the catwalk once crossed the flood — twisted and dropped into the water
  const stub = new THREE.Group();
  stub.add(box(1.0, 0.08, 1.2, grate, 0, 0, 0.6));
  stub.rotation.x = 0.35;
  stub.position.set(20.5, -0.15, 20.0);
  root.add(stub);
  root.add(box(0.06, 0.9, 0.06, rail, 20.95, -0.2, 20.7).rotateZ(0.3));

  // ------------------------------------------------------------- walls (HD-2D cutaway)
  const TALL = 2.8, LOW = 0.7;
  type Wc = { x: number; z: number; front: boolean };
  const walls: Wc[] = [];
  for (let z = 0; z < ROWS; z++) for (let x = 0; x < COLS; x++) {
    if (!isWall(x, z)) continue;
    let near = false;
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (!isWall(x + dx, z + dz) && inb(x + dx, z + dz)) near = true;
    if (near) walls.push({ x, z, front: z === ROWS - 1 });
  }
  const side = worldUV(new THREE.MeshStandardMaterial({ map: wallTex(), roughness: 0.9 }));
  const cap = new THREE.MeshStandardMaterial({ color: '#121614', roughness: 1 });
  const wg = new THREE.BoxGeometry(1.02, 1, 1.02);
  wg.translate(0, 0.5, 0);
  const im = new THREE.InstancedMesh(wg, [side, side, cap, cap, side, side], walls.length);
  im.castShadow = im.receiveShadow = true;
  root.add(im);
  const rowH = new Map<number, number>();
  for (let z = 0; z < ROWS; z++) rowH.set(z, TALL);
  const m4 = new THREE.Matrix4();
  const writeWalls = (): void => {
    walls.forEach((w, i) => { m4.makeScale(1, w.front ? LOW : rowH.get(w.z)!, 1).setPosition(w.x + 0.5, 0, w.z + 0.5); im.setMatrixAt(i, m4); });
    im.instanceMatrix.needsUpdate = true;
    im.computeBoundingSphere();
  };
  writeWalls();
  const mounts: Array<{ row: number; obj: THREE.Object3D }> = [];
  const mount = (row: number): THREE.Group => { const g = new THREE.Group(); root.add(g); mounts.push({ row, obj: g }); return g; };

  const things: Thing[] = [];
  const lit: THREE.Mesh[] = [];

  // ------------------------------------------------------------- NW: the Nursery
  {
    const back = mount(0);
    for (const x of [3.5, 11.5]) wallLamp(back, pool, x, 1.0, 2.0);
    creeper(back, 6.0, 1.02, 2.4, 2.4);
    creeper(back, 9.5, 1.02, 1.2, 1.6);
    // Ohm cradles: padded basins under soft blue light, a sleeping Ohmlet in each
    for (const [cx, cz, col] of [[4.5, 8.5, '#7fd4ff'], [9.5, 8.5, '#9fe8c8']] as Array<[number, number, string]>) {
      root.add(cyl(0.75, 0.6, 0.5, KM.wood(), cx, 0, cz, 14));
      root.add(cyl(0.68, 0.68, 0.06, KM.cloth('#d8c8b0'), cx, 0.46, cz, 14));
      const sleeper = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), colMat('#c8d0d8', { metalness: 0.4, roughness: 0.4 }));
      sleeper.scale.y = 0.7;
      sleeper.position.set(cx, 0.62, cz);
      root.add(shade(sleeper));
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), glow(col, 3));
      eye.position.set(cx + 0.12, 0.67, cz + 0.15);
      root.add(eye);
      lit.push(eye);
      // a mobile of washers and bottle caps hanging over each cradle
      root.add(box(0.02, 1.1, 0.02, colMat('#1a1a1a'), cx, 1.5, cz));
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI * 2;
        const wsh = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 4, 10), KM.steel());
        wsh.position.set(cx + Math.cos(a) * 0.25, 1.55, cz + Math.sin(a) * 0.25);
        root.add(wsh);
      }
      pool.add({ pos: new THREE.Vector3(cx, 1.4, cz + 0.5), color: new THREE.Color(col), intensity: 1.6, dist: 3.5 });
      addSolid(cx - 0.75, cz - 0.75, cx + 0.75, cz + 0.75);
    }
    growBed(root, pool, 4.2, 10.6, 7.0, 11.6, 31);
    growBed(root, pool, 9.0, 10.6, 11.8, 11.6, 32);
    // a shelf of blankets and baby-bottle oilcans by the door
    root.add(box(1.6, 1.4, 0.45, KM.wood(), 12.4, 0, 1.4));
    for (let k = 0; k < 4; k++) root.add(box(0.32, 0.18, 0.36, KM.cloth(['#c8b090', '#9ab0b8', '#d8c8a8', '#a8b890'][k]!), 11.8 + k * 0.38, 0.75, 1.4));
    addSolid(11.5, 1.1, 13.3, 1.7);
    pendant(root, pool, 7.0, 6.0, true);
    things.push({ x: 4.5, z: 9.4, height: 1.2, label: 'Cradle', say: { lines: ['A newborn Ohmlet dozes in the cradle, one eye glowing soft. Someone has tucked a sock over it like a blanket.'] } });
  }

  // ------------------------------------------------------------- NE: the Grange + seed-vault
  {
    const back = mount(0);
    for (const x of [28.5, 36.5]) wallLamp(back, pool, x, 1.0, 2.0);
    creeper(back, 32.5, 1.02, 1.6, 2.0);
    for (const tz of [8.5, 11.0]) {
      root.add(box(3.0, 0.08, 1.0, KM.wood(), 30.5, 0.78, tz));
      for (const sx of [-1.35, 1.35]) for (const sz of [-0.4, 0.4]) root.add(box(0.07, 0.78, 0.07, KM.wood(), 30.5 + sx, 0, tz + sz));
      // the harvest: squash, greens, a basket of eggs-that-are-bolts
      for (let k = 0; k < 6; k++) {
        const veg = new THREE.Mesh(new THREE.SphereGeometry(0.12 + r() * 0.06, 8, 6), colMat(['#d8963a', '#5e8a32', '#c8402e', '#e8d060', '#7aa83c'][k % 5]!, { roughness: 0.8 }));
        veg.position.set(29.4 + k * 0.42, 0.95, tz + (r() - 0.5) * 0.4);
        root.add(shade(veg));
      }
      addSolid(28.9, tz - 0.5, 32.1, tz + 0.5);
    }
    // the seed-vault: a steel cabinet of little drawers, each tagged and softly lit
    const v = new THREE.Group();
    v.add(box(2.2, 2.0, 0.8, KM.steel()));
    for (let row = 0; row < 5; row++) for (let col = 0; col < 6; col++) {
      v.add(box(0.3, 0.3, 0.04, colMat('#3a4a48', { metalness: 0.4 }), -0.85 + col * 0.34, 0.2 + row * 0.36, 0.41));
      const tag = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 0.01), glow(row % 2 ? '#7fffd4' : '#c8ffe8', 1.6));
      tag.position.set(-0.85 + col * 0.34, 0.42 + row * 0.36, 0.44);
      v.add(tag);
    }
    v.position.set(35.5, 0, 9.4);
    root.add(shade(v));
    pool.add({ pos: new THREE.Vector3(35.5, 1.4, 10.4), color: new THREE.Color('#7fffd4'), intensity: 4, dist: 4.5 });
    addSolid(34.3, 8.9, 36.7, 9.9);
    things.push({ x: 35.5, z: 10.3, height: 2.2, label: 'Seed-vault', say: { lines: ['Hundreds of little drawers, every one labeled in the same careful hand. Seed, and Ohm-lines, kept side by side.'] } });
    for (const [x, z] of [[37.4, 4.4], [37.4, 5.2], [36.6, 4.8]] as Array<[number, number]>) crate(root, x, z, 0.55);
    addSolid(36.2, 4.0, 37.8, 5.6);
    pendant(root, pool, 32.5, 6.5, true);
  }

  // ------------------------------------------------------------- SW: the pump room
  const flywheels: THREE.Object3D[] = [];
  {
    const back = mount(12);
    pipes(back, 1.0, 14.0, 13.0, [1.5, 1.85, 2.2], 41);
    wallLamp(back, pool, 7.5, 13.0, 2.0);
    for (const x of [4.5, 8.5]) {
      root.add(box(1.6, 1.0, 1.1, KM.paintGreen(), x, 0, 18.8));
      root.add(cyl(0.26, 0.26, 0.8, KM.steel(), x - 0.3, 1.0, 18.8, 10));
      root.add(beam(new THREE.Vector3(x - 0.3, 1.8, 18.8), new THREE.Vector3(x - 0.3, 2.6, 13.3), 0.12, KM.rust())); // riser to the wall pipes
      const fw = new THREE.Group();
      fw.position.set(x + 0.95, 0.75, 18.8);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.07, 6, 18), KM.steel());
      rim.rotation.y = Math.PI / 2;
      fw.add(shade(rim));
      for (let k = 0; k < 4; k++) { const sp = new THREE.Mesh(boxGeo(0.04, 0.95, 0.05), KM.steel()); sp.rotation.x = (k / 4) * Math.PI; fw.add(sp); }
      root.add(fw);
      flywheels.push(fw);
      addSolid(x - 0.85, 18.2, x + 1.45, 19.4);
    }
    // the gauge board, needles twitching
    const gb = new THREE.Group();
    gb.add(box(1.4, 0.9, 0.08, KM.steel(), 0, 1.0, 0));
    for (let k = 0; k < 3; k++) {
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.15, 14), colMat('#e8e2d2'));
      face.position.set(-0.45 + k * 0.45, 1.45, 0.05);
      gb.add(face);
      const needle = box(0.015, 0.12, 0.01, colMat('#8a2e24'), -0.45 + k * 0.45, 1.45, 0.06);
      gb.add(needle);
      lit.push(needle);
    }
    gb.position.set(12.0, 0, 13.6);
    root.add(gb);
    drum(root, 2.0, 14.2);
    drum(root, 2.6, 14.4, KM.paintBlue());
    addSolid(1.7, 13.9, 2.9, 14.7);
    pendant(root, pool, 7.0, 16.2, true);
  }

  // ------------------------------------------------------------- SE: reeds + machinery
  {
    const back = mount(12);
    pipes(back, 27.0, 39.0, 13.0, [1.6, 2.0], 42);
    wallLamp(back, pool, 33.0, 13.0, 2.0);
    // a valve wheel the size of a cartwheel, and the ladder down to the basin
    const vw = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 6, 20), KM.paintRed());
    vw.position.set(37.2, 1.2, 14.2);
    root.add(shade(vw));
    root.add(cyl(0.18, 0.18, 1.2, KM.rust(), 37.2, 0, 14.2, 10));
    addSolid(36.6, 13.7, 37.8, 14.7);
    for (let k = 0; k < 5; k++) root.add(box(0.5, 0.04, 0.05, KM.steel(), 26.6, 0.2 + k * 0.32, 16.0));
    for (const dz of [-0.24, 0.24]) root.add(box(0.05, 1.7, 0.05, KM.steel(), 26.6 + dz, 0, 16.0));
    pendant(root, pool, 33.0, 16.0, true);
  }

  // ------------------------------------------------------------- the south dock (entry)
  {
    // the recharge station by the dock
    const st = new THREE.Group();
    st.add(box(0.9, 1.4, 0.55, KM.steel()));
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.4), glow('#7dff9a', 0.7));
    scr.position.set(0, 1.0, 0.29);
    st.add(scr);
    lit.push(scr);
    st.position.set(17.4, 0, 22.6);
    root.add(shade(st));
    addSolid(16.9, 22.3, 17.9, 22.9);
    pool.add({ pos: new THREE.Vector3(17.4, 1.2, 23.2), color: new THREE.Color('#7dff9a'), intensity: 1.6, dist: 3 });
    things.push({ x: 17.4, z: 23.1, height: 1.6, label: 'Recharge', action: 'heal', say: { lines: ['A field medic tops off your Ohms. Recharged. Stay current.'] } });
    // the survey drone's cradle: a bracketed stand with a charging coil
    const cr = new THREE.Group();
    cr.add(box(0.8, 0.9, 0.8, KM.steel()));
    cr.add(cyl(0.34, 0.34, 0.06, glow('#7fd4ff', 0.9), 0, 0.9, 0, 16));
    for (const a of [0, 2.1, 4.2]) cr.add(beam(new THREE.Vector3(Math.cos(a) * 0.38, 0.9, Math.sin(a) * 0.38), new THREE.Vector3(Math.cos(a) * 0.3, 1.35, Math.sin(a) * 0.3), 0.04, KM.steel()));
    cr.position.set(22.8, 0, 23.4);
    root.add(shade(cr));
    addSolid(22.3, 22.9, 23.3, 23.9);
    pool.add({ pos: new THREE.Vector3(22.8, 1.3, 24.0), color: new THREE.Color('#7fd4ff'), intensity: 1.6, dist: 3 });
    things.push({ x: 22.8, z: 24.1, height: 1.6, label: 'Drone cradle', action: 'hovergift' });
    // a hand-painted sign at the dock
    const sign = data.signs?.[0];
    if (sign) {
      const sg = new THREE.Group();
      for (const dx of [-0.5, 0.5]) sg.add(box(0.07, 1.2, 0.07, KM.wood(), dx, 0, 0));
      const face = new THREE.MeshStandardMaterial({ map: textTexture('THE CISTERN', { w: 72, h: 18, bg: '#2e4a48', fg: '#e8eadc', font: 'bold 11px monospace', worn: 0.2, seed: 21 }), roughness: 1 });
      const b = new THREE.Mesh(boxGeo(1.3, 0.4, 0.05), [KM.wood(), KM.wood(), KM.wood(), KM.wood(), face, KM.wood()]);
      b.position.set(0, 1.0, 0.04);
      sg.add(shade(b));
      sg.position.set(21.4, 0, 25.4);
      root.add(sg);
      addSolid(20.8, 25.3, 22.0, 25.5);
      things.push({ x: 21.4, z: 25.6, height: 1.4, label: 'Read', say: { name: 'Sign', lines: [sign.text] } });
    }
    for (const x of [2.5, 37.5]) wallLamp(mount(22), pool, x, 22.0, 2.0);
    pendant(root, pool, 20.5, 23.8, true);
    crate(root, 25.5, 25.4, 0.6);
    crate(root, 26.2, 25.6, 0.5, 0, 0.4);
    addSolid(25.1, 25.0, 26.6, 26.0);
    // across the flood, the colony's lamps: strings of bulbs over the water
  }

  // lily-pad scum and floating junk on the basin
  for (let i = 0; i < 40; i++) {
    const [x, z] = waterCells[Math.floor(r() * waterCells.length)]!;
    const pad = new THREE.Mesh(new THREE.CircleGeometry(0.1 + r() * 0.16, 7), colMat(r() < 0.7 ? '#4f7a2c' : '#6a9a3a', { roughness: 0.9 }));
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(x + r(), 0.075, z + r());
    root.add(pad);
  }

  const grass = buildGrass(scene);
  const dust = (() => {
    const N = 140, g = new THREE.BufferGeometry(), pos = new Float32Array(N * 3), base = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { base[i * 3] = (r() - 0.5) * 24; base[i * 3 + 1] = 0.3 + r() * 2.2; base[i * 3 + 2] = (r() - 0.5) * 16; }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: '#c8ffe8', size: 0.045, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    pts.frustumCulled = false;
    scene.add(pts);
    return (t: number, f: THREE.Vector3): void => {
      for (let i = 0; i < N; i++) {
        let x = base[i * 3]! + Math.sin(t * 0.13 + i) * 0.4, z = base[i * 3 + 2]! + Math.cos(t * 0.11 + i * 1.7) * 0.4;
        x = ((((x - f.x) % 24) + 36) % 24) - 12 + f.x;
        z = ((((z - f.z) % 16) + 24) % 16) - 8 + f.z;
        pos[i * 3] = x; pos[i * 3 + 1] = base[i * 3 + 1]! + Math.sin(t * 0.4 + i) * 0.15; pos[i * 3 + 2] = z;
      }
      g.attributes.position!.needsUpdate = true;
    };
  })();

  const blocked = (x: number, z: number, rad: number, _fx: number, _fz: number, hover?: boolean): boolean => {
    if (x - rad < 0.1 || x + rad > COLS - 0.1) return true;
    if (z < -0.3 || z > ROWS + 0.3) return true;
    for (const [dx, dz] of [[-rad, -rad], [rad, -rad], [-rad, rad], [rad, rad], [0, 0]] as Array<[number, number]>) {
      const c = get(Math.floor(x + dx), Math.floor(z + dz));
      if (c === '#') return true;
      if (c === '~' && !hover) return true;
    }
    return hitsSolid(x, z, rad);
  };

  return {
    id: 'cistern',
    title: 'THE CISTERN',
    sub: 'Colony 2 · the flooded waterworks',
    mood: CISTERN,
    sky: false,
    cam: { x0: 9.5, x1: COLS - 9.5, z0: 6.5, z1: ROWS - 5.5 },
    blocked,
    water: (x, z) => isWater(Math.floor(x), Math.floor(z)),
    ground: () => 0,
    wild: (x, z) => get(Math.floor(x), Math.floor(z)) === 'r',
    zone: 'cistern-reeds',
    spawns: {
      start: { x: 20.5, z: 25.4, face: 'N' },
      south: { x: 20.5, z: 26.4, face: 'N' },
      north: { x: 20.5, z: 1.2, face: 'S' },
    },
    triggers: [
      { x0: 18.6, z0: 27.0, x1: 22.4, z1: 30, go: { to: 'scar', spawn: 'north' } },
      { x0: 18.6, z0: -2, x1: 22.4, z1: 0.4, say: { lines: ['The colony Warden holds this gate — best them first.'] } },
    ],
    things,
    npcs: castOf(data),
    update(t, focus, camT) {
      let dirty = false;
      for (let z = 0; z < ROWS; z++) {
        const target = z + 0.5 > focus.z + 0.7 ? LOW : TALL;
        const h = rowH.get(z)!;
        if (Math.abs(h - target) > 0.002) { rowH.set(z, h + (target - h) * 0.14); dirty = true; }
      }
      if (dirty) writeWalls();
      for (const m of mounts) m.obj.visible = rowH.get(m.row)! > TALL * 0.8;
      pool.update(t, camT);
      water(t);
      grass(t);
      for (const f of flywheels) f.rotation.x = t * 2.2;
      lit.forEach((m, i) => { m.visible = Math.sin(t * (0.6 + (i % 4) * 0.3) + i) > -0.8; });
      dust(t, focus);
    },
  };
};

