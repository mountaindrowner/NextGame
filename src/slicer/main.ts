import { compose, DEFAULT_CONFIG, type SliceConfig, type Dir, type RGBA } from './compose';

const $ = (id: string) => document.getElementById(id)!;
const cfg: SliceConfig = structuredClone(DEFAULT_CONFIG);
let src: RGBA | null = null;
let srcImg: HTMLImageElement | null = null;

const srcCanvas = $('src-canvas') as HTMLCanvasElement;
const sheetCanvas = $('sheet-canvas') as HTMLCanvasElement;
const controls = $('controls');
const status = $('status');
const anim = {
  s: $('anim-s') as HTMLCanvasElement, n: $('anim-n') as HTMLCanvasElement,
  e: $('anim-e') as HTMLCanvasElement, w: $('anim-w') as HTMLCanvasElement,
};

function setStatus(t: string): void { status.textContent = t; }

// ---- source loading -------------------------------------------------------

function readPixels(img: HTMLImageElement): RGBA {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth; c.height = img.naturalHeight;
  const ctx = c.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, c.width, c.height);
  return { w: c.width, h: c.height, data: d.data };
}

function onSource(img: HTMLImageElement): void {
  srcImg = img;
  src = readPixels(img);
  // auto-fit the grid to the image (Mark can fine-tune from here)
  cfg.cellW = Math.floor((src.w - cfg.offX - (cfg.cols - 1) * cfg.spX) / cfg.cols);
  cfg.cellH = Math.floor((src.h - cfg.offY - (cfg.rows - 1) * cfg.spY) / cfg.rows);
  buildControls();
  recompute();
  setStatus(`Loaded ${img.naturalWidth}×${img.naturalHeight}. Drag the number fields to line the grid up with each frame.`);
}

function loadDefault(): void {
  const img = new Image();
  img.onload = () => onSource(img);
  img.onerror = () => setStatus('No default sheet at reference/sal_walk_source.png — use Upload.');
  img.src = `reference/sal_walk_source.png?ts=${Date.now()}`;
}

// ---- drawing --------------------------------------------------------------

function putRGBA(canvas: HTMLCanvasElement, img: RGBA, zoom: number, checker = true): void {
  const off = document.createElement('canvas');
  off.width = img.w; off.height = img.h;
  off.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(img.data), img.w, img.h), 0, 0);
  canvas.width = img.w * zoom; canvas.height = img.h * zoom;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  if (checker) { ctx.fillStyle = '#2a2620'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
}

function drawSource(): void {
  if (!srcImg || !src) return;
  const maxW = 520;
  const zoom = Math.min(1, maxW / src.w);
  srcCanvas.width = src.w * zoom; srcCanvas.height = src.h * zoom;
  const ctx = srcCanvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, srcCanvas.width, srcCanvas.height);
  ctx.drawImage(srcImg, 0, 0, srcCanvas.width, srcCanvas.height);
  // grid overlay
  ctx.lineWidth = 1;
  for (let r = 0; r < cfg.rows; r++)
    for (let c = 0; c < cfg.cols; c++) {
      const x = (cfg.offX + c * (cfg.cellW + cfg.spX)) * zoom;
      const y = (cfg.offY + r * (cfg.cellH + cfg.spY)) * zoom;
      const dir = (Object.keys(cfg.map) as Dir[]).find((d) => cfg.map[d].row === r);
      ctx.strokeStyle = dir ? { s: '#7dff9a', n: '#7fc8ff', w: '#ffd27a' }[dir] : 'rgba(255,255,255,0.35)';
      ctx.strokeRect(x, y, cfg.cellW * zoom, cfg.cellH * zoom);
      if (dir) { ctx.fillStyle = ctx.strokeStyle; ctx.font = '11px monospace'; ctx.fillText(dir.toUpperCase(), x + 2, y + 12); }
    }
}

