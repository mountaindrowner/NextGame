/**
 * Generate the OHMSTEAD→RAILHEAD NPC cast via PixelLab (npm run gen:npc-cast).
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
// Ohmstead → the Field → Farm Road → Railhead, in encounter order (SAL/WREN/Mabel done).
const CAST: Npc[] = [
  { id: 'boone', look: 'gruff weathered colony chief, grizzled grey beard, brimmed leather hat, worn long duster coat, stern' },
  { id: 'cass', look: 'teenage scavenger youth, short brown hair, freckles, patched work jacket, eager' },
  { id: 'odessa', look: 'colony archivist woman, dark hair tied back, radio headset, satchel of papers, practical jacket, clever warm' },
  { id: 'odell', look: 'older quartermaster shopkeeper, grey hair, flat cap, supply apron, holding a ledger' },
  { id: 'rivet', look: 'salvager scrapper, welding mask pushed up on the forehead, heavy gloves, grimy coveralls, pry-bar' },
  { id: 'bex', look: 'young child collector, oversized boots, satchel of trinkets, curious bright-eyed' },
  { id: 'mesa', look: 'ancient storyteller elder, long white hair, sun-weathered face, faded poncho, walking cane' },
  { id: 'cricket', look: 'young scavenger kid runner, patched jacket, oversized goggles on head, salvage backpack, energetic' },
  { id: 'sully', look: 'road-worn old wanderer, dusty travel coat, wide-brim hat, walking staff, weary kind' },
  { id: 'rook', look: 'hard-edged young raider, grease war-paint streaks on face, spiked scrap-metal shoulder armor, red bandana, scowling' },
  { id: 'dusty', look: 'scrappy kid runner, dusty jacket, goggles, light shoes, cocky grin' },
  { id: 'wade', look: 'cattle-wrangler, worn wide cowboy hat, leather vest, coil of cable lasso on belt, rugged' },
  { id: 'junie', look: 'little girl collector, pigtails, satchel of small glowing trinkets, cheerful' },
  { id: 'marrow', look: 'shrewd trade-boss warden, sharp eyes, fine merchant coat, holding a ledger, fair but skeptical' },
  { id: 'hettie', look: 'middle-aged shop counter-clerk woman, headscarf, work apron, friendly busy' },
  { id: 'pax', look: 'lanky teenage track-runner, light layered clothes, lean athletic, quick' },
  { id: 'scrap_broker', look: 'flashy market magnate, salvaged finery coat, many rings, heavy coin purse, smug' },
  { id: 'salt_broker', look: 'lean shrewd trader, dust coat, salt-stained gloves, patient calculating' },
  { id: 'card_sharp', look: 'gambler, slick patterned vest, fan of playing cards, brimmed hat, sly grin' },
  { id: 'holt', look: 'militarist officer, matte grey plate armor, full visor helmet, rigid posture, vacant off-tempo stare' },
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
