/**
 * Basic animations for the restyled cast (PixelLab, one direction per job,
 * waiting out the concurrent-job cap). Mark's rule (2026-10-23): everyone
 * gets an idle; only characters the game moves (heroes, the follower) get a walk.
 *   node tools/animate-cast.mjs [id ...]      → generate + stage
 *   node tools/animate-cast.mjs --stage [id …] → stage only
 * Character ids come from assets/reference/styles/cast/<id>.prompt.json.
 */
import { writeFileSync, readFileSync, mkdirSync, readdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const API = 'https://api.pixellab.ai/v2';
const H = { Authorization: `Bearer ${process.env.PIXELLAB_API_KEY}`, 'Content-Type': 'application/json' };
const ALL8 = ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'];
const idle = { name: 'idle', mode: 'template', template: 'breathing-idle', fps: 5, loop: true };
const walk = { name: 'walk', mode: 'template', template: 'walking-8-frames', fps: 11, loop: true };
const ohmIdle = (action) => ({ name: 'idle', mode: 'v3', action, frames: 4, fps: 6, loop: true });

const PLAN = {
  mabel: [idle], boone: [idle], cass: [idle], odessa: [idle], rook: [idle],
  wren: [idle, walk],
  scraplet: [ohmIdle('idle: standing in place, breathing, tail antenna wagging gently'), { name: 'walk', mode: 'v3', action: 'trotting walk cycle in place, four legs stepping', frames: 8, fps: 11, loop: true }],
  scootlet: [ohmIdle('idle: rocking gently on its wheels, headlight eye blinking')],
  dronelet: [ohmIdle('idle: hovering in place, bobbing up and down, rotors spinning')],
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const bal = async () => (await (await fetch(`${API}/balance`, { headers: H })).json()).subscription?.generations;
const charId = (id) => JSON.parse(readFileSync(join(ROOT, 'assets/reference/styles/cast', `${id}.prompt.json`), 'utf8')).character_id;

async function waitJob(id) {
  for (let i = 0; i < 400; i++) {
    const j = await (await fetch(`${API}/background-jobs/${id}`, { headers: H })).json();
    if (j.status && !['processing', 'queued', 'pending'].includes(j.status)) return j.status;
    await sleep(5000);
  }
  return 'timeout';
}

async function one(task, groups) {
  const { id, a, dir } = task;
  const key = `${id}/${a.name}`;
  for (let attempt = 0; attempt < 80; attempt++) {
    const body = {
      character_id: charId(id), mode: a.mode, directions: [dir],
      ...(a.mode === 'template' ? { template_animation_id: a.template } : { action_description: a.action, frame_count: a.frames, animation_name: a.name }),
      ...(groups[key] ? { animation_group_id: groups[key] } : {}),
    };
    const r = await (await fetch(`${API}/animate-character`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json();
    if (r.background_job_ids) {
      groups[key] ??= r.animation_group_id;
      const st = await waitJob(r.background_job_ids[0]);
      if (st === 'completed') return console.log(`${key}/${dir}: ok`);
      console.log(`${key}/${dir}: ${st}, retrying`);
      continue;
    }
    const msg = JSON.stringify(r);
    if (/concurrent|slot/i.test(msg)) { await sleep(15000); continue; }
    return console.log(`${key}/${dir}: FAILED ${msg.slice(0, 220)}`);
  }
}

async function generate(ids) {
  const groups = JSON.parse(existsSync('/tmp/claude-0/cast_groups.json') ? readFileSync('/tmp/claude-0/cast_groups.json', 'utf8') : '{}');
  const tasks = [];
  for (const id of ids) for (const a of PLAN[id]) for (const dir of ALL8) tasks.push({ id, a, dir });
  const before = await bal();
  if (before - tasks.length * 2 < 1000) throw new Error(`would approach the 1000-generation floor (have ${before})`);
  console.log(`${tasks.length} directions to make`);
  // each animation's first direction creates its group; the rest join it
  const firsts = tasks.filter((t, i) => tasks.findIndex((u) => u.id === t.id && u.a.name === t.a.name) === i && !groups[`${t.id}/${t.a.name}`]);
  let k = 0;
  const pool = async (list) => { let i = 0; await Promise.all(Array.from({ length: 3 }, async () => { while (i < list.length) await one(list[i++], groups); })); };
  await pool(firsts);
  writeFileSync('/tmp/claude-0/cast_groups.json', JSON.stringify(groups));
  await pool(tasks.filter((t) => !firsts.includes(t)));
  void k;
  console.log(`used ${before - (await bal())}, remaining ${await bal()}`);
}

async function stage(ids) {
  for (const id of ids) {
    const cid = charId(id);
    const tmp = join(ROOT, `assets/reference/styles/cast/.zip_${id}`);
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
    writeFileSync(join(tmp, 'c.zip'), Buffer.from(await (await fetch(`${API}/characters/${cid}/zip`, { headers: H })).arrayBuffer()));
    execFileSync('unzip', ['-o', '-q', join(tmp, 'c.zip'), '-d', tmp]);
    const state = readdirSync(tmp).find((d) => d !== 'c.zip' && d !== 'metadata.json');
    const animRoot = join(tmp, state, 'animations');
    const folders = existsSync(animRoot) ? readdirSync(animRoot) : [];
    const out = join(ROOT, 'public/world/styles', id);
    const anim = {};
    for (const a of PLAN[id]) {
      // template folders are named by the move (breathing_idle, walking…); custom ones by our animation_name
      const want = a.mode === 'template' ? (a.template === 'breathing-idle' ? 'breathing_idle' : 'walking') : a.name;
      const folder = folders.filter((f) => f === want || f.startsWith(`${want}-`)).sort((x, y) => readdirSync(join(animRoot, y)).length - readdirSync(join(animRoot, x)).length)[0]
        ?? folders.find((f) => f.toLowerCase().includes(a.name));
      if (!folder) { console.log(`${id}/${a.name}: not found in ${folders.join(', ')}`); continue; }
      const dirs = readdirSync(join(animRoot, folder));
      let frames = 0;
      rmSync(join(out, a.name), { recursive: true, force: true });
      for (const dir of dirs) {
        const files = readdirSync(join(animRoot, folder, dir)).filter((f) => f.endsWith('.png')).sort();
        frames = frames ? Math.min(frames, files.length) : files.length;
        mkdirSync(join(out, a.name, dir), { recursive: true });
        files.forEach((f, i) => copyFileSync(join(animRoot, folder, dir, f), join(out, a.name, dir, `${i}.png`)));
      }
      anim[a.name] = { frames, fps: a.fps, loop: !!a.loop, dirs };
      console.log(`${id}/${a.name}: ${dirs.length} dirs × ${frames} frames (from ${folder})`);
    }
    if (Object.keys(anim).length) writeFileSync(join(out, 'anim.json'), JSON.stringify(anim, null, 2));
    const rec = join(ROOT, 'assets/reference/styles/cast', `${id}.anims.json`);
    writeFileSync(rec, JSON.stringify({ source: 'pixellab', endpoint: 'v2/animate-character', character_id: cid, plan: PLAN[id], staged: anim, at: new Date().toISOString() }, null, 2));
    rmSync(tmp, { recursive: true, force: true });
  }
}

const stageOnly = process.argv[2] === '--stage';
const ids = (stageOnly ? process.argv.slice(3) : process.argv.slice(2)).filter(Boolean);
if (!ids.length) ids.push(...Object.keys(PLAN));
if (!stageOnly) await generate(ids);
await stage(ids);
