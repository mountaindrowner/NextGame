# Changelog

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
