/**
 * The score's DNA (soundtrack spec §3) — original leitmotifs authored once as
 * reusable phrases, plus small helpers to place / transpose / tile them. Every
 * track in OHMFRONT is built from these so the music feels like one score.
 * All ORIGINAL melodic material (no transcribed third-party tunes).
 */
import type { NoteEvent } from './synth';
import { midiOf } from './synth';

export type Phrase = NoteEvent[];

/** Shift a phrase later by `offset` beats. */
export const at = (offset: number, p: Phrase): Phrase => p.map((n) => ({ ...n, beat: n.beat + offset }));

/** Transpose a phrase by `semis` semitones (drums/untuned notes pass through). */
export const trans = (semis: number, p: Phrase): Phrase =>
  p.map((n) => ({ ...n, pitch: n.pitch === undefined ? undefined : midiOf(n.pitch) + semis }));

/** Tile a phrase `count` times every `period` beats. */
export function tile(count: number, period: number, p: Phrase): Phrase {
  const out: Phrase = [];
  for (let i = 0; i < count; i++) out.push(...at(i * period, p));
  return out;
}

/** Even arpeggio over `bars` (4 beats each), cycling the given chord tones. */
export function arpBars(
  chords: string[][],
  startBeat: number,
  opts: { step?: number; vel?: number; duty?: number } = {},
): Phrase {
  const step = opts.step ?? 0.5;
  const out: Phrase = [];
  chords.forEach((chord, bar) => {
    const per = Math.round(4 / step);
    for (let i = 0; i < per; i++) {
      out.push({
        beat: startBeat + bar * 4 + i * step,
        dur: step * 0.9,
        pitch: chord[i % chord.length],
        vel: opts.vel ?? 0.6,
        duty: opts.duty ?? 0.5,
      });
    }
  });
  return out;
}

/** A steady root bass: each bar's root on the down- and half-bar beats. */
export function bassBars(roots: string[], startBeat: number, opts: { drive?: boolean } = {}): Phrase {
  const out: Phrase = [];
  roots.forEach((root, bar) => {
    const b = startBeat + bar * 4;
    if (opts.drive) {
      for (let i = 0; i < 8; i++) out.push({ beat: b + i * 0.5, dur: 0.45, pitch: root, vel: 0.95 }); // pulsing eighths
    } else {
      out.push({ beat: b, dur: 1.9, pitch: root, vel: 0.95 });
      out.push({ beat: b + 2, dur: 1.9, pitch: root, vel: 0.85 });
    }
  });
  return out;
}

// ---- the motifs (original) ------------------------------------------------

/** MAIN — a rising 4-note call (D major), weathered-heroic. */
export const MAIN: Phrase = [
  { beat: 0, dur: 1, pitch: 'D4' },
  { beat: 1, dur: 1, pitch: 'F#4' },
  { beat: 2, dur: 1, pitch: 'A4' },
  { beat: 3, dur: 1, pitch: 'D5' },
];

/** WONDER — high pentatonic sparkle (D maj pentatonic), discovery. */
export const WONDER: Phrase = [
  { beat: 0, dur: 0.25, pitch: 'D5', duty: 0.25 },
  { beat: 0.25, dur: 0.25, pitch: 'E5', duty: 0.25 },
  { beat: 0.5, dur: 0.25, pitch: 'F#5', duty: 0.25 },
  { beat: 0.75, dur: 0.25, pitch: 'A5', duty: 0.25 },
  { beat: 1, dur: 0.25, pitch: 'B5', duty: 0.25 },
  { beat: 1.25, dur: 0.25, pitch: 'A5', duty: 0.25 },
  { beat: 1.5, dur: 0.5, pitch: 'F#5', duty: 0.25 },
];

/** RESISTANCE — a bright major fanfare fragment; the uplift / liberation. */
export const RESISTANCE: Phrase = [
  { beat: 0, dur: 0.5, pitch: 'D4' },
  { beat: 0.5, dur: 0.5, pitch: 'A4' },
  { beat: 1, dur: 0.5, pitch: 'D5' },
  { beat: 1.5, dur: 0.5, pitch: 'F#5' },
];

/** HOME — a warm folk lilt (G major), humble with a little ache. */
export const HOME: Phrase = [
  { beat: 0, dur: 1, pitch: 'G4' },
  { beat: 1, dur: 0.5, pitch: 'B4' },
  { beat: 1.5, dur: 0.5, pitch: 'A4' },
  { beat: 2, dur: 1, pitch: 'G4' },
  { beat: 3, dur: 1, pitch: 'D4' },
];

/** ELI / Grandpa — a tender descending lullaby (A minor), simple and sad. */
export const ELI: Phrase = [
  { beat: 0, dur: 1, pitch: 'E5' },
  { beat: 1, dur: 1, pitch: 'C5' },
  { beat: 2, dur: 1, pitch: 'B4' },
  { beat: 3, dur: 1, pitch: 'A4' },
];

/** PERSISTENCE — a cold minor + tritone mechanical ostinato; "the Update". */
export const PERSISTENCE: Phrase = [
  { beat: 0, dur: 0.5, pitch: 'D4', duty: 0.5 },
  { beat: 0.5, dur: 0.5, pitch: 'D4', duty: 0.5 },
  { beat: 1, dur: 0.5, pitch: 'G#4', duty: 0.5 }, // the tritone
  { beat: 1.5, dur: 0.5, pitch: 'D4', duty: 0.5 },
  { beat: 2, dur: 0.5, pitch: 'F4', duty: 0.5 },
  { beat: 2.5, dur: 0.5, pitch: 'D4', duty: 0.5 },
  { beat: 3, dur: 0.5, pitch: 'G#4', duty: 0.5 },
  { beat: 3.5, dur: 0.5, pitch: 'C#4', duty: 0.5 },
];

/** STATIC — an atonal encroaching texture (use on the noise + a detuned pulse). */
export const STATIC: Phrase = [
  { beat: 0, dur: 0.25, drum: 'hat', vel: 0.5 },
  { beat: 0.75, dur: 0.25, drum: 'hat', vel: 0.35 },
  { beat: 1.5, dur: 0.25, drum: 'snare', vel: 0.3 },
  { beat: 2.25, dur: 0.25, drum: 'hat', vel: 0.45 },
  { beat: 3, dur: 0.25, drum: 'hat', vel: 0.4 },
  { beat: 3.5, dur: 0.25, drum: 'snare', vel: 0.25 },
];

/** BREAKER / Pull — a single repeating "calling" pulse (the device's hum). */
export const BREAKER: Phrase = [
  { beat: 0, dur: 1.5, pitch: 'A4', duty: 0.125, vel: 0.7 },
  { beat: 2, dur: 0.5, pitch: 'E5', duty: 0.125, vel: 0.5 },
];
