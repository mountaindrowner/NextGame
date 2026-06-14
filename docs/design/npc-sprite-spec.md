# OHMFRONT — NPC Sprite Production Spec (Structure & Instructions)

*Explicit instructions for building every character/NPC sprite — dimensions, directions, walk/run cycles, sheet layout, naming, and a **complete per-asset list** so nothing is missed. Ohms are excluded (their own pass). Pairs with the Character Asset Guide (who/look/where) and the art canon (Gen 3, ≤16 colors).*

-----

## 1. FUNDAMENTALS

- **Overworld cell:** **16×32 px** (Gen 3 person size). Sprite stands in the lower portion; head extends above the 16×16 floor tile (occlusion handled by the map’s top layer).
- **Anchor / origin:** bottom-center of the 16×32 cell sits on the character’s floor tile. Feet at the bottom edge.
- **Palette:** sprite palette, ≤16 colors, separate from BG/tile palettes (per the Character Guide’s `Pxx`/`Cxx` assignments).
- **Battle sprites:** **64×64 px** front-facing (trainers) and a 64×64 rear sprite (player only).
- **No half-pixels, no anti-aliasing** — true Gen-3 pixel art.

-----

## 2. DIRECTIONS & MIRRORING

- **Four facings:** **S (down), N (up), W (left), E (right).**
- **Author S, N, W. Generate E by horizontal-flipping W at runtime** — *unless the character is flagged `asym`* (a one-sided prop/feature that breaks under flip: a tool, ledger, cane, baton, cradled object, eyepatch, one-side hairstyle). `asym` characters author **E separately**.
- Default is **mirror-E**; the per-asset list (§9) flags every exception.

-----

## 3. ANIMATION STATES (exact frames & timing)

Each state = **3 unique frames per direction** unless noted. Play orders and fps:

|State                        |Frames/dir       |Play order  |FPS   |Loop    |Who                     |
|-----------------------------|-----------------|------------|------|--------|------------------------|
|**idle**                     |1 (frame 0)      |hold `0`    |–     |–       |everyone (per facing)   |
|**idle_breathe** *(optional)*|2 (`0`,`0b`)     |`0,0b`      |~1.5  |yes     |principals only         |
|**walk**                     |3 (`0,1,2`)      |`0,1,0,2`   |~7    |yes     |anyone who moves        |
|**run**                      |3 (`0,1,2`)      |`0,1,0,2`   |~11   |yes     |player + flagged runners|
|**special** *(pose)*         |1–3              |per pose    |varies|per pose|flavor NPCs (§7)        |
|**vs**                       |1 (`+2` opt.)    |hold / `0,1`|~2    |–       |battlers (64×64)        |
|**back**                     |1 (`+throw` opt.)|hold / `0,1`|–     |–       |player (64×64)          |

- **Walk cycle** `0,1,0,2`: frame 0 = neutral stand, 1 = step (foot A forward), 2 = step (foot B forward). The standard Gen-3 4-step loop on 3 sprites.
- **Run cycle** = same order, faster, with a forward lean and bent posture (distinct frames, not reused from walk).
- **idle** simply holds walk frame 0 of the current facing.

-----

## 4. THE RIGS (sprite templates — assign one per character)

|Rig                            |Sheets it requires        |Sheet layout                                                                                |
|-------------------------------|--------------------------|--------------------------------------------------------------------------------------------|
|**RIG-PC** *(player)*          |`walk`, `run`, `back`     |walk/run: 3 cols × 3 rows (S,N,W) = **48×96** each (asym → 4 rows = 48×128); back: **64×64**|
|**RIG-WALK** *(standard NPC)*  |`walk`                    |3×3 = **48×96** (asym → 48×128)                                                             |
|**RIG-WALK+RUN** *(mobile NPC)*|`walk`, `run`             |each 48×96 (asym 48×128)                                                                    |
|**RIG-BATTLER** *(trainer)*    |`walk`, `vs`              |walk 48×96 (asym 48×128); vs **64×64**                                                      |
|**RIG-BATTLER+RUN**            |`walk`, `run`, `vs`       |as above + run 48×96                                                                        |
|**RIG-STATIC** *(fixed NPC)*   |`facings` (no walk)       |1 frame × facings-needed (S min; up to S,N,W = **16×96**), E mirrored                       |
|**RIG-SPECIAL**                |RIG-WALK + `special` poses|walk 48×96 + each pose a mini-sheet **16×32 ×(frames)**                                     |

**Minimum law:** every character has at least a `walk` sheet (or a `facings` set if RIG-STATIC). Battlers **must** add `vs`. The player **must** add `run` + `back`. Special poses are additive.

