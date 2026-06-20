import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { buyItem, sellItem, sellValue, type Wallet } from '../core/shop';
import { ITEMS_BY_ID } from '../data/items';
import { SHOP_STOCK, DEFAULT_SHOP } from '../data/shops';
import { getGameState } from '../game/state';
import { getAudio } from '../game/audio';
import { bgmForMap } from '../data/audio';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';

type Mode = 'menu' | 'buy' | 'sell';
const MENU = ['BUY', 'SELL', 'LEAVE'] as const;

/**
 * The colony counter (GDD §10.8): spend credits on consumables, sell salvage for
 * credits. A pause overlay over the field; the shop core owns the rules.
 */
export class ShopScene extends Phaser.Scene {
  private controls!: Controls;
  private mode: Mode = 'menu';
  private cursor = 0;
  private stock: string[] = [];
  private launcher = 'fieldhd';
  private dynamic: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super('shop');
  }

  private fieldMap = 'the-field';

  init(data: { tier?: string; from?: string; map?: string }): void {
    this.stock = SHOP_STOCK[data?.tier ?? DEFAULT_SHOP] ?? SHOP_STOCK[DEFAULT_SHOP]!;
    this.launcher = data?.from ?? 'fieldhd';
    this.fieldMap = data?.map ?? getGameState().location?.map ?? 'the-field';
  }

  create(): void {
    fitLegacy(this);
    this.mode = 'menu';
    this.cursor = 0;
    this.controls = new Controls(this);
    getAudio().ensureBgm(this, 'bgm.menu.shop');
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
    if (this.controls.consume('b') || this.controls.consume('start')) {
      this.back();
      return;
    }
    if (this.controls.consume('a')) this.select();
  }

  private optionCount(): number {
    if (this.mode === 'menu') return MENU.length;
    if (this.mode === 'buy') return this.stock.length;
    return Math.max(1, this.sellable().length);
  }

  private back(): void {
    if (this.mode === 'menu') {
      getAudio().ensureBgm(this, bgmForMap(this.fieldMap)); // restore the field theme before handing back
      this.scene.stop();
      this.scene.resume(this.launcher);
      return;
    }
    this.mode = 'menu';
    this.cursor = this.mode === 'menu' ? 0 : 0;
    this.redraw();
  }

  private select(): void {
    if (this.mode === 'menu') {
      const pick = MENU[this.cursor];
      if (pick === 'LEAVE') {
        this.back();
        return;
      }
      this.mode = pick === 'BUY' ? 'buy' : 'sell';
      this.cursor = 0;
      this.redraw();
      return;
    }
    if (this.mode === 'buy') {
      const id = this.stock[this.cursor];
      const def = id ? ITEMS_BY_ID.get(id) : undefined;
      if (def) this.flash(buyItem(this.wallet(), def).message);
      this.redraw();
      return;
    }
    // sell
    const id = this.sellable()[this.cursor]?.[0];
    const def = id ? ITEMS_BY_ID.get(id) : undefined;
    if (def) {
      const r = sellItem(this.wallet(), def);
      this.flash(r.message);
      if (this.cursor >= Math.max(0, this.sellable().length)) this.cursor = Math.max(0, this.sellable().length - 1);
    }
    this.redraw();
  }

  private wallet(): Wallet {
    return getGameState();
  }

  /** Bag entries the counter will buy back (salvage only). */
  private sellable(): Array<[string, number]> {
    return Object.entries(getGameState().bag).filter(([id, n]) => n > 0 && sellValue(ITEMS_BY_ID.get(id) ?? ({} as never)) > 0);
  }

  // ---- rendering -----------------------------------------------------------

  private clearDynamic(): void {
    for (const o of this.dynamic) o.destroy();
    this.dynamic = [];
  }

  private label(x: number, y: number, text: string, opts: { hl?: boolean; color?: string } = {}): void {
    this.dynamic.push(
      this.add
        .text(x, y, text, { fontFamily: 'monospace', fontSize: '8px', color: opts.color ?? '#303030', fontStyle: opts.hl ? 'bold' : 'normal' })
        .setDepth(2),
    );
  }

  private redraw(): void {
    this.clearDynamic();
    this.dynamic.push(this.add.rectangle(120, 80, 236, 152, UI.paper).setStrokeStyle(2, UI.frame));
    this.label(16, 12, 'COLONY COUNTER', { hl: true });
    this.label(150, 12, `${getGameState().credits} cr`, { color: '#40607a' });
    if (this.mode === 'menu') this.drawMenu();
    else if (this.mode === 'buy') this.drawBuy();
    else this.drawSell();
  }

  private drawMenu(): void {
    this.label(20, 36, '"Stay current, traveler. Buying or selling?"', { color: '#586068' });
    MENU.forEach((m, i) => this.label(40, 64 + i * 16, `${i === this.cursor ? '>' : ' '}${m}`, { hl: i === this.cursor }));
    this.label(16, 150, 'A: pick   B: leave');
  }

  private drawBuy(): void {
    this.label(16, 26, 'BUY', { hl: true });
    this.stock.forEach((id, i) => {
      const def = ITEMS_BY_ID.get(id);
      if (!def) return;
      const here = i === this.cursor;
      this.label(20, 40 + i * 11, `${here ? '>' : ' '}${def.name}`, { hl: here });
      this.label(180, 40 + i * 11, `${def.price} cr`, { color: here ? '#303030' : '#586068' });
    });
    this.label(16, 150, 'A: buy 1   B: back');
  }

  private drawSell(): void {
    this.label(16, 26, 'SELL', { hl: true });
    const rows = this.sellable();
    if (rows.length === 0) {
      this.label(20, 44, 'No salvage to sell. Find some on the routes.', { color: '#586068' });
      this.label(16, 150, 'B: back');
      return;
    }
    rows.forEach(([id, n], i) => {
      const def = ITEMS_BY_ID.get(id);
      if (!def) return;
      const here = i === this.cursor;
      this.label(20, 40 + i * 11, `${here ? '>' : ' '}${def.name}  x${n}`, { hl: here });
      this.label(180, 40 + i * 11, `${sellValue(def)} cr`, { color: here ? '#303030' : '#586068' });
    });
    this.label(16, 150, 'A: sell 1   B: back');
  }

  private flash(text: string): void {
    const t = this.add.text(16, 132, text, { fontFamily: 'monospace', fontSize: '8px', color: '#40a050' }).setDepth(3);
    this.dynamic.push(t);
    this.time.delayedCall(1100, () => t.destroy());
  }
}
