import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { STAT_KEYS } from '../core/defs';
import { applyItemToBattler } from '../core/items';
import { pendingEvolutions } from '../core/evolution';
import { xpProgress } from '../core/stats';
import { GAME_DATA } from '../data/dataview';
import { ITEMS_BY_ID } from '../data/items';
import { SPECIES } from '../data/species';
import { getGameState } from '../game/state';
import { getAudio } from '../game/audio';
import { browserStorage, SaveSlots, SLOT_COUNT } from '../save/save';
import { Controls } from '../input/controls';
import { TYPE_COLORS, UI } from '../ui/colors';

type Mode = 'hub' | 'party' | 'detail' | 'manifest' | 'bag' | 'usetarget' | 'save' | 'settings';

const HUB = ['PARTY', 'MANIFEST', 'BAG', 'MAP', 'SETTINGS', 'SAVE', 'CLOSE'] as const;
const STAT_LABEL: Record<string, string> = {
  integrity: 'INTEG',
  output: 'OUTPUT',
  armor: 'ARMOR',
  surge: 'SURGE',
  shielding: 'SHIELD',
  clock: 'CLOCK',
};

/** Out-of-battle hub (GDD §11): inspect party, the Manifest, the bag; save
 * anywhere. Launched as a pause overlay over the overworld. */
export class MenuScene extends Phaser.Scene {
  private controls!: Controls;
  private mode: Mode = 'hub';
  private cursor = 0;
  private detailIndex = 0;
  private dynamic: Phaser.GameObjects.GameObject[] = [];
  private slots = new SaveSlots(browserStorage());

  constructor() {
    super('menu');
  }

  private launcher = 'overworld';

  init(data: { from?: string }): void {
    this.launcher = data?.from ?? 'overworld';
  }

  create(): void {
    fitLegacy(this);
    this.mode = 'hub';
    this.cursor = 0;
    this.controls = new Controls(this);
    this.redraw();
  }

  // ---- input ---------------------------------------------------------------

  override update(): void {
    const count = this.optionCount();
    if (count > 0) {
      if (this.controls.consume('up')) {
        this.cursor = (this.cursor + count - 1) % count;
        this.redraw();
      }
      if (this.controls.consume('down')) {
        this.cursor = (this.cursor + 1) % count;
        this.redraw();
      }
    }
    if (this.mode === 'settings') {
      if (this.controls.consume('left')) this.adjustSetting(-1);
      if (this.controls.consume('right')) this.adjustSetting(1);
    }
    if (this.controls.consume('b') || this.controls.consume('start')) {
      this.back();
      return;
    }
    if (this.controls.consume('a')) this.select();
  }

  /** Adjust the focused audio setting: volumes ±0.1, mute toggles. */
  private adjustSetting(dir: number): void {
    const a = getGameState().audio;
    if (this.cursor === 0) {
      a.musicVolume = Math.max(0, Math.min(1, Math.round((a.musicVolume + dir * 0.1) * 10) / 10));
      getAudio().setMusicVolume(a.musicVolume);
    } else if (this.cursor === 1) {
      a.sfxVolume = Math.max(0, Math.min(1, Math.round((a.sfxVolume + dir * 0.1) * 10) / 10));
      getAudio().setSfxVolume(a.sfxVolume);
      getAudio().playOneShot('sting.quest_update'); // a blip so SFX volume is audible while tuning
    } else {
      a.muted = !a.muted;
      getAudio().setMuted(a.muted);
    }
    this.redraw();
  }

  private optionCount(): number {
    const state = getGameState();
    switch (this.mode) {
      case 'hub':
        return HUB.length;
      case 'party':
        return state.party.length;
      case 'manifest':
        return SPECIES.length;
      case 'bag':
        return Math.max(1, this.bagEntries().length);
      case 'usetarget':
        return Math.max(1, state.party.length);
      case 'save':
        return SLOT_COUNT;
      case 'settings':
        return 3;
      case 'detail':
        return 0;
    }
  }

  private back(): void {
    if (this.mode === 'hub') {
      this.scene.stop();
      this.scene.resume(this.launcher);
      return;
    }
    if (this.mode === 'usetarget') {
      this.mode = 'bag';
      this.cursor = 0;
      this.redraw();
      return;
    }
    if (this.mode === 'detail') {
      this.mode = 'party';
      this.cursor = this.detailIndex;
    } else {
      this.mode = 'hub';
      this.cursor = HUB.indexOf(this.modeHubLabel());
    }
    this.redraw();
  }

