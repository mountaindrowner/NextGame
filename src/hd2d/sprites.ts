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
