import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import type { BattleEvent, Battler, Side } from '../core/battle/contract';
import type { StatusName } from '../core/defs';
import { Battle } from '../core/battle/engine';
import { pendingEvolutions } from '../core/evolution';
import { GAME_DATA } from '../data/dataview';
import { hasBack, hasFront } from '../data/sprite-manifest';
import { hasHdBack, hasHdFront } from '../data/sprite-manifest-hd';
import { ITEMS_BY_ID } from '../data/items';
import { getGameState } from '../game/state';
import { getAudio } from '../game/audio';
import { bgmForBattle, inferBattleType, victoryJingleFor, type BattleType } from '../data/audio';
import { Controls } from '../input/controls';
import { TYPE_COLORS, UI } from '../ui/colors';

interface BattleInit {
  kind: 'wild' | 'trainer';
  foes: Battler[];
  foeName?: string;
  seed: number;
  /** scene to return to when the battle ends (default the old overworld) */
  returnScene?: string;
  /** a flag set true in game state on a trainer victory (so it stays beaten) */
  onVictoryFlag?: string;
  /** explicit music tier (warden/rival/boss/legendary/…); inferred from foeName otherwise */
  battleType?: BattleType;
}

type Mode = 'anim' | 'command' | 'moves' | 'party' | 'pack' | 'puzzle' | 'over';

const COMMANDS = ['FIGHT', 'SWAP', 'PACK', 'RUN'] as const;

/** Status set-messages that read like English, not like a flag name. */
const STATUS_VERB: Record<StatusName, string> = {
  OVERHEAT: 'overheats!',
  SHORT: 'shorts out!',
  CORRUPTED: 'is corrupted!',
  STANDBY: 'drops to standby!',
  LOCKED: 'freezes up!',
  GLITCHED: 'glitches out!',
};
const STAT_LABEL: Record<string, string> = {
  integrity: 'INTEGRITY', output: 'OUTPUT', armor: 'ARMOR', surge: 'SURGE',
  shielding: 'SHIELDING', clock: 'CLOCK', accuracy: 'accuracy', evasion: 'evasion',
};
const FOE_X = 176;
const FOE_Y = 44;
const PLAYER_X = 58;
const PLAYER_Y = 96;
const BATTLE_SPRITE_PX = 60; // on-screen footprint in the 240-layout (zoomed ×2)

export class BattleScene extends Phaser.Scene {
  private battle!: Battle;
  private controls!: Controls;
  private queue: BattleEvent[] = [];
  private mode: Mode = 'anim';
  private cursor = 0;
  private text!: Phaser.GameObjects.Text;
  private menuTexts: Phaser.GameObjects.Text[] = [];
  private playerSprite!: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;
  private foeSprite!: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;
  private foeName!: Phaser.GameObjects.Text;
  private playerName!: Phaser.GameObjects.Text;
  private playerHpText!: Phaser.GameObjects.Text;
  private foeBar!: { bg: Phaser.GameObjects.Rectangle; fill: Phaser.GameObjects.Rectangle };
  private playerBar!: { bg: Phaser.GameObjects.Rectangle; fill: Phaser.GameObjects.Rectangle };
  private outcome: string | undefined;
  private init_!: BattleInit;

  private static readonly BAR_W = 78; // inner HP-bar width in the 240-layout

  constructor() {
    super('battle');
  }

  init(data: BattleInit): void {
    this.init_ = data;
  }

  preload(): void {
    const state = getGameState();
    const nums = new Set<number>([
      ...this.init_.foes.map((f) => f.speciesNum),
      ...state.party.map((p) => p.speciesNum),
    ]);
    for (const n of nums) {
      // prefer HD (96px), fall back to the GBA set
      if (hasHdFront(n)) this.load.image(`ohm_${n}_front_hd`, `sprites/ohms/${n}_front_hd.png`);
      else if (hasFront(n)) this.load.image(`ohm_${n}_front`, `sprites/ohms/${n}_front.png`);
      if (hasHdBack(n)) this.load.image(`ohm_${n}_back_hd`, `sprites/ohms/${n}_back_hd.png`);
      else if (hasBack(n)) this.load.image(`ohm_${n}_back`, `sprites/ohms/${n}_back.png`);
    }
    const type = this.init_.battleType ?? inferBattleType(this.init_.kind, this.init_.foeName);
    getAudio().loadTracks(this, [bgmForBattle(this.init_), victoryJingleFor(type)]);
  }

