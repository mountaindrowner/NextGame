/**
 * Asset catalog (Asset Bible Part B) → records under the governing schema.
 *
 * Seeded in production order: the shared Primary Kit (unblocks every map),
 * the Building/Interior and Cave dungeon kits (reused everywhere), then the
 * two slice secondaries `sec.ohmstead` + `sec.field`. The remaining per-area
 * secondaries are enumerated in AREAS (types.ts) and get their records as each
 * kit is authored, in critical-path order. gen_prompt is written in our HD
 * grid-method language, not the Bible's Gen-3 wording.
 */
import type { AssetRecord, Biome, Collision, Gate, GateState, Kit, Layer, TemplateName } from './types';
import { AREA_RECORDS } from './catalog-areas';
import { CLUTTER_RECORDS } from './catalog-clutter';

const HD = 'HD top-down, 32px, grid method, limited cohesive palette, material depth (highlight/base/shadow), top-left light';

interface Opt {
  layer?: Layer;
  collision?: Collision;
  elev?: string;
  prompt?: string;
  hero?: boolean;
  variants?: string[];
}
const C: AssetRecord[] = [];
const push = (r: AssetRecord): AssetRecord => {
  C.push(r);
  return r;
};

const auto = (id: string, name: string, kit: Kit, biome: Biome, pal: number, template: TemplateName, o: Opt = {}): void => {
  push({
    id, display_name: name, kit, biome, type: 'autotile', template,
    layer: o.layer ?? 'bottom', collision: o.collision ?? 'pass', elev: o.elev ?? '0', pal,
    phase: 'slice', gen_prompt: o.prompt ?? `${HD}; ${name}`, variants: o.variants,
  });
};
const single = (id: string, name: string, kit: Kit, biome: Biome, pal: number, o: Opt = {}): void => {
  push({
    id, display_name: name, kit, biome, type: 'single',
    layer: o.layer ?? 'bottom', collision: o.collision ?? 'pass', elev: o.elev ?? '0', pal,
    phase: 'slice', gen_prompt: o.prompt ?? `${HD}; ${name}`, hero: o.hero, variants: o.variants,
  });
};
const prop = (
  id: string, name: string, kit: Kit, biome: Biome, pal: number,
  footprint: [number, number], o: Opt & { solidRows?: number } = {},
): void => {
  const [cols, rows] = footprint;
  const solidRows = o.solidRows ?? 1;
  const bottom: number[] = [];
  const top: number[] = [];
  for (let r = 0; r < rows; r++) (r >= rows - solidRows ? bottom : top).push(r);
  const mask = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, () => (bottom.includes(r) ? 1 : 0)));
  push({
    id, display_name: name, kit, biome, type: 'prop', footprint, anchor: [0, rows - 1],
    layer_split: { bottom, top }, collision_mask: mask,
    layer: 'bottom', collision: 'mask', elev: o.elev ?? '0', pal, phase: 'slice',
    gen_prompt: o.prompt ?? `${HD}; ${name}`, hero: o.hero, variants: o.variants,
  });
};
const obj = (id: string, name: string, kit: Kit, biome: Biome, pal: number, o: Opt = {}): void => {
  push({
    id, display_name: name, kit, biome, type: 'object',
    layer: 'object', collision: o.collision ?? 'solid', elev: o.elev ?? '0', pal,
    phase: 'slice', gen_prompt: o.prompt ?? `${HD}; ${name}`, hero: o.hero,
  });
};
const anim = (id: string, name: string, kit: Kit, biome: Biome, pal: number, frames: number, fps: number, o: Opt = {}): void => {
  push({
    id, display_name: name, kit, biome, type: 'anim', anim: { frames, fps },
    layer: o.layer ?? 'top', collision: o.collision ?? 'pass', elev: o.elev ?? 'na', pal,
    phase: 'slice', gen_prompt: o.prompt ?? `${HD}; ${name}, ${frames}-frame loop`,
  });
};
/** A field-ability obstacle: emits both blocked + cleared (R9). */
const gatePair = (base: string, name: string, kit: Kit, biome: Biome, pal: number, gate: Gate): void => {
  const mk = (state: GateState, collision: Collision): AssetRecord => ({
    id: `${base}.${state}`, display_name: `${name} (${state})`, kit, biome, type: 'single',
    layer: 'bottom', collision, elev: '0', pal, phase: 'optional',
    gen_prompt: `${HD}; ${name}, ${state} state`, gate, state,
  });
  push(mk('blocked', 'solid'));
  push(mk('cleared', 'pass'));
};

