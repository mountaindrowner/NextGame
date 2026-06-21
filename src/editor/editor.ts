import type { FieldData, EntityLayer } from './types';
import { CELL_LAYERS, ENTITY_LAYERS, layerByKey } from './types';
import { loadMapData, loadMapImage, normalize, resize } from './save';

export type Tool =
  | 'select' | 'erase' | 'spawn'
  | 'collision' | 'grass' | 'grassAny' | 'water'
  | 'items' | 'npcs' | 'trainers' | 'signs' | 'interacts' | 'exits' | 'ledges' | 'placements';

export interface Selection { layer: EntityLayer['key']; index: number }

interface Opts {
  canvas: HTMLCanvasElement;
  onSelect: (sel: Selection | null) => void;
  onStatus: (text: string) => void;
  onMapLoaded: () => void;
}

const CELL_KEYS = CELL_LAYERS.map((l) => l.key);

export class Editor {
  data: FieldData = { tile: 32, cols: 1, rows: 1, width: 32, height: 32, collision: [0], grass: [0] };
  mapId = '';
  image: HTMLImageElement | null = null;
  tool: Tool = 'select';
  selected: Selection | null = null;
  show: Record<string, boolean> = {};
  dirty = false;

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private opts: Opts;
  private zoom = 1;
  private panX = 0;
  private panY = 0;
  private dragging = false;
  private panning = false;
  private movingSel = false;
  private spaceDown = false;
  private lastMouse = { x: 0, y: 0 };
  private hover = { c: -1, r: -1 };

