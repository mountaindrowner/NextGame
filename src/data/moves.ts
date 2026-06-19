import type { MoveDef } from '../core/defs';

/**
 * v1 movepool — 54 moves. Lean by design for the slice; grows toward the
 * contract's ~110 in the M10/M11 content passes. PP tuned generous
 * (GDD §10.4: light, never harsh).
 */
const M = (
  id: string,
  name: string,
  type: MoveDef['type'],
  power: number,
  accuracy: number,
  pp: number,
  priority = 0,
  effect?: MoveDef['effect'],
): MoveDef => ({ id, name, type, power, accuracy, pp, priority, effect });

export const MOVES: readonly MoveDef[] = [
  // --- VOLT (special) ---
  M('static-jab', 'Static Jab', 'VOLT', 40, 100, 35),
  M('arc-lash', 'Arc Lash', 'VOLT', 65, 100, 25),
  M('surge-bolt', 'Surge Bolt', 'VOLT', 90, 90, 15),
  M('live-wire', 'Live Wire', 'VOLT', 0, 100, 20, 0, { kind: 'status', status: 'SHORT', chance: 100 }),
  // --- THERM (special) ---
  M('heat-tick', 'Heat Tick', 'THERM', 40, 100, 35),
  M('vent-flare', 'Vent Flare', 'THERM', 65, 100, 25, 0, { kind: 'status', status: 'OVERHEAT', chance: 10 }),
  M('convection', 'Convection', 'THERM', 90, 90, 15),
  M('slow-roast', 'Slow Roast', 'THERM', 0, 90, 20, 0, { kind: 'status', status: 'OVERHEAT', chance: 100 }),
  // --- COOLANT (special) ---
  M('drip-shot', 'Drip Shot', 'COOLANT', 40, 100, 35),
  M('pressure-jet', 'Pressure Jet', 'COOLANT', 65, 100, 25),
  M('flash-flood', 'Flash Flood', 'COOLANT', 90, 90, 15),
  M('cold-snap', 'Cold Snap', 'COOLANT', 0, 75, 15, 0, { kind: 'status', status: 'LOCKED', chance: 100 }),
  // --- OPTIC (special) ---
  M('glint', 'Glint', 'OPTIC', 40, 100, 35),
  M('focus-beam', 'Focus Beam', 'OPTIC', 65, 100, 25),
  M('floodlight', 'Floodlight', 'OPTIC', 90, 90, 15),
  M('dazzle', 'Dazzle', 'OPTIC', 0, 100, 20, 0, { kind: 'status', status: 'GLITCHED', chance: 100 }),
  // --- SONIC (special) ---
  M('chirp', 'Chirp', 'SONIC', 40, 100, 35),
  M('feedback', 'Feedback', 'SONIC', 65, 100, 25),
  M('bass-drop', 'Bass Drop', 'SONIC', 90, 90, 15),
  M('standby-hum', 'Standby Hum', 'SONIC', 0, 60, 15, 0, { kind: 'status', status: 'STANDBY', chance: 100 }),
  // --- SIGNAL (special) ---
  M('ping', 'Ping', 'SIGNAL', 40, 100, 35),
  M('packet-storm', 'Packet Storm', 'SIGNAL', 65, 100, 25),
  M('broadcast', 'Broadcast', 'SIGNAL', 90, 90, 15),
  M('bad-sector', 'Bad Sector', 'SIGNAL', 0, 90, 20, 0, { kind: 'status', status: 'CORRUPTED', chance: 100 }),
  // --- FRAME (physical) ---
  M('chassis-bash', 'Chassis Bash', 'FRAME', 40, 100, 35),
  M('girder-swing', 'Girder Swing', 'FRAME', 65, 100, 25),
  M('anchor-drop', 'Anchor Drop', 'FRAME', 90, 85, 15),
  M('bulkhead', 'Bulkhead', 'FRAME', 0, 0, 20, 0, { kind: 'statStage', target: 'self', stat: 'armor', delta: 2, chance: 100 }),
  // --- MOTOR (physical) ---
  M('bump-start', 'Bump Start', 'MOTOR', 40, 100, 30, 1),
  M('run-down', 'Run Down', 'MOTOR', 65, 100, 25),
  M('redline', 'Redline', 'MOTOR', 90, 85, 15),
  M('rev-up', 'Rev Up', 'MOTOR', 0, 0, 30, 0, { kind: 'statStage', target: 'self', stat: 'clock', delta: 2, chance: 100 }),
  // --- BREAKER (physical) ---
  M('chip-away', 'Chip Away', 'BREAKER', 40, 100, 35),
  M('teardown', 'Teardown', 'BREAKER', 65, 100, 25),
  M('demolish', 'Demolish', 'BREAKER', 90, 85, 15),
  M('pry', 'Pry', 'BREAKER', 0, 85, 30, 0, { kind: 'statStage', target: 'foe', stat: 'armor', delta: -2, chance: 100 }),
  // --- UTILITY (physical) ---
  M('bump', 'Bump', 'UTILITY', 35, 100, 35),
  M('thump', 'Thump', 'UTILITY', 60, 100, 25),
  M('haymaker', 'Haymaker', 'UTILITY', 85, 90, 15),
  M('rattle', 'Rattle', 'UTILITY', 0, 100, 30, 0, { kind: 'statStage', target: 'foe', stat: 'output', delta: -1, chance: 100 }),
  M('dust-cloud', 'Dust Cloud', 'UTILITY', 0, 100, 20, 0, { kind: 'statStage', target: 'foe', stat: 'accuracy', delta: -1, chance: 100 }),
  M('brace', 'Brace', 'UTILITY', 0, 0, 30, 0, { kind: 'statStage', target: 'self', stat: 'armor', delta: 1, chance: 100 }),
  M('patch-up', 'Patch Up', 'UTILITY', 0, 0, 10, 0, { kind: 'heal', fraction: 0.5 }),
  // --- VERDANT (physical) ---
  M('thorn-flick', 'Thorn Flick', 'VERDANT', 40, 100, 35),
  M('root-crack', 'Root Crack', 'VERDANT', 65, 100, 25),
  M('overgrowth', 'Overgrowth', 'VERDANT', 90, 90, 15),
  M('spore-static', 'Spore Static', 'VERDANT', 0, 75, 15, 0, { kind: 'status', status: 'STANDBY', chance: 100 }),
  // --- starter signature moves (scooter / drone / dog) ---
  M('burnout', 'BURNOUT', 'MOTOR', 55, 100, 20, 1), // scooter charge-burst dash (priority)
  M('mark-strike', 'MARK STRIKE', 'SIGNAL', 55, 100, 20, 0, { kind: 'statStage', target: 'foe', stat: 'evasion', delta: -1, chance: 100 }), // drone marks from range
  M('pounce', 'POUNCE', 'FRAME', 60, 95, 20, 0, { kind: 'statStage', target: 'foe', stat: 'clock', delta: -1, chance: 30 }), // dog pounce + pin
  // --- wild flavor ---
  M('crumb-smog', 'Crumb Smog', 'THERM', 50, 100, 25, 0, { kind: 'statStage', target: 'foe', stat: 'accuracy', delta: -1, chance: 30 }),
  M('exact-change', 'Exact Change', 'FRAME', 50, 100, 25, 0, { kind: 'statStage', target: 'foe', stat: 'output', delta: -1, chance: 30 }),
  M('siren-wail', 'Siren Wail', 'SONIC', 75, 100, 20),
  M('mind-game', 'Mind Game', 'SIGNAL', 50, 100, 25, 0, { kind: 'status', status: 'GLITCHED', chance: 30 }),
];

export const MOVES_BY_ID: ReadonlyMap<string, MoveDef> = new Map(MOVES.map((m) => [m.id, m]));
