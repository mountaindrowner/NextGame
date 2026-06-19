# HANDOVER

## Session 2026-06-16 (cont.) — Cinematic depth + new protagonist portraits

- **New high-quality portraits** (SAL / WREN / Mabel), authored on-method
  (grid method, `tools/gen-cutscene-art.ts` `protagBust()` + `mabel()`) to
  replace the pixelified-from-reference SAL/WREN. Canon scavenger kit: brown/
  blonde hair, goggles pushed up on the cap brim, red bandana, olive jacket,
  freckles (SAL, smirk) / ponytail + grease smudge (WREN, deadpan); Mabel
  refined (glasses glint, apron). Same paths (`public/world/char/*_96.png`),
  so `src/cutscene/script.ts` is unchanged.
- **Richer cold-open cards** — the five cards rebuilt with layered composition,
  `spritekit.ramp()`-shaded light sources (`Sprite.sphere()`: the Waking core,
  dawn sun, Static node, garage lamp), atmospheric haze, depth-faded
  silhouettes, foreground detail (rocks, posts, dust), and a baked `vignette()`.
- **CutsceneScene presentation** upgraded: cinematic **letterbox** bars, bg
  **crossfades**, a slow **Ken-Burns** zoom/pan per card, per-bg ambient
  **drifting motes** (`BgStep.motes`), optional `tint`, and a **bigger portrait
  with a Back.Out slide-in** (only re-animates when the speaker changes).
- `tests/cutscene.test.ts` +1 (portraits present + non-trivially sized).
  **81 tests green**, typecheck + lint + build pass. Dist rebuilt.


## Session 2026-06-16 (cont.) — Opening cinematics & charm pass

- **Reusable cutscene toolkit** (no shared dialogue/fade util existed):
  `src/cutscene/types.ts` (pure data Step/Cutscene model), `src/scenes/
  CutsceneScene.ts` (data-driven player: typewriter paper box, speaker +
  96px portrait, A/START advance, **B skips**, bg/fade/wait/fx steps, fades to
  `next`), and `src/scenes/transition.ts` `fadeTo()` (warm=home / cold=lore).
- **New opening flow:** Title → **cold-open cutscene** (the Waking → the
  Downtowns → broken-but-healing surface → the Static whisper) → preset select
  → **grounded cutscene** (Grandma Mabel, the garage, the *Ohm's Law* quote,
  "build a partner") → Bench → **name your Ohm** (`NameEntryScene`, on-screen
  keyboard, the "chooses a chirp" beat) → Ohmstead (guided intro banners,
  goodbye, **Banjo** the Jukeboxer + its two-note hello) → Elevator (Banjo
  send-off, first daylight) → the Field. Every hop now fades.
- **Canon fix:** removed the stale "GRANDPA HARLAN"; the opening now uses
  **Grandma Mabel Vane** (living guardian) + **Eli Vane**'s legacy Bench, per
  the bibles — seeds the late "Grandpa's alive" reveal.
- **Art:** `tools/gen-cutscene-art.ts` (grid method) → 5 cold-open cards
  (`public/ui/cutscene/`) + a Mabel 96px portrait; a Banjo jukebox prop +
  interact added to Ohmstead (`gen-underground.ts`, regenerated).
- **Tests:** `tests/cutscene.test.ts` (5) — script integrity, valid next-scene
  handoffs, every referenced image exists, has the Mabel/Ohm's-Law beat, and
  **no "Harlan"/dead names** in `src/cutscene/`. **80 tests green**, typecheck +
  lint (core boundary clean) + build + playtest all pass. Dist rebuilt.
- **Could not screenshot the live scenes here** — Playwright installed but the
  Chromium binary download is blocked by the sandbox network policy; verified
  via the logic harness + static art review. `npm run screenshots` works on a
  networked machine.
- **Next:** audio/chiptune (the opening is built to slot it in); per-map
  encounter zones for the existing colonies (still all roll field-grass).


## Session 2026-06-16 (cont.) — The Chancel (Colony 5) + finishing items

