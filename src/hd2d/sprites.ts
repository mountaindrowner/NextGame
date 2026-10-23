import * as THREE from 'three';

/**
 * 2D pixel-art characters standing in the 3D world. Each is an upright,
 * camera-facing plane (the camera's yaw is fixed, so "facing +z" is enough),
 * anchored at the feet, alpha-cut so it casts a crisp silhouette shadow, with
 * a soft contact blob under it. Sheets are the existing walk sheets (4 frames
 * × rows S/N/W; E mirrors W) — placeholders until the 8-direction remake.
 */

export type Dir = 'S' | 'N' | 'W' | 'E';
export interface SheetMeta { frameW: number; frameH: number; cols: number; rows: number; fps: number; originY: number; contentH: number }

/** World units per sheet pixel: SAL's 68px of content stands ~1.65 tall. */
export const PX = 0.0243;

const loader = new THREE.TextureLoader();
function pixelTex(t: THREE.Texture): THREE.Texture {
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  return t;
}

let blobTex: THREE.Texture | null = null;
function blob(radius: number): THREE.Mesh {
  if (!blobTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d')!;
    const grd = g.createRadialGradient(32, 32, 2, 32, 32, 31);
    grd.addColorStop(0, 'rgba(0,0,0,0.55)');
    grd.addColorStop(0.6, 'rgba(0,0,0,0.3)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 64, 64);
    blobTex = new THREE.CanvasTexture(c);
  }
  const m = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2, radius * 1.3), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = 1;
  return m;
}

/** Sprite brightness: the frame is ACES-tonemapped as a whole, so flat sprites are lifted to read at full value. */
export function spriteTint(night: boolean): THREE.Color {
  return night ? new THREE.Color().setRGB(0.6, 0.68, 0.95) : new THREE.Color().setRGB(1.1, 1.05, 0.98);
}

function spriteMesh(tex: THREE.Texture, w: number, h: number, footFromTop: number, tint: THREE.Color): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(w, h);
  geo.translate(0, h * (footFromTop - 0.5), 0);
  const mat = new THREE.MeshBasicMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide, color: tint });
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true;
  return m;
}

export class Walker {
  readonly root = new THREE.Group();
  private readonly mesh: THREE.Mesh;
  private readonly tex: THREE.Texture;
  dir: Dir = 'S';
  private t = 0;
  private moving = false;

  private constructor(tex: THREE.Texture, readonly meta: SheetMeta, tint: THREE.Color) {
    this.tex = tex;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    this.mesh = spriteMesh(tex, meta.frameW * PX, meta.frameH * PX, meta.originY, tint);
    this.root.add(this.mesh, blob(0.34));
    this.setFrame('S', 0);
  }

  static async load(id: string, tint: THREE.Color): Promise<Walker> {
    const [tex, meta] = await Promise.all([
      loader.loadAsync(`./world/char/${id}_walk.png`).then(pixelTex),
      fetch(`./world/char/${id}_walk.meta.json`).then((r) => r.json() as Promise<SheetMeta>),
    ]);
    return new Walker(tex, meta, tint);
  }

  private setFrame(dir: Dir, frame: number): void {
    const { cols, rows } = this.meta;
    const row = dir === 'S' ? 0 : dir === 'N' ? 1 : 2;
    const flip = dir === 'E';
    this.tex.repeat.set((flip ? -1 : 1) / cols, 1 / rows);
    this.tex.offset.set((flip ? frame + 1 : frame) / cols, 1 - (row + 1) / rows);
  }

  /** Advance the walk cycle; `speed` scales cadence (running steps faster). */
  animate(dt: number, moving: boolean, speed = 1): void {
    if (moving !== this.moving) { this.t = 0; this.moving = moving; }
    this.t += dt * speed;
    const f = moving ? Math.floor(this.t * this.meta.fps) % this.meta.cols : 0;
    this.setFrame(this.dir, f);
    // idle: a slow breath so nobody looks pasted on
    this.mesh.scale.y = moving ? 1 : 1 + Math.sin(this.t * 2.2) * 0.012;
  }

  setTint(c: THREE.Color): void { (this.mesh.material as THREE.MeshBasicMaterial).color.copy(c); }

