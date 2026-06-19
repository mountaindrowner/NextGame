import type Phaser from 'phaser';

/** Warm "home" fade (caliche dusk) and cold "lore" fade — the opening's two moods. */
export const FADE_WARM: [number, number, number] = [18, 12, 8];
export const FADE_COLD: [number, number, number] = [6, 8, 14];

/**
 * Standard scene change: fade the camera to `color`, then start `key`. Replaces
 * the repeated `cameras.main.fade(...) + delayedCall(scene.start)` boilerplate
 * across the opening so every transition feels deliberate and consistent.
 */
export function fadeTo(
  scene: Phaser.Scene,
  key: string,
  data?: Record<string, unknown>,
  color: [number, number, number] = FADE_WARM,
  ms = 380,
): void {
  scene.cameras.main.fade(ms, color[0], color[1], color[2]);
  scene.time.delayedCall(ms + 30, () => scene.scene.start(key, data ?? {}));
}
