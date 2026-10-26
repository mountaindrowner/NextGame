# OHMFRONT — HD-2D Direction (branch `claude/hd2d`)

*Decided by Mark, 2026-10-22. This branch remakes every graphical asset and the
combat presentation. The game underneath stays: story, cast, Ohms, world,
layouts, ideas. The pre-HD-2D game is frozen on `claude/make-this-happen-o0q20w`
as the reference build.*

## What stays

- Story, cast, the 150 Ohms, the Manifest, factions, locked names and phrases.
- You start in the underground base (Ohmstead). Its layout stays.
- Existing map layouts are kept where they exist, and get redone later.
- Game logic carries over: data (`src/data/`), battle engine core, save system,
  story flags, dialogue, tests.
- The current Ohm sprites stay as placeholders. PixelLab replacements come later.
- The intro stays; its cinematic gets redone.

## Decisions

| # | Topic | Decision |
|---|---|---|
| 1 | Engine | **Three.js**, in the browser. Replaces Phaser for rendering. |
| 2 | Platforms | PC and iPhone, **landscape**. |
| 3 | Movement | **Free movement** (try it). |
| 4 | Camera | **One fixed angle.** No rotation. |
| 5 | Combat | **HD-2D presentation + Battle Network–style grid combat.** Ohms attack different grid patterns; the point is creative, strategic variety between Ohms. Exact rules: later. |
| 6 | Battle staging | **Left vs right** (side view). |
| 7 | Overworld Ohms | Lead Ohm **follows** the player. Encounters are a **mix of visible and random**. |
| 8 | Characters | **8 directions, full animation set** (walk, run, idle, talk, battle). |
| 9 | Cast | SAL, WREN and the NPCs get **new sprites in the new style**. |
| 10 | Portraits | Dialogue **has portraits — new ones**. |
| 11 | World building | **Claude builds the 3D environments.** A/B test: (a) **modular block kits with pixel-art textures** vs (b) **fully custom designs and detail**. Compare, then pick. |
| 12 | Fidelity | Try **both** chunky and detailed, as part of the A/B test. |
| 13 | Lighting / weather | **Day or night is fixed per scene** (no cycle). Weather **by area, fixed to the scene**, used only in special circumstances. |
| 14 | Layouts | **Keep existing layouts**; redo later. |
| 15 | UI | **Improve and clean** all UI (menus, dialogue, battle HUD, Manifest). |
| 16 | Mood | **Bleak and melancholy, overgrown by bright, lush life.** |
| 17 | Branching | **Freeze** the old build; develop here as the direction unfolds. |
| 18 | First proof | **Ohmstead's surface level** (the ruined cattle town above the bunker). |

## Canon superseded on this branch

- `CLAUDE.md` art lock ("HD top-down", "YoYoPixel grid method is the pipeline")
  → replaced by HD-2D with Three.js.
- Engine "Phaser 3, 240×160 native" → Three.js, landscape, resolution TBD.
- Battle presentation (Gen-3 front/back) → HD-2D side view on a Battle Network
  grid. **The Gen-3 damage formula, party of 3, and move rules are not yet
  replaced** — rules are to be decided. The canon clause "battle system behind
  a clean interface" is the seam the new combat plugs into.

## Follow-ups (2026-10-23)

- **Characters + portraits:** keep the current sprites/portraits as placeholders
  for now; remake them later.
- **First proof = the Field** (the ruined cattle town above Ohmstead).
- **Tilt-shift blur is essential** — always on, a defining part of the look.
- **Build order: B first** (fully custom designs and detail), then A (modular
  block kits) to compare.

## Character art style (2026-10-23)

- **Locked: "Indie action-adventure"** for SAL — chunky stylized
  proportions, bold readable silhouette, lineless with strong graphic light
  and shadow, 64 px, low top-down, 8 directions. Source: PixelLab Pro
  character `cea31c61-3b70-4ec6-a617-413b60f80ece` (prompt in
  `assets/reference/styles/sal_indie.prompt.json`); in-game files in
  `public/world/styles/e_pro/`. The wider cast, WREN and portraits follow
  this style. Rejected: the big-head chibi variant of the same genre.
- Explored and passed over: chibi adventure, 16-bit console JRPG (runner-up),
  handheld monster-tamer, tactics RPG, gritty survival, cozy life-sim, anime
  action (boards in `assets/reference/styles/`).

## Grid combat — proof of concept (2026-10-23) · [PROPOSAL] rules

