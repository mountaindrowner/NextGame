// @vitest-environment happy-dom
//
// Real-scene lifecycle tests. These boot an actual (headless) Phaser game and
// drive the genuine init→preload→create→shutdown→re-create cycle of the
// scenes, which the engine-only autoplay harness and the pure-core unit tests
// can never exercise. Every browser-only softlock we've hit has been a scene
// INSTANCE reused across scene.start() with a per-visit field left dirty:
//   • FieldHDScene.moving stuck true after a trainer/Warden fight  → walker frozen
//   • FieldHDScene.npcCells/npcTalk bleeding between maps           → phantom walls
//   • BattleScene.outcome stuck 'victory' from the last fight       → battle vanishes
// This suite re-enters each scene and asserts the dirty state is wiped.
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import type { Harness } from './helpers/headless-game';
import { bootGame } from './helpers/headless-game';

// scenes the lifecycle exercises (and any they hand off to on create)
import { FieldHDScene } from '../src/scenes/FieldHDScene';
import { BattleScene } from '../src/scenes/BattleScene';
import { newGame, setGameState, getGameState } from '../src/game/state';
import { makeBattler } from '../src/core/battle/engine';
import { GAME_DATA } from '../src/data/dataview';

let h: Harness;

afterEach(() => {
  h?.destroy();
});

describe('FieldHDScene lifecycle', () => {
  beforeAll(() => {
    setGameState(newGame('SAL', { starter: 'dog' }));
  });

  it('create() runs to completion on a real headless boot', async () => {
    setGameState(newGame('SAL', { starter: 'dog' }));
    h = await bootGame([FieldHDScene, BattleScene]);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });

    const field = h.scene<FieldHDScene>('fieldhd');
    expect(field).toBeTruthy();
    expect(h.isActive('fieldhd')).toBe(true);
    // the field data resolved and the walker is free to move on a fresh entry
    expect(priv(field, 'moving')).toBe(false);
    expect(priv(field, 'field')).toBeTruthy();
  });

  it('re-entry clears a stuck walker lock (the post-combat softlock)', async () => {
    setGameState(newGame('SAL', { starter: 'dog' }));
    h = await bootGame([FieldHDScene, BattleScene]);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });

    const field = h.scene<FieldHDScene>('fieldhd');
    // simulate the exact state a trainer/Warden challenge leaves behind
    setPriv(field, 'moving', true);
    expect(priv(field, 'moving')).toBe(true);

    // returning from battle restarts the same scene instance
    await h.start('fieldhd', { mapId: 'the-field' });
    expect(priv(field, 'moving')).toBe(false); // walker freed — no softlock
  });

  it('re-entry clears NPC collisions/dialogue from the previous map', async () => {
    setGameState(newGame('SAL', { starter: 'dog' }));
    h = await bootGame([FieldHDScene, BattleScene]);
    h.seedMapData('the-field');
    await h.start('fieldhd', { mapId: 'the-field' });

    const field = h.scene<FieldHDScene>('fieldhd');
    const cells = priv<Set<string>>(field, 'npcCells');
    const talk = priv<Map<string, unknown>>(field, 'npcTalk');
    // pollute with a phantom from a "previous map"
    cells.add('99,99');
    talk.set('99,99', { name: 'ghost', lines: [], idx: 0 });

    await h.start('fieldhd', { mapId: 'the-field' });
    const cells2 = priv<Set<string>>(field, 'npcCells');
    const talk2 = priv<Map<string, unknown>>(field, 'npcTalk');
    expect(cells2.has('99,99')).toBe(false); // no phantom wall
    expect(talk2.has('99,99')).toBe(false);
  });
});

describe('BattleScene lifecycle', () => {
  it('a second battle does not inherit the prior fight outcome (no vanishing battle)', async () => {
    setGameState(newGame('WREN', { starter: 'drone' }));
    h = await bootGame([FieldHDScene, BattleScene]);

    const foe = () => [makeBattler(GAME_DATA.species(1), 4, GAME_DATA)];
    await h.start('battle', { kind: 'wild', foes: foe(), seed: 123, returnScene: 'fieldhd' });
    const battle = h.scene<BattleScene>('battle');
    expect(battle).toBeTruthy();

    // pretend the first fight ended in victory and left the flag dirty
    setPriv(battle, 'outcome', 'victory');

    // open a fresh battle on the SAME instance
    await h.start('battle', { kind: 'wild', foes: foe(), seed: 456, returnScene: 'fieldhd' });
    // create() must have wiped it, or pump() would finish() the instant it opens
    expect(priv(battle, 'outcome')).toBeUndefined();
    expect(h.isActive('battle')).toBe(true); // still on screen, not bounced back
  });

  it('opens with a clean event queue and anim mode each entry', async () => {
    setGameState(newGame('SAL', { starter: 'scooter' }));
    h = await bootGame([FieldHDScene, BattleScene]);

    const foe = () => [makeBattler(GAME_DATA.species(2), 4, GAME_DATA)];
    await h.start('battle', { kind: 'wild', foes: foe(), seed: 7, returnScene: 'fieldhd' });
    const battle = h.scene<BattleScene>('battle');
    setPriv(battle, 'queue', [{ type: 'message', text: 'stale' }]);
    setPriv(battle, 'mode', 'over');

    await h.start('battle', { kind: 'wild', foes: foe(), seed: 8, returnScene: 'fieldhd' });
    // queue was re-seeded by intro(), not appended to a stale tail; mode is live
    expect(priv(battle, 'mode')).not.toBe('over');
    expect(getGameState()).toBeTruthy();
  });
});

// --- tiny private-field helpers (these scenes keep per-visit state private) ---
function priv<T = unknown>(obj: object, key: string): T {
  return (obj as Record<string, unknown>)[key] as T;
}
function setPriv(obj: object, key: string, val: unknown): void {
  (obj as Record<string, unknown>)[key] = val;
}
