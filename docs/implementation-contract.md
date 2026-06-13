# OHMFRONT — Implementation Contract (Phase 3)

*DRAFT 2026-06-12 — binding on creator approval. Full-game scope: milestones,
architecture, asset counts, acceptance criteria. Sources: GDD (Phase 1) and
compendium (Phase 2), both canon.*

-----

## 1. Stack

- **Engine:** Phaser 3 (canon). **Language:** TypeScript, strict.
- **Build:** Vite. **Tests:** Vitest. **Maps:** Tiled (.tmj). **CI:** typecheck
  + test + data validation on every push; main always boots.
- **Targets:** PC desktop browser first (keyboard); iPhone Safari/PWA second
  (virtual d-pad, add-to-home-screen). One codebase, 240×160 native,
  landscape, integer-scaled.
- **Distribution:** static web build (free). Offline-capable PWA manifest.

## 2. Architecture

### 2.1 The firm rule (GDD §10.9)

`/src/core` is deterministic, dependency-free game logic — **no Phaser
imports, no rendering, no input, no wall-clock time**. The battle system
speaks a typed contract:

```
core/battle:  (BattleSetup, seed) → accepts BattleAction → emits BattleEvent[]
```

Scenes translate input into `BattleAction` and render `BattleEvent` streams.
A future isometric tactical mode is a new driver on the same contract — never
a rewrite. An ESLint import-boundary rule enforces the wall in CI.

### 2.2 File architecture

```
/src
  /core            pure logic, seeded RNG, fully unit-tested
    /battle        Gen 3 damage clone, turn order, statuses, passives, XP
    /capture       catch odds (Pokémon-mirrored), puzzle timer math
    /stats         species → INTEGRITY/OUTPUT/ARMOR/SURGE/SHIELDING/CLOCK
    /typechart     the 11-type matrix + mirror invariants
    /evolution     level + Resonance/Prime Core rules, cancel/defer
    /economy       credits, shop tables, salvage pricing
  /data            JSON, schema-validated at build time
    species.json   150 entries (Manifest), base stats, learnsets, passives
    moves.json     movepool, PP (light), priority, status chances
    typechart.json encounters/*.json  trainers/*.json  items.json
    dialogue/*.json (pre/post-reveal variant pairs keyed per line)
  /save            schema v1 + migrations/ + fixtures/ (committed saves)
  /scenes          Phaser: Boot, Title, Overworld, Battle, CapturePuzzle,
                   Bench, Garage, Menu, Manifest, Dialogue, Uplink, Credits
  /ui              Gen 3 textbox/menu/HUD components, font renderer
  /input           keyboard map + virtual d-pad (touch)
  /audio           track/SFX registry, layer mixer
/assets
  /sprites/battle  /sprites/overworld  /tiles  /ui  /audio  /fonts
  (every generated asset ships with a .prompt.txt sidecar; approved assets
   are never overwritten — version as _v2, _v3)
/maps              Tiled sources
/tools             debug console, encounter-table viewer, save inspector
/docs              canon (this contract, GDD, compendium, HANDOVER)
```

### 2.3 Save schema v1 (versioned from day one)

`{ version: 1, preset, party[≤3], garage[], manifest{seen,freed}, patches[],
nodes, credits, bag{}, flags{}, location, playtime }` — manual save anywhere,
multiple slots, no autosave. Any format change ships a migration in
`/save/migrations`; CI loads every committed fixture through the chain.

## 3. Milestones & acceptance criteria

Each milestone merges only when its acceptance list passes plus the smoke
test (once playable): **boot → new game → Bench → one wild battle → one node
capture → save → load.**

