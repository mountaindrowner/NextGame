import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { Controls } from '../input/controls';
import { getAudio } from '../game/audio';
import { fadeTo, FADE_WARM } from './transition';
import { grounded } from '../cutscene/script';

/** Preset select. The grounded opening beat now plays as the `grounded`
 * cutscene (Mabel, the garage, the Bench) right after the choice. */
export class NewGameScene extends Phaser.Scene {
  private controls!: Controls;
  private cursor = 0;
  private options: Phaser.GameObjects.Text[] = [];

  private frames: Phaser.GameObjects.Rectangle[] = [];

  constructor() {
    super('newgame');
  }

  preload(): void {
    for (const p of ['sal_96', 'wren_96'])
      if (!this.textures.exists(p)) this.load.image(p, `world/char/${p}.png`);
  }

  create(): void {
    fitLegacy(this);
    this.cursor = 0;
    this.frames = [];
    this.options = [];
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x282018);
    this.add.text(120, 18, 'WHO RUNS TOPSIDE?', { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }).setOrigin(0.5);

    // two centered columns: portrait on top, name + blurb centered beneath
    const cols: Array<{ x: number; key: string; preset: 'SAL' | 'WREN'; blurb: string }> = [
      { x: 70, key: 'sal_96', preset: 'SAL', blurb: 'SAL\nfast talker,\njokes when scared' },
      { x: 170, key: 'wren_96', preset: 'WREN', blurb: 'WREN\ndeadpan tinkerer,\nfixes everything' },
    ];
    const portraitTop = 34;
    const portraitH = 56;
    for (const col of cols) {
      const cy = portraitTop + portraitH / 2;
      const frame = this.add.rectangle(col.x, cy, portraitH + 6, portraitH + 6, 0x000000, 0).setStrokeStyle(2, 0x4a4030);
      this.frames.push(frame);
      if (this.textures.exists(col.key)) {
        const src = this.textures.get(col.key).getSourceImage();
        const w = (portraitH * src.width) / src.height;
        this.add.image(col.x, cy, col.key).setDisplaySize(w, portraitH).setDepth(2);
      }
      this.options.push(
        this.add
          .text(col.x, portraitTop + portraitH + 8, col.blurb, { fontFamily: 'monospace', fontSize: '9px', color: '#f8f8e8', align: 'center' })
          .setOrigin(0.5, 0)
          .setDepth(2),
      );
    }

    this.add.text(120, 146, 'LEFT / RIGHT to choose,  A to confirm', { fontFamily: 'monospace', fontSize: '8px', color: '#8a8478' }).setOrigin(0.5);
    this.cameras.main.fadeIn(360, 12, 10, 8);
    this.updateCursor();
  }

  private updateCursor(): void {
    this.options.forEach((o, i) => o.setColor(i === this.cursor ? '#e8c830' : '#f8f8e8'));
    this.frames.forEach((f, i) => f.setStrokeStyle(2, i === this.cursor ? 0xe8c830 : 0x4a4030));
  }

  override update(): void {
    if (this.controls.consume('left') || this.controls.consume('right')) {
      this.cursor = 1 - this.cursor;
      getAudio().cursor();
      this.updateCursor();
    }
    if (this.controls.consume('a')) {
      getAudio().select();
      const preset = this.cursor === 0 ? 'SAL' : 'WREN';
      fadeTo(this, 'cutscene', { cutscene: grounded(preset) }, FADE_WARM, 420);
    }
  }
}
