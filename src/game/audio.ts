import Phaser from 'phaser';
import { srcForKey } from '../data/audio';

/**
 * Global audio manager (mirrors the src/game/state.ts singleton). Holds the
 * game-wide Phaser sound manager + the current BGM, with independent music/SFX
 * volumes and a mute, persisted through GameState (see save migration). Every
 * method no-ops until `attach`ed, so importing this in a headless context
 * (tools/tests) is inert and safe.
 */
export interface AudioPrefsLike {
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;
}

class AudioManager {
  private sound?: Phaser.Sound.NoAudioSoundManager | Phaser.Sound.HTML5AudioSoundManager | Phaser.Sound.WebAudioSoundManager;
  private game?: Phaser.Game;
  private bgm?: Phaser.Sound.BaseSound;
  private trackKey?: string;
  private musicVolume = 0.7;
  private sfxVolume = 0.85;
  private muted = false;

  attach(scene: Phaser.Scene): void {
    this.sound = scene.sound;
    this.game = scene.game;
    this.sound.mute = this.muted;
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

  /** Lazy-load a scene's tracks (call in the scene's preload). */
  loadTracks(scene: Phaser.Scene, keys: string[]): void {
    for (const key of keys) {
      if (!scene.cache.audio.exists(key)) scene.load.audio(key, srcForKey(key));
    }
  }

  /** Loop a BGM track. No-op if it's already the playing track. */
  playBgm(key: string): void {
    if (!this.sound) return;
    if (this.trackKey === key && this.bgm?.isPlaying) return; // don't restart on re-entry
    this.stopBgm();
    if (!this.loaded(key)) return; // not loaded yet → stay silent, never crash
    this.bgm = this.sound.add(key, { loop: true, volume: this.musicVolume });
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

  /** One-shot (jingle/cue/SFX), played over whatever's running. */
  playOneShot(key: string): void {
    if (!this.sound || !this.loaded(key)) return;
    this.sound.play(key, { volume: this.sfxVolume });
  }

  // ---- prefs ----
  applyPrefs(p: AudioPrefsLike): void {
    this.musicVolume = p.musicVolume;
    this.sfxVolume = p.sfxVolume;
    this.setMuted(p.muted);
    this.applyMusicVolume();
  }
  setMusicVolume(v: number): void {
    this.musicVolume = Math.max(0, Math.min(1, v));
    this.applyMusicVolume();
  }
  setSfxVolume(v: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, v));
  }
  setMuted(m: boolean): void {
    this.muted = m;
    if (this.sound) this.sound.mute = m;
  }
  toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }
  getPrefs(): AudioPrefsLike {
    return { musicVolume: this.musicVolume, sfxVolume: this.sfxVolume, muted: this.muted };
  }

  private applyMusicVolume(): void {
    const s = this.bgm as Phaser.Sound.WebAudioSound | undefined;
    if (s && 'setVolume' in s) s.setVolume(this.musicVolume);
  }

  currentBgm(): string | undefined {
    return this.trackKey;
  }
}

let singleton: AudioManager | undefined;
export const getAudio = (): AudioManager => (singleton ??= new AudioManager());
