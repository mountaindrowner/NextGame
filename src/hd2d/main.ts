import * as THREE from 'three';
import { createPost } from './post';
import { applyMood, DAY, NIGHT } from './mood';
import { buildField } from './field/scene';
import { blocked, heightAt, COLS, ROWS } from './field/layout';
import { Walker, OhmFollower, spriteTint, type Dir } from './sprites';
import { UI, type Speech } from './ui';

/**
 * OHMFRONT HD-2D proof — the Field (version B, bespoke geometry).
 * A fixed, tilted perspective camera over a 3D diorama; 2D pixel-art
 * characters standing in it; tilt-shift always on.
 *
 * URL: ?time=night · ?x=&z= start position · ?wide=1 overview · ?hud=0
 */

const q = new URLSearchParams(location.search);
const night = q.get('time') === 'night';
const mood = night ? NIGHT : DAY;

const app = document.getElementById('app')!;
window.addEventListener('error', (e) => {
  const d = document.createElement('pre');
  d.style.cssText = 'position:fixed;left:8px;top:8px;right:8px;color:#f88;background:#000c;padding:8px;font:12px monospace;z-index:99;white-space:pre-wrap';
  d.textContent = String(e.message) + '\n' + (e.error?.stack ?? '');
  document.body.appendChild(d);
});

// ---------------------------------------------------------------- renderer
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// One fixed angle: yaw locked, ~41° down, long lens for the miniature read.
const wide = q.get('wide') === '1';
const camera = new THREE.PerspectiveCamera(wide ? 34 : 30, window.innerWidth / window.innerHeight, 0.5, 220);
const CAM_OFFSET = wide ? new THREE.Vector3(0, 27, 31) : new THREE.Vector3(0, 12.5, 14.5);

const post = createPost(renderer, scene, camera);
const lights = applyMood(scene, renderer, post, mood);
const field = buildField(scene, night);
const ui = new UI(app);

// --------------------------------------------------------------- the cast
interface NPCData { char: string; col: number; row: number; name: string; lines?: string[]; facing?: string; bark?: string; shop?: string }
interface FieldData { spawn: { x: number; y: number }; npcs: NPCData[]; trainers: NPCData[]; signs: Array<{ col: number; row: number; text: string }> }
interface Talkable { pos: THREE.Vector3; height: number; label: string; speech: Speech; walker?: Walker }

const tint = spriteTint(night);
const data = (await fetch('./world/the-field.json').then((r) => r.json())) as FieldData;
const [player, ohm, ...npcWalkers] = await Promise.all([
  Walker.load('sal', tint),
  OhmFollower.load(7, tint), // Scraplet — the Dog line, stand-in lead Ohm
  ...data.npcs.map((n) => Walker.load(n.char, tint)),
  ...data.trainers.map((n) => Walker.load(n.char, tint)),
]);

const ground = (x: number, z: number): number => Math.max(heightAt(x, z), -0.1);
const talkables: Talkable[] = [];
const npcSpots: THREE.Vector3[] = [];
[...data.npcs, ...data.trainers].forEach((n, i) => {
  const w = npcWalkers[i]!;
  const x = n.col + 0.5, z = n.row + 0.5;
  w.root.position.set(x, ground(x, z), z);
  w.dir = (n.facing ? n.facing.toUpperCase() : 'S') as Dir;
  w.animate(0, false);
  scene.add(w.root);
  npcSpots.push(w.root.position);
  const lines = n.lines ?? (n.bark ? [n.bark.replace(/^[^:]+:\s*/, '')] : ['…']);
  talkables.push({ pos: w.root.position, height: 2.0, label: n.name, walker: w, speech: { name: n.name, portrait: `./world/char/${n.char}_96.png`, lines } });
});
for (const s of data.signs) {
  // the sign post itself stands a touch east of its old tile (props.ts)
  const p = new THREE.Vector3(22.7, ground(22.7, 16.7), 16.7);
  talkables.push({ pos: p, height: 1.5, label: 'Read', speech: { name: 'Sign', lines: [s.text] } });
}

const start = new THREE.Vector3(Number(q.get('x') ?? data.spawn.x + 0.5), 0, Number(q.get('z') ?? data.spawn.y + 0.3));
player.root.position.set(start.x, ground(start.x, start.z), start.z);
player.dir = (q.get('face')?.toUpperCase() as Dir) ?? 'S';
scene.add(player.root);
ohm.root.position.set(start.x - 0.9, ground(start.x - 0.9, start.z + 0.4), start.z + 0.4);
scene.add(ohm.root);

// ---------------------------------------------------------------- input
const keys = new Set<string>();
const INTERACT = new Set(['e', ' ', 'enter', 'z']);
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  keys.add(k);
  if (INTERACT.has(k) && !e.repeat) act();
  if (k.startsWith('arrow') || k === ' ') e.preventDefault();
});
window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());

let focusTarget: Talkable | null = null;
function act(): void {
  if (ui.talking) { ui.advance(); return; }
  const t = focusTarget;
  if (!t) return;
  if (t.walker) t.walker.face(player.root.position.x - t.pos.x, player.root.position.z - t.pos.z);
  ui.say(t.speech);
}

function nearestTalkable(): Talkable | null {
  const p = player.root.position;
  const fx = player.dir === 'W' ? -1 : player.dir === 'E' ? 1 : 0;
  const fz = player.dir === 'N' ? -1 : player.dir === 'S' ? 1 : 0;
  let best: Talkable | null = null, bestD = Infinity;
  for (const t of talkables) {
    const dx = t.pos.x - p.x, dz = t.pos.z - p.z, d = Math.hypot(dx, dz);
    if (d > 1.6) continue;
    const ahead = (dx * fx + dz * fz) / (d || 1);
    if (d > 0.95 && ahead < 0.3) continue;
    if (d < bestD) { bestD = d; best = t; }
  }
  return best;
}