- **The Chancel is built** — the 9th map and Act II's Colony 5 (Critical Path
  §11): a ruined megachurch. `tools/assets/kit-chancel.ts` (13 grid-method
  pieces: nave/crypt floors, catacomb wall with bone niche, altar, pews, the
  reliquary "saint" Ohm, candelabra, organ pipes, rose window, banner, torch
  sconce, the Cantor's Static-tinged shrine). `tools/gen-chancel.ts` composes
  the nave → altar/reliquary with rose-light, flanking catacombs (crypt-dust
  encounters), and the Cantor's hive-creep schism chamber. **100% reachable**
  (520 cells, 48 encounters, exit, all 5 NPCs). Full cast w/ 3+ lines each:
  Warden Verity Hale (ally), the Cantor (the willing human face), the Apostate,
  Brother Hum, Confessor Imel; 2 Choir-of-the-Update trainers; 2 items; 2 signs.
- **Per-map encounter zones:** `FieldData.zone` (default `field-grass`);
  the Chancel uses a new **`chancel-crypt`** SIGNAL/OPTIC/SONIC zone (Staticub,
  Cartrudge, Pinglet, Glowtube, Peeplens, Spoolturn, Lampyre; Lv26–33). Other
  maps can now specify their own tables.
- **Portal landings:** exits gained an optional `to:{x,y}` so portals (not just
  open-edge warps) drop you at a chosen cell. Trinity's north now opens to the
  Chancel and back, each landing the player correctly. World-map + region graph
  + fast-travel updated (Chancel = a garage hub, biome `sacred`); node spacing
  tightened so 5 columns fit the 240px screen.
- **In-battle cures fixed:** the battle engine now clears the matching status
  for cure items (hardcoded by id, like heals — respects the core/data
  boundary). The earlier out-of-battle item work's known gap is closed.
- **75 tests green** (traversal +4 Chancel, items suite), typecheck + lint
  (core boundary clean) + build all pass. Dist rebuilt.
- **Next:** the Red Flats route → Redbed (Colony 6); a Town-Map gate item;
  per-map zones for the existing colonies (they still all roll field-grass).


## Session 2026-06-16 (cont.) — Bag & real item use (out of battle)

- **The field-menu bag is now interactive** (`MenuScene`). A on a bag item:
  - **heal / cure / revive** → a target-picker sub-mode (`usetarget`) listing the
    party with INTEGRITY bars + DOWN/status flags; pick an Ohm → effect applied,
    count decremented. Repair Kits restore INTEGRITY (Full Repair tops off),
    D-FIB revives a downed Ohm to half, cure items clear their matching status.
  - **Resonance/Prime Core** → if a party Ohm is at its threshold, hands off to
    `EvolutionScene` (it consumes the core, returns to the field); else a refusal.
  - **Signal Dampener** → toggles `flags['dampener']` (encounter rate cut).
  - **Storage Node** → message (spent in battle, not here).
- **Shared effect logic:** new pure, boundary-safe `src/core/items.ts`
  `applyItemToBattler(item, target)` — mirrors the engine's heal/revive and
  **adds cures**. The field menu uses it; covered by `tests/items.test.ts` (6).
  **71 tests green**, typecheck + lint (core boundary clean) + build all pass.
- **Known gap:** in-*battle* cure items still no-op — the battle engine can't
  import item data (core/data boundary) so it hardcodes only heal/D-FIB. Fixing
  that means passing the ItemDef (or cure target) through the battle contract;
  deferred. Out-of-battle cures work now.


## Session 2026-06-16 (cont.) — Traversal: world-map, fast-travel, ledges

- **World-map screen** (`src/scenes/WorldMapScene.ts`, scene `worldmap`): a
  schematic of the Blackland — every built map as a biome-coloured node on a
  small grid, drawn links, your current spot ringed, unexplored maps shown as
  `???`. Reached from the field menu's new **MAP** hub option. Layout +
  `WORLD_LINKS` + `BIOME_COLORS` live in `src/data/region.ts`.
- **Visited tracking:** `FieldHDScene.create()` sets `flags['visited:<map>']`;
  the world-map reads it to light nodes/links and gate travel.
- **Rideable fast-travel:** from the world-map, A on a *visited garage hub*
  (the recharge colonies) warps you there — landing on the garage pad +
  recharged — **if** you own a rideable Ohm (`RIDEABLES` = Mowrauder, Rustler/
  Longhauler, Zoomoped, Kartwheel). Clear refusal messages otherwise.
- **Ledges (one-way drops):** new `FieldData.ledges` (`{col,row,dir}`).
  `FieldHDScene` treats ledge cells as solid except a hop in the matching dir,
  which vaults two tiles with a parabolic arc; you can't climb back up. First
  ledge drawn across the lower **Farm Road** (gen-farmroad emits the data +
  draws the lip). Engine is data-driven so any map can add ledges.
- **Tests:** `tests/traversal.test.ts` (6) — world-map node/link/hub/rideable
  integrity + farm-road ledges land somewhere walkable. **65 tests green**,
  typecheck + build clean, dist rebuilt.
- **Next here:** make ledges *gate* (constrained maps — quarry/cistern have the
  geometry); a Town-Map bag item to gate the screen; rideable mount animation
  on the overworld; more garage hubs as the world grows.


## Session 2026-06-16 — NPC dialogue + Ohm sprite retool begins

- **Every world NPC talks:** FieldHDScene NPC dialogue system (face + A cycles
  lines); name + 3 contextual lines written for all 19 placed NPCs across the 8
  maps (seed the reveal). Signs + items engines also live.
- **Ohm sprites retooled to the grid method** (`tools/assets/kit-ohms.ts`,
  `npm run assets:ohms`): each Ohm = its object + a face from the object's own
  features + legs/treads, emissive glow where hot/lit. 14 fronts (3 starters +
  the slice's Field commons) + 3 starter backs, overwriting the *_front_hd.png
  the battle already loads — battles now match the world.
- **Roster finished — all 150 fronts + 150 backs (grid method).** `kit-ohms.ts`
  is now data-driven: the 14 bespoke drawers stay as overrides; the other 136
  render through nine type-palette **archetypes** (box / round / tall / vehicle /
  tool / bulb / plant / speaker / orb / legend), sized by evolution tier, each
  reading as its household object with a face, top-left material depth, and
  per-type glow. `LINES` maps every Manifest species → {archetype, type}.
  `sprite-manifest-hd.ts` now registers 1..150 (fronts **and** backs), so the
  battle loads HD art for the whole roster — species 49..150 had no art before.
  Full contact sheet at `assets/sprites/ohms/_contact.png`. 59 tests green,
  typecheck + build clean, dist rebuilt for githack. **Next refinement (optional):
  bespoke drawers for marquee evolutions/legendaries where the archetype reads
  generic (e.g. COTTONGIN, LOCOMOTIVA, the speaker/server finals).**


## Session 2026-06-15 (cont.) — Lived-in scatter + overworld trainers

- **Lived-in layer on every map:** `tools/scatter.ts` — a shared, biome-filtered,
  density-tiered scatter pass (floor litter, stains/cracks/puddles, weeds/moss
  reclaiming the edges; pooled at walls, worn on paths). Decals only (collision
  unchanged). Wired into all 7 composers; every map now reads inhabited.
- **Line-of-sight trainers** (the route-filling feature): `FieldHDScene` loads a
  map's `trainers`, renders them facing a dir, and after each step checks LoS —
  a trainer facing the player down a clear row/col within range pops a `!`,
  barks, and starts a **trainer battle** (BattleScene `kind:'trainer'`). Victory
  sets `beat:<map>:<idx>` (BattleScene `onVictoryFlag`) so they stay beaten.
  First trainers on the Farm Road. **Also fixed:** battles now return to the
  saved-location map (not always the Field); the elevator passes mapId.

- **World populated:** overworld **items** (walk-onto pickups — visible bobbing
  nodes + hidden caches, give credits, `got:<map>:<idx>` flag) and readable
  **signs** added to `FieldHDScene`. Trainers + 2 items + a lore sign placed on
  the Field, Railhead, Cistern, Bastion, Redoubt (colony-flavored classes/teams/
  barks). All placements script-verified.

- **Act II begins — the Trinity Bottoms** (`sec.trinity` + `gen-trinity.ts`):
  the drowned-forest route-dungeon (winding muck path over HOVER deep water, the
  half-submerged chapel hero, drowned cypress, reed-bed organic-hybrid
  encounters, glowing hybrid flora, fog + light hive). Linked from Redoubt's
  east yard; 211/211 reachable. Built world is now **8 maps**
  (Ohmstead→Field→FarmRoad→Railhead→Cistern→Bastion→Redoubt→Trinity).

**Next:** **the Chancel** (Colony 5, megachurch + catacombs) to open Trinity's
north; **ledges** + world-map/fast-travel UI; real item-to-bag; the remaining
routes (45 Scar, Furrows, Military Road…).

## Session 2026-06-15 — World structure: Hoenn study → region graph + routes

Mark: "study the Hoenn overview map, make ours deeper & more expansive."
- **Study + plan committed:** `docs/design/hoenn-map-study.md` (Hoenn's graph /
  hub-loop / biome-band / HM-gating / parallel-layer / density structure) and
  `docs/world-structure.md` (grow OHMFRONT from a 6-map chain → ~40-map connected,
  branching, biome-banded region; the full map list + engine build order).
- **Region graph + edge-warps:** `src/data/region.ts` (each map's open-edge
  neighbours + biome + hive); `FieldHDScene` now **edge-warps** — walk off an
  open edge → neighbour's opposite edge (lands at the nearest opening),
  Pokémon-route style. Portal `exits` still used where borders aren't opened yet.
- **First route:** `gen-farmroad.ts` (winding prairie route, cotton gin,
  water-tower lookout, tall-grass encounters, tree-line framing) inserted
  between the Field and Railhead via edge-warps (opened Field-north +
  Railhead-south). 59 tests green.

**Next on the world-structure plan:** build the remaining routes (45 Scar,
Furrows, Military Road, Red Flats, Tollway, the Stack) with open edges; add
line-of-sight trainers + ledges + hidden-item systems; a branch/loop + a hub at
Railhead; vehicle-Ohm fast travel + world-map UI; multi-floor dungeon loader +
the net layer; then Act II colonies (Trinity → Chancel → Redbed → Array → Verge
→ Dallas) and the optional spurs.

## Session 2026-06-14 (cont.) — Clutter layer + EVERY asset enumerated

Mark added the **Clutter & Detail Layer** doc (`docs/design/clutter-detail-layer.md`)
and directed: make every discussed asset + organize for later map-building. Done:
- **Clutter system integrated:** the four-plane model (floor/object/occluder/fx)
  via a `plane` label, the `clutter.universal|wall|fx` + `dressing.<area>` kits,
  and the D1 (dressing area-lock) + D4 (plane→layer) rules in the validator.
- **Full enumeration:** `catalog-areas.ts` (ALL 19 per-area secondaries,
  Railhead→Dallas + fortress + 6 optional) + `catalog-clutter.ts` (universal
  libraries + 12 dressing sets). Manifest **643 records, 0 violations**;
  **59 tests** (added D1/D4 + "every area kit enumerated"). Nothing pending in
  the inventory — every asset we've discussed has a labeled, organized record.
- **Universal clutter ART** generated (`kit-clutter.ts`, 36 pieces across the
  four planes) → `assets/tiles/clutter/`.

**Art status:** shared foundation ART done (Primary, Hive, Building, Cave/Mine,
universal Clutter). **Records done for everything.** Per-area ART + maps so far:
**Ohmstead** (cavern), **the Field** (sec.field), **Railhead** (sec.railhead),
**the Cistern** (sec.cistern, flooded waterworks w/ catwalk-crossed basin = the
HOVER-gate flavor), **Bastion** (sec.bastion, quarry-fortress + great Wall/gate
+ cement plant + the Pit cave-mouth + the first LIGHT HIVE overlay creep),
**Redoubt** (sec.redoubt, the midpoint reveal — fortified yard + the dark LUMEN
Bunker/command-center with the **Eli Vane photo/logbook** interact + MEDIUM hive)
— all playable and linked
(Bench→Ohmstead→lift→Field→Railhead→Cistern→Bastion→Redoubt, with back-exits). **Character
sprites:** grid pipeline (`char.ts`) + slice cast, **player walks in 4
directions** in-world. **Title screen** = creator art + animated intro. Maps
warp via `exits[].mapId`. Next colonies up the critical path: **Bastion**
(Colony 3, quarry, cave dungeon + light hive overlay) → Redoubt → … → Dallas;
plus optional `dressing.<area>` ART, the routes (Farm Road / 45 Scar / Furrows)
between colonies, and a real HOVER vehicle-Ohm mechanic for the deep-water gate.

## Session 2026-06-14 (cont.) — Full scope locked + asset SYSTEM stood up

Mark delivered five design bibles (story, critical-path locations, wider world,
level-building assets, the governing asset bible) → committed to `docs/design/`
as canon-of-record. The full game scope is now explicit: the ~30h spine
(Ohmstead → Field → 8 colonies → Dallas/Spire → Ohmcoming) + the wider optional
world, built from a shared Primary Kit + ~18 per-area Secondary Kits + a Hive
Overlay (a few thousand labeled tiles).

**Two decisions (Mark):** (1) keep the locked **HD grid method** — adopt the
Asset Bible's *system* but treat its Gen-3 art numbers as superseded (32px,
limited palette, grid method); (2) **system first, then kits in production
order.**

Done this session:
- **Asset system** (`tools/assets/`, `docs/asset-pipeline.md`): label/record
  schema, the 19-area allow matrix, the R1–R12 validator + per-kit budget,
  `npm run assets:build` → `assets/manifest.json` + `asset_index.json`. Catalog
  seeded in build order with the Primary, Building/Interior, Cave, and the two
  slice secondaries (`sec.ohmstead`, `sec.field`) — **230 records, 0
  violations.** `tests/assets.test.ts` gates it (57 tests green total).
- Canon updated: CLAUDE.md source-of-record + phase status; HD reconciliation
  documented. **Dead-name flag:** the bibles use "Ohmdex" + "Build-A-MAC" —
  reference only, never in game text/asset IDs (Manifest / the Bench are canon).

### Shared foundation ART — DONE (2026-06-14)

All "reused everywhere" kit art is generated (grid method, depth/density laws),
each with a `_contact*.png` review sheet + an `npm run assets:*` script:
- **Primary Kit** — `kit-primary.ts` (dirt/earth/gravel/concrete/cobble,
  short/tall/dead grass, still+flowing water) + `kit-primary-props.ts` (4 trees,
  veg, ruin props, fences/walls, boulder, all 4 field-ability obstacles
  blocked+cleared, flame). `assets/tiles/primary/`.
- **Hive Overlay** — `kit-hive.ts` (growth/veins light·med·heavy, corrupt
  grass/water, Static shimmer, relay-tower; translucent). `assets/tiles/overlay_hive/`.
- **Building/Interior** — `kit-building.ts` (5 floors, walls, furniture, **hero
  Bench + healing machine**). `assets/tiles/building/`.
- **Cave/Mine** — `kit-cave.ts` (walls/floors/pools, stalactites, glowing ore
  nodes, supports/ladder; mine rails/cart/beam). `assets/tiles/dungeon_cave|mine/`.
- Manifest **248 records, 0 violations**; 57 tests green; typecheck/lint clean.

**Next phase:** per-area SECONDARY kits in critical-path order — `sec.railhead`
first (rails, roundhouse/turntable, boxcars, switch levers, market sprawl,
broker offices), then Cistern → … → Dallas. Then compose each area's map
pulling only matrix-allowed kits. The Field also gets its `sec.field` art +
depth/density upgrade. Ohms still pending grid-method retool.

## Session 2026-06-14 (cont.) — Stages: Ohmstead underground + walkable maps

Per Mark "do all the terrains and assets for the stages, start with the colony
underground." Done:
- **Ohmstead colony stage built** — `tools/gen-underground.ts`
  (`npm run gen:underground`) generates `public/world/ohmstead.png` (960×576,
  30×18 @32px) + `ohmstead.json`. Grid-method (shared palette) industrial
  bunker: riveted steel walls, plated floor (3 variants), amber lamps,
  Grandpa's Bench (glowing core), console, crates, barrel, and the elevator
  up to the Field. JSON carries `collision`, `spawn`, `exits`, `interacts`,
  `npcs` (Grandpa `npc_elder` at the Bench + a `npc_rancher`).
- **FieldHDScene generalized to a multi-map walker** — `init({mapId})`,
  map registry (`the-field`, `ohmstead`), map-specific texture/json keys,
  spawn from `json.spawn`, the recharge pad gated to surface maps only,
  `interacts` (Bench → flavor line), and `exits` that fade-warp to a target
  scene (the colony elevator pad → `ElevatorScene`).
- **Opening flow rewired:** Bench → **Ohmstead** (walk the garage, talk to
  Grandpa) → elevator pad → `ElevatorScene` (rising beat) → the Field.
- **Ohmstead reskinned to a cavern colony** (dungeon-town reference): organic
  rock, cobble floors, stone chambers, glowing Resonance crystals + additive
  lighting, water pools. `gridart` palette gained a cavern set; map 36×24;
  flood-fill-verified reachable.
- **Art direction laws LOCKED (2026-06-14)** in `docs/style-guide.md` +
  CLAUDE.md: (1) every texture has material depth/shading and reads as what it
  is; (2) every area ships a large diverse asset set (no flat NES-era screens).
  Per-area "done" checklist + anti-patterns documented; **Ohmstead is the
  worked example, the Field is on the upgrade list.**
- 49 tests green; typecheck/build clean. dist rebuilt + force-added.

Next stages to build (terrains/assets): the eight Downtowns colonies + the
Field's neighbor routes; retool the 48 Ohm sprites onto the grid method;
4-dir walk frames.

## Session 2026-06-14 — HD locked, slice completed, HD battle

Mark confirmed: HD direction is **intended and locked**; finish the slice to
the §14 checklist; wire HD sprites into battle. Done this session:
- **HD locked in canon** (GDD §12, no more "pending" hedges).
- **HD sprites wired into battle** — BattleScene preloads/prefers the 96px
  `_hd` fronts (48) + `_hd` backs (9 starters), shown at a consistent
  ~60px-in-240-layout footprint (GBA set is the fallback). Mock: `/tmp/hd_battle.png`.
- **Elevator beat** (`ElevatorScene`): Bench → elevator (rising car + sky
  reveal, beats.md §1→2) → Field. The §14 "elevator" item is in.
- **Garage** in the Field: the central elevator-exit tile is a recharge pad
  (press A near it to heal); **defeat** sets `respawn-garage` and you wake
  there recharged. The §14 "garage recharge" item is in.
- **Villagers ingested** — `assets/reference/cattle-town/villagers.png`
  extracted to `assets/extracted/villagers/` (98 NPC frames).

**Slice vs §14 checklist — now complete:** Bench → elevator → Field → wild
encounter → battle → node capture → one evolution → garage recharge →
save/load. 49 tests green; typecheck/lint/build clean. (No browser in this
env to watch it live — verified by build + layout-accurate mocks.)

Next candidates: place villager NPCs in the Field; compose the Field from the
extracted objects/tileset; reposition battle natively for 480×320; tag
`slice-v0`.

## ⚠ ART DIRECTION CHANGED 2026-06-13 → HD top-down

Mark pivoted the art target from Gen 3 GBA to a **higher-fidelity HD top-down**
style, matching creator-owned cattle-town art now in
`assets/reference/cattle-town/` (example-map + objects-sheet + terrain-tiles,
with PROVENANCE.md). Canon updated (GDD §12, CLAUDE.md, style-guide — Gen-3
spec marked superseded, kept for history).

**HD Field is live (2026-06-13):** the creator's painted example map is now the
playable Field. `npm run gen:field` (`tools/build-field-hd.ts`) area-downscales
`example-map.png` → `public/field/the-field.png` (960×704, 30×22 @32px) and
derives collision + grass-encounter masks from the art (water/buildings/trees
block; roads/grass pass). `FieldHDScene` renders it, walks the player on the
32px grid with camera follow; grass steps roll an encounter banner. Engine
native bumped to **480×320**; Boot routes to `fieldhd` for the demo.

**Full HD flow wired (2026-06-13):** all eight legacy scenes now call
`fitLegacy(this)` (`src/scenes/legacy.ts`) — a 2× camera zoom centered on the
old (120,80) midpoint, so their 240×160 layouts fill the 480×320 screen with
zero per-coordinate rework. Flow restored and routed through the HD Field:
Boot → Title → New Game → Bench → **FieldHDScene** → grass encounter → Battle
→ (Evolution) → back to the Field. `BattleInit.returnScene` / `EvolutionInit
.returnScene` carry the return target; `MenuScene` resumes its launcher
(`{from}`); Title "Continue" loads → Field. FieldHD now reads game state, rolls
real `field-grass` encounters, opens the pause menu (START), and persists the
player's tile in `state.location`. Typecheck/lint/build/49 tests green.

Follow-ups: (1) battle still shows the **64px** sprite set (scaled 2× by the
zoom) — wiring the 96px `_hd` sprites into battle needs native repositioning;
(2) virtual d-pad placement under zoom (keyboard is fine); (3) compose the
Field from the extracted objects / a real tileset instead of the flat backdrop;
(4) a garage tile for defeat respawn (currently recharges in place).

**Open decisions (need Mark) before executing the pivot:**
1. **Native resolution + tile size** — proposal: 480×320 native, 32×32 tiles,
   integer-scaled. Their map is 4:3, so 480×360 is also an option.
2. **The 48 existing Ohm sprites** — full HD rework to match, or a hybrid
   (keep the pixel Ohms over HD environments)? This is the expensive call.
3. **Source tiles** — the supplied PNGs are scaled showcases (1448×1086, grid
   doesn't divide cleanly); to embed tiles 1:1 I need grid-aligned source
   exports or Tiled tileset files. Otherwise I author HD tiles in this style.

**Confirmed spec (2026-06-13):** native **480×320**, **32px** tiles, full
color, **full HD rework of all Ohms** (battle fronts → **96×96**).

**Done so far:**
- Toolkit upgraded for HD: `ramp(hex,{steps})` N-step gradients,
  `Sprite.antialias()`, and **`hdSmooth()`** — a supersampling area-downsample
  that dissolves Bayer dither into gradients and AAs the silhouette.
- **All 48 Ohms HD-reworked** (`npm run gen:sprites:hd`): the single design
  source (`gen-sprites.ts` now exports `FRONT_BUILDERS`, guarded so importing
  it doesn't regenerate the GBA set) is rendered through `hdSmooth` → 96×96
  smooth fronts at `public/sprites/ohms/<n>_front_hd.png`, manifest
  `src/data/sprite-manifest-hd.ts`. The grain is gone → soft/painterly-leaning,
  uniform across the roster. Comparison `/tmp/hd_all.png`.
- **Slicing/extraction tool built** (`npm run extract -- <file.png>`): the
  cattle-town sheets are sliceable after all — connected-component extraction
  pulled **62 clean transparent objects** from the object atlas into
  `assets/extracted/`. Terrain ground autotiles partly merge (want a source
  export or authored 32px tiles).
- **Trade-off (honest):** the HD pass is supersampled from 64px designs, so
  it's smooth but soft — detail is capped by the source. Per-sprite native-96px
  hand-detailing (rivets/panels, like the abandoned starter pass) is a future
  polish. It's painterly-*leaning*, not hand-painted; good enough to sit on the
  extracted environment art.

**Migration scope remaining:** bump Phaser native res + integer zoom and
reposition every scene's UI from 240×160 to 480×320; move overworld to 32px
tiles + a real tileset-blitting renderer (replacing colored-rect placeholders);
rebuild the Field map off the example layout; finish HD rework of the other
45 Ohms + backs + battle backdrop + UI. Need grid-aligned source exports of
the cattle-town atlases to embed the environment tiles 1:1. Game still runs on
the current assets meanwhile (transitional).

Everything below predates the pivot.

---


*Updated 2026-06-13 — session 2 (cont.): Phase 4 code push, M0–M8.*

## Done

- **Phase 3 contract approved as binding** (backs staged 45→156 confirmed;
  starter stage-1 silhouettes vary by Locomotion confirmed).
- **M0** scaffold: Vite + TS strict + Phaser 3, 240×160 integer zoom, CI
  (typecheck/lint/test), canon lint (core import wall + dead-name scan).
- **M1** data: all 150 species built deterministically from the canon roster
  (`src/data/roster.ts` is the compendium 1:1), 54-move pool, locked 11-type
  chart, items, the Field encounter tables. 9 validator tests.
- **M2** battle core: pure deterministic engine behind BattleAction/
  BattleEvent; Gen 3 damage goldens; statuses, passives, stages, party XP
  share, growth curves; capture economics → puzzle budgets; replay test.
- **M3–M5** overworld (Tiled loader, grid movement, zone encounters at
  statistical rates, LoS raiders, garage recharge, virtual d-pad), battle
  scene (HUD, menus, entry-slide only), capture puzzle scene (rotate-to-
  connect, 1000-seed solvability proof, status-slowed timer).
- **M6** Bench: preset select → grounded intro → 3 picks from the nine
  locked parts; all 27 builds test-verified.
- **M7** save v1: manual anywhere, 3 slots, versioned schema, working v0
  migration, committed fixtures, **headless smoke test in CI** (new game →
  Bench → battle → capture → save → load). 38 tests green.
- **M8 style guide submitted:** `docs/style-guide.md` + `assets/styleguide/`
  (6 ramps, Charkit/Toastlet/Filaglow at 64×64 and 16×16, Field tile strip,
  prompt sidecars).

## Art pipeline change (2026-06-13)

- **Chajipudi now produces the Ohm graphics**, not Claude/PixelLab. Recorded
  in CLAUDE.md, GDD §12, the contract, and the style guide (archived
  master-prompt left as the historical snapshot). Claude keeps spec, review,
  and integration.
- **`docs/art/sprite-brief.md`** is the full production list: all 150 Ohms
  with object, type, master-ramp palette, canvas-fill by stage, per-Ohm
  silhouette/face notes, and flags for the 6 starter Locomotion variants, the
  45 first-wave back sprites, and 12 overworld forms. Four priority tiers,
  Tier 1 = the slice set.

## Awaiting Mark / Chajipudi (gates M9 + mass art)

- **Approve/redline the style guide and reference sprites**, then Chajipudi
  works the brief Tier 1 first. Everything in-game is runtime placeholder
  rectangles until real sprites land.

## Known issues / deviations (transparent)

- Movepool is 54 (contract said ~110) — template learnsets only need these;
  pool grows in M10/M11 content passes.
- Lint is a custom checker (`tools/check-canon.ts`), enforcing the same two
  rules the contract gave ESLint (core wall + dead names) without the
  ESLint-TS dependency stack.
- Data lives as typed TS modules rather than raw JSON files (stronger
  build-time validation; JSON export is trivial if ever needed).
- Defeat currently returns to the garage silently; proper Gen 3 whiteout
  messaging lands with M9 slice content.
- Tags to apply on merge: `phase1-gdd` → 282ea9f · `phase2-compendium` →
  342aec0 · `phase3-contract` → fd33dc0 (remote refuses tag pushes).

## M9 progress (art-independent slice content, started 2026-06-13)

- **Evolution moment done** (slice deliverable; GDD §10.7): pure
  `src/core/evolution.ts` (level + Resonance/Prime Core, core-reservation so
  one core can't evolve two Ohms, cancelable) + `EvolutionScene` (B defers
  without spending the core, B mid-animation aborts). Wired into the
  post-victory flow. Starter bag now carries one Resonance Core (Grandpa's
  gift) so the slice's evolution is reachable. 8 new tests; 46 green total.
- **Bug fixed:** level-up recomputed stats without the Bench Plating lean, so
  a Heavy/Light starter silently lost its lean on first level-up. Build
  options (plating, expansion board) now persist on the Battler; level-up and
  evolution both honor them. Regression test added.

- **Out-of-battle menu hub done** (`MenuScene`, GDD §11): START opens a pause
  overlay over the overworld with PARTY (per-Ohm stats, types, moves+PP, XP
  progress, passive), the MANIFEST (all 150, freed/seen/unknown, live counts —
  the Pokédex analog), BAG (items with one-line use blurbs), and SAVE (3
  slots). Replaces the inline save menu the overworld carried; overworld
  flushes queued input on resume. New `xpProgress` core helper, tested.
  49 tests green.

## Sprites — Claude generating for now (2026-06-13)

- Mark asked Claude to produce sprites in the interim (Chajipudi later), at a
  high craft bar, homage to Gen 3 / Arc Raiders / Digimon — original designs,
  not traced (§15.2). Built a real toolkit `tools/spritekit.ts`: hue-shifted
  ramps, shaded sphere/rounded-rect primitives, 4×4 Bayer dithering, auto
  outline + sel-out, rim light, contact shadow, hard ≤16-color enforcement.
- **39 slice sprites authored** (`npm run gen:sprites` → `public/sprites/ohms/`,
  prompt sidecars each): **29 battle fronts** = the first 25 Ohms encountered +
  full evolution lines (species 1–26: the three starter trios, Toastlet,
  Wavelet, Filaglow, Vacuette, Fanlet, Frostbox lines + Beeplet/Percolatte/
  Mailstrom) plus Field bonuses 30/32/41; **9 backs** for the starter lines
  (1–9, scaled up per stage); and the player overworld micro.
- **Design language:** stage 1 clean/cute, stage 2 grows limbs/vents, stage 3
  sprouts appendages + "weapons" (chimney horns + molten claws, pylon
  arc-cannons, aqueduct water-cannons, burner crown + oven maw, chandelier
  crystal drips, icicle spikes). Expressive faces throughout (pupils, glints,
  brows, maws) — Digimon-ish creature read within the Gen 3 budget.
- **Batch 2 (027–048):** the rest of the Field — Sudsle/Laundrotaur,
  Registill, Vendetta, Snoozebox, Inklet/Qwertyrant, Digitall, Flashbat,
  Spoutlet/Hydrantler, Suppressure, Thistlebale, Pricklet/Cactacomb,
  Bonnetbloom, Barbwyre, Mowlet/Mowrauder — same simple→weaponized arc
  (Hydrantler water antlers, Qwertyrant ribbon banners + key maw, Cactacomb
  saguaro arms, Mowrauder blade wheels). **48 battle fronts now total** (001–048
  except 49+; species 1–48 complete).
- **Wired in:** BattleScene shows real foe fronts and player backs (entry
  slide preserved, trainer switch-ins swap); OverworldScene uses the player
  micro. Species without art still fall back to tinted rects. 49 tests green.
- **Kit fix:** `line()` now rounds endpoints — fractional Bresenham endpoints
  (from trig) never landed exactly and spun forever; central fix unblocked the
  trig-heavy batch-2 sprites.
- **Kit hardened:** `tools/spritekit.ts` now floors coordinates at the pixel
  boundary (fractional inputs from trig/scaling were silently corrupting the
  buffer → stray colors); per-sprite palette consolidated to ≤2 ramps to hold
  the ≤16-color budget (enforced, all pass).

## Next

- More sprite batches toward the full 156 (next: rest of Field 011–048, then
  overworld micros for roamers). Plus the remaining art-independent M9 content
  (elevator framing, real Field maps, quest-log shell). Then tag `slice-v0`.

## YoYoPixel evaluation (2026-06-14)

Evaluated YoYoPixel (github.com/SbName/yoyopixel, **MIT**) at Mark's request.
Verdict: **adopt.** It's a prompt/skill *methodology* for an LLM to author pixel
art, plus a procedural engine.
- **Grid mode** (characters/items/props) stores art as `{palette, pixels[]}`
  (same as our ASCII sprites) → rasterizes headlessly. Built `tools/yoyo2png.ts`
  (npm run yoyo2png) to convert grid assets → game PNG; proven on their
  swordsman (16×24, cleaner shading than our hand-built protags).
- **Procedural mode** (buildings/tilesets, e.g. their village set) is clearly
  better than our hand-coded buildings, but outputs canvas JS that needs a
  renderer (node-canvas/browser) — not available in this headless env. Wiring
  that is the next step (needs a native `canvas` install — pending Mark's OK).
- License: MIT, clean. We ship nothing of theirs — we author originals with the
  methodology; yoyo2png is ours. Adopt the grid methodology for characters/Ohms/
  items now; wire the procedural engine for environments next.
