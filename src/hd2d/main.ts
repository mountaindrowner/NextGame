import * as THREE from 'three';
import { createPost } from './post';
import { applyMood, moodPost, DAY, type Lights } from './mood';
import { BattleArena } from './battle/arena';
import { themeFor, type ThemeId } from './battle/themes';
import { GAME_DATA } from '../data/dataview';
import { ZONES_BY_ID } from '../data/encounters';
import { makeBattler } from '../core/battle/engine';
import type { Battler } from '../core/battle/contract';
import { rollEncounter } from '../core/encounter';
import { Rng } from '../core/rng';
import { Walker, OhmFollower, RotHero, stillSprite, spriteCard, type Dir } from './sprites';
import { world } from './world';
import { UI } from './ui';
import type { Area, AreaBuilder, Line, Thing, Travel } from './area';
import { buildField } from './field/area';
import { buildFarmRoad } from './farmroad/area';
import { buildOhmstead } from './ohmstead/area';
import { buildRailhead } from './railhead/area';
import { buildScar } from './scar/area';
import { buildCistern } from './cistern/area';
import { buildOverworld, OVERWORLD_IDS, overworldOffset } from './overworld/area';
import { REGION1 } from './region1';
import { beginArea } from './world';
import { partyHasFieldAbility, HOVER_GIFT_SPECIES } from '../data/field-abilities';

/**
 * OHMFRONT HD-2D — the first map: Ohmstead → the Field → Farm Road.
 * A fixed, tilted perspective camera over 3D dioramas; 2D pixel-art
 * characters standing in them; tilt-shift always on.
 *
 * URL: ?area=ohmstead|field|farmroad · ?time=night · ?x=&z= start ·
 *      ?face=n|s|w|e · ?wide=1 overview · ?hud=0
 */

const AREAS: Record<string, AreaBuilder> = { ohmstead: buildOhmstead, field: buildField, farmroad: buildFarmRoad, railhead: buildRailhead, scar: buildScar, cistern: buildCistern, overworld: buildOverworld, ...REGION1 };

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
let gotHover = false;
// The HOVER ride: over open water SAL rises onto the drone and glides.
let hoverLift = 0;
let hoverRig: RotHero | null = null;
void RotHero.load('dronelet', new THREE.Color(1, 1, 1), 0.78).then((h) => { hoverRig = h; h.root.visible = false; scene.add(h.root); }).catch(() => undefined);

/** The Cistern lends a survey Dronelet so any party can cross the flood (canon text from the old scene). */
function takeHoverDrone(): void {
  if (partyHasFieldAbility(party, 'HOVER')) { speak({ lines: ['The survey drone bobs in its cradle. One of yours already hovers — leave this for the next crew.'] }); return; }
  if (gotHover) { speak({ lines: ['The cradle is empty. You already took the survey drone.'] }); return; }
  const ohm = makeBattler(GAME_DATA.species(HOVER_GIFT_SPECIES), 10, GAME_DATA);
  if (party.length < 3) party.push(ohm); else storage.push(ohm);
  gotHover = true;
  speak({ lines: ['You lift a battered survey Dronelet from its cradle. It hums, rises, and tucks in beside you. It can HOVER you across the flood.'] });
}

// --------------------------------------------------------------- battle
// The lead Ohm: Scraplet (the Dog line), Lv5, HP carried between fights.
const lead = makeBattler(GAME_DATA.species(7), 5, GAME_DATA);
const encRng = new Rng(Date.now() >>> 0);
let arena: BattleArena | null = null;
let stepAcc = 0;

/** Fade into the grid arena, fight, fade back to the overworld. */
// The party (canon: 3); further catches go to storage. Storage nodes are spent per capture attempt.
const party: Battler[] = [lead];
const storage: Battler[] = [];
let nodes = Number(q.get('nodes') ?? 5);