// ------------------------------------------------------------- movement
const R = 0.28;
const free = (x: number, z: number): boolean => {
  if (blocked(x, z, R)) return false;
  for (const s of npcSpots) if (Math.hypot(s.x - x, s.z - z) < 0.55) return false;
  return true;
};
const trail: THREE.Vector3[] = [player.root.position.clone()];
const camTarget = new THREE.Vector3();
const desired = new THREE.Vector3();
let tiltFocus = 0.46;

function clampCam(v: THREE.Vector3): THREE.Vector3 {
  if (wide) return v.set(COLS / 2, 0, ROWS / 2 + 1);
  v.x = THREE.MathUtils.clamp(v.x, 8.2, COLS - 8.2);
  v.z = THREE.MathUtils.clamp(v.z, 4.2, ROWS - 4.6);
  return v;
}
clampCam(camTarget.copy(player.root.position).setY(0.8));

function update(dt: number): void {
  // read input (keyboard or touch stick)
  let ix = 0, iz = 0;
  if (!ui.talking) {
    if (keys.has('arrowleft') || keys.has('a')) ix -= 1;
    if (keys.has('arrowright') || keys.has('d')) ix += 1;
    if (keys.has('arrowup') || keys.has('w')) iz -= 1;
    if (keys.has('arrowdown') || keys.has('s')) iz += 1;
    if (ui.stick.x || ui.stick.y) { ix = ui.stick.x; iz = ui.stick.y; }
  }
  if (ui.takeA()) act();
  const mag = Math.min(1, Math.hypot(ix, iz));
  const run = keys.has('shift') || mag > 0.92;
  const speed = (run ? 5.0 : 3.1) * mag;
  const p = player.root.position;
  let moved = false;
  if (mag > 0.12) {
    const nx = (ix / Math.hypot(ix, iz)) * speed * dt, nz = (iz / Math.hypot(ix, iz)) * speed * dt;
    player.face(ix, iz);
    if (free(p.x + nx, p.z)) { p.x += nx; moved = true; }
    if (free(p.x, p.z + nz)) { p.z += nz; moved = true; }
    p.y = ground(p.x, p.z);
  }
  player.animate(dt, moved, run ? 1.5 : 1);

  // the lead Ohm trots along the breadcrumb trail, ~1.1 units back
  const last = trail[trail.length - 1]!;
  if (last.distanceTo(p) > 0.08) { trail.push(p.clone()); if (trail.length > 80) trail.shift(); }
  let need = 1.1, i = trail.length - 1, goal = trail[0]!;
  for (; i > 0; i--) {
    const seg = trail[i]!.distanceTo(trail[i - 1]!);
    if (need <= seg) { goal = trail[i]!.clone().lerp(trail[i - 1]!, need / seg); break; }
    need -= seg;
  }
  const o = ohm.root.position;
  const ox = o.x, oz = o.z;
  const gap = Math.hypot(goal.x - o.x, goal.z - o.z);
  if (gap > 0.04) {
    const k = Math.min(1, (speed + 1.5) * dt / gap);
    o.x += (goal.x - o.x) * k;
    o.z += (goal.z - o.z) * k;
  }
  o.y = ground(o.x, o.z);
  ohm.step(dt, o.x - ox, o.z - oz);

  for (const w of npcWalkers) w.animate(dt, false);

  // camera: smooth follow, clamped to the diorama
  clampCam(desired.copy(p).setY(0.8));
  camTarget.lerp(desired, 1 - Math.exp(-dt * 4.5));
  camera.position.copy(camTarget).add(CAM_OFFSET);
  camera.lookAt(camTarget);
  lights.follow(wide ? camTarget : p);

  // tilt-shift focus band rides the player's screen height (sharp even where the camera clamps)
  const sp = p.clone().setY(p.y + 0.8).project(camera);
  tiltFocus += ((sp.y + 1) / 2 - tiltFocus) * (1 - Math.exp(-dt * 6));
  post.tiltH.uniforms.focus!.value = post.tiltV.uniforms.focus!.value = wide ? 0.45 : tiltFocus;

  // interact prompt
  focusTarget = ui.talking ? null : nearestTalkable();
  if (focusTarget) {
    const s = focusTarget.pos.clone().setY(focusTarget.pos.y + focusTarget.height).project(camera);
    ui.showPrompt(focusTarget.label, (s.x + 1) / 2 * window.innerWidth, (1 - s.y) / 2 * window.innerHeight);
  } else ui.showPrompt(null);
  ui.tick(dt);
}

// --------------------------------------------------------------- frame
function resize(): void {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  post.resize(w, h);
}
window.addEventListener('resize', resize);
resize();

if (q.get('hud') !== '0') {
  ui.titleCard('THE FIELD', night ? 'Ohmstead surface · after dark' : 'Ohmstead surface');
  ui.hint(matchMedia('(pointer: coarse)').matches
    ? 'Stick to move · A to talk'
    : '<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> move · <kbd>Shift</kbd> run · <kbd>E</kbd> talk');
  const here = (n: boolean): string => { const u = new URLSearchParams(location.search); if (n) u.set('time', 'night'); else u.delete('time'); return `?${u}`; };
  ui.badge(`<span>HD-2D · B</span><a href="${here(false)}" class="${night ? '' : 'on'}">Day</a><a href="${here(true)}" class="${night ? 'on' : ''}">Night</a>`);
}

const clock = new THREE.Clock();
let t = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  update(dt);
  field.update(t, player.root.position);
  post.tick(t);
  post.composer.render(dt);
});
Object.assign(window, { __ready: true, __hd2d: { scene, camera, player, ohm, THREE } });
