import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import type { BattleEvent, Battler } from '../core/battle/contract';
import { Battle } from '../core/battle/engine';
import { pendingEvolutions } from '../core/evolution';
import { GAME_DATA } from '../data/dataview';
import { hasBack, hasFront } from '../data/sprite-manifest';
import { hasHdBack, hasHdFront } from '../data/sprite-manifest-hd';
import { ITEMS_BY_ID } from '../data/items';
import { getGameState } from '../game/state';
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
}

type Mode = 'anim' | 'command' | 'moves' | 'party' | 'pack' | 'puzzle' | 'over';

const COMMANDS = ['FIGHT', 'SWAP', 'PACK', 'RUN'] as const;
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
  private playerHud!: Phaser.GameObjects.Text;
  private foeHud!: Phaser.GameObjects.Text;
  private outcome: string | undefined;
  private init_!: BattleInit;

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
    this.foeHud = this.add.text(6, 6, '', { fontFamily: 'monospace', fontSize: '9px', color: '#303030' });
    this.playerHud = this.add.text(132, 88, '', { fontFamily: 'monospace', fontSize: '9px', color: '#303030' });
    this.text = this.add.text(8, 116, '', { fontFamily: 'monospace', fontSize: '9px', color: '#303030', wordWrap: { width: 224 } });

    this.queue.push(...this.battle.intro());
    this.mode = 'anim';
    this.pump();
  }

  // ---- event pump --------------------------------------------------------

  private pump(): void {
    const ev = this.queue.shift();
    if (!ev) {
      this.refreshHuds();
      if (this.outcome) this.finish();
      else this.showCommands();
      return;
    }
    this.refreshHuds();
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
        next(380);
        break;
      }
      case 'damage': {
        const target = ev.side === 'player' ? this.playerSprite : this.foeSprite;
        this.tweens.add({ targets: target, alpha: 0.2, yoyo: true, duration: 70, repeat: 2 });
        if (ev.crit) this.say('A critical hit!');
        else if (ev.effectiveness > 1) this.say("It's super effective!");
        else if (ev.effectiveness < 1) this.say("It's not very effective…");
        next(500);
        break;
      }
      case 'heal':
      case 'stageChange':
      case 'statusSet':
      case 'statusCleared':
      case 'xp':
        if (ev.type === 'statusSet') this.say(`${ev.side === 'foe' ? 'Wild Ohm' : 'Your Ohm'} is ${ev.status}!`);
        if (ev.type === 'xp') this.say(`${ev.name} gained ${ev.amount} XP.`);
        if (ev.type === 'stageChange') this.say(`${ev.stat.toUpperCase()} ${ev.delta > 0 ? 'rose' : 'fell'}!`);
        next(420);
        break;
      case 'levelUp':
        this.say(`${ev.name} reached Lv${ev.level}!`);
        next(600);
        break;
      case 'moveLearned':
        this.say(`${ev.name} learned ${ev.moveName}!`);
        next(600);
        break;
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

  private bar(current: number, max: number): string {
    const cells = 10;
    const filled = Math.round((current / Math.max(1, max)) * cells);
    return `[${'#'.repeat(filled)}${'-'.repeat(cells - filled)}]`;
  }

  private refreshHuds(): void {
    const foe = this.battle.foe;
    const me = this.battle.active;
    this.foeHud.setText(
      `${foe.name} Lv${foe.level} ${foe.status ?? ''}\n${this.bar(foe.integrity, foe.stats.integrity)}`,
    );
    this.playerHud.setText(
      `${me.name} Lv${me.level} ${me.status ?? ''}\n${this.bar(me.integrity, me.stats.integrity)} ${me.integrity}/${me.stats.integrity}`,
    );
  }
}
