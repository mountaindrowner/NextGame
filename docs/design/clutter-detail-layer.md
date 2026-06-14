# OHMFRONT — Clutter, Detail & Set-Dressing Layer (the "lived-in" pass)

*The decoration layer laid **over** finished base maps so every space reads as cluttered, worn, and inhabited — never an empty tilemap. This is set dressing, not structure: the base tiles (Asset Bible) build the room; this layer fills it with mess, wear, personal junk, and depth. Governed in the same style — IDs, labels, and rules so the right clutter lands in the right place and never blocks the player.*

**Global style prefix** (prepend to any look line to form a generation prompt):
> *"GBA Gen-3 Pokémon Ruby/Sapphire decoration sprite, ≤16 colors, dark outline, small scatter object on transparent background, top-down ¾ view: "*

---

## 1. LABELS & RECORD (every dressing asset carries these)

| Field | Values |
|---|---|
| **`id`** | `clutter.<cat>.<name>` · `dressing.<area>.<name>` · `fx.<name>` |
| **`kit`** | `clutter.universal` · `clutter.wall` · `clutter.fx` · `dressing.<area>` |
| **`plane`** | **the depth layer** — `floor` (under player) · `object` (midground) · `occluder` (walk-behind, over player) · `fx` (topmost) |
| **`layer`** | derived: floor→bottom · object→object · occluder→top · fx→top |
| **`collision`** | `pass` (default) · `solid` (big piles only) · `mask` |
| **`biome`** | suited contexts (`prairie urban quarry flooded forest interior underground industrial sacred military data red_hardpan`) or `multi` |
| **`density`** | tiers it appears at (see §3) — `lived_in cluttered squalid ruined` etc. |
| **`anim`** | `null` or `{frames,fps}` (flies, flicker, drift) |
| **`phase`** | `slice · act1 · act2 · act3 · optional · postgame` |

Record example:
```json
{ "id":"clutter.trash.paper_scatter", "kit":"clutter.universal", "plane":"floor",
  "collision":"pass", "biome":"multi", "density":["lived_in","cluttered","squalid"],
  "anim":null, "phase":"slice",
  "gen_prompt":"scattered torn paper scraps and a crushed flyer on the ground, ≤16 colors" }
```

---

## 2. THE DEPTH & LAYERING SYSTEM (how clutter creates depth)

Dressing is composited in **four planes**, bottom to top — this is what turns a flat map into a deep one:

1. **FLOOR plane** *(below player, bottom layer, always `pass`)* — grime, stains, cracks, puddles, scattered small litter, tracks, wear paths. Grounds the space and breaks up clean tiles.
2. **OBJECT plane** *(midground, object layer; `pass` or `solid`)* — physical clutter the player moves around or behind: boxes, crates, tools, furniture extras, piles, plants. Can cast a shadow.
3. **OCCLUDER plane** *(top layer, over the player, `pass`)* — the depth-maker: hanging cables, pipes, beams, awnings, laundry lines, foliage, signage, overhangs the player passes **behind**. Always pair big occluders with a floor shadow.
4. **FX plane** *(topmost overlay)* — dust motes, drifting trash, embers, steam, fog wisps, light shafts/god-rays, lamp/screen glow pools, edge vignette/grime. Ambient life and atmosphere.

**Rule of three for depth:** a space feels deep when it has something on **all** of floor + occluder + fx, not just object-level props. Empty-feeling rooms are usually missing the occluder and fx planes.

---

## 3. DENSITY TIERS & SCATTER LOGIC (how to make it "full" but believable)

