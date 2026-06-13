# OHMFRONT — Ohm Sprite Production Brief (for Chajipudi)

*Issued 2026-06-13. This is the full creature list for graphics production.
The binding visual rules live in `docs/style-guide.md` and its reference set
in `assets/styleguide/` — read those first. Questions route through Mark.*

## Technical contract (summary — style guide is law)

- **Battle sprites:** 64×64 PNG, transparent background, ≤16 colors
  including transparency. Dark outline (warm near-black, never pure black),
  sel-out, **light from top-left**. Entry animation only — one static frame.
- **Overworld forms** (only where marked): 16×16, ≤8 colors, Gen 3
  proportions.
- **Canvas fill by stage:** Ohmlet/stage-1 ~26–36 px · mid/two-stage-final
  ~40–52 px · three-stage finals & legendaries ~56–64 px · singles ~36–48 px.
  Grounded near canvas bottom.
- **Palettes:** build from the six master ramps (caliche, rust, ember,
  steel, mesquite, sky — see `palette_ramps_v1.png`) plus at most 2 accents.
  The world is sun-bleached; cold colors are reserved for hive/VERDANT
  accents only.
- **Silhouette rule:** every Ohm must read as its real-world object in
  silhouette before any face is added. Faces are minimal and functional —
  lights, grilles, lenses, dials. No human features.
- **Files:** `ohm_<name>_battle_v1.png` · `ohm_<name>_back_v1.png` ·
  `ohm_<name>_overworld_v1.png`, lowercase. Revisions bump `_v2` — never
  overwrite a delivered file.
- **BACK** flag = player-side back sprite needed in the same batch (64×64,
  viewed from behind at Gen 3 battle angle). Unflagged backs come later.

## Priority order

1. **Tier 1 — the slice set** (ship first): 001–009 + starter variants,
   010, 011, 012, 015, 018, 019, 021, 024, 029, 030, 032, 036, 041, 046.
2. **Tier 2 — rest of the Field & Act I** (017–048 remainder).
3. **Tier 3 — the road to Dallas** (049–143).
4. **Tier 4 — legendaries** (144–150; concept pass to Mark before final).

-----

## The Bench trio (001–009) — Tier 1

Stage-1 silhouettes vary by Locomotion: deliver each Ohmlet **three ways**
(treads / legs / hover), same palette and core read. Stages 2–3 are one
sprite each.

| # | Ohm | Object | Type/ramps | Fill | Notes | BACK |
|---|---|---|---|---|---|---|
| 001 | Charkit ×3 | scrap-built furnace rig | THERM — rust+ember | 30px | hand-welded firebox, ember grate face; ref sprite exists | ✓ |
| 002 | Smolderig | furnace rig, grown | THERM | 46px | added boiler mass, twin stacks, glow seams | ✓ |
| 003 | Pyrofurnax | industrial furnace | THERM | 60px | walking foundry, slag-drip jaw, banked fire | ✓ |
| 004 | Sparkit ×3 | scrap-built generator rig | VOLT — steel+ember accents | 30px | hand-wound coil heart, arc gap eyes | ✓ |
| 005 | Amperig | generator rig, grown | VOLT | 46px | stacked cells, busbar shoulders | ✓ |
| 006 | Generatlas | power-plant generator | VOLT | 60px | turbine torso carrying its own pylon | ✓ |
| 007 | Dripkit ×3 | scrap-built pump rig | COOLANT — steel+sky accent | 30px | glass gauge face, one honest drip | ✓ |
| 008 | Flowrig | pump rig, grown | COOLANT | 46px | manifold arms, pressure dial chest | ✓ |
| 009 | Aquaducton | aqueduct pump-house | COOLANT | 60px | arched chassis, water held aloft | ✓ |

## The Field (010–048) — Tiers 1–2

