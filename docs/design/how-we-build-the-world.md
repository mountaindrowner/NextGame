# OHMFRONT: How We Build the World

*Design doc, written 2026-10-26 for Mark. It covers how the HD-2D world on
`claude/hd2d` is built: what we're going for, why each choice was made, the
exact methods and numbers, and the rules that keep the quality, density and
sparsity where they are. It covers the pixel sprite pipeline too. It does not
cover who the characters are (see `principal-cast.md` and the compendium).*

*Everything here describes what is built and running. Choices still waiting
on Mark are marked `[PROPOSAL]`. When this doc and the code disagree, the code
is the truth and this doc gets fixed.*

**Read with:** `design-philosophy.md` (the why, in short) ·
`region1-railhead-country.md` (the worked example) · `regions.md` (the web of
maps) · `scope-benchmarks.md` (how big) · `../hd2d-direction.md` (every
decision Mark has made on this branch).

---

## 1. What we're pursuing

### The one-line target

**A miniature diorama of a broken world that life is taking back.** You look
down on a small, sharp, hand-made place: a ruined cattle town, a grain line,
a drive-in. It's bleak and melancholy, and it's overgrown with bright, lush
life. (This mood line is Mark's, decision #16 in `hd2d-direction.md`.)

### What that means in practice

- **HD-2D.** A real 3D world (Three.js, in the browser) with 2D pixel-art
  characters standing in it. The camera never moves off its one angle, and a
  tilt-shift blur makes it all read as a tabletop model.
- **Hard world, hopeful heart.** Rust, dead husks, chained doors, slurs for
  Ohms. Then a sprinkler that keeps one field green, a kid who names every
  machine, a pump that keeps a trough full for nobody.
- **A smooth, Western, futuristic post-apocalypse.** Plains and cattle
  country, about 500 years on. It is **never Texas** or any real place: the
  rivers moved, the coast drowned, the old names are gone. Places are named by
  the people living there now.
- **The old world is forgotten.** No old-world names or history, ever. There
  is exactly one hint so far: a worn plaque at the Spire's foot reading
  "…UNION…".
- **Everything means something.** Each map has a reason to exist, a machine
  still doing its old job, and lore you can see but nobody explains.

### What we're not doing

- No lore dumps, no explaining signs, no "Grandpa fixed this" text.
- No filler roads, no walls of trees boxing a map in, no empty screens.
- No neon game-board look (Mark: battle grids "too much like Battle Network").
- No decorative promises the game can't keep (a lit door you can't enter).
- No try-hard names (rejected: the Wide, the Upstairs, Dead Air, the Merge).

---

## 2. How a place gets designed (before anything is built)

The full version is `design-philosophy.md`. The short version:

1. **One line of meaning.** Railhead Country is *"the work outlived the
   workers."* Every choice after that has to serve the line. If something
   doesn't, it goes.
2. **A four-question bible:** What is this place? What's going on here?
   What's seen but never said? What does each section add?
3. **A web sketch:** towns, roads, side spots, dungeons, at least one loop
   home, and one travel space out of the region.
4. **Names that pass the tired-local test.** "You're gonna have to go down the
   Rust Mile." Named for what a place does, what it did to people, or who
   took it. Plain words that read well with no voice actor.
5. **Each section gets one signature and one routine** (§9).
6. **People with short lines that read two ways** before and after the
   reveal. "We never went under. Somebody had to keep the windmill company."
7. **Wild Ohms themed to what the place used to be:** tools on Depot Road,
   farm machines on the Grain Line, light and screen Ohms at the Drive-In.

Only then does building start.

---

## 3. The look: how a frame is made

### 3.1 The camera