  create(): void {
    fitLegacy(this);
    const state = getGameState();
    this.battle = new Battle(
      { kind: this.init_.kind, seed: this.init_.seed, party: state.party, foes: this.init_.foes, foeName: this.init_.foeName },
      GAME_DATA,
    );
    this.controls = new Controls(this);

    this.add.rectangle(120, 56, 240, 112, 0xd8c8a0); // field
    this.add.rectangle(120, 134, 240, 52, UI.paper).setStrokeStyle(2, UI.frame);

    this.foeSprite = this.makeOhmSprite(this.battle.foe.speciesNum, 'front', 300, FOE_Y); // slides in
    this.tweens.add({ targets: this.foeSprite, x: FOE_X, duration: 350, ease: 'Cubic.Out' });
    this.playerSprite = this.makeOhmSprite(this.battle.active.speciesNum, 'back', -60, PLAYER_Y);

    // framed name + graphical HP boxes (foe top-left, player above the text box)
    this.foeName = this.hudBox(5, 5, 100);
    this.foeBar = this.makeBar(45, 22, BattleScene.BAR_W + 2);
    this.playerName = this.hudBox(133, 80, 100);
    this.playerBar = this.makeBar(173, 97, BattleScene.BAR_W + 2);
    this.playerHpText = this.add.text(214, 92, '', { fontFamily: 'monospace', fontSize: '8px', color: '#303030' }).setOrigin(1, 0);
    this.setBar('foe', this.battle.foe.integrity, this.battle.foe.stats.integrity, false);
    this.setBar('player', this.battle.active.integrity, this.battle.active.stats.integrity, false);

    this.text = this.add.text(8, 116, '', { fontFamily: 'monospace', fontSize: '9px', color: '#303030', wordWrap: { width: 224 } });

    this.queue.push(...this.battle.intro());
    this.mode = 'anim';
    this.pump();

    getAudio().playBgm(bgmForBattle(this.init_)); // wild/trainer/warden/militant/… per the foe
    this.input.keyboard?.on('keydown-M', () => getAudio().toggleMute());
  }

  // ---- event pump --------------------------------------------------------