-----

## 5. SHEET LAYOUT, NAMING & ANIM JSON

**Grid:** columns = animation frames (left→right: 0,1,2); rows = directions in fixed order **S, N, W** (then **E** only if `asym`).

**File layout:**

```
assets/sprites/<role>/<id>/
  <id>__walk.png        # 48×96 (or 48×128 asym)
  <id>__run.png         # if rig has run
  <id>__vs.png          # 64×64, battlers
  <id>__back.png        # 64×64, player
  <id>__<pose>.png      # special poses (e.g., __knit, __salute)
  <id>.anim.json        # the descriptor below
```

Filenames lowercase/snake; `<id>` is the Character-Guide ID (e.g., `char.principal.rook`).

**Anim descriptor (`<id>.anim.json`):**

```json
{
  "cell": [16,32], "asym": false,
  "walk": { "fps":7, "loop":true,
    "s":[0,1,0,2], "n":[0,1,0,2], "w":[0,1,0,2], "e":{"mirror":"w"} },
  "run":  { "fps":11, "loop":true,
    "s":[0,1,0,2], "n":[0,1,0,2], "w":[0,1,0,2], "e":{"mirror":"w"} },
  "idle": { "s":[0],"n":[0],"w":[0],"e":{"mirror":"w"} }
}
```

For `asym: true`, replace `"e":{"mirror":"w"}` with an authored `"e":[...]` and a 4th sheet row.

-----

## 6. ASYMMETRY & PROP RULES

- A prop/feature on **one side** (handheld tool, ledger, cane, baton, cradled Ohm, one-side guard, side-swept streak, eyepatch) → **`asym: true`**, author E separately so the prop doesn’t jump sides.
- **Central/symmetric** features (backpack centered, full armor, robe, apron, hat, beard, goggles on brim) → **mirror E** (cheaper).
- Held tools/weapons that read in the silhouette must stay on the **same body side** across S/N and the authored W/E.

-----

## 7. SPECIAL POSES (flavor, additive `__<pose>` mini-sheets)

Author only what the character needs; each is a 16×32 mini-sheet of 1–3 frames:
`__sit, __point, __salute, __knit, __hum (sway), __paint, __heckle, __boast, __rant, __glitch (stutter), __cradle, __collapse (defeat), __cheer, __gesture (mime set), __tinker (work loop)`.

-----

## 8. SPECIAL NON-RIG ASSETS

- **PERSISTENCE emblem** (`char.principal.persistence__emblem`): 32×32, **4-frame pulse** anim (~3 fps). No overworld rig.
- **Eli Vane photo** (`__photo`): 64×64 framed still. **netform** (`__netform`): a glitch-cyan recolor/overlay of his walk sheet (same frames, corrupted palette).
- **Odessa portrait** (`__portrait`): 48×48, optional comms mugshot.
- **Rook bike** (`__bike`): riding pose set (S,N,W ×1, mirror E) atop the vehicle-Ohm prop, 16×32.

-----

## 9. COMPLETE PER-NPC ASSET LIST

`Sheets` lists every required PNG. `M` = mirror-E (default); `A` = asym (author E). Battlers get `vs`.

### 9A — PRINCIPALS

|ID                          |Rig                 |Sheets                            |E                          |Special|Phase                                       |
|----------------------------|--------------------|----------------------------------|---------------------------|-------|--------------------------------------------|
|char.principal.protagonist  |RIG-PC              |walk, run, back                   |M (device reads in profile)|–      |slice · ×4 preset palette swaps on one base |
|char.principal.eli_vane     |RIG-WALK + special  |walk, photo, netform              |M                          |–      |flashback/postgame; photo act2; netform act3|
|char.principal.persistence  |special only        |emblem                            |–                          |–      |act2 (Monad = Ohm roster)                   |
|char.principal.odessa       |RIG-WALK            |walk, (portrait opt)              |A (data-slate)             |–      |slice                                       |
|char.principal.rook         |RIG-BATTLER+RUN     |walk, run, vs, bike               |A (shoulder-guard, streak) |__boast|act1                                        |
|char.principal.reyes        |RIG-BATTLER         |walk_helmeted, walk_unhelmeted, vs|M                          |–      |act2                                        |
|char.principal.cantor       |RIG-BATTLER         |walk, vs                          |M                          |–      |act2                                        |
|char.principal.mabel_vane   |RIG-WALK            |walk                              |M                          |–      |slice                                       |
|char.principal.boone        |RIG-BATTLER (vs opt)|walk, vs(opt)                     |M                          |–      |slice                                       |
|char.principal.cass         |RIG-WALK            |walk                              |M                          |–      |slice / act3                                |
|char.principal.warden_marrow|RIG-BATTLER         |walk, vs                          |A (ledger, watch-chain)    |–      |act1                                        |
|char.principal.warden_bloom |RIG-BATTLER         |walk, vs                          |M                          |–      |act1                                        |
|char.principal.warden_stone |RIG-BATTLER         |walk, vs                          |M (arms crossed)           |–      |act1                                        |
|char.principal.warden_pike  |RIG-BATTLER         |walk, vs                          |M                          |–      |act2                                        |
|char.principal.warden_hale  |RIG-BATTLER         |walk, vs                          |M                          |–      |act2                                        |
|char.principal.warden_sol   |RIG-BATTLER         |walk, vs                          |M (braid acceptable)       |–      |act2                                        |
|char.principal.warden_frost |RIG-BATTLER         |walk, vs                          |A (clipboard, cables)      |–      |act3                                        |
|char.principal.warden_amos  |RIG-BATTLER         |walk, vs                          |A (cane, bent)             |–      |act3                                        |
|char.principal.drake        |RIG-BATTLER         |walk, vs                          |M                          |–      |act3                                        |

