# Story Mode — beat 'em up design

A side-scrolling beat 'em up inside Bonfire Bash: pick a fighter, walk right through the city, beat up waves of
henchmen, fight a boss at the end of each level.

## Story

A gritty Christian story about saving a city. Bonfire City is held hostage by fear: families lock their doors at
sundown, shops pay **Vex** to stay open, and nobody calls the police any more. On the eve of the finals Vex steals
the Bonfire Bash trophy and names his price: *"Every man has a price."* Your fighter isn't for sale, and neither are
the people. Samson sends you out with one rule: *go for the people, not for revenge.* Each chapter shows the city
taking a little more of its hope back, and the fight is won in the end by mercy, not fists.

- **Prologue, Bonfire City:** Vex shows off the trophy in the rain and tempts you. At the Old Chapel, Samson: "Hate can't drive out hate. Even Vex was somebody's son." *(John 1:5)*
- **Stage 1, the mercy moment (played, not told):** the last man standing drops to his knees. Walk up and press **A: HELP HIM UP**.
- **Chapter 2, The Docks:** the man you spared, with his own name and look, finds you: "You're not my enemy. You're one of the people I came to fight for." *(Luke 19:10)*
- **The Docks boss, Ivan:** at the end of the pier, Vex's enforcer: "Back home I fought for medals. Here I fight for rent." You beat him and stop; he asks why. "I came here to free people. That includes you." He sends the dock workers home himself.
- **Chapter 3, Vex Tower:** the dock workers walk home under Ivan's watch, and word spreads that somebody is standing up to Vex. Vex offers the easy elevator; you take the stairs. *(Matthew 7:14)*
- **Final Chapter, the Penthouse:** "All you have to do is kneel." "Those lights are people's homes. No." Vex fights you himself. Beaten, he shows you your shadow: every grudge and lie you've carried. *(Ephesians 6:12)*
- **Epilogue:**
  1. Vex kneels and waits for the last blow. You press **A: OFFER YOUR HAND**.
  2. Sunday at the Old Chapel: the trophy is back on the altar. Vex gave back the money, the debts and the deeds, and now goes by Victor: "Mine was paid for me." *(Luke 15:24)*
  3. One month later, the shops stay open after dark and kids play ball in the streets.
  4. Credits, then THE END.

**Every fighter has their own story** (`ARCS` in `src/game.js`). Ivan is the Docks boss for everyone; the other two duels are fixed rivals whose stories cross yours.

| Fighter | What they're carrying | Rival 1 | Rival 3 | Where they end up |
|---|---|---|---|---|
| Papa-Léguas | runs from everything, even his late father's dojo | Keksan | Hecky (sold the dojo) | opens the Crossroads Dojo every morning |
| Keksan | fights in Vex's cage to keep the Tiger Gym open | Papa-Léguas | Lawslie (wants to arrest him) | a free gym for every kid; every class starts with a bow |
| Vizor | sells what his cameras see to whoever pays | Zeke (wants his tape) | Lawslie (wants the evidence) | films the city's good news |
| Samson | a prizefighter who swore off fighting; baptized Vex as a boy | Marcus | Hecky (sold the 5th Street buildings) | hangs up his gloves; Victor reads the lesson |
| Zeke | bet on his own matches, then threw them | Vizor (has the tape) | Devanté (in debt too) | confesses, keeps his friends, no betting |
| Hecky | sold his penthouse and 5th Street to Vex, didn't ask questions | Lawslie | Papa-Léguas | gives the buildings back to the families |
| Lawslie | suspended for asking questions; afraid of her own anger | Hecky | Vizor | a judge, not a newspaper; walks the beat by choice |
| Marcus | Vex owns his songs; the crown is all he has left | Devanté | Zeke | buys his songs back, plays free without the crown |
| Devanté | Vex offers a way out if he throws games | Marcus | Zeke | runs a free league; the scouts come to him |

Each arc has a talk with Samson at the chapel (Samson's own is a prayer), a face-off before each rival duel and a turn after it, a shadow that taunts them with their own temptation, a personal epilogue, and both rivals in the "one month later" scene.

**Cutscenes are acted out on the stage:** the real characters walk in, taunt and kneel on the level's backdrop (rain in the prologue, dawn at the end). The dialogue box shows the speaker's face and name. Each scene opens on a title card and closes on its verse; START skips.

| Level | Where | Waves | Boss |
|---|---|---|---|
| 1 | **Bonfire Streets**: neon downtown at night | 3 | a rival fighter |
| 2 | **The Docks**: shipping containers, cranes | 3 | **Ivan**, Vex's enforcer (always; 15% more health) |
| 3 | **Vex Tower**: the security floor | 3 | a rival fighter |
| Final | **Vex's Penthouse** | 2 | **Vex** himself (in the brawl), then **your Shadow**: a dark copy of you |

Dialogue scenes between levels; the ending returns the trophy and rolls the credits.
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

**New in v1.22 (PixelLab):**

| Enemy | HP | Behaviour |
|---|---|---|
| **Chain** | 34 | green-mohawk punk; a slow wind-up, then a bike-chain lash with the longest reach of any henchman |
| **Kicker** | 30 | quick street kickboxer; kicks up close and leaps in with a flying side kick from range |
| **Vex** (boss) | 240 | cane strikes, armour against every other hit, and a cane slam that sends a shockwave along the floor (jump it). Beaten, he kneels and his men run. |

**No two henchmen look alike (v1.22).** Every spawn rolls its own look:
- **Size:** 0.9× to 1.18×. Bigger means more health, harder hits, slower feet, and a BIG name.
- **Colours:** shirt and trousers are recoloured separately; skin stays as it is.
- **Headgear:** cap, beanie or bandana, sometimes shades.
- **A weapon:** some carry a pipe, bat or knife, with longer reach and harder hits.

The extras are drawn onto each animation frame at runtime: the head and fist are found from the frame's own pixels.

**Weapons:** a henchman drops his weapon when knocked down. Walk over it to pick it up; A swings it (+reach, +damage). It breaks after 8 hits (a knife after 12), and you drop it if you're knocked down.

**The spared man keeps his look.** The one you help up in Stage 1 comes back in the cutscenes with the same size, colours and hat.

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
