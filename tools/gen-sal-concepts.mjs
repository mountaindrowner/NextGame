/**
 * SAL style concepts, one PixelLab generate-image-v2 call per game genre
 * (each call returns a grid of variants). Front-facing stills for choosing a
 * direction; the pick is then rotated to 8 directions.
 *   node tools/gen-sal-concepts.mjs [styleId ...]
 * Writes assets/reference/styles/concepts/sal_<id>_<n>.png + sal_<id>.prompt.json
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/reference/styles/concepts');
const API = 'https://api.pixellab.ai/v2';
const H = { Authorization: `Bearer ${process.env.PIXELLAB_API_KEY}`, 'Content-Type': 'application/json' };

const SAL = 'SAL, a teenage boy scavenger hero of post-collapse Texas: messy brown hair, worn leather cap with brass goggles pushed up, red bandana, tan work jacket with shearling collar, patched denim trousers, worn boots, tool pouch on belt';
const TAIL = 'single character, full body, standing, facing the viewer, game sprite, transparent background';

const STYLES = {
  hd2d: { size: 64, style: 'HD-2D diorama RPG character sprite, about 3.5 heads tall, rich hue-shifted shading, warm rim light, selective outline, detailed painterly pixel clusters' },
  snes: { size: 48, style: '1990s 16-bit console JRPG overworld sprite, chibi 2.5 heads tall, bold black outline, limited palette, crisp cel shading' },
  handheld: { size: 32, style: 'early 2000s handheld monster-catching RPG overworld sprite, tiny chibi 2 heads tall, thick black outline, bright clean saturated colours, very simple shapes' },
  tactics: { size: 80, style: 'classic tactics RPG unit sprite, slender realistic 6 heads tall, muted watercolour earth tones, soft dithered shading, thin brown outline, serious mature tone' },
  indie: { size: 64, style: 'modern indie action-adventure pixel art, chunky stylized proportions, bold graphic shapes, saturated colours, lineless, strong flat light and shadow shapes' },
  survival: { size: 96, style: 'gritty realistic post-apocalyptic survival game sprite, realistic proportions, heavy grime and dust, desaturated rust palette, harsh light, detailed fabric folds' },
  cozy: { size: 48, style: 'cozy farming life-sim sprite, round soft cute shapes, big head, warm pastel palette, soft dark outline, gentle shading, charming' },
  anime: { size: 96, style: 'high-resolution anime action RPG sprite, expressive large eyes, dynamic hair, clean anime cel shading with sharp highlights, vivid colours, crisp outline' },
};

const toPng = (img) => {
  const raw = Buffer.from(img.base64, 'base64');
  if (raw.subarray(0, 4).toString('hex') === '89504e47') return raw; // already a PNG
  if (img.width && img.height) {
    const p = new PNG({ width: img.width, height: img.height });
    Buffer.from(img.base64, 'base64').copy(p.data);
    return PNG.sync.write(p);
  }
  return Buffer.from(img.base64, 'base64');
};
const balance = async () => (await (await fetch(`${API}/balance`, { headers: H })).json()).subscription?.generations;

async function run(id) {
  const s = STYLES[id];
  const body = { description: `${SAL}. ${s.style}. ${TAIL}`, image_size: { width: s.size, height: s.size }, no_background: true };
  const sub = await (await fetch(`${API}/generate-image-v2`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json();
  if (!sub.background_job_id) throw new Error(`${id}: ${JSON.stringify(sub).slice(0, 300)}`);
  for (let i = 0; i < 120; i++) {
    const j = await (await fetch(`${API}/background-jobs/${sub.background_job_id}`, { headers: H })).json();
    if (j.status === 'completed') {
      const imgs = j.last_response?.images ?? [];
      imgs.forEach((img, n) => writeFileSync(join(OUT, `sal_${id}_${String(n).padStart(2, '0')}.png`), toPng(img)));
      writeFileSync(join(OUT, `sal_${id}.prompt.json`), JSON.stringify({ source: 'pixellab', endpoint: 'v2/generate-image-v2', body, count: imgs.length, at: new Date().toISOString() }, null, 2));
      return `${id}: ${imgs.length} images`;
    }
    if (j.status && !['processing', 'queued', 'pending'].includes(j.status)) throw new Error(`${id}: ${j.status} ${JSON.stringify(j).slice(0, 300)}`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error(`${id}: timeout`);
}

mkdirSync(OUT, { recursive: true });
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(STYLES);
const before = await balance();
for (const r of await Promise.allSettled(ids.map(run))) console.log(r.status === 'fulfilled' ? r.value : `FAILED ${r.reason}`);
const after = await balance();
console.log(`used ${before - after} generations, remaining ${after}`);
