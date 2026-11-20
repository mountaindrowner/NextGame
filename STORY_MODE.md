# Story Mode — beat 'em up design

A side-scrolling beat 'em up inside Bonfire Bash: pick a fighter, walk right through the city, beat up waves of
henchmen, fight a boss at the end of each level.

## Story

A gritty Christian story about temptation, the fight against your own sin, and mercy. Bonfire City is rotting under
**Vex**, who owns the streets, the fights and the people. On the eve of the finals he steals the Bonfire Bash trophy
and leaves a card: *"Every man has a price."* Your fighter doesn't.

- **Chapter 1, Bonfire Streets:** you walk into the dark. *"The light shineth in darkness." (John 1:5)*
- **Chapter 2, The Docks:** you help up a beaten goon instead of finishing him, and he points the way. Nobody is too far gone. *(Luke 19:10)*
- **Chapter 3, Vex Tower:** the elevator is easy, the stairs are narrow; you take the stairs. *(Matthew 7:14)*
- **Final Chapter, the Penthouse:** Vex offers you the whole city if you'll kneel. You won't. Then your shadow steps out: every grudge and sin you've carried. *"We wrestle not against flesh and blood." (Ephesians 6:12)*
- **Epilogue:** you spare Vex and offer him a hand. By Sunday the trophy is back and Vex sits in the front pew of the Old Chapel. *"He was lost, and is found." (Luke 15:24)*

Each story card shows its King James verse under the text.

| Level | Where | Waves | Boss |
|---|---|---|---|
| 1 | **Bonfire Streets**: neon downtown at night | 3 | a rival fighter |
| 2 | **The Docks**: shipping containers, cranes | 3 | a rival fighter |
| 3 | **Vex Tower**: the security floor | 3 | a rival fighter |
| Final | **Vex's Penthouse** | 1 | **Shadow**: Vex's fighter trained on your every move, a dark copy of you |

Short story cards between levels (portrait and text); the ending card gets the trophy back.
Bosses are picked at random from the roster (never your own fighter), so every run is different.

## How it plays

- **Moving:** walk in 8 directions. Up/down moves you into or out of the screen along a floor band (depth), like Final Fight or Streets of Rage.
- **A (punch):** a 3-hit combo, jab, jab, kick, that knocks down on the last hit. **B (kick)** on its own pushes an enemy back, and after a hit it finishes the combo with a knockdown (A, A, B).
- **JUMP button:** jump, then A or B for a jump kick. (Up/down is depth in this mode.)
- **SP (A+B), desperation move:** your fighter's special pose plus a shockwave that hits everyone around you. It costs a little health, like the classics, and gets you out of a crowd.
- **Super (FWD + SP, full meter):** the cinematic cut-in, then it hits every enemy on screen.
- **Grab and throw:** walk into a reeling enemy to grab them, then B to throw them into their friends.
- **Hit rules:** a hit only lands if attacker and target are on roughly the same depth (within about 10 px).
- **Lives and continues:** 3 lives, then CONTINUE? 9..0.
- **Score:** points for every hit and knockout.

## Enemies (PixelLab characters, side view, same style as the roster)

| Enemy | Role | HP | Behaviour |
|---|---|---|---|
| **Goon** | rusher | 30 | lines up with you and throws punches; comes in palette swaps (red / green / blue) |
| **Slinger** | ranged | 24 | keeps his distance and throws bottles along his depth line |
| **Bruiser** | heavy | 70 | slow, shrugs off one hit, charges with a shoulder tackle |

**Variants (v1.15):** Blade (fast goon, lunges in), Molotov (bottles leave fire on the floor) and Enforcer (white-suited bruiser, quicker charge), recoloured from the three PixelLab henchmen.

**Crowd rule (the classic trick):** only two enemies may attack at once. The others circle and wait their turn.
That keeps fights fair and readable.

## Levels and items

- **Backgrounds:** each level is one wide PixelLab background (768×192, three screens). The camera scrolls right and locks at each wave. A flashing **GO →** appears when it's clear.
- **Breakable crates:** these drop food (heals) and bonus points.

## As built (v1.14.0)

- **Backgrounds:** Streets and Docks have their own PixelLab backdrops, with a pavement or board floor band drawn in code beneath them. Vex Tower reuses Vizor's Control Room (mirrored and tiled), and the penthouse reuses Hecky's Penthouse. That kept the art inside the remaining PixelLab credit.
- **Henchmen:** the goon, slinger and bruiser are `create_with_style` characters (Vizor's style), with idle, walk, punch or special, hurt and fall animations (`tools/pixellab/moves.py`).
- **Boss duels:** each runs in the normal Fight scene for one round. A loss goes to the usual CONTINUE screen.
- **Testing:** `tools/story.js` has an autoplayer clear every stage.

## Built on what the game already has

Everything reuses the existing engine:
- fighter sprites and animations
- hit-stop, sparks and sounds
- voices, the super cut-in and the music system
- the Fight scene, for the boss duels

## Build order

1. **Removal:** take out 2 Players (menu, input split, docs and art).
2. **Art:** generate the henchmen and three level backgrounds with PixelLab.
3. **Brawl engine** (new `Story` scene):
   - depth movement and camera
   - multi-enemy hit checks
   - the enemy AI with the attack-token rule
   - waves, crates and food, lives, continues and score
4. **Boss fights:** hand off to the Fight scene for a one-round duel, then return to the next level.
5. **Shadow final boss and story cards.**
6. **Testing:**
   - a scripted playthrough test, so the run is clearable
   - a test that each enemy type works
   - CPU-driven runs to tune difficulty
