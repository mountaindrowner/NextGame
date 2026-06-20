/**
 * Area / route / dungeon themes (soundtrack spec §5). Each is a song() spec with
 * an explicit lead; key/BPM/mode/motifs follow the spec line. Original material.
 */
import type { Track } from './synth';
import { song, mel } from './compose';

export const AREA_TRACKS: Record<string, Track> = {
  // bgm.area.ohmstead — G maj 96 · Home, Eli(hint) · safe, warm, faint ache
  'bgm.area.ohmstead': song({
    bpm: 96, bars: 8, key: 'G4', mode: 'major', progression: [1, 5, 6, 4, 1, 5, 4, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.5, vel: 0.32 },
    lead: [
      ...mel([['G4', 1], ['B4', 0.5], ['A4', 0.5], ['G4', 1], ['D5', 1], ['D5', 1], ['B4', 1], ['A4', 1], ['G4', 1]]),
      ...mel([['E5', 1], ['D5', 1], ['B4', 1], ['A4', 1], ['G4', 2], ['D4', 1], ['G4', 1]], 8),
    ],
  }),
  // bgm.area.field — D maj 88 · Wonder, Main(hint) · ruined-prairie melancholy into wonder
  'bgm.area.field': song({
    bpm: 88, bars: 8, key: 'D4', mode: 'major', progression: [1, 5, 6, 4, 2, 5, 1, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.3 },
    lead: [
      ...mel([['D4', 1], ['F#4', 1], ['A4', 1], ['D5', 1], ['C#5', 1], ['A4', 1], ['B4', 2]]),
      ...mel([['A4', 1], ['D5', 1], ['F#5', 1], ['E5', 1], ['D5', 1], ['A4', 1], ['D5', 2]], 8),
    ],
  }),
  // bgm.route.farmroad — G maj 110 · Main · first-steps optimism
  'bgm.route.farmroad': song({
    bpm: 110, bars: 8, key: 'G4', mode: 'major', progression: [1, 4, 5, 1, 6, 4, 5, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.5, vel: 0.3, step: 0.5 },
    lead: [
      ...mel([['G4', 0.5], ['A4', 0.5], ['B4', 1], ['D5', 1], ['B4', 1], ['C5', 0.5], ['B4', 0.5], ['A4', 1], ['G4', 1], ['D4', 1]]),
      ...mel([['E5', 1], ['D5', 1], ['B4', 1], ['G4', 1], ['A4', 0.5], ['B4', 0.5], ['A4', 1], ['G4', 2]], 8),
    ],
  }),
  // bgm.area.railhead — C maj 132 · Main(busy) · bustling mechanical market
  'bgm.area.railhead': song({
    bpm: 132, bars: 8, key: 'C4', mode: 'major', progression: [1, 6, 4, 5, 1, 6, 5, 1], bass: 'driving', drums: 'walk',
    arp: { duty: 0.25, vel: 0.28, step: 0.25 },
    lead: [
      ...mel([['C5', 0.5], ['E5', 0.5], ['G5', 0.5], ['E5', 0.5], ['A4', 0.5], ['C5', 0.5], ['E5', 1], ['F5', 0.5], ['E5', 0.5], ['D5', 0.5], ['C5', 0.5], ['G4', 1]]),
      ...mel([['C5', 0.5], ['D5', 0.5], ['E5', 0.5], ['G5', 0.5], ['F5', 1], ['D5', 1], ['G5', 1], ['E5', 1], ['C5', 1]], 8),
    ],
  }),
  // bgm.route.scar45 — A min→C maj 120 · Main · dusty road, momentum
  'bgm.route.scar45': song({
    bpm: 120, bars: 8, key: 'A3', mode: 'minor', progression: [1, 7, 6, 3, 4, 5, 1, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.26, step: 0.5 },
    lead: [
      ...mel([['A4', 1], ['C5', 1], ['E5', 1], ['D5', 1], ['C5', 1], ['A4', 1], ['E5', 2]]),
      ...mel([['G4', 1], ['C5', 1], ['E5', 1], ['G5', 1], ['E5', 1], ['C5', 1], ['A4', 2]], 8),
    ],
  }),
  // bgm.area.cistern — F maj 84, 6/8 feel · Home · nurturing, flowing
  'bgm.area.cistern': song({
    bpm: 84, bars: 8, meter: 3, key: 'F4', mode: 'major', progression: [1, 4, 2, 5, 1, 6, 4, 5], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.5, vel: 0.3, step: 0.5 },
    lead: [
      ...mel([['F4', 1], ['A4', 0.5], ['C5', 0.5], ['A4', 1], ['G4', 1.5], ['F4', 1.5]], 0, { duty: 0.25 }),
      ...mel([['C5', 1], ['D5', 0.5], ['C5', 0.5], ['A4', 1], ['F4', 1.5], ['C5', 1.5]], 12, { duty: 0.25 }),
    ],
  }),
  // bgm.route.furrows — G maj 112 · Main · open, pastoral
  'bgm.route.furrows': song({
    bpm: 112, bars: 8, key: 'G4', mode: 'major', progression: [1, 5, 4, 1, 2, 5, 1, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.5, vel: 0.28 },
    lead: [
      ...mel([['D5', 1], ['B4', 1], ['G4', 1], ['A4', 1], ['B4', 1], ['D5', 1], ['G5', 2]]),
      ...mel([['E5', 1], ['D5', 1], ['B4', 1], ['A4', 1], ['G4', 2], ['D4', 2]], 8),
    ],
  }),
  // bgm.area.bastion — D min 100 · Main(stern), Static(faint) · guarded, hard
  'bgm.area.bastion': song({
    bpm: 100, bars: 8, key: 'D4', mode: 'minor', progression: [1, 1, 6, 7, 1, 4, 5, 1], bass: 'driving', drums: 'march',
    arp: { duty: 0.5, vel: 0.24 },
    lead: [
      ...mel([['D5', 1], ['A4', 1], ['D5', 1], ['F5', 1], ['E5', 2], ['D5', 2]]),
      ...mel([['Bb4', 1], ['D5', 1], ['C5', 1], ['A4', 1], ['D5', 2], ['A4', 2]], 8),
    ],
  }),
  // bgm.route.militaryroad — E min 116 · PERSISTENCE(faint), Static · unease, watched
  'bgm.route.militaryroad': song({
    bpm: 116, bars: 8, key: 'E4', mode: 'minor', progression: [1, 1, 7, 1, 6, 6, 5, 5], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.24, step: 0.5 },
    lead: [
      ...mel([['E5', 0.5], ['E5', 0.5], ['G5', 1], ['E5', 0.5], ['B4', 0.5], ['E5', 1], ['D5', 1], ['B4', 1]]),
      ...mel([['C5', 1], ['B4', 1], ['G4', 1], ['B4', 1], ['E5', 2], ['B4', 2]], 8),
    ],
  }),
  // bgm.area.redoubt — E min 96 · Main(tense) · wary, military
  'bgm.area.redoubt': song({
    bpm: 96, bars: 8, key: 'E4', mode: 'minor', progression: [1, 6, 7, 1, 4, 5, 1, 1], bass: 'roots', drums: 'march',
    arp: { duty: 0.5, vel: 0.24 },
    lead: [
      ...mel([['E5', 1], ['D5', 1], ['B4', 1.5], ['G4', 0.5], ['A4', 1], ['B4', 3]]),
      ...mel([['G5', 1], ['F#5', 1], ['E5', 1], ['B4', 1], ['E5', 2], ['B4', 2]], 8),
    ],
  }),
  // bgm.dungeon.bunker — C min 72 · PERSISTENCE, Static, Eli(buried) · dread
  'bgm.dungeon.bunker': song({
    bpm: 72, bars: 8, key: 'C4', mode: 'minor', progression: [1, 1, 6, 6, 2, 2, 5, 5], bass: 'pedal', drums: 'halftime',
    arp: false,
    lead: [
      ...mel([[null, 1], ['C5', 2], ['B4', 1], ['Ab4', 2], ['G4', 2]], 0, { duty: 0.125, vel: 0.7 }),
      ...mel([['Eb5', 2], ['D5', 1], ['C5', 1], ['G4', 4]], 16, { duty: 0.125, vel: 0.6 }),
    ],
  }),
  // bgm.dungeon.trinity — D dorian 76, 6/8 · Wonder(twisted), Static · beautiful, grieving
  'bgm.dungeon.trinity': song({
    bpm: 76, bars: 8, meter: 3, key: 'D4', mode: 'dorian', progression: [1, 4, 6, 5, 1, 7, 4, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.26, step: 0.5 },
    lead: [
      ...mel([['D5', 1], ['F5', 0.5], ['E5', 0.5], ['D5', 1], ['B4', 1.5], ['A4', 1.5]], 0, { duty: 0.125 }),
      ...mel([['A4', 1], ['D5', 0.5], ['F5', 0.5], ['G5', 1], ['F5', 1.5], ['D5', 1.5]], 12, { duty: 0.125 }),
    ],
  }),
  // bgm.area.chancel — A min 80, 3/4 · PERSISTENCE(sacred), Resistance(corrupted) · holy, unsettling
  'bgm.area.chancel': song({
    bpm: 80, bars: 8, meter: 3, key: 'A4', mode: 'minor', progression: [1, 4, 5, 1, 6, 4, 5, 1], bass: 'pedal', drums: 'none',
    arp: { duty: 0.5, vel: 0.3, step: 0.75 },
    lead: [
      ...mel([['A4', 1.5], ['C5', 0.75], ['E5', 0.75], ['D5', 1.5], ['C5', 1.5]], 0, { duty: 0.5 }),
      ...mel([['E5', 1.5], ['F5', 0.75], ['E5', 0.75], ['C5', 1.5], ['A4', 1.5]], 12, { duty: 0.5 }),
    ],
  }),
  // bgm.route.redflats — E phrygian 128 · PERSISTENCE · harsh, hostile
  'bgm.route.redflats': song({
    bpm: 128, bars: 8, key: 'E4', mode: 'phrygian', progression: [1, 2, 1, 7, 1, 2, 6, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.24, step: 0.5 },
    lead: [
      ...mel([['E5', 0.5], ['F5', 0.5], ['E5', 0.5], ['G5', 0.5], ['F5', 1], ['E5', 1], ['D5', 1], ['E5', 1]]),
      ...mel([['E5', 0.5], ['F5', 0.5], ['G5', 1], ['F5', 0.5], ['E5', 0.5], ['C5', 1], ['E5', 2]], 8),
    ],
  }),
  // bgm.area.redbed — E min 140 · Main(savage) · proud, dangerous, tribal
  'bgm.area.redbed': song({
    bpm: 140, bars: 8, key: 'E4', mode: 'minor', progression: [1, 1, 4, 4, 6, 7, 1, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.26, step: 0.25 },
    lead: [
      ...mel([['E5', 0.5], ['B4', 0.5], ['E5', 0.5], ['G5', 0.5], ['F#5', 1], ['E5', 1], ['B4', 2]]),
      ...mel([['A5', 0.5], ['G5', 0.5], ['E5', 0.5], ['B4', 0.5], ['E5', 1], ['G5', 1], ['E5', 2]], 8),
    ],
  }),
  // bgm.area.redbed_fallen — E min 84 · Static(heavy), Home(broken) · the theme, gutted
  'bgm.area.redbed_fallen': song({
    bpm: 84, bars: 8, key: 'E4', mode: 'minor', progression: [1, 1, 6, 6, 4, 4, 1, 1], bass: 'pedal', drums: 'static',
    arp: false,
    lead: [
      ...mel([['E5', 2], ['G4', 1], ['E4', 1], [null, 2], ['B4', 1], ['E5', 1]], 0, { duty: 0.25, vel: 0.6 }),
      ...mel([['C5', 2], ['B4', 2], ['E4', 4]], 16, { duty: 0.25, vel: 0.55 }),
    ],
  }),
  // bgm.route.tollway — A min 124 · Main, Static · the metroplex begins
  'bgm.route.tollway': song({
    bpm: 124, bars: 8, key: 'A3', mode: 'minor', progression: [1, 7, 6, 7, 1, 4, 5, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.24, step: 0.5 },
    lead: [
      ...mel([['A4', 1], ['E5', 1], ['G5', 1], ['E5', 1], ['F5', 1], ['E5', 1], ['C5', 2]]),
      ...mel([['D5', 1], ['E5', 1], ['A5', 1], ['G5', 1], ['E5', 2], ['A4', 2]], 8),
    ],
  }),
  // bgm.area.array — B min 118 · PERSISTENCE(cold), Breaker · electronic, cerebral
  'bgm.area.array': song({
    bpm: 118, bars: 8, key: 'B3', mode: 'minor', progression: [1, 1, 7, 7, 6, 6, 5, 5], bass: 'driving', drums: 'halftime',
    arp: { duty: 0.125, vel: 0.3, step: 0.25 },
    lead: [
      ...mel([['B4', 0.5], ['F#5', 0.5], ['B5', 0.5], ['F#5', 0.5], ['A5', 1], ['F#5', 1], ['B4', 2]]),
      ...mel([['G5', 0.5], ['F#5', 0.5], ['D5', 0.5], ['B4', 0.5], ['F#5', 1], ['B5', 1], ['F#5', 2]], 8),
    ],
  }),
  // bgm.dungeon.stack — D min 138 · Main(urgent), Static · vertical, racing
  'bgm.dungeon.stack': song({
    bpm: 138, bars: 8, key: 'D4', mode: 'minor', progression: [1, 1, 7, 7, 6, 6, 5, 5], bass: 'driving', drums: 'drive',
    arp: { duty: 0.125, vel: 0.26, step: 0.25 },
    lead: [
      ...mel([['D5', 0.5], ['A4', 0.5], ['D5', 0.5], ['F5', 0.5], ['E5', 0.5], ['D5', 0.5], ['A4', 1], ['D5', 1]]),
      ...mel([['C5', 0.5], ['A4', 0.5], ['C5', 0.5], ['E5', 0.5], ['D5', 1], ['A4', 1], ['D5', 2]], 8),
    ],
  }),
  // bgm.area.verge — C min→Eb maj 72 · Home(elegiac), Resistance(faint), Eli · weary, holding the line
  'bgm.area.verge': song({
    bpm: 72, bars: 8, key: 'C4', mode: 'minor', progression: [1, 6, 3, 7, 4, 5, 1, 1], bass: 'roots', drums: 'halftime',
    arp: { duty: 0.5, vel: 0.26 },
    lead: [
      ...mel([['G4', 2], ['Ab4', 1], ['G4', 1], ['Eb4', 2], ['F4', 2]], 0, { duty: 0.25 }),
      ...mel([['C5', 1], ['Bb4', 1], ['G4', 1], ['Eb4', 1], ['C4', 4]], 16, { duty: 0.25 }),
    ],
  }),
  // bgm.dungeon.outerring — atonal 90 · Static(max), PERSISTENCE · oppressive
  'bgm.dungeon.outerring': song({
    bpm: 90, bars: 8, key: 'C4', mode: 'phrygian', progression: [1, 7, 1, 2, 1, 7, 6, 2], bass: 'pedal', drums: 'static',
    arp: false,
    lead: [
      ...mel([['C5', 1], ['F#5', 1], ['C5', 1], ['Db5', 1], [null, 2], ['G5', 1], ['F#5', 1]], 0, { duty: 0.125, vel: 0.55 }),
      ...mel([['C5', 1], ['Db5', 1], ['C5', 2], ['F#4', 2], ['C5', 2]], 16, { duty: 0.125, vel: 0.5 }),
    ],
  }),
  // bgm.dungeon.canyon — C# min 100 · PERSISTENCE, Static · dead giants, ascent
  'bgm.dungeon.canyon': song({
    bpm: 100, bars: 8, key: 'C#4', mode: 'minor', progression: [1, 1, 6, 6, 7, 7, 1, 1], bass: 'pedal', drums: 'march',
    arp: { duty: 0.125, vel: 0.24 },
    lead: [
      ...mel([['C#5', 2], ['G#4', 1], ['B4', 1], ['C#5', 2], ['E5', 2]], 0, { duty: 0.25 }),
      ...mel([['A4', 2], ['B4', 1], ['C#5', 1], ['G#4', 4]], 16, { duty: 0.25 }),
    ],
  }),
  // bgm.dungeon.underground — B min 96 · PERSISTENCE, Static · claustrophobic
  'bgm.dungeon.underground': song({
    bpm: 96, bars: 8, key: 'B3', mode: 'minor', progression: [1, 1, 2, 2, 7, 7, 1, 1], bass: 'pedal', drums: 'halftime',
    arp: false,
    lead: [
      ...mel([['B4', 1], ['D5', 1], ['B4', 1], ['F#4', 1], ['C5', 2], ['B4', 2]], 0, { duty: 0.125, vel: 0.6 }),
      ...mel([['A4', 1], ['B4', 1], ['F#4', 1], ['B4', 1], ['F#4', 4]], 16, { duty: 0.125, vel: 0.55 }),
    ],
  }),
  // bgm.dungeon.spire — D min 110 · PERSISTENCE(full), Main(defiant), Breaker · the climb
  'bgm.dungeon.spire': song({
    bpm: 110, bars: 8, key: 'D4', mode: 'minor', progression: [1, 1, 6, 7, 1, 4, 5, 5], bass: 'driving', drums: 'march',
    arp: { duty: 0.25, vel: 0.28, step: 0.5 },
    lead: [
      ...mel([['D5', 1], ['F5', 1], ['A5', 1], ['D5', 1], ['G#5', 2], ['A5', 2]]),
      ...mel([['Bb4', 1], ['D5', 1], ['F5', 1], ['A5', 1], ['D5', 2], ['A4', 2]], 8),
    ],
  }),
  // bgm.area.ohmcoming — G maj→D maj 100 · Home+Resistance+Main reprised · triumphant, bittersweet
  'bgm.area.ohmcoming': song({
    bpm: 100, bars: 8, key: 'G4', mode: 'major', progression: [1, 5, 6, 4, 1, 4, 5, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.5, vel: 0.32 },
    lead: [
      ...mel([['G4', 1], ['B4', 1], ['D5', 1], ['G5', 1], ['F#5', 1], ['E5', 1], ['D5', 2]]),
      ...mel([['E5', 1], ['D5', 1], ['B4', 1], ['G4', 1], ['A4', 1], ['B4', 1], ['G4', 2]], 8),
    ],
  }),
  // bgm.dungeon.cave — A min 84 · Static(faint) · underground, lonely (generic reused)
  'bgm.dungeon.cave': song({
    bpm: 84, bars: 8, key: 'A3', mode: 'minor', progression: [1, 1, 6, 6, 7, 7, 1, 1], bass: 'pedal', drums: 'halftime',
    arp: false,
    lead: [
      ...mel([['A4', 1], ['C5', 1], ['E5', 2], ['D5', 1], ['C5', 1], ['A4', 2]], 0, { duty: 0.125, vel: 0.6 }),
      ...mel([['E5', 1], ['C5', 1], ['A4', 1], ['E4', 1], ['A4', 4]], 16, { duty: 0.125, vel: 0.55 }),
    ],
  }),

  // ---- optional areas (spec §5 footnote) ----
  // depot — playful-industrial
  'bgm.area.depot': song({
    bpm: 118, bars: 8, key: 'C4', mode: 'dorian', progression: [1, 4, 1, 5, 1, 4, 7, 1], bass: 'walking', drums: 'walk',
    arp: { duty: 0.25, vel: 0.26 },
    lead: mel([['C5', 0.5], ['Eb5', 0.5], ['F5', 1], ['G5', 0.5], ['F5', 0.5], ['Eb5', 1], ['C5', 1], ['G4', 1], ['Bb4', 1], ['C5', 2]]),
  }),
  // drivein — nostalgic night
  'bgm.area.drivein': song({
    bpm: 76, bars: 8, key: 'F4', mode: 'major', progression: [1, 6, 2, 5, 1, 6, 4, 5], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.5, vel: 0.28 },
    lead: mel([['A4', 2], ['G4', 1], ['F4', 1], ['C5', 2], ['A4', 2], ['D5', 2], ['C5', 1], ['A4', 1], ['F4', 2]], 0, { duty: 0.25 }),
  }),
  // boneyard — desolate desert
  'bgm.area.boneyard': song({
    bpm: 92, bars: 8, key: 'D4', mode: 'phrygian', progression: [1, 1, 2, 2, 1, 1, 7, 1], bass: 'pedal', drums: 'halftime',
    arp: false,
    lead: mel([['D5', 2], ['Eb5', 1], ['D5', 1], ['A4', 2], ['F4', 2], ['D5', 2], ['C5', 2]], 0, { duty: 0.125, vel: 0.6 }),
  }),
  // silo — deep dread + origin-lore
  'bgm.dungeon.silo': song({
    bpm: 66, bars: 8, key: 'F4', mode: 'minor', progression: [1, 1, 6, 6, 4, 4, 5, 5], bass: 'pedal', drums: 'halftime',
    arp: false,
    lead: mel([[null, 2], ['F5', 2], ['Db5', 2], ['C5', 2], ['Ab4', 4], ['F4', 4]], 0, { duty: 0.125, vel: 0.55 }),
  }),
  // bogshrine — organic-hybrid hush
  'bgm.area.bogshrine': song({
    bpm: 70, bars: 8, meter: 3, key: 'E4', mode: 'dorian', progression: [1, 4, 6, 5, 1, 7, 4, 1], bass: 'roots', drums: 'gentle',
    arp: { duty: 0.25, vel: 0.24, step: 0.75 },
    lead: mel([['E5', 1.5], ['G5', 0.75], ['F#5', 0.75], ['E5', 1.5], ['B4', 1.5]], 0, { duty: 0.125 }),
  }),
  // stadium — crowd energy
  'bgm.area.stadium': song({
    bpm: 134, bars: 8, key: 'A4', mode: 'major', progression: [1, 4, 5, 1, 6, 4, 5, 1], bass: 'driving', drums: 'drive',
    arp: { duty: 0.25, vel: 0.28 },
    lead: mel([['A4', 0.5], ['C#5', 0.5], ['E5', 1], ['A5', 1], ['E5', 0.5], ['F#5', 0.5], ['E5', 1], ['C#5', 1], ['A4', 1]]),
  }),
  // fortress — postgame; PERSISTENCE at full cold scale
  'bgm.dungeon.fortress': song({
    bpm: 120, bars: 8, key: 'D4', mode: 'minor', progression: [1, 7, 1, 6, 1, 7, 5, 5], bass: 'driving', drums: 'march',
    arp: { duty: 0.125, vel: 0.3, step: 0.5 },
    lead: mel([['D5', 1], ['Ab4', 1], ['D5', 1], ['F5', 1], ['Ab5', 1], ['F5', 1], ['D5', 2]]),
  }),
};
