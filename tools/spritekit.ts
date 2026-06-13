/**
 * OHMFRONT sprite toolkit. Builds Gen 3-budget pixel art (≤16 colors incl.
 * transparency) with the essential techniques layered in: hue-shifted ramps
 * (shadows cooler, highlights warmer), banded shading with 4×4 Bayer
 * dithering, automatic exterior outline + light-facing sel-out, rim light,
 * and a flat contact shadow. Light source is top-left, always (style guide).
 *
 * Primitives shade by *picking ramp steps*, never free colors, so volume
 * reads as clean banding and the palette stays tiny.
 */

export type RGBA = [number, number, number, number];
export const CLEAR: RGBA = [0, 0, 0, 0];

const BAYER4 = [
  0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5,
].map((v) => (v + 0.5) / 16);

export function hexRGBA(h: string, a = 255): RGBA {
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), a];
}

interface HSL {
  h: number;
  s: number;
  l: number;
}
function hexToHsl(h: string): HSL {
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) hue = ((b - r) / d + 2) / 6;
    else hue = ((r - g) / d + 4) / 6;
  }
  return { h: hue, s, l };
}
function hslToRGBA(c: HSL, a = 255): RGBA {
  const { h, s, l } = c;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v, a];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const conv = (t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [Math.round(conv(h + 1 / 3) * 255), Math.round(conv(h) * 255), Math.round(conv(h - 1 / 3) * 255), a];
}

/**
 * A 5-step ramp built from one base hex, hue-shifted across the range:
 * darks rotate toward blue/purple and desaturate-down, lights rotate toward
 * yellow and brighten — the single most important pixel-art lighting trick.
 */
export function ramp(baseHex: string, opts: { hueShift?: number; spread?: number } = {}): RGBA[] {
  const hueShift = opts.hueShift ?? 0.06;
  const spread = opts.spread ?? 0.34;
  const base = hexToHsl(baseHex);
  const steps: RGBA[] = [];
  for (let i = 0; i < 5; i++) {
    const t = (i - 2) / 2; // -1..1, 0 = base
    const l = Math.max(0.05, Math.min(0.96, base.l + t * spread));
    const h = (base.h + hueShift * t * 0.5 + 1) % 1; // warm up, cool down
    const s = Math.max(0, Math.min(1, base.s + (t > 0 ? -0.08 : 0.05) * Math.abs(t)));
    steps.push(hslToRGBA({ h, s, l }));
  }
  return steps;
}

const key = (c: RGBA): string => `${c[0]},${c[1]},${c[2]},${c[3]}`;

export interface ShadeOpts {
  light?: [number, number]; // direction the light comes FROM, default top-left
  ambient?: number;
  dither?: boolean;
  specular?: boolean;
}

export class Sprite {
  readonly data: Uint8ClampedArray;
  constructor(
    readonly w: number,
    readonly h: number,
  ) {
    this.data = new Uint8ClampedArray(w * h * 4);
  }

  // Coordinates are floored at the pixel boundary so fractional inputs from
  // trig/scaling write to a real pixel instead of silently corrupting the
  // typed array.
  private idx(x: number, y: number): number {
    return (Math.floor(y) * this.w + Math.floor(x)) * 4;
  }
  inBounds(x: number, y: number): boolean {
    const fx = Math.floor(x);
    const fy = Math.floor(y);
    return fx >= 0 && fy >= 0 && fx < this.w && fy < this.h;
  }
  opaque(x: number, y: number): boolean {
    return this.inBounds(x, y) && (this.data[this.idx(x, y) + 3] ?? 0) > 0;
  }
  set(x: number, y: number, c: RGBA): void {
    if (!this.inBounds(x, y)) return;
    const i = this.idx(x, y);
    this.data[i] = c[0];
    this.data[i + 1] = c[1];
    this.data[i + 2] = c[2];
    this.data[i + 3] = c[3];
  }
  get(x: number, y: number): RGBA {
    const i = this.idx(x, y);
    return [this.data[i] ?? 0, this.data[i + 1] ?? 0, this.data[i + 2] ?? 0, this.data[i + 3] ?? 0];
  }

  private pick(steps: RGBA[], t: number, x: number, y: number, dither: boolean): RGBA {
    const n = steps.length - 1;
    const f = Math.max(0, Math.min(1, t)) * n;
    let base = Math.floor(f);
    const frac = f - base;
    const bx = ((Math.floor(x) % 4) + 4) % 4;
    const by = ((Math.floor(y) % 4) + 4) % 4;
    if (dither && frac > (BAYER4[by * 4 + bx] ?? 0.5)) base += 1;
    return steps[Math.max(0, Math.min(n, base))] ?? CLEAR;
  }

  /** Shaded sphere: Lambert + optional specular, mapped to ramp bands. */
  sphere(cx: number, cy: number, r: number, steps: RGBA[], o: ShadeOpts = {}): void {
    const light = normalize3(o.light?.[0] ?? -1, o.light?.[1] ?? -1, 1.1);
    const ambient = o.ambient ?? 0.25;
    for (let y = Math.floor(cy - r); y <= cy + r; y++) {
      for (let x = Math.floor(cx - r); x <= cx + r; x++) {
        const nx = (x - cx) / r;
        const ny = (y - cy) / r;
        const d2 = nx * nx + ny * ny;
        if (d2 > 1) continue;
        const nz = Math.sqrt(1 - d2);
        const lambert = Math.max(0, nx * light[0] + ny * light[1] + nz * light[2]);
        let t = ambient + (1 - ambient) * lambert;
        if (o.specular !== false) {
          const spec = Math.pow(Math.max(0, nz * 0.4 + lambert * 0.6), 8);
          t = Math.min(1, t + spec * 0.5);
        }
        this.set(x, y, this.pick(steps, t, x, y, o.dither ?? true));
      }
    }
  }

