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

  constructor() {
    super('fieldhd');
  }

  preload(): void {
    this.load.image('field-hd', 'field/the-field.png');
    this.load.json('field-hd-data', 'field/the-field.json');
    if (!this.textures.exists('player_over')) this.load.image('player_over', 'sprites/ohms/player_over.png');
  }

  create(): void {
    this.field = this.cache.json.get('field-hd-data') as FieldData;
    this.add.image(0, 0, 'field-hd').setOrigin(0, 0);

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

    this.player = this.add.image(0, 0, 'player_over').setOrigin(0.5, 0.7).setScale(2).setDepth(10);
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

  override update(): void {
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

  private solid(cx: number, cy: number): boolean {
    if (cx < 0 || cy < 0 || cx >= this.field.cols || cy >= this.field.rows) return true;
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
