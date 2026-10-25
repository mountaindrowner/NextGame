import * as THREE from 'three';
import { setWorld, hitsSolid, addSolid } from '../world';
import { UNDER } from '../mood';
import { OhmFollower } from '../sprites';
import { textTexture } from '../textures';
import { fbm, vnoise } from '../noise';
import { castOf, loadMap, type AreaBuilder, type Thing } from '../area';
import { cylGeo, boxGeo, colMat, shade } from '../geo';
import {
  KM, LightPool, wallMaterials, paintFloor, wallLamp, stringLights, growBed, crate, drum, shelf, table, benchSeat,
  locker, console_, wallPlate, pendant, pipes, creeper, crystals, glow, box, cyl, beam, rng, kitHex, kitMix, type RGB,
} from './kit';

/**
 * Ohmstead — the home colony, a metal bomb shelter under the dead cattle
 * town. Layout 1:1 from public/world/ohmstead.json (54×42): ten rooms in
 * three bands, joined by concourses and short connectors. Floors are big
 * riveted plates; walls are thick steel. Walls south of the player drop to
 * a low cut so the room you stand in is never hidden — the HD-2D cutaway.
 */

const TALL = 2.7, LOW = 0.7;

interface Room { key: string; x0: number; x1: number; z0: number; z1: number }
/** Floor bounds (world units; x1/z1 exclusive) from the collision grid. */
const ROOMS: Record<string, Room> = {
  garage: { key: 'garage', x0: 7, x1: 19, z0: 7, z1: 16 },
  bunks: { key: 'bunks', x0: 20, x1: 31, z0: 7, z1: 15 },
  infirmary: { key: 'infirmary', x0: 32, x1: 41, z0: 7, z1: 15 },
  command: { key: 'command', x0: 42, x1: 49, z0: 7, z1: 16 },
  mess: { key: 'mess', x0: 7, x1: 19, z0: 18, z1: 26 },
  commons: { key: 'commons', x0: 21, x1: 34, z0: 16, z1: 27 },
  comms: { key: 'comms', x0: 36, x1: 49, z0: 17, z1: 26 },
  works: { key: 'works', x0: 7, x1: 20, z0: 28, z1: 36 },
  stores: { key: 'stores', x0: 22, x1: 33, z0: 28, z1: 36 },
  yard: { key: 'yard', x0: 35, x1: 49, z0: 28, z1: 36 },
};

