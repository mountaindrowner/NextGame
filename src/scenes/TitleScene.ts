import Phaser from 'phaser';
import { fitLegacy, LEGACY_H, LEGACY_W } from './legacy';
import { setGameState } from '../game/state';
import { browserStorage, SaveSlots, SLOT_COUNT } from '../save/save';
import { Controls } from '../input/controls';
import { fadeTo, FADE_COLD } from './transition';
import { COLD_OPEN } from '../cutscene/script';
import { getAudio } from '../game/audio';

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

  private intro = true;
  private menuObjs: Array<Phaser.GameObjects.Rectangle | Phaser.GameObjects.Text> = [];
  private glow?: Phaser.GameObjects.Image;
  private logo?: Phaser.GameObjects.Image;
  private scene_?: Phaser.GameObjects.Image;

  preload(): void {
    if (!this.textures.exists('title')) this.load.image('title', 'ui/title.png');
    if (!this.textures.exists('title_scene')) this.load.image('title_scene', 'ui/title_scene.png');
    if (!this.textures.exists('title_logo')) this.load.image('title_logo', 'ui/title_logo.png');
  }

  create(): void {
    fitLegacy(this);
    this.intro = true;
    const cx = LEGACY_W / 2;
    const cy = LEGACY_H / 2;
    const split = this.textures.exists('title_scene') && this.textures.exists('title_logo');

    if (split) {
      // layered, animated intro: scene fades in, the Static node pulses, the
      // wordmark settles on top
      const scale = LEGACY_W / this.textures.get('title_scene').getSourceImage().width;
      this.scene_ = this.add.image(cx, cy, 'title_scene').setDisplaySize(LEGACY_W, LEGACY_H).setDepth(0).setAlpha(0);
      this.tweens.add({ targets: this.scene_, alpha: 1, duration: 550, ease: 'Sine.Out' });

      this.makeGlow();
      this.glow = this.add.image(117, 84, 'node_glow').setDepth(1).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0);
      this.tweens.add({ targets: this.glow, alpha: 0.9, scale: 1.35, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.InOut', delay: 350 });

      this.logo = this.add.image(cx, cy - 6, 'title_logo').setDepth(2).setScale(scale * 1.06).setAlpha(0);
      this.tweens.add({ targets: this.logo, y: cy, scale, alpha: 1, duration: 680, ease: 'Back.Out', delay: 360 });
    } else if (this.textures.exists('title')) {
      this.add.image(cx, cy, 'title').setDisplaySize(LEGACY_W, LEGACY_H).setDepth(0);
      this.intro = false;
    } else {
      this.add.rectangle(120, 80, 240, 160, 0xd8b878);
      this.add.text(120, 46, 'OHMFRONT', { fontFamily: 'monospace', fontSize: '24px', color: '#282018', fontStyle: 'bold' }).setOrigin(0.5);
      this.intro = false;
    }

    this.controls = new Controls(this);
    this.items = [{ label: 'NEW GAME', run: () => fadeTo(this, 'cutscene', { cutscene: COLD_OPEN }, FADE_COLD, 420) }];
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
    const strip = this.add.rectangle(LEGACY_W / 2, LEGACY_H - panelH / 2 - 4, LEGACY_W, panelH, 0x140f0a, 0.55).setDepth(4);
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
    this.menuObjs = [strip, ...this.texts, this.prompt];
    if (this.intro) {
      for (const o of this.menuObjs) o.setAlpha(0);
      this.tweens.add({ targets: this.menuObjs, alpha: 1, duration: 400, delay: 1000, onComplete: () => (this.intro = false) });
    }
    this.refresh();
    getAudio().ensureBgm(this, 'bgm.sys.title');
    this.input.keyboard?.on('keydown-M', () => getAudio().toggleMute()); // throwaway mute (full UI in pass #2)
  }

  /** A small radial cyan texture for the pulsing Static node. */
  private makeGlow(): void {
    if (this.textures.exists('node_glow')) return;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    for (let i = 12; i > 0; i--) {
      g.fillStyle(0x8fe4ff, 0.05);
      g.fillCircle(16, 16, i * 1.3);
    }
    g.generateTexture('node_glow', 32, 32);
    g.destroy();
  }

  /** Skip the intro animation: snap every layer to its settled state. */
  private revealAll(): void {
    this.intro = false;
    this.tweens.killAll();
    this.scene_?.setAlpha(1);
    if (this.logo) {
      this.logo.setAlpha(1).setScale(LEGACY_W / this.textures.get('title_logo').getSourceImage().width).setY(LEGACY_H / 2);
    }
    if (this.glow) this.tweens.add({ targets: this.glow, alpha: 0.9, scale: 1.35, duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.InOut' });
    for (const o of this.menuObjs) o.setAlpha(1);
  }

  private refresh(): void {
    this.texts.forEach((t, i) => {
      t.setColor(i === this.cursor ? '#ffd27a' : '#f4ecd8');
      t.setFontStyle(i === this.cursor ? 'bold' : 'normal');
    });
  }

  override update(_t: number, delta: number): void {
    this.blink += delta;
    // any input during the intro skips straight to the settled title
    if (this.intro) {
      if (this.controls.consume('up') || this.controls.consume('down') || this.controls.consume('a') || this.controls.consume('start')) this.revealAll();
      return;
    }
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
