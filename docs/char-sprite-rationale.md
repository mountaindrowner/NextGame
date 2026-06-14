# OHMFRONT — Character Sprite: Thinking & Rationale (for refinement)

*A transparent log of how the NPC/character sprite was built — the constraints I
started from, every decision and trade-off, the pixel-level reasoning, what's
deliberately a first pass, and a prioritized refinement backlog. Worked example:
**SAL** (`char.principal.sal`). Code: `tools/assets/char.ts`. Wiring:
`src/scenes/FieldHDScene.ts`. Spec: `docs/npc-sprite-spec.md` →
`docs/npc-pipeline.md`.*

---

## 0. The brief I was solving

"Build a character NPC" under three hard facts:
1. **I can't paint raster art.** Every sprite must be *drawn in code*.
2. **It has to match the world.** The buildings/tiles are made with the grid
   method on one shared limited palette; characters must share that DNA.
3. **It has to actually move in-engine** — four facings, a walk cycle — not be a
   static picture.

So the real problem wasn't "draw a person," it was "design a *system* that turns
a character's description into an animated, engine-ready sprite, reusable for
~100 NPCs." SAL is the first instance that proves the system.

---

## 1. Constraints I inherited (before any pixels)

- **Who/look** from `principal-cast.md`: SAL is a Vane, newly of age, an ordinary
  scavenger — not a hero by temperament. Reads as a kid in salvage gear.
- **Rig** from `npc-sprite-spec.md`: protagonist = **RIG-PC** → needs `walk`,
  `run`, and a `back` battle sprite; four facings **S/N/W, E mirrored**; walk =
  3 frames `0,1,0,2`; run = 3 faster frames; `asym` only if a one-sided prop.
- **Style law** from `style-guide.md`: material depth (highlight/base/shadow),
  top-left light, our limited palette, no NES-flat fills.

## 2. First decisions — the reconciliation (what I changed and why)

The spec is written for Gen-3 (16×32, ≤16 colors, hand-drawn). We're HD + grid
method. I translated rather than obeyed literally:

| Spec (Gen-3) | What I chose | Why |
|---|---|---|
| 16×32 cell | **20×32** | our `human()` builder is ~18 wide; 20 gives elbow/cap headroom and an even center column at x=10 |
| ≤16 colors/sprite | shared **limited palette** | cohesion with the world beats a per-sprite palette; the cap is a non-issue at our scale |
| hand-drawn frames | **`drawChar()` generator** | I can't draw; code is the only path, and it makes 100 NPCs tractable |
| 64×64 `vs`/`back` | deferred | not needed to walk around; battler portraits are a later batch |

**Decision I'm least sure about:** 20×32 is small. It's faithful to Gen-3 overworld
scale and keeps the world cohesive, but it caps how much character detail/expression
is possible. Flagged in §8.

## 3. The data model — why a `CharSpec`, not a drawing per NPC

The biggest leverage decision. Instead of drawing SAL, I described him as data:

```ts
scavenger('r','R') → {
  hair:'r', hairDk:'R',        // brown
  shirt:['h','j','J'],         // olive jacket: hi / base / shadow
  pants:['m','u','U'],         // denim
  cap:'goggle', capCol:'a',    // scavenger goggle-cap
  bandana:true, ponytail:false // red neckerchief
}
```

Then **one** `drawChar(spec, dir, frame, run)` consumes any spec. Consequences:
- **WREN is SAL with two fields changed** (`hair:'y'`, `ponytail:true`). The whole
  12-person cast is the `scavenger()` helper + a list of specs.
- Future NPCs cost a *line of data*, not a drawing.
- Trade-off: a generic builder can't do bespoke silhouettes (a hunchbacked elder,
  a one-armed merc) without new `spec` knobs. I accepted "broad coverage now,
  bespoke later via flags."

## 4. The drawing methodology — layer-by-layer, and the per-direction reasoning

`drawChar` builds the figure **back-to-front**, the way you'd block a real figure:
contact shadow → legs+boots → torso → arms → head → hair → headgear → 1px outline.
Proportions are deliberately **Pokémon-ish**: big head (~8px), slim torso, ~2.7
heads tall, so it reads as a person at 20px, not a realistic doll.

The hard part is that **a facing is not a rotation — it's a different drawing.** I
authored three distinct head/body constructions:

- **S (down / front):** full face — skin block, shaded right cheek, the **big
  Pokémon eyes** (`rect(7,7,2,2,'X')` ×2 with a `*` catchlight), tiny mouth. This
  is the "hero shot," most expressive.
- **N (up / back):** *no face.* The head becomes a solid hair block with a hint of
  nape skin. Counterintuitive but correct — from behind you see hair, not eyes.
  This is what makes "walking away" read.
- **W (left / profile):** a *narrower* head (7 wide vs 8), a **single eye** near
  the front, a nose/jaw bump at the leading edge, hair swept to the back (right).
  The torso narrows too (6 wide). Hardest to read at this size.

Per-feature decisions worth refining:
- **Bandana:** drawn at the neck for S/N; as a back-fluttering tail for W. A
  deliberate touch so the profile isn't featureless.
- **Goggle-cap:** crown + brim; goggles only drawn on the brim in S (they'd be
  noise in profile).