  constructor(opts: Opts) {
    this.opts = opts;
    this.canvas = opts.canvas;
    this.ctx = this.canvas.getContext('2d')!;
    for (const l of CELL_LAYERS) this.show[l.key] = true;
    for (const l of ENTITY_LAYERS) this.show[l.key] = true;
    this.show['spawn'] = true;
    this.bindInput();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  async setMap(id: string): Promise<void> {
    this.data = await loadMapData(id);
    this.image = await loadMapImage(id);
    this.mapId = id;
    this.selected = null;
    this.dirty = false;
    this.fit();
    this.opts.onSelect(null);
    this.opts.onMapLoaded();
    this.render();
  }

  importData(data: FieldData, id = this.mapId): void {
    this.data = normalize(data);
    this.mapId = id;
    this.selected = null;
    this.dirty = true;
    this.fit();
    this.opts.onSelect(null);
    this.opts.onMapLoaded();
    this.render();
  }

  resizeMap(cols: number, rows: number): void {
    resize(this.data, Math.max(1, cols | 0), Math.max(1, rows | 0));
    this.markDirty();
    this.fit();
    this.render();
  }

  setTool(t: Tool): void {
    this.tool = t;
    this.opts.onStatus(`Tool: ${t}`);
  }

  toggleLayer(key: string, on: boolean): void {
    this.show[key] = on;
    this.render();
  }

  // ---- selection / properties --------------------------------------------

  selectedEntity(): Record<string, unknown> | null {
    if (!this.selected) return null;
    const list = this.data[this.selected.layer] as Array<Record<string, unknown>> | undefined;
    return list?.[this.selected.index] ?? null;
  }

  setSelectedProp(key: string, value: unknown): void {
    const e = this.selectedEntity();
    if (!e) return;
    if (value === undefined || value === '') delete e[key];
    else e[key] = value;
    this.markDirty();
    this.render();
  }

  deleteSelected(): void {
    if (!this.selected) return;
    const list = this.data[this.selected.layer] as Array<unknown> | undefined;
    list?.splice(this.selected.index, 1);
    this.selected = null;
    this.opts.onSelect(null);
    this.markDirty();
    this.render();
  }

  // ---- geometry ----------------------------------------------------------

  private fit(): void {
    const t = this.data.tile;
    const w = this.data.cols * t;
    const h = this.data.rows * t;
    const z = Math.min((this.canvas.width - 40) / w, (this.canvas.height - 40) / h, 2);
    this.zoom = Math.max(0.15, z);
    this.panX = (this.canvas.width - w * this.zoom) / 2;
    this.panY = (this.canvas.height - h * this.zoom) / 2;
  }

  private cellAt(mx: number, my: number): { c: number; r: number } {
    const t = this.data.tile;
    const c = Math.floor((mx - this.panX) / this.zoom / t);
    const r = Math.floor((my - this.panY) / this.zoom / t);
    return { c, r };
  }

  private inBounds(c: number, r: number): boolean {
    return c >= 0 && r >= 0 && c < this.data.cols && r < this.data.rows;
  }

  private coordOf(e: Record<string, unknown>, layer: EntityLayer): { c: number; r: number } {
    return { c: Number(e[layer.coord[0]]) || 0, r: Number(e[layer.coord[1]]) || 0 };
  }

  // ---- input -------------------------------------------------------------

  private bindInput(): void {
    const cv = this.canvas;
    cv.addEventListener('contextmenu', (e) => e.preventDefault());
    cv.addEventListener('mousedown', (e) => this.onDown(e));
    window.addEventListener('mousemove', (e) => this.onMove(e));
    window.addEventListener('mouseup', () => this.onUp());
    cv.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') this.spaceDown = true;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (this.selected && document.activeElement === document.body) { this.deleteSelected(); e.preventDefault(); }
      }
    });
    window.addEventListener('keyup', (e) => { if (e.code === 'Space') this.spaceDown = false; });
  }

  private rel(e: MouseEvent): { x: number; y: number } {
    const b = this.canvas.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  }

  private onDown(e: MouseEvent): void {
    const m = this.rel(e);
    this.lastMouse = m;
    if (this.spaceDown || e.button === 1) { this.panning = true; return; }
    const { c, r } = this.cellAt(m.x, m.y);
    if (!this.inBounds(c, r)) return;
    this.dragging = true;
    const erase = e.button === 2;
    this.apply(c, r, erase);
  }

  private onMove(e: MouseEvent): void {
    const m = this.rel(e);
    if (this.panning) {
      this.panX += m.x - this.lastMouse.x;
      this.panY += m.y - this.lastMouse.y;
      this.lastMouse = m;
      this.render();
      return;
    }
    this.lastMouse = m;
    const { c, r } = this.cellAt(m.x, m.y);
    this.hover = { c, r };
    this.opts.onStatus(`${this.mapId}  ·  cell ${c},${r}  ·  ${this.data.cols}×${this.data.rows}  ·  ${Math.round(this.zoom * 100)}%`);
    if (this.dragging && this.inBounds(c, r)) {
      if (this.movingSel) this.moveSelectedTo(c, r);
      else if (this.isCellTool()) this.apply(c, r, false);
    }
    this.render();
  }

  private onUp(): void {
    this.dragging = false;
    this.panning = false;
    this.movingSel = false;
  }

  private onWheel(e: WheelEvent): void {
    e.preventDefault();
    const m = this.rel(e);
    const before = { x: (m.x - this.panX) / this.zoom, y: (m.y - this.panY) / this.zoom };
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    this.zoom = Math.max(0.15, Math.min(6, this.zoom * factor));
    this.panX = m.x - before.x * this.zoom;
    this.panY = m.y - before.y * this.zoom;
    this.render();
  }

  private isCellTool(): boolean {
    return (CELL_KEYS as string[]).includes(this.tool);
  }

  /** A click/drag on cell (c,r) with the active tool. */
  private apply(c: number, r: number, erase: boolean): void {
    const i = r * this.data.cols + c;
    if (this.isCellTool()) {
      const arr = this.data[this.tool] as number[];
      arr[i] = erase ? 0 : 1;
      this.markDirty();
      return;
    }
    if (this.tool === 'spawn') {
      this.data.spawn = { x: c, y: r };
      this.markDirty();
      return;
    }
    if (this.tool === 'erase') {
      this.eraseAt(c, r);
      return;
    }
    if (this.tool === 'select') {
      this.selectAt(c, r);
      return;
    }
    // an entity-place tool
    const layer = layerByKey(this.tool);
    if (layer) {
      const list = (this.data[layer.key] as Array<Record<string, unknown>> | undefined) ?? [];
      list.push(layer.make(c, r));
      (this.data as Record<string, unknown>)[layer.key] = list;
      this.selected = { layer: layer.key, index: list.length - 1 };
      this.opts.onSelect(this.selected);
      this.markDirty();
    }
  }

  private hitTest(c: number, r: number): Selection | null {
    // topmost entity at the cell (search layers in reverse so later-drawn win)
    for (let li = ENTITY_LAYERS.length - 1; li >= 0; li--) {
      const layer = ENTITY_LAYERS[li]!;
      if (!this.show[layer.key]) continue;
      const list = this.data[layer.key] as Array<Record<string, unknown>> | undefined;
      if (!list) continue;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = this.coordOf(list[i]!, layer);
        if (p.c === c && p.r === r) return { layer: layer.key, index: i };
      }
    }
    return null;
  }

  private selectAt(c: number, r: number): void {
    const hit = this.hitTest(c, r);
    this.selected = hit;
    this.opts.onSelect(hit);
    if (hit) this.movingSel = true; // allow drag-to-move after selecting
  }

  private moveSelectedTo(c: number, r: number): void {
    if (!this.selected) return;
    const layer = layerByKey(this.selected.layer)!;
    const e = this.selectedEntity();
    if (!e) return;
    e[layer.coord[0]] = c;
    e[layer.coord[1]] = r;
    this.markDirty();
    this.opts.onSelect(this.selected); // refresh coord fields
  }

  private eraseAt(c: number, r: number): void {
    const hit = this.hitTest(c, r);
    if (!hit) return;
    (this.data[hit.layer] as Array<unknown>).splice(hit.index, 1);
    if (this.selected && this.selected.layer === hit.layer && this.selected.index === hit.index) {
      this.selected = null;
      this.opts.onSelect(null);
    }
    this.markDirty();
  }

  private markDirty(): void {
    this.dirty = true;
    this.render();
  }

  // ---- rendering ---------------------------------------------------------

  private resizeCanvas(): void {
    const parent = this.canvas.parentElement!;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    this.render();
  }

  render(): void {
    const ctx = this.ctx;
    const t = this.data.tile;
    const w = this.data.cols * t;
    const h = this.data.rows * t;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0d0b08';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(this.zoom, 0, 0, this.zoom, this.panX, this.panY);

    // background art (or a placeholder)
    if (this.image) ctx.drawImage(this.image, 0, 0, w, h);
    else { ctx.fillStyle = '#1a160f'; ctx.fillRect(0, 0, w, h); }

    // cell overlays
    for (const layer of CELL_LAYERS) {
      if (!this.show[layer.key]) continue;
      const arr = this.data[layer.key] as number[] | undefined;
      if (!arr) continue;
      ctx.fillStyle = layer.color;
      for (let r = 0; r < this.data.rows; r++)
        for (let c = 0; c < this.data.cols; c++)
          if (arr[r * this.data.cols + c] === 1) ctx.fillRect(c * t, r * t, t, t);
    }

    // grid
    ctx.lineWidth = 1 / this.zoom;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    for (let c = 0; c <= this.data.cols; c++) { ctx.moveTo(c * t, 0); ctx.lineTo(c * t, h); }
    for (let r = 0; r <= this.data.rows; r++) { ctx.moveTo(0, r * t); ctx.lineTo(w, r * t); }
    ctx.stroke();

    // entities
    for (const layer of ENTITY_LAYERS) {
      if (!this.show[layer.key]) continue;
      const list = this.data[layer.key] as Array<Record<string, unknown>> | undefined;
      if (!list) continue;
      for (const e of list) this.drawMarker(e, layer, t);
    }

    // spawn
    if (this.show['spawn'] && this.data.spawn) this.drawGlyph(this.data.spawn.x, this.data.spawn.y, t, '★', '#7dff9a', 'SPAWN');

    // selection ring
    if (this.selected) {
      const layer = layerByKey(this.selected.layer)!;
      const e = this.selectedEntity();
      if (e) {
        const p = this.coordOf(e, layer);
        ctx.lineWidth = 2 / this.zoom;
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(p.c * t + 1, p.r * t + 1, t - 2, t - 2);
      }
    }

    // hover cell
    if (this.inBounds(this.hover.c, this.hover.r)) {
      ctx.lineWidth = 1.5 / this.zoom;
      ctx.strokeStyle = 'rgba(255,210,122,0.9)';
      ctx.strokeRect(this.hover.c * t, this.hover.r * t, t, t);
    }
  }

  private drawMarker(e: Record<string, unknown>, layer: EntityLayer, t: number): void {
    const p = this.coordOf(e, layer);
    const label = String(e['name'] ?? e['kind'] ?? e['type'] ?? e['label'] ?? '');
    this.drawGlyph(p.c, p.r, t, layer.glyph, layer.color, label.slice(0, 14));
  }

  private drawGlyph(c: number, r: number, t: number, glyph: string, color: string, label: string): void {
    const ctx = this.ctx;
    const x = c * t + t / 2;
    const y = r * t + t / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.beginPath();
    ctx.arc(x, y, t * 0.36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = `${Math.round(t * 0.5)}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(glyph, x, y);
    if (label && this.zoom > 0.6) {
      ctx.font = `${Math.max(8, Math.round(t * 0.28))}px monospace`;
      ctx.fillStyle = '#000';
      ctx.fillText(label, x + 0.5, y + t * 0.5 + 0.5);
      ctx.fillStyle = '#fff';
      ctx.fillText(label, x, y + t * 0.5);
    }
  }
}