let composed: ReturnType<typeof compose> | null = null;
function recompute(): void {
  if (!src) return;
  try { composed = compose(src, cfg); } catch (e) { setStatus(`Compose error: ${String(e)}`); return; }
  drawSource();
  putRGBA(sheetCanvas, composed.sheet, 5);
}

// ---- animated previews ----------------------------------------------------

const CYCLE = [0, 1, 2, 3];
let tick = 0;
function frameFor(dir: Dir, step: number): RGBA | null {
  const list = composed?.framesByDir[dir];
  if (!list || !list.length) return null;
  return list[CYCLE[step % CYCLE.length]! % list.length] ?? list[0]!;
}
function animate(): void {
  if (composed) {
    const step = Math.floor(tick / 18); // ~6–7 fps at 60fps loop
    putRGBA(anim.s, frameFor('s', step) ?? blank(), 5);
    putRGBA(anim.n, frameFor('n', step) ?? blank(), 5);
    putRGBA(anim.w, frameFor('w', step) ?? blank(), 5);
    const wf = frameFor('w', step);
    putRGBA(anim.e, wf ? flipX(wf) : blank(), 5); // East = mirrored West
  }
  tick++;
  requestAnimationFrame(animate);
}
function blank(): RGBA { return { w: cfg.fw, h: cfg.fh, data: new Uint8ClampedArray(cfg.fw * cfg.fh * 4) }; }
function flipX(img: RGBA): RGBA {
  const out: RGBA = { w: img.w, h: img.h, data: new Uint8ClampedArray(img.data.length) };
  for (let y = 0; y < img.h; y++)
    for (let x = 0; x < img.w; x++) {
      const si = (y * img.w + x) * 4; const di = (y * img.w + (img.w - 1 - x)) * 4;
      out.data[di] = img.data[si]!; out.data[di + 1] = img.data[si + 1]!; out.data[di + 2] = img.data[si + 2]!; out.data[di + 3] = img.data[si + 3]!;
    }
  return out;
}

// ---- controls -------------------------------------------------------------

function num(label: string, value: number, on: (v: number) => void, step = 1): HTMLElement {
  const wrap = document.createElement('label'); wrap.className = 'field';
  const span = document.createElement('span'); span.textContent = label;
  const inp = document.createElement('input'); inp.type = 'number'; inp.value = String(value); inp.step = String(step);
  inp.addEventListener('input', () => { on(Number(inp.value)); recompute(); });
  wrap.append(span, inp); return wrap;
}
function check(label: string, value: boolean, on: (v: boolean) => void): HTMLElement {
  const wrap = document.createElement('label'); wrap.className = 'check';
  const inp = document.createElement('input'); inp.type = 'checkbox'; inp.checked = value;
  inp.addEventListener('change', () => { on(inp.checked); recompute(); });
  wrap.append(inp, document.createTextNode(' ' + label)); return wrap;
}
function text(label: string, value: string, on: (v: string) => void): HTMLElement {
  const wrap = document.createElement('label'); wrap.className = 'field';
  const span = document.createElement('span'); span.textContent = label;
  const inp = document.createElement('input'); inp.type = 'text'; inp.value = value;
  inp.addEventListener('input', () => { on(inp.value); recompute(); });
  wrap.append(span, inp); return wrap;
}

