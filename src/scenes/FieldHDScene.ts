import Phaser from 'phaser';
import { Controls } from '../input/controls';

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

    // spawn on the first open cell near the centre
    [this.px, this.py] = this.findOpenSpawn();

    this.player = this.add.image(0, 0, 'player_over').setOrigin(0.5, 0.7).setScale(2).setDepth(10);
    this.placePlayer();

    this.cameras.main.setBounds(0, 0, this.field.width, this.field.height);
    this.cameras.main.startFollow(this.player, true, 0.18, 0.18);
    this.cameras.main.setRoundPixels(true);

    this.controls = new Controls(this);
    this.banner('THE FIELD — Ohmstead surface');
  }

  override update(): void {
    if (this.moving) return;
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
        if (this.isGrass(this.px, this.py) && Phaser.Math.Between(0, 100) < 22) {
          this.banner('The grass rustles — a wild Ohm is near!');
        }
      },
    });
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
