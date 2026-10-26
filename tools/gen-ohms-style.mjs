/**
 * Wild Ohms in SAL's locked indie-action style (PixelLab Pro, 8 directions,
 * style_character_id = SAL), in the order the player meets them on the
 * critical path: the Field → Farm Road → the Pickett Place → … Looks follow
 * docs/compendium/ohms.md (object, type, lore).
 *   node tools/gen-ohms-style.mjs [num ...]   (default: every Ohm listed)
 * Writes assets/reference/styles/ohms/<id>__<dir>.png + <id>.prompt.json,
 * stages public/world/styles/<id>/<dir>.png and registers the Ohm in
 * public/world/styles/index.json. Skips Ohms already staged.
 */
import { writeFileSync, readFileSync, mkdirSync, readdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets/reference/styles/ohms');
const PUB = join(ROOT, 'public/world/styles');
const API = 'https://api.pixellab.ai/v2';
const H = { Authorization: `Bearer ${process.env.PIXELLAB_API_KEY}`, 'Content-Type': 'application/json' };
const SAL_ID = 'cea31c61-3b70-4ec6-a617-413b60f80ece';
const STYLE = 'modern indie action-adventure pixel art: chunky stylized proportions, big bold readable silhouette, saturated colours, lineless with strong graphic light and shadow shapes, expressive and punchy';
const OHM = 'a small living machine creature (an Ohm), an old household or farm machine that woke up with a will of its own, weathered by years outdoors, no humans, no rider';
const FLOOR = 1000; // Mark's rule: never dip below 1000 generations without telling him

/** Encounter order (first sighting on the critical path). */
const OHMS = [
  [10, 'toastlet', 'Toastlet: a small chrome pop-up toaster creature, two bread slots on top glowing hot orange inside, a lever on its side like a stubby arm, two little feet, mischievous eyes on its front panel, crumbs and scorch marks; ambush predator'],
  [19, 'vacuette', 'Vacuette: an upright vacuum cleaner creature, bulging dust bag body, a long nozzle hose like an elephant trunk, the floor head as feet, power cord trailing like a tail, one round glowing eye, faded maroon plastic'],
  [21, 'fanlet', 'Fanlet: a little ceiling fan creature that walks on its pull-chain legs, five wooden blades as a spinning crown, frosted glass light dome as its face with a soft eye glow, brass motor housing, swaying and dainty'],
  [24, 'mailstrom', 'Mailstrom: a rural roadside mailbox creature on its post like a single leg, the rounded tin box is its body, the door is a mouth with old letters peeking out, the red flag raised like an ear, dented and loyal'],
  [12, 'wavelet', 'Wavelet: a small microwave oven creature, boxy beige body, the glass door is a face with a dim turntable glow inside, keypad on its side like freckles, short stubby legs, humming, waiting patiently'],
  [15, 'filaglow', 'Filaglow: a tiny light bulb creature, clear glass head with a glowing coiled filament like a wisp of hair and eyes, a screw-thread metal base as its body, hopping on the threads, warm amber glow, gentle'],
  [47, 'mowlet', 'Mowlet: a small push lawn mower creature, red deck body with a grass-stained skirt, the handle bar arching up like a tail, front wheels as paws, little blades whirring underneath, headlamp eyes, grass clippings flying'],
  [32, 'staplejaw', 'Staplejaw: a desktop stapler creature, the hinged top is a big biting jaw with a row of staple teeth, black and chrome body, crouched low like a snapping turtle, stubborn glare'],
  [18, 'beeplet', 'Beeplet: a round ceiling smoke detector creature, white disc body with vent slits, one small red blinking light eye, tiny legs, alarmed nervous expression, a little speaker grille mouth'],
  [41, 'tumblet', 'Tumblet: a tumbleweed creature taken over by a strange signal, a ball of dry tangled brush around a rusty baling-wire skeleton, two faint green glowing eyes deep inside, rolling, drifting; a plant creature, not a machine'],
  [49, 'sawlet', 'Sawlet: a small chainsaw creature, orange engine body, the chain bar sticking out like a long toothy snout, the pull-cord handle as a tail, rough exhaust breath, purring but dangerous'],
  [54, 'cellet', 'Cellet: a small chunky battery cell creature, copper top terminal like a hat, black and gold body with a charge meter on its belly, little stubby arms, sparks at its terminals, friendly giver'],
  [30, 'vendlet', 'Vendlet: a squat vending machine creature, tall red body, the lit glass front shows rows of cans like teeth, coin slot eyes, the delivery flap as a mouth, heavy stomping legs, holds a grudge'],
  [70, 'rustbed', 'Rustbed: a small rusty ranch pickup truck creature, headlight eyes, a grille shaped like curved cattle horns across its front, cargo bed on its back loaded with junk, four wheels, never quits hauling'],
  [65, 'pumplet', 'Pumplet: a small oil pumpjack creature, the walking beam is its long neck with the horsehead as its head nodding up and down, counterweight body, a sturdy base for feet, slow patient nod, oily black and yellow'],
  [80, 'balelet', 'Balelet: a small square hay baler creature, green farm-machine body with a pickup reel mouth that gobbles hay, a little chute on its back puffing straw, wheels, stubborn worker'],
  [82, 'tillbit', 'Tillbit: a small farm tractor creature, big rear wheels and small front wheels, a rounded hood like a snout with headlight eyes, an exhaust stack like a horn, a little tiller rake on its back, red paint'],
  [38, 'spoutlet', 'Spoutlet: a short fire hydrant creature, fat red cast-iron body, the side caps are its arms, the top bonnet is its head with determined eyes, water spurting from a nozzle, planted wide and defiant'],
  [46, 'barbwyre', 'Barbwyre: a spool of barbed wire come alive, a wooden reel body with rusty barbed wire wrapped around it, loose coils of wire lashing out like tentacles, glinting barbs, two eyes peering between the coils'],
  [45, 'bonnetbloom', 'Bonnetbloom: a patch of tall blue-violet lupine wildflowers grown into a small creature, flower spikes as a crown, leafy body, roots tangled with an old buried cable that glows faintly, sleepy kind eyes; a plant creature, not a machine'],
];

const bal = async () => (await (await fetch(`${API}/balance`, { headers: H })).json()).subscription?.generations;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run([num, id, desc]) {
  const body = {
    description: `${desc}. ${OHM}`, style_description: STYLE, method: 'create_with_style', view: 'low top-down',
    image_size: { width: 64, height: 64 }, no_background: true, style_character_id: SAL_ID,
  };
  let sub;
  for (let i = 0; i < 60; i++) {
    sub = await (await fetch(`${API}/create-character-pro`, { method: 'POST', headers: H, body: JSON.stringify(body) })).json();
    if (sub.background_job_id) break;
    if (/concurrent|slot|limit|busy/i.test(JSON.stringify(sub))) { await sleep(20000); continue; }
    throw new Error(`${id}: ${JSON.stringify(sub).slice(0, 300)}`);
  }
  if (!sub?.background_job_id) throw new Error(`${id}: never got a job slot`);
  let cid = sub.character_id;
  for (let i = 0; ; i++) {
    const j = await (await fetch(`${API}/background-jobs/${sub.background_job_id}`, { headers: H })).json();
    if (j.status === 'completed') { cid ??= j.last_response?.character_id; break; }
    if (j.status && !['processing', 'queued', 'pending'].includes(j.status)) throw new Error(`${id}: ${j.status} ${JSON.stringify(j).slice(0, 300)}`);
    if (i > 240) throw new Error(`${id}: timeout`);
    await sleep(5000);
  }
  const zip = Buffer.from(await (await fetch(`${API}/characters/${cid}/zip`, { headers: H })).arrayBuffer());
  const tmp = join(OUT, `.zip_${id}`);
  mkdirSync(tmp, { recursive: true });
  writeFileSync(join(tmp, 'c.zip'), zip);
  execFileSync('unzip', ['-o', '-q', join(tmp, 'c.zip'), '-d', tmp]);
  const rot = join(tmp, readdirSync(tmp).find((d) => d !== 'c.zip' && d !== 'metadata.json'), 'rotations');
  mkdirSync(join(PUB, id), { recursive: true });
  for (const f of readdirSync(rot)) {
    copyFileSync(join(rot, f), join(OUT, `${id}__${f}`));
    copyFileSync(join(rot, f), join(PUB, id, f));
  }
  rmSync(tmp, { recursive: true, force: true });
  writeFileSync(join(OUT, `${id}.prompt.json`), JSON.stringify({ source: 'pixellab', endpoint: 'v2/create-character-pro', species: num, body, character_id: cid, at: new Date().toISOString() }, null, 2));
  // register so the game picks it up
  const idxPath = join(PUB, 'index.json');
  const idx = JSON.parse(readFileSync(idxPath, 'utf8'));
  idx.ohms[String(num)] = id;
  writeFileSync(idxPath, JSON.stringify(idx));
  return `#${num} ${id}: ok (${cid})`;
}

mkdirSync(OUT, { recursive: true });
const want = process.argv.slice(2).map(Number);
const todo = OHMS.filter(([n, id]) => (want.length ? want.includes(n) : true) && !existsSync(join(PUB, id, 'south.png')));
const start = await bal();
console.log(`${todo.length} to make; ${start} generations on hand`);
// three at a time (PixelLab's concurrent-job cap); stop before the floor
let used = 0;
const queue = [...todo];
const worker = async () => {
  for (let o = queue.shift(); o; o = queue.shift()) {
    const now = await bal();
    if (now - 60 < FLOOR) { console.log(`stopping: ${now} left, near the ${FLOOR} floor`); return; }
    try { console.log(await run(o)); used++; } catch (e) { console.log(`FAILED ${e.message}`); }
  }
};
await Promise.all([worker(), worker(), worker()]);
const end = await bal();
console.log(`made ${used}; used ${start - end} generations (${used ? ((start - end) / used).toFixed(1) : '-'} each); ${end} remain`);
