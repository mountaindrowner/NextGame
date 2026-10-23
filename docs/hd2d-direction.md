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

## Follow-ups (2026-10-23)

- **Characters + portraits:** keep the current sprites/portraits as placeholders
  for now; remake them later.
- **First proof = the Field** (the ruined cattle town above Ohmstead).
- **Tilt-shift blur is essential** — always on, a defining part of the look.
- **Build order: B first** (fully custom designs and detail), then A (modular
  block kits) to compare.

## Character art style (2026-10-23)

- **Locked: "Indie action-adventure"** for SAL — chunky stylized
  proportions, bold readable silhouette, lineless with strong graphic light
  and shadow, 64 px, low top-down, 8 directions. Source: PixelLab Pro
  character `cea31c61-3b70-4ec6-a617-413b60f80ece` (prompt in
  `assets/reference/styles/sal_indie.prompt.json`); in-game files in
  `public/world/styles/e_pro/`. The wider cast, WREN and portraits follow
  this style. Rejected: the big-head chibi variant of the same genre.
- Explored and passed over: chibi adventure, 16-bit console JRPG (runner-up),
  handheld monster-tamer, tactics RPG, gritty survival, cozy life-sim, anime
  action (boards in `assets/reference/styles/`).

## Grid combat — proof of concept (2026-10-23) · [PROPOSAL] rules

Built to test the feel; **nothing here is canon until Mark approves**.
Code: `src/hd2d/battle/rules.ts` (pure, unit-tested in `tests/gridrules.test.ts`)
and `src/hd2d/battle/arena.ts` (HD-2D stage + UI).

- **Field:** 6×3 panels — your 3×3 (blue) on the left, the foe's (red) on the
  right. Each Ohm stands on one panel of its side and moves in real time.
- **Moves fire, no menu:** each of the Ohm's moves is a chip (J/K/L/;) with a
  **pattern** and a **recharge** (0.6 s + power/55; status moves 2.6 s).
- **Patterns:** Shot (first Ohm down your row) · Dash (lunge down the row) ·
  Close (the panel in front — only from your front column) · Wave (their
  front column) · Surge (their whole row) · Lob (three panels ahead, or the
  aimed panel) · Burst (a five-panel plus). Signature moves are mapped by
  hand (POUNCE = Dash, MARK STRIKE = Lob, Heat Tick = Burst…); the rest by type.
- **Foe telegraphs** every attack in pulsing red (~0.85 s); aimed shapes lock
  onto where you stood when it wound up. Dodging is your evasion: only moves
  under 100 accuracy can miss on their own.
- **Numbers:** the unchanged Gen 3 formula on canon stats, STAB, crits and the
  11-type chart; stat stages apply; HOBBLE never downs; −CLOCK slows the foe.
- **Flow:** tall grass rolls the area's encounter table (Gen 3 rate per tile);
  win, lose or run (Esc), then back to the overworld. Lead Ohm HP persists;
  recharge points refill it. Debug: `?battle=<species>&lv=<n>`.
- **Not yet:** capture (the node puzzle), switching, items, XP, trainer
  battles, multiple foes, Ohm battle animations.

## Open items

- Grid combat rules (grid size, movement, how Ohm attacks map to grid patterns,
  how capture fits).
- Native render resolution and pixel scale for sprites.
