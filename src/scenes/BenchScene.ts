import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { newGame, setGameState, STARTER_SPECIES, type BenchPicks, type StarterChoice } from '../game/state';
import { GAME_DATA } from '../data/dataview';
import { Controls } from '../input/controls';
import { TYPE_COLORS, UI } from '../ui/colors';
import { fadeTo, FADE_WARM } from './transition';
import { getAudio } from '../game/audio';

interface Choice {
  id: StarterChoice;
  title: string;
  role: string;
  blurb: string;
}

const CHOICES: Choice[] = [
  { id: 'scooter', title: 'THE SCOOTER', role: 'Speed', blurb: 'Fast and fragile. Strikes first, evades, ends fights quick. Can’t sit still.' },
  { id: 'drone', title: 'THE DRONE', role: 'Precision', blurb: 'Eye in the sky. Scans, marks, and strikes from range — folds if cornered. Learns to HOVER.' },
  { id: 'dog', title: 'THE PUP', role: 'Hunter', blurb: 'Sturdy and all-terrain. Well-rounded, runs down fragile things. The forgiving one. It thinks it’s yours.' },
];

export class BenchScene extends Phaser.Scene {
  private controls!: Controls;
  private cursor = 0;
  private preset: 'SAL' | 'WREN' = 'SAL';
  private rows: Phaser.GameObjects.Text[] = [];
  private blurb!: Phaser.GameObjects.Text;
  private picked = false;

  constructor() {
    super('bench');
  }

  init(data: { preset?: 'SAL' | 'WREN' }): void {
    this.preset = data.preset ?? 'SAL';
  }

  preload(): void {
    for (const c of CHOICES) {
      const n = STARTER_SPECIES[c.id];
      if (!this.textures.exists(`ohm_${n}_front_hd`)) this.load.image(`ohm_${n}_front_hd`, `sprites/ohms/${n}_front_hd.png`);
    }
  }

  create(): void {
    fitLegacy(this);
    this.cursor = 0;
    this.picked = false;
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x2a2118);
    this.add.text(120, 10, 'THE BENCH', { fontFamily: 'monospace', fontSize: '12px', color: '#e8c830' }).setOrigin(0.5);
    this.add.text(120, 23, "Eli's three prototypes. Wake the one that wakes back.", { fontFamily: 'monospace', fontSize: '7px', color: '#a89878' }).setOrigin(0.5);

    this.rows = [];
    CHOICES.forEach((c, i) => {
      const n = STARTER_SPECIES[c.id];
      const sp = GAME_DATA.species(n);
      const y = 44 + i * 26;
      if (this.textures.exists(`ohm_${n}_front_hd`)) this.add.image(34, y + 8, `ohm_${n}_front_hd`).setDisplaySize(28, 28).setOrigin(0.5);
      this.add.rectangle(70, y + 6, 6, 6, TYPE_COLORS[sp.type]).setStrokeStyle(1, 0x303030);
      this.add.text(78, y + 2, `${sp.type}`, { fontFamily: 'monospace', fontSize: '7px', color: '#9aa0a8' });
      const row = this.add.text(60, y - 6, `${c.title}  · ${c.role}`, { fontFamily: 'monospace', fontSize: '9px', color: '#f8f8e8' });
      this.rows.push(row);
    });

    this.add.rectangle(120, 138, 240, 40, UI.paper).setStrokeStyle(2, UI.frame);
    this.blurb = this.add.text(8, 124, '', { fontFamily: 'monospace', fontSize: '9px', color: '#2a2018', wordWrap: { width: 224 } });
    this.add.text(120, 154, '↑/↓ choose    A: wake it', { fontFamily: 'monospace', fontSize: '7px', color: '#8a8478' }).setOrigin(0.5);
    this.cameras.main.fadeIn(360, 18, 12, 8);
    getAudio().ensureBgm(this, 'bgm.menu.bench');
    this.refresh();
  }

  private refresh(): void {
    this.rows.forEach((r, i) => {
      r.setColor(i === this.cursor ? '#e8c830' : '#f8f8e8');
      r.setText(`${i === this.cursor ? '▸ ' : '  '}${CHOICES[i]!.title}  · ${CHOICES[i]!.role}`);
    });
    this.blurb.setText(CHOICES[this.cursor]!.blurb);
  }

  override update(): void {
    if (this.picked) return;
    if (this.controls.consume('up')) { this.cursor = (this.cursor + CHOICES.length - 1) % CHOICES.length; this.refresh(); }
    if (this.controls.consume('down')) { this.cursor = (this.cursor + 1) % CHOICES.length; this.refresh(); }
    if (this.controls.consume('a')) {
      this.picked = true;
      const picks: BenchPicks = { starter: CHOICES[this.cursor]!.id };
      setGameState(newGame(this.preset, picks));
      this.blurb.setText('The chassis settles. A sensor blinks open, finds you, and holds.');
      this.time.delayedCall(1500, () => fadeTo(this, 'nameentry', undefined, FADE_WARM, 520));
    }
  }
}
