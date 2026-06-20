import Phaser from 'phaser';
import { srcForKey } from '../data/audio';

/**
 * Global audio manager (mirrors the src/game/state.ts singleton). Holds the
 * game-wide Phaser sound manager + the current BGM, with independent music/SFX
 * volumes and a mute, persisted through GameState (see save migration).
 *
 * Two hard rules keep audio from ever breaking the game (it's the only
 * browser-only code on the battle→field path, and iOS WebAudio is finicky):
 *  - NON-BLOCKING: tracks load via `ensureBgm` in a scene's create(), in the
 *    background — never in preload(), so a slow/stuck audio decode can never
 *    stall a scene's creation.
 *  - NON-FATAL: every method swallows its own errors, so a WebAudio quirk on a
 *    suspended context can never throw into the event pump or a scene
 *    transition. Worst case is silent or late music.
 * Every method also no-ops until `attach`ed (inert in headless tests/tools).
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
  private pendingKey?: string; // the track we currently want playing
  private musicVolume = 0.7;
  private sfxVolume = 0.85;
  private muted = false;

  private safe(fn: () => void): void {
    try {
      fn();
    } catch (e) {
      console.warn('[audio]', e);
    }
  }

  attach(scene: Phaser.Scene): void {
    this.safe(() => {
      this.sound = scene.sound;
      this.game = scene.game;
      this.sound.mute = this.muted;
      scene.input.once('pointerdown', () => this.resumeContext());
      scene.input.keyboard?.once('keydown', () => this.resumeContext());
    });
  }

  isAttached(): boolean {
    return !!this.sound;
  }

  private resumeContext(): void {
    this.safe(() => {
      const ctx = (this.sound as Phaser.Sound.WebAudioSoundManager | undefined)?.context;
      if (ctx && ctx.state === 'suspended') void ctx.resume();
    });
  }

  private loaded(key: string): boolean {
    return !!this.game?.cache.audio.exists(key);
  }

  /**
   * Play a BGM track, background-loading it first if needed. Call this from a
   * scene's create() (NOT preload) so the scene never waits on audio.
   */
  ensureBgm(scene: Phaser.Scene, key: string): void {
    this.safe(() => {
      this.pendingKey = key;
      this.resumeContext();
      if (this.loaded(key)) {
        this.playBgm(key);
        return;
      }
      // background-load without gating the scene; play when (and if) it arrives
      scene.load.audio(key, srcForKey(key));
      scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
        if (this.pendingKey === key) this.playBgm(key); // ignore a stale late load
      });
      scene.load.start();
    });
  }

  /** Loop a BGM track if it's loaded; otherwise stay silent (never blocks). */
  playBgm(key: string): void {
    this.safe(() => {
      if (!this.sound) return;
      this.pendingKey = key;
      this.resumeContext();
      if (this.trackKey === key && this.bgm?.isPlaying) return; // don't restart on re-entry
      this.stopBgm();
      if (!this.loaded(key)) return;
      this.bgm = this.sound.add(key, { loop: true, volume: this.musicVolume });
      this.bgm.play();
      this.trackKey = key;
    });
  }

  stopBgm(): void {
    this.safe(() => {
      if (this.bgm) {
        this.bgm.stop();
        this.bgm.destroy();
        this.bgm = undefined;
      }
      this.trackKey = undefined;
    });
  }

  /** One-shot (jingle/cue/SFX), played over whatever's running. */
  playOneShot(key: string): void {
    this.safe(() => {
      if (!this.sound || !this.loaded(key)) return;
      this.resumeContext();
      this.sound.play(key, { volume: this.sfxVolume });
    });
  }

  // ---- UI cue shorthands (cursor move / confirm / cancel / text advance) ----
  cursor(): void {
    this.playOneShot('sfx.cursor');
  }
  select(): void {
    this.playOneShot('sfx.select');
  }
  back(): void {
    this.playOneShot('sfx.back');
  }
  textBlip(): void {
    this.playOneShot('sfx.text');
  }

  // ---- prefs ----
  applyPrefs(p: AudioPrefsLike): void {
    this.safe(() => {
      if (!p) return;
      this.musicVolume = p.musicVolume ?? this.musicVolume;
      this.sfxVolume = p.sfxVolume ?? this.sfxVolume;
      this.setMuted(!!p.muted);
      this.applyMusicVolume();
    });
  }
  setMusicVolume(v: number): void {
    this.safe(() => {
      this.musicVolume = Math.max(0, Math.min(1, v));
      this.applyMusicVolume();
    });
  }
  setSfxVolume(v: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, v));
  }
  setMuted(m: boolean): void {
    this.safe(() => {
      this.muted = m;
      if (this.sound) this.sound.mute = m;
    });
  }
  toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }
  getPrefs(): AudioPrefsLike {
    return { musicVolume: this.musicVolume, sfxVolume: this.sfxVolume, muted: this.muted };
  }

  private applyMusicVolume(): void {
    this.safe(() => {
      const s = this.bgm as Phaser.Sound.WebAudioSound | undefined;
      if (s && 'setVolume' in s) s.setVolume(this.musicVolume);
    });
  }

  currentBgm(): string | undefined {
    return this.trackKey;
  }
}

let singleton: AudioManager | undefined;
export const getAudio = (): AudioManager => (singleton ??= new AudioManager());
