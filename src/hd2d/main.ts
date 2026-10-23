import * as THREE from 'three';
import { createPost } from './post';
import { applyMood, type Lights } from './mood';
import { Walker, OhmFollower, type Dir } from './sprites';
import { UI } from './ui';
import type { Area, AreaBuilder, Line, Thing } from './area';
import { buildField } from './field/area';
import { buildFarmRoad } from './farmroad/area';
import { buildOhmstead } from './ohmstead/area';

/**
 * OHMFRONT HD-2D — the first map: Ohmstead → the Field → Farm Road.
 * A fixed, tilted perspective camera over 3D dioramas; 2D pixel-art
 * characters standing in them; tilt-shift always on.
 *
 * URL: ?area=ohmstead|field|farmroad · ?time=night · ?x=&z= start ·
 *      ?face=n|s|w|e · ?wide=1 overview · ?hud=0
 */

const AREAS: Record<string, AreaBuilder> = { ohmstead: buildOhmstead, field: buildField, farmroad: buildFarmRoad };

const q = new URLSearchParams(location.search);
const night = q.get('time') === 'night';
const hud = q.get('hud') !== '0';
const wide = q.get('wide') === '1';

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

// One fixed angle: yaw locked, ~41° down, long lens for the miniature read.
const camera = new THREE.PerspectiveCamera(wide ? 34 : 30, window.innerWidth / window.innerHeight, 0.5, 220);
const CAM_OFFSET = wide ? new THREE.Vector3(0, 27, 31) : new THREE.Vector3(0, 12.5, 14.5);

let scene = new THREE.Scene();
const post = createPost(renderer, scene, camera);
const ui = new UI(app);

// ----------------------------------------------------------------- state
let area: Area | null = null;
let lights: Lights | null = null;
let loading = true;
let cast: Array<{ w: Walker; pos: THREE.Vector3 }> = [];
let talk: Array<Thing & { walker?: Walker; pos: THREE.Vector3 }> = [];
let inTrigger = false;
const trail: THREE.Vector3[] = [];
const camTarget = new THREE.Vector3();
const desired = new THREE.Vector3();
let tiltFocus = 0.46;

const [player, ohm] = await Promise.all([
  Walker.load('sal', new THREE.Color(1, 1, 1)),
  OhmFollower.load(7, new THREE.Color(1, 1, 1)), // Scraplet — the Dog line, stand-in lead Ohm
]);

function dispose(s: THREE.Scene): void {
  s.traverse((o) => {
    if (o === player.root || o === ohm.root || player.root.children.includes(o) || ohm.root.children.includes(o)) return;
    const m = o as THREE.Mesh;
    m.geometry?.dispose();
  });
}

function clampCam(v: THREE.Vector3): THREE.Vector3 {
  const a = area!;
  if (wide) return v.set((a.cam.x0 + a.cam.x1) / 2, 0, (a.cam.z0 + a.cam.z1) / 2 + 1);
  v.x = THREE.MathUtils.clamp(v.x, a.cam.x0, a.cam.x1);
  v.z = THREE.MathUtils.clamp(v.z, a.cam.z0, a.cam.z1);
  return v;
}

function badge(): void {
  if (!hud || !area) return;
  const link = (n: boolean): string => {
    const u = new URLSearchParams(location.search);
    if (n) u.set('time', 'night'); else u.delete('time');
    return `?${u}`;
  };
  ui.badge(`<span>HD-2D · ${area.title.replace(/^THE /, '')}</span>` +
    (area.sky ? `<a href="${link(false)}" class="${night ? '' : 'on'}">Day</a><a href="${link(true)}" class="${night ? 'on' : ''}">Night</a>` : ''));
}

/** Travel: fade out, tear down, build the next area, place everyone, fade in. */
async function enter(id: string, spawn: string, first = false): Promise<void> {
  loading = true;
  if (!first) await ui.fade(true);
  const old = scene;
  old.remove(player.root, ohm.root);
  dispose(old);
  scene = new THREE.Scene();
  post.setScene(scene);
  const a = await AREAS[id]!(scene, night);
  area = a;
  lights = applyMood(scene, renderer, post, a.mood);
  const tint = new THREE.Color().setRGB(...a.mood.sprite);
  player.setTint(tint);
  ohm.setTint(tint);

  const walkers = await Promise.all(a.npcs.map((n) => Walker.load(n.char, tint)));
  cast = [];
  talk = a.things.map((t) => ({ ...t, pos: new THREE.Vector3(t.x, a.ground(t.x, t.z), t.z) }));
  a.npcs.forEach((n, i) => {
    const w = walkers[i]!;
    const x = n.col + 0.5, z = n.row + 0.5;
    w.root.position.set(x, a.ground(x, z), z);
    w.dir = (n.facing ? n.facing.toUpperCase() : 'S') as Dir;
    w.animate(0, false);
    scene.add(w.root);
    cast.push({ w, pos: w.root.position });
    if (n.lines?.length) talk.push({ x, z, height: 2.0, label: n.name, walker: w, pos: w.root.position, say: { name: n.name, portrait: `./world/char/${n.char}_96.png`, lines: n.lines } });
  });

  const s = first && q.has('x') ? { x: Number(q.get('x')), z: Number(q.get('z')), face: (q.get('face')?.toUpperCase() ?? 'S') as Dir } : a.spawns[spawn] ?? a.spawns.start!;
  player.root.position.set(s.x, a.ground(s.x, s.z), s.z);
  player.dir = s.face ?? 'S';
  player.animate(0, false);
  // the lead Ohm arrives at your side (whichever side is clear)
  const side = a.blocked(s.x - 0.8, s.z, 0.25, s.x, s.z) ? 0.8 : -0.8;
  ohm.root.position.set(s.x + side, a.ground(s.x + side, s.z), s.z);
  scene.add(player.root, ohm.root);
  trail.length = 0;
  trail.push(ohm.root.position.clone(), player.root.position.clone());
  inTrigger = true; // arriving on a trigger edge must not bounce you straight back
  clampCam(camTarget.copy(player.root.position).setY(0.8));

  const u = new URLSearchParams(location.search);
  u.set('area', id);
  for (const k of ['x', 'z', 'face']) u.delete(k);
  history.replaceState(null, '', `?${u}`);
  badge();
  loading = false;
  if (!first) await ui.fade(false);
  if (hud) ui.titleCard(a.title, a.sub);
}

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

