import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ALL_AUDIO, BGM_TRACKS, JINGLE_TRACKS, CUE_TRACKS, BOOT_SET,
  bgmForMap, bgmForBattle, victoryJingleFor, inferBattleType,
} from '../src/data/audio';
import { WORLD_MAP } from '../src/data/region';
import { newGame } from '../src/game/state';
import { deserialize, serialize } from '../src/save/save';

const ROOT = new URL('..', import.meta.url).pathname;

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
  it('ships the full catalog', () => {
    expect(ALL_AUDIO.length).toBeGreaterThanOrEqual(80);
  });

  it('every track points at a real WAV file in public/audio', () => {
    for (const t of ALL_AUDIO) {
      expect(existsSync(join(ROOT, 'public', t.src)), `missing ${t.src} — run npm run audio:build`).toBe(true);
    }
  });

  it('each file is a valid PCM mono 16-bit WAV with audio in it', () => {
    for (const t of ALL_AUDIO) {
      const h = readWavHeader(join(ROOT, 'public', t.src));
      expect(h.riff, t.key).toBe('RIFF');
      expect(h.wave, t.key).toBe('WAVE');
      expect(h.fmt, t.key).toBe(1);
      expect(h.channels, t.key).toBe(1);
      expect(h.bits, t.key).toBe(16);
      expect(h.rate, t.key).toBe(11025);
      expect(h.dataSize, t.key).toBeGreaterThan(h.rate / 2); // at least ~0.5s
    }
  });

  it('keys are unique and the boot set is a subset of the catalog', () => {
    const keys = ALL_AUDIO.map((t) => t.key);
    expect(new Set(keys).size).toBe(keys.length);
    const all = new Set(keys);
    for (const t of BOOT_SET) expect(all.has(t.key), t.key).toBe(true);
  });
});

describe('audio selection', () => {
  const known = new Set(ALL_AUDIO.map((t) => t.key));

  it('resolves a known BGM for every world map', () => {
    for (const mapId of Object.keys(WORLD_MAP)) {
      expect(known.has(bgmForMap(mapId)), `${mapId} → ${bgmForMap(mapId)}`).toBe(true);
    }
  });

  it('picks the right battle theme from kind + foe name', () => {
    expect(bgmForBattle({ kind: 'wild' })).toBe('bgm.battle.wild');
    expect(bgmForBattle({ kind: 'trainer', foeName: 'Warden Calder Stone' })).toBe('bgm.battle.warden');
    expect(bgmForBattle({ kind: 'trainer', foeName: 'Conscript Pax' })).toBe('bgm.battle.militant');
    expect(bgmForBattle({ kind: 'trainer', foeName: 'Redbed Raider' })).toBe('bgm.battle.militant');
    expect(bgmForBattle({ kind: 'trainer', foeName: 'Rook' })).toBe('bgm.battle.rival');
    expect(bgmForBattle({ kind: 'trainer', foeName: 'Runner Cricket' })).toBe('bgm.battle.trainer');
    expect(bgmForBattle({ kind: 'trainer', battleType: 'legendary' })).toBe('bgm.battle.legendary');
  });

  it('victory tiers resolve to real jingles', () => {
    const jingles = new Set(JINGLE_TRACKS.map((t) => t.key));
    for (const t of ['wild', 'trainer', 'warden', 'legendary', 'boss', 'rival', 'militant', 'persistence'] as const) {
      expect(jingles.has(victoryJingleFor(t)), t).toBe(true);
    }
    expect(inferBattleType('wild')).toBe('wild');
  });

  it('cutscene cues are catalogued', () => {
    expect(CUE_TRACKS.some((t) => t.key === 'cue.night_call')).toBe(true);
    expect(CUE_TRACKS.some((t) => t.key === 'cue.opening_bench')).toBe(true);
  });
});

describe('audio prefs save migration (v1 → v2)', () => {
  it('a new game carries default audio prefs that round-trip', () => {
    const state = newGame('SAL', { starter: 'dog' });
    expect(state.schema).toBe(2);
    expect(state.audio).toEqual({ musicVolume: 0.7, sfxVolume: 0.85, muted: false });
    const back = deserialize(serialize(state));
    expect(back.audio).toEqual(state.audio);
  });

  it('a v1 save (no audio) migrates to schema 2 with defaults', () => {
    const state = newGame('WREN', { starter: 'drone' });
    const v1 = JSON.parse(serialize(state)) as { version: number; state: Record<string, unknown> };
    v1.version = 1;
    delete v1.state['audio'];
    v1.state['schema'] = 1;
    const migrated = deserialize(JSON.stringify(v1));
    expect(migrated.schema).toBe(2);
    expect(migrated.audio).toEqual({ musicVolume: 0.7, sfxVolume: 0.85, muted: false });
  });
});