### 9B — GENERIC BATTLE CLASSES *(templates; name-stamped; all RIG-BATTLER → walk, vs)*

|ID                      |E                |Run?|Notes                                               |Phase   |
|------------------------|-----------------|----|----------------------------------------------------|--------|
|char.class.runner       |M                |opt |–                                                   |slice   |
|char.class.picker       |M                |–   |–                                                   |slice   |
|char.class.scrapper     |A (pry-bar, mask)|–   |–                                                   |slice   |
|char.class.hauler       |M                |–   |convoy pairs (double)                               |act1    |
|char.class.trade_baron  |M                |–   |–                                                   |act1    |
|char.class.field_hand   |M                |–   |–                                                   |act1    |
|char.class.wrangler     |A (lasso)        |–   |–                                                   |act1    |
|char.class.sentry       |M                |–   |–                                                   |act1    |
|char.class.militant     |M                |–   |+ `__glitch` idle (puppet tell)                     |act1    |
|char.class.enforcer     |A (baton)        |–   |–                                                   |act2    |
|char.class.acolyte      |M                |–   |–                                                   |act2    |
|char.class.raider       |M                |opt |–                                                   |act2    |
|char.class.merc         |M                |–   |–                                                   |act2    |
|char.class.tinker       |M                |–   |+ `__tinker` work loop                              |act2    |
|char.class.signal_jockey|M                |–   |–                                                   |act2    |
|char.class.net_medium   |A (cradled Ohm)  |–   |+ `__cradle`                                        |act2    |
|char.class.old_hand     |M                |–   |–                                                   |act3    |
|char.class.drifter      |M                |opt |–                                                   |act2    |
|char.class.scrap_twins  |M                |–   |**two sprites** (twin_a, twin_b), shared vs (double)|act1    |
|char.class.wardens_hand |M (inherit)      |–   |per-colony palette/motif recolor                    |per-area|

### 9C — SERVICE NPCs *(non-battlers; no vs)*

|ID                        |Rig         |Sheets        |E|Special                |Phase|
|--------------------------|------------|--------------|-|-----------------------|-----|
|char.service.garage_tech  |RIG-WALK    |walk          |M|__cheer (heal)         |slice|
|char.service.quartermaster|RIG-STATIC  |facings(S,N,W)|M|__gesture (sell)       |slice|
|char.service.node_monger  |RIG-STATIC  |facings(S)    |M|–                      |act1 |
|char.service.salvage_buyer|RIG-STATIC  |facings(S)    |M|–                      |act1 |
|char.service.name_keeper  |RIG-STATIC  |facings(S)    |M|–                      |act1 |
|char.service.chip_tutor   |RIG-STATIC  |facings(S,W)  |M|__tinker               |act1 |
|char.service.net_operator |RIG-STATIC  |facings(S)    |M|(often just a terminal)|act1 |
|char.service.scout_master |RIG-WALK    |walk          |M|__point                |act1 |
|char.service.courier      |RIG-WALK+RUN|walk, run     |M|–                      |slice|

### 9D — COLONY-LOCAL & QUIRKY NPCs