  /** Beveled rounded rect: top/left lifts, bottom/right sinks — boxy volume. */
  roundedRect(x0: number, y0: number, w: number, h: number, rad: number, steps: RGBA[], o: ShadeOpts = {}): void {
    const dither = o.dither ?? true;
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        if (!this.insideRounded(x, y, x0, y0, w, h, rad)) continue;
        const fx = (x - x0) / (w - 1);
        const fy = (y - y0) / (h - 1);
        // light from top-left: bright at (0,0), dark at (1,1)
        const t = 0.78 - (fx * 0.32 + fy * 0.4) + 0.12;
        this.set(x, y, this.pick(steps, t, x, y, dither));
      }
    }
  }

  private insideRounded(x: number, y: number, x0: number, y0: number, w: number, h: number, rad: number): boolean {
    const minx = x0 + rad;
    const maxx = x0 + w - 1 - rad;
    const miny = y0 + rad;
    const maxy = y0 + h - 1 - rad;
    let cx = x;
    let cy = y;
    if (x < minx) cx = minx;
    else if (x > maxx) cx = maxx;
    if (y < miny) cy = miny;
    else if (y > maxy) cy = maxy;
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= rad * rad;
  }

  ellipse(cx: number, cy: number, rx: number, ry: number, c: RGBA): void {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) {
      for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
        const nx = (x - cx) / rx;
        const ny = (y - cy) / ry;
        if (nx * nx + ny * ny <= 1) this.set(x, y, c);
      }
    }
  }

  rect(x0: number, y0: number, w: number, h: number, c: RGBA): void {
    for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) this.set(x, y, c);
  }

  line(x0i: number, y0i: number, x1i: number, y1i: number, c: RGBA): void {
    // integer endpoints — Bresenham must land exactly on the end or it loops
    const x0 = Math.round(x0i);
    const y0 = Math.round(y0i);
    const x1 = Math.round(x1i);
    const y1 = Math.round(y1i);
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx + dy;
    let x = x0;
    let y = y0;
    for (;;) {
      this.set(x, y, c);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y += sy;
      }
    }
  }

  /** Two-tone checker fill for cloth/grille texture (essential dither motif). */
  dither(x0: number, y0: number, w: number, h: number, a: RGBA, b: RGBA): void {
    for (let y = y0; y < y0 + h; y++)
      for (let x = x0; x < x0 + w; x++) if (this.opaque(x, y)) this.set(x, y, (x + y) % 2 === 0 ? a : b);
  }

  /** A pixel counts as solid body (not a semi-transparent contact shadow). */
  solid(x: number, y: number): boolean {
    return this.inBounds(x, y) && (this.data[this.idx(x, y) + 3] ?? 0) >= 255;
  }

  /** Auto exterior outline; sel-out lifts the top-left rim one notch lighter.
   * Only solid (fully opaque) body pixels are outlined, so a contact shadow
   * drawn first is left alone. */
  outline(color: RGBA, selOut?: RGBA): void {
    const edges: Array<[number, number]> = [];
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        if (this.solid(x, y)) continue;
        if (
          this.solid(x - 1, y) ||
          this.solid(x + 1, y) ||
          this.solid(x, y - 1) ||
          this.solid(x, y + 1) ||
          this.solid(x - 1, y - 1) ||
          this.solid(x + 1, y + 1) ||
          this.solid(x - 1, y + 1) ||
          this.solid(x + 1, y - 1)
        ) {
          edges.push([x, y]);
        }
      }
    }
    for (const [x, y] of edges) this.set(x, y, color);
    if (selOut) {
      for (let y = 0; y < this.h; y++) {
        for (let x = 0; x < this.w; x++) {
          if (!this.solid(x, y)) continue;
          const upOut = key(this.get(x, y - 1)) === key(color);
          const leftOut = key(this.get(x - 1, y)) === key(color);
          if (upOut || leftOut) this.set(x, y, selOut);
        }
      }
    }
  }

  /** Flat elliptical contact shadow under the sprite (one extra color). */
  contactShadow(cx: number, cy: number, rx: number, ry: number, c: RGBA): void {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) {
      for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
        const nx = (x - cx) / rx;
        const ny = (y - cy) / ry;
        if (nx * nx + ny * ny <= 1 && !this.opaque(x, y)) this.set(x, y, c);
      }
    }
  }

  colorCount(): number {
    const set = new Set<string>();
    for (let i = 0; i < this.data.length; i += 4) {
      const a = this.data[i + 3] ?? 0;
      set.add(a === 0 ? 'clear' : `${this.data[i]},${this.data[i + 1]},${this.data[i + 2]}`);
    }
    return set.size;
  }
}

function normalize3(x: number, y: number, z: number): [number, number, number] {
  const len = Math.sqrt(x * x + y * y + z * z) || 1;
  return [x / len, y / len, z / len];
}
