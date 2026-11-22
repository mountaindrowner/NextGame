# Bonfire Bash

A handheld-styled pixel fighting game (the "Dojo Boy Advanced") with twelve fighters — Papa-Léguas, Keksan, Vizor, Samson, Zeke, Hecky Xavier, Lawslie, Marcus, Devanté, Estrella, Reyes and Paezano — plus Vex, a secret fighter unlocked by clearing Story mode, playable in a browser on phone or desktop. Modes: **Story** (a side-scrolling beat 'em up with launchers, allies, hazards and stage ranks, see `STORY_MODE.md`), Arcade, Versus CPU, Online, Training, Trials and Records. The version is in `VERSION` (shown on the title screen); see `CHANGELOG.md`.

## Play

Open `dist/index.html` in a browser. It is a single self-contained file (also ready to upload to itch.io as an HTML game).

Controls: four face buttons, the same in every mode — **A** punch (`U`; also `X`), **B** kick (`J`; also `Z`), **SP** special (`I`/`O`; also `C`), **JUMP** (`K`/`L`; also `V`; in fights up jumps and this button is FOCUS; in Story up/down is depth). Arrows/WASD move, Enter = Start (pause shows each fighter's moves and combo). On touch screens the pad works differently by mode (Options > CONTROLS shows both diagrams):

- **Fights:** a zoned stick, like mobile Street Fighter IV. Wide left/right bands walk (back blocks), pushing to the **far edge dashes** (no double-tap needed), up jumps, down crouches, down-back crouch-blocks. A knob follows the thumb, and the zones are labelled round the pad.
- **Story mode (beat 'em up):** a plain 8-way stick, where up and down move in and out of the screen. No jump or dash zones; jump is the JUMP button. SP is its own button here (A+B is not a special): it fires the moves you learn from beaten bosses, and pressed while you're being hit it's a Breaker.
- **Menus:** an 8-way pad.

`node tools/touch.js` checks the zones with real touch events. Gamepads work: in fights the standard layout (X punch, A kick, Y/RB/RT special, B/LB/LT focus or jump); in menus A is OK and B is back. A+B together, the **SP** button (on screen; `I`/`O` on a keyboard; Y/RB on a gamepad), or down→forward+A, fires the special move. SP is just A+B in one press, so down+SP, back+SP and forward+SP work too.

## Fighting system

- **Input buffer** — a button pressed up to 7 frames early still comes out; presses during hit-stop are kept.
- **Chains** — on hit or block: jab → jab / kick / low jab / sweep, low jab → low jab / jab / sweep / kick, jump punch → jump kick (max 3 chained normals).
- **Special cancel** — any connected normal except the sweep cancels into the special (A+B). A+B pressed together cancels the first button's normal straight into the special.
- **Dash** — double-tap forward or back; the back-dash has brief invincibility.
- **Super meter** — fills when you hit (+7, heavy +10), get hit (+5) or block; forward + A+B with a full bar fires your fighter's unique super (see Supers). The meter carries between rounds.
- **Focus attack** — hold the FOCUS button (the JUMP button becomes FOCUS in fights; `K` on a keyboard, B/LB on a gamepad), then let go to strike. While charging it absorbs one hit at half damage. Held 18 frames (level 2) the strike crumples the opponent, who slowly falls: a free combo starter. At 42 frames (level 3) it fires by itself and can't be blocked. A dash (push to the stick's edge, or double-tap) cancels the charge, or the strike once it hits. **Focus cancel:** press FOCUS during a special to cancel it into a focus for half the super bar; then dash to make it safe, or keep charging.
- **EX specials** — hold FOCUS and press SP (or press FOCUS right after SP; on a keyboard `K` + `I`) for an EX version of that special. It costs a third of the super bar (the bar has two marks), works even while the special is on cooldown, does 30% more damage with extra hit-stun (projectiles fly 20% faster), and shrugs off one hit at half damage in its first 20 frames. It glows cyan. Every fighter has an EX trial, and the CPU uses EX now and then, mostly to finish combos.
- **Throws** — forward/back + B right next to a grounded opponent; press A or B during the grab to break it. Back throws switch sides. Keksan's Thai Clinch is an unblockable command grab.
- **Counter hits** — hitting a move in its start-up does +20% damage and extra hit-stun.
- **Juggles & scaling** — at most 2 extra hits on a falling opponent; damage scales down from the 3rd hit (85%, 75%, … 50%).
- Keksan's Thai Clinch is a command grab: it can't grab an opponent in hit-stun, but it can grab out of a blocked string.

## Powers

Every fighter has two specials, and no two work alike. Special 1: **A+B** (or down, forward + A). Special 2: **down + A+B** (or down, back + B). The segmented bar under each health bar shows every special's cooldown (one segment per special). Using the same special again within 5 seconds does 15% less damage each time (down to 55%).

| Fighter | Special 1 | Special 2 |
|---|---|---|
| Papa-Léguas | **Légua Rush** — dashing 3-hit punch flurry | **Légua Step** — invincible blur that goes through the opponent to their back |
| Vizor | **Shutter Flash** — reticle lock-on at range, then a flash (reactable) | **Instant Replay** — rewinds his position and up to 15 recent damage |
| Samson | **Holy Tome** — overhead book smash (must be blocked standing) | **Benediction** — kneels and heals; any hit interrupts it |
| Zeke | **Strike Ball** — bowling ball rolled along the floor (low, knocks down) | **Split Shot** — lobbed ball that drops from above (overhead) |
| Hecky Xavier | **Hostile Takeover** — dashing uppercut, invincible on start-up, that launches for a juggle | **Power Suit** — 7-second power-up (+25% damage, faster). Plus a third special, **Laser Glare** (back + A+B): eye beams across the screen at head height, 3 hits |
| Lawslie | **Taser** — short-range prongs, a hit stuns 3× longer | **Cuff 'Em** — grab through blocks; cuffed opponents can't use specials or super for 5 s |
| Devanté | **Bounce Pass** — a bouncing basketball; on a hit it comes back and a catch recharges it | **Ankle Breaker** — crossover dribble through the opponent; crossing them leaves them stumbling |
| Keksan | **Tiger Knee** — a leaping flying knee that clears low attacks and launches on a hit | **Thai Clinch** — a short-range command grab: three knees in the clinch, the last shoves them away. Third special (BK+SP): **Teep** — a long push kick that shoves them across the screen; near a wall they bounce off it into a juggle |
| Estrella | **High Note** — a slow, bobbing music note that floats across and lingers; foes near it walk slower | **Encore** — a ring of sound out in front of her that pulses five times (hits low). Third special (BK+SP): **Siren Scream** — a short cone of sound, 3 hits; it shatters projectiles |
| Reyes | **Frontier Knuckle** — a dashing, flaming straight right that knocks down | **Drone Strike** — launches his SABR drone; it hovers ahead of him and fires three aimed laser bolts. Third special (BK+SP): **Eagle Rise** — an invincible rising uppercut, two hits, the anti-air. Air special (A+B or SP in the air, once per jump): **Rotor Kicks** — he hangs in the air flutter-kicking, floating up a little, up to five hits |
| Paezano | **Fastball** — a windup and a fast straight pitch; every 3rd pitch in a row is a flaming 98 MPH heater that knocks down (a flame over his cap means the next one is hot) | **Steal Home** — a feet-first slide: low, goes under projectiles and high attacks, knocks down. Third special (back + A+B), **Home Run Swing**: he pulls a bat and swings it, knocking the opponent flying ("CRACK!", or "HOME RUN!" on a knockout); any projectile in the swing is batted back as a line drive, and his next pitch is a heater |
| Vex (secret: clear Story mode) | **Cane Shockwave** — a cane slam; a purple shockwave rolls along the floor (low) | **Every Man Has a Price** — tosses gold coins; a hit stuns the opponent for a long time (they stare at the money). Third special (back + A+B), **Vanish**: disappears in purple smoke and steps out behind the opponent |
| Marcus | **Bass Drop** — twin low shockwaves roll along the floor both ways across the stage (block crouching, or jump them) | **Mic Check** — a sound wave that bats enemy projectiles back and blasts the opponent across the screen |

## Supers

Forward + A+B with a full meter. Each fighter's super is unique (`SUPERS` in `src/game.js`, checked by `node tools/supers.js`):

| Fighter | Super | What it does |
|---|---|---|
| Papa-Léguas | Mil Léguas | dash in, then afterimage blinks through the opponent from both sides (6 hits) |
| Vizor | Full Exposure | full-screen lock-on, five camera-flash shots |
| Samson | Final Sermon | four pillars of light walk toward the opponent (overhead), then he heals |
| Zeke | Perfect Game | giant bowling ball, four low hits |
| Hecky Xavier | Golden Parachute | launcher, sustained eye laser juggle, gold-coin finisher |
| Lawslie | Full Arrest | charging grab, three taser zaps, takedown; cuffed for 8 s |
| Devanté | Fast Break | dribble drive, pop-up, alley-oop slam dunk |
| Keksan | Eight Limbs | dash in, then fists, knees, elbows and shins (eight strikes), finished with a launching flying knee |
| Estrella | Grand Finale | lights down and a spotlight; stage beams, a floor equalizer and five glowing rings of sound roll across the whole stage, each a sung note; the last knocks down, then fireworks and a cheering crowd |
| Reyes | Air Support | dashing knuckle; on a hit his drone squadron flies in and strafes them, then Eagle Rise launches them ("MISSION COMPLETE!") |
| Paezano | Strikeout | three pitches with the umpire's call ("STRIKE ONE!", "STRIKE TWO!"), then a blazing heater: "STRIKE THREE! YOU'RE OUT!"; a blocked pitch is a foul ball |
| Marcus | Stage Dive | homing leap that crashes down (overhead), then a five-note bass jam |
| Vex | The City Is Mine | vanishes and steps out behind you (blockable cross-up), four cane strikes from both sides, then a shockwave slam |

## Fighting styles

Each fighter is a different archetype (`ARCH` in `src/game.js`), checked by `node tools/traits.js`:

| Fighter | Type | Health | Trait |
|---|---|---|---|
| Papa-Léguas | Rushdown | 92 | fastest dash, 4-hit chains |
| Vizor | Zoner | 104 | long reach: his normals hit 12% past his fist |
| Samson | Powerhouse | 106 | counter-hit kicks knock down |
| Zeke | High/low zoner | 100 | Spare: a blocked Strike Ball recharges his special to nearly ready |
| Hecky Xavier | Tech rushdown | 92 | parry: tap forward just as a hit lands (no damage, +meter); fast dash |
| Lawslie | Enforcer | 100 | no chip damage when blocking, and blocking builds meter; the smallest fighter (78 px, see Fighter sizes) |
| Devanté | High flyer | 104 | double jump, higher jump, quick feet |
| Keksan | Striker | 88 | Muay Thai shin kicks: kicks, sweeps and the jumping knee hit 15% harder |
| Estrella | Area control | 100 | her sound slows foes: anyone standing near her note or her Encore ring walks at 70% speed |
| Reyes | All-rounder | 92 | squad leader: starts every round with a third of his super meter |
| Paezano | Pitcher | 104 | high heat: every 3rd pitch in a row (or the first after he bats a projectile back) is a 98 MPH heater |
| Vex | The Boss | 110 | long cane reach; slow but hard to pin down (Vanish, and the cross-up super) |
| Marcus | Long-range | 104 | slowest walk and dash, longest reach (×1.4, a sound blast off his bass) but normals start 2 frames slower; hits that land on the beat do +25% (a ring pulses at his feet on every beat; the beat runs off the shared frame counter, so it's identical online) |

Reach is measured from each fighter's own sprite (`tools/hitboxes.py`); the archetype's `reach` multiplies it (Vizor 1.12, Estrella 1.05, Samson 1.05). Marcus uses the wider of his sound blast and his sprite.

Hecky has a second costume — an anthropomorphic fox — chosen with SELECT on the character select screen (`skin2` in his roster entry; sprites in `assets/fighters/heckyfox/`).

`tools/powers.js` checks each of these mechanics.

## Combo system

Combos are built from four tools (all checked with real button presses by `node tools/links.js`):

- **Chains:** a normal that connects can be followed by another (jab or low jab into jab, low jab, kick or sweep; up to 3, or 4 for Papa-Léguas).
- **Special cancels:** any grounded normal except the sweep can be cancelled into a special once it connects.
- **Links:** a normal that leaves the opponent in hit-stun long enough lets the next one start before they recover. A move links when its advantage on hit is at least the next move's startup + 1. The input buffer (7 frames, 11 on touch) holds a press made early, so links don't need frame-perfect timing.
- **Super cancel:** a special that connects (hit or block) can be cancelled into the super (forward + A+B) within half a second. A reeling opponent is held for the super's first hit.

Hitting someone during their attack's startup is a **counter-hit**: +20% damage and +8 frames of hit-stun, so a counter-hit kick links into another kick.

**High and low:** the low jab (down + A) and the sweep must be blocked crouching. The **overhead** (forward + A, a short leaping punch) must be blocked standing, and it links into a jab. Holding down-back no longer blocks everything.

**Frame data** differs per fighter (`FDATA` in `src/game.js`; `node tools/framedata.js` measures it in the game). Advantage is measured in frames; + means the attacker recovers first.

| Fighter | Jab (startup / on hit / on block) | Low jab | Kick | Overhead | Identity |
|---|---|---|---|---|---|
| Papa-Léguas | 3 / +5 / -3 | 3 / +3 / -4 | 6 / 0 / -9 | 13 / +6 / -3 | fastest buttons (3-frame jab and low jab) |
| Keksan | 4 / +5 / -3 | 4 / +3 / -4 | 7 / +2 / -9 | 14 / +6 / -3 | shin kick is +2 |
| Vizor | 4 / +5 / -3 | 4 / +3 / -4 | 7 / +2 / -7 | 14 / +6 / -3 | safer kick, no light links (zoner) |
| Samson | 5 / +5 / -3 | 4 / +3 / -4 | 9 / +6 / -8 | 16 / +6 / -3 | slow, but his big kick is +6 and links into a jab |
| Zeke | 4 / +5 / -3 | 4 / +5 / -4 | 8 / +1 / -9 | 14 / +6 / -3 | low jab links into itself |
| Hecky Xavier | 4 / +5 / -3 | 4 / +4 / -4 | 7 / 0 / -9 | 14 / +6 / -3 | low jab, low jab, jab chains |
| Lawslie | 4 / +5 / -2 | 4 / +3 / -3 | 7 / 0 / -7 | 14 / +6 / -3 | safest on block |
| Marcus | 6 / +3 / -5 | 6 / +1 / -6 | 9 / +2 / -11 | 16 / +7 / -5 | slowest buttons, longest reach |
| Devanté | 3 / +5 / -3 | 3 / +3 / -4 | 6 / 0 / -9 | 11 / +6 / -3 | fastest overhead (11 frames) |
| Estrella | 4 / +5 / -3 | 4 / +5 / -4 | 7 / 0 / -9 | 14 / +6 / -3 | low jab links into her jab |
| Reyes | 4 / +6 / -3 | 4 / +3 / -4 | 7 / +1 / -9 | 14 / +6 / -3 | jab is +6 |
| Paezano | 5 / +5 / -3 | 4 / +3 / -4 | 8 / +6 / -9 | 14 / +6 / -3 | heavy kick is +6 and links into a jab |

**Command normals and target combos (Tier 2).** Every fighter has a command normal on **back + A**, and a target combo: a kick that connects, then the button shown, which the normal chain rules don't allow. Both reuse the fighter's own animation frames (`CMD` and `TCM` in `src/game.js`).

| Fighter | Back + A | What it's for | Kick, then | What it does |
|---|---|---|---|---|
| Papa-Léguas | Double Jab | two quick advancing jabs | A: Légua Finish | three-punch flurry, the last knocks down |
| Keksan | Step Knee | launcher | B: Switch Kick | heavy second roundhouse, knocks down |
| Vizor | Palm Shot | long poke (74 px) | A: Rec Flash | camera flash, +9: links into his kick |
| Samson | Book Swat | anti-air | A: Sermon | overhead book smash, knocks down |
| Zeke | Ball Lift | anti-air launcher | B: Gutter Sweep | low, knocks down |
| Hecky Xavier | Short Upper | anti-air | A: Margin Call | glasses flash, +8: links into his kick |
| Lawslie | Straight Arm | long poke that shoves them away | A: Cuff Snap | cuffed: no specials or super for 2.8 s |
| Marcus | Bass Sweep | the longest low (72 px) | A: Feedback | blasts them across the screen |
| Devanté | Low Drive | advancing low | B: Posterize | leaping dunk kick, launches |
| Estrella | Stage Slam | low | A: High C | two-hit scream |
| Reyes | Breach | advancing punch | A: Salute | rising strike, launches |
| Paezano | Glove Swat | anti-air | A: Tag Out | glove tag, knocks down |

Trials mode teaches each fighter's tools: the basics, their bread-and-butter, an overhead link, their signature link (where they have one), their command normal, their target combo, and a super cancel. Every trial is cleared by `tools/links.js`.

Bread-and-butter combos (checked frame by frame by `tools/combos.js`):

| Fighter | Combo | Hits |
|---|---|---|
| Papa-Léguas | jab, jab, kick > Légua Rush | 6 |
| Keksan | jab, kick > Tiger Knee | 3 |
| Estrella | jab, kick > Siren Scream | 5 |
| Reyes | jab, kick > Frontier Knuckle | 3 |
| Paezano | jab, kick > Steal Home | 3 |
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
| Tiger Gym (Keksan) | Thai fight music (oboe-like lead, ching cymbals) over hard rock |
| Control Room (Vizor) | synthwave arpeggios and pulsing bass |
| Old Chapel (Samson) | church organ over hard rock |
| MoundWorks Field (Paezano) | stadium rock walk-up anthem: ballpark organ riff, stomp-stomp-clap drums |
| Sunset Outpost (Reyes) | 80s action-movie rock anthem: marching snare, brass fanfare, palm-muted guitars |
| Starlight Club (Estrella) | pop and R&B diva anthem: slap bass, claps, brass stabs and a soaring vocal-like synth lead |

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

Papa-Léguas has two looks. The default is his original sprite (`raw/karl`). The v1.37 redraw in Keksan's crisp style (`karl2` in `tools/pixellab/make_skin.py`, frames in `raw/karl2`) is his WHITE GI costume. A backup of the original packed assets and portraits is in `raw/karl_v1_assets/`. `tools/clean_karl_portrait.py` cleans his portraits: it removes a blue slab behind his fist and recolours the purple blob and halo on his hair to brown.

### Fighter sizes

`tools/pixellab/sizes.py` sets every fighter's standing height (idle pose, head to feet). It packs each fighter at native size, runs the post-pack fixes (Estrella's covered top, Reyes's olive gear), then shrinks to the target in `tools/pixellab/sizes.json`. Fighters listed under `upscale` may also grow past native size; that uses pixel duplication, never blur (only Papa-Léguas, 91 to 94 px).

- `sizes.py equal`: everyone at 91 px.
- `sizes.py adjusted` (shipped, the owner's picks): Paezano 95; Papa-Léguas and Marcus 94; Keksan 93; Samson, Devanté and Ivan 91; Zeke, Hecky, Estrella and Reyes 88; Vizor 86; Lawslie 78. Costumes follow their fighter (WHITE GI 94, Fox Hecky 94, Idol Zeke 88).
- `sizes.py lineup OUT.png`: draws everyone on one floor line.

Re-measure the hitboxes afterwards: `python3 tools/hitboxes.py`.

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

## Costumes

Press **SELECT** on the select screen to switch costume: **Fox Skin** (Hecky), **Idol Zeke** and **Teen Rocker** (Samson). A costume is a full second sprite set (`assets/fighters/<costume>/` plus portraits) that plays exactly like its fighter; set `skin2` and `skinName` on the fighter in `src/game.js`. PixelLab tools: `tools/pixellab/make_skin.py` (sprite), `moves.py` / `redo.py` (animations), `portrait.py` (portraits).

## Ivan, the story boss

Ivan "The Bear" (Sambo grappler) left the roster in v1.24.0 to make room for Keksan. Since v1.25.0 he's **the boss of the Docks** in story mode: Vex's enforcer, fought one-on-one with his full kit (Bear Slam, Iron Charge, the armored kick, Siberian Storm) and 15% more health. He isn't selectable (`STORY_FIGHTERS` in `src/game.js` loads fighters who aren't in `ORDER`).

## Online

**Co-op Story mode:** Online > HOST CO-OP STORY, then your friend joins with the code. See `STORY_MODE.md` (Online co-op).

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

### Home-screen icon

`python3 tools/make_icon.py path/to/picture.png` turns any picture (square works best) into `branding/icon-512/192/180/32.png`. Without a picture it draws the default (a pixel-art "BB" in the fire lettering over a bonfire). `tools/build.py` embeds the iPhone and browser-tab icons in `dist/index.html` and writes `dist/manifest.webmanifest` plus `icon-192.png`/`icon-512.png` for Android; ship them in the zip next to `index.html`.

On itch.io the game runs inside itch's page, so "Add to Home Screen" from the itch page uses itch's icon. Ours shows when the game is opened at its own address (itch's full-screen view, or anywhere the files are hosted directly).

### PC layout

On a computer with a mouse and a wide window the handheld shell is dropped and the game fills the window at 16:9 (384×216, `PC` in `src/game.js`, `html.pc` in `src/template.html`). It's scaled by a whole number when there's room (5× at 1080p), so pixels stay sharp. `?layout=pc` forces it; automated test browsers stay on the handheld unless asked (`LAYOUT=pc node tools/story.js`).

- Story mode draws natively at 384×216.
- Fights keep the 256×192 arena and continue each stage into the margins, fading toward the edges.
- Every other screen is 256×192 in a framed panel, with the logo on one side and the keys on the other.
- Keyboard: the PC fighting-game standard. WASD (or arrows) moves, `U` punch, `J` kick, `I` special, `K` focus/jump, `Esc` pause (back in menus), `Enter` start, `Tab` select. Menu hints name the keys ("U: OK  J: BACK"). During fights and Story mode a faint key guide (20% opacity) sits in the bottom corners, and each key lights up while it's held.

For itch.io, set the embed size to 16:9 (for example 960×540) and enable the fullscreen button in the game's settings (Edit game → Embed options); the game switches to the PC layout whenever its window is wide.

### Landscape (GBA style)

An experimental wide handheld (`html.land` in `src/template.html`): a 3:2 screen between the D-pad and the buttons. Off by default (the game is portrait); `?layout=wide` turns it on. Story mode draws 360×240 in it; every other scene keeps 256×192, centred on a 288×192 canvas.

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
