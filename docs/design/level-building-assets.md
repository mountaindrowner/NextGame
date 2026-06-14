# OHMFRONT — World & Level-Building Asset List

*Exhaustive texture/tile asset breakdown for world and stage building, organized so the team can author a shared kit once and a dedicated kit per area. Built to the locked Gen 3 (Ruby/Sapphire) aesthetic and the Phaser + Tiled pipeline.*

---

## PART 0 — SCALE (how big a Gen 3 area actually is)

The Gen 3 map system, verified:
- **Base unit:** 8×8-pixel tiles. **Build unit:** 16×16 **metatiles** ("blocks"), each made of four 8×8 tiles on a **bottom layer** plus four on a **top layer** — the top layer is what draws *over* the player for walk-behind depth.
- **Every map uses exactly two tilesets: a primary + a secondary.** Primary is the big shared/general kit; secondary is the area-specific kit.
- **Ceilings per map:** **1024 metatiles** total (512 primary + 512 secondary), drawn from **1024** base 8×8 tiles (512 + 512), across **13 palettes** (6 primary + 7 secondary), 16 colors each.
- **In practice:** the shared "general" primary tileset is large (hundreds of blocks reused everywhere); a real secondary tileset uses roughly **100–300 distinct 8×8 tiles** of unique, location-specific art.

