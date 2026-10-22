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

## Open items

- Tilt-shift depth-of-field blur (Octopath's signature look): assumed **on,
  subtle**, until Mark says otherwise.
- Grid combat rules (grid size, movement, how Ohm attacks map to grid patterns,
  how capture fits).
- Native render resolution and pixel scale for sprites.