  private pump(): void {
    const ev = this.queue.shift();
    if (!ev) {
      this.refreshNames();
      if (this.outcome) this.finish();
      else this.showCommands();
      return;
    }
    this.refreshNames();
    const next = (delay = 450): void => {
      this.time.delayedCall(delay, () => this.pump());
    };
    switch (ev.type) {
      case 'message':
        this.say(ev.text);
        next(700);
        break;
      case 'moveUsed':
        this.say(`${ev.name} used ${ev.moveName}!`);
        this.lunge(ev.side);
        next(550);
        break;
      case 'switchIn': {
        if (ev.side === 'player') {
          this.playerSprite.destroy();
          this.playerSprite = this.makeOhmSprite(ev.speciesNum, 'back', -60, PLAYER_Y);
          this.tweens.add({ targets: this.playerSprite, x: PLAYER_X, duration: 350, ease: 'Cubic.Out' });
        } else if (this.battle.setup.kind === 'trainer') {
          this.foeSprite.destroy();
          this.foeSprite = this.makeOhmSprite(ev.speciesNum, 'front', 300, FOE_Y);
          this.tweens.add({ targets: this.foeSprite, x: FOE_X, duration: 350, ease: 'Cubic.Out' });
        }
        this.setBar(ev.side, ev.integrity, ev.max, false);
        next(380);
        break;
      }
      case 'damage': {
        const strong = ev.crit || ev.effectiveness > 1;
        this.setBar(ev.side, ev.integrity, ev.max, true);
        this.hitFlash(ev.side, strong);
        this.popDamage(ev.side, ev.amount, ev.crit);
        if (ev.crit) this.say('A critical hit!');
        else if (ev.effectiveness > 1) this.say("It's super effective!");
        else if (ev.effectiveness < 1) this.say("It's not very effective…");
        next(strong ? 560 : 460);
        break;
      }
      case 'heal':
      case 'stageChange':
      case 'statusSet':
      case 'statusCleared':
      case 'xp':
        if (ev.type === 'heal') this.setBar(ev.side, ev.integrity, ev.max, true);
        if (ev.type === 'statusSet') this.say(`${this.nameOf(ev.side)} ${STATUS_VERB[ev.status]}`);
        if (ev.type === 'statusCleared') this.say(`${this.nameOf(ev.side)} shook it off.`);
        if (ev.type === 'xp') this.say(`${ev.name} gained ${ev.amount} XP.`);
        if (ev.type === 'stageChange') this.say(`${this.statLabel(ev.stat)} ${ev.delta > 0 ? 'rose' : 'fell'}${Math.abs(ev.delta) > 1 ? ' sharply' : ''}!`);
        next(420);
        break;
      case 'levelUp':
        this.say(`${ev.name} reached Lv${ev.level}!`);
        getAudio().playOneShot('jingle.levelup');
        next(600);
        break;
      case 'moveLearned':
        this.say(`${ev.name} learned ${ev.moveName}!`);
        next(600);
        break;
      case 'salvage': {
        const state = getGameState();
        state.bag[ev.itemId] = (state.bag[ev.itemId] ?? 0) + 1;
        getAudio().playOneShot('jingle.obtain_item');
        this.say(`Salvage recovered: ${ITEMS_BY_ID.get(ev.itemId)?.name ?? ev.itemId}.`);
        next(600);
        break;
      }
      case 'faint': {
        const target = ev.side === 'player' ? this.playerSprite : this.foeSprite;
        this.tweens.add({ targets: target, y: target.y + 20, alpha: 0, duration: 300 });
        this.say(`${ev.name} shut down!`);
        next(700);
        break;
      }
      case 'captureBudget':
        this.mode = 'puzzle';
        this.scene.launch('puzzle', {
          timerSeconds: ev.timerSeconds,
          gridSize: ev.gridSize,
          decoys: ev.decoys,
          onDone: (success: boolean) => {
            this.scene.stop('puzzle');
            this.queue.push(...this.battle.resolveCapture(success));
            this.mode = 'anim';
            this.pump();
          },
        });
        break;
      case 'captureSuccess': {
        const state = getGameState();
        const captured = this.battle.foe;
        if (!state.manifest.freed.includes(captured.speciesNum)) state.manifest.freed.push(captured.speciesNum);
        if (state.party.length < 3) state.party.push(captured);
        else state.garage.push(captured);
        next(400);
        break;
      }
      case 'captureFail':
      case 'rageFlee':
      case 'fled':
        next(350);
        break;
      case 'end':
        this.outcome = ev.outcome;
        next(250);
        break;
    }
  }

  private finish(): void {
    this.mode = 'over';
    const state = getGameState();
    const back = this.init_.returnScene ?? 'overworld';
    if (this.outcome === 'victory') {
      getAudio().stopBgm(); // cut the battle theme and ring the fanfare for this tier
      getAudio().playOneShot(victoryJingleFor(this.init_.battleType ?? inferBattleType(this.init_.kind, this.init_.foeName)));
    } else if (this.outcome === 'captured') {
      getAudio().stopBgm();
      getAudio().playOneShot('jingle.capture_success');
    }
    if (this.outcome === 'victory' && this.init_.kind === 'trainer') {
      state.credits += 120;
      this.say('Won 120 credits!');
      if (this.init_.onVictoryFlag) state.flags[this.init_.onVictoryFlag] = true; // mark this trainer beaten
    }
    if (this.outcome === 'defeat') {
      // party wipe loses nothing (GDD §6): recharge and wake at the garage
      for (const b of state.party) {
        b.integrity = b.stats.integrity;
        b.status = undefined;
        for (const m of b.moves) m.pp = m.maxPp;
      }
      state.flags['respawn-garage'] = true;
    }
    // evolution check after a won fight (GDD §10.7) — defer to its own scene
    const offers = this.outcome !== 'defeat' ? pendingEvolutions(state.party, state.bag, GAME_DATA) : [];
    this.time.delayedCall(900, () => {
      if (offers.length > 0) this.scene.start('evolution', { offers, returnScene: back });
      else this.scene.start(back);
    });
  }

  // ---- menus ---------------------------------------------------------------

  private showCommands(): void {
    if (this.battle.phase === 'done') return;
    this.mode = 'command';
    this.cursor = 0;
    this.say('What will you do?');
    this.drawMenu(COMMANDS.map((c) => c));
  }

  private drawMenu(items: string[]): void {
    this.clearMenu();
    items.forEach((label, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      this.menuTexts.push(
        this.add.text(120 + col * 56, 118 + row * 14, label, {
          fontFamily: 'monospace',
          fontSize: '9px',
          color: '#303030',
        }),
      );
    });
    this.updateMenuCursor();
  }

