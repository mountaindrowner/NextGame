# Back burner

Ideas parked for later. When you're looking for something to do, start here.

## ~~Bonfire Bash: beat 'em up mode~~: built as STORY mode in v1.14.0 (see STORY_MODE.md)

Possible next steps: a real Vex boss character, 2-player co-op online, more enemy types, a weapon pickup (pipe / bat).

### Original notes

Theorize a side-scrolling beat 'em up using the Bonfire Bash cast — think classic arcade brawlers
(walk right, waves of enemies, bosses), not a versus fighter.

Starting questions to work through:
- **Mode or separate game?** A "Story / Brawl" mode inside Bonfire Bash (reuses the engine, menus,
  fighters) vs. a standalone spin-off with its own movement (8-way / depth lanes).
- **Who plays?** Any of the 8 fighters, 1–2 players co-op (the 2-player input code already exists).
- **Movement:** beat 'em ups need a depth axis (walk up/down the screen). The current engine is 1D
  (x + jump height) — this is the biggest engine change.
- **Enemies:** a few grunt types (rusher, thrower, blocker) — could be PixelLab characters with the
  same move-generation pipeline (`tools/pixellab/moves.py`), plus one boss per stage reusing the
  existing stages (Crossroads Dojo, Moonlit Temple, Iron Gym, Rio Plaza, Control Room, Old Chapel,
  Strike Lanes, Penthouse).
- **What carries over:** fighters' normals, specials, supers and archetype traits; hit-stop, sparks,
  voices, music, celebration.
- **New systems:** enemy AI groups, scrolling camera, wave spawner, pickups (food / weapons),
  continues and score.
- **Story hook:** who's behind the Bonfire Bash tournament?

Rough first step: a one-stage prototype — Papa-Léguas walking right through three waves of a single
grunt type to a boss — to test whether depth movement feels good in the handheld screen.
