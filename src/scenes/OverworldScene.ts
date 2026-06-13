import Phaser from 'phaser';
import { fitLegacy } from './legacy';
import { rollEncounter } from '../core/encounter';
import { Rng } from '../core/rng';
import { makeBattler } from '../core/battle/engine';
import { GAME_DATA } from '../data/dataview';
import { ZONES_BY_ID } from '../data/encounters';
import { getGameState, nextSeed } from '../game/state';
import { isSolid, parseTmj, tileAt, type LoadedMap } from '../game/tilemap';
import { Controls } from '../input/controls';

const TILE_COLORS: Record<number, number> = {
  1: 0xc8a878, // dirt
  2: 0x705840, // rubble wall
  3: 0x90a048, // tall grass
  4: 0x8a8a92, // debris pile
  5: 0xb0a090, // old road
  6: 0x584838, // door / elevator
  7: 0x4878a0, // garage pad
};

/** map tile value → encounter zone id (per-map registry, contract M3) */
const MAP_ZONES: Record<string, Record<number, string>> = {
  'the-field': { 1: 'field-grass', 2: 'field-debris' },
};

const WALK_MS = 160;
const RUN_MS = 96;

type Dir = 'up' | 'down' | 'left' | 'right';
const DELTA: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

export class OverworldScene extends Phaser.Scene {
  private map!: LoadedMap;
  private controls!: Controls;
  private player!: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;
  private facingTick!: Phaser.GameObjects.Rectangle;
  private px = 0;
  private py = 0;
  private facing: Dir = 'down';
  private moving = false;
  private rng = new Rng(Date.now() >>> 0);
  private npcs: Array<{ x: number; y: number; sprite: Phaser.GameObjects.Rectangle; defeated: boolean }> = [];

  constructor() {
    super('overworld');
  }

  preload(): void {
    const id = getGameState().location.map;
    this.load.json(`map-${id}`, `maps/${id}.tmj`);
    if (!this.textures.exists('player_over')) this.load.image('player_over', 'sprites/ohms/player_over.png');
  }

