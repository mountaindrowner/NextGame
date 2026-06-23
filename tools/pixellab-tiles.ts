/**
 * PixelLab v2 — top-down Wang tileset client (npm run pixellab:tiles).
 *
 * Generates a seamless terrain tileset via /v2/create-tileset: a lower terrain
 * (e.g. grass) and an upper terrain (e.g. dirt path) with auto transitions —
 * 16 Wang tiles covering every corner combination, at the game's native 32px.
 * Async: POST returns a background_job_id + tileset_id; we poll the job, then
 * GET /v2/tilesets/{id} for the tile images (base64) + corner metadata used to
 * assemble maps. Billing is in *generations*; the running balance is printed so
 * the credit budget stays visible (project rule: flag before nearing the cap).
 *
 *   npm run pixellab:tiles -- --lower "lush prairie grass" --upper "packed dirt path" \
 *     --transition "grass tufts at the dirt edge" --out field_grass_dirt --size 32
 *
 * Key from PIXELLAB_API_KEY (env secret or gitignored .env). Never commit it.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;
const API = 'https://api.pixellab.ai';

function apiKey(): string {
  if (process.env.PIXELLAB_API_KEY) return process.env.PIXELLAB_API_KEY;
  const envPath = join(ROOT, '.env');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*PIXELLAB_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1]!.replace(/^["']|["']$/g, '');
    }
  }
  throw new Error('PIXELLAB_API_KEY not set (env secret or gitignored .env).');
}
const KEY = apiKey();
const H = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

async function balance(): Promise<number> {
  const j = (await (await fetch(`${API}/v2/balance`, { headers: { Authorization: `Bearer ${KEY}` } })).json()) as {
    subscription?: { generations?: number };
  };
  return j.subscription?.generations ?? NaN;
}

async function pollJob(jobId: string, label: string): Promise<void> {
  for (let i = 0; i < 120; i++) {
    const j = (await (await fetch(`${API}/v2/background-jobs/${jobId}`, { headers: H })).json()) as {
      status?: string; last_response?: { progress?: number };
    };
    const st = j.status;
    const pr = j.last_response?.progress;
    if (i % 3 === 0) process.stdout.write(`\r  ${label}: ${st ?? '?'} ${pr != null ? `${Math.round(pr * 100)}%` : ''}        `);
    if (st && st !== 'processing' && st !== 'pending') {
      process.stdout.write('\n');
      if (st !== 'completed') throw new Error(`${label} job ${st}: ${JSON.stringify(j.last_response).slice(0, 300)}`);
      return;
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  throw new Error(`${label}: timed out`);
}

interface Base64Image { type: string; base64: string; width?: number; height?: number }
interface Tile {
  id: string; name?: string; image: Base64Image;
  corners?: unknown; pattern_4x4?: unknown; original_position?: unknown;
}

/** Decode a Base64Image to a PNG buffer — handle both PNG-base64 and raw rgba_bytes. */
function imgToPng(img: Base64Image, w: number, h: number): Buffer {
  const raw = Buffer.from(img.base64, 'base64');
  try {
    PNG.sync.read(raw); // already a PNG?
    return raw;
  } catch {
    const p = new PNG({ width: img.width ?? w, height: img.height ?? h });
    raw.copy(p.data);
    return PNG.sync.write(p);
  }
}

/** Pack tiles into a contact sheet grid (cols wide), scaled up Z× for viewing. */
function contactSheet(pngs: PNG[], cols: number, z: number): Buffer {
  const tw = pngs[0]!.width, th = pngs[0]!.height, pad = 2;
  const rows = Math.ceil(pngs.length / cols);
  const cw = tw * z + pad, ch = th * z + pad;
  const out = new PNG({ width: cols * cw + pad, height: rows * ch + pad });
  for (let i = 0; i < out.data.length; i += 4) { out.data[i] = 32; out.data[i + 1] = 34; out.data[i + 2] = 40; out.data[i + 3] = 255; }
  pngs.forEach((src, idx) => {
    const ox = pad + (idx % cols) * cw, oy = pad + Math.floor(idx / cols) * ch;
    for (let y = 0; y < th; y++) for (let x = 0; x < tw; x++) {
      const si = (y * tw + x) * 4; const a = src.data[si + 3]! / 255;
      for (let zy = 0; zy < z; zy++) for (let zx = 0; zx < z; zx++) {
        const di = ((oy + y * z + zy) * out.width + (ox + x * z + zx)) * 4;
        for (let k = 0; k < 3; k++) out.data[di + k] = Math.round(src.data[si + k]! * a + out.data[di + k]! * (1 - a));
        out.data[di + 3] = 255;
      }
    }
  });
  return PNG.sync.write(out);
}

