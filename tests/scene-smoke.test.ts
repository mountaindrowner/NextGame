// @vitest-environment happy-dom
//
// Scene smoke matrix: every interactive scene must survive create() — and a
// SECOND create() on the same reused instance — on a real headless boot. The
// re-entry pass is the point: Phaser reuses scene instances across
// scene.start(), so any per-visit field left dirty (a lock, a queue, a flag)
// surfaces here as a throw or a wrong post-conditions, which is the whole bug
// class behind the surface softlocks.
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Harness } from './helpers/headless-game';
import { bootGame } from './helpers/headless-game';

import { FieldHDScene } from '../src/scenes/FieldHDScene';
import { BattleScene } from '../src/scenes/BattleScene';
import { PuzzleScene } from '../src/scenes/PuzzleScene';
import { EvolutionScene } from '../src/scenes/EvolutionScene';
import { ShopScene } from '../src/scenes/ShopScene';
import { MenuScene } from '../src/scenes/MenuScene';
import { CutsceneScene } from '../src/scenes/CutsceneScene';

import { newGame, setGameState } from '../src/game/state';
import { makeBattler } from '../src/core/battle/engine';
import { GAME_DATA } from '../src/data/dataview';

const SCENES = [FieldHDScene, BattleScene, PuzzleScene, EvolutionScene, ShopScene, MenuScene, CutsceneScene];

const wildFoes = () => [makeBattler(GAME_DATA.species(1), 4, GAME_DATA)];

/** Minimal valid init payload per scene key. */
const INIT: Record<string, object> = {
  fieldhd: { mapId: 'the-field' },
  battle: { kind: 'wild', foes: wildFoes(), seed: 99, returnScene: 'fieldhd' },
  puzzle: { timerSeconds: 10, gridSize: 3, decoys: 2, onDone: () => undefined },
  evolution: { offers: [], returnScene: 'fieldhd' },
  shop: { tier: 'colony', from: 'fieldhd', map: 'the-field' },
  menu: { from: 'fieldhd' },
  cutscene: { cutscene: { steps: [], next: 'fieldhd' } },
};

const KEY: Record<string, string> = {
  fieldhd: 'fieldhd', battle: 'battle', puzzle: 'puzzle', evolution: 'evolution',
  shop: 'shop', menu: 'menu', cutscene: 'cutscene',
};

let h: Harness;

afterEach(() => h?.destroy());

beforeEach(() => {
  setGameState(newGame('SAL', { starter: 'dog' }));
});

describe('scene smoke matrix (boot + re-enter)', () => {
  for (const Scene of SCENES) {
    const key = new (Scene as new () => { sys: { config: string } })().sys.config;
    it(`${key}: create() runs and survives a second entry`, async () => {
      h = await bootGame(SCENES);
      h.seedMapData('the-field');
      // battle/puzzle init carries a fresh foe array/cb each entry
      const init = () => ({ ...INIT[key], ...(key === 'battle' ? { foes: wildFoes() } : {}) });

      await h.start(key, init());
      expect(h.scene(key), `${key} should exist after first create`).toBeTruthy();

      // re-enter the same instance — the stale-state trap
      await h.start(key, init());
      expect(h.scene(key), `${key} should survive re-entry`).toBeTruthy();
      // if create() had thrown, the boot would have rejected before here
    });
  }
});
