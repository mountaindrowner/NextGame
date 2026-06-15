import Phaser from 'phaser';
import { Controls } from '../input/controls';
import { makeBattler } from '../core/battle/engine';
import { rollEncounter } from '../core/encounter';
import { Rng } from '../core/rng';
import { GAME_DATA } from '../data/dataview';
import { ZONES_BY_ID } from '../data/encounters';
import { getGameState, hasGameState, nextSeed } from '../game/state';

interface FieldData {
  tile: number;
  cols: number;
  rows: number;
  width: number;
  height: number;
  collision: number[];
  grass: number[];
  grassAny?: number[];
  water?: number[];
  placements?: Array<{ type: string; col: number; row: number }>;
  npcs?: Array<{ char: string; col: number; row: number }>;
  spawn?: { x: number; y: number };
  exits?: Array<{ x: number; y: number; scene: string; mapId?: string }>;
  interacts?: Array<{ x: number; y: number; kind: string }>;
}

interface MapDef {
  png: string;
  json: string;
  banner: string;
  garage: boolean; // does this map have the surface recharge pad?
}

const MAPS: Record<string, MapDef> = {
  'the-field': { png: 'world/the-field.png', json: 'world/the-field.json', banner: 'THE FIELD — Ohmstead surface', garage: true },
  ohmstead: { png: 'world/ohmstead.png', json: 'world/ohmstead.json', banner: 'OHMSTEAD — the colony, sublevel garage', garage: false },
  railhead: { png: 'world/railhead.png', json: 'world/railhead.json', banner: 'RAILHEAD — Colony 1, the rail junction', garage: true },
  cistern: { png: 'world/cistern.png', json: 'world/cistern.json', banner: 'THE CISTERN — Colony 2, the flooded waterworks', garage: false },
  bastion: { png: 'world/bastion.png', json: 'world/bastion.json', banner: 'BASTION — Colony 3, the quarry-fortress', garage: true },
  redoubt: { png: 'world/redoubt.png', json: 'world/redoubt.json', banner: 'REDOUBT — Colony 4, the Bunker', garage: true },
};

const NPC_CHARS = ['npc_rancher', 'npc_elder', 'npc_kid'] as const;
const FX = ['grass_0', 'grass_1', 'grass_2', 'leaf_0', 'leaf_1', 'leaf_2', 'trunk'] as const;
const WATER_FRAMES = 6;

interface Sway {
  obj: Phaser.GameObjects.Image;
  phase: number;
  amp: number;
  speed: number;
}

type Dir = 'up' | 'down' | 'left' | 'right';
const DELTA: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const WALK_MS = 150;
const RUN_MS = 90;

/**
 * HD Field demo (art direction pivot): the creator's painted cattle-town map
 * is the playable Field. Collision + grass encounters are derived from the art
 * (public/field/). Player walks the 32px grid; the camera follows. Other
 * scenes still await the 480×320 layout migration — this proves the art.
 */
export class FieldHDScene extends Phaser.Scene {
  private mapId = 'the-field';
  private mapDef: MapDef = MAPS['the-field']!;
  private field!: FieldData;
  private controls!: Controls;
  private player!: Phaser.GameObjects.Sprite;
  private walkKey = 'sal_walk';
  private useSheet = false;
  private px = 0;
  private py = 0;
  private facing: Dir = 'down';
  private moving = false;
  private toastObj?: Phaser.GameObjects.Container;
  private sway: Sway[] = [];
  private waterSprites: Phaser.GameObjects.Image[] = [];
  private waterFrame = 0;
  private waterTimer = 0;
  private windT = 0;

  constructor() {
    super('fieldhd');
  }

  init(data: { mapId?: string }): void {
    this.mapId = data.mapId && MAPS[data.mapId] ? data.mapId : 'the-field';
    this.mapDef = MAPS[this.mapId]!;
  }

  private mapKey(): string {
    return `map-${this.mapId}`;
  }
  private dataKey(): string {
    return `mapdata-${this.mapId}`;
  }

