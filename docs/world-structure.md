# OHMFRONT — World Structure (deeper & more expansive, the Hoenn lesson)

*The plan to grow OHMFRONT from a linear chain of 6 colony maps into a
**connected region graph** with the depth of Hoenn (`docs/design/hoenn-map-study.md`).
Binds how every map from here is built and stitched. The Blackland is the
region.*

## 0. The problem with what we have

Today the world is **6 maps in a line**, joined by single interior exit cells:
`Ohmstead → Field → Railhead → Cistern → Bastion → Redoubt`. That's a corridor.
Hoenn feels huge because it's a **graph of ~110 small maps** with routes,
branches, loops, biome bands, ability-gated backtracks, and a stacked sea/dive
layer. We adopt that model.

## 1. The region as a GRAPH (the core change)

Every map is a **node** with up to four **edge neighbors** (N/S/E/W) plus named
**warps** (doors, cave mouths, the elevator, the net). Two connection kinds:

- **Edge-warp (seamless):** walk off a map's open edge → arrive on the
  neighbor's opposite edge at the matching column/row (Hoenn routes).
- **Warp (portal):** step on a tagged cell → arrive at a named cell on a target
  map (interiors, caves, the lift, uplinks).

Engine: a `REGION` table (`src/data/region.ts`) gives each `mapId` its
`{n,s,e,w}` neighbors + `biome` + `hive` tier; `FieldHDScene` reads it so the
walker can cross edges. Maps lose their **solid border on edges that connect**
(an open mouth there instead), keeping a wall only on true region boundaries.

## 2. The full map list (target ~40+ maps, up from 6)

**Critical-path spine (settlements ● + routes → + dungeons ◆):**

```
● Ohmstead (interior)            ◆ the Pit (Bastion cave)
  → the Field (prologue overld)  ◆ the Bunker / Site B (Redoubt)
  → Farm Road                    ◆ the Catacombs (Chancel)
● Railhead (C1)                  ◆ the Vein (under Bastion, opt)
  → the 45 Scar (1st vehicle)    → the Trinity Bottoms (route-dungeon)
● the Cistern (C2 · HOVER)       → the Red Flats
  → the Furrows                  ● Redbed (C6 · siege)
● Bastion (C3)                   → the Tollway Ruins
  → the Military Road            ● the Array (C7)
● Redoubt (C4 · reveal)          → the Stack (5-level interchange)
  → (Trinity Bottoms)            ● the Verge (C8)
● the Chancel (C5)               → the Outer Ring → the Canyon → the Underground
                                 ◆ the Spire / Reunion Tower (finale)
                                 ● Ohmcoming (epilogue)
```

**Optional spurs woven off junctions** (the wider-world doc): Ohm Depot (off
Field), the Stockyards (Ohmstead surface), the Drive-In (off Railhead), the
Aquifer Deeps (under Cistern), the Vein (under Bastion), Site C/the Silo (off
Redoubt), the Bog Shrine (Trinity), the Boneyard (off Redbed), Cold Storage
(under Array), the Stadium (near Verge) + facilities (the Open Range, the Pit
wager-hall, the Gauntlet, uplink dives).

## 3. Biome BANDS (south → north), blended at seams

A gradient like Hoenn's, each band several maps wide, with a rising **hive
saturation** north toward Dallas:

| Band | Maps | Biome | Hive |
|---|---|---|---|
| Home | Ohmstead, Field, Farm Road | underground / prairie | none |
| Rail & flats | Railhead, 45 Scar | industrial | none |
| Waterworks | Cistern, Furrows | flooded / prairie | none |
| Cement lands | Bastion, Military Road | quarry / military | light→med |
| Drowned + sacred | Trinity, Chancel | forest / sacred | light→med |
| Hardpan | Red Flats, Redbed | red_hardpan | heavy |
| Data corridor | Tollway, Array, Stack | data / urban | med→heavy |
| The city | Verge, Outer Ring, Canyon, Underground, Spire | urban ruins | max |

Transitions blend at the shared edge (prairie thins into quarry scree, etc.).

## 4. Branches & LOOPS (kill the corridor)

- **A hub:** Railhead is the natural crossroads (trade-town on a junction) —
  give it 3–4 arms (south to the Field, the 45 Scar east, a spur to the
  Drive-In, the rail line as fast-travel once unlocked).
- **At least one loop:** e.g., a back-route from the Furrows looping to the
  Stockyards and back to the Field, so the south isn't one-way.
- **Vehicle-Ohm fast travel** (the "Fly" analog) once unlocked, between cleared
  colonies — turns the graph into a hub-spoked network you navigate freely.

## 5. Gating → backtracking (the field abilities)

- **HOVER** is the one hard gate (the Cistern + every flooded stretch / the
  net-sea). It also opens the **Dive-like layer** later.
- **SHEAR / BREACH / HAUL / LUMEN** gate **optional** spurs and side-caches —
  pass them early, return later (Hoenn HM backtracking). Each obstacle ships
  blocked+cleared (already in the asset system, R9).
- **The Pull** is the soft "keep moving" pressure (wild Ohms gather when you
  linger) — the anti-camp mechanic that gives even safe maps tension.
- **Key items / story** gate the main road between colonies (clear a trial →
  the road opens).

## 6. Parallel & vertical layers (depth)

- **The net/uplink = a Dive-like second overworld:** uplink cells warp to net
  maps with their own encounters/treasure (Grandpa's domain). Stacked under the
  physical world.
- **Multi-floor dungeons:** the Pit, the Bunker, the Catacombs, the Array halls,
  the Stack (5 decks), the Canyon skyscraper climb, the Underground tunnels, the
  Spire ascent — each its own set of stacked maps with stair/lift warps.

## 7. Per-map DENSITY standard (route-scale lived-in law)

Every route/area map must include (extends `docs/style-guide.md`):
- **Irregular tall-grass / cover encounter patches** (not full-width bands).
- **Ledges** (one-way hops) to shape one-way loops + shortcuts.
- **Line-of-sight trainers** (NPCs that see down a row/col and challenge).
- **Visible + hidden items**; salvage/berry analogs.
- **Terrain variety + transitions** (mud slows, puddles, sand, bridges) and the
  **clutter layer** (Clutter doc) so no screen is empty.
- **Clear edge framing** (mountain/tree-line/sea/wall) — never a walkable void.

## 8. Engine work this implies (build order)

1. **Region graph + edge-warps** (`src/data/region.ts`, `FieldHDScene`) — *the
   enabler; start here.*
2. **Route maps** between colonies (Farm Road first), open-edged into neighbors.
3. **Line-of-sight trainer** + **ledge** + **hidden-item** systems in the walker.
4. **Vehicle-Ohm fast travel** + a **world-map UI** (the region at a glance).
5. **Multi-floor dungeon** loader (stair/lift warps) + the **net layer**.
6. Optional spurs + facilities, woven off junctions.

## 9. Scale target

From **6 maps → ~40+**: 9 settlements + ~12 routes + ~10 dungeons + ~10 optional
spurs/facilities, each screen-to-few-screens, stitched into one expansive,
branching, biome-banded, ability-gated region with a stacked net layer — the
Blackland as a place, not a tube.
