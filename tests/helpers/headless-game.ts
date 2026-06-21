import Phaser from 'phaser';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { installCanvasStub } from './dom-canvas';

// vitest runs from the project root; import.meta.url carries a Vite /@fs/ prefix
// under the happy-dom transform, so anchor on cwd instead.
const ROOT = process.cwd();

/**
 * Boots a REAL Phaser game in node (HEADLESS renderer, no audio) so tests can
 * drive the actual scene lifecycle — init → preload → create → shutdown → re-
 * create — that the headless engine harness (tools/autoplay) never touches.
 * This is where the scene-instance-reuse bug class lives: fields left dirty
 * from a prior visit (the post-combat softlock, the disappearing battle).
 *
 * Assets aren't served in node, so map JSON is injected straight into the cache
 * (seedJson); image/sheet loads fail quietly and the scenes fall back to their
 * rectangle placeholders, exactly as they're written to.
 */
export interface Harness {
  game: Phaser.Game;
  /** Inject a map's JSON into the global cache so a Field scene's create() finds it. */
  seedJson(key: string, obj: unknown): void;
  /** Load a public/world/*.json off disk and seed it under mapdata-<id>. */
  seedMapData(mapId: string): void;
  /** Start (or restart) a scene and let the boot run to create(). */
  start(key: string, data?: object): Promise<void>;
  /** Advance the simulation a few frames / real ticks. */
  settle(ms?: number): Promise<void>;
  scene<T extends Phaser.Scene>(key: string): T;
  isActive(key: string): boolean;
  activeKeys(): string[];
  destroy(): void;
}

class HarnessScene extends Phaser.Scene {
  constructor() {
    super('__harness');
  }
}

export async function bootGame(scenes: Array<new () => Phaser.Scene>): Promise<Harness> {
  installCanvasStub();
  const game = new Phaser.Game({
    // CANVAS (not HEADLESS) so Graphics.generateTexture has a renderer with
    // blendModes; the canvas 2D context is the no-op stub, so nothing actually
    // paints — we only need the lifecycle, not pixels.
    type: Phaser.CANVAS,
    width: 480,
    height: 320,
    audio: { noAudio: true },
    banner: false,
    scene: [HarnessScene, ...scenes],
  });

  await new Promise<void>((resolve) => {
    if (game.isBooted) resolve();
    else game.events.once(Phaser.Core.Events.READY, () => resolve());
  });
  // let the harness scene reach create so the SceneManager is live
  await tick(60);

  const settle = async (ms = 80): Promise<void> => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      try {
        game.loop.step(performance.now());
      } catch {
        /* the manual step races the auto-rAF occasionally; ignore */
      }
      await tick(8);
    }
  };

  return {
    game,
    seedJson(key, obj) {
      if (game.cache.json.exists(key)) game.cache.json.remove(key);
      game.cache.json.add(key, obj);
    },
    seedMapData(mapId) {
      const raw = readFileSync(join(ROOT, 'public', 'world', `${mapId}.json`), 'utf8');
      const key = `mapdata-${mapId}`;
      if (game.cache.json.exists(key)) game.cache.json.remove(key);
      game.cache.json.add(key, JSON.parse(raw));
    },
    async start(key, data) {
      game.scene.start(key, data);
      await settle(120);
    },
    settle,
    scene<T extends Phaser.Scene>(key: string): T {
      return game.scene.getScene(key) as unknown as T;
    },
    isActive(key) {
      return game.scene.isActive(key);
    },
    activeKeys() {
      return game.scene.getScenes(true).map((s) => s.scene.key);
    },
    destroy() {
      try {
        game.loop.stop();
      } catch {
        /* ignore */
      }
      try {
        game.destroy(true);
      } catch {
        /* teardown races the rAF; the game is going away regardless */
      }
    },
  };
}

function tick(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
