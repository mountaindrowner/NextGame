import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';
import { fadeTo } from './transition';

/**
 * The colony elevator (slice beat, master prompt §14 / beats.md §1→2): the
 * grounded kid sneaks up the Ohmstead elevator to the surface. A short rising
 * beat between the Bench and the Field, then hands off to FieldHDScene.
 */
export class ElevatorScene extends Phaser.Scene {
  private controls!: Controls;
  private lines = [
    'You slip past the freight curfew into the colony lift.',
    'Below, in the dark garage, Banjo hums two notes after you. Hello, goodbye — the same little song.',
    'The car shudders, then climbs. Sublevels tick past…',
    'Daylight bleeds in around the doors. First sky in weeks.',
    'The lift opens onto THE FIELD — a ruined cattle town under open sky.',
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

  private notes(): void {
    for (let i = 0; i < 2; i++) {
      const n = this.add.text(150 + i * 16, 96, '♪', { fontFamily: 'monospace', fontSize: '12px', color: '#ffd27a' }).setDepth(5);
      this.tweens.add({ targets: n, y: n.y - 20, alpha: 0, duration: 1200, delay: i * 240, ease: 'Sine.Out', onComplete: () => n.destroy() });
    }
  }

  override update(): void {
    if (this.done) return;
    if (this.controls.consume('a') || this.controls.consume('start')) {
      this.index += 1;
      const line = this.lines[this.index];
      if (line) {
        this.text.setText(line);
        if (this.index === 1) this.notes(); // Banjo's two-note hello
      } else {
        this.done = true;
        fadeTo(this, 'fieldhd', { mapId: 'the-field' }, [216, 200, 144], 500);
      }
    }
  }
}