  /** Build the moving overlay layers: animated water, swaying grass tufts,
   * and trees (static trunk + swaying leaf clusters). */
  private buildAnimatedLayers(): void {
    this.sway = [];
    this.waterSprites = [];
    const t = this.field.tile;
    const rng = new Rng((0x5eed ^ this.field.cols) >>> 0);
    const water = this.field.water ?? [];
    const grassAny = this.field.grassAny ?? [];
    const enc = this.field.grass ?? [];
    for (let r = 0; r < this.field.rows; r++) {
      for (let c = 0; c < this.field.cols; c++) {
        const i = r * this.field.cols + c;
        if (water[i] === 1) {
          this.waterSprites.push(this.add.image(c * t, r * t, 'water_0').setOrigin(0, 0).setDepth(1));
          continue;
        }
        if (grassAny[i] === 1) {
          const n = enc[i] === 1 ? 2 : rng.chance(55) ? 1 : 0;
          for (let k = 0; k < n; k++) {
            const ox = c * t + rng.int(3, t - 3);
            const oy = r * t + rng.int(12, t - 1);
            const img = this.add
              .image(ox, oy, `grass_${rng.int(0, 2)}`)
              .setOrigin(0.5, 1)
              .setDepth(2 + r);
            this.sway.push({ obj: img, phase: rng.next() * 6.28, amp: 0.16, speed: 1.5 + rng.next() * 0.7 });
          }
        }
      }
    }
    for (const p of this.field.placements ?? []) {
      if (p.type !== 'tree') continue;
      const bx = p.col * t + t / 2;
      const by = p.row * t + t;
      this.add.image(bx, by, 'trunk').setOrigin(0.5, 1).setDepth(3 + p.row);
      const spots: Array<[number, number, string]> = [
        [bx - 7, by - 22, 'leaf_0'],
        [bx + 7, by - 22, 'leaf_1'],
        [bx, by - 30, 'leaf_2'],
      ];
      for (const [lx, ly, key] of spots) {
        const img = this.add.image(lx, ly, key).setOrigin(0.5, 0.7).setDepth(4 + p.row);
        this.sway.push({ obj: img, phase: rng.next() * 6.28, amp: 0.06, speed: 1.0 + rng.next() * 0.4 });
      }
    }
  }

  private animate(delta: number): void {
    this.windT += delta / 1000;
    for (const s of this.sway) s.obj.rotation = Math.sin(this.windT * s.speed + s.phase) * s.amp;
    this.waterTimer += delta;
    if (this.waterTimer > 150) {
      this.waterTimer = 0;
      this.waterFrame = (this.waterFrame + 1) % WATER_FRAMES;
      const key = `water_${this.waterFrame}`;
      for (const w of this.waterSprites) w.setTexture(key);
    }
  }

  preload(): void {
    if (!this.textures.exists(this.mapKey())) this.load.image(this.mapKey(), this.mapDef.png);
    if (!this.cache.json.exists(this.dataKey())) this.load.json(this.dataKey(), this.mapDef.json);
    // pixelified protagonist sprites (from real art via the pixelify pipeline)
    // original protagonist sprites (YoYoPixel grid method)
    if (!this.textures.exists('player')) this.load.image('player', 'world/char/player.png');
    // 4-direction walk sheets (grid char pipeline): 3 frames × 3 dirs on a 20×32 cell
    const sheets = ['sal_walk', 'wren_walk', 'npc_rancher_walk', 'npc_elder_walk', 'npc_kid_walk'];
    for (const s of sheets) if (!this.textures.exists(s)) this.load.spritesheet(s, `world/char/${s}.png`, { frameWidth: 20, frameHeight: 32 });
    for (const n of NPC_CHARS) if (!this.textures.exists(n)) this.load.image(n, `world/char/${n}.png`);
    // animated world-layer assets
    for (const f of FX) if (!this.textures.exists(f)) this.load.image(f, `world/fx/${f}.png`);
    for (let i = 0; i < WATER_FRAMES; i++)
      if (!this.textures.exists(`water_${i}`)) this.load.image(`water_${i}`, `world/fx/water_${i}.png`);
  }