Built to test the feel; **nothing here is canon until Mark approves**.
Code: `src/hd2d/battle/rules.ts` (pure, unit-tested in `tests/gridrules.test.ts`)
and `src/hd2d/battle/arena.ts` (HD-2D stage + UI).

- **Field:** 6×3 panels — your 3×3 (blue) on the left, the foe's (red) on the
  right. Each Ohm stands on one panel of its side and moves in real time.
- **Moves fire, no menu:** each of the Ohm's moves is a chip (J/K/L/;) with a
  **pattern** and a **recharge** (0.6 s + power/55; status moves 2.6 s).
- **Patterns:** Shot (first Ohm down your row) · Dash (lunge down the row) ·
  Close (the panel in front — only from your front column) · Wave (their
  front column) · Surge (their whole row) · Lob (three panels ahead, or the
  aimed panel) · Burst (a five-panel plus). Signature moves are mapped by
  hand (POUNCE = Dash, MARK STRIKE = Lob, Heat Tick = Burst…); the rest by type.
- **Foe telegraphs** every attack in pulsing red (~0.85 s); aimed shapes lock
  onto where you stood when it wound up. Dodging is your evasion: only moves
  under 100 accuracy can miss on their own.
- **Numbers:** the unchanged Gen 3 formula on canon stats, STAB, crits and the
  11-type chart; stat stages apply; HOBBLE never downs; −CLOCK slows the foe.
- **Flow:** tall grass rolls the area's encounter table (Gen 3 rate per tile);
  win, lose or run (Esc), then back to the overworld. Lead Ohm HP persists;
  recharge points refill it. Debug: `?battle=<species>&lv=<n>`.
- **Region grids (Mark: "too much like Battle Network"):** the panels are the
  local ground, not neon tiles — Field = earth plots (your dark loam vs their
  cracked clay, grass in the gaps, a stone line down the middle), Farm Road =
  blacktop slabs (patched vs bleached, faded centre line), underground = deck
  plate with hazard edges. Your panel gets a faint lantern warmth; telegraphs
  are the ground smouldering ember-orange. `src/hd2d/battle/themes.ts`;
  `?arena=field|road|bunker` to preview.
