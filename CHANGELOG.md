# Changelog

## 1.33.0

- **New fighter: Agent Reyes, "The Sentinel".** A patriotic agent of the Super Americas Border Regency (S.A.B.R.), made from the owner's art. He's the roster's **all-rounder**, and his kit is built from the classic all-rounder toolbox: a dashing punch, an anti-air uppercut, a zoning tool, and an air move.
  - **Frontier Knuckle (SP):** a dashing, flaming straight right that knocks down.
  - **Drone Strike (DN+SP):** he launches his SABR drone. It flies out ahead of him, hovers, and fires three aimed laser bolts, then peels off. Only one drone is out at a time. Estrella's Siren Scream can knock it out of the sky.
  - **Eagle Rise (BK+SP):** an invincible rising uppercut, two hits, his anti-air.
  - **Rotor Kicks (A+B or SP in the air):** a new kind of move, an air special. He hangs in the air flutter-kicking and floats up a little, hitting anyone close up to five times. It can be used once per jump.
  - **Super, Air Support:** a dashing knuckle. On a hit, his drone squadron flies in and strafes them, then Eagle Rise launches them for "MISSION COMPLETE!"
  - **Trait, Squad Leader:** he starts every round with a third of his super meter.
  - Health 92. Across the CPU-vs-CPU round robin he wins 57%.
- **His stage, the Sunset Outpost:** a desert patrol outpost at sunset, with mesas, a watchtower and flag, a radar dish, a patrol jeep, and drones parked on the helipad. His song is an 80s action-movie rock anthem.
- **His story:** he came to Bonfire City to shut down Vex's smuggling ring alone, trusting his drones more than people. Vizor gives up the route and becomes his spotter. Lawslie, who doesn't want the Regency kicking down doors in her city, becomes his partner. He turns down his transfer and stays with his new squad.
- **His voice:** announcer call, every special, the super, win and lose lines.
- **Records screen:** the fighter list fits eleven rows.
- **New tests** cover the leader meter, the knuckle knockdown, the drone's three bolts, Eagle Rise's invincibility and two hits, Rotor Kicks' float and hits, and the super.
- **PixelLab:** 85 generations (character 15, animations and retakes, stage 10, song). 9,288 left; the $0.07 credit wasn't touched.

## 1.32.0

- **Estrella's Grand Finale is a full stage show now.** Same hits and timing, so balance is unchanged:
  - **Lights down:** the stage goes dark and a spotlight drops on her, with glitter falling through it. A gold star spins up behind her.
  - **The big note:** coloured stage beams sweep the arena while she holds the note, mic glowing. An equalizer runs the whole floor and jumps on every beat.
  - **The rings:** each one is a thick glowing wave of sound in gold, pink, cyan or purple, with music notes riding it. Each has its own sung note, and notes stream off her mic between them.
  - **The finish:** the last ring is white-gold, with a big chord and a flash. "BRAVO!" pops up, then fireworks, confetti and a cheering crowd, and she takes it in with her win pose.
- **High Note:** a flash and gold burst at the mic as the note leaves. The note glows gold and pink, has two twinkles orbiting it, and leaves a sparkle trail.
- **Encore:** the ring lands with a burst. Every pulse drops a spotlight on it, sings a note, and throws equalizer bars and music notes up out of the floor. The ring itself is bolder.
- **Siren Scream:** glowing sound waves with a cyan and pink colour split, speed lines and a flare at the mic. The screen shakes on every hit, with cyan sparks where it lands.

## 1.31.1

- **Estrella's outfit is covered.** Her generated sprite had a cropped top that showed her midriff in most moves. In the crouching punch, her top even turned into a white crop top. Every frame now has her black top down to the belt, as in her first design.
  - `tools/pixellab/cover_midriff.py` does this. It finds the bare skin between her top and her gold belt, and repaints it in her top's black shades.
  - Frames the detector couldn't read were fixed by hand: the crouching punch, kicks, low kick, the glowing High Note frames, the knockdown and two jump punches.
  - It also covers her standing sprite, which the cutscenes use.
- Removed a white smudge and a dark blot that sat behind her legs when she's knocked down.
- No PixelLab generations used.

## 1.31.0

