import * as THREE from 'three';
import type { Battler, DataView } from '../../core/battle/contract';
import { makeBattler } from '../../core/battle/engine';
import { Rng } from '../../core/rng';
import type { MoveDef, TypeName } from '../../core/defs';
import { applyMood, type Mood } from '../mood';
import type { PostFX } from '../post';
import { RotHero, stillSprite } from '../sprites';
import { THEMES, type ArenaTheme, type ThemeId } from './themes';
import { COLS, ROWS, canStand, coverage, cooldownOf, hitDamage, landsRoll, patternOf, type Cell, type Pattern, type Side } from './rules';

/**
 * HD-2D grid battle — proof of concept ([PROPOSAL] rules in rules.ts).
 * A small diorama with a 6×3 panel field; your lead Ohm on the left, the
 * wild Ohm on the right, both moving in real time. You fire moves (each with
 * its own pattern and recharge); the foe telegraphs its attacks in red so you
 * can step out of the way. Numbers come from the Gen 3 core.
 */

export interface BattleResult { outcome: 'victory' | 'defeat' | 'fled' }

const TYPE_COLOR: Record<TypeName, string> = {
  VOLT: '#f2d64b', THERM: '#ff7a3c', COOLANT: '#5ec8f0', FRAME: '#b9b2a4', OPTIC: '#f6f0b0', SONIC: '#c78cff',
  SIGNAL: '#6ff0c8', MOTOR: '#ff5a5a', BREAKER: '#d9a24a', UTILITY: '#d8d8d8', VERDANT: '#7bd85a',
};
const PW = 1.36, PD = 1.06; // panel size (world units)
const cellPos = (c: Cell): THREE.Vector3 => new THREE.Vector3((c.col - 2.5) * PW, 0, (c.row - 1) * PD);
const same = (a: Cell, b: Cell): boolean => a.col === b.col && a.row === b.row;

interface Fighter {
  side: Side;
  b: Battler;
  cell: Cell;
  root: THREE.Object3D;
  hero?: RotHero;
  iframes: number;
  flash: number;
  lunge: number;
}

interface Pending { at: number; cells: Cell[]; from: Fighter; move: MoveDef; target: Fighter }

export class BattleArena {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  private readonly rng: Rng;
  private readonly panels: THREE.Mesh[][] = [];
  private readonly panelMats: THREE.MeshStandardMaterial[][] = [];
  private me!: Fighter;
  private foe!: Fighter;
  private sal: RotHero | null = null;
  private cooldowns: number[] = [];
  private pending: Pending[] = [];
  private fx: Array<{ obj: THREE.Object3D; life: number; max: number; update: (k: number) => void }> = [];
  private telegraph: Cell[] = [];
  private t = 0;
  private foeMoveAt = 1.2;
  private foeAttackAt = 2.2;
  private foeWind: { at: number; move: MoveDef; cells: Cell[] } | null = null;
  private over: BattleResult | null = null;
  private theme: ArenaTheme = THEMES.field;
  private ready = false;
  private done!: (r: BattleResult) => void;
  private stepHold = 0;
  private readonly hud: HTMLDivElement;
  private readonly chips: HTMLButtonElement[] = [];
  private readonly bars: Record<Side, { fill: HTMLDivElement; text: HTMLSpanElement }>;
  private readonly banner: HTMLDivElement;
  private readonly keys = new Set<string>();
  private readonly onKey: (e: KeyboardEvent) => void;
  private readonly onKeyUp: (e: KeyboardEvent) => void;
  stick = { x: 0, y: 0 };

  constructor(private readonly host: HTMLElement, private readonly data: DataView, seed: number) {
    this.rng = new Rng(seed);
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 120);
    this.camera.position.set(0, 6.1, 9.6);
    this.camera.lookAt(0, 0.45, 0.25);

