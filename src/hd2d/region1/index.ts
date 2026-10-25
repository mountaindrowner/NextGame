import type { AreaBuilder } from '../area';
import { buildPickett } from './pickett';
import { buildGrainLine } from './grainline';
import { buildBreaks } from './breaks';
import { buildStockLane } from './stocklane';
import { buildStockyards } from './stockyards';
import { buildCreekRoad } from './creekroad';
import { buildDepotRoad } from './depotroad';
import { buildDriveInRoad } from './driveinroad';
import { buildDriveIn } from './drivein';
import { buildOnRamp } from './onramp';
import { buildGrainTower, buildGrainTower2, buildGrainTower3 } from './graintower';
import { buildRoundhouse } from './roundhouse';
import { buildOhmDepot } from './ohmdepot';

/** Railhead Country's new sections (docs/design/regions.md), by area id. */
export const REGION1: Record<string, AreaBuilder> = {
  pickett: buildPickett,
  grainline: buildGrainLine,
  breaks: buildBreaks,
  stocklane: buildStockLane,
  stockyards: buildStockyards,
  creekroad: buildCreekRoad,
  depotroad: buildDepotRoad,
  driveinrd: buildDriveInRoad,
  drivein: buildDriveIn,
  onramp: buildOnRamp,
  graintower: buildGrainTower,
  graintower2: buildGrainTower2,
  graintower3: buildGrainTower3,
  roundhouse: buildRoundhouse,
  ohmdepot: buildOhmDepot,
};