async function battle(foeNum: number, foeLevel: number): Promise<'victory' | 'defeat' | 'fled' | 'captured' | 'foeFled' | 'skipped'> {
  if (arena || loading) return 'skipped';
  loading = true;
  keys.clear();
  ui.showPrompt(null);
  await ui.fade(true, 380);
  const a = new BattleArena(app, GAME_DATA, encRng.int(1, 1e9));
  ui.root.classList.add('battling');
  arena = a;
  a.resize(window.innerWidth, window.innerHeight);
  const run = a.start({ mood: area!.mood, renderer, post, me: lead, foeNum, foeLevel, heroId: heroId === 'old' ? undefined : heroId, nodes: () => nodes, spendNode: () => { nodes -= 1; }, theme: (q.get('arena') as ThemeId | null) ?? themeFor(area!.region ?? area!.id) });
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
  if (result.outcome === 'captured' && result.foe) {
    const f = result.foe;
    f.rage = 0;
    f.stages = { integrity: 0, output: 0, armor: 0, surge: 0, shielding: 0, clock: 0, accuracy: 0, evasion: 0 };
    if (party.length < 3) { party.push(f); speak({ name: f.name, lines: [`${f.name} is Freed — and joins your party. (${party.length}/3)`, 'Logged in the Manifest.'] }); }
    else { storage.push(f); speak({ name: f.name, lines: [`${f.name} is Freed. Your party's full, so it's sent to storage over the satnet.`, 'Logged in the Manifest.'] }); }
  }
  return result.outcome;
}

