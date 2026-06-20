import Phaser from 'phaser';
import { BOOT_SET } from '../data/audio';
import { getAudio } from '../game/audio';

/**
 * Generates runtime placeholder textures. Real assets are gated on the
 * style-guide approval (Implementation Contract M8); nothing binary ships
 * before that.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload(): void {
    // eager-load the common set; per-scene tracks lazy-load in their own preload
    for (const t of BOOT_SET) {
      if (!this.cache.audio.exists(t.key)) this.load.audio(t.key, t.src);
    }
  }

  create(): void {
    const g = this.add.graphics();

    // 1px white pixel, tinted everywhere it's needed
    g.fillStyle(0xffffff).fillRect(0, 0, 1, 1);
    g.generateTexture('px', 1, 1);
    g.clear();

    getAudio().attach(this); // wire the game-global sound manager once
    this.scene.start('title');
  }
}