  create(): void {
    this.field = this.cache.json.get(this.dataKey()) as FieldData;
    this.add.image(0, 0, this.mapKey()).setOrigin(0, 0).setDepth(0);
    this.buildAnimatedLayers();

    // the garage / elevator exit (heal point) — the surface map has the
    // recharge pad; the colony garage uses the Bench interact instead
    const open = this.findOpenSpawn();
    const home = this.field.spawn ?? { x: open[0], y: open[1] };
    if (this.mapDef.garage) {
      [this.garage[0], this.garage[1]] = this.findOpenSpawn();
      this.drawGarage();
    } else {
      this.garage = [-99, -99]; // no recharge pad underground
    }

    const state = hasGameState() ? getGameState() : undefined;
    const loc = state?.location;
    if (this.mapDef.garage && state?.flags['respawn-garage']) {
      [this.px, this.py] = this.garage;
      delete state.flags['respawn-garage'];
      this.time.delayedCall(200, () => this.banner("You're all recharged — stay current out there."));
    } else if (loc && loc.map === this.mapId && !this.solid(loc.x, loc.y)) {
      this.px = loc.x;
      this.py = loc.y;
    } else {
      this.px = home.x;
      this.py = home.y;
    }

    for (const k of ['sal_walk', 'wren_walk', 'npc_rancher_walk', 'npc_elder_walk', 'npc_kid_walk']) this.makeWalk(k);

    // NPCs (placed townsfolk; block their tile) — facing the player, idle
    const t = this.field.tile;
    for (const npc of this.field.npcs ?? []) {
      const sk = `${npc.char}_walk`;
      const px = npc.col * t + t / 2;
      const py = npc.row * t + t;
      if (this.textures.exists(sk)) this.add.sprite(px, py, sk, 0).setOrigin(0.5, 0.92).setScale(1.25).setDepth(npc.row);
      else if (this.textures.exists(npc.char)) this.add.image(px, py, npc.char).setOrigin(0.5, 0.92).setScale(1.3).setDepth(npc.row);
      else continue;
      this.npcCells.add(`${npc.col},${npc.row}`);
    }

    // player = the chosen preset's 4-direction walk sprite
    const preset = hasGameState() ? getGameState().preset : 'SAL';
    this.walkKey = preset === 'WREN' ? 'wren_walk' : 'sal_walk';
    this.useSheet = this.textures.exists(this.walkKey);
    const key = this.useSheet ? this.walkKey : this.textures.exists('player') ? 'player' : this.walkKey;
    this.player = this.add.sprite(0, 0, key, 0).setOrigin(0.5, 0.92).setDepth(50);
    this.player.setScale(this.useSheet ? 1.25 : 1.3);
    this.placePlayer();

    this.cameras.main.setBounds(0, 0, this.field.width, this.field.height);
    this.cameras.main.startFollow(this.player, true, 0.18, 0.18);
    this.cameras.main.setRoundPixels(true);

    this.controls = new Controls(this);
    this.events.on('resume', () => this.controls.clearQueue());
    this.banner(this.mapDef.banner);
  }

  /** Build per-direction walk anims for a 3×3 walk sheet (S=0-2,N=3-5,W=6-8). */
  private makeWalk(key: string): void {
    if (!this.textures.exists(key)) return;
    const fps = key.includes('run') ? 11 : 7;
    const mk = (d: string, frames: number[]): void => {
      const k = `${key}-${d}`;
      if (!this.anims.exists(k)) this.anims.create({ key: k, frames: frames.map((f) => ({ key, frame: f })), frameRate: fps, repeat: -1 });
    };
    mk('s', [0, 1, 0, 2]);
    mk('n', [3, 4, 3, 5]);
    mk('w', [6, 7, 6, 8]);
  }
  private idleFrame(d: string): number {
    return d === 'n' ? 3 : d === 'w' ? 6 : 0;
  }

  private garage: [number, number] = [1, 1];

  private drawGarage(): void {
    const t = this.field.tile;
    const gx = this.garage[0] * t;
    const gy = this.garage[1] * t;
    // a small recharge pad marker (the colony garage door / elevator head)
    this.add.rectangle(gx + t / 2, gy + t / 2, t - 4, t - 4, 0x3a78a0, 0.5).setStrokeStyle(2, 0x9fe0ff).setDepth(1);
    this.add.text(gx + t / 2, gy + t / 2, '⤓', { fontFamily: 'monospace', fontSize: '14px', color: '#e8f4ff' }).setOrigin(0.5).setDepth(1);
  }

  private atGarage(): boolean {
    return Math.abs(this.px - this.garage[0]) + Math.abs(this.py - this.garage[1]) <= 1;
  }

  private recharge(): void {
    if (!hasGameState()) return;
    const state = getGameState();
    for (const b of state.party) {
      b.integrity = b.stats.integrity;
      b.status = undefined;
      b.statusTurns = 0;
      b.glitchedTurns = 0;
      for (const m of b.moves) m.pp = m.maxPp;
    }
    this.banner("Garage: you're all recharged — stay current.");
  }

  override update(_time: number, delta: number): void {
    this.animate(delta); // wind sway + water flow run every frame
    if (this.moving) return;
    if (this.controls.consume('start') && hasGameState()) {
      this.scene.launch('menu', { from: 'fieldhd' });
      this.scene.pause();
      return;
    }
    if (this.controls.consume('a')) {
      if (this.atGarage()) {
        this.recharge();
        return;
      }
      if (this.tryInteract()) return;
    }
    for (const dir of ['up', 'down', 'left', 'right'] as Dir[]) {
      if (this.controls.isHeld(dir)) {
        this.step(dir);
        return;
      }
    }
  }

  private npcCells = new Set<string>();

