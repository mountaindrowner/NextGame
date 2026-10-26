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
  COLS, ROWS, HALF, canStand, coverage, cooldownOf, frontCol, hitDamage, landsRoll, moveOrigin, patternOf, specialOf, sideOf,
  type Cell, type MoveOrigin, type PanelState, type Pattern, type Side, type SpecialDef,
} from './rules';

/**
 * HD-2D squad battle — [PROPOSAL] rules in rules.ts. A 10×5 field: your 5×5
 * on the left, theirs on the right, up to three Ohms a side. You steer one
 * (swap any time); your others fight on their own. Moves fire with a pattern
 * and a recharge; each Ohm's special changes the field. Foes telegraph their
 * attacks so you can step out of the way. Numbers come from the Gen 3 core.
 */

export interface BattleResult { outcome: 'victory' | 'defeat' | 'fled' | 'captured' | 'foeFled'; foe?: Battler }

const TYPE_COLOR: Record<TypeName, string> = {
  VOLT: '#f2d64b', THERM: '#ff7a3c', COOLANT: '#5ec8f0', FRAME: '#b9b2a4', OPTIC: '#f6f0b0', SONIC: '#c78cff',
  SIGNAL: '#6ff0c8', MOTOR: '#ff5a5a', BREAKER: '#d9a24a', UTILITY: '#d8d8d8', VERDANT: '#7bd85a',
};
const STATE_COLOR: Record<PanelState, string> = { normal: '#000000', cracked: '#000000', broken: '#000000', scorched: '#ff5a1a', iced: '#9fdcff', charged: '#ffe85a', grown: '#6ad84a' };
const PW = 1.14, PD = 0.86; // panel size (world units)
const cellPos = (c: Cell): THREE.Vector3 => new THREE.Vector3((c.col - (COLS - 1) / 2) * PW, 0, (c.row - (ROWS - 1) / 2) * PD);
const same = (a: Cell, b: Cell): boolean => a.col === b.col && a.row === b.row;
/** Styled 8-direction Ohms (public/world/styles). */
const STYLED: Record<number, string> = { 1: 'scootlet', 4: 'dronelet', 7: 'scraplet' };
const LANE: ReadonlySet<Pattern> = new Set(['shot', 'dash', 'row']);

interface Wind { at: number; move: MoveDef; cells: Cell[]; target: Fighter }
interface Fighter {
  id: number;
  side: Side;
  b: Battler;
  special: SpecialDef;
  cell: Cell;
  root: THREE.Object3D;
  hero?: RotHero;
  iframes: number;
  lunge: number;
  down: boolean;
  cds: number[];
  sp: number; // special recharge left (s)
  stun: number;
  blind: number;
  marked: number;
  taunt: number;
  slowTick: number;
  moveAt: number;
  attackAt: number;
  wind: Wind | null;
  plate?: { root: HTMLDivElement; fill: HTMLDivElement; text: HTMLSpanElement; sp: HTMLDivElement; tags: HTMLSpanElement };
}
interface Panel { state: PanelState; until: number; mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; overlay: THREE.Mesh; crack: THREE.Mesh; hole: THREE.Mesh }
interface Barrier { cell: Cell; side: Side; until: number; mesh: THREE.Object3D }
interface Pending { at: number; cells: Cell[]; from: Fighter; move: MoveDef; target: Fighter }

