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
};