| # | Ohm | Object | Type | Fill | Notes | BACK |
|---|---|---|---|---|---|---|
| 010 | Toastlet | toaster | THERM | 28px | chrome, glowing slots as eyes; ref sprite exists | ✓ |
| 011 | Crumbustion | toaster, rampant | THERM | 44px | ejector rage, smoking slices, scorched chrome | ✓ |
| 012 | Wavelet | microwave | THERM | 32px | door window face, turntable feet, timer dial | ✓ |
| 013 | Nukenook | kitchenette | THERM | 46px | microwave heart in a cabinet body | ✓ |
| 014 | Gourmagnet | full kitchen range | THERM | 58px | six burners lit, hood crown, oven maw | ✓ |
| 015 | Filaglow | light bulb | OPTIC | 28px | filament eyes, screw-base body; ref exists | ✓ |
| 016 | Lumenaire | light fixture | OPTIC | 44px | three-bulb chandelier sprout, brass arms | ✓ |
| 017 | Chandelux | chandelier | OPTIC | 58px | crystal regalia, every candle-socket alight | ✓ |
| 018 | Beeplet | smoke detector | SONIC | 26px | ceiling disc, one blinking LED, test button | ✓ |
| 019 | Vacuette | vacuum cleaner | UTILITY | 32px | upright bag body, hose tail | ✓ |
| 020 | Dustdevil | vacuum, Texan | UTILITY | 46px | spins inside its own dust spiral (Ohmgrown) | ✓ |
| 021 | Fanlet | ceiling fan | UTILITY | 30px | blade skirt, pull-chain tassel | ✓ |
| 022 | Oscillord | ceiling fan, lordly | UTILITY | 46px | five-blade crown, porch-king posture | ✓ |
| 023 | Percolatte | coffee maker | THERM | 36px | carafe belly, steam wisp, dawn-shift eyes | ✓ |
| 024 | Mailstrom | mailbox | UTILITY | 34px | post leg, flag up, letters swirling | ✓ |
| 025 | Frostbox | refrigerator | COOLANT | 36px | door ajar glow, magnet spots | ✓ |
| 026 | Glacierator | refrigerator, glacial | COOLANT | 50px | frost beard, double doors, **overworld form** | ✓ |
| 027 | Sudsle | washing machine | UTILITY | 32px | porthole eye, suds spill | ✓ |
| 028 | Laundrotaur | washer, charging | UTILITY | 48px | lowered porthole head, spin-cycle stance | ✓ |
| 029 | Registill | cash register | UTILITY | 36px | drawer jaw, total display eyes | ✓ |
| 030 | Vendlet | vending machine | FRAME | 36px | front glass chest of cans, coin-slot brow | ✓ |
| 031 | Vendetta | vending machine | FRAME | 50px | leans forward, EXACT CHANGE display, dented | ✓ |
| 032 | Staplejaw | stapler | FRAME | 30px | all hinge and bite, pin teeth | ✓ |
| 033 | Snoozebox | alarm clock | SONIC | 28px | twin bells, cracked face, 9:09 forever | ✓ |
| 034 | Inklet | typewriter | UTILITY | 32px | key teeth, paper tongue | ✓ |
| 035 | Qwertyrant | typewriter, tyrant | UTILITY | 46px | carriage crown, ribbon banners | ✓ |
| 036 | Digitall | calculator | SIGNAL | 30px | solar strip brow, segment-display face | ✓ |
| 037 | Flashbat | flashlight | OPTIC | 32px | lens face down-hanging, beam cone | ✓ |
| 038 | Spoutlet | fire hydrant | COOLANT | 32px | squat stance, cap ears | ✓ |
| 039 | Hydrantler | fire hydrant | COOLANT | 46px | burst-pressure antlers of water | ✓ |
| 040 | Suppressure | fire extinguisher | COOLANT | 34px | pin pulled, hose arm ready, eager | ✓ |
| 041 | Tumblet | tumbleweed (virus-taken) | VERDANT | 30px | wire-and-thorn ball, one cold LED deep inside | ✓ |
| 042 | Thistlebale | tumbleweed bale | VERDANT | 46px | baling-wire skeleton, drifting menace | ✓ |
| 043 | Pricklet | cactus (virus-taken) | VERDANT | 32px | pad with cable veins, flower of glass | ✓ |
| 044 | Cactacomb | cactus colony | VERDANT | 50px | saguaro arms sheltering small machines | ✓ |
| 045 | Bonnetbloom | bluebonnet patch | VERDANT | 34px | flower cluster over buried cable roots | ✓ |
| 046 | Barbwyre | barbed-wire spool | FRAME | 34px | coiled spool, one strand raised like a head | ✓ |
| 047 | Mowlet | push mower | MOTOR | 32px | blade grin under the deck | ✓ |
| 048 | Mowrauder | riding mower | MOTOR | 50px | rideable; headlight eyes, **overworld form** | ✓ |

