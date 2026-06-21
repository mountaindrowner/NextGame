/**
 * Per-type battle move SFX (playtest note #6: "unique sound effects based on
 * the moves"). One short element cue per TypeName, played when a move fires, so
 * a VOLT move zaps, a THERM move whooshes, a FRAME move clangs, and so on —
 * "unique per move" at a scale that doesn't need 150 bespoke sounds. Plus a
 * generic impact tick on the hit. Crisp, quiet, sub-half-second. Original.
 */
import type { Track } from './synth';
import { cue, mel } from './compose';

export const MOVE_SFX_DATA: Record<string, Track> = {
  // VOLT — a crackling electric zap (high noise hats + bright pulse)
  'sfx.mv.volt': cue(300, 1.4, { noise: [{ beat: 0, dur: 0.16, drum: 'hat', vel: 0.7 }, { beat: 0.5, dur: 0.1, drum: 'hat', vel: 0.5 }], pulseA: mel([['B6', 0.4], ['E6', 0.5]], 0, { duty: 0.5, vel: 0.4 }) }),
  // THERM — a fire whoosh (noise sweep over a low triangle)
  'sfx.mv.therm': cue(300, 1.5, { noise: [{ beat: 0, dur: 0.32, drum: 'snare', vel: 0.55 }], triangle: mel([['E3', 0.6], ['C3', 0.7]], 0, { vel: 0.5 }) }),
  // COOLANT — a cold descending shimmer
  'sfx.mv.coolant': cue(300, 1.5, { pulseA: mel([['A5', 0.45], ['E5', 0.45], ['A4', 0.6]], 0, { duty: 0.25, vel: 0.38 }) }),
  // FRAME — a heavy metal clang (kick+snare hit + low tone)
  'sfx.mv.frame': cue(300, 1.3, { noise: [{ beat: 0, dur: 0.16, drum: 'kick', vel: 0.9 }, { beat: 0, dur: 0.16, drum: 'snare', vel: 0.6 }], triangle: mel([['C3', 0.55]], 0, { vel: 0.7 }) }),
  // OPTIC — a bright laser beam descending
  'sfx.mv.optic': cue(360, 1.3, { pulseA: mel([['E7', 0.3], ['B6', 0.3], ['E6', 0.45]], 0, { duty: 0.5, vel: 0.4 }) }),
  // SONIC — a resonant two-note chord pulse
  'sfx.mv.sonic': cue(280, 1.6, { pulseA: mel([['C5', 0.8]], 0, { duty: 0.5, vel: 0.4 }), pulseB: mel([['G5', 0.8]], 0, { duty: 0.5, vel: 0.3 }) }),
  // SIGNAL — a digital arpeggio blip
  'sfx.mv.signal': cue(360, 1.4, { pulseA: mel([['C6', 0.25], ['E6', 0.25], ['G6', 0.25], ['C7', 0.35]], 0, { duty: 0.25, vel: 0.35 }) }),
  // MOTOR — a rising rev (buzzy pulse + a noise tick)
  'sfx.mv.motor': cue(300, 1.4, { pulseA: mel([['C4', 0.3], ['E4', 0.3], ['G4', 0.45]], 0, { duty: 0.5, vel: 0.4 }), noise: [{ beat: 0, dur: 0.2, drum: 'hat', vel: 0.4 }] }),
  // BREAKER — a glitchy dissonant break
  'sfx.mv.breaker': cue(300, 1.4, { noise: [{ beat: 0, dur: 0.12, drum: 'snare', vel: 0.7 }, { beat: 0.6, dur: 0.1, drum: 'hat', vel: 0.5 }], pulseA: mel([['C#6', 0.3], ['F#5', 0.45]], 0, { duty: 0.125, vel: 0.35 }) }),
  // UTILITY — a plain mechanical click
  'sfx.mv.utility': cue(300, 1.1, { pulseA: mel([['A5', 0.3], ['D5', 0.35]], 0, { duty: 0.5, vel: 0.32 }) }),
  // VERDANT — a soft organic rustle
  'sfx.mv.verdant': cue(280, 1.5, { noise: [{ beat: 0, dur: 0.2, drum: 'hat', vel: 0.3 }], triangle: mel([['G4', 0.5], ['B4', 0.6]], 0, { vel: 0.4 }) }),
  // generic impact tick when a hit lands (layered under the element cue)
  'sfx.mv.hit': cue(300, 1.0, { noise: [{ beat: 0, dur: 0.1, drum: 'kick', vel: 0.6 }] }),
};