  private modeHubLabel(): (typeof HUB)[number] {
    if (this.mode === 'party') return 'PARTY';
    if (this.mode === 'manifest') return 'MANIFEST';
    if (this.mode === 'bag') return 'BAG';
    if (this.mode === 'save') return 'SAVE';
    if (this.mode === 'settings') return 'SETTINGS';
    return 'CLOSE';
  }

  private select(): void {
    if (this.mode === 'hub') {
      const pick = HUB[this.cursor];
      if (!pick || pick === 'CLOSE') {
        this.back();
        return;
      }
      if (pick === 'MAP') {
        this.scene.launch('worldmap');
        this.scene.pause(); // worldmap resumes us on B (or replaces us on travel)
        return;
      }
      this.mode = pick.toLowerCase() as Mode;
      this.cursor = 0;
    } else if (this.mode === 'party') {
      this.detailIndex = this.cursor;
      this.mode = 'detail';
    } else if (this.mode === 'bag') {
      this.useBagItem();
      return;
    } else if (this.mode === 'usetarget') {
      this.applyToTarget();
      return;
    } else if (this.mode === 'save') {
      this.slots.save(this.cursor, getGameState());
      getAudio().playOneShot('jingle.save');
      this.flash('Progress saved. Stay current.');
    }
    this.redraw();
  }

  private useItemId = '';

  /** A on a bag item: heal/cure/revive → pick a target; core → evolve; etc. */
  private useBagItem(): void {
    const sel = this.bagEntries()[this.cursor]?.[0];
    const def = sel ? ITEMS_BY_ID.get(sel) : undefined;
    if (!sel || !def) return;
    if (def.kind === 'heal' || def.kind === 'revive' || def.kind === 'cure') {
      this.useItemId = sel;
      this.mode = 'usetarget';
      this.cursor = 0;
      this.redraw();
      return;
    }
    if (def.kind === 'evolution') {
      this.evolveFromMenu(sel);
      return;
    }
    if (def.kind === 'field') {
      const state = getGameState();
      state.flags['dampener'] = !state.flags['dampener'];
      this.flash(state.flags['dampener'] ? 'Signal Dampener on — wild Ohms steer clear.' : 'Signal Dampener off.');
      return;
    }
    this.flash('Storage Nodes are spent in battle, to recalibrate a weakened Ohm.');
  }

  /** Apply the held heal/cure/revive to the chosen party member. */
  private applyToTarget(): void {
    const state = getGameState();
    const target = state.party[this.cursor];
    const def = ITEMS_BY_ID.get(this.useItemId);
    if (!target || !def || (state.bag[this.useItemId] ?? 0) <= 0) {
      this.mode = 'bag';
      this.cursor = 0;
      this.redraw();
      return;
    }
    const res = applyItemToBattler(def, target);
    if (res.ok) state.bag[this.useItemId] = (state.bag[this.useItemId] ?? 1) - 1;
    this.flash(res.message);
    if ((state.bag[this.useItemId] ?? 0) <= 0) {
      this.mode = 'bag';
      this.cursor = 0;
    }
    this.redraw();
  }

  /** A on a Core: if any party Ohm is at its threshold, run the evolution. */
  private evolveFromMenu(itemId: string): void {
    const state = getGameState();
    const offers = pendingEvolutions(state.party, state.bag, GAME_DATA).filter((o) => o.item === itemId);
    if (offers.length === 0) {
      this.flash('No Ohm is ready to reconfigure with that core.');
      return;
    }
    this.scene.stop(this.launcher); // the EvolutionScene restarts it on finish
    this.scene.start('evolution', { offers, returnScene: this.launcher });
  }

  // ---- rendering -----------------------------------------------------------

  private clearDynamic(): void {
    for (const o of this.dynamic) o.destroy();
    this.dynamic = [];
  }

  private panel(): void {
    this.dynamic.push(this.add.rectangle(120, 80, 236, 152, UI.paper).setStrokeStyle(2, UI.frame));
  }

  private label(x: number, y: number, text: string, opts: { hl?: boolean; color?: string; size?: number } = {}): Phaser.GameObjects.Text {
    const t = this.add
      .text(x, y, text, {
        fontFamily: 'monospace',
        fontSize: `${opts.size ?? 8}px`,
        color: opts.color ?? '#303030',
        fontStyle: opts.hl ? 'bold' : 'normal',
      })
      .setDepth(2);
    this.dynamic.push(t);
    return t;
  }

