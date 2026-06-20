/**
 * Auto-player (npm run autoplay) — plays OHMFRONT end-to-end like a player,
 * headlessly, driving the REAL systems (no browser). It carries a persistent
 * party/bag/levels/flags across the whole critical path: pick a starter, name
 * it, walk each map, fight every trainer, grind + try to capture wilds, heal/
 * recharge, evolve, save/load, and check fast-travel. Runs all three starters.
 * Narrates a play log + auto-flags friction. Findings printed (not committed).
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { Battle, makeBattler } from '../src/core/battle/engine';
import type { Battler, BattleEvent } from '../src/core/battle/contract';
import type { TypeName } from '../src/core/defs';
import { applyEvolution, pendingEvolutions } from '../src/core/evolution';
import { applyItemToBattler } from '../src/core/items';
import { buyItem, sellItem, sellValue } from '../src/core/shop';
import { rollEncounter } from '../src/core/encounter';
import { generatePuzzle, isSolved, solve } from '../src/core/puzzle';
import { Rng } from '../src/core/rng';
import { GAME_DATA } from '../src/data/dataview';
import { ZONES_BY_ID } from '../src/data/encounters';
import { ITEMS_BY_ID } from '../src/data/items';
import { SHOP_STOCK } from '../src/data/shops';
import { SPECIES_BY_NUM } from '../src/data/species';
import { RIDEABLES, WORLD_MAP } from '../src/data/region';
import { newGame, type StarterChoice } from '../src/game/state';
import { MemoryStorage, SaveSlots, serialize } from '../src/save/save';

const ROOT = new URL('..', import.meta.url).pathname;
const WORLD = join(ROOT, 'public/world');

interface MapJson {
  cols: number; rows: number; collision: number[]; grass: number[];
  zone?: string;
  spawn: { x: number; y: number };
  exits?: Array<{ x: number; y: number; scene: string; mapId?: string }>;
  npcs?: Array<{ name?: string; lines?: string[]; shop?: string; warden?: { team: Array<{ num: number; level: number }>; patch: string } }>;
  trainers?: Array<{ name: string; team: Array<{ num: number; level: number }>; bark?: string }>;
  items?: Array<{ credits: number; label?: string; hidden?: boolean }>;
  signs?: Array<{ text: string }>;
  ledges?: unknown[];
  interacts?: Array<{ kind: string; tier?: string }>;
}
const maps = new Map<string, MapJson>();
for (const f of readdirSync(WORLD).filter((x) => x.endsWith('.json'))) maps.set(f.replace('.json', ''), JSON.parse(readFileSync(join(WORLD, f), 'utf8')) as MapJson);

// the intended critical path (Ohmstead start → the Chancel)
const PATH = ['ohmstead', 'the-field', 'farmroad', 'railhead', 'cistern', 'bastion', 'redoubt', 'trinity', 'chancel'];

const findings = new Set<string>();
const flag = (s: string): void => { findings.add(s); };
const typeOf = (n: number): TypeName => GAME_DATA.species(n).type;
const nextSeedRun = (run: Run): number => { run.seedCounter = (run.seedCounter * 1103515245 + 12345) >>> 0; return run.seedCounter; };
const lead = (party: Battler[]): number => Math.max(...party.map((b) => b.level));
const alive = (party: Battler[]): boolean => party.some((b) => b.integrity > 0);

interface Run {
  starter: StarterChoice;
  party: Battler[];
  garage: Battler[];
  bag: Record<string, number>;
  credits: number;
  manifest: { seen: number[]; freed: number[] };
  flags: Record<string, boolean>;
  seedCounter: number;
  log: string[];
}

/** type-aware move pick; weak=true picks the gentlest damaging move (to weaken for capture). */
function pickMove(active: Battler, foe: Battler, weak = false): number {
  let best = 0;
  let bestScore = weak ? Infinity : -1;
  active.moves.forEach((m, i) => {
    if (m.pp <= 0) return;
    const def = GAME_DATA.move(m.id);
    if (def.power <= 0) return; // skip status/buff for damage decisions
    const stab = def.type === typeOf(active.speciesNum) ? 1.5 : 1;
    const eff = GAME_DATA.chart[def.type]?.[typeOf(foe.speciesNum)] ?? 1;
    const score = def.power * stab * eff;
    if (weak ? score < bestScore : score > bestScore) { bestScore = score; best = i; }
  });
  return best;
}