// ============================ PRIMARY KIT (pals 0–5) ======================
// 0 ground · 1 grass/veg · 2 water · 3 ruin/metal · 4 wood/structure · 5 stone
for (const [id, name] of [
  ['dirt', 'Dirt path'], ['asphalt', 'Cracked asphalt'], ['earth', 'Packed earth'],
  ['gravel', 'Gravel'], ['sand', 'Sand'], ['mud', 'Mud'], ['concrete', 'Concrete slab'], ['cobble', 'Brick cobble'],
] as const)
  auto(`primary.ground.${id}`, name, 'primary', 'multi', 0, 'terrain_blob');
single('primary.ground.road_lines', 'Painted road lines', 'primary', 'multi', 0);
auto('primary.ground.curb', 'Curb', 'primary', 'multi', 0, 'edge16', { collision: 'solid' });
for (const [id, name] of [['manhole', 'Manhole'], ['pothole', 'Pothole'], ['puddle', 'Puddle']] as const)
  single(`primary.ground.${id}`, name, 'primary', 'multi', 0);

auto('primary.grass.short', 'Short prairie grass', 'primary', 'multi', 1, 'terrain_blob');
auto('primary.grass.tall', 'Tall grass (encounter)', 'primary', 'multi', 1, 'terrain_blob', { prompt: `${HD}; tall prairie grass, encounter cover, swaying` });
auto('primary.grass.dead', 'Dry/dead grass', 'primary', 'multi', 1, 'terrain_blob');
for (const [id, name] of [['weeds', 'Weeds'], ['flowers', 'Flower cluster'], ['scrub', 'Ground scrub'], ['static_field', 'Static-field cover'], ['debris_cover', 'Debris-pile cover']] as const)
  single(`primary.grass.${id}`, name, 'primary', 'multi', 1);

auto('primary.water.still', 'Still water', 'primary', 'multi', 2, 'terrain_blob', { collision: 'water' });
auto('primary.water.deep', 'Deep water', 'primary', 'multi', 2, 'terrain_blob', { collision: 'water' });
auto('primary.water.shoreline', 'Shoreline edge', 'primary', 'multi', 2, 'edge16');
auto('primary.water.shallows', 'Shallows', 'primary', 'multi', 2, 'edge16', { collision: 'water' });
anim('primary.water.flowing', 'Flowing water', 'primary', 'multi', 2, 6, 6, { layer: 'bottom', collision: 'water' });
anim('primary.water.ripples', 'Ripples', 'primary', 'multi', 2, 4, 4);
single('primary.water.lily', 'Lily pad', 'primary', 'multi', 2);
single('primary.water.foam', 'Foam', 'primary', 'multi', 2);

for (const [id, name, h] of [['mesquite', 'Mesquite tree', 4], ['oak', 'Oak tree', 5], ['cypress', 'Cypress tree', 5], ['dead', 'Dead/bare tree', 4]] as const)
  prop(`primary.tree.${id}`, name, 'primary', 'multi', 1, [3, h], { solidRows: 1, prompt: `${HD}; ${name}, canopy walk-behind top + solid trunk base` });
for (const [id, name] of [['bush', 'Bush'], ['shrub', 'Shrub'], ['stump', 'Stump'], ['cactus', 'Cactus']] as const)
  single(`primary.veg.${id}`, name, 'primary', 'multi', 1, { collision: 'solid' });
single('primary.veg.log', 'Fallen log', 'primary', 'multi', 4, { collision: 'solid' });
single('primary.veg.vine', 'Hanging vine', 'primary', 'multi', 1, { layer: 'top' });
single('primary.veg.moss', 'Hanging moss', 'primary', 'multi', 1, { layer: 'top' });
single('primary.veg.tumbleweed', 'Tumbleweed', 'primary', 'multi', 1);

for (const [id, name, fp] of [['car_sedan', 'Wrecked sedan', [3, 2]], ['car_truck', 'Wrecked truck', [3, 2]], ['car_bus', 'Wrecked bus', [5, 2]]] as const)
  prop(`primary.ruin.${id}`, name, 'primary', 'multi', 3, fp as [number, number], { collision: 'solid', solidRows: 2, variants: ['intact', 'burned'] });