let focusTarget: (typeof talk)[number] | null = null;
function speak(line: Line, then?: () => void): void {
  ui.say({ name: line.name, portrait: line.portrait, lines: line.lines }, then);
}
function act(): void {
  if (loading) return;
  if (ui.talking) { ui.advance(); return; }
  const t = focusTarget;
  if (!t) return;
  if (t.walker) t.walker.face(player.root.position.x - t.pos.x, player.root.position.z - t.pos.z);
  const go = t.go;
  const travel = go ? (): void => { void enter(go.to, go.spawn); } : undefined;
  if (t.say) speak(t.say, travel);
  else travel?.();
}

function nearestTalkable(): (typeof talk)[number] | null {
  const p = player.root.position;
  const fx = player.dir === 'W' ? -1 : player.dir === 'E' ? 1 : 0;
  const fz = player.dir === 'N' ? -1 : player.dir === 'S' ? 1 : 0;
  let best: (typeof talk)[number] | null = null, bestD = Infinity;
  for (const t of talk) {
    const dx = t.pos.x - p.x, dz = t.pos.z - p.z, d = Math.hypot(dx, dz);
    if (d > (t.reach ?? 1.6)) continue;
    const ahead = (dx * fx + dz * fz) / (d || 1);
    if (d > 0.95 && ahead < 0.3) continue;
    if (d < bestD) { bestD = d; best = t; }
  }
  return best;
}

// ------------------------------------------------------------- movement
const R = 0.28;
function free(x: number, z: number, fx: number, fz: number): boolean {
  if (area!.blocked(x, z, R, fx, fz)) return false;
  for (const c of cast) if (Math.hypot(c.pos.x - x, c.pos.z - z) < 0.55) return false;
  return true;
}

function update(dt: number): void {
  const a = area!;
  let ix = 0, iz = 0;
  if (!ui.talking && !loading) {
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
    if (free(p.x + nx, p.z, p.x, p.z)) { p.x += nx; moved = true; }
    if (free(p.x, p.z + nz, p.x, p.z)) { p.z += nz; moved = true; }
    p.y = a.ground(p.x, p.z);
  }
  player.animate(dt, moved, run ? 1.5 : 1);

  // triggers: walk off an edge to travel, or get turned back with a word
  if (!loading) {
    const hit = a.triggers.find((t) => p.x > t.x0 && p.x < t.x1 && p.z > t.z0 && p.z < t.z1);
    if (hit && !inTrigger) {
      inTrigger = true;
      if (hit.go) void enter(hit.go.to, hit.go.spawn);
      else if (hit.say) speak(hit.say);
    } else if (!hit) inTrigger = false;
  }

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
  o.y = a.ground(o.x, o.z);
  ohm.step(dt, o.x - ox, o.z - oz);

  for (const c of cast) c.w.animate(dt, false);

  // camera: smooth follow, clamped to the diorama
  clampCam(desired.copy(p).setY(0.8));
  camTarget.lerp(desired, 1 - Math.exp(-dt * 4.5));
  camera.position.copy(camTarget).add(CAM_OFFSET);
  camera.lookAt(camTarget);
  lights!.follow(wide ? camTarget : p);

  // tilt-shift focus band rides the player's screen height (sharp even where the camera clamps)
  const sp = p.clone().setY(p.y + 0.8).project(camera);
  tiltFocus += ((sp.y + 1) / 2 - tiltFocus) * (1 - Math.exp(-dt * 6));
  post.tiltH.uniforms.focus!.value = post.tiltV.uniforms.focus!.value = wide ? 0.45 : tiltFocus;

  // interact prompt
  focusTarget = ui.talking || loading ? null : nearestTalkable();
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

const startArea = AREAS[q.get('area') ?? ''] ? q.get('area')! : 'ohmstead';
await enter(startArea, 'start', true);
if (hud) {
  ui.hint(matchMedia('(pointer: coarse)').matches
    ? 'Stick to move · A to talk'
    : '<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> move · <kbd>Shift</kbd> run · <kbd>E</kbd> talk');
}

const clock = new THREE.Clock();
let t = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  if (area && !loading) {
    update(dt);
    area.update(t, player.root.position, camTarget);
  }
  post.tick(t);
  post.composer.render(dt);
});
Object.assign(window, { __ready: true, __hd2d: { get scene() { return scene; }, camera, player, ohm, THREE, enter } });