  private clearMenu(): void {
    for (const t of this.menuTexts) t.destroy();
    this.menuTexts = [];
  }

  private updateMenuCursor(): void {
    this.menuTexts.forEach((t, i) => t.setText(`${i === this.cursor ? '>' : ' '}${t.text.replace(/^[> ]/, '')}`));
  }

  override update(): void {
    if (this.mode === 'anim' || this.mode === 'puzzle' || this.mode === 'over') {
      this.controls.clearQueue();
      return;
    }
    const count = this.menuTexts.length;
    if (count > 0) {
      if (this.controls.consume('left') || this.controls.consume('up')) this.cursor = (this.cursor + count - 1) % count;
      if (this.controls.consume('right') || this.controls.consume('down')) this.cursor = (this.cursor + 1) % count;
      this.updateMenuCursor();
    }
    if (this.controls.consume('b') && this.mode !== 'command') {
      this.showCommands();
      return;
    }
    if (!this.controls.consume('a')) return;

    if (this.mode === 'command') {
      const pick = COMMANDS[this.cursor];
      if (pick === 'FIGHT') {
        this.mode = 'moves';
        this.cursor = 0;
        const labels = this.battle.active.moves.map((m) => `${GAME_DATA.move(m.id).name} ${m.pp}/${m.maxPp}`);
        this.say('Pick a move.');
        this.drawMenu(labels);
      } else if (pick === 'SWAP') {
        this.mode = 'party';
        this.cursor = 0;
        const state = getGameState();
        this.say('Send out which Ohm?');
        this.drawMenu(state.party.map((p) => `${p.name} Lv${p.level} ${p.integrity}/${p.stats.integrity}`));
      } else if (pick === 'PACK') {
        this.mode = 'pack';
        this.cursor = 0;
        const state = getGameState();
        const usable = Object.entries(state.bag).filter(([, n]) => n > 0);
        this.say('Use what?');
        this.drawMenu(usable.map(([id, n]) => `${ITEMS_BY_ID.get(id)?.name ?? id} x${n}`));
      } else if (pick === 'RUN') {
        this.dispatch(() => this.battle.submit({ type: 'run' }));
      }
    } else if (this.mode === 'moves') {
      this.dispatch(() => this.battle.submit({ type: 'move', index: this.cursor }));
    } else if (this.mode === 'party') {
      this.dispatch(() => this.battle.submit({ type: 'switch', index: this.cursor }));
    } else if (this.mode === 'pack') {
      const state = getGameState();
      const usable = Object.entries(state.bag).filter(([, n]) => n > 0);
      const picked = usable[this.cursor]?.[0];
      if (!picked) return;
      if (picked === 'storage-node') {
        state.bag[picked] = (state.bag[picked] ?? 1) - 1; // node is spent on the attempt (GDD §10.6)
        this.dispatch(() => this.battle.submit({ type: 'capture' }));
      } else {
        state.bag[picked] = (state.bag[picked] ?? 1) - 1;
        this.dispatch(() => this.battle.submit({ type: 'item', itemId: picked, targetIndex: 0 }));
      }
    }
  }

  private dispatch(run: () => BattleEvent[]): void {
    this.clearMenu();
    this.mode = 'anim';
    this.queue.push(...run());
    this.pump();
  }

  /** Real sprite where one exists; back falls back to front, then a tinted
   * rectangle for species without art yet. */
  private makeOhmSprite(
    num: number,
    side: 'front' | 'back',
    x: number,
    y: number,
  ): Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle {
    // preference order: HD side · HD front · GBA side · GBA front
    const candidates = [
      `ohm_${num}_${side}_hd`,
      `ohm_${num}_front_hd`,
      `ohm_${num}_${side}`,
      `ohm_${num}_front`,
    ];
    const texKey = candidates.find((k) => this.textures.exists(k));
    if (texKey) {
      const img = this.add.image(x, y, texKey).setOrigin(0.5);
      img.setDisplaySize(BATTLE_SPRITE_PX, BATTLE_SPRITE_PX); // keep the 240-layout footprint
      return img;
    }
    return this.add.rectangle(x, y, 40, 40, TYPE_COLORS[GAME_DATA.species(num).type]);
  }

  // ---- hud -----------------------------------------------------------------

  private say(text: string): void {
    this.text.setText(text);
  }