function buildControls(): void {
  controls.replaceChildren();
  const grid = section('Grid (align boxes to frames)');
  grid.append(
    num('Cols', cfg.cols, (v) => (cfg.cols = Math.max(1, v | 0))),
    num('Rows', cfg.rows, (v) => (cfg.rows = Math.max(1, v | 0))),
    num('Cell W', cfg.cellW, (v) => (cfg.cellW = v | 0)),
    num('Cell H', cfg.cellH, (v) => (cfg.cellH = v | 0)),
    num('Offset X', cfg.offX, (v) => (cfg.offX = v | 0)),
    num('Offset Y', cfg.offY, (v) => (cfg.offY = v | 0)),
    num('Spacing X', cfg.spX, (v) => (cfg.spX = v | 0)),
    num('Spacing Y', cfg.spY, (v) => (cfg.spY = v | 0)),
  );
  const fitBtn = btn('Auto-fit grid', () => {
    if (!src) return;
    cfg.cellW = Math.floor((src.w - cfg.offX - (cfg.cols - 1) * cfg.spX) / cfg.cols);
    cfg.cellH = Math.floor((src.h - cfg.offY - (cfg.rows - 1) * cfg.spY) / cfg.rows);
    buildControls(); recompute();
  });
  grid.append(fitBtn);
  controls.append(grid);

  const dirs = section('Direction mapping (row + frame columns + flip)');
  for (const d of ['s', 'n', 'w'] as Dir[]) {
    const m = cfg.map[d];
    const lab = { s: 'S (front)', n: 'N (back)', w: 'W (side → mirror E)' }[d];
    const row = document.createElement('div'); row.className = 'dirrow';
    row.append(
      tag(lab),
      num('row', m.row, (v) => (m.row = v | 0)),
      text('cols', m.cols.join(','), (v) => (m.cols = v.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n)))),
      check('flip', m.flip, (v) => (m.flip = v)),
    );
    dirs.append(row);
  }
  controls.append(dirs);

  const target = section('Output frame');
  target.append(
    num('Frame W', cfg.fw, (v) => (cfg.fw = Math.max(1, v | 0))),
    num('Frame H', cfg.fh, (v) => (cfg.fh = Math.max(1, v | 0))),
    num('Head pad', cfg.padTop, (v) => (cfg.padTop = Math.max(0, v | 0))),
    check('Auto-trim transparent', cfg.trim, (v) => (cfg.trim = v)),
    check('Native res (no downscale)', cfg.native, (v) => (cfg.native = v)),
  );
  target.append(btn('Fit frame to content', () => {
    if (!composed) return;
    cfg.fw = composed.contentW + 12; cfg.fh = composed.contentH + 16;
    buildControls(); recompute();
  }));
  controls.append(target);

  const out = section('Export');
  out.append(
    btn('⬇ Download sal_walk.png', exportSheet),
    btn('⧉ Copy config JSON', () => void navigator.clipboard?.writeText(JSON.stringify(cfg, null, 2)).then(() => setStatus('Config copied — paste it back and I will bake it into tools/import-sal.ts.'))),
    btn('⬇ Download config', () => download('sal_walk.config.json', JSON.stringify(cfg, null, 2))),
  );
  controls.append(out);
}

function section(title: string): HTMLElement { const s = document.createElement('div'); s.className = 'section'; const h = document.createElement('h3'); h.textContent = title; s.append(h); return s; }
function tag(t: string): HTMLElement { const s = document.createElement('span'); s.className = 'dirtag'; s.textContent = t; return s; }
function btn(t: string, on: () => void): HTMLButtonElement { const b = document.createElement('button'); b.className = 'action'; b.textContent = t; b.addEventListener('click', on); return b; }

function exportSheet(): void {
  if (!composed) return;
  const c = document.createElement('canvas'); c.width = composed.sheet.w; c.height = composed.sheet.h;
  c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(composed.sheet.data), composed.sheet.w, composed.sheet.h), 0, 0);
  c.toBlob((b) => { if (b) downloadBlob('sal_walk.png', b); });
}
function download(name: string, txt: string): void { downloadBlob(name, new Blob([txt], { type: 'application/json' })); }
function downloadBlob(name: string, blob: Blob): void {
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// ---- wire up --------------------------------------------------------------

($('load-default') as HTMLButtonElement).addEventListener('click', loadDefault);
const file = $('upload') as HTMLInputElement;
file.addEventListener('change', () => {
  const f = file.files?.[0]; if (!f) return;
  const img = new Image(); img.onload = () => onSource(img); img.src = URL.createObjectURL(f);
});

buildControls();
loadDefault();
requestAnimationFrame(animate);