  /** Dialogue card: this sheet's west-facing (left) standing frame. */
  card(): Promise<string> {
    const { frameW, frameH } = this.meta;
    return spriteCard(this.tex.image as HTMLImageElement, 220, { x: 0, y: frameH * 2, w: frameW, h: frameH });
  }

  face(dx: number, dz: number): void {
    if (Math.abs(dx) < 1e-4 && Math.abs(dz) < 1e-4) return;
    this.dir = Math.abs(dx) >= Math.abs(dz) * 0.9 ? (dx < 0 ? 'W' : 'E') : dz < 0 ? 'N' : 'S';
  }
}

/** The lead Ohm: front/back stills that hop as it trots behind the player. */
export class OhmFollower {
  readonly root = new THREE.Group();
  private readonly body = new THREE.Group();
  private readonly front: THREE.Mesh;
  private readonly back: THREE.Mesh;
  private hop = 0;

  private constructor(front: THREE.Mesh, back: THREE.Mesh) {
    this.front = front;
    this.back = back;
    this.back.visible = false;
    this.body.add(front, back);
    this.root.add(this.body, blob(0.36));
  }

  static async load(num: number, tint: THREE.Color, scale = 0.019): Promise<OhmFollower> {
    const make = async (url: string): Promise<THREE.Mesh> => {
      const tex = pixelTex(await loader.loadAsync(url));
      tex.wrapS = THREE.RepeatWrapping;
      const img = tex.image as HTMLImageElement;
      const foot = lowestOpaqueRow(img) / img.height;
      return spriteMesh(tex, img.width * scale, img.height * scale, foot, tint);
    };
    const [f, b] = await Promise.all([make(`./sprites/ohms/${num}_front_hd.png`), make(`./sprites/ohms/${num}_back_hd.png`)]);
    return new OhmFollower(f, b);
  }

  setTint(c: THREE.Color): void {
    for (const m of [this.front, this.back]) (m.material as THREE.MeshBasicMaterial).color.copy(c);
  }

  /** dx/dz: this frame's motion. Faces the way it moves; hops while moving. */
  step(dt: number, dx: number, dz: number): void {
    const moving = Math.hypot(dx, dz) > 1e-4;
    if (moving) {
      const north = dz < 0 && Math.abs(dz) > Math.abs(dx) * 0.9;
      this.front.visible = !north;
      this.back.visible = north;
      // the stills look right; mirror them when trotting west
      if (Math.abs(dx) > 1e-4) this.front.scale.x = this.back.scale.x = dx < 0 ? -1 : 1;
      this.hop += dt * 11;
    } else {
      this.hop = 0;
    }
    this.body.position.y = moving ? Math.abs(Math.sin(this.hop)) * 0.09 : 0;
  }
}

function lowestOpaqueRow(img: HTMLImageElement): number {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d')!;
  g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  for (let y = c.height - 1; y >= 0; y--) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3]! > 128) return y + 1;
  return c.height;
}

/** A single still sprite scaled so its drawn content stands `height` units
 *  tall (feet on the ground) — used to compare art styles side by side. */
export async function stillSprite(url: string, height: number, tint: THREE.Color): Promise<THREE.Group> {
  const tex = pixelTex(await loader.loadAsync(url));
  const img = tex.image as HTMLImageElement;
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const g = c.getContext('2d')!;
  g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, c.width, c.height).data;
  let top = c.height, bottom = 0;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3]! > 128) { top = Math.min(top, y); bottom = Math.max(bottom, y + 1); }
  const k = height / Math.max(1, bottom - top);
  const root = new THREE.Group();
  root.add(spriteMesh(tex, img.width * k, img.height * k, bottom / img.height, tint), blob(0.34));
  return root;
}

const DIRS8 = ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'] as const;
export type Dir8 = (typeof DIRS8)[number];

/** One animation as listed in a style's anim.json. */
interface AnimInfo { frames: number; fps: number; loop?: boolean; dirs?: string[] }

/** A hero drawn from 8 directional stills (PixelLab rotations) plus any
 *  animations its anim.json lists (walk, run, idle loops; one-shots such as
 *  pickup, hurt, hop, throw). Animations with fewer than 8 directions borrow
 *  the nearest one they have. Without a walk it steps with a bob. */
