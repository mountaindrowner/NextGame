/**
 * Jingles, victory fanfares, and short stings (soundtrack spec §6, §9).
 * Non-looping cues built from explicit channels. Original material.
 */
import type { NoteEvent, Track } from './synth';
import { cue, mel } from './compose';

const tri = (seq: Array<[string | null, number]>, start = 0): NoteEvent[] => mel(seq, start, { vel: 0.9 });
const hit = (beat: number, drum: 'kick' | 'snare' | 'hat', vel = 0.8): NoteEvent => ({ beat, dur: 0.1, drum, vel });

export const JINGLE_TRACKS_DATA: Record<string, Track> = {
  // jingle.victory_wild — Main · ~4s upbeat fanfare
  'jingle.victory_wild': cue(132, 9, {
    pulseA: mel([['D5', 0.5], ['A5', 0.5], ['D6', 0.5], ['F#5', 0.5], ['A5', 0.5], ['D6', 0.5], ['A5', 1], ['D6', 3]]),
    triangle: tri([['D3', 1], ['A2', 1], ['G2', 1], ['A2', 1], ['D2', 4]]),
    noise: [hit(0, 'kick', 0.9), hit(1, 'snare'), hit(2, 'kick', 0.9), hit(3, 'snare'), hit(4, 'kick', 1)],
  }),
  // jingle.victory_trainer — Main · ~5s fuller fanfare
  'jingle.victory_trainer': cue(140, 12, {
    pulseA: mel([['D5', 0.5], ['F#5', 0.5], ['A5', 0.5], ['D6', 0.5], ['C#6', 0.5], ['A5', 0.5], ['B5', 1], ['A5', 0.5], ['F#5', 0.5], ['D5', 0.5], ['A5', 0.5], ['D6', 4]]),
    pulseB: mel([['A4', 4], ['F#4', 4], ['A4', 4]], 0, { vel: 0.4, duty: 0.25 }),
    triangle: tri([['D3', 1], ['A2', 1], ['B2', 1], ['F#2', 1], ['G2', 1], ['A2', 1], ['D2', 6]]),
    noise: [hit(0, 'kick', 0.9), hit(1, 'snare'), hit(2, 'kick', 0.9), hit(3, 'snare'), hit(4, 'snare', 0.5), hit(4.5, 'snare', 0.6), hit(5, 'kick', 1)],
  }),
  // jingle.victory_warden — Resistance + Main · ~7s triumphant (also covers jingle.token)
  'jingle.victory_warden': cue(138, 16, {
    pulseA: mel([['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['F#5', 0.5], ['A5', 1], ['F#5', 0.5], ['A5', 0.5], ['D6', 2],
      ['E6', 0.5], ['D6', 0.5], ['B5', 0.5], ['A5', 0.5], ['B5', 1], ['A5', 1], ['D6', 4]]),
    pulseB: mel([['D4', 4], ['A4', 4], ['B4', 4], ['D5', 4]], 0, { vel: 0.4, duty: 0.25 }),
    triangle: tri([['D3', 2], ['A2', 2], ['B2', 2], ['G2', 2], ['A2', 2], ['D2', 6]]),
    noise: [hit(0, 'kick', 0.9), hit(2, 'snare'), hit(4, 'kick', 0.9), hit(6, 'snare'), hit(7.5, 'snare', 0.6), hit(8, 'kick', 1), hit(8, 'snare', 0.7)],
  }),
  // jingle.victory_legendary — ~8s grand fanfare
  'jingle.victory_legendary': cue(132, 18, {
    pulseA: mel([['C5', 0.5], ['G5', 0.5], ['C6', 1], ['Eb6', 0.5], ['D6', 0.5], ['C6', 1], ['G5', 1],
      ['Ab5', 0.5], ['C6', 0.5], ['Eb6', 1], ['F6', 0.5], ['Eb6', 0.5], ['C6', 1], ['G5', 1], ['C6', 6]]),
    pulseB: mel([['G4', 4], ['Eb4', 4], ['F4', 4], ['G4', 4]], 0, { vel: 0.4, duty: 0.25 }),
    triangle: tri([['C3', 2], ['G2', 2], ['Ab2', 2], ['F2', 2], ['G2', 2], ['C2', 8]]),
    noise: [hit(0, 'kick', 1), hit(2, 'snare'), hit(4, 'kick', 0.9), hit(6, 'snare'), hit(8, 'kick', 1), hit(8, 'snare', 0.8)],
  }),
  // jingle.capture_success — Resistance · bright 3s liberation sting
  'jingle.capture_success': cue(140, 7, {
    pulseA: mel([['D5', 0.5], ['A5', 0.5], ['D6', 0.5], ['A5', 0.5], ['F#5', 0.5], ['A5', 0.5], ['D6', 3.5]]),
    triangle: tri([['D3', 1], ['A2', 1], ['D2', 5]]),
    noise: [hit(0, 'kick', 0.8), hit(1, 'snare', 0.6), hit(2, 'kick', 0.9)],
  }),
  // jingle.levelup — ~2s rising sparkle
  'jingle.levelup': cue(150, 4, {
    pulseA: mel([['G4', 0.25], ['B4', 0.25], ['D5', 0.25], ['G5', 0.25], ['B5', 0.25], ['D6', 0.25], ['G6', 1.5]], 0, { duty: 0.25 }),
    triangle: tri([['G3', 0.5], ['D3', 0.5], ['G2', 2]]),
  }),
  // jingle.evolution — ~6s transformation (Resistance flourish)
  'jingle.evolution': cue(120, 14, {
    pulseA: mel([['D5', 0.5], ['E5', 0.5], ['F#5', 0.5], ['G5', 0.5], ['A5', 0.5], ['B5', 0.5], ['C#6', 0.5], ['D6', 1.5],
      [null, 1], ['A5', 0.5], ['D6', 0.5], ['F#6', 0.5], ['A6', 0.5], ['D6', 4]], 0, { duty: 0.25 }),
    pulseB: mel([['A4', 4], ['A4', 4], ['D5', 6]], 0, { vel: 0.35, duty: 0.125 }),
    triangle: tri([['D3', 4], ['A2', 4], ['D2', 6]]),
    noise: [hit(7, 'snare', 0.5), hit(7.5, 'snare', 0.6), hit(8, 'kick', 1)],
  }),
  // jingle.obtain_item — ~2s classic "got it"
  'jingle.obtain_item': cue(150, 4, {
    pulseA: mel([['C5', 0.5], ['E5', 0.5], ['G5', 0.5], ['C6', 1.5]], 0, { duty: 0.25 }),
    triangle: tri([['C3', 0.5], ['G2', 0.5], ['C3', 1]]),
  }),
  // jingle.obtain_ohm — ~3s a-new-friend (Resistance soft)
  'jingle.obtain_ohm': cue(132, 6, {
    pulseA: mel([['F4', 0.5], ['A4', 0.5], ['C5', 0.5], ['F5', 0.5], ['A5', 0.5], ['C6', 0.5], ['A5', 2]], 0, { duty: 0.25 }),
    triangle: tri([['F3', 1], ['C3', 1], ['F2', 2]]),
  }),
  // jingle.recharge — Home 2-note · gentle "all recharged"
  'jingle.recharge': cue(120, 3, {
    pulseA: mel([['G5', 0.5], ['D6', 1.5]], 0, { duty: 0.25, vel: 0.7 }),
    triangle: tri([['G3', 0.5], ['G2', 1.5]]),
  }),
  // jingle.save — ~1s confirm chime
  'jingle.save': cue(150, 2, {
    pulseA: mel([['D5', 0.25], ['A5', 0.75]], 0, { duty: 0.25, vel: 0.7 }),
  }),
  // sting.factory_reset — Eli/Resistance, shattered · 3s descending gut-punch
  'sting.factory_reset': cue(100, 6, {
    pulseA: mel([['E5', 1], ['C5', 1], ['A4', 1], ['G#4', 1], ['E4', 2]], 0, { duty: 0.125, vel: 0.6 }),
    triangle: tri([['A2', 2], ['E2', 2], ['A1', 2]]),
  }),
  // sting.defeat — Home(deflated) · short, gentle (wipe costs nothing)
  'sting.defeat': cue(96, 5, {
    pulseA: mel([['D5', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 0.5], ['G4', 2.5]], 0, { duty: 0.25, vel: 0.6 }),
    triangle: tri([['G3', 1], ['D3', 1], ['G2', 3]]),
  }),
  // sting.area_title — 2s region-card sting
  'sting.area_title': cue(120, 4, {
    pulseA: mel([['D5', 0.5], ['F#5', 0.5], ['A5', 0.5], ['D6', 1.5]], 0, { duty: 0.25 }),
    triangle: tri([['D3', 1], ['D2', 2]]),
  }),
  // sting.quest_update — soft 1s notify
  'sting.quest_update': cue(140, 2, {
    pulseA: mel([['A4', 0.25], ['D5', 0.75]], 0, { duty: 0.5, vel: 0.6 }),
  }),
};
