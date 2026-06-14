/**
 * Clutter / set-dressing catalog (Clutter & Detail Layer doc). The four-plane
 * lived-in layer: universal floor/object/occluder/fx libraries (`clutter.*`,
 * shared everywhere) + per-area flavor sets (`dressing.<area>`, area-locked by
 * D1). Plane derives layer (D4); collision pass by default (dressing decorates,
 * never gates). Concatenated into CATALOG by catalog.ts.
 */
import type { AssetRecord, Biome, Collision, Density, Kit, Plane } from './types';
import { PLANE_LAYER } from './types';

const PFX = 'HD top-down decoration sprite, grid method, limited palette, material depth, top-left light, small scatter object on transparent bg';
const LIVED: Density[] = ['lived_in', 'cluttered', 'squalid'];

const all: AssetRecord[] = [];
function mk(kit: Kit, biome: Biome, pal: number, id: string, name: string, plane: Plane, o: { collision?: Collision; density?: Density[]; anim?: { frames: number; fps: number }; prompt?: string } = {}): void {
  all.push({
    id, display_name: name, kit, biome, type: o.anim ? 'anim' : plane === 'object' ? 'object' : 'single',
    layer: PLANE_LAYER[plane], collision: o.collision ?? 'pass', elev: plane === 'occluder' || plane === 'fx' ? 'na' : '0',
    pal, phase: 'slice', gen_prompt: o.prompt ?? `${PFX}: ${name}`,
    plane, density: o.density ?? LIVED, anim: o.anim ?? null,
  });
}

// ============================ clutter.universal (pal 0–5) =================
const U: Kit = 'clutter.universal';
// floor litter & trash (floor plane)
for (const [id, name] of [
  ['paper_scatter', 'Torn paper/flyer scatter'], ['crushed_cans', 'Crushed cans'], ['bottles', 'Bottles (whole/broken)'],
  ['jars', 'Jars'], ['wrappers', 'Ration wrappers'], ['cardboard', 'Cardboard'], ['rags', 'Rags'], ['twine', 'Twine coil'],
  ['bolts', 'Screws/bolts/washers'], ['wire_offcuts', 'Wire offcuts'], ['ash_stubs', 'Ash/cigarette stubs'],
  ['glass_shards', 'Broken glass shards'], ['leaves', 'Leaf litter'], ['dropped_glove', 'A lone dropped glove'],
] as const) mk(U, 'multi', 0, `clutter.trash.${id}`, name, 'floor');
// stains & wear (floor plane)
for (const [id, name] of [
  ['water_stain', 'Water stain'], ['oil_slick', 'Oil/grease slick'], ['rust_bleed', 'Rust bleed'], ['scorch', 'Scorch/soot mark'],
  ['mold', 'Mold/algae patch'], ['dried_spill', 'Dried spill'], ['mud_smear', 'Mud smear'], ['bleached_patch', 'Sun-bleached patch'],
  ['grime_ring', 'Grime ring'], ['tally_scratch', 'Tally scratches'],
] as const) mk(U, 'multi', 0, `clutter.stain.${id}`, name, 'floor');
// cracks & damage + water/damp + tracks (floor plane)
for (const [id, name] of [
  ['floor_crack', 'Floor crack'], ['broken_tile', 'Broken/missing tile'], ['chipped_concrete', 'Chipped concrete'],
  ['exposed_dirt', 'Exposed dirt'], ['exposed_rebar', 'Exposed rebar/brick'], ['pothole', 'Pothole'],
  ['puddle', 'Puddle'], ['damp_patch', 'Damp dark patch'], ['leak_stain', 'Leaking-pipe stain'],
  ['boot_prints', 'Boot prints'], ['tire_tracks', 'Tire/bike tracks'], ['drag_marks', 'Drag marks'], ['scuffs', 'Scuffs'],
] as const) mk(U, 'multi', 0, `clutter.wear.${id}`, name, 'floor');
// scattered objects (object plane)
for (const [id, name, solid] of [
  ['box_stack', 'Stacked boxes', true], ['box_toppled', 'Toppled boxes', false], ['box_open', 'Open box', false],
  ['sack', 'Sack', false], ['bucket', 'Bucket (upright/tipped)', false], ['rope_coil', 'Coil of rope/hose', false],
  ['toolbox', 'Toolbox (open/closed)', false], ['loose_tool', 'Loose tool (wrench/pry-bar)', false], ['tarp', 'Tarp', false],
  ['pallet', 'Pallet', false], ['crate_seat', 'Crate-seat/stool', false], ['ladder_propped', 'Propped ladder', false],
  ['tipped_chair', 'Tipped chair', false], ['cart', 'Cart', true],
] as const) mk(U, 'multi', 3, `clutter.obj.${id}`, name, 'object', { collision: solid ? 'solid' : 'pass' });
// living touches
for (const [id, name, plane] of [
  ['cat_sleeping', 'Sleeping cat', 'object'], ['rat', 'Scurrying rat', 'object'], ['bird', 'Perched bird', 'object'],
  ['plant_dead', 'Dead potted plant', 'object'], ['weeds_crack', 'Weeds through cracks', 'floor'],
  ['spiderweb', 'Corner spiderweb', 'occluder'],
] as const) mk(U, 'multi', 1, `clutter.life.${id}`, name, plane as Plane);
// habitation (object plane) — signals of people
for (const [id, name] of [
  ['bedroll', 'Bedroll/cot'], ['blanket', 'Rumpled blanket'], ['hung_coat', 'Hung coat'], ['boots_by_door', 'Boots by a door'],
  ['footlocker', 'Open footlocker'], ['child_toy', "A child's toy"], ['scrap_doll', 'Scrap-doll'], ['cards', 'Worn cards'],
  ['dishes', 'Dirty/stacked dishes'], ['pot_on_stove', 'Pot on a stove'], ['half_meal', 'Half-eaten meal'], ['water_jug', 'Water jug'],
  ['kettle', 'Kettle'], ['ration_tin', 'Ration tin'], ['coffee_ring', 'Coffee ring'], ['herb_bundle', 'Hung herb bundle'],
  ['toolbox_midjob', 'Toolbox mid-job'], ['blueprints', 'Weighed-down blueprints'], ['spilled_parts', 'Spilled parts'],
  ['lantern', 'Lantern'], ['candle', 'Candle (lit/melted)'], ['bulb_string', 'String of salvaged bulbs'], ['brazier', 'Glowing brazier'],
] as const) mk(U, 'multi', 4, `clutter.home.${id}`, name, 'object');