export class RotHero {
  readonly root = new THREE.Group();
  private readonly body = new THREE.Group();
  private readonly mesh: THREE.Mesh;
  private readonly mats: Record<Dir8, THREE.MeshBasicMaterial>;
  private readonly anims: Record<string, { info: AnimInfo; frames: Partial<Record<Dir8, THREE.MeshBasicMaterial[]>> }>;
  dir: Dir = 'S';
  facing: Dir8 = 'south';
  private t = 0;
  /** wall-clock seconds for frame playback (t is scaled by stride speed) */
  private lt = 0;
  private moving = false;
  private oneShot: { name: string; t: number; done: () => void } | null = null;

  private constructor(mats: Record<Dir8, THREE.MeshBasicMaterial>, anims: RotHero['anims'], w: number, h: number, foot: number) {
    this.mats = mats;
    this.anims = anims;
    const geo = new THREE.PlaneGeometry(w, h);
    geo.translate(0, h * (foot - 0.5), 0);
    this.mesh = new THREE.Mesh(geo, mats.south);
    this.mesh.castShadow = true;
    this.body.add(this.mesh);
    this.root.add(this.body, blob(0.34));
  }

  /** Loads ./world/styles/<id>/<dir>.png plus every animation in anim.json
   *  (<name>/<dir>/<n>.png); scales so the figure stands `height` tall. */
  static async load(id: string, tint: THREE.Color, height = 1.65): Promise<RotHero> {
    const base = `./world/styles/${id}`;
    const list = (await fetch(`${base}/anim.json`).then((r) => (r.ok ? r.json() : {})).catch(() => ({}))) as Record<string, AnimInfo>;
    const texs = await Promise.all(DIRS8.map((d) => loader.loadAsync(`${base}/${d}.png`).then(pixelTex)));
    const mat = (t: THREE.Texture): THREE.MeshBasicMaterial => new THREE.MeshBasicMaterial({ map: t, alphaTest: 0.5, side: THREE.DoubleSide, color: tint });
    const anims: RotHero['anims'] = {};
    await Promise.all(Object.entries(list).map(async ([name, info]) => {
      const dirs = (info.dirs ?? DIRS8).filter((d): d is Dir8 => (DIRS8 as readonly string[]).includes(d));
      const frames: Partial<Record<Dir8, THREE.MeshBasicMaterial[]>> = {};
      await Promise.all(dirs.map(async (d) => {
        const fr = await Promise.all(Array.from({ length: info.frames }, (_, i) => loader.loadAsync(`${base}/${name}/${d}/${i}.png`).then(pixelTex)));
        frames[d] = fr.map(mat);
      }));
      anims[name] = { info, frames };
    }));
    const img = texs[0]!.image as HTMLImageElement;
    // measure the south figure's drawn height to size every direction alike
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    const g = c.getContext('2d')!;
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    let top = c.height, bottom = 0;
    for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3]! > 128) { top = Math.min(top, y); bottom = Math.max(bottom, y + 1); }
    const k = height / Math.max(1, bottom - top);
    const mats = Object.fromEntries(DIRS8.map((dn, i) => [dn, mat(texs[i]!)])) as Record<Dir8, THREE.MeshBasicMaterial>;
    return new RotHero(mats, anims, img.width * k, img.height * k, bottom / img.height);
  }

  has(name: string): boolean { return !!this.anims[name]; }
  get busy(): boolean { return this.oneShot !== null; }

  setTint(c: THREE.Color): void {
    for (const m of Object.values(this.mats)) m.color.copy(c);
    for (const a of Object.values(this.anims)) for (const list of Object.values(a.frames)) for (const m of list ?? []) m.color.copy(c);
  }

  face(dx: number, dz: number): void {
    if (Math.abs(dx) < 1e-4 && Math.abs(dz) < 1e-4) return;
    // screen-space angle: 0 = south (toward camera), clockwise toward west
    const a = Math.atan2(-dx, dz);
    const i = ((Math.round(a / (Math.PI / 4)) % 8) + 8) % 8;
    // atan2(-dx, dz): south 0, south-west +45°, west +90° … so walk the list backwards
    this.facing = DIRS8[(8 - i) % 8]!;
    if (!this.oneShot) this.mesh.material = this.mats[this.facing];
    this.dir = Math.abs(dx) >= Math.abs(dz) * 0.9 ? (dx < 0 ? 'W' : 'E') : dz < 0 ? 'N' : 'S';
  }

  /** Frames of `name` for the current facing, or the nearest direction it has. */
  private framesFor(name: string): THREE.MeshBasicMaterial[] | undefined {
    const a = this.anims[name];
    if (!a) return undefined;
    const at = DIRS8.indexOf(this.facing);
    for (const step of [0, 1, -1, 2, -2, 3, -3, 4]) {
      const f = a.frames[DIRS8[(at + step + 8) % 8]!];
      if (f?.length) return f;
    }
    return undefined;
  }

  /** Play a one-shot (pickup, hurt, hop, throw…) once, then return to idle. */
  play(name: string): Promise<void> {
    if (!this.anims[name]) return Promise.resolve();
    this.oneShot?.done();
    return new Promise((done) => { this.oneShot = { name, t: 0, done }; });
  }

  animate(dt: number, moving: boolean, speed = 1): void {
    this.t += dt * speed;
    this.lt += dt;
    if (moving !== this.moving) { this.moving = moving; this.t = 0; this.lt = 0; }
    this.body.position.y = 0;
    this.body.rotation.z = 0;
    this.body.scale.set(1, 1, 1);
    if (this.oneShot) {
      const o = this.oneShot;
      o.t += dt;
      const fr = this.framesFor(o.name);
      const info = this.anims[o.name]!.info;
      const i = Math.floor(o.t * info.fps);
      if (!fr || i >= fr.length) { this.oneShot = null; o.done(); } else { this.mesh.material = fr[i]!; return; }
    }
    // loops: run when fast and a run exists, else walk; idle when still
    const loop = moving ? (speed > 1.2 && this.anims.run ? 'run' : 'walk') : 'idle';
    const fr = this.framesFor(loop);
    if (fr?.length) {
      const fps = this.anims[loop]!.info.fps;
      this.mesh.material = fr[Math.floor(this.lt * fps) % fr.length]!;
      return;
    }
    this.mesh.material = this.mats[this.facing];
    if (moving) {
      // stand-in step: a bob, a squash, a lean into the stride
      const s = Math.sin(this.t * 14);
      this.body.position.y = Math.abs(s) * 0.07;
      this.body.scale.set(1 + Math.abs(s) * 0.02, 1 - Math.abs(s) * 0.03, 1);
      this.body.rotation.z = s * 0.035;
    } else {
      this.body.scale.set(1, 1 + Math.sin(this.t * 2.2) * 0.012, 1);
    }
  }
}

