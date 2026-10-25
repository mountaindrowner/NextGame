# OHMFRONT — Scope Benchmarks

*Compiled 2026-10-25 for Mark: how big ten classic and modern JRPGs really
were, so OHMFRONT knows what to shoot for. The targets at the bottom are
`[PROPOSAL]` until Mark approves them.*

**How solid the numbers are.** Counts marked **(data)** come straight from the
game's own data, via open-source disassemblies (pret/pokeruby, FF1Randomizer,
everything8215's FF3/FF5 work, Data Crystal, Chrono Compendium). The rest are
wiki or guide counts. Playtimes are HowLongToBeat figures as quoted by other
sites. "Slots" means the size of a data table, which includes unused entries,
so it's an upper bound. Blank = not found. Nothing here is invented.

---

## The ten games side by side

| Game | Year | Hours (main / 100%) | Towns | Dungeons | Maps / rooms | Side quests | NPCs | Items | Enemies | Bosses |
|---|---|---|---|---|---|---|---|---|---|---|
| **Final Fantasy** | 1987 | 15.5 / 19.5 | 8 (data) | ~12 | 61 + world map (data) | ~3 | 208 IDs (data) | 102 (data) | 128 (data) | 13 + WarMECH (data) |
| **Final Fantasy III** | 1990 | 28 / ~45 | 14–17 | 18 + ~6 optional | ≤512 slots | ~6 optional dungeons + 3 summon bosses | ~900 placements (data) | 197 (data) | 231 (data) | ~30 |
| **Final Fantasy V** | 1992 | 32–36 / 58–70 | 15 | — | ≤512 slots | 12 sealed weapons + 2 superbosses + optional fights | ≤2,276 placements (data) | 256 slots (data) | 302 | ~74 |
| **Final Fantasy VI** | 1994 | 35 / 64 | ~12 | — | ~417 slots (data) | ~15–20 (World of Ruin) | — | 255 | 346–384 | ~84–104 |
| **Chrono Trigger** | 1995 | 23 / 42 | ~12 (all eras) | — | ~496 room slots (data) | 6 character quests | — | 186 unique | 246 (DS) | 88 (DS) |
| **EarthBound** | 1994 | ~25 / ~40 | ~12 | ~18 | 1 seamless map, 2,560 sectors (data) | very few | ≤~1,580 table entries | 254 slots (140 real items) | 231 slots | ~15–27 |
| **Pokémon Ruby/Sapphire** | 2002 | 35 / 204* | 16 (data) | ~21 places on 86 maps (data) | **394** (data) | ~8 facilities/areas | ~1,289 people placed (data) | 281 (data) | 202 regional / 386 species (data) | 8 gyms + E4 + Champion |
| **Octopath Traveler** | 2018 | 60.5 / 103.5 | 24 | 60 | — | **101** side stories | **741** | 192 weapons + more | ~387 | 32 story + ~24 optional |
| **Octopath Traveler II** | 2023 | 60 / 95 | ~27 | 85 (+62 roads) | — | 67 side stories | — | 522 equipment | ~494 | — |
| **Sea of Stars** | 2023 | 28 / 42.5 | ~10 | — | — | conches, recipes, minigame, arena | — | — | ~93 | 25 + 10 mini |

\* Ruby/Sapphire's 204 h "100%" includes completing the national dex.

**Extra detail worth keeping**

