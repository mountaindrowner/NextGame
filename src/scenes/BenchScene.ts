import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { newGame, setGameState, type BenchPicks, type CoreChoice, type Locomotion } from '../game/state';
import type { Plating } from '../core/stats';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';

interface Slot<T extends string> {
  title: string;
  options: Array<{ id: T; label: string; blurb: string }>;
}

const LOCOMOTION: Slot<Locomotion> = {
  title: 'LOCOMOTION',
  options: [
    { id: 'treads', label: 'Treads', blurb: 'sturdy — sig. move RUMBLE OVER' },
    { id: 'legs', label: 'Legs', blurb: 'agile — sig. move CLOSE THE GAP' },
    { id: 'hover', label: 'Hover', blurb: 'floating — sig. move STATIC DRIFT' },
  ],
};
const CORE: Slot<CoreChoice> = {
  title: 'CORE',
  options: [
    { id: 'furnace', label: 'Furnace Core', blurb: 'THERM — runs hot, hits hot' },
    { id: 'dynamo', label: 'Dynamo Core', blurb: 'VOLT — fast current, fast feet' },
    { id: 'reservoir', label: 'Reservoir Core', blurb: 'COOLANT — outlasts trouble' },
  ],
};
const PLATING: Slot<Plating> = {
  title: 'PLATING',
  options: [
    { id: 'heavy', label: 'Heavy Plating', blurb: '+ARMOR +SHIELDING, -CLOCK' },
    { id: 'light', label: 'Light Plating', blurb: '+CLOCK, -ARMOR' },
    { id: 'factory', label: 'Factory Plating', blurb: 'balanced, no lean' },
  ],
};

export class BenchScene extends Phaser.Scene {
  private controls!: Controls;
  private cursor = 0;
  private slotIndex = 0;
  private picks: Partial<BenchPicks> = {};
  private preset: 'SAL' | 'WREN' = 'SAL';
  private lines: Phaser.GameObjects.Text[] = [];
  private header!: Phaser.GameObjects.Text;
  private blurb!: Phaser.GameObjects.Text;

  constructor() {
    super('bench');
  }

  init(data: { preset?: 'SAL' | 'WREN' }): void {
    this.preset = data.preset ?? 'SAL';
  }

  create(): void {
    fitLegacy(this);
    this.slotIndex = 0;
    this.cursor = 0;
    this.picks = {};
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x383028);
    this.add.text(120, 12, 'THE BENCH', { fontFamily: 'monospace', fontSize: '12px', color: '#e8c830' }).setOrigin(0.5);
    this.header = this.add.text(120, 32, '', { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }).setOrigin(0.5);
    this.add.rectangle(120, 134, 240, 52, UI.paper).setStrokeStyle(2, UI.frame);
    this.blurb = this.add.text(8, 118, '', { fontFamily: 'monospace', fontSize: '9px', color: '#303030', wordWrap: { width: 224 } });
    this.showSlot();
  }

  private currentSlot(): Slot<string> {
    return ([LOCOMOTION, CORE, PLATING] as Slot<string>[])[this.slotIndex] ?? LOCOMOTION;
  }

  private showSlot(): void {
    for (const l of this.lines) l.destroy();
    this.lines = [];
    const slot = this.currentSlot();
    this.header.setText(`pick ${this.slotIndex + 1}/3 — ${slot.title}`);
    slot.options.forEach((o, i) => {
      this.lines.push(
        this.add.text(70, 52 + i * 16, o.label, { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }),
      );
      void i;
    });
    this.cursor = 0;
    this.refresh();
  }

  private refresh(): void {
    const slot = this.currentSlot();
    this.lines.forEach((l, i) => l.setColor(i === this.cursor ? '#e8c830' : '#f8f8e8'));
    this.blurb.setText(slot.options[this.cursor]?.blurb ?? '');
  }

  override update(): void {
    if (this.controls.consume('up')) {
      this.cursor = (this.cursor + 2) % 3;
      this.refresh();
    }
    if (this.controls.consume('down')) {
      this.cursor = (this.cursor + 1) % 3;
      this.refresh();
    }
    if (this.controls.consume('b') && this.slotIndex > 0) {
      this.slotIndex -= 1;
      this.showSlot();
    }
    if (!this.controls.consume('a')) return;
    const picked = this.currentSlot().options[this.cursor]?.id;
    if (!picked) return;
    if (this.slotIndex === 0) this.picks.locomotion = picked as Locomotion;
    if (this.slotIndex === 1) this.picks.core = picked as CoreChoice;
    if (this.slotIndex === 2) {
      this.picks.plating = picked as Plating;
      const state = newGame(this.preset, this.picks as BenchPicks);
      setGameState(state);
      const starter = state.party[0];
      this.blurb.setText(`${starter?.name ?? 'It'} whirs awake on the Bench. It chooses a chirp just for you.`);
      this.time.delayedCall(2200, () => this.scene.start('fieldhd', { mapId: 'ohmstead' }));
      this.slotIndex = 3; // stop input
      return;
    }
    this.slotIndex += 1;
    this.showSlot();
  }
}
