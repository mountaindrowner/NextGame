/**
 * UI sound effects (spec §9 SFX) — tiny chiptune blips for menu navigation and
 * text. Crisp, quiet, sub-quarter-second. Original.
 */
import type { Track } from './synth';
import { cue, mel } from './compose';

export const SFX_TRACKS_DATA: Record<string, Track> = {
  // a soft high tick when the cursor moves
  'sfx.cursor': cue(240, 0.6, { pulseA: mel([['G6', 0.4]], 0, { duty: 0.25, vel: 0.4 }) }),
  // a confirming up-blip on select
  'sfx.select': cue(240, 1.4, { pulseA: mel([['C6', 0.4], ['G6', 0.7]], 0, { duty: 0.25, vel: 0.5 }) }),
  // a lower down-blip on back/cancel
  'sfx.back': cue(240, 1.4, { pulseA: mel([['G5', 0.4], ['D5', 0.7]], 0, { duty: 0.25, vel: 0.45 }) }),
  // a quiet tick as dialogue advances
  'sfx.text': cue(240, 0.5, { pulseA: mel([['E6', 0.35]], 0, { duty: 0.5, vel: 0.3 }) }),
};
