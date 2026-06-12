import Phaser from 'phaser';

export type Button = 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'start';

/**
 * One input surface for keyboard and the touch d-pad (GDD §2: keyboard on
 * PC, virtual d-pad on touch). Scenes poll `held` / consume `pressed`.
 */
export class Controls {
  private held = new Set<Button>();
  private queue: Button[] = [];

  constructor(private scene: Phaser.Scene) {
    const kb = scene.input.keyboard;
    const bind = (codes: string[], btn: Button): void => {
      for (const code of codes) {
        kb?.on(`keydown-${code}`, (e: KeyboardEvent) => {
          if (!e.repeat) this.press(btn);
        });
        kb?.on(`keyup-${code}`, () => this.held.delete(btn));
      }
    };
    bind(['UP', 'W'], 'up');
    bind(['DOWN', 'S'], 'down');
    bind(['LEFT', 'A'], 'left');
    bind(['RIGHT', 'D'], 'right');
    bind(['SPACE', 'Z'], 'a');
    bind(['ESC', 'BACKSPACE', 'X'], 'b');
    bind(['SHIFT'], 'b'); // run is B-held, Gen 3 grammar
    bind(['ENTER', 'M'], 'start');
    if (this.isTouch()) this.buildPad();
  }

  private isTouch(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private press(btn: Button): void {
    this.held.add(btn);
    this.queue.push(btn);
  }

  isHeld(btn: Button): boolean {
    return this.held.has(btn);
  }

  /** drain one queued press of the given button */
  consume(btn: Button): boolean {
    const i = this.queue.indexOf(btn);
    if (i === -1) return false;
    this.queue.splice(i, 1);
    return true;
  }

  clearQueue(): void {
    this.queue.length = 0;
  }

  private buildPad(): void {
    const mk = (x: number, y: number, w: number, h: number, btn: Button): void => {
      const zone = this.scene.add
        .rectangle(x, y, w, h, 0xffffff, 0.08)
        .setScrollFactor(0)
        .setDepth(1000)
        .setInteractive();
      zone.on('pointerdown', () => this.press(btn));
      zone.on('pointerup', () => this.held.delete(btn));
      zone.on('pointerout', () => this.held.delete(btn));
    };
    mk(24, 128, 20, 20, 'left');
    mk(64, 128, 20, 20, 'right');
    mk(44, 110, 20, 20, 'up');
    mk(44, 146, 20, 20, 'down');
    mk(206, 122, 26, 26, 'a');
    mk(176, 140, 20, 20, 'b');
  }
}
