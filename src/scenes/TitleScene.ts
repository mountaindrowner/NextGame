import Phaser from 'phaser';
import { fitLegacy, LEGACY_H, LEGACY_W } from './legacy';
import { setGameState } from '../game/state';
import { browserStorage, SaveSlots, SLOT_COUNT } from '../save/save';
import { Controls } from '../input/controls';

export class TitleScene extends Phaser.Scene {
  private controls!: Controls;
  private cursor = 0;
  private items: Array<{ label: string; run: () => void }> = [];
  private texts: Phaser.GameObjects.Text[] = [];
  private prompt?: Phaser.GameObjects.Text;
  private blink = 0;

  constructor() {
    super('title');
  }

  preload(): void {
    if (!this.textures.exists('title')) this.load.image('title', 'ui/title.png');
  }

  create(): void {
    fitLegacy(this);
    // the start-screen key art (wordmark baked in), scaled to the legacy frame
    if (this.textures.exists('title')) {
      this.add.image(LEGACY_W / 2, LEGACY_H / 2, 'title').setDisplaySize(LEGACY_W, LEGACY_H).setDepth(0);
    } else {
      this.add.rectangle(120, 80, 240, 160, 0xd8b878);
      this.add.text(120, 46, 'OHMFRONT', { fontFamily: 'monospace', fontSize: '24px', color: '#282018', fontStyle: 'bold' }).setOrigin(0.5);
    }

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
              this.scene.start('fieldhd');
            }
          },
        });
      }
    }
    this.cursor = 0;

    // legibility strip behind the menu, low over the cracked-dirt foreground
    const n = this.items.length;
    const panelH = 14 + n * 12;
    this.add.rectangle(LEGACY_W / 2, LEGACY_H - panelH / 2 - 4, LEGACY_W, panelH, 0x140f0a, 0.55).setDepth(4);
    this.texts = this.items.map((item, i) =>
      this.add
        .text(LEGACY_W / 2, LEGACY_H - panelH + 10 + i * 12, item.label, { fontFamily: 'monospace', fontSize: '9px', color: '#f4ecd8' })
        .setOrigin(0.5)
        .setDepth(5),
    );
    this.prompt = this.add
      .text(LEGACY_W / 2, LEGACY_H - panelH - 4, '— press START —', { fontFamily: 'monospace', fontSize: '7px', color: '#ffd27a' })
      .setOrigin(0.5)
      .setDepth(5);
    this.refresh();
  }

  private refresh(): void {
    this.texts.forEach((t, i) => {
      t.setColor(i === this.cursor ? '#ffd27a' : '#f4ecd8');
      t.setFontStyle(i === this.cursor ? 'bold' : 'normal');
    });
  }

  override update(_t: number, delta: number): void {
    this.blink += delta;
    if (this.prompt) this.prompt.setAlpha(this.blink % 900 < 450 ? 1 : 0.25);
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
