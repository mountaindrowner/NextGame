import Phaser from 'phaser';
import { setGameState } from '../game/state';
import { browserStorage, SaveSlots, SLOT_COUNT } from '../save/save';
import { Controls } from '../input/controls';

const SKY = 0xd8b878;
const RUST = 0x983820;

export class TitleScene extends Phaser.Scene {
  private controls!: Controls;
  private cursor = 0;
  private items: Array<{ label: string; run: () => void }> = [];
  private texts: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('title');
  }

  create(): void {
    this.add.rectangle(120, 80, 240, 160, SKY);
    this.add.rectangle(120, 120, 240, 80, RUST).setAlpha(0.35);
    this.add
      .text(120, 46, 'OHMFRONT', { fontFamily: 'monospace', fontSize: '24px', color: '#282018', fontStyle: 'bold' })
      .setOrigin(0.5);

    this.controls = new Controls(this);
    this.items = [{ label: 'NEW GAME', run: () => this.scene.start('newgame') }];
    const slots = new SaveSlots(browserStorage());
    for (let s = 0; s < SLOT_COUNT; s++) {
      const summary = slots.summary(s);
      if (summary) {
        this.items.push({
          label: `CONTINUE ${s + 1}: ${summary}`,
          run: () => {
            const state = slots.load(s);
            if (state) {
              setGameState(state);
              this.scene.start('overworld');
            }
          },
        });
      }
    }
    this.cursor = 0;
    this.texts = this.items.map((item, i) =>
      this.add
        .text(120, 92 + i * 13, item.label, { fontFamily: 'monospace', fontSize: '8px', color: '#282018' })
        .setOrigin(0.5),
    );
    this.refresh();
    this.add
      .text(120, 152, 'v0.1.0 — pre-slice', { fontFamily: 'monospace', fontSize: '8px', color: '#604830' })
      .setOrigin(0.5);
  }

  private refresh(): void {
    this.texts.forEach((t, i) => t.setFontStyle(i === this.cursor ? 'bold' : 'normal'));
  }

  override update(): void {
    if (this.controls.consume('up')) {
      this.cursor = (this.cursor + this.items.length - 1) % this.items.length;
      this.refresh();
    }
    if (this.controls.consume('down')) {
      this.cursor = (this.cursor + 1) % this.items.length;
      this.refresh();
    }
    if (this.controls.consume('a') || this.controls.consume('start')) {
      this.items[this.cursor]?.run();
    }
  }
}
