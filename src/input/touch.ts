import type { Button } from './controls';

/**
 * Global transparent touch overlay (DOM, not Phaser) — a thumb d-pad on the
 * left and A/B + START on the right, floating over the canvas. Built in screen
 * space so it's unaffected by per-scene camera zoom, works across every scene,
 * and supports multi-touch (move + press together). Held/pressed state is
 * shared; the per-scene Controls merges it with the keyboard.
 */
class TouchControls {
  readonly held = new Set<Button>();
  readonly queue: Button[] = [];
  private built = false;

  get active(): boolean {
    return this.built;
  }

  private press(btn: Button): void {
    if (!this.held.has(btn)) this.queue.push(btn);
    this.held.add(btn);
  }
  private release(btn: Button): void {
    this.held.delete(btn);
  }

  build(): void {
    if (this.built) return;
    const coarse =
      (typeof window !== 'undefined' && 'ontouchstart' in window) ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
      (typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches);
    if (!coarse) return;
    this.built = true;

    const root = document.createElement('div');
    root.id = 'touch-controls';
    root.style.cssText =
      'position:fixed;inset:0;pointer-events:none;z-index:1000;' +
      'touch-action:none;user-select:none;-webkit-user-select:none;font-family:monospace;';
    document.body.appendChild(root);

    const pad = (label: string, btn: Button, css: string, round = false): void => {
      const el = document.createElement('div');
      el.textContent = label;
      el.style.cssText =
        'position:absolute;display:flex;align-items:center;justify-content:center;' +
        'pointer-events:auto;touch-action:none;color:rgba(255,255,255,0.55);' +
        'background:rgba(255,255,255,0.10);border:2px solid rgba(255,255,255,0.30);' +
        'font-size:20px;font-weight:bold;' +
        (round ? 'border-radius:50%;' : 'border-radius:10px;') +
        css;
      const down = (e: Event): void => {
        e.preventDefault();
        el.style.background = 'rgba(255,255,255,0.28)';
        this.press(btn);
      };
      const up = (e: Event): void => {
        e.preventDefault();
        el.style.background = 'rgba(255,255,255,0.10)';
        this.release(btn);
      };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('pointerleave', up);
      root.appendChild(el);
    };

    // d-pad (bottom-left), plus layout
    const S = 64; // button size
    const cx = 30; // left inset of the cross's left arm
    const by = 30; // bottom inset
    pad('◀', 'left', `left:${cx}px;bottom:calc(${by}px + ${S}px);width:${S}px;height:${S}px;`);
    pad('▶', 'right', `left:${cx + 2 * S}px;bottom:calc(${by}px + ${S}px);width:${S}px;height:${S}px;`);
    pad('▲', 'up', `left:${cx + S}px;bottom:calc(${by}px + ${2 * S}px);width:${S}px;height:${S}px;`);
    pad('▼', 'down', `left:${cx + S}px;bottom:${by}px;width:${S}px;height:${S}px;`);

    // action buttons (bottom-right)
    pad('A', 'a', `right:30px;bottom:calc(40px + 24px);width:76px;height:76px;`, true);
    pad('B', 'b', `right:calc(30px + 84px);bottom:40px;width:64px;height:64px;`, true);
    // run (hold) — shares B's semantics in-engine; give it its own pad
    pad('RUN', 'b', `right:calc(30px + 84px);bottom:calc(40px + 76px);width:64px;height:40px;`);
    // menu / start
    pad('☰', 'start', `right:30px;top:20px;width:54px;height:40px;`);
  }

  consume(btn: Button): boolean {
    const i = this.queue.indexOf(btn);
    if (i === -1) return false;
    this.queue.splice(i, 1);
    return true;
  }
  clearQueue(): void {
    this.queue.length = 0;
  }
}

export const touch = new TouchControls();
