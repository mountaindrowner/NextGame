/**
 * Audio manifest + scene/map → track resolution (soundtrack spec §11 naming).
 * Pure data — no Phaser import, so it stays node-testable. The synth pipeline
 * in tools/audio writes the WAVs these point at; BootScene preloads the list.
 *
 * Music pass #1 ("prove the sound") ships four tracks; the overworld theme
 * covers every field map so nothing is silent.
 */
export interface AudioTrack {
  key: string;
  src: string; // relative to the public/ root (Phaser loads against the page base)
}

export const BGM_TRACKS: readonly AudioTrack[] = [
  { key: 'bgm.sys.title', src: 'audio/bgm/title.wav' },
  { key: 'bgm.field.overworld', src: 'audio/bgm/overworld.wav' },
  { key: 'bgm.battle.wild', src: 'audio/bgm/battle-wild.wav' },
];

export const JINGLE_TRACKS: readonly AudioTrack[] = [
  { key: 'jingle.victory_wild', src: 'audio/jingle/victory.wav' },
];

export const SFX_TRACKS: readonly AudioTrack[] = [];

/** Everything BootScene preloads. */
export const ALL_AUDIO: readonly AudioTrack[] = [...BGM_TRACKS, ...JINGLE_TRACKS, ...SFX_TRACKS];

/** Field BGM for a map. Pass #1: one overworld theme everywhere (no silence). */
export function bgmForMap(_mapId: string): string {
  return 'bgm.field.overworld';
}
