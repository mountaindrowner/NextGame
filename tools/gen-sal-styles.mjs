/**
 * SAL in seven art styles, each drawn from a different game genre, via
 * PixelLab's Pro character endpoint (8 directions, style-guided).
 *   node tools/gen-sal-styles.mjs [styleId ...]
 * Writes assets/reference/styles/sal_<id>__<dir>.png + sal_<id>.prompt.json.
 * Style homages are described, never named (IP guardrail).
 */
import { writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/reference/styles');
const API = 'https://api.pixellab.ai/v2';
const KEY = process.env.PIXELLAB_API_KEY;
if (!KEY) throw new Error('PIXELLAB_API_KEY not set');
const H = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

const SAL = 'SAL, a teenage boy, young scavenger hero of a post-collapse Texas: messy brown hair under a worn leather cap with brass goggles pushed up on the brow, red bandana at the neck, scuffed tan work jacket with a shearling collar, denim trousers with patched knee pads, worn brown boots, a small tool pouch on the belt, determined hopeful face';

export const STYLES = {
  hd2d: { size: 64, label: 'HD-2D diorama RPG', style: 'modern HD-2D diorama JRPG sprite: about 3.5 heads tall, rich hue-shifted shading with soft warm rim light, selective dark outline, painterly pixel clusters, grounded earthy palette with warm highlights, tasteful detail' },
  snes: { size: 48, label: '16-bit console JRPG', style: 'classic 1990s 16-bit console RPG overworld sprite: compact 2.5-heads-tall chibi, clean black outline, limited 16-colour palette, crisp cel shading, bright readable colours, iconic simple shapes', max: 16 },
  handheld: { size: 48, label: 'Handheld monster-tamer', style: 'early-2000s handheld monster-collecting adventure overworld sprite: very compact 2-heads-tall chibi, thick dark outline, three tones per material, bright clean saturated palette, big head, simple readable shapes', max: 14 },
  tactics: { size: 80, label: 'Tactics RPG', style: 'classic tactics RPG unit sprite: slender realistic proportions about 6 heads tall, muted watercolour-like earth palette, soft dithered shading, thin dark brown outline, mature serious tone, delicate detail' },
  indie: { size: 64, label: 'Indie action-adventure', style: 'modern indie action-adventure pixel art: chunky stylized proportions, big bold readable silhouette, saturated colours, lineless with strong graphic light and shadow shapes, expressive and punchy' },
  survival: { size: 80, label: 'Gritty survival', style: 'gritty post-apocalyptic survival game sprite: realistic proportions, heavy grime, dust and wear, desaturated rust-and-dust palette, harsh top light, detailed fabric folds, dark selective outline' },
  cozy: { size: 48, label: 'Cozy life-sim', style: 'cozy farming life-sim sprite: round soft shapes, 2.5 heads tall, warm gentle pastel-leaning palette, soft dark outline, gentle simple shading, friendly and charming' },
};

async function balance() {
  const j = await (await fetch(`${API}/balance`, { headers: H })).json();
  return j.subscription?.generations ?? NaN;
}

function rgbaToPng(img) {
  const p = new PNG({ width: img.width, height: img.height });
  Buffer.from(img.base64, 'base64').copy(p.data);
  return PNG.sync.write(p);
}
function toPngBuffer(img) {
  if (!img) return null;
  if (img.type === 'rgba_bytes' || (img.width && img.height && !img.format)) return rgbaToPng(img);
  return Buffer.from(img.base64, 'base64');
}

async function poll(id, label) {
  for (let i = 0; i < 150; i++) {
    const j = await (await fetch(`${API}/background-jobs/${id}`, { headers: H })).json();
    if (j.status && j.status !== 'processing' && j.status !== 'queued' && j.status !== 'pending') {
      if (j.status !== 'completed') throw new Error(`${label}: ${j.status} ${JSON.stringify(j).slice(0, 400)}`);
      return j;
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error(`${label}: timed out`);
}

/** Pull a persisted character's 8 rotations via its zip (the CDN host is
 *  not reachable from every environment; the API is). */
async function download(id, cid) {
  const zip = Buffer.from(await (await fetch(`${API}/characters/${cid}/zip`, { headers: H })).arrayBuffer());
  const dir = join(OUT, `.zip_${id}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'c.zip'), zip);
  execFileSync('unzip', ['-o', '-q', join(dir, 'c.zip'), '-d', dir]);
  const written = [];
  for (const f of readdirSync(join(dir, 'Idle/rotations'))) {
    const d = f.replace('.png', '');
    copyFileSync(join(dir, 'Idle/rotations', f), join(OUT, `sal_${id}__${d}.png`));
    written.push(d);
  }
  rmSync(dir, { recursive: true, force: true });
  return written;
}

async function run(id) {
  const s = STYLES[id];
  const body = {
    description: SAL, style_description: s.style, method: 'create_with_style', view: 'low top-down',
    image_size: { width: s.size, height: s.size }, no_background: true,
    ...(s.max ? { target_palette: { max_colors: s.max } } : {}),
  };
  const res = await fetch(`${API}/create-character-pro`, { method: 'POST', headers: H, body: JSON.stringify(body) });
  const sub = await res.json();
  if (!sub.background_job_id) throw new Error(`${id}: ${JSON.stringify(sub).slice(0, 400)}`);
  const job = await poll(sub.background_job_id, id);
  const last = job.last_response ?? {};
  writeFileSync(join(OUT, `sal_${id}.job.json`), JSON.stringify({ keys: Object.keys(last), character_id: sub.character_id ?? last.character_id }, null, 2));
  const cid = sub.character_id ?? last.character_id;
  const written = await download(id, cid);
  writeFileSync(join(OUT, `sal_${id}.prompt.json`), JSON.stringify({ source: 'pixellab', endpoint: 'v2/create-character-pro', label: s.label, body, character_id: sub.character_id ?? last.character_id, directions: written, at: new Date().toISOString() }, null, 2));
  return `${id}: ${written.length} dirs (${written.join(',')}) keys=${Object.keys(last).join(',')}`;
}

mkdirSync(OUT, { recursive: true });
if (process.argv[2] === '--fetch') {
  console.log(await download(process.argv[3], process.argv[4]));
  process.exit(0);
}
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(STYLES);
const before = await balance();
console.log(`balance before: ${before}`);
const results = await Promise.allSettled(ids.map(run));
for (const r of results) console.log(r.status === 'fulfilled' ? r.value : `FAILED ${r.reason}`);
const after = await balance();
console.log(`used ${before - after} generations, remaining ${after}`);
