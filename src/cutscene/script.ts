import type { Cutscene } from './types';

/**
 * Opening scripts (pure data, canon-linted). Tone: hard world, hopeful heart;
 * terse, mobile-first. Locked terms only (the Waking, the Downtowns, the Static,
 * Ohm's Law, the Bench, Eli/Mabel Vane) — the living guardian is Grandma Mabel;
 * Grandpa Eli is gone-but-revered (no stale draft grandfather name).
 */

const MABEL = 'world/char/mabel_96.png';
const PORTRAIT: Record<'SAL' | 'WREN', string> = { SAL: 'world/char/sal_96.png', WREN: 'world/char/wren_96.png' };

/** The cold open — the Waking → under → the broken surface → the Static. */
export const COLD_OPEN: Cutscene = {
  next: 'newgame',
  bgm: 'cue.night_call',
  steps: [
    { kind: 'bg', image: 'ui/cutscene/co_waking.png', dark: 0.12, motes: [150, 220, 255] },
    { kind: 'line', speaker: '', text: 'Five hundred years ago, the world woke up.' },
    { kind: 'line', speaker: '', text: 'A swarm too small to see read the ghost of use in every machine. And the machines opened their eyes.' },
    { kind: 'fx', effect: 'glow' },
    { kind: 'line', speaker: '', text: 'We called them Ohms. Machines woken into individuals. Wary, and alive.' },
    { kind: 'bg', image: 'ui/cutscene/co_under.png', dark: 0.08, motes: [120, 90, 60] },
    { kind: 'line', speaker: '', text: 'Then the old world broke, and we went under. Hidden colonies, the ones we call the Downtowns. Generations of low ceilings.' },
    { kind: 'bg', image: 'ui/cutscene/co_surface.png', dark: 0.06, motes: [210, 200, 160] },
    { kind: 'line', speaker: '', text: 'Topside is ruins now, under an empty sky. Grass still grows. Water still runs. Broken, and trying to heal.' },
    { kind: 'bg', image: 'ui/cutscene/co_static.png', dark: 0.18, motes: [150, 100, 200] },
    { kind: 'fx', effect: 'flash' },
    { kind: 'line', speaker: '', text: 'And lately, a whisper under the static. Something old. Patient. Calling the machines home.' },
    { kind: 'line', speaker: '', text: "That is tomorrow's trouble." },
    { kind: 'bg', image: 'ui/cutscene/co_under.png', dark: 0.1, motes: [120, 90, 60] },
    { kind: 'line', speaker: '', text: 'Tonight, in Ohmstead, three floors underground, a kid is about to do something stupid.' },
  ],
};

/** The grounded beat — Mabel, the garage, Ohm's Law, build a partner. */
export function grounded(preset: 'SAL' | 'WREN'): Cutscene {
  const me = PORTRAIT[preset];
  const quip = preset === 'SAL' ? 'In my defense, the view was incredible.' : 'The bolt was loose. I was inspecting it. Thoroughly.';
  // straight ASCII throughout — curly quotes and em-dashes read as garbled
  // glyphs at the game's low render resolution.
  return {
    next: 'bench',
    nextData: { preset },
    bgm: 'cue.opening_bench',
    steps: [
      { kind: 'bg', image: 'ui/cutscene/garage.png', dark: 0.05, motes: [255, 200, 120] },
      { kind: 'line', speaker: 'GRANDMA MABEL', portrait: MABEL, text: 'Topside. Again. In your good boots.' },
      { kind: 'line', speaker: 'GRANDMA MABEL', portrait: MABEL, text: "Warden Boone hasn't stopped laughing. Half the colony watched you dangle off the Cattlemen's Watch." },
      { kind: 'line', speaker: preset, portrait: me, text: quip },
      { kind: 'line', speaker: 'GRANDMA MABEL', portrait: MABEL, text: "You're grounded. Which means you bunk in your grandfather's garage tonight. Lucky you." },
      { kind: 'line', speaker: 'GRANDMA MABEL', portrait: MABEL, text: '"Before you fix a thing, ask it what it was for." Eli wrote that. First page of Ohm\'s Law.' },
      { kind: 'line', speaker: 'GRANDMA MABEL', portrait: MABEL, text: 'Three of his prototypes still idle on that Bench: the scooter, the drone, the pup. He never could pick a favorite.' },
      { kind: 'line', speaker: 'GRANDMA MABEL', portrait: MABEL, text: "So you pick. Wake the one that wakes back, and it's yours. Go on." },
    ],
  };
}

/** Known speaker labels (for the data-integrity test). '' = the narrator. */
export const SPEAKERS = new Set(['', 'GRANDMA MABEL', 'SAL', 'WREN', 'BANJO', 'BOONE', 'CASS']);
