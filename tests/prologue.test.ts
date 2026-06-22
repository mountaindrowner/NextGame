// @vitest-environment happy-dom
//
// Prologue ("The Call") flag logic. The opening is the most softlock-prone path
// in the game (it gates movement, forces a fight, and chains cutscenes), so we
// drive the real FieldHDScene through each beat's flag state on a headless boot
// and assert create() resolves it without throwing or stranding the walker.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Harness } from './helpers/headless-game';
import { bootGame } from './helpers/headless-game';
import { FieldHDScene } from '../src/scenes/FieldHDScene';
import { BattleScene } from '../src/scenes/BattleScene';
import { CutsceneScene } from '../src/scenes/CutsceneScene';
import { newGame, setGameState, getGameState } from '../src/game/state';

let h: Harness;
const SCENES = [FieldHDScene, BattleScene, CutsceneScene];

afterEach(() => h?.destroy());
beforeEach(() => setGameState(newGame('SAL', { starter: 'dog' })));

function priv<T = unknown>(o: object, k: string): T {
  return (o as Record<string, unknown>)[k] as T;
}

describe('prologue beats on the Field', () => {
  it('fresh arrival is the daytime supply run: not done, walker free', async () => {
    h = await bootGame(SCENES);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });
    const f = getGameState().flags;
    expect(f['pro_done']).toBeUndefined();
    expect(priv(h.scene('fieldhd'), 'moving')).toBe(false);
  });

  it('night-call arrival locks the walker for the forced fight (no free roam)', async () => {
    getGameState().flags['pro_nightcall'] = true;
    h = await bootGame(SCENES);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });
    // create() must have parked the walker pending startIncitingFight()
    expect(priv(h.scene('fieldhd'), 'moving')).toBe(true);
    // still mid-prologue
    expect(getGameState().flags['pro_done']).toBeUndefined();
  });

  it('winning the fight (pro_breaker) marks the prologue done so the road opens', async () => {
    getGameState().flags['pro_nightcall'] = true;
    getGameState().flags['pro_breaker'] = true;
    h = await bootGame(SCENES);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });
    // the breaker branch flips done=true synchronously in create()
    expect(getGameState().flags['pro_done']).toBe(true);
  });

  it('the surface lift sits at the arrival spawn so you can ride back down', async () => {
    getGameState().flags['pro_supply'] = true; // cache in hand, lift active
    h = await bootGame(SCENES);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });
    const scene = h.scene('fieldhd');
    const garage = priv<[number, number]>(scene, 'garage');
    const field = priv<{ spawn?: { x: number; y: number } }>(scene, 'field');
    expect(field.spawn).toBeTruthy();
    expect(garage).toEqual([field.spawn!.x, field.spawn!.y]);
  });

  it('after the Breaker, re-entry is free daytime roam (done stays set, walker free)', async () => {
    getGameState().flags['pro_done'] = true;
    getGameState().flags['pro_charge'] = true;
    h = await bootGame(SCENES);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });
    expect(getGameState().flags['pro_done']).toBe(true);
    expect(priv(h.scene('fieldhd'), 'moving')).toBe(false);
  });
});

describe('colony lift is A-to-Use (no walk-on warp soft-block)', () => {
  it('Ohmstead has a lift interact and no scene-warp exits', () => {
    const json = JSON.parse(readFileSync(join(process.cwd(), 'public/world/ohmstead.json'), 'utf8')) as {
      exits?: Array<{ scene?: string }>;
      interacts?: Array<{ kind?: string }>;
    };
    expect((json.interacts ?? []).some((i) => i.kind === 'lift')).toBe(true);
    // the elevator must not be a walk-on exit anymore (that was the soft-block)
    expect((json.exits ?? []).some((e) => e.scene === 'elevator')).toBe(false);
  });
});

describe('Railhead trial (Colony 1: the sabotaged relay gates the Warden)', () => {
  it('the map has a relay interact, a Warden npc, and a Warden-gated forward exit', () => {
    const j = JSON.parse(readFileSync(join(process.cwd(), 'public/world/railhead.json'), 'utf8')) as {
      interacts?: Array<{ kind?: string }>;
      npcs?: Array<{ warden?: unknown }>;
      exits?: Array<{ gate?: string }>;
    };
    expect((j.interacts ?? []).some((i) => i.kind === 'relay')).toBe(true);
    expect((j.npcs ?? []).some((n) => n.warden)).toBe(true);
    expect((j.exits ?? []).some((e) => e.gate === 'warden')).toBe(true);
  });

  it('arriving in Railhead fires the intro beat once', async () => {
    setGameState(newGame('SAL', { starter: 'dog' }));
    getGameState().flags['pro_done'] = true; // past the prologue
    h = await bootGame(SCENES);
    h.seedMapData('railhead');
    await h.start('fieldhd', { mapId: 'railhead' });
    expect(getGameState().flags['railhead_intro']).toBe(true);
    expect(getGameState().flags['railhead_relay']).toBeUndefined(); // relay still to clear
  });
});

describe('Act I beat on the Farm Road (the Spotting + Rook)', () => {
  function donePrologue(): void {
    const f = getGameState().flags;
    f['pro_supply'] = true; f['pro_nightcall'] = true; f['pro_breaker'] = true; f['pro_done'] = true; f['pro_charge'] = true;
  }

  it('first Farm Road arrival fires the Spotting and locks the walker', async () => {
    donePrologue();
    h = await bootGame(SCENES);
    h.seedMapData('farmroad');
    await h.start('fieldhd', { mapId: 'farmroad' });
    expect(getGameState().flags['seen_spotting']).toBe(true);
    expect(priv(h.scene('fieldhd'), 'moving')).toBe(true); // pending the Spotting cutscene
  });

  it('beating Rook flips rook_done so the road clears', async () => {
    donePrologue();
    getGameState().flags['seen_spotting'] = true;
    getGameState().flags['beat_rook'] = true;
    h = await bootGame(SCENES);
    h.seedMapData('farmroad');
    await h.start('fieldhd', { mapId: 'farmroad' });
    expect(getGameState().flags['rook_done']).toBe(true);
  });

  it('does not fire before the prologue is done', async () => {
    // fresh game, no prologue flags: arriving on the Farm Road must not trigger Act I
    h = await bootGame(SCENES);
    h.seedMapData('farmroad');
    await h.start('fieldhd', { mapId: 'farmroad' });
    expect(getGameState().flags['seen_spotting']).toBeUndefined();
  });
});