export const buildOhmstead: AreaBuilder = async (scene) => {
  const data = (await loadMap('ohmstead')) as Awaited<ReturnType<typeof loadMap>> & { cols: number; rows: number; collision: number[] };
  const COLS = data.cols, ROWS = data.rows;

  // ---------------------------------------------------- floor vs. structure
  // Big connected runs of blocked cells are structure (walls); the small
  // clusters inside rooms (≤ 6 cells) were old baked props — now floor.
  const blockedCell = (x: number, z: number): boolean => x < 0 || z < 0 || x >= COLS || z >= ROWS || data.collision[z * COLS + x] === 1;
  const wall = new Uint8Array(COLS * ROWS);
  const seen = new Uint8Array(COLS * ROWS);
  for (let z0 = 0; z0 < ROWS; z0++)
    for (let x0 = 0; x0 < COLS; x0++) {
      if (seen[z0 * COLS + x0] || !blockedCell(x0, z0)) continue;
      const comp: number[] = [];
      const stack: Array<[number, number]> = [[x0, z0]];
      while (stack.length) {
        const [x, z] = stack.pop()!;
        if (x < 0 || z < 0 || x >= COLS || z >= ROWS || seen[z * COLS + x] || !blockedCell(x, z)) continue;
        seen[z * COLS + x] = 1;
        comp.push(z * COLS + x);
        stack.push([x + 1, z], [x - 1, z], [x, z + 1], [x, z - 1]);
      }
      if (comp.length > 6) for (const i of comp) wall[i] = 1;
    }
  const isWall = (x: number, z: number): boolean => x < 0 || z < 0 || x >= COLS || z >= ROWS || wall[z * COLS + x] === 1;
  const isFloor = (x: number, z: number): boolean => !isWall(x, z);

  setWorld({ cols: COLS, rows: ROWS, cell: (x, z) => (isFloor(x, z) ? '.' : '#'), height: () => 0 });

  const root = new THREE.Group();
  scene.add(root);
  const pool = new LightPool(scene, 12);
  scene.background = new THREE.Color('#040506');

  // ------------------------------------------------------------- the floor
  const doorway = (x: number, z: number): boolean =>
    (isWall(x - 1, z) && isWall(x + 2, z) && isFloor(x + 1, z)) || (isWall(x - 2, z) && isWall(x + 1, z) && isFloor(x - 1, z)) ||
    (isWall(x, z - 1) && isWall(x, z + 2) && isFloor(x, z + 1)) || (isWall(x, z - 2) && isWall(x, z + 1) && isFloor(x, z - 1));
  const H = kitHex;
  const floorTex = paintFloor(COLS, ROWS, isFloor, (x, z, c): RGB => {
    const cx = Math.floor(x), cz = Math.floor(z);
    // hazard chevrons across every threshold
    if (doorway(cx, cz) && isWall(cx - 1, cz) !== isWall(cx, cz - 1)) {
      const s = Math.floor((x + z) * 4) % 2 === 0;
      return kitMix(c, s ? H('#c99a2a') : H('#1d1b17'), 0.75);
    }
    const inR = (k: string): boolean => { const q = ROOMS[k]!; return x >= q.x0 && x < q.x1 && z >= q.z0 && z < q.z1; };
    const n = fbm(x * 0.5, z * 0.5, 71, 3), fine = vnoise(x * 16, z * 16, 72);
    // the Yard is the raw dig: packed dirt and gravel, rock showing through
    if (inR('yard')) {
      let d = kitMix(H('#4a3f33'), H('#6e604e'), n);
      if (fine > 0.8) d = kitMix(d, H('#8a7a66'), 0.6);
      if (fbm(x * 0.9, z * 0.9, 73, 2) > 0.66) d = kitMix(d, H('#3a3430'), 0.6);
      return d;
    }
    // the Mess: worn checker linoleum
    if (inR('mess')) {
      const chk = (Math.floor(x * 2) + Math.floor(z * 2)) % 2 === 0;
      let d = chk ? H('#b8ad92') : H('#4f6a68');
      d = kitMix(d, H('#2a2620'), Math.max(0, n - 0.45) * 0.8);
      if ((x * 2) % 1 < 0.07 || (z * 2) % 1 < 0.07) d = kitMix(d, H('#1e1c18'), 0.5);
      return d;
    }
    // the Commons: concrete pavers, moss in every joint
    if (inR('commons')) {
      const u = x % 1.5, v = z % 1.5;
      let d = kitMix(H('#8e8a80'), H('#a8a296'), vnoise(Math.floor(x / 1.5) * 3.1, Math.floor(z / 1.5) * 2.7, 74));
      d = kitMix(d, H('#5e5a52'), Math.max(0, n - 0.5) * 0.9);
      if (u < 0.07 || v < 0.07) d = fbm(x * 0.4, z * 0.4, 75, 2) > 0.45 ? (fine > 0.5 ? H('#4f7a2c') : H('#6a9a36')) : H('#4a4740');
      return d;
    }
    // the Bunks: plank decking laid over the plates
    if (inR('bunks')) {
      const plank = Math.floor(z * 4);
      let d = kitMix(H('#6b4f36'), H('#86654a'), vnoise(plank * 3.3, Math.floor(x / 2.5 + plank * 0.37), 76));
      if ((z * 4) % 1 < 0.12) d = H('#33241a');
      if (fine > 0.92) d = kitMix(d, H('#2a1d14'), 0.5);
      return kitMix(d, H('#2a2620'), Math.max(0, n - 0.5) * 0.7);
    }
    // the concourses are worn bright by boots
    if ([10, 11, 21, 22, 32, 33].includes(cz)) return kitMix(c, H('#7c868c'), 0.12);
    return c;
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(COLS, ROWS), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.75, metalness: 0.25 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(COLS / 2, 0, ROWS / 2);
  floor.receiveShadow = true;
  root.add(floor);

  // ------------------------------------------------------------- the walls
  // Every structural cell touching floor gets a wall block. Its row decides
  // its height each frame: rows south of the player drop to LOW.
  type W = { x: number; z: number; front: boolean; rock: boolean };
  const walls: W[] = [];
  for (let z = 0; z < ROWS; z++)
    for (let x = 0; x < COLS; x++) {
      if (!isWall(x, z)) continue;
      let near = false;
      for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) if (isFloor(x + dx, z + dz)) near = true;
      if (!near) continue;
      // a wall whose floor lies only to the north is a room's front wall: always cut low
      const front = isFloor(x, z - 1) && !isFloor(x, z + 1) || (!isFloor(x, z + 1) && !isFloor(x - 1, z) && !isFloor(x + 1, z) && (isFloor(x - 1, z - 1) || isFloor(x + 1, z - 1)));
      const rock = z === 27 && x >= 34 && x <= 49; // the Yard's dig face
      walls.push({ x, z, front, rock });
    }
  const mk = (list: W[], mats: THREE.Material[]): THREE.InstancedMesh => {
    const g = new THREE.BoxGeometry(1.02, 1, 1.02);
    g.translate(0, 0.5, 0);
    const im = new THREE.InstancedMesh(g, mats, list.length);
    im.castShadow = im.receiveShadow = true;
    root.add(im);
    return im;
  };
  const steelWalls = walls.filter((w) => !w.rock), rockWalls = walls.filter((w) => w.rock);
  const imSteel = mk(steelWalls, wallMaterials(false));
  const imRock = mk(rockWalls, wallMaterials(true));
  const rowH = new Map<number, number>();
  for (let z = 0; z < ROWS; z++) rowH.set(z, TALL);
  const m4 = new THREE.Matrix4();
  const writeWalls = (): void => {
    for (const [im, list] of [[imSteel, steelWalls], [imRock, rockWalls]] as Array<[THREE.InstancedMesh, W[]]>) {
      list.forEach((w, i) => {
        const h = w.front ? LOW : rowH.get(w.z)!;
        m4.makeScale(1, h, 1).setPosition(w.x + 0.5, 0, w.z + 0.5);
        im.setMatrixAt(i, m4);
      });
      im.instanceMatrix.needsUpdate = true;
      im.computeBoundingSphere();
    }
  };
  writeWalls();

  /** Wall-mounted decor rides with its wall row: hidden while the row is cut. */
  const mounts: Array<{ row: number; obj: THREE.Object3D }> = [];
  const mount = (row: number): THREE.Group => {
    const g = new THREE.Group();
    root.add(g);
    mounts.push({ row, obj: g });
    return g;
  };

  // ---------------------------------------------------------------- rooms
  const things: Thing[] = [];
  const signText = (prefix: string): string => data.signs?.find((s) => s.text.startsWith(prefix))?.text ?? prefix;
  const plate = (room: Room, x: number, name: string, prefix: string, w = 2.6): void => {
    wallPlate(mount(room.z0 - 1), x, 2.45, room.z0, name, w);
    things.push({ x, z: room.z0 + 0.3, height: 2.7, label: 'Read', reach: 3.0, say: { name: 'Sign', lines: [signText(prefix)] } });
  };
  const backLamps = (room: Room, xs: number[], warm = true): void => {
    const g = mount(room.z0 - 1);
    for (const x of xs) wallLamp(g, pool, x, room.z0, 2.05, warm);
  };
  const r = rng(1234);
  const lit: THREE.Mesh[] = [];

  // GARAGE — Eli's Bench, Banjo, Eli's photo + logbook
  {
    const R = ROOMS.garage!;
    plate(R, 12.6, "ELI'S GARAGE", "ELI'S GARAGE", 2.6);
    backLamps(R, [9.5, 16.3]);
    // the Bench: heavy steel-legged workbench, vice, parts, a cradled glowing core
    root.add(box(3.0, 0.08, 0.9, KM.deck(), 9.5, 0.86, 7.5));
    for (const sx of [8.1, 10.9]) for (const sz of [7.15, 7.85]) root.add(box(0.08, 0.86, 0.08, KM.steel(), sx, 0, sz));
    root.add(box(2.8, 0.05, 0.75, KM.steel(), 9.5, 0.3, 7.5));
    root.add(box(0.25, 0.22, 0.3, KM.paintBlue(), 8.35, 0.94, 7.75));
    for (let i = 0; i < 9; i++) {
      const s = 0.06 + r() * 0.1;
      root.add(box(s, s * 0.6, s, r() < 0.5 ? KM.steel() : KM.rust(), 8.7 + r() * 2.0, 0.94, 7.25 + r() * 0.5));
    }
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.13, 0), glow('#7fd4ff', 4));
    core.position.set(9.9, 1.18, 7.45);
    root.add(core);
    root.add(cyl(0.16, 0.2, 0.12, KM.steel(), 9.9, 0.94, 7.45, 8));
    pool.add({ pos: new THREE.Vector3(9.9, 1.4, 7.9), color: new THREE.Color('#7fd4ff'), intensity: 3.5, dist: 3.5 });
    // articulated work lamp
    root.add(beam(new THREE.Vector3(10.7, 0.94, 7.3), new THREE.Vector3(10.5, 1.7, 7.4), 0.04, KM.steel()));
    root.add(beam(new THREE.Vector3(10.5, 1.7, 7.4), new THREE.Vector3(10.1, 1.55, 7.6), 0.04, KM.steel()));
    const shadeM = new THREE.Mesh(cylGeo(0.04, 0.12, 0.14, 8, true), KM.paintGreen());
    shadeM.position.set(10.05, 1.48, 7.62);
    root.add(shadeM);
    // pegboard of tools on the wall above
    const peg = mount(R.z0 - 1);
    peg.add(box(2.6, 1.0, 0.04, KM.wood(), 9.5, 1.15, 7.03));
    for (let i = 0; i < 11; i++) {
      const tx = 8.4 + i * 0.22, th = 0.2 + r() * 0.35;
      peg.add(box(0.05, th, 0.03, r() < 0.5 ? KM.steel() : KM.paintRed(), tx, 1.95 - th, 7.07));
    }
    things.push({ x: 9.5, z: 8.3, height: 1.6, label: 'The Bench', say: { lines: ["Grandpa's Bench. Your partner was built here."] } });
    // Eli's corner: a small desk, his photo, the logbook, a candle someone keeps lit
    root.add(box(1.8, 0.75, 0.7, KM.wood(), 16.3, 0, 7.4));
    const frame = box(0.42, 0.52, 0.05, KM.wood(), 16.0, 0.75, 7.2);
    frame.rotation.x = -0.15;
    root.add(frame);
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.42), new THREE.MeshStandardMaterial({ map: textTexture('ELI', { w: 16, h: 20, bg: '#8a7656', fg: '#3a2e20', font: 'bold 7px monospace', worn: 0.2 }), roughness: 1 }));
    photo.position.set(16.0, 1.02, 7.24);
    photo.rotation.x = -0.15;
    root.add(photo);
    root.add(box(0.36, 0.07, 0.48, colMat('#5a3424', { roughness: 0.8 }), 16.6, 0.75, 7.45));
    root.add(cyl(0.035, 0.035, 0.14, colMat('#e8e0cc'), 16.95, 0.75, 7.35, 6));
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.07, 5), glow('#ffb347', 6));
    flame.position.set(16.95, 0.94, 7.35);
    root.add(flame);
    pool.add({ pos: new THREE.Vector3(16.95, 1.1, 7.6), color: new THREE.Color('#ffa040'), intensity: 2.5, dist: 3, flicker: 0.25 });
    addSolid(7.95, 7.0, 11.05, 8.0);
    addSolid(15.4, 7.0, 17.2, 7.8);
    things.push({ x: 16.3, z: 8.1, height: 1.4, label: "Eli's photo", say: { lines: ["Grandpa Eli's photo, and his worn logbook, Ohm's Law. Five years gone, and the bench still smells of solder and him. The last entry just... stops mid-line."] } });
    // the rest of a working garage
    root.add(box(0.7, 1.0, 0.5, KM.paintRed(), 18.2, 0, 7.4)); // rolling tool chest
    for (let i = 0; i < 4; i++) root.add(box(0.62, 0.02, 0.02, KM.dark(), 18.2, 0.25 + i * 0.22, 7.66));
    addSolid(17.8, 7.0, 18.6, 7.7);
    for (let i = 0; i < 4; i++) {
      const tire = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.11, 6, 12), colMat('#1a1918', { roughness: 1 }));
      tire.rotation.x = Math.PI / 2;
      tire.position.set(7.6, 0.11 + i * 0.22, 14.9);
      root.add(shade(tire));
    }
    addSolid(7.2, 14.5, 8.0, 15.3);
    drum(root, 8.6, 15.2);
    drum(root, 9.2, 15.4, KM.paintBlue());
    addSolid(8.3, 14.9, 9.5, 15.7);
    // engine hoist with a block hanging off it
    root.add(beam(new THREE.Vector3(16.0, 0, 13.0), new THREE.Vector3(16.0, 2.0, 13.0), 0.1, KM.paintRed()));
    root.add(beam(new THREE.Vector3(16.0, 2.0, 13.0), new THREE.Vector3(17.4, 1.6, 13.0), 0.08, KM.paintRed()));
    root.add(beam(new THREE.Vector3(15.6, 0.05, 13.0), new THREE.Vector3(17.6, 0.05, 13.0), 0.1, KM.paintRed()));
    root.add(beam(new THREE.Vector3(17.4, 1.6, 13.0), new THREE.Vector3(17.4, 1.05, 13.0), 0.02, KM.steel()));
    root.add(box(0.6, 0.45, 0.45, KM.rust(), 17.4, 0.6, 13.0));
    addSolid(15.6, 12.7, 17.8, 13.3);
    // welding bottles chained to the east wall
    for (const z of [9.0, 9.35]) root.add(cyl(0.12, 0.12, 1.2, z < 9.2 ? KM.paintGreen() : KM.paintRed(), 18.65, 0, z, 10));
    addSolid(18.4, 8.8, 18.95, 9.6);
    crate(root, 7.6, 12.6, 0.6);
    crate(root, 7.6, 13.3, 0.5, 0, 0.3);
    crate(root, 7.6, 12.6, 0.42, 0.6, 0.5);
    addSolid(7.2, 12.2, 8.0, 13.6);
    creeper(mount(R.z0 - 1), 13.8, R.z0, 1.4, 2.2);
  }

  // BUNKS — four bunks along the back wall; yours is the one by the wall
  {
    const R = ROOMS.bunks!;
    plate(R, 25.5, 'THE BUNKS', 'THE BUNKS', 2.4);
    backLamps(R, [22.2, 28.8]);
    const blankets = ['#6a4a3a', '#44586a', '#5a6a3a', '#7a6a4a'];
    [20.7, 23.3, 25.9, 28.5].forEach((x, i) => {
      for (const sx of [-0.48, 0.48]) for (const sz of [7.1, 8.9]) root.add(box(0.06, 1.95, 0.06, KM.steel(), x + sx, 0, sz));
      for (const y of [0.42, 1.38]) {
        root.add(box(1.0, 0.08, 1.9, KM.steel(), x, y, 8.0));
        root.add(box(0.92, 0.12, 1.82, KM.cloth('#cfc6b0'), x, y + 0.08, 8.0));
        root.add(box(0.94, 0.06, 1.2, KM.cloth(blankets[(i + (y > 1 ? 1 : 0)) % 4]!), x, y + 0.2, 8.35));
        root.add(box(0.5, 0.1, 0.3, KM.cloth('#e8e0cc'), x, y + 0.2, 7.3));
      }
      root.add(box(0.8, 0.4, 0.45, KM.paintGreen(), x, 0, 9.3)); // footlocker
      addSolid(x - 0.55, 7.0, x + 0.55, 9.6);
    });
    // a curtain strung for privacy, posters, a card table
    const cur = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 1.8), KM.cloth('#7a5a4a'));
    cur.scale.x = 60;
    cur.rotation.y = Math.PI / 2;
    cur.position.set(29.7, 1.0, 8.0);
    root.add(cur);
    table(root, 27.6, 13.3, 1.2, 0.8);
    benchSeat(root, 27.6, 12.65, 1.1);
    benchSeat(root, 27.6, 13.95, 1.1);
    for (let i = 0; i < 6; i++) root.add(box(0.1, 0.01, 0.14, KM.cloth('#e8e0cc'), 27.2 + r() * 0.8, 0.79, 13.05 + r() * 0.5));
    locker(root, 20.4, 14.4, 3);
    things.push({ x: 20.7, z: 9.9, height: 1.8, label: 'Your bunk', say: { lines: ["Your bunk. No time to sleep yet — there's a supply run to finish."] } });
    creeper(mount(R.z0 - 1), 30.3, R.z0, 0.9, 1.6);
  }

  // INFIRMARY — cots, a glowing cabinet, the Ohm recharge pod
  {
    const R = ROOMS.infirmary!;
    plate(R, 36.5, 'INFIRMARY', 'THE INFIRMARY', 2.2);
    backLamps(R, [33.6, 39.4], false);
    for (const x of [33.2, 35.0]) {
      root.add(box(0.85, 0.08, 1.9, KM.steel(), x, 0.55, 8.0));
      root.add(box(0.8, 0.12, 1.85, KM.cloth('#e6e2d6'), x, 0.63, 8.0));
      for (const sx of [-0.38, 0.38]) for (const sz of [7.15, 8.85]) root.add(box(0.04, 0.55, 0.04, KM.steel(), x + sx, 0, sz));
      root.add(box(0.5, 0.1, 0.3, KM.cloth('#f0ece2'), x, 0.75, 7.3));
      addSolid(x - 0.45, 7.0, x + 0.45, 9.0);
    }
    // IV stand + curtain rail
    root.add(box(0.03, 1.8, 0.03, KM.steel(), 34.1, 0, 9.2));
    root.add(box(0.16, 0.24, 0.06, colMat('#cfe8f0', { transparent: true, opacity: 0.7 }), 34.1, 1.55, 9.2));
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.7), KM.cloth('#9fb8b0'));
    curtain.position.set(34.1, 1.1, 9.5);
    curtain.rotation.y = 0.0;
    root.add(curtain);
    // medicine cabinet with a lit cross
    root.add(box(1.2, 1.7, 0.4, colMat('#d8d4c8', { roughness: 0.6 }), 37.8, 0, 7.25));
    root.add(box(0.3, 0.08, 0.02, glow('#7dff9a', 3), 37.8, 1.35, 7.46));
    root.add(box(0.08, 0.3, 0.02, glow('#7dff9a', 3), 37.8, 1.24, 7.46));
    addSolid(37.2, 7.0, 38.4, 7.5);
    // the recharge pod: a glass capsule on a base, humming green
    root.add(cyl(0.55, 0.6, 0.3, KM.steel(), 39.6, 0, 9.0, 16));
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.3, 16, 1, true), new THREE.MeshStandardMaterial({ color: '#9fffd0', emissive: '#3dff9a', emissiveIntensity: 0.6, transparent: true, opacity: 0.32, roughness: 0.1, side: THREE.DoubleSide }));
    glass.position.set(39.6, 0.95, 9.0);
    root.add(glass);
    root.add(cyl(0.5, 0.5, 0.15, KM.steel(), 39.6, 1.6, 9.0, 16));
    root.add(box(0.7, 0.04, 0.7, glow('#7dffb0', 2.2), 39.6, 0.3, 9.0));
    pool.add({ pos: new THREE.Vector3(39.6, 1.0, 9.6), color: new THREE.Color('#5dffa8'), intensity: 4, dist: 4 });
    addSolid(39.0, 8.4, 40.2, 9.6);
    things.push({ x: 39.6, z: 9.7, height: 1.9, label: 'Recharge', say: { lines: ["Infirmary: you're all recharged — stay current."] } });
    locker(root, 33.0, 14.4, 2, KM.paintBlue());
    table(root, 38.8, 13.5, 1.0, 0.6, KM.steel());
  }

  // COMMAND — Boone's post: the Downtowns on the wall, a map table, radios
  {
    const R = ROOMS.command!;
    plate(R, 43.8, 'COMMAND', 'COMMAND', 2.0);
    backLamps(R, [47.6]);
    // wall map: a grid with pins strung between eight colonies
    const mapG = mount(R.z0 - 1);
    const mp = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.2), new THREE.MeshStandardMaterial({ map: mapTex(), roughness: 1 }));
    mp.position.set(46.2, 1.55, 7.03);
    mapG.add(mp);
    mapG.add(box(2.3, 1.3, 0.03, KM.wood(), 46.2, 0.9, 7.01));
    // map table in the middle, lit from above by its own lamp
    table(root, 45.6, 13.4, 2.2, 1.3, KM.steel(), 0.9);
    const chart = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.1), new THREE.MeshStandardMaterial({ map: mapTex(), roughness: 1 }));
    chart.rotation.x = -Math.PI / 2;
    chart.position.set(45.6, 0.91, 13.4);
    root.add(chart);
    for (let i = 0; i < 5; i++) root.add(cyl(0.03, 0.03, 0.12, KM.paintRed(), 44.8 + r() * 1.6, 0.91, 13.0 + r() * 0.8, 5));
    pool.add({ pos: new THREE.Vector3(45.6, 2.2, 13.4), color: new THREE.Color('#ffd08a'), intensity: 5, dist: 5 });
    root.add(box(0.05, 0.6, 0.05, KM.steel(), 45.6, 2.0, 13.4));
    root.add(box(0.35, 0.08, 0.35, glow('#ffd590', 3), 45.6, 1.95, 13.4));
    lit.push(...console_(root, pool, 43.4, 7.5, 1.6, ['#7fe0c8', '#ffd07a'], 7));
    locker(root, 48.3, 9.2, 1, KM.paintGreen());
    crate(root, 48.3, 14.8, 0.6);
    addSolid(47.9, 14.4, 48.7, 15.2);
  }

  // MESS — kitchen counter, stove, two long tables
  {
    const R = ROOMS.mess!;
    plate(R, 9.2, 'THE MESS', 'THE MESS', 2.0);
    backLamps(R, [12.6, 16.6]);
    root.add(box(5.2, 0.9, 0.7, KM.steel(), 13.5, 0, 18.4));
    root.add(box(5.2, 0.05, 0.75, colMat('#8a8e90', { metalness: 0.6, roughness: 0.35 }), 13.5, 0.9, 18.42));
    // stove + a stew pot steaming
    root.add(box(1.1, 0.9, 0.7, KM.dark(), 17.1, 0, 18.4));
    for (const dx of [-0.25, 0.25]) root.add(cyl(0.16, 0.16, 0.02, glow('#ff6a2a', 2.2), 17.1 + dx, 0.9, 18.4, 10));
    root.add(cyl(0.24, 0.22, 0.32, KM.steel(), 16.85, 0.92, 18.4, 12));
    pool.add({ pos: new THREE.Vector3(17.1, 1.2, 18.9), color: new THREE.Color('#ff8a40'), intensity: 3, dist: 3.5, flicker: 0.15 });
    for (let i = 0; i < 6; i++) root.add(cyl(0.09, 0.09, 0.2, colMat(['#8a6a3a', '#5a6a72', '#a8463a'][i % 3]!, { metalness: 0.4 }), 11.4 + i * 0.25, 0.95, 18.3, 8));
    addSolid(10.9, 18.0, 17.7, 18.8);
    shelf(root, 8.0, 18.3, 1.6, 21, 2.0, 0.45);
    // long tables
    for (const [x0, x1] of [[7.9, 12.0], [14.0, 18.2]] as Array<[number, number]>) {
      const cx = (x0 + x1) / 2, w = x1 - x0;
      table(root, cx, 24.3, w, 0.8);
      benchSeat(root, cx, 23.6, w - 0.2);
      benchSeat(root, cx, 25.0, w - 0.2);
      for (let i = 0; i < 5; i++) {
        root.add(cyl(0.12, 0.1, 0.06, colMat('#c8c2b0'), x0 + 0.4 + r() * (w - 0.8), 0.78, 24.1 + r() * 0.4, 8));
        if (r() < 0.6) root.add(cyl(0.04, 0.04, 0.11, KM.steel(), x0 + 0.4 + r() * (w - 0.8), 0.78, 24.1 + r() * 0.4, 6));
      }
    }
    stringLights(root, pool, new THREE.Vector3(7.5, 2.4, 22.5), new THREE.Vector3(18.5, 2.4, 22.5), 12);
    drum(root, 18.4, 19.4, KM.paintGreen());
    addSolid(18.1, 19.1, 18.7, 19.7);
  }

  // COMMONS — the heart of the colony: the Lantern, grow beds, the lift
  let lantern: THREE.Mesh | null = null;
  {
    const R = ROOMS.commons!;
    plate(R, 23.6, 'OHMSTEAD COMMONS', 'OHMSTEAD COMMONS', 3.4);
    backLamps(R, [21.4, 33.1]);
    // the Lantern: a big Resonance crystal on a plinth, ringed by benches
    root.add(cyl(1.0, 1.15, 0.5, KM.concrete(), 27.0, 0, 19.6, 20));
    root.add(cyl(0.7, 0.8, 0.25, KM.steel(), 27.0, 0.5, 19.6, 16));
    lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), new THREE.MeshStandardMaterial({ color: '#9fe8ff', emissive: '#4fc8ff', emissiveIntensity: 1.9, roughness: 0.15, transparent: true, opacity: 0.92 }));
    lantern.scale.set(0.8, 1.6, 0.8);
    lantern.position.set(27.0, 1.6, 19.6);
    root.add(lantern);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.4;
      const c = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), lantern.material);
      c.scale.set(0.7, 1.5, 0.7);
      c.position.set(27.0 + Math.cos(a) * 0.55, 0.95, 19.6 + Math.sin(a) * 0.55);
      c.rotation.z = Math.cos(a) * 0.4;
      root.add(c);
    }
    pool.add({ pos: new THREE.Vector3(27.0, 2.0, 20.3), color: new THREE.Color('#6fd0ff'), intensity: 9, dist: 8 });
    addSolid(25.9, 18.5, 28.1, 20.7);
    for (const [x, z] of [[24.6, 19.6], [29.4, 19.6]] as Array<[number, number]>) {
      const b = new THREE.Group();
      b.position.set(x, 0, z);
      benchSeat(b, 0, 0, 1.2, false);
      b.rotation.y = Math.PI / 2;
      root.add(b);
      addSolid(x - 0.2, z - 0.6, x + 0.2, z + 0.6);
    }
    // grow beds: the colony's gardens, lush under magenta light
    growBed(root, pool, 21.5, 24.0, 24.6, 25.8, 11);
    growBed(root, pool, 29.6, 24.0, 33.4, 25.8, 12);
    growBed(root, pool, 21.4, 16.4, 23.2, 17.6, 13);
    // the freight lift up to the Field, set into the back wall
    const L = new THREE.Group();
    L.position.set(30.9, 0, 16.0);
    L.add(box(2.6, 0.1, 1.6, KM.steel(), 0, 0, 0.8));
    for (const [x, z, w, d] of [[0, 1.6, 2.6, 0.12], [-1.25, 0.8, 0.12, 1.6], [1.25, 0.8, 0.12, 1.6]] as Array<[number, number, number, number]>)
      L.add(box(w, 0.03, d, KM.hazard(), x, 0.1, z));
    for (const x of [-1.2, 1.2]) L.add(box(0.16, 2.7, 0.2, KM.hazard(), x, 0, 0.1));
    L.add(box(2.56, 0.2, 0.22, KM.hazard(), 0, 2.5, 0.1));
    L.add(box(2.2, 2.4, 0.04, KM.dark(), 0, 0.1, 0.02));
    // the cage itself, door rolled up
    for (const x of [-1.0, 1.0]) for (const z of [0.25, 1.45]) L.add(box(0.06, 2.3, 0.06, KM.steel(), x, 0.1, z));
    L.add(box(2.06, 0.08, 1.26, KM.steel(), 0, 2.38, 0.85));
    for (let y = 0.4; y < 2.3; y += 0.35) for (const x of [-1.0, 1.0]) L.add(box(0.03, 0.03, 1.2, KM.steel(), x, y, 0.85));
    L.add(box(2.0, 0.3, 0.05, KM.steel(), 0, 2.1, 1.48)); // rolled door
    // cables vanishing up into the dark
    for (const x of [-0.4, 0.4]) L.add(box(0.03, 3.0, 0.03, colMat('#1a1a1a'), x, 2.46, 0.85));
    // call panel: amber light means it's waiting at the bottom
    L.add(box(0.26, 0.4, 0.1, KM.steel(), 1.5, 1.1, 0.2));
    const call = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), glow('#ffb347', 4));
    call.position.set(1.5, 1.42, 0.27);
    L.add(call);
    lit.push(call);
    shade(L);
    root.add(L);
    pool.add({ pos: new THREE.Vector3(30.9, 2.2, 17.3), color: new THREE.Color('#ffc070'), intensity: 5, dist: 5 });
    addSolid(29.6, 16.0, 29.9, 17.6);
    addSolid(31.9, 16.0, 32.6, 17.6);
    things.push({ x: 30.9, z: 17.0, height: 2.7, label: 'Ride up', reach: 1.7, say: { lines: ['The cage rattles shut. Up to the Field.'] }, go: { to: 'field', spawn: 'lift' } });
    // notice board by the west door
    const nb = mount(R.z0 - 1);
    nb.add(box(1.1, 0.8, 0.04, KM.wood(), 28.65, 1.1, 16.04));
    for (let i = 0; i < 6; i++) nb.add(box(0.22, 0.28, 0.01, KM.cloth(['#e8e0cc', '#d8c890', '#c8d8e0'][i % 3]!), 28.3 + (i % 3) * 0.33, 1.2 + Math.floor(i / 3) * 0.32, 16.08));
  }

  // COMMS & ARCHIVE — tape shelves, the radio rig, the antenna feed
  {
    const R = ROOMS.comms!;
    plate(R, 38.6, 'COMMS & ARCHIVE', 'COMMS & ARCHIVE', 3.0);
    backLamps(R, [41.9, 47.6], false);
    for (const x of [37.1, 38.9, 40.7]) shelf(root, x, 17.3, 1.6, Math.round(x * 10), 2.2, 0.5);
    lit.push(...console_(root, pool, 44.6, 17.5, 2.6, ['#7fe0c8', '#7fe0c8', '#ffd07a'], 21));
    // reel-to-reel and a big receiver stack
    root.add(box(0.9, 1.6, 0.5, KM.steel(), 47.6, 0, 17.4));
    for (const y of [1.1, 1.38]) for (const x of [47.4, 47.8]) {
      const reel = new THREE.Mesh(cylGeo(0.14, 0.14, 0.04, 12), KM.dark());
      reel.rotation.x = Math.PI / 2;
      reel.position.set(x, y, 17.67);
      root.add(reel);
    }
    addSolid(47.1, 17.1, 48.1, 17.7);
    // the antenna feed: a fat cable conduit climbing into the rock
    const feed = mount(R.z0 - 1);
    feed.add(box(0.22, 2.6, 0.22, KM.rust(), 43.0, 0, 17.12));
    feed.add(box(0.3, 0.3, 0.3, KM.steel(), 43.0, 1.2, 17.15));
    // filing cabinets, a reading table, stacks of paper
    for (const x of [37.0, 37.7]) { root.add(box(0.6, 1.3, 0.6, colMat('#6a6a5a', { metalness: 0.3 }), x, 0, 24.8)); }
    addSolid(36.6, 24.4, 38.1, 25.2);
    table(root, 41.0, 23.8, 1.6, 0.9);
    benchSeat(root, 41.0, 24.6, 1.4);
    for (let i = 0; i < 4; i++) root.add(box(0.35, 0.05 + i * 0.03, 0.25, KM.cloth('#e0d8c0'), 40.5 + i * 0.3, 0.78, 23.7));
    crate(root, 48.2, 25.0, 0.6);
    addSolid(47.8, 24.6, 48.6, 25.4);
  }

  // THE WORKS — tanks, pumps, the generator: water, power, air
  const flywheels: THREE.Object3D[] = [];
  let fan: THREE.Object3D | null = null;
  {
    const R = ROOMS.works!;
    plate(R, 13.6, 'THE WORKS', 'THE WORKS', 2.0);
    backLamps(R, [10.6, 16.6]);
    pipes(mount(R.z0 - 1), 7.0, 20.0, R.z0, [1.6, 1.9, 2.2], 31);
    for (const x of [8.2, 10.1]) {
      root.add(cyl(0.85, 0.85, 2.4, KM.rust(), x, 0, 29.0, 18));
      const top = new THREE.Mesh(new THREE.SphereGeometry(0.86, 16, 6, 0, Math.PI * 2, 0, Math.PI / 2), KM.rust());
      top.scale.y = 0.35;
      top.position.set(x, 2.4, 29.0);
      root.add(shade(top));
      root.add(box(0.5, 0.25, 0.04, KM.hazard(), x, 1.3, 29.86));
      addSolid(x - 0.85, 28.15, x + 0.85, 29.85);
    }
    // pumps with turning flywheels
    for (const x of [13.2, 15.4]) {
      root.add(box(1.0, 0.8, 0.8, KM.paintGreen(), x, 0, 29.0));
      root.add(cyl(0.18, 0.18, 0.6, KM.steel(), x, 0.8, 29.0, 10));
      const fw = new THREE.Group();
      fw.position.set(x + 0.62, 0.62, 29.0);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 6, 16), KM.steel());
      rim.rotation.y = Math.PI / 2;
      fw.add(shade(rim));
      for (let k = 0; k < 4; k++) {
        const sp = new THREE.Mesh(boxGeo(0.04, 0.8, 0.05), KM.steel());
        sp.rotation.x = (k / 4) * Math.PI;
        fw.add(sp);
      }
      root.add(fw);
      flywheels.push(fw);
      addSolid(x - 0.5, 28.6, x + 1.1, 29.4);
    }
    // the generator: hot, loud, glowing through its grille
    root.add(box(2.2, 1.3, 1.2, KM.paintGreen(), 17.9, 0, 29.1));
    root.add(box(1.4, 0.5, 0.02, glow('#ff7a30', 2.4), 17.9, 0.4, 29.71));
    for (let k = 0; k < 6; k++) root.add(box(1.4, 0.03, 0.03, KM.dark(), 17.9, 0.45 + k * 0.08, 29.73));
    root.add(cyl(0.12, 0.12, 1.3, KM.rust(), 18.7, 1.3, 28.8, 8));
    pool.add({ pos: new THREE.Vector3(17.9, 0.8, 30.3), color: new THREE.Color('#ff8a40'), intensity: 4, dist: 4, flicker: 0.1 });
    addSolid(16.8, 28.5, 19.0, 29.7);
    // a big intake fan set in the floor grate
    root.add(cyl(0.95, 0.95, 0.06, KM.steel(), 9.0, 0, 33.9, 18));
    const f = new THREE.Group();
    f.position.set(9.0, 0.08, 33.9);
    for (let k = 0; k < 5; k++) {
      const b = new THREE.Mesh(boxGeo(0.22, 0.03, 0.85), KM.steel());
      b.position.set(0, 0, 0.42);
      const piv = new THREE.Group();
      piv.rotation.y = (k / 5) * Math.PI * 2;
      b.rotation.z = 0.35;
      piv.add(b);
      f.add(piv);
    }
    root.add(f);
    fan = f;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.06, 4, 20), KM.hazard());
    ring.rotation.x = Math.PI / 2;
    ring.position.set(9.0, 0.08, 33.9);
    root.add(ring);
    addSolid(8.0, 32.9, 10.0, 34.9);
    // valve manifold + a bench of tools
    table(root, 16.6, 34.9, 1.8, 0.7, KM.steel());
    drum(root, 19.2, 34.8, KM.rust());
    drum(root, 19.2, 34.1, KM.rust(), true);
    addSolid(18.9, 33.7, 19.6, 35.2);
    creeper(mount(R.z0 - 1), 12.0, R.z0, 1.0, 1.4);
  }

  // STORES — shelves to the ceiling, the Rationer's cage counter
  {
    const R = ROOMS.stores!;
    plate(R, 24.4, 'STORES', 'STORES', 1.8);
    backLamps(R, [22.6, 32.5]);
    for (const x of [26.4, 28.4, 30.4]) shelf(root, x, 28.35, 1.8, Math.round(x * 13), 2.3, 0.6);
    for (const x of [23.0, 25.0]) shelf(root, x, 30.8, 1.6, Math.round(x * 17), 1.8, 0.55);
    // the counter, with a wire cage and a hatch window
    root.add(box(3.2, 1.0, 0.6, KM.steel(), 27.5, 0, 32.45));
    root.add(box(3.2, 0.05, 0.65, KM.deck(), 27.5, 1.0, 32.45));
    for (const x of [26.0, 29.0]) root.add(box(0.06, 1.3, 0.06, KM.steel(), x, 1.05, 32.2));
    root.add(box(3.1, 0.06, 0.06, KM.steel(), 27.5, 2.3, 32.2));
    for (let x = 26.2; x < 29.0; x += 0.2) if (x < 27.1 || x > 27.9) root.add(box(0.015, 1.25, 0.015, KM.steel(), x, 1.05, 32.2));
    root.add(box(0.4, 0.3, 0.3, KM.wood(), 26.6, 1.05, 32.5));
    addSolid(25.9, 32.15, 29.1, 32.75);
    crate(root, 32.3, 34.6, 0.6);
    crate(root, 31.6, 34.9, 0.5, 0, 0.4);
    crate(root, 32.3, 34.6, 0.45, 0.6, 0.2);
    addSolid(31.3, 34.2, 32.7, 35.2);
    for (let i = 0; i < 3; i++) drum(root, 22.6 + i * 0.6, 34.8, i === 1 ? KM.paintBlue() : KM.rust());
    addSolid(22.3, 34.5, 24.1, 35.1);
  }

  // THE YARD — the dig face, rails and a cart, crystals in the rock
  let cart: THREE.Object3D | null = null;
  {
    const R = ROOMS.yard!;
    plate(R, 46.4, 'THE YARD', 'THE YARD', 1.9);
    backLamps(R, [39.0, 43.5]);
    // timber supports shoring the dig face
    for (const x of [37.2, 41.6]) {
      const s = mount(R.z0 - 1);
      s.add(box(0.22, 2.6, 0.22, KM.wood(), x, 0, 28.15));
      s.add(box(0.22, 2.6, 0.22, KM.wood(), x + 2.4, 0, 28.15));
      s.add(box(2.7, 0.22, 0.26, KM.wood(), x + 1.2, 2.45, 28.15));
    }
    // Resonance crystals glinting in the face
    crystals(mount(R.z0 - 1), pool, 38.4, 28.1, '#7fd4ff', 3, 1.0);
    crystals(mount(R.z0 - 1), pool, 47.2, 28.1, '#c08cff', 4, 0.9);
    crystals(root, pool, 42.7, 28.2, '#7fffd4', 5, 0.7);
    // rails from the face out the west door
    for (let x = 35.2; x < 47.0; x += 0.5) root.add(box(0.14, 0.05, 1.1, KM.wood(), x, 0, 30.6));
    for (const dz of [-0.35, 0.35]) root.add(box(11.8, 0.06, 0.06, colMat('#5a4a3c', { metalness: 0.5 }), 41.1, 0.05, 30.6 + dz));
    const c = new THREE.Group();
    c.add(box(1.1, 0.6, 0.8, KM.rust(), 0, 0.18, 0));
    for (const dx of [-0.35, 0.35]) for (const dz of [-0.35, 0.35]) {
      const w = new THREE.Mesh(cylGeo(0.12, 0.12, 0.06, 8), KM.dark());
      w.rotation.x = Math.PI / 2;
      w.position.set(dx, 0.14, dz);
      c.add(w);
    }
    for (let i = 0; i < 6; i++) {
      const o = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), KM.rock());
      o.position.set((r() - 0.5) * 0.7, 0.8, (r() - 0.5) * 0.5);
      c.add(o);
    }
    const blue = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), glow('#7fd4ff', 3));
    blue.position.set(0.2, 0.92, 0.1);
    c.add(blue);
    shade(c);
    c.position.set(45.0, 0, 30.6);
    root.add(c);
    cart = c;
    addSolid(44.3, 30.1, 45.7, 31.1);
    // a drill rig, rubble, hard hats on a hook
    root.add(box(0.8, 0.6, 0.6, KM.hazard(), 37.0, 0, 34.6));
    root.add(beam(new THREE.Vector3(37.0, 0.6, 34.6), new THREE.Vector3(37.0, 2.3, 34.1), 0.12, KM.steel()));
    root.add(beam(new THREE.Vector3(37.0, 2.3, 34.1), new THREE.Vector3(37.0, 1.2, 33.6), 0.08, KM.steel()));
    addSolid(36.5, 34.2, 37.5, 35.0);
    for (let i = 0; i < 14; i++) {
      const o = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12 + r() * 0.2, 0), KM.rock());
      o.position.set(35.5 + r() * 12.5, 0.06, 28.5 + r() * 0.8);
      o.rotation.set(r() * 3, r() * 3, r() * 3);
      root.add(shade(o));
    }
    crate(root, 47.9, 34.8, 0.6);
    addSolid(47.5, 34.4, 48.3, 35.2);
  }

  // pendant lamps over each room's open floor
  for (const [x, z, warm] of [
    [11.0, 13.6, true], [25.0, 12.0, true], [36.5, 11.5, false], [27.0, 23.0, true], [12.8, 21.6, true],
    [42.5, 21.5, false], [13.5, 31.8, true], [27.4, 31.0, true], [41.5, 32.2, true], [46.2, 10.2, true],
  ] as Array<[number, number, boolean]>) pendant(root, pool, x, z, warm);

  // Banjo — Grandpa's old Jukeboxer, humming by the Bench
  const tint = new THREE.Color().setRGB(...UNDER.sprite);
  const banjo = await OhmFollower.load(94, tint, 0.017);
  banjo.root.position.set(13.9, 0, 9.0);
  root.add(banjo.root);
  addSolid(13.5, 8.6, 14.3, 9.4);
  things.push({ x: 13.9, z: 9.0, height: 1.7, label: 'Banjo', say: { name: 'Banjo', portrait: undefined, lines: ["Banjo — Grandpa's old Jukeboxer — hums two notes: its hello. You hum them back."] } });
  const noteMat = new THREE.MeshBasicMaterial({ map: textTexture('♪', { w: 16, h: 16, fg: '#ffd27a', font: 'bold 14px serif' }), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const notes = [0, 1].map(() => {
    const n = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), noteMat.clone());
    root.add(n);
    return n;
  });

  // dust in the lamp light
  const dust = (() => {
    const N = 160, g = new THREE.BufferGeometry(), pos = new Float32Array(N * 3), base = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) { base[i * 3] = (r() - 0.5) * 24; base[i * 3 + 1] = 0.3 + r() * 2.2; base[i * 3 + 2] = (r() - 0.5) * 16; }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: '#ffe2b0', size: 0.04, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
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

  // ------------------------------------------------------------ collision
  const blocked = (x: number, z: number, rad: number): boolean => {
    for (const [dx, dz] of [[-rad, -rad], [rad, -rad], [-rad, rad], [rad, rad], [0, 0]] as Array<[number, number]>)
      if (isWall(Math.floor(x + dx), Math.floor(z + dz))) return true;
    return hitsSolid(x, z, rad);
  };

  return {
    id: 'ohmstead',
    kind: 'home',
    title: 'OHMSTEAD',
    sub: 'Home colony · beneath the Field',
    mood: UNDER,
    sky: false,
    cam: { x0: 13.5, x1: COLS - 13.5, z0: 9.5, z1: 32.5 },
    blocked,
    ground: () => 0,
    spawns: {
      start: { x: data.spawn.x + 0.5, z: data.spawn.y + 0.5, face: 'S' },
      lift: { x: 30.9, z: 18.0, face: 'S' },
    },
    triggers: [],
    things,
    npcs: castOf(data),
    update(t, focus, cam) {
      // cutaway: rows south of the player sink low, rows at or behind stand tall
      let dirty = false;
      for (let z = 0; z < ROWS; z++) {
        const target = z + 0.5 > focus.z + 0.7 ? LOW : TALL;
        const h = rowH.get(z)!;
        if (Math.abs(h - target) > 0.002) {
          rowH.set(z, h + (target - h) * Math.min(1, 0.14));
          dirty = true;
        }
      }
      if (dirty) writeWalls();
      for (const m of mounts) m.obj.visible = rowH.get(m.row)! > TALL * 0.8;
      pool.update(t, cam);
      lit.forEach((m, i) => { m.visible = Math.sin(t * (0.7 + (i % 5) * 0.37) + i) > -0.85; });
      if (lantern) { lantern.rotation.y = t * 0.3; lantern.position.y = 1.6 + Math.sin(t * 0.8) * 0.05; }
      for (const f of flywheels) f.rotation.x = t * 2.4;
      if (fan) fan.rotation.y = t * 3.0;
      if (cart) cart.position.y = Math.abs(Math.sin(t * 9)) * 0.004;
      banjo.root.position.y = Math.abs(Math.sin(t * 2.2)) * 0.03;
      notes.forEach((n, i) => {
        const k = ((t * 0.45 + i * 0.5) % 1);
        n.position.set(13.9 + (i ? 0.3 : -0.25) + Math.sin(k * 6) * 0.08, 1.4 + k * 0.9, 9.1);
        (n.material as THREE.MeshBasicMaterial).opacity = Math.sin(k * Math.PI) * 0.9;
      });
      dust(t, focus);
    },
  };
};