| # | Milestone | Acceptance |
|---|---|---|
| M0 | **Scaffold & boot** | `npm run dev` boots a 240×160 integer-scaled OHMFRONT title scene at 60fps; CI green; this contract's lint wall active. |
| M1 | **Data layer** | All 150 species + movepool + 11-type chart in JSON; validators prove: exactly 150, chart mirrors, every evolution names a Core, every species has learnset + passive. |
| M2 | **Battle core** | Gen 3 damage formula passing golden vectors (hand-computed cases incl. STAB, crit, status modifiers); deterministic replay test (same seed+actions → same events); capture odds curve matches the Pokémon-mirrored spec. |
| M3 | **Overworld** | Tile movement (4-dir, run), collision, zone-based invisible encounters at table rates (statistical test), Gen 3 line-of-sight trainers, Tiled map loading; virtual d-pad parity on touch. |
| M4 | **Battle presentation** | Full wild + trainer battle playable: Gen 3 HUD, entry animation only, menus, animations toggle, text speed. |
| M5 | **Capture puzzle** | Timed connect-the-path puzzle, status-slowed timer, difficulty ramp params, rage-and-flee on encounter failure; retries cost turns. |
| M6 | **The Bench & new game** | Preset select (SAL/WREN) → grounded scene → 3-pick Bench (9 parts, 27 builds) → starter in party with correct line, lean, signature move. |
| M7 | **Save/load v1** | Save anywhere, slots, fixtures committed, roundtrip golden test, migration scaffold proven with a dummy v0→v1. |
| M8 | **Style guide gate (art)** | Palettes, outline/lighting rules, 3 reference Ohms at both scales, 1 tileset strip — **creator approval required before mass asset production.** |
| M9 | **Vertical Slice = Phase 4 gate** | Bench opening → elevator → the Field → wild encounter → battle → node capture → one evolution → garage recharge → save/load. Tag `slice-v0` on creator approval. |
| M10 | **Act I content** | The Field complete: maps, trainers, SQ1–2, grain-elevator dungeon, Ohmega Combinator, Hearth Patch, Manifest UI. |
| M11 | **Acts II–III content** | Eight colonies, beats 8–23, reveal echo pass on all pre-reveal dialogue, side quests 3–6, Ohmsick ×3, legendaries, Reunion Tower gauntlet, EXEMPLAR, ending. |
| M12 | **Audio** | 15 tracks + 5 fanfares integrated per GDD §13; SFX families; per-species cries. |
| M13 | **Balance & polish** | Patch-ladder curve tuned (Hearth ~12 → Spire ~55); economy weights derived from Pokémon curves; PP generosity pass; full settings menu. |
| M14 | **Release v1.0** | ~30hr single run completable; PC + iPhone verified; zero blocker bugs; weekly off-site zips current. |

Risky systems (battle core, save system) develop on feature branches; merge
on green smoke test. Tags at gates: `phase3-contract`, `slice-v0`, `act1`,
`content-complete`, `v1.0` (applied on merge; remote refuses tag pushes).

## 4. Asset lists (counts)

| Category | Count | Spec |
|---|---|---|
| Battle fronts | 156 | 150 species + 6 starter locomotion variants (stage 1 silhouettes per Bench pick); 64×64, ≤16 colors, entry anim only |
| Battle backs | 45 | player-side species realistically fielded early QA → full 156 by M11; same spec |
| Trainer battle sprites | 32 | 2 player backs (SAL/WREN), 12 named fronts (8 leaders, Clay, Crowe, Faraday, Grandpa), 18 class fronts |
| Overworld character sheets | 46 | 2 player (walk/run/ride), ~32 NPC types, 12 story/ride Ohm forms; 16×16 grid, Gen 3 proportions |
| Tilesets | 11 | Ohmstead under, the Field, ranchland/routes, lake & dam, the Bakerhouse, speedway, stockyards, stadium, airfield, Dallas/Reunion Tower, caves/EM zones |
| Maps (Tiled) | ~48 | 8 colonies, 9 dungeons, ~14 routes/surface zones, ~17 interiors |
| UI sheets | 6 | textbox, menus, battle HUD, Manifest, capture puzzle, fonts |
| Music | 15 + 5 | GDD §13 track list + fanfares; GBA chiptune exactly |
| SFX | ~60 | families per GDD §13.2 |
| Cries | 150 | synthesized chip cries, one signature per species |

Pipeline (updated 2026-06-13): artist **Chajipudi** produces Ohm sprites to
the approved style guide and `docs/art/sprite-brief.md` (post-M8 gate); Claude
owns spec, review, and integration. Source/settings stored beside every asset;
approved assets versioned, never overwritten.

## 5. Debug tooling (built alongside, not after)

Warp, give-item, give-ohm, spawn-battle, set-flag, encounter-table viewer,
capture-odds readout, save inspector, seed lock. Hidden behind a dev flag,
stripped from release builds.

## 6. Definition of done (v1.0)

New player completes the ~30-hour run on PC and iPhone: one ending, 8
Patches, the reveal lands, the Static clears, Ohmcoming plays, Banjo's two
reversed notes — with no blocker bugs, save-safe throughout, and every locked
canon term spelled exactly as the GDD spells it.