**What this means for OHMFRONT:** author **one shared Primary Kit** (Parts 1–5 below) reused across the whole region, then **one Secondary Kit per area** (Part 6). Budget each map to ~1024 blocks max. *(Phaser isn't bound by GBA VRAM, so these are guides for look-consistency and organization, not hard caps — but staying near them keeps the Gen 3 feel and keeps tilesheets clean.)* Author as **16×16 tilesheet PNGs** with the 8×8 sub-structure preserved for the two-layer depth trick; assemble in **Tiled**.

**Variant multiplier (important):** nearly every tile below needs **edge, corner (inner + outer), and transition variants** for seamless auto-tiling. One "dirt path" is really ~12–16 tiles (straight edges ×4, outer corners ×4, inner corners ×4, fill, plus transitions to each neighboring ground type). Count accordingly.

---

## PART 1 — SHARED PRIMARY KIT (used across all outdoor areas)

**Ground & paths:** dirt path, cracked asphalt/road, packed earth, gravel, sand, mud, concrete slab, brick/cobble, painted road lines, curbs, manholes, potholes, puddles — each with full edge/corner/transition sets and inter-ground blends.

**Grass & encounter cover:** short prairie grass, **tall grass (encounter)**, dry/dead grass, weeds, flower clusters, ground scrub, the static-field and debris-pile encounter variants, grass→path and grass→dirt transitions.

**Water:** still water, flowing water, shallows, deep water, shoreline edges (all directions + corners), reflections, ripples, lily pads, foam at edges.

**Vegetation:** **trees** (3–4 species — mesquite, oak, cypress, dead/bare — each as canopy-top-layer + trunk-base + cluster forms), bushes, shrubs, stumps, logs, vines, hanging moss, cacti, tumbleweeds.

**Generic ruin props:** wrecked cars (sedan, truck, bus — intact + burned), scrap heaps, rubble piles, debris, broken utility poles, downed power lines, fallen signage, oil drums, crates, barrels, tires, craters.

**Boundary & framing:** the impassable **region-edge mountain barrier** (cliff/mountain wall in all run directions + corners), tree-line walls, the off-map void/letterbox fill.

**Shadows & glue:** drop-shadow tiles for trees/buildings/props, generic transition/auto-tile edges, terrain-blend tiles.

---

## PART 2 — VERTICALITY & DEPTH KIT (called out)

- **Cliff system:** cliff faces (short + tall), cliff tops, **inner and outer corners**, multi-height stacks, cliff-edge highlights, crumbling/ruined cliff variants.
- **Slopes & stairs:** earth ramps, concrete stairs (up/down), metal stairs, stone steps — in each material, with side-rails.
- **Ledges (one-way jump-down):** down-facing, left-facing, right-facing ledge tiles (the hop-down barrier).
- **Two-layer overlap (walk-behind) tops:** tree canopies, roof eaves, awnings, hanging signage, bridge undersides, cliff overhangs, doorway headers, pipe runs — anything the player passes behind.
- **Bridges & overpasses:** road/rail bridges with **over-and-under** layering (player on top vs. routed beneath), rope/scrap footbridges, catwalks and grating platforms over water or pits.
- **Multi-floor interiors:** stair-up/stair-down warp tiles, floor-edge railings, balconies, mezzanines, elevator shafts.
- **Drops & depth:** pits/holes, ledge-to-water drops, exposed-girder gaps (for the skyscraper climb), shaft openings.
- **Elevation transitions:** the connective tiles between every two heights so slopes/cliffs read cleanly.

---

## PART 3 — BARRIER & COLLISION KIT (called out)

- **Fences:** wood post-and-rail, wire/chain-link, sheet-metal, scrap, picket — each with **straight runs, posts, inner/outer corners, and gates** (open/closed).
- **Walls:** concrete, brick, cinderblock, scrap-metal, sandbag, razor-wire — runs, corners, capped ends, battlements, breaches.
- **Rock & rubble barriers:** boulder clusters, rubble blockades, scree banks, fallen-masonry piles.
- **Natural barriers:** dead-tree lines, dense hedge/overgrowth walls, water edges (impassable without HOVER).
- **Doors & gates:** locked doors, blast doors (open/closed/animated), barricaded doorways, vault doors, portcullis/scrap gates.
- **Field-ability obstacles** (the optional traversal gates): **cuttable overgrowth (SHEAR)**, **breakable rock-blocks (BREACH)**, **haulable debris / strength-blocks (HAUL)**, **dark/light-gated blockers (LUMEN)** — each in a "blocked" and "cleared" state.
- **Signage & markers:** route signs, warning placards, no-pass markers, colony boundary posts.

---

## PART 4 — ANIMATED & FX TILES

Water surface + waterfalls; flowing channels; **EM-shimmer zones** (the vanish-flicker); flickering/sparking lights; machine glow; live screen/monitor glow; reactor/uplink glow; steam, smoke, dust, fog; bonfire/oil-drum flame; swaying grass and flowers; drips/leaks; fireflies/spores; and the **Static-corruption shimmer** + **hive-growth pulse** (see Part 7).

---

## PART 5 — MODULAR BUILDING & INTERIOR KIT

**Exteriors (facades, Gen 3 style):** wall panels, roofs (peaked, flat, corrugated, tile), doors, windows (lit/dark/broken), porches, awnings, chimneys, signage mounts — in wood, brick, concrete, and scrap materials.

**Interior shells:** wall sets, floor sets (wood, tile, concrete, metal grating, carpet), ceilings, interior doors, **stair-up/stair-down** warps, windows.

**Furniture sets by building type:**
- **Home:** beds, tables, chairs, shelves, rugs, stove, sink, clutter, potted plants.
- **Shop / market:** counters, shelving of goods, signage, crates, hanging wares, barter tables.
- **Garage (heal point):** the **garage healing machine**, workbenches, tool walls, vehicle lifts, parts bins, the "recharge" station.
- **The Bench (Grandpa's workshop — hero asset):** workbench surface, **pegboard tool racks**, vises, scrap bins, parts crates, blueprints, the *Ohm's Law* book, a half-built Ohm on the bench, soldering rig.
- **Network Garage:** the storage-node terminal / box-system interface.
- **Bunkhouse / barracks:** bunks, lockers, footlockers, armory racks (stun-tech, no firearms).
- **Civic:** desks, consoles, map tables, archives/shelving, terminals.

**Interactables (object layer):** item/node pickups (the shimmer-marked hidden items), computers/terminals, signs, the Bench, healing machine, doors — flagged for interaction.

---

## PART 6 — PER-AREA SECONDARY KITS

Each location's unique art. Assume the Primary Kit covers generic ground/grass/water/cliffs/fences/trees; these add what makes the place itself.

**Ohmstead — interior (underground bunker + tunnels):** riveted-metal & concrete bunker walls, metal-grate + painted-line floors, blast/bulkhead doors, the **elevator** (car, shaft, doors, call-panel), tunnel rock-meets-concrete walls, support beams, hanging cable runs, vents, fluorescent fixtures (lit/flickering), pipes & valves, electrical panels, the **Bench set** (see Part 5), market stalls, bunk nooks, the garage healing machine, the Network-Garage terminal, warning stencils, floor hatches.

**The Field — Ohmstead surface (ruined cattle town):** grain **silos** (tall, clustered), **water towers**, cattle pens & rail fencing (+ corners + gates), ruined farmhouses (intact/collapsed facades), barns, windmills, the **co-op building & vault** (the prologue safe), feed troughs, hay bales, hitching posts, porches, a church/schoolhouse facade, dirt ruts, mesquite/dead trees, tumbleweeds, the elevator surface hatch, and the **EM-shimmer house overlay** (homes that flicker out of view).

**Railhead — Colony 1 (rail junction):** **rails/tracks** (straight, curve, switch, crossing), ties, gravel ballast, boxcars/freight cars (intact + derailed), the **roundhouse + turntable**, **switch levers & semaphore signals**, platforms, loading docks, rail water-tower, coal/scrap piles, market sprawl (stalls, tarps, barter tables), **Broker offices** (desks, ledgers, safes, salt/scrap/water commodity crates), the **switch-house interior** (lever banks, gauges), signal gantries/bridges (overpass), buffer stops, lanterns.

**The Cistern — Colony 2 (flooded waterworks):** mossy concrete channel walls, water channels (still/flowing), **sluice gates**, large pipes & valves, **catwalks/grating over water**, reeds & cattails, algae/moss, pump machinery, the **nursery** (planters, Ohm-cradles, soft glow, hanging vines), the **Grange hall** interior (long tables, harvest décor, root-cellar), the **seed-vault** (lineage-record shelving), water-stained floors, footbridges, ladders into water, drips (FX).

**Bastion — Colony 3 (quarry-fortress):** **quarry rock terraces** (multi-height cliff system), gravel & scree, the **Wall** (massive rampart, gate, battlements), cranes & gantries, conveyor belts, scaffolding, **breakable rock-blocks (BREACH)**, cut-stone blocks, the **cement plant** (silos, kilns, hoppers), watchtowers, sandbag emplacements, the **Stoneguard barracks** interior (hard bunks, armory racks, stone walls), gate mechanism, mine-cart rails, rubble heaps, dust (FX).

**Redoubt + the Bunker — Colony 4 (military):** military prefab facades, the bunker entrance (blast door + ramp), the **command-center** interior (consoles/monitors live & dead, map table, server banks, blinking panels, the **audio-log terminal** and the **Eli Vane photo/logbook** props), barracks, armory (stun-tech racks), **LUMEN-gated dark-corridor** tiles, hazard signage/stencils, sandbags, razor-wire, checkpoint gates, generators, ducts, flickering emergency lights (FX).

**The Chancel — Colony 5 (megachurch + catacombs):** cathedral facades (buttresses, rose-window frame, **broken stained glass** with colored-light FX), the **steeple & bell**, pews (intact/broken), altar & dais, the **reliquary** (saint-Ohm shrine), candles/candelabra (flame FX), **scripture-graffiti wall overlay**, draped banners, organ pipes, **catacomb** walls (stone, niches, bones), torch sconces (LUMEN), crypt floors, stairs down, the **Vestry** interior, the **Cantor's corrupted shrine** (Static-tinged), incense smoke (FX).

**Redbed — Colony 6 (red hardpan raider camp):** **red rock & cracked hardpan**, red dust, scrap-built shanties (corrugated metal, tarps, junk walls), the **battle-pit** (arena ring, tiered scrap-seating, chains), scrap-bikes & vehicle wrecks, **bonfires/oil-drum fires** (flame FX), raider banners/totems, junk-spike fortifications, the **bike-works** interior (welding rigs, frames, parts), the **Red Hand's roost** (scrap throne, trophies), rationed cisterns, painted **New Order marks**, buzzards. *(Plus hive-corrupted variants for the siege/fallen state.)*

**The Array — Colony 7 (data center):** **server racks** (rows, LED blink FX), **raised-floor panels** (lifted, cable runs beneath), cooling units & ducts, cable bundles (overhead + floor), **monitor walls** (live/dead glow), the **uplink chamber** (glowing terminal + dive-rig/chair), **antenna towers** (climbable — verticality), the **Lattice** interior (clean tech décor), the **power-room** (reactor glow, conduits), clean-room doors, ventilation grilles, fiber-glow lines (FX).

**The Verge — Colony 8 (fortified terminal):** grand rail-terminal architecture (facade, clock, columns), defensive barricades (sandbags, barricaded windows, scrap walls), the **beacon** (signal mast + light FX), refugee tents & bedrolls, cook-fires, supply crates, the **Lorekeeper's archive** interior (shelves, scrolls, relics, an **ANCIENT Ohm shrine**), watch-posts, siege damage (scorch, breaches), the **convoy staging ground** (vehicles, fuel drums), barbed wire, makeshift gates.

**Dallas — Act III (downtown ruins):** **skyscraper facades** (towering backdrops), shattered glass curtain-walls, the **skyscraper-climb interior** (broken floors, exposed girders, elevator shafts, hazard gaps), rubble-choked **street canyons**, collapsed **overpass tangles** (the Stack), the **pedestrian-tunnel interior** (tiled corridors, flooded concourse, junctions, sealed blast doors), mass dead-vehicle fields, street-furniture ruins, the open **plaza**, and the **Spire** (the ball-on-stalk tower exterior + the **stalk-climb** + the **Crown antenna chamber**). Heavy **hive-growth/Static overlay** throughout (Part 7), storm-sky backdrop.

**Generic Cave / Mine kit (reused dungeon set):** **cave walls** (rock, multi-height, edges/corners), cave floors (rock/gravel/earth), cave-ceiling overhang (top-layer dark), stalactites & stalagmites, underground pools/streams (+ edges), mine supports (wood/metal beams), mine-cart rails & carts, ladders, **glowing ore/crystal nodes** (FX), boulders/rubble (BREACH), cracks/pit-drops, the **LUMEN darkness overlay** (unlit vs lit), drips, glow-flora.

**Drowned forest (Trinity Bottoms):** flooded forest floor (water + roots), dense cypress/dead trees (canopy top-layer), **SHEAR-cuttable overgrowth**, reeds, hanging moss/vines, sunken roads/cars under water, the **half-submerged chapel**, fog (FX), **organic-hybrid plant-machine flora**, fallen logs (bridge/barrier), murky deep water, fireflies/spores (FX).

**Optional-area kits (lighter secondaries):**
- **Ohm Depot:** tall shelving aisles, pallets, forklifts, hanging signage, loading bays, dark back-stock (LUMEN).
- **The Drive-In:** the big screen, speaker posts, ruined cars, projector booth, snack-bar facade, night sky.
- **The Boneyard:** aircraft hulls (walk-through fuselages), wing-shade, vehicle stacks, desert ground.
- **Site C / the Silo:** missile-silo interior, gantries, deep shaft (verticality), blast doors, weapons-program lore terminals.
- **The Bog Shrine:** deep drowned grove, the legendary's altar, glowing organic growth.
- **The Stadium:** bowl seating, the field, scoreboard, concourse, arena ring.
- **The Mountain Fortress (post-game):** cold mountain rock, militant fortress architecture, server-spires, PERSISTENCE's core chamber, hive-growth at maximum scale, the deepest corruption overlay.

---

## PART 7 — HIVE / STATIC CORRUPTION OVERLAY (cross-area kit)

A reusable overlay applied to *any* area to show hive saturation — author once, tint per zone:
- Hive-growth creeping over ground, walls, and machines (flesh-and-metal); **glowing veins** (pulse FX); corrupted grass/water (off-color + shimmer); the **Static screen-shimmer** overlay; **relay-tower** props; feral-zone tint palettes; and **light → heavy** saturation intensity steps (for escalating zones up to the tower).

---

## PART 8 — SCOPING SUMMARY (for the builder)

**Budget (16×16 blocks):**
- **Shared Primary Kit (Parts 1–5):** ~400–512 blocks (the big reusable foundation).
- **Hive Overlay (Part 7):** ~60–100 blocks.
- **Each area Secondary Kit (Part 6):** ~150–300 blocks; lighter optional areas ~80–150.
- **~18 area kits + shared + overlay → on the order of a few thousand distinct blocks** for the full region.
- **Palettes:** 6 primary + 7 secondary per map (13); author a palette set per area within the Gen 3 ≤16-colors rule.

**Production order (recommended):**
1. **Shared Primary Kit** first — it unblocks every map.
2. **Hive Overlay** — needed early since saturation appears from Bastion onward.
3. **Cave/Mine + Building/Interior kits** — reused everywhere.
4. **Per-area Secondaries in critical-path order** (Ohmstead → the Field → Railhead → … → Dallas), so the playable slice and the main road come online first.
5. **Optional-area kits** last, alongside the wider-world pass.

**Pipeline:** author 16×16 tilesheet PNGs (8×8 sub-structure intact for two-layer walk-behind depth), define collision + elevation + behavior per tile in **Tiled**, export to Phaser. Claude generates the tiles first inside the Gen 3 style (per the art-direction canon); PixelLab is the later-stage tool.

---

*Covered: the shared kit, dedicated verticality/depth and barrier/collision kits, FX tiles, a full modular building/interior kit, ~18 per-area secondary kits, the cross-area corruption overlay, and a block-count budget with build order. Lock or trim before Phase 2 asset production.*
