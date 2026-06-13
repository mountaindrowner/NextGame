# OHMFRONT — Project Constitution

Read this first, every session. Then read HANDOVER.md. Source of record:
`docs/master-prompt-v4.md` (creator canon) and `docs/GDD.md` (Phase 1, locked
2026-06-12). If later chat conflicts with these files, the chat wins — update
the files immediately.

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
- **Starter:** built at the Bench from Grandpa's parts — Locomotion
  (treads/legs/hover) + Core (type) + Plating (stat lean).
- **Protagonist:** 2 written presets (one boy, one girl).
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
