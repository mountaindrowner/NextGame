/**
 * Composes OHMFRONT's first four chiptune tracks from the leitmotifs and writes
 * them to public/audio/**. Run: `npm run audio:build`.
 *
 * Tracks (soundtrack spec §4–6,9): title · overworld · wild battle · victory
 * jingle — enough to score a full boot → explore → battle → win loop with no
 * silence. Everything original; pure PSG synthesis (no samples/soundfont).
 */
import { join } from 'node:path';
import type { NoteEvent, Track } from './synth';
import { writeTrackWav } from './synth';
import { MAIN, WONDER, RESISTANCE, at, trans, tile, arpBars, bassBars } from './motifs';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/audio');

const hats = (bars: number, vel = 0.22): NoteEvent[] => {
  const out: NoteEvent[] = [];
  for (let i = 0; i < bars * 8; i++) out.push({ beat: i * 0.5, dur: 0.1, drum: 'hat', vel });
  return out;
};
const backbeat = (bars: number): NoteEvent[] => {
  const out: NoteEvent[] = [];
  for (let bar = 0; bar < bars; bar++) {
    out.push({ beat: bar * 4 + 0, dur: 0.1, drum: 'kick', vel: 0.95 });
    out.push({ beat: bar * 4 + 1, dur: 0.1, drum: 'snare', vel: 0.8 });
    out.push({ beat: bar * 4 + 2, dur: 0.1, drum: 'kick', vel: 0.85 });
    out.push({ beat: bar * 4 + 3, dur: 0.1, drum: 'snare', vel: 0.8 });
  }
  return out;
};

// ---------------------------------------------------------------- TITLE -----
// D major, grand-but-worn. I–V–vi–IV (D A Bm G). Main stated clean + Wonder.
const title: Track = {
  bpm: 84,
  loopBeats: 16,
  channels: {
    pulseA: [
      ...MAIN, // bar 1 (D): the call, clean
      { beat: 4, dur: 1, pitch: 'C#5' }, { beat: 5, dur: 1, pitch: 'A4' }, // bar 2 (A)
      { beat: 6, dur: 1, pitch: 'E4' }, { beat: 7, dur: 1, pitch: 'A4' },
      { beat: 8, dur: 1, pitch: 'B4' }, { beat: 9, dur: 1, pitch: 'D5' }, // bar 3 (Bm)
      { beat: 10, dur: 1, pitch: 'F#5' }, { beat: 11, dur: 1, pitch: 'D5' },
      { beat: 12, dur: 1, pitch: 'G4' }, { beat: 13, dur: 1, pitch: 'A4' }, // bar 4 (G) → resolve to D
      { beat: 14, dur: 1, pitch: 'F#4' }, { beat: 15, dur: 1, pitch: 'D4' },
    ],
    pulseB: [
      ...arpBars([['D4', 'F#4', 'A4'], ['A3', 'C#4', 'E4'], ['B3', 'D4', 'F#4'], ['G3', 'B3', 'D4']], 0, { vel: 0.4, duty: 0.25 }),
      ...at(2, WONDER), // a sparkle over bar 1
      ...at(10.5, trans(-2, WONDER)), // and a fainter one later
    ],
    triangle: bassBars(['D2', 'A2', 'B2', 'G2'], 0),
    noise: [...hats(16, 0.18), { beat: 0, dur: 0.1, drum: 'kick', vel: 0.5 }, { beat: 8, dur: 0.1, drum: 'kick', vel: 0.5 }],
  },
};

// ------------------------------------------------------------ OVERWORLD -----
// G major, warm walking lilt. G D Em C (I V vi IV). Home-flavored melody.
const overworld: Track = {
  bpm: 112,
  loopBeats: 16,
  channels: {
    pulseA: [
      { beat: 0, dur: 1, pitch: 'G4' }, { beat: 1, dur: 0.5, pitch: 'B4' }, { beat: 1.5, dur: 0.5, pitch: 'A4' },
      { beat: 2, dur: 1, pitch: 'G4' }, { beat: 3, dur: 1, pitch: 'D5' }, // bar 1 (G) — Home lilt
      { beat: 4, dur: 1, pitch: 'F#4' }, { beat: 5, dur: 1, pitch: 'A4' },
      { beat: 6, dur: 1, pitch: 'D5' }, { beat: 7, dur: 1, pitch: 'A4' }, // bar 2 (D)
      { beat: 8, dur: 1, pitch: 'E4' }, { beat: 9, dur: 0.5, pitch: 'G4' }, { beat: 9.5, dur: 0.5, pitch: 'B4' },
      { beat: 10, dur: 1, pitch: 'E5' }, { beat: 11, dur: 1, pitch: 'B4' }, // bar 3 (Em)
      { beat: 12, dur: 1, pitch: 'C5' }, { beat: 13, dur: 1, pitch: 'B4' },
      { beat: 14, dur: 1, pitch: 'A4' }, { beat: 15, dur: 1, pitch: 'G4' }, // bar 4 (C) → resolve to G
    ],
    pulseB: arpBars([['B3', 'D4', 'G4'], ['A3', 'D4', 'F#4'], ['B3', 'E4', 'G4'], ['C4', 'E4', 'G4']], 0, { vel: 0.34, duty: 0.5, step: 0.5 }),
    triangle: bassBars(['G2', 'D2', 'E2', 'C2'], 0),
    noise: [...hats(16, 0.16), ...backbeat(4).map((d) => ({ ...d, vel: (d.vel ?? 0.8) * 0.6 }))],
  },
};