  /** Face-adjacent interact: bench (the colony garage Bench), etc. */
  private tryInteract(): boolean {
    const [dx, dy] = DELTA[this.facing];
    const fx = this.px + dx;
    const fy = this.py + dy;
    for (const it of this.field.interacts ?? []) {
      if ((it.x === fx && it.y === fy) || (it.x === this.px && it.y === this.py)) {
        if (it.kind === 'bench') {
          this.banner("Grandpa's Bench — your starter was built here. (Press ⤓ topside to recharge.)");
        } else if (it.kind === 'eli') {
          this.banner('A photograph and a worn logbook. The face is a stranger… but the initials are E.V. Why is that name a chill?');
        } else {
          this.banner('You poke at it. Nothing happens.');
        }
        return true;
      }
    }
    return false;
  }

  /** Exit warp: stepping onto an exit cell hands off to its target scene. */
  private checkExit(): boolean {
    for (const ex of this.field.exits ?? []) {
      if (ex.x === this.px && ex.y === this.py) {
        if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
        this.cameras.main.fade(360, 12, 10, 8);
        const { scene, mapId } = ex;
        this.time.delayedCall(380, () => (mapId ? this.scene.start(scene, { mapId }) : this.scene.start(scene)));
        return true;
      }
    }
    return false;
  }

  private solid(cx: number, cy: number): boolean {
    if (cx < 0 || cy < 0 || cx >= this.field.cols || cy >= this.field.rows) return true;
    if (this.npcCells.has(`${cx},${cy}`)) return true;
    return this.field.collision[cy * this.field.cols + cx] === 1;
  }

  private isGrass(cx: number, cy: number): boolean {
    return this.field.grass[cy * this.field.cols + cx] === 1;
  }

  private findOpenSpawn(): [number, number] {
    const cx = Math.floor(this.field.cols / 2);
    const cy = Math.floor(this.field.rows / 2);
    for (let r = 0; r < Math.max(this.field.cols, this.field.rows); r++) {
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (!this.solid(x, y)) return [x, y];
        }
    }
    return [1, 1];
  }

  private step(dir: Dir): void {
    this.facing = dir;
    const [dx, dy] = DELTA[dir];
    const nx = this.px + dx;
    const ny = this.py + dy;
    if (this.solid(nx, ny)) {
      this.placePlayer(); // bump
      return;
    }
    this.moving = true;
    this.px = nx;
    this.py = ny;
    const run = this.controls.isHeld('b');
    const d = dir === 'up' ? 'n' : dir === 'down' ? 's' : 'w';
    this.player.setFlipX(dir === 'right'); // W faces left; mirror for E
    if (this.useSheet) this.player.play(`${this.walkKey}-${d}`, true);
    this.tweens.add({
      targets: this.player,
      x: nx * this.field.tile + this.field.tile / 2,
      y: ny * this.field.tile + this.field.tile / 2,
      duration: run ? RUN_MS : WALK_MS,
      onComplete: () => {
        this.moving = false;
        if (this.useSheet) {
          this.player.anims.stop();
          this.player.setFrame(this.idleFrame(d));
        }
        if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
        if (this.checkExit()) return;
        if (this.isGrass(this.px, this.py)) this.tryEncounter();
      },
    });
  }

  private rng = new Rng(Date.now() >>> 0);

  private tryEncounter(): void {
    if (!hasGameState()) {
      if (Phaser.Math.Between(0, 100) < 22) this.banner('The grass rustles — a wild Ohm is near!');
      return;
    }
    const zone = ZONES_BY_ID.get('field-grass');
    if (!zone) return;
    const state = getGameState();
    const dampened = state.flags['dampener'] === true;
    const spawn = rollEncounter(zone, this.rng, dampened);
    if (!spawn) return;
    if (!state.manifest.seen.includes(spawn.speciesNum)) state.manifest.seen.push(spawn.speciesNum);
    const foe = makeBattler(GAME_DATA.species(spawn.speciesNum), spawn.level, GAME_DATA);
    this.scene.start('battle', { kind: 'wild', foes: [foe], seed: nextSeed(state), returnScene: 'fieldhd' });
  }

  private placePlayer(): void {
    this.player.setPosition(this.px * this.field.tile + this.field.tile / 2, this.py * this.field.tile + this.field.tile / 2);
  }

  private banner(text: string): void {
    this.toastObj?.destroy();
    const box = this.add.rectangle(240, 300, 460, 28, 0x1a1410, 0.82).setStrokeStyle(2, 0xe8d8a8);
    const t = this.add.text(0, 0, text, { fontFamily: 'monospace', fontSize: '11px', color: '#f4ecd8' }).setOrigin(0.5);
    t.setPosition(240, 300);
    const c = this.add.container(0, 0, [box, t]).setScrollFactor(0).setDepth(200);
    this.toastObj = c;
    this.time.delayedCall(2200, () => {
      if (this.toastObj === c) {
        c.destroy();
        this.toastObj = undefined;
      }
    });
  }
}
