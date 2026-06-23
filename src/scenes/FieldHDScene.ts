import Phaser from 'phaser';
import { Controls } from '../input/controls';
import { makeBattler } from '../core/battle/engine';
import { rollEncounter } from '../core/encounter';
import { Rng } from '../core/rng';
import { GAME_DATA } from '../data/dataview';
import { ZONES_BY_ID } from '../data/encounters';
import { getGameState, hasGameState, nextSeed } from '../game/state';
import { getAudio } from '../game/audio';
import { bgmForMap } from '../data/audio';
import { type Dir4, neighbor, OPPOSITE } from '../data/region';
import { fadeTo, FADE_COLD } from './transition';
import { NIGHT_CALL, BREAKER_BOUND, THE_SPOTTING, ROOK_AFTERMATH } from '../cutscene/script';
import { partyHasFieldAbility, HOVER_GIFT_SPECIES } from '../data/field-abilities';

// Prologue ("The Call", Story Bible): supply run -> return -> night-call ->
// inciting fight -> the Breaker binds. Tracked in save flags so it survives the
// battle round-trip and reloads.
const PRO = { supply: 'pro_supply', nightcall: 'pro_nightcall', breaker: 'pro_breaker', done: 'pro_done', charge: 'pro_charge' } as const;
const WARPED_SPECIES = 49; // Sawlet (BREAKER type) — the Static-warped guardian of the safe
const PLAYER_TARGET_PX = 48; // on-screen content height for the hi-res protagonist sprites (rendered down, not baked down)
const NPC_TARGET_PX = 40; // on-screen content height for hi-res PixelLab NPC sprites
// Act I, beat 5/6 ("The Spotting" + Rook): the first rival battle on the Farm Road.
const ACT1 = { spotting: 'seen_spotting', rook: 'beat_rook', rookDone: 'rook_done' } as const;
const ROOK_TEAM: Array<{ num: number; level: number }> = [{ num: 54, level: 6 }, { num: 10, level: 7 }]; // Cellet, Toastlet
// Act I, beat 7 (Railhead, Colony 1): clear the sabotaged relay (Captain Holt,
// the first "off" Militant) to earn the colony's trust before the Warden fight.
const RAIL = { relay: 'railhead_relay', intro: 'railhead_intro', relayDone: 'railhead_relay_done' } as const;
const HOLT_TEAM: Array<{ num: number; level: number }> = [{ num: 54, level: 10 }, { num: 51, level: 11 }]; // Cellet, Buzzsawyer

interface FieldData {
  tile: number;
  cols: number;
  rows: number;
  width: number;
  height: number;
  collision: number[];
  grass: number[];
  grassAny?: number[];
  water?: number[];
  hover?: number[]; // open water you can only cross with a HOVER Ohm in the party
  placements?: Array<{ type: string; col: number; row: number }>;
  npcs?: Array<{ char: string; col: number; row: number; name?: string; lines?: string[]; shop?: string; warden?: WardenDef }>;
  trainers?: TrainerDef[];
  items?: Array<{ col: number; row: number; credits: number; label?: string; hidden?: boolean }>;
  signs?: Array<{ col: number; row: number; text: string }>;
  spawn?: { x: number; y: number };
  exits?: Array<{ x: number; y: number; scene: string; mapId?: string; to?: { x: number; y: number }; gate?: string }>;
  interacts?: Array<{ x: number; y: number; kind: string; tier?: string }>;
  ledges?: Array<{ col: number; row: number; dir: 'n' | 's' | 'e' | 'w' }>;
  zone?: string; // encounter-zone id for this map's grass (default field-grass)
}

interface WardenDef {
  team: Array<{ num: number; level: number }>;
  patch: string; // colony Patch id awarded on victory
  bark?: string; // pre-fight taunt
}

interface TrainerDef {
  char: string;
  col: number;
  row: number;
  facing: 'n' | 's' | 'e' | 'w';
  name: string;
  team: Array<{ num: number; level: number }>;
  range?: number;
  bark?: string;
}

interface MapDef {
  png: string;
  json: string;
  banner: string;
  garage: boolean; // does this map have the surface recharge pad?
}

const MAPS: Record<string, MapDef> = {
  'the-field': { png: 'world/the-field.png', json: 'world/the-field.json', banner: 'THE FIELD — Ohmstead surface', garage: true },
  farmroad: { png: 'world/farmroad.png', json: 'world/farmroad.json', banner: 'THE FARM ROAD — farm-to-market', garage: false },
  ohmstead: { png: 'world/ohmstead.png', json: 'world/ohmstead.json', banner: 'OHMSTEAD — the colony, sublevel garage', garage: false },
  railhead: { png: 'world/railhead.png', json: 'world/railhead.json', banner: 'RAILHEAD — Colony 1, the rail junction', garage: true },
  cistern: { png: 'world/cistern.png', json: 'world/cistern.json', banner: 'THE CISTERN — Colony 2, the flooded waterworks', garage: false },
  bastion: { png: 'world/bastion.png', json: 'world/bastion.json', banner: 'BASTION — Colony 3, the quarry-fortress', garage: true },
  redoubt: { png: 'world/redoubt.png', json: 'world/redoubt.json', banner: 'REDOUBT — Colony 4, the Bunker', garage: true },
  trinity: { png: 'world/trinity.png', json: 'world/trinity.json', banner: 'THE TRINITY BOTTOMS — the drowned forest', garage: false },
  chancel: { png: 'world/chancel.png', json: 'world/chancel.json', banner: 'THE CHANCEL — Colony 5, the ruined megachurch', garage: true },
};

const NPC_CHARS = ['npc_rancher', 'npc_elder', 'npc_kid'] as const;
// Generated PixelLab NPC character ids — batch 1 (Ohmstead→Railhead) + batch 2 (Cistern→Chancel)
const NPC_CHAR_IDS = [
  'mabel', 'boone', 'cass', 'odessa', 'odell', 'rivet', 'bex', 'mesa', 'cricket',
  'sully', 'rook', 'dusty', 'wade', 'junie', 'marrow', 'hettie', 'pax',
  'scrap_broker', 'salt_broker', 'card_sharp', 'holt',
  'bloom', 'sela', 'mud_cole', 'weather_watcher', 'nursery_matron', 'seed_keeper',
  'hydromancer', 'stone', 'flint', 'knock_twice', 'doomsayer', 'gate_warden',
  'rationer', 'lookout', 'pike', 'reyes', 'conscript', 'base_scrapper',
  'deserter', 'sarge', 're_enlister', 'hale', 'cantor', 'brother_hum',
  'apostate', 'bell_keeper', 'reliquary_warden', 'confessor',
] as const;
const FX = ['grass_0', 'grass_1', 'grass_2', 'leaf_0', 'leaf_1', 'leaf_2', 'trunk'] as const;
const WATER_FRAMES = 6;

interface Sway {
  obj: Phaser.GameObjects.Image;
  phase: number;
  amp: number;
  speed: number;
}

type Dir = 'up' | 'down' | 'left' | 'right';
const DELTA: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const WALK_MS = 150;
const RUN_MS = 90;

/**
 * HD Field demo (art direction pivot): the creator's painted cattle-town map
 * is the playable Field. Collision + grass encounters are derived from the art
 * (public/field/). Player walks the 32px grid; the camera follows. Other
 * scenes still await the 480×320 layout migration — this proves the art.
 */
