# Bonfire Bash

A handheld-styled pixel fighting game (the "Dojo Boy Advanced") with nine fighters — Papa-Léguas, Ivan, Vizor, Samson, Zeke, Hecky Xavier, Lawslie, Marcus and Devanté — playable in a browser on phone or desktop. Modes: **Story** (a side-scrolling beat 'em up, see `STORY_MODE.md`), Arcade, Versus CPU, Online, Training, Trials and Records. The version is in `VERSION` (shown on the title screen); see `CHANGELOG.md`.

## Play

Open `dist/index.html` in a browser. It is a single self-contained file (also ready to upload to itch.io as an HTML game).

Controls: four face buttons, the same in every mode — **A** punch (`X`/`K`), **B** kick (`Z`/`J`), **SP** special (`C`/`L`), **JUMP** (`V`/`I`; up also jumps in fights; in Story up/down is depth). Arrows/WASD move, Enter = Start (pause shows each fighter's moves and combo). On touch screens use the on-screen pad. Gamepads work (A punch, B kick, Y/RB special, X/LB jump). A+B together, the **SP** button (on screen; `C`/`L` on a keyboard; Y/RB on a gamepad), or down→forward+A, fires the special move. SP is just A+B in one press, so down+SP, back+SP and forward+SP work too.

## Fighting system

- **Input buffer** — a button pressed up to 7 frames early still comes out; presses during hit-stop are kept.
- **Chains** — on hit or block: jab → jab / kick / low jab / sweep, low jab → low jab / jab / sweep / kick, jump punch → jump kick (max 3 chained normals).
- **Special cancel** — any connected normal except the sweep cancels into the special (A+B). A+B pressed together cancels the first button's normal straight into the special.
- **Dash** — double-tap forward or back; the back-dash has brief invincibility.
- **Super meter** — fills when you hit (+7, heavy +10), get hit (+5) or block; forward + A+B with a full bar fires your fighter's unique super (see Supers). The meter carries between rounds.
- **Throws** — forward/back + B right next to a grounded opponent; press A or B during the grab to break it. Back throws switch sides. Ivan's Bear Slam is an unbreakable command grab.
- **Counter hits** — hitting a move in its start-up does +20% damage and extra hit-stun.
- **Juggles & scaling** — at most 2 extra hits on a falling opponent; damage scales down from the 3rd hit (85%, 75%, … 50%).
- Ivan's Bear Slam is a command grab: it can't grab an opponent in hit-stun, but it can grab out of a blocked string.

## Powers

Every fighter has two specials, and no two work alike. Special 1: **A+B** (or down, forward + A). Special 2: **down + A+B** (or down, back + B). The segmented bar under each health bar shows every special's cooldown (one segment per special). Using the same special again within 5 seconds does 15% less damage each time (down to 55%).

| Fighter | Special 1 | Special 2 |
|---|---|---|
| Papa-Léguas | **Légua Rush** — dashing 3-hit punch flurry | **Légua Step** — invincible blur that goes through the opponent to their back |
| Ivan | **Bear Slam** — command grab | **Iron Charge** — shoulder charge with armor that absorbs one hit |
| Vizor | **Shutter Flash** — reticle lock-on at range, then a flash (reactable) | **Instant Replay** — rewinds his position and up to 15 recent damage |
| Samson | **Holy Tome** — overhead book smash (must be blocked standing) | **Benediction** — kneels and heals; any hit interrupts it |
| Zeke | **Strike Ball** — bowling ball rolled along the floor (low, knocks down) | **Split Shot** — lobbed ball that drops from above (overhead) |
| Hecky Xavier | **Hostile Takeover** — dashing uppercut, invincible on start-up, that launches for a juggle | **Power Suit** — 7-second power-up (+25% damage, faster). Plus a third special, **Laser Glare** (back + A+B): eye beams across the screen at head height, 3 hits |
| Lawslie | **Taser** — short-range prongs, a hit stuns 3× longer | **Cuff 'Em** — grab through blocks; cuffed opponents can't use specials or super for 5 s |
| Devanté | **Bounce Pass** — a bouncing basketball; on a hit it comes back and a catch recharges it | **Ankle Breaker** — crossover dribble through the opponent; crossing them leaves them stumbling |
| Marcus | **Bass Drop** — twin low shockwaves roll along the floor both ways across the stage (block crouching, or jump them) | **Mic Check** — a sound wave that bats enemy projectiles back and blasts the opponent across the screen |

## Supers

Forward + A+B with a full meter. Each fighter's super is unique (`SUPERS` in `src/game.js`, checked by `node tools/supers.js`):

| Fighter | Super | What it does |
|---|---|---|
| Papa-Léguas | Mil Léguas | dash in, then afterimage blinks through the opponent from both sides (6 hits) |
| Ivan | Siberian Storm | unblockable short-range grab into three slams |
| Vizor | Full Exposure | full-screen lock-on, five camera-flash shots |
| Samson | Final Sermon | four pillars of light walk toward the opponent (overhead), then he heals |
| Zeke | Perfect Game | giant bowling ball, four low hits |
| Hecky Xavier | Golden Parachute | launcher, sustained eye laser juggle, gold-coin finisher |
| Lawslie | Full Arrest | charging grab, three taser zaps, takedown; cuffed for 8 s |
| Devanté | Fast Break | dribble drive, pop-up, alley-oop slam dunk |
| Marcus | Stage Dive | homing leap that crashes down (overhead), then a five-note bass jam |

## Fighting styles

Each fighter is a different archetype (`ARCH` in `src/game.js`), checked by `node tools/traits.js`:

| Fighter | Type | Health | Trait |
|---|---|---|---|
| Papa-Léguas | Rushdown | 92 | fastest dash, 4-hit chains |
| Ivan | Grappler | 118 (10% damage reduction) | the start of his kick absorbs a hit |
| Vizor | Zoner | 98 | long reach |
| Samson | Powerhouse | 106 | counter-hit kicks knock down |
| Zeke | High/low zoner | 100 | Spare: a blocked Strike Ball recharges his special to nearly ready |
| Hecky Xavier | Tech rushdown | 98 | parry: tap forward just as a hit lands (no damage, +meter); bigger hitboxes, fast dash |
| Lawslie | Enforcer | 100 | no chip damage when blocking, and blocking builds meter; smallest body (sprites shrunk 20% by `SCALE` in `tools/pixellab/pack.py`), same reach |
| Devanté | High flyer | 96 | double jump, higher jump, quick feet |
| Marcus | Long-range | 104 | slowest walk and dash, longest reach (×1.4, a sound blast off his bass) but normals start 2 frames slower; hits that land on the beat do +25% (a ring pulses at his feet on every beat; the beat runs off the shared frame counter, so it's identical online) |

Hecky has a second costume — an anthropomorphic fox — chosen with SELECT on the character select screen (`skin2` in his roster entry; sprites in `assets/fighters/heckyfox/`).

`tools/powers.js` checks each of these mechanics.

Bread-and-butter combos (checked frame by frame by `tools/combos.js`):

| Fighter | Combo | Hits |
|---|---|---|
| Papa-Léguas | jab, jab, kick > Légua Rush | 6 |
| Ivan | jump kick, jab, kick | 3 |
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
| Iron Gym (Ivan) | heavy drums, distorted bass riff, choir synths |
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
- **Spending guards:** see `CLAUDE.md`. PixelLab scripts refuse paid calls unless run with `PL_BUDGET=<generations>` (and never dip into dollar credits); `server/deploy.sh` needs `CONFIRM_DEPLOY=bonfire-bash-net`
- `tools/hitboxes.py` — measures every fighter's attack reach / height band and body width from the sprites into `assets/hitboxes.json` (rerun after changing any fighter's animations)
- `tools/text_audit.js` — draws 223 screens (every fighter) and fails if any text leaves the screen or its box, or uses a letter the pixel font lacks
- `tools/story.js` — Story mode: an autoplayer clears all four stages, then the boss hand-off and the shadow duel are checked
- `tools/balance.js` — full balance test: CPU-vs-CPU round robin, win rates and matchup table (`node tools/balance.js 10 2`; add a fighter id to test only their matchups, and a JS snippet to try a change)
- `tools/feel.js` — hit-stop by weight, hurt reactions, loop detection + burst, the SP key; `tools/ai.js` — CPU-vs-CPU matches: decks used, reaction time and execution by difficulty
- `tools/make_logo.py` — draw a name logo in the game's style
- `tools/anim_sheet.py` — labeled sheet of every animation a fighter uses (to check each move looks like what it does)
- `tools/pixellab/redo.py` + `picks.json` — regenerate a mismatched move as two takes and choose one (with its strike frame)
- `tools/pixellab/` — scripts that generated the fighters with the PixelLab API

## Fighters (PixelLab)

The four fighters were redrawn with [PixelLab](https://www.pixellab.ai) as side-view characters (`create-character-pro`, using the original portraits as concept art and the original sprites as style reference), then animated move by move facing east; the game mirrors them for the other side.

Moves per fighter: idle, walk, crouch, jump, punch, kick, crouch punch, low kick, air punch, air kick, block, hurt, knockdown, win and a special (Papa-Léguas's Légua Rush, Ivan's Bear Slam, Vizor's Shutter Flash, Samson's Holy Tome, plus Samson's Benediction prayer).

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

## Online

**ONLINE > LOBBY** shows everyone who's in the lobby right now.
- Pick a player marked READY and press A to challenge them. They get 20 seconds to accept.
- Your lobby name is two random words, like IRON TIGER. The top row gives you a new one. Names come from fixed word lists, so nobody types anything and there's nothing to moderate.
- **HOST / JOIN WITH A CODE** still works for playing a specific friend.

**How a match connects.** The two browsers first try a direct link (WebRTC). If it isn't up within 7 seconds, which is common on phones on mobile data, the match runs through the server relay instead. The select screen shows DIRECT or VIA SERVER, plus the ping.

**The server** is `server/worker.js`, a Cloudflare Worker named `bonfire-bash-net`. It has two Durable Objects:
- **Lobby:** kept in memory only. A player who stops checking in, every 3 seconds, drops off after 20 seconds.
- **Room:** swaps connection offers under a 4-letter code that expires after 10 minutes. It also runs the WebSocket relay.

**Deploying.** Run `CONFIRM_DEPLOY=bonfire-bash-net sh server/deploy.sh`. It ships code only: migration v2, which added the Lobby, is already live.

**Free-plan limits.** Lobby check-ins count against the account's Workers Free limits: 100,000 requests a day, with Durable Object requests counted separately. Relayed matches count too, since every frame's input is a message. On the free plan, going over makes requests fail until the next day; it doesn't bill anything.

## Build

```
python3 tools/build.py
node tools/smoke.js /tmp/shot
node tools/story.js        # story mode: every level, cutscene, the mercy moment, the ending
node tools/text_audit.js   # no text off-screen, out of its box or overlapping, on every screen
node tools/online.js       # two browsers, a room code, a match (live server)
node tools/lobby.js        # two browsers meet in the lobby and fight; RELAY=1 forces the server relay,
                           # NET=http://127.0.0.1:8787 uses a local `wrangler dev` copy of server/worker.js
```
