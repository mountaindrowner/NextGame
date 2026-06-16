import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { Controls } from '../input/controls';
import { UI } from '../ui/colors';
import { getGameState } from '../game/state';
import { BIOME_COLORS, RIDEABLES, WORLD_LINKS, WORLD_MAP } from '../data/region';

/**
 * The Blackland world-map (Town-Map screen): a schematic of every built map,
 * marking where you've been and where you stand. On a rideable Ohm you can
 * fast-travel to any visited recharge-garage hub. Launched as a pause overlay
 * from the field menu.
 */
export class WorldMapScene extends Phaser.Scene {
  private controls!: Controls;
  private ids = Object.keys(WORLD_MAP);
  private cursor = 0;
  private dynamic: Phaser.GameObjects.GameObject[] = [];

  constructor() {
    super('worldmap');
  }

  private nx(col: number): number {
    return 28 + col * 47;
  }
  private ny(row: number): number {
    return 28 + (row - 1) * 26;
  }

  create(): void {
    fitLegacy(this);
    this.controls = new Controls(this);
    const here = getGameState().location?.map;
    const at = this.ids.indexOf(here ?? '');
    this.cursor = at >= 0 ? at : 0;
    this.redraw();
  }

  override update(): void {
    if (this.controls.consume('up') || this.controls.consume('left')) {
      this.cursor = (this.cursor + this.ids.length - 1) % this.ids.length;
      this.redraw();
    }
    if (this.controls.consume('down') || this.controls.consume('right')) {
      this.cursor = (this.cursor + 1) % this.ids.length;
      this.redraw();
    }
    if (this.controls.consume('b') || this.controls.consume('start')) {
      this.scene.stop();
      this.scene.resume('menu');
      return;
    }
    if (this.controls.consume('a')) this.travel();
  }

  private visited(id: string): boolean {
    return getGameState().flags[`visited:${id}`] === true || getGameState().location?.map === id;
  }

  private hasRide(): boolean {
    const s = getGameState();
    return [...s.party, ...s.garage].some((b) => RIDEABLES.has(b.speciesNum));
  }

  /** A valid fast-travel target: a visited garage hub other than where you are. */
  private travelable(id: string): boolean {
    return WORLD_MAP[id]?.garage === true && this.visited(id) && getGameState().location?.map !== id;
  }

  private travel(): void {
    const id = this.ids[this.cursor];
    if (!id) return;
    const meta = WORLD_MAP[id]!;
    if (!this.visited(id)) {
      this.flash(`${meta.label}: you haven't been there yet.`);
      return;
    }
    if (getGameState().location?.map === id) {
      this.flash("You're already here.");
      return;
    }
    if (!meta.garage) {
      this.flash(`${meta.label} has no garage to drop in on.`);
      return;
    }
    if (!this.hasRide()) {
      this.flash('You need a rideable Ohm to travel.');
      return;
    }
    const state = getGameState();
    state.location = { map: id, x: 0, y: 0 };
    state.flags['respawn-garage'] = true; // land on the garage pad + recharge
    this.scene.stop('menu');
    this.scene.start('fieldhd', { mapId: id });
  }

  // ---- rendering -----------------------------------------------------------

  private clearDynamic(): void {
    for (const o of this.dynamic) o.destroy();
    this.dynamic = [];
  }

  private redraw(): void {
    this.clearDynamic();
    this.dynamic.push(this.add.rectangle(120, 80, 232, 152, 0x141a1c).setStrokeStyle(2, UI.frame));
    this.dynamic.push(this.add.text(12, 8, 'THE BLACKLAND', { fontFamily: 'monospace', fontSize: '9px', color: '#d8e0e0', fontStyle: 'bold' }));

    // links first (under the nodes)
    for (const [a, b] of WORLD_LINKS) {
      const ma = WORLD_MAP[a];
      const mb = WORLD_MAP[b];
      if (!ma || !mb) continue;
      const lit = this.visited(a) && this.visited(b);
      const line = this.add.line(0, 0, this.nx(ma.col), this.ny(ma.row), this.nx(mb.col), this.ny(mb.row), lit ? 0x9fb0a8 : 0x3a4444).setOrigin(0, 0).setLineWidth(1);
      this.dynamic.push(line);
    }

    const here = getGameState().location?.map;
    this.ids.forEach((id, i) => {
      const m = WORLD_MAP[id]!;
      const x = this.nx(m.col);
      const y = this.ny(m.row);
      const seen = this.visited(id);
      const sel = i === this.cursor;
      const color = seen ? BIOME_COLORS[m.biome] ?? 0x808080 : 0x2c3434;
      const node = this.add.rectangle(x, y, 13, 13, color).setStrokeStyle(sel ? 2 : 1, sel ? 0xffd27a : id === here ? 0xffffff : 0x586068);
      this.dynamic.push(node);
      if (id === here) this.dynamic.push(this.add.text(x, y, '◉', { fontFamily: 'monospace', fontSize: '9px', color: '#ffffff' }).setOrigin(0.5));
      else if (this.travelable(id)) this.dynamic.push(this.add.text(x, y, '⤓', { fontFamily: 'monospace', fontSize: '9px', color: '#e8f4ff' }).setOrigin(0.5));
      const label = seen ? m.label : '???';
      this.dynamic.push(this.add.text(x, y + 9, label, { fontFamily: 'monospace', fontSize: '7px', color: sel ? '#ffd27a' : seen ? '#c0c8c8' : '#6a7474' }).setOrigin(0.5, 0));
    });

    // footer status
    const cur = this.ids[this.cursor];
    const m = cur ? WORLD_MAP[cur] : undefined;
    const ride = this.hasRide() ? 'ride ready' : 'no ride';
    const hint = cur && this.travelable(cur) ? 'A: travel here' : cur === here ? 'you are here' : !this.visited(cur ?? '') ? 'unexplored' : 'no garage here';
    this.dynamic.push(this.add.text(12, 138, `${m?.label ?? ''} — ${hint}`, { fontFamily: 'monospace', fontSize: '8px', color: '#c0c8c8' }));
    this.dynamic.push(this.add.text(12, 150, `B: back    [${ride}]`, { fontFamily: 'monospace', fontSize: '8px', color: '#828c8c' }));
  }

  private flash(text: string): void {
    const t = this.add.text(120, 126, text, { fontFamily: 'monospace', fontSize: '8px', color: '#ffd27a' }).setOrigin(0.5);
    this.dynamic.push(t);
    this.time.delayedCall(1300, () => t.destroy());
  }
}