/** The Downtowns, drawn by hand: a grid, a river, eight pins and string. */
let mapCache: THREE.Texture | null = null;
function mapTex(): THREE.Texture {
  if (mapCache) return mapCache;
  const c = document.createElement('canvas');
  c.width = 88;
  c.height = 48;
  const g = c.getContext('2d')!;
  g.fillStyle = '#c8b890';
  g.fillRect(0, 0, 88, 48);
  g.strokeStyle = 'rgba(80,60,40,0.35)';
  for (let x = 0; x < 88; x += 8) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, 48); g.stroke(); }
  for (let y = 0; y < 48; y += 8) { g.beginPath(); g.moveTo(0, y + 0.5); g.lineTo(88, y + 0.5); g.stroke(); }
  g.strokeStyle = '#4a6a8a';
  g.lineWidth = 2;
  g.beginPath(); g.moveTo(0, 30); g.bezierCurveTo(20, 22, 40, 36, 88, 18); g.stroke();
  const pins: Array<[number, number]> = [[14, 40], [24, 33], [34, 36], [42, 26], [50, 30], [60, 22], [68, 14], [78, 8]];
  g.strokeStyle = '#a03028';
  g.lineWidth = 1;
  g.beginPath();
  pins.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.stroke();
  g.fillStyle = '#a03028';
  for (const [x, y] of pins) g.fillRect(x - 1, y - 1, 3, 3);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.colorSpace = THREE.SRGBColorSpace;
  mapCache = t;
  return t;
}
