/**
 * PixelLab v2 — character (4-direction) + animation client (npm run pixellab:char).
 *
 * Extends the single-image v1 client (tools/pixellab.ts) to the job-based v2
 * endpoints that produce game characters and their frames:
 *   - create-character-with-4-directions  → S/E/N/W rotation (1 generation)
 *   - animate-with-text-v3                 → a walk/idle/run frame strip
 *
 * Both are async: POST returns a background_job_id; we poll
 * /v2/background-jobs/{id} until status=completed, then pull the images
 * (raw rgba_bytes) out of last_response and wrap them to PNG. Every result
 * carries billing usage in *generations*; we print the running balance so the
 * credit budget stays visible (project rule: flag before nearing the cap).
 *
 *   npm run pixellab:char -- character --desc "warm elderly woman, grey bun, round glasses, apron" --out mabel --size 64
 *   npm run pixellab:char -- animate   --in assets/reference/mabel__south.png --action walk --out mabel_walk
 *
 * Key from PIXELLAB_API_KEY (env secret or gitignored .env). Never commit it.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;
const OUTDIR = join(ROOT, 'assets/reference');
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

/** A raw rgba_bytes image as PixelLab's character endpoint returns it. */
interface RgbaImg { type: string; base64: string; width: number; height: number }
/** A ready PNG frame as the animation endpoint returns it. */
interface PngImg { type: 'base64'; base64: string; format: string }

function rgbaToPngBuffer(img: RgbaImg): Buffer {
  const raw = Buffer.from(img.base64, 'base64');
  const p = new PNG({ width: img.width, height: img.height });
  raw.copy(p.data);
  return PNG.sync.write(p);
}
function pngFileToBase64(path: string): { b64: string; width: number; height: number } {
  const buf = readFileSync(path);
  const png = PNG.sync.read(buf);
  return { b64: buf.toString('base64'), width: png.width, height: png.height };
}

async function pollJob(jobId: string, label: string): Promise<Record<string, unknown>> {
  for (let i = 0; i < 90; i++) {
    const j = (await (await fetch(`${API}/v2/background-jobs/${jobId}`, { headers: H })).json()) as {
      status?: string; last_response?: Record<string, unknown> & { progress?: number };
    };
    const st = j.status;
    const pr = (j.last_response?.progress as number | undefined);
    if (i % 4 === 0) process.stdout.write(`\r  ${label}: ${st} ${pr != null ? `${Math.round(pr * 100)}%` : ''}        `);
    if (st && st !== 'processing') {
      process.stdout.write('\n');
      if (st !== 'completed') throw new Error(`${label} job ${st}: ${JSON.stringify(j.last_response).slice(0, 300)}`);
      return j.last_response ?? {};
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  throw new Error(`${label}: timed out`);
}

/** Pack a set of named rgba images into one horizontal sheet (PNG buffer). */
function packSheet(imgs: RgbaImg[]): Buffer {
  const w = imgs[0]!.width, h = imgs[0]!.height;
  const sheet = new PNG({ width: w * imgs.length, height: h });
  imgs.forEach((img, idx) => {
    const src = PNG.sync.read(rgbaToPngBuffer(img));
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const si = (y * w + x) * 4, di = (y * sheet.width + (idx * w + x)) * 4;
      sheet.data[di] = src.data[si]!; sheet.data[di + 1] = src.data[si + 1]!;
      sheet.data[di + 2] = src.data[si + 2]!; sheet.data[di + 3] = src.data[si + 3]!;
    }
  });
  return PNG.sync.write(sheet);
}

/** Pack already-PNG frames (animation output) into one horizontal strip. */
function packPngFrames(frames: PngImg[]): Buffer {
  const pngs = frames.map((f) => PNG.sync.read(Buffer.from(f.base64, 'base64')));
  const w = pngs[0]!.width, h = pngs[0]!.height;
  const strip = new PNG({ width: w * pngs.length, height: h });
  pngs.forEach((src, idx) => {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const si = (y * w + x) * 4, di = (y * strip.width + (idx * w + x)) * 4;
      strip.data[di] = src.data[si]!; strip.data[di + 1] = src.data[si + 1]!;
      strip.data[di + 2] = src.data[si + 2]!; strip.data[di + 3] = src.data[si + 3]!;
    }
  });
  return PNG.sync.write(strip);
}