## Westward & ranchland (049–087) — Tier 3

| # | Ohm | Object | Type | Fill | Notes |
|---|---|---|---|---|---|
| 049 | Sawlet | chainsaw | BREAKER | 32px | idling bar tail, pull-cord whisker |
| 050 | Chainsawrus | chainsaw | BREAKER | 50px | bar as snout, chain teeth bared |
| 051 | Buzzsawyer | circular saw | BREAKER | 38px | disc body rolling fences like rails |
| 052 | Drillbit | power drill | BREAKER | 30px | chuck nose, battery-pack haunches |
| 053 | Augerlock | auger | BREAKER | 48px | earth-screw body half-buried |
| 054 | Cellet | battery | VOLT | 28px | terminal ears, charge-window heart |
| 055 | Batterram | battery bank | VOLT | 48px | cell-stack shoulders squared to charge |
| 056 | Zapporch | bug zapper | VOLT | 34px | lantern cage glow, moth scars |
| 057 | Magnetide | crane magnet | VOLT | 40px | hoist-chain topknot, collected keepsakes stuck on |
| 058 | Insulet | pole transformer | VOLT | 32px | crossarm shoulders, insulator stubs |
| 059 | Gridlock | substation | VOLT | 52px | fenced heart, arcing bus framework |
| 060 | Sunplate | solar panel | VOLT | 32px | tilted face tracking light |
| 061 | Solarray | solar array | VOLT | 50px | petal panels opened to the sun |
| 062 | Whirlet | wind turbine | VOLT | 34px | three-blade face, nacelle body |
| 063 | Windlass | wind turbine | VOLT | 48px | taller mast, blade arms swept |
| 064 | Turbinado | plains turbine | VOLT | 62px | tallest thing left standing; blades as a crown |
| 065 | Pumplet | oil pumpjack | THERM | 32px | nodding-head idle, patient |
| 066 | Jacklift | pumpjack | THERM | 48px | counterweight haunches mid-nod |
| 067 | Cruderrick | oil derrick | THERM | 62px | lattice tower body, gusher plume held back |
| 068 | Nozzlet | gas pump | THERM | 34px | hose arm, price wheels spinning |
| 069 | Octanyx | gas pump | THERM | 48px | twin-hose stance, fume shimmer |
| 070 | Rustbed | pickup truck | MOTOR | 36px | ranch truck pup, bed full of scrap |
| 071 | Rustler | pickup truck | MOTOR | 52px | rideable; horn-rack grille (Ohmgrown), **overworld form** |
| 072 | Longhauler | semi truck | MOTOR | 64px | rideable; road-train mass, **overworld form** |
| 073 | Spokelet | e-bike | MOTOR | 32px | kickstand fidget, basket head |
| 074 | Zoomoped | moped | MOTOR | 46px | rideable; mirror antennae, **overworld form** |
| 075 | Kartwheel | go-kart | MOTOR | 36px | low stance, number plate 1, **overworld form** |
| 076 | Remotorist | RC car | MOTOR | 26px | oversized wheels, antenna whip |
| 077 | Cartlet | shopping cart | MOTOR | 32px | wobble-wheel colt energy |
| 078 | Stampecart | shopping cart | MOTOR | 46px | longhorn handlebars (Ohmgrown), herd stance, **overworld form** |
| 079 | Treadmillipede | treadmill | MOTOR | 48px | segmented belt body, many feet, going nowhere |
| 080 | Hoverlet | quad drone | MOTOR | 30px | rotor shoulders, camera chin |
| 081 | Dronegade | quad drone | MOTOR | 44px | deserter decals scratched off, strafing tilt |
| 082 | Tillbit | tractor | MOTOR | 34px | big rear wheels, exhaust stack hat |
| 083 | Furrower | tractor | MOTOR | 50px | plow jaw, one straight line behind it |
| 084 | Combinator | combine harvester | MOTOR | 64px | thresher maw; Act I Ohmega boss, **overworld form** |
| 085 | Smokelet | smoker grill | THERM | 32px | barrel body, thermometer eye |
| 086 | Brisketeer | BBQ rig | THERM | 48px | offset firebox arm, mesquite smoke plume |
| 087 | Pitmastodon | BBQ pit rig | THERM | 62px | trailer-rig tusks of stacked wood, low-and-slow bulk |