  private chip(x: number, y: number, color: number): void {
    this.dynamic.push(this.add.rectangle(x, y, 6, 6, color).setStrokeStyle(1, 0x303030).setDepth(2));
  }

  private redraw(): void {
    this.clearDynamic();
    this.panel();
    if (this.mode === 'hub') this.drawHub();
    else if (this.mode === 'party') this.drawParty();
    else if (this.mode === 'detail') this.drawDetail();
    else if (this.mode === 'manifest') this.drawManifest();
    else if (this.mode === 'bag') this.drawBag();
    else if (this.mode === 'usetarget') this.drawUseTarget();
    else if (this.mode === 'save') this.drawSave();
    else if (this.mode === 'settings') this.drawSettings();
  }

  private drawSettings(): void {
    const a = getGameState().audio;
    this.label(16, 12, 'SETTINGS', { hl: true });
    const rows: Array<[string, string]> = [
      ['MUSIC', `${this.bar(Math.round(a.musicVolume * 10), 10)} ${Math.round(a.musicVolume * 100)}%`],
      ['SFX', `${this.bar(Math.round(a.sfxVolume * 10), 10)} ${Math.round(a.sfxVolume * 100)}%`],
      ['MUTE', a.muted ? 'ON' : 'OFF'],
    ];
    rows.forEach(([name, val], i) => {
      const here = i === this.cursor;
      this.label(24, 40 + i * 18, `${here ? '>' : ' '}${name}`, { hl: here });
      this.label(86, 40 + i * 18, val, { color: here ? '#303030' : '#586068' });
    });
    this.label(16, 150, 'left/right: adjust   B: back');
  }

  private drawUseTarget(): void {
    const def = ITEMS_BY_ID.get(this.useItemId);
    this.label(16, 12, `USE ${def?.name ?? ''}`, { hl: true });
    this.label(120, 12, 'on which Ohm?', { color: '#586068' });
    const state = getGameState();
    state.party.forEach((b, i) => {
      const y = 36 + i * 20;
      const here = i === this.cursor;
      const sp = GAME_DATA.species(b.speciesNum);
      this.label(20, y, `${here ? '>' : ' '}${b.name} Lv${b.level}`, { hl: here });
      this.chip(150, y + 4, TYPE_COLORS[sp.type]);
      const flags = `${b.integrity <= 0 ? ' DOWN' : ''}${b.status ? ` ${b.status}` : ''}`;
      this.label(20, y + 9, `  ${this.bar(b.integrity, b.stats.integrity)} ${b.integrity}/${b.stats.integrity}${flags}`);
    });
    this.label(16, 150, 'A: use   B: back');
  }

  private drawHub(): void {
    const state = getGameState();
    this.label(16, 12, 'OHMFRONT', { hl: true });
    this.label(120, 12, `${state.credits} cr   ${state.patches.length}/8 Patches`);
    HUB.forEach((item, i) => this.label(28, 36 + i * 16, `${i === this.cursor ? '>' : ' '}${item}`, { hl: i === this.cursor }));
  }

  private drawParty(): void {
    const state = getGameState();
    this.label(16, 12, 'PARTY', { hl: true });
    state.party.forEach((b, i) => {
      const y = 34 + i * 22;
      const sp = GAME_DATA.species(b.speciesNum);
      this.label(20, y, `${i === this.cursor ? '>' : ' '}${b.name}`, { hl: i === this.cursor });
      this.chip(150, y + 4, TYPE_COLORS[sp.type]);
      this.label(160, y, sp.type, { size: 8 });
      this.label(20, y + 9, `Lv${b.level}  ${this.bar(b.integrity, b.stats.integrity)} ${b.integrity}/${b.stats.integrity}`);
    });
    this.label(16, 148, 'A: details   B: back');
  }

