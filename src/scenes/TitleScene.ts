import Phaser from 'phaser';

const SKY = 0xd8b878; // heat-haze placeholder
const RUST = 0x983820;
const DARK = 0x282018;

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('title');
  }

  create(): void {
    this.add.rectangle(120, 80, 240, 160, SKY);
    this.add.rectangle(120, 120, 240, 80, RUST).setAlpha(0.35);

    this.add
      .text(120, 56, 'OHMFRONT', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#282018',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const prompt = this.add
      .text(120, 110, 'PRESS ENTER / TAP', {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#282018',
      })
      .setOrigin(0.5);
    this.tweens.add({ targets: prompt, alpha: 0.2, duration: 700, yoyo: true, repeat: -1 });

    const begin = (): void => {
      // Next scene lands with the new-game flow (M6).
      this.cameras.main.flash(200, 40, 32, 24);
    };
    this.input.keyboard?.on('keydown-ENTER', begin);
    this.input.on('pointerdown', begin);

    this.add
      .text(120, 152, 'v0.1.0 — pre-slice', {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#604830',
      })
      .setOrigin(0.5);
    void DARK;
  }
}
