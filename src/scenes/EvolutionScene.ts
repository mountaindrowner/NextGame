import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { applyEvolution, type EvoOffer } from '../core/evolution';
import { GAME_DATA } from '../data/dataview';
import { ITEMS_BY_ID } from '../data/items';
import { getGameState } from '../game/state';
import { getAudio } from '../game/audio';
import { Controls } from '../input/controls';
import { TYPE_COLORS, UI } from '../ui/colors';

interface EvolutionInit {
  offers: EvoOffer[];
  returnScene?: string;
}

type Phase = 'prompt' | 'animating' | 'done';

/**
 * The evolution moment (slice deliverable; GDD §10.7). Each offer: B cancels
 * and defers (the core is not spent), A confirms (one core consumed, the Ohm
 * transforms). Cancelable mid-animation, faithful to "factory settings is the
 * villain's tool — your Ohms change because you chose it."
 */
export class EvolutionScene extends Phaser.Scene {
  private controls!: Controls;
  private offers: EvoOffer[] = [];
  private index = 0;
  private phase: Phase = 'prompt';
  private canceled = false;
  private text!: Phaser.GameObjects.Text;
  private sprite!: Phaser.GameObjects.Rectangle;
  private pulse?: Phaser.Tweens.Tween;

  constructor() {
    super('evolution');
  }

  private returnScene = 'overworld';

  init(data: EvolutionInit): void {
    this.offers = data.offers ?? [];
    this.returnScene = data.returnScene ?? 'overworld';
  }

  create(): void {
    fitLegacy(this);
    this.index = 0;
    this.canceled = false;
    this.controls = new Controls(this);
    this.add.rectangle(120, 80, 240, 160, 0x101018);
    this.sprite = this.add.rectangle(120, 64, 40, 40, 0x202028);
    this.add.rectangle(120, 134, 240, 52, UI.paper).setStrokeStyle(2, UI.frame);
    this.text = this.add.text(8, 116, '', {
      fontFamily: 'monospace',
      fontSize: '9px',
      color: '#303030',
      wordWrap: { width: 224 },
    });
    this.present();
  }

  private present(): void {
    const offer = this.offers[this.index];
    if (!offer) {
      this.scene.start(this.returnScene);
      return;
    }
    const state = getGameState();
    const member = state.party[offer.partyIndex];
    // re-validate: party/level/core could have changed since the offer was built
    if (!member || (state.bag[offer.item] ?? 0) <= 0 || member.speciesNum !== offer.fromNum) {
      this.next();
      return;
    }
    this.phase = 'prompt';
    this.canceled = false;
    const fromType = GAME_DATA.species(offer.fromNum).type;
    this.sprite.setFillStyle(TYPE_COLORS[fromType]).setScale(1).setAlpha(1);
    const coreName = ITEMS_BY_ID.get(offer.item)?.name ?? offer.item;
    this.text.setText(
      `${offer.fromName} resonates with the ${coreName}…\nReconfigure into ${offer.toName}?  [A] yes   [B] not yet`,
    );
  }

  override update(): void {
    if (this.phase === 'prompt') {
      if (this.controls.consume('a')) {
        getAudio().select();
        this.startAnimation();
      } else if (this.controls.consume('b')) {
        getAudio().back();
        this.text.setText('You eased the resonance back down. It can change later.');
        this.phase = 'done';
        this.time.delayedCall(900, () => this.next());
      }
      return;
    }
    if (this.phase === 'animating' && this.controls.consume('b')) {
      this.canceled = true;
    }
  }

  private startAnimation(): void {
    this.phase = 'animating';
    const offer = this.offers[this.index]!;
    this.text.setText(`${offer.fromName} is changing…  (hold [B] to stop)`);
    this.pulse = this.tweens.add({
      targets: this.sprite,
      scaleX: 1.4,
      scaleY: 1.4,
      alpha: 0.4,
      duration: 220,
      yoyo: true,
      repeat: 5,
      onComplete: () => this.resolve(),
    });
  }

  private resolve(): void {
    const offer = this.offers[this.index]!;
    const state = getGameState();
    const member = state.party[offer.partyIndex];
    if (this.canceled || !member) {
      this.text.setText(`${offer.fromName} held its shape. ${this.canceled ? 'Maybe another time.' : ''}`);
      this.phase = 'done';
      this.time.delayedCall(900, () => this.next());
      return;
    }
    state.bag[offer.item] = (state.bag[offer.item] ?? 1) - 1; // core consumed on success only
    const { to } = applyEvolution(member, GAME_DATA);
    if (!state.manifest.seen.includes(member.speciesNum)) state.manifest.seen.push(member.speciesNum);
    if (!state.manifest.freed.includes(member.speciesNum)) state.manifest.freed.push(member.speciesNum);
    const toType = GAME_DATA.species(member.speciesNum).type;
    this.sprite.setFillStyle(TYPE_COLORS[toType]).setScale(1).setAlpha(1);
    this.cameras.main.flash(250, 240, 240, 255);
    getAudio().playOneShot('jingle.evolution');
    this.text.setText(`${offer.fromName} reconfigured into ${to}!`);
    this.phase = 'done';
    this.time.delayedCall(1100, () => this.next());
  }

  private next(): void {
    this.pulse?.stop();
    this.index += 1;
    this.present();
  }
}
