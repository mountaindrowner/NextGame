# OHMFRONT — Art Style Guide

> **ART DIRECTION CHANGED 2026-06-13 → HD top-down.** Mark moved the target
> from Gen 3 GBA to a higher-fidelity HD style, matching creator-owned
> cattle-town art in `assets/reference/cattle-town/` (rural/western tileset +
> object atlas + example map). The Gen-3 rules below are **superseded** and
> kept for history. **HD spec, confirmed 2026-06-13:**
>
> - **Native resolution:** **480x320** (3:2), integer-scaled (x2 -> 960x640,
>   x3 -> 1440x960). Keyboard on PC, virtual d-pad on touch.
> - **Tiles:** **32x32**, Tiled-authored.
> - **Palette:** **full color** (the <=16-color cap is dropped). Cohesive
>   per-area palettes; soft top-down lighting + cast shadows like the
>   reference. Sprite toolkit gains N-step ramps + anti-aliased edges.
> - **Ohms:** **full HD rework** of all 48 (and the ~108 to come). Battle
>   fronts move to **96x96** (3x a tile, 1.5x the old 64), richer shading,
>   anti-aliased outline. Done in batches; the engine shows the new sprites
>   once the resolution bump lands.
> - **Source need:** to embed the creator's environment tiles 1:1 the engine
>   needs grid-aligned source exports (the supplied PNGs are scaled
>   showcases). Until then I author HD tiles to match the reference.
>
> Migration steps tracked in HANDOVER.

---

## Art direction — depth & density (LOCKED 2026-06-14, binding)

The bar is **Pokémon-era / HD top-down**, never **NES-era flat tilemap**.
A finished screen should read as a *lived-in place* — materials you can name,
light that models form, and a dense, varied set of things in it. Two laws.
Both apply to **every area we build, from now on, no exceptions**, and they
apply retroactively to anything that still looks flat (the Field is on the
upgrade list).

### Law 1 — Every texture has depth and says what it is

No flat fills. Every drawn thing — each tile, each prop — is modeled, not
colored in.

- **Three values minimum per material:** highlight / base / shadow (the
  `gridart` `Grid.box(hi, base, shadow)` rule, or hand-placed equivalent).
  Key materials get a 4th–5th step or an emissive accent.
- **Material identity is mandatory.** The texture must *read as the thing*:
  wood shows grain + plank seams; steel shows panels, rivets, a spec
  highlight; rock shows crags + cracks + speckle; cobble shows individual
  offset stones + mortar; crystal shows faceted shards with a lit and a
  shaded face; water shows depth (dark base) + surface glints. If you can't
  tell a tile's material with the labels off, it isn't done.
- **Consistent light: top-left.** Highlights on top/left edges, shadow on
  bottom/right, contact shadow under anything that sits on the ground.
- **Glow is light, not a brighter pixel.** Emissive props (cores, lamps,
  crystals, screens) cast an *additive radial light* onto their surroundings
  (see `glow()` in `gen-underground.ts`); they illuminate the scene.
- **Break the grid.** Never let two tiles meet on a hard 32px seam. Use
  edge/transition treatment: the rock↔floor crumble pass, shorelines, rugs,
  scattered rubble, worn paths.

### Law 2 — Every area ships a large, diverse asset set

Diversity is what separates "Pokémon town" from "one grass tile repeated."
Before an area is called done it must include, at minimum:

- **≥3 variants of every ground and wall tile** (seeded), so tiling never
  visibly repeats across a screen.
- **A themed prop library of ≥12 distinct objects** for the area — furniture,
  machines, containers, debris, flora, light sources, signage, clutter —
  placed densely enough that **no screen is empty**.
- **≥3 decal/scatter layers** sprinkled over the base (cracks, stains, moss,
  pebbles, cables, leaves, puddles) to kill uniformity.
- **At least one hero focal asset** per area (the Ohmstead monument; a
  landmark machine, statue, sign, or fixture elsewhere).
- **Multi-layer where it earns it:** animated overlays (sway, water flow,
  glow pulse) on top of the baked base, per the world-animation direction.

### Per-area "done" checklist (paste into each area's builder header)

```
[ ] ground tile  ≥3 seeded variants, material-readable, 3+ values
[ ] wall/border  ≥3 variants + organic edge treatment (no hard seams)
[ ] prop library ≥12 distinct themed objects, each shaded (hi/base/shadow)
[ ] decals       ≥3 scatter layers over the base
[ ] lighting     emissive props cast additive glow; light from top-left
[ ] hero asset   ≥1 focal landmark
[ ] density      no empty screens; spot-check at native 480×320
[ ] motion       animated layer(s) where the area calls for it
```