  create(): void {
    fitLegacy(this);
    const state = getGameState();
    const id = state.location.map;
    this.map = parseTmj(id, this.cache.json.get(`map-${id}`));

    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        const t = tileAt(this.map, this.map.ground, x, y);
        this.add.rectangle(x * 16 + 8, y * 16 + 8, 16, 16, TILE_COLORS[t] ?? 0xc8a878).setStrokeStyle(1, 0x000000, 0.06);
      }
    }

    const spawn = this.map.spawns.find((s) => s.name === 'P');
    this.px = state.location.x || spawn?.tileX || 1;
    this.py = state.location.y || spawn?.tileY || 1;

    for (const s of this.map.spawns.filter((o) => o.name === 'N')) {
      const defeated = state.flags[`npc-${id}-${s.tileX}-${s.tileY}`] === true;
      const sprite = this.add.rectangle(s.tileX * 16 + 8, s.tileY * 16 + 8, 12, 14, defeated ? 0x787878 : 0xa03028);
      this.npcs.push({ x: s.tileX, y: s.tileY, sprite, defeated });
    }

    this.player = this.textures.exists('player_over')
      ? this.add.image(0, 0, 'player_over').setDepth(10)
      : this.add.rectangle(0, 0, 12, 14, 0x2858a0).setDepth(10);
    this.facingTick = this.add.rectangle(0, 0, 4, 4, 0xffffff).setDepth(11);
    this.placePlayer();

    this.cameras.main.setBounds(0, 0, this.map.width * 16, this.map.height * 16);
    this.cameras.main.startFollow(this.player, true);
    this.controls = new Controls(this);
    // drop any presses queued while the pause menu was up
    this.events.on('resume', () => this.controls.clearQueue());

    this.add
      .text(2, 2, id.toUpperCase().replace(/-/g, ' '), { fontFamily: 'monospace', fontSize: '8px', color: '#ffffff' })
      .setScrollFactor(0)
      .setDepth(100)
      .setAlpha(0.7);
  }

  override update(): void {
    if (this.moving) return;
    if (this.controls.consume('start')) {
      this.scene.launch('menu');
      this.scene.pause();
      return;
    }
    if (this.controls.consume('a')) {
      this.interact();
      return;
    }
    for (const dir of ['up', 'down', 'left', 'right'] as Dir[]) {
      if (this.controls.isHeld(dir)) {
        this.step(dir);
        return;
      }
    }
  }

  private step(dir: Dir): void {
    this.facing = dir;
    const [dx, dy] = DELTA[dir];
    const nx = this.px + dx;
    const ny = this.py + dy;
    this.placePlayer();
    if (isSolid(this.map, nx, ny) || this.npcs.some((n) => n.x === nx && n.y === ny)) return;
    this.moving = true;
    this.px = nx;
    this.py = ny;
    const run = this.controls.isHeld('b');
    this.tweens.add({
      targets: [this.player],
      x: nx * 16 + 8,
      y: ny * 16 + 8,
      duration: run ? RUN_MS : WALK_MS,
      onComplete: () => {
        this.moving = false;
        this.placePlayer();
        this.onArrive();
      },
    });
  }

  private placePlayer(): void {
    this.player.setPosition(this.px * 16 + 8, this.py * 16 + 8);
    const [dx, dy] = DELTA[this.facing];
    this.facingTick.setPosition(this.px * 16 + 8 + dx * 6, this.py * 16 + 8 + dy * 6);
  }

  private onArrive(): void {
    const state = getGameState();
    state.location = { map: this.map.id, x: this.px, y: this.py };

    // door / elevator warps
    const t = tileAt(this.map, this.map.ground, this.px, this.py);
    if (t === 6) {
      const target = this.map.id === 'the-field' ? 'ohmstead-garage' : 'the-field';
      state.location = { map: target, x: 0, y: 0 };
      this.scene.restart();
      return;
    }

    // line-of-sight raiders (Gen 3 spotting)
    for (const npc of this.npcs) {
      if (npc.defeated) continue;
      if (this.inLineOfSight(npc.x, npc.y)) {
        this.startTrainerBattle(npc);
        return;
      }
    }

    // zone-based invisible encounters
    const zoneCode = tileAt(this.map, this.map.zones, this.px, this.py);
    const zoneId = MAP_ZONES[this.map.id]?.[zoneCode];
    if (zoneId) {
      const zone = ZONES_BY_ID.get(zoneId);
      const dampened = (getGameState().flags['dampener'] ?? false) === true;
      const spawn = zone && rollEncounter(zone, this.rng, dampened);
      if (spawn) {
        const foe = makeBattler(GAME_DATA.species(spawn.speciesNum), spawn.level, GAME_DATA);
        if (!state.manifest.seen.includes(spawn.speciesNum)) state.manifest.seen.push(spawn.speciesNum);
        this.scene.start('battle', { kind: 'wild', foes: [foe], seed: nextSeed(state) });
      }
    }
  }

  private inLineOfSight(nx: number, ny: number): boolean {
    const range = 4;
    if (nx === this.px && Math.abs(ny - this.py) <= range) {
      const dir = ny < this.py ? 1 : -1;
      for (let y = ny + dir; y !== this.py; y += dir) if (isSolid(this.map, nx, y)) return false;
      return true;
    }
    if (ny === this.py && Math.abs(nx - this.px) <= range) {
      const dir = nx < this.px ? 1 : -1;
      for (let x = nx + dir; x !== this.px; x += dir) if (isSolid(this.map, x, ny)) return false;
      return true;
    }
    return false;
  }

  private startTrainerBattle(npc: { x: number; y: number; defeated: boolean }): void {
    const state = getGameState();
    state.flags[`npc-${this.map.id}-${npc.x}-${npc.y}`] = true; // marked after the bout regardless; rematch logic later
    const team = [makeBattler(GAME_DATA.species(32), 4, GAME_DATA), makeBattler(GAME_DATA.species(10), 5, GAME_DATA)];
    this.scene.start('battle', { kind: 'trainer', foes: team, foeName: 'Redbed Raider', seed: nextSeed(state) });
  }

  private interact(): void {
    const [dx, dy] = DELTA[this.facing];
    const t = tileAt(this.map, this.map.ground, this.px + dx, this.py + dy);
    if (t === 7) {
      // garage recharge (GDD §6)
      const state = getGameState();
      for (const b of state.party) {
        b.integrity = b.stats.integrity;
        b.status = undefined;
        b.statusTurns = 0;
        b.glitchedTurns = 0;
        for (const m of b.moves) m.pp = m.maxPp;
      }
      this.toast("You're all recharged — stay current out there.");
    }
  }

  private toast(text: string): void {
    const box = this.add
      .rectangle(120, 140, 232, 28, 0xf8f8e8)
      .setScrollFactor(0)
      .setDepth(200)
      .setStrokeStyle(2, 0x303030);
    const t = this.add
      .text(8, 130, text, { fontFamily: 'monospace', fontSize: '8px', color: '#303030', wordWrap: { width: 224 } })
      .setScrollFactor(0)
      .setDepth(201);
    this.time.delayedCall(1800, () => {
      box.destroy();
      t.destroy();
    });
  }
}
