# World Dojo

A handheld-styled pixel fighting game ("Dojo Boy") with six fighters — Papa-Léguas, Akira, Ivan, Diego, Vizor and Samson — playable in a browser on phone or desktop. Modes: Arcade, Versus CPU and Training.

## Play

Open `dist/index.html` in a browser. It is a single self-contained file (also ready to upload to itch.io as an HTML game).

Controls: arrows/WASD move, `X`/`K` = A (punch), `Z`/`J` = B (kick), Enter = Start (pause shows each fighter's moves and combo). On touch screens use the on-screen pad. A+B together, or down→forward+A, fires the special move.

## Fighting system

- **Input buffer** — a button pressed up to 7 frames early still comes out; presses during hit-stop are kept.
- **Chains** — on hit or block: jab → jab / kick / low jab / sweep, low jab → low jab / jab / sweep / kick, jump punch → jump kick (max 3 chained normals).
- **Special cancel** — any connected normal except the sweep cancels into the special (A+B). A+B pressed together cancels the first button's normal straight into the special.
- **Dash** — double-tap forward or back; the back-dash has brief invincibility.
- **Counter hits** — hitting a move in its start-up does +20% damage and extra hit-stun.
- **Juggles & scaling** — at most 2 extra hits on a falling opponent; damage scales down from the 3rd hit (85%, 75%, … 50%).
- Ivan's Bear Slam is a command grab: it can't grab an opponent in hit-stun, but it can grab out of a blocked string.

## Powers

Every fighter has two specials, and no two work alike. Special 1: **A+B** (or down, forward + A). Special 2: **down + A+B** (or down, back + B). The thin bar under each health bar is special 2's cooldown.

| Fighter | Special 1 | Special 2 |
|---|---|---|
| Papa-Léguas | **Légua Rush** — dashing 3-hit punch flurry | **Légua Step** — invincible blur that goes through the opponent to their back |
| Akira | **Shuriken** — projectile | **Shadow Counter** — counter stance: get hit and he vanishes, reappears behind and kicks (grabs beat it) |
| Ivan | **Bear Slam** — command grab | **Iron Charge** — shoulder charge with armor that absorbs one hit |
| Diego | **Meia-Lua** — advancing 3-hit spin kick | **Martelo** — invincible rising kick, the anti-air |
| Vizor | **Shutter Flash** — reticle lock-on at range, then a knockdown flash | **Instant Replay** — rewinds his position and up to 15 recent damage |
| Samson | **Holy Tome** — overhead book smash (must be blocked standing) | **Benediction** — kneels and heals; any hit interrupts it |

`tools/powers.js` checks each of these mechanics.

Bread-and-butter combos (checked frame by frame by `tools/combos.js`):

| Fighter | Combo | Hits |
|---|---|---|
| Papa-Léguas | jab, jab, kick > Légua Rush | 6 |
| Akira | jab, kick > Shuriken | 3 |
| Ivan | jump kick, jab, kick | 3 |
| Diego | low jab, jab, kick > Meia-Lua | 6 |
| Vizor | jab, kick > Shutter Flash | 3 |
| Samson | jab, kick > Holy Tome | 3 |

Training mode: the dummy stands still (SELECT switches it to standing or low block), health refills, and the top of the screen shows hits, damage and your best combo.

Winning a match sets off confetti, fireworks and a crowd cheer; the result and ending screens celebrate too.

## Layout

- `src/template.html` — page shell, handheld styling and on-screen controls
- `src/game.js` — the game
- `assets/` — PNG art (portraits, logos, stages, original sprites)
- `assets/fighters/<id>/` — PixelLab-generated fight animations, one strip per move, plus `meta.json` (frame size and foot anchor per move)
- `tools/build.py` — inlines everything into `dist/index.html`
- `tools/smoke.js` — headless Playwright smoke test (boots the game, runs fights, screenshots)
- `tools/poses.js`, `tools/play.js`, `tools/special.js` — render every pose, mash through a fight, or film a special move as a contact sheet
- `tools/itch_art.py`, `tools/shots.js` — itch.io cover, banner and screenshots (written to `release/itch/`)
- `tools/combos.js` — frame-exact combo checks; `tools/celebrate.js` — film the victory celebration
- `tools/make_logo.py` — draw a name logo in the game's style
- `tools/pixellab/` — scripts that generated the fighters with the PixelLab API

## Fighters (PixelLab)

The four fighters were redrawn with [PixelLab](https://www.pixellab.ai) as side-view characters (`create-character-pro`, using the original portraits as concept art and the original sprites as style reference), then animated move by move facing east; the game mirrors them for the other side.

Moves per fighter: idle, walk, crouch, jump, punch, kick, crouch punch, low kick, air punch, air kick, block, hurt, knockdown, win and a special (Papa-Léguas's Légua Rush, Akira's Shuriken, Ivan's Bear Slam, Diego's Meia-Lua, Vizor's Shutter Flash, Samson's Holy Tome, plus Samson's Benediction prayer).

Vizor was made from the concept art in `tools/pixellab/concept/vizor.png` (with Papa-Léguas as the PixelLab style reference); his portraits and logo are cut from that art, and his stage was generated with PixelLab's image generator using Ivan's stage as the style image. Samson (internal id `padre`) was made the same way from `tools/pixellab/concept/padre.png` (his logo is drawn with `tools/make_logo.py`), with an Old Chapel stage.

To regenerate or add moves (needs a PixelLab API token; set `PIXELLAB_TOKEN` outside this environment):

```
cd tools/pixellab
python3 make_chars.py karl          # create a character (ids go in chars.json)
python3 moves.py karl               # base moves (moves.py has the prompts)
python3 follow.py karl              # moves that start from the crouch/jump pose
python3 fetch.py karl               # download frames to raw/
python3 pack.py karl                # align, crop and write assets/fighters/karl/
python3 ../build.py
```

Strike timing (which frame lands the hit) and special-move frame maps live in the `AK` table in `src/game.js`; per-fighter overrides go in `CH[id].ak`. If a fighter has no animation for a state, the game falls back to the original single-sprite rendering.

## Build

```
python3 tools/build.py
node tools/smoke.js /tmp/shot
```
