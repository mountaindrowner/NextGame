/**
 * Convert PixelLab-generated NPC reference art into game-ready walk sheets and
 * scaled portraits (npm run import:npc-chars).
 *
 * Input per NPC (assets/reference/):
 *   <id>__south.png, __north.png, __west.png   — directional stills
 *   <id>_walk__f0.png … __f8.png               — 9-frame south walk cycle
 *   <id>_portrait.png                           — portrait bust
 *
 * Output per NPC (public/world/char/):
 *   <id>_walk.png        4-col × 3-row sheet (S/N/W × 4 frames)
 *   <id>_walk.meta.json  frame size, fps, origin for Phaser loader
 *   <id>_96.png          portrait scaled to 192px tall
 *
 *   npm run import:npc-chars            # all NPCs (idempotent: skips existing)
 *   npm run import:npc-chars -- --only boone
 *   npm run import:npc-chars -- --force # overwrite existing
 */
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const REF = join(ROOT, 'assets/reference');
const OUTDIR = join(ROOT, 'public/world/char');
const FPS = 8;
const MARGIN_X = 4, MARGIN_TOP = 6, MARGIN_BOTTOM = 4;
const TARGET_PORTRAIT_H = 192;

// All generated NPC ids — batch 1 (Ohmstead→Railhead) + batch 2 (Cistern→Chancel)
const ALL_NPC_IDS = [
  // Batch 1
  'boone', 'cass', 'odessa', 'odell', 'rivet', 'bex', 'mesa', 'cricket',
  'sully', 'rook', 'dusty', 'wade', 'junie', 'marrow', 'hettie', 'pax',
  'scrap_broker', 'salt_broker', 'card_sharp', 'holt',
  // Mabel (generated before batch tooling, same format)
  'mabel',
  // Batch 2
  'bloom', 'sela', 'mud_cole', 'weather_watcher', 'nursery_matron', 'seed_keeper',
  'hydromancer', 'stone', 'flint', 'knock_twice', 'doomsayer', 'gate_warden',
  'rationer', 'lookout', 'pike', 'reyes', 'conscript', 'base_scrapper',
  'deserter', 'sarge', 're_enlister', 'hale', 'cantor', 'brother_hum',
  'apostate', 'bell_keeper', 'reliquary_warden', 'confessor',
];

type P4 = [number, number, number, number];
const isBg = (p: P4): boolean => p[3] < 16;

function readPng(path: string): PNG | null {
  try { return PNG.sync.read(readFileSync(path)); } catch { return null; }
}

/**
 * Strip the flat grey [128,128,128] background that the animate-with-text-v3
 * walk frames come back with (the 4-direction stills are already transparent).
 * Border-seeded flood-fill so only edge-connected background is removed —
 * interior grey/silver pixels (armour, metal) survive untouched. Mutates img.
 */
function keyGreyBackground(img: PNG, tol = 24): void {
  const W = img.width, H = img.height;
  const isGrey = (x: number, y: number): boolean => {
    const i = (y * W + x) * 4;
    if (img.data[i + 3]! < 200) return false; // already transparent / translucent
    return Math.abs(img.data[i]! - 128) <= tol && Math.abs(img.data[i + 1]! - 128) <= tol && Math.abs(img.data[i + 2]! - 128) <= tol;
  };
  const seen = new Uint8Array(W * H);
  const stack: number[] = [];
  const push = (x: number, y: number): void => {
    if (x < 0 || y < 0 || x >= W || y >= H || seen[y * W + x] || !isGrey(x, y)) return;
    seen[y * W + x] = 1; stack.push(x, y);
  };
  for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
  for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
  while (stack.length) {
    const y = stack.pop()!, x = stack.pop()!;
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }
  for (let p = 0; p < seen.length; p++) if (seen[p]) img.data[p * 4 + 3] = 0;
}

function pixel(img: PNG, x: number, y: number): P4 {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return [0, 0, 0, 0];
  const i = (y * img.width + x) * 4;
  return [img.data[i]!, img.data[i + 1]!, img.data[i + 2]!, img.data[i + 3]!];
}

