/**
 * gridart — the canonical art toolkit (YoYoPixel grid method).
 *
 * Art direction (2026-06-14): all OHMFRONT art is authored as character grids
 * over one shared LIMITED PALETTE, with highlight/base/shadow per material —
 * placed pixel-by-pixel. A `Grid` rasterizes to a spritekit `Sprite` so it
 * drops into the existing generators. Replaces ad-hoc geometric drawing.
 */
import { hexRGBA, Sprite, type RGBA } from './spritekit';

/** Master palette — char → hex. Limited & cohesive (post-collapse western).
 * Each material has highlight / base / shadow. '.' = transparent. */
export const PALETTE: Record<string, string> = {
  '.': 'transparent',
  X: '#181109', // ink / outline
  x: '#2a2018', // soft dark
  // skin
  S: '#e0a878', s: '#b87d54', H: '#f2c89a',
  // hair
  r: '#6a4426', R: '#3f2916', // brown
  y: '#e6c356', Y: '#b3902e', // blonde
  w: '#c5c1b6', W: '#8a857c', // grey
  // cloth
  b: '#c23a2a', B: '#8a2418', // red (bandana)
  u: '#3f5476', U: '#2a3a55', m: '#5e7398', // denim blue (base/shadow/hi)
  j: '#7d6c3c', J: '#554823', h: '#9d8a4e', // olive jacket
  // leather / wood
  o: '#5c3e24', O: '#38240f', // boots/leather
  p: '#5b4a28', // pouch
  k: '#6e5230', K: '#46331d', n: '#8a6e44', // wood base/shadow/hi
  // stone / metal
  a: '#7a7468', A: '#4a463e', l: '#9a948a', // base/shadow/hi
  // roof red (barn)
  e: '#a8503a', E: '#6a3020', q: '#c46a4a', // base/shadow/hi
  // greens
  g: '#466126', G: '#24331c', f: '#5e7e30', F: '#84a046',
  // water
  c: '#356a92', C: '#18324e', v: '#5a92b6',
  // glass / glow
  i: '#9ad6dd', I: '#5f9aa1', // glass
  z: '#ffd27a', // ember / lamp glow
};

const hex = (s: string): RGBA =>
  !s || s === 'transparent'
    ? [0, 0, 0, 0]
    : [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16), 255];

const RGBA_CACHE: Record<string, RGBA> = Object.fromEntries(Object.entries(PALETTE).map(([k, v]) => [k, hex(v)]));

export class Grid {
  cells: string[][];
  constructor(
    readonly w: number,
    readonly h: number,
  ) {
    this.cells = Array.from({ length: h }, () => Array.from({ length: w }, () => '.'));
  }
  set(x: number, y: number, ch: string): void {
    const xi = Math.round(x);
    const yi = Math.round(y);
    if (xi >= 0 && yi >= 0 && xi < this.w && yi < this.h) this.cells[yi]![xi] = ch;
  }
  get(x: number, y: number): string {
    return this.cells[y]?.[x] ?? '.';
  }
  rect(x: number, y: number, w: number, h: number, ch: string): void {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, ch);
  }
  hline(x: number, y: number, w: number, ch: string): void {
    for (let i = 0; i < w; i++) this.set(x + i, y, ch);
  }
  vline(x: number, y: number, h: number, ch: string): void {
    for (let j = 0; j < h; j++) this.set(x, y + j, ch);
  }
  line(x0i: number, y0i: number, x1i: number, y1i: number, ch: string): void {
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
      this.set(x, y, ch);
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
  ellipse(cx: number, cy: number, rx: number, ry: number, ch: string): void {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++)
      for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
        const nx = (x - cx) / rx;
        const ny = (y - cy) / ry;
        if (nx * nx + ny * ny <= 1) this.set(x, y, ch);
      }
  }
  /** Shaded box: base fill, highlight on the top/left inner edge, shadow on
   * the bottom/right — the per-material highlight/base/shadow rule. */
  box(x: number, y: number, w: number, h: number, hi: string, base: string, shadow: string): void {
    this.rect(x, y, w, h, base);
    this.hline(x, y, w, hi);
    this.vline(x, y, h, hi);
    this.hline(x, y + h - 1, w, shadow);
    this.vline(x + w - 1, y, h, shadow);
  }
  /** Exterior 1px outline in `ch` around all non-transparent cells. */
  outline(ch = 'X'): void {
    const solid = (x: number, y: number): boolean => this.get(x, y) !== '.';
    const edges: Array<[number, number]> = [];
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        if (solid(x, y)) continue;
        if (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1)) edges.push([x, y]);
      }
    for (const [x, y] of edges) this.set(x, y, ch);
  }
  /** Soft contact shadow ellipse at the base (uses 'x' soft dark, low alpha). */
  shadow(cx: number, cy: number, rx: number, ry: number): void {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++)
      for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
        const nx = (x - cx) / rx;
        const ny = (y - cy) / ry;
        if (nx * nx + ny * ny <= 1 && this.get(x, y) === '.') this.set(x, y, '_'); // shadow marker
      }
  }
  render(): Sprite {
    const s = new Sprite(this.w, this.h);
    for (let y = 0; y < this.h; y++)
      for (let x = 0; x < this.w; x++) {
        const ch = this.cells[y]![x]!;
        if (ch === '_') {
          s.set(x, y, [24, 16, 12, 110]); // contact shadow
          continue;
        }
        const c = RGBA_CACHE[ch];
        if (c) s.set(x, y, c);
      }
    return s;
  }
}

export { hexRGBA };