  private drawDetail(): void {
    const b = getGameState().party[this.detailIndex];
    if (!b) return;
    const sp = GAME_DATA.species(b.speciesNum);
    this.label(16, 12, `${b.name}`, { hl: true });
    this.chip(96, 16, TYPE_COLORS[sp.type]);
    this.label(106, 12, `${sp.type}  Lv${b.level}`);
    this.label(150, 12, sp.object, { color: '#586068' });

    STAT_KEYS.forEach((key, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const val = key === 'integrity' ? `${b.integrity}/${b.stats.integrity}` : `${b.stats[key]}`;
      this.label(20 + col * 110, 34 + row * 12, `${STAT_LABEL[key]} ${val}`);
    });

    const { into, span } = xpProgress(sp.growth, b.level, b.xp);
    this.label(20, 74, `XP ${this.bar(into, span)} ${span === 0 ? 'MAX' : `${span - into} to next`}`);
    this.label(20, 88, `Passive: ${sp.passive}`);

    this.label(20, 104, 'MOVES', { hl: true });
    b.moves.forEach((m, i) => {
      const def = GAME_DATA.move(m.id);
      this.label(24, 116 + i * 9, `${def.name}  ${def.type}  PP ${m.pp}/${m.maxPp}`);
    });
    this.label(16, 152, 'B: back');
  }

  private drawManifest(): void {
    const state = getGameState();
    const freed = new Set(state.manifest.freed);
    const seen = new Set(state.manifest.seen);
    this.label(16, 12, 'THE MANIFEST', { hl: true });
    this.label(120, 12, `FREED ${freed.size}  SEEN ${seen.size}  / 150`);

    const rows = 11;
    const start = Math.max(0, Math.min(this.cursor - 5, SPECIES.length - rows));
    for (let r = 0; r < rows; r++) {
      const idx = start + r;
      const sp = SPECIES[idx];
      if (!sp) break;
      const y = 30 + r * 10;
      const here = idx === this.cursor;
      const num = String(sp.num).padStart(3, '0');
      if (freed.has(sp.num)) {
        this.chip(20, y + 4, TYPE_COLORS[sp.type]);
        this.label(28, y, `${here ? '>' : ' '}${num} ${sp.name}  ${sp.type}  ●FREED`, { hl: here });
      } else if (seen.has(sp.num)) {
        this.chip(20, y + 4, 0x888888);
        this.label(28, y, `${here ? '>' : ' '}${num} ${sp.name}  ${sp.type}  seen`, { hl: here, color: '#586068' });
      } else {
        this.label(28, y, `${here ? '>' : ' '}${num} -----------`, { hl: here, color: '#9098a0' });
      }
    }
    this.label(16, 150, 'up/down: scroll   B: back');
  }

  private bagEntries(): Array<[string, number]> {
    return Object.entries(getGameState().bag).filter(([, n]) => n > 0);
  }

  private drawBag(): void {
    this.label(16, 12, 'BAG', { hl: true });
    const entries = this.bagEntries();
    if (entries.length === 0) {
      this.label(28, 40, 'Empty.');
      this.label(16, 150, 'B: back');
      return;
    }
    entries.forEach(([id, n], i) => {
      const item = ITEMS_BY_ID.get(id);
      const here = i === this.cursor;
      this.label(24, 32 + i * 11, `${here ? '>' : ' '}${item?.name ?? id}  x${n}`, { hl: here });
    });
    const sel = entries[this.cursor]?.[0];
    const item = sel ? ITEMS_BY_ID.get(sel) : undefined;
    if (item) this.label(16, 140, this.bagBlurb(item.kind), { color: '#586068' });
    this.label(16, 150, 'A: use   B: back');
  }

  private bagBlurb(kind: string): string {
    switch (kind) {
      case 'node':
        return 'Spent to attempt the recalibration hack.';
      case 'heal':
        return 'Restores INTEGRITY.';
      case 'revive':
        return 'Jolts a downed Ohm back online.';
      case 'cure':
        return 'Clears a fault condition.';
      case 'evolution':
        return 'Resonance to reconfigure an Ohm at its threshold.';
      case 'field':
        return 'Used out in the field.';
      default:
        return '';
    }
  }

  private drawSave(): void {
    this.label(16, 12, 'SAVE', { hl: true });
    for (let s = 0; s < SLOT_COUNT; s++) {
      const here = s === this.cursor;
      this.label(24, 36 + s * 16, `${here ? '>' : ' '}SLOT ${s + 1}  ${this.slots.summary(s) ?? '— empty —'}`, { hl: here });
    }
    this.label(16, 150, 'A: save here   B: back');
  }

  private flash(text: string): void {
    const t = this.label(16, 130, text, { color: '#40a050' });
    this.time.delayedCall(1200, () => t.destroy());
  }

  private bar(current: number, max: number): string {
    const cells = 10;
    const filled = max <= 0 ? cells : Math.round((current / Math.max(1, max)) * cells);
    return `[${'#'.repeat(filled)}${'-'.repeat(cells - filled)}]`;
  }
}
