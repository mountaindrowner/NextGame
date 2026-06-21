import type { Editor, Selection, Tool } from './editor';
import { CELL_LAYERS, ENTITY_LAYERS, MAP_IDS, layerByKey, type FieldSpec, type FieldData } from './types';
import { serialize, download, saveToDisk, normalize } from './save';

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};

export class Panel {
  private ed: Editor;
  private toolbar: HTMLElement;
  private sidebar: HTMLElement;
  private status: HTMLElement;
  private props: HTMLElement;
  private toolButtons = new Map<string, HTMLButtonElement>();

  constructor(ed: Editor, toolbar: HTMLElement, sidebar: HTMLElement, status: HTMLElement) {
    this.ed = ed;
    this.toolbar = toolbar;
    this.sidebar = sidebar;
    this.status = status;
    this.props = el('div', 'props');
    this.buildToolbar();
    this.buildSidebar();
  }

  setStatus(t: string): void { this.status.textContent = t; }

  // ---- toolbar -----------------------------------------------------------

  private buildToolbar(): void {
    const sel = el('select', 'map-select');
    for (const id of MAP_IDS) { const o = el('option'); o.value = id; o.textContent = id; sel.appendChild(o); }
    sel.addEventListener('change', () => void this.ed.setMap(sel.value).catch((e) => this.setStatus(String(e))));
    this.mapSelect = sel;
    this.toolbar.append(label('Map', sel));

    // tools
    const tools: Array<[Tool, string]> = [
      ['select', '⬚ Select/Move'], ['erase', '⌫ Erase'], ['spawn', '★ Spawn'],
      ...CELL_LAYERS.map((l) => [l.key, paintLabel(l.key, l.label)] as [Tool, string]),
      ...ENTITY_LAYERS.map((l) => [l.key, `${l.glyph} ${l.label}`] as [Tool, string]),
    ];
    const group = el('div', 'tool-group');
    for (const [t, lbl] of tools) {
      const b = el('button', 'tool', lbl);
      b.addEventListener('click', () => { this.ed.setTool(t); this.highlightTool(t); });
      this.toolButtons.set(t, b);
      group.appendChild(b);
    }
    this.toolbar.appendChild(group);
    this.highlightTool('select');

    // file actions
    const exportBtn = el('button', 'action', '⬇ Export JSON');
    exportBtn.addEventListener('click', () => download(`${this.ed.mapId}.json`, serialize(this.ed.data)));
    const saveBtn = el('button', 'action', '💾 Save to disk');
    saveBtn.title = 'Writes public/world/<map>.json — only works under `npm run dev`';
    saveBtn.addEventListener('click', async () => {
      const ok = await saveToDisk(this.ed.mapId, serialize(this.ed.data));
      this.setStatus(ok ? `Saved world/${this.ed.mapId}.json to disk.` : 'Disk save unavailable (not running npm run dev) — use Export instead.');
      if (ok) this.ed.dirty = false;
    });
    const importBtn = el('button', 'action', '⬆ Import JSON');
    const file = el('input'); file.type = 'file'; file.accept = '.json'; file.style.display = 'none';
    file.addEventListener('change', () => {
      const f = file.files?.[0]; if (!f) return;
      f.text().then((txt) => {
        try { this.ed.importData(normalize(JSON.parse(txt) as FieldData)); this.setStatus(`Imported ${f.name}.`); }
        catch (e) { this.setStatus(`Import failed: ${String(e)}`); }
      });
      file.value = '';
    });
    importBtn.addEventListener('click', () => file.click());
    const copyBtn = el('button', 'action', '⧉ Copy JSON');
    copyBtn.addEventListener('click', () => void navigator.clipboard?.writeText(serialize(this.ed.data)).then(() => this.setStatus('JSON copied to clipboard.')));
    this.toolbar.append(exportBtn, copyBtn, saveBtn, importBtn, file);
  }

