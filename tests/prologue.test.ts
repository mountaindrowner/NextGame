// @vitest-environment happy-dom
//
// Prologue ("The Call") flag logic. The opening is the most softlock-prone path
// in the game (it gates movement, forces a fight, and chains cutscenes), so we
// drive the real FieldHDScene through each beat's flag state on a headless boot
// and assert create() resolves it without throwing or stranding the walker.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
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
