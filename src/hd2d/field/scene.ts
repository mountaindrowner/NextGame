import * as THREE from 'three';
import { barn, farmhouse, chapel, waterTower, windmill, coopVault, concreteSilo, binCluster, liftHatch, cattlePen, culvertCrossing, type Built } from './buildings';
import { buildProps } from './props';
import { buildGround, buildWater, buildGrass } from './terrain';

/**
 * The Field, version B: every structure hand-modeled. Placement keeps the
 * original 40×28 layout (roads, creek, tall-grass patches, NPC spots);
 * buildings sit in the open prairie blocks either side of the crossing road.
 *
 * Order matters: buildings + props register their footprints first, so the
 * ground can paint contact shadows under them and grass/flowers skip them.
 */
export interface FieldScene {
  update(t: number, focus: THREE.Vector3): void;
}

export function buildField(scene: THREE.Scene, night: boolean): FieldScene {
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
  const props = buildProps(scene, night);
  buildGround(scene);
  const water = buildWater(scene, night);
  const grass = buildGrass(scene);

  return {
    update(t, focus) {
      water(t);
      grass(t);
      for (const b of built) b.update?.(t);
      props.update?.(t);
      props.motes(t, focus);
    },
  };
}
