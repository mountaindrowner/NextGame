# HANDOVER

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

⚠ The other scenes (Title/NewGame/Bench/Battle/Puzzle/Evolution/Menu) are still
laid out for 240×160 and will sit in the top-left quarter at 480×320 — they
need a layout-migration pass before the full flow works again. The HD Field
demo is self-contained and doesn't touch them.

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
