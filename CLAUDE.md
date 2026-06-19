# OHMFRONT — Project Constitution

Read this first, every session. Then read HANDOVER.md. Source of record:
`docs/master-prompt-v4.md` (creator canon) and `docs/GDD.md` (Phase 1, locked
2026-06-12). **World/story/asset bibles (2026-06-14, canon-of-record):**
`docs/design/` — story-bible, critical-path-locations (the A→Z spine: Ohmstead
→ Field → 8 colonies → Dallas/Spire → Ohmcoming), wider-world (optional
content), level-building-assets + asset-bible (the governing asset system),
clutter-detail-layer (the lived-in set-dressing layer), principal-cast +
colony-npc-casts + variable-npcs (the character casts — names are proposals
pending lock) + npc-sprite-spec (reconciled to HD in `docs/npc-pipeline.md`).
Asset system implemented + HD-reconciled in `docs/asset-pipeline.md` +
`tools/assets/`. If later chat conflicts with these files, the chat wins —
update the files immediately.

## What this is

OHMFRONT: a complete, original monster-taming RPG. Gen 3 Pokémon
(Ruby/Sapphire) is the body. Post-collapse Texas surface, humanity underground,
machine companions called **Ohms**. Single-player, one ending, ~30 hours, free,
English only. Primary platform PC, secondary iPhone. Engine: **Phaser 3**,
240×160 native, landscape, integer-scaled.

## Prime directive — fidelity

1. Creator canon is law. Never alter, "improve," or quietly substitute ideas.
2. Gaps get 2–3 options in the creator's style, tagged `[PROPOSAL]`, and a
   question. Nothing enters canon without Mark's written approval.
3. **Dead names — never resurrect:** Arkimon / Arc / Arcs · MACS / Mac ·
   Ohmward · Ohmdex · Ohm on the Range · Ohm sweet Ohm.
4. Tone bar: hard world, hopeful heart. Light on Ohm-puns; locked terms define
   the cheese ceiling. When unsure, ask.
5. Writing rules: terse, mobile-first. Never begin a sentence with "because."
   Avoid antithesis tics. Pre-reveal dialogue must re-read differently
   post-reveal.
6. IP guardrails: original IP, style homages only. No Nintendo/Game Freak,
   Embark, Square Enix, or Apple names, creatures, logos, music, or
   ripped/traced assets. Parody locations invent their own trade dress.

## Locked canon — quick reference

- **Title:** OHMFRONT (solid all-caps). Creatures: **Ohms** (Ohmlet → Ohm →
  Ohmega). The electrical unit never appears in game text.
- **Names (Phase 0, locked):** index = **the Manifest** · colony tokens =
  **Patches** (so the TM analog is **mod chips**) · AI Core = **PERSISTENCE** ·
  collapse = **the Waking** · colony network = **the Downtowns** · Militarists
  = **the Garrison** · rival colony = **Redbed** · scrapper guild = **the
  Yard** · cult = **the Attuned** · Dallas finale landmark = **Reunion Tower**
  (named as itself).
- **Locked phrases:** stay current · recharged · clear the static · factory
  settings · End Users · the Update · the Terms of Service · *Ohm's Law* ·
  the Resistance · Ohmgrown · Ohmsick · Ohmcoming · Ohm Runs · The Current ·
  D-FIB.
- **Statuses:** OVERHEAT (burn) · SHORT (paralysis) · CORRUPTED (poison) ·
  STANDBY (sleep) · LOCKED (freeze) · GLITCHED (confusion).
- **Field abilities:** SHEAR · BREACH · HAUL · LUMEN · HOVER; FLIGHT later.
  Exactly 1 field ability gates Region 1.
- **Release term:** "Set Free." Healing: Repair Kit tiers + D-FIB revive.
- **Evolution:** hard level + required item (**Resonance Cores**), cancelable,
  no trade-style triggers.
