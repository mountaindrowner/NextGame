import type Phaser from 'phaser';

/**
 * HD migration shim. The legacy scenes were authored for a 240×160 canvas;
 * the engine native is now 480×320. Rather than reposition every coordinate,
 * each legacy scene zooms its camera 2× and centers on the old (120,80)
 * midpoint, so its 240×160 content fills the HD screen exactly. Native-HD
 * scenes (FieldHDScene) don't call this.
 */
export const LEGACY_W = 240;
export const LEGACY_H = 160;

export function fitLegacy(scene: Phaser.Scene): void {
  scene.cameras.main.setZoom(2);
  scene.cameras.main.centerOn(LEGACY_W / 2, LEGACY_H / 2);
}
