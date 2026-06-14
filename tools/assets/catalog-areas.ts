/**
 * Per-area SECONDARY kit catalog (Asset Bible Part 6) — every colony/dungeon's
 * unique art, enumerated as records so map-building later is fully unblocked.
 * Art generation runs per kit in critical-path order; these records are the
 * organized inventory + gen prompts. Pals 6–12 (secondary band, R7); biome
 * matches each area. Concatenated into CATALOG by catalog.ts.
 */
import type { AssetRecord, AssetType, Biome, Collision, Kit, Layer, Phase, Plane, TemplateName } from './types';
import { PLANE_LAYER } from './types';

const HD = 'HD top-down, 32px, grid method, limited cohesive palette, material depth, top-left light';

/** Per-area builder: terse records sharing kit/biome/phase. */
function kitOf(kit: Kit, biome: Biome, phase: Phase) {
  const R: AssetRecord[] = [];
  interface O {
    pal?: number;
    collision?: Collision;
    layer?: Layer;
    plane?: Plane;
    template?: TemplateName;
    footprint?: [number, number];
    hero?: boolean;
    anim?: { frames: number; fps: number };
    prompt?: string;
  }
  const base = (id: string, name: string, type: AssetType, o: O): AssetRecord => {
    const layer = o.plane ? PLANE_LAYER[o.plane] : o.layer ?? (type === 'object' ? 'object' : type === 'anim' ? 'top' : 'bottom');
    const r: AssetRecord = {
      id, display_name: name, kit, biome, type,
      layer, collision: o.collision ?? (layer === 'top' ? 'pass' : type === 'prop' ? 'mask' : 'solid'),
      elev: '0', pal: o.pal ?? 6, phase, gen_prompt: o.prompt ?? `${HD}; ${name}`,
      hero: o.hero, plane: o.plane,
    };
    if (type === 'autotile') r.template = o.template ?? 'edge16';
    if (type === 'prop') {
      const fp = o.footprint ?? [2, 2];
      r.footprint = fp;
      r.anchor = [0, fp[1] - 1];
      r.collision_mask = Array.from({ length: fp[1] }, (_, ri) => Array.from({ length: fp[0] }, () => (ri === fp[1] - 1 ? 1 : 0)));
      r.layer_split = { bottom: [fp[1] - 1], top: Array.from({ length: fp[1] - 1 }, (_, i) => i) };
    }
    if (type === 'anim') r.anim = o.anim ?? { frames: 4, fps: 4 };
    R.push(r);
    return r;
  };
  return {
    R,
    ground: (id: string, name: string, o: O = {}) => base(id, name, 'autotile', { template: 'terrain_blob', collision: 'pass', ...o }),
    wall: (id: string, name: string, o: O = {}) => base(id, name, 'autotile', { template: o.template ?? 'edge16', collision: 'solid', ...o }),
    single: (id: string, name: string, o: O = {}) => base(id, name, 'single', o),
    prop: (id: string, name: string, o: O = {}) => base(id, name, 'prop', o),
    obj: (id: string, name: string, o: O = {}) => base(id, name, 'object', o),
    anim: (id: string, name: string, o: O = {}) => base(id, name, 'anim', o),
  };
}

const all: AssetRecord[] = [];
const add = (records: AssetRecord[]): void => { all.push(...records); };

