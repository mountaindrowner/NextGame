# OHMFRONT — Asset Pipeline (governing system, HD reconciliation)

*How the Asset Bible's governing system (`docs/design/asset-bible.md`, Part A)
is implemented in this repo, reconciled to the locked HD grid method.*

## The reconciliation (Mark, 2026-06-14)

The five design bibles in `docs/design/` are **canon-of-record** for scope and
content. The Asset Bible's **system** — stable IDs, the full label set, kits as
scope gates, the **R1–R12 placement rules**, the Area×Kit allow matrix, variant
templates, the build pipeline, and the validation gate — is **adopted whole**.

Its **Gen-3 art numbers are superseded** by the HD lock (the Bible even frames
them as the "art-direction canon," which is exactly what the 2026-06-13 HD pivot
replaced). Translation, decided with Mark:

| Asset Bible (Gen-3) | OHMFRONT (locked HD) |
|---|---|
| 16×16 tiles | **32px tiles** (`TILE_PX`) |
| ≤16 colors/tile, 6+7 palette groups | **cohesive limited palette per kit** + the depth/density laws (`docs/style-guide.md`) |
| Tiled `.tsj` tilesets, two-layer 8×8 | **grid-method PNGs** (`tools/gridart.ts`) the composers **bake** |
| 47-tile Wang / 16-edge autotiles | small **seeded-variant** sets + **procedural edge blending** (Ohmstead's crumble pass) — template counts retuned in `tools/assets/types.ts` |
| budget = GBA VRAM cap | budget = organization guide (Phaser isn't VRAM-bound), still enforced per kit |

Everything else in Part A is honored literally.

## What's in the repo

- `tools/assets/types.ts` — the label schema (`Kit`, `Biome`, `AssetType`,
  `Layer`, `Collision`, `Gate`, `Phase`), the `AssetRecord`, the variant
  `TEMPLATES` (HD-retuned), the **`AREAS` allow matrix** (all 19 areas with
  biome / secondary kit / dungeon / hive-saturation tier), and the `BUDGET`.
- `tools/assets/catalog.ts` — the catalog (Part B) as records. Seeded in
  production order: the shared **Primary Kit**, the **Building/Interior** and
  **Cave** dungeon kits, and the two slice secondaries **`sec.ohmstead`** +
  **`sec.field`**. Remaining secondaries are enumerated in `AREAS` and get
  records as each kit is authored.
- `tools/assets/validate.ts` — `validate()` (manifest-level: schema, R10
  naming, R12 uniqueness, R7 palette, R5 layer law, R11 autotile completeness,
  R9 obstacle completeness, R8 budget) and `validateMap()` (compose-time: R1
  sec-scope, R2 two-tileset, R3 overlay gating, R4 biome).
- `tools/assets/build.ts` — `npm run assets:build`: compiles
  `assets/manifest.json`, validates (fails on any violation), writes
  `assets/asset_index.json` + a budget/scope report.
- `tests/assets.test.ts` — the validation gate in CI.

## Build order (Asset Bible §8, locked)

1. **Shared Primary Kit** (unblocks every map) — *records done; art generation next.*
2. **Hive Overlay** (needed from Bastion onward).
3. **Cave/Mine + Building/Interior** kits (reused everywhere) — *records done.*
4. **Per-area secondaries, critical-path order:** Ohmstead → the Field →
   Railhead → the Cistern → Bastion → Redoubt → Trinity → the Chancel → Redbed
   → the Array → the Verge → Dallas. *(Ohmstead + Field records done; Ohmstead
   art exists via `tools/gen-underground.ts`.)*
5. **Optional-area kits** (Depot, Drive-In, Boneyard, Silo, Bog Shrine,
   Stadium, Mountain Fortress) last.

Each kit: author the grid-method drawers → records validate → composer bakes the
map pulling only matrix-allowed kits (R1/R2/R3 enforced at compose time).

## Dead-name note (prime directive §3)

The uploaded bibles use two **dead names** that must NEVER reach game text or
asset IDs: **"Ohmdex"** (`wider-world.md` — the index is *the Manifest*) and
**"Build-A-MAC"** (`wider-world.md` — the starter system is *the Bench*). The
docs are kept verbatim as reference; the asset catalog and game strings use the
locked terms only.
