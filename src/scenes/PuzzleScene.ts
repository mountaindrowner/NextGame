import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { connections, generatePuzzle, isSolved, rotateCell, type Puzzle } from '../core/puzzle';
import { Rng } from '../core/rng';
import { Controls } from '../input/controls';
import { getAudio } from '../game/audio';
import { UI } from '../ui/colors';

interface PuzzleInit {
  timerSeconds: number;
  gridSize: number;
  decoys: number;
  onDone: (success: boolean) => void;
}

const CELL = 16;

export class PuzzleScene extends Phaser.Scene {
  private puzzle!: Puzzle;
  private controls!: Controls;
  private cursorX = 0;
  private cursorY = 0;
  private remainingMs = 0;
  private totalMs = 0;
  private gfx!: Phaser.GameObjects.Graphics;
  private timerBar!: Phaser.GameObjects.Rectangle;
  private done = false;
  private init_!: PuzzleInit;

  constructor() {
    super('puzzle');
  }

  init(data: PuzzleInit): void {
    this.init_ = data;
  }

  create(): void {
    fitLegacy(this);
    this.done = false;
    this.puzzle = generatePuzzle(this.init_.gridSize, new Rng((Date.now() ^ 0x5eed) >>> 0));
    this.totalMs = this.init_.timerSeconds * 1000;
    this.remainingMs = this.totalMs;
    this.cursorX = 0;
    this.cursorY = this.puzzle.startY;

    this.add.rectangle(120, 80, 240, 160, 0x101820, 0.92);
    this.add.text(120, 10, 'CLEAR THE STATIC', { fontFamily: 'monospace', fontSize: '10px', color: '#88e0d0' }).setOrigin(0.5);
    this.add.rectangle(120, 150, 200, 6, 0x303840).setStrokeStyle(1, 0x88e0d0);
    this.timerBar = this.add.rectangle(120, 150, 198, 4, 0x88e0d0);
    this.gfx = this.add.graphics();
    this.controls = new Controls(this);
    this.draw();
  }

  override update(_: number, delta: number): void {
    if (this.done) return;
    this.remainingMs -= delta;
    this.timerBar.width = Math.max(0, 198 * (this.remainingMs / this.totalMs));
    if (this.remainingMs <= 0) {
      this.finish(false);
      return;
    }
    const n = this.puzzle.size;
    if (this.controls.consume('up')) { this.cursorY = (this.cursorY + n - 1) % n; getAudio().cursor(); }
    if (this.controls.consume('down')) { this.cursorY = (this.cursorY + 1) % n; getAudio().cursor(); }
    if (this.controls.consume('left')) { this.cursorX = (this.cursorX + n - 1) % n; getAudio().cursor(); }
    if (this.controls.consume('right')) { this.cursorX = (this.cursorX + 1) % n; getAudio().cursor(); }
    if (this.controls.consume('a')) {
      getAudio().select();
      rotateCell(this.puzzle, this.cursorX, this.cursorY);
      if (isSolved(this.puzzle)) {
        this.draw();
        this.finish(true);
        return;
      }
    }
    this.draw();
  }

  private finish(success: boolean): void {
    this.done = true;
    this.time.delayedCall(success ? 350 : 500, () => this.init_.onDone(success));
  }

  private draw(): void {
    const n = this.puzzle.size;
    const ox = 120 - (n * CELL) / 2;
    const oy = 80 - (n * CELL) / 2;
    const g = this.gfx;
    g.clear();

    // ports
    g.fillStyle(0x88e0d0).fillRect(ox - 6, oy + this.puzzle.startY * CELL + 6, 6, 4);
    g.fillStyle(UI.warn).fillRect(ox + n * CELL, oy + this.puzzle.endY * CELL + 6, 6, 4);

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const cell = this.puzzle.cells[y * n + x];
        if (!cell) continue;
        const cx = ox + x * CELL;
        const cy = oy + y * CELL;
        g.lineStyle(1, 0x445058).strokeRect(cx, cy, CELL, CELL);
        g.lineStyle(3, 0x88e0d0, 0.9);
        const mid = CELL / 2;
        for (const dir of connections(cell)) {
          const [ex, ey] =
            dir === 'N' ? [cx + mid, cy] : dir === 'S' ? [cx + mid, cy + CELL] : dir === 'E' ? [cx + CELL, cy + mid] : [cx, cy + mid];
          g.lineBetween(cx + mid, cy + mid, ex, ey);
        }
        if (x === this.cursorX && y === this.cursorY) {
          g.lineStyle(2, 0xffffff).strokeRect(cx + 1, cy + 1, CELL - 2, CELL - 2);
        }
      }
    }
  }
}