// ------------------------------------------------------------- roamers
// Visible wild Ohms (the design's mix of visible + random encounters). Beaten ones stay gone this session.
interface Roamer { key: string; num: number; level: number; home: THREE.Vector2; range: number; root: THREE.Object3D; goal: THREE.Vector2; next: number; cool: number }
let roamers: Roamer[] = [];
const beatenRoamers = new Set<string>();
async function spawnRoamers(a: Area, tint: THREE.Color): Promise<void> {
  roamers = [];
  await Promise.all((a.roamers ?? []).map(async (r, i) => {
    const key = `${a.id}:${i}`;
    if (beatenRoamers.has(key)) return;
    const root = await stillSprite(`./sprites/ohms/${r.num}_front_hd.png`, 1.35, tint).catch(() => null);
    if (!root) return;
    root.position.set(r.x, a.ground(r.x, r.z), r.z);
    scene.add(root);
    roamers.push({ key, num: r.num, level: r.level, home: new THREE.Vector2(r.x, r.z), range: r.range, root, goal: new THREE.Vector2(r.x, r.z), next: 0, cool: 0 });
  }));
}
function updateRoamers(dt: number, t: number): void {
  const a = area!, p = player.root.position;
  for (const r of roamers) {
    const pos = r.root.position;
    r.cool = Math.max(0, r.cool - dt);
    if (t > r.next) {
      const ang = encRng.next() * Math.PI * 2, d = encRng.next() * r.range;
      r.goal.set(r.home.x + Math.cos(ang) * d, r.home.y + Math.sin(ang) * d);
      r.next = t + 1.5 + encRng.next() * 2.5;
    }
    const dx = r.goal.x - pos.x, dz = r.goal.y - pos.z, dist = Math.hypot(dx, dz);
    if (dist > 0.05) {
      const k = Math.min(1, (1.3 * dt) / dist), nx = pos.x + dx * k, nz = pos.z + dz * k;
      if (!a.blocked(nx, nz, 0.3, pos.x, pos.z)) { pos.x = nx; pos.z = nz; } else r.next = 0;
      r.root.scale.x = dx < 0 ? -1 : 1;
    }
    pos.y = a.ground(pos.x, pos.z) + Math.abs(Math.sin(t * 7 + r.home.x)) * (dist > 0.05 ? 0.06 : 0.015);
    if (r.cool <= 0 && !loading && !ui.talking && Math.hypot(p.x - pos.x, p.z - pos.z) < 0.8) {
      r.cool = 4;
      void battle(r.num, r.level).then((out) => {
        if (out === 'victory' || out === 'captured' || out === 'foeFled') { beatenRoamers.add(r.key); scene.remove(r.root); roamers = roamers.filter((x) => x !== r); }
      });
    }
  }
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

/** The travel card's map: the Tallgrass crop of the gazetteer map (2× pixels). */
const TRAVEL_MAP = './world/ui/tallgrass-map.jpg';
function travelBox(path: Array<[number, number]>): [number, number, number, number] {
  const xs = path.map((q) => q[0]), ys = path.map((q) => q[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const w = Math.max(620, Math.max(...xs) - Math.min(...xs) + 360), h = w / 1.25;
  return [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];
}
const visited = new Set<string>();

/**
 * Travel. Every road and town is its own map (Mark, 2026-10-25): walking off an
 * edge is a quick pixel dissolve, a trip between regions adds the travel card,
 * and the lift and other doors keep the slower fade.
 */
async function enter(id: string, spawn: string, first = false, how: 'fade' | 'dissolve' = 'fade', travel?: Travel): Promise<void> {
  if (!AREAS[id] && !(OVERWORLD_IDS.has(id) && q.get('world') === 'continuous')) { speak({ lines: ['(This way isn\'t built yet.)'] }); return; }
  // ?world=continuous plays the old single seamless overworld, for comparison
  let off = { ox: 0, oz: 0 };
  if (OVERWORLD_IDS.has(id) && q.get('world') === 'continuous') { off = overworldOffset(id)!; spawn = `${id}:${spawn}`; id = 'overworld'; }
  loading = true;
  keys.clear();
  if (!first) await (how === 'dissolve' || travel ? ui.dissolve(true) : ui.fade(true));
  if (travel && hud) await ui.travel({ img: TRAVEL_MAP, box: travelBox(travel.path), path: travel.path, line: travel.line });
  const old = scene;
  old.remove(player.root, ohm.root);
  if (hoverRig) old.remove(hoverRig.root);
  dispose(old);
  scene = new THREE.Scene();
  if (hoverRig) { hoverRig.root.visible = false; scene.add(hoverRig.root); }
  post.setScene(scene);
  beginArea();
  const a = await AREAS[id]!(scene, night);
  area = a;
  a.onRegion = (title, sub) => { if (hud) ui.titleCard(title, sub); badge(); };
  lights = applyMood(scene, renderer, post, a.mood);
  const tint = new THREE.Color().setRGB(...a.mood.sprite);
  player.setTint(tint);
  ohm.setTint(tint);

  // a character that can't load is left out rather than failing the whole area
  const loaded = await Promise.all(a.npcs.map((n) => (styledChars.has(n.char) ? RotHero.load(n.char, tint) : Walker.load(n.char, tint)).catch((e: unknown) => { console.warn(`skipped ${n.char}:`, e); return null; })));
  const npcs = a.npcs.filter((_, i) => loaded[i]);
  const walkers = loaded.filter((w): w is Figure => !!w);
  cast = [];
  void spawnRoamers(a, tint);
  talk = a.things.map((t) => ({ ...t, pos: new THREE.Vector3(t.x, a.ground(t.x, t.z), t.z) }));
  npcs.forEach((n, i) => {
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

  const s = first && q.has('x') ? { x: Number(q.get('x')) + off.ox, z: Number(q.get('z')) + off.oz, face: (q.get('face')?.toUpperCase() ?? 'S') as Dir } : a.spawns[spawn] ?? a.spawns.start!;
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
  if (!first) await (how === 'dissolve' || travel ? ui.dissolve(false) : ui.fade(false));
  // towns and dungeons get the big card the first time; every other arrival a small name tag
  if (hud) {
    const big = !visited.has(a.id) && (!a.kind || a.kind === 'town' || a.kind === 'dungeon' || a.kind === 'home');
    if (big) ui.titleCard(a.title, a.sub); else ui.nameTag(a.title.replace(/^THE /, ''), a.kind === 'road' || a.kind === 'travel' ? a.sub : '');
  }
  visited.add(a.id);
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
  if (t.action === 'heal' || /recharge|rest|bench/i.test(t.label)) for (const m of party) m.integrity = m.stats.integrity; // a top-up for the party
  if (t.action === 'hovergift') { takeHoverDrone(); return; }
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
  if (area!.blocked(x, z, R, fx, fz, partyHasFieldAbility(party, 'HOVER'))) return false;
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
      if (hit.go) void enter(hit.go.to, hit.go.spawn, false, 'dissolve', hit.go.travel);
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
  o.y = a.ground(o.x, o.z) + (a.water?.(o.x, o.z) ? 0.3 : 0);

  // ride the drone across open water
  const onWater = !!a.water?.(p.x, p.z);
  hoverLift += ((onWater ? 0.42 : 0) - hoverLift) * Math.min(1, dt * 8);
  p.y = a.ground(p.x, p.z) + hoverLift + (onWater ? Math.sin(t * 3.2) * 0.04 : 0);
  if (hoverRig) {
    hoverRig.root.visible = hoverLift > 0.05;
    hoverRig.root.position.set(p.x, p.y - hoverLift + 0.02 + Math.sin(t * 3.2) * 0.04, p.z + 0.06);
    hoverRig.face(1, 0.3);
    hoverRig.animate(dt, false);
  }
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
// ?topdown=1 — a straight-down orthographic shot of the whole area (for the world map)
const topdown = q.get('topdown') === '1';
const topCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.5, 200);
const topFocus = new THREE.Vector3();
if (topdown) {
  // ?tdbox=x0,x1,z0,z1 shoots one part of a big area (the overworld map is taken in pieces)
  const box = q.get('tdbox')?.split(',').map(Number);
  const b = box && box.length === 4 ? { x0: box[0]!, x1: box[1]!, z0: box[2]!, z1: box[3]! } : area!.bounds ?? { x0: 0, x1: world().cols, z0: 0, z1: world().rows };
  const w = { cols: b.x1 - b.x0, rows: b.z1 - b.z0, cx: (b.x0 + b.x1) / 2, cz: (b.z0 + b.z1) / 2 };
  const pad = 0.5;
  topCam.left = -w.cols / 2 - pad; topCam.right = w.cols / 2 + pad;
  topCam.top = w.rows / 2 + pad; topCam.bottom = -w.rows / 2 - pad;
  topCam.position.set(w.cx, 80, w.cz + 0.001);
  topCam.lookAt(w.cx, 0, w.cz);
  topCam.updateProjectionMatrix();
  scene.fog = null;
  post.setScene(scene, topCam);
  post.tiltH.uniforms.maxBlur!.value = post.tiltV.uniforms.maxBlur!.value = 0;
  post.grade.uniforms.vignette!.value = 0;
  // one shadow map over the whole area, the sun parked over its centre
  const sun = lights!.sun, S = Math.max(w.cols, w.rows) * 0.75;
  Object.assign(sun.shadow.camera, { left: -S, right: S, top: S, bottom: -S, far: 140 });
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.map?.dispose();
  sun.shadow.map = null as unknown as THREE.WebGLRenderTarget;
  sun.shadow.camera.updateProjectionMatrix();
  lights!.follow(new THREE.Vector3(w.cx, 0, w.cz));
  topFocus.set(w.cx, 999, w.cz);
  lights = { sun, follow: () => undefined };
  player.root.visible = ohm.root.visible = false;
  ui.root.style.display = 'none';
}

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  t += dt;
  if (arena) {
    arena.stick = ui.stick;
    arena.update(dt);
  } else if (area && !loading) {
    update(dt);
    updateRoamers(dt, t);
    area.update(t, topdown ? topFocus : player.root.position, topdown ? topFocus : camTarget);
  }
  for (const l of lineupLabels) {
    const p = l.pos.clone().project(camera);
    l.el.style.left = `${(p.x + 1) / 2 * window.innerWidth}px`;
    l.el.style.top = `${(1 - p.y) / 2 * window.innerHeight + 8}px`;
  }
  post.tick(t);
  post.composer.render(dt);
});
Object.assign(window, { __ready: true, __hd2d: { get area() { return area; }, areas: Object.keys(AREAS), get scene() { return scene; }, get arena() { return arena; }, get roamers() { return roamers; }, party, storage, get nodes() { return nodes; }, lead, camera, player, ohm, THREE, enter } });
