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

## Audit (1.61.0)

Every fighter's hit frame for every move was checked by eye, side by side. Recreate the comparison sheets with `python3 tools/move_standard.py --sheets=DIR`.

✓ meets the standard · **F** fixed in 1.61.0 using art we already had · ✗ needs new art

| Fighter | punch | punch2 | punch3 (uppercut) | kick (high) | kick2 (body) | kick3 (rising) | cpunch | lowkick (sweep) | airpunch | airkick |
|---|---|---|---|---|---|---|---|---|---|---|
| Karl | ✓ | ✓ | ✗ straight punch | ✓ | ✓ | **F** hit frame | ✓ | **F** low sweep | ✓ | ✓ |
| Keksan | ✓ | ✓ | ✓ elbow | ✓ | ✓ | ✗ knee too small | ✓ | ✓ | ✓ | **F** flying knee |
| Vizor | ✓ | ✓ | ✗ straight punch | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Samson | ✓ | ✓ | ✓ | ✓ | ✗ removed (3 legs) | ✓ knee | ✓ | **F** low kick | ✓ | ✓ |
| Zeke | ✓ | ✓ | ✗ straight punch | ✓ | ✓ | ✗ waist height | ✓ | **F** low kick | ✓ | ✓ |
| Hecky | ✓ | ✓ | **F** uppercut | ✓ | ✓ | ✓ | ✓ | **F** low kick | ✓ | ✓ |
| Lawslie | ✓ | ✓ | ✗ straight punch | ✓ | ✓ | ✓ knee | ✓ | ✗ waist-high swoosh | ✓ | ✓ |
| Marcus | ✓ | ✓ | ✓ | ✓ | ✗ bass swing, no kick | ✓ | ✓ | ✗ waist-high | ✗ no punch | ✓ |
| Kai | ✓ | ✓ | ✗ ball, no punch | ✓ | ✓ | ✗ dribble step | ✓ | ✗ waist-high swoosh | ✗ dribble, no punch | ✓ |
| Estrella | ✓ | ✓ | ✗ straight punch | ✓ | ✗ knee lift | ✓ | ✓ | ✓ | ✓ | ✗ legs tucked |
| Reyes | ✓ | ✓ | ✗ no uppercut | ✓ | ✓ | ✓ knee | ✓ | ✓ | ✓ | **F** hit frame |
| Mateo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **F** low kick | ✓ | ✓ |
| Vex | ✓ cane | ✓ cane | ✗ cane jab | ✗ knee lift | ✗ knee lift | ✗ cane step | ✓ cane | ✓ cane sweep | ✓ | ✓ |
| Karl (gi) | ✓ | — | — | ✓ | — | — | ✓ | **F** low sweep | ✓ | ✓ |
| Zeke (idol) | ✓ | — | — | ✓ | — | — | ✓ | **F** low kick | ✓ | ✓ |
| Hecky (fox) | ✓ | — | — | ✓ | — | — | ✓ | ✗ waist-high swoosh | ✓ | ✓ |
| Samson (teen) | ✓ | — | — | ✓ | — | — | ✓ | ✗ waist-high | ✓ | ✓ |

Costumes (—) use the base fighter's combo art.