/** The dialogue "portrait": the speaker's own sprite, trimmed to its figure
 *  and upscaled by a whole number for crisp pixels (Mark, 2026-10-23 — no
 *  separate portraits). `rect` picks a frame out of a sheet. */
export async function spriteCard(src: string | HTMLImageElement, targetH = 220, rect?: { x: number; y: number; w: number; h: number }): Promise<string> {
  const img = typeof src === 'string' ? await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }) : src;
  const r = rect ?? { x: 0, y: 0, w: img.width, h: img.height };
  const c = document.createElement('canvas');
  c.width = r.w;
  c.height = r.h;
  const g = c.getContext('2d')!;
  g.drawImage(img, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
  const d = g.getImageData(0, 0, r.w, r.h).data;
  let x0 = r.w, y0 = r.h, x1 = 0, y1 = 0;
  for (let y = 0; y < r.h; y++) for (let x = 0; x < r.w; x++) if (d[(y * r.w + x) * 4 + 3]! > 40) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x + 1); y1 = Math.max(y1, y + 1); }
  if (x1 <= x0) return c.toDataURL();
  const w = x1 - x0, h = y1 - y0, k = Math.max(1, Math.floor(targetH / h));
  const out = document.createElement('canvas');
  out.width = w * k;
  out.height = h * k;
  const o = out.getContext('2d')!;
  o.imageSmoothingEnabled = false;
  o.drawImage(c, x0, y0, w, h, 0, 0, w * k, h * k);
  return out.toDataURL();
}
