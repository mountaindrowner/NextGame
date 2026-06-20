/**
 * System, menu, and facility themes (soundtrack spec §4, §8) + the default
 * overworld fallback. Original material.
 */
import type { Track } from './synth';
import { song, mel } from './compose';
import { MAIN, WONDER, at } from './motifs';

export const MENU_TRACKS: Record<string, Track> = {
  // bgm.sys.title — D maj 84 · Main, Wonder · grand but worn
  'bgm.sys.title': song({
    bpm: 84, bars: 8, key: 'D4', mode: 'major', progression: [1, 5, 6, 4, 1, 5, 4, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.34 },
    lead: [...MAIN, ...at(2, WONDER), ...mel([['C#5', 1], ['A4', 1], ['E4', 1], ['A4', 1]], 4),
      ...mel([['B4', 1], ['D5', 1], ['F#5', 1], ['D5', 1]], 8), ...mel([['G4', 1], ['A4', 1], ['F#4', 1], ['D4', 1]], 12)],
  }),
  // bgm.sys.mainmenu — D maj 72 · Main(soft) · quiet, expectant
  'bgm.sys.mainmenu': song({
    bpm: 72, bars: 4, key: 'D4', mode: 'major', progression: [1, 6, 4, 5], bass: 'pedal', drums: 'none',
    arp: { duty: 0.25, vel: 0.24, step: 1 },
    lead: mel([['D4', 2], ['F#4', 2], ['A4', 2], ['E4', 1], ['D4', 1]], 0, { duty: 0.25, vel: 0.6 }),
  }),
  // bgm.field.overworld — D maj 100 · Home+Wonder · the default field fallback
  'bgm.field.overworld': song({
    bpm: 108, bars: 8, key: 'G4', mode: 'major', progression: [1, 5, 6, 4, 2, 5, 1, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.5, vel: 0.3 },
    lead: [
      ...mel([['G4', 1], ['B4', 0.5], ['A4', 0.5], ['G4', 1], ['D5', 1], ['F#4', 1], ['A4', 1], ['D5', 1], ['A4', 1]]),
      ...mel([['E4', 1], ['G4', 0.5], ['B4', 0.5], ['E5', 1], ['B4', 1], ['C5', 1], ['B4', 1], ['A4', 1], ['G4', 1]], 8),
    ],
  }),
  // bgm.menu.garage — G maj 80 · Home(calm) · the safe, tidy "PC" calm
  'bgm.menu.garage': song({
    bpm: 80, bars: 4, key: 'G4', mode: 'major', progression: [1, 4, 2, 5], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.5, vel: 0.26 },
    lead: mel([['B4', 1], ['D5', 1], ['G5', 1], ['D5', 1], ['C5', 1], ['B4', 1], ['A4', 1], ['G4', 1]], 0, { duty: 0.25 }),
  }),
  // bgm.menu.bench — C maj 92 · Home, Breaker(hint) · workshop warmth
  'bgm.menu.bench': song({
    bpm: 92, bars: 8, key: 'C4', mode: 'major', progression: [1, 4, 5, 1, 6, 4, 5, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.28 },
    lead: [
      ...mel([['C5', 1], ['E5', 0.5], ['G5', 0.5], ['E5', 1], ['C5', 1], ['D5', 1], ['E5', 1], ['G5', 1], ['C5', 1]]),
      ...mel([['A4', 1], ['C5', 1], ['F5', 1], ['E5', 1], ['G4', 1], ['B4', 1], ['C5', 2]], 8),
    ],
  }),
  // bgm.menu.shop — F maj 110 · Main(light) · friendly market jingle
  'bgm.menu.shop': song({
    bpm: 110, bars: 4, key: 'F4', mode: 'major', progression: [1, 4, 5, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.5, vel: 0.3 },
    lead: mel([['F4', 0.5], ['A4', 0.5], ['C5', 1], ['F5', 0.5], ['C5', 0.5], ['Bb4', 1], ['A4', 0.5], ['G4', 0.5], ['F4', 1], ['C5', 1]]),
  }),
  // bgm.facility.pit — A min 138 · Main(brash) · gambling-den energy
  'bgm.facility.pit': song({
    bpm: 138, bars: 8, key: 'A4', mode: 'minor', progression: [1, 1, 4, 4, 5, 5, 1, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.28, step: 0.25 },
    lead: [
      ...mel([['A4', 0.5], ['C5', 0.5], ['E5', 0.5], ['C5', 0.5], ['A4', 0.5], ['E5', 0.5], ['A5', 1]]),
      ...mel([['D5', 0.5], ['F5', 0.5], ['A5', 1], ['E5', 0.5], ['G5', 0.5], ['B5', 1]], 8),
    ],
  }),
  // bgm.facility.gauntlet — D min 150 · Main(intense) · high-stakes drive
  'bgm.facility.gauntlet': song({
    bpm: 150, bars: 8, key: 'D4', mode: 'minor', progression: [1, 7, 6, 5, 1, 7, 5, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.28, step: 0.25 },
    lead: [
      ...mel([['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['F5', 0.5], ['E5', 0.5], ['D5', 0.5], ['A4', 1]]),
      ...mel([['C5', 0.5], ['G4', 0.5], ['C5', 0.5], ['E5', 0.5], ['D5', 1], ['A4', 1]], 8),
    ],
  }),
  // bgm.facility.range — G maj 90, 6/8 · Wonder, Home · gentle, wild, exploratory
  'bgm.facility.range': song({
    bpm: 90, bars: 8, meter: 3, key: 'G4', mode: 'major', progression: [1, 4, 5, 1, 6, 4, 2, 5], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.26, step: 0.5 },
    lead: mel([['G4', 1], ['B4', 0.5], ['D5', 0.5], ['G5', 1.5], ['E5', 1.5]], 0, { duty: 0.25 }),
  }),
  // bgm.facility.uplink — B min 124 · Breaker, PERSISTENCE(cold) · inside the network
  'bgm.facility.uplink': song({
    bpm: 124, bars: 8, key: 'B3', mode: 'minor', progression: [1, 1, 6, 6, 7, 7, 1, 1], bass: 'driving', drums: 'halftime',
    arp: { duty: 0.125, vel: 0.32, step: 0.25 },
    lead: [
      ...mel([['B4', 0.5], ['F#5', 0.5], ['B5', 0.5], ['D6', 0.5], ['B5', 0.5], ['F#5', 0.5], ['B4', 1]]),
      ...mel([['G5', 0.5], ['D5', 0.5], ['B4', 0.5], ['F#5', 0.5], ['B5', 2]], 8),
    ],
  }),
  // bgm.facility.fieldday — C maj 120 · Main(festive) · light, celebratory
  'bgm.facility.fieldday': song({
    bpm: 120, bars: 8, key: 'C4', mode: 'major', progression: [1, 5, 6, 4, 1, 4, 5, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.5, vel: 0.3 },
    lead: [
      ...mel([['C5', 0.5], ['E5', 0.5], ['G5', 1], ['E5', 0.5], ['G5', 0.5], ['C6', 1], ['G5', 1]]),
      ...mel([['A4', 0.5], ['C5', 0.5], ['F5', 1], ['G4', 0.5], ['B4', 0.5], ['G5', 1], ['C5', 1]], 8),
    ],
  }),
};