export class FieldHDScene extends Phaser.Scene {
  private mapId = 'the-field';
  private mapDef: MapDef = MAPS['the-field']!;
  private field!: FieldData;
  private controls!: Controls;
  private player!: Phaser.GameObjects.Sprite;
  private walkKey = 'sal_walk';
  private useSheet = false;
  private playerN = 3; // walk frames per direction (SAL hi-res = 4, others = 3)
  private px = 0;
  private py = 0;
  private facing: Dir = 'down';
  private moving = false;
  private toastObj?: Phaser.GameObjects.Container;
  private toastTimer?: Phaser.Time.TimerEvent;
  private sway: Sway[] = [];
  private waterSprites: Phaser.GameObjects.Image[] = [];
  private waterFrame = 0;
  private waterTimer = 0;
  private windT = 0;

  constructor() {
    super('fieldhd');
  }

  private enter?: { from: Dir4; col: number; row: number };
  private enterAt?: { x: number; y: number };
  private introTutorial = false;

  init(data: { mapId?: string; enter?: { from: Dir4; col: number; row: number }; to?: { x: number; y: number }; intro?: boolean }): void {
    const saved = hasGameState() ? getGameState().location?.map : undefined;
    // explicit mapId wins; else resume the saved map (returning from a battle);
    // else the Field. Callers that mean the Field (the elevator) pass it.
    this.mapId = data.mapId && MAPS[data.mapId] ? data.mapId : saved && MAPS[saved] ? saved : 'the-field';
    this.mapDef = MAPS[this.mapId]!;
    this.enter = data.enter;
    this.enterAt = data.to;
    this.introTutorial = data.intro === true;
  }

  private mapKey(): string {
    return `map-${this.mapId}`;
  }
  private dataKey(): string {
    return `mapdata-${this.mapId}`;
  }

  /** Build the moving overlay layers: animated water, swaying grass tufts,
   * and trees (static trunk + swaying leaf clusters). */
  private buildAnimatedLayers(): void {
    this.sway = [];
    this.waterSprites = [];
    const t = this.field.tile;
    const rng = new Rng((0x5eed ^ this.field.cols) >>> 0);
    const water = this.field.water ?? [];
    const grassAny = this.field.grassAny ?? [];
    const enc = this.field.grass ?? [];
    for (let r = 0; r < this.field.rows; r++) {
      for (let c = 0; c < this.field.cols; c++) {
        const i = r * this.field.cols + c;
        if (water[i] === 1) {
          this.waterSprites.push(this.add.image(c * t, r * t, 'water_0').setOrigin(0, 0).setDepth(1));
          continue;
        }
        if (grassAny[i] === 1) {
          const n = enc[i] === 1 ? 2 : rng.chance(55) ? 1 : 0;
          for (let k = 0; k < n; k++) {
            const ox = c * t + rng.int(3, t - 3);
            const oy = r * t + rng.int(12, t - 1);
            const img = this.add
              .image(ox, oy, `grass_${rng.int(0, 2)}`)
              .setOrigin(0.5, 1)
              .setDepth(2 + r);
            this.sway.push({ obj: img, phase: rng.next() * 6.28, amp: 0.16, speed: 1.5 + rng.next() * 0.7 });
          }
        }
      }
    }
    for (const p of this.field.placements ?? []) {
      if (p.type !== 'tree') continue;
      const bx = p.col * t + t / 2;
      const by = p.row * t + t;
      this.add.image(bx, by, 'trunk').setOrigin(0.5, 1).setDepth(3 + p.row);
      const spots: Array<[number, number, string]> = [
        [bx - 7, by - 22, 'leaf_0'],
        [bx + 7, by - 22, 'leaf_1'],
        [bx, by - 30, 'leaf_2'],
      ];
      for (const [lx, ly, key] of spots) {
        const img = this.add.image(lx, ly, key).setOrigin(0.5, 0.7).setDepth(4 + p.row);
        this.sway.push({ obj: img, phase: rng.next() * 6.28, amp: 0.06, speed: 1.0 + rng.next() * 0.4 });
      }
    }
  }

  private animate(delta: number): void {
    this.windT += delta / 1000;
    for (const s of this.sway) s.obj.rotation = Math.sin(this.windT * s.speed + s.phase) * s.amp;
    this.waterTimer += delta;
    if (this.waterTimer > 150) {
      this.waterTimer = 0;
      this.waterFrame = (this.waterFrame + 1) % WATER_FRAMES;
      const key = `water_${this.waterFrame}`;
      for (const w of this.waterSprites) w.setTexture(key);
    }
  }

  preload(): void {
    if (!this.textures.exists(this.mapKey())) this.load.image(this.mapKey(), this.mapDef.png);
    if (!this.cache.json.exists(this.dataKey())) this.load.json(this.dataKey(), this.mapDef.json);
    // pixelified protagonist sprites (from real art via the pixelify pipeline)
    // original protagonist sprites (YoYoPixel grid method)
    if (!this.textures.exists('player')) this.load.image('player', 'world/char/player.png');
    // NPC sheets: 3 frames × 3 dirs on a 20×32 cell
    const sheets = ['npc_rancher_walk', 'npc_elder_walk', 'npc_kid_walk'];
    for (const s of sheets) if (!this.textures.exists(s)) this.load.spritesheet(s, `world/char/${s}.png`, { frameWidth: 20, frameHeight: 32 });
    // protagonists (SAL + WREN): hi-res 4-frame sheets. Frame size comes from a
    // meta file loaded first, so each sheet slices right (native res, rendered down).
    for (const name of ['sal_walk', 'wren_walk']) {
      if (this.textures.exists(name)) continue;
      this.load.json(`${name}_meta`, `world/char/${name}.meta.json`);
      this.load.once(`filecomplete-json-${name}_meta`, () => {
        const m = this.cache.json.get(`${name}_meta`) as { frameW: number; frameH: number } | undefined;
        if (m) this.load.spritesheet(name, `world/char/${name}.png`, { frameWidth: m.frameW, frameHeight: m.frameH });
      });
    }
    for (const n of NPC_CHARS) if (!this.textures.exists(n)) this.load.image(n, `world/char/${n}.png`);
    // hi-res PixelLab NPC chars: metadata-driven walk sheets + portrait busts
    for (const id of NPC_CHAR_IDS) {
      const name = `${id}_walk`;
      if (!this.textures.exists(name)) {
        this.load.json(`${name}_meta`, `world/char/${name}.meta.json`);
        this.load.once(`filecomplete-json-${name}_meta`, () => {
          const m = this.cache.json.get(`${name}_meta`) as { frameW: number; frameH: number } | undefined;
          if (m) this.load.spritesheet(name, `world/char/${name}.png`, { frameWidth: m.frameW, frameHeight: m.frameH });
        });
      }
      if (!this.textures.exists(`${id}_96`)) this.load.image(`${id}_96`, `world/char/${id}_96.png`);
    }
    // animated world-layer assets
    for (const f of FX) if (!this.textures.exists(f)) this.load.image(f, `world/fx/${f}.png`);
    for (let i = 0; i < WATER_FRAMES; i++)
      if (!this.textures.exists(`water_${i}`)) this.load.image(`water_${i}`, `world/fx/water_${i}.png`);
  }