## Towns & airwaves (088–129) — Tier 3

| # | Ohm | Object | Type | Fill | Notes |
|---|---|---|---|---|---|
| 088 | Tweetle | speaker | SONIC | 28px | tweeter eye, cable tail |
| 089 | Wooferal | speaker stack | SONIC | 46px | two-cab stance, grille fur |
| 090 | Subwoolf | subwoofer stack | SONIC | 58px | lupine cab silhouette, bass-port howl |
| 091 | Boomlet | boombox | SONIC | 32px | cassette deck grin, handle |
| 092 | Bassquake | boombox | SONIC | 48px | shoulder-carry swagger, cracked sidewalk |
| 093 | Jukelet | jukebox | SONIC | 34px | bubble-arch brow, 45 in the throat |
| 094 | Jukeboxer | jukebox | SONIC | 50px | Banjo's species: warm wood, two-note glow, **overworld form (Banjo)** |
| 095 | Karaokeen | karaoke machine | SONIC | 38px | mic arm out, lyric screen face |
| 096 | Spoolturn | reel-to-reel deck | SONIC | 36px | twin reel eyes, tape lashes |
| 097 | Sirenado | tornado siren | SONIC | 44px | pole-mounted horn crown, **overworld form (Ohmsick quest)** |
| 098 | Glowtube | neon sign | OPTIC | 34px | bent-tube cursive body, flicker |
| 099 | Marqueen | theater marquee | OPTIC | 52px | chase-light crown, letter-board sash |
| 100 | Tallylight | scoreboard | OPTIC | 46px | HOME/AWAY eyes, countdown heart |
| 101 | Snapshutter | instant camera | OPTIC | 30px | lens eye, print tongue mid-shake |
| 102 | Peeplens | security camera | OPTIC | 28px | wall-mount neck, iris eye |
| 103 | Lenscout | camera rig | OPTIC | 44px | several lenses, none blinking together |
| 104 | Panopticus | camera nest | OPTIC | 58px | mast of eyes, every direction watched |
| 105 | Stoplet | traffic light | OPTIC | 32px | three-eye face, only one lit at a time |
| 106 | Intersectinel | traffic light | OPTIC | 48px | four-way head, crossing-guard arms |
| 107 | Crossignal | RR crossing signal | SIGNAL | 40px | crossbuck arms, twin red eyes alternating |
| 108 | Lampyre | streetlamp | OPTIC | 44px | hooked neck, pool of light, flickers when lying |
| 109 | Staticub | television | SIGNAL | 30px | rabbit ears, static-snow face |
| 110 | Telethrall | television wall | SIGNAL | 48px | stacked screens, one face across all |
| 111 | Broadcastle | broadcast tower | SIGNAL | 62px | lattice keep, dish banners, red beacon crown |
| 112 | Cartrudge | game cartridge | SIGNAL | 26px | label scowl, pin teeth |
| 113 | Consoul | game console | SIGNAL | 44px | controller-port eyes, power LED heart |
| 114 | Arcadium | arcade cabinet | SIGNAL | 58px | marquee brow, joystick arms, attract-mode glow |
| 115 | Pinglet | router | SIGNAL | 28px | antenna ears, blinking LED row |
| 116 | Routergeist | router | SIGNAL | 44px | hovering, cables trailing like a sheet |
| 117 | Flipperlet | pinball machine | SIGNAL | 34px | flipper feet, plunger tail |
| 118 | Pinballista | pinball machine | SIGNAL | 50px | backglass face, multiball volley |
| 119 | Duplicat | photocopier | SIGNAL | 46px | lid raised like a yawn, copies of itself sliding out |
| 120 | Inkjetsam | printer | UTILITY | 36px | jammed tray grimace, magenta forever empty |
| 121 | Rackit | server rack | SIGNAL | 32px | one-unit rack, fan whir |
| 122 | Serverus | server cluster | SIGNAL | 48px | three-bay guard stance (Cerberus read) |
| 123 | Archivault | data center core | SIGNAL | 60px | cold-aisle vault doors, oath-keeper bulk |
| 124 | Orbitot | satellite | SIGNAL | 32px | folded panel wings, dish face |
| 125 | Relaystar | satellite | SIGNAL | 50px | wings deployed, watching the quiet Earth |
| 126 | Hemwinder | sewing machine | UTILITY | 34px | needle-arm neck, thread-spool hat, stolen Patches |
| 127 | Blendread | blender | BREAKER | 32px | lidless jar head, blade whirl visible |
| 128 | Cubelet | ice machine | COOLANT | 34px | breezeway box, generous scoop door |
| 129 | Swampchill | swamp cooler | COOLANT | 38px | window-unit shoulders, drip tracks, locally sacred |

