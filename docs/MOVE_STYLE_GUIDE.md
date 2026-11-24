# Move style guide

Every fighter has the same set of basic attacks. A player who learns one fighter should know what to expect from all of them:
**a low kick always looks like a low kick, a high kick always looks like a high kick.**

Each fighter keeps their own look and fighting style (karate, Muay Thai, boxing, a bass guitar, a cane, a basketball…).
What has to stay the same is **where the hit goes, how the body moves, and when it lands.**

Check any fighter against this guide with `python3 tools/move_standard.py [fighter]`.

## Heights

Heights are measured as a share of the fighter's standing height. The floor is 0 and the top of the head is 1.

| Band | Height | Body part |
|---|---|---|
| **Low** | 0 – 0.25 | ankle and shin |
| **Waist** | 0.3 – 0.55 | hips and stomach |
| **Chest** | 0.55 – 0.75 | chest and shoulders |
| **Head** | 0.75 and up | head, and above it |

## The basic attacks

"Blocked" means how the opponent must block the hit. This follows Street Fighter:
- **Mid:** can be blocked standing or crouching.
- **Low:** must be blocked crouching.
- **Overhead:** must be blocked standing.

| Move | Input | Must look like | Strike height | Body | Blocked |
|---|---|---|---|---|---|
| **Standing punch** (`punch`) | A | A quick straight punch, arm fully out | chest–head | standing | mid |
| **Standing kick** (`kick`) | B | A **high kick**: the leg swings up and out, nearly straight | chest–head | standing on one leg | mid |
| **Crouching punch** (`cpunch`) | down + A | A punch from a **low stance**: knees deeply bent, body lowered, fist straight forward | waist–chest | lowered | low |
| **Low sweep** (`lowkick`) | down + B | A **low kick along the floor**: the kicking foot at ankle or shin height, the body low | low | lowered | low, knocks down |
| **Jumping punch** (`airpunch`) | A in the air | A punch thrown forward or down from a jump, legs tucked | in front of the body | in the air | overhead |
| **Jumping kick** (`airkick`) | B in the air | A flying kick: one leg driven forward or down, nearly straight. Keksan's flying knee counts. | the lower half of the jumping body | in the air | overhead |
| **Overhead** | forward + A | A short hop with a punch coming down. Uses the jumping punch art. | — | short hop | overhead |

## Combo strings

A chain is the same button pressed again right after a hit. Each hit in the chain has its own art, and **each step must look clearly different from the one before.**

| Move | Chain | Must look like | Strike height | Blocked |
|---|---|---|---|---|
| **Second punch** (`punch2`) | A, A | A heavier straight punch (a cross), stepping in | chest–head | mid |
| **Uppercut finisher** (`punch3`) | A, A, A | An **uppercut**: dip low, then the fist rises up past the chin. Elbows and rising hooks count. | rises to the head or above | mid |
| **Second kick** (`kick2`) | A, A, B | A **body kick** that is a real kick: a roundhouse, side kick or push kick, the leg extended | waist–chest | mid |
| **Kick finisher** (`kick3`) | A, A, B, B (and the Brawl launcher) | A **rising** strike: a high kick or a jumping knee | chest–head | mid |

**Chain timing (1.64.0, as in Street Fighter):**
- The next hit of a string starts only once the last hit's active frames are over. That makes chained hits about 14 frames apart.
- The finisher (`punch3` / `kick3`) ends the string. It hits harder, shoves the opponent away, and doesn't chain into anything. It can still be cancelled into a special or super.
- The next press after the finisher starts a fresh string with a jab.

## Rules for every attack

1. **One strike, one limb.** The fist or foot doing the hitting is clearly visible and clearly extended on the strike frame. Every frame has exactly two arms and two legs. A prop (cane, bass, book, ball) may be held, but it must not hide the striking limb. When the prop *is* the weapon (Vex's cane, Marcus's bass), the strike must still land at the right height.
2. **Hit frame = strike frame.** The frame the game counts as the hit (`pk`) is the frame where the limb is furthest out (highest, for an uppercut).
3. **Start and end in guard,** so moves chain smoothly.
4. **Stay on model.** Same face, outfit and colours as the idle pose. No stray pixels.
5. **Effects are optional.** Swooshes, sparks and rings may decorate a move, but the body must hit the right height without them. A swoosh at waist height doesn't make a sweep.

## What each fighter may change

- **Martial style:** a karate front kick, a Muay Thai roundhouse, a boxing cross, a police baton. Any of them fits, as long as the height and body position match the table.
- **Props and costume details.**
- **Speed, reach and damage**, through each fighter's frame data. These are balance numbers, not looks.

## How new art is made (PixelLab)