/** Index of a never-KO weakening move (HOBBLE) with PP left, or -1. */
function noKOIndex(active: Battler): number {
  return active.moves.findIndex((m) => m.pp > 0 && GAME_DATA.move(m.id).effect?.kind === 'noKO');
}

/** Pick a healthy (>50%) bench member that RESISTS the foe's type, or -1 (only swap when it helps). */
function bestSwitch(party: Battler[], active: Battler, foe: Battler): number {
  let best = -1;
  let bestHp = 0.5;
  party.forEach((b, i) => {
    if (b === active || b.integrity <= 0) return;
    const eff = GAME_DATA.chart[typeOf(foe.speciesNum)]?.[typeOf(b.speciesNum)] ?? 1;
    if (eff >= 1) return; // only switch into something that resists the foe
    const hp = b.integrity / b.stats.integrity;
    if (hp > bestHp) { bestHp = hp; best = i; }
  });
  return best;
}

/** Bag key of the best repair kit on hand, or undefined. */
function bestKit(run: Run): string | undefined {
  return ['repair-kit-max', 'repair-kit-plus', 'repair-kit'].find((k) => (run.bag[k] ?? 0) > 0);
}

/** Run a battle on the REAL party (mutates it). For wilds, try to weaken+capture. */
function playBattle(run: Run, foes: Battler[], kind: 'wild' | 'trainer', seed: number, wantCapture: boolean): { outcome: string; captured?: number; events: string[] } {
  const battle = new Battle({ kind, seed, party: run.party, foes, foeName: kind === 'trainer' ? 'Trainer' : undefined }, GAME_DATA);
  const ev: BattleEvent[] = battle.intro();
  const notes: string[] = [];
  let captured: number | undefined;
  const pump = (out: BattleEvent[]): void => { for (const e of out) { if (e.type === 'levelUp') notes.push(`${e.name}→Lv${e.level}`); if (e.type === 'captureSuccess') captured = e.speciesNum; if (e.type === 'salvage') run.bag[e.itemId] = (run.bag[e.itemId] ?? 0) + 1; } };
  pump(ev);
  let guard = 0;
  while (battle.phase === 'choosing' && guard++ < 300) {
    const active = battle.active;
    if (active.integrity <= 0) {
      const next = run.party.findIndex((p) => p.integrity > 0);
      if (next < 0) break;
      pump(battle.submit({ type: 'switch', index: next }));
      continue;
    }
    const foe = battle.foe;
    const foePct = foe.integrity / foe.stats.integrity;
    const myPct = active.integrity / active.stats.integrity;
    // are we trying to bring THIS wild home?
    const wk = wantCapture && kind === 'wild' && (run.bag['storage-node'] ?? 0) > 0 && (run.party.length < 3 || !run.manifest.freed.includes(foe.speciesNum));
    // capture attempt: weakened wild, a node on hand, and worth catching
    if (wk && foePct <= 0.35 && foe.integrity > 0) {
      run.bag['storage-node'] = (run.bag['storage-node'] ?? 1) - 1;
      const out = battle.submit({ type: 'capture' });
      const budget = out.find((e) => e.type === 'captureBudget');
      if (budget && budget.type === 'captureBudget') {
        const pz = generatePuzzle(budget.gridSize, new Rng(seed ^ 0x5eed));
        solve(pz);
        pump(battle.resolveCapture(isSolved(pz)));
      }
      continue;
    }
    // a player tops off a hurt active mid-fight (not when a catch is one hit away)
    if (myPct < 0.4 && !(wk && foePct <= 0.45)) {
      const kit = bestKit(run);
      if (kit) {
        run.bag[kit] = (run.bag[kit] ?? 1) - 1;
        pump(battle.submit({ type: 'item', itemId: kit, targetIndex: run.party.indexOf(active) }));
        continue;
      }
      // no kit — pivot to a bench member that resists the foe, if one's fresh
      const swap = bestSwitch(run.party, active, foe);
      if (swap >= 0) { pump(battle.submit({ type: 'switch', index: swap })); continue; }
    }
    // catching: chip the foe down with the never-KO HOBBLE from the start — we
    // only ever try to catch a wild we out-level, so a hard hit would overshoot
    // the capture band and down it (a high-OUTPUT starter one-shots a low wild)
    if (wk) {
      const nk = noKOIndex(active);
      pump(battle.submit({ type: 'move', index: nk >= 0 ? nk : pickMove(active, foe, true) }));
      continue;
    }
    pump(battle.submit({ type: 'move', index: pickMove(active, foe) }));
  }
  const outcome = battle.phase === 'done'
    ? (captured !== undefined ? 'captured' : !alive(run.party) ? 'defeat' : foes.every((f) => f.integrity <= 0) ? 'win' : 'fled')
    : 'stuck';
  if (captured !== undefined) {
    const mon = foes[0]!;
    if (!run.manifest.freed.includes(captured)) run.manifest.freed.push(captured);
    if (run.party.length < 3) run.party.push(mon); else run.garage.push(mon);
  }
  return { outcome, captured, events: notes };
}

