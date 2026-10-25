# OHMFRONT — Regions & Sections

*2026-10-25. Mark's direction (approved): the world is built in **regions**,
each a **web of separate maps** (every road and town its own map, Octopath
style), joined by a **quick dissolve**. Moving **between regions** goes through
a **travel space** that implies time and distance. This replaces the
continuous seamless overworld of 2026-10-23. Names and layouts below are
`[PROPOSAL]` unless marked otherwise. Sketch:
`assets/reference/region1_railhead_country_sketch.png` (source
`tools/worldmap/region1-sketch.html`).*

---

## The rules

1. **A region is a web, not a line.** Every town has 2–4 ways out. Every
   region has at least one loop, so you can come back a different way.
2. **Every box is its own map.** A town, a road, a dungeon, a side spot.
   Each has its own name, look and wild Ohms.
3. **Every road is somewhere.** 3–5 screens long, 1–3 side pockets (items,
   a trainer, a rare-Ohm nook), and often a fork to a dungeon or side spot.
   No filler stretches.
4. **Dungeons and side spots hang off roads** as dead ends. Field abilities
   (SHEAR, BREACH, HAUL, LUMEN) open them later, so there's a reason to come
   back.
5. **Edges are natural:** cliffs, dense trees, water, broken ground. No walls
   of trees around every box.
6. **Names pass the tired-local test** (`docs/design/world-gazetteer.md`).

**Sizes** (one screen ≈ 18 × 15 units): towns ~2 × 2 screens; roads 3–5
screens long, 1.5–2 wide; side spots 1–2 screens; dungeons are their own
interiors with 2–5 floors.

---

## Transitions

| Moving… | What happens |
|---|---|
| **Between sections in a region** | Walk into an exit at the map's edge → a quick **pixel dissolve** (about 0.25 s out, 0.25 s in). You arrive at the matching edge of the next map, facing the same way. A small name tag (*FARM ROAD*) shows for ~1.5 s every time you enter. |
| **Into a town, first time** | The big title card the game already has (*RAILHEAD — the crossroads trade-town*). |
| **Between regions** | Through a **travel space**: a short, scenic, walkable map on the region's edge (the On-Ramp for this region), quiet, with few or no wild Ohms. At its far end comes a **travel card** (~2–3 s): the world map with a dotted line drawing from this region to the next, and one line of text (*"Half a day north."*). Then the new region's title card. `[PROPOSAL]`: the clock moves on during the trip (leave at noon, arrive at dusk). |
| **Fast travel (later)** | Skips the travel card. |

Each section loads on its own and fast (under a second); the engine preloads
the neighbours in the background.

---

## Region 1 — Railhead Country *(working name)*

*Name options: **Railhead Country** (locals name the district after its junction
town) · the Pastures · the Old Ranches.*