    this.hud = document.createElement('div');
    this.hud.className = 'bt-hud';
    this.hud.innerHTML = `
      <div class="bt-plate bt-me"><b></b><i></i><div class="bt-bar"><div></div></div><span></span></div>
      <div class="bt-plate bt-foe"><b></b><i></i><div class="bt-bar"><div></div></div><span></span></div>
      <div class="bt-banner"></div>
      <div class="bt-chips"></div>
      <div class="bt-help">Move <kbd>WASD</kbd>/<kbd>←↑→↓</kbd> · Fire <kbd>J</kbd><kbd>K</kbd><kbd>L</kbd><kbd>;</kbd> · Run <kbd>Esc</kbd> · step off glowing ground</div>`;
    host.appendChild(this.hud);
    const plate = (cls: string): { fill: HTMLDivElement; text: HTMLSpanElement } => ({
      fill: this.hud.querySelector(`.${cls} .bt-bar div`) as HTMLDivElement,
      text: this.hud.querySelector(`.${cls} span`) as HTMLSpanElement,
    });
    this.bars = { player: plate('bt-me'), foe: plate('bt-foe') };
    this.banner = this.hud.querySelector('.bt-banner') as HTMLDivElement;

    const KEYS = ['j', 'k', 'l', ';'];
    this.onKey = (e) => {
      const k = e.key.toLowerCase();
      if (!this.keys.has(k)) {
        const slot = KEYS.indexOf(k) >= 0 ? KEYS.indexOf(k) : ['1', '2', '3', '4'].indexOf(k);
        if (slot >= 0) this.fire(slot);
        if (k === ' ' || k === 'enter') this.fire(0);
        if (k === 'escape') this.flee();
        const d = { arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0], arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1] }[k];
        if (d) { this.step(d[0]!, d[1]!); this.stepHold = 0.28; }
      }
      this.keys.add(k);
      if (k.startsWith('arrow') || k === ' ') e.preventDefault();
    };
    this.onKeyUp = (e) => this.keys.delete(e.key.toLowerCase());
  }

  /** Build the stage and run the fight; resolves when it ends. */
  async start(opts: { mood: Mood; renderer: THREE.WebGLRenderer; post: PostFX; me: Battler; foeNum: number; foeLevel: number; heroId?: string; theme?: ThemeId }): Promise<BattleResult> {
    const { mood, renderer, post } = opts;
    applyMood(this.scene, renderer, post, mood).follow(new THREE.Vector3(0, 0, 0));
    this.theme = THEMES[opts.theme ?? 'field'];
    this.buildStage(mood);
    const tint = new THREE.Color().setRGB(...mood.sprite);

    // your lead Ohm (the restyled 8-direction Scraplet when present), facing the foe
    const meHero = await RotHero.load('scraplet', tint, 1.05).catch(() => null);
    const meRoot = meHero?.root ?? (await stillSprite(`./sprites/ohms/${opts.me.speciesNum}_back_hd.png`, 1.05, tint));
    meHero?.face(1, 0);
    this.me = { side: 'player', b: opts.me, cell: { col: 1, row: 1 }, root: meRoot, hero: meHero ?? undefined, iframes: 0, flash: 0, lunge: 0 };
    // the wild Ohm: its front still, standing on the far side
    const foeB = makeBattler(this.data.species(opts.foeNum), opts.foeLevel, this.data);
    const foeRoot = await stillSprite(`./sprites/ohms/${opts.foeNum}_front_hd.png`, 1.15, tint);
    this.foe = { side: 'foe', b: foeB, cell: { col: 4, row: 1 }, root: foeRoot, iframes: 0, flash: 0, lunge: 0 };
    for (const f of [this.me, this.foe]) {
      f.root.position.copy(cellPos(f.cell));
      this.scene.add(f.root);
    }
    // move chips
    const chipsEl = this.hud.querySelector('.bt-chips') as HTMLDivElement;
    this.me.b.moves.forEach((slot, i) => {
      const m = this.data.move(slot.id);
      const b = document.createElement('button');
      b.className = 'bt-chip';
      b.style.setProperty('--tc', TYPE_COLOR[m.type]);
      b.innerHTML = `<kbd>${['J', 'K', 'L', ';'][i]}</kbd><b>${m.name}</b><small>${patternLabel(patternOf(m))} · ${m.type}</small><div class="bt-cd"></div>`;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); this.fire(i); });
      chipsEl.appendChild(b);
      this.chips.push(b);
      this.cooldowns.push(0.4 + i * 0.15);
    });
    (this.hud.querySelector('.bt-me b') as HTMLElement).textContent = this.me.b.name;
    (this.hud.querySelector('.bt-me i') as HTMLElement).textContent = `Lv${this.me.b.level}`;
    (this.hud.querySelector('.bt-foe b') as HTMLElement).textContent = `Wild ${foeB.name}`;
    (this.hud.querySelector('.bt-foe i') as HTMLElement).textContent = `Lv${foeB.level}`;
    this.updateBars();
    this.say(`A wild ${foeB.name} hums to life!`, 1.8);

    window.addEventListener('keydown', this.onKey);
    window.addEventListener('keyup', this.onKeyUp);
    this.ready = true;
    // SAL stands behind his Ohm, calling the shots — loaded in the background so the fight never waits on him
    void RotHero.load(opts.heroId ?? 'e_pro', tint, 1.6).then((h) => {
      this.sal = h;
      h.face(1, -0.4);
      h.root.position.set(-4.75, 0, -1.75);
      this.scene.add(h.root);
    }).catch(() => undefined);
    return new Promise((r) => { this.done = r; });
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('keyup', this.onKeyUp);
    this.hud.remove();
    this.scene.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
  }

  resize(w: number, h: number): void {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ------------------------------------------------------------- stage

  private buildStage(mood: Mood): void {
    const th = this.theme;
    this.scene.add(th.ground(mood));
    // the panel field — made of this region's ground
    for (let col = 0; col < COLS; col++) {
      this.panels[col] = [];
      this.panelMats[col] = [];
      for (let row = 0; row < ROWS; row++) {
        const side: Side = col < 3 ? 'player' : 'foe';
        const mat = new THREE.MeshStandardMaterial({ map: th.paintPanel(side, 300 + col * 7 + row * 31, mood.night), emissive: '#000000', emissiveIntensity: 0, roughness: th.roughness, metalness: th.metalness });
        const p = new THREE.Mesh(new THREE.BoxGeometry(PW - 0.1, th.panelH, PD - 0.1), mat);
        p.position.copy(cellPos({ col, row })).setY(th.panelH / 2);
        p.receiveShadow = true;
        this.scene.add(p);
        this.panels[col]![row] = p;
        this.panelMats[col]![row] = mat;
      }
    }
    th.dress(this.scene, mood, (col, row) => cellPos({ col, row }), PW, PD);
  }

  // ------------------------------------------------------------- input

  private step(dx: number, dz: number): void {
    if (this.over) return;
    const c = { col: this.me.cell.col + dx, row: this.me.cell.row + dz };
    if (!canStand('player', c)) return;
    this.me.cell = c;
  }

  private flee(): void {
    if (this.over) return;
    this.finish({ outcome: 'fled' }, 'Got away safely.');
  }

  private fire(slot: number): void {
    if (this.over || this.t < 0.6) return;
    const ms = this.me.b.moves[slot];
    if (!ms || (this.cooldowns[slot] ?? 0) > 0) return;
    const m = this.data.move(ms.id);
    this.cooldowns[slot] = cooldownOf(m);
    this.use(this.me, this.foe, m);
  }

  // ------------------------------------------------------------- combat

  /** Fire a move from `user` at `target`'s side (no telegraph — that's the foe's wind-up). */
  private use(user: Fighter, target: Fighter, m: MoveDef, cells?: Cell[]): void {
    const p = patternOf(m);
    if (p === 'self') {
      this.applyEffect(user, target, m, true);
      this.say(`${user.b.name} used ${m.name}!`, 1.1);
      this.burst(cellPos(user.cell), TYPE_COLOR[m.type], 0.5);
      return;
    }
    const hit = cells ?? coverage(p, user.cell, user.side, (c) => same(c, target.cell));
    const travel = p === 'shot' || p === 'row' ? 0.18 : p === 'lob' || p === 'cross' ? 0.45 : p === 'dash' ? 0.16 : 0.08;
    this.pending.push({ at: this.t + travel, cells: hit, from: user, move: m, target });
    this.playPattern(user, p, hit, travel, TYPE_COLOR[m.type]);
    if (user.side === 'foe') this.say(`${user.b.name} used ${m.name}!`, 1.0);
  }

  private resolve(pd: Pending): void {
    const { target, from, move } = pd;
    for (const c of pd.cells) this.flashPanel(c, TYPE_COLOR[move.type]);
    if (!pd.cells.some((c) => same(c, target.cell)) || target.iframes > 0) return;
    if (!landsRoll(move, this.rng)) { this.float(target, 'MISS', '#c8c8c8'); return; }
    if (move.power > 0) {
      const r = hitDamage(from.b, target.b, move, this.data, this.rng);
      target.b.integrity = Math.max(0, target.b.integrity - r.amount);
      target.iframes = 0.5;
      target.flash = 0.25;
      this.float(target, `${r.amount}${r.crit ? '!' : ''}`, r.effectiveness > 1 ? '#ffd04a' : '#ffffff');
      if (r.effectiveness > 1) this.say("It's super effective!", 0.9);
      this.shake = 0.18;
      this.updateBars();
    }
    this.applyEffect(from, target, move, false);
    if (target.b.integrity <= 0) {
      this.finish(target.side === 'foe' ? { outcome: 'victory' } : { outcome: 'defeat' },
        target.side === 'foe' ? `Wild ${target.b.name} powered down!` : `${target.b.name} is out of charge...`);
    }
  }

  private applyEffect(user: Fighter, target: Fighter, m: MoveDef, selfOnly: boolean): void {
    const e = m.effect;
    if (!e || e.kind === 'noKO') return;
    if (e.kind === 'statStage') {
      const who = e.target === 'self' ? user : target;
      if (selfOnly !== (e.target === 'self')) return;
      if (!this.rng.chance(e.chance)) return;
      who.b.stages[e.stat] = Math.max(-6, Math.min(6, who.b.stages[e.stat] + e.delta));
      this.float(who, `${e.stat.toUpperCase()} ${e.delta > 0 ? '▲' : '▼'}`, e.delta > 0 ? '#7dff9a' : '#ff8a7a');
    } else if (e.kind === 'status' && !selfOnly && !target.b.status && this.rng.chance(e.chance)) {
      target.b.status = e.status;
      this.float(target, e.status, '#ffb347');
    } else if (e.kind === 'heal' && selfOnly) {
      user.b.integrity = Math.min(user.b.stats.integrity, user.b.integrity + Math.floor(user.b.stats.integrity * e.fraction));
      this.updateBars();
    }
  }

  private finish(r: BattleResult, text: string): void {
    if (this.over) return;
    this.over = r;
    this.telegraph = [];
    this.say(text, 99);
    this.banner.classList.add('end');
    setTimeout(() => this.done(r), 2200);
  }

  // ------------------------------------------------------------- foe AI

  private foeThink(): void {
    const f = this.foe;
    const clockSlow = Math.pow(1.25, -Math.min(0, f.b.stages.clock));
    if (!this.foeWind && this.t > this.foeMoveAt) {
      const opts = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dz]) => ({ col: f.cell.col + dx!, row: f.cell.row + dz! })).filter((c) => canStand('foe', c));
      // drift toward the player's row half the time — wild Ohms hunt
      const toward = opts.filter((c) => Math.abs(c.row - this.me.cell.row) < Math.abs(f.cell.row - this.me.cell.row));
      const pick = (toward.length && this.rng.chance(50) ? toward : opts)[this.rng.int(0, Math.max(0, (toward.length && this.rng.chance(50) ? toward : opts).length - 1))];
      if (pick) f.cell = pick;
      this.foeMoveAt = this.t + (0.8 + this.rng.next() * 0.7) * clockSlow;
    }
    if (!this.foeWind && this.t > this.foeAttackAt) {
      const usable = f.b.moves.map((s) => this.data.move(s.id)).filter((m) => patternOf(m) !== 'self' || this.rng.chance(25));
      const m = usable[this.rng.int(0, usable.length - 1)];
      if (m) {
        const p = patternOf(m);
        // aimed shapes land on the player's panel as it is when the wind-up starts
        const cells = p === 'self' ? [] : coverage(p, f.cell, 'foe', (c) => same(c, this.me.cell), p === 'lob' || p === 'cross' ? { ...this.me.cell } : undefined);
        this.foeWind = { at: this.t + 0.85 * clockSlow, move: m, cells };
        this.telegraph = cells;
      }
      this.foeAttackAt = this.t + (2.3 + this.rng.next() * 1.2) * clockSlow;
    }
    if (this.foeWind && this.t >= this.foeWind.at) {
      const w = this.foeWind;
      this.foeWind = null;
      this.telegraph = [];
      this.use(f, this.me, w.move, w.cells.length ? w.cells : undefined);
    }
  }

  // ------------------------------------------------------------- effects

  private shake = 0;

  private playPattern(user: Fighter, p: Pattern, cells: Cell[], travel: number, color: string): void {
    const from = cellPos(user.cell).setY(0.6);
    const last = cells[cells.length - 1] ?? user.cell;
    const to = cellPos(last).setY(0.6);
    if (p === 'dash' || p === 'melee') { user.lunge = travel + 0.22; return this.burstAt(cells, color, travel); }
    const orb = new THREE.Mesh(new THREE.SphereGeometry(p === 'lob' || p === 'cross' ? 0.2 : 0.13, 10, 8), new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending }));
    this.scene.add(orb);
    const arc = p === 'lob' || p === 'cross' ? 1.8 : 0;
    this.fx.push({ obj: orb, life: travel, max: travel, update: (k) => {
      orb.position.lerpVectors(from, to, 1 - k);
      orb.position.y = 0.6 + Math.sin((1 - k) * Math.PI) * arc;
    } });
    this.burstAt(cells, color, travel);
  }

  /** Impacts are scheduled on the battle clock (not wall time) so they stay in step with damage. */
  private later: Array<{ at: number; fn: () => void }> = [];
  private burstAt(cells: Cell[], color: string, delay: number): void {
    this.later.push({ at: this.t + delay, fn: () => { for (const c of cells) this.burst(cellPos(c), color, 0.38); } });
  }

  private burst(at: THREE.Vector3, color: string, life: number): void {
    // a type-tinted ring on the panel and a thin spark column — bright, but never a white-out
    const tint = new THREE.Color(color).multiplyScalar(0.75);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.34, 24), new THREE.MeshBasicMaterial({ color: tint, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(at).setY(0.18);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 1.1, 10, 1, true), new THREE.MeshBasicMaterial({ color: tint, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    col.position.copy(at).setY(0.72);
    const grp = new THREE.Group();
    grp.add(ring, col);
    this.scene.add(grp);
    this.fx.push({ obj: grp, life, max: life, update: (k) => {
      ring.scale.setScalar(1 + (1 - k) * 1.3);
      (ring.material as THREE.MeshBasicMaterial).opacity = k * 0.8;
      col.scale.set(1 + (1 - k) * 0.4, k, 1 + (1 - k) * 0.4);
      (col.material as THREE.MeshBasicMaterial).opacity = k * 0.45;
    } });
  }

  private flashPanel(c: Cell, color: string): void {
    const m = this.panelMats[c.col]?.[c.row];
    if (!m) return;
    m.emissive.set(color);
    m.emissiveIntensity = 0.9;
  }

  private float(f: Fighter, text: string, color: string): void {
    const el = document.createElement('div');
    el.className = 'bt-float';
    el.textContent = text;
    el.style.color = color;
    this.hud.appendChild(el);
    const p = f.root.position.clone().setY(1.5).project(this.camera);
    el.style.left = `${((p.x + 1) / 2) * window.innerWidth}px`;
    el.style.top = `${((1 - p.y) / 2) * window.innerHeight}px`;
    setTimeout(() => el.remove(), 900);
  }

  private say(text: string, secs: number): void {
    this.banner.textContent = text;
    this.banner.classList.add('on');
    clearTimeout((this.banner as unknown as { _t?: number })._t);
    (this.banner as unknown as { _t?: number })._t = window.setTimeout(() => this.banner.classList.remove('on'), secs * 1000);
  }

  private updateBars(): void {
    for (const f of [this.me, this.foe]) {
      const k = f.b.integrity / f.b.stats.integrity;
      const bar = this.bars[f.side];
      bar.fill.style.width = `${Math.max(0, k * 100)}%`;
      bar.fill.style.background = k > 0.5 ? '#7dff9a' : k > 0.2 ? '#ffd04a' : '#ff5a4a';
      bar.text.textContent = `${f.b.integrity} / ${f.b.stats.integrity}`;
    }
  }

  // ------------------------------------------------------------- frame

  update(dt: number): void {
    if (!this.ready) return; // still loading the stage and fighters
    this.t += dt;
    if (!this.over) {
      // held direction keys / the touch stick repeat steps
      this.stepHold -= dt;
      const kx = (this.keys.has('d') || this.keys.has('arrowright') ? 1 : 0) - (this.keys.has('a') || this.keys.has('arrowleft') ? 1 : 0) || Math.round(this.stick.x);
      const kz = (this.keys.has('s') || this.keys.has('arrowdown') ? 1 : 0) - (this.keys.has('w') || this.keys.has('arrowup') ? 1 : 0) || Math.round(this.stick.y);
      if ((kx || kz) && this.stepHold <= 0) { this.step(kx, kx ? 0 : kz); this.stepHold = 0.17; }
      this.cooldowns = this.cooldowns.map((c) => Math.max(0, c - dt));
      this.chips.forEach((b, i) => {
        const m = this.data.move(this.me.b.moves[i]!.id);
        const k = (this.cooldowns[i] ?? 0) / cooldownOf(m);
        (b.querySelector('.bt-cd') as HTMLDivElement).style.height = `${k * 100}%`;
        b.classList.toggle('ready', k <= 0);
      });
      if (this.t > 1.6) this.foeThink();
    }
    for (const l of this.later.filter((x) => this.t >= x.at)) l.fn();
    this.later = this.later.filter((x) => this.t < x.at);
    for (const pd of this.pending.filter((p) => this.t >= p.at)) this.resolve(pd);
    this.pending = this.pending.filter((p) => this.t < p.at);

    // panels: telegraphs pulse red; flashes fade back to their side's glow
    for (let col = 0; col < COLS; col++) for (let row = 0; row < ROWS; row++) {
      const m = this.panelMats[col]![row]!;
      const warn = this.telegraph.some((c) => c.col === col && c.row === row);
      const standing = col < 3 && this.me.cell.col === col && this.me.cell.row === row;
      if (warn) {
        // the ground smoulders where the hit will land
        m.emissive.set(this.theme.warnGlow);
        m.emissiveIntensity = 0.32 + Math.sin(this.t * 18) * 0.2;
      } else {
        m.emissive.lerp(new THREE.Color(standing ? this.theme.standGlow : '#000000'), Math.min(1, dt * 6));
        m.emissiveIntensity += ((standing ? 0.09 : 0) - m.emissiveIntensity) * Math.min(1, dt * 6);
      }
    }
    // fighters glide to their panels; lunges, flashes, i-frame blink
    for (const f of [this.me, this.foe]) {
      if (!f) continue;
      const goal = cellPos(f.cell);
      if (f.lunge > 0) {
        f.lunge -= dt;
        const k = Math.sin(Math.min(1, Math.max(0, f.lunge / 0.38)) * Math.PI);
        goal.x += (f.side === 'player' ? 1 : -1) * k * 1.6;
      }
      f.root.position.lerp(goal, Math.min(1, dt * 16));
      f.iframes = Math.max(0, f.iframes - dt);
      f.flash = Math.max(0, f.flash - dt);
      f.root.visible = f.iframes <= 0 || Math.floor(this.t * 20) % 2 === 0;
      f.root.position.y = f.side === 'foe' && !this.over ? Math.abs(Math.sin(this.t * 3)) * 0.05 : 0;
    }
    this.me.hero?.animate(dt, false);
    this.sal?.animate(dt, false);
    for (const e of this.fx) { e.life -= dt; e.update(Math.max(0, e.life / e.max)); }
    for (const e of this.fx.filter((x) => x.life <= 0)) this.scene.remove(e.obj);
    this.fx = this.fx.filter((x) => x.life > 0);
    // a beaten Ohm sinks into a power-down slump
    for (const f of [this.me, this.foe]) if (this.over && f.b.integrity <= 0) { f.root.scale.y = Math.max(0.55, f.root.scale.y - dt * 1.2); f.root.visible = true; }
    // camera: a little shake on hits
    this.shake = Math.max(0, this.shake - dt);
    this.camera.position.set(Math.sin(this.t * 60) * this.shake * 0.25, 6.1 + Math.cos(this.t * 53) * this.shake * 0.15, 9.6);
    this.camera.lookAt(0, 0.45, 0.25);
  }
}

function patternLabel(p: Pattern): string {
  return { shot: 'Shot', dash: 'Dash', melee: 'Close', wide: 'Wave', row: 'Surge', lob: 'Lob', cross: 'Burst', self: 'Self' }[p];
}
