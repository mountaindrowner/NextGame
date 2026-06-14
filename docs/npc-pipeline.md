# OHMFRONT — NPC/Character Sprite Pipeline (HD reconciliation)

*How the NPC Sprite Production Spec (`docs/design/npc-sprite-spec.md`) maps onto
our locked HD grid method. The spec's STRUCTURE is adopted whole; its Gen-3 art
numbers are translated, same as the Asset Bible reconciliation.*

## What's adopted from the spec (unchanged)

- **Four facings** S / N / W, **E mirrored** at runtime — unless `asym` (a
  one-sided prop: tool, ledger, cane, baton, cradled Ohm, eyepatch), which
  authors E separately.
- **Animation states & cycles:** idle (hold frame 0), **walk** 3 frames played
  `0,1,0,2` @~7fps, **run** 3 frames @~11fps (forward lean), optional
  `idle_breathe` for principals, `vs` for battlers, `back` for the player,
  additive `__pose` special sheets.
- **The seven rigs** (RIG-PC, RIG-WALK, RIG-WALK+RUN, RIG-BATTLER[+RUN],
  RIG-STATIC, RIG-SPECIAL) and the **per-NPC asset list** (§9): ~19 principals,
  ~20 generic battle classes, 9 service, 18 locals, ~24 Warden-circle variants.
- **Sheet layout + naming + `<id>.anim.json`** descriptor, and the production
  order (slice cast first → generic classes → act-order principals + circles →
  spoiler-gated → service/locals/quirky).

## Translation to HD (Mark, 2026-06-14)

| Spec (Gen-3) | OHMFRONT (HD grid method) |
|---|---|
| 16×32 cell | **~18×32 grid** (our `human()` builder, `tools/world-builders.ts`) |
| ≤16 colors, separate sprite palette | cohesive **limited palette** (shared `gridart` PALETTE) |
| 64×64 battle `vs` / `back` | HD **~64–96px** to match the HD Ohm battle sprites |
| hand-drawn sheets | **grid-method generators** emit the sheets headlessly |

Walk/run frames are produced by parameterizing `human()` (leg/arm offsets per
frame, a turned head for N, a profile for W) — the same way the world kits are
generated. Output follows the spec's file layout:
`assets/sprites/<role>/<id>/<id>__walk.png` (a 3×3 S/N/W grid), `__run`, `__vs`,
`__back`, `__<pose>`, + `<id>.anim.json`.

## Canon notes / flags (prime directive)

- **Caliche → Redbed.** The Colony NPC Casts doc renames the rival raider colony
  Caliche → **Redbed** (creed: **the New Order**) — which already matches locked
  canon. The Principal Cast doc still says "Caliche" (Colony 6 / Warden Sol /
  Rook's home); treat every "Caliche" as **Redbed**.
- **⚠ Name collision — "Wren".** The Bastion scout in the Principal Cast
  (Colony 3) is named **Wren**, but **WREN** is a locked protagonist preset
  (SAL/WREN). **Resolution (proposed 2026-06-14): the Bastion scout is renamed
  Wren → Flint** (quarry-flavored, in the regional name pool) — pending Mark's
  final lock. Sprites/IDs use `flint`, never `wren`, for the scout.
- The protagonist family name is **Vane** (grandchild of **Eli Vane** =
  "Grandpa"). Consistent with locked canon (Grandpa's Bench, *Ohm's Law*).
- Per the docs, all cast names are **proposals pending lock** before scripting —
  registered here as reference, not yet frozen.
