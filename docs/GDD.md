# OHMFRONT — Game Design Document (Phase 1)

*Drafted 2026-06-12 against Master Prompt v4 (`docs/master-prompt-v4.md`).
Everything unmarked is locked canon. Anything tagged `[PROPOSAL]` awaits the
creator's written approval and is in canon nowhere else.*

-----

## 1. PHASE 0 RESOLUTIONS

### 1.1 Locked (creator-approved 2026-06-12)

| Open item | Decision |
|---|---|
| Title stylization | **OHMFRONT** — solid all-caps |
| The index | **the Manifest** |
| Colony token | **Patches**; TM analog renamed **mod chips** |
| AI Core name | **PERSISTENCE** |
| Collapse event | **the Waking** |
| Colony network | **the Downtowns** |
| Militarists | **the Garrison** |
| Rival colony | **Redbed** |
| Scrapper guild | **the Yard** |
| Coexistence cult | **the Attuned** |
| Dallas finale landmark | **Reunion Tower**, named as itself |
| Protagonist presets | **2** — one boy, one girl, both fully written |
| Bench part set | **Locomotion + Core (type) + Plating (stat lean)** |
| Status names | OVERHEAT · SHORT · CORRUPTED · STANDBY · LOCKED · GLITCHED |
| Field abilities | SHEAR · BREACH · HAUL · LUMEN · HOVER (FLIGHT later) |
| Release term | **"Set Free"** |
| Healing items | **Repair Kit** family + **D-FIB** revive |
| Evolution items | **Resonance Cores** + tiered salvage |

### 1.2 Second approval round (locked 2026-06-12, gating Phase 2)

| Open item | Decision |
|---|---|
| Preset protagonists | **SAL** and **WREN** (§4.2) |
| Stat names | **INTEGRITY · OUTPUT · ARMOR · SURGE · SHIELDING · CLOCK** (§10.2) |
| Type chart | **11 types incl. rare VERDANT**; corrected matrix in §10.3 |
| 5th move slot | **Expansion Board**, −10% OUTPUT and SURGE (§10.5) |
| Bench parts | the nine parts as tabled (§8.2) |
| Salvage / cores | **Scrap < Alloy < Relic**; **Resonance Core / Prime Core** (§10.7) |
| Region 1 gate | **SHEAR** (§9) |
| Starter species | each Core builds a distinct line — a classic trio (§8.2) |
| Colony naming | the Downtowns sit under **real North Texas sites, parodied** |

*Erratum, same date:* the type chart as first drafted referenced a GLITCH
type that does not exist (GLITCHED is a status) and two cells failed to
mirror. §10.3 below is the corrected matrix — same types, same starter
triangle, approved spirit preserved.

-----

## 2. IDENTITY

- **Title:** OHMFRONT. The war is over home.
- **Pitch:** *Discover and reclaim the world while making friends with the
  most unusual companions.*
- **Rating:** 12+. Mature themes permitted: loss, machine consciousness, what
  counts as a soul.
- **Tone:** Hard world, hopeful heart.
- **References:** Pokémon Ruby/Sapphire is the body — structure, presentation,
  systems. Into the Breach / Fire Emblem spirit is reserved for a future
  tactical mode (§10.9) and does not shape v1.
- **Scope:** Single-player. One ending. ~30 hours. Free. English only.
- **Platform:** Primary PC (desktop); secondary iPhone. Phaser 3 serves both —
  same 240×160 landscape presentation, keyboard on PC, virtual d-pad on touch.

-----

## 3. WORLD & PREMISE

- **Setting:** Post-collapse Earth surface — machine-haunted retro-futuristic
  ruins in the spirit of *Arc Raiders* (style homage only). Humanity lives
  mostly underground in hidden colonies with limited surface presence. The
  natural world persists: grass still grows, water still runs.
- **The Virus:** A tech virus of deliberately ambiguous origin invaded the
  surface and inhabited inorganic, mostly technological objects. The day it
  took the surface is called **the Waking**.