for (const [id, name] of [['scrap_heap', 'Scrap heap'], ['rubble_pile', 'Rubble pile'], ['debris', 'Debris'], ['oil_drum', 'Oil drum'], ['crate', 'Crate'], ['barrel', 'Barrel'], ['tire', 'Tire'], ['crater', 'Crater']] as const)
  single(`primary.ruin.${id}`, name, 'primary', 'multi', 3, { collision: 'solid' });
prop('primary.ruin.utility_pole', 'Broken utility pole', 'primary', 'multi', 3, [1, 4], { solidRows: 1 });
single('primary.ruin.power_line', 'Downed power line', 'primary', 'multi', 3, { layer: 'top' });
single('primary.ruin.fallen_sign', 'Fallen signage', 'primary', 'multi', 3, { collision: 'solid' });

auto('primary.boundary.mountain', 'Region-edge mountain barrier', 'primary', 'multi', 5, 'cliff', { collision: 'solid' });
auto('primary.boundary.treeline', 'Tree-line wall', 'primary', 'multi', 1, 'wall_run', { collision: 'solid' });
single('primary.boundary.void', 'Off-map void fill', 'primary', 'multi', 5, { collision: 'solid' });
single('primary.glue.drop_shadow', 'Drop shadow', 'primary', 'multi', 0, { layer: 'top' });
auto('primary.glue.blend', 'Terrain blend', 'primary', 'multi', 0, 'edge16');

// verticality & depth
auto('primary.vert.cliff', 'Cliff system', 'primary', 'multi', 5, 'cliff', { collision: 'solid' });
for (const [id, name] of [['ramp_earth', 'Earth ramp'], ['stairs_concrete', 'Concrete stairs'], ['stairs_metal', 'Metal stairs'], ['steps_stone', 'Stone steps']] as const)
  single(`primary.vert.${id}`, name, 'primary', 'multi', 5);
for (const dir of ['s', 'e', 'w'] as const)
  single(`primary.vert.ledge_${dir}`, `Ledge (jump-down ${dir})`, 'primary', 'multi', 5, { collision: `ledge_${dir}` as Collision });
single('primary.vert.canopy_top', 'Canopy overlap', 'primary', 'multi', 1, { layer: 'top' });
single('primary.vert.roof_eave', 'Roof eave overlap', 'primary', 'multi', 4, { layer: 'top' });
single('primary.vert.awning', 'Awning overlap', 'primary', 'multi', 4, { layer: 'top' });
prop('primary.vert.bridge', 'Footbridge', 'primary', 'multi', 4, [4, 2], { solidRows: 2 });
prop('primary.vert.catwalk', 'Catwalk/grating', 'primary', 'multi', 3, [4, 1], { solidRows: 1 });
auto('primary.vert.railing', 'Floor-edge railing', 'primary', 'multi', 3, 'wall_run', { collision: 'solid' });
single('primary.vert.pit', 'Pit/hole', 'primary', 'multi', 5, { collision: 'solid' });

// barrier & collision — fences, walls, doors, field-ability obstacles
for (const [id, name] of [['wood', 'Wood post-and-rail fence'], ['chain', 'Chain-link fence'], ['sheet', 'Sheet-metal fence'], ['scrap', 'Scrap fence'], ['picket', 'Picket fence']] as const)
  auto(`primary.fence.${id}`, name, 'primary', 'multi', 4, 'fence_run', { collision: 'solid' });
for (const [id, name] of [['concrete', 'Concrete wall'], ['brick', 'Brick wall'], ['cinder', 'Cinderblock wall'], ['scrap', 'Scrap-metal wall'], ['sandbag', 'Sandbag wall']] as const)
  auto(`primary.wall.${id}`, name, 'primary', 'multi', 4, 'wall_run', { collision: 'solid' });
