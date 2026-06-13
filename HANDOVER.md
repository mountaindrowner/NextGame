# HANDOVER

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

## Next (M9 remainder, still art-independent)

- Elevator ascent cutscene framing, garage scene dressing, real Field maps in
  Tiled, the Ohmwork/quest-log shell. Then, on style-guide approval, drop in
  Chajipudi's slice sprites over the placeholders and tag `slice-v0`.
