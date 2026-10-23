/**
 * SAL's animation set (PixelLab template mode, on his locked e_pro character).
 *   node tools/animate-sal.mjs          → fill every missing direction, then stage
 *   node tools/animate-sal.mjs --stage  → only download + stage what exists
 * Works one direction per job through a small worker pool (PixelLab caps
 * concurrent jobs), reusing each animation's group so finished directions are
 * never paid for twice. Stages frames to public/world/styles/e_pro/<name>/<dir>/<i>.png
 * + anim.json; keeps a copy + record in assets/reference/styles/sal_e_anims/.
 */
import { writeFileSync, readFileSync, mkdirSync, readdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const API = 'https://api.pixellab.ai/v2';
const H = { Authorization: `Bearer ${process.env.PIXELLAB_API_KEY}`, 'Content-Type': 'application/json' };
const CHAR = 'cea31c61-3b70-4ec6-a617-413b60f80ece';
const PUB = join(ROOT, 'public/world/styles/e_pro');
const REF = join(ROOT, 'assets/reference/styles/sal_e_anims');
const ALL8 = ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'];

// name in game → PixelLab template, directions, playback
const SET = {
  idle: { folder: 'breathing_idle', template: 'breathing-idle', dirs: ALL8, fps: 5, loop: true },
  run: { folder: 'running', template: 'running-8-frames', dirs: ALL8, fps: 13, loop: true },
  pickup: { folder: 'picking_up', template: 'picking-up', dirs: ALL8, fps: 9 },
  hurt: { folder: 'taking_a_punch', template: 'taking-punch', dirs: ALL8, fps: 12 },
  hop: { folder: 'jumping', template: 'jumping-1', dirs: ['south', 'south-east', 'south-west'], fps: 12 },
  throw: { folder: 'throw_object', template: 'throw-object', dirs: ['east', 'west', 'south'], fps: 12 },
  knockdown: { folder: 'falling_backward', template: 'falling-back-death', dirs: ['south'], fps: 9 },
  getup: { folder: 'getting_up', template: 'getting-up', dirs: ['south'], fps: 9 },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const bal = async () => (await (await fetch(`${API}/balance`, { headers: H })).json()).subscription?.generations;
const character = async () => (await fetch(`${API}/characters/${CHAR}`, { headers: H })).json();

async function waitJob(id) {
  for (let i = 0; i < 400; i++) {
    const j = await (await fetch(`${API}/background-jobs/${id}`, { headers: H })).json();
    if (j.status && !['processing', 'queued', 'pending'].includes(j.status)) return j.status;
    await sleep(5000);
  }
  return 'timeout';
}

/** One direction: submit (waiting out the concurrency cap), then wait for it. */
async function one(name, dir, groups) {
  const a = SET[name];
  for (let attempt = 0; attempt < 60; attempt++) {
    const body = { character_id: CHAR, mode: 'template', template_animation_id: a.template, directions: [dir], ...(groups[name] ? { animation_group_id: groups[name] } : {}) };
    const r = await (await fetch(`${API}/animate-character`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json();
    if (r.background_job_ids) {
      groups[name] ??= r.animation_group_id;
      const st = await waitJob(r.background_job_ids[0]);
      if (st === 'completed') return console.log(`${name}/${dir}: ok`);
      console.log(`${name}/${dir}: ${st}, retrying`);
      continue;
    }
    const msg = JSON.stringify(r);
    if (/concurrent|slot/i.test(msg)) { await sleep(15000); continue; }
    return console.log(`${name}/${dir}: FAILED ${msg.slice(0, 200)}`);
  }
}

async function fill() {
  const c = await character();
  const groups = {}, have = {};
  for (const [name, a] of Object.entries(SET)) {
    // reuse the group that already holds this template's frames (most directions wins)
    const g = (c.animations ?? []).filter((x) => x.animation_type === a.template).sort((x, y) => y.directions.length - x.directions.length)[0];
    if (g) { groups[name] = g.animation_group_id; have[name] = new Set(g.directions.map((d) => d.direction)); }
  }
  const todo = [];
  for (const [name, a] of Object.entries(SET)) for (const d of a.dirs) if (!have[name]?.has(d)) todo.push([name, d]);
  console.log(`missing ${todo.length} directions`);
  const before = await bal();
  if (before - todo.length * 2 < 1000) throw new Error(`would approach the 1000-generation floor (have ${before})`);
  // first job of a brand-new animation must create its group before the rest join it
  const firsts = todo.filter(([n]) => !groups[n]).filter(([n], i, arr) => arr.findIndex(([m]) => m === n) === i);
  await Promise.all(firsts.map(([n, d]) => one(n, d, groups)));
  const rest = todo.filter((t) => !firsts.includes(t));
  const pool = 3;
  let k = 0;
  await Promise.all(Array.from({ length: pool }, async () => { while (k < rest.length) { const [n, d] = rest[k++]; await one(n, d, groups); } }));
  console.log(`used ${before - (await bal())}, remaining ${await bal()}`);
}

async function stage() {
  const c = await character();
  const tmp = join(ROOT, 'assets/reference/styles/.zip_sal_anims');
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  writeFileSync(join(tmp, 'c.zip'), Buffer.from(await (await fetch(`${API}/characters/${CHAR}/zip`, { headers: H })).arrayBuffer()));
  execFileSync('unzip', ['-o', '-q', join(tmp, 'c.zip'), '-d', tmp]);
  const animRoot = join(tmp, readdirSync(tmp).find((d) => d !== 'c.zip' && d !== 'metadata.json'), 'animations');
  const folders = readdirSync(animRoot);
  const animPath = join(PUB, 'anim.json');
  const anim = existsSync(animPath) ? JSON.parse(readFileSync(animPath, 'utf8')) : {};
  const record = {};
  mkdirSync(REF, { recursive: true });
  for (const [name, a] of Object.entries(SET)) {
    const g = (c.animations ?? []).filter((x) => x.animation_type === a.template).sort((x, y) => y.directions.length - x.directions.length)[0];
    if (!g) { console.log(`${name}: not generated`); continue; }
    const gid8 = g.animation_group_id.slice(0, 8);
    // the zip names folders by readable name (e.g. taking_a_punch), suffixed with the group when repeated
    const folder = folders.find((f) => f === a.folder) ?? folders.find((f) => f.endsWith(gid8));
    if (!folder) { console.log(`${name}: folder missing (${a.template}-${gid8})`); continue; }
    let frames = 0;
    const dirs = readdirSync(join(animRoot, folder));
    rmSync(join(PUB, name), { recursive: true, force: true });
    for (const dir of dirs) {
      const files = readdirSync(join(animRoot, folder, dir)).filter((f) => f.endsWith('.png')).sort();
      frames = frames ? Math.min(frames, files.length) : files.length;
      mkdirSync(join(PUB, name, dir), { recursive: true });
      mkdirSync(join(REF, name, dir), { recursive: true });
      files.forEach((f, i) => {
        copyFileSync(join(animRoot, folder, dir, f), join(PUB, name, dir, `${i}.png`));
        copyFileSync(join(animRoot, folder, dir, f), join(REF, name, dir, f));
      });
    }
    anim[name] = { frames, fps: a.fps, loop: !!a.loop, dirs };
    record[name] = { template: a.template, animation_group_id: g.animation_group_id, dirs };
    console.log(`${name}: ${dirs.length} dirs × ${frames} frames`);
  }
  writeFileSync(animPath, JSON.stringify(anim, null, 2));
  writeFileSync(join(REF, 'prompt.json'), JSON.stringify({ source: 'pixellab', endpoint: 'v2/animate-character', character_id: CHAR, mode: 'template', set: record, at: new Date().toISOString() }, null, 2));
  rmSync(tmp, { recursive: true, force: true });
}

if (process.argv[2] !== '--stage') await fill();
await stage();