async function character(): Promise<void> {
  const desc = arg('desc'); const out = arg('out');
  if (!desc || !out) throw new Error('usage: character --desc "<text>" --out <name> [--size 64]');
  const size = parseInt(arg('size', '64')!, 10);
  const before = await balance();
  console.log(`PixelLab character: "${desc}" (${size}px, 4 dirs) → ${out}`);
  const sub = (await (await fetch(`${API}/v2/create-character-with-4-directions`, {
    method: 'POST', headers: H, body: JSON.stringify({ description: desc, image_size: { width: size, height: size } }),
  })).json()) as { background_job_id?: string; character_id?: string; detail?: unknown };
  if (!sub.background_job_id) throw new Error(`no job id: ${JSON.stringify(sub).slice(0, 300)}`);
  const last = await pollJob(sub.background_job_id, 'rotation');
  const images = last.images as Record<'south' | 'east' | 'north' | 'west', RgbaImg>;
  mkdirSync(OUTDIR, { recursive: true });
  for (const dir of ['south', 'east', 'north', 'west'] as const) writeFileSync(join(OUTDIR, `${out}__${dir}.png`), rgbaToPngBuffer(images[dir]));
  writeFileSync(join(OUTDIR, `${out}__rotation.png`), packSheet([images.south, images.east, images.north, images.west]));
  writeFileSync(join(OUTDIR, `${out}.char.json`), JSON.stringify({ source: 'pixellab', endpoint: 'create-character-with-4-directions', description: desc, size, character_id: sub.character_id, at: new Date().toISOString() }, null, 2));
  const after = await balance();
  console.log(`wrote ${out}__{south,east,north,west}.png + ${out}__rotation.png  | generations used: ${(before - after).toFixed(0)}, remaining: ${after}`);
}

async function animate(): Promise<void> {
  const inPath = arg('in'); const out = arg('out'); const action = arg('action', 'walk')!;
  if (!inPath || !out) throw new Error('usage: animate --in <first_frame.png> --action walk --out <name>');
  const before = await balance();
  const { b64 } = pngFileToBase64(inPath.startsWith('/') ? inPath : join(ROOT, inPath));
  console.log(`PixelLab animate: "${action}" from ${inPath} → ${out}`);
  const sub = (await (await fetch(`${API}/v2/animate-with-text-v3`, {
    method: 'POST', headers: H, body: JSON.stringify({ first_frame: { type: 'base64', base64: b64 }, action }),
  })).json()) as { background_job_id?: string; detail?: unknown };
  if (!sub.background_job_id) throw new Error(`no job id: ${JSON.stringify(sub).slice(0, 400)}`);
  const last = await pollJob(sub.background_job_id, 'animate');
  // the animation endpoint returns an array of ready PNG frames in `images`
  const frames = ((last as { images?: PngImg[] }).images ?? []).filter((f) => f && f.base64);
  if (!frames.length) throw new Error(`no frames in response: ${JSON.stringify(last).slice(0, 300)}`);
  mkdirSync(OUTDIR, { recursive: true });
  frames.forEach((f, i) => writeFileSync(join(OUTDIR, `${out}__f${i}.png`), Buffer.from(f.base64, 'base64')));
  writeFileSync(join(OUTDIR, `${out}__strip.png`), packPngFrames(frames));
  writeFileSync(join(OUTDIR, `${out}.anim.json`), JSON.stringify({ source: 'pixellab', endpoint: 'animate-with-text-v3', action, from: inPath, frames: frames.length, at: new Date().toISOString() }, null, 2));
  const after = await balance();
  console.log(`animate: ${frames.length} frames → ${out}__strip.png  | generations used: ${(before - after).toFixed(0)}, remaining: ${after}`);
}

const mode = process.argv[2];
(mode === 'character' ? character() : mode === 'animate' ? animate() : Promise.reject(new Error('usage: pixellab:char <character|animate> ...')))
  .catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1); });