function healParty(run: Run, full: boolean): void {
  for (const b of run.party) {
    if (full) { b.integrity = b.stats.integrity; b.status = undefined; b.statusTurns = 0; b.glitchedTurns = 0; for (const m of b.moves) m.pp = m.maxPp; }
  }
}
/** A player would pop a Repair Kit on a hurt member between fights. */
function patchUp(run: Run): void {
  const kit = ['repair-kit-max', 'repair-kit-plus', 'repair-kit'].find((k) => (run.bag[k] ?? 0) > 0);
  if (!kit) return;
  const hurt = run.party.find((b) => b.integrity > 0 && b.integrity < b.stats.integrity * 0.4);
  if (!hurt) return;
  const res = applyItemToBattler(ITEMS_BY_ID.get(kit)!, hurt);
  if (res.ok) run.bag[kit] = (run.bag[kit] ?? 1) - 1;
}
/**
 * Stop at a colony counter (GDD §10.8): sell every scrap of salvage, then
 * restock the staples a player keeps topped up — storage nodes, the best repair
 * kit the counter stocks, and a D-FIB or two — within a credit budget.
 */
function visitShop(run: Run, tier: string): string {
  const before = run.credits;
  const stock = SHOP_STOCK[tier] ?? [];
  // sell all salvage first (the credit faucet)
  let soldValue = 0;
  for (const [id, n] of Object.entries(run.bag)) {
    const def = ITEMS_BY_ID.get(id);
    if (def && sellValue(def) > 0 && n > 0) {
      soldValue += sellValue(def) * n;
      sellItem(run, def, n);
    }
  }
  // restock to target counts, cheapest-useful first, keeping a small reserve
  const wants: Array<[string, number]> = [
    ['storage-node', 8],
    [stock.includes('repair-kit-max') ? 'repair-kit-max' : stock.includes('repair-kit-plus') ? 'repair-kit-plus' : 'repair-kit', 6],
    ['d-fib', 2],
  ];
  let bought = 0;
  for (const [id, target] of wants) {
    const def = ITEMS_BY_ID.get(id);
    if (!def || !stock.includes(id)) continue;
    while ((run.bag[id] ?? 0) < target && run.credits >= def.price + 300) {
      if (!buyItem(run, def).ok) break;
      bought++;
    }
  }
  return `  shopped (${tier}): sold salvage +${soldValue} cr, bought ${bought} staple(s); credits ${before}→${run.credits}`;
}

