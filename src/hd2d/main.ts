import * as THREE from 'three';
import { createPost } from './post';
import { applyMood, moodPost, DAY, type Lights } from './mood';
import { BattleArena } from './battle/arena';
import { GAME_DATA } from '../data/dataview';
import { ZONES_BY_ID } from '../data/encounters';
import { makeBattler } from '../core/battle/engine';
import { rollEncounter } from '../core/encounter';
import { Rng } from '../core/rng';
import { Walker, OhmFollower, RotHero, stillSprite, spriteCard, type Dir } from './sprites';
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
type Figure = Walker | RotHero;
let cast: Array<{ w: Figure; pos: THREE.Vector3 }> = [];
let talk: Array<Thing & { walker?: Figure; pos: THREE.Vector3 }> = [];

/** Characters already redrawn in SAL's locked style (public/world/styles/index.json). */
const styled = (await fetch('./world/styles/index.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({}))) as { characters?: string[]; ohms?: Record<string, string> };
const styledChars = new Set(styled.characters ?? []);
const FACE: Record<string, [number, number]> = { N: [0, -1], S: [0, 1], W: [-1, 0], E: [1, 0] };
let inTrigger = false;
const trail: THREE.Vector3[] = [];
const camTarget = new THREE.Vector3();
const desired = new THREE.Vector3();
let tiltFocus = 0.46;

// --------------------------------------------------------------- battle
// The lead Ohm: Scraplet (the Dog line), Lv5, HP carried between fights.
const lead = makeBattler(GAME_DATA.species(7), 5, GAME_DATA);
const encRng = new Rng(Date.now() >>> 0);
let arena: BattleArena | null = null;
let stepAcc = 0;

/** Fade into the grid arena, fight, fade back to the overworld. */
async function battle(foeNum: number, foeLevel: number): Promise<void> {
  if (arena || loading) return;
  loading = true;
  keys.clear();
  ui.showPrompt(null);
  await ui.fade(true, 380);
  const a = new BattleArena(app, GAME_DATA, encRng.int(1, 1e9));
  ui.root.classList.add('battling');
  arena = a;
  a.resize(window.innerWidth, window.innerHeight);
  const run = a.start({ mood: area!.sky ? area!.mood : DAY, renderer, post, me: lead, foeNum, foeLevel, heroId: heroId === 'old' ? undefined : heroId });
  await new Promise((r) => setTimeout(r, 60));
  post.setScene(a.scene, a.camera);
  post.tiltH.uniforms.focus!.value = post.tiltV.uniforms.focus!.value = 0.42;
  await ui.fade(false, 380);
  const result = await run;
  await ui.fade(true, 420);
  a.dispose();
  ui.root.classList.remove('battling');
  arena = null;
  post.setScene(scene, camera);
  moodPost(renderer, post, area!.mood);
  if (result.outcome === 'defeat') lead.integrity = lead.stats.integrity; // limps home recharged — the proof has no whiteout yet
  loading = false;
  await ui.fade(false, 420);
  if (result.outcome === 'defeat') speak({ lines: [`${lead.name} needs a recharge. You pull back to catch your breath.`] });
}
let hopping = false;
let dropAcc = 0;

// SAL's locked look is the indie-action style (e_pro, Mark 2026-10-23).
// ?hero=<style id> tries another candidate; ?hero=old plays the previous sprite.
const heroId = q.get('hero') ?? 'e_pro';
/** The lead Ohm: the restyled 8-direction Scraplet when present, else the old stills. */
interface Follower { root: THREE.Group; setTint(c: THREE.Color): void; step(dt: number, dx: number, dz: number): void }
async function loadFollower(): Promise<Follower> {
  const id = styled.ohms?.['7'];
  if (!id) return OhmFollower.load(7, new THREE.Color(1, 1, 1));
  const h = await RotHero.load(id, new THREE.Color(1, 1, 1), 0.85);
  return {
    root: h.root,
    setTint: (c) => h.setTint(c),
    step(dt, dx, dz) {
      const moving = Math.hypot(dx, dz) > 1e-4;
      if (moving) h.face(dx, dz);
      h.animate(dt, moving, 1.2);
    },
  };
}
const [player, ohm] = await Promise.all([
  heroId === 'old' ? Walker.load('sal', new THREE.Color(1, 1, 1)) : RotHero.load(heroId, new THREE.Color(1, 1, 1)),
  loadFollower(), // Scraplet — the Dog line, stand-in lead Ohm
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

  const walkers: Figure[] = await Promise.all(a.npcs.map((n) => (styledChars.has(n.char) ? RotHero.load(n.char, tint) : Walker.load(n.char, tint))));
  cast = [];
  talk = a.things.map((t) => ({ ...t, pos: new THREE.Vector3(t.x, a.ground(t.x, t.z), t.z) }));
  a.npcs.forEach((n, i) => {
    const w = walkers[i]!;
    const x = n.col + 0.5, z = n.row + 0.5;
    w.root.position.set(x, a.ground(x, z), z);
    const f = FACE[n.facing ? n.facing.toUpperCase() : 'S'] ?? FACE.S!;
    w.face(f[0], f[1]);
    w.animate(0, false);
    scene.add(w.root);
    cast.push({ w, pos: w.root.position });
    if (n.lines?.length) {
      // the speaker's own sprite, facing left, stands at the right of the dialogue box
      const entry: (typeof talk)[number] = { x, z, height: 2.0, label: n.name, walker: w, pos: w.root.position, say: { name: n.name, lines: n.lines } };
      talk.push(entry);
      // new-style sprites use their left-facing three-quarter pose; old sheets' side row faces right, so card() mirrors it
      const card = w instanceof RotHero ? spriteCard(`./world/styles/${n.char}/south-west.png`) : w.card();
      void card.then((url) => { entry.say!.portrait = url; }).catch(() => undefined);
    }
  });

  const s = first && q.has('x') ? { x: Number(q.get('x')), z: Number(q.get('z')), face: (q.get('face')?.toUpperCase() ?? 'S') as Dir } : a.spawns[spawn] ?? a.spawns.start!;
  player.root.position.set(s.x, a.ground(s.x, s.z), s.z);
  const fv = FACE[s.face ?? 'S'] ?? FACE.S!;
  player.face(fv[0], fv[1]);
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
  const run = (): void => { if (t.say) speak(t.say, travel); else travel?.(); };
  if (/recharge|rest|bench/i.test(t.label)) lead.integrity = lead.stats.integrity; // a top-up for the lead Ohm
  // reach for objects (not people, not signs) before the line comes up
  if (!t.walker && t.label !== 'Read' && player instanceof RotHero && player.has('pickup')) {
    player.face(t.pos.x - player.root.position.x, t.pos.z - player.root.position.z);
    void player.play('pickup').then(run);
  } else run();
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
  const busy = player instanceof RotHero && player.busy && !hopping;
  if (!ui.talking && !loading && !busy) {
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
    const was = p.y;
    p.y = a.ground(p.x, p.z);
    // a sudden drop (a ledge): hop down it. Drops are summed over a few
    // frames so the trigger doesn't depend on frame rate; gentle slopes never add up.
    dropAcc = dropAcc * 0.75 + Math.max(0, was - p.y);
    if (dropAcc > 0.22 && player instanceof RotHero && player.has('hop') && !hopping) {
      hopping = true;
      void player.play('hop').then(() => { hopping = false; });
    }
  }
  player.animate(dt, moved, run ? 1.5 : 1);

  // tall grass: Gen 3 encounter roll per tile walked (rate/255 per step)
  if (moved && a.wild?.(p.x, p.z) && a.zone && !loading) {
    stepAcc += speed * dt;
    if (stepAcc >= 1) {
      stepAcc -= 1;
      const z = ZONES_BY_ID.get(a.zone);
      const spawn = z ? rollEncounter(z, encRng) : undefined;
      if (spawn) void battle(spawn.speciesNum, spawn.level);
    }
  }

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
  arena?.resize(w, h);
}
window.addEventListener('resize', resize);
resize();

const startArea = AREAS[q.get('area') ?? ''] ? q.get('area')! : 'ohmstead';
await enter(startArea, 'start', true);
// ?battle=<species>[&lv=] — jump straight into a grid battle (proof of concept)
if (q.has('battle')) setTimeout(() => void battle(Number(q.get('battle')) || 10, Number(q.get('lv') ?? 3)), 600);
if (hud) {
  ui.hint(matchMedia('(pointer: coarse)').matches
    ? 'Stick to move · A to talk'
    : '<kbd>WASD</kbd>/<kbd>←↑→↓</kbd> move · <kbd>Shift</kbd> run · <kbd>E</kbd> talk');
}

// ?lineup=sal — SAL art-style candidates standing in a row, labelled
const lineupLabels: Array<{ el: HTMLDivElement; pos: THREE.Vector3 }> = [];
const LINEUPS: Record<string, Array<[string, string, number?]>> = {
  sal: [
    ['a_chibi', 'A · Chibi adventure'], ['b_16bit', 'B · 16-bit JRPG'], ['c_handheld', 'C · Handheld tamer'], ['d_tactics', 'D · Tactics RPG'],
    ['e_indie', 'E · Indie action'], ['f_survival', 'F · Gritty survival'], ['g_cozy', 'G · Cozy life-sim'], ['h_anime', 'H · Anime action'],
  ],
  duo: [['snes8/south', 'B · 16-bit JRPG'], ['e_pro/south', 'E · Indie action']],
  cast: [
    ['e_pro/south', 'SAL'], ['wren/south', 'WREN'], ['mabel/south', 'Mabel'], ['boone/south', 'Boone'], ['cass/south', 'Cass'],
    ['odessa/south', 'Odessa'], ['rook/south', 'Rook'], ['scootlet/south', 'Scootlet', 0.8], ['dronelet/south', 'Dronelet', 0.8], ['scraplet/south', 'Scraplet', 0.8],
  ],
  snes8: ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'].map((d) => [`snes8/${d}`, d]),
  e_pro: ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'].map((d) => [`e_pro/${d}`, d]),
  b16: ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'].map((d) => [`b16/${d}`, d]),
  indie8: ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'].map((d) => [`indie8/${d}`, d]),
};
const lineup = LINEUPS[q.get('lineup') ?? ''];
if (lineup) {
  const styles = lineup;
  const tint = new THREE.Color().setRGB(...area!.mood.sprite);
  // the row stands where the player would, centred in the focus band
  const gap = styles.length <= 2 ? 2.2 : styles.length > 8 ? 1.25 : 1.5;
  const x0 = player.root.position.x - ((styles.length - 1) * gap) / 2, z0 = player.root.position.z;
  player.root.visible = ohm.root.visible = false;
  await Promise.all(styles.map(async ([file, label, ht], i) => {
    const s = await stillSprite(`./world/styles/${file}.png`, ht ?? 1.65, tint);
    const x = x0 + i * gap;
    s.position.set(x, area!.ground(x, z0), z0);
    scene.add(s);
    const el = document.createElement('div');
    el.textContent = label;
    el.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,0);font:600 13px "Alegreya Sans",sans-serif;color:#f1dfb1;background:rgba(14,15,18,.82);border:1px solid rgba(201,164,92,.6);padding:2px 8px;border-radius:999px;white-space:nowrap;pointer-events:none';
    app.appendChild(el);
    lineupLabels.push({ el, pos: s.position });
  }));
}

const clock = new THREE.Clock();
let t = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  if (arena) {
    arena.stick = ui.stick;
    arena.update(dt);
  } else if (area && !loading) {
    update(dt);
    area.update(t, player.root.position, camTarget);
  }
  for (const l of lineupLabels) {
    const p = l.pos.clone().project(camera);
    l.el.style.left = `${(p.x + 1) / 2 * window.innerWidth}px`;
    l.el.style.top = `${(1 - p.y) / 2 * window.innerHeight + 8}px`;
  }
  post.tick(t);
  post.composer.render(dt);
});
Object.assign(window, { __ready: true, __hd2d: { get scene() { return scene; }, get arena() { return arena; }, lead, camera, player, ohm, THREE, enter } });