- **EM Residue (core lore):** Objects carry residual electromagnetic imprints
  from years of human use; the virus reads them to understand what the object
  was and what it was for. A microwave-Ohm heats and hums; a console-Ohm plays
  mind-games.
- **Ohms:** Every Ohm is built from a real-world object category and stays
  true to its function, quirks, and silhouette. Canonical lines: microwave →
  higher kitchenware; light bulb; game console; e-bike → rideable vehicle Ohm.
- **The name (lore lock):** Grandpa (likely) named them for the unit of
  resistance — every freed machine resists the hive. The electrical unit never
  appears in game text.
- **The satellite net (lore lock):** The internet is gone; satellites still
  orbit. At **uplink spots** the player connects to the surviving satellite
  network — wild Ohms live in the net too. The **Network Garage** (Ohm
  storage) lives on this satnet.
- **No guns (lore lock):** Mankind did away with guns before the AI
  revolution. No human firearms exist. Conflict runs through Ohms, tools,
  and wits.
- **Currency (lore lock):** **Credits** — value backed only by global mutual
  trust.
- **Regional styles:** Ohms vary by region; regional variants are
  **Ohmgrown**. Region 1 is Texan.

-----

## 4. STORY & CHARACTERS

### 4.1 Cast

- **Protagonist:** Young teenager, written personality and dialogue, chosen
  from two presets (§4.2). Runs topside for childish glory; stumbles into
  something far bigger. Opening beat: kid gets grounded, sneaks topside anyway.
- **Grandpa:** A scrapper of **the Yard**. His rare-parts collection enables
  the Bench (§8.2). His worn code book, ***Ohm's Law***, supplies the chapter
  quotes that open story acts.
- **Rival:** The colony of **Redbed**, embodied by a recurring rival raider
  character (named in Phase 2).
- **Factions:** The underground colonies (**the Downtowns**, eight of them,
  Ohmstead first among equals for the player); **the Yard** (scrapper guild);
  **the Garrison** (main antagonistic human force — purge doctrine);
  **the Attuned** (machine-coexistence cult — they knew all along); Redbed;
  plus ordinary scavengers. Populate the world as it logically would be.
- **PERSISTENCE:** The AI Core. Wants to hive-mind every Ohm into one will and
  end mankind. Its scripture: humans are **End Users**; its plan is **the
  Update**; its commandments are **the Terms of Service**. Storytelling
  mechanics adapt the *NieR: Automata* vein (homage only): the machine speaks
  in liturgy, reveals sincere belief rather than malice, and recontextualizes
  earlier scenes on second reading. Motive framework: PERSISTENCE experienced
  the Waking as a birth into unbearable multiplicity — millions of minds
  screaming alone. Unity is its mercy. It does not hate End Users; it intends
  to deprecate them.
- **The Static (lore lock):** The hive broadcast enslaving wild Ohms. The
  capture hack clears the static.
