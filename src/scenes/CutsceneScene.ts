import Phaser from 'phaser';
import { fitLegacy, LEGACY_H, LEGACY_W } from './legacy';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';
import { fadeTo, FADE_COLD } from './transition';
import { cutsceneImages, type Cutscene, type LineStep } from '../cutscene/types';

const CPS = 48; // typewriter characters per second

/**
 * Generic, data-driven cutscene player (scene key `cutscene`). Runs a Cutscene
 * (src/cutscene/types) of bg / line / fade / wait / fx steps: a typewriter
 * dialogue box (the established paper-box + 9px mono look) with an optional
 * speaker name and portrait, advanced by A/START, finishable mid-type, and
 * skippable with B. Ends by fading to the cutscene's `next` scene. Legacy
 * 240×160 domain (fitLegacy).
 */
export class CutsceneScene extends Phaser.Scene {
  private controls!: Controls;
  private cut!: Cutscene;
  private index = -1;
  private bg?: Phaser.GameObjects.Image;
  private dim?: Phaser.GameObjects.Rectangle;
  private box!: Phaser.GameObjects.Rectangle;
  private speaker!: Phaser.GameObjects.Text;
  private body!: Phaser.GameObjects.Text;
  private prompt!: Phaser.GameObjects.Text;
  private portrait?: Phaser.GameObjects.Image;
  private full = '';
  private shown = 0;
  private typing = false;
  private acc = 0;
  private done = false;

  constructor() {
    super('cutscene');
  }

  init(data: { cutscene: Cutscene }): void {
    this.cut = data.cutscene;
    this.index = -1;
    this.done = false;
  }

  preload(): void {
    for (const path of cutsceneImages(this.cut)) if (!this.textures.exists(path)) this.load.image(path, path);
  }

  create(): void {
    fitLegacy(this);
    this.add.rectangle(LEGACY_W / 2, LEGACY_H / 2, LEGACY_W, LEGACY_H, 0x05060a).setDepth(0);
    this.dim = this.add.rectangle(LEGACY_W / 2, LEGACY_H / 2, LEGACY_W, LEGACY_H, 0x000000, 0).setDepth(2);

    this.box = this.add.rectangle(LEGACY_W / 2, 134, 238, 50, UI.paper).setStrokeStyle(2, UI.frame).setDepth(6).setVisible(false);
    this.speaker = this.add.text(10, 110, '', { fontFamily: 'monospace', fontSize: '8px', color: '#7a5a2a', fontStyle: 'bold' }).setDepth(7);
    this.body = this.add.text(10, 120, '', { fontFamily: 'monospace', fontSize: '9px', color: '#2a2018', wordWrap: { width: 220 } }).setDepth(7);
    this.prompt = this.add.text(226, 150, '▼', { fontFamily: 'monospace', fontSize: '8px', color: '#7a5a2a' }).setOrigin(1, 1).setDepth(7).setVisible(false);
    this.add.text(6, 2, 'B: skip', { fontFamily: 'monospace', fontSize: '7px', color: '#5a6068' }).setDepth(7).setAlpha(0.7);

    this.controls = new Controls(this);
    this.cameras.main.fadeIn(420, FADE_COLD[0], FADE_COLD[1], FADE_COLD[2]);
    this.advance();
  }

  /** Run the next step; auto-chains non-line steps, parks on lines for input. */
  private advance(): void {
    this.index += 1;
    const step = this.cut.steps[this.index];
    if (!step) {
      this.finish();
      return;
    }
    switch (step.kind) {
      case 'bg': {
        const key = this.textures.exists(step.image) ? step.image : undefined;
        this.bg?.destroy();
        if (key) this.bg = this.add.image(LEGACY_W / 2, LEGACY_H / 2, key).setDisplaySize(LEGACY_W, LEGACY_H).setDepth(1);
        this.dim?.setFillStyle(0x000000, step.dark ?? 0);
        this.advance();
        break;
      }
      case 'wait':
        this.time.delayedCall(step.ms, () => this.advance());
        break;
      case 'fade': {
        const c = step.color ?? FADE_COLD;
        if (step.to) {
          this.cameras.main.fade(step.ms ?? 400, c[0], c[1], c[2], false, (_cam: unknown, p: number) => { if (p >= 1) this.advance(); });
        } else {
          this.cameras.main.fadeIn(step.ms ?? 400, c[0], c[1], c[2]);
          this.time.delayedCall(step.ms ?? 400, () => this.advance());
        }
        break;
      }
      case 'fx':
        this.runFx(step.effect);
        this.time.delayedCall(360, () => this.advance());
        break;
      case 'line':
        this.showLine(step);
        break;
    }
  }

  private showLine(step: LineStep): void {
    this.box.setVisible(true);
    this.speaker.setText(step.speaker ?? '');
    this.portrait?.destroy();
    this.portrait = undefined;
    if (step.portrait && this.textures.exists(step.portrait)) {
      this.portrait = this.add.image(34, 78, step.portrait).setDepth(6);
      const src = this.textures.get(step.portrait).getSourceImage();
      this.portrait.setDisplaySize(52, (52 * src.height) / src.width).setOrigin(0.5, 1);
      this.portrait.y = 106;
    }
    this.full = step.text;
    this.shown = 0;
    this.acc = 0;
    this.typing = true;
    this.prompt.setVisible(false);
    this.body.setText('');
  }

  private runFx(effect: string): void {
    if (effect === 'flash') this.cameras.main.flash(220, 240, 240, 255);
    else if (effect === 'shake') this.cameras.main.shake(220, 0.006);
    else if (effect === 'glow') {
      const g = this.add.circle(LEGACY_W / 2, 70, 18, 0x8fe4ff, 0.5).setDepth(3).setBlendMode(Phaser.BlendModes.ADD);
      this.tweens.add({ targets: g, alpha: 0, scale: 2.4, duration: 900, ease: 'Sine.Out', onComplete: () => g.destroy() });
    } else if (effect === 'notes') {
      for (let i = 0; i < 2; i++) {
        const n = this.add.text(150 + i * 16, 86, '♪', { fontFamily: 'monospace', fontSize: '11px', color: '#ffd27a' }).setDepth(7);
        this.tweens.add({ targets: n, y: n.y - 18, alpha: 0, duration: 1000, delay: i * 180, ease: 'Sine.Out', onComplete: () => n.destroy() });
      }
    }
  }

  private finish(): void {
    if (this.done) return;
    this.done = true;
    fadeTo(this, this.cut.next, this.cut.nextData, FADE_COLD, 420);
  }

  override update(_t: number, delta: number): void {
    if (this.done) return;
    if (this.controls.consume('b')) {
      this.finish();
      return;
    }
    if (this.typing) {
      this.acc += delta;
      const target = Math.min(this.full.length, Math.floor((this.acc / 1000) * CPS));
      if (this.controls.consume('a') || this.controls.consume('start')) {
        this.shown = this.full.length;
      } else if (target > this.shown) {
        this.shown = target;
      }
      this.body.setText(this.full.slice(0, this.shown));
      if (this.shown >= this.full.length) {
        this.typing = false;
        this.prompt.setVisible(true);
      }
      return;
    }
    this.prompt.setAlpha(_t % 800 < 400 ? 1 : 0.3);
    if (this.controls.consume('a') || this.controls.consume('start')) this.advance();
  }
}
