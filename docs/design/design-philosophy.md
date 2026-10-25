# OHMFRONT — Design Philosophy

*How we design this game. Written 2026-10-25 after Mark said: "Your design
philosophy and the way you're thinking in design is exactly what I'm looking
for … make sure you capture that." Read this before designing any region,
map, character, name or system. CLAUDE.md points here.*

---

## 1. Meaning first, then everything else

Before a single tile, a place gets **one line of meaning**: what it is about.
Railhead Country is *"the work outlived the workers."* Every choice after
that (layout, props, people, wild Ohms, music) has to serve the line. If
something doesn't, it goes.

Each region then gets a short bible answering four questions, in this order:

1. **What is this place?** What it was, what it is now, who lives there.
2. **What's going on here?** The story beats that happen in it.
3. **What's seen but never said?** The lore underneath (§3).
4. **What does each section add?** Its signature, its routine, the thread it
   carries.

The worked example is `docs/design/region1-railhead-country.md`.

## 2. Show, don't tell

The world never explains itself. It shows, and the player reads.

- **No lore dumps.** People say short, ordinary things. Signs say what locals
  would paint. The meaning lives in what the player sees.
- **Text describes what's in front of you, never what it means.** "A small
  brass tag. Three notches stamped in it." Not "Grandpa fixed this."
- **Early lines must read differently after the reveal.** "We never went
  under. Somebody had to keep the windmill company." The Garrison sentry:
  "Checkpoint's closed. …It's always closed." Talking Mountain turns out to be
  literal. Every early line is written for both readings.
- **The old world is forgotten.** No old-world names or history, ever. Only a
  few tiny, unexplained hints (one so far: the Spire's plaque, "…UNION…").

## 2b. Design language is a promise, and we keep every one

*(Mark, 2026-10-25: "Design language is huge.")* Everything the player sees
says something. A visual choice is a **promise** about how the world works,
and the player learns to trust it. Three things matter for every piece of
design language:

1. **What it promises.** Say it in one plain sentence. "A lit lamp at a door
   means you can go in." If we can't say it that plainly, the language is
   muddy.
2. **How it resolves.** A promise is only worth something if it's kept
   **every time**. The lit door always opens. The boarded door never does.
   The chained door opens later, and the game does open it later. One broken
   promise teaches the player to stop trusting what they see, and then they
   walk up to every door to check, which is exactly the guessing we're
   designing out.
3. **What it implies.** Visuals carry messages we didn't mean to send. A door
   slid open on darkness implies "come in." A lamp lit over a vault implies
   "this is the way." Check what each thing implies, not only what it was
   meant to say, and fix anything that implies a promise we can't keep.

Design language is shared across the whole game: the same sign means the
same thing in every region. When we add a new one, we write it down here
first.

### The door language (LOCKED 2026-10-25)

**Light is the promise.** Whether you can go somewhere should be readable
from across the map, before you walk up to it.

| What you see at a doorway | What it means | Resolves |
|---|---|---|
| **A lit lamp right at the door, warm light inside, a clear step** | Go in. | Always opens. Day and night. |
| **Planks nailed across, no light** | Never opens. Scenery. | Never. No prompt needed. |
| **A chain and padlock, no light** | Opens later, when the story gets there. | The story opens it later. |
| **A dead lamp (empty bracket, broken bulb) over a black doorway** | Too dark: needs LUMEN. | Opens once you have LUMEN. |
| **Heaped debris / fallen gates** | Needs HAUL. | Opens with HAUL. |
| **Thorny growth grown solid** | Needs SHEAR. | Opens with SHEAR. |
| **Open water between you and it** | Needs HOVER. | Opens with HOVER. |
| **A cracked, sealed wall or welded door** | Needs BREACH. | Opens with BREACH. |
| **No door at all, just a ruin** | Walk around it. | — |

Rules that keep the promise:

- **Never light a door you can't use.** No decorative lit doors, no glowing
  vaults that don't open. Street lamps on posts are a different shape (a
  lamp on a pole, not on a wall by a door) and promise nothing.
- **Every way in is lit.** Every door, hatch, stairway or lift you can use
  has its lamp: dungeon stairs, the lift, a dungeon's exit back outside
  (daylight spilling through the doorway).
- **Ground doors stay shut unless they're the way in.** Leaves slid open or
  half-open at ground level read as "come in", so on a building you can't
  enter, the doors are closed and boarded, barred or chained.
- **The check is automatic.** In development, the game warns if a lit door
  has nothing to go to, or if a way in has no lit lamp
  (`src/hd2d/doorway.ts`; any map built with it is checked on load).

## 3. Threads: lore with a fixed visual language

The underlayer is carried by a handful of **threads**, each with one
consistent look, so a player can learn to read it across the whole game:

| Thread | Look | Means |
|---|---|---|
| the Garrison's reach | grey chevron + tally stencil | what they've "cleared" |
| Redbed | red handprint | raiders signing what they took |
| Grandpa | small brass tag, three notches | machines Eli kept alive |
| the Static | silver-grey grass, Ohms twitching in sync, no birds | PERSISTENCE's signal |
| the old routines | a machine still doing its job | the ghost of purpose; the soul question |

Threads **escalate** with the story: the stencils get denser north, the
silver grass spreads. A thread appears, recurs, and finally pays off. New
threads need Mark's OK.

## 4. Every map has a routine

Each section has **one machine still doing its old job**, animated in the
background: the sprinkler, the grader, the crossing signal, the gates that
open at dusk, the bucket leg, the projector. This is the game's central
question made visible: these machines aren't monsters, they're working. It
costs one prop and says more than a page of dialogue.

## 5. The world is a web of real places

From Mark's direction and the benchmark study (`scope-benchmarks.md`,
`regions.md`):

- **Regions, each a web.** Towns have 2–4 ways out. Every region has at least
  one loop home. Dead ends are worth reaching.
- **Every road is somewhere.** A name, a look, its own wild Ohms, 1–3 side
  pockets, often a fork to a dungeon. No filler stretches.
- **Separate maps, quick transitions.** Each road and town is its own map, with
  a quick dissolve and a name tag between them. Regions are joined by a travel
  space plus a travel card that implies time and distance.
- **Natural edges.** Bluffs, creeks, fence lines, broken tree lines. Never a
  wall of trees on all four sides.
- **Continuity plus a signature.** A region shares one kit (its fences, trees,
  materials, palette), and each section adds one signature of its own.
- **Gates give reasons to return.** Field abilities open the side pockets
  later (the thicket, the fallen gates, the dark back stock, the broken
  bridge), and each gate tells you what it needs.

## 6. Names: lived in, never try-hard

- A place is named for **what it does, what it did to people, or who took
  it** (New Central: the Garrison took the hub and declared it their capital).
- **The tired-local test:** it must sound natural said by someone who lives
  there. "You're gonna have to go down the Rust Mile." Not "the Parking Lot".
- Real people name places like neighbors: after somebody (the Pickett
  Place), with "Old" for what outlasted everyone (Old Mutter), or with plain
  land words (the Breaks, the Sinks, the Dryway).
- It has to read well in plain text, with no voice actor to sell it. Plain
  words, no puns, no attitude. Mark rejected *the Wide, the Upstairs, Dead
  Air, the Merge* for being too try-hard.
- Never a real place, and nothing a local would recognize. Avoid other works'
  names (and keep clear of THE LONG NOON's).

## 7. Tone: hard world, hopeful heart

- The world is broken, and people are rough about it: slurs for Ohms,
  raiders, chained doors, decommissioned husks in the street. That grit is
  allowed and wanted.
- The heart is hopeful: a family living in the open, a kid naming every Ohm,
  a pump keeping a trough full for no one.
- **Arcs show in how people talk.** Rook uses the slurs early and drops them
  as his arc turns; the first time he calls an Ohm by its name, the rivalry
  is over.
- Writing stays terse and mobile-first. Never start a sentence with
  "because". No antithesis tics.

## 8. How we work with Mark

- **Creator canon is law.** Mark's ideas are never quietly changed or
  "improved."
- **Gaps get options, not decisions.** Two or three choices in Mark's style,
  each tagged `[PROPOSAL]`, with a recommendation and a question. Nothing
  enters canon without his written OK.
- **Iterate fast on taste.** Mark reacts to concrete things. Show a draft
  (names in a sentence, a map, a screenshot), take his reaction literally,
  and adjust in the direction he points. Don't argue taste.
- **When he locks something, apply it everywhere at once:** docs, code, game
  text and maps. Then **enforce it** where possible (e.g. the lint rejects
  real place names in game content).
- **Research before scope.** Measure against real games (the ten-game
  benchmark) before deciding how big something should be.
- **Prove it in the game.** Build it, screenshot it, walk it, link-check
  every exit. Report what works and what doesn't, plainly.

## 9. A checklist for any new region

1. One line of meaning.
2. The four-question bible (§1).
3. A web sketch: towns, roads, side spots, dungeons, one loop, one travel space.
4. Names that pass the tired-local test, offered as proposals.
5. Which threads appear and how far they've escalated here.
6. One routine and one signature per section.
7. People with short, double-reading lines.
8. Wild Ohms themed to what each place used to be.
9. Every door speaks the door language (§2b); the automatic check is clean.
10. Build it, screenshot it, walk every exit, show Mark.
11. Measure it (`tools/hd2d-test/scope.mjs`), add the row to
    `scope-benchmarks.md`, and check the pace against the targets.