- **Pokémon Ruby/Sapphire** (the model for OHMFRONT's structure): 7 towns + 9
  cities, 34 routes, 4 underwater maps, 394 maps in all (interiors, every
  dungeon floor, 24 secret bases). **693 trainer entries, 348 trainers you
  meet on sight.** Items: 139 general, 12 balls, 58 TMs/HMs, 43 berries, 29
  key items; plus 144 item balls and 98 hidden items on the maps. 354 moves.
- **FF1:** 241 treasure chests; 64 spells; 6 classes.
- **FF3:** 22 jobs, 56 spells, 7 guest characters.
- **FF5:** 22 jobs; about 100 spells (18 white, 18 black, 18 time, 15
  summons, 30 blue); 3 world maps.
- **FF6:** 14 playable characters; 54 spells; 27 Espers; two whole worlds
  (the second wrecks the first).
- **Chrono Trigger:** 7 eras; 116 techs; 12 endings (13 on DS).
- **Octopath:** 149 named places; 8 travelers; 12 jobs. 741 NPCs is the best
  NPC density figure found for an HD-2D game.
- **Sea of Stars:** the smallest modern one, and the closest fit for a small
  team; 6 playable, 3 in battle.

---

## Where OHMFRONT stands

| Metric | Planned (docs) | Built so far |
|---|---|---|
| Hours | ~30 main | — |
| Settlements | 9 (Ohmstead + 8 colonies) | Ohmstead, Railhead, the Cistern (HD-2D) |
| Routes | ~12–14 | the Field, Farm Road, the Rust Mile + 3 transition stretches |
| Dungeons | ~9–10 | — |
| Maps | ~48 (contract) / ~40+ (world structure) | 6 areas + 1 continuous surface |
| Side quests | 6 named (SQ1–6) + repeatable systems (Ohmsick, Errands, Lost Ohmlet…) | — |
| NPCs | ~32 NPC types; 8 Wardens + circles; named cast | a few dozen placed |
| Trainers | ~18 trainer classes | — |
| Items | Repair Kit tiers, cures, D-FIB, Resonance/Prime Cores, mod chips, key items | 17 |
| Creatures | 150 Ohms | 150 in data |
| Moves | — | 55 |
| Bosses | 8 Wardens, Rook, Reyes, Drake, the Monad, legendaries | — |

---

## What to shoot for `[PROPOSAL]`

OHMFRONT's ~30-hour main story puts it with FF5, FF6, Ruby/Sapphire and Sea of
Stars, which is realistic. Measured against Ruby/Sapphire, its closest model,
the plan is right on creatures and length and short on almost everything that
fills the hours.

| Metric | Small (Sea of Stars / FF1) | Mid (Ruby/Sapphire / FF5) | Big (Octopath) | **OHMFRONT target** |
|---|---|---|---|---|
| Hours, main / 100% | 15–28 / 20–43 | 32–36 / 60+ | 60 / 100 | **~30 / ~60** |
| Towns | 8–10 | 15–16 | 24–27 | **9** (fixed by the story) + ~4 small stops (ranches, camps, a trading post) |
| Routes / roads | — | 34 | 62 | **~16–20** (HD-2D routes are bigger than GBA routes) |
| Dungeons | ~12 | ~21 | 60–85 | **~14–16** (9 on the main path + ~6 optional) |
| Maps incl. interiors and floors | 61 | 394 | — | **~150–200** (the plan's ~48 counts too few interiors and dungeon floors) |
| Side quests | ~3 | ~8 facilities + post-game | 67–101 | **~30–40** (2–3 per colony, the Ohmsick chain, the Scrapper's Legacy thread) |
| NPCs you can talk to | ~200 | ~1,300 placed | 741 | **~400–600** placed (~250 unique talkers) |
| Trainers | — | 348 on sight | — | **~180–250** |
| Items | 102 | 281 | 500+ | **~140–180** (no held items or berries, so less than Ruby/Sapphire) |
| Creatures | 128 | 202 regional | ~400 | **150** (fixed) |
| Moves | 64 spells | 354 | — | **~160–200** |
| Bosses | 13–25 | ~15 | ~56 | **~25–30** (8 Wardens + their circles' leads, Rook's battles, Reyes, Drake, the Monad, legendaries) |

**The big takeaways**

1. **Maps are the biggest gap.** Ruby/Sapphire feels large because it's
   ~400 small maps. OHMFRONT's HD-2D areas are larger (one surface chunk is
   several GBA screens), but interiors, dungeon floors and side rooms still
   need to grow from ~48 to ~150–200.
2. **Trainers and NPCs make the hours.** Ruby/Sapphire has 348 trainers on
   sight. OHMFRONT has no trainer count yet; ~200 is the bar for a Gen 3
   body.
3. **Side quests: the HD-2D bar is high.** Octopath's 101 side stories set
   the expectation for this look. ~30–40 well-made ones fits a 30-hour game.
4. **Items and moves need a real pass.** 17 items and 55 moves today; the
   targets are ~150 and ~180.
5. **Length is right.** Ruby/Sapphire is 35 hours and Sea of Stars 28. Keep
   ~30.
