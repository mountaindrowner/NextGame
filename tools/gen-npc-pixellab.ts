/**
 * Generate the colony NPC cast via PixelLab (npm run gen:npc-cast).
 *
 * For each NPC it produces, into assets/reference/:
 *   <id>_portrait.png      a dialogue portrait bust (v1 pixflux)
 *   <id>__{s,e,n,w}.png    a 4-direction overworld character
 *   <id>__rotation.png     the four facings packed for review
 *   <id>_walk__strip.png   a south-facing walk cycle (animate-with-text-v3)
 *
 * Reuses the tested CLIs (tools/pixellab.ts, tools/pixellab-char.ts) via a child
 * process, so nothing here re-implements the API. Resumable: any step whose
 * output already exists is skipped. Credit-aware: stops with a clear message if
 * the PixelLab balance would fall to/under the 1000-generation floor (the
 * standing budget rule). Canon looks per docs/design/variable-npcs.md (§3 Look),
 * principal-cast.md, colony-npc-casts.md.
 *
 *   npm run gen:npc-cast                # the whole cast (resumable)
 *   npm run gen:npc-cast -- --only rook # one NPC
 *   npm run gen:npc-cast -- --no-walk   # skip the walk animations
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const REF = join(ROOT, 'assets/reference');
const KEY = process.env.PIXELLAB_API_KEY ?? '';
const CHAR_STYLE = 'top-down JRPG overworld character sprite, post-apocalyptic rural Texas, pixel art';
const BUST_STYLE = 'JRPG dialogue portrait bust, front facing, pixel art, post-apocalyptic rural Texas';
const FLOOR = 1000; // never let the balance drop to/under this without flagging

interface Npc { id: string; look: string }
// Batch 2: Cistern → Bastion → Redoubt → Chancel, in encounter order.
// (Batch 1 — Ohmstead→Railhead, 20 NPCs — done & approved; driver skips existing files.)
// Canon looks per docs/design/colony-npc-casts.md + principal-cast.md.
const CAST: Npc[] = [
  // --- THE CISTERN (Colony 2) ---
  { id: 'bloom', look: 'Warden Etta Bloom, nurturing matriarch, warm middle-aged woman, practical rolled-sleeve work clothes, strong gentle hands, kind steady eyes' },
  { id: 'sela', look: 'colony caretaker-healer, young woman, soft dark hair, healer wrap apron, calm compassionate expression' },
  { id: 'mud_cole', look: 'farmhand caked head-to-toe in dried mud, grins through it, heavy rolled-up overalls, big mud-caked boots' },
  { id: 'weather_watcher', look: 'old man weather-reader, wild white hair, long ratty coat, battered wind gauge in hand, squinting skyward with cheerful certainty' },
  { id: 'nursery_matron', look: 'Ohmlet nursery keeper, plump warm older woman, padded work coat, lanyard of small tools, gentle hands' },
  { id: 'seed_keeper', look: 'Ohm bloodline archivist, thin bookish person, wire spectacles, annotated field notebook, careful precise expression' },
  { id: 'hydromancer', look: 'water-system tender, waterproofed coat, thick rubber gloves, dripping wet, serious focused' },
  // --- BASTION (Colony 3) ---
  { id: 'stone', look: 'Warden Calder Stone, isolationist, broad-shouldered man, heavy stone-grey armor plate, arms crossed, unreadable stern face' },
  { id: 'flint', look: 'young scout, lean athletic, patched scouting gear, bandana tied on arm, bright defiant eyes' },
  { id: 'knock_twice', look: 'shut-in glimpsed through a door-slot, wide suspicious eye, unkempt grey hair, narrow gap of a dim doorway' },
  { id: 'doomsayer', look: 'ranting doomsday prophet, wild white beard, torn robes, raised fist, sandwich board worn over chest, manic energy' },
  { id: 'gate_warden', look: 'bureaucratic gate warden, neat worn uniform over scavenged armor, clipboard of demands, suspicious squint' },
  { id: 'rationer', look: 'supply rationer, gaunt hollow face, miserly expression, worn apron, guarding crates behind him' },
  { id: 'lookout', look: 'quarry rim lookout, lean wiry figure, long-range goggles, crouched alert posture' },
  // --- REDOUBT (Colony 4) ---
  { id: 'pike', look: 'Warden Augusta Pike, pragmatic battle-worn leader, close-cropped hair, military coat torn at the shoulder, haunted determined' },
  { id: 'reyes', look: 'Commander Tomas Reyes, weathered militarist officer, grey-streaked hair, worn dress uniform, firm steady gaze, honorable bearing' },
  { id: 'conscript', look: 'freed conscript, dazed young person, militarist uniform collar torn open, blinking uncertain, apologetic' },
  { id: 'base_scrapper', look: 'military installation scavenger, heavy salvage pack, bolt-cutters on belt, scavenging crouch' },
  { id: 'deserter', look: 'militarist deserter, jittery wiry figure, tattered uniform under civilian clothes, scanning warily, hunted look' },
  { id: 'sarge', look: 'freed soldier with no memory of his name, beefy cheerful man, mismatched uniform pieces, taped-over name-tag, open grin' },
  { id: 're_enlister', look: 'over-conditioned soldier, rigid posture, eager pleading eyes, hands raised ready to salute' },
  // --- THE CHANCEL (Colony 5) ---
  { id: 'hale', look: 'Warden Verity Hale, true-believer matriarch, silver-haired serene woman, flowing white-grey robe, hands folded, wise warm eyes' },
  { id: 'cantor', look: 'the Cantor, human zealot, tall imperious figure, elaborate ceremonial robes, arms spread in sermon, intense hypnotic gaze' },
  { id: 'brother_hum', look: 'humming monk, round robes, serene round face, eyes half-closed, hands together in peace' },
  { id: 'apostate', look: 'sarcastic ex-convert, ordinary clothes with a torn robe hem hanging off, arms crossed, side-eye smirk' },
  { id: 'bell_keeper', look: 'bell-keeper, stocky strong hands, worn bell-pull harness across chest, ear protection around neck, methodical calm' },
  { id: 'reliquary_warden', look: 'reliquary guard, ornate but battered ceremonial armor, standing at attention, reverential stillness' },
  { id: 'confessor', look: 'Confessor, tired empathetic figure, simple robes, dark circles under kind eyes, listening posture, burdened by doubt' },
];

const flag = (n: string): boolean => process.argv.includes(n);
function argv(name: string): string | undefined { const i = process.argv.indexOf(name); return i >= 0 ? process.argv[i + 1] : undefined; }

async function balance(): Promise<number> {
  const j = (await (await fetch('https://api.pixellab.ai/v2/balance', { headers: { Authorization: `Bearer ${KEY}` } })).json()) as { subscription?: { generations?: number } };
  return j.subscription?.generations ?? NaN;
}
function run(args: string[]): void {
  execFileSync('npx', ['tsx', ...args], { cwd: ROOT, stdio: 'inherit' });
}

async function main(): Promise<void> {
  if (!KEY) throw new Error('PIXELLAB_API_KEY not set.');
  const only = argv('--only');
  const doWalk = !flag('--no-walk');
  const list = only ? CAST.filter((n) => n.id === only) : CAST;
  if (!list.length) throw new Error(`no NPC matched --only ${only}`);
  const start = await balance();
  console.log(`PixelLab NPC cast: ${list.length} NPCs | balance ${start} generations (floor ${FLOOR})\n`);

  for (const npc of list) {
    const remaining = await balance();
    if (remaining <= FLOOR) { console.log(`\n*** STOP: balance ${remaining} at/under the ${FLOOR} floor. ${start - remaining} used this run. Flagging before spending more. ***`); break; }
    console.log(`\n=== ${npc.id} === (balance ${remaining}, ${start - remaining} used)`);
    try {
      // portrait (skip if present)
      if (!existsSync(join(REF, `${npc.id}_portrait.png`)))
        run(['tools/pixellab.ts', '--prompt', `${npc.look}, ${BUST_STYLE}`, '--out', `${npc.id}_portrait`, '--size', '128', '--no-bg']);
      // 4-direction character (skip if present)
      if (!existsSync(join(REF, `${npc.id}__rotation.png`)))
        run(['tools/pixellab-char.ts', 'character', '--desc', `${npc.look}, ${CHAR_STYLE}`, '--out', npc.id, '--size', '64']);
      // walk cycle from the south frame (skip if present)
      if (doWalk && existsSync(join(REF, `${npc.id}__south.png`)) && !existsSync(join(REF, `${npc.id}_walk__strip.png`)))
        run(['tools/pixellab-char.ts', 'animate', '--in', `assets/reference/${npc.id}__south.png`, '--action', 'walk cycle', '--out', `${npc.id}_walk`]);
    } catch (e) {
      console.error(`  ! ${npc.id} failed: ${String(e instanceof Error ? e.message : e)} — continuing`);
    }
  }
  const end = await balance();
  console.log(`\nDONE. Generations used this run: ${start - end}. Remaining: ${end}.`);
}
main().catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1); });