// ============================ clutter.wall (pal 0–5) ======================
const W: Kit = 'clutter.wall';
// posted + mounted (occluder plane against walls)
for (const [id, name] of [
  ['flyer', 'Flyer'], ['poster', 'Faded poster'], ['painted_sign', 'Hand-painted sign'], ['pinned_map', 'Pinned map'],
  ['photos', 'Pinned photos/keepsakes'], ['calendar', 'Calendar'], ['tally_marks', 'Tally marks'], ['kids_drawing', "Kids' drawing"],
  ['graffiti', 'Graffiti'], ['stencil', 'Stencil'], ['pegboard', 'Pegboard of tools'], ['junk_shelf', 'Shelf of junk/parts'],
  ['hanging_coil', 'Hanging coils'], ['stopped_clock', 'Stopped clock'], ['cracked_mirror', 'Cracked mirror'],
  ['wall_lamp', 'Wall lamp/sconce'], ['vent', 'Vent'], ['fuse_box', 'Fuse box/meter'], ['conduit', 'Exposed conduit & cable'],
] as const) mk(W, 'multi', 4, `clutter.posted.${id}`, name, 'occluder');
// wall wear (these sit on the wall face — treat as occluder, pass)
for (const [id, name] of [
  ['water_streak', 'Water-damage streak'], ['rust_bleed', 'Wall rust bleed'], ['soot', 'Soot above a fire'],
  ['peeling_paint', 'Peeling paint'], ['exposed_brick', 'Exposed brick/rebar'], ['mold_creep', 'Mold creep'],
  ['bleached_rect', 'Bleached rectangle (removed thing)'],
] as const) mk(W, 'multi', 4, `clutter.wallwear.${id}`, name, 'occluder');
// occluder verticals (walk-behind, over player)
for (const [id, name] of [
  ['hanging_cable', 'Hanging cables'], ['pipe_cross', 'Crossing pipes'], ['ceiling_beam', 'Ceiling beam'], ['ductwork', 'Ductwork'],
  ['low_lamp', 'Low-hanging lamp'], ['banner_cloth', 'Banner/cloth'], ['laundry_line', 'Laundry line'], ['vine_drape', 'Draping foliage/vines'],
  ['awning_edge', 'Awning edge'], ['chains', 'Hanging chains'],
] as const) mk(W, 'multi', 4, `clutter.occ.${id}`, name, 'occluder');

