/**
 * Cutscene data model (pure — no Phaser). A cutscene is an ordered list of
 * steps the CutsceneScene plays: set a background, speak a line (typewriter),
 * fade, wait, or fire a small effect. Kept data-only so the opening scripts
 * are unit-testable and canon-lintable. Image/portrait fields are paths under
 * public/ (Phaser's runtime load base), e.g. 'ui/cutscene/waking.png'.
 */
export type FxEffect = 'glow' | 'notes' | 'flash' | 'shake';

export interface BgStep {
  kind: 'bg';
  image: string; // path under public/
  dark?: number; // optional dim overlay 0..1
}
export interface LineStep {
  kind: 'line';
  speaker?: string; // display label, e.g. 'MABEL'
  portrait?: string; // optional path under public/
  text: string;
}
export interface FadeStep {
  kind: 'fade';
  to?: boolean; // true = fade OUT to colour, false/undefined = fade IN from colour
  color?: [number, number, number];
  ms?: number;
}
export interface WaitStep {
  kind: 'wait';
  ms: number;
}
export interface FxStep {
  kind: 'fx';
  effect: FxEffect;
}
export type Step = BgStep | LineStep | FadeStep | WaitStep | FxStep;

export interface Cutscene {
  steps: Step[];
  next: string; // scene key to start when the cutscene ends
  nextData?: Record<string, unknown>;
}

/** All image paths a cutscene references (for preloading / test validation). */
export function cutsceneImages(c: Cutscene): string[] {
  const out = new Set<string>();
  for (const s of c.steps) {
    if (s.kind === 'bg') out.add(s.image);
    if (s.kind === 'line' && s.portrait) out.add(s.portrait);
  }
  return [...out];
}
