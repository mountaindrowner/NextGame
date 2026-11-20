# Changelog

## 1.16.3

- **Ivan toned down, still a top grappler:**
  - **Bear Slam:** reach 54 → 45 px, damage 17 → 14, cooldown 75 → 110 frames, and a whiffed slam recovers 10 frames slower, so it can be punished.
  - **Toughness:** damage reduction 22% → 10%. He keeps the most health (118) and stays the tankiest fighter, at about 130 effective health instead of about 145.
  - **Balance test** (CPU vs CPU, Hard): Ivan's win rate goes from 84% to 76%, now near Lawslie (66%) and Hecky (65%) instead of 20+ points clear.
- Story test autoplayer: holds position and faces its target when in range (it could dither against an enemy pinned at the screen edge).

## 1.16.2

- **Hitboxes a little more generous:** 6 px of margin around each fist or foot instead of 4. They're still measured per fighter, per move.
- **Marcus's long reach is now visible.** His hitbox runs past his fist or foot, so a pink sound wave now fills that gap on every punch and kick, standing, crouching or jumping. What you see is what hits.
- **Tighter punch boxes** where the fist sits close to the body (for example Hecky's jump punch): the box covers the fist, not the torso.
- All six attacks (jab, kick, low jab, sweep, jump punch, jump kick) were checked for every fighter with the hitbox view.

## 1.16.1

- **Hitboxes match the sprites.** Every fighter's punches and kicks are measured from their own animation frames (`tools/hitboxes.py` → `assets/hitboxes.json`):
  - **Reach:** each hit reaches to the actual fist or foot, plus 4 px.
  - **Height:** each hit covers the height band the limb really travels through.
  - **Strike frame:** the frame shown while a move is active is the fully extended one, so what you see is what can hit.
- **Hurtboxes match the bodies.** Every fighter used to be hittable only within ±15 px of their centre, while their visible bodies are ±18–28 px. A foot overlapping the visible body by up to 13 px whiffed; now it connects. Marcus keeps his extra-long reach (the sound blast at the tip of his attacks).
- **Fixed in Story mode:**
  - Kneeing a grabbed enemy until he dropped could leave him standing back up, unhittable, after the grab ended. A knocked-out enemy now always falls.
  - The test autoplayer turns to face enemies behind it.
- Balance re-checked: no fighter moved more than a few points.

## 1.16.0

- **The whole game runs 10% slower** (54 ticks a second instead of 60): every move, walk and jump is a touch heavier and easier to read. The round timer ticks a little slower too. Music and voices are unchanged.
- **Normals are less spammable:**
  - Jab and low jab recover in 10 frames instead of 8, and kick in 16 instead of 14.
  - **A normal that whiffs** (touches nothing, not even a block) recovers 3 frames slower, so mashing at nothing can be punished.
  - Combos still work, because chains and cancels happen on hit.
- **New character select screen:**
  - The full-size portrait, crisp at 1:1, in a spotlight of the fighter's colour (it was the small one, with empty space around it).
  - Fighter icons in one big row at 30 px each (they were 16 px).
  - The name logo at its native size, and an info box that fits its content.
  - Specials are labelled with the SP button: SP / DN+SP / BK+SP.
- **UI pass on every screen:**
  - The pause move list is roomier and hides the round timer behind it.
  - Long move names no longer run into their inputs.
  - Records has bigger icons and taller rows.
  - The story-card box fits its text.
  - The online help text sits inside its box.
  - Combo and trial hints use SP notation.
- `tools/text_audit.js` now also fails when two pieces of text overlap (224 screens checked).

## 1.15.1

- The handheld is now the **Dojo Boy Advanced**, on its printed logo and on the boot screen.

## 1.15.0

- **Four face buttons, one layout for both modes:** the handheld now has a classic diamond, with **A** punch, **B** kick, **SP** (top, gold) special and **JUMP** (bottom, blue).
  - **In fights:** JUMP works like up.
  - **In Story:** up and down move in depth and JUMP jumps, so A and B mean the same thing in every mode.
  - **Keyboard:** X/K punch, Z/J kick, C/L special, V/I jump.
  - **Gamepad:** A punch, B kick, Y/RB special, X/LB jump.
- **Story controls:** **B is a kick** (it finishes a combo, so A, A, B knocks down), and JUMP jumps (then A or B for a jump kick).
- **Fixed: twisted, wavy stage backgrounds** (Crossroads Dojo, Iron Gym and every other stage). The backdrop was being stretched 3% to hide the screen-shake edges, which doubled every 32nd pixel row and column and made straight lines kink and crawl. It's now drawn pixel-for-pixel, with a padded border for the shake.
- **Fixed: text running out of boxes.**
  - The story cards wrapped at 36 characters in a box that only fits 25.
  - Endings now roll fully up the screen; the last lines used to fall off the bottom.
  - Zeke's trait was too long for the select screen.
  - A semicolon the pixel font doesn't have was missing from the online menu.
  - New `tools/text_audit.js` draws 223 screens (every fighter on every screen) and fails if any text leaves the screen or its box, or uses a missing letter.
- **Stage Dive (Marcus's super) can't be blocked any more.** Blocking used to stop it for 3 chip damage, so against a guarding CPU it looked broken. To keep it fair it tracks the target a little less, so dashing away escapes it (walking doesn't).
- **Three new henchmen** (recoloured from the PixelLab ones, each with its own behaviour):
  - **Blade:** a fast goon who lunges in.
  - **Molotov:** throws bottles that leave fire burning on the floor.
  - **Enforcer:** a white-suited bruiser with more health and a quicker charge.
  - They appear from the Docks onward.

## 1.14.0

- **New: STORY mode, a side-scrolling beat 'em up** (first on the title menu). The night before the finals the Bonfire Bash trophy is stolen by **Vex**, the promoter who runs the city's underground. Pick a fighter and take it back:
  - **4 stages:** Bonfire Streets, The Docks, Vex Tower and Vex's Penthouse. The camera scrolls and locks for each wave, and a flashing GO / EXIT arrow appears when it's clear.
  - **Vex's gang**, three new PixelLab enemies with names over their health bars:
    - **Goons:** brawlers, in two colours.
    - **Slingers:** mohawked punks who keep their distance and throw bottles along their lane.
    - **Bruisers:** huge bouncers who shrug off every other hit and charge with a shoulder tackle.
  - **Fair crowds:** only two enemies attack at once; the rest circle and wait their turn, like the classics.
  - **Controls:** up/down moves in depth, A, A, A is a three-hit combo, B jumps (then A for a jump kick), SP is a desperation special that hits everyone around you for a little health, and FWD+SP with a full bar is your super. Walk into a dazed enemy to grab them: A knees, the third A (or BACK+A) throws them into their friends.
  - **Crates** hold pizza, chicken (health) or cash.
  - **Lives and score:** 3 lives, continues and a score.
  - **Bosses:** each stage ends in a one-round duel against a rival fighter Vex hired, picked at random. The final boss is **your own shadow**: a dark copy of your fighter with more health and harder hits.
  - **Story cards** between chapters, and your fighter's ending at the end.
- **2 Players (local, shared keyboard) is removed.** Online play is unchanged.
- New test: `tools/story.js`. An autoplayer clears every stage and checks the waves, enemies, boss hand-off and the shadow duel.

## 1.13.2

Playtesters found Zeke the hardest fighter to face, so this targets what makes him hard for a person: the high/low guessing game from range.
- **Split Shot is readable:** a pink landing marker with an arrow shows where the ball will drop from the moment it's thrown. It also comes out 4 frames slower, and its cooldown is 120 frames instead of 90.
- **No instant high/low switch:** throwing one bowling ball puts his other ball special on at least a 40-frame cooldown, so a low Strike Ball can't be followed straight away by an overhead Split Shot.
- **CPU Zeke throws a little less often**, but now actually alternates low and high the way a player would.
- **The balance test is more human:** CPU defenders now have to *read* high vs low in time. They guess more often when a move comes fast or they're under pressure, instead of always knowing which way to block.

## 1.13.1

- **Zeke nerfed a little:**
  - Strike Ball and Split Shot do 9 damage instead of 10.
  - **Spare** (a blocked Strike Ball) now cuts his cooldown to 25 frames instead of resetting it, so it's a fast reload, not an instant one.
  - Health is 100 instead of 104.
  - His jab, kick > Strike Ball combo still works.
- **New balance test:** `tools/balance.js` runs CPU-vs-CPU rounds for every matchup from both sides. It prints each fighter's win rate, a matchup table, average damage and round length.

## 1.13.0

Five fighting-game systems players and developers rate highest, filled in where the game was missing them:
- **Hit feel**
  - **Freeze scales with damage:** the hit-stop freeze is 6 frames for a jab, 8 for a kick, and up to 12 for big specials. Late hits in a long combo freeze for less.
  - **Three hit-sound weights:** light, medium and heavy. Each has a sharp crack at the start and a tail that gets deeper on heavy hits.
  - **Hurt reactions by where the hit lands:** high hits snap the head back, mid hits double the opponent over, low hits buckle the legs, and crouching opponents get jolted while staying crouched.
- **Hitbox view:** pause, then **HITBOXES: ON** draws every fighter's hurtbox (blue) and every hit check, including specials and projectiles (red).
- **Forgiving inputs**
  - **New SP button:** a gold button on the handheld (`C`/`L` on a keyboard, Y/RB on a gamepad) is A+B in one press. SP fires special 1, down+SP special 2, back+SP special 3 and forward+SP the super.
  - **Longer windows on touch screens:** an 11-frame button buffer (7 elsewhere) and a 6-frame A+B window. Online keeps the standard windows so both sides stay in sync.
- **Infinite protection:** if the same move lands for a 4th time in one combo, the game calls it a loop. The sparks turn blue and the defender can press A or B to **BURST** out: they recover, get a moment of invincibility, and the attacker is knocked back.
- **A CPU that plays like a person** (modelled on Capcom's Street Fighter 6 CPU design talk):
  - **Decks of moves:** the CPU now draws moves from situational "decks": anti-air, defend, punish, wake-up and close / mid / far range. Every fighter's tricks are cards in those decks.
  - **Reaction time:** it reacts to what it saw a moment ago, about 230 ms on Easy and about 130 ms on Hard.
  - **Mistakes:** it can fumble a special into a stray jab, and it fumbles more often when it's losing.
  - **New test:** `tools/ai.js` plays CPU-vs-CPU matches to check all of this.

## 1.12.0

Playtest fixes:
- **Rex is now called Marcus** (logo, announcer, select screen, ending and itch.io art).
- **Hecky Xavier is a TECH RUSHDOWN** now. He keeps his parry, and he gets the tools to get in:
  - **Hostile Takeover** dashes about 60 px forward into the uppercut and is **invincible for its first 9 frames**. It works as a gap-closer and as a reversal or anti-air. It's still punishable if blocked.
  - **Power Suit** is invincible while he flexes and recovers faster.
  - **Bigger hitboxes:** his punches and kicks reach 12% further and hit a 35% taller area. He also walks and dashes faster.
  - **Laser Glare** is better: it fires faster, the beam is thicker, it hits 3 times (the last hit knocks back) and it has a shorter cooldown.
- **Shutter Flash (Vizor) nerfed:** the flash fires later, so you can react to the reticle. It does 8 damage instead of 11, no longer knocks down, has a smaller target box and a longer cooldown.
- **Diminishing returns:** using the same special again within 5 seconds does 15% less damage each time (down to 55%).
- **Every special's cooldown is on the top bar now:** one segment per special under the health bar (orange = A+B, cyan = down + A+B, red = back + A+B). Each segment flashes when its special is ready.
- **Trials explain themselves:** "LAND EVERY HIT IN ONE COMBO", with the buttons for each move shown under it (JAB = A, KICK = B, SPECIAL = A+B, …).

## 1.11.0

- **Rex is now a LONG-RANGE fighter**: the slowest walker and dasher in the game, with the longest reach. Every punch and kick pushes a sound blast off the end of his bass (40% more reach), but his attacks start 2 frames slower. He keeps his beat trait: hits on the beat do +25%.
  - **Bass Drop** now sends twin shockwaves rolling along the floor *both ways* across the whole stage. They're low, so block crouching or jump them.
  - **Mic Check** is his combo ender: jab, kick > down + A+B.
  - CPU Rex plays keep-away: he pokes at the tip of his reach, zones with Bass Drop and backs off when you get close.
- **New character select song**: "Choose Your Fighter", a funk-rock track made with PixelLab. It replaces the old chiptune on the select screen, the online menu, the versus screen and Records.
- Vizor's trait now reads "LONG REACH" (Rex has the longest).

## 1.10.0

- **New fighter: Rex "The Low End"** — a crowned bass player from the Main Stage. Style: **RHYTHM** — hits that land on the beat do 25% more damage (watch the ring pulse at his feet).
  - **Bass Drop** (A+B): slams a power note and a low shockwave bursts out on *both* sides of him. Block it crouching or jump it.
  - **Mic Check** (down + A+B): shouts into his headset mic; the sound wave knocks enemy projectiles back at their owner and blasts the opponent across the screen.
  - Super: **Stage Dive** — a homing leap that crashes down on the opponent (overhead), then a five-note bass jam with an "ENCORE!" finish.
  - His own concert stage, song, voice, trials and ending.
- Eight-fighter select screen, intro, title, records and itch.io art.

## 1.9.0

- **Online multiplayer** — ONLINE on the title menu. One player picks HOST A GAME and gets a 4-letter room code; the other picks JOIN A GAME and types it in (or picks the letters with the d-pad). Both choose fighters on their own device (Hecky's fox costume works too), then fight. Rematch, back to character select, or leave the room after each match; the set score carries over.
- The fight runs directly between the two browsers (WebRTC). Both games simulate the same frames from the same inputs, with a small input delay set from the measured ping, so there's no host advantage. A "WAITING FOR OPPONENT" banner shows if the connection hiccups, and a dropped player returns the other to the online menu.
- A tiny matchmaking service (`server/worker.js`, a Cloudflare Worker) only swaps the connection details for a room code; rooms expire after 10 minutes and nothing else is stored.

## 1.8.0

- **Every fighter has their own super now** (forward + A+B with a full bar) instead of one shared flurry:
  - **Papa-Léguas — Mil Léguas:** dash in, then afterimage blinks through the opponent from both sides, 6 hits.
  - **Ivan — Siberian Storm:** an unblockable grab into three slams, side to side, the last one highest.
  - **Vizor — Full Exposure:** a reticle locks on wherever the opponent is on screen; five camera-flash shots.
  - **Samson — Final Sermon:** kneels in prayer while four pillars of light fall toward the opponent (overhead), then heals.
  - **Zeke — Perfect Game:** a giant bowling ball rolls through for four hits and a "STRIKE!" with flying pins.
  - **Hecky Xavier — Golden Parachute:** uppercut launch, a sustained eye laser keeps them in the air, then a gold-coin cash-out.
  - **Lawslie — Full Arrest:** charging grab, three taser zaps, a takedown, and the opponent stays cuffed for 8 seconds.
- CPU fighters use each super where it works (grabs up close, Vizor/Zeke/Samson from range).

## 1.7.2

- **Lawslie is smaller** — 20% shorter than before (now the shortest fighter at 5'3"), with the same attack reach as everyone else. Her smaller body is also a little harder to hit.
- **New voice for Lawslie** — a clearer, more assertive voice (Kokoro `af_heart`) instead of the breathy one.

## 1.7.1

- **Lawslie redrawn** — a sharper, higher-contrast sprite (clearer face, brighter uniform, crisp badge and handcuffs) with a fully regenerated move set, including a proper crouch.

## 1.7.0

- **Diego and Akira are retired** from the roster (with their stages, songs and voices) — seven fighters now. They're still in the git history if they ever come back.
- **Zeke's new trait, Spare:** when his Strike Ball is blocked it rolls back and his special recharges instantly (his old trait only mattered against Akira's shuriken).
- itch.io art, screenshots and GIFs updated for the seven-fighter roster.

## 1.6.0

- **New fighter: Officer Lawslie "The Law"** — an Enforcer from Precinct 9. **Taser** (A+B) fires short-range prongs on a wire; a hit stuns for three times as long as a normal hit, so you get a free follow-up. **Cuff 'Em** (down + A+B) is a lunging grab that goes through blocks and handcuffs the opponent: no specials or super for 5 seconds (cuffs and a timer show over their head). Super: **Full Arrest**. Trait: blocking costs her no chip damage and builds meter. Precinct 9 stage, cop-show funk song, voice, trials and ending.
- Nine-fighter select screen, intro, title, records and itch.io art.

## 1.5.0

- **The game is now called Bonfire Bash** — new title screen logo, boot and power-on screens, announcer ("Bonfire… Bash!"), ending, page title and itch.io art. (Saved records carry over.)
- **Hecky Xavier gets eye lasers: Laser Glare** (back + A+B) — his eyes flare red, then twin beams fire across the screen at head height for 2 hits. Crouch under it or block standing. Works in both costumes.
- Training dummy: new **CROUCH** setting.
- Back burner: beat 'em up idea parked in `IDEAS.md`.

## 1.4.0

- **New fighter: Hecky Xavier "The Closer"** — a smug technician in a white suit from the Penthouse. **Hostile Takeover** is a rising uppercut that launches the opponent for a juggle; **Power Suit** powers him up for 7 seconds (+25% damage, faster walk). Super: **Golden Parachute**. Stage, song, voice, trials and ending.
- **Costume 2: a fox.** On the select screen, press SELECT on Hecky to play him as an anthropomorphic fox in the same white suit (full animation set and portraits).
- **Every fighter has a fighting style now** — an archetype with its own health, movement and reach, plus a trait no one else has (shown on the select screen and pause menu):
  Papa-Léguas RUSHDOWN (fast dash, 4-hit chains) · Akira NINJA (double jump) · Ivan GRAPPLER (armored kick, most health) · Diego MIX-UP (ducks under high hits) · Vizor ZONER (longest reach) · Samson POWERHOUSE (counter-hits knock down) · Zeke HIGH/LOW ZONER (balls beat other projectiles) · Hecky TECHNICIAN (parry: tap forward as a hit lands).

## 1.3.0

- **New fighter: Zeke "The Strike"** — a bowling brawler from the Strike Lanes. **Strike Ball** rolls a bowling ball along the floor (low: block it crouching, and it knocks down); **Split Shot** lobs one in a high arc that drops on the opponent (overhead: block it standing). Super: **Perfect Game**. His own stage (a neon bowling alley), song, voice, trials and ending.
- Seven-fighter select screen, intro, title and records.

## 1.2.0

- **Real voices** — a recorded arcade announcer (rounds, "Fight!", "K.O.", "Perfect!", fighter names, "versus", results) and a voice for every fighter: they shout their specials and super, say a line when they win, and another when they lose. Made with Kokoro, an open-source voice model (`tools/voices.py`); the browser's robot voice is only a fallback now.

## 1.1.0

New features — the five most-loved fighting-game features from player and developer research:
- **2 Players** — local versus on one keyboard (P1: WASD + F/G, P2: arrows + K/L) or with gamepads; rematch menu and a running set score.
- **Super meter** — fills as you hit and get hit; forward + A+B with a full bar fires a cinematic super with a portrait cut-in and a 6-hit flurry. Each fighter has a named super.
- **Throws** — forward or back + B next to an opponent; press A or B as you're grabbed to break it. CPU fighters throw and break throws too.
- **Combo trials & input display** — three trials per fighter that check each hit of the combo, and an on-screen input history in Training and Trials.
- **Records, badges & unlocks** — wins, best combo and trials per fighter, 10 badges, a new color for every fighter whose arcade you clear, and a personal ending for each fighter.

Animation fixes: every move was checked against what it does and the mismatches were regenerated — real jump punches (Papa-Léguas, Akira, Ivan, Vizor, Samson), real jump kicks (Ivan, Samson), low kicks that kick low, crouch punches that stay crouched, crouches for Ivan and Diego that actually crouch, and clearer hit reactions.

Also: a version number on the title, options and pause screens.

## 1.0.0

Six fighters with two specials each, chain combos and special cancels, dashes, counter hits, Training mode, victory celebrations and a recorded song for every stage.