single('primary.wall.razorwire', 'Razor wire', 'primary', 'multi', 3, { collision: 'solid' });
prop('primary.barrier.boulder', 'Boulder cluster', 'primary', 'multi', 5, [2, 2], { collision: 'solid', solidRows: 2 });
prop('primary.barrier.rubble_block', 'Rubble blockade', 'primary', 'multi', 5, [2, 2], { collision: 'solid', solidRows: 2 });
push({ id: 'primary.door.locked', display_name: 'Locked door', kit: 'primary', biome: 'multi', type: 'anim', anim: { frames: 3, fps: 8 }, layer: 'object', collision: 'solid', elev: '0', pal: 4, phase: 'slice', gen_prompt: `${HD}; locked door, closed/mid/open` });
push({ id: 'primary.door.blast', display_name: 'Blast door', kit: 'primary', biome: 'multi', type: 'anim', anim: { frames: 3, fps: 8 }, layer: 'object', collision: 'solid', elev: '0', pal: 3, phase: 'slice', gen_prompt: `${HD}; heavy blast door, closed/mid/open` });
gatePair('primary.gate.overgrowth', 'Cuttable overgrowth', 'primary', 'multi', 1, 'shear');
gatePair('primary.gate.rockblock', 'Breakable rock-block', 'primary', 'multi', 5, 'breach');
gatePair('primary.gate.debris', 'Haulable debris', 'primary', 'multi', 3, 'haul');
gatePair('primary.gate.dark', 'Light-gated blocker', 'primary', 'multi', 5, 'lumen');
for (const [id, name] of [['route_sign', 'Route sign'], ['warning', 'Warning placard'], ['boundary_post', 'Colony boundary post']] as const)
  single(`primary.sign.${id}`, name, 'primary', 'multi', 4, { collision: 'solid' });

// animated FX (primary)
for (const [id, name] of [['shimmer', 'EM-shimmer zone'], ['spark', 'Sparking light'], ['machine_glow', 'Machine glow'], ['screen_glow', 'Screen glow'], ['steam', 'Steam'], ['smoke', 'Smoke'], ['dust', 'Dust'], ['fog', 'Fog'], ['flame', 'Oil-drum flame'], ['drip', 'Drip/leak'], ['firefly', 'Fireflies/spores']] as const)
  anim(`primary.fx.${id}`, name, 'primary', 'multi', 2, 4, 4);

// ============================ BUILDING / INTERIOR KIT (pals 6–8) ==========
const B: Kit = 'building';
auto('building.shell.wall', 'Interior wall set', B, 'interior', 6, 'edge16', { collision: 'solid' });
for (const [id, name] of [['wood', 'Wood floor'], ['tile', 'Tile floor'], ['concrete', 'Concrete floor'], ['grate', 'Metal grating'], ['carpet', 'Carpet']] as const)
  auto(`building.floor.${id}`, name, B, 'interior', 6, 'terrain_blob');
for (const [id, name] of [['wood', 'Wood wall panel'], ['brick', 'Brick facade'], ['concrete', 'Concrete facade'], ['scrap', 'Scrap facade']] as const)
  auto(`building.facade.${id}`, name, B, 'interior', 6, 'edge16', { collision: 'solid' });
for (const [id, name] of [['peaked', 'Peaked roof'], ['flat', 'Flat roof'], ['corrugated', 'Corrugated roof'], ['tile', 'Tile roof']] as const)
  single(`building.roof.${id}`, name, B, 'interior', 6, { layer: 'top' });
for (const [id, name] of [['lit', 'Window (lit)'], ['dark', 'Window (dark)'], ['broken', 'Window (broken)']] as const)
  single(`building.window.${id}`, name, B, 'interior', 6, { collision: 'solid' });
for (const [id, name] of [['bed', 'Bed'], ['table', 'Table'], ['chair', 'Chair'], ['shelf', 'Shelf'], ['rug', 'Rug'], ['stove', 'Stove'], ['sink', 'Sink'], ['clutter', 'Clutter'], ['plant', 'Potted plant'], ['counter', 'Shop counter'], ['goods_shelf', 'Goods shelving'], ['barter_table', 'Barter table'], ['bunk', 'Bunk'], ['locker', 'Locker'], ['footlocker', 'Footlocker'], ['armory_rack', 'Armory rack (stun-tech)'], ['desk', 'Desk'], ['map_table', 'Map table'], ['archive', 'Archive shelving']] as const)
  single(`building.furn.${id}`, name, B, 'interior', 7, { collision: 'solid' });