  private nameOf(side: Side): string {
    return side === 'foe' ? this.battle.foe.name : this.battle.active.name;
  }

  private statLabel(stat: string): string {
    return STAT_LABEL[stat] ?? stat.toUpperCase();
  }

  // ---- HUD construction & juice --------------------------------------------

  /** A framed name plate that reads "<name>  Lv<n>" with a status tag. */
  private hudBox(x: number, y: number, w: number): Phaser.GameObjects.Text {
    this.add.rectangle(x - 2, y - 2, w, 12, UI.paper).setOrigin(0, 0).setStrokeStyle(1, UI.frame).setDepth(3);
    return this.add.text(x + 1, y + 1, '', { fontFamily: 'monospace', fontSize: '8px', color: '#303030' }).setDepth(4);
  }

  private makeBar(cx: number, y: number, w: number): { bg: Phaser.GameObjects.Rectangle; fill: Phaser.GameObjects.Rectangle } {
    const bg = this.add.rectangle(cx, y, w, 6, 0x202830).setOrigin(0.5).setStrokeStyle(1, UI.frame).setDepth(3);
    const fill = this.add.rectangle(cx - BattleScene.BAR_W / 2, y, BattleScene.BAR_W, 4, UI.good).setOrigin(0, 0.5).setDepth(4);
    return { bg, fill };
  }

  /** Animate a side's HP bar to a ratio, recoloured green→amber→red. */
  private setBar(side: Side, integrity: number, max: number, animate: boolean): void {
    const b = side === 'foe' ? this.foeBar : this.playerBar;
    const ratio = Math.max(0, Math.min(1, integrity / Math.max(1, max)));
    b.fill.setFillStyle(ratio > 0.5 ? UI.good : ratio > 0.2 ? UI.warn : UI.bad);
    if (animate) this.tweens.add({ targets: b.fill, scaleX: ratio, duration: 360, ease: 'Cubic.Out' });
    else b.fill.scaleX = ratio;
    if (side === 'player') this.playerHpText.setText(`${Math.max(0, integrity)}/${max}`);
    this.refreshNames();
  }

  /** The attacker leans into its strike and settles back. */
  private lunge(side: Side): void {
    const spr = side === 'player' ? this.playerSprite : this.foeSprite;
    const dx = side === 'player' ? 12 : -12;
    const dy = side === 'player' ? -7 : 7;
    this.tweens.add({ targets: spr, x: spr.x + dx, y: spr.y + dy, duration: 95, yoyo: true, ease: 'Quad.Out' });
  }

  /** White flash over the struck sprite plus a camera shake — harder on crits/SE. */
  private hitFlash(side: Side, strong: boolean): void {
    const spr = side === 'player' ? this.playerSprite : this.foeSprite;
    const flash = this.add.rectangle(spr.x, spr.y, BATTLE_SPRITE_PX, BATTLE_SPRITE_PX, 0xffffff).setAlpha(0.85).setDepth(40);
    this.tweens.add({ targets: flash, alpha: 0, duration: 190, onComplete: () => flash.destroy() });
    this.tweens.add({ targets: spr, alpha: 0.25, yoyo: true, duration: 60, repeat: 2 });
    this.cameras.main.shake(strong ? 280 : 130, strong ? 0.012 : 0.005);
  }

  /** A floating damage number that rises off the struck sprite and fades. */
  private popDamage(side: Side, amount: number, crit: boolean): void {
    const spr = side === 'player' ? this.playerSprite : this.foeSprite;
    const t = this.add
      .text(spr.x, spr.y - 12, `-${amount}`, {
        fontFamily: 'monospace',
        fontSize: crit ? '13px' : '10px',
        color: crit ? '#ffd84a' : '#ffffff',
        stroke: '#202020',
        strokeThickness: 2,
      })
      .setOrigin(0.5)
      .setDepth(50);
    this.tweens.add({ targets: t, y: t.y - 18, alpha: 0, duration: 680, ease: 'Quad.Out', onComplete: () => t.destroy() });
  }

  private refreshNames(): void {
    const foe = this.battle.foe;
    const me = this.battle.active;
    this.foeName.setText(`${foe.name}  Lv${foe.level}${foe.status ? `  ${foe.status}` : ''}`);
    this.playerName.setText(`${me.name}  Lv${me.level}${me.status ? `  ${me.status}` : ''}`);
  }
}