- **Capture (IFF Recalibration, canon rules):** wild fights get a Capture chip
  (C). Spending a storage node freezes the fight and opens the node puzzle
  (core/puzzle.ts); timer + grid size come from core/capture.ts's Gen 3 catch
  value, so lower HP / a status buys time and a smaller grid (HOBBLE matters).
  Success = "Freed", joins the party (max 3; extras to storage over the
  satnet). Failure = rage: OUTPUT +1, may tear away (engine's rule). Nodes:
  5 to start (`?nodes=` to test). `src/hd2d/battle/capture.ts`.
- **Not yet:** switching (captured Ohms can't be sent in yet), items, XP,
  trainer battles, multiple foes, Ohm battle animations.

## Squad grid combat (2026-10-26) · [PROPOSAL] rules — supersedes the 6×3 POC field

Mark: "make combat a 5x5 on each side battle area, the ohms have shared
abilities and teachable abilities but also special abilities in combat that
influences the combat. The player can play from 1-3 ohms in a single combat
to fight enemy ohms." Everything below except those four facts is proposal.

- **Field:** 10×5 panels, your 5×5 on the left, theirs on the right
  (`COLS/ROWS/HALF` in `rules.ts`). Patterns from the POC carry over, scaled:
  Shot/Dash run the whole row, Close needs your front column, Wave hits three
  rows of their front column, Surge their whole row, Lob/Burst land on the
  aimed panel (or five ahead).
- **Squads:** 1–3 Ohms a side (the healthy party members; a wild pack can be
  2–3). You steer one (gold ring) and **swap** with Tab or 1/2/3; the others
  fight on their own (they dodge red panels, line up and fire, use specials).
  Downed Ohms lie flat and are skipped. Win when every foe is down; lose when
  your whole squad is.
- **Three kinds of ability** (each move chip says which):
  - *Shared* (grey dot): moves four or more lines learn (Bump, Brace…).
  - *Own* (gold dot): the line's signature moves (POUNCE, HOBBLE…).
  - *Mod chip* (blue dot): taught moves outside the learnset. Chips:
    Patch-Up plus each type's opener (`MOD_CHIPS`, `teach()`); a taught move
    takes the last slot.
- **Specials (Space):** every Ohm has one, on a long recharge, and each one
  changes the field: Scorch (3 panels of their column burn), Frost Line (their
  row ices, slow steps), Live Wire (charged panels short whoever stands
  there), Bulwark (a barrier that blocks lanes), Fault Line (cracked panels
  give way after you step off), Ram (charge + knockback), Gust (their row
  blown back), Lock-On (every hit on the mark crits), Flare (their column's
  attacks go wide), Shockwave (stuns their column, cancels wind-ups),
  Overgrowth (your panels heal allies). By type; the starters get their own:
  **Kickstart** (Scooter, ram), **Spotter** (Drone, lock-on), **Guard Dog**
  (Dog, barrier + taunt draws fire).
- **Capture** only works once a single wild Ohm is left standing (the chip
  dims until then). Defeat recharges the whole party (no whiteout yet).
- **Test it:** `?battle=13&lv=10&foes=3&party=7,1,4&plv=9` (`foes` 1–3;
  `party` species list, each starter gets one mod chip so all three ability
  kinds show; `plv` their level).
- **Not yet:** buying mod chips, the 5th move slot, items in battle, XP,
  trainers, foe-side starters' styled sprites.

### Turn-based (2026-10-26) · [PROPOSAL] — replaces the real-time flow above

Mark: "I was envisioning the combat being turn-based… based on speed stat for
now." The field, patterns, abilities and specials above stay; the clock goes.

- **Rounds by CLOCK:** every round each Ohm takes one turn, highest effective
  CLOCK first (stages apply, SHORT quarters it, ties go to your side). The
  order shows at the top; the one acting is lit.
- **Your turn:** step up to **2 panels** (click/tap a lit panel, or WASD /
  the stick), then **one action**: a move, the special, Capture, or Wait.
  Pick a move once to preview where it lands; pick it again (or tap a lit
  panel) to use it. Tab or tapping a foe changes your aim for Lob/Burst moves
  and specials. You control all your Ohms; there's no swapping.
- **Foes wind up in plain sight:** a foe moves, then winds up its move (red
  panels, "WINDING UP"); it lands at the **start of its next turn**. Every Ohm
  of yours that acts in between can step out, put up a Bulwark, push it
  (Ram/Gust cancel the wind-up) or stun it (Shockwave, Live Wire).
- **Recharge in turns:** light moves (power < 45) every turn, heavier ones
  rest 1–2 turns, status moves rest 1; specials charge over 3–4 of the Ohm's
  own turns (half-charged at the start).
- **Ground, per turn:** scorched burns 1/8 at the start of a turn; grown heals
  1/8; ice and live panels stop your steps (start on one: 1 step); cracked
  panels break when you step off. Changed ground lasts 2–3 rounds, barriers 2.
- **Statuses are the core's Gen 3 rules,** now that there are turns: STANDBY
  sleeps 1–4 turns, LOCKED thaws 1 in 5, GLITCHED may thrash itself, SHORT
  loses 1 turn in 4, OVERHEAT/CORRUPTED chip 1/8 after each turn; passives give
  the same immunities.
- **Test it:** `?battle=10&lv=8&foes=3&party=7,1,4&plv=9`.

## Regions of separate maps (2026-10-25) — supersedes the continuous overworld

Mark: the surface felt like a straight line of walled boxes. The new
structure is Octopath's: **regions**, each a **web of separate maps** (every
road and town its own map) joined by a **quick pixel dissolve** with a name
tag; moving **between regions** goes through a **travel space** and a short
**travel card** that implies time and distance. Spec, region 1 sketch and
build order: `docs/design/regions.md`. The continuous overworld below stays
in the code until the section mode replaces it.

## One continuous overworld (2026-10-23) — superseded 2026-10-25

Mark: the surface should be one seamless world, with real distance crossed
between places. `src/hd2d/overworld/` places the Field, Farm Road, Railhead
and the Rust Mile in one coordinate space (north = −z), each keeping its own
layout and code, with a **transition stretch** between neighbours — open
country a few screens long ([PROPOSAL] content: a road winding from one exit
to the next entrance, tall grass, groves, telephone poles, fences and one
landmark each: an abandoned homestead, a grain elevator on the old main line,
the interstate approach with a billboard and dead trucks). Ground blends
into each neighbour at the seams; collision samples each point in its own
chunk so you walk straight across; only nearby chunks are drawn. Region
title cards appear as you walk into each named place. Interiors (Ohmstead,
the Cistern) stay separate, reached by the lift and the culvert.
`?seams=1` loads the old separate maps for comparison.

## Open items

- Grid combat rules (grid size, movement, how Ohm attacks map to grid patterns,
  how capture fits).
- Native render resolution and pixel scale for sprites.
