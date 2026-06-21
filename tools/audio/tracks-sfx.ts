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
  // a heavy metal stamp — the wordmark slamming into place (kick+snare hit + low triangle drop)
  'sfx.stamp': cue(240, 1.4, {
    noise: [
      { beat: 0, dur: 0.16, drum: 'kick', vel: 1.0 },
      { beat: 0, dur: 0.16, drum: 'snare', vel: 0.7 },
    ],
    triangle: mel([['C3', 0.7]], 0, { vel: 0.85 }),
  }),
  // a rising "here we go" flourish when a new game begins
  'sfx.newgame': cue(240, 2.6, {
    pulseA: mel([['C5', 0.5], ['E5', 0.5], ['G5', 0.5], ['C6', 1.0]], 0, { duty: 0.5, vel: 0.5 }),
    noise: [{ beat: 0, dur: 0.12, drum: 'kick', vel: 0.7 }],
  }),
};
