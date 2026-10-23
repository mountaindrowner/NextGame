/**
 * Rotate a single front-facing concept into 8 directions (PixelLab Pro,
 * method rotate_character).  node tools/rotate-style.mjs <in.png> <outId> <size>
 * Writes assets/reference/styles/sal_<outId>__<dir>.png + prompt json.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/reference/styles');
const API = 'https://api.pixellab.ai/v2';
const H = { Authorization: `Bearer ${process.env.PIXELLAB_API_KEY}`, 'Content-Type': 'application/json' };
const [inPath, id, size = '64'] = process.argv.slice(2);
const SAL = 'SAL, a teenage boy scavenger hero: messy brown hair, worn leather cap with brass goggles pushed up, red bandana, tan work jacket with shearling collar, patched denim trousers, worn boots, tool pouch on belt';

const bal = async () => (await (await fetch(`${API}/balance`, { headers: H })).json()).subscription?.generations;
const before = await bal();
const body = {
  description: SAL, method: 'rotate_character', view: 'low top-down',
  image_size: { width: +size, height: +size }, no_background: true,
  reference_image: { type: 'base64', base64: readFileSync(join(ROOT, inPath)).toString('base64'), format: 'png' },
};
const sub = await (await fetch(`${API}/create-character-pro`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json();
if (!sub.background_job_id) throw new Error(JSON.stringify(sub).slice(0, 400));
let cid = sub.character_id;
for (let i = 0; ; i++) {
  const j = await (await fetch(`${API}/background-jobs/${sub.background_job_id}`, { headers: H })).json();
  if (j.status === 'completed') { cid ??= j.last_response?.character_id; break; }
  if (j.status && !['processing', 'queued', 'pending'].includes(j.status)) throw new Error(JSON.stringify(j).slice(0, 400));
  if (i > 200) throw new Error('timeout');
  await new Promise((r) => setTimeout(r, 5000));
}
const zip = Buffer.from(await (await fetch(`${API}/characters/${cid}/zip`, { headers: H })).arrayBuffer());
const dir = join(OUT, `.zip_${id}`);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'c.zip'), zip);
execFileSync('unzip', ['-o', '-q', join(dir, 'c.zip'), '-d', dir]);
for (const f of readdirSync(join(dir, 'Idle/rotations'))) copyFileSync(join(dir, 'Idle/rotations', f), join(OUT, `sal_${id}__${f}`));
rmSync(dir, { recursive: true, force: true });
delete body.reference_image;
writeFileSync(join(OUT, `sal_${id}.prompt.json`), JSON.stringify({ source: 'pixellab', endpoint: 'v2/create-character-pro', body, reference: inPath, character_id: cid, at: new Date().toISOString() }, null, 2));
console.log(`done ${id}; used ${before - (await bal())}, remaining ${await bal()}`);