// ============================ clutter.fx (pal 0–5) ========================
const F: Kit = 'clutter.fx';
for (const [id, name, frames] of [
  ['dust_motes', 'Dust motes', 4], ['drifting_trash', 'Drifting trash/leaf', 4], ['embers', 'Drifting embers', 4],
  ['steam_puff', 'Steam puff', 4], ['fog_wisp', 'Fog wisp', 4], ['god_ray', 'Light shaft/god-ray', 2],
  ['lamp_glow', 'Lamp-glow pool', 2], ['screen_glow', 'Screen-glow pool', 2], ['window_spill', 'Window light-spill', 2],
  ['edge_vignette', 'Edge vignette/grime', 1], ['fly_swarm', 'Buzzing fly swarm', 4], ['flicker_bulb', 'Flickering bulb', 3],
] as const) mk(F, 'multi', 2, `clutter.fx.${id}`, name, 'fx', { anim: { frames, fps: frames > 1 ? 4 : 1 } });

// ============================ dressing.<area> (pal 6–12) ==================
// area-locked flavor mess (Clutter §7). biome matches the host area.
function dressing(area: string, biome: Biome, items: Array<[string, string, Plane?]>): void {
  for (const [id, name, plane] of items) mk(`dressing.${area}` as Kit, biome, 9, `dressing.${area}.${id}`, name, plane ?? 'object', { density: LIVED });
}
dressing('ohmstead', 'underground', [
  ['scrap_parts', 'Loose scrap parts', 'floor'], ['half_ohm', 'Half-built Ohm'], ['oilrag_pile', 'Oil-rag pile'],
  ['tool_sprawl', 'Tool sprawl on the Bench'], ['ohms_law_open', "Ohm's Law left open"], ['family_photos', 'Pinned family photos', 'occluder'],
  ['kid_chalk', "A kid's chalk drawing", 'occluder'], ['bench_mug', 'A mug by the workbench'], ['cat_on_crate', 'A cat asleep on a parts crate'],
]);
dressing('field', 'prairie', [
  ['hay_scatter', 'Hay scatter', 'floor'], ['dried_dung', 'Dried dung', 'floor'], ['rusted_tools', 'Rusted farm tools'],
  ['snagged_tumbleweed', 'Tumbleweed snagged on a fence'], ['ranch_sign', 'Faded ranch signage', 'occluder'], ['bones', 'Sun-bleached bones', 'floor'],
  ['tipped_trough', 'A tipped trough'], ['windmill_blade', 'A windmill blade in the dirt'], ['dust_devil', 'Dust-devil', 'fx'],
]);
dressing('railhead', 'industrial', [
  ['spilled_cargo', 'Spilled cargo crates'], ['manifests', 'Scattered manifests', 'floor'], ['barter_tokens', 'Barter tokens', 'floor'],
  ['coal_heap', 'Coal heap'], ['tipped_scale', 'A tipped scale'], ['hanging_wares', 'Hanging wares', 'occluder'], ['rail_spikes', 'Rail spikes', 'floor'],
  ['lantern_glow', 'Lantern glow pool', 'fx'],
]);
dressing('cistern', 'flooded', [
  ['mud_tracks', 'Mud tracks', 'floor'], ['reed_litter', 'Reed litter', 'floor'], ['spilled_seed', 'Spilled seed', 'floor'],
  ['watering_can', 'Watering can'], ['fishing_gear', 'Net/fishing gear'], ['algae_patch', 'Algae patch', 'floor'], ['tipped_pail', 'A tipped pail'],
  ['herb_bundles', 'Hung herb bundles', 'occluder'], ['drips', 'Drips and damp', 'fx'],
]);
dressing('bastion', 'quarry', [
  ['gravel_piles', 'Rubble & gravel piles'], ['broken_tools', 'Broken tools', 'floor'], ['ration_tins', 'Ration tins', 'floor'],
  ['sandbag_stack', 'Sandbag stacks'], ['chalk_tally', 'Chalk tally marks', 'occluder'], ['dust_haze', 'Dust haze', 'fx'],
  ['cracked_helmet', 'A cracked helmet'], ['propped_pickaxe', 'A propped pickaxe'],
]);
dressing('redoubt', 'military', [
  ['power_cells', 'Spent power-cells', 'floor'], ['ration_packs', 'Ration packs', 'floor'], ['sandbags', 'Sandbags'],
  ['tactical_map', 'A pinned tactical map', 'occluder'], ['dog_tags', 'Dog-tags', 'floor'], ['scorch', 'Scorch marks', 'floor'],
  ['tipped_cot', 'A tipped cot'], ['scattered_orders', 'Scattered orders', 'floor'], ['emergency_flicker', 'A flickering emergency light', 'fx'],
]);
dressing('chancel', 'sacred', [
  ['candle_wax', 'Pooled candle wax', 'floor'], ['scripture_papers', 'Scripture papers', 'floor'], ['offerings', 'Prayer offerings'],
  ['incense', 'Incense smoke', 'fx'], ['broken_icons', 'Broken icons'], ['wilted_flowers', 'Wilted flower bunches'],
  ['hung_banners', 'Hung banners', 'occluder'], ['dropped_censer', 'A dropped censer'], ['worn_floor', 'Kneeling-worn floor', 'floor'],
]);
dressing('redbed', 'red_hardpan', [
  ['bone_trophies', 'Bones & scrap trophies'], ['drum_ash', 'Oil-drum ash', 'floor'], ['bike_parts', 'Strewn bike parts', 'floor'],
  ['warpaint', 'War-paint stains', 'floor'], ['junk_hoard', 'Hoarded junk piles'], ['neworder_graffiti', 'New Order graffiti', 'occluder'],
  ['skull_totem', 'Hung skull-totems', 'occluder'], ['fuel_can', 'A tipped fuel can'], ['flies', 'Buzzing flies', 'fx'],
]);
dressing('array', 'data', [
  ['cable_nests', 'Tangled cable nests'], ['dead_monitors', 'Dead monitors'], ['drink_cans', 'Energy-drink cans', 'floor'],
  ['printout_drift', 'Printout drifts', 'floor'], ['sticky_notes', 'Sticky notes everywhere', 'occluder'], ['server_dust', 'Server dust', 'floor'],
  ['foil_cap', 'A foil-lined cap'], ['screen_glow', 'Screen-glow pools', 'fx'], ['terminal_meal', 'A half-eaten meal at a terminal'],
]);
dressing('verge', 'urban', [
  ['refugee_bundles', 'Refugee bundles & bedrolls'], ['ration_crates', 'Ration-line crates'], ['sandbags', 'Sandbags'],
  ['relics', 'Old-world relics on shelves'], ['memorial_candles', 'Memorial candles'], ['siege_scorch', 'Siege scorch & breaches', 'floor'],
  ['packed_belongings', 'Packed-up belongings'], ['bunting', 'Festival bunting half-hung', 'occluder'], ['keepsake', "A child's keepsake"],
]);
dressing('dallas', 'urban', [
  ['debris_field', 'Mass debris field', 'floor'], ['dead_cars', 'Dead cars'], ['ash_drift', 'Ash drifts', 'floor'],
  ['fallen_sign', 'Fallen signage'], ['glass', 'Glass everywhere', 'floor'], ['choking_dust', 'Choking dust', 'fx'],
  ['torn_billboard', 'Torn billboard', 'occluder'], ['hive_detritus', 'Hive-growth detritus (shed flesh-metal)'], ['pulsing_spores', 'Pulsing spores', 'fx'],
]);
dressing('caves', 'underground', [
  ['rubble', 'Rubble & boulders'], ['bones', 'Scattered bones', 'floor'], ['dead_campfire', 'An old dead campfire'],
  ['rusted_gear', 'Dropped/rusted gear', 'floor'], ['mineral_crust', 'Mineral crust', 'floor'], ['fungal_growth', 'Fungal growth', 'fx'],
  ['drips', 'Drips and damp', 'fx'], ['junk_cart', 'A forgotten mine-cart of junk'], ['cobwebs', 'Cobwebs', 'occluder'],
]);

export const CLUTTER_RECORDS: AssetRecord[] = all;
