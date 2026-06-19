/**
 * OHMFRONT chiptune synthesizer — pure TypeScript, zero deps.
 *
 * The GBA/PSG channel model is the style (soundtrack spec §1): PulseA (lead),
 * PulseB (harmony/arp), Triangle (bass), Noise (percussion). We synthesize the
 * waveforms straight to mono 16-bit PCM and write a WAV byte-for-byte (the same
 * "emit binary assets from a tsx script" approach the repo uses for PNGs).
 *
 * A track is a tempo + per-channel note events measured in beats. Author each
 * track as ONE seamless loop (`loopBeats` long, the downbeat at beat 0, voices
 * settled by the end) so the engine can play it with `loop:true` gaplessly.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export const SAMPLE_RATE = 22050; // lo-fi on purpose — suits the GBA crunch, keeps WAVs small

export type Channel = 'pulseA' | 'pulseB' | 'triangle' | 'noise';
export type Drum = 'kick' | 'snare' | 'hat';

export interface NoteEvent {
  beat: number; // start, in beats
  dur: number; // length, in beats
  pitch?: string | number; // note name ("D4", "F#3") or MIDI number; omit for drums
  vel?: number; // 0..1 (default 0.9)
  duty?: number; // pulse duty 0..1 (default 0.5)
  arp?: number[]; // semitone offsets cycled fast within the note (chip arpeggio)
  drum?: Drum; // noise-channel percussion
}

export interface Track {
  bpm: number;
  loopBeats: number; // total length; the buffer is exactly this many beats
  channels: Partial<Record<Channel, NoteEvent[]>>;
}

// ---- pitch ----------------------------------------------------------------

const SEMI: Record<string, number> = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };

/** Note name or MIDI number → MIDI number (C4 = 60). */
export function midiOf(pitch: string | number): number {
  if (typeof pitch === 'number') return pitch;
  const m = /^([A-Ga-g])([#b]?)(-?\d+)$/.exec(pitch.trim());
  if (!m) throw new Error(`bad pitch: ${pitch}`);
  const letter = SEMI[m[1]!.toLowerCase()]!;
  const acc = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0;
  const octave = parseInt(m[3]!, 10);
  return (octave + 1) * 12 + letter + acc;
}

const freqOf = (midi: number): number => 440 * 2 ** ((midi - 69) / 12);

// ---- oscillators ----------------------------------------------------------

const pulse = (phase: number, duty: number): number => (phase % 1 < duty ? 1 : -1);

function triangle(phase: number): number {
  const p = phase % 1;
  return p < 0.5 ? 4 * p - 1 : 3 - 4 * p;
}

/** ADSR amplitude at `t` seconds into a note of length `dur` seconds. */
function adsr(t: number, dur: number, a: number, d: number, s: number, r: number): number {
  if (t < 0) return 0;
  const body = Math.max(0, dur - r);
  if (t < a) return t / a; // attack
  if (t < a + d) return 1 - (1 - s) * ((t - a) / d); // decay → sustain
  if (t < body) return s; // sustain
  if (t < dur) return s * Math.max(0, 1 - (t - body) / r); // release
  return 0;
}

// deterministic noise so renders are byte-stable
let noiseState = 0x1234abcd;
const resetNoise = (): void => {
  noiseState = 0x1234abcd;
};
function whiteNoise(): number {
  // xorshift32 → [-1, 1)
  noiseState ^= noiseState << 13;
  noiseState ^= noiseState >>> 17;
  noiseState ^= noiseState << 5;
  return ((noiseState >>> 0) / 0xffffffff) * 2 - 1;
}

// ---- per-voice rendering --------------------------------------------------

function renderTone(
  buf: Float32Array,
  ev: NoteEvent,
  startSec: number,
  durSec: number,
  wave: 'pulse' | 'triangle',
  env: [number, number, number, number],
  gain: number,
): void {
  const vel = ev.vel ?? 0.9;
  const duty = ev.duty ?? 0.5;
  const base = midiOf(ev.pitch!);
  const i0 = Math.floor(startSec * SAMPLE_RATE);
  const i1 = Math.min(buf.length, Math.ceil((startSec + durSec) * SAMPLE_RATE));
  let phase = 0;
  for (let i = i0; i < i1; i++) {
    const t = (i - i0) / SAMPLE_RATE;
    // arpeggio: swap pitch every ~1/32s through the chord
    let midi = base;
    if (ev.arp && ev.arp.length) midi = base + ev.arp[Math.floor(t / 0.03) % ev.arp.length]!;
    phase += freqOf(midi) / SAMPLE_RATE;
    const w = wave === 'pulse' ? pulse(phase, duty) : triangle(phase);
    buf[i]! += w * adsr(t, durSec, env[0], env[1], env[2], env[3]) * vel * gain;
  }
}

function renderDrum(buf: Float32Array, ev: NoteEvent, startSec: number, gain: number): void {
  const kind = ev.drum ?? 'hat';
  const vel = ev.vel ?? 0.9;
  const len = kind === 'kick' ? 0.12 : kind === 'snare' ? 0.14 : 0.04;
  const i0 = Math.floor(startSec * SAMPLE_RATE);
  const i1 = Math.min(buf.length, Math.ceil((startSec + len) * SAMPLE_RATE));
  let kphase = 0;
  for (let i = i0; i < i1; i++) {
    const t = (i - i0) / SAMPLE_RATE;
    const env = Math.max(0, 1 - t / len);
    let s: number;
    if (kind === 'kick') {
      const f = 120 - 80 * (t / len); // pitch drop 120→40 Hz
      kphase += f / SAMPLE_RATE;
      s = Math.sin(kphase * 2 * Math.PI) * (env * env);
    } else if (kind === 'snare') {
      s = (whiteNoise() * 0.8 + Math.sin(t * 2 * Math.PI * 180) * 0.2) * env * env;
    } else {
      s = whiteNoise() * env * env; // hat: short noise tick
    }
    buf[i]! += s * vel * gain;
  }
}

// per-channel mix levels (bass present, lead clear, perc tucked under)
const GAIN: Record<Channel, number> = { pulseA: 0.32, pulseB: 0.22, triangle: 0.34, noise: 0.30 };
const ENV: Record<'pulseA' | 'pulseB' | 'triangle', [number, number, number, number]> = {
  pulseA: [0.005, 0.04, 0.75, 0.06],
  pulseB: [0.005, 0.05, 0.6, 0.06],
  triangle: [0.005, 0.03, 0.85, 0.05],
};

export function renderTrack(track: Track): Int16Array {
  resetNoise();
  const spb = 60 / track.bpm; // seconds per beat
  const total = Math.ceil(track.loopBeats * spb * SAMPLE_RATE);
  const buf = new Float32Array(total);
  for (const [ch, events] of Object.entries(track.channels) as [Channel, NoteEvent[]][]) {
    for (const ev of events) {
      const startSec = ev.beat * spb;
      const durSec = ev.dur * spb;
      if (ch === 'noise') renderDrum(buf, ev, startSec, GAIN.noise);
      else renderTone(buf, ev, startSec, durSec, ch === 'triangle' ? 'triangle' : 'pulse', ENV[ch], GAIN[ch]);
    }
  }
  // normalize to -1.5 dBFS with a soft knee, then to Int16
  let peak = 0;
  for (let i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i]!));
  const norm = peak > 0 ? 0.84 / peak : 1;
  const out = new Int16Array(total);
  for (let i = 0; i < total; i++) {
    const v = Math.tanh(buf[i]! * norm * 1.1); // gentle saturation
    out[i] = Math.max(-32768, Math.min(32767, Math.round(v * 32767)));
  }
  return out;
}

// ---- WAV out --------------------------------------------------------------

export function wavBytes(samples: Int16Array, sampleRate = SAMPLE_RATE): Buffer {
  const dataSize = samples.length * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28); // byte rate
  buf.writeUInt16LE(2, 32); // block align
  buf.writeUInt16LE(16, 34); // bits/sample
  buf.write('data', 36);
  buf.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) buf.writeInt16LE(samples[i]!, 44 + i * 2);
  return buf;
}

export function writeTrackWav(path: string, track: Track): number {
  const bytes = wavBytes(renderTrack(track));
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, bytes);
  return bytes.length;
}