- **One fixed angle, no rotation** (Mark's decision #4). Perspective camera,
  **30° field of view**, held at an offset of **(0, 12.5, 14.5)** from the
  player: about **41° down**, looking north. It follows the player and clamps
  at map edges.
- **Why one angle:** it's what makes it a diorama. Every prop, sign and door
  is designed to be read from this one view, so nothing is wasted on faces
  you'll never see. It also means **light can be designed** (§3.3).
- `?wide=1` pulls back (34°, offset 0, 27, 31) for overviews only.

### 3.2 Post-processing: the three layers that make it HD-2D

All in `src/hd2d/post.ts`, always on.

| Layer | What it does | The numbers |
|---|---|---|
| **Tilt-shift** | A sharp horizontal band through the player, blurring toward the top and bottom of the frame. This is the miniature feel. **Mark: essential, always on.** | Two separable Gaussian passes, 13 taps. Band ±0.10 of screen height, ramping over 0.34, up to 7 px of blur. **The band rides the player's screen height**, so the player stays sharp even where the camera clamps at an edge. |
| **Bloom** | Lamps, sunlit edges, glows. | Per mood: day 0.42 strength / 0.85 threshold; night 0.9 / 0.6. |
| **Mood grade** | The "bleak but lush" look in one shader. | **Dull colors get duller** (×1.35 desaturation on low-saturation colors: rust, dirt, ruins). **Vivid colors keep or gain** (×1.2 on greens, flowers). Cool shadows (0.9, 0.97, 1.08), warm highlights (1.07, 1.0, 0.9), vignette 0.42, film grain 0.018. |

**Why the grade works this way:** the mood line asks for two things at once,
bleak and lush. Instead of picking one palette, the grade pushes them apart.
The ruins drain toward grey, and anything alive pops against them. You don't
have to paint "overgrown" everywhere; every green leaf already reads as life
winning.

### 3.3 Light and mood

A **mood** (`src/hd2d/mood.ts`) is a full lighting preset: sun color and
direction, sky/ground hemisphere light, fog, exposure, bloom, grade, and a
sprite tint.

| Mood | Used for | Character |
|---|---|---|
| **DAY** | the surface | A low, warm sun (`#ffd09a`, 3.4) from the **west-southwest, over the viewer's left shoulder**, so building fronts catch light and long shadows fall north-east. Warm dust fog `#cdb895`. |
| **NIGHT** | night scenes | Cool moonlight `#8aa6d8`, deep blue fog, stronger bloom so lamps carry the scene. |
| **UNDER** | Ohmstead | No sky. A faint cool wash from vent shafts gives shadows shape; the **colony's own lamps do the real lighting**. |
| **CISTERN** | the Cistern | Green-blue water light under the vaults, warm lamps, the nursery glow. |
| **INSIDE** | dungeons | Dusty daylight through high windows, warm lamps doing the rest. |

Rules:

- **Day or night is fixed per scene. No clock** (Mark's decision #13). A scene
  is designed for its light. The Drive-In's projector only means something at
  night, so the Drive-In is a night scene.
- **Weather only in special places,** fixed to the scene.
- **Sprites are flat-lit and tinted by the mood** (`mood.sprite`: warm white
  by day, cool blue at night, amber underground). That keeps pixel art crisp
  (no 3D shading on flat sprites) while it still sits in the scene's light.
- **Shadows are real** (the sun casts them) and they are part of the
  composition: the sun angle is chosen so fronts are lit and shadows fall away
  from the camera.
- **Lots of lamps, few lights.** Underground and indoors, a **LightPool** of
  10–12 real point lights is moved every frame to the lamps nearest the
  camera. A map can have dozens of lamps for the cost of a few lights.

---

## 4. The ground: painted pixel floors

### 4.1 One painted texture per map

Each outdoor map's floor is **one big pixel-art texture painted by code**, at
**16 texels per world unit** (one map cell = 16×16 pixels), draped over a
gently rolling height field (`src/hd2d/terrain.ts`).

- **It starts from a glyph grid.** Each section draws its ground as
  characters:

  | Glyph | Ground |
  |---|---|
  | `g` | prairie grass |
  | `T` | tall grass (wild Ohms live here) |
  | `d` | asphalt |
  | `e` | dirt road (with wheel ruts) |
  | `v` | gravel |
  | `x` | dry cracked earth |
  | `k` | red clay |
  | `b` | broken concrete with rust run-off and moss |
  | `c` | crop rows (the one field someone still waters) |
  | `w` | water |
  | `#` | edge scrub |

- **No tile seams, ever.** Every pixel looks up its glyph through a **jittered
  position** (noise-shifted by up to ±0.375 cells), so the borders between
  grass and road wander like they were painted by hand.
- **Every material has 4–5 shades** (e.g. dirt `#6a5238 #7a5e40 #5a442e
  #84694a`), chosen per pixel by layered noise plus a fine random. That's
  where the "material depth" comes from: surfaces read as *what they are*.
- **Small details are painted in,** not placed: wheel ruts every 2.6 units on
  dirt roads, hairline cracks on dry earth, rust stains on concrete, the odd
  pebble or weed, dark furrows between crop rows.
- **Height:** gentle noise (about ±0.22 units), **flattened 90% under roads**,
  dipped −0.6 under water, raised toward the map's edges (a 1.9-unit rise
  under a bluff edge). Exits are always kept level with the road running off
  the map.

### 4.2 Living layers on top

| Layer | How | Why |
|---|---|---|
| **Grass** | Instanced clumps of 3 tapered blades. **30 clumps per tall-grass cell**, 3 or 6 on prairie (by noise, so it's patchy), 5 in edge scrub. Normals point straight up, so the field catches light like a painting instead of flickering. A wind shader sways each blade by its height². | Tall grass has to *look* like where Ohms hide. Patchy prairie avoids a carpet. |
| **Trees** | Cottonwood, mesquite, bushes: crowns built from **displaced icosahedrons with flat-shaded facets** (chunky, low-poly, painterly). Dead trees always have **green already climbing them**. All crowns sway. | The mood line in one prop: dead wood, live vine. |
| **Water** | A shader creek: shallow banks, deep middle, sky reflection, fogged like everything else. | Water must read from the fixed angle without mirrors. |
| **Motes** | 220 drifting dust motes by day, 140 fireflies by night, around the player. | Air you can see. The cheapest way to make a still frame feel alive. |

---

## 5. Maps: regions as webs of separate places

### 5.1 The structure

Mark's direction: regions, each one a **web** of sections; **each road and
town is its own map**, with quick transitions that imply travel time.

- **A region** = 10–17 sections: towns, roads, side spots, dungeons, and one
  travel space out. Region 1 (Railhead Country) has 16 maps plus interiors.
- **Every town has 2–4 ways out.** Every region has **at least one loop home**
  (the Field → Farm Road → the Pickett Place → the Creek Road → Stockyard
  Lane → back to the Field). Dead ends are worth reaching.
- **Every road is somewhere:** a name, a look, its own wild Ohms, 1–3 side
  pockets, often a fork to a dungeon. No filler stretches.
- **Gates give reasons to come back.** Field abilities open side pockets later
  (the thicket, fallen gates, the dark back stock, the broken bridge), and each
  gate shows what it needs (§8).

### 5.2 Section sizes

Sized to what the place is, not to a template:

| Kind | Typical size (cells) | Examples |
|---|---|---|
| Road | 36×62 to 58×28 (long, in the direction of travel) | Farm Road, the Grain Line, Drive-In Road |
| Town / side spot | 40×30 to 46×32 | the Pickett Place, the Stockyards, the Drive-In |
| Dungeon floor | 18×12 to 40×24 | the Grain Tower's three floors, Ohm Depot |

### 5.3 The section kit

`src/hd2d/region1/section.ts` builds a whole map from a short spec. That's
why a new map takes an hour instead of a day, and why every map in a region
matches.

A spec gives: an id, title and subtitle, a size and seed, a `ground(grid)`
function that draws roads/grass/water with `rect`, `line` (thick polylines for
roads and creeks) and `blob` (ragged patches), its **edges**, its **exits**,
and a `dress()` function that places buildings, props, people and Ohms.

The kit then does the rest:

- **Natural edges.** Each side of a map gets a style:

  | Edge | What you see |
  |---|---|
  | `trees` | A **broken** tree line: about 18% gaps, so you can see past it |
  | `scrub` | Low brush and bushes |
  | `fence` | A fence line broken where exits pass, a few trees beyond |
  | `bluff` | Raised ground, two cells deep, with rocks |
  | `open` | Just grass running off: the world continues |
  | `none` | Nothing: the section draws its own edge |

  **Never a wall of trees on all four sides.** Mark's earlier complaint was "a
  straight line of walled boxes." Mixed edges make each map feel like a piece
  of a bigger country.
- **Exits** are cut through the edge, kept level, and wired automatically:
  walking off one map's edge lands you on the matching edge of the next,
  facing the same way.
- **Region painter:** every section shares the region's palette and ground
  painter (`regionPaint`), so the region reads as one place. Each section can
  override a glyph for its own signature.

### 5.4 Transitions

| Moving… | What happens | Why |
|---|---|---|
| Between sections | **Pixel dissolve** (12-px cells dropping out in a 4×4 dithered order, ~0.28 s out, ~0.28 s in), then a small **name tag** for ~1.7 s | Quick enough to keep momentum, but you *feel* you went somewhere. It reads as "next area," not a loading fade. |
| Into a town or dungeon, first time | The big **title card** (*RAILHEAD, the crossroads trade-town*) | Arrival matters. |
| Between regions | Walk through a **travel space** (the On-Ramp), then a **travel card**: the world map with a dotted line drawing from here to there and one line of text ("Half a day north"), ~2.6 s | Distance and time without a walk. Mark: "implied transition time… I like that it's not seamless." |

---

## 6. Interiors and dungeons

`src/hd2d/region1/interior.ts` builds indoor maps the same way as outdoors:
from a glyph grid (`.` floor · `#` wall · `r` debris, where wild Ohms are ·
`v` pit · `=` steel grate over a pit).

- **The HD-2D cutaway.** Walls are instanced cubes **2.9 units tall**; the
  front row (nearest the camera) drops to **0.6** so you can always see in.
  Wall-mounted props hide with their row.
- **Wall materials** are painted textures (32×48 px) in five kinds, each with
  its own wear: **concrete**, **brick** (with soot), **tin** (corrugated, with
  rust), **block**, **boards** (painted, gone soft, with a dado rail).
- **Light** is the LightPool (12 lights) moving between pendant lamps.
  Stairs and the way out are always lit (§8): the exit back outside spills
  daylight through the doorway.
- **Each dungeon has its routine**, animated: the Grain Tower's bucket lift
  climbs and tips out nothing; the Roundhouse turntable creeps a few degrees;
  forklift Ohms in Ohm Depot "restock" empty shelves.

---

## 7. Density and sparsity: how full a map is

This is the heart of the quality bar. **Full, but believable. Never empty,
never noise.**

### 7.1 The two laws (from `docs/style-guide.md`, locked)

**Law 1: every texture has depth and says what it is.** Highlight, base and
shadow on every material; light from the top-left of each texture; anything
that glows gets a glow; no hard tile seams.

**Law 2: every area ships a large, diverse set.**

- **3 or more variants** of every ground and wall surface (seeded), so
  repetition never shows.
- **12 or more distinct themed props** for the area.
- **3 or more scatter layers** over the base (cracks, stains, moss, litter…).
- **At least one hero landmark** you can see from across the map.
- **No empty screens.** Wherever the camera stops, there's something to look
  at.

### 7.2 Where things go

Clutter is placed the way it accumulates in real life
(`clutter-detail-layer.md`, rules D1–D7):

- **Pools at walls, corners and edges,** thins out across open centers.
- **Along desire lines:** wear where feet actually go (doorways, between the
  bench and the door).
- **Around work points:** tools at the Bench, cans by a console.
- **Heaviest in neglected corners,** behind machines.
- **Reclamation creeps in from the edges:** weeds, vines and water damage
  start at the perimeter.
- **Rule of three planes:** every inhabited map dresses the **floor** (scatter,
  stains), **objects** (props), and **air/overhead** (motes, wires, hanging
  things, light), not just props on the ground.
- **Keep-clear:** never on things you interact with, in doorways, or on the
  critical path. Clutter never seals a required route.

### 7.3 Density tiers

Each map is assigned a tier and dressed to it, no more and no less:

| Tier | Feels like | Examples |
|---|---|---|
| **bare** | swept, sterile | a shrine, a clean room |
| **tidy** | cared for | a Warden's office, a cared-for home |
| **lived_in** | the default where people live | Ohmstead, the Cistern |
| **cluttered** | heavy, busy | Railhead market, workshops, raider dens |
| **squalid** | overrun | abandoned interiors |
| **ruined** | debris everywhere | the Field, dungeons, New Central |

### 7.4 Sparsity is designed too

Full doesn't mean crowded. Space is a material:

- **Open centers.** Clutter pools at edges so the middle of a map breathes
  and the player's path reads instantly.
- **One hero, not five.** Each section has **one** landmark (the grain
  elevator, the drive-in screen, the fallen turbine) so the eye knows where to
  go. Everything else supports it.
- **Travel spaces are quiet on purpose.** The On-Ramp is wide sky, few or no
  wild Ohms, a checkpoint and a scope still aimed north. The quiet *is* the
  content: you're leaving.
- **Broken tree lines** (18% gaps) and `open` edges let the eye run past the
  map so it never feels boxed.
- **Rhythm over uniform scatter.** Trees, poles and bushes are placed in loops
  with **random spacing** (e.g. every 1.6–2.8 units along a row), never on a
  grid.
- **All randomness is seeded.** Every map has a seed; the same map always
  looks the same. Hand-placed hero props sit on top of seeded scatter.

### 7.5 A worked example: the Pickett Place (40×30)

What one small section actually contains:

- **Hero:** the green field under a wheel-line **sprinkler Ohm** crawling its
  arc. It's the greenest thing for miles. (Signature *and* routine.)
- **Buildings and big props:** the house (enterable, lit door), the barn, the
  windmill with a stock tank, the trade shed, a porch set, a clothesline,
  three hay bales, an old truck, crates, a tumbleweed, a fenced crop field.
- **Lines through the map:** telephone poles running north up the lane
  (*everything runs north*), the fence.
- **Trees:** 7 shade trees (cottonwoods, mesquites) round the house and yard,
  6 bushes.
- **Signs:** three hand-painted boards: PICKETT PL. · GRAIN LINE ^ · CREEK RD >.
- **Lore you can find:** a brass tag with three notches on the windmill's
  gearbox (Grandpa's mark, unexplained).
- **People:** Ada (heals), Hob (trades), Lettie (names every Ohm).
- **Wild Ohms:** 2 roaming (Pumplet, Balelet) plus the tall grass table.
- **Ground:** prairie, a dirt lane, crop rows, patches of tall grass.

About 40 placed things, and it still reads as a quiet homestead, because they
all cluster around the house, the barn and the field, and the middle stays
open.

### 7.6 Region-scale numbers (measured)

After Region 1 (`node tools/hd2d-test/scope.mjs`, 2026-10-25): **22 maps, 44
connections, 47 NPCs, 36 things to look at, 39 roaming wild Ohms, 21
encounter tables.** Against ten benchmark JRPGs (`scope-benchmarks.md`), maps
and look-at density are on pace; NPCs are short (target 60–85 per region);
trainers and side quests aren't wired yet.

---

## 8. Design language: every visual is a promise

*(Mark: "Design language is huge.")* Everything the player sees says
something, and the player learns to trust it. Three checks for every piece of
visual language: **what it promises** (in one plain sentence), **how it
resolves** (kept every time), and **what it implies by accident**.

### The door language (locked)

**Light is the promise.** You should know whether you can go somewhere from
across the map.

| What you see | Means |
|---|---|
| A lit lamp at the door, warm light inside, a clear step | Go in. Always opens. |
| Planks nailed across, no light | Never opens. Scenery. |
| Chain and padlock, no light | Opens later, when the story gets there. |
| A dead lamp over a black doorway | Needs LUMEN. |
| Heaped debris, fallen gates | Needs HAUL. |
| Thorny growth grown solid | Needs SHEAR. |
| Open water | Needs HOVER. |
| A cracked, sealed wall or welded door | Needs BREACH. |

Rules: never light a door you can't use; every way in is lit (stairs, lifts,
a dungeon's way out); ground-level doors you can't use stay **shut** and
boarded or chained, never slid open on darkness.

**It's checked automatically.** `src/hd2d/doorway.ts` records every door; on
every map load the game warns if a lit door leads nowhere or a way in has no
lamp (`window.__hd2d.doorIssues`). Region 1 passes clean.

`[PROPOSAL]` *open with Mark:* he finds glowing doors "probably not the
coolest." Options on the table: a crew mark, signs of use (a swept step,
worn path), or a lamp that's merely lit rather than glowing.

---

## 9. Lore you can see: threads, routines, signs

### 9.1 Threads

The underlayer is carried by a few **threads**, each with **one fixed look**,
so a player learns to read them across the whole game:

| Thread | The look | What it means |
|---|---|---|
| the Garrison's reach | grey chevron stencil over a tally | what they've "cleared" |
| Redbed | a red handprint | raiders signing what they took |
| Grandpa | a small brass tag, three notches | machines Eli kept alive |
| the Static | silver-grey grass, Ohms twitching in sync, no birds | PERSISTENCE's signal |
| the old routines | a machine still doing its job | the ghost of purpose |

Threads **escalate**: stencils get denser north, the silver grass spreads. A
thread appears, recurs, and finally pays off. New threads need Mark's OK.

### 9.2 Every map has a routine

Each section has **one machine still doing its old job**, animated in the
background: the sprinkler, the road grader keeping a road smooth for no one,
the crossing signal flashing for trains that never come, the stockyard gates
opening at dusk, the bucket lift, the projector lighting a blank screen, the
sign that keeps flipping its last letters. It costs one prop and asks the
game's central question without a word: are these machines monsters, or are
they working?

### 9.3 Signs and text

- **Signs are what locals would paint:** hand-lettered boards on posts,
  direction arrows. Nothing explains.
- **Billboards are peeled blank,** layers of paper with no word left. (The old
  world is forgotten.)
- **"Look" text describes what's in front of you, never what it means.** "A
  small brass tag. Three notches stamped in it."

---

## 10. Props: how they're made

- **Every prop is built in code from simple shapes** (boxes, cylinders,
  displaced spheres), with painted or flat materials. No imported 3D models.
  That keeps one consistent chunky look and lets us make anything the story
  needs in minutes.
- **Silhouette first.** From the fixed camera, a prop has to read by shape
  alone: a pumpjack's nodding head, a water tower's legs, a hopper car's
  sloped bays.
- **Three values per material** (highlight, base, shadow), matching Law 1.
- **Emissive light only where it promises something** (a usable door, a
  routine's lamp, the projector at night). Glow is language (§8), not
  decoration.
- **Weathering tells time:** rust run-off, grey-topped hay, sagging rails,
  vines on dead wood.
- **Routine props are animated** (`Built` objects with an update): they run
  forever on their own.

The Region 1 library includes: rock, hoodoo, board sign, stock tank, hay
bale, the three thread marks, decommissioned husk, sprinkler, weather vane,
fallen turbine, crossing signal, hopper car, blank billboard, hump (a grassed
house mound with one chimney), grader, Garrison checkpoint, guardrail,
spotting scope, brick shell, loading chute, swing gate, broken bridge, pump
trough, rail line, grain elevator, shopping cart, drive-in screen, speaker
post, projector booth, sign flipper, warehouse front, fuel canopy, telephone
poles. Dungeons add: bucket loop, pulley wheel, steel stairs, hopper cone,
bin top, warehouse racking, forklift. Plus the shared foliage, fences, trucks,
crates and tumbleweeds.

---

## 11. Pixel sprites: characters and Ohms

### 11.1 The style (locked 2026-10-23)

**"Indie action-adventure":** chunky stylized proportions, big bold readable
silhouette, saturated colors, **lineless** with strong graphic light and
shadow shapes, expressive and punchy. **64×64 px, low top-down view, 8
directions.** The reference is SAL's PixelLab character
(`cea31c61-3b70-4ec6-a617-413b60f80ece`). Every other figure is generated
**with SAL as the style reference**, so the whole cast matches him. (Rejected:
the big-head chibi version of the same genre.)

### 11.2 How a sprite is made (PixelLab)

| Step | Tool | Detail |
|---|---|---|
| 1. The 8 directions | `v2/create-character-pro`, method `create_with_style`, `style_character_id` = SAL | Prompt = the character/Ohm description + the fixed style sentence. Output: 8 rotations (`south`, `south-east`, … `south-west`). ~10 generations each. |
| 2. Idle (everyone) | `v2/animate-character`, one direction per job | Ohms: a short action line ("rocking gently on its wheels, headlight eye blinking"), 5 frames at 6 fps. People: the `breathing-idle` template. ~7 generations for all 8 directions. |
| 3. Walk (only what moves) | `walking-8-frames` template, or a custom trot for four-legged Ohms | Mark's rule: everyone gets an idle; only things the game moves (heroes, the follower) get a walk. |
| 4. Pack | `tools/pack-anims.mjs` | Each animation becomes **one sheet** (rows = directions, columns = frames), so the game makes one request per animation instead of hundreds (the web host throttles). |
| 5. Check | contact sheets (`tools/ohm-contact.cjs`) | Every direction of every idle is compared with its still. If a row came out facing the wrong way, `anim.json` gets a `mirror` entry (e.g. the Scootlet's east idle is drawn from its west row, flipped). |

**How Ohm prompts are written** (`tools/gen-ohms-style.mjs`): from the
compendium entry. **The object, its type, and its lore become the look**
(Rustbed's grille shaped like cattle horns, Tumblet's baling-wire skeleton,
Bonnetbloom's glowing buried cable), plus one shared line: *"a small living
machine creature (an Ohm), an old household or farm machine that woke up with
a will of its own, weathered by years outdoors, no humans, no rider."* Plant
Ohms say "a plant creature, not a machine." Faces matter: Ohms read as
creatures when they have eyes (a lesson from the first batch; Rustbed,
Pumplet and Tillbit came out as plain machines and may be redone).

**Order of production follows the player:** the next Ohms you'd meet on the
critical path get made first.

**Record-keeping:** every generated asset has a `.prompt.json` beside it (the
exact request and character id). Approved art is **never overwritten**;
changes get a new version.

**Budget:** PixelLab is metered in generations. **Never dip below 1,000
without telling Mark.** One Ohm with idle costs about 17.

### 11.3 How sprites sit in the world

- **Billboards** (`RotHero` in `src/hd2d/sprites.ts`): a flat card that always
  faces the camera, showing the frame for the direction the figure faces.
- **Sized by measurement.** The loader measures the drawn height of the south
  frame and scales so the figure stands a set height: **SAL and people 1.65
  units**, roaming wild Ohms **1.2**, the following Ohm **0.85**, Ohms in
  battle **0.98**. So a tall vending machine and a tiny bulb both read right
  without hand-tuning.
- **Lit by the mood, not the sun:** the mood's sprite tint (§3.3), and a soft
  blob shadow underneath.
- **Facing follows movement** (8 directions). In battle, both sides stand
  three-quarter toward the camera so faces read.
- **Dialogue shows the speaker's own sprite,** upscaled, on the right, facing
  left. (Portraits were dropped by Mark; the layout is still flagged as
  janky.)
- **Placeholders** (`Walker`, the old 3×3 sheets) stay in for NPCs not yet
  restyled, and anything that fails to load is skipped, never breaking a map.

---

## 12. The battle stage

The battle field is part of the world, not a game board:

- **The panels are the local ground** (Mark: "too much like Battle Network").
  The Field fights on earth plots (your dark loam against their cracked clay,
  grass in the gaps, a stone line down the middle); Farm Road on blacktop
  slabs; underground on deck plate. `src/hd2d/battle/themes.ts`.
- **Layout:** 10×5 panels (your 5×5 on the left), each 1.14 × 0.86 units, the
  same mood and grade as the map you came from.
- **Color language on the field:** your Ohm's panel has a faint lantern warmth
  (gold); danger (a foe's wind-up) smoulders **ember orange**; a picked move
  previews in **its type's color**; changed ground has its own looks (scorched,
  iced, live, cracked, overgrown).
- SAL stands behind your half, calling the shots.

(The rules are in `hd2d-direction.md`; this doc covers only how it looks.)

---

## 13. Interface style

- **Type:** Cormorant SC (small caps, for names and titles) over Alegreya Sans
  (everything else).
- **Panels:** dark, translucent, with a thin gold rule on top and a dimmer one
  below. No heavy frames.
- **Text:** terse and mobile-first. Never start a sentence with "because." No
  antithesis tics.
- **Phones (landscape) are a first-class target:** a separate compact layout
  for touch and short screens.

---

## 14. How quality is checked

Nothing is "done" until it has been seen and walked.

- **Screenshots of every area** in a headless browser (`tools/hd2d-test/`),
  plus overhead shots of whole maps (`?topdown=1`).
- **Link check:** every exit is walked and must land on its matching spawn.
- **Door check:** the automatic promise check (§8) must be clean.
- **Scope check** after every region (`scope.mjs`) against the benchmarks.
- **Lint** (`npm run lint`) rejects dead names and **any real place name** in
  game content.
- **Mark's eyes** last. Show a draft, take the reaction literally, adjust.

---

## 15. Checklist: building a new region

1. One line of meaning; the four-question bible.
2. A web sketch: towns with 2–4 exits, a loop home, side spots worth reaching,
   a travel space out.
3. Names as proposals that pass the tired-local test.
4. Which threads appear, and how far they've escalated here.
5. Per section: one **signature**, one **routine**, one **hero** landmark.
6. A region kit: palette, ground painter, fences, trees, materials.
7. Build each section with the section kit: ground glyphs, mixed natural
   edges, exits.
8. Dress to its density tier: 12+ props, 3 scatter layers, floor + objects +
   air, clutter at edges, open centers.
9. People with short, double-reading lines. Wild Ohms themed to the old use.
10. Every door speaks the door language; the check is clean.
11. Make the region's new Ohm sprites in encounter order.
12. Screenshot, walk every exit, measure, update `scope-benchmarks.md`, show
    Mark.

---

## 16. Anti-patterns (things we've caught and fixed)

| Don't | Do instead |
|---|---|
| Wall a map in with trees on four sides | Mix edges; break tree lines; leave some sides `open` |
| One long corridor map for a whole route | Separate sections joined by quick dissolves |
| Light a door you can't enter (the Field's Co-op Vault once glowed) | Chain it, unlit, until the story opens it |
| Leave barn doors slid open on darkness | Close and board them |
| Uniform scatter on a grid | Seeded, randomly spaced, pooled at edges |
| Several competing landmarks | One hero per section |
| A neon game-board battle grid | The region's own ground |
| Signs that explain lore | Signs locals would paint; look-text that only describes |
| Old-world names (cities, brands, landmarks) | Lived-in local names; one tiny hint at most |
| Try-hard names | Plain land words, people's names, "Old" for what outlasted everyone |
| Glow as decoration | Glow only where it promises something |
| Ohms drawn as plain appliances | Give them eyes and a stance; they're creatures |

---

## 17. Not decided or not built yet

- **Version A** (modular block kits with pixel textures) of Mark's A/B test
  was never built. Everything in this doc is **version B** (fully custom
  design and detail), which became the method by default.
- The door-light alternative (§8). `[PROPOSAL]`
- Weather (special places only, none built yet).
- People sprites for most NPCs (the main cast is done; the rest are
  placeholders).
- Redoing Rustbed, Pumplet and Tillbit with faces. `[PROPOSAL]`
- Interiors per region (1–3 more each, to hit the map target).