function tryEvolve(run: Run): string[] {
  const done: string[] = [];
  let offers = pendingEvolutions(run.party, run.bag, GAME_DATA);
  let guard = 0;
  while (offers.length && guard++ < 6) {
    const o = offers[0]!;
    const member = run.party[o.partyIndex];
    if (!member || (run.bag[o.item] ?? 0) <= 0) break;
    run.bag[o.item] = (run.bag[o.item] ?? 1) - 1;
    const { from, to } = applyEvolution(member, GAME_DATA);
    if (!run.manifest.freed.includes(member.speciesNum)) run.manifest.freed.push(member.speciesNum);
    done.push(`${from}→${to}`);
    offers = pendingEvolutions(run.party, run.bag, GAME_DATA);
  }
  return done;
}

function playMap(run: Run, mapId: string): void {
  const m = maps.get(mapId);
  if (!m) { flag(`Critical-path map "${mapId}" has no data file.`); return; }
  const meta = WORLD_MAP[mapId];
  const garage = (mapId === 'the-field' || mapId === 'railhead' || mapId === 'bastion' || mapId === 'redoubt' || mapId === 'chancel');
  run.log.push(`\n— ${mapId.toUpperCase()} — (enter at lead Lv${lead(run.party)}, party ${run.party.length})`);

  // grab items, note NPCs/signs
  let credits = 0;
  for (const it of m.items ?? []) credits += it.credits;
  if (credits) { run.credits += credits; run.log.push(`  picked up ${(m.items ?? []).length} item(s): +${credits} cr`); }
  const dlg = (m.npcs ?? []).reduce((s, n) => s + (n.lines?.length ?? 0), 0);
  if ((m.npcs ?? []).length) run.log.push(`  talked to ${(m.npcs ?? []).length} NPC(s) (${dlg} lines)`);
  if (mapId === 'ohmstead') { run.log.push('  read Eli\'s logbook, hummed back at Banjo, used the Bench prompt'); }

  // stop at the colony counter on arrival: sell salvage, restock staples
  const shopTier = (m.npcs ?? []).find((n) => n.shop)?.shop;
  if (shopTier) run.log.push(visitShop(run, shopTier));

  // grind wilds (only on grass maps): a diligent player grinds up to the local
  // wild level, healing at the garage/medic between fights (heal access exists)
  if ((m.grass ?? []).some((g) => g === 1)) {
    const zone = ZONES_BY_ID.get(m.zone ?? 'field-grass');
    if (zone) {
      // grind to be ON-LEVEL for the fights ahead: the toughest local trainer
      // (falling back to the zone ceiling on trainer-less maps). Grinding to the
      // local trainer level is what keeps a player in step — so the losses that
      // remain reflect real fight difficulty, not under-levelling.
      const zoneMax = Math.max(...zone.slots.map((s) => s.maxLevel));
      const trMax = Math.max(0, ...(m.trainers ?? []).flatMap((t) => t.team.map((mem) => mem.level)));
      // a colony Warden gates progress, so a player grinds to clear it — match the ace
      const wardenMax = Math.max(0, ...(m.npcs ?? []).flatMap((n) => n.warden?.team.map((mem) => mem.level) ?? []));
      const target = Math.max(zoneMax, trMax, wardenMax);
      const rng = new Rng(0xABCD ^ mapId.length ^ run.starter.length);
      let fights = 0; let caught = 0; let kos = 0; let losses = 0; let koBeforeCatch = 0; let steps = 0;
      while (lead(run.party) < target && fights < 50 && steps < 900) {
        steps++;
        const sp = rollEncounter(zone, rng);
        if (!sp) continue;
        fights++;
        if (!run.manifest.seen.includes(sp.speciesNum)) run.manifest.seen.push(sp.speciesNum);
        const before = run.party.length;
        const foe = makeBattler(GAME_DATA.species(sp.speciesNum), sp.level, GAME_DATA);
        // only try to CATCH (and HOBBLE-weaken) a NEAR-LEVEL wild with bench room:
        // not above our level (unsafe to weaken with a fragile lead) and not far
        // below it (a too-low catch never keeps pace under shared XP) — exactly
        // the partner a player would actually keep
        const ld = lead(run.party);
        const wantCap = run.party.length < 3 && sp.level <= ld && sp.level >= ld - 4;
        const r = playBattle(run, [foe], 'wild', nextSeedRun(run), wantCap);
        if (r.outcome === 'captured') caught++;
        else if (r.outcome === 'win') kos++;
        else if (r.outcome === 'defeat') losses++;
        if (r.outcome === 'win' && before === run.party.length && (run.bag['storage-node'] ?? 0) > 0 && run.party.length < 3) koBeforeCatch++;
        healParty(run, true); // heal at the medic/garage between grind fights
      }
      run.log.push(`  ground ${fights} wild fights on ${m.zone ?? 'field-grass'} → lead Lv${lead(run.party)} (${kos} won, ${caught} captured${losses ? `, ${losses} lost` : ''})`);
      if (koBeforeCatch >= 2) flag(`"${mapId}": wilds get KO'd before they can be weakened for capture — no non-damaging weakening move on the starter (capturing early is luck-based).`);
      if (fights >= 48) flag(`"${mapId}": needed 50+ grind fights to reach the local level — XP gain may be too slow.`);
      if (losses > Math.max(4, fights * 0.4)) flag(`"${mapId}": lost ${losses}/${fights} grind fights even with heal access — the zone (to Lv${target}) out-levels what the player can field on arrival.`);
    }
  }

  // fight trainers (forced, in order)
  for (const t of m.trainers ?? []) {
    if (garage) healParty(run, true); else patchUp(run);
    const foes = t.team.map((mem) => makeBattler(GAME_DATA.species(mem.num), mem.level, GAME_DATA));
    const tLv = Math.max(...t.team.map((mem) => mem.level));
    const r = playBattle(run, foes, 'trainer', nextSeedRun(run), false);
    const evos = tryEvolve(run);
    let line = `  vs ${t.name} (${t.team.map((mem) => `${SPECIES_BY_NUM.get(mem.num)?.name} L${mem.level}`).join('+')}) → ${r.outcome.toUpperCase()} (lead Lv${lead(run.party)})`;
    if (r.events.length) line += ` [${r.events.join(', ')}]`;
    if (evos.length) line += ` {evolved: ${evos.join(', ')}}`;
    run.log.push(line);
    if (r.outcome === 'defeat') { flag(`Lost to trainer "${t.name}" (${mapId}, team to Lv${tLv}) at lead Lv${lead(run.party)} — possible difficulty wall / under-levelling.`); run.credits += 120; healParty(run, true); }
    else if (r.outcome === 'win') run.credits += 120;
  }

  // the colony Warden boss (the gym-leader gate) — fought after the local trainers
  const wardenNpc = (m.npcs ?? []).find((n) => n.warden);
  if (wardenNpc?.warden) {
    if (garage) healParty(run, true); else patchUp(run);
    const w = wardenNpc.warden;
    const foes = w.team.map((mem) => makeBattler(GAME_DATA.species(mem.num), mem.level, GAME_DATA));
    const wLv = Math.max(...w.team.map((mem) => mem.level));
    const r = playBattle(run, foes, 'trainer', nextSeedRun(run), false);
    tryEvolve(run);
    if (r.outcome === 'win' && !run.flags[w.patch]) run.flags[w.patch] = true; // earned the Patch
    run.log.push(`  ⚔ WARDEN ${wardenNpc.name} (${w.team.map((mem) => `${SPECIES_BY_NUM.get(mem.num)?.name} L${mem.level}`).join('+')}) → ${r.outcome.toUpperCase()} (lead Lv${lead(run.party)})${r.outcome === 'win' ? ` {earned ${w.patch}}` : ''}`);
    if (r.outcome === 'defeat') { flag(`Lost to WARDEN "${wardenNpc.name}" (${mapId}, team to Lv${wLv}) at lead Lv${lead(run.party)} — the colony gate is a wall here.`); healParty(run, true); }
  }

  // curve note: arriving badly under the local trainers
  const tMax = Math.max(0, ...(m.trainers ?? []).flatMap((t) => t.team.map((mem) => mem.level)));
  if (tMax > 0 && lead(run.party) + 4 < tMax) flag(`Reached "${mapId}" at lead Lv${lead(run.party)} but its trainers hit Lv${tMax} — a level-curve gap (grinding the same Field commons doesn't keep pace).`);

  // exercise the bag + fast-travel + save/load once mid-run (at railhead)
  if (mapId === 'railhead') {
    const dfib = run.party.find((b) => true);
    if (dfib) { dfib.integrity = 0; const r = applyItemToBattler(ITEMS_BY_ID.get('d-fib')!, dfib); run.log.push(`  tried D-FIB on a downed Ohm: ${r.ok ? 'revived ✓' : 'no-op ✗'}`); }
    const hasRide = [...run.party, ...run.garage].some((b) => RIDEABLES.has(b.speciesNum));
    run.log.push(`  opened the world-map: ${hasRide ? 'fast-travel available (caught a rideable)' : 'no rideable caught yet (Kartwheel is in the rail-yard — keep trying)'}`);
    const slots = new SaveSlots(new MemoryStorage());
    const snapshot = { schema: 2 as const, preset: 'SAL' as const, audio: { musicVolume: 0.7, sfxVolume: 0.85, muted: false }, party: run.party, garage: run.garage, manifest: run.manifest, patches: [], bag: run.bag, credits: run.credits, location: { map: mapId, x: 0, y: 0 }, flags: run.flags, playtimeSeconds: 0, seedCounter: run.seedCounter };
    slots.save(0, snapshot);
    const loaded = slots.load(0);
    run.log.push(`  saved + reloaded: ${loaded && serialize(loaded) === serialize(snapshot) ? 'roundtrip ✓' : 'MISMATCH ✗'}`);
  }
}