- Use PixelLab's built-in motions where they exist: `punch`, `high kick` and `uppercut`. They are more reliable than written descriptions. Built-in uppercuts come out as real uppercuts, while written descriptions of uppercuts kept coming out as straight punches.
- Generate the **low sweep** from the fighter's crouch frame ("from a low crouch, kicks the front leg forward low along the ground…"). Don't use the `swoop kick` motion: it draws a swoosh at waist height.
- After packing, run `tools/move_standard.py` and `tools/anim_audit.py`, then look at the strip.

## Audit (1.62.0)

Every fighter's hit frame for every move was checked by eye, side by side. The checked strips are recorded in `tools/move_review.json`. `python3 tools/move_standard.py` reports **OK** for checked strips, **MISS** for known gaps, and **NEW** for anything changed since it was checked. Recreate the comparison sheets with `--sheets=DIR`.

✓ meets the standard · **F** fixed in 1.61.0 from art we already had · **N** new art in 1.62.0 · ✗ known gap

| Fighter | punch | punch2 | punch3 (uppercut) | kick (high) | kick2 (body) | kick3 (rising) | cpunch | lowkick (sweep) | airpunch | airkick |
|---|---|---|---|---|---|---|---|---|---|---|
| Karl | ✓ | ✓ | **N** | ✓ | ✓ | **F** | ✓ | **F** | ✓ | ✓ |
| Keksan | ✓ | ✓ | ✓ elbow | ✓ | ✓ | **N** knee | ✓ | ✓ | ✓ | **F** knee |
| Vizor | ✓ | ✓ | **N** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Samson | ✓ | ✓ | ✓ | ✓ | **N** side kick | ✓ knee | ✓ | **F** | ✓ | ✓ |
| Zeke | ✓ | ✓ | **N** | ✓ | ✓ | **N** | ✓ | **F** | ✓ | ✓ |
| Hecky | ✓ | ✓ | **F** | ✓ | ✓ | ✓ | ✓ | **F** | ✓ | ✓ |
| Lawslie | ✓ | ✓ | **N** | ✓ | ✓ | ✓ knee | ✓ | **N** | ✓ | ✓ |
| Marcus | ✓ | ✓ | ✓ | ✓ | **N** | ✓ | ✓ | **N** | **N** | ✓ |
| Kai | ✓ | ✓ | **N** | ✓ | ✓ | **N** | ✓ | **N** | **N** ball slam | ✓ |
| Estrella | ✓ | ✓ | **N** | ✓ | **N** | ✓ | ✓ | ✓ | ✓ | **N** |
| Reyes | ✓ | ✓ | **N** | ✓ | ✓ | ✓ knee | ✓ | ✓ | ✓ | **F** |
| Mateo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **F** | ✓ | ✓ |
| Vex | ✓ cane | ✓ cane | ✗ cane jab | ✗ knee lift | ✗ knee lift | ✗ cane step | ✓ cane | ✓ cane sweep | ✓ | ✓ |
| Karl (gi) | ✓ | — | — | ✓ | — | — | ✓ | **F** | ✓ | ✓ |
| Zeke (idol) | ✓ | — | — | ✓ | — | — | ✓ | **F** | ✓ | ✓ |
| Hecky (fox) | ✓ | — | — | ✓ | — | — | ✓ | **N** | ✓ | ✓ |
| Samson (teen) | ✓ | — | — | ✓ | — | — | ✓ | **N** | ✓ | ✓ |

Costumes (—) use the base fighter's combo art. Vex keeps his old-man cane style by the owner's choice. His four gaps can be redone later with `tools/pixellab/standard.py vex ...`.

Generating the art (`tools/pixellab/standard.py`):
- **Uppercuts:** use PixelLab's built-in `uppercut` motion, 1 generation per take.
- **Sweeps:** start from the fighter's crouch frame.
- **Kai:** his ball kept turning moves into dribbles. His kick finisher uses the built-in `high kick` motion, and his jump punch starts from a jump frame with the ball erased (`raw/kai/jump_noball`).

## Later: frame data standard (to do)

Every move already has startup, active and recovery frames (`ATK` in `src/game.js`, with per-fighter overrides in `FDATA`). `node tools/framedata.js` measures each move's advantage on hit and on block. What's still missing is a standard for them, the way this guide sets one for how moves look:

- **Ranges per move type.** For example, every jab starts up in about 4 frames, and every sweep is slow and unsafe on block. Fighters may differ only within a range, and only on purpose (a rushdown fighter is faster, a heavy fighter is slower).
- **Art that matches the timing:**
  - The wind-up plays during startup.
  - The fully extended frame shows during the active frames.
  - The return to guard plays during recovery.
  - Today the new uppercuts squeeze their dip-and-rise into the jab's 4 startup frames.
- **Advantage rules:** which moves are plus or minus on block, which links work, and a check that flags any fighter that falls outside the ranges.