### Anti-patterns (an area with any of these is not done)

- A single ground tile repeated edge to edge.
- A flat color rectangle standing in for a wall, floor, or water.
- A prop that's one solid fill with an outline (no internal shading).
- Hard 32px seams visible where two materials meet.
- A screen with three props in it and the rest bare floor.

Reference: Ohmstead (`tools/gen-underground.ts`) is the current worked
example of both laws — copy its tile-variant + glow + edge-crumble + dense-prop
approach when building the next area.

---

## SUPERSEDED — original Gen 3 GBA guide (history)

*Submitted 2026-06-13 (superseded same day by the HD pivot).*

## The law (GDD §12, non-negotiable)

Exactly golden-era Gen 3 GBA, every part. 240×160 native, integer-scaled,
landscape. Battle sprites 64×64, ≤16 colors including transparency, entry
animation only. Overworld 16×16 tiles, Gen 3 proportions. Hoenn-grade craft
translated to sun-bleached Texas ruin.

## Palettes

Master ramps in `palette_ramps_v1.png` (top to bottom): **caliche** (bone
whites/tans), **rust** (oranges into oxblood), **ember** (glow whites into
fire), **steel** (warm greys), **mesquite** (dusty greens), **sky**
(heat-haze creams into dusk). Five steps each.

- Every sprite palette is built from these ramps plus at most 2 accent
  colors; ≤16 total including transparency.
- The world reads *bleached*: midtones dominate, true black never appears —
  the darkest value is a warm near-black (`#2a1c14` family).
- VERDANT and hive-touched things may break warmth with one cold accent;
  that contrast is reserved meaning, spend it deliberately.

## Outlines & lighting

- **Light source: top-left, always.**
- Dark outline on every silhouette edge, in the sprite's own darkest ramp
  step, never pure black.
- **Sel-out:** inside edges facing the light lift one ramp step; edges in
  shadow sink into the outline. No outline between two touching dark areas.
- Dither sparingly: 2×2 checker only, for large flat metal or sky-bounce on
  chassis. Never on faces/readable details.

## Proportions & posing

- Battle: Ohmlets occupy ~26–36 px of the 64 canvas, mid stages ~40–52,
  finals/Ohmega ~56–64. Grounded near the canvas bottom (stage feel), 3/4
  or front-facing, weight visible — these are heavy machines.
- Function first: every Ohm reads as its object in silhouette before any
  face is added. Faces are minimal — lights, grilles, lenses doing double
  duty (EM-residue lore: the object stays true to what it was).
- Overworld 16×16: Gen 3 head-heavy proportions; object identity carried by
  the top half; ≤8 colors.

## Reference set (this gate's deliverables)

| Asset | What to judge |
|---|---|
| `ohm_charkit_battle_v1.png` | starter weight, ember-glow accent rules, tread texture |
| `ohm_toastlet_battle_v1.png` | chrome ramp use, face-from-function (slots glow) |
| `ohm_filaglow_battle_v1.png` | emissive object handling, glass vs. metal base |
| `ohm_*_overworld_v1.png` ×3 | 16×16 readability of the same three |
| `tileset_field_strip_v1.png` | caliche dirt, dry/tall grass, road, rubble, debris, fence, garage pad |
| `palette_ramps_v1.png` | the six master ramps |

Every asset ships with a `.prompt.txt` sidecar (generation provenance,
master-prompt §18.5). Approved files are never overwritten — revisions bump
`_v2`, `_v3`.

## Pipeline (locked)

**Interim pipeline (2026-06-13):** Mark asked Claude to generate the sprites
for now (Chajipudi later). Sprites are authored with the **sprite toolkit**
(`tools/spritekit.ts`, run via `npm run gen:sprites`): hue-shifted ramps,
shaded primitives (sphere/rounded-rect with Lambert + bevel), 4×4 Bayer
dithering, automatic outline + sel-out, rim light, contact shadow, and a
hard ≤16-color check per sprite. The generator emits PNGs to
`public/sprites/ohms/`, a `.prompt.txt` provenance sidecar per asset, and
`src/data/sprite-manifest.ts` (which species have art) that the battle and
overworld scenes preload from — missing species fall back to tinted
placeholders. Designs are original (style homage to Gen 3 / Arc Raiders /
Digimon energy, never traced; IP guardrails §15.2). Production order: the
slice set (started — starters + Field wilds + player) → Act I → outward.
