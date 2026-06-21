# OHMFRONT — Level Editor

A browser tool for editing every map's walking paths, terrain, and placed
content. It reads and writes the exact `public/world/<map>.json` schema the game
loads, so anything you export drops straight back into the game.

## Opening it

- **On githack (no install):** open `…/dist/editor.html` (same base URL as the
  game, swap `index.html` → `editor.html`).
- **Locally:** `npm run dev`, then visit `http://localhost:5173/editor.html`.

## What you can edit

Pick a map from the dropdown. The map's art loads as the backdrop with a tile
grid on top. Every layer is editable:

- **Cell layers (paint with the mouse):**
  - **Collision** — the walking paths (red = wall/blocked).
  - **Grass** — encounter tall grass; **Grass (decor only)** — grass that sways
    but never triggers a battle; **Water**.
- **Placed entities (place / select / move / delete):**
  - **Items, NPCs, Trainers, Signs, Interacts, Exits, Ledges, Placements** (trees).
  - **Spawn** — the player's start cell (one per map).

## Controls

- **Left-drag** paints the active cell tool; **right-drag** erases cells.
- A **place tool** (Items, NPCs, …) drops a new entity where you click and
  selects it.
- **Select/Move** tool: click an entity to edit it in the right panel; drag it
  to a new cell.
- **Erase** tool (or **Delete** key): removes the entity under the cursor / the
  selected one.
- **Space+drag** or **middle-drag** pans; the **mouse wheel** zooms.
- The **Layers** panel toggles each overlay's visibility so you can focus.

## The properties panel

Selecting an entity shows its fields. Coordinates are always editable. Lists use
simple formats:

- **NPC dialogue** — one line of dialogue per text row.
- **Trainer team** — one `speciesNum,level` per row (e.g. `54,6`).
- **Warden payload / Exit landing** — a small JSON box for the advanced fields.

You can also **Resize grid** (cols/rows) — existing cells are preserved, new
cells start empty.

## Saving your work

- **Export JSON** downloads `<map>.json`. Send that file back and it goes
  straight into `public/world/`.
- **Copy JSON** puts it on the clipboard.
- **Save to disk** writes `public/world/<map>.json` directly — but only when
  you're running it locally via `npm run dev` (it's a dev-server endpoint; on
  githack it falls back to Export).
- **Import JSON** loads a `.json` file to keep editing.

## Handing files to Claude

Export the map(s) you changed and share the file(s). I'll drop them into
`public/world/`, rebuild, and they're live. If you change a map's size or art
needs, mention it so I can regenerate the matching background.
