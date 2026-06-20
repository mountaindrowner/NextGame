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

  constructor() {
    super('newgame');
  }

  create(): void {
    fitLegacy(this);
    this.cursor = 0;
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x282018);
    this.add.text(120, 24, 'WHO RUNS TOPSIDE?', { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }).setOrigin(0.5);
    this.options = [
      this.add.text(46, 60, 'SAL\nfast talker,\njokes when scared', { fontFamily: 'monospace', fontSize: '9px', color: '#f8f8e8' }),
      this.add.text(140, 60, 'WREN\ndeadpan tinkerer,\nfixes everything', { fontFamily: 'monospace', fontSize: '9px', color: '#f8f8e8' }),
    ];
    this.add.text(120, 140, '←/→ choose    A: confirm', { fontFamily: 'monospace', fontSize: '8px', color: '#8a8478' }).setOrigin(0.5);
    this.cameras.main.fadeIn(360, 12, 10, 8);
    this.updateCursor();
  }

  private updateCursor(): void {
    this.options.forEach((o, i) => o.setColor(i === this.cursor ? '#e8c830' : '#f8f8e8'));
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