// ---- RAILHEAD (industrial) ----------------------------------------------
{
  const k = kitOf('sec.railhead', 'industrial', 'act1');
  k.wall('sec.railhead.rail', 'Rails (straight/curve/switch)', { template: 'fence_run', collision: 'pass', pal: 7 });
  k.single('sec.railhead.ties', 'Rail ties', { collision: 'pass', pal: 7 });
  k.single('sec.railhead.ballast', 'Gravel ballast', { collision: 'pass' });
  k.prop('sec.railhead.boxcar', 'Boxcar (intact/derailed)', { footprint: [4, 2], pal: 7 });
  k.prop('sec.railhead.roundhouse', 'Roundhouse', { footprint: [6, 4], hero: true, pal: 7 });
  k.prop('sec.railhead.turntable', 'Turntable', { footprint: [4, 4], hero: true, pal: 7 });
  k.obj('sec.railhead.switch_lever', 'Switch lever', { pal: 8 });
  k.prop('sec.railhead.semaphore', 'Semaphore signal', { footprint: [1, 3], pal: 8 });
  k.single('sec.railhead.platform', 'Loading platform', { collision: 'solid' });
  k.prop('sec.railhead.rail_watertower', 'Rail water-tower', { footprint: [2, 4], pal: 7 });
  k.single('sec.railhead.coal_pile', 'Coal/scrap pile');
  k.prop('sec.railhead.market_stall', 'Market stall', { footprint: [2, 2], pal: 8 });
  k.single('sec.railhead.tarp', 'Market tarp', { plane: 'occluder', pal: 8 });
  k.prop('sec.railhead.broker_desk', 'Broker desk + ledgers/safe', { footprint: [2, 1], pal: 8 });
  k.prop('sec.railhead.commodity_crate', 'Salt/scrap/water crate', { footprint: [1, 1] });
  k.prop('sec.railhead.signal_gantry', 'Signal gantry (overpass)', { footprint: [4, 1], plane: 'occluder', pal: 8 });
  k.single('sec.railhead.buffer_stop', 'Buffer stop', { collision: 'solid' });
  k.single('sec.railhead.lantern', 'Lantern', { pal: 8, collision: 'pass' });
  add(k.R);
}
// ---- CISTERN (flooded) ---------------------------------------------------
{
  const k = kitOf('sec.cistern', 'flooded', 'act1');
  k.wall('sec.cistern.channel_wall', 'Mossy channel wall', { pal: 6 });
  k.ground('sec.cistern.channel', 'Water channel (still/flowing)', { collision: 'water', pal: 6 });
  k.obj('sec.cistern.sluice_gate', 'Sluice gate', { pal: 7 });
  k.prop('sec.cistern.pipe', 'Large pipe + valve', { footprint: [2, 1], pal: 7 });
  k.prop('sec.cistern.catwalk', 'Catwalk over water', { footprint: [3, 1], plane: 'object', collision: 'pass', pal: 7 });
  k.single('sec.cistern.reeds', 'Reeds & cattails', { plane: 'occluder', pal: 6 });
  k.single('sec.cistern.algae', 'Algae/moss patch', { plane: 'floor', collision: 'pass', pal: 6 });
  k.prop('sec.cistern.pump', 'Pump machinery', { footprint: [2, 2], pal: 7 });
  k.prop('sec.cistern.planter', 'Nursery planter', { footprint: [2, 1], pal: 8 });
  k.prop('sec.cistern.ohm_cradle', 'Ohm-cradle (nursery)', { footprint: [1, 1], hero: true, pal: 8 });
  k.prop('sec.cistern.grange_table', 'Grange long table', { footprint: [3, 1], pal: 7 });
  k.prop('sec.cistern.seed_vault', 'Seed-vault lineage shelving', { footprint: [2, 2], hero: true, pal: 7 });
  k.single('sec.cistern.water_stain', 'Water-stained floor', { plane: 'floor', collision: 'pass' });
  k.prop('sec.cistern.footbridge', 'Footbridge', { footprint: [3, 1], collision: 'pass', pal: 7 });
  k.anim('sec.cistern.drip', 'Drip (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
// ---- BASTION (quarry) ----------------------------------------------------
{
  const k = kitOf('sec.bastion', 'quarry', 'act1');
  k.wall('sec.bastion.terrace', 'Quarry rock terrace', { template: 'cliff', pal: 6 });
  k.single('sec.bastion.scree', 'Gravel & scree', { collision: 'pass', pal: 6 });
  k.prop('sec.bastion.wall', 'The Wall (rampart + battlements)', { footprint: [6, 3], hero: true, pal: 6 });
  k.prop('sec.bastion.crane', 'Crane/gantry', { footprint: [3, 4], plane: 'occluder', pal: 7 });
  k.prop('sec.bastion.conveyor', 'Conveyor belt', { footprint: [3, 1], pal: 7 });
  k.prop('sec.bastion.scaffold', 'Scaffolding', { footprint: [2, 3], plane: 'occluder', collision: 'pass', pal: 7 });
  k.single('sec.bastion.cutstone', 'Cut-stone block', { collision: 'solid', pal: 6 });
  k.prop('sec.bastion.cement_silo', 'Cement silo/kiln/hopper', { footprint: [2, 4], pal: 7 });
  k.prop('sec.bastion.watchtower', 'Watchtower', { footprint: [2, 4], pal: 6 });
  k.single('sec.bastion.sandbag', 'Sandbag emplacement', { collision: 'solid', pal: 7 });
  k.prop('sec.bastion.stoneguard_bunk', 'Stoneguard barracks bunk', { footprint: [2, 1], pal: 7 });
  k.obj('sec.bastion.gate_mech', 'Gate mechanism', { hero: true, pal: 8 });
  k.anim('sec.bastion.dust', 'Quarry dust (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
// ---- REDOUBT (military) --------------------------------------------------
{
  const k = kitOf('sec.redoubt', 'military', 'act1');
  k.wall('sec.redoubt.prefab', 'Military prefab facade', { pal: 6 });
  k.obj('sec.redoubt.blast_ramp', 'Bunker blast door + ramp', { hero: true, pal: 7 });
  k.prop('sec.redoubt.command_console', 'Command console (live/dead)', { footprint: [2, 1], hero: true, pal: 8 });
  k.prop('sec.redoubt.server_bank', 'Server bank', { footprint: [2, 2], pal: 8 });
  k.prop('sec.redoubt.map_table', 'Tactical map table', { footprint: [2, 1], pal: 7 });
  k.obj('sec.redoubt.audiolog', 'Audio-log terminal', { hero: true, pal: 8 });
  k.obj('sec.redoubt.eli_photo', 'Eli Vane photo + logbook', { hero: true, collision: 'pass', pal: 8, prompt: `${HD}; a pinned photograph and a worn logbook — the first trace of Grandpa` });
  k.prop('sec.redoubt.armory_rack', 'Armory rack (stun-tech)', { footprint: [1, 1], pal: 7 });
  k.single('sec.redoubt.lumen_corridor', 'LUMEN-gated dark corridor', { plane: 'fx', collision: 'pass', pal: 8 });
  k.single('sec.redoubt.hazard_stencil', 'Hazard stencil', { plane: 'floor', collision: 'pass', pal: 7 });
  k.single('sec.redoubt.razorwire', 'Razor wire', { collision: 'solid', pal: 7 });
  k.obj('sec.redoubt.checkpoint', 'Checkpoint gate', { pal: 7 });
  k.prop('sec.redoubt.generator', 'Generator', { footprint: [1, 1], pal: 7 });
  k.anim('sec.redoubt.emergency_light', 'Flickering emergency light (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
// ---- TRINITY BOTTOMS (forest/flooded) ------------------------------------
{
  const k = kitOf('sec.trinity', 'forest', 'act2');
  k.ground('sec.trinity.flooded_floor', 'Flooded forest floor (water+roots)', { collision: 'water', pal: 6 });
  k.prop('sec.trinity.cypress', 'Dense cypress/dead tree', { footprint: [3, 5], plane: 'occluder', pal: 6, prompt: `${HD}; drowned cypress, canopy walk-behind over a solid trunk` });
  k.single('sec.trinity.reeds', 'Reeds', { plane: 'occluder', pal: 6 });
  k.single('sec.trinity.moss', 'Hanging moss/vines', { plane: 'occluder', pal: 6 });
  k.prop('sec.trinity.sunken_car', 'Sunken road/car', { footprint: [3, 2], collision: 'pass', pal: 7 });
  k.prop('sec.trinity.chapel', 'Half-submerged chapel', { footprint: [4, 4], hero: true, pal: 7 });
  k.prop('sec.trinity.hybrid_flora', 'Organic-hybrid plant-machine flora', { footprint: [1, 2], pal: 8 });
  k.prop('sec.trinity.log', 'Fallen log (bridge/barrier)', { footprint: [3, 1], collision: 'pass', pal: 6 });
  k.anim('sec.trinity.fog', 'Fog (fx)', { plane: 'fx', pal: 8 });
  k.anim('sec.trinity.firefly', 'Fireflies/spores (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
// ---- THE CHANCEL (sacred) ------------------------------------------------
{
  const k = kitOf('sec.chancel', 'sacred', 'act2');
  k.wall('sec.chancel.facade', 'Cathedral facade + buttress', { pal: 6 });
  k.prop('sec.chancel.rose_window', 'Rose-window frame (broken glass)', { footprint: [2, 2], plane: 'occluder', collision: 'pass', pal: 8 });
  k.prop('sec.chancel.steeple', 'Steeple & bell', { footprint: [2, 5], hero: true, pal: 6 });
  k.prop('sec.chancel.pew', 'Pew (intact/broken)', { footprint: [2, 1], pal: 7 });
  k.prop('sec.chancel.altar', 'Altar & dais', { footprint: [3, 2], hero: true, pal: 8 });
  k.prop('sec.chancel.reliquary', 'Reliquary (saint-Ohm shrine)', { footprint: [2, 2], hero: true, pal: 8 });
  k.anim('sec.chancel.candle', 'Candle/candelabra flame (fx)', { plane: 'fx', pal: 8 });
  k.single('sec.chancel.scripture', 'Scripture-graffiti wall overlay', { plane: 'occluder', collision: 'pass', pal: 7 });
  k.single('sec.chancel.banner', 'Draped banner', { plane: 'occluder', pal: 7 });
  k.prop('sec.chancel.organ', 'Organ pipes', { footprint: [3, 3], pal: 7 });
  k.wall('sec.chancel.catacomb', 'Catacomb wall (niches/bones)', { pal: 6 });
  k.single('sec.chancel.torch_sconce', 'Torch sconce (LUMEN)', { collision: 'solid', pal: 8 });
  k.single('sec.chancel.crypt_floor', 'Crypt floor', { collision: 'pass', pal: 6 });
  k.prop('sec.chancel.cantor_shrine', "Cantor's corrupted shrine", { footprint: [2, 2], hero: true, pal: 8 });
  k.anim('sec.chancel.incense', 'Incense smoke (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
// ---- REDBED (red hardpan) ------------------------------------------------
{
  const k = kitOf('sec.redbed', 'red_hardpan', 'act2');
  k.ground('sec.redbed.red_rock', 'Red rock & cracked hardpan', { pal: 6 });
  k.single('sec.redbed.red_dust', 'Red dust', { plane: 'floor', collision: 'pass', pal: 6 });
  k.wall('sec.redbed.shanty', 'Scrap shanty wall (corrugated/tarp/junk)', { pal: 7 });
  k.prop('sec.redbed.battle_pit', 'The Battle-Pit (arena + scrap seating)', { footprint: [5, 3], hero: true, pal: 7 });
  k.single('sec.redbed.chain', 'Chain', { collision: 'solid', pal: 7 });
  k.prop('sec.redbed.scrapbike', 'Scrap-bike / vehicle wreck', { footprint: [2, 1], pal: 7 });
  k.anim('sec.redbed.bonfire', 'Bonfire/oil-drum fire (fx)', { plane: 'fx', pal: 8 });
  k.single('sec.redbed.banner', 'Raider banner/totem', { plane: 'occluder', pal: 8 });
  k.single('sec.redbed.junk_spike', 'Junk-spike fortification', { collision: 'solid', pal: 7 });
  k.prop('sec.redbed.bikeworks', 'Bike-works (welding rigs/frames)', { footprint: [3, 2], pal: 7 });
  k.prop('sec.redbed.red_throne', "The Red Hand's roost (scrap throne)", { footprint: [2, 2], hero: true, pal: 8 });
  k.single('sec.redbed.neworder_mark', 'Painted New Order mark', { plane: 'occluder', collision: 'pass', pal: 8 });
  add(k.R);
}
// ---- THE ARRAY (data) ----------------------------------------------------
{
  const k = kitOf('sec.array', 'data', 'act2');
  k.prop('sec.array.server_rack', 'Server rack (LED blink)', { footprint: [1, 2], pal: 8 });
  k.ground('sec.array.raised_floor', 'Raised-floor panel (cable beneath)', { collision: 'pass', pal: 6 });
  k.prop('sec.array.cooling_unit', 'Cooling unit/duct', { footprint: [1, 2], pal: 7 });
  k.single('sec.array.cable_bundle', 'Cable bundle', { plane: 'occluder', pal: 7 });
  k.prop('sec.array.monitor_wall', 'Monitor wall (live/dead glow)', { footprint: [3, 2], hero: true, pal: 8 });
  k.obj('sec.array.uplink', 'Uplink terminal + dive-rig', { hero: true, pal: 8 });
  k.prop('sec.array.antenna_tower', 'Antenna tower (climbable)', { footprint: [2, 5], plane: 'occluder', pal: 7 });
  k.single('sec.array.lattice_decor', 'Lattice clean-tech décor', { collision: 'pass', pal: 6 });
  k.prop('sec.array.reactor', 'Power-room reactor (glow)', { footprint: [3, 3], hero: true, pal: 8 });
  k.obj('sec.array.cleanroom_door', 'Clean-room door', { pal: 7 });
  k.anim('sec.array.fiber_glow', 'Fiber-glow lines (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
// ---- THE VERGE (urban) ---------------------------------------------------
{
  const k = kitOf('sec.verge', 'urban', 'act2');
  k.wall('sec.verge.terminal', 'Rail-terminal facade (columns/clock)', { pal: 6 });
  k.single('sec.verge.barricade', 'Defensive barricade', { collision: 'solid', pal: 7 });
  k.prop('sec.verge.beacon', 'The Beacon (signal mast)', { footprint: [2, 5], hero: true, pal: 8 });
  k.prop('sec.verge.tent', 'Refugee tent + bedroll', { footprint: [2, 2], pal: 7 });
  k.anim('sec.verge.cookfire', 'Cook-fire (fx)', { plane: 'fx', pal: 8 });
  k.prop('sec.verge.supply_crate', 'Supply crate', { footprint: [1, 1], pal: 7 });
  k.prop('sec.verge.archive', "Lorekeeper's archive shelves", { footprint: [2, 2], pal: 7 });
  k.prop('sec.verge.ancient_shrine', 'ANCIENT Ohm shrine', { footprint: [2, 2], hero: true, pal: 8 });
  k.single('sec.verge.siege_scorch', 'Siege scorch/breach', { plane: 'floor', collision: 'pass', pal: 7 });
  k.prop('sec.verge.convoy_vehicle', 'Convoy vehicle + fuel drums', { footprint: [3, 2], pal: 7 });
  k.single('sec.verge.barbed_wire', 'Barbed wire', { collision: 'solid', pal: 7 });
  k.obj('sec.verge.makeshift_gate', 'Makeshift gate', { pal: 7 });
  add(k.R);
}
// ---- DALLAS (urban ruins, Act III) ---------------------------------------
{
  const k = kitOf('sec.dallas', 'urban', 'act3');
  k.wall('sec.dallas.skyscraper', 'Skyscraper facade (backdrop)', { pal: 6, prompt: `${HD}; towering ruined skyscraper facade, shattered glass curtain-wall` });
  k.single('sec.dallas.glass_curtain', 'Shattered glass curtain-wall', { collision: 'solid', pal: 7 });
  k.single('sec.dallas.broken_floor', 'Broken climb floor', { collision: 'pass', pal: 6 });
  k.single('sec.dallas.exposed_girder', 'Exposed girder', { plane: 'occluder', pal: 7 });
  k.obj('sec.dallas.elevator_shaft', 'Elevator shaft / hazard gap', { collision: 'solid', pal: 7 });
  k.prop('sec.dallas.overpass_tangle', 'Collapsed overpass tangle (the Stack)', { footprint: [4, 3], pal: 7 });
  k.wall('sec.dallas.tunnel_wall', 'Pedestrian tunnel wall', { pal: 6 });
  k.ground('sec.dallas.tunnel_floor', 'Tunnel/concourse floor (flooded)', { collision: 'pass', pal: 6 });
  k.obj('sec.dallas.sealed_blastdoor', 'Sealed blast door', { pal: 7 });
  k.prop('sec.dallas.dead_vehicle', 'Dead-vehicle field', { footprint: [3, 2], pal: 7 });
  k.single('sec.dallas.plaza', 'Open plaza ground', { collision: 'pass', pal: 6 });
  k.prop('sec.dallas.spire', 'The Spire (Reunion Tower exterior)', { footprint: [4, 6], hero: true, pal: 8, prompt: `${HD}; the ball-on-stalk tower, old steel fused with hive-flesh, storm sky` });
  k.prop('sec.dallas.crown', 'The Crown (antenna chamber)', { footprint: [3, 3], hero: true, pal: 8 });
  add(k.R);
}
// ---- MOUNTAIN FORTRESS (post-game) ---------------------------------------
{
  const k = kitOf('sec.fortress', 'military', 'postgame');
  k.wall('sec.fortress.cold_rock', 'Cold mountain rock', { template: 'cliff', pal: 6 });
  k.wall('sec.fortress.arch', 'Fortress architecture', { pal: 7 });
  k.prop('sec.fortress.server_spire', 'Server-spire', { footprint: [2, 5], pal: 8 });
  k.prop('sec.fortress.persistence_core', "PERSISTENCE's core chamber", { footprint: [4, 4], hero: true, pal: 8, prompt: `${HD}; the weapons-AI core chamber, deepest hive corruption, cold and vast` });
  k.single('sec.fortress.deep_corruption', 'Deep corruption growth', { plane: 'object', pal: 8 });
  add(k.R);
}

// ---- OPTIONAL-AREA SECONDARIES (lighter) ---------------------------------
{
  const k = kitOf('sec.depot', 'industrial', 'optional');
  k.prop('sec.depot.shelf_aisle', 'Tall shelving aisle', { footprint: [1, 4], pal: 7 });
  k.prop('sec.depot.pallet', 'Pallet', { footprint: [1, 1], pal: 7 });
  k.prop('sec.depot.forklift', 'Forklift', { footprint: [2, 2], pal: 7 });
  k.single('sec.depot.hanging_sign', 'Hanging aisle sign', { plane: 'occluder', pal: 8 });
  k.single('sec.depot.backstock_dark', 'Dark back-stock (LUMEN)', { plane: 'fx', collision: 'pass', pal: 8 });
  add(k.R);
}
{
  const k = kitOf('sec.drivein', 'prairie', 'optional');
  k.prop('sec.drivein.big_screen', 'The big screen', { footprint: [5, 4], hero: true, pal: 7 });
  k.prop('sec.drivein.speaker_post', 'Speaker post', { footprint: [1, 1], pal: 7 });
  k.prop('sec.drivein.projector_booth', 'Projector booth', { footprint: [2, 2], pal: 7 });
  k.prop('sec.drivein.snackbar', 'Snack-bar facade', { footprint: [3, 2], pal: 7 });
  add(k.R);
}
{
  const k = kitOf('sec.boneyard', 'red_hardpan', 'optional');
  k.prop('sec.boneyard.aircraft_hull', 'Aircraft hull (walk-through)', { footprint: [5, 3], hero: true, collision: 'pass', pal: 7 });
  k.single('sec.boneyard.wing_shade', 'Wing-shade', { plane: 'occluder', pal: 7 });
  k.prop('sec.boneyard.vehicle_stack', 'Vehicle stack', { footprint: [2, 2], pal: 7 });
  add(k.R);
}
{
  const k = kitOf('sec.silo', 'military', 'optional');
  k.wall('sec.silo.interior', 'Missile-silo interior', { pal: 6 });
  k.prop('sec.silo.gantry', 'Gantry', { footprint: [3, 1], plane: 'occluder', collision: 'pass', pal: 7 });
  k.single('sec.silo.deep_shaft', 'Deep shaft (verticality)', { collision: 'solid', pal: 6 });
  k.obj('sec.silo.weapons_terminal', 'Weapons-program lore terminal', { hero: true, pal: 8 });
  add(k.R);
}
{
  const k = kitOf('sec.bogshrine', 'forest', 'optional');
  k.ground('sec.bogshrine.grove', 'Drowned grove floor', { collision: 'water', pal: 6 });
  k.prop('sec.bogshrine.altar', "The legendary's altar", { footprint: [2, 2], hero: true, pal: 8 });
  k.anim('sec.bogshrine.organic_growth', 'Glowing organic growth (fx)', { plane: 'fx', pal: 8 });
  add(k.R);
}
{
  const k = kitOf('sec.stadium', 'urban', 'optional');
  k.prop('sec.stadium.bowl_seating', 'Bowl seating', { footprint: [4, 3], pal: 7 });
  k.ground('sec.stadium.field', 'The field', { collision: 'pass', pal: 6 });
  k.prop('sec.stadium.scoreboard', 'Scoreboard', { footprint: [3, 2], hero: true, pal: 8 });
  k.single('sec.stadium.arena_ring', 'Arena ring', { collision: 'pass', pal: 7 });
  add(k.R);
}

export const AREA_RECORDS: AssetRecord[] = all;
