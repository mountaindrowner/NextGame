/**
 * Playtest harness (npm run playtest) — a headless drive of the real game
 * systems so we can "play" OHMFRONT without a browser and surface what's
 * missing. It walks the world graph, censuses every map's content, probes
 * combat balance through the real Battle engine, checks species obtainability,
 * and exercises evolution / items / save-load. Writes playtest-report.md and
 * prints a condensed summary + a FINDINGS list. Deterministic (seeded).
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { Battle, makeBattler } from '../src/core/battle/engine';
import type { Battler } from '../src/core/battle/contract';
import { applyEvolution, pendingEvolutions } from '../src/core/evolution';
import { applyItemToBattler } from '../src/core/items';
import { rollEncounter } from '../src/core/encounter';
import { Rng } from '../src/core/rng';
import { GAME_DATA } from '../src/data/dataview';
import { ENCOUNTER_ZONES, ZONES_BY_ID } from '../src/data/encounters';
import { ITEMS_BY_ID } from '../src/data/items';
import { SPECIES, SPECIES_BY_NUM } from '../src/data/species';
import { neighbor, REGION, WORLD_MAP, type Dir4 } from '../src/data/region';
import { newGame } from '../src/game/state';
import { MemoryStorage, SaveSlots, serialize } from '../src/save/save';

const ROOT = new URL('..', import.meta.url).pathname;
const WORLD = join(ROOT, 'public/world');
const START = 'the-field';
const findings: string[] = [];
const flag = (s: string): void => { findings.push(s); };

interface MapJson {
  cols: number; rows: number; collision: number[]; grass: number[];
  spawn: { x: number; y: number };
  zone?: string;
  exits?: Array<{ x: number; y: number; scene: string; mapId?: string; to?: { x: number; y: number } }>;
  npcs?: Array<{ name?: string; lines?: string[]; col: number; row: number }>;
  trainers?: Array<{ name: string; col: number; row: number; team: Array<{ num: number; level: number }> }>;
  items?: Array<{ col: number; row: number; credits: number }>;
  signs?: Array<{ col: number; row: number; text: string }>;
  ledges?: Array<{ col: number; row: number; dir: string }>;
}

// ---- load all maps -------------------------------------------------------
const mapFiles = readdirSync(WORLD).filter((f) => f.endsWith('.json'));
const maps = new Map<string, MapJson>();
for (const f of mapFiles) maps.set(f.replace('.json', ''), JSON.parse(readFileSync(join(WORLD, f), 'utf8')) as MapJson);

// ---- world connectivity --------------------------------------------------
function neighborsOf(id: string): string[] {
  const out = new Set<string>();
  for (const ex of maps.get(id)?.exits ?? []) if (ex.mapId && maps.has(ex.mapId)) out.add(ex.mapId);
  for (const d of ['n', 's', 'e', 'w'] as Dir4[]) { const nb = neighbor(id, d); if (nb && maps.has(nb)) out.add(nb); }
  return [...out];
}
function floodWorld(start: string): Set<string> {
  const seen = new Set<string>([start]);
  const q = [start];
  while (q.length) { const m = q.shift()!; for (const nb of neighborsOf(m)) if (!seen.has(nb)) { seen.add(nb); q.push(nb); } }
  return seen;
}
const reachable = floodWorld(START);
for (const id of maps.keys()) {
  if (reachable.has(id) || id === 'ohmstead') continue; // ohmstead is reached via the elevator scene
  flag(`Map "${id}" is unreachable from ${START} (no exit/edge chain).`);
}
for (const [id, m] of maps) {
  for (const ex of m.exits ?? []) {
    if (ex.mapId && !maps.has(ex.mapId)) flag(`"${id}" has an exit to missing map "${ex.mapId}".`);
    if (ex.to && ex.mapId && maps.has(ex.mapId)) { const t = maps.get(ex.mapId)!; if (t.collision[ex.to.y * t.cols + ex.to.x] === 1) flag(`"${id}"→"${ex.mapId}" lands on a solid cell (${ex.to.x},${ex.to.y}).`); }
  }
}

// ---- per-map flood (in-map reachability) ---------------------------------
function inMapReach(m: MapJson): { walk: number; reach: number; enc: number; encReach: number } {
  const seen = new Array(m.cols * m.rows).fill(false);
  const idx = (x: number, y: number): number => y * m.cols + x;
  const q: Array<[number, number]> = [[m.spawn.x, m.spawn.y]];
  seen[idx(m.spawn.x, m.spawn.y)] = true;
  while (q.length) { const [x, y] = q.pop()!; for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]] as Array<[number, number]>) { const nx = x + dx; const ny = y + dy; if (nx < 0 || ny < 0 || nx >= m.cols || ny >= m.rows) continue; const k = idx(nx, ny); if (seen[k] || m.collision[k] === 1) continue; seen[k] = true; q.push([nx, ny]); } }
  let walk = 0; let reach = 0; let enc = 0; let encReach = 0;
  for (let k = 0; k < m.cols * m.rows; k++) { if (m.collision[k] === 0) { walk++; if (seen[k]) reach++; } if (m.grass[k] === 1) { enc++; if (seen[k]) encReach++; } }
  return { walk, reach, enc, encReach };
}

// ---- combat sim ----------------------------------------------------------
function grownStarter(num: number, level: number): Battler {
  const b = makeBattler(GAME_DATA.species(num), level, GAME_DATA, { plating: 'heavy' });
  for (;;) { const evo = GAME_DATA.species(b.speciesNum).evolution; if (!evo || b.level < evo.level) break; applyEvolution(b, GAME_DATA); }
  return b;
}
function autoBattle(party: Battler[], foes: Battler[], seed: number): { win: boolean; turns: number; downed: number } {
  const pc = party.map((b) => structuredClone(b));
  const fc = foes.map((b) => structuredClone(b));
  const battle = new Battle({ kind: foes.length > 1 ? 'trainer' : 'wild', seed, party: pc, foes: fc, foeName: 'Probe' }, GAME_DATA);
  battle.intro();
  let guard = 0;
  while (battle.phase === 'choosing' && guard++ < 400) {
    if (battle.active.integrity <= 0) { const next = pc.findIndex((p) => p.integrity > 0); if (next < 0) break; battle.submit({ type: 'switch', index: next }); continue; }
    let best = 0; let bestPow = -1;
    battle.active.moves.forEach((m, i) => { if (m.pp <= 0) return; const pow = GAME_DATA.move(m.id).power; if (pow > bestPow) { bestPow = pow; best = i; } });
    battle.submit({ type: 'move', index: best });
  }
  return { win: fc.every((f) => f.integrity <= 0), turns: guard, downed: pc.filter((p) => p.integrity <= 0).length };
}

// ---- build the report ----------------------------------------------------
const L: string[] = [];
const p = (s = ''): void => { L.push(s); };
p('# OHMFRONT — Playtest Report');
p(`_Headless drive of the real systems. Generated ${new Date().toISOString().slice(0, 16).replace('T', ' ')}._`);
p('');

p('## World connectivity');
p(`Maps on disk: ${maps.size}. Reachable from **${START}**: ${reachable.size}.`);
p('');
p('| map | reachable | neighbours |');
p('|---|---|---|');
for (const id of maps.keys()) p(`| ${id} | ${reachable.has(id) ? '✓' : id === 'ohmstead' ? '(elevator)' : '✗'} | ${neighborsOf(id).join(', ') || '—'} |`);
p('');

p('## Per-map census');
p('| map | zone | walk% | enc cells | NPCs | dlg lines | trainers | items | signs | ledges |');
p('|---|---|---|---|---|---|---|---|---|---|');
let totalLines = 0; let totalTrainers = 0;
for (const [id, m] of maps) {
  const r = inMapReach(m);
  const lines = (m.npcs ?? []).reduce((s, n) => s + (n.lines?.length ?? 0), 0);
  totalLines += lines; totalTrainers += (m.trainers ?? []).length;
  const wp = ((r.reach / Math.max(1, r.walk)) * 100).toFixed(0);
  if (r.reach < r.walk) flag(`"${id}": only ${wp}% of walkable cells reachable from spawn (${r.walk - r.reach} stranded).`);
  if (r.enc > 0 && r.encReach < r.enc) flag(`"${id}": ${r.enc - r.encReach} encounter cells unreachable.`);
  if (reachable.has(id) && (m.npcs ?? []).length === 0 && (m.trainers ?? []).length === 0) flag(`"${id}" has no NPCs or trainers (feels empty).`);
  const tMax = Math.max(0, ...(m.trainers ?? []).map((t) => Math.max(...t.team.map((mem) => mem.level))));
  if (reachable.has(id) && (m.zone ?? 'field-grass') === 'field-grass' && tMax > 8) flag(`"${id}" rolls the starter Field table (Lv2-6 commons) but its trainers reach Lv${tMax} — wild encounters are under-leveled and off-theme (needs its own zone).`);
  p(`| ${id} | ${m.zone ?? 'field-grass'} | ${wp}% | ${r.enc} | ${(m.npcs ?? []).length} | ${lines} | ${(m.trainers ?? []).length} | ${(m.items ?? []).length} | ${(m.signs ?? []).length} | ${(m.ledges ?? []).length} |`);
}
p('');
p(`Total world NPC dialogue lines: **${totalLines}**. Total overworld trainers: **${totalTrainers}**.`);
p('');

p('## Species obtainability');
const usedZones = new Set<string>();
for (const id of reachable) usedZones.add(maps.get(id)?.zone ?? 'field-grass');
for (const z of ENCOUNTER_ZONES) if (!usedZones.has(z.id)) flag(`Encounter zone "${z.id}" is defined but used by no reachable map.`);
const evoClose = (s: Set<number>): Set<number> => { const out = new Set(s); let grew = true; while (grew) { grew = false; for (const n of [...out]) { const e = SPECIES_BY_NUM.get(n)?.evolution; if (e && !out.has(e.toNum)) { out.add(e.toNum); grew = true; } } } return out; };
const catchable = new Set<number>([1, 4, 7]); // starters
for (const z of usedZones) for (const slot of ZONES_BY_ID.get(z)?.slots ?? []) catchable.add(slot.speciesNum);
const obtainable = evoClose(catchable);
const seenOnly = new Set<number>();
for (const id of reachable) for (const t of maps.get(id)?.trainers ?? []) for (const mem of t.team) if (!obtainable.has(mem.num)) seenOnly.add(mem.num);
const unobtainable = SPECIES.filter((s) => !obtainable.has(s.num) && !seenOnly.has(s.num));
p(`Catchable species (encounters + starters): **${catchable.size}**. With evolutions grown: **${obtainable.size}** / 150.`);
p(`Seen-only (trainer teams, not catchable): **${seenOnly.size}**.`);
p(`Neither obtainable nor seen anywhere yet: **${unobtainable.length}** / 150.`);
p('');
p(`Used encounter zones: ${[...usedZones].join(', ')}.`);
p('');

p('## Combat balance probe (auto-battle, greedy AI)');
p('_Wilds: one on-level starter (rotated across the three lines) vs sampled wilds. Trainers: a level-matched starter trio._');
p('| zone | player Lv | foes (Lv) | win% (n=42) | avg turns |');
p('|---|---|---|---|---|');
const STARTERS = [1, 4, 7];
for (const z of ENCOUNTER_ZONES) {
  if (!usedZones.has(z.id)) continue;
  const lvl = Math.max(...z.slots.map((s) => s.maxLevel));
  const rng = new Rng(1234);
  let wins = 0; let turns = 0; const n = 42;
  for (let i = 0; i < n; i++) {
    const solo = [grownStarter(STARTERS[i % 3]!, lvl)]; // a single, on-level Ohm — a fair fight
    const spawn = rollEncounter(z, rng) ?? { speciesNum: z.slots[0]!.speciesNum, level: z.slots[0]!.minLevel };
    const foe = makeBattler(GAME_DATA.species(spawn.speciesNum), spawn.level, GAME_DATA);
    const res = autoBattle(solo, [foe], 9000 + i);
    if (res.win) wins++; turns += res.turns;
  }
  const wp = (wins / n) * 100;
  if (wp < 55) flag(`Balance: an on-level solo starter wins only ${wp.toFixed(0)}% of "${z.id}" wilds — may be too hard.`);
  p(`| ${z.id} | Lv${lvl} solo | ${z.slots.length} spp ${Math.min(...z.slots.map((s) => s.minLevel))}-${Math.max(...z.slots.map((s) => s.maxLevel))} | ${wp.toFixed(0)}% | ${(turns / n).toFixed(1)} |`);
}
p('');
p('### Critical-path trainers');
p('| map | trainer | team | player Lv | result |');
p('|---|---|---|---|---|');
for (const id of reachable) {
  for (const t of maps.get(id)?.trainers ?? []) {
    const teamLvl = Math.max(...t.team.map((m) => m.level));
    const party = STARTERS.map((n) => grownStarter(n, teamLvl + 1));
    const foes = t.team.map((m) => makeBattler(GAME_DATA.species(m.num), m.level, GAME_DATA));
    const res = autoBattle(party, foes, 4242);
    if (!res.win) flag(`Trainer "${t.name}" (${id}) beat a level-matched starter party in the probe.`);
    p(`| ${id} | ${t.name} | ${t.team.map((m) => `${SPECIES_BY_NUM.get(m.num)?.name ?? m.num} L${m.level}`).join(', ')} | ${teamLvl + 1} | ${res.win ? 'win' : 'LOSS'} |`);
  }
}
p('');

p('## Systems checks');
const sys: string[] = [];
const ng = newGame('SAL', { locomotion: 'treads', core: 'furnace', plating: 'heavy' });
sys.push(`new game → party ${ng.party.length}, starter #${ng.party[0]!.speciesNum} ${ng.party[0]!.name}`);
const evoMon = grownStarter(1, 1); evoMon.level = 16;
const offers = pendingEvolutions([evoMon], { 'resonance-core': 1 }, GAME_DATA);
sys.push(`evolution offer at Lv16 w/ Resonance Core: ${offers.length === 1 ? 'fires ✓' : 'MISSING ✗'}`);
if (offers.length !== 1) flag('Evolution did not offer for a Lv16 Charkit with a Resonance Core.');
const hurt = makeBattler(GAME_DATA.species(1), 20, GAME_DATA); hurt.integrity = 1;
const heal = applyItemToBattler(ITEMS_BY_ID.get('repair-kit')!, hurt);
sys.push(`Repair Kit heal: ${heal.ok ? `✓ (+${hurt.integrity - 1})` : 'no-op ✗'}`);
const slots = new SaveSlots(new MemoryStorage()); slots.save(0, ng); const loaded = slots.load(0);
const roundtrip = loaded && serialize(loaded) === serialize(ng);
sys.push(`save → load roundtrip: ${roundtrip ? '✓' : 'MISMATCH ✗'}`);
if (!roundtrip) flag('Save/load roundtrip did not match.');
for (const s of sys) p(`- ${s}`);
p('');

p('## FINDINGS');
if (findings.length === 0) p('_No structural gaps detected by the harness._');
else for (const f of findings) p(`- ${f}`);
p('');
p(`_${findings.length} finding(s)._`);

const out = L.join('\n');
writeFileSync(join(ROOT, 'playtest-report.md'), out);

// ---- console summary -----------------------------------------------------
console.log(`\nPLAYTEST: ${maps.size} maps, ${reachable.size} reachable from ${START}.`);
console.log(`Content: ${totalLines} dialogue lines, ${totalTrainers} trainers; ${obtainable.size}/150 obtainable, ${unobtainable.length} species nowhere yet.`);
console.log(`Systems: ${sys.join(' · ')}`);
console.log(`\nFINDINGS (${findings.length}):`);
for (const f of findings) console.log(`  • ${f}`);
console.log(`\nFull report → playtest-report.md`);
