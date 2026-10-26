import * as THREE from 'three';
import type { Battler, DataView } from '../../core/battle/contract';
import { makeBattler } from '../../core/battle/engine';
import { Rng } from '../../core/rng';
import type { MoveDef, TypeName } from '../../core/defs';
import { SPECIES } from '../../data/species';
import { applyMood, type Mood } from '../mood';
import type { PostFX } from '../post';
import { RotHero, stillSprite } from '../sprites';
import { THEMES, type ArenaTheme, type ThemeId } from './themes';
import { runCapturePuzzle } from './capture';
import { puzzleBudget } from '../../core/capture';
import {
  COLS, ROWS, HALF, STEPS, canStand, coverage, cooldownTurns, frontCol, hitDamage, inflict, landsRoll, moveOrigin, patternOf,
  specialOf, specialTurns, statusChip, statusGate, sideOf, turnOrder,
  type Cell, type MoveOrigin, type PanelState, type Pattern, type Side, type SpecialDef,
} from './rules';

/**
 * HD-2D squad battle, turn-based — [PROPOSAL] rules in rules.ts. A 10×5
 * field: your 5×5 on the left, theirs on the right, up to three Ohms a side.
 * Each round every Ohm takes one turn, fastest CLOCK first. On a turn an Ohm
 * steps up to two panels, then uses a move or its special (or waits). Your
 * attacks land at once; foes wind up in plain sight (red panels) and strike
 * at the start of their next turn, so your Ohms can step out, wall it off or
 * stun them first. Numbers and statuses come from the Gen 3 core.
 */

export interface BattleResult { outcome: 'victory' | 'defeat' | 'fled' | 'captured' | 'foeFled'; foe?: Battler }

const TYPE_COLOR: Record<TypeName, string> = {
  VOLT: '#f2d64b', THERM: '#ff7a3c', COOLANT: '#5ec8f0', FRAME: '#b9b2a4', OPTIC: '#f6f0b0', SONIC: '#c78cff',
  SIGNAL: '#6ff0c8', MOTOR: '#ff5a5a', BREAKER: '#d9a24a', UTILITY: '#d8d8d8', VERDANT: '#7bd85a',
};
const STATE_COLOR: Record<PanelState, string> = { normal: '#000000', cracked: '#000000', broken: '#000000', scorched: '#ff5a1a', iced: '#9fdcff', charged: '#ffe85a', grown: '#6ad84a' };
/** Rounds a changed panel lasts. */
const PANEL_ROUNDS: Record<PanelState, number> = { normal: 0, cracked: 3, broken: 2, scorched: 2, iced: 2, charged: 2, grown: 3 };
const PW = 1.14, PD = 0.86; // panel size (world units)
const cellPos = (c: Cell): THREE.Vector3 => new THREE.Vector3((c.col - (COLS - 1) / 2) * PW, 0, (c.row - (ROWS - 1) / 2) * PD);
const same = (a: Cell, b: Cell): boolean => a.col === b.col && a.row === b.row;
const key = (c: Cell): string => `${c.col},${c.row}`;
const AIMED: ReadonlySet<Pattern> = new Set(['lob', 'cross']);
const LANE: ReadonlySet<Pattern> = new Set(['shot', 'dash', 'row']);
/** Species drawn as 8-direction PixelLab Ohms (public/world/styles/index.json), loaded once. */
let STYLED: Record<number, string> = { 1: 'scootlet', 4: 'dronelet', 7: 'scraplet' };
const styledReady = fetch('./world/styles/index.json').then((r) => r.json()).then((j: { ohms?: Record<string, string> }) => { STYLED = { ...STYLED, ...Object.fromEntries(Object.entries(j.ohms ?? {}).map(([k, v]) => [Number(k), v])) }; }).catch(() => undefined);

/** A foe's wind-up: the move, and the panel it's aimed at. It lands at the start of the foe's next turn. */
interface Wind { move: MoveDef; aim: Cell }
interface Fighter {
  id: number;
  side: Side;
  b: Battler;
  special: SpecialDef;
  cell: Cell;
  root: THREE.Object3D;
  hero?: RotHero;
  down: boolean;
  turns: number; // own turns taken
  ready: number[]; // per move slot: usable once turns >= this
  spReady: number;
  stunned: boolean; // loses its next turn
  blindUntil: number; // rounds
  markedUntil: number;
  tauntUntil: number;
  wind: Wind | null;
  lunge: number;
  blink: number;
  plate?: { root: HTMLDivElement; fill: HTMLDivElement; text: HTMLSpanElement; sp: HTMLDivElement; tags: HTMLSpanElement };
}
interface Panel { state: PanelState; until: number; mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; overlay: THREE.Mesh; crack: THREE.Mesh; hole: THREE.Mesh }
interface Barrier { cell: Cell; side: Side; until: number; mesh: THREE.Object3D }
type Pick = { kind: 'move'; slot: number } | { kind: 'special' };

export class BattleArena {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  private readonly rng: Rng;
  private readonly panels: Panel[][] = [];
  private fighters: Fighter[] = [];
  private barriers: Barrier[] = [];
  private sal: RotHero | null = null;
  private fx: Array<{ obj: THREE.Object3D; life: number; max: number; update: (k: number) => void }> = [];
  private later: Array<{ at: number; fn: () => void }> = [];
  private t = 0;
  private over: BattleResult | null = null;
  private wild = true;
  private capturing = false;
  private nodes: () => number = () => 0;
  private spendNode: () => void = () => undefined;
  private theme: ArenaTheme = THEMES.field;
  private ready = false;
  private done!: (r: BattleResult) => void;
  private shake = 0;
  private compact = false;

  // the turn
  private round = 0;
  private order: Fighter[] = [];
  private active: Fighter | null = null;
  /** 'input' = waiting on you; 'busy' = something is playing out. */
  private phase: 'busy' | 'input' = 'busy';
  private stepsLeft = 0;
  private pick: Pick | null = null;
  private aim: Fighter | null = null;
  private endTurn: (() => void) | null = null;
  private stepHold = 0;

  private readonly hud: HTMLDivElement;
  private readonly chipsEl: HTMLDivElement;
  private readonly orderEl: HTMLDivElement;
  private chips: HTMLButtonElement[] = [];
  private spChip: HTMLButtonElement | null = null;
  private capChip: HTMLButtonElement | null = null;
  private readonly banner: HTMLDivElement;
  private readonly onKey: (e: KeyboardEvent) => void;
  private readonly onPointer: (e: PointerEvent) => void;
  private readonly ctrlRing: THREE.Mesh;
  private readonly aimRing: THREE.Mesh;
  private readonly ray = new THREE.Raycaster();
  stick = { x: 0, y: 0 };

