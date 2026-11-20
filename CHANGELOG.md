# Changelog

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
