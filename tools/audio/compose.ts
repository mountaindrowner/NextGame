/**
 * A small declarative layer over synth.ts so each track is ~a dozen lines:
 * pick a key/mode/progression, a bass style, a drum preset, hand it an explicit
 * lead melody, and `song()` assembles the four PSG channels into a Track.
 * Diatonic chord/scale math lives here so harmonies stay in key automatically.
 */
import type { NoteEvent, Track } from './synth';
import { midiOf } from './synth';

export type Mode = 'major' | 'minor' | 'dorian' | 'phrygian';
export type BassStyle = 'roots' | 'walking' | 'driving' | 'pedal';
export type DrumPreset = 'none' | 'gentle' | 'walk' | 'drive' | 'march' | 'halftime' | 'static';

const SCALE: Record<Mode, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
};

/** MIDI for a 1-based scale degree above a tonic (degrees > 7 wrap octaves). */
function degreeMidi(tonicMidi: number, mode: Mode, degree: number): number {
  const idx = degree - 1;
  const oct = Math.floor(idx / 7);
  return tonicMidi + 12 * oct + SCALE[mode][((idx % 7) + 7) % 7]!;
}

/** Diatonic triad (root/third/fifth) on a scale degree, as MIDI numbers. */
function triad(tonicMidi: number, mode: Mode, degree: number): number[] {
  return [degreeMidi(tonicMidi, mode, degree), degreeMidi(tonicMidi, mode, degree + 2), degreeMidi(tonicMidi, mode, degree + 4)];
}

// ---- drums ----------------------------------------------------------------

export function drums(preset: DrumPreset, bars: number, meter = 4): NoteEvent[] {
  if (preset === 'none') return [];
  const o: NoteEvent[] = [];
  const hat = (beat: number, vel: number): void => void o.push({ beat, dur: 0.08, drum: 'hat', vel });
  const kick = (beat: number, vel: number): void => void o.push({ beat, dur: 0.1, drum: 'kick', vel });
  const snare = (beat: number, vel: number): void => void o.push({ beat, dur: 0.1, drum: 'snare', vel });
  for (let bar = 0; bar < bars; bar++) {
    const b = bar * meter;
    switch (preset) {
      case 'gentle':
        kick(b, 0.5);
        for (let i = 0; i < meter; i++) hat(b + i, 0.16);
        break;
      case 'walk':
        kick(b, 0.85); kick(b + 2, 0.7);
        if (meter >= 4) { snare(b + 1, 0.6); snare(b + 3, 0.6); }
        for (let i = 0; i < meter * 2; i++) hat(b + i * 0.5, 0.15);
        break;
      case 'drive':
        for (let i = 0; i < meter; i++) kick(b + i, 0.9);
        if (meter >= 4) { snare(b + 1, 0.85); snare(b + 3, 0.85); } else snare(b + 1, 0.85);
        for (let i = 0; i < meter * 2; i++) hat(b + i * 0.5, 0.2);
        break;
      case 'march':
        for (let i = 0; i < meter; i++) kick(b + i, 0.8);
        snare(b + 2, 0.7); snare(b + 2.5, 0.45);
        break;
      case 'halftime':
        kick(b, 0.9);
        snare(b + 2, 0.8);
        for (let i = 0; i < meter * 2; i++) hat(b + i * 0.5, 0.13);
        break;
      case 'static': // the Static: irregular, unsettling noise
        hat(b + 0.25, 0.4); hat(b + 1.5, 0.3); snare(b + 2.75, 0.3); hat(b + 3.25, 0.35);
        break;
    }
  }
  return o;
}

// ---- the song builder -----------------------------------------------------