## Deep systems & heavy iron (130–143) — Tier 3

| # | Ohm | Object | Type | Fill | Notes |
|---|---|---|---|---|---|
| 130 | Breezebit | window AC | COOLANT | 30px | vent grin, condensation drip |
| 131 | Gustduct | ductwork | COOLANT | 46px | serpentine duct body, register-vent face |
| 132 | Blizzaplex | central air plant | COOLANT | 58px | rooftop-unit mass, whiteout breath |
| 133 | Tanklet | water heater | THERM | 34px | cylinder body, pilot-light glow at the base |
| 134 | Scaldron | water heater | THERM | 50px | rumbling boiler, relief-valve steam whistle |
| 135 | Towertank | water tower | FRAME | 60px | four-leg stance, town name repainted by itself, **overworld form (set piece)** |
| 136 | Forklet | forklift | FRAME | 36px | fork hands out, certified posture |
| 137 | Palletank | forklift | FRAME | 52px | loaded pallet held high, counterweight tail |
| 138 | Binlet | dumpster | FRAME | 36px | lid half-up, shy tenant eyes inside |
| 139 | Dumpstor | dumpster | FRAME | 52px | open-lid maw, hailstorm shelter bulk |
| 140 | Mixlet | cement mixer | FRAME | 36px | drum belly slowly turning |
| 141 | Cementaur | cement mixer | FRAME | 54px | drum torso on truck haunches (centaur read) |
| 142 | Wreckling | wrecking ball | BREAKER | 34px | ball body on a kinked cable neck |
| 143 | Demolisphere | wrecking ball | BREAKER | 54px | crane-arm cowl, gentle around what it built |

## Legendaries (144–150) — Tier 4 (concept pass to Mark first)

| # | Ohm | Object | Type | Fill | Notes |
|---|---|---|---|---|---|
| 144 | COTTONGIN | cotton gin | FRAME | 64px | ANCIENT: timber-and-iron loom mass, dust-shaft light |
| 145 | TELEGRAPHEME | telegraph exchange | SIGNAL | 64px | ANCIENT: sounder-key chorus, wire halo tapping old traffic |
| 146 | LOCOMOTIVA | steam locomotive | MOTOR | 64px | ANCIENT: roundhouse dark, one headlamp, iron breath |
| 147 | STARBOTTLE | fusion reactor | THERM | 64px | PROTOTYPE: containment vessel, a star pressing at the seams |
| 148 | PECANTHEON | ancient pecan tree | VERDANT | 64px | ORGANIC-HYBRID: cable roots through heartwood, bark-and-chrome fruit |
| 149 | ROSARITHM | heritage rose garden | VERDANT | 64px | ORGANIC-HYBRID: fractal-spiral blooms, almost-beauty |
| 150 | EXEMPLAR | PERSISTENCE's avatar | SIGNAL | 64px | PROTOTYPE: every consumer machine perfected into one hollow figure; final boss |

-----

## Deliverable counts

- **Fronts:** 156 (150 species + 6 extra starter Locomotion variants).
- **Backs (first wave, flagged ✓ above):** 45 — the Bench trio incl.
  variants (15) and all Field capturables (010–048, 30). Remaining backs
  follow in Tier 3 sign-off order.
- **Overworld forms (12):** Glacierator, Mowrauder, Rustler, Longhauler,
  Zoomoped, Kartwheel, Stampecart, Combinator, Jukeboxer (as Banjo),
  Sirenado, Towertank, EXEMPLAR.
- Non-Ohm assets (player characters, NPCs, trainers, tilesets, UI) come as
  a separate brief after the Tier 1 batch proves the style.