  create(): void {
    // the scene instance is reused across scene.start, so clear transient locks
    // left over from a trainer/Warden challenge — otherwise the walker stays
    // frozen on return from battle (the post-combat softlock).
    this.moving = false;
    this.toastObj = undefined;
    this.toastTimer = undefined;
    this.npcCells.clear(); // else the previous map's NPC collisions/dialogue bleed in
    this.npcTalk.clear();
    this.field = this.cache.json.get(this.dataKey()) as FieldData;
    if (hasGameState()) getGameState().flags[`visited:${this.mapId}`] = true; // world-map
    this.buildLedges();
    this.add.image(0, 0, this.mapKey()).setOrigin(0, 0).setDepth(0);
    this.buildAnimatedLayers();

    // the garage / elevator exit (heal point) — the surface map has the
    // recharge pad; the colony garage uses the Bench interact instead
    const open = this.findOpenSpawn();
    const home = this.field.spawn ?? { x: open[0], y: open[1] };
    if (this.mapDef.garage) {
      // the surface lift sits where you step off the elevator, so "up" and
      // "down" are the same marked shaft (no hunting for a separate pad)
      if (this.mapId === 'the-field' && this.field.spawn) [this.garage[0], this.garage[1]] = [this.field.spawn.x, this.field.spawn.y];
      else [this.garage[0], this.garage[1]] = this.findOpenSpawn();
      this.drawGarage();
      this.drawUseHint(this.garage[0], this.garage[1]); // the lift / recharge pad reads as usable
    } else {
      this.garage = [-99, -99]; // no recharge pad underground
    }
    // the colony freight lift (and any A-to-Use lift cell) shows a prompt
    for (const it of this.field.interacts ?? []) {
      if (it.kind === 'lift') this.drawUseHint(it.x, it.y);
      else if (it.kind === 'hovergift' && !this.flag('got_hover') && !this.partyHasHover()) this.drawUseHint(it.x, it.y, 'A: Drone');
    }

    const state = hasGameState() ? getGameState() : undefined;
    const loc = state?.location;
    if (this.enter) {
      // arrived by edge-warp: land at the opening on the arrival edge nearest
      // the column/row we left from, so the crossing reads as continuous
      const e = this.enter;
      if (e.from === 's' || e.from === 'n') {
        this.py = e.from === 's' ? this.field.rows - 1 : 0;
        this.px = this.openOnRow(this.py, e.col);
      } else {
        this.px = e.from === 'w' ? this.field.cols - 1 : 0;
        this.py = this.openOnCol(this.px, e.row);
      }
    } else if (this.enterAt && !this.solid(this.enterAt.x, this.enterAt.y)) {
      // arrived by a portal exit that named an explicit landing cell
      this.px = this.enterAt.x;
      this.py = this.enterAt.y;
    } else if (this.mapDef.garage && state?.flags['respawn-garage']) {
      [this.px, this.py] = this.garage;
      delete state.flags['respawn-garage'];
      this.time.delayedCall(200, () => this.banner("You're all recharged — stay current out there."));
    } else if (loc && loc.map === this.mapId && !this.solid(loc.x, loc.y)) {
      this.px = loc.x;
      this.py = loc.y;
    } else {
      this.px = home.x;
      this.py = home.y;
    }

    for (const k of ['npc_rancher_walk', 'npc_elder_walk', 'npc_kid_walk']) this.makeWalk(k);
    for (const k of ['sal_walk', 'wren_walk']) this.makeWalk(k, 4);
    for (const id of NPC_CHAR_IDS) this.makeWalk(`${id}_walk`, 4);

    // NPCs (placed townsfolk; block their tile) — facing the player, idle
    const t = this.field.tile;
    for (const npc of this.field.npcs ?? []) {
      const sk = `${npc.char}_walk`;
      const px = npc.col * t + t / 2;
      const py = npc.row * t + t;
      if (this.textures.exists(sk)) {
        const nm = this.cache.json.get(`${sk}_meta`) as { originY?: number; contentH?: number } | undefined;
        const spr = this.add.sprite(px, py, sk, 0).setDepth(npc.row);
        if (nm) {
          this.textures.get(sk).setFilter(Phaser.Textures.FilterMode.LINEAR);
          spr.setOrigin(0.5, nm.originY ?? 0.96).setScale(NPC_TARGET_PX / (nm.contentH ?? 92));
        } else {
          spr.setOrigin(0.5, 0.92).setScale(1.25);
        }
      } else if (this.textures.exists(npc.char)) {
        this.add.image(px, py, npc.char).setOrigin(0.5, 0.92).setScale(1.3).setDepth(npc.row);
      } else continue;
      this.npcCells.add(`${npc.col},${npc.row}`);
      if ((npc.lines && npc.lines.length) || npc.shop || npc.warden)
        this.npcTalk.set(`${npc.col},${npc.row}`, { char: npc.char, name: npc.name ?? 'Someone', lines: npc.lines ?? [], idx: 0, shop: npc.shop, warden: npc.warden });
    }

    // trainers — placed fighters who challenge you on sight (Pokémon routes)
    this.trainers = [];
    const tdefs = this.field.trainers ?? [];
    for (let i = 0; i < tdefs.length; i++) {
      const td = tdefs[i]!;
      const beaten = (state?.flags[`beat:${this.mapId}:${i}`] ?? false) === true;
      const sk = `${td.char}_walk`;
      const px = td.col * t + t / 2;
      const py = td.row * t + t;
      let spr: Phaser.GameObjects.Sprite | undefined;
      if (this.textures.exists(sk)) spr = this.add.sprite(px, py, sk, this.idleFrame(td.facing === 'e' ? 'w' : td.facing)).setFlipX(td.facing === 'e').setOrigin(0.5, 0.92).setScale(1.25).setDepth(td.row);
      this.npcCells.add(`${td.col},${td.row}`);
      this.trainers.push({ def: td, idx: i, beaten, sprite: spr });
    }

    // overworld items — visible pickups show a node; hidden ones are surprises
    this.makeItemTex();
    this.itemSprites = new Map();
    const items = this.field.items ?? [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i]!;
      if (state?.flags[`got:${this.mapId}:${i}`]) continue;
      if (!it.hidden) {
        const spr = this.add.image(it.col * t + t / 2, it.row * t + t * 0.6, 'item_node').setDepth(it.row).setScale(1.1);
        this.itemSprites.set(i, spr);
        this.tweens.add({ targets: spr, y: spr.y - 3, yoyo: true, repeat: -1, duration: 700, ease: 'Sine.InOut' });
      }
    }

    // player = the chosen preset's hi-res 4-frame walk sprite (SAL or WREN)
    const preset = hasGameState() ? getGameState().preset : 'SAL';
    const sheet = preset === 'WREN' ? 'wren_walk' : 'sal_walk';
    const hiRes = this.textures.exists(sheet);
    this.walkKey = hiRes ? sheet : 'wren_walk';
    this.useSheet = this.textures.exists(this.walkKey);
    this.playerN = 4;
    const key = this.useSheet ? this.walkKey : this.textures.exists('player') ? 'player' : this.walkKey;
    this.player = this.add.sprite(0, 0, key, 0).setDepth(50);
    const m = hiRes ? (this.cache.json.get(`${sheet}_meta`) as { originY?: number; contentH?: number } | undefined) : undefined;
    if (hiRes && m) {
      this.textures.get(sheet).setFilter(Phaser.Textures.FilterMode.LINEAR); // smooth render-down, no baked crush
      this.player.setOrigin(0.5, m.originY ?? 0.95).setScale(PLAYER_TARGET_PX / (m.contentH ?? 144));
    } else {
      this.player.setOrigin(0.5, 0.92).setScale(this.useSheet ? 1.25 : 1.3);
    }
    this.placePlayer();

    this.cameras.main.setBounds(0, 0, this.field.width, this.field.height);
    this.cameras.main.startFollow(this.player, true, 0.18, 0.18);
    this.cameras.main.setRoundPixels(true);

