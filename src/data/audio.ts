/**
 * Soundtrack manifest + scene/map/battle → track resolution (spec §11 naming).
 * Pure data, no Phaser import (node-testable). Track ids map to files by
 * dotting → slashing (bgm.area.ohmstead → audio/bgm/area/ohmstead.wav), matching
 * tools/audio/build-tracks.ts. The full set is composed; tracks for unbuilt
 * content sit ready in the manifest and auto-hook when their scene/map lands.
 */
import { REGION } from './region';

export interface AudioTrack {
  key: string;
  src: string;
}

/** File path for a track id (mirrors build-tracks pathFor). */
export const srcForKey = (key: string): string => `audio/${key.replace(/\./g, '/')}.wav`;
const tracks = (keys: string[]): AudioTrack[] => keys.map((key) => ({ key, src: srcForKey(key) }));

// --- the full catalog (82 tracks) ---
const AREA = [
  'bgm.area.ohmstead', 'bgm.area.field', 'bgm.route.farmroad', 'bgm.area.railhead', 'bgm.route.scar45',
  'bgm.area.cistern', 'bgm.route.furrows', 'bgm.area.bastion', 'bgm.route.militaryroad', 'bgm.area.redoubt',
  'bgm.dungeon.bunker', 'bgm.dungeon.trinity', 'bgm.area.chancel', 'bgm.route.redflats', 'bgm.area.redbed',
  'bgm.area.redbed_fallen', 'bgm.route.tollway', 'bgm.area.array', 'bgm.dungeon.stack', 'bgm.area.verge',
  'bgm.dungeon.outerring', 'bgm.dungeon.canyon', 'bgm.dungeon.underground', 'bgm.dungeon.spire', 'bgm.area.ohmcoming',
  'bgm.dungeon.cave', 'bgm.area.depot', 'bgm.area.drivein', 'bgm.area.boneyard', 'bgm.dungeon.silo',
  'bgm.area.bogshrine', 'bgm.area.stadium', 'bgm.dungeon.fortress',
];
const BATTLE = [
  'bgm.battle.wild', 'bgm.battle.trainer', 'bgm.battle.militant', 'bgm.battle.rival', 'bgm.battle.warden',
  'bgm.battle.legendary', 'bgm.battle.boss', 'bgm.battle.persistence', 'bgm.battle.hack',
];
const MENU = [
  'bgm.sys.title', 'bgm.sys.mainmenu', 'bgm.field.overworld', 'bgm.menu.garage', 'bgm.menu.bench', 'bgm.menu.shop',
  'bgm.facility.pit', 'bgm.facility.gauntlet', 'bgm.facility.range', 'bgm.facility.uplink', 'bgm.facility.fieldday',
];
const JINGLE = [
  'jingle.victory_wild', 'jingle.victory_trainer', 'jingle.victory_warden', 'jingle.victory_legendary',
  'jingle.capture_success', 'jingle.levelup', 'jingle.evolution', 'jingle.obtain_item', 'jingle.obtain_ohm',
  'jingle.recharge', 'jingle.save', 'sting.factory_reset', 'sting.defeat', 'sting.area_title', 'sting.quest_update',
];
const CUE = [
  'cue.opening_bench', 'cue.night_call', 'cue.breaker_bonds', 'cue.exile', 'cue.reveal',
  'cue.factory_settings', 'cue.grandpa_breakthrough', 'cue.broadcast', 'cue.ending', 'cue.freeme_hook',
];
const AMBIENCE = ['amb.current', 'amb.net', 'amb.wind', 'amb.cave'];

export const BGM_TRACKS: readonly AudioTrack[] = tracks([...AREA, ...BATTLE, ...MENU]);
export const JINGLE_TRACKS: readonly AudioTrack[] = tracks(JINGLE);
export const CUE_TRACKS: readonly AudioTrack[] = tracks(CUE);
export const SFX_TRACKS: readonly AudioTrack[] = tracks(AMBIENCE);
export const ALL_AUDIO: readonly AudioTrack[] = tracks([...AREA, ...BATTLE, ...MENU, ...JINGLE, ...CUE, ...AMBIENCE]);

/** Eager set (loaded in BootScene); everything else lazy-loads in its scene. */
export const BOOT_SET: readonly AudioTrack[] = tracks([
  'bgm.sys.title', 'bgm.sys.mainmenu', 'bgm.field.overworld', 'bgm.battle.wild', 'bgm.battle.trainer',
  ...JINGLE, // jingles are tiny and fire everywhere — never hitch them
]);

// --- selection ---

/** Explicit map → area theme; falls back to the biome, then a default. */
const MAP_BGM: Record<string, string> = {
  ohmstead: 'bgm.area.ohmstead',
  'the-field': 'bgm.area.field',
  farmroad: 'bgm.route.farmroad',
  railhead: 'bgm.area.railhead',
  cistern: 'bgm.area.cistern',
  bastion: 'bgm.area.bastion',
  redoubt: 'bgm.area.redoubt',
  trinity: 'bgm.dungeon.trinity',
  chancel: 'bgm.area.chancel',
};
const BIOME_BGM: Record<string, string> = {
  underground: 'bgm.dungeon.cave',
  prairie: 'bgm.area.field',
  industrial: 'bgm.area.railhead',
  flooded: 'bgm.area.cistern',
  quarry: 'bgm.area.bastion',
  military: 'bgm.area.redoubt',
  sacred: 'bgm.area.chancel',
};

export function bgmForMap(mapId: string): string {
  return MAP_BGM[mapId] ?? BIOME_BGM[REGION[mapId]?.biome ?? ''] ?? 'bgm.field.overworld';
}

export type BattleType = 'wild' | 'trainer' | 'militant' | 'rival' | 'warden' | 'legendary' | 'boss' | 'persistence';
const BATTLE_KEYS = new Set(BATTLE);

/** Pick a battle theme from kind + optional explicit type + a foe-name heuristic. */
export function bgmForBattle(init: { kind: 'wild' | 'trainer'; battleType?: BattleType; foeName?: string }): string {
  const t = init.battleType ?? inferBattleType(init.kind, init.foeName);
  const key = `bgm.battle.${t}`;
  return BATTLE_KEYS.has(key) ? key : 'bgm.battle.wild';
}

export function inferBattleType(kind: 'wild' | 'trainer', foeName?: string): BattleType {
  if (kind === 'wild') return 'wild';
  const n = (foeName ?? '').toLowerCase();
  if (/warden/.test(n)) return 'warden';
  if (/rook|clay|rival/.test(n)) return 'rival';
  if (/conscript|deserter|raider|garrison|marshal|militant/.test(n)) return 'militant';
  return 'trainer';
}

/** Victory fanfare tier for a finished battle. */
export function victoryJingleFor(type: BattleType): string {
  if (type === 'legendary') return 'jingle.victory_legendary';
  if (type === 'warden' || type === 'boss' || type === 'persistence' || type === 'rival') return 'jingle.victory_warden';
  if (type === 'trainer' || type === 'militant') return 'jingle.victory_trainer';
  return 'jingle.victory_wild';
}
