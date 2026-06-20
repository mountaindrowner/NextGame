import Phaser from 'phaser';
import { fitLegacy, LEGACY_H, LEGACY_W } from './legacy';
import { Controls } from '../input/controls';
import { getAudio } from '../game/audio';
import { GAME_DATA } from '../data/dataview';
import { getGameState, hasGameState } from '../game/state';
import { UI } from '../ui/colors';
import { fadeTo, FADE_WARM } from './transition';

const ROWS = ['ABCDEFG', 'HIJKLMN', 'OPQRSTU', 'VWXYZ_<'] as const; // _ = space, < = backspace
const MAX = 12;

/**
 * Name the starter (scene `nameentry`) — the canon "it wakes and chooses a
 * chirp" beat. A compact on-screen keyboard (works on touch + keyboard): arrows
 * move, A types, B backspaces, START confirms. Blank keeps the species name.
 * Shows the freshly-built Ohm. Hands off to Ohmstead with the tutorial flag.
 */
export class NameEntryScene extends Phaser.Scene {
  private controls!: Controls;
  private r = 0;
  private c = 0;
  private name = '';
  private speciesName = 'It';
  private nameText!: Phaser.GameObjects.Text;
  private keyTexts: Phaser.GameObjects.Text[][] = [];

  constructor() {
    super('nameentry');
  }

  preload(): void {
    if (!hasGameState()) return;
    const n = getGameState().party[0]?.speciesNum;
    if (n && !this.textures.exists(`ohm_${n}_front_hd`)) this.load.image(`ohm_${n}_front_hd`, `sprites/ohms/${n}_front_hd.png`);
  }

  create(): void {
    fitLegacy(this);
    this.r = 0;
    this.c = 0;
    this.name = '';
    this.controls = new Controls(this);
    this.add.rectangle(LEGACY_W / 2, LEGACY_H / 2, LEGACY_W, LEGACY_H, 0x2a2118);

    const starter = hasGameState() ? getGameState().party[0] : undefined;
    this.speciesName = starter ? GAME_DATA.species(starter.speciesNum).name : 'It';

    // the new Ohm, awake on the bench
    if (starter && this.textures.exists(`ohm_${starter.speciesNum}_front_hd`)) {
      this.add.image(40, 56, `ohm_${starter.speciesNum}_front_hd`).setDisplaySize(56, 56).setOrigin(0.5);
    }
    this.add.text(120, 14, 'IT CHOOSES A CHIRP.', { fontFamily: 'monospace', fontSize: '10px', color: '#ffd27a' }).setOrigin(0.5);
    this.add.text(120, 28, 'Name your Ohm:', { fontFamily: 'monospace', fontSize: '8px', color: '#d8d0c0' }).setOrigin(0.5);
    this.add.rectangle(120, 46, 120, 16, 0x14100c).setStrokeStyle(1, UI.frame);
    this.nameText = this.add.text(120, 46, '', { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }).setOrigin(0.5);
    this.add.text(120, 60, `(blank keeps "${this.speciesName}")`, { fontFamily: 'monospace', fontSize: '7px', color: '#8a8478' }).setOrigin(0.5);

    // the keyboard grid
    const x0 = 78;
    const y0 = 78;
    ROWS.forEach((row, r) => {
      const line: Phaser.GameObjects.Text[] = [];
      [...row].forEach((ch, c) => {
        const label = ch === '_' ? '␣' : ch === '<' ? '⌫' : ch;
        line.push(this.add.text(x0 + c * 12, y0 + r * 13, label, { fontFamily: 'monospace', fontSize: '10px', color: '#f8f8e8' }).setOrigin(0.5));
      });
      this.keyTexts.push(line);
    });
    this.add.text(120, 150, 'A: type   B: erase   START: done', { fontFamily: 'monospace', fontSize: '7px', color: '#8a8478' }).setOrigin(0.5);
    this.refresh();
  }

  private refresh(): void {
    this.keyTexts.forEach((line, r) => line.forEach((t, c) => {
      const here = r === this.r && c === this.c;
      t.setColor(here ? '#ffd27a' : '#f8f8e8');
      t.setFontStyle(here ? 'bold' : 'normal');
    }));
    this.nameText.setText(`${this.name}${this.name.length < MAX ? '_' : ''}`);
  }

  private type(ch: string): void {
    if (ch === '<') {
      this.name = this.name.slice(0, -1);
    } else if (ch === '_') {
      if (this.name.length > 0 && this.name.length < MAX && !this.name.endsWith(' ')) this.name += ' ';
    } else if (this.name.length < MAX) {
      this.name += ch;
    }
    this.refresh();
  }

  private confirm(): void {
    const final = this.name.trim();
    if (hasGameState()) {
      const b = getGameState().party[0];
      if (b) b.name = final.length > 0 ? final : this.speciesName;
    }
    fadeTo(this, 'fieldhd', { mapId: 'ohmstead', intro: true }, FADE_WARM, 480);
  }

  override update(): void {
    const row = ROWS[this.r]!;
    if (this.controls.consume('up')) { this.r = (this.r + ROWS.length - 1) % ROWS.length; this.c = Math.min(this.c, ROWS[this.r]!.length - 1); getAudio().cursor(); this.refresh(); }
    if (this.controls.consume('down')) { this.r = (this.r + 1) % ROWS.length; this.c = Math.min(this.c, ROWS[this.r]!.length - 1); getAudio().cursor(); this.refresh(); }
    if (this.controls.consume('left')) { this.c = (this.c + row.length - 1) % row.length; getAudio().cursor(); this.refresh(); }
    if (this.controls.consume('right')) { this.c = (this.c + 1) % row.length; getAudio().cursor(); this.refresh(); }
    if (this.controls.consume('a')) { getAudio().cursor(); this.type(row[this.c]!); }
    if (this.controls.consume('b')) { getAudio().back(); this.type('<'); }
    if (this.controls.consume('start')) { getAudio().select(); this.confirm(); }
  }
}
