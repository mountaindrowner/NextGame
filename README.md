# Bonfire Bash

A handheld-styled pixel fighting game ("Dojo Boy") with nine fighters — Papa-Léguas, Akira, Ivan, Diego, Vizor, Samson, Zeke, Hecky Xavier and Lawslie — playable in a browser on phone or desktop. Modes: Arcade, Versus CPU, 2 Players, Training, Trials and Records. The version is in `VERSION` (shown on the title screen); see `CHANGELOG.md`.

## Play

Open `dist/index.html` in a browser. It is a single self-contained file (also ready to upload to itch.io as an HTML game).

Controls: arrows/WASD move, `X`/`K` = A (punch), `Z`/`J` = B (kick), Enter = Start (pause shows each fighter's moves and combo). On touch screens use the on-screen pad. Gamepads work (A/X = punch, B/Y = kick). In 2 Players mode the keyboard splits: P1 = WASD + F/G, P2 = arrows + K/L; a single gamepad goes to P2. A+B together, or down→forward+A, fires the special move.

## Fighting system

- **Input buffer** — a button pressed up to 7 frames early still comes out; presses during hit-stop are kept.
- **Chains** — on hit or block: jab → jab / kick / low jab / sweep, low jab → low jab / jab / sweep / kick, jump punch → jump kick (max 3 chained normals).
- **Special cancel** — any connected normal except the sweep cancels into the special (A+B). A+B pressed together cancels the first button's normal straight into the special.
- **Dash** — double-tap forward or back; the back-dash has brief invincibility.
- **Super meter** — fills when you hit (+7, heavy +10), get hit (+5) or block; forward + A+B with a full bar fires your super (cinematic freeze, then a 6-hit flurry). The meter carries between rounds.
- **Throws** — forward/back + B right next to a grounded opponent; press A or B during the grab to break it. Back throws switch sides. Ivan's Bear Slam is an unbreakable command grab.
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
| Zeke | **Strike Ball** — bowling ball rolled along the floor (low, knocks down) | **Split Shot** — lobbed ball that drops from above (overhead) |
| Hecky Xavier | **Hostile Takeover** — rising uppercut that launches for a juggle | **Power Suit** — 7-second power-up (+25% damage, faster). Plus a third special, **Laser Glare** (back + A+B): eye beams across the screen at head height |
| Lawslie | **Taser** — short-range prongs, a hit stuns 3× longer | **Cuff 'Em** — grab through blocks; cuffed opponents can't use specials or super for 5 s |

## Fighting styles

Each fighter is a different archetype (`ARCH` in `src/game.js`), checked by `node tools/traits.js`:

| Fighter | Type | Health | Trait |
|---|---|---|---|
| Papa-Léguas | Rushdown | 92 | fastest dash, 4-hit chains |
| Akira | Ninja | 94 | double jump |
| Ivan | Grappler | 118 | the start of his kick absorbs a hit |
| Diego | Mix-up | 96 | very low crouch: ducks under projectiles and high hits |
| Vizor | Zoner | 98 | longest reach |
| Samson | Powerhouse | 106 | counter-hit kicks knock down |
| Zeke | High/low zoner | 104 | bowling balls smash through other projectiles |
| Hecky Xavier | Technician | 98 | parry: tap forward just as a hit lands (no damage, +meter) |
| Lawslie | Enforcer | 100 | no chip damage when blocking, and blocking builds meter |

Hecky has a second costume — an anthropomorphic fox — chosen with SELECT on the character select screen (`skin2` in his roster entry; sprites in `assets/fighters/heckyfox/`).

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

Training mode: the dummy stands still (SELECT switches it to block, low block or crouch), health refills, and the top of the screen shows hits, damage and your best combo.

Winning a match sets off confetti, fireworks and a crowd cheer; the result and ending screens celebrate too.

## Music

Every stage and the title screen have a recorded song, played looped.

| Screen / stage | Song |
|---|---|
| Title | heroic guitar and brass rock theme |
| Crossroads Dojo (Papa-Léguas) | samba-rock fighting theme |
| Moonlit Temple (Akira) | taiko, flute and koto over rock drums |
| Iron Gym (Ivan) | heavy drums, distorted bass riff, choir synths |
| Rio Plaza (Diego) | berimbau, pandeiro and funky bass |
| Control Room (Vizor) | synthwave arpeggios and pulsing bass |
| Old Chapel (Samson) | church organ over hard rock |

Select, win/lose jingles and the ending keep the chiptune music.

Songs are made with PixelLab's music generator (`python3 tools/pixellab/music.py <stage>`, two takes per request),
then `tools/pixellab/takes.py` compares the takes, and `tools/pixellab/loopfind.py` measures the tempo, finds a
bar-aligned seamless loop and writes `assets/music/<stage>.mp3` (mono 64 kbps) + `<stage>.json` (loop points).
`node tools/music_check.js` checks every stage's song decodes and loops in the game.

## Voices

The announcer and the fighters' lines are recorded clips in `assets/voice/` made with [Kokoro](https://github.com/thewh1teagle/kokoro-onnx), an open-source text-to-speech model that runs locally (no account or cost). `tools/voices.py` lists every line, the voice for each fighter (announcer: `am_fenrir`) and phonetic spellings for the Portuguese names; edit it and rerun to change a voice or a line. `node tools/voice_check.js` plays through a match and lists the clips that played.


- `src/template.html` — page shell, handheld styling and on-screen controls
- `src/game.js` — the game
- `assets/` — PNG art (portraits, logos, stages, original sprites)
- `assets/fighters/<id>/` — PixelLab-generated fight animations, one strip per move, plus `meta.json` (frame size and foot anchor per move)
- `tools/build.py` — inlines everything into `dist/index.html`
- `tools/smoke.js` — headless Playwright smoke test (boots the game, runs fights, screenshots)
- `tools/poses.js`, `tools/play.js`, `tools/special.js` — render every pose, mash through a fight, or film a special move as a contact sheet
- `tools/itch_art.py`, `tools/shots.js` — itch.io cover, banner and screenshots (written to `release/itch/`)
- `tools/itch_keyart.py`, `tools/stills.js`, `tools/super_gif.js` — key art, poster, cover, badges, feature card and the supers GIF (arena backdrops in `tools/pixellab/concept/` from PixelLab)
- `tools/combos.js` — frame-exact combo checks; `tools/powers.js` — every special power; `tools/features.js` — super, throws, 2 players, trials, records; `tools/celebrate.js` — film the victory celebration
- `tools/make_logo.py` — draw a name logo in the game's style
- `tools/anim_sheet.py` — labeled sheet of every animation a fighter uses (to check each move looks like what it does)
- `tools/pixellab/redo.py` + `picks.json` — regenerate a mismatched move as two takes and choose one (with its strike frame)
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