**Density tiers** — every map is assigned one; it sets how much dressing to scatter:
- **`bare`** — almost none (a swept shrine, a sterile clean-room). Rare.
- **`tidy`** — light, deliberate (a cared-for home, a Warden's office).
- **`lived_in`** — the default for inhabited spaces; clutter in the natural spots.
- **`cluttered`** — heavy mess (workshops, markets, raider dens, refugee camps).
- **`squalid`** — overrun (abandoned interiors, the worst slums).
- **`ruined`** — debris-dominated (dead buildings, Dallas, dungeons).

**Scatter logic — where clutter accumulates (so it reads real, not random):**
- **Against walls & in corners** (clutter pools at edges, not centers).
- **Along desire lines** — wear/grime where feet actually travel (doorways, between bench and door).
- **Under and beside furniture** (a mug by a chair, boxes under a table).
- **Around work/use points** (tools at the Bench, cans by a console, offerings at an altar).
- **In neglected edges** (back corners, behind machines — the heaviest mess).
- **Reclamation creeps inward from edges** (weeds, vines, water damage start at the perimeter).

**Keep-clear (anti-rules):** never scatter on **interactables**, in **doorways/chokepoints**, or on the **critical walking path**. `solid` clutter must never seal a required route. Dressing decorates; it never gates.

---

## 4. UNIVERSAL CLUTTER LIBRARY (any biome, biome-filtered)

**Floor litter & trash:** torn paper/flyers, crushed cans, bottles (whole/broken), jars, ration wrappers, cardboard, rags, twine, bottle caps, screws/bolts/washers, wire offcuts, cigarette/ash stubs, broken glass shards, splinters, spilled gravel, leaves, dust bunnies, a lone dropped glove/sock/boot.

**Stains & wear (floor + surfaces):** water stains, oil/grease slicks, rust bleed, scorch/soot marks, mold/algae patches, dried spills, mud smears, bleached sun-faded patches, worn-thin floor patches, grime rings, chalk/paint marks, tally scratches.

**Cracks & damage:** floor cracks (hairline→split), broken/missing tiles, chipped concrete, pothole, exposed dirt, exposed rebar/brick, peeling paint/wallpaper, dents.

**Water & damp:** puddles (still/rippling-fx), drips from above, damp dark patches, condensation streaks, a leaking pipe stain, mud tracked in.

**Tracks & marks:** boot prints, tire/bike tracks, drag marks, scuffs, hand-smudges on walls, claw/scrape marks.

**Scattered objects (object plane):** crates/boxes (stacked/toppled/open), sacks, barrels, buckets (upright/tipped), coils of rope/wire/hose, a toolbox (open/closed), loose tools (wrench, pry-bar, hammer), tarps, pallets, a stool/crate-seat, a propped ladder, a tipped chair, a cart.

**FX overlays (fx plane):** dust motes, drifting embers, floating trash/leaf, steam puffs, fog wisps, light shafts/god-rays through gaps, lamp-glow pool, screen-glow pool, window light-spill, edge vignette/grime, a buzzing fly swarm (anim), settling dust on impact.

**Living touches:** a sleeping cat/dog, scurrying rat, perched bird, potted plant (thriving/dead), weeds through cracks, a spiderweb in a corner, moths around a light.

---

## 5. WALL & VERTICAL DRESSING LIBRARY

**Posted:** flyers, faded posters, hand-painted signs, route signs, warning placards, a pinned map, photos/keepsakes pinned up, a calendar, tally marks, kids' drawings, graffiti (mood-shifting — see Militant drift), stencils.

**Mounted clutter:** pegboard of tools, shelves of junk/parts, hanging coils, a clock (stopped), a mirror (cracked), wall lamp/sconce, vents, fuse box/meter, exposed conduit & cable runs, hanging keys.

**Wall wear:** water-damage streaks running down, rust bleed, soot above a fire, peeling paint, exposed brick/rebar, cracks, impact scuffs, mold creep from floor, bleached rectangles where things were removed.

**Occluder verticals (top plane):** hanging cables/wires, pipes crossing, ceiling beams, ductwork, a low-hanging lamp, banners/cloth, laundry line with clothes, foliage/vines draping, an awning edge, hanging signage, chains.

---

## 6. HABITATION LIBRARY (signals of real people living here)

**Rest & home:** bedroll/cot, rumpled blankets, pillow, a stash bundle, a hung coat, boots by a door, a footlocker (open), a child's toy, a stuffed scrap-doll, a deck of worn cards, a board game mid-play.

**Food & hearth:** dishes/mugs (dirty, stacked), a pot on a stove, cookware, a half-eaten meal, food scraps, a water jug, a kettle, a ration tin, a coffee ring on a table, a hung herb bundle, a cook-fire with ash.

**Work in progress:** an open toolbox mid-job, a half-built Ohm on a bench, blueprints/notes weighed down, a soldering rig left on, spilled parts, a workbench vise gripping a piece, sawdust/filings, a project under a tarp.

**Light & comfort:** lanterns, candles (lit/melted/wax-pooled), a string of salvaged bulbs, an oil-drum fire, a glowing brazier, a flickering bulb (anim), a reading lamp.

**Nature reclaiming:** potted plants, window-box weeds, vines over a doorway, moss on a sill, a sapling through the floor, a bird's nest in the rafters.

---

## 7. PER-AREA DRESSING SETS (the culturally-specific mess — `dressing.<area>`)

Each area's clutter reflects its people. Universal library still applies, biome-filtered; these are the flavor adds.

- **Ohmstead** *(home bunker · lived_in):* loose scrap parts, half-built Ohms, oil-rag piles, a tool sprawl on the Bench, *Ohm's Law* left open, family photos pinned, a kid's chalk drawing on the tunnel wall, a mug by the workbench, a cat asleep on a parts crate.
- **The Field** *(cattle town · squalid/ruined):* hay scatter, dried dung, rusted farm tools, tumbleweeds snagged on fences, faded ranch signage, sun-bleached bones, a tipped trough, a windmill blade in the dirt, dust-devils (fx).
- **Railhead** *(trade · cluttered):* crates and spilled cargo, scattered manifests/papers, barter tokens, market refuse, coal heaps, a tipped scale, hanging wares, rail spikes, lantern glow pools.
- **The Cistern** *(agrarian water · lived_in):* mud tracks, reed litter, spilled seed, watering cans, net/fishing gear, algae patches, drips and damp (fx), a tipped pail, hung herb bundles, a sleeping marsh-bird.
- **Bastion** *(quarry fortress · cluttered):* rubble and gravel piles, broken tools, ration tins, sandbag stacks, chalk tally marks, dust haze (fx), a cracked helmet, coiled chain, a propped pickaxe.
- **Redoubt** *(military · cluttered→squalid):* spent power-cells (no firearms), ration packs, sandbags, a pinned tactical map, dog-tags, scorch marks, a tipped cot, scattered orders, a flickering emergency light (fx), a discarded helmet.
- **The Chancel** *(cult · tidy→cluttered):* pooled candle wax, melted candle stubs, scripture papers, prayer offerings, incense smoke (fx), broken icons, wilted flower bunches, hung banners, a dropped censer, kneeling-worn floor patches.
- **Redbed** *(raiders · cluttered→squalid):* bones and scrap trophies, oil-drum ash, strewn bike parts, war-paint stains, hoarded junk piles, New Order graffiti, hung skull-totems, a tipped fuel can, buzzing flies (fx).
- **The Array** *(data center · cluttered):* tangled cable nests, dead monitors, energy-drink cans, printout drifts, sticky notes everywhere, server dust, blinking junk, a foil-lined cap (the conspiracy-coder's), screen-glow pools (fx), a half-eaten meal at a terminal.
- **The Verge** *(memory-keepers, siege · cluttered):* refugee bundles and bedrolls, ration-line crates, sandbags, old-world relics on shelves, memorial candles, siege scorch and breaches, packed-up belongings, festival bunting half-hung, a child's keepsake.
- **Dallas** *(ruins · ruined):* mass debris fields, dead cars, rubble, ash drifts, fallen signage, glass everywhere, choking dust (fx), torn billboards, and **hive-growth detritus** (shed flesh-metal, pulsing spores — pairs with the hive overlay) intensifying toward the tower.
- **Caves / dungeons** *(ruined):* rubble and boulders, scattered bones, an old dead campfire, dropped/rusted gear, mineral crust, fungal growth (glow-fx), drips and damp (fx), a forgotten mine-cart of junk, cobwebs.

---

## 8. PLACEMENT RULES (so the right mess lands in the right place)

- **D1 — Area lock.** `dressing.<area>` appears **only** in its own area (like `sec.<area>`). Redbed's skull-totems never hang in the Chancel.
- **D2 — Biome filter.** Universal clutter must suit the map's biome unless `biome:multi`. No hay in a server room; no cables strung across open prairie.
- **D3 — Density obey.** Scatter to the map's assigned **density tier** (§3) — no more, no less. A `tidy` home gets light dressing; a `cluttered` market gets heavy.
- **D4 — Plane discipline.** `floor` = bottom/`pass`; `occluder` = top/`pass` (and **must** carry a floor shadow); `object` may be `solid` but only big piles; `fx` = topmost. Never flatten an occluder into one layer.
- **D5 — Rule of three.** Every inhabited map must dress **floor + occluder + fx**, not just object props (§2). This is the anti-empty check.
- **D6 — Keep-clear.** Never on interactables, in doorways/chokepoints, or on the critical path; `solid` clutter never seals a required route (§3).
- **D7 — Scatter believably.** Concentrate at walls, corners, desire lines, work points, and neglected edges; thin out across open centers (§3).
- **D8 — Mood gate.** Hive-detritus and corruption-fx only where the hive overlay is allowed (Bastion onward, per the Asset Bible matrix). Festival/memorial dressing only at its story beat (e.g., Ohmcoming bunting late).
- **D9 — Naming/integrity.** `id`-named files; unique; every placed dressing resolves to a record; reuse universal assets across areas, author `dressing.<area>` only for true flavor.

---

## 9. PRODUCTION NOTES

- **Build the Universal + Wall + Habitation + FX libraries first** — they dress every map and unlock the lived-in feel project-wide.
- **Author each `dressing.<area>` set alongside that area's secondary tileset.**
- **Density + scatter can be semi-procedural:** define per-map density tier and let a scatter pass place clutter by the §3 rules (corners/edges/desire-lines), then hand-tune hero rooms.
- **Budget:** dressing is cheap, small, and heavily reused; the FX/occluder planes give the biggest perceived-quality return per asset.
- **Pairs with:** the Asset Bible (base tiles + hive overlay), the Character Asset Guide, and the art-direction canon.

*The lived-in layer: a four-plane depth system, density tiers + scatter logic, deep universal/wall/habitation/FX libraries, twelve area-flavored dressing sets, and placement rules that keep mess believable and paths clear. Lock or trim before Phase 2 dressing production.*