export class BattleArena {
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  private readonly rng: Rng;
  private readonly panels: Panel[][] = [];
  private fighters: Fighter[] = [];
  private barriers: Barrier[] = [];
  private ctrl: Fighter | null = null;
  private sal: RotHero | null = null;
  private pending: Pending[] = [];
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
  private stepHold = 0;
  private shake = 0;
  private readonly hud: HTMLDivElement;
  private readonly chipsEl: HTMLDivElement;
  private chips: HTMLButtonElement[] = [];
  private spChip: HTMLButtonElement | null = null;
  private capChip: HTMLButtonElement | null = null;
  private readonly banner: HTMLDivElement;
  private readonly keys = new Set<string>();
  private readonly onKey: (e: KeyboardEvent) => void;
  private readonly onKeyUp: (e: KeyboardEvent) => void;
  private readonly ctrlRing: THREE.Mesh;
  private readonly aimRing: THREE.Mesh;
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
      <div class="bt-banner"></div>
      <div class="bt-chips"></div>
      <div class="bt-help">Move <kbd>WASD</kbd> · Moves <kbd>J</kbd><kbd>K</kbd><kbd>L</kbd><kbd>;</kbd> · Special <kbd>Space</kbd> · Swap <kbd>Tab</kbd>/<kbd>1</kbd><kbd>2</kbd><kbd>3</kbd> · Capture <kbd>C</kbd> · Run <kbd>Esc</kbd></div>`;
    host.appendChild(this.hud);
    this.banner = this.hud.querySelector('.bt-banner') as HTMLDivElement;
    this.chipsEl = this.hud.querySelector('.bt-chips') as HTMLDivElement;
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
      const k = e.key.toLowerCase();
      if (!this.keys.has(k)) {
        const slot = KEYS.indexOf(k);
        if (slot >= 0) this.fire(slot);
        if (k === ' ') this.fireSpecial();
        if (k === 'tab' || k === 'q') this.swap();
        if (k === '1' || k === '2' || k === '3') this.swap(Number(k) - 1);
        if (k === 'escape') this.flee();
        if (k === 'c') void this.capture();
        const d = { arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0], arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1] }[k];
        if (d) { this.stepCtrl(d[0]!, d[1]!); this.stepHold = 0.28; }
      }
      this.keys.add(k);
      if (k.startsWith('arrow') || k === ' ' || k === 'tab') e.preventDefault();
    };
    this.onKeyUp = (e) => this.keys.delete(e.key.toLowerCase());
  }

  private placeCamera(sx = 0, sy = 0): void {
    this.camera.position.set(sx, 8.4 + sy, 11.4);
    this.camera.lookAt(0, 0.2, 0.35);
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
      if (side === 'player' && STYLED[b.speciesNum]) {
        hero = (await RotHero.load(STYLED[b.speciesNum]!, tint, 0.98).catch(() => null)) ?? undefined;
        hero?.face(1, 0);
      }
      if (hero) root = hero.root;
      else root = await stillSprite(`./sprites/ohms/${b.speciesNum}_${side === 'player' ? 'back' : 'front'}_hd.png`, side === 'player' ? 0.98 : 1.05, tint);
      root.position.copy(cellPos(cell));
      this.scene.add(root);
      const sp = this.data.species(b.speciesNum);
      return {
        id: id++, side, b, special: specialOf(b.speciesNum, sp.type), cell, root, hero,
        iframes: 0, lunge: 0, down: false,
        cds: b.moves.map((_, i) => 0.5 + i * 0.2), sp: specialOf(b.speciesNum, sp.type).cooldown * 0.5,
        stun: 0, blind: 0, marked: 0, taunt: 0, slowTick: 0,
        moveAt: 1.2 + this.rng.next(), attackAt: 2.0 + this.rng.next() * 1.4, wind: null,
      };
    };
    this.fighters = [
      ...(await Promise.all(party.map((b, i) => make(b, 'player', SPOTS[party.length]![i]!)))),
      ...(await Promise.all(foes.map((b, i) => make(b, 'foe', mirror(SPOTS[foes.length]![i]!))))),
    ];
    this.ctrl = this.fighters.find((f) => f.side === 'player') ?? null;
    this.buildPlates();
    this.buildChips();
    const names = foes.map((f) => f.name);
    this.say(this.wild ? (names.length > 1 ? `A pack of ${names.length} wild Ohms closes in!` : `A wild ${names[0]} hums to life!`) : `${names.join(', ')} step up!`, 1.8);

    window.addEventListener('keydown', this.onKey);
    window.addEventListener('keyup', this.onKeyUp);
    this.ready = true;
    // SAL stands behind the squad, calling the shots — loaded in the background so the fight never waits on him
    void RotHero.load(opts.heroId ?? 'e_pro', tint, 1.6).then((h) => {
      this.sal = h;
      h.face(1, -0.4);
      h.root.position.set(-2.4 * PW, 0, -(ROWS / 2) * PD - 0.7); // behind your half, clear of the plates
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
  private setPanel(c: Cell, state: PanelState, secs: number): void {
    const p = this.panels[c.col]?.[c.row];
    if (!p || p.state === 'broken') return;
    p.state = state;
    p.until = this.t + secs;
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
      if (f.side === 'player') root.addEventListener('pointerdown', (e) => { e.preventDefault(); this.swap(this.fighters.filter((x) => x.side === 'player').indexOf(f)); });
      host.appendChild(root);
      f.plate = { root, fill: root.querySelector('.bt-bar div') as HTMLDivElement, text: root.querySelector('span') as HTMLSpanElement, sp: root.querySelector('.sq-sp div') as HTMLDivElement, tags: root.querySelector('em') as HTMLSpanElement };
    }
    this.updatePlates();
  }

  private buildChips(): void {
    this.chipsEl.innerHTML = '';
    this.chips = [];
    const f = this.ctrl;
    if (!f) return;
    const tag: Record<MoveOrigin, string> = { shared: 'Shared', own: 'Own', taught: 'Mod chip' };
    f.b.moves.forEach((slot, i) => {
      const m = this.data.move(slot.id);
      const origin = moveOrigin(f.b.speciesNum, m.id, this.data, SPECIES);
      const b = document.createElement('button');
      b.className = `bt-chip sq-${origin}`;
      b.style.setProperty('--tc', TYPE_COLOR[m.type]);
      b.innerHTML = `<kbd>${['J', 'K', 'L', ';'][i]}</kbd><b>${m.name}</b><small>${tag[origin]} · ${patternLabel(patternOf(m))}</small><div class="bt-cd"></div>`;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); this.fire(i); });
      this.chipsEl.appendChild(b);
      this.chips.push(b);
    });
    const sp = document.createElement('button');
    sp.className = 'bt-chip sq-special';
    sp.style.setProperty('--tc', '#ffd27a');
    sp.innerHTML = `<kbd>Space</kbd><b>${f.special.name}</b><small>Special · ${f.special.desc}</small><div class="bt-cd"></div>`;
    sp.addEventListener('pointerdown', (e) => { e.preventDefault(); this.fireSpecial(); });
    this.chipsEl.appendChild(sp);
    this.spChip = sp;
    if (this.fighters.filter((x) => x.side === 'player' && !x.down).length > 1) {
      const sw = document.createElement('button');
      sw.className = 'bt-chip sq-swap';
      sw.style.setProperty('--tc', '#c9b8e8');
      sw.innerHTML = '<kbd>Tab</kbd><b>Swap</b><small>Take the next Ohm</small>';
      sw.addEventListener('pointerdown', (e) => { e.preventDefault(); this.swap(); });
      this.chipsEl.appendChild(sw);
    }
    if (this.wild) {
      const cap = document.createElement('button');
      cap.className = 'bt-chip bt-cap';
      cap.style.setProperty('--tc', '#7fe0c8');
      cap.innerHTML = `<kbd>C</kbd><b>Capture</b><small>Node ×<span class="n">${this.nodes()}</span> · last one standing</small><div class="bt-cd"></div>`;
      cap.addEventListener('pointerdown', (e) => { e.preventDefault(); void this.capture(); });
      this.chipsEl.appendChild(cap);
      this.capChip = cap;
    }
  }

  private updatePlates(): void {
    for (const f of this.fighters) {
      if (!f.plate) continue;
      const k = f.b.integrity / f.b.stats.integrity;
      f.plate.fill.style.width = `${Math.max(0, k * 100)}%`;
      f.plate.fill.style.background = k > 0.5 ? '#7dff9a' : k > 0.2 ? '#ffd04a' : '#ff5a4a';
      f.plate.text.textContent = f.down ? 'Out of charge' : `${f.b.integrity} / ${f.b.stats.integrity}`;
      f.plate.sp.style.width = `${(1 - f.sp / f.special.cooldown) * 100}%`;
      f.plate.root.classList.toggle('sq-ctrl', f === this.ctrl);
      f.plate.root.classList.toggle('sq-down', f.down);
      const tags = [f.stun > 0 ? 'STUNNED' : '', f.marked > 0 ? 'MARKED' : '', f.blind > 0 ? 'BLINDED' : '', f.taunt > 0 ? 'TAUNTING' : '', f.b.status ?? ''].filter(Boolean);
      f.plate.tags.textContent = tags.join(' · ');
    }
  }

  // ------------------------------------------------------------- control

  private alive(side: Side): Fighter[] { return this.fighters.filter((f) => f.side === side && !f.down); }
  private enemiesOf(f: Fighter): Fighter[] { return this.alive(f.side === 'player' ? 'foe' : 'player'); }
  private fighterAt(c: Cell): Fighter | undefined { return this.fighters.find((f) => !f.down && same(f.cell, c)); }

  /** Who `f` is aiming at: whoever taunts, else the nearest in its row, else the nearest. */
  private targetOf(f: Fighter): Fighter | undefined {
    const foes = this.enemiesOf(f);
    const taunt = foes.find((x) => x.taunt > 0);
    if (taunt) return taunt;
    return foes.slice().sort((a, b) => (Math.abs(a.cell.row - f.cell.row) * 10 + Math.abs(a.cell.col - f.cell.col)) - (Math.abs(b.cell.row - f.cell.row) * 10 + Math.abs(b.cell.col - f.cell.col)))[0];
  }

  private standable(f: Fighter, c: Cell): boolean {
    if (!canStand(f.side, c)) return false;
    if (this.panel(c).state === 'broken') return false;
    const o = this.fighterAt(c);
    return !o || o === f;
  }

  private move(f: Fighter, dx: number, dz: number): boolean {
    if (f.down || f.stun > 0) return false;
    const c = { col: f.cell.col + dx, row: f.cell.row + dz };
    if (!this.standable(f, c)) return false;
    // stepping off cracked ground breaks it
    const left = this.panel(f.cell);
    if (left.state === 'cracked') { left.state = 'broken'; left.until = this.t + 8; }
    f.cell = c;
    const now = this.panel(c);
    if (now.state === 'charged') { f.stun = Math.max(f.stun, 0.7); this.float(f, 'SHORT', '#ffe85a'); }
    return true;
  }

  private stepCtrl(dx: number, dz: number): void {
    if (this.over || !this.ctrl) return;
    this.move(this.ctrl, dx, dz);
  }

  private swap(index?: number): void {
    if (this.over) return;
    const mine = this.fighters.filter((f) => f.side === 'player');
    let next: Fighter | undefined;
    if (index !== undefined) next = mine[index];
    else {
      const i = mine.indexOf(this.ctrl!);
      for (let k = 1; k <= mine.length; k++) { const c = mine[(i + k) % mine.length]!; if (!c.down) { next = c; break; } }
    }
    if (!next || next.down || next === this.ctrl) return;
    this.ctrl = next;
    this.buildChips();
    this.updatePlates();
    this.say(`${next.b.name}, you're up.`, 0.9);
  }

  private fire(slot: number): void {
    const f = this.ctrl;
    if (this.over || !f || f.down || f.stun > 0 || this.t < 0.6) return;
    const ms = f.b.moves[slot];
    if (!ms || (f.cds[slot] ?? 0) > 0) return;
    const m = this.data.move(ms.id);
    f.cds[slot] = cooldownOf(m);
    const target = this.targetOf(f);
    if (target) this.use(f, target, m);
  }

  private fireSpecial(): void {
    const f = this.ctrl;
    if (this.over || !f || f.down || f.stun > 0 || f.sp > 0 || this.t < 0.6) return;
    this.special(f);
  }

  /** IFF Recalibration: only on the last wild Ohm standing. */
  private async capture(): Promise<void> {
    if (this.over || this.capturing || this.t < 0.6 || !this.wild) return;
    const left = this.alive('foe');
    if (left.length !== 1) { this.say('Thin the pack first: you can only free the last one standing.', 1.6); return; }
    if (this.nodes() <= 0) { this.say('No storage nodes left.', 1.2); return; }
    this.spendNode();
    if (this.capChip) (this.capChip.querySelector('.n') as HTMLElement).textContent = String(this.nodes());
    this.capturing = true;
    for (const f of this.fighters) f.wind = null;
    this.pending = [];
    const target = left[0]!;
    const fb = target.b;
    const budget = puzzleBudget(this.data.species(fb.speciesNum), fb.stats.integrity, fb.integrity, fb.status);
    this.say('Node deployed. Clearing the static…', 1.2);
    const ok = await runCapturePuzzle(this.hud, this.rng, { size: budget.gridSize, seconds: budget.timerSeconds, name: fb.name });
    this.capturing = false;
    if (ok) { this.finish({ outcome: 'captured', foe: fb }, `${fb.name} is Freed! The static clears.`); return; }
    fb.rage += 1;
    fb.stages.output = Math.min(6, fb.stages.output + 1);
    this.float(target, 'OUTPUT ▲', '#ff8a7a');
    if (fb.rage >= 3 || this.rng.chance(fb.rage * 35)) { this.finish({ outcome: 'foeFled' }, `${fb.name} tore away into the ruins!`); return; }
    this.say(`${fb.name} rages against the hack!`, 1.4);
    target.attackAt = this.t + 0.8;
  }

  private flee(): void {
    if (this.over) return;
    if (!this.wild) { this.say("There's no running from this one.", 1.2); return; }
    this.finish({ outcome: 'fled' }, 'Got away safely.');
  }

  // ------------------------------------------------------------- combat

  /** Fire a move from `user` at `target`'s side. */
  private use(user: Fighter, target: Fighter, m: MoveDef, cells?: Cell[]): void {
    const p = patternOf(m);
    if (p === 'self') {
      this.applyEffect(user, user, m, true);
      this.say(`${user.b.name} used ${m.name}!`, 1.0);
      this.burst(cellPos(user.cell), TYPE_COLOR[m.type], 0.5);
      return;
    }
    let hit = cells ?? coverage(p, user.cell, user.side, (c) => this.blocks(user.side, c), p === 'lob' || p === 'cross' ? { ...target.cell } : undefined);
    if (LANE.has(p)) {
      // a barrier on their side stops a lane cold
      const i = hit.findIndex((c) => this.barrierAt(c, user.side === 'player' ? 'foe' : 'player'));
      if (i >= 0) hit = hit.slice(0, i + 1);
    }
    const travel = p === 'shot' || p === 'row' ? 0.18 : p === 'lob' || p === 'cross' ? 0.45 : p === 'dash' ? 0.16 : 0.08;
    this.pending.push({ at: this.t + travel, cells: hit, from: user, move: m, target });
    this.playPattern(user, p, hit, travel, TYPE_COLOR[m.type]);
    if (user.side === 'foe') this.say(`${user.b.name} used ${m.name}!`, 0.9);
  }

  private blocks(attacker: Side, c: Cell): boolean {
    const f = this.fighterAt(c);
    return (!!f && f.side !== attacker) || !!this.barrierAt(c, attacker === 'player' ? 'foe' : 'player');
  }
  private barrierAt(c: Cell, side: Side): Barrier | undefined { return this.barriers.find((b) => b.side === side && same(b.cell, c)); }

  private resolve(pd: Pending): void {
    const { from, move } = pd;
    for (const c of pd.cells) this.flashPanel(c, TYPE_COLOR[move.type]);
    // a barrier soaks the hit
    for (const c of pd.cells) {
      const br = this.barrierAt(c, from.side === 'player' ? 'foe' : 'player');
      if (br && LANE.has(patternOf(move))) { this.breakBarrier(br); return; }
    }
    // every enemy standing in the covered panels takes it
    const victims = this.fighters.filter((f) => !f.down && f.side !== from.side && pd.cells.some((c) => same(c, f.cell)));
    for (const target of victims) {
      if (target.iframes > 0) continue;
      if (from.blind > 0 && this.rng.chance(50)) { this.float(target, 'WIDE', '#c8c8c8'); continue; }
      if (!landsRoll(move, this.rng)) { this.float(target, 'MISS', '#c8c8c8'); continue; }
      if (move.power > 0) this.damage(from, target, move);
      this.applyEffect(from, target, move, false);
    }
  }

  private damage(from: Fighter, target: Fighter, move: MoveDef): void {
    const r = hitDamage(from.b, target.b, move, this.data, this.rng, target.marked > 0);
    target.b.integrity = Math.max(0, target.b.integrity - r.amount);
    target.iframes = 0.45;
    this.float(target, `${r.amount}${r.crit ? '!' : ''}`, r.effectiveness > 1 ? '#ffd04a' : '#ffffff');
    if (r.effectiveness > 1) this.say("It's super effective!", 0.8);
    this.shake = 0.16;
    if (target.b.integrity <= 0) this.knockOut(target);
    this.updatePlates();
  }

  private knockOut(f: Fighter): void {
    f.down = true;
    f.wind = null;
    this.say(f.side === 'foe' ? `${this.wild ? 'Wild ' : ''}${f.b.name} powered down!` : `${f.b.name} is out of charge…`, 1.4);
    if (!this.alive('foe').length) { this.finish({ outcome: 'victory' }, this.fighters.filter((x) => x.side === 'foe').length > 1 ? 'The pack is down!' : `${f.b.name} powered down!`); return; }
    if (!this.alive('player').length) { this.finish({ outcome: 'defeat' }, 'Your Ohms are out of charge…'); return; }
    if (f === this.ctrl) this.swap();
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
      this.float(user, 'REPAIR', '#7dff9a');
      this.updatePlates();
    }
  }

  // ------------------------------------------------------------- specials

  /** Each Ohm's special changes the field (rules.ts: specialOf). */
  private special(f: Fighter): void {
    const s = f.special;
    f.sp = s.cooldown;
    const target = this.targetOf(f);
    const enemySide: Side = f.side === 'player' ? 'foe' : 'player';
    const fwd = f.side === 'player' ? 1 : -1;
    const col = (c: number): Cell[] => Array.from({ length: ROWS }, (_, row) => ({ col: c, row }));
    const rowOf = (r: number): Cell[] => Array.from({ length: HALF }, (_, k) => ({ col: enemySide === 'foe' ? HALF + k : k, row: r }));
    const plus = (c: Cell, side: Side): Cell[] => [c, { col: c.col + 1, row: c.row }, { col: c.col - 1, row: c.row }, { col: c.col, row: c.row + 1 }, { col: c.col, row: c.row - 1 }].filter((x) => canStand(side, x));
    this.say(`${f.b.name}: ${s.name}!`, 1.1);
    this.burst(cellPos(f.cell), '#ffd27a', 0.6);
    const tc = target?.cell;
    switch (s.kind) {
      // three panels of their column, so there is always somewhere to step
      case 'scorch': if (tc) for (const c of col(tc.col).filter((x) => Math.abs(x.row - tc.row) <= 1)) this.setPanel(c, 'scorched', 6); break;
      case 'frost': if (tc) for (const c of rowOf(tc.row)) this.setPanel(c, 'iced', 6); break;
      case 'livewire':
        if (tc) for (const c of plus(tc, enemySide)) {
          this.setPanel(c, 'charged', 6);
          const v = this.fighterAt(c);
          if (v && v.side === enemySide) { v.stun = Math.max(v.stun, 0.6); this.float(v, 'SHORT', '#ffe85a'); }
        }
        break;
      case 'faultline': if (tc) for (const c of col(tc.col)) this.setPanel(c, 'cracked', 12); break;
      case 'overgrowth': for (const c of plus(f.cell, f.side)) this.setPanel(c, 'grown', 8); break;
      case 'bulwark': {
        const cell = { col: frontCol(f.side), row: f.cell.row };
        this.raiseBarrier(cell, f.side);
        if (f.b.speciesNum === 7) { f.taunt = 6; this.float(f, 'TAUNT', '#ffd27a'); } // Guard Dog draws their fire
        break;
      }
      case 'lockon': if (target) { target.marked = 7; this.float(target, 'MARKED', '#6ff0c8'); } break;
      case 'flare':
        if (tc) for (const v of this.enemiesOf(f).filter((x) => x.cell.col === tc.col)) { v.blind = 5; this.float(v, 'BLINDED', '#f6f0b0'); }
        if (tc) for (const c of col(tc.col)) this.flashPanel(c, '#f6f0b0');
        break;
      case 'shockwave':
        if (tc) for (const v of this.enemiesOf(f).filter((x) => x.cell.col === tc.col)) { v.stun = Math.max(v.stun, 1.2); v.wind = null; this.float(v, 'STUNNED', '#c78cff'); }
        if (tc) for (const c of col(tc.col)) this.flashPanel(c, '#c78cff');
        break;
      case 'ram':
      case 'gust': {
        // ram: charge the row, hit the first one and knock it back; gust: blow the whole row back
        const victims = this.enemiesOf(f).filter((v) => v.cell.row === f.cell.row).sort((a, b) => (a.cell.col - b.cell.col) * fwd);
        const hit = s.kind === 'ram' ? victims.slice(0, 1) : victims.slice().reverse();
        if (s.kind === 'ram') f.lunge = 0.4;
        for (const v of hit) {
          if (s.kind === 'ram') this.damage(f, v, { id: 'ram', name: s.name, type: this.data.species(f.b.speciesNum).type, power: 50, accuracy: 0, pp: 1, priority: 0 });
          const back = { col: v.cell.col + fwd, row: v.cell.row };
          if (this.standable(v, back)) { v.cell = back; this.float(v, 'PUSHED', '#d8d8d8'); }
          v.wind = null;
        }
        for (const c of rowOf(f.cell.row)) this.flashPanel(c, s.kind === 'ram' ? TYPE_COLOR.MOTOR : '#d8d8d8');
        break;
      }
    }
    this.updatePlates();
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
    this.barriers.push({ cell, side, until: this.t + 8, mesh: g });
  }

  private breakBarrier(b: Barrier, quiet = false): void {
    this.scene.remove(b.mesh);
    this.barriers = this.barriers.filter((x) => x !== b);
    if (!quiet) { this.burst(b.mesh.position.clone(), '#ffd27a', 0.4); this.say('The barrier takes the hit!', 0.8); }
  }

  // ------------------------------------------------------------- AI (your others, and every foe)

  private think(f: Fighter): void {
    if (f.down || f.stun > 0 || f === this.ctrl) return;
    const target = this.targetOf(f);
    if (!target) return;
    const clockSlow = Math.pow(1.25, -Math.min(0, f.b.stages.clock));
    const iced = this.panel(f.cell).state === 'iced' ? 1.8 : 1;
    // step: line up with the target's row, and get off bad ground
    if (!f.wind && this.t > f.moveAt) {
      const opts = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dz]) => ({ col: f.cell.col + dx!, row: f.cell.row + dz! })).filter((c) => this.standable(f, c));
      const danger = new Set(this.fighters.filter((x) => x.side !== f.side && x.wind).flatMap((x) => x.wind!.cells.map((c) => `${c.col},${c.row}`)));
      const score = (c: Cell): number => {
        const st = this.panel(c).state;
        let s = -Math.abs(c.row - target.cell.row) * 2;
        if (danger.has(`${c.col},${c.row}`)) s -= 6;
        if (st === 'scorched' || st === 'charged') s -= 4;
        if (st === 'grown') s += 1.5;
        if (st === 'cracked') s -= 1;
        return s + this.rng.next() * 1.2;
      };
      const pick = opts.sort((a, b) => score(b) - score(a))[0];
      if (pick && !same(pick, f.cell)) this.move(f, pick.col - f.cell.col, pick.row - f.cell.row);
      f.moveAt = this.t + (f.side === 'player' ? 0.7 : 0.9) * (0.8 + this.rng.next() * 0.6) * clockSlow * iced;
    }
    // special, now and then
    if (f.sp <= 0 && this.rng.chance(f.side === 'player' ? 40 : 25)) { this.special(f); return; }
    // attack: foes wind up in plain sight (red panels); your others just fire
    if (!f.wind && this.t > f.attackAt) {
      const usable = f.b.moves.map((s, i) => ({ m: this.data.move(s.id), i })).filter(({ m, i }) => (f.cds[i] ?? 0) <= 0 && (patternOf(m) !== 'self' || this.rng.chance(20)));
      const pick = usable[this.rng.int(0, Math.max(0, usable.length - 1))];
      if (pick) {
        const { m, i } = pick;
        f.cds[i] = cooldownOf(m);
        const p = patternOf(m);
        const cells = p === 'self' ? [] : coverage(p, f.cell, f.side, (c) => this.blocks(f.side, c), p === 'lob' || p === 'cross' ? { ...target.cell } : undefined);
        f.wind = { at: this.t + (f.side === 'foe' ? 0.85 : 0.3) * clockSlow, move: m, cells, target };
      }
      f.attackAt = this.t + (f.side === 'foe' ? 2.4 + this.rng.next() * 1.3 : 1.8 + this.rng.next() * 1.0) * clockSlow;
    }
    if (f.wind && this.t >= f.wind.at) {
      const w = f.wind;
      f.wind = null;
      this.use(f, w.target.down ? (this.targetOf(f) ?? w.target) : w.target, w.move, w.cells.length ? w.cells : undefined);
    }
  }

  // ------------------------------------------------------------- effects

  private playPattern(user: Fighter, p: Pattern, cells: Cell[], travel: number, color: string): void {
    const from = cellPos(user.cell).setY(0.6);
    const last = cells[cells.length - 1] ?? user.cell;
    const to = cellPos(last).setY(0.6);
    if (p === 'dash' || p === 'melee') { user.lunge = travel + 0.22; this.burstAt(cells, color, travel); return; }
    const orb = new THREE.Mesh(new THREE.SphereGeometry(p === 'lob' || p === 'cross' ? 0.18 : 0.12, 10, 8), new THREE.MeshBasicMaterial({ color, transparent: true, blending: THREE.AdditiveBlending }));
    this.scene.add(orb);
    const arc = p === 'lob' || p === 'cross' ? 1.8 : 0;
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
    this.banner.textContent = text;
    this.banner.classList.add('on');
    clearTimeout((this.banner as unknown as { _t?: number })._t);
    (this.banner as unknown as { _t?: number })._t = window.setTimeout(() => this.banner.classList.remove('on'), secs * 1000);
  }

  private finish(r: BattleResult, text: string): void {
    if (this.over) return;
    this.over = r;
    for (const f of this.fighters) f.wind = null;
    this.say(text, 99);
    this.banner.classList.add('end');
    setTimeout(() => this.done(r), 2200);
  }

  // ------------------------------------------------------------- frame

  update(dt: number): void {
    if (!this.ready || this.capturing) return; // loading, or frozen while the node puzzle runs
    this.t += dt;
    if (!this.over) {
      // held direction keys / the touch stick repeat steps (slow on ice)
      const c = this.ctrl;
      this.stepHold -= dt;
      const kx = (this.keys.has('d') || this.keys.has('arrowright') ? 1 : 0) - (this.keys.has('a') || this.keys.has('arrowleft') ? 1 : 0) || Math.round(this.stick.x);
      const kz = (this.keys.has('s') || this.keys.has('arrowdown') ? 1 : 0) - (this.keys.has('w') || this.keys.has('arrowup') ? 1 : 0) || Math.round(this.stick.y);
      if (c && (kx || kz) && this.stepHold <= 0) { this.stepCtrl(kx, kx ? 0 : kz); this.stepHold = this.panel(c.cell).state === 'iced' ? 0.34 : 0.17; }
      for (const f of this.fighters) {
        if (f.down) continue;
        f.cds = f.cds.map((x) => Math.max(0, x - dt));
        f.sp = Math.max(0, f.sp - dt);
        f.stun = Math.max(0, f.stun - dt);
        f.blind = Math.max(0, f.blind - dt);
        f.marked = Math.max(0, f.marked - dt);
        f.taunt = Math.max(0, f.taunt - dt);
        // what the ground under it does
        const st = this.panel(f.cell).state;
        f.slowTick += dt;
        if (f.slowTick >= 0.5) {
          f.slowTick = 0;
          if (st === 'scorched') { const d = Math.max(1, Math.ceil(f.b.stats.integrity * 0.03)); f.b.integrity = Math.max(0, f.b.integrity - d); this.float(f, `${d}`, '#ff8a4a'); if (f.b.integrity <= 0) this.knockOut(f); }
          if (st === 'grown' && sideOf(f.cell) === f.side && f.b.integrity < f.b.stats.integrity) { const h = Math.max(1, Math.ceil(f.b.stats.integrity * 0.025)); f.b.integrity = Math.min(f.b.stats.integrity, f.b.integrity + h); this.float(f, `+${h}`, '#7dff9a'); }
          this.updatePlates();
        }
      }
      if (this.over) return;
      if (this.t > 1.6) for (const f of this.fighters) this.think(f);
      // the controlled Ohm's chips: recharge shading
      if (c) {
        this.chips.forEach((b, i) => {
          const m = this.data.move(c.b.moves[i]!.id);
          const k = (c.cds[i] ?? 0) / cooldownOf(m);
          (b.querySelector('.bt-cd') as HTMLDivElement).style.height = `${k * 100}%`;
          b.classList.toggle('ready', k <= 0);
        });
        // capture only works on the last wild Ohm standing
        if (this.capChip) this.capChip.classList.toggle('sq-off', this.fighters.filter((f) => f.side === 'foe' && !f.down).length > 1);
        if (this.spChip) {
          const k = c.sp / c.special.cooldown;
          (this.spChip.querySelector('.bt-cd') as HTMLDivElement).style.height = `${k * 100}%`;
          this.spChip.classList.toggle('ready', k <= 0);
        }
      }
      if (Math.floor(this.t * 4) !== Math.floor((this.t - dt) * 4)) this.updatePlates();
    }
    for (const l of this.later.filter((x) => this.t >= x.at)) l.fn();
    this.later = this.later.filter((x) => this.t < x.at);
    for (const pd of this.pending.filter((p) => this.t >= p.at)) this.resolve(pd);
    this.pending = this.pending.filter((p) => this.t < p.at);
    for (const b of this.barriers.filter((x) => this.t > x.until)) this.breakBarrier(b, true);

    // panels: states expire; telegraphs pulse; your controlled Ohm's panel glows
    const warn = new Set(this.fighters.filter((f) => f.side === 'foe' && f.wind).flatMap((f) => f.wind!.cells.map((c) => `${c.col},${c.row}`)));
    for (let col = 0; col < COLS; col++) for (let row = 0; row < ROWS; row++) {
      const p = this.panels[col]![row]!;
      if (p.state !== 'normal' && this.t > p.until) p.state = 'normal';
      p.mesh.visible = p.state !== 'broken';
      p.hole.visible = p.state === 'broken';
      p.crack.visible = p.state === 'cracked';
      const om = p.overlay.material as THREE.MeshBasicMaterial;
      const pulse = 0.5 + 0.5 * Math.sin(this.t * (p.state === 'charged' ? 22 : 5) + col + row);
      om.color.set(STATE_COLOR[p.state]);
      om.opacity = p.state === 'scorched' || p.state === 'charged' ? 0.12 + pulse * 0.12 : p.state === 'iced' || p.state === 'grown' ? 0.3 : 0;
      const standing = this.ctrl && !this.ctrl.down && this.ctrl.cell.col === col && this.ctrl.cell.row === row;
      if (warn.has(`${col},${row}`)) {
        p.mat.emissive.set(this.theme.warnGlow);
        p.mat.emissiveIntensity = 0.32 + Math.sin(this.t * 18) * 0.2;
      } else {
        p.mat.emissive.lerp(new THREE.Color(standing ? this.theme.standGlow : '#000000'), Math.min(1, dt * 6));
        p.mat.emissiveIntensity += ((standing ? 0.09 : 0) - p.mat.emissiveIntensity) * Math.min(1, dt * 6);
      }
    }
    // fighters glide to their panels; lunges, stuns, i-frame blink
    for (const f of this.fighters) {
      const goal = cellPos(f.cell);
      if (f.lunge > 0) {
        f.lunge -= dt;
        const k = Math.sin(Math.min(1, Math.max(0, f.lunge / 0.38)) * Math.PI);
        goal.x += (f.side === 'player' ? 1 : -1) * k * 1.4;
      }
      f.root.position.lerp(goal, Math.min(1, dt * 16));
      f.iframes = Math.max(0, f.iframes - dt);
      f.root.visible = f.down || f.iframes <= 0 || Math.floor(this.t * 20) % 2 === 0;
      if (f.down) { f.root.scale.y = Math.max(0.5, f.root.scale.y - dt * 1.2); f.root.position.y = 0; }
      else f.root.position.y = (f.stun > 0 ? Math.sin(this.t * 40) * 0.03 : 0) + (f.side === 'foe' && !this.over ? Math.abs(Math.sin(this.t * 3 + f.id)) * 0.05 : 0);
      f.hero?.animate(dt, false);
    }
    // the gold ring under the Ohm you steer; the red one under what it's aiming at
    const c = this.ctrl;
    this.ctrlRing.visible = !!c && !c.down && !this.over;
    if (c) this.ctrlRing.position.copy(c.root.position).setY(0.09);
    const aim = c && !c.down ? this.targetOf(c) : undefined;
    this.aimRing.visible = !!aim && !this.over;
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