function putPixel(img: PNG, x: number, y: number, p: P4): void {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const i = (y * img.width + x) * 4;
  img.data[i] = p[0]; img.data[i + 1] = p[1]; img.data[i + 2] = p[2]; img.data[i + 3] = p[3];
}

interface BBox { x0: number; y0: number; x1: number; y1: number }

function bbox(img: PNG): BBox | null {
  let x0 = img.width, y0 = img.height, x1 = -1, y1 = -1;
  for (let y = 0; y < img.height; y++)
    for (let x = 0; x < img.width; x++)
      if (!isBg(pixel(img, x, y))) {
        if (x < x0) x0 = x; if (y < y0) y0 = y;
        if (x > x1) x1 = x; if (y > y1) y1 = y;
      }
  return x1 < 0 ? null : { x0, y0, x1, y1 };
}

function blitCrop(src: PNG, box: BBox, dst: PNG, dx: number, dy: number, flip: boolean): void {
  const w = box.x1 - box.x0 + 1, h = box.y1 - box.y0 + 1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const p = pixel(src, box.x0 + x, box.y0 + y);
      if (isBg(p)) continue;
      putPixel(dst, dx + (flip ? w - 1 - x : x), dy + y, p);
    }
}

function importWalkSheet(id: string): boolean {
  const south = readPng(join(REF, `${id}__south.png`));
  const north = readPng(join(REF, `${id}__north.png`));
  const west = readPng(join(REF, `${id}__west.png`));
  const walkFrames: Array<PNG | null> = [0, 2, 4, 6].map((n) => readPng(join(REF, `${id}_walk__f${n}.png`)));

  if (!south || !north || !west) {
    console.warn(`  ${id}: missing directional stills — skipping walk sheet`);
    return false;
  }

  // Walk frames carry a flat grey [128,128,128] background; the stills are already
  // transparent. Key the grey out of every frame (no-op on the transparent stills).
  for (const f of [south, north, west, ...walkFrames]) if (f) keyGreyBackground(f);

  // find global tight bounds across all frames we'll use
  const allImgs: PNG[] = [south, north, west, ...walkFrames.filter(Boolean) as PNG[]];
  let globalW = 0, globalH = 0;
  for (const img of allImgs) {
    const b = bbox(img);
    if (b) {
      globalW = Math.max(globalW, b.x1 - b.x0 + 1);
      globalH = Math.max(globalH, b.y1 - b.y0 + 1);
    }
  }
  if (!globalW || !globalH) { console.warn(`  ${id}: all frames empty — skipping`); return false; }

  const FW = globalW + MARGIN_X * 2;
  const FH = globalH + MARGIN_TOP + MARGIN_BOTTOM;
  const feetY = FH - MARGIN_BOTTOM;
  const COLS = 4, ROWS = 3;

  const sheet = new PNG({ width: FW * COLS, height: FH * ROWS });
  sheet.data.fill(0);

  // helper: blit one source frame into sheet column `col`, row `row`
  const blitFrame = (src: PNG, col: number, row: number, flip = false): void => {
    const b = bbox(src);
    if (!b) return;
    const cw = b.x1 - b.x0 + 1, ch = b.y1 - b.y0 + 1;
    const dx = col * FW + Math.round((FW - cw) / 2);
    const dy = row * FH + (feetY - ch);
    blitCrop(src, b, sheet, dx, dy, flip);
  };

  // Row 0 — south (walk frames f0, f2, f4, f6; fallback to still if frame missing)
  for (let c = 0; c < 4; c++) blitFrame(walkFrames[c] ?? south, c, 0);
  // Row 1 — north (still repeated × 4)
  for (let c = 0; c < 4; c++) blitFrame(north, c, 1);
  // Row 2 — west (still repeated × 4; flip so character faces left)
  for (let c = 0; c < 4; c++) blitFrame(west, c, 2, true);

  writeFileSync(join(OUTDIR, `${id}_walk.png`), PNG.sync.write(sheet));
  const meta = { frameW: FW, frameH: FH, cols: COLS, rows: ROWS, fps: FPS, originY: feetY / FH, contentH: globalH };
  writeFileSync(join(OUTDIR, `${id}_walk.meta.json`), JSON.stringify(meta));
  console.log(`  ${id}_walk: ${FW}x${FH} frames, sheet ${sheet.width}x${sheet.height}`);
  return true;
}

