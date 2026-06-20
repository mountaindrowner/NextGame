/**
 * Story / cutscene cues (soundtrack spec §7). Authored as quiet loopable beds so
 * they sit under dialogue without cutting out; each carries its tagged motif.
 */
import type { Track } from './synth';
import { song, mel } from './compose';

export const CUE_TRACKS: Record<string, Track> = {
  // cue.opening_bench — Wonder, Home · tender, hopeful (the grounded/garage scene)
  'cue.opening_bench': song({
    bpm: 84, bars: 4, key: 'C4', mode: 'major', progression: [1, 4, 5, 1], bass: 'roots', drums: 'none',
    arp: { duty: 0.25, vel: 0.22, step: 0.5 },
    lead: mel([['C5', 1], ['E5', 1], ['G5', 1], ['E5', 1], ['F5', 1], ['E5', 1], ['C5', 2]], 0, { duty: 0.25, vel: 0.6 }),
  }),
  // cue.night_call — Breaker, mystery · a single calling pulse, hush (the cold open)
  'cue.night_call': song({
    bpm: 72, bars: 4, key: 'A3', mode: 'minor', progression: [1, 1, 6, 6], bass: 'pedal', drums: 'none',
    arp: false,
    lead: mel([['A4', 1.5], [null, 0.5], ['E5', 1], [null, 1], ['A4', 1.5], [null, 0.5], ['C5', 2]], 0, { duty: 0.125, vel: 0.5 }),
  }),
  // cue.breaker_bonds — Breaker + Main, swelling · the awe moment
  'cue.breaker_bonds': song({
    bpm: 80, bars: 4, key: 'D4', mode: 'major', progression: [1, 5, 4, 5], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.26 },
    lead: mel([['D4', 1], ['F#4', 1], ['A4', 1], ['D5', 1], ['E5', 2], ['F#5', 2]], 0, { duty: 0.25 }),
  }),
  // cue.exile — Home→Main · bittersweet resolve
  'cue.exile': song({
    bpm: 88, bars: 4, key: 'G4', mode: 'major', progression: [1, 6, 4, 5], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.5, vel: 0.24 },
    lead: mel([['G4', 1], ['B4', 0.5], ['A4', 0.5], ['G4', 1], ['D5', 1], ['E5', 2], ['D5', 2]], 0, { duty: 0.25 }),
  }),
  // cue.reveal — PERSISTENCE emerges, Main inverts · dread, recontextualization
  'cue.reveal': song({
    bpm: 76, bars: 4, key: 'D4', mode: 'minor', progression: [1, 1, 6, 5], bass: 'pedal', drums: 'static',
    arp: false,
    lead: mel([['D5', 1], ['Ab4', 1], ['D5', 1], ['F4', 1], ['A4', 2], ['G#4', 2]], 0, { duty: 0.125, vel: 0.55 }),
  }),
  // cue.factory_settings — Eli, broken · mournful
  'cue.factory_settings': song({
    bpm: 68, bars: 4, key: 'A3', mode: 'minor', progression: [1, 6, 4, 1], bass: 'pedal', drums: 'none',
    arp: false,
    lead: mel([['E5', 1.5], ['C5', 1], ['B4', 1.5], ['A4', 2], ['E4', 2]], 0, { duty: 0.125, vel: 0.55 }),
  }),
  // cue.grandpa_breakthrough — Eli, clarifying through Static · the emotional peak
  'cue.grandpa_breakthrough': song({
    bpm: 76, bars: 4, key: 'A3', mode: 'minor', progression: [1, 4, 5, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.22 },
    lead: mel([['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1], ['C5', 1], ['E5', 1], ['A5', 2]], 0, { duty: 0.25 }),
  }),
  // cue.broadcast — Resistance, full and soaring · liberation, catharsis
  'cue.broadcast': song({
    bpm: 96, bars: 4, key: 'D4', mode: 'major', progression: [1, 4, 5, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.25, vel: 0.3 },
    lead: mel([['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['F#5', 0.5], ['A5', 1], ['D6', 1], ['A5', 1], ['D6', 1]], 0, { duty: 0.25 }),
  }),
  // cue.ending — Home + Eli + Main reprised · warm, earned, a little sad
  'cue.ending': song({
    bpm: 80, bars: 4, key: 'G4', mode: 'major', progression: [1, 5, 6, 4], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.5, vel: 0.24 },
    lead: mel([['G4', 1], ['D5', 1], ['B4', 1], ['A4', 1], ['G4', 1], ['E5', 1], ['D5', 2]], 0, { duty: 0.25 }),
  }),
  // cue.freeme_hook — Eli, unresolved · a quiet, open question
  'cue.freeme_hook': song({
    bpm: 72, bars: 4, key: 'A3', mode: 'minor', progression: [1, 4, 1, 5], bass: 'pedal', drums: 'none',
    arp: false,
    lead: mel([['A4', 1], ['C5', 1], ['E5', 2], [null, 2], ['B4', 2]], 0, { duty: 0.125, vel: 0.5 }),
  }),
};
