import Phaser from 'phaser';

/**
 * Generates runtime placeholder textures. Real assets are gated on the
 * style-guide approval (Implementation Contract M8); nothing binary ships
 * before that.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  create(): void {
    const g = this.add.graphics();

    // 1px white pixel, tinted everywhere it's needed
    g.fillStyle(0xffffff).fillRect(0, 0, 1, 1);
    g.generateTexture('px', 1, 1);
    g.clear();

    this.scene.start('title');
  }
}