single('building.furn.rug_flat', 'Flat rug', B, 'interior', 7, { collision: 'pass' });
// the Bench set (hero) + garage healing
prop('building.bench.workbench', "Grandpa's Bench", B, 'interior', 7, [3, 2], { hero: true, solidRows: 1, prompt: `${HD}; Grandpa's workbench, pegboard tools, vises, scrap bins, a half-built Ohm, the Ohm's Law book, soldering rig` });
for (const [id, name] of [['pegboard', 'Pegboard tool rack'], ['vise', 'Vise'], ['scrap_bin', 'Scrap bin'], ['parts_crate', 'Parts crate'], ['blueprint', 'Blueprints'], ['ohms_law', "Ohm's Law book"], ['soldering_rig', 'Soldering rig'], ['half_ohm', 'Half-built Ohm']] as const)
  single(`building.bench.${id}`, name, B, 'interior', 7, { collision: 'solid' });
obj('building.obj.healing_machine', 'Garage healing machine', B, 'interior', 8, { hero: true, prompt: `${HD}; the garage recharge station, glowing console, cradles` });
obj('building.obj.recharge_station', 'Recharge station', B, 'interior', 8);
obj('building.obj.network_terminal', 'Network-Garage storage terminal', B, 'interior', 8);
obj('building.obj.computer', 'Computer/terminal', B, 'interior', 8);
obj('building.obj.console', 'Civic console', B, 'interior', 8);
obj('building.obj.sign', 'Sign', B, 'interior', 8, { collision: 'solid' });
obj('building.obj.item_pickup', 'Item/node pickup', B, 'interior', 8, { collision: 'pass' });
obj('building.obj.stair_up', 'Stair-up warp', B, 'interior', 6, { collision: 'pass' });
obj('building.obj.stair_down', 'Stair-down warp', B, 'interior', 6, { collision: 'pass' });
push({ id: 'building.obj.interior_door', display_name: 'Interior door', kit: B, biome: 'interior', type: 'anim', anim: { frames: 3, fps: 8 }, layer: 'object', collision: 'solid', elev: '0', pal: 6, phase: 'slice', gen_prompt: `${HD}; interior door, closed/mid/open` });

// ============================ DUNGEON.CAVE KIT (pals 6–8) =================
const DC: Kit = 'dungeon.cave';
auto('dungeon.cave.wall', 'Cave wall', DC, 'underground', 6, 'cliff', { collision: 'solid' });
auto('dungeon.cave.floor', 'Cave floor', DC, 'underground', 6, 'terrain_blob');
single('dungeon.cave.ceiling', 'Cave-ceiling overhang', DC, 'underground', 6, { layer: 'top' });
for (const [id, name] of [['stalactite', 'Stalactite'], ['stalagmite', 'Stalagmite'], ['support', 'Mine support beam'], ['boulder', 'Boulder']] as const)
  single(`dungeon.cave.${id}`, name, DC, 'underground', 7, { collision: 'solid' });
auto('dungeon.cave.pool', 'Underground pool', DC, 'underground', 6, 'terrain_blob', { collision: 'water' });
single('dungeon.cave.ladder', 'Ladder', DC, 'underground', 7, { layer: 'top' });
single('dungeon.cave.lumen_dark', 'LUMEN darkness overlay', DC, 'underground', 8, { layer: 'top' });
anim('dungeon.cave.ore_node', 'Glowing ore/crystal node', DC, 'underground', 8, 4, 3);
anim('dungeon.cave.glow_flora', 'Glow-flora', DC, 'underground', 8, 4, 3);
anim('dungeon.cave.drip', 'Cave drip', DC, 'underground', 8, 4, 4);

// ============================ DUNGEON.MINE KIT (pals 6–8) =================
const DM: Kit = 'dungeon.mine';
auto('dungeon.mine.wall', 'Mine wall (timbered rock)', DM, 'underground', 6, 'cliff', { collision: 'solid' });
auto('dungeon.mine.floor', 'Mine floor', DM, 'underground', 6, 'terrain_blob');
auto('dungeon.mine.rail', 'Mine-cart rail', DM, 'underground', 7, 'fence_run');
single('dungeon.mine.ballast', 'Gravel ballast', DM, 'underground', 6);
prop('dungeon.mine.cart', 'Mine cart', DM, 'underground', 7, [1, 1], { collision: 'solid' });
prop('dungeon.mine.beam', 'Timber support beam', DM, 'underground', 7, [1, 2], { collision: 'solid', solidRows: 1 });
single('dungeon.mine.ladder', 'Ladder', DM, 'underground', 7, { layer: 'top' });
anim('dungeon.mine.lift_glow', 'Shaft glow', DM, 'underground', 8, 4, 3);

