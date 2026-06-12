import Phaser from 'phaser';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';

/** Preset select + the grounded opening beat (beats.md §1, placeholder text). */
export class NewGameScene extends Phaser.Scene {
  private controls!: Controls;
  private cursor = 0;
  private stage: 'preset' | 'intro' = 'preset';
  private introIndex = 0;
  private text!: Phaser.GameObjects.Text;
  private options: Phaser.GameObjects.Text[] = [];
  private preset: 'SAL' | 'WREN' = 'SAL';

  private intro: string[] = [
    'OHMSTEAD COLONY — sublevel 3. The lights hum their off-shift hum.',
    "MA: 'Topside? Again? You're GROUNDED. Room. Now.'",
    '…You took the vent shaft instead.',
    "GRANDPA HARLAN: 'Heard the verdict clear through the floor, squirt.'",
    "HARLAN: 'Well. Long as you're sentenced to my garage — c'mere.'",
    "HARLAN: 'Before you fix a thing, ask it what it was for.' — Ohm's Law, ch.1",
    "HARLAN: 'Forty years of rare parts on that Bench. Build yourself a partner.'",
  ];

  constructor() {
    super('newgame');
  }

  create(): void {
    this.stage = 'preset';
    this.cursor = 0;
    this.introIndex = 0;
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x282018);
    this.add.text(120, 24, 'WHO RUNS TOPSIDE?', { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }).setOrigin(0.5);
    this.options = [
      this.add.text(46, 60, 'SAL\nfast talker,\nfuture legend', { fontFamily: 'monospace', fontSize: '9px', color: '#f8f8e8' }),
      this.add.text(140, 60, 'WREN\ndeadpan tinkerer,\nfixes everything', { fontFamily: 'monospace', fontSize: '9px', color: '#f8f8e8' }),
    ];
    this.text = this.add.text(8, 118, '', {
      fontFamily: 'monospace',
      fontSize: '9px',
      color: '#303030',
      wordWrap: { width: 224 },
    }).setVisible(false);
    this.updateCursor();
  }

  private updateCursor(): void {
    this.options.forEach((o, i) => o.setColor(i === this.cursor ? '#e8c830' : '#f8f8e8'));
  }

  override update(): void {
    if (this.stage === 'preset') {
      if (this.controls.consume('left') || this.controls.consume('right')) {
        this.cursor = 1 - this.cursor;
        this.updateCursor();
      }
      if (this.controls.consume('a')) {
        this.preset = this.cursor === 0 ? 'SAL' : 'WREN';
        this.stage = 'intro';
        for (const o of this.options) o.destroy();
        this.add.rectangle(120, 134, 240, 52, UI.paper).setStrokeStyle(2, UI.frame);
        this.text.setVisible(true).setDepth(5);
        this.text.setText(this.intro[0] ?? '');
      }
      return;
    }
    if (this.controls.consume('a')) {
      this.introIndex += 1;
      const line = this.intro[this.introIndex];
      if (line) this.text.setText(line);
      else this.scene.start('bench', { preset: this.preset });
    }
  }
}
