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
}

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
  private field!: FieldData;
  private controls!: Controls;
  private player!: Phaser.GameObjects.Image;
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
    this.load.image('field-hd', 'world/the-field.png');
    this.load.json('field-hd-data', 'world/the-field.json');
    // pixelified protagonist sprites (from real art via the pixelify pipeline)
    // original protagonist sprites (YoYoPixel grid method)
    if (!this.textures.exists('sal_yoyo')) this.load.image('sal_yoyo', 'world/char/sal_yoyo.png');
    if (!this.textures.exists('wren_yoyo')) this.load.image('wren_yoyo', 'world/char/wren_yoyo.png');
    if (!this.textures.exists('player')) this.load.image('player', 'world/char/player.png');
    for (const n of NPC_CHARS) if (!this.textures.exists(n)) this.load.image(n, `world/char/${n}.png`);
    // animated world-layer assets
    for (const f of FX) if (!this.textures.exists(f)) this.load.image(f, `world/fx/${f}.png`);
    for (let i = 0; i < WATER_FRAMES; i++)
      if (!this.textures.exists(`water_${i}`)) this.load.image(`water_${i}`, `world/fx/water_${i}.png`);
  }

  create(): void {
    this.field = this.cache.json.get('field-hd-data') as FieldData;
    this.add.image(0, 0, 'field-hd').setOrigin(0, 0).setDepth(0);
    this.buildAnimatedLayers();

    // the garage / elevator exit (heal point) is the deterministic central
    // open tile — the elevator brings you up here
    [this.garage[0], this.garage[1]] = this.findOpenSpawn();
    this.drawGarage();

    const state = hasGameState() ? getGameState() : undefined;
    const loc = state?.location;
    if (state?.flags['respawn-garage']) {
      [this.px, this.py] = this.garage;
      delete state.flags['respawn-garage'];
      this.time.delayedCall(200, () => this.banner("You're all recharged — stay current out there."));
    } else if (loc && loc.map === 'fieldhd' && !this.solid(loc.x, loc.y)) {
      this.px = loc.x;
      this.py = loc.y;
    } else {
      [this.px, this.py] = this.garage;
    }

    // NPCs (placed townsfolk; block their tile)
    const t = this.field.tile;
    for (const npc of this.field.npcs ?? []) {
      if (!this.textures.exists(npc.char)) continue;
      this.add.image(npc.col * t + t / 2, npc.row * t + t, npc.char).setOrigin(0.5, 0.92).setScale(1.3).setDepth(npc.row);
      this.npcCells.add(`${npc.col},${npc.row}`);
    }

    // player = the chosen preset's pixelified sprite, sized for the overworld
    const preset = hasGameState() ? getGameState().preset : 'SAL';
    const pkey = preset === 'WREN' ? 'wren_yoyo' : 'sal_yoyo';
    const key = this.textures.exists(pkey) ? pkey : 'player';
    this.player = this.add.image(0, 0, key).setOrigin(0.5, 0.92).setDepth(50);
    this.player.setScale(1.3); // 18×30 Pokémon-style art → ~39px in-world
    this.placePlayer();

    this.cameras.main.setBounds(0, 0, this.field.width, this.field.height);
    this.cameras.main.startFollow(this.player, true, 0.18, 0.18);
    this.cameras.main.setRoundPixels(true);

    this.controls = new Controls(this);
    this.events.on('resume', () => this.controls.clearQueue());
    this.banner('THE FIELD — Ohmstead surface');
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
    if (this.controls.consume('a') && this.atGarage()) {
      this.recharge();
      return;
    }
    for (const dir of ['up', 'down', 'left', 'right'] as Dir[]) {
      if (this.controls.isHeld(dir)) {
        this.step(dir);
        return;
      }
    }
  }

  private npcCells = new Set<string>();

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
    this.player.setFlipX(dir === 'left');
    this.tweens.add({
      targets: this.player,
      x: nx * this.field.tile + this.field.tile / 2,
      y: ny * this.field.tile + this.field.tile / 2,
      duration: run ? RUN_MS : WALK_MS,
      onComplete: () => {
        this.moving = false;
        if (hasGameState()) getGameState().location = { map: 'fieldhd', x: this.px, y: this.py };
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