// ============================ SEC.OHMSTEAD (pals 6–9) =====================
// the cavern-colony pieces already built (tools/gen-underground.ts) + catalog.
const SO: Kit = 'sec.ohmstead';
auto('sec.ohmstead.ground.cobble', 'Cobblestone floor', SO, 'underground', 6, 'terrain_blob');
auto('sec.ohmstead.ground.grate', 'Metal-grate floor', SO, 'underground', 6, 'edge16');
auto('sec.ohmstead.wall.rock', 'Cavern rock wall', SO, 'underground', 6, 'cliff', { collision: 'solid' });
auto('sec.ohmstead.wall.stone', 'Stone block wall', SO, 'underground', 6, 'wall_run', { collision: 'solid' });
auto('sec.ohmstead.wall.riveted', 'Riveted bunker wall', SO, 'underground', 7, 'edge16', { collision: 'solid' });
auto('sec.ohmstead.water.cave', 'Cave water pool', SO, 'underground', 6, 'terrain_blob', { collision: 'water' });
for (const [id, name, kind] of [['blue', 'Blue Resonance crystal', 'blue'], ['violet', 'Violet Resonance crystal', 'violet'], ['teal', 'Teal Resonance crystal', 'teal']] as const)
  single(`sec.ohmstead.crystal.${id}`, name, SO, 'underground', 8, { collision: 'solid', prompt: `${HD}; faceted ${kind} crystal cluster, emissive, casts additive glow` });
single('sec.ohmstead.fx.lamp', 'Brazier lamp', SO, 'underground', 8, { collision: 'solid', prompt: `${HD}; standing brazier lamp, warm flame, additive glow` });
single('sec.ohmstead.prop.moss', 'Moss patch', SO, 'underground', 6);
for (const [id, name, fp] of [['console', 'Wall console', [1, 1]], ['tank', 'Coolant tank', [1, 2]], ['shelf', 'Storage shelf', [1, 1]], ['bed', 'Colony cot', [1, 1]], ['crate', 'Crate', [1, 1]], ['barrel', 'Barrel', [1, 1]], ['minecart', 'Ore cart', [1, 1]], ['market_stall', 'Market stall', [2, 1]], ['support_beam', 'Support beam', [1, 2]], ['electrical_panel', 'Electrical panel', [1, 1]]] as const)
  prop(`sec.ohmstead.prop.${id}`, name, SO, 'underground', 9, fp as [number, number], { collision: 'solid', solidRows: 1 });
prop('sec.ohmstead.prop.pedestal', 'Hub Resonance monument', SO, 'underground', 8, [1, 1], { hero: true, collision: 'solid', prompt: `${HD}; stone column cradling a big Resonance crystal, focal landmark, glows` });
prop('sec.ohmstead.prop.lift', 'Freight lift (up to the Field)', SO, 'underground', 7, [2, 2], { hero: true, collision: 'solid', solidRows: 2, prompt: `${HD}; freight lift cage in a stone frame, chains, up indicator` });
single('sec.ohmstead.deco.cable', 'Hanging cable run', SO, 'underground', 7, { layer: 'top' });
single('sec.ohmstead.deco.vent', 'Vent', SO, 'underground', 7);
single('sec.ohmstead.deco.fluorescent', 'Fluorescent fixture', SO, 'underground', 8, { layer: 'top' });
single('sec.ohmstead.deco.stencil', 'Warning stencil', SO, 'underground', 7);
single('sec.ohmstead.deco.floor_hatch', 'Floor hatch', SO, 'underground', 7);
obj('sec.ohmstead.obj.elevator', 'The Elevator (car/shaft/doors/panel)', SO, 'underground', 7, { hero: true });
obj('sec.ohmstead.obj.healing_machine', 'Garage healing machine', SO, 'underground', 8);
obj('sec.ohmstead.obj.network_terminal', 'Network-Garage terminal', SO, 'underground', 8);
push({ id: 'sec.ohmstead.obj.blast_door', display_name: 'Bulkhead blast door', kit: SO, biome: 'underground', type: 'anim', anim: { frames: 3, fps: 8 }, layer: 'object', collision: 'solid', elev: '0', pal: 7, phase: 'slice', gen_prompt: `${HD}; riveted bulkhead blast door, closed/mid/open` });