  private mapSelect!: HTMLSelectElement;
  syncMapSelect(): void { if (this.ed.mapId) this.mapSelect.value = this.ed.mapId; }

  private highlightTool(t: string): void {
    for (const [k, b] of this.toolButtons) b.classList.toggle('active', k === t);
  }

  // ---- sidebar -----------------------------------------------------------

  private buildSidebar(): void {
    // layer visibility
    const vis = el('div', 'section');
    vis.appendChild(el('h3', undefined, 'Layers (visibility)'));
    const layers = [...CELL_LAYERS.map((l) => [l.key, l.label] as const), ...ENTITY_LAYERS.map((l) => [l.key, l.label] as const), ['spawn', 'Spawn'] as const];
    for (const [key, lbl] of layers) {
      const row = el('label', 'check');
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = true;
      cb.addEventListener('change', () => this.ed.toggleLayer(key, cb.checked));
      row.append(cb, document.createTextNode(' ' + lbl));
      vis.appendChild(row);
    }
    this.sidebar.appendChild(vis);

    // map meta + resize
    const meta = el('div', 'section');
    meta.appendChild(el('h3', undefined, 'Map'));
    this.meta = meta;
    this.sidebar.appendChild(meta);

    // properties
    const ps = el('div', 'section');
    ps.appendChild(el('h3', undefined, 'Selection'));
    ps.appendChild(this.props);
    this.sidebar.appendChild(ps);

    const help = el('div', 'section help');
    help.innerHTML = 'Left-drag paints · Right-drag erases cells · Space+drag or middle-drag pans · Wheel zooms · Del removes the selected entity.';
    this.sidebar.appendChild(help);
  }

  private meta!: HTMLElement;

  refreshMeta(): void {
    const d = this.ed.data;
    this.meta.querySelectorAll('.metabody').forEach((n) => n.remove());
    const body = el('div', 'metabody');
    const cols = numInput(d.cols), rows = numInput(d.rows), tile = numInput(d.tile);
    tile.disabled = true;
    body.append(label('Cols', cols), label('Rows', rows), label('Tile px', tile));
    const apply = el('button', 'action', 'Resize grid');
    apply.addEventListener('click', () => { this.ed.resizeMap(Number(cols.value), Number(rows.value)); this.refreshMeta(); });
    body.appendChild(apply);
    const zone = textInput(d.zone ?? '');
    zone.addEventListener('change', () => { d.zone = zone.value || undefined; this.ed.render(); });
    body.append(label('Encounter zone', zone));
    const sp = el('div', 'muted', d.spawn ? `Spawn at ${d.spawn.x},${d.spawn.y} (use the ★ Spawn tool to move it)` : 'No spawn set');
    body.appendChild(sp);
    this.meta.appendChild(body);
  }

  // ---- properties form ---------------------------------------------------

  showProps(sel: Selection | null): void {
    this.props.replaceChildren();
    if (!sel) { this.props.appendChild(el('div', 'muted', 'Nothing selected. Pick the Select tool and click an entity, or place one with a tool.')); return; }
    const layer = layerByKey(sel.layer)!;
    const list = this.ed.data[sel.layer] as Array<Record<string, unknown>>;
    const e = list[sel.index]!;
    this.props.appendChild(el('div', 'tag', `${layer.glyph} ${layer.label} #${sel.index}`));

    // coords
    for (const ck of layer.coord) {
      const inp = numInput(Number(e[ck]) || 0);
      inp.addEventListener('change', () => this.ed.setSelectedProp(ck, Number(inp.value)));
      this.props.appendChild(label(ck, inp));
    }
    // schema fields
    for (const f of layer.fields) this.props.appendChild(this.fieldRow(e, f));

    const del = el('button', 'action danger', '🗑 Delete');
    del.addEventListener('click', () => this.ed.deleteSelected());
    this.props.appendChild(del);
  }

