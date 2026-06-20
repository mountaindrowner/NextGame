/**
 * Ambience beds (soundtrack spec §10) — quiet looping textures, not full tracks.
 */
import type { NoteEvent, Track } from './synth';
import { cue, mel } from './compose';

const sparse = (beats: number, every: number, drum: 'hat' | 'snare', vel: number): NoteEvent[] => {
  const o: NoteEvent[] = [];
  for (let b = 0; b < beats; b += every) o.push({ beat: b, dur: 0.1, drum, vel });
  return o;
};

export const AMBIENCE_TRACKS: Record<string, Track> = {
  // amb.current — The Current radio: a faint lo-fi musical hum
  'amb.current': cue(72, 8, {
    pulseB: mel([['A4', 2], ['C5', 2], ['E5', 2], ['D5', 2]], 0, { vel: 0.18, duty: 0.25 }),
    triangle: mel([['A2', 4], ['F2', 4]], 0, { vel: 0.4 }),
  }),
  // amb.net — net/uplink room tone: digital shimmer
  'amb.net': cue(120, 8, {
    pulseB: mel([['B5', 0.25], ['F#6', 0.25], ['B6', 0.25], ['F#6', 0.25]], 0, { vel: 0.1, duty: 0.125 }),
    pulseA: [{ beat: 0, dur: 8, pitch: 'B3', vel: 0.12, duty: 0.5 }],
  }),
  // amb.wind — open badlands wind (filtered-noise bed)
  'amb.wind': cue(60, 8, {
    noise: sparse(8, 0.5, 'hat', 0.08),
    triangle: [{ beat: 0, dur: 8, pitch: 'D2', vel: 0.18 }],
  }),
  // amb.cave — underground drips + low hum
  'amb.cave': cue(60, 8, {
    noise: [{ beat: 1, dur: 0.1, drum: 'hat', vel: 0.25 }, { beat: 3.5, dur: 0.1, drum: 'hat', vel: 0.2 }, { beat: 6, dur: 0.1, drum: 'hat', vel: 0.28 }],
    triangle: [{ beat: 0, dur: 8, pitch: 'A1', vel: 0.2 }],
  }),
};