|ID                                  |Rig                 |Sheets                          |E              |Special              |Area       |
|------------------------------------|--------------------|--------------------------------|---------------|---------------------|-----------|
|char.local.ohmstead.old_tuck        |RIG-SPECIAL         |walk, special                   |A (toaster-Ohm)|__cradle             |Ohmstead   |
|char.local.ohmstead.wall_painter    |RIG-SPECIAL         |walk, special                   |M              |__paint              |Ohmstead   |
|char.local.railhead.two_bit_birdie  |RIG-SPECIAL         |walk, special                   |M              |__gesture (dice)     |Railhead   |
|char.local.railhead.mime_courier    |RIG-SPECIAL         |walk, special                   |A (gestures)   |__gesture (set)      |Railhead   |
|char.local.cistern.mud_cole         |RIG-WALK            |walk                            |M              |–                    |The Cistern|
|char.local.cistern.weather_watcher  |RIG-STATIC + special|facings(S,N), special           |M              |__point (to wind)    |The Cistern|
|char.local.bastion.knock_twice_nell |RIG-STATIC          |facings(S) — 1 frame (door-slot)|–              |–                    |Bastion    |
|char.local.bastion.doomsayer        |RIG-STATIC + special|facings(S), special             |M              |__rant               |Bastion    |
|char.local.redoubt.sarge            |RIG-SPECIAL         |walk, special                   |M              |__salute             |Redoubt    |
|char.local.redoubt.re_enlister      |RIG-SPECIAL         |walk, special                   |M              |__salute             |Redoubt    |
|char.local.chancel.brother_hum      |RIG-SPECIAL         |walk, special                   |M              |__hum (sway)         |The Chancel|
|char.local.chancel.apostate         |RIG-STATIC + special|facings(S), special             |M              |__heckle             |The Chancel|
|char.local.redbed.big_talk_pell     |RIG-BATTLER         |walk, vs, special               |M              |__boast              |Redbed     |
|char.local.redbed.sentimental_raider|RIG-SPECIAL         |walk, special                   |A (knitting)   |__knit               |Redbed     |
|char.local.array.buffering_bex      |RIG-SPECIAL         |walk, special                   |M              |__glitch (stutter)   |The Array  |
|char.local.array.conspiracy_coder   |RIG-STATIC + special|facings(S), special             |M              |__gesture (printouts)|The Array  |
|char.local.verge.old_mesa           |RIG-STATIC + special|facings(S), special             |A (cane)       |__gesture (tale)     |The Verge  |
|char.local.verge.reunion_keeper     |RIG-SPECIAL         |walk, special                   |M              |__gesture (bunting)  |The Verge  |

### 9E — WARDEN CIRCLES *(trainer-variants; RIG-BATTLER → walk, vs; host-colony palette)*

Author each as a small set of themed battler sprites recolored/re-prop’d from a base. Counts:

- **Brokers** (Railhead) — 3 (Salt, Scrap, Water). M.
- **Grange** (Cistern) — 3 (harvest-themed). M.
- **Stoneguard** (Bastion) — 3 (armored). M.
- **Garrison Remnant** (Redoubt) — 3 (freed-soldier; reuse `enforcer`/`militant` base, helmet-off). M.
- **Vestry** (Chancel) — 3 (white-robe). M. · **Choir of the Update** (Chancel) — 3 (grey corrupted-robe). M.
- **Red Hand** (Redbed) — 3 **named**: `char.local.redbed.ladder`, `…scorch`, `…pell`(=Big Talk, above). M (Scorch may add `__boast`-style flair).
- **Lattice** (Array) — 3 (tech). A where a clipboard/tool reads one-sided.
- **Keepers** (Verge) — 3 (veteran; reuse `old_hand` base, recolored). M.

-----

## 10. PRODUCTION ORDER & BUDGET

1. **Slice sprites first:** protagonist (walk+run+back, ×4 palettes), garage_tech, quartermaster, courier, runner, scrapper, picker, plus Ohmstead principals (Mabel, Boone, Odessa, Cass) — everything the vertical slice touches.
1. **Generic classes by phase** (one base each → big reuse).
1. **Act-order principals + their Warden circles** as each area comes online.
1. **Spoiler-gated** (Reyes states, Cantor, emblem, Drake, Eli photo/netform) at their phases.
1. **Service, locals, quirky** filling each area.

**Sheet tally (excluding Ohms):** ~19 principals, 20 class templates (+twins = 2 sprites; +per-colony wardens_hand recolors), 9 service, 18 locals, ~24 Warden-circle variants. Most need just `walk` (48×96); battlers add a 64×64 `vs`; the player adds `run`+`back`; flavor adds small `__pose` sheets. Reuse is heavy — classes and circles recolor from shared bases.

*Explicit structure delivered: cell size, four-direction + mirror rules, exact idle/walk/run/special/vs/back frame cycles and fps, seven reusable rigs, sheet layout + naming + anim-JSON, asymmetry rules, and a complete sheet-by-sheet list for every non-Ohm character. Ohms next.*