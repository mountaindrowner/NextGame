import type { DataView } from '../core/battle/contract';
import { MOVES_BY_ID } from './moves';
import { SPECIES_BY_NUM } from './species';
import { TYPE_CHART } from './typechart';

/** The game's single DataView wired to canon data. Core receives this via
 * injection and never imports it (contract §2.1). */
export const GAME_DATA: DataView = {
  species(num) {
    const s = SPECIES_BY_NUM.get(num);
    if (!s) throw new Error(`unknown species #${num}`);
    return s;
  },
  move(id) {
    const m = MOVES_BY_ID.get(id);
    if (!m) throw new Error(`unknown move "${id}"`);
    return m;
  },
  chart: TYPE_CHART,
};