- **New fighter: Estrella, "The Voice".** A singer from the Starlight Club who fights with punches and kicks, mic in hand, and uses her voice for her specials. She's the game's **area controller**: she owns space instead of chasing you.
  - **High Note (SP):** a slow, bobbing music note that floats across the stage and lingers. Like a slow fireball in other fighting games, it's there to walk behind.
  - **Encore (DN+SP):** sets a ring of sound on the floor in front of her that pulses five times and hits low. It works like a trap or a set-play zone.
  - **Siren Scream (BK+SP):** a short cone of sound that hits 3 times and shatters incoming projectiles, so it doubles as her anti-air and her answer to zoners.
  - **Trait, "Her sound slows foes":** anyone standing near her note or her Encore ring walks at 70% speed.
  - **Super, Grand Finale:** a spotlight, then rings of sound roll out across the whole stage. The last ring knocks down.
  - Her bread-and-butter combo is jab, kick > Siren Scream (5 hits).
- **Her stage, the Starlight Club:** a concert stage under spotlights with a star sign and a crowd. Her song is a pop and R&B diva anthem.
- **Her story:** she left the chapel choir to sing in Vex's club, because he promised to make her a star. Marcus is her first rival (Vex says only one of them can headline his party), and Lawslie is her third (she saw what goes on backstage). In the end she turns down Vex's record deal and sings in the choir again.
- **Her voice:** announcer call, select line, specials, super, win and lose lines.
- **Balance:** across the CPU-vs-CPU round robin she wins 46%.
- **New tests** cover her traits (the note lingers, Encore's pulses, Siren's 3 hits, the scream shattering Zeke's ball, the slow walk), her super and her combo. The combo harness now holds back and forward, which Siren Scream (BK+SP) needs.
- **PixelLab:** 133 generations in all, including a first sprite that lost its detail at sprite size and was replaced by a sharper one holding the mic. 9,373 left; the $0.07 credit wasn't touched.

## 1.30.0

- **Teen Rocker Samson, version 2.** Long straight black hair parted in the middle, no bangs. The collar, gold-cross stole, band tee, ripped jeans, studded wristbands and holy book are unchanged.
  - Every animation and every portrait (full, card, grid and head icon) is new, and the new portrait has him in the roster's crossed-arms pose.
  - **His jump kick** is a proper airborne flying kick, and **his sweep** stays low with a swoosh.
  - I patched two frames that had artifacts: a smear bar on one punch frame, and a stray mark on one idle frame.
  - The old version with bangs is removed from the game.
- **PixelLab:** 79 generations for version 2 (base sprite 15, then animations, retakes and portraits 64). 9,506 left; the $0.07 credit wasn't touched.

## 1.29.0

- **Two new costumes:** on the select screen, press **SELECT** on Zeke or Samson to switch. Both keep their fighter's moves, stats and voice.
  - **IDOL ZEKE:** Zeke cosplaying a teal twin-tail pop idol, with a silver top and teal tie, a pleated skirt, boots and a teal bowling ball. His win pose is a wink and a heart.
  - **TEEN ROCKER (Samson):** a skinny teenage Samson with long black hair, the collar and gold-cross stole over a band tee, ripped jeans, studded wristbands and the holy book. He wins with a rock-concert fist.
  - Each has all 16 animations and its own select-screen portraits (full, card, grid and head icon), made from the costume sprite in the style of the fighter's original portrait.
- The select screen names the costume you're on ("SELECT: IDOL ZEKE", "TEEN ROCKER", "FOX SKIN").
- In story mode, your cutscene face matches your costume.
- **PixelLab:** 124 generations to finish both (30 more went on the proof sprites earlier). 9,585 left; the $0.07 credit wasn't touched.
- **New test:** every costume loads a full animation set and portraits, and plays as its fighter.

## 1.28.0

- **Every fighter has their own story.** Story mode now follows the fighter you pick:
  - **Why they're in it:** a personal talk with Samson at the chapel, about what they're carrying. Samson's own is a prayer about the boy he baptized forty years ago, now called Vex.
  - **Two rivals of their own,** chosen for the story instead of at random. Each is another fighter whose road crosses theirs. A face-off scene plays before each duel, and a turn after it. For example:
    - Keksan meets Papa-Léguas (whose father taught him his first kick), then Lawslie (who wants to arrest him for cage fighting).
    - Zeke has to face Vizor, who has the tape of him throwing the final.
    - Marcus faces his little brother Devanté.
  - **Their shadow knows them:** it taunts each fighter with their own temptation ("You loved the cage, Tiger. Admit it.").
  - **A personal epilogue,** and both rivals appear in the "one month later" scene.
  - Ivan is still the Docks boss for everyone.
- **Keksan:**
  - **New jump attack:** a real flying knee from his jump pose. It replaces the standing knee frames, and its reach went from 26 to 40.
  - **Third special, Teep (BK+SP):** a long Muay Thai push kick that shoves the opponent across the screen. Near a wall, they bounce off it into a juggle. He has a new voice line for it ("Teep!").
  - **Balance:** with Ivan out of the field and the Teep added, he was winning 63% of CPU vs CPU matches. His health went from 100 to 94, the Teep has a long cooldown, and he's now at 56% over 224 rounds.
- **PixelLab:** 10 generations (the Teep, plus two flying-knee takes). 9,709 left; the $0.07 credit wasn't touched.
- **Tests:**
  - New story checks: every fighter has a complete arc, the rival face-off leads into the duel, and the post-duel scenes lead into the next chapter.
  - The text check covers every fighter's scenes (1,113 screens).
  - New trait checks for the Teep and its wall bounce.

## 1.27.0

- **New main menu.** The plain list of eight options is now a fighting-game style menu:
  - **Grouped, slanted buttons** on a dark panel: **PLAY** (Story, Arcade, Versus CPU, Online), **PRACTICE** (Training, Trials) and **MORE** (Records, Options). Each group has its own colour, and the highlighted button slides out and lights up.
  - **An info card** for the highlighted mode, with a pixel icon and a one-line description. The icons are a book, a trophy, two fists, a spinning globe, a training dummy, a star, a medal and a turning gear.
  - The **featured fighter** from the title screen stands bottom right, the logo runs across the top, and an "A: OK  B: BACK" hint sits at the bottom.
- The text check covers every menu item (947 screens).

## 1.26.0

- **New attract intro.** It no longer squeezes every fighter into thin slices:
  1. "Nine fighters. Nine styles. One champion."
  2. A **spotlight for each fighter** in turn: their own stage behind them, a band in their colour with speed lines, the big portrait sliding in, their logo, nickname and style, and their in-game sprite in its victory pose. The announcer calls each name.
  3. A **group shot**: all nine in-game fighters on stage in two rows, with the BONFIRE BASH logo slamming in.
- **New title screen.** The crowded row of nine portraits is gone. **Two fighters at a time** face each other on the left one's stage, celebrating and then standing ready, and the pair changes every few seconds. When the menu opens, they frame it. The version tag sits at the bottom centre.
- The text check covers the whole intro and every title pairing (939 screens).

## 1.25.0

- **Ivan is back, as a story boss.** He's Vex's enforcer and the boss of the Docks, every run. You fight him one-on-one with his full kit: Bear Slam, Iron Charge, the armored kick and Siberian Storm. He has 15% more health than normal and his Iron Gym theme. He still isn't on the roster.
  - **New face-off scene** at the end of the pier: "Back home I fought for medals. Here I fight for rent. It is nothing personal, little one."
  - **Chapter 3 opens with his turn.** "You had me down. Why did you stop?" "I came here to free people. That includes you." Vex holds his passport, so Ivan sends the dock workers home himself.
  - **One month later:** Ivan got his passport back and stayed. He teaches wrestling to dock kids for free.
  - **Credits:** he gets his own line, "THE BEAR, WHO SENT THEM HOME".
- The other two story duels are still random rivals. The Docks level plays the Iron Gym song again.
- **Under the hood:**
  - The game now loads fighters who aren't on the roster but appear in the story (`STORY_FIGHTERS`).
  - Ivan's assets are back in `assets/`.
  - His move tests are restored.
  - The story test checks the Docks hand-off: the scene, then the duel, with a boosted Ivan who isn't on the roster.

## 1.24.0

- **Keksan replaces Ivan.** Ivan "The Bear" has left the roster, and Keksan takes his slot, second on the select grid. The roster is back to nine and the grid back to 3×3.
  - Ivan is gone from arcade ladders, story bosses, versus, training, trials and online.
  - His art, song and voice lines moved to `assets_retired/ivan/`, which isn't bundled, so the game download is 2 MB smaller. His kit code stays in the game, so he can come back with a two-step restore.
- **Online safety:** if an opponent on an older version picks Ivan, the pick is ignored instead of crashing the match.
- **Odds and ends:**
  - The story's bruiser fallback sprite is now Samson.
  - The Docks level plays Zeke's song instead of Ivan's.
  - The trials dummy is Papa-Léguas (Vizor when you play him).
- **Tests:** Samson is now the stand-in opponent. The Ivan-only checks are gone, and the online test expects Keksan as the second pick.

## 1.23.0

- **New fighter: Keksan "The Tiger"**, a Muay Thai fighter from the Tiger Gym, made from the owner's character art. He's the first **STRIKER**: shin kicks, so his kicks, sweeps and jumping knee hit 15% harder.
  - **Normals:** a spinning shin roundhouse for his kick, and a jumping knee as his jump attack.
  - **Tiger Knee** (SP): a leaping flying knee. It clears low attacks, works as an anti-air, and launches on a hit for a juggle.
  - **Thai Clinch** (DN+SP): a short-range command grab that goes through blocks. Three knees in the clinch, and the last shoves them away. It leaves him open if it whiffs.
  - **Super, Eight Limbs:** he dashes in, then lands eight strikes with fists, knees, elbows and shins, and finishes with a flying knee that launches.
  - **Made for him:**
    - A PixelLab sprite with 16 animations.
    - Portraits cut from the supplied art.
    - The **Tiger Gym** stage: a ring, heavy bags and lanterns.
    - A Thai-fight-music-meets-rock theme.
    - Voice lines, trials and an ending.
- **Balance:** his first version won 71% of CPU vs CPU matches, so I toned it down before release. Power went to 1.0, shin kicks from +20% to +15%, Tiger Knee from 11 to 10, and the clinch knees from 5/5/9 to 4/4/8 with a longer cooldown. He now wins 53–56%, mid-pack.
- **10-fighter roster** on the select screen (a 3×4 grid), records, story bosses and itch.io art.
- **PixelLab:** 80 generations, out of the 110 budgeted. Voice lines are local (Kokoro: a blend of two voices, so he sounds like nobody else).

## 1.22.0

- **Vex is real now.** He has his own PixelLab character: silver hair, a purple pinstripe suit and a gold-handled cane, with walk, cane strike, cane slam, hurt, fall, kneel and taunt animations.
  - **He's the boss of the penthouse.** After his last wave of men, he steps in himself. He has a boss bar, cane strikes, armour, and a slam that sends a shockwave along the floor (jump it). Beaten, he kneels and his men run.
- **Two new henchmen (PixelLab):**
  - **Chain:** a green-mohawk punk with a bike chain and the longest reach of any henchman.
  - **Kicker:** a street kickboxer with a flying side kick.
  - Both appear from Stage 1 on.
- **No two henchmen look alike.** Every spawn gets its own size (up to "BIG"), separate shirt and trouser colours, a cap, beanie or bandana, sometimes shades, and sometimes a pipe, bat or knife.
- **Weapons you can use:** a henchman drops his weapon when knocked down. Walk over it to pick it up, swing it with A for more reach and damage, and it breaks after 8 hits (12 for a knife).
- **Cinematic cutscenes:** scenes are now acted out on the stage. The real characters walk in, Vex taunts with the trophy in the rain, your shadow fades in beside you, and Vex kneels. The dialogue box shows the speaker's face. New scenes:
  - Samson at the chapel in the prologue.
  - The penthouse confrontation.
  - "One month later": the city at dawn.
- **The story is about saving the city.**
  - The prologue shows a city living in fear.
  - Samson's charge: "Go for the people, not for revenge. Hate can't drive out hate."
  - Each chapter shows the city taking hope back: the dock workers walk off the job, and word spreads.
  - The end: Vex gives everything back and becomes Victor, and the city wakes up.
- **The spared man keeps his look:** the one you help up comes back in the cutscenes with the same size, colours and hat.
- **PixelLab:** 91 generations, out of the 160 budgeted. 9,829 left; the $0.07 credit wasn't touched.
- **Tests:**
  - `story.js` plays all 4 levels (including the Vex fight), every scene, the ending and the credits. It also checks henchman variety and the weapon drop, pickup and break.
  - The text check covers every scene beat (788 screens).

## 1.21.0

- **Online lobby.** ONLINE > LOBBY lists everyone who's online right now, marked READY or BUSY.
  - Challenge anyone who's ready. They see a pop-up ("A CHALLENGER!") and have 20 seconds to accept.
  - When they accept, the match connects by itself: no codes to read out.
  - Names are two random words (IRON TIGER, HUMBLE FALCON...). They're unique in the lobby, and the top row gives you a new one. There's no typing, so there's nothing to moderate.
  - Room codes are still there (HOST / JOIN WITH A CODE) for playing a specific friend.
- **Phones can play online now.** Phones on mobile data often can't make the direct browser-to-browser link that matches used. Now, if the direct link isn't up within 7 seconds, the match runs through the server instead (a WebSocket relay). If a direct link drops mid-match, the relay takes over without a disconnect. The select screen shows DIRECT or VIA SERVER, and the ping.
- **Fixed:** with a slow answer from the server, the host could flip back from "connected" to "connecting" and stall on the select screen.
- **Fixed:** the select screen footer could run off the screen with the costume button and the ping both showing. The ping moved under the opponent's name.
- **Server:**
  - `bonfire-bash-net` now has a Lobby Durable Object (migration v2), kept in memory only, plus the relay inside each Room.
  - **Deployed.**
- **Tests:**
  - New `tools/lobby.js`: two browsers meet in the lobby, rename, challenge, accept and play a full match. It passes on the live server over both the direct link and the forced relay (`RELAY=1`).
  - The text check covers the lobby screens (736 screens).

## 1.20.0

- **The story is told in real scenes now.** The text cards are gone. Each chapter opens with a title card, then a dialogue scene: your fighter's portrait on the left, whoever you're facing on the right, name tags, typed text, and a King James verse to close it. START skips a scene.
  - **Vex** is a black silhouette with burning red eyes until the very end.
  - **Your shadow** shows up as a dark copy of your own portrait before the final duel.
- **New scenes:**
  - **Prologue:** Vex takes the trophy and names his price. Your answer: "I'm not for sale."
  - **Chapter 2:** the man you spared finds you. He tells you where the trophy went, then asks about the Old Chapel.
  - **Chapter 3:** Vex radios to offer the easy elevator. You take the stairs.
  - **Final chapter:** "All you have to do is kneel." "No."
  - **The shadow reveal** now plays after Vex's last men fall, right before the duel.
- **A mercy moment you play:** at the end of Stage 1, the last man standing doesn't get knocked out. He drops to his knees and begs. Walk up and press **A: HELP HIM UP** (+2000). He's the one who finds you in chapter 2, under his own name.
- **A proper ending:**
  1. After the shadow falls, Vex kneels and waits for the last blow. You press **A: OFFER YOUR HAND**.
  2. Sunday morning at the Old Chapel: the trophy back on the altar, Samson, the man you spared in the front row, and Vex, who now goes by his real name, Victor. "All my life I said every man has a price. I was right. Mine was paid for me."
  3. Luke 15:24, then a **credits roll**: the cast, the rivals you beat, Vex's men, your final score, and THE END.
- **New badge: REDEEMED** (clear story mode). A story clear still unlocks your fighter's new color.
- Tests:
  - The story test now plays through every cutscene, the mercy moment, the ending choice and the credits.
  - The text check covers every scene beat and the credits for all 9 fighters (727 screens).

## 1.19.0

- **New character select screen in two steps:**
  - **Browse:** the right side is a big **3×3 grid of fighter cards** (portrait crops, much larger than the old icon row). The left shows the highlighted fighter's portrait with their name, fighting style and SPD/PWR/DEF bars. Left/right moves along a row, up/down between rows.
  - **Press A for the full card:** the portrait shrinks to the corner and the details take the screen. It shows style, origin, type, height and weight, the trait, every special with its button, the super's name, and stats. **A** confirms, **B** goes back to the grid.
- The text check now covers both views for every fighter (286 screens).

## 1.18.0

- **Story mode is now a gritty Christian story.** Vex doesn't just steal the trophy; he tempts ("every man has a price"). You help up a beaten goon instead of finishing him, take the narrow stairs instead of the easy elevator, refuse to kneel for the whole city, and face your own shadow: every grudge and sin you've carried. The ending is mercy: you spare Vex, and by Sunday he's in the front pew of the Old Chapel.
- **A King James verse on every story card:** John 1:5, Luke 19:10, Matthew 7:14, Ephesians 6:12 and Luke 15:24.

## 1.17.1

- **Kai is now Devanté** (logo, announcer, select screen, ending and itch.io art).

## 1.17.0

- **New fighter: Kai "The Crown"**, a streetball player from the Courts. He's the first **HIGH FLYER**: the only fighter with a **double jump** (press up/JUMP again in the air), plus a higher jump and quick feet.
  - **Bounce Pass** (SP): a basketball that bounces across the screen. On a hit it rebounds to Kai, and catching it recharges the move almost instantly.
  - **Ankle Breaker** (DN+SP): a low crossover dribble straight through the opponent. If he crosses a grounded opponent, their ankles break: a long stumble with Kai behind them.
  - **Super, Fast Break:** a dribble drive that pops the opponent into the air, then an alley-oop **slam dunk** into the floor.
  - His own PixelLab sprite and moves, a streetball court stage with crown graffiti, a boom-bap song, Kokoro voice lines, trials and an ending.
- Nine-fighter select screen, records, story bosses, title and itch.io art. Roster cards use SP notation.

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