  constructor(private readonly host: HTMLElement, private readonly data: DataView, seed: number) {
    this.rng = new Rng(seed);
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 140);
    this.placeCamera();
    this.hud = document.createElement('div');
    this.hud.className = 'bt-hud';
    this.hud.innerHTML = `
      <div class="sq-side sq-mine"></div>
      <div class="sq-side sq-theirs"></div>
      <div class="sq-order"></div>
      <div class="bt-banner"></div>
      <div class="bt-chips"></div>
      <div class="bt-help">Step <kbd>WASD</kbd> or click a panel · Move <kbd>J</kbd><kbd>K</kbd><kbd>L</kbd><kbd>;</kbd> then again to use · Special <kbd>Space</kbd> · Aim <kbd>Tab</kbd> · Wait <kbd>E</kbd> · Capture <kbd>C</kbd> · Back/Run <kbd>Esc</kbd></div>`;
    host.appendChild(this.hud);
    this.banner = this.hud.querySelector('.bt-banner') as HTMLDivElement;
    this.chipsEl = this.hud.querySelector('.bt-chips') as HTMLDivElement;
    this.orderEl = this.hud.querySelector('.sq-order') as HTMLDivElement;
    const ring = (color: string): THREE.Mesh => {
      const m = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.44, 28), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }));
      m.rotation.x = -Math.PI / 2;
      this.scene.add(m);
      return m;
    };
    this.ctrlRing = ring('#ffd27a');
    this.aimRing = ring('#ff6a5a');

    const KEYS = ['j', 'k', 'l', ';'];
    this.onKey = (e) => {
      if (e.repeat) return;
      const k = e.key.toLowerCase();
      const slot = KEYS.indexOf(k);
      if (slot >= 0) this.choose({ kind: 'move', slot });
      if (k === ' ') this.choose({ kind: 'special' });
      if (k === 'enter' && this.pick) this.choose(this.pick);
      if (k === 'tab') this.cycleAim();
      if (k === 'e') this.wait();
      if (k === 'escape') { if (this.pick) this.cancel(); else this.flee(); }
      if (k === 'c') void this.capture();
      const d = { arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0], arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1] }[k];
      if (d) void this.stepActive(d[0]!, d[1]!);
      if (k.startsWith('arrow') || k === ' ' || k === 'tab') e.preventDefault();
    };
    // click / tap the field: step to a lit panel, or aim at a foe's panel
    this.onPointer = (e) => {
      if ((e.target as HTMLElement | null)?.tagName !== 'CANVAS') return;
      const r = (e.target as HTMLCanvasElement).getBoundingClientRect();
      this.ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), this.camera);
      const meshes = this.panels.flat().map((p) => p.mesh);
      const hit = this.ray.intersectObjects(meshes, false)[0];
      if (!hit) return;
      const i = meshes.indexOf(hit.object as THREE.Mesh);
      void this.tapPanel({ col: Math.floor(i / ROWS), row: i % ROWS });
    };
  }

  private placeCamera(sx = 0, sy = 0): void {
    this.camera.position.set(sx, 8.4 + sy, 11.4);
    this.camera.lookAt(0, 0.2, this.compact ? 0.9 : 0.35);
  }

  /** Build the stage and run the fight; resolves when it ends. */
  async start(opts: {
    mood: Mood; renderer: THREE.WebGLRenderer; post: PostFX;
    party: Battler[]; foes: Array<{ num: number; level: number }>;
    heroId?: string; theme?: ThemeId; nodes?: () => number; spendNode?: () => void; wild?: boolean;
  }): Promise<BattleResult> {
    this.nodes = opts.nodes ?? (() => 0);
    this.spendNode = opts.spendNode ?? (() => undefined);
    this.wild = opts.wild ?? true;
    const { mood, renderer, post } = opts;
    applyMood(this.scene, renderer, post, mood).follow(new THREE.Vector3(0, 0, 0));
    this.theme = THEMES[opts.theme ?? 'field'];
    this.buildStage(mood);
    const tint = new THREE.Color().setRGB(...mood.sprite);

    // starting panels: one Ohm stands centre; two flank; three make a wedge
    const SPOTS: Record<number, Cell[]> = { 1: [{ col: 2, row: 2 }], 2: [{ col: 2, row: 1 }, { col: 2, row: 3 }], 3: [{ col: 3, row: 2 }, { col: 1, row: 1 }, { col: 1, row: 3 }] };
    const mirror = (c: Cell): Cell => ({ col: COLS - 1 - c.col, row: c.row });
    const party = opts.party.filter((b) => b.integrity > 0).slice(0, 3);
    const foes = opts.foes.slice(0, 3).map((f) => makeBattler(this.data.species(f.num), f.level, this.data));
    let id = 0;
    const make = async (b: Battler, side: Side, cell: Cell): Promise<Fighter> => {
      let root: THREE.Object3D;
      let hero: RotHero | undefined;
      await styledReady;
      if (STYLED[b.speciesNum]) {
        hero = (await RotHero.load(STYLED[b.speciesNum]!, tint, 0.98).catch(() => null)) ?? undefined;
        hero?.face(side === 'player' ? 1 : -1, 0.8); // three-quarter toward the camera so faces read
      }
      if (hero) root = hero.root;
      else root = await stillSprite(`./sprites/ohms/${b.speciesNum}_${side === 'player' ? 'back' : 'front'}_hd.png`, side === 'player' ? 0.98 : 1.05, tint);
      root.position.copy(cellPos(cell));
      this.scene.add(root);
      const special = specialOf(b.speciesNum, this.data.species(b.speciesNum).type);
      return {
        id: id++, side, b, special, cell, root, hero, down: false,
        turns: 0, ready: b.moves.map(() => 0), spReady: 1 + Math.floor(specialTurns(special) / 2),
        stunned: false, blindUntil: 0, markedUntil: 0, tauntUntil: 0, wind: null, lunge: 0, blink: 0,
      };
    };
    this.fighters = [
      ...(await Promise.all(party.map((b, i) => make(b, 'player', SPOTS[party.length]![i]!)))),
      ...(await Promise.all(foes.map((b, i) => make(b, 'foe', mirror(SPOTS[foes.length]![i]!))))),
    ];
    this.buildPlates();
    const names = foes.map((f) => f.name);
    this.say(this.wild ? (names.length > 1 ? `A pack of ${names.length} wild Ohms closes in!` : `A wild ${names[0]} hums to life!`) : `${names.join(', ')} step up!`, 1.8);

    window.addEventListener('keydown', this.onKey);
    window.addEventListener('pointerdown', this.onPointer);
    this.ready = true;
    // SAL stands behind the squad, calling the shots — loaded in the background so the fight never waits on him
    void RotHero.load(opts.heroId ?? 'e_pro', tint, 1.6).then((h) => {
      this.sal = h;
      h.face(1, -0.4);
      h.root.position.set(-2.4 * PW, 0, -(ROWS / 2) * PD - 0.7); // behind your half, clear of the plates
      this.scene.add(h.root);
    }).catch(() => undefined);
    void this.run();
    return new Promise((r) => { this.done = r; });
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('pointerdown', this.onPointer);
    this.hud.remove();
    this.scene.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
  }

  resize(w: number, h: number): void {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // short landscape screens (phones): lift the field clear of the move pad
    this.compact = h < 520;
    this.placeCamera();
  }

  /** Wait on the battle clock (frozen while the capture puzzle runs). */
  private wait_(secs: number): Promise<void> {
    return new Promise((r) => this.later.push({ at: this.t + secs, fn: r }));
  }

  // ------------------------------------------------------------- stage

  private buildStage(mood: Mood): void {
    const th = this.theme;
    this.scene.add(th.ground(mood));
    const crackTex = crackTexture();
    for (let col = 0; col < COLS; col++) {
      this.panels[col] = [];
      for (let row = 0; row < ROWS; row++) {
        const side: Side = sideOf({ col, row });
        const mat = new THREE.MeshStandardMaterial({ map: th.paintPanel(side, 300 + col * 7 + row * 31, mood.night), emissive: '#000000', emissiveIntensity: 0, roughness: th.roughness, metalness: th.metalness });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(PW - 0.08, th.panelH, PD - 0.08), mat);
        const at = cellPos({ col, row });
        mesh.position.copy(at).setY(th.panelH / 2);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        const overlay = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.1, PD - 0.1), new THREE.MeshBasicMaterial({ color: '#000', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
        overlay.rotation.x = -Math.PI / 2;
        overlay.position.copy(at).setY(th.panelH + 0.012);
        this.scene.add(overlay);
        const crack = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.12, PD - 0.12), new THREE.MeshBasicMaterial({ map: crackTex, transparent: true, depthWrite: false }));
        crack.rotation.x = -Math.PI / 2;
        crack.position.copy(at).setY(th.panelH + 0.014);
        crack.visible = false;
        this.scene.add(crack);
        const hole = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.1, PD - 0.1), new THREE.MeshBasicMaterial({ color: '#050403' }));
        hole.rotation.x = -Math.PI / 2;
        hole.position.copy(at).setY(0.004);
        hole.visible = false;
        this.scene.add(hole);
        this.panels[col]![row] = { state: 'normal', until: 0, mesh, mat, overlay, crack, hole };
      }
    }
    th.dress(this.scene, mood, (col, row) => cellPos({ col, row }), PW, PD);
  }

  private panel(c: Cell): Panel { return this.panels[c.col]![c.row]!; }
  private setPanel(c: Cell, state: PanelState): void {
    const p = this.panels[c.col]?.[c.row];
    if (!p || p.state === 'broken') return;
    p.state = state;
    p.until = this.round + PANEL_ROUNDS[state];
  }

  // ------------------------------------------------------------- HUD

  private buildPlates(): void {
    for (const f of this.fighters) {
      const host = this.hud.querySelector(f.side === 'player' ? '.sq-mine' : '.sq-theirs') as HTMLDivElement;
      const root = document.createElement('div');
      root.className = 'bt-plate sq-plate';
      root.innerHTML = `<b></b><i></i><em></em><div class="bt-bar"><div></div></div><span></span><div class="sq-sp"><div></div></div>`;
      (root.querySelector('b') as HTMLElement).textContent = `${f.side === 'foe' && this.wild ? 'Wild ' : ''}${f.b.name}`;
      (root.querySelector('i') as HTMLElement).textContent = `Lv${f.b.level}`;
      if (f.side === 'foe') root.addEventListener('pointerdown', (e) => { e.preventDefault(); if (!f.down) this.setAim(f); });
      host.appendChild(root);
      f.plate = { root, fill: root.querySelector('.bt-bar div') as HTMLDivElement, text: root.querySelector('span') as HTMLSpanElement, sp: root.querySelector('.sq-sp div') as HTMLDivElement, tags: root.querySelector('em') as HTMLSpanElement };
    }
    this.updatePlates();
  }

  /** Chips for the Ohm whose turn it is (yours); dimmed while foes move. */
  private buildChips(f: Fighter): void {
    this.chipsEl.innerHTML = '';
    this.chips = [];
    const tag: Record<MoveOrigin, string> = { shared: 'Shared', own: 'Own', taught: 'Mod chip' };
    f.b.moves.forEach((slot, i) => {
      const m = this.data.move(slot.id);
      const origin = moveOrigin(f.b.speciesNum, m.id, this.data, SPECIES);
      const b = document.createElement('button');
      b.className = `bt-chip sq-${origin}`;
      b.style.setProperty('--tc', TYPE_COLOR[m.type]);
      b.innerHTML = `<kbd>${['J', 'K', 'L', ';'][i]}</kbd><b>${m.name}</b><small>${tag[origin]} · ${patternLabel(patternOf(m))}</small><span class="sq-cd"></span>`;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); this.choose({ kind: 'move', slot: i }); });
      this.chipsEl.appendChild(b);
      this.chips.push(b);
    });
    const sp = document.createElement('button');
    sp.className = 'bt-chip sq-special';
    sp.style.setProperty('--tc', '#ffd27a');
    sp.innerHTML = `<kbd>Space</kbd><b>${f.special.name}</b><small>Special · ${f.special.desc}</small><span class="sq-cd"></span>`;
    sp.addEventListener('pointerdown', (e) => { e.preventDefault(); this.choose({ kind: 'special' }); });
    this.chipsEl.appendChild(sp);
    this.spChip = sp;
    const wt = document.createElement('button');
    wt.className = 'bt-chip sq-swap';
    wt.style.setProperty('--tc', '#c9b8e8');
    wt.innerHTML = '<kbd>E</kbd><b>Wait</b><small>End this turn</small>';
    wt.addEventListener('pointerdown', (e) => { e.preventDefault(); this.wait(); });
    this.chipsEl.appendChild(wt);
    this.capChip = null;
    if (this.wild) {
      const cap = document.createElement('button');
      cap.className = 'bt-chip bt-cap';
      cap.style.setProperty('--tc', '#7fe0c8');
      cap.innerHTML = `<kbd>C</kbd><b>Capture</b><small>Node ×<span class="n">${this.nodes()}</span> · last one standing</small>`;
      cap.addEventListener('pointerdown', (e) => { e.preventDefault(); void this.capture(); });
      this.chipsEl.appendChild(cap);
      this.capChip = cap;
    }
    this.refreshChips();
  }

  private refreshChips(): void {
    const f = this.active;
    const mine = !!f && f.side === 'player' && this.phase === 'input';
    this.chipsEl.classList.toggle('sq-wait', !mine);
    if (!f || f.side !== 'player') return;
    this.chips.forEach((b, i) => {
      const left = Math.max(0, (f.ready[i] ?? 0) - f.turns);
      (b.querySelector('.sq-cd') as HTMLElement).textContent = left ? `${left}` : '';
      b.classList.toggle('sq-off', left > 0);
      b.classList.toggle('sq-picked', this.pick?.kind === 'move' && this.pick.slot === i);
    });
    if (this.spChip) {
      const left = Math.max(0, f.spReady - f.turns);
      (this.spChip.querySelector('.sq-cd') as HTMLElement).textContent = left ? `${left}` : '';
      this.spChip.classList.toggle('sq-off', left > 0);
      this.spChip.classList.toggle('sq-picked', this.pick?.kind === 'special');
    }
    if (this.capChip) this.capChip.classList.toggle('sq-off', this.alive('foe').length > 1 || this.nodes() <= 0);
  }

  private updatePlates(): void {
    for (const f of this.fighters) {
      if (!f.plate) continue;
      const k = f.b.integrity / f.b.stats.integrity;
      f.plate.fill.style.width = `${Math.max(0, k * 100)}%`;
      f.plate.fill.style.background = k > 0.5 ? '#7dff9a' : k > 0.2 ? '#ffd04a' : '#ff5a4a';
      f.plate.text.textContent = f.down ? 'Out of charge' : `${f.b.integrity} / ${f.b.stats.integrity}`;
      const need = specialTurns(f.special);
      f.plate.sp.style.width = `${Math.min(1, 1 - Math.max(0, f.spReady - f.turns) / need) * 100}%`;
      f.plate.root.classList.toggle('sq-ctrl', f === this.active);
      f.plate.root.classList.toggle('sq-down', f.down);
      f.plate.root.classList.toggle('sq-aimed', f === this.aim && this.active?.side === 'player');
      const tags = [f.stunned ? 'STUNNED' : '', f.markedUntil >= this.round ? 'MARKED' : '', f.blindUntil >= this.round ? 'BLINDED' : '', f.tauntUntil >= this.round ? 'TAUNTING' : '', f.b.status ?? '', f.b.glitchedTurns > 0 ? 'GLITCHED' : '', f.wind ? 'WINDING UP' : ''].filter(Boolean);
      f.plate.tags.textContent = tags.join(' · ');
    }
  }

  /** The turn order for this round, the one acting lit. */
  private updateOrder(): void {
    this.orderEl.innerHTML = '';
    const lbl = document.createElement('small');
    lbl.textContent = `Round ${this.round}`;
    this.orderEl.appendChild(lbl);
    const at = this.active ? this.order.indexOf(this.active) : -1;
    this.order.forEach((f, i) => {
      if (f.down) return;
      const s = document.createElement('span');
      s.className = `sq-turn ${f.side === 'player' ? 'mine' : 'theirs'}${f === this.active ? ' now' : ''}${i < at ? ' done' : ''}`;
      s.textContent = f.b.name;
      this.orderEl.appendChild(s);
    });
  }

  // ------------------------------------------------------------- the round

  private alive(side: Side): Fighter[] { return this.fighters.filter((f) => f.side === side && !f.down); }
  private enemiesOf(f: Fighter): Fighter[] { return this.alive(f.side === 'player' ? 'foe' : 'player'); }
  private fighterAt(c: Cell): Fighter | undefined { return this.fighters.find((f) => !f.down && same(f.cell, c)); }

  private async run(): Promise<void> {
    await this.wait_(1.4);
    while (!this.over) {
      this.round += 1;
      this.order = turnOrder(this.fighters.filter((f) => !f.down));
      for (const f of this.order) {
        if (this.over) return;
        if (f.down) continue;
        await this.turn(f);
      }
      if (this.over) return;
      // the round ends: changed ground and barriers wear off
      for (const col of this.panels) for (const p of col) if (p.state !== 'normal' && this.round >= p.until) p.state = 'normal';
      for (const b of this.barriers.filter((x) => this.round >= x.until)) this.breakBarrier(b, true);
    }
  }

  private async turn(f: Fighter): Promise<void> {
    f.turns += 1;
    this.active = f;
    this.phase = 'busy';
    this.pick = null;
    if (f.side === 'player') { this.aim = this.defaultAim(f) ?? null; this.buildChips(f); } else this.refreshChips();
    this.updateOrder();
    this.updatePlates();
    // a wind-up from last turn lands first
    if (f.wind) {
      const w = f.wind;
      f.wind = null;
      await this.strike(f, w.move, w.aim);
      if (this.over || f.down) return this.afterTurn(f);
    }
    // what the ground does to it
    const st = this.panel(f.cell).state;
    if (st === 'scorched') { this.hurt(f, Math.max(1, Math.floor(f.b.stats.integrity / 8)), '#ff8a4a'); this.say(`${f.b.name} is burned by the ground!`, 1.0); await this.wait_(0.5); }
    if (st === 'grown' && sideOf(f.cell) === f.side && f.b.integrity < f.b.stats.integrity) { this.heal(f, Math.max(1, Math.floor(f.b.stats.integrity / 8))); await this.wait_(0.4); }
    if (this.over || f.down) return this.afterTurn(f);
    if (f.stunned) {
      f.stunned = false;
      this.say(`${f.b.name} is stunned and loses its turn!`, 1.1);
      await this.wait_(0.9);
      return this.afterTurn(f);
    }
    const gate = statusGate(f.b, this.rng);
    if (gate.text) { this.say(gate.text, 1.2); await this.wait_(0.7); }
    if (gate.selfHit) this.hurt(f, gate.selfHit, '#ffffff');
    if (!gate.acts || this.over || f.down) { await this.wait_(0.4); return this.afterTurn(f); }

    this.stepsLeft = st === 'iced' ? 1 : STEPS;
    if (st === 'charged') { this.stepsLeft = 1; this.float(f, 'JOLTED', '#ffe85a'); }
    if (f.side === 'player') {
      this.phase = 'input';
      this.refreshChips();
      this.say(`${f.b.name}'s turn`, 0.9);
      await new Promise<void>((r) => { this.endTurn = r; });
      this.endTurn = null;
    } else {
      await this.think(f);
    }
    await this.afterTurn(f);
  }

  private async afterTurn(f: Fighter): Promise<void> {
    this.phase = 'busy';
    this.pick = null;
    if (!this.over && !f.down) {
      const chip = statusChip(f.b);
      if (chip) { this.hurt(f, chip, '#ff8a4a'); this.say(`${f.b.name} is hurt by ${f.b.status}!`, 1.0); await this.wait_(0.6); }
    }
    this.updatePlates();
    this.refreshChips();
    await this.wait_(0.25);
  }

  // ------------------------------------------------------------- your turn

  private mine(): Fighter | null {
    const f = this.active;
    return f && f.side === 'player' && this.phase === 'input' && !this.over && !this.capturing ? f : null;
  }

  private standable(f: Fighter, c: Cell): boolean {
    if (!canStand(f.side, c)) return false;
    if (this.panel(c).state === 'broken') return false;
    const o = this.fighterAt(c);
    return !o || o === f;
  }

  /** Panels f can reach with `steps` left: ice and live panels stop you where you land. */
  private reach(f: Fighter, steps: number): Map<string, Cell[]> {
    const out = new Map<string, Cell[]>([[key(f.cell), []]]);
    let frontier: Array<{ c: Cell; path: Cell[] }> = [{ c: f.cell, path: [] }];
    for (let s = 0; s < steps; s++) {
      const next: typeof frontier = [];
      for (const { c, path } of frontier) {
        if (path.length && ['iced', 'charged'].includes(this.panel(c).state)) continue;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
          const n = { col: c.col + dx, row: c.row + dz };
          if (out.has(key(n)) || !this.standable(f, n)) continue;
          const p = [...path, n];
          out.set(key(n), p);
          next.push({ c: n, path: p });
        }
      }
      frontier = next;
    }
    return out;
  }

  /** One step; breaks cracked ground behind you; ice and live panels end your movement. */
  private stepTo(f: Fighter, c: Cell): void {
    const left = this.panel(f.cell);
    if (left.state === 'cracked') { left.state = 'broken'; left.until = this.round + PANEL_ROUNDS.broken; }
    f.hero?.face(c.col - f.cell.col || (f.side === 'player' ? 1 : -1), c.row - f.cell.row || 0.8);
    f.cell = c;
    const now = this.panel(c).state;
    if (now === 'iced' || now === 'charged') { this.stepsLeft = 0; this.float(f, now === 'iced' ? 'SLIDES' : 'JOLTED', now === 'iced' ? '#9fdcff' : '#ffe85a'); }
  }

  private async stepActive(dx: number, dz: number): Promise<void> {
    const f = this.mine();
    if (!f || this.stepsLeft <= 0) return;
    const c = { col: f.cell.col + dx, row: f.cell.row + dz };
    if (!this.standable(f, c)) return;
    this.stepsLeft -= 1;
    this.stepTo(f, c);
    if (this.pick?.kind === 'move' || !this.pick) this.aim = this.aim && !this.aim.down ? this.aim : this.defaultAim(f) ?? null;
    this.refreshChips();
  }

  private async tapPanel(c: Cell): Promise<void> {
    const f = this.mine();
    if (!f) return;
    const there = this.fighterAt(c);
    // a foe's panel: aim there (tap again to fire what's picked)
    if (there && there.side !== f.side) {
      if (this.pick && this.aim === there) { this.choose(this.pick); return; }
      this.setAim(there);
      return;
    }
    // a panel your picked move covers: fire
    if (this.pick && this.previewCells().some((x) => same(x, c))) { this.choose(this.pick); return; }
    // a panel you can reach: walk there
    const path = this.reach(f, this.stepsLeft).get(key(c));
    if (!path || !path.length) return;
    this.phase = 'busy';
    for (const step of path) {
      if (this.stepsLeft <= 0) break;
      this.stepsLeft -= 1;
      this.stepTo(f, step);
      await this.wait_(0.14);
    }
    this.phase = 'input';
    this.refreshChips();
  }

  private defaultAim(f: Fighter): Fighter | undefined {
    const foes = this.enemiesOf(f);
    return foes.slice().sort((a, b) => (Math.abs(a.cell.row - f.cell.row) * 10 + Math.abs(a.cell.col - f.cell.col)) - (Math.abs(b.cell.row - f.cell.row) * 10 + Math.abs(b.cell.col - f.cell.col)))[0];
  }

  private setAim(t: Fighter): void {
    if (!this.mine()) return;
    this.aim = t;
    this.updatePlates();
  }

  private cycleAim(): void {
    const f = this.mine();
    if (!f) return;
    const foes = this.enemiesOf(f);
    if (!foes.length) return;
    this.setAim(foes[(foes.indexOf(this.aim!) + 1) % foes.length]!);
  }

  /** First press picks (and previews); the same press again uses it. */
  private choose(p: Pick): void {
    const f = this.mine();
    if (!f) return;
    if (p.kind === 'move') {
      const slot = f.b.moves[p.slot];
      if (!slot) return;
      if ((f.ready[p.slot] ?? 0) > f.turns) { this.say(`${this.data.move(slot.id).name} is still recharging.`, 0.9); return; }
    } else if (f.spReady > f.turns) { this.say(`${f.special.name} is still charging.`, 0.9); return; }
    const again = this.pick && this.pick.kind === p.kind && (p.kind === 'special' || (this.pick.kind === 'move' && this.pick.slot === p.slot));
    if (!again) {
      this.pick = p;
      this.refreshChips();
      if (!this.previewCells().length) this.say(p.kind === 'move' && patternOf(this.data.move(f.b.moves[p.slot]!.id)) === 'melee' ? 'Too far: step up to your front column first.' : 'Nothing in reach from here.', 1.3);
      return;
    }
    void this.act(f, p);
  }

  private cancel(): void {
    this.pick = null;
    this.refreshChips();
  }

  private wait(): void {
    const f = this.mine();
    if (!f) return;
    this.say(`${f.b.name} holds its ground.`, 0.8);
    this.endTurn?.();
  }

  private async act(f: Fighter, p: Pick): Promise<void> {
    this.phase = 'busy';
    this.pick = null;
    this.refreshChips();
    if (p.kind === 'special') {
      f.spReady = f.turns + specialTurns(f.special) + 1;
      await this.special(f, this.aim && !this.aim.down ? this.aim : this.defaultAim(f));
    } else {
      const m = this.data.move(f.b.moves[p.slot]!.id);
      f.ready[p.slot] = f.turns + cooldownTurns(m) + 1;
      const t = this.aim && !this.aim.down ? this.aim : this.defaultAim(f);
      this.say(`${f.b.name} used ${m.name}!`, 1.0);
      await this.strike(f, m, t ? { ...t.cell } : undefined);
    }
    this.endTurn?.();
  }

  /** What the picked move would hit from here (shown on the field). */
  private previewCells(): Cell[] {
    const f = this.active;
    if (!f || !this.pick) return [];
    if (this.pick.kind === 'special') return this.specialCells(f, this.aim ?? this.defaultAim(f));
    const m = this.data.move(f.b.moves[this.pick.slot]!.id);
    const p = patternOf(m);
    if (p === 'self') return [f.cell];
    return coverage(p, f.cell, f.side, (c) => this.blocks(f.side, c), AIMED.has(p) && this.aim ? this.aim.cell : undefined);
  }

  /** IFF Recalibration: only on the last wild Ohm standing; spends your turn. */
  private async capture(): Promise<void> {
    const f = this.mine();
    if (!f || !this.wild) return;
    const left = this.alive('foe');
    if (left.length !== 1) { this.say('Thin the pack first: you can only free the last one standing.', 1.6); return; }
    if (this.nodes() <= 0) { this.say('No storage nodes left.', 1.2); return; }
    this.phase = 'busy';
    this.spendNode();
    this.capturing = true;
    const target = left[0]!;
    const fb = target.b;
    const budget = puzzleBudget(this.data.species(fb.speciesNum), fb.stats.integrity, fb.integrity, fb.status);
    this.say('Node deployed. Clearing the static…', 1.2);
    const ok = await runCapturePuzzle(this.hud, this.rng, { size: budget.gridSize, seconds: budget.timerSeconds, name: fb.name });
    this.capturing = false;
    if (ok) { this.finish({ outcome: 'captured', foe: fb }, `${fb.name} is Freed! The static clears.`); this.endTurn?.(); return; }
    fb.rage += 1;
    fb.stages.output = Math.min(6, fb.stages.output + 1);
    this.float(target, 'OUTPUT ▲', '#ff8a7a');
    if (fb.rage >= 3 || this.rng.chance(fb.rage * 35)) { this.finish({ outcome: 'foeFled' }, `${fb.name} tore away into the ruins!`); this.endTurn?.(); return; }
    this.say(`${fb.name} rages against the hack!`, 1.4);
    await this.wait_(0.8);
    this.endTurn?.();
  }

  private flee(): void {
    if (!this.mine()) return;
    if (!this.wild) { this.say("There's no running from this one.", 1.2); return; }
    this.finish({ outcome: 'fled' }, 'Got away safely.');
    this.endTurn?.();
  }

  // ------------------------------------------------------------- a foe's turn

  private async think(f: Fighter): Promise<void> {
    const foes = this.enemiesOf(f);
    if (!foes.length) return;
    const taunt = foes.find((x) => x.tauntUntil >= this.round);
    const target = taunt ?? foes[this.rng.int(0, foes.length - 1)]!;
    // the special, now and then
    if (f.spReady <= f.turns && this.rng.chance(40)) {
      await this.walk(f, (c) => -Math.abs(c.row - target.cell.row) + this.groundScore(f, c));
      f.spReady = f.turns + specialTurns(f.special) + 1;
      await this.special(f, target);
      return;
    }
    const usable = f.b.moves.map((s, i) => ({ m: this.data.move(s.id), i })).filter(({ m, i }) => (f.ready[i] ?? 0) <= f.turns && (patternOf(m) !== 'self' || this.rng.chance(15)));
    const pick = usable.length ? usable[this.rng.int(0, usable.length - 1)]! : null;
    if (!pick) { await this.wait_(0.4); return; }
    const p = patternOf(pick.m);
    // step to where the move would catch the target as it stands now
    await this.walk(f, (c) => {
      const hits = p === 'self' ? false : coverage(p, c, f.side, () => false, AIMED.has(p) ? target.cell : undefined).some((x) => same(x, target.cell));
      return (hits ? 6 : -Math.abs(c.row - target.cell.row)) + this.groundScore(f, c);
    });
    f.ready[pick.i] = f.turns + cooldownTurns(pick.m) + 1;
    if (p === 'self') {
      this.say(`${f.b.name} used ${pick.m.name}!`, 1.0);
      await this.strike(f, pick.m);
      return;
    }
    // wind up in plain sight: it lands at the start of its next turn
    f.wind = { move: pick.m, aim: { ...target.cell } };
    this.say(`${f.b.name} winds up ${pick.m.name}!`, 1.1);
    this.updatePlates();
    await this.wait_(0.8);
  }

  private groundScore(f: Fighter, c: Cell): number {
    const st = this.panel(c).state;
    return (st === 'scorched' ? -4 : 0) + (st === 'charged' ? -2 : 0) + (st === 'cracked' ? -1 : 0) + (st === 'grown' && sideOf(c) === f.side ? 1.5 : 0) + this.rng.next() * 0.8;
  }

  /** Foe movement: the reachable panel that scores best, walked one panel at a time. */
  private async walk(f: Fighter, score: (c: Cell) => number): Promise<void> {
    const reach = this.reach(f, this.stepsLeft);
    let best: Cell[] = [], bestS = score(f.cell) + 0.5; // a small bias to stay put
    for (const path of reach.values()) {
      if (!path.length) continue;
      const s = score(path[path.length - 1]!) - path.length * 0.15;
      if (s > bestS) { bestS = s; best = path; }
    }
    for (const step of best) {
      if (this.stepsLeft <= 0) break;
      this.stepsLeft -= 1;
      this.stepTo(f, step);
      await this.wait_(0.16);
    }
    if (best.length) await this.wait_(0.2);
  }

  // ------------------------------------------------------------- combat

  private blocks(attacker: Side, c: Cell): boolean {
    const f = this.fighterAt(c);
    return (!!f && f.side !== attacker) || !!this.barrierAt(c, attacker === 'player' ? 'foe' : 'player');
  }
  private barrierAt(c: Cell, side: Side): Barrier | undefined { return this.barriers.find((b) => b.side === side && same(b.cell, c)); }

  /** A move lands: plays out, then hits whoever stands in its panels. */
  private async strike(user: Fighter, m: MoveDef, aim?: Cell): Promise<void> {
    const p = patternOf(m);
    if (p === 'self') {
      this.applyEffect(user, user, m, true);
      this.burst(cellPos(user.cell), TYPE_COLOR[m.type], 0.5);
      await this.wait_(0.6);
      return;
    }
    if (user.side === 'foe') this.say(`${user.b.name} used ${m.name}!`, 0.9);
    let cells = coverage(p, user.cell, user.side, (c) => this.blocks(user.side, c), AIMED.has(p) ? aim : undefined);
    if (LANE.has(p)) {
      // a barrier on their side stops a lane cold
      const i = cells.findIndex((c) => this.barrierAt(c, user.side === 'player' ? 'foe' : 'player'));
      if (i >= 0) cells = cells.slice(0, i + 1);
    }
    const travel = p === 'shot' || p === 'row' ? 0.2 : AIMED.has(p) ? 0.45 : p === 'dash' ? 0.18 : 0.1;
    this.playPattern(user, p, cells, travel, TYPE_COLOR[m.type]);
    await this.wait_(travel);
    for (const c of cells) this.flashPanel(c, TYPE_COLOR[m.type]);
    for (const c of cells) {
      const br = this.barrierAt(c, user.side === 'player' ? 'foe' : 'player');
      if (br && LANE.has(p)) { this.breakBarrier(br); await this.wait_(0.5); return; }
    }
    const victims = this.fighters.filter((f) => !f.down && f.side !== user.side && cells.some((c) => same(c, f.cell)));
    if (!victims.length) this.say(`${m.name} hits nothing.`, 0.8);
    for (const target of victims) {
      if (user.blindUntil >= this.round && this.rng.chance(50)) { this.float(target, 'WIDE', '#c8c8c8'); continue; }
      if (!landsRoll(m, this.rng)) { this.float(target, 'MISS', '#c8c8c8'); continue; }
      if (m.power > 0) this.damage(user, target, m);
      if (!target.down) this.applyEffect(user, target, m, false);
    }
    await this.wait_(0.55);
  }

  private damage(from: Fighter, target: Fighter, move: MoveDef): void {
    const r = hitDamage(from.b, target.b, move, this.data, this.rng, target.markedUntil >= this.round);
    this.float(target, `${r.amount}${r.crit ? '!' : ''}`, r.effectiveness > 1 ? '#ffd04a' : '#ffffff');
    if (r.effectiveness > 1) this.say("It's super effective!", 0.8);
    else if (r.effectiveness < 1 && r.effectiveness > 0) this.say("It's not very effective…", 0.8);
    this.hurt(target, r.amount, null);
  }

  private hurt(f: Fighter, amount: number, color: string | null): void {
    f.b.integrity = Math.max(0, f.b.integrity - amount);
    if (color) this.float(f, `${amount}`, color);
    f.blink = 0.45;
    this.shake = 0.16;
    if (f.b.integrity <= 0) this.knockOut(f);
    this.updatePlates();
  }

  private heal(f: Fighter, amount: number): void {
    f.b.integrity = Math.min(f.b.stats.integrity, f.b.integrity + amount);
    this.float(f, `+${amount}`, '#7dff9a');
    this.updatePlates();
  }

  private knockOut(f: Fighter): void {
    if (f.down) return;
    f.down = true;
    f.wind = null;
    if (this.aim === f) this.aim = null;
    this.say(f.side === 'foe' ? `${this.wild ? 'Wild ' : ''}${f.b.name} powered down!` : `${f.b.name} is out of charge…`, 1.4);
    if (!this.alive('foe').length) { this.finish({ outcome: 'victory' }, this.fighters.filter((x) => x.side === 'foe').length > 1 ? 'The pack is down!' : `${f.b.name} powered down!`); return; }
    if (!this.alive('player').length) { this.finish({ outcome: 'defeat' }, 'Your Ohms are out of charge…'); return; }
    this.updateOrder();
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
    } else if (e.kind === 'status' && !selfOnly && this.rng.chance(e.chance)) {
      if (inflict(target.b, e.status, this.data, this.rng)) this.float(target, e.status, '#ffb347');
    } else if (e.kind === 'heal' && selfOnly) {
      this.heal(user, Math.floor(user.b.stats.integrity * e.fraction));
    }
    this.updatePlates();
  }

  // ------------------------------------------------------------- specials

  /** The panels a special touches, for the preview. */
  private specialCells(f: Fighter, target?: Fighter): Cell[] {
    const s = f.special, tc = target?.cell;
    const enemySide: Side = f.side === 'player' ? 'foe' : 'player';
    const col = (c: number): Cell[] => Array.from({ length: ROWS }, (_, row) => ({ col: c, row }));
    const rowOf = (r: number): Cell[] => Array.from({ length: HALF }, (_, k) => ({ col: enemySide === 'foe' ? HALF + k : k, row: r }));
    const plus = (c: Cell, side: Side): Cell[] => [c, { col: c.col + 1, row: c.row }, { col: c.col - 1, row: c.row }, { col: c.col, row: c.row + 1 }, { col: c.col, row: c.row - 1 }].filter((x) => canStand(side, x));
    switch (s.kind) {
      case 'scorch': return tc ? col(tc.col).filter((x) => Math.abs(x.row - tc.row) <= 1) : [];
      case 'frost': return tc ? rowOf(tc.row) : [];
      case 'livewire': return tc ? plus(tc, enemySide) : [];
      case 'faultline': case 'flare': case 'shockwave': return tc ? col(tc.col) : [];
      case 'overgrowth': return plus(f.cell, f.side);
      case 'bulwark': return [{ col: frontCol(f.side), row: f.cell.row }];
      case 'lockon': return tc ? [tc] : [];
      case 'ram': case 'gust': return rowOf(f.cell.row);
    }
  }

  /** Each Ohm's special changes the field (rules.ts: specialOf). */
  private async special(f: Fighter, target?: Fighter): Promise<void> {
    const s = f.special;
    const fwd = f.side === 'player' ? 1 : -1;
    const cells = this.specialCells(f, target);
    const inCells = (v: Fighter): boolean => cells.some((c) => same(c, v.cell));
    this.say(`${f.b.name}: ${s.name}!`, 1.2);
    this.burst(cellPos(f.cell), '#ffd27a', 0.6);
    await this.wait_(0.3);
    switch (s.kind) {
      case 'scorch': for (const c of cells) this.setPanel(c, 'scorched'); break;
      case 'frost': for (const c of cells) this.setPanel(c, 'iced'); break;
      case 'livewire':
        for (const c of cells) this.setPanel(c, 'charged');
        for (const v of this.enemiesOf(f).filter(inCells)) { v.stunned = true; this.float(v, 'SHORTED', '#ffe85a'); }
        break;
      case 'faultline': for (const c of cells) this.setPanel(c, 'cracked'); break;
      case 'overgrowth': for (const c of cells) this.setPanel(c, 'grown'); break;
      case 'bulwark':
        this.raiseBarrier(cells[0]!, f.side);
        if (f.b.speciesNum === 7) { f.tauntUntil = this.round + 1; this.float(f, 'TAUNT', '#ffd27a'); } // Guard Dog draws their fire
        break;
      case 'lockon': if (target) { target.markedUntil = this.round + 2; this.float(target, 'MARKED', '#6ff0c8'); } break;
      case 'flare':
        for (const v of this.enemiesOf(f).filter(inCells)) { v.blindUntil = this.round + 1; this.float(v, 'BLINDED', '#f6f0b0'); }
        for (const c of cells) this.flashPanel(c, '#f6f0b0');
        break;
      case 'shockwave':
        for (const v of this.enemiesOf(f).filter(inCells)) { v.stunned = true; v.wind = null; this.float(v, 'STUNNED', '#c78cff'); }
        for (const c of cells) this.flashPanel(c, '#c78cff');
        break;
      case 'ram':
      case 'gust': {
        // ram: charge the row, hit the first one and knock it back; gust: blow the whole row back
        const victims = this.enemiesOf(f).filter((v) => v.cell.row === f.cell.row).sort((a, b) => (a.cell.col - b.cell.col) * fwd);
        const hit = s.kind === 'ram' ? victims.slice(0, 1) : victims.slice().reverse();
        if (s.kind === 'ram') f.lunge = 0.4;
        await this.wait_(0.2);
        for (const v of hit) {
          if (s.kind === 'ram') this.damage(f, v, { id: 'ram', name: s.name, type: this.data.species(f.b.speciesNum).type, power: 50, accuracy: 0, pp: 1, priority: 0 });
          const back = { col: v.cell.col + fwd, row: v.cell.row };
          if (!v.down && this.standable(v, back)) { v.cell = back; this.float(v, 'PUSHED', '#d8d8d8'); }
          if (v.wind) { v.wind = null; this.float(v, 'WIND-UP LOST', '#d8d8d8'); }
        }
        for (const c of cells) this.flashPanel(c, s.kind === 'ram' ? TYPE_COLOR.MOTOR : '#d8d8d8');
        break;
      }
    }
    this.updatePlates();
    await this.wait_(0.6);
  }

  private raiseBarrier(cell: Cell, side: Side): void {
    const old = this.barrierAt(cell, side);
    if (old) this.breakBarrier(old, true);
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: '#b9b2a4', emissive: '#ffd27a', emissiveIntensity: 0.25, transparent: true, opacity: 0.85, metalness: 0.4, roughness: 0.5 });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.9, PD - 0.16), mat);
    wall.position.y = 0.45;
    wall.castShadow = true;
    g.add(wall);
    g.position.copy(cellPos(cell)).add(new THREE.Vector3((side === 'player' ? 1 : -1) * PW * 0.42, 0, 0));
    this.scene.add(g);
    this.barriers.push({ cell, side, until: this.round + 2, mesh: g });
  }

  private breakBarrier(b: Barrier, quiet = false): void {
    this.scene.remove(b.mesh);
    this.barriers = this.barriers.filter((x) => x !== b);
    if (!quiet) { this.burst(b.mesh.position.clone(), '#ffd27a', 0.4); this.say('The barrier takes the hit!', 0.8); }
  }

  // ------------------------------------------------------------- effects

  private playPattern(user: Fighter, p: Pattern, cells: Cell[], travel: number, color: string): void {
    const from = cellPos(user.cell).setY(0.6);
    const last = cells[cells.length - 1] ?? user.cell;
    const to = cellPos(last).setY(0.6);
    if (p === 'dash' || p === 'melee') { user.lunge = travel + 0.22; this.burstAt(cells, color, travel); return; }
    const orb = new THREE.Mesh(new THREE.SphereGeometry(AIMED.has(p) ? 0.18 : 0.12, 10, 8), new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending }));
    this.scene.add(orb);
    const arc = AIMED.has(p) ? 1.8 : 0;
    this.fx.push({ obj: orb, life: travel, max: travel, update: (k) => {
      orb.position.lerpVectors(from, to, 1 - k);
      orb.position.y = 0.6 + Math.sin((1 - k) * Math.PI) * arc;
    } });
    this.burstAt(cells, color, travel);
  }

  /** Impacts are scheduled on the battle clock (not wall time) so they stay in step with damage. */
  private burstAt(cells: Cell[], color: string, delay: number): void {
    this.later.push({ at: this.t + delay, fn: () => { for (const c of cells) this.burst(cellPos(c), color, 0.38); } });
  }

  private burst(at: THREE.Vector3, color: string, life: number): void {
    const tint = new THREE.Color(color).multiplyScalar(0.75);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.31, 24), new THREE.MeshBasicMaterial({ color: tint, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(at).setY(0.18);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 1.0, 10, 1, true), new THREE.MeshBasicMaterial({ color: tint, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    col.position.copy(at).setY(0.66);
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
    const p = this.panels[c.col]?.[c.row];
    if (!p) return;
    p.mat.emissive.set(color);
    p.mat.emissiveIntensity = 0.9;
  }

  private float(f: Fighter, text: string, color: string): void {
    const el = document.createElement('div');
    el.className = 'bt-float';
    el.textContent = text;
    el.style.color = color;
    this.hud.appendChild(el);
    const p = f.root.position.clone().setY(1.4).project(this.camera);
    el.style.left = `${((p.x + 1) / 2) * window.innerWidth}px`;
    el.style.top = `${((1 - p.y) / 2) * window.innerHeight}px`;
    setTimeout(() => el.remove(), 900);
  }

  private say(text: string, secs: number): void {
    if (this.over) return;
    this.banner.textContent = text;
    this.banner.classList.add('on');
    clearTimeout((this.banner as unknown as { _t?: number })._t);
    (this.banner as unknown as { _t?: number })._t = window.setTimeout(() => this.banner.classList.remove('on'), secs * 1000);
  }

  private finish(r: BattleResult, text: string): void {
    if (this.over) return;
    this.say(text, 99);
    this.over = r;
    this.phase = 'busy';
    for (const f of this.fighters) f.wind = null;
    this.banner.classList.add('end');
    this.chipsEl.classList.add('sq-wait');
    setTimeout(() => this.done(r), 2200);
  }

  // ------------------------------------------------------------- frame

  update(dt: number): void {
    if (!this.ready || this.capturing) return; // loading, or frozen while the node puzzle runs
    this.t += dt;
    // the touch stick steps the Ohm whose turn it is
    this.stepHold -= dt;
    const sx = Math.round(this.stick.x), sz = Math.round(this.stick.y);
    if ((sx || sz) && this.stepHold <= 0) { void this.stepActive(sx, sx ? 0 : sz); this.stepHold = 0.3; }
    if (!sx && !sz) this.stepHold = 0;
    for (const l of this.later.filter((x) => this.t >= x.at)) l.fn();
    this.later = this.later.filter((x) => this.t < x.at);

    // panels: foe wind-ups glow red; your reach glows faintly; a picked move shows where it lands
    const a = this.active;
    const yours = this.mine();
    const warn = new Set(this.fighters.filter((f) => f.side === 'foe' && f.wind && !f.down).flatMap((f) => {
      const p = patternOf(f.wind!.move);
      return coverage(p, f.cell, f.side, () => false, AIMED.has(p) ? f.wind!.aim : undefined).map(key);
    }));
    const reach = yours && !this.pick && this.stepsLeft > 0 ? new Set([...this.reach(yours, this.stepsLeft).keys()]) : new Set<string>();
    const preview = yours && this.pick ? new Set(this.previewCells().map(key)) : new Set<string>();
    const pickColor = yours && this.pick ? (this.pick.kind === 'special' ? '#ffd27a' : TYPE_COLOR[this.data.move(yours.b.moves[this.pick.slot]!.id).type]) : '#000';
    for (let col = 0; col < COLS; col++) for (let row = 0; row < ROWS; row++) {
      const p = this.panels[col]![row]!;
      const k = `${col},${row}`;
      p.mesh.visible = p.state !== 'broken';
      p.hole.visible = p.state === 'broken';
      p.crack.visible = p.state === 'cracked';
      const om = p.overlay.material as THREE.MeshBasicMaterial;
      const pulse = 0.5 + 0.5 * Math.sin(this.t * (p.state === 'charged' ? 22 : 5) + col + row);
      om.color.set(STATE_COLOR[p.state]);
      om.opacity = p.state === 'scorched' || p.state === 'charged' ? 0.12 + pulse * 0.12 : p.state === 'iced' || p.state === 'grown' ? 0.3 : 0;
      let glow = '#000000', amt = 0;
      if (preview.has(k)) { glow = pickColor; amt = 0.3 + Math.sin(this.t * 8) * 0.08; }
      else if (warn.has(k)) { glow = this.theme.warnGlow; amt = 0.3 + Math.sin(this.t * 10) * 0.14; }
      else if (a && !a.down && same(a.cell, { col, row })) { glow = this.theme.standGlow; amt = 0.12; }
      else if (reach.has(k)) { glow = this.theme.standGlow; amt = 0.06; }
      p.mat.emissive.lerp(new THREE.Color(glow), Math.min(1, dt * 8));
      p.mat.emissiveIntensity += (amt - p.mat.emissiveIntensity) * Math.min(1, dt * 8);
    }
    // fighters glide to their panels; lunges, stuns, hit blink
    for (const f of this.fighters) {
      const goal = cellPos(f.cell);
      if (f.lunge > 0) {
        f.lunge -= dt;
        const k = Math.sin(Math.min(1, Math.max(0, f.lunge / 0.38)) * Math.PI);
        goal.x += (f.side === 'player' ? 1 : -1) * k * 1.4;
      }
      f.root.position.lerp(goal, Math.min(1, dt * 14));
      f.blink = Math.max(0, f.blink - dt);
      f.root.visible = f.down || f.blink <= 0 || Math.floor(this.t * 20) % 2 === 0;
      if (f.down) { f.root.scale.y = Math.max(0.5, f.root.scale.y - dt * 1.2); f.root.position.y = 0; }
      else f.root.position.y = (f.stunned ? Math.sin(this.t * 40) * 0.03 : 0) + (f === a && !this.over ? Math.abs(Math.sin(this.t * 4)) * 0.06 : 0);
      f.hero?.animate(dt, false);
    }
    // gold ring under whoever is acting; red under your aim
    this.ctrlRing.visible = !!a && !a.down && !this.over;
    if (a) this.ctrlRing.position.copy(a.root.position).setY(0.09);
    (this.ctrlRing.material as THREE.MeshBasicMaterial).color.set(a?.side === 'foe' ? '#ff9a6a' : '#ffd27a');
    const aim = yours ? this.aim : null;
    this.aimRing.visible = !!aim && !aim.down && !this.over;
    if (aim) this.aimRing.position.copy(aim.root.position).setY(0.09);
    const k = 1 + Math.sin(this.t * 6) * 0.06;
    this.ctrlRing.scale.setScalar(k);
    this.aimRing.scale.setScalar(2 - k);
    this.sal?.animate(dt, false);
    for (const e of this.fx) { e.life -= dt; e.update(Math.max(0, e.life / e.max)); }
    for (const e of this.fx.filter((x) => x.life <= 0)) this.scene.remove(e.obj);
    this.fx = this.fx.filter((x) => x.life > 0);
    this.shake = Math.max(0, this.shake - dt);
    this.placeCamera(Math.sin(this.t * 60) * this.shake * 0.25, Math.cos(this.t * 53) * this.shake * 0.15);
  }
}

function patternLabel(p: Pattern): string {
  return { shot: 'Shot', dash: 'Dash', melee: 'Close', wide: 'Wave', row: 'Surge', lob: 'Lob', cross: 'Burst', self: 'Self' }[p];
}

let crackCache: THREE.CanvasTexture | null = null;
/** Hairline cracks across a panel (Fault Line). */
function crackTexture(): THREE.CanvasTexture {
  if (crackCache) return crackCache;
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d')!;
  g.strokeStyle = 'rgba(20,14,10,0.9)';
  g.lineWidth = 1.5;
  const lines = [[[16, 16], [3, 6], [1, 2]], [[16, 16], [28, 9], [31, 3]], [[16, 16], [12, 28], [14, 31]], [[16, 16], [27, 24]], [[16, 16], [6, 20]]];
  for (const l of lines) { g.beginPath(); l.forEach(([x, y], i) => (i ? g.lineTo(x!, y!) : g.moveTo(x!, y!))); g.stroke(); }
  crackCache = new THREE.CanvasTexture(c);
  crackCache.magFilter = THREE.NearestFilter;
  return crackCache;
}