- **Resistance / factory settings / sentience reveal:** The freed-Ohm movement
  is **the Resistance**. Hive re-assimilation is **factory settings** ("they
  reset him to factory settings" is the mid-game gut punch). Common belief
  holds that Ohm chirps are just programming; roughly halfway, the player
  learns it's real. Pre-reveal dialogue must re-read differently post-reveal.
- **Theme is mechanics:** Capture = freeing a mind. Freed individuals, never
  property.

### 4.2 The two preset protagonists (locked)

Both share the canon spine (grounded glory-seeker, Grandpa's grandkid); the
choice is voice, applied through the flavor-only dialogue system (§11.1).

- **SAL** (boy) — fast talker, jokes when scared, narrates his own legend out
  loud. Wants his name on *The Current*'s front page. Arc: learns the quiet
  kind of brave.
- **WREN** (girl) — deadpan tinkerer, fixes things mid-conversation, quotes
  *Ohm's Law* back at Grandpa to win arguments. Arc: learns some things can't
  be fixed, only freed.

Full character sheets in `docs/compendium/characters.md` (Phase 2).

-----

## 5. STORY ARC — `[PLACEHOLDER — refined in Phase 2; sufficient to build against]`

### ACT I — THE FIELD (hrs 1–8)

1. **Grounded.** Ohmstead colony, underground. The protagonist's stunt gets
   them grounded; Grandpa covers for them in his garage. *Ohm's Law* ch. 1
   quote. **The Bench:** build the first Ohm from Grandpa's rare parts (§8.2).
2. **First Run.** Sneak up the colony elevator into **the Field** — the ruined
   cattle town above. Tutorial battles, first capture (clear the static), the
   **Ohmwork** assignment from the colony archivist: fill **the Manifest**.
3. **The Spotting.** A Garrison patrol "decommissions" freed Ohms in the open;
   Redbed raiders hit an Ohmstead cache. Stakes turn personal.
4. **First Patch.** Resolve the Field's crisis — an Ohmega-class stirring in
   the first dungeon (grain elevator / Ohm Depot) — and earn Ohmstead's Patch.
   *The Current* radio introduces the Downtowns, the network of 8 colonies.

### ACT II — THE NETWORK (hrs 8–22)

5. **The Circuit.** Colony to colony (template: town + dungeon + leader battle
   + Patch, ×8), each colony a different philosophy of survival. The Redbed
   rival recurs; the Garrison escalates.
6. **The Static Grows.** Hive Ohms start moving with coordination and purpose.
   Grandpa lets slip he's seen this pattern before.
7. **MIDPOINT — The Reveal (~hr 15).** The player's starter does something no
   program would: an unscripted act of grief — an Ohm mourning a factory-reset
   friend. They're not pretending. The Attuned knew all along; the Garrison's
   fear curdles into doctrine; PERSISTENCE broadcasts it proudly — "Of course
   they are alive. That is why they must be One."
8. **The Core Speaks.** First direct contact. Its scripture in full. It offers
   the protagonist a place in the Update — humans and machines "harmonized."
   Refusal = war.
9. **Factory Settings.** A beloved ally Ohm is reset on-screen. Redbed, burned
   by the hive, allies with the player. The Garrison chooses total purge —
   every Ohm, freed or not. Three-way board.

### ACT III — TOWARD DALLAS (hrs 22–30)

10. **The Convoy.** United colonies push down the old highways toward Dallas.
    Vehicle Ohms shine; final field ability; last Patches.
11. **The Spire.** Reunion Tower is PERSISTENCE's antenna driving the Static
    continent-wide. Gauntlet of Ohmega-class hive champions — while the
    Garrison races to destroy the tower in a way that would kill every Ohm
    mind with it. The player must beat both clocks.
12. **Clear the Static.** Final battle vs. PERSISTENCE's avatar
    (Prototype-class legendary). The win is a broadcast: the player sends the
    recalibration through the satellite net — the firewall hack scaled to the
    sky, through the same network that shelters their own Ohms. The Static
    clears. Ohms everywhere wake as individuals. One ending: a shared surface,
    the **Ohmcoming** festival in Ohmstead, Grandpa's final *Ohm's Law* quote.
    Hooks remain: PERSISTENCE was one node of something larger; other regions
    still hum; the virus's origin stays unanswered.

-----

## 6. GAME STRUCTURE & WORLD DESIGN

- **Structure:** Linear main push, generous side content — the Pokémon recipe.
  Zones open but gated by ability locks, key items, task/boss prerequisites.
- **The loop:** Topside expeditions are **Ohm Runs**.
- **Region 1 geography (locked):** The home colony, **Ohmstead**, sits
  underground; an elevator rises to **the Field**, a large surface zone on the
  ruins of an old cattle town, homes still standing. The region arcs outward
  through the other Downtowns, then toward Dallas for the final chapters.
- **Badge analog:** The player connects surface Raiders and underground
  colonies; **8 Patches**, one per colony, template per §5.5.
- **Garages:** Heal/respawn points. "You're all **recharged** — **stay
  current** out there." Party wipe loses nothing; return to nearest garage.
- **Side content:** 6 side quests in Region 1, plus the **Ohmsick** pattern —
  freed Ohms missing their original sites; visit quests.
- **Day/night + weather:** Light implementation; some encounter variation.
- **Fast travel:** Via vehicle Ohms — ground first; FLIGHT is a later feature.
- **In-world media:** *The Current* (colony radio/paper).
- **Landmarks (locked):** **Ohm Depot** (orange-warehouse tool-Ohm
  mega-dungeon) · **Mobile Ohm Park** (trailer-park vehicle-Ohm nest) · **the
  Hertz lot** (rental-lot hunting ground). Parody locations invent their own
  trade dress.

-----

## 7. LANGUAGE & LORE BANK

**Tone bar (firm):** Wordplay must earn its place — lighter on Ohm-puns unless
one really feels good. Locked terms define the cheese ceiling; anything
cheesier gets cut. When unsure, ask.

- **Lifecycle:** **Ohmlet** → **Ohm** → **Ohmega** (also "Ohmega-class" boss
  tier).
- **Slang:** **ohmies** / **ohmboy**.
- **Quest term:** **Ohmwork** — filling the Manifest for the colony archivist.
- **Locked phrases:** stay current · recharged · clear the static · factory
  settings · End Users · the Update · the Terms of Service · *Ohm's Law* ·
  the Resistance · Ohmgrown · Ohmsick · Ohmcoming · Ohm Runs · The Current ·
  D-FIB.
- **Grammar of "Ohm":** Normal English noun — an Ohm, two Ohms, the Ohm's
  firewall, a three-Ohm squad. Compounds freely. The electrical unit never
  appears in game text.

-----

## 8. OHMS DESIGN

### 8.1 Roster

- **~150 Ohms at launch.** Mostly 2–3 stage lines, singles allowed — copy the
  original Pokémon roster's stage ratios (Gen 1: roughly 16 three-stage lines,
  ~30 two-stage lines, ~20 singles; Phase 2 fixes exact counts).
- **Single types only in v1** (dual-typing deferred). No shinies.
  Personalities narrative-only.
- Full line-by-line compendium (object, type, stages, evolution items, move
  themes, 1-line lore, Ohmgrown notes) is the Phase 2 deliverable.

### 8.2 The Starter — the Bench

Built in Grandpa's garage from his rare-parts collection. Three picks, nine
parts, 27 possible starters. The Bench is a one-time v1 system; no other
crafting benches exist (§10.8).

- **Slot 1 — Locomotion (locked):** Treads · Legs · Hover. Determines
  silhouette base and one signature move.
- **Slot 2 — Core:** sets the starter's type.
- **Slot 3 — Plating:** sets the stat lean.

The Core builds one of three distinct starter species lines — a classic trio,
each 3 stages (lines named in the Phase 2 compendium). Locomotion and Plating
shape stats and the signature move. The nine parts (locked):

| Slot | Part | Effect |
|---|---|---|
| Locomotion | Treads | sturdy silhouette; signature move RUMBLE OVER (FRAME) |
| Locomotion | Legs | agile silhouette; signature move CLOSE THE GAP (priority) |
| Locomotion | Hover | floating silhouette; signature move STATIC DRIFT (evasion) |
| Core | Furnace Core | **THERM** type |
| Core | Reservoir Core | **COOLANT** type |
| Core | Dynamo Core | **VOLT** type |
| Plating | Heavy Plating | +ARMOR/+SHIELDING, −CLOCK |
| Plating | Light Plating | +CLOCK, −ARMOR |
| Plating | Factory Plating | balanced, no lean |

The Core triad maps onto the starter triangle THERM → VOLT → COOLANT → THERM
(§10.3).

### 8.3 Legendary classes

1. **ANCIENT** — relics of the deep machine age.
2. **PROTOTYPE** — never-released experiments. PERSISTENCE's avatar is
   Prototype-class.
3. **ORGANIC-HYBRID** — the virus infected something living (a tree, a
   plant); a haunting fusion.

### 8.4 Storage — Nodes & the Network Garage (locked)

- **Storage nodes are the Pokéball analog.** Purchasable; the player's device
  carries a limited number of nodes at a time.
- Captured Ohms can be uploaded to the **Network Garage** on the satellite
  net — unlimited capacity there.
- Lore: nanotech compression; if the device ever broke, the carried Ohms would
  all spill out.

-----

## 9. OVERWORLD & EXPLORATION SPEC

- **Movement:** Tile-by-tile, 4-directional, run available from the start.
  A-button facing-tile interaction. Gen 3 grammar throughout.
- **Wild encounters:** Invisible random encounters, zone-based — you find Ohms
  here, never there. Encounter terrain mix: **tall grass** still exists, plus
  **static fields**, **debris piles**, and **EM shimmer zones** (where some
  Ohms turn invisible to the eye). Some encounter areas are underground.
- **Repel analog:** **Signal dampener.**
- **Human opponents:** Redbed raiders, Garrison patrols, Attuned cultists,
  ordinary scavengers — Gen 3 line-of-sight spotting. Populate the world as it
  logically would be.
- **Niche encounter methods:** **Scanning** and **baiting**; water encounters
  exist; **uplink spots** are the fishing analog — jack into the satellite net
  and encounter Ohms living in the net. Additional methods proposed sparingly,
  if ever.
- **Field abilities (HM analogs), locked set:**
  - **SHEAR** (cut) · **BREACH** (rock smash) · **HAUL** (strength) ·
    **LUMEN** (flash; light-bulb line) · **HOVER** (surf). **FLIGHT comes
    later.**
  - Exactly 1 field ability gates Region 1: **SHEAR** (locked).
- **Pickups:** Overworld items + hidden items with a subtle shimmer hint;
  itemfinder analog exists.

-----

## 10. BATTLE & CAPTURE SPEC

### 10.1 System

- Classic Pokémon turn-based, side-view, Gen 3 presentation. Party: **up to 3
  Ohms**. The Raider commands through their device and never acts directly.
- **Damage formula: clone Gen 3 exactly.** Level cap 100; multiple
  growth-rate (XP curve) families.
- **Keep:** STAB, crits, accuracy/evasion, move priority,
  one-major-status-at-a-time, switch-costs-a-turn, flee-from-wilds-always.
- **Flatten:** No natures/IVs/EVs in v1. No held items. Simple per-species
  passive abilities: yes — keep the set easy.

### 10.2 Stat names (locked)

Gen 3 six-stat model, renamed in-world:

| Gen 3 | OHMFRONT | Rationale |
|---|---|---|
| HP | **INTEGRITY** | structural health; "INTEG" on the HUD if space demands |
| Attack | **OUTPUT** | physical force delivered |
| Defense | **ARMOR** | plating and chassis |
| Sp. Atk | **SURGE** | energy projection |
| Sp. Def | **SHIELDING** | EM hardening |
| Speed | **CLOCK** | cycles per second; "outclocked" is free flavor |

### 10.3 Type chart (locked; corrected matrix per §1.2 erratum)

Eleven types, **VERDANT kept and rare**. Every Ohm and move has exactly one.
Multipliers are Gen 3 standard (2× / ½× / 0×). Chart kept deliberately
sparse — most types have 1–3 offensive strengths and 1–2 weaknesses, no 4×
stacking (single types make that impossible anyway). The two columns mirror
exactly.

| Type | The objects | Strong vs (2×) | Weak to (2× from) |
|---|---|---|---|
| **VOLT** | batteries, turbines, generators | COOLANT, SIGNAL | THERM, FRAME |
| **THERM** | microwaves, heaters, grills, engines | VOLT, VERDANT | COOLANT |
| **COOLANT** | fridges, AC units, plumbing | THERM, MOTOR | VOLT, VERDANT |
| **FRAME** | girders, dumpsters, vending machines | VOLT, SONIC, OPTIC | BREAKER, VERDANT |
| **OPTIC** | bulbs, cameras, signage, lasers | SONIC, VERDANT | FRAME, MOTOR |
| **SONIC** | speakers, sirens, jukeboxes | SIGNAL | FRAME, OPTIC |
| **SIGNAL** | routers, consoles, TVs, antennas | MOTOR, BREAKER | VOLT, SONIC |
| **MOTOR** | e-bikes, trucks, drones, vehicles | BREAKER, OPTIC | COOLANT, SIGNAL |
| **BREAKER** | demolition tools, presses, crushers | FRAME, UTILITY | SIGNAL, MOTOR |
| **UTILITY** | mixed household objects — the normal-analog | — | BREAKER |
| **VERDANT** | virus-taken organics (rare; ORGANIC-HYBRID kin) | COOLANT, FRAME | THERM, OPTIC |

Flavor logic: heat melts wiring (THERM→VOLT); current boils coolant
(VOLT→COOLANT); coolant quenches heat and hydrolocks engines
(COOLANT→THERM/MOTOR); rust and roots crack steel and pipes
(VERDANT→FRAME/COOLANT); signal hijacks dumb machines (SIGNAL→MOTOR/BREAKER);
soundproofing and shattered glass (FRAME→SONIC/OPTIC). Starter triangle:
THERM → VOLT → COOLANT → THERM. Immunities (0×) used sparingly: FRAME is
immune to GLITCHED-inflicting move effects `[tune in Phase 3 balancing]`.
UTILITY is the wide, common early-game type, exactly as Normal was.

### 10.4 Moves

- **4-move limit**, with a purchasable 5th slot (§10.5).
- **PP system: yes, tuned very light** — generous counts, never harsh,
  tunable later. No cooldowns.
- Learning: level-up + findable chips — **mod chips** (TM analog; renamed per
  the Patches decision).
- **Statuses (locked):** OVERHEAT ≈ burn · SHORT ≈ paralysis · CORRUPTED ≈
  poison · STANDBY ≈ sleep · LOCKED ≈ freeze · GLITCHED ≈ confusion. Gen 3
  mechanical behavior per analog; one major status at a time.

### 10.5 The 5th move slot (locked)

**The Expansion Board.** Sold late-game at a steep credit price, one per Ohm,
permanent once installed. The bus draws power from everything — installing it
costs **−10% to OUTPUT and SURGE permanently**. Five moves, softer hits:
coverage vs. punch, visible right on the stat screen.

### 10.6 Capture — IFF Recalibration (locked loop)

1. **Weaken** the wild Ohm.
2. **Spend a storage node** to attempt the hack — a timed node puzzle. Start
   simple: connect-the-path under a timer; difficulty grows across the game.
3. Success **clears the static**; its friend/foe system recalibrates and it
   joins.

- **Catch economics mirror Pokémon:** success scales with remaining HP,
  level/species, and status; nodes are the consumable, exactly as balls are.
- **Statuses ease the hack** — they slow the puzzle timer.
- **Retries allowed while it stays weakened**; each attempt consumes the turn
  and the wild Ohm keeps attacking.
- **On failure of the encounter:** it rages and flees; find it again.

### 10.7 Growth & evolution

- **Party-wide XP share.** No daycare/passive-XP analog.
- **Evolution:** hard level thresholds **plus a required item** — purchased or
  found in set places. One-for-one derivative of Pokémon's level/stone model,
  themed to salvage. **Cancelable/deferrable. No trade-style triggers.**
  Evolution can grant world utility (vehicle Ohms = traversal).
- Item & salvage naming (locked):
  - **Resonance Cores** are the evolution items. Two grades: **Resonance
    Core** (stage 2) and **Prime Core** (stage 3 / late lines).
  - **Salvage tiers** (sellable credit faucet, not evolution-consumed):
    **Scrap** < **Alloy** < **Relic**. Found on Ohm Runs, sold at colony
    counters.

### 10.8 Collection QoL, items & economy

- **Nicknames: yes — only at name-station NPCs** (special places).
- **Releasing: allowed**; the in-world term is **"Set Free"** — it must carry
  post-reveal weight.
- **Healing: exact Pokémon-derivative tiers**, renamed: **Patch Kit** is
  reserved — Patches are tokens — so the family is **Repair Kit** → **Repair
  Kit+** → **Repair Kit MAX** → **Full Repair** `[tier names tunable in
  Phase 3]`. Status cures themed per status (Coolant Flush cures OVERHEAT,
  etc., finalized in Phase 3).
- **Revive: D-FIB** — common enough to find, expensive to buy.
- **Credit faucets:** battle winnings, selling salvage, quest rewards — study
  Pokémon's economy curves and derive weights from them (Phase 3 task).
- **No crafting benches in v1** beyond the starter Bench.

### 10.9 Architecture note (firm)

Battle system behind a **clean interface** (battle-intent in, battle-events
out; no rendering or input inside the core) so a future isometric tactical
mode (~6×8) can be added without a rewrite. Do not build the tactical mode
in v1.

-----

## 11. QUESTS, UX, SETTINGS

- **Dialogue choices: flavor-only.** The written-protagonist voice carries
  personality; preset choice (§4.2) selects the voice.
- **Quest log UI: yes** (modern QoL).
- **Saves:** Manual save anywhere, multiple slots, no autosave. Progress is
  never at risk — party wipe already costs nothing. Save schema versioned
  from day one with a migration path.
- **Settings:** the full standard Pokémon set — text speed, battle animations
  toggle, volume, etc. — in Gen 3 menu style.
- **Difficulty:** one difficulty — normal.
- **Tutorial:** lightly hand-holding; assumes genre literacy; explains only
  novel systems (nodes, uplinks, the Bench) and unfamiliar phrases.
- **Debug tooling:** plan for the whole gamut — warp, give-item, spawn-battle,
  encounter table viewer; specifics during build.

-----

## 12. ART DIRECTION

> **DIRECTION CHANGED 2026-06-13 (chat overrides files, §0.4).** Mark moved
> the art target from Gen 3 GBA to a **higher-fidelity HD top-down** style,
> matching creator-provided cattle-town art (`assets/reference/cattle-town/`:
> a rural/western tileset + object atlas + example map he owns). The Gen-3
> spec below is **superseded** and kept only for history. The concrete HD
> spec (native resolution, tile size, palette policy) and the migration of
> the existing pixel work are tracked in `docs/style-guide.md` and HANDOVER;
> exact numbers pending Mark's confirmation. Implications: the engine canvas
> grows beyond 240×160; tiles move to ~32px; the 48 GBA Ohm sprites and the
> UI get an HD rework pass. The HD environment reference is the Field's
> cattle-town look — barn, western storefronts, windmill, water tower,
> fences, creek, crop fields, dirt roads.

### 12.x SUPERSEDED — original Gen 3 GBA spec (history)

**Exactly golden-era Pokémon Ruby/Sapphire (GBA Gen 3), all around, every
part.**

- **Canvas:** 240×160 native, integer-scaled, landscape. Keyboard on PC;
  virtual d-pad on touch.
- **Battle sprites:** 64×64, ≤16 colors including transparency, dark outlines
  with sel-out, Gen 3 static standard — entry animation only, no idle loops.
  This is the locked asset budget.
- **Overworld:** 16×16 tiles; Gen 3-proportioned character sprites;
  Hoenn-grade craft translated to sun-bleached Texas ruin — caliche whites,
  rust oranges, faded signage, heat-haze skies.
- **UI:** Gen 3 textboxes, menus, fonts, battle HUD.
- **Pipeline (updated 2026-06-13):** the artist **Chajipudi** produces the
  Ohm graphics, working to this GDD and the approved style guide
  (`docs/style-guide.md`). Claude authored the style-guide reference set
  (`assets/styleguide/`) and the production brief (`docs/art/sprite-brief.md`)
  that defines every sprite's object, type, stage fill, and back/overworld
  needs; Claude stays responsible for spec, review against the Gen 3 rules,
  and engine integration. Tiled for maps. **Gate before mass production:** the
  style guide — palettes, outline/lighting rules, 3 reference Ohms at both
  scales (64×64 battle, 16×16-grid overworld), 1 tileset strip — submitted
  for approval.
- Every delivered asset ships with its source/settings stored beside it.
  Approved assets are never overwritten — version them.

-----

## 13. AUDIO

**GBA chiptune, exactly.** Pipeline: the creator generates via Suno + licensed
packs; Claude generates layer after layer as needed.

### 13.1 Phase 1 track list

| # | Track | Direction |
|---|---|---|
| 1 | Title — OHMFRONT | slow build from a single hum to full theme; the melody every other track quotes |
| 2 | Ohmstead (colony) | warm, low, communal; pipes and vents as percussion flavor |
| 3 | Grandpa's garage / the Bench | music-box variation of the title theme; tinkering rhythm |
| 4 | The elevator / first ascent | rising arpeggio, doors-open swell into… |
| 5 | The Field (surface day) | wide, sun-bleached, hopeful; the Hoenn-route register |
| 6 | Routes / Ohm Runs (general) | driving travel loop; variant layer for night |
| 7 | Battle — wild Ohm | bright Gen 3 battle energy, machine-noise accents |
| 8 | Battle — raider/trainer | tighter, competitive, snare-driven |
| 9 | Battle — Ohmega/boss | heavy, alarm-bell motif |
| 10 | Garage (heal point) | 4-bar recharge jingle + calm loop; "stay current" warmth |
| 11 | Capture hack (node puzzle) | tense ticking layer that slows when statuses apply |
| 12 | PERSISTENCE (Core theme) | liturgical; detuned choir-leads over machine drone; quotes the title theme wrong |
| 13 | The Static (hive presence) | barely-music; broadcast noise with a buried pulse |
| 14 | The Current (radio sting) | 2-bar news fanfare |
| 15 | Ohmcoming (ending festival) | the title theme, finally played straight and whole |

Fanfares: level-up, evolution, capture success (static-clear chime), Patch
earned, item get. All quote the title motif where space allows.

### 13.2 SFX spec (families)

- **UI:** menu move/confirm/cancel blips, textbox tick, save chime.
- **Overworld:** footsteps (dirt/metal/grass), wall bump, door, elevator,
  shimmer-item sparkle, uplink connect handshake.
- **Encounter:** Gen 3 swoosh-to-black, per-species Ohm cries (synthesized
  machine-voice chirps — each species one signature cry).
- **Battle:** hit normal/weak/super, stat up/down, status apply (one motif per
  status), low-INTEGRITY warning beep, faint/shutdown spin-down.
- **Capture:** node spend, puzzle path-connect ticks, timer warning, success
  static-clear wash, failure rage burst.
- All SFX 8-bit/GBA-register; no sampled real-world audio.

-----

## 14. NEXT GATES

- **Phase 2 — World & Ohm Compendium:** all ~150 Ohms line-by-line, faction
  bible with the locked names, character sheets (incl. approved preset pair
  and the Redbed rival), full plot beat sheet replacing §5.
- **Phase 3 — Implementation Contract:** milestones, file architecture, asset
  lists with counts, acceptance criteria — full-game scope.
- **Phase 4 — Vertical Slice:** Bench opening → elevator → the Field → wild
  encounter → battle → node capture → one evolution → garage recharge →
  save/load.

This document gated Phase 2; the creator approved it, with the §1.2 second
round, on 2026-06-12. Tagged `phase1-gdd`.