  private fieldRow(e: Record<string, unknown>, f: FieldSpec): HTMLElement {
    const set = (v: unknown) => this.ed.setSelectedProp(f.key, v);
    if (f.type === 'bool') {
      const cb = el('input'); cb.type = 'checkbox'; cb.checked = Boolean(e[f.key]);
      cb.addEventListener('change', () => set(cb.checked));
      const row = el('label', 'check'); row.append(cb, document.createTextNode(' ' + f.label));
      return row;
    }
    if (f.type === 'number') {
      const inp = numInput(Number(e[f.key]) || 0);
      inp.addEventListener('change', () => set(inp.value === '' ? undefined : Number(inp.value)));
      return label(f.label, inp);
    }
    if (f.type === 'select') {
      const s = el('select');
      for (const o of f.options ?? []) { const op = el('option'); op.value = o; op.textContent = o; s.appendChild(op); }
      s.value = String(e[f.key] ?? f.options?.[0] ?? '');
      s.addEventListener('change', () => set(s.value));
      return label(f.label, s);
    }
    if (f.type === 'lines') {
      const ta = el('textarea'); ta.rows = 4;
      ta.value = (Array.isArray(e[f.key]) ? (e[f.key] as string[]) : []).join('\n');
      ta.addEventListener('change', () => set(ta.value.split('\n').map((s) => s.trim()).filter((s) => s.length)));
      return label(f.label, ta);
    }
    if (f.type === 'team') {
      const ta = el('textarea'); ta.rows = 4;
      const team = (Array.isArray(e[f.key]) ? (e[f.key] as Array<{ num: number; level: number }>) : []);
      ta.value = team.map((m) => `${m.num},${m.level}`).join('\n');
      ta.placeholder = 'speciesNum,level  (one per line)';
      ta.addEventListener('change', () => {
        const parsed = ta.value.split('\n').map((s) => s.trim()).filter(Boolean).map((s) => {
          const [n, l] = s.split(',').map((x) => parseInt(x.trim(), 10));
          return { num: n || 1, level: l || 5 };
        });
        set(parsed);
      });
      return label(f.label, ta);
    }
    if (f.type === 'json') {
      const ta = el('textarea'); ta.rows = 3;
      ta.value = e[f.key] == null ? '' : JSON.stringify(e[f.key]);
      ta.placeholder = 'JSON (leave blank to remove)';
      ta.addEventListener('change', () => {
        const v = ta.value.trim();
        if (!v) { set(undefined); return; }
        try { set(JSON.parse(v)); ta.classList.remove('bad'); }
        catch { ta.classList.add('bad'); this.setStatus(`Invalid JSON in ${f.key}`); }
      });
      return label(f.label, ta);
    }
    // text / textarea
    const inp = f.type === 'textarea' ? el('textarea') : el('input');
    if (inp instanceof HTMLTextAreaElement) inp.rows = 2;
    inp.value = String(e[f.key] ?? '');
    if (f.suggest && inp instanceof HTMLInputElement) {
      const dl = el('datalist'); const dlid = `dl-${f.key}`; dl.id = dlid;
      for (const s of f.suggest) { const o = el('option'); o.value = s; dl.appendChild(o); }
      inp.setAttribute('list', dlid); inp.appendChild(dl); this.props.appendChild(dl);
    }
    inp.addEventListener('change', () => set(inp.value === '' ? undefined : inp.value));
    return label(f.label, inp);
  }
}

// ---- tiny dom helpers ----------------------------------------------------

function label(text: string, control: HTMLElement): HTMLElement {
  const wrap = el('label', 'field');
  wrap.append(el('span', 'lbl', text), control);
  return wrap;
}
function numInput(v: number): HTMLInputElement { const i = el('input'); i.type = 'number'; i.value = String(v); return i; }
function textInput(v: string): HTMLInputElement { const i = el('input'); i.type = 'text'; i.value = v; return i; }
function paintLabel(key: string, full: string): string {
  const swatch = { collision: '⬛', grass: '🟩', grassAny: '🟢', water: '🟦' }[key] ?? '▦';
  return `${swatch} ${full}`;
}