function playthrough(starter: StarterChoice, preset: 'SAL' | 'WREN'): Run {
  const g = newGame(preset, { starter });
  const run: Run = { starter, party: g.party, garage: g.garage, bag: g.bag, credits: g.credits, manifest: g.manifest, flags: g.flags, seedCounter: g.seedCounter, log: [] };
  const s = GAME_DATA.species(run.party[0]!.speciesNum);
  run.party[0]!.name = preset === 'SAL' ? 'Zip' : 'Tup'; // a nicknamed starter
  run.log.push(`=== ${preset} picks the ${starter.toUpperCase()} (${s.name} ${s.type}), names it "${run.party[0]!.name}", Lv${run.party[0]!.level} ===`);
  for (const mapId of PATH) playMap(run, mapId);
  run.log.push(`\n  FINISH: reached the Chancel at lead Lv${lead(run.party)}; party ${run.party.map((b) => `${b.name}(${GAME_DATA.species(b.speciesNum).name} Lv${b.level})`).join(', ')}; garage ${run.garage.length}; ${run.manifest.freed.length} freed / ${run.manifest.seen.length} seen.`);
  if (lead(run.party) < 26) flag(`A natural playthrough reaches the Chancel (Lv26-33 wilds + trainers) at only lead Lv${lead(run.party)} — badly under-levelled for the finale of the built content.`);
  return run;
}

// ---- run all three starters ---------------------------------------------
const runs = (['scooter', 'drone', 'dog'] as StarterChoice[]).map((st, i) => playthrough(st, i === 0 ? 'SAL' : 'WREN'));

for (const r of runs) { console.log(r.log.join('\n')); console.log(''); }
console.log('================ AUTO-PLAY FINDINGS ================');
[...findings].forEach((f, i) => console.log(`${i + 1}. ${f}`));
console.log(`\n(${findings.size} auto-detected; the qualitative/UX list is written separately.)`);
