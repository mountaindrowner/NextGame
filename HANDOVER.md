# HANDOVER

*Updated 2026-06-12 — session 2 (cont.): Phase 2 approved · Phase 3 drafted.*

## Done

- **Phase 2 approved as canon** by Mark. Compendium headers flipped to CANON;
  beats.md now replaces GDD §5. **Banjo's ending locked:** on the festival's
  last night his reset shell plays the two-note hello reversed.
- **Phase 3 drafted** — `docs/implementation-contract.md`:
  - Stack: Phaser 3 + TypeScript (strict) + Vite + Vitest + Tiled; PC web
    first, iPhone PWA second; static free distribution.
  - Architecture: `/src/core` pure & deterministic behind a typed
    BattleAction/BattleEvent contract (GDD §10.9 wall, lint-enforced in CI);
    save schema v1 with migrations + committed fixtures.
  - 15 milestones M0–M14 with acceptance criteria; M8 = style-guide approval
    gate before mass art; M9 = vertical slice (`slice-v0`, the Phase 4 gate).
  - Asset counts: 156 battle fronts, trainer sprites, 11 tilesets, ~48 maps,
    15 tracks + 5 fanfares, ~60 SFX, 150 cries.

## Awaiting Mark (gates Phase 4 / first code)

- Approve `docs/implementation-contract.md`. Flagged inside it:
  - **Battle backs at 45 first, 156 by M11** (player-side sprites needed
    early vs. total budget) — confirm or demand all 156 up front.
  - Starter stage-1 silhouettes vary by Locomotion (+6 sprites) — confirm.

## Housekeeping

- Tags to apply on merge (remote refuses tag pushes): `phase1-gdd` → 282ea9f ·
  `phase2-compendium` → the "phase 2 approved as canon" commit ·
  `phase3-contract` → on approval.
- No code yet; smoke-test ritual activates at Phase 4 (M0 onward).
- Weekly off-site zip pending a cloud destination from Mark.

## Next

- On contract approval: **Phase 4 begins — M0 scaffold** (Vite + TS + Phaser
  boot, 240×160 title, CI). Then M1 data layer straight from the compendium.