- **Depth:** every block uses `box(hi,base,shadow)` (top-left lit), and a final
  `outline('X')` gives the dark Gen-3 silhouette edge.

## 5. Animation — the walk/run math

The cycle is just legs+arms shifting per frame. `stride(frame)`:

```
frame 0 → [0, 0, 0]    neutral stand (also the idle frame)
frame 1 → [1,-1, 1]    front leg down/forward, back leg up, arms swing
frame 2 → [-1,1,-1]    mirror
```

Those offsets nudge the leg rectangles' `y`/length and the arm `y`. Played
`0,1,0,2` it's the classic 4-step Gen-3 loop on 3 unique frames. **Run** reuses the
poses with a forward `lean` and a longer stride (`big`), at 11fps vs 7. Idle =
hold frame 0 of the current facing.

## 6. Packing + the contract

- `sheet(spec, run)` renders all **3 dirs × 3 frames** into one **60×96** PNG —
  columns = frames, rows = S/N/W — the exact layout `npc-sprite-spec.md §5`
  mandates.
- `<id>.anim.json` is the **contract for the engine**: cell size, `asym:false`
  (SAL mirrors E from W), and play orders (`walk 0,1,0,2 @7`, `run @11`). The
  engine never guesses timing.

## 7. Output + runtime wiring

- **Library copy:** `assets/sprites/principal/sal/char.principal.sal__walk.png`
  (+`__run`, +`.anim.json`) — organized by the spec's naming.
- **Runtime copy:** `public/world/char/sal_walk.png` (Vite only serves `public/`).
- **Engine** (`FieldHDScene`): preload as a *spritesheet* (frame 20×32);
  `makeWalk()` builds `sal_walk-s/-n/-w` from frame lists `[0,1,0,2]/[3,4,3,5]/
  [6,7,6,8]`; `step()` maps `up→n,down→s,left/right→w`, **flips X for right**
  (E=mirror W), plays the anim during the move tween, settles on the idle frame.

---

## 8. Honest weaknesses (this is a first pass)

1. **Scale ceiling.** 20×32 limits face/expression; SAL reads as "a kid in gear,"
   not a *specific* kid. Distinguishing 100 NPCs at this size will lean on palette
   + headgear + props more than facial identity.
2. **The W profile is the weakest frame.** The single-eye head + narrow torso is
   legible but a bit stiff; feet/legs can read chunky mid-stride.
3. **Walk stride is subtle** (±1px). Good for tiny sprites, but the motion is gentle;
   run helps but could push the lean harder.
4. **No N-facing identity.** Backs of heads look similar across same-hair NPCs
   (intended, but means hair/cap silhouette is doing all the work from behind).
5. **Arms are simple rectangles** — no hands-detail or held items yet; `asym` props
   (Odessa's slate, a Warden's ledger) aren't implemented, only stubbed in the plan.
6. **No idle-life.** NPCs hold a single frame; no breathe, blink, or facing-the-player.
7. **Bandana/accessory placement is hand-tuned per direction** — fragile if I add
   more accessories; would benefit from a cleaner per-direction anchor system.

## 9. Refinement backlog (prioritized — the point of this doc)

**A. Cheap, high-impact**
- [ ] Bump face contrast/identity: a 2-tone hair shape per NPC, distinct cap
      silhouettes, a signature accent color each (palette-led identity).
- [ ] Strengthen the W profile: redraw the head with a clearer brow/nose, fix the
      mid-stride foot overlap, add a 1px back-of-hair shadow.
- [ ] Add **idle-facing-the-player** for map NPCs (pick facing by player position)
      + an optional 2-frame breathe for principals (spec already allows it).

**B. Identity & detail**
- [ ] Per-NPC distinguishing prop in the silhouette (Boone's hat brim, Odessa's
      slate, the scrapper's pry-bar) — implement the **`asym`** path so one-sided
      props author E separately and don't jump sides.
- [ ] Hands: 1–2px hand-detail and the ability to hold a tool that reads in profile.
- [ ] Push run: bigger lean + stride + arm bend so running feels distinct.

**C. Coverage the spec still wants**
- [ ] **Battler `vs` sprites** (64×64-ish front portraits) for trainers/Wardens.
- [ ] Player **`back`** sprite for battle.
- [ ] **Special poses** (`__knit`, `__rant`, `__salute`, `__glitch`…) for the
      quirky locals and the Militant puppet-tell.
- [ ] Generic-class recolors + per-colony **Warden's Hand** palette variants.

**D. System hygiene**
- [ ] A per-direction **anchor map** so accessories place consistently instead of
      hand-tuned offsets.
- [ ] Decide a possible **scale bump** (e.g., 24×40) if Mark wants more facial
      identity — trade: bigger sprites vs cohesion with 32px tiles.

## 10. Open questions for Mark

1. **Scale:** keep the faithful-small 20×32, or bump to ~24×40 for more character
   identity (changes every sprite + the in-world footprint)?
2. **Identity strategy:** lean on palette/silhouette/props (cheap, scalable) or
   invest in bespoke per-principal detail (expensive, ~19 principals)?
3. **SAL/WREN look:** does the scavenger kit (goggle-cap + red bandana + olive
   jacket + denim) match your mental image, or should the presets restyle?
4. **`vs` battler portraits:** do trainer fights need a portrait now, or after the
   colony maps are populated?
