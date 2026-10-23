/**
 * The HD-2D overworld UI: a clean dark panel with a thin gold rule, a name
 * plate, and the speaker's portrait set smaller and BEHIND the text (Mark's
 * note). Plus the area title card, the interact prompt, and touch controls.
 */

export interface Speech { name?: string; portrait?: string; lines: string[] }

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls: string, parent: HTMLElement): HTMLElementTagNameMap[K] => {
  const e = document.createElement(tag);
  e.className = cls;
  parent.appendChild(e);
  return e;
};

export class UI {
  readonly root: HTMLDivElement;
  private readonly prompt: HTMLDivElement;
  private readonly box: HTMLDivElement;
  private readonly portrait: HTMLImageElement;
  private readonly plate: HTMLDivElement;
  private readonly text: HTMLDivElement;
  private readonly more: HTMLDivElement;
  private speech: Speech | null = null;
  private line = 0;
  private shown = 0;
  private onClose: (() => void) | null = null;

  /** Touch stick vector in [-1,1]², and a one-shot A press. */
  stick = { x: 0, y: 0 };
  private aPressed = false;

  constructor(host: HTMLElement) {
    this.root = el('div', 'ui', host);
    this.prompt = el('div', 'prompt', this.root);
    this.box = el('div', 'dlg', this.root);
    this.portrait = el('img', 'dlg-portrait', this.box);
    const panel = el('div', 'dlg-panel', this.box);
    this.plate = el('div', 'dlg-name', panel);
    this.text = el('div', 'dlg-text', panel);
    this.more = el('div', 'dlg-more', panel);
    this.more.textContent = '▼';
    this.box.addEventListener('pointerdown', (e) => { e.preventDefault(); this.aPressed = true; });
    if (matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) this.touchControls();
  }

  get talking(): boolean { return this.speech !== null; }

  /** True once per A press (keyboard handled by the caller; touch here). */
  takeA(): boolean {
    const a = this.aPressed;
    this.aPressed = false;
    return a;
  }

  titleCard(title: string, sub: string): void {
    this.root.querySelectorAll('.title-card').forEach((e) => e.remove());
    const c = el('div', 'title-card', this.root);
    el('div', 'tc-rule', c);
    el('div', 'tc-title', c).textContent = title;
    el('div', 'tc-sub', c).textContent = sub;
    el('div', 'tc-rule', c);
    setTimeout(() => c.classList.add('out'), 3200);
    setTimeout(() => c.remove(), 4600);
  }

  hint(html: string): void {
    const h = el('div', 'hint', this.root);
    h.innerHTML = html;
    setTimeout(() => h.classList.add('out'), 9000);
  }

  private badgeEl: HTMLDivElement | null = null;
  badge(html: string): void {
    this.badgeEl ??= el('div', 'badge', this.root);
    this.badgeEl.innerHTML = html;
  }

  private fadeEl: HTMLDivElement | null = null;
  /** Fade the screen to black (true) or back in (false); resolves when done. */
  fade(on: boolean, ms = 450): Promise<void> {
    this.fadeEl ??= el('div', 'fade', this.root);
    const f = this.fadeEl;
    f.style.transitionDuration = `${ms}ms`;
    void f.offsetWidth;
    f.classList.toggle('on', on);
    return new Promise((r) => setTimeout(r, ms));
  }

  /** The floating "talk" prompt, placed at a screen point (px) or hidden. */
  showPrompt(label: string | null, x = 0, y = 0): void {
    if (!label || this.talking) { this.prompt.classList.remove('on'); return; }
    this.prompt.innerHTML = `<b>${'ontouchstart' in window ? 'A' : 'E'}</b>${label}`;
    this.prompt.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) translate(-50%, -100%)`;
    this.prompt.classList.add('on');
  }

  say(s: Speech, onClose?: () => void): void {
    this.speech = s;
    this.line = 0;
    this.onClose = onClose ?? null;
    this.plate.textContent = s.name ?? '';
    this.box.classList.toggle('no-name', !s.name);
    this.box.classList.toggle('has-portrait', !!s.portrait);
    if (s.portrait) this.portrait.src = s.portrait;
    this.box.classList.add('on');
    this.startLine();
  }

  /** Advance: finish the typewriter, else next line, else close. */
  advance(): void {
    const s = this.speech;
    if (!s) return;
    const full = s.lines[this.line]!;
    if (this.shown < full.length) { this.shown = full.length; this.render(); return; }
    if (++this.line < s.lines.length) { this.startLine(); return; }
    this.speech = null;
    this.box.classList.remove('on');
    this.onClose?.();
  }

  tick(dt: number): void {
    const s = this.speech;
    if (!s) return;
    const full = s.lines[this.line]!;
    if (this.shown < full.length) {
      this.shown = Math.min(full.length, this.shown + dt * 52);
      this.render();
    }
  }

  private startLine(): void {
    this.shown = 0;
    this.render();
  }

  private render(): void {
    const s = this.speech!;
    const full = s.lines[this.line]!;
    this.text.textContent = full.slice(0, Math.floor(this.shown));
    this.more.classList.toggle('on', this.shown >= full.length);
  }

  private touchControls(): void {
    const pad = el('div', 'stick', this.root);
    const knob = el('div', 'stick-knob', pad);
    const R = 46;
    let id: number | null = null, ox = 0, oy = 0;
    const move = (x: number, y: number): void => {
      let dx = x - ox, dy = y - oy;
      const d = Math.hypot(dx, dy);
      if (d > R) { dx *= R / d; dy *= R / d; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      this.stick.x = dx / R;
      this.stick.y = dy / R;
    };
    pad.addEventListener('pointerdown', (e) => {
      id = e.pointerId;
      pad.setPointerCapture(id);
      const r = pad.getBoundingClientRect();
      ox = r.left + r.width / 2;
      oy = r.top + r.height / 2;
      move(e.clientX, e.clientY);
    });
    pad.addEventListener('pointermove', (e) => { if (e.pointerId === id) move(e.clientX, e.clientY); });
    const end = (e: PointerEvent): void => {
      if (e.pointerId !== id) return;
      id = null;
      knob.style.transform = '';
      this.stick.x = this.stick.y = 0;
    };
    pad.addEventListener('pointerup', end);
    pad.addEventListener('pointercancel', end);
    const a = el('button', 'btn-a', this.root);
    a.textContent = 'A';
    a.addEventListener('pointerdown', (e) => { e.preventDefault(); this.aPressed = true; });
  }
}
