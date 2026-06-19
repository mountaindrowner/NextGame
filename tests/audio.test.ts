import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_AUDIO, BGM_TRACKS, JINGLE_TRACKS, bgmForMap } from '../src/data/audio';
import { WORLD_MAP } from '../src/data/region';

const ROOT = new URL('..', import.meta.url).pathname;

/** Minimal WAV header sanity: RIFF/WAVE magic + PCM mono 16-bit + non-empty data. */
function readWavHeader(path: string) {
  const b = readFileSync(path);
  return {
    riff: b.toString('ascii', 0, 4),
    wave: b.toString('ascii', 8, 12),
    fmt: b.readUInt16LE(20),
    channels: b.readUInt16LE(22),
    rate: b.readUInt32LE(24),
    bits: b.readUInt16LE(34),
    dataSize: b.readUInt32LE(40),
  };
}

describe('audio manifest', () => {
  it('every track points at a real WAV file in public/audio', () => {
    for (const t of ALL_AUDIO) {
      const path = join(ROOT, 'public', t.src);
      expect(existsSync(path), `missing ${t.src} — run npm run audio:build`).toBe(true);
    }
  });

  it('each file is a valid PCM mono 16-bit WAV with audio in it', () => {
    for (const t of ALL_AUDIO) {
      const h = readWavHeader(join(ROOT, 'public', t.src));
      expect(h.riff, t.key).toBe('RIFF');
      expect(h.wave, t.key).toBe('WAVE');
      expect(h.fmt, t.key).toBe(1); // PCM
      expect(h.channels, t.key).toBe(1); // mono
      expect(h.bits, t.key).toBe(16);
      expect(h.rate, t.key).toBe(22050);
      expect(h.dataSize, t.key).toBeGreaterThan(h.rate); // at least ~0.5s of audio
    }
  });

  it('track keys are unique', () => {
    const keys = ALL_AUDIO.map((t) => t.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('resolves a known, loaded BGM for every world map', () => {
    const known = new Set(BGM_TRACKS.map((t) => t.key));
    for (const mapId of Object.keys(WORLD_MAP)) {
      expect(known.has(bgmForMap(mapId)), `${mapId} → ${bgmForMap(mapId)}`).toBe(true);
    }
  });

  it('ships the victory jingle', () => {
    expect(JINGLE_TRACKS.some((t) => t.key === 'jingle.victory_wild')).toBe(true);
  });
});