function importPortrait(id: string): boolean {
  const src = readPng(join(REF, `${id}_portrait.png`));
  if (!src) { console.warn(`  ${id}: no portrait — skipping`); return false; }

  // trim to opaque art
  let x0 = src.width, y0 = src.height, x1 = -1, y1 = -1;
  for (let y = 0; y < src.height; y++)
    for (let x = 0; x < src.width; x++)
      if (src.data[(y * src.width + x) * 4 + 3]! >= 16) {
        if (x < x0) x0 = x; if (y < y0) y0 = y;
        if (x > x1) x1 = x; if (y > y1) y1 = y;
      }
  if (x1 < 0) { console.warn(`  ${id}: portrait is blank — skipping`); return false; }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;

  const scale = TARGET_PORTRAIT_H / bh;
  const ow = Math.max(1, Math.round(bw * scale));
  const out = new PNG({ width: ow, height: TARGET_PORTRAIT_H });
  out.data.fill(0);

  // premultiplied-alpha box filter (same as import-portraits.ts)
  for (let ty = 0; ty < TARGET_PORTRAIT_H; ty++)
    for (let tx = 0; tx < ow; tx++) {
      const sx0 = x0 + Math.floor(tx / scale), sx1 = x0 + Math.max(Math.floor((tx + 1) / scale), Math.floor(tx / scale) + 1);
      const sy0 = y0 + Math.floor(ty / scale), sy1 = y0 + Math.max(Math.floor((ty + 1) / scale), Math.floor(ty / scale) + 1);
      let pr = 0, pg = 0, pb = 0, pa = 0, n = 0;
      for (let sy = sy0; sy < sy1 && sy <= y1; sy++)
        for (let sx = sx0; sx < sx1 && sx <= x1; sx++) {
          const i = (sy * src.width + sx) * 4;
          const al = src.data[i + 3]! / 255;
          pr += src.data[i]! * al; pg += src.data[i + 1]! * al; pb += src.data[i + 2]! * al;
          pa += src.data[i + 3]!; n++;
        }
      if (!n) continue;
      const avgA = pa / n;
      const o = (ty * ow + tx) * 4;
      out.data[o + 3] = Math.round(avgA);
      if (avgA > 0) {
        const k = 255 / (avgA * n);
        out.data[o] = Math.min(255, Math.round(pr * k));
        out.data[o + 1] = Math.min(255, Math.round(pg * k));
        out.data[o + 2] = Math.min(255, Math.round(pb * k));
      }
    }

  writeFileSync(join(OUTDIR, `${id}_96.png`), PNG.sync.write(out));
  console.log(`  ${id}_96.png: ${bw}x${bh} → ${ow}x${TARGET_PORTRAIT_H}`);
  return true;
}

function main(): void {
  const onlyArg = (() => { const i = process.argv.indexOf('--only'); return i >= 0 ? process.argv[i + 1] : undefined; })();
  const force = process.argv.includes('--force');
  const ids = onlyArg ? ALL_NPC_IDS.filter((id) => id === onlyArg) : ALL_NPC_IDS;
  if (onlyArg && !ids.length) throw new Error(`Unknown NPC id: ${onlyArg}`);

  let walk = 0, portraits = 0, skipped = 0;
  for (const id of ids) {
    const walkOut = join(OUTDIR, `${id}_walk.png`);
    const portOut = join(OUTDIR, `${id}_96.png`);
    const hasWalk = existsSync(walkOut) && existsSync(join(OUTDIR, `${id}_walk.meta.json`));
    const hasPort = existsSync(portOut);

    if (!force && hasWalk && hasPort) { console.log(`  ${id}: already imported — skip (--force to overwrite)`); skipped++; continue; }
    console.log(`${id}:`);
    if (force || !hasWalk) { if (importWalkSheet(id)) walk++; }
    if (force || !hasPort) { if (importPortrait(id)) portraits++; }
  }
  console.log(`\nDone. Walk sheets: ${walk}, portraits: ${portraits}, skipped: ${skipped}.`);
}

main();