/** Flat individual tiles via /v2/create-tiles-pro (numbered description → set of 32px tiles). */
async function proMode(): Promise<void> {
  const desc = arg('desc'); const out = arg('out');
  if (!desc || !out) throw new Error('usage: pro --desc "1. grass. 2. dirt path. ..." --out <name> [--size 32] [--view top-down]');
  const size = parseInt(arg('size', '32')!, 10);
  const view = arg('view', 'high top-down')!;
  const outDir = join(ROOT, 'assets/tiles-pixellab', out);

  const before = await balance();
  console.log(`PixelLab tiles-pro: "${desc.slice(0, 80)}..." (${size}px, ${view}) → ${out}  [balance ${before}]`);
  const sub = (await (await fetch(`${API}/v2/create-tiles-pro`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ description: desc, tile_size: size, tile_view: view }),
  })).json()) as { background_job_id?: string; tile_id?: string; detail?: unknown };
  if (!sub.background_job_id || !sub.tile_id) throw new Error(`no job/tile id: ${JSON.stringify(sub).slice(0, 400)}`);
  await pollJob(sub.background_job_id, 'tiles-pro');

  const data = (await (await fetch(`${API}/v2/tiles-pro/${sub.tile_id}`, { headers: H })).json()) as {
    storage_urls?: Record<string, string>;
  };
  const urls = Object.entries(data.storage_urls ?? {}).filter(([, v]) => typeof v === 'string' && v.startsWith('http'));
  if (!urls.length) throw new Error(`no tile urls: ${JSON.stringify(data).slice(0, 300)}`);

  mkdirSync(outDir, { recursive: true });
  const pngs: PNG[] = [];
  for (const [name, url] of urls) {
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    writeFileSync(join(outDir, `${name}.png`), buf);
    try { pngs.push(PNG.sync.read(buf)); } catch { /* skip non-PNG */ }
  }
  if (pngs.length) writeFileSync(join(outDir, '_contact.png'), contactSheet(pngs, Math.min(8, pngs.length), 4));
  writeFileSync(join(outDir, 'tiles.json'), JSON.stringify({ source: 'pixellab', endpoint: 'create-tiles-pro', description: desc, size, view, tile_id: sub.tile_id, count: urls.length, at: new Date().toISOString() }, null, 2));
  const after = await balance();
  console.log(`wrote ${urls.length} tiles + _contact.png → assets/tiles-pixellab/${out}/  | gen balance ${before}→${after} (tiles-pro may bill in USD)`);
}

async function main(): Promise<void> {
  const lower = arg('lower'); const upper = arg('upper'); const out = arg('out');
  if (!lower || !upper || !out) throw new Error('usage: --lower "<terrain>" --upper "<terrain>" --out <name> [--transition "..."] [--size 32] [--view "high top-down"]');
  const transition = arg('transition', '')!;
  const size = parseInt(arg('size', '32')!, 10);
  const view = arg('view', 'high top-down')!;
  const outDir = join(ROOT, 'assets/tiles-pixellab', out);

  const before = await balance();
  console.log(`PixelLab tileset: lower="${lower}" upper="${upper}" (${size}px, ${view}) → ${out}  [balance ${before}]`);
  const sub = (await (await fetch(`${API}/v2/create-tileset`, {
    method: 'POST', headers: H,
    body: JSON.stringify({
      lower_description: lower, upper_description: upper, transition_description: transition,
      tile_size: { width: size, height: size }, view, transition_size: transition ? 0.25 : 0,
    }),
  })).json()) as { background_job_id?: string; tileset_id?: string; detail?: unknown };
  if (!sub.background_job_id || !sub.tileset_id) throw new Error(`no job/tileset id: ${JSON.stringify(sub).slice(0, 400)}`);
  await pollJob(sub.background_job_id, 'tileset');

  const data = (await (await fetch(`${API}/v2/tilesets/${sub.tileset_id}`, { headers: H })).json()) as {
    tileset?: { total_tiles?: number; tiles?: Tile[] }; metadata?: unknown;
  };
  const tiles = data.tileset?.tiles ?? [];
  if (!tiles.length) throw new Error(`no tiles returned: ${JSON.stringify(data).slice(0, 300)}`);

  mkdirSync(outDir, { recursive: true });
  const pngs: PNG[] = [];
  tiles.forEach((t, i) => {
    const buf = imgToPng(t.image, size, size);
    const name = `tile_${String(i).padStart(2, '0')}_${t.id ?? t.name ?? i}`.replace(/[^\w]+/g, '_');
    writeFileSync(join(outDir, `${name}.png`), buf);
    pngs.push(PNG.sync.read(buf));
  });
  writeFileSync(join(outDir, '_contact.png'), contactSheet(pngs, 4, 4));
  writeFileSync(join(outDir, 'tileset.json'), JSON.stringify({
    source: 'pixellab', endpoint: 'create-tileset', lower, upper, transition, size, view,
    tileset_id: sub.tileset_id, total: tiles.length,
    tiles: tiles.map((t) => ({ id: t.id, name: t.name, corners: t.corners, pattern_4x4: t.pattern_4x4, original_position: t.original_position })),
    metadata: data.metadata, at: new Date().toISOString(),
  }, null, 2));

  const after = await balance();
  console.log(`wrote ${tiles.length} tiles + _contact.png → assets/tiles-pixellab/${out}/  | generations used: ${(before - after).toFixed(0)}, remaining: ${after}`);
}

const entry = process.argv[2] === 'pro' ? proMode() : main();
entry.catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1); });
