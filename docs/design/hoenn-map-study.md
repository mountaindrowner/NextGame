# Study — Pokémon Ruby/Hoenn Overworld Structure (for OHMFRONT)

*A deep read of the full Hoenn region map, extracting the structural/mapping
principles that make it feel huge, alive, and non-linear — so OHMFRONT's world
can be **deeper and more expansive**, not a chain of rooms.*

---

## 1. The macro shape — a connected GRAPH of many small maps, not a few big ones

Hoenn is **one continuous coordinate space stitched from ~110 separate maps**:
roughly **12 towns/cities, ~34 numbered routes, and ~60 interiors** (caves,
buildings, gyms, dungeons). No single giant map — instead a *graph* where:

- **Nodes = towns/cities and dungeons.** Each is a small map (a city ≈ 2–4
  screens; a route ≈ 1–3 screens; a screen ≈ 15×10 visible 16px tiles).
- **Edges = routes.** A route is a map whose job is to *connect* two nodes and
  hold encounters/trainers/items along the way.
- **You walk edge-to-edge:** stepping off the north edge of Route 103 drops you
  seamlessly onto the south edge of Oldale Town. Connections are mostly
  **seamless edge-warps**, with **door/cave warps** for interiors.

The landmass is an **irregular blob surrounded by ocean** (the white in the rip
is unmapped interior — mountains/void you route *around*). It is **not a
rectangle and not a corridor.**

## 2. The topology is a HUB-AND-BRANCH with LOOPS — this is the key to "expansive"

- **Mauville City sits at the center as a crossroads hub** with four arms:
  north to the volcano (Mt. Chimney/Lavaridge), east to the desert &
  Fallarbor loop, west back to Rustboro, south to Slateport and the sea.
- The critical path **winds and doubles back**: the NW forms a **loop**
  (Rustboro → Dewford by sea → Slateport → Mauville → Mt. Chimney → Lavaridge →
  Fallarbor → back down to Rustboro), so you re-cross country with new tools.
- Because the graph has **cycles**, the world reads as a *place you inhabit*,
  not a tube you're pushed through. You can stand at a junction and choose.

**Lesson:** linear A→B→C feels small even if long. **Branches + at least one
loop** make a world feel several times bigger than its map count.

## 3. Biome BANDS — distinct regions, gradual transitions

Hoenn is zoned by biome, each spanning several adjacent maps, blended at the
seams:

- **Lush south/central** — grass, ponds, farms (Littleroot→Petalburg→Mauville).
- **Sea (whole south half)** — Surf/Dive overworld; islands, the league.
- **Volcanic center-north** — Mt. Chimney, ash fields, lava (Lavaridge).
- **Desert NE** — permanent sandstorm, gated, fossil-rich (Route 111).
- **Mountain/cave NW** — Meteor Falls, Rusturf, granite.
- **Urban** — Rustboro, Mauville, Slateport, Mossdeep (tech/space center).

Transitions are *gradual* (grass thins into sand; coast into sea), and **weather
is per-zone** (sandstorm desert, rain route, fog). The biome tells you where you
are without a label.

## 4. Gating & non-linearity — HMs + geography + badges

Progress is gated three ways, layered:

- **Badges** gate HM *use* and obedience.
- **HMs gate traversal**, each unlocking a whole class of terrain:
  **Cut** (bushes), **Rock Smash** (rubble), **Strength** (boulders), **Surf**
  (water — opens the entire sea overworld late), **Waterfall**, **Dive** (an
  underwater *parallel layer*), **Flash** (dark caves), **Fly** (fast travel).
- **Geography gates** (a cave you can't pass, water you can't cross yet).

The result: you constantly pass things you **can't reach yet**, which seeds
**backtracking** — old maps become new when you return with Surf/Strength. That
re-use is what makes ~110 maps feel like 300.

## 5. Verticality & parallel layers — depth beyond the flat plane

- **Multi-floor caves & towers:** Granite Cave (3F), Victory Road, the Sky
  Pillar, the New Mauville underground, Sea Mauville.
- **A volcano ascent** with a cable car (Mt. Chimney).
- **The Dive layer** — an entire *underwater overworld* beneath the sea routes,
  with its own maps reached by diving. A second plane stacked under the first.
- **Indoor maps** for every building (centers, marts, gyms, homes, labs).

## 6. Per-map DENSITY — what fills a route so it's never empty

Every route is *packed* (this is the lived-in law at the route scale):

- **Tall-grass encounter patches** (irregular, not full-width) + **water** for
  Surf encounters.
- **Ledges** — one-way south-only hops that shape routes into **one-way loops**
  and shortcuts.
- **Trainers with line-of-sight** (they see you down a row/column and charge),
  **rematchable** later via the PokéNav.
- **Items:** visible Poké Balls **and** hidden items (itemfinder), berry trees,
  TMs.
- **Terrain variety:** sand, puddles, mud (slows you), tall grass, flowers,
  bridges, cuttable trees, smashable rocks, strength boulders.
- **Set-dressing & signs**, secret-base spots (cuttable trees/holes), and
  **NPCs with one-line color**.
- **Edge framing:** impassable mountains/sea/tree-lines wall the route so the
  path reads clearly; the white "void" is never walkable.

## 7. Optional content woven INTO the world (not bolted on)

Side areas hang directly off routes so exploration is rewarded constantly:
Safari Zone, Weather Institute, Trick House, Abandoned Ship, New Mauville,
Mirage Island, the Battle Tent/Frontier, Pokémon/secret bases, contests,
fossil/desert digs. Each is a short map off a junction.

## 8. The numbers (rough)

- ~110 maps total; **a city ≈ 30–60 metatiles wide; a route ≈ 20–60 wide**.
- 8 gym towns + ~4 non-gym towns; ~34 routes; the league in the **far SE corner
  across water** (the endpoint is geographically distant + sea-gated).
- ~30–40 hours of traversal, mostly because the **graph has branches, loops,
  gated backtracks, and a stacked sea/dive layer** — not because any one map is
  big.

---

## 9. The eight takeaways for OHMFRONT (→ see `docs/world-structure.md`)

1. **Make the region a GRAPH of many small maps** with **seamless edge-warps**,
   not a chain of rooms joined by single doors.
2. **Build the ROUTES** between colonies (the critical-path doc already names
   them) — they're where encounters/trainers/exploration live.
3. **Add a HUB and at least one LOOP** so the path branches and doubles back.
4. **Zone by BIOME bands** south→north, blended at seams, with per-zone weather/
   hive-saturation.
5. **Gate with the field abilities** (HOVER hard; SHEAR/BREACH/HAUL/LUMEN for
   spurs) to seed **backtracking** — old maps become new.
6. **Add parallel/vertical layers:** the **net/uplink** as a Dive-like second
   overworld; multi-floor dungeons (the Pit, the Bunker, the Array, the Stack,
   the Spire).
7. **Weave the optional spurs** (Ohm Depot, Stockyards, Drive-In, Boneyard,
   Aquifer Deeps, the Vein, Site C…) directly off route junctions.
8. **Hold the density law at route scale:** ledges, line-of-sight trainers,
   hidden items, terrain variety, clutter, no empty screens.
