import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';

/**
 * The colony elevator (slice beat, master prompt §14 / beats.md §1→2): the
 * grounded kid sneaks up the Ohmstead elevator to the surface. A short rising
 * beat between the Bench and the Field, then hands off to FieldHDScene.
 */
export class ElevatorScene extends Phaser.Scene {
  private controls!: Controls;
  private lines = [
    'You slip past the freight curfew into the colony elevator.',
    'The car shudders, then climbs. Sublevels tick past…',
    'Daylight bleeds in around the doors. First sky in weeks.',
    'The elevator opens onto THE FIELD — the ruined cattle town.',
  ];
  private index = 0;
  private text!: Phaser.GameObjects.Text;
  private car!: Phaser.GameObjects.Rectangle;
  private gap!: Phaser.GameObjects.Rectangle;
  private done = false;

  constructor() {
    super('elevator');
  }

  create(): void {
    fitLegacy(this);
    this.index = 0;
    this.done = false;
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x14110c);

    // elevator shaft + rising car + a widening sliver of sky at the top
    this.add.rectangle(120, 70, 96, 120, 0x2a2118).setStrokeStyle(2, 0x4a3c28);
    this.car = this.add.rectangle(120, 118, 84, 30, 0x3c3022).setStrokeStyle(1, 0x6a5638);
    this.gap = this.add.rectangle(120, 16, 0, 8, 0xd8c890);

    this.add.rectangle(120, 134, 240, 52, UI.paper).setStrokeStyle(2, UI.frame);
    this.text = this.add
      .text(8, 116, this.lines[0] ?? '', { fontFamily: 'monospace', fontSize: '9px', color: '#303030', wordWrap: { width: 224 } });
    this.prompt();

    // car rises as the beat plays
    this.tweens.add({ targets: this.car, y: 30, duration: 4200, ease: 'Sine.InOut' });
    this.tweens.add({ targets: this.gap, width: 88, duration: 4200, ease: 'Sine.In' });
  }

  private prompt(): void {
    this.add
      .text(232, 150, '▼', { fontFamily: 'monospace', fontSize: '8px', color: '#586068' })
      .setOrigin(1, 1);
  }

  override update(): void {
    if (this.done) return;
    if (this.controls.consume('a') || this.controls.consume('start')) {
      this.index += 1;
      const line = this.lines[this.index];
      if (line) {
        this.text.setText(line);
      } else {
        this.done = true;
        this.cameras.main.fade(500, 216, 200, 144);
        this.time.delayedCall(520, () => this.scene.start('fieldhd', { mapId: 'the-field' }));
      }
    }
  }
}