    this.controls = new Controls(this);
    this.events.on('resume', () => this.controls.clearQueue());
    this.cameras.main.fadeIn(360, 18, 12, 8);
    this.banner(this.mapDef.banner);
    if (this.introTutorial) {
      // first walk: controls, then the supply-run charge (the colony sends you up)
      this.time.delayedCall(2400, () => this.banner('Move with the arrow keys. Press A to talk, read, and rummage.'));
      this.time.delayedCall(5200, () => this.banner('Grandma needs a supply cache from topside. Say bye, look in on Banjo, then take the lift up.'));
    }
    if (hasGameState()) getAudio().applyPrefs(getGameState().audio); // restore saved volume/mute
    getAudio().ensureBgm(this, bgmForMap(this.mapId)); // per-map theme; background-loads, never blocks create
    this.input.keyboard?.on('keydown-M', () => getAudio().toggleMute());
    this.handlePrologue();
    this.handleActI();
    this.handleRailhead();
  }

  /** Build per-direction walk anims. n = frames/dir: NPCs/WREN use a 3-wide
   * sheet ([0,1,0,2] bounce); SAL uses a 4-wide sheet (a true 0→1→2→3 cycle). */
  private makeWalk(key: string, n = 3): void {
    if (!this.textures.exists(key)) return;
    const fps = key.includes('run') ? 11 : n === 4 ? 10 : 7; // SAL's 4-frame cycle reads smoother a touch brisker
    const mk = (d: string, frames: number[]): void => {
      const k = `${key}-${d}`;
      if (!this.anims.exists(k)) this.anims.create({ key: k, frames: frames.map((f) => ({ key, frame: f })), frameRate: fps, repeat: -1 });
    };
    const cyc = n === 4 ? [0, 1, 2, 3] : [0, 1, 0, 2];
    mk('s', cyc.map((c) => 0 * n + c));
    mk('n', cyc.map((c) => 1 * n + c));
    mk('w', cyc.map((c) => 2 * n + c));
  }
  private idleFrame(d: string, n = 3): number {
    return (d === 'n' ? 1 : d === 'w' ? 2 : 0) * n;
  }

  private garage: [number, number] = [1, 1];

  private drawGarage(): void {
    const t = this.field.tile;
    const gx = this.garage[0] * t;
    const gy = this.garage[1] * t;
    // a small recharge pad marker (the colony garage door / elevator head)
    this.add.rectangle(gx + t / 2, gy + t / 2, t - 4, t - 4, 0x3a78a0, 0.5).setStrokeStyle(2, 0x9fe0ff).setDepth(1);
    this.add.text(gx + t / 2, gy + t / 2, '⤓', { fontFamily: 'monospace', fontSize: '14px', color: '#e8f4ff' }).setOrigin(0.5).setDepth(1);
  }

  private atGarage(): boolean {
    return Math.abs(this.px - this.garage[0]) + Math.abs(this.py - this.garage[1]) <= 1;
  }

  private recharge(msg = "Garage: you're all recharged — stay current."): void {
    if (!hasGameState()) return;
    const state = getGameState();
    for (const b of state.party) {
      b.integrity = b.stats.integrity;
      b.status = undefined;
      b.statusTurns = 0;
      b.glitchedTurns = 0;
      for (const m of b.moves) m.pp = m.maxPp;
    }
    getAudio().playOneShot('jingle.recharge');
    this.banner(msg);
  }

  // ---- Prologue: "The Call" (Story Bible) ---------------------------------

  private flag(k: string): boolean {
    return hasGameState() && getGameState().flags[k] === true;
  }
  /** The opening sequence is unfinished (gates the region edges + drives beats). */
  private prologueActive(): boolean {
    return hasGameState() && !this.flag(PRO.done);
  }
  /** The night-call beat is live: the surface is dark and a fight is waiting. */
  private prologueNight(): boolean {
    return this.flag(PRO.nightcall) && !this.flag(PRO.done);
  }

  /** A blue night wash over the whole scene during the night-call beat. */
  private applyNightTint(): void {
    this.add.rectangle(0, 0, this.field.width, this.field.height, 0x0a1430, 0.5).setOrigin(0, 0).setDepth(80);
  }

  /** Run whatever prologue beat the current map + flags call for. */
  private handlePrologue(): void {
    if (!hasGameState()) return;
    if (this.prologueNight()) this.applyNightTint();

    if (this.mapId === 'the-field') {
      // won the night fight -> the Breaker binds, then the road opens
      if (this.flag(PRO.breaker) && !this.flag(PRO.done)) {
        getGameState().flags[PRO.done] = true; // mark done so the return is free to travel
        this.moving = true;
        this.time.delayedCall(700, () => fadeTo(this, 'cutscene', { cutscene: BREAKER_BOUND }, FADE_COLD, 480));
        return;
      }
      // back up at night: a Static-warped Ohm guards the buried safe — forced fight
      if (this.prologueNight()) {
        this.moving = true;
        this.banner('The Field is wrong at night. Something is clawing at the dead ground ahead.');
        this.time.delayedCall(1500, () => this.startIncitingFight());
        return;
      }
      // daytime supply run: objective, or the nudge home once the cache is in hand
      if (!this.flag(PRO.done)) {
        const got = this.flag(PRO.supply);
        this.time.delayedCall(2200, () =>
          this.banner(got ? 'You have what Grandma needs. Head back to the lift you rode up (the glowing pad) and press A to ride down.' : 'The supply cache is out here in the grass. Grab it and get home before dark.'),
        );
      } else if (!this.flag(PRO.charge)) {
        // fresh off the Breaker reveal: the charge to leave Ohmstead
        getGameState().flags[PRO.charge] = true;
        this.time.delayedCall(900, () => this.banner('Get home. Wake Grandma. The colony has to hear this. The road north is open now.'));
      }
    }

    // returned to the colony after the supply run: steer the kid to the bunk
    if (this.mapId === 'ohmstead' && !this.introTutorial && this.flag(PRO.supply) && !this.flag(PRO.nightcall)) {
      this.time.delayedCall(1800, () => this.banner("Grandma's asleep. Get some rest — your bunk's in the corner. (Press A at the bed.)"));
    }
  }

  /** The bunk: only meaningful the night after the supply run — it triggers
   * the night-call beat (the handheld wakes). */
  private useBed(): void {
    if (this.flag(PRO.supply) && !this.flag(PRO.nightcall)) {
      getGameState().flags[PRO.nightcall] = true;
      this.moving = true;
      this.banner('You lie down. Sleep takes you fast...');
      this.time.delayedCall(1200, () => fadeTo(this, 'cutscene', { cutscene: NIGHT_CALL }, FADE_COLD, 600));
    } else if (this.flag(PRO.done)) {
      this.banner('Your bunk. You could sleep for a week. No time for that now.');
    } else {
      this.banner("Your bunk. No time to sleep yet — there's a supply run to finish.");
    }
  }

  /** The colony freight lift up to the Field (A-to-Use, with a tooltip). It is
   * off-limits while you owe Grandma a night's sleep, so the night-call beat
   * can't be skipped by riding up again. */
  private useLift(): void {
    if (this.flag(PRO.supply) && !this.flag(PRO.nightcall)) {
      this.banner("Not now. You're back with the cache — get some rest first. Your bunk's in the corner.");
      return;
    }
    if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
    getAudio().select();
    this.scene.start('elevator');
  }

  /** A bobbing "A: Use" prompt floating over a lift / interact cell. */
  private drawUseHint(col: number, row: number, label = 'A to Use'): void {
    const t = this.field.tile;
    const x = col * t + t / 2;
    const y = row * t - 4;
    const bg = this.add.rectangle(x, y, label.length * 5 + 8, 11, 0x14110c, 0.8).setStrokeStyle(1, 0x6a5638).setDepth(150);
    const txt = this.add.text(x, y, label, { fontFamily: 'monospace', fontSize: '8px', color: '#ffd27a' }).setOrigin(0.5).setDepth(151);
    this.tweens.add({ targets: [bg, txt], y: '-=2', yoyo: true, repeat: -1, duration: 760, ease: 'Sine.InOut' });
  }

  /** Ride the lift back down into the colony at the end of the supply run. */
  private descendToColony(): void {
    if (hasGameState()) getGameState().location = { map: 'the-field', x: this.px, y: this.py };
    this.moving = true;
    this.banner('You ride the lift back down into Ohmstead.');
    this.cameras.main.fade(420, 8, 8, 12);
    this.time.delayedCall(440, () => this.scene.start('fieldhd', { mapId: 'ohmstead' }));
  }

  /** The inciting battle: the warped guardian of the safe (win -> the Breaker). */
  private startIncitingFight(): void {
    const state = getGameState();
    state.location = { map: 'the-field', x: this.px, y: this.py };
    const foe = makeBattler(GAME_DATA.species(WARPED_SPECIES), 7, GAME_DATA);
    if (!state.manifest.seen.includes(foe.speciesNum)) state.manifest.seen.push(foe.speciesNum);
    this.scene.start('battle', {
      kind: 'trainer',
      foes: [foe],
      foeName: 'A Static-warped Ohm',
      battleType: 'legendary', // ominous theme + a heavier victory fanfare
      seed: nextSeed(state),
      returnScene: 'fieldhd',
      onVictoryFlag: PRO.breaker,
    });
  }

  // ---- Act I: "The Spotting" + Rook, the first rival battle ----------------

  /** Drive the Farm Road's opening beat: the Spotting cutscene, the forced
   * rival fight with Rook, and his parting words. */
  private handleActI(): void {
    if (this.mapId !== 'farmroad' || !hasGameState()) return;
    if (!this.flag(PRO.done)) return; // only after the prologue hands you the road
    const f = getGameState().flags;
    // beat Rook -> his parting words, then the road is yours
    if (f[ACT1.rook] === true && f[ACT1.rookDone] !== true) {
      f[ACT1.rookDone] = true;
      this.moving = true;
      this.time.delayedCall(700, () => fadeTo(this, 'cutscene', { cutscene: ROOK_AFTERMATH }, FADE_COLD, 480));
      return;
    }
    // first arrival on the road: the Spotting, then Rook's challenge
    if (f[ACT1.spotting] !== true) {
      f[ACT1.spotting] = true;
      this.moving = true;
      this.time.delayedCall(800, () => fadeTo(this, 'cutscene', { cutscene: THE_SPOTTING }, FADE_COLD, 600));
      return;
    }
    // seen the Spotting but not yet beaten Rook: the forced rival fight
    if (f[ACT1.rook] !== true) {
      this.moving = true;
      this.banner('Rook is already on the road, arms crossed, waiting for you.');
      this.time.delayedCall(1400, () => this.startRivalFight());
    }
  }

  /** The first rival battle: Rook's raider team (rival theme + fanfare). */
  private startRivalFight(): void {
    const state = getGameState();
    state.location = { map: 'farmroad', x: this.px, y: this.py };
    const foes = ROOK_TEAM.map((m) => makeBattler(GAME_DATA.species(m.num), m.level, GAME_DATA));
    for (const fo of foes) if (!state.manifest.seen.includes(fo.speciesNum)) state.manifest.seen.push(fo.speciesNum);
    this.scene.start('battle', {
      kind: 'trainer',
      foes,
      foeName: 'Rook',
      battleType: 'rival',
      seed: nextSeed(state),
      returnScene: 'fieldhd',
      onVictoryFlag: ACT1.rook,
    });
  }

  // ---- Act I, beat 7: Railhead (Colony 1) — the sabotaged-relay trial -------

  /** Railhead's arrival beat (The Current / the Downtowns) and the post-relay
   * nudge toward the Warden. */
  private handleRailhead(): void {
    if (this.mapId !== 'railhead' || !hasGameState()) return;
    const f = getGameState().flags;
    if (f[RAIL.intro] !== true) {
      f[RAIL.intro] = true;
      this.time.delayedCall(2000, () => this.banner("The Current crackles from a wall-set: '...Garrison patrols pushing north, herding wild Ohms...' Static eats the rest."));
      this.time.delayedCall(6600, () => this.banner('RAILHEAD, the rail junction. Warden Marrow holds court at the Roundhouse, west. But the colony relay is down. Sabotaged. Clear it and Railhead might just listen to you.'));
    } else if (f[RAIL.relay] === true && f[RAIL.relayDone] !== true) {
      f[RAIL.relayDone] = true;
      this.time.delayedCall(1500, () => this.banner('The relay hums back to life. Warden Marrow will see you now, west at the Roundhouse.'));
    }
    // a marker over the switch-house until the relay is cleared
    if (f[RAIL.relay] !== true)
      for (const it of this.field.interacts ?? []) if (it.kind === 'relay') this.drawUseHint(it.x, it.y, 'A: Relay');
  }

  /** The sabotaged relay: a stand-off with Captain Holt, the first visibly
   * Static-touched Militant. Beating him clears the relay (and the Warden gate). */
  private useRelay(): void {
    if (this.flag(RAIL.relay)) {
      this.banner('The relay hums steady again. Railhead is back on the air.');
      return;
    }
    this.moving = true;
    this.banner('A Garrison officer stands at the relay, eyes glassy. "Captain Holt. This is a... lawful checkpoint. Stand— stand down." His words land a half-second late.');
    this.time.delayedCall(1700, () => this.startRelayFight());
  }

  private startRelayFight(): void {
    const state = getGameState();
    state.location = { map: 'railhead', x: this.px, y: this.py };
    const foes = HOLT_TEAM.map((m) => makeBattler(GAME_DATA.species(m.num), m.level, GAME_DATA));
    for (const fo of foes) if (!state.manifest.seen.includes(fo.speciesNum)) state.manifest.seen.push(fo.speciesNum);
    this.scene.start('battle', {
      kind: 'trainer',
      foes,
      foeName: 'Captain Holt',
      battleType: 'militant',
      seed: nextSeed(state),
      returnScene: 'fieldhd',
      onVictoryFlag: RAIL.relay,
    });
  }

  override update(_time: number, delta: number): void {
    this.animate(delta); // wind sway + water flow run every frame
    if (this.moving) return;
    if (this.controls.consume('start') && hasGameState()) {
      this.scene.launch('menu', { from: 'fieldhd' });
      this.scene.pause();
      return;
    }
    if (this.controls.consume('a')) {
      if (this.atGarage()) {
        // during the supply run the lift head carries you back down to the colony
        if (this.mapId === 'the-field' && this.flag(PRO.supply) && !this.flag(PRO.nightcall)) {
          this.descendToColony();
          return;
        }
        this.recharge();
        return;
      }
      if (this.tryInteract()) return;
    }
    for (const dir of ['up', 'down', 'left', 'right'] as Dir[]) {
      if (this.controls.isHeld(dir)) {
        this.step(dir);
        return;
      }
    }
    // no direction held → settle on the idle/contact frame and stop the cycle
    if (this.useSheet && this.player.anims.isPlaying) {
      this.player.anims.stop();
      const d = this.facing === 'up' ? 'n' : this.facing === 'down' ? 's' : 'w';
      this.player.setFrame(this.idleFrame(d, this.playerN));
    }
  }

  private npcCells = new Set<string>();
  private npcTalk = new Map<string, { char?: string; name: string; lines: string[]; idx: number; shop?: string; warden?: WardenDef }>();
  private trainers: Array<{ def: TrainerDef; idx: number; beaten: boolean; sprite?: Phaser.GameObjects.Sprite }> = [];
  private itemSprites = new Map<number, Phaser.GameObjects.Image>();

  /** A small amber item-node marker texture (parcel on the ground). */
  private makeItemTex(): void {
    if (this.textures.exists('item_node')) return;
    const g = this.make.graphics({ x: 0, y: 0 }, false);
    g.fillStyle(0x2a2018, 1).fillCircle(7, 8, 6); // shadow base
    g.fillStyle(0xffd27a, 1).fillCircle(7, 6, 5); // amber ball
    g.fillStyle(0xfff4d8, 1).fillCircle(5, 4, 2); // highlight
    g.fillStyle(0x6a4d1c, 1).fillRect(2, 6, 10, 1); // seam
    g.generateTexture('item_node', 14, 14);
    g.destroy();
  }

  /** Walk-onto pickup: collect any item on the player's cell. */
  private checkItems(): void {
    if (!hasGameState()) return;
    const state = getGameState();
    const items = this.field.items ?? [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i]!;
      if (it.col !== this.px || it.row !== this.py) continue;
      if (state.flags[`got:${this.mapId}:${i}`]) continue;
      state.flags[`got:${this.mapId}:${i}`] = true;
      state.credits += it.credits;
      this.itemSprites.get(i)?.destroy();
      getAudio().playOneShot('jingle.obtain_item');
      // the first Field pickup during the opening IS the supply run's cache
      if (this.mapId === 'the-field' && i === 0 && this.prologueActive() && !this.flag(PRO.nightcall)) {
        state.flags[PRO.supply] = true;
        this.banner('Supply cache, secured. For a heartbeat the grass goes still — then nothing. Get home before dark.');
        continue;
      }
      this.banner(`${it.label ?? (it.hidden ? 'Hidden cache' : 'A node pickup')} — found ${it.credits} credits!`);
    }
  }

  /** A waiting trainer whose sightline the player just stepped into challenges. */
  private checkTrainers(): boolean {
    if (!hasGameState()) return false;
    for (const tr of this.trainers) {
      if (tr.beaten) continue;
      const [dx, dy] = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] }[tr.def.facing] as [number, number];
      const range = tr.def.range ?? 4;
      for (let r = 1; r <= range; r++) {
        const cx = tr.def.col + dx * r;
        const cy = tr.def.row + dy * r;
        if (this.solid(cx, cy)) break; // wall/NPC blocks the line of sight
        if (cx === this.px && cy === this.py) {
          this.startTrainer(tr);
          return true;
        }
      }
    }
    return false;
  }

  /** Has this colony's Warden been beaten? (gate + post-fight dialogue key) */
  private wardenBeaten(): boolean {
    return hasGameState() && getGameState().flags[`beat:${this.mapId}:warden`] === true;
  }

  /** Talk to a Warden → the colony boss fight (warden theme, Patch reward, gate). */
  private startWarden(name: string, warden: WardenDef): void {
    // Railhead's Warden won't spar until you've earned the colony's trust by
    // clearing the sabotaged relay (the first-colony trial, Bible beat 7).
    if (this.mapId === 'railhead' && !this.flag(RAIL.relay)) {
      this.banner("Warden Marrow: Coin's one thing. Trust is another. Clear the sabotaged relay first, then we'll talk.");
      return;
    }
    this.moving = true;
    const state = getGameState();
    state.location = { map: this.mapId, x: this.px, y: this.py };
    this.banner(warden.bark ?? `${name}: Show me what you've made.`);
    this.time.delayedCall(900, () => {
      const foes = warden.team.map((m) => makeBattler(GAME_DATA.species(m.num), m.level, GAME_DATA));
      for (const f of foes) if (!state.manifest.seen.includes(f.speciesNum)) state.manifest.seen.push(f.speciesNum);
      this.scene.start('battle', {
        kind: 'trainer',
        foes,
        foeName: name,
        battleType: 'warden',
        patch: warden.patch,
        seed: nextSeed(state),
        returnScene: 'fieldhd',
        onVictoryFlag: `beat:${this.mapId}:warden`,
      });
    });
  }

  private startTrainer(tr: { def: TrainerDef; idx: number }): void {
    this.moving = true; // lock the walker
    const state = getGameState();
    getGameState().location = { map: this.mapId, x: this.px, y: this.py };
    const t = this.field.tile;
    const mark = this.add.text(tr.def.col * t + t / 2, tr.def.row * t - 4, '!', { fontFamily: 'monospace', fontSize: '20px', color: '#ffd27a', fontStyle: 'bold' }).setOrigin(0.5, 1).setDepth(300);
    this.tweens.add({ targets: mark, y: mark.y - 6, yoyo: true, duration: 160, repeat: 1 });
    this.banner(tr.def.bark ?? `${tr.def.name} blocks the way — and wants to battle!`);
    this.time.delayedCall(820, () => {
      const foes = tr.def.team.map((m) => makeBattler(GAME_DATA.species(m.num), m.level, GAME_DATA));
      for (const f of foes) if (!state.manifest.seen.includes(f.speciesNum)) state.manifest.seen.push(f.speciesNum);
      this.scene.start('battle', { kind: 'trainer', foes, foeName: tr.def.name, seed: nextSeed(state), returnScene: 'fieldhd', onVictoryFlag: `beat:${this.mapId}:${tr.idx}` });
    });
  }

  /** Face-adjacent interact: bench (the colony garage Bench), etc. */
  private tryInteract(): boolean {
    const [dx, dy] = DELTA[this.facing];
    const fx = this.px + dx;
    const fy = this.py + dy;
    const talk = this.npcTalk.get(`${fx},${fy}`);
    if (talk) {
      if (talk.shop) {
        this.scene.launch('shop', { tier: talk.shop, from: 'fieldhd', map: this.mapId });
        this.scene.pause();
        return true;
      }
      // an un-beaten Warden challenges you to a boss fight; after, their lore lines read
      if (talk.warden && !this.wardenBeaten()) {
        this.startWarden(talk.name, talk.warden);
        return true;
      }
      if (talk.lines.length) {
        const pk = talk.char ? `${talk.char}_96` : undefined;
        this.banner(`${talk.name}: ${talk.lines[talk.idx]}`, pk && this.textures.exists(pk) ? pk : undefined);
        talk.idx = (talk.idx + 1) % talk.lines.length;
      }
      return true;
    }
    for (const s of this.field.signs ?? []) {
      if ((s.col === fx && s.row === fy) || (s.col === this.px && s.row === this.py)) {
        this.banner(s.text);
        return true;
      }
    }
    for (const it of this.field.interacts ?? []) {
      if ((it.x === fx && it.y === fy) || (it.x === this.px && it.y === this.py)) {
        if (it.kind === 'bench') {
          this.banner("Grandpa's Bench. Your partner was built here. (Press the lift topside to recharge.)");
        } else if (it.kind === 'eli') {
          this.banner("Grandpa Eli's photo, and his worn logbook, Ohm's Law. Five years gone, and the bench still smells of solder and him. The last entry just... stops mid-line.");
        } else if (it.kind === 'banjo') {
          this.banjoHello(it.x, it.y);
        } else if (it.kind === 'bed') {
          this.useBed();
        } else if (it.kind === 'lift') {
          this.useLift();
        } else if (it.kind === 'relay') {
          this.useRelay();
        } else if (it.kind === 'hovergift') {
          this.takeHoverDrone();
        } else if (it.kind === 'heal') {
          this.recharge('A field medic tops off your Ohms. Recharged. Stay current.');
        } else if (it.kind === 'shop') {
          this.scene.launch('shop', { tier: it.tier ?? 'colony', from: 'fieldhd', map: this.mapId });
          this.scene.pause();
        } else {
          this.banner('You poke at it. Nothing happens.');
        }
        return true;
      }
    }
    return false;
  }

  /** Exit warp: stepping onto an exit cell hands off to its target scene. */
  private checkExit(): boolean {
    for (const ex of this.field.exits ?? []) {
      if (ex.x === this.px && ex.y === this.py) {
        if (ex.gate === 'warden' && !this.wardenBeaten()) {
          this.banner('The colony Warden holds this gate — best them first.');
          return true; // stand at the gate; no warp until the Warden is beaten
        }
        if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
        this.cameras.main.fade(360, 12, 10, 8);
        const { scene, mapId, to } = ex;
        this.time.delayedCall(380, () => this.scene.start(scene, { mapId, to }));
        return true;
      }
    }
    return false;
  }

  private solid(cx: number, cy: number): boolean {
    if (cx < 0 || cy < 0 || cx >= this.field.cols || cy >= this.field.rows) return true;
    if (this.npcCells.has(`${cx},${cy}`)) return true;
    if (this.ledgeCells.has(`${cx},${cy}`)) return true; // ledges blocked except the one-way hop
    return this.field.collision[cy * this.field.cols + cx] === 1;
  }

  /** Open water that only a HOVER Ohm can cross (the Cistern gate). */
  private isHoverGate(cx: number, cy: number): boolean {
    const h = this.field.hover;
    return !!h && h[cy * this.field.cols + cx] === 1;
  }
  private partyHasHover(): boolean {
    return hasGameState() && partyHasFieldAbility(getGameState().party, 'HOVER');
  }

  /** Take the Cistern's survey Dronelet — guarantees a HOVER Ohm so any party
   * can cross the flood. */
  private takeHoverDrone(): void {
    const state = getGameState();
    if (this.partyHasHover()) {
      this.banner('The survey drone bobs in its cradle. One of yours already hovers — leave this for the next crew.');
      return;
    }
    if (state.flags['got_hover']) {
      this.banner('The cradle is empty. You already took the survey drone.');
      return;
    }
    const ohm = makeBattler(GAME_DATA.species(HOVER_GIFT_SPECIES), 10, GAME_DATA);
    if (!state.manifest.freed.includes(ohm.speciesNum)) state.manifest.freed.push(ohm.speciesNum);
    if (!state.manifest.seen.includes(ohm.speciesNum)) state.manifest.seen.push(ohm.speciesNum);
    if (state.party.length < 3) state.party.push(ohm);
    else state.garage.push(ohm);
    state.flags['got_hover'] = true;
    getAudio().playOneShot('jingle.obtain_item');
    this.banner('You lift a battered survey Dronelet from its cradle. It hums, rises, and tucks in beside you. It can HOVER you across the flood.');
  }

  private ledgeCells = new Map<string, Dir>();
  private buildLedges(): void {
    this.ledgeCells.clear();
    const map: Record<string, Dir> = { n: 'up', s: 'down', w: 'left', e: 'right' };
    for (const l of this.field.ledges ?? []) this.ledgeCells.set(`${l.col},${l.row}`, map[l.dir] ?? 'down');
  }
  private ledgeAt(cx: number, cy: number): Dir | undefined {
    return this.ledgeCells.get(`${cx},${cy}`);
  }

  /** Hop a one-way ledge: vault two tiles in `dir`, landing past the lip. */
  private hopLedge(dir: Dir): void {
    const [dx, dy] = DELTA[dir];
    const lx = this.px + 2 * dx;
    const ly = this.py + 2 * dy;
    if (lx < 0 || ly < 0 || lx >= this.field.cols || ly >= this.field.rows || this.solid(lx, ly)) {
      this.placePlayer(); // nowhere to land — bump
      return;
    }
    this.moving = true;
    this.px = lx;
    this.py = ly;
    const d = dir === 'up' ? 'n' : dir === 'down' ? 's' : 'w';
    this.player.setFlipX(dir === 'right');
    if (this.useSheet) this.player.play(`${this.walkKey}-${d}`, true);
    const t = this.field.tile;
    const sx = this.player.x;
    const sy = this.player.y;
    const tx = lx * t + t / 2;
    const ty = ly * t + t / 2;
    const arc = { p: 0 };
    this.tweens.add({
      targets: arc,
      p: 1,
      duration: 260,
      ease: 'Linear',
      onUpdate: () => {
        this.player.x = sx + (tx - sx) * arc.p;
        this.player.y = sy + (ty - sy) * arc.p - Math.sin(arc.p * Math.PI) * 14;
      },
      onComplete: () => {
        this.moving = false;
        if (this.useSheet) {
          this.player.anims.stop();
          this.player.setFrame(this.idleFrame(d, this.playerN));
        }
        if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
        if (this.checkExit()) return;
        this.checkItems();
        if (this.checkTrainers()) return;
        if (this.isGrass(this.px, this.py)) this.tryEncounter();
      },
    });
  }

  private isGrass(cx: number, cy: number): boolean {
    return this.field.grass[cy * this.field.cols + cx] === 1;
  }

  /** Seamless hand-off to the region neighbour on the opposite edge. */
  private edgeWarp(nb: string, dir: Dir4): void {
    if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
    this.cameras.main.fade(300, 14, 16, 12);
    const enter = { from: OPPOSITE[dir], col: this.px, row: this.py };
    this.time.delayedCall(320, () => this.scene.start('fieldhd', { mapId: nb, enter }));
  }

  /** The walkable column on `row` nearest `col` (the edge opening). */
  private openOnRow(row: number, col: number): number {
    for (let d = 0; d < this.field.cols; d++)
      for (const c of [col - d, col + d]) if (c >= 0 && c < this.field.cols && !this.solid(c, row)) return c;
    return this.findOpenSpawn()[0];
  }
  /** The walkable row on `col` nearest `row` (the edge opening). */
  private openOnCol(col: number, row: number): number {
    for (let d = 0; d < this.field.rows; d++)
      for (const r of [row - d, row + d]) if (r >= 0 && r < this.field.rows && !this.solid(col, r)) return r;
    return this.findOpenSpawn()[1];
  }

  private findOpenSpawn(): [number, number] {
    const cx = Math.floor(this.field.cols / 2);
    const cy = Math.floor(this.field.rows / 2);
    for (let r = 0; r < Math.max(this.field.cols, this.field.rows); r++) {
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (!this.solid(x, y)) return [x, y];
        }
    }
    return [1, 1];
  }

  private step(dir: Dir): void {
    this.facing = dir;
    const [dx, dy] = DELTA[dir];
    const nx = this.px + dx;
    const ny = this.py + dy;
    // stepping off an open map edge → seamless edge-warp to the region neighbour
    if (nx < 0 || ny < 0 || nx >= this.field.cols || ny >= this.field.rows) {
      // the opening prologue pins you to the Field until the Breaker is yours
      if (this.mapId === 'the-field' && this.prologueActive()) {
        this.placePlayer();
        this.banner('Not yet. Finish what you came up for, then get home.');
        return;
      }
      const d4: Dir4 = dir === 'up' ? 'n' : dir === 'down' ? 's' : dir === 'left' ? 'w' : 'e';
      const nb = neighbor(this.mapId, d4);
      if (nb && MAPS[nb]) {
        this.edgeWarp(nb, d4);
        return;
      }
      this.placePlayer(); // region boundary — bump
      return;
    }
    // a one-way ledge faced the right way → vault it (skips the solid check)
    if (this.ledgeAt(nx, ny) === dir) {
      this.hopLedge(dir);
      return;
    }
    if (this.solid(nx, ny)) {
      // open water (the HOVER gate): a hovering Ohm glides you across; otherwise bump
      if (this.isHoverGate(nx, ny)) {
        if (!this.partyHasHover()) {
          this.placePlayer();
          this.banner('The flooded chamber blocks the way. You need an Ohm that can HOVER to cross.');
          return;
        }
        // fall through — glide onto the water tile
      } else {
        this.placePlayer(); // bump
        return;
      }
    }
    this.moving = true;
    this.px = nx;
    this.py = ny;
    const run = this.controls.isHeld('b');
    const d = dir === 'up' ? 'n' : dir === 'down' ? 's' : 'w';
    this.player.setFlipX(dir === 'right'); // W faces left; mirror for E
    if (this.useSheet) this.player.play(`${this.walkKey}-${d}`, true);
    this.tweens.add({
      targets: this.player,
      x: nx * this.field.tile + this.field.tile / 2,
      y: ny * this.field.tile + this.field.tile / 2,
      duration: run ? RUN_MS : WALK_MS,
      onComplete: () => {
        this.moving = false;
        // NB: do not stop/reset the walk anim here — when a direction is still
        // held the next step() keeps it playing, so the 4-frame cycle flows
        // instead of restarting every tile (which read as jitter). update()
        // settles to the idle frame once no direction is held.
        if (hasGameState()) getGameState().location = { map: this.mapId, x: this.px, y: this.py };
        if (this.checkExit()) return;
        this.checkItems();
        if (this.checkTrainers()) return;
        if (this.isGrass(this.px, this.py)) this.tryEncounter();
      },
    });
  }

  private rng = new Rng(Date.now() >>> 0);

  private tryEncounter(): void {
    if (!hasGameState()) {
      if (Phaser.Math.Between(0, 100) < 22) this.banner('The grass rustles — a wild Ohm is near!');
      return;
    }
    // one-time typing primer the first time you wade into tall grass — taught
    // before the first wild fight, so the lesson lands when it matters
    if (!this.flag('tut_types')) {
      getGameState().flags['tut_types'] = true;
      this.typingPrimer();
      return; // hold this step's encounter so the lesson isn't cut off by a battle
    }
    const zone = ZONES_BY_ID.get(this.field.zone ?? 'field-grass') ?? ZONES_BY_ID.get('field-grass');
    if (!zone) return;
    const state = getGameState();
    const dampened = state.flags['dampener'] === true;
    const spawn = rollEncounter(zone, this.rng, dampened);
    if (!spawn) return;
    if (!state.manifest.seen.includes(spawn.speciesNum)) state.manifest.seen.push(spawn.speciesNum);
    const foe = makeBattler(GAME_DATA.species(spawn.speciesNum), spawn.level, GAME_DATA);
    this.scene.start('battle', { kind: 'wild', foes: [foe], seed: nextSeed(state), returnScene: 'fieldhd' });
  }

  private placePlayer(): void {
    this.player.setPosition(this.px * this.field.tile + this.field.tile / 2, this.py * this.field.tile + this.field.tile / 2);
  }

  /** One-time "how typing works" primer (playtest #7), three terse banners. */
  private typingPrimer(): void {
    this.banner('Tall grass hides wild Ohms. Time to put that partner to work.');
    this.time.delayedCall(4000, () => this.banner('Every Ohm and every move has a TYPE. Hit a weakness and it is SUPER EFFECTIVE: big damage.'));
    this.time.delayedCall(8200, () => this.banner('Hit a resistance and it barely scratches. Read the foe and pick the move that counters it.'));
  }

  /** Banjo — Grandpa's old Jukeboxer — hums its two-note hello (charm beat). */
  private banjoHello(col: number, row: number): void {
    const t = this.field.tile;
    const bx = col * t + t / 2;
    const by = row * t - 2;
    for (let i = 0; i < 2; i++) {
      const note = this.add.text(bx + (i === 0 ? -6 : 8), by, '♪', { fontFamily: 'monospace', fontSize: '14px', color: '#ffd27a', fontStyle: 'bold' }).setOrigin(0.5, 1).setDepth(300);
      this.tweens.add({ targets: note, y: note.y - 18, alpha: 0, duration: 1100, delay: i * 260, ease: 'Sine.Out', onComplete: () => note.destroy() });
    }
    this.banner('Banjo — Grandpa\'s old Jukeboxer — hums two notes: its hello. You hum them back.');
  }

  private banner(text: string, portraitKey?: string): void {
    this.toastObj?.destroy();
    this.toastTimer?.remove();
    const W = 460;
    const PAD = 14;
    const RISE = 34; // how far the speaker's bust peeks up above the box's top edge

    // a small speaker bust that sits BEHIND the text box, its head rising just
    // above the top edge (the box covers the rest). Text spans the full width.
    const portrait = portraitKey && this.textures.exists(portraitKey)
      ? this.add.image(0, 0, portraitKey)
      : null;

    // left-aligned so it can type out cleanly; wrap to the box so long lines never overflow.
    const style = {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#f4ecd8',
      align: 'left' as const,
      wordWrap: { width: W - PAD * 2 },
    };
    // measure the FULL text first to size the box, so it doesn't resize while typing
    const t = this.add.text(0, 0, text, style).setOrigin(0, 0);
    const h = Math.max(28, Math.round(t.height) + PAD);
    const cy = 320 - 8 - h / 2; // rest just above the bottom edge
    const box = this.add.rectangle(240, cy, W, h, 0x1a1410, 0.92).setStrokeStyle(2, 0xe8d8a8);
    t.setPosition(240 - W / 2 + PAD, cy - h / 2 + PAD / 2);
    const items: Phaser.GameObjects.GameObject[] = [];
    if (portrait) {
      // bottom-anchored at the box's lower edge so a constant RISE of head shows above
      portrait.setScale((h + RISE) / portrait.height).setOrigin(0.5, 1).setPosition(240 - W / 2 + 56, cy + h / 2 - 1);
      items.push(portrait); // pushed first → renders behind the box
    }
    items.push(box, t);
    const c = this.add.container(0, 0, items).setScrollFactor(0).setDepth(200);
    this.toastObj = c;

    // type the dialogue out with a subtle running tick so you can see/hear it populate
    t.setText('');
    let shown = 0;
    getAudio().textBlip();
    this.toastTimer = this.time.addEvent({
      delay: 26,
      loop: true,
      callback: () => {
        if (this.toastObj !== c) {
          this.toastTimer?.remove();
          return;
        }
        const prev = shown;
        shown = Math.min(text.length, shown + 1);
        t.setText(text.slice(0, shown));
        if (Math.floor(prev / 3) !== Math.floor(shown / 3) && text[shown - 1] !== ' ') getAudio().textBlip();
        if (shown >= text.length) {
          this.toastTimer?.remove();
          this.toastTimer = undefined;
        }
      },
    });

    const ms = text.length * 26 + 2200; // finish typing (~26ms/char) then linger ~2.2s to read
    this.time.delayedCall(ms, () => {
      if (this.toastObj === c) {
        this.toastTimer?.remove();
        this.toastTimer = undefined;
        c.destroy();
        this.toastObj = undefined;
      }
    });
  }
}
