/**
 * Battle themes (soundtrack spec §6). Fast, driving, motif-tagged. Original.
 */
import type { Track } from './synth';
import { song, mel } from './compose';

export const BATTLE_TRACKS: Record<string, Track> = {
  // bgm.battle.wild — A min 150 · Main(driving) · scrappy, energetic
  'bgm.battle.wild': song({
    bpm: 150, bars: 8, key: 'A4', mode: 'minor', progression: [1, 1, 6, 6, 7, 7, 5, 5], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.3, step: 0.25 },
    lead: [
      ...mel([['A4', 0.5], ['C5', 0.5], ['E5', 0.5], ['A5', 0.5], ['E5', 0.5], ['C5', 0.5], ['A4', 1]]),
      ...mel([['F4', 0.5], ['A4', 0.5], ['C5', 0.5], ['F5', 0.5], ['C5', 1], ['A4', 1]], 4),
      ...mel([['G4', 0.5], ['B4', 0.5], ['D5', 0.5], ['G5', 0.5], ['D5', 1], ['B4', 1]], 8),
      ...mel([['E5', 0.5], ['G#5', 0.5], ['B5', 1], ['E5', 0.5], ['B4', 0.5], ['E5', 1]], 12),
    ],
  }),
  // bgm.battle.trainer — D min 156 · Main · confident
  'bgm.battle.trainer': song({
    bpm: 156, bars: 8, key: 'D4', mode: 'minor', progression: [1, 1, 7, 7, 6, 6, 5, 5], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.28, step: 0.25 },
    lead: [
      ...mel([['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['F5', 0.5], ['A5', 0.5], ['F5', 0.5], ['D5', 1]]),
      ...mel([['C5', 0.5], ['A4', 0.5], ['C5', 0.5], ['E5', 0.5], ['G5', 0.5], ['E5', 0.5], ['C5', 1]], 4),
      ...mel([['Bb4', 0.5], ['D5', 0.5], ['F5', 1], ['Bb5', 0.5], ['F5', 0.5], ['D5', 1]], 8),
      ...mel([['A4', 0.5], ['C#5', 0.5], ['E5', 1], ['A5', 1], ['E5', 1]], 12),
    ],
  }),
  // bgm.battle.militant — E min 150 · PERSISTENCE(faint), Static · the puppet unease (detuned layer)
  'bgm.battle.militant': song({
    bpm: 150, bars: 8, key: 'E4', mode: 'minor', progression: [1, 1, 7, 7, 6, 6, 5, 5], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.26, step: 0.5 },
    pads: mel([['F4', 4], ['F4', 4], ['F4', 4], ['F4', 4]], 0, { duty: 0.5, vel: 0.12 }), // a flat, off pad over E min = unease
    lead: [
      ...mel([['E5', 0.5], ['B4', 0.5], ['E5', 0.5], ['G5', 0.5], ['F#5', 1], ['E5', 1]]),
      ...mel([['D5', 0.5], ['B4', 0.5], ['D5', 0.5], ['G5', 0.5], ['D5', 1], ['B4', 1]], 4),
      ...mel([['C5', 0.5], ['E5', 0.5], ['G5', 1], ['E5', 0.5], ['C5', 0.5], ['G4', 1]], 8),
      ...mel([['B4', 0.5], ['E5', 0.5], ['G5', 1], ['B5', 1], ['E5', 1]], 12),
    ],
  }),
  // bgm.battle.rival — E min 160 · Main + cocky counter-motif · rivalry, swagger
  'bgm.battle.rival': song({
    bpm: 160, bars: 8, key: 'E4', mode: 'minor', progression: [1, 6, 7, 1, 4, 5, 1, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.28, step: 0.25 },
    lead: [
      ...mel([['E5', 0.5], ['G5', 0.5], ['B5', 0.5], ['G5', 0.5], ['E5', 0.5], ['B4', 0.5], ['E5', 1]]),
      ...mel([['C5', 0.5], ['E5', 0.5], ['G5', 1], ['D5', 0.5], ['F#5', 0.5], ['A5', 1]], 4),
      ...mel([['B4', 0.5], ['D5', 0.5], ['E5', 0.5], ['G5', 0.5], ['A5', 0.5], ['B5', 0.5], ['E5', 1]], 8),
      ...mel([['B5', 0.5], ['A5', 0.5], ['G5', 0.5], ['F#5', 0.5], ['E5', 2]], 12),
    ],
  }),
  // bgm.battle.warden — D min 158 · Main(bold) · gym-leader showdown
  'bgm.battle.warden': song({
    bpm: 158, bars: 8, key: 'D4', mode: 'minor', progression: [1, 1, 6, 7, 1, 4, 5, 5], bass: 'driving', drums: 'march',
    arp: { duty: 0.25, vel: 0.3, step: 0.25 },
    lead: [
      ...mel([['D5', 0.5], ['F5', 0.5], ['A5', 0.5], ['D6', 0.5], ['A5', 0.5], ['F5', 0.5], ['D5', 1]]),
      ...mel([['Bb4', 0.5], ['D5', 0.5], ['F5', 1], ['C5', 0.5], ['E5', 0.5], ['G5', 1]], 4),
      ...mel([['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['F5', 0.5], ['A5', 1], ['D6', 1]], 8),
      ...mel([['G5', 0.5], ['F5', 0.5], ['E5', 0.5], ['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['A5', 1]], 12),
    ],
  }),
  // bgm.battle.legendary — C min 144 · Main(epic) + Static · rare and huge
  'bgm.battle.legendary': song({
    bpm: 144, bars: 8, key: 'C4', mode: 'minor', progression: [1, 1, 6, 6, 4, 5, 1, 1], bass: 'driving', drums: 'march',
    arp: { duty: 0.125, vel: 0.3, step: 0.5 },
    lead: [
      ...mel([['C5', 1], ['G5', 1], ['Ab5', 1], ['G5', 1], ['Eb5', 1], ['C5', 1], ['G4', 2]]),
      ...mel([['Ab4', 1], ['C5', 1], ['Eb5', 1], ['F5', 1], ['G5', 2], ['C6', 2]], 8),
    ],
  }),
  // bgm.battle.boss — D min 150 · PERSISTENCE · dangerous, heavy mechanical
  'bgm.battle.boss': song({
    bpm: 150, bars: 8, key: 'D4', mode: 'minor', progression: [1, 1, 7, 1, 6, 6, 5, 5], bass: 'driving', drums: 'march',
    arp: { duty: 0.125, vel: 0.28, step: 0.5 },
    lead: [
      ...mel([['D5', 0.5], ['D5', 0.5], ['Ab5', 0.5], ['D5', 0.5], ['F5', 0.5], ['D5', 0.5], ['Ab5', 1]]),
      ...mel([['C5', 0.5], ['C5', 0.5], ['G5', 0.5], ['C5', 0.5], ['Eb5', 1], ['C5', 1]], 4),
      ...mel([['Bb4', 1], ['D5', 1], ['F5', 1], ['Ab5', 1]], 8),
      ...mel([['A4', 0.5], ['Eb5', 0.5], ['A5', 1], ['Eb5', 0.5], ['A4', 0.5], ['D5', 1]], 12),
    ],
  }),
  // bgm.battle.persistence — D min ~150 · PERSISTENCE(full) vs Main+Resistance · the final
  'bgm.battle.persistence': song({
    bpm: 150, bars: 8, key: 'D4', mode: 'minor', progression: [1, 7, 6, 5, 1, 4, 5, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.3, step: 0.25 },
    pads: mel([['G#4', 2], ['G#4', 2]], 0, { duty: 0.5, vel: 0.12 }),
    lead: [
      ...mel([['D5', 0.5], ['Ab5', 0.5], ['D6', 0.5], ['Ab5', 0.5], ['F5', 0.5], ['D5', 0.5], ['A4', 1]]),
      ...mel([['C5', 0.5], ['G5', 0.5], ['C6', 1], ['Bb5', 0.5], ['G5', 0.5], ['Eb5', 1]], 4),
      // the hero motif breaking through
      ...mel([['D5', 1], ['F#5', 1], ['A5', 1], ['D6', 1]], 8),
      ...mel([['A5', 0.5], ['D6', 0.5], ['F#5', 1], ['A5', 0.5], ['D5', 0.5], ['A4', 1]], 12),
    ],
  }),
  // bgm.battle.hack — C min 128 · Breaker, Static · the firewall race (capture puzzle)
  'bgm.battle.hack': song({
    bpm: 128, bars: 4, key: 'C4', mode: 'minor', progression: [1, 1, 5, 5], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.34, step: 0.25 },
    lead: [
      ...mel([['C5', 0.25], ['G5', 0.25], ['C6', 0.25], ['G5', 0.25], ['C5', 0.25], ['G5', 0.25], ['C6', 0.5]]),
      ...mel([['G4', 0.25], ['D5', 0.25], ['G5', 0.25], ['D5', 0.25], ['B4', 0.5], ['G5', 0.5]], 8),
    ],
  }),
};