export interface SongSpec {
  bpm: number;
  bars: number;
  meter?: number;
  key: string; // tonic in the chord register, e.g. 'D4'
  mode: Mode;
  progression: number[]; // one scale degree per bar (tiled if shorter than `bars`)
  bass?: BassStyle;
  drums?: DrumPreset;
  arp?: { duty?: number; vel?: number; step?: number } | false; // pulseB chord arps
  lead?: NoteEvent[]; // explicit pulseA melody, beats from 0
  pads?: NoteEvent[]; // optional extra sustained pulseB content
}

function bassFor(style: BassStyle, rootMidi: number, barBeat: number, meter: number): NoteEvent[] {
  const lo = rootMidi - 24; // two octaves down for a fat triangle bass
  switch (style) {
    case 'pedal':
      return [{ beat: barBeat, dur: meter * 0.97, pitch: lo, vel: 0.95 }];
    case 'driving': {
      const o: NoteEvent[] = [];
      for (let i = 0; i < meter * 2; i++) o.push({ beat: barBeat + i * 0.5, dur: 0.45, pitch: lo, vel: 0.95 });
      return o;
    }
    case 'walking': {
      const seq = [0, 7, 12, 7];
      return seq.slice(0, meter).map((iv, i) => ({ beat: barBeat + i, dur: 0.9, pitch: lo + iv, vel: 0.9 }));
    }
    case 'roots':
    default:
      return [
        { beat: barBeat, dur: meter / 2 - 0.1, pitch: lo, vel: 0.95 },
        { beat: barBeat + meter / 2, dur: meter / 2 - 0.1, pitch: lo, vel: 0.85 },
      ];
  }
}

export function song(spec: SongSpec): Track {
  const meter = spec.meter ?? 4;
  const tonic = midiOf(spec.key);
  const triangle: NoteEvent[] = [];
  const pulseB: NoteEvent[] = [];
  const arp = spec.arp === false ? null : { duty: spec.arp?.duty ?? 0.5, vel: spec.arp?.vel ?? 0.4, step: spec.arp?.step ?? 0.5 };

  for (let bar = 0; bar < spec.bars; bar++) {
    const degree = spec.progression[bar % spec.progression.length]!;
    const ch = triad(tonic, spec.mode, degree);
    const barBeat = bar * meter;
    triangle.push(...bassFor(spec.bass ?? 'roots', ch[0]!, barBeat, meter));
    if (arp) {
      const per = Math.round(meter / arp.step);
      for (let i = 0; i < per; i++) {
        pulseB.push({ beat: barBeat + i * arp.step, dur: arp.step * 0.9, pitch: ch[i % ch.length], vel: arp.vel, duty: arp.duty });
      }
    }
  }
  if (spec.pads) pulseB.push(...spec.pads);

  return {
    bpm: spec.bpm,
    loopBeats: spec.bars * meter,
    channels: {
      pulseA: spec.lead ?? [],
      pulseB,
      triangle,
      noise: drums(spec.drums ?? 'gentle', spec.bars, meter),
    },
  };
}

/**
 * Melody mini-DSL: `[pitch, dur]` pairs (pitch `null` = rest) laid end to end
 * from `start`, so a lead line reads as a compact sequence.
 */
export function mel(
  seq: Array<[string | null, number]>,
  start = 0,
  opts: { vel?: number; duty?: number; arp?: number[] } = {},
): NoteEvent[] {
  const out: NoteEvent[] = [];
  let beat = start;
  for (const [pitch, dur] of seq) {
    if (pitch) out.push({ beat, dur: dur * 0.96, pitch, vel: opts.vel ?? 0.9, duty: opts.duty ?? 0.5, ...(opts.arp ? { arp: opts.arp } : {}) });
    beat += dur;
  }
  return out;
}

/** Shift any event list later by `offset` beats. */
export const shift = (offset: number, evs: NoteEvent[]): NoteEvent[] => evs.map((e) => ({ ...e, beat: e.beat + offset }));

/** A short non-looping cue/jingle from explicit channels (no progression engine). */
export function cue(bpm: number, beats: number, channels: Track['channels']): Track {
  return { bpm, loopBeats: beats, channels };
}