- **Starter (REVISED 2026-06-16, supersedes the parts-build):** at Grandpa's
  Bench you pick one of his **three prototype companions** — **the Scooter**
  (Scootlet→Boltbike→Velocrash, MOTOR, speed glass-cannon), **the Drone**
  (Dronelet→Buzzhawk→Sentinad, SIGNAL, precision/ranged, learns HOVER), or
  **the Dog** (Scraplet→Scouthound→Warhound, FRAME, the sturdy/forgiving
  hunter). A straight 3-way choice — the old Locomotion+Core+Plating
  customization is retired. Three stages each, Lv16 Resonance / Lv36 Prime.
  Names [PROPOSAL] pending lock.
- **Protagonist:** 2 written presets (one boy, one girl) — **SAL / WREN**;
  family name **Vane**, grandchild of **Eli Vane** ("Grandpa").
- **Cast (proposals, `docs/design/principal-cast.md` etc., pending lock):**
  Odessa (archivist/comms), Mabel Vane (Grandma), Warden Hollis Boone, Cass;
  Wardens Marrow·Bloom·Stone·Pike·Hale·Sol·Frost·Amos; Rook (rival, home =
  **Redbed** — *the doc's "Caliche" = Redbed*), Cmdr. Reyes, the Cantor,
  Marshal Drake, the Monad (PERSISTENCE's avatar). The Bastion scout "Wren"
  collides with the WREN preset → **renamed Flint [proposed, pending lock]**.
  NPC sprites: HD-reconciled spec in `docs/npc-pipeline.md`.
- **Battle:** Gen 3 damage formula cloned exactly. Party of 3. No
  natures/IVs/EVs, no held items, single types in v1, simple per-species
  passives, PP tuned light, 4 moves + purchasable 5th slot with a cost.
- **Capture:** IFF Recalibration — weaken, spend a storage node, timed node
  puzzle; statuses slow the timer; failure = rage and flee.
- **Architecture (firm):** battle system behind a clean interface so a future
  isometric tactical mode can land without a rewrite. Do not build it in v1.
- **Art (DIRECTION CHANGED 2026-06-13):** moved from Gen 3 GBA to a
  **higher-fidelity HD top-down** style, matching creator-owned cattle-town
  art in `assets/reference/cattle-town/`. Gen-3 spec superseded (history in
  GDD §12.x). HD target = the Field's western/rural look (barn, storefronts,
  windmill, water tower, fences, creek). Concrete HD spec (resolution, ~32px
  tiles, palette) + migration of the 48 existing Ohm sprites and UI tracked
  in `docs/style-guide.md` + HANDOVER; exact numbers pending Mark. Claude
  generates art for now (Chajipudi later); original designs only, never
  traced/ripped (§15.2). Claude owns spec, toolkit, review, integration.
- **Art method (LOCKED 2026-06-14): the YoYoPixel grid method is the pipeline.**
  All art authored as char-grids over ONE shared limited palette
  (`tools/gridart.ts` — PALETTE + `Grid`, highlight/base/shadow per material),
  rasterized to PNG; `tools/yoyo2png.ts` ingests YoYoPixel `{palette,pixels}`.
  Retool underway: characters (SAL/WREN + NPCs) and world buildings done via
  `tools/world-builders.ts`; **Ohms are the next batch**. Old geometric
  `spritekit` primitives are legacy (foliage/tiles still use them). Procedural
  buildings via YoYoPixel's engine pending a `node-canvas` install. Reference→
  pixel pipeline: `tools/pixelify.ts`.
- **Art direction — depth & density (LOCKED 2026-06-14):** the bar is
  Pokémon-era HD, never NES-era flat. Two binding laws on **every area we
  build**: (1) every texture has material depth — highlight/base/shadow, reads
  as *what it is*, top-left light, emissive props cast additive glow, no hard
  tile seams; (2) every area ships a large, diverse asset set — ≥3 variants per
  ground/wall tile, ≥12 distinct themed props, ≥3 decal/scatter layers, ≥1 hero
  focal asset, no empty screens. Full spec + per-area "done" checklist +
  anti-patterns in `docs/style-guide.md`; Ohmstead is the worked example.
- **Audio:** GBA chiptune, exactly. Suno + licensed packs from Mark; Claude
  layers as needed.

## Workflow (binding — master prompt §18)

- Git from minute zero. Commit small and working, plain-language messages.
  Push at session end and every milestone. Tag phase gates only after Mark
  approves (`phase1-gdd`, `slice-v0`, …). Main always boots; risky systems on
  feature branches.
- Never run `git reset --hard`, force pushes, `rm -rf`, or history rewrites
  without per-instance confirmation.
- Session ritual: start by reading CLAUDE.md then HANDOVER.md; end by updating
  HANDOVER.md (done / next / known issues), commit, push. One milestone per
  session.
- Assets: commit `/assets` (LFS if needed). Store generation prompt/settings
  beside every generated asset. Never overwrite approved assets — version them
  (`ohm_microwave_v2.png`).
- Saves: version the schema from day one; never change format without a
  migration path. Keep committed playtest saves as fixtures.
- Smoke test before every commit (once playable): boot → new game → the Bench
  → one wild battle → one node capture → save → load.
- Weekly off-site zip to Mark's cloud storage.

## Phase status

- **Phase 0** — done (2026-06-12). Resolutions in GDD §1.1.
- **Phase 1 — GDD** — **approved 2026-06-12** (incl. second round, GDD §1.2:
  SAL+WREN, stat names INTEGRITY/OUTPUT/ARMOR/SURGE/SHIELDING/CLOCK, 11-type
  chart with rare VERDANT, Expansion Board −10% OUTPUT/SURGE, nine Bench
  parts, Scrap/Alloy/Relic + Resonance/Prime Cores, SHEAR gates Region 1,
  starter trio by Core, colonies under parodied real North Texas sites).
  Tag `phase1-gdd` → commit 282ea9f (remote refuses tag pushes; apply on
  merge).
- **Phase 2 — World & Ohm Compendium** — **approved as canon 2026-06-12**:
  `docs/compendium/` (ohms.md — all 150; factions.md — the eight Downtowns
  colonies + factions; characters.md; beats.md — replaces GDD §5). Banjo's
  ending (two notes, reversed) locked. Tag `phase2-compendium` → apply on
  merge.
- **Phase 3 — Implementation Contract** — **approved as binding 2026-06-12**
  (backs staged 45→156; starter stage-1 silhouettes vary by Locomotion).
- **Phase 4 — Vertical Slice** — in progress. **M0–M7 done 2026-06-13**
  (scaffold, data layer, battle core w/ goldens, overworld, battle UI,
  capture puzzle, Bench, save v1 + headless smoke test — 38 tests green;
  placeholder art only). **M8 style guide submitted, awaiting Mark**
  (`docs/style-guide.md` + `assets/styleguide/`). M9 slice content next;
  gate tag `slice-v0`.
- **Asset production (started 2026-06-14):** the full world/asset scope is now
  canon (`docs/design/`). Governing asset SYSTEM stood up + HD-reconciled
  (`tools/assets/`, `docs/asset-pipeline.md`): label schema, the 19-area allow
  matrix, the R1–R12 validator + budget, `npm run assets:build` →
  `assets/manifest.json`. Catalog seeded with the Primary, Building, Cave, and
  the two slice secondary kits. **Catalog now enumerates EVERY asset**: all 19
  per-area secondaries + the universal clutter/wall/fx libraries + 12 area
  dressing sets (the four-plane lived-in layer, D1/D4 rules) — **643 records, 0
  violations**, gated in CI. **Shared foundation ART done** (Primary, Hive
  Overlay, Building/Interior, Cave/Mine, universal Clutter; each `npm run
  assets:*` + a `_contact*.png`). Next: per-area secondary ART + dressing in
  critical-path order (Railhead → … → Dallas), then compose maps.
