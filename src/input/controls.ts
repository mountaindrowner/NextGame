import Phaser from 'phaser';
import { touch } from './touch';

export type Button = 'up' | 'down' | 'left' | 'right' | 'a' | 'b' | 'start';

/**
 * One input surface for keyboard (per scene) and the global transparent touch
 * overlay (GDD §2: keyboard on PC, virtual d-pad on touch). Scenes poll
 * `isHeld` / `consume`; both keyboard and touch feed the same reads.
 */
export class Controls {
  private held = new Set<Button>();
  private queue: Button[] = [];

  constructor(scene: Phaser.Scene) {
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
    touch.build(); // idempotent; only renders on coarse-pointer devices
    touch.clearQueue(); // fresh scene shouldn't act on a tap from before it existed
  }

  private press(btn: Button): void {
    if (!this.held.has(btn)) this.queue.push(btn);
    this.held.add(btn);
  }

  isHeld(btn: Button): boolean {
    return this.held.has(btn) || touch.held.has(btn);
  }

  /** drain one queued press of the given button (keyboard or touch) */
  consume(btn: Button): boolean {
    const i = this.queue.indexOf(btn);
    if (i !== -1) {
      this.queue.splice(i, 1);
      return true;
    }
    return touch.consume(btn);
  }

  clearQueue(): void {
    this.queue.length = 0;
    touch.clearQueue();
  }
}