// ============================ SEC.FIELD (pals 6–8) ========================
const SF: Kit = 'sec.field';
auto('sec.field.ground.ruts', 'Dirt ruts', SF, 'prairie', 6, 'terrain_blob');
prop('sec.field.prop.silo_tall', 'Grain silo (tall)', SF, 'prairie', 6, [2, 4], { hero: true, collision: 'solid', solidRows: 1, prompt: `${HD}; rusted corrugated grain silo, sun-bleached prairie` });
prop('sec.field.prop.water_tower', 'Water tower', SF, 'prairie', 6, [3, 4], { hero: true, collision: 'solid', solidRows: 1 });
prop('sec.field.prop.barn', 'Barn', SF, 'prairie', 7, [4, 3], { collision: 'solid', solidRows: 1 });
prop('sec.field.prop.farmhouse', 'Ruined farmhouse', SF, 'prairie', 7, [4, 3], { collision: 'solid', solidRows: 1, variants: ['intact', 'collapsed'] });
prop('sec.field.prop.windmill', 'Windmill', SF, 'prairie', 7, [2, 5], { collision: 'solid', solidRows: 1 });
prop('sec.field.prop.coop_vault', 'Co-op building & Vault (the prologue safe)', SF, 'prairie', 7, [4, 3], { hero: true, collision: 'solid', solidRows: 1, prompt: `${HD}; grain co-op building with the broken-open Co-op Vault safe — the Breaker site` });
prop('sec.field.prop.church', 'Church/schoolhouse facade', SF, 'prairie', 7, [3, 4], { collision: 'solid', solidRows: 1 });
auto('sec.field.fence.cattle', 'Cattle-pen rail fencing', SF, 'prairie', 7, 'fence_run', { collision: 'solid' });
for (const [id, name] of [['feed_trough', 'Feed trough'], ['hay_bale', 'Hay bale'], ['hitching_post', 'Hitching post'], ['porch', 'Porch'], ['tumbleweed', 'Tumbleweed'], ['mesquite_dead', 'Dead mesquite']] as const)
  single(`sec.field.prop.${id}`, name, SF, 'prairie', 7, { collision: 'solid' });
obj('sec.field.obj.elevator_hatch', 'Elevator surface hatch', SF, 'prairie', 6, { hero: true });
anim('sec.field.fx.em_shimmer_house', 'EM-shimmer house overlay', SF, 'prairie', 8, 4, 2, { layer: 'top' });

// ============================ OVERLAY.HIVE (pals 11–12) ===================
// Cross-area Static/hive corruption — composites over saturated maps (R3),
// from Bastion onward. Author once, tint per zone; light→heavy intensity.
const OH: Kit = 'overlay.hive';
for (const tier of ['light', 'med', 'heavy'] as const) {
  anim(`overlay.hive.growth.${tier}`, `Hive growth (${tier})`, OH, 'multi', 12, 4, 3, { layer: 'top', prompt: `${HD}; flesh-and-metal hive growth creeping over ground/walls, ${tier} saturation, sickly translucent` });
  anim(`overlay.hive.veins.${tier}`, `Glowing hive veins (${tier})`, OH, 'multi', 12, 4, 3, { layer: 'top', prompt: `${HD}; glowing hive veins, cyan/magenta pulse, ${tier}, semi-transparent overlay` });
}
anim('overlay.hive.corrupt_grass', 'Corrupted grass', OH, 'multi', 11, 4, 3, { layer: 'top' });
anim('overlay.hive.corrupt_water', 'Corrupted water', OH, 'multi', 11, 4, 3, { layer: 'top' });
anim('overlay.hive.static_shimmer', 'Static screen-shimmer', OH, 'multi', 12, 4, 6, { layer: 'top' });
prop('overlay.hive.relay_tower', 'Hive relay-tower', OH, 'multi', 12, [2, 5], { hero: true, collision: 'solid', solidRows: 1, prompt: `${HD}; hive-grown relay tower, flesh fused with antenna steel, glowing crown, casts additive glow` });

export const CATALOG: AssetRecord[] = [...C, ...AREA_RECORDS, ...CLUTTER_RECORDS];