// ---------------------------------------------------------- WILD BATTLE -----
// A minor, fast & scrappy. i–VI–VII–V (Am F G E). Driving everything.
const battleWild: Track = {
  bpm: 150,
  loopBeats: 16,
  channels: {
    pulseA: [
      // bar 1 (Am) — aggressive run
      { beat: 0, dur: 0.5, pitch: 'A4' }, { beat: 0.5, dur: 0.5, pitch: 'C5' }, { beat: 1, dur: 0.5, pitch: 'E5' }, { beat: 1.5, dur: 0.5, pitch: 'A5' },
      { beat: 2, dur: 0.5, pitch: 'E5' }, { beat: 2.5, dur: 0.5, pitch: 'C5' }, { beat: 3, dur: 1, pitch: 'A4' },
      // bar 2 (F)
      { beat: 4, dur: 0.5, pitch: 'F4' }, { beat: 4.5, dur: 0.5, pitch: 'A4' }, { beat: 5, dur: 0.5, pitch: 'C5' }, { beat: 5.5, dur: 0.5, pitch: 'F5' },
      { beat: 6, dur: 1, pitch: 'C5' }, { beat: 7, dur: 1, pitch: 'A4' },
      // bar 3 (G)
      { beat: 8, dur: 0.5, pitch: 'G4' }, { beat: 8.5, dur: 0.5, pitch: 'B4' }, { beat: 9, dur: 0.5, pitch: 'D5' }, { beat: 9.5, dur: 0.5, pitch: 'G5' },
      { beat: 10, dur: 1, pitch: 'D5' }, { beat: 11, dur: 1, pitch: 'B4' },
      // bar 4 (E) → tension back to Am
      { beat: 12, dur: 0.5, pitch: 'E5' }, { beat: 12.5, dur: 0.5, pitch: 'G#5' }, { beat: 13, dur: 1, pitch: 'B5' },
      { beat: 14, dur: 0.5, pitch: 'E5' }, { beat: 14.5, dur: 0.5, pitch: 'B4' }, { beat: 15, dur: 1, pitch: 'E5' },
    ],
    pulseB: arpBars([['A4', 'C5', 'E5'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'], ['E4', 'G#4', 'B4']], 0, { vel: 0.32, duty: 0.125, step: 0.25 }),
    triangle: bassBars(['A1', 'F1', 'G1', 'E1'], 0, { drive: true }),
    noise: [
      ...(() => {
        const o: NoteEvent[] = [];
        for (let bar = 0; bar < 4; bar++) {
          for (let i = 0; i < 4; i++) o.push({ beat: bar * 4 + i, dur: 0.1, drum: 'kick', vel: 0.9 });
          o.push({ beat: bar * 4 + 1, dur: 0.1, drum: 'snare', vel: 0.85 });
          o.push({ beat: bar * 4 + 3, dur: 0.1, drum: 'snare', vel: 0.85 });
        }
        return o;
      })(),
      ...hats(16, 0.2),
    ],
  },
};

// ------------------------------------------------------- VICTORY JINGLE -----
// D major, ~4s Resistance fanfare, non-looping; ends on a held D chord.
const victory: Track = {
  bpm: 132,
  loopBeats: 9,
  channels: {
    pulseA: [
      ...RESISTANCE, // D A D F# rising
      { beat: 2, dur: 0.5, pitch: 'A5' }, { beat: 2.5, dur: 0.5, pitch: 'F#5' },
      { beat: 3, dur: 0.5, pitch: 'A5' }, { beat: 3.5, dur: 0.5, pitch: 'D6' },
      { beat: 4, dur: 3, pitch: 'D6' }, // held triumphant top
    ],
    pulseB: [
      ...at(0.5, trans(-12, RESISTANCE)),
      { beat: 4, dur: 3, pitch: 'A5', vel: 0.6, duty: 0.25 },
      { beat: 4, dur: 3, pitch: 'F#5', vel: 0.5, duty: 0.25 },
    ],
    triangle: [
      { beat: 0, dur: 0.5, pitch: 'D3' }, { beat: 0.5, dur: 0.5, pitch: 'D3' },
      { beat: 1, dur: 0.5, pitch: 'A2' }, { beat: 1.5, dur: 0.5, pitch: 'A2' },
      { beat: 2, dur: 0.5, pitch: 'G2' }, { beat: 2.5, dur: 0.5, pitch: 'G2' },
      { beat: 3, dur: 0.5, pitch: 'A2' }, { beat: 3.5, dur: 0.5, pitch: 'A2' },
      { beat: 4, dur: 3.5, pitch: 'D2' },
    ],
    noise: [
      { beat: 0, dur: 0.1, drum: 'kick', vel: 0.9 }, { beat: 1, dur: 0.1, drum: 'snare', vel: 0.8 },
      { beat: 2, dur: 0.1, drum: 'kick', vel: 0.9 }, { beat: 3, dur: 0.1, drum: 'snare', vel: 0.8 },
      ...tile(4, 0.25, [{ beat: 3, dur: 0.1, drum: 'snare', vel: 0.5 }]), // a little roll into the hit
      { beat: 4, dur: 0.1, drum: 'kick', vel: 1 }, { beat: 4, dur: 0.1, drum: 'snare', vel: 0.7 },
    ],
  },
};

const TRACKS: Array<[string, Track]> = [
  ['bgm/title.wav', title],
  ['bgm/overworld.wav', overworld],
  ['bgm/battle-wild.wav', battleWild],
  ['jingle/victory.wav', victory],
];

let total = 0;
for (const [rel, track] of TRACKS) {
  const bytes = writeTrackWav(join(OUT, rel), track);
  total += bytes;
  console.log(`  ${rel.padEnd(22)} ${(bytes / 1024).toFixed(0).padStart(5)} KB  (${track.bpm} bpm, ${track.loopBeats} beats)`);
}
console.log(`audio: wrote ${TRACKS.length} tracks, ${(total / 1024).toFixed(0)} KB total → public/audio/`);