**3 towns · 7 roads · 4 dungeons and side spots · 1 travel space** = 15
sections, plus interiors (Ohmstead, houses, Railhead's buildings).

| Section | Kind | Connects to | What's there |
|---|---|---|---|
| **Ohmstead** | home (underground) | the Field (lift) | the Bench, the market, home. Built. |
| **the Field** | town | Ohmstead · Farm Road · Depot Road · Stockyard Lane | the dead cattle town, the Co-op Vault, the first captures. Built. |
| **Farm Road** | road | the Field · the Pickett Place · the Breaks | the cotton gin, the climbable water tower, first trainer battles. Built (short; to be lengthened). |
| **the Breaks** | side spot | Farm Road | broken ground off the road's west side; a dead end with a SHEAR-gated rare-Ohm nook. New. |
| **the Pickett Place** | town (small) | Farm Road · the Grain Line · the Creek Road | an old ranch where one family stayed topside: a healer, a shop, a reason people still live up here. Grows out of the "old homestead" stretch. New. |
| **the Creek Road** | road | the Pickett Place · Stockyard Lane | along Mule Creek through cottonwoods: the east side of **the loop** back to the Field. New. |
| **Stockyard Lane** | road | the Field · the Stockyards · the Creek Road | east out of the Field past the pens. New. |
| **the Stockyards** | side spot | Stockyard Lane | cattle pens and a slaughterhouse ruin; HAUL the fallen gates; heavy herd Ohms (canon, `wider-world.md`). New. |
| **Depot Road** | road | the Field · Ohm Depot | west out of the Field. New. |
| **Ohm Depot** | dungeon (optional) | Depot Road | the hardware-warehouse mega-dungeon; LUMEN for the back stock (canon). New. |
| **the Grain Line** | road | the Pickett Place · Railhead · the Grain Tower | the old rail line north, boxcars on the siding. Grows out of the "grain line" stretch. New. |
| **the Grain Tower** | dungeon | the Grain Line | the grain-elevator dungeon (Act I content per the GDD; called "Tower" so it isn't confused with Ohmstead's Elevator). New. |
| **Railhead** | colony | the Grain Line · the Roundhouse · Drive-In Road · the On-Ramp | Colony 1, the market, Warden Marrow. Built. |
| **the Roundhouse** | dungeon (trial) | Railhead | the Rail Yard / Roundhouse trial (canon). New. |
| **Drive-In Road** | road | Railhead · the Drive-In | east out of Railhead. Later, a washed-out bridge (HAUL) links it to the Creek Road as a shortcut. New. |
| **the Drive-In** | side spot | Drive-In Road | the ruined drive-in; LUMEN runs the projector; night-only event (canon). New. |
| **the On-Ramp** | travel space | Railhead → the Rust Mile | the climb onto the dead interstate; quiet, wide sky; ends in the travel card. Grows out of the "interstate approach" stretch. New. |

**The loop:** the Field → Stockyard Lane → the Creek Road → the Pickett Place →
Farm Road → the Field. **Later shortcut:** the Creek Road ↔ Drive-In Road over
the washed-out bridge (HAUL).

**Edges:** west toward Sundog (not reachable yet; the Breaks is as far as you
get); east toward Brownwater; north out through the On-Ramp only.

### What happens to what's built

| Built now | Becomes |
|---|---|
| the Field, Farm Road, Railhead | the same maps, as separate sections; Farm Road gets longer and gains the Breaks fork |
| "the old homestead" stretch | the Pickett Place |
| "the grain line" stretch | the Grain Line |
| "the interstate approach" stretch | the On-Ramp |
| the Rust Mile | moves to region 2 |

### Build order `[PROPOSAL]`

1. **Engine:** separate-section mode as the default, the pixel dissolve, the
   name tag, matching edge exits, the travel card.
2. **Convert what exists:** the Field, Farm Road, the Pickett Place, the Grain
   Line, Railhead, the On-Ramp.
3. **New roads:** Stockyard Lane, the Creek Road, Depot Road, Drive-In Road,
   the Breaks.
4. **Dungeons and side spots:** the Grain Tower first (it's Act I), then the
   Roundhouse, then the optional ones.

---

## The other regions (outline)

About 15 sections each, ~100 in all plus interiors, which meets the 150–200
map target in `scope-benchmarks.md`.

| # | Region (working) | Colonies | Main pieces |
|---|---|---|---|
| 1 | Railhead Country | Ohmstead, Railhead | above |
| 2 | the Rust Mile country | the Cistern | the Rust Mile + side roads, the rental-car lot, the trailer-park nest, the Aquifer Deeps |
| 3 | the quarry hills | Bastion | the Furrows, quarry roads, the Vein |
| 4 | the military line | Redoubt | the Military Road, the Bunker, Site C |
| 5 | Brownwater bottoms | the Chancel | the Drowned Woods, the Bog Shrine, river crossings |
| 6 | the Red Flats | Redbed | the Flats, the Boneyard, Paygate |
| 7 | the city's edge | the Array, the Verge | the Stack, Cold Storage, the Outer Ring → New Central |

## Open questions

1. Region 1's name.
2. The Pickett Place is new: a family living topside. OK to add?
3. Canon disagrees on gating: CLAUDE.md says **SHEAR** gates Region 1, while
   `critical-path-locations.md` says the only hard gate on the main path is
   **HOVER**. Which holds?
4. The Rust Mile's "Hertz Lot" uses a real company's name. It needs an
   invented one (IP rule).
