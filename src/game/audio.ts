import Phaser from 'phaser';

/**
 * Global audio manager (mirrors the src/game/state.ts singleton). Holds the
 * game-wide Phaser sound manager and the current BGM, so scenes only say
 * "play this track" and re-entering a scene with the same track never restarts
 * it. Every method no-ops until `attach`ed, so importing this in a headless
 * context (tools/tests) is inert and safe.
 *
 * Music pass #1: a single music bus + a global mute. Per-category volume and a
 * persisted settings UI land in pass #2 (needs the save-schema migration).
 */
class AudioManager {
  private sound?: Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.WebAudioSoundManager;
  private game?: Phaser.Game;
  private bgm?: Phaser.Sound.BaseSound;
  private trackKey?: string;
  private muted = false;

  /** Wire up the (game-global) sound manager from any live scene, once. */
  attach(scene: Phaser.Scene): void {
    this.sound = scene.sound;
    this.game = scene.game;
    this.sound.mute = this.muted;
    // browsers gate audio until a user gesture — resume the context on first input
    scene.input.once('pointerdown', () => this.resumeContext());
    scene.input.keyboard?.once('keydown', () => this.resumeContext());
  }

  isAttached(): boolean {
    return !!this.sound;
  }

  private resumeContext(): void {
    const ctx = (this.sound as Phaser.Sound.WebAudioSoundManager | undefined)?.context;
    if (ctx && ctx.state === 'suspended') void ctx.resume();
  }

  private loaded(key: string): boolean {
    return !!this.game?.cache.audio.exists(key);
  }

  /** Loop a BGM track. No-op if it's already the playing track. */
  playBgm(key: string, volume = 0.7): void {
    if (!this.sound) return;
    if (this.trackKey === key && this.bgm?.isPlaying) return; // don't restart on re-entry
    this.stopBgm();
    if (!this.loaded(key)) return; // not loaded yet → stay silent, never crash
    this.bgm = this.sound.add(key, { loop: true, volume });
    this.bgm.play();
    this.trackKey = key;
  }

  stopBgm(): void {
    if (this.bgm) {
      this.bgm.stop();
      this.bgm.destroy();
      this.bgm = undefined;
    }
    this.trackKey = undefined;
  }

  /** One-shot (jingle/SFX), played over whatever's running. */
  playOneShot(key: string, volume = 0.85): void {
    if (!this.sound || !this.loaded(key)) return;
    this.sound.play(key, { volume });
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.sound) this.sound.mute = this.muted;
    return this.muted;
  }

  currentBgm(): string | undefined {
    return this.trackKey;
  }
}

let singleton: AudioManager | undefined;
export const getAudio = (): AudioManager => (singleton ??= new AudioManager());
