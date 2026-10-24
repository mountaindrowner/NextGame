/**
 * Cast + starter Ohms in SAL's locked indie-action style: PixelLab Pro,
 * 8 directions, style_character_id = SAL (so every figure matches him).
 *   node tools/gen-cast-style.mjs [id ...]
 * Writes assets/reference/styles/cast/<id>__<dir>.png + <id>.prompt.json and
 * stages public/world/styles/<id>/<dir>.png for the game.
 */
import { writeFileSync, mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/reference/styles/cast');
const PUB = join(ROOT, 'public/world/styles');
const API = 'https://api.pixellab.ai/v2';
const H = { Authorization: `Bearer ${process.env.PIXELLAB_API_KEY}`, 'Content-Type': 'application/json' };
const SAL_ID = 'cea31c61-3b70-4ec6-a617-413b60f80ece';
const STYLE = 'modern indie action-adventure pixel art: chunky stylized proportions, big bold readable silhouette, saturated colours, lineless with strong graphic light and shadow shapes, expressive and punchy';

const CAST = {
  wren: { size: 64, desc: 'WREN, a teenage girl, young scavenger hero of post-collapse plains cattle country: blonde hair in a low ponytail under a worn leather cap with brass goggles pushed up, red bandana at the neck, scuffed tan work jacket with a salvaged metal shoulder pad, patched denim trousers with knee pads, worn brown boots, tool pouch on belt, determined hopeful face' },
  mabel: { size: 64, desc: "Grandma Mabel Vane, a warm elderly woman, silver hair in a neat bun, round wire glasses, cardigan over a work dress, canvas apron with a pocket of tools, kind steady face, the keeper of her late husband's workshop" },
  boone: { size: 64, desc: "Warden Hollis Boone, gruff broad-shouldered colony chief in his fifties, salt-and-pepper beard, sun-faded cattleman's hat, long weathered duster coat over a work vest, heavy boots, arms ready, stern but fair" },
  cass: { size: 64, desc: "Cass, the hero's best friend, a younger teen with short scruffy brown hair, oversized mustard-yellow jacket with rolled sleeves, a homemade badge pin, cargo shorts, scuffed sneakers, eager restless grin" },
  odessa: { size: 64, desc: 'Odessa, the colony archivist and radio operator, a woman in her thirties, dark hair in a practical bun, headset with a boom mic around her neck, long olive field coat with many pockets, satchel of papers, dry clever smile' },
  rook: { size: 64, desc: 'Rook, a hard-edged teenage raider rival from a red-dust colony, spiky dark hair, rust-red scarf over the shoulders, patched leather vest over a sleeveless shirt, fingerless gloves, cargo trousers, cocky sneer' },
  scootlet: { size: 64, ohm: true, desc: 'Scootlet, a small living machine companion: a cute kick e-scooter creature with a single headlight eye, a stubby handlebar like ears, small deck body, two little wheels, restless like a puppy on wheels, scuffed teal and cream paint, no rider' },
  dronelet: { size: 64, ohm: true, desc: 'Dronelet, a small living machine companion: a cute pocket quadcopter creature hovering, round body with one big camera lens eye, four small rotor arms with spinning props, antenna, scuffed white and orange paint' },
  scraplet: { size: 64, ohm: true, template: 'dog', desc: 'Scraplet, a small living machine companion: a sturdy scrap-metal puppy built from salvaged parts, grey riveted body, one glowing cyan eye, antenna tail with a little bulb, bolted legs, loyal and eager' },
};

const bal = async () => (await (await fetch(`${API}/balance`, { headers: H })).json()).subscription?.generations;

async function run(id) {
  const c = CAST[id];
  const body = {
    description: c.desc, style_description: STYLE, method: 'create_with_style', view: 'low top-down',
    image_size: { width: c.size, height: c.size }, no_background: true, style_character_id: SAL_ID,
    ...(c.template ? { template_id: c.template } : {}),
  };
  const sub = await (await fetch(`${API}/create-character-pro`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json();
  if (!sub.background_job_id) throw new Error(`${id}: ${JSON.stringify(sub).slice(0, 300)}`);
  let cid = sub.character_id;
  for (let i = 0; ; i++) {
    const j = await (await fetch(`${API}/background-jobs/${sub.background_job_id}`, { headers: H })).json();
    if (j.status === 'completed') { cid ??= j.last_response?.character_id; break; }
    if (j.status && !['processing', 'queued', 'pending'].includes(j.status)) throw new Error(`${id}: ${j.status} ${JSON.stringify(j).slice(0, 300)}`);
    if (i > 240) throw new Error(`${id}: timeout`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  const zip = Buffer.from(await (await fetch(`${API}/characters/${cid}/zip`, { headers: H })).arrayBuffer());
  const tmp = join(OUT, `.zip_${id}`);
  mkdirSync(tmp, { recursive: true });
  writeFileSync(join(tmp, 'c.zip'), zip);
  execFileSync('unzip', ['-o', '-q', join(tmp, 'c.zip'), '-d', tmp]);
  const rot = join(tmp, readdirSync(tmp).find((d) => d !== 'c.zip' && d !== 'metadata.json'), 'rotations');
  mkdirSync(join(PUB, id), { recursive: true });
  for (const f of readdirSync(rot)) {
    copyFileSync(join(rot, f), join(OUT, `${id}__${f}`));
    copyFileSync(join(rot, f), join(PUB, id, f));
  }
  rmSync(tmp, { recursive: true, force: true });
  writeFileSync(join(OUT, `${id}.prompt.json`), JSON.stringify({ source: 'pixellab', endpoint: 'v2/create-character-pro', body, character_id: cid, at: new Date().toISOString() }, null, 2));
  return `${id}: ok (${cid})`;
}

mkdirSync(OUT, { recursive: true });
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(CAST);
const before = await bal();
if (before - ids.length * 60 < 1000) throw new Error(`would approach the 1000-generation floor (have ${before})`);
for (const r of await Promise.allSettled(ids.map(run))) console.log(r.status === 'fulfilled' ? r.value : `FAILED ${r.reason}`);
console.log(`used ${before - (await bal())}, remaining ${await bal()}`);
