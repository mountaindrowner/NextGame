import { barn, farmhouse, chapel, waterTower, windmill, coopVault, concreteSilo, binCluster, liftHatch, cattlePen, culvertCrossing, type Built } from './buildings';
import { buildProps } from './props';
import { buildGround, buildWater, buildGrass } from '../terrain';
import { FIELD_WORLD, fieldBlocked, COLS, ROWS, WATER_Y } from './layout';
import { setWorld, heightAt, cell } from '../world';
import { DAY, NIGHT } from '../mood';
import { castOf, loadMap, type AreaBuilder } from '../area';
import { husk } from '../region1/props';

/**
 * The Field, version B: every structure hand-modeled. Placement keeps the
 * original 40×28 layout (roads, creek, tall-grass patches, NPC spots);
 * buildings sit in the open prairie blocks either side of the crossing road.
 *
 * Order matters: buildings + props register their footprints first, so the
 * ground can paint contact shadows under them and grass/flowers skip them.
 */
export const buildField: AreaBuilder = async (scene, night) => {
  setWorld(FIELD_WORLD);
  const data = await loadMap('the-field');
  const built: Built[] = [
    // north of main street: the vault the story turns on, its silo, a homestead, the barn, grain bins
    coopVault(scene, 16.4, 10.8, night),
    concreteSilo(scene, 12.4, 10.9),
    farmhouse(scene, 7.5, 11.1, 0, night),
    barn(scene, 28.9, 11.0),
    binCluster(scene, [34.0, 35.7, 37.3], 11.4),
    // south of main street: chapel + churchyard by the creek, a second house, the water tower, windmill + pen
    chapel(scene, 10.3, 20.9),
    farmhouse(scene, 15.8, 20.9, 1, night),
    waterTower(scene, 25.5, 20.6),
    windmill(scene, 32.5, 21.9),
    cattlePen(scene, 32.6, 23.2, 37.8, 26.6),
    // the surface lift up from Ohmstead, and the culvert where the creek ducks under the road
    liftHatch(scene, 20.5, 17.2, night),
    culvertCrossing(scene),
  ];
  // the Spotting: three freed Ohms the Garrison decommissioned in the open street
  husk(scene, 27.6, 16.9, 0.4, 11);
  husk(scene, 29.2, 17.6, 2.1, 12);
  husk(scene, 28.4, 12.1, 1.2, 13);
  const props = buildProps(scene, night);
  buildGround(scene);
  const water = buildWater(scene, night, 0.6, 23.7, 19.2, 27.3, WATER_Y);
  const grass = buildGrass(scene);

  const sign = data.signs?.[0];
  return {
    id: 'field',
    kind: 'town',
    title: 'THE FIELD',
    sub: night ? 'Ohmstead surface · after dark' : 'Ohmstead surface',
    mood: night ? NIGHT : DAY,
    sky: true,
    cam: { x0: 8.2, x1: COLS - 8.2, z0: 4.2, z1: ROWS - 4.6 },
    blocked: (x, z, r) => fieldBlocked(x, z, r),
    ground: (x, z) => Math.max(heightAt(x, z), -0.1),
    wild: (x, z) => cell(Math.floor(x), Math.floor(z)) === 'T',
    zone: 'field-grass',
    spawns: {
      start: { x: data.spawn.x + 0.5, z: data.spawn.y + 0.3, face: 'S' },
      lift: { x: 20.5, z: 18.3, face: 'S' },
      north: { x: 20.5, z: 1.1, face: 'S' },
      west: { x: 1.1, z: 14.5, face: 'E' },
      east: { x: COLS - 1.1, z: 14.5, face: 'W' },
    },
    triggers: [
      { x0: 18.6, z0: -2, x1: 22.4, z1: 0.3, go: { to: 'farmroad', spawn: 'south' } },
      { x0: -3, z0: 12.6, x1: 0.3, z1: 16.4, go: { to: 'depotroad', spawn: 'east' } },
      { x0: COLS - 0.3, z0: 12.6, x1: COLS + 3, z1: 16.4, go: { to: 'stocklane', spawn: 'west' } },
    ],
    things: [
      // the sign post stands a touch east of its old tile (props.ts)
      ...(sign ? [{ x: 22.7, z: 16.7, height: 1.5, label: 'Read', say: { name: 'Sign', lines: [sign.text] } }] : []),
      { x: 16.4, z: 13.0, height: 2.0, label: 'Look', reach: 1.6, say: { lines: ['The vault doors are chained shut. Whatever the co-op kept in there, it\'s still in there.'] } },
      { x: 28.4, z: 17.9, height: 1.2, label: 'Look', reach: 1.8, say: { lines: ['Three Ohms, switched off and left where they fell. Grey paint on each: a chevron, a row of tally marks.'] } },
      { x: 20.5, z: 17.1, height: 2.6, label: 'Ride down', reach: 1.3, say: { lines: ['The cage rattles shut. Down to Ohmstead.'] }, go: { to: 'ohmstead', spawn: 'lift' } },
    ],
    npcs: castOf(data),
    update(t, focus) {
      water(t);
      grass(t);
      for (const b of built) b.update?.(t);
      props.update?.(t);
      props.motes(t, focus);
    },
  };
};
