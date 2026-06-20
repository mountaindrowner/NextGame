import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';
import { NewGameScene } from './scenes/NewGameScene';
import { BenchScene } from './scenes/BenchScene';
import { OverworldScene } from './scenes/OverworldScene';
import { BattleScene } from './scenes/BattleScene';
import { PuzzleScene } from './scenes/PuzzleScene';
import { EvolutionScene } from './scenes/EvolutionScene';
import { MenuScene } from './scenes/MenuScene';
import { ShopScene } from './scenes/ShopScene';
import { FieldHDScene } from './scenes/FieldHDScene';
import { ElevatorScene } from './scenes/ElevatorScene';
import { WorldMapScene } from './scenes/WorldMapScene';
import { CutsceneScene } from './scenes/CutsceneScene';
import { NameEntryScene } from './scenes/NameEntryScene';

// HD direction (2026-06-13): native bumped from 240×160 to 480×320.
export const NATIVE_W = 480;
export const NATIVE_H = 320;

function integerZoom(): number {
  return Math.max(
    1,
    Math.min(Math.floor(window.innerWidth / NATIVE_W), Math.floor(window.innerHeight / NATIVE_H)),
  );
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: NATIVE_W,
  height: NATIVE_H,
  pixelArt: true,
  backgroundColor: '#181410',
  scale: { mode: Phaser.Scale.NONE, zoom: integerZoom() },
  scene: [BootScene, FieldHDScene, TitleScene, NewGameScene, BenchScene, ElevatorScene, OverworldScene, BattleScene, PuzzleScene, EvolutionScene, MenuScene, ShopScene, WorldMapScene, CutsceneScene, NameEntryScene],
});

window.addEventListener('resize', () => {
  game.scale.setZoom(integerZoom());
});

// --- on-device diagnostics (browser-only bugs are invisible to the headless tests) ---
// A small corner readout of the active scene(s) + a heartbeat, plus an error
// surface, so a softlock can be pinpointed (which scene is it stuck on?).
function diagBox(id: string, css: string): HTMLDivElement {
  const el = document.createElement('div');
  el.id = id;
  el.style.cssText = css;
  document.body.appendChild(el);
  return el;
}
const hbEl = diagBox('diag-hb', 'position:fixed;top:2px;left:2px;z-index:99998;background:rgba(0,0,0,0.6);color:#6f6;font:9px monospace;padding:2px 5px;pointer-events:none');
let hb = 0;
setInterval(() => {
  hb += 1;
  const active = game.scene.getScenes(true).map((s) => s.scene.key).join('+') || '(none)';
  hbEl.textContent = `${active} ·${hb}`;
}, 500);
function showError(label: string, detail: string): void {
  const el = document.getElementById('diag-err') ?? diagBox('diag-err', 'position:fixed;left:0;right:0;bottom:0;max-height:55%;overflow:auto;z-index:99999;background:rgba(150,20,20,.95);color:#fff;font:11px/1.4 monospace;padding:8px;white-space:pre-wrap');
  el.textContent = `⚠ ${label}\n${detail}\n\n${el.textContent ?? ''}`;
}
window.addEventListener('error', (e) => showError(e.message, `${(e.error as Error | undefined)?.stack ?? ''}\n@ ${e.filename}:${e.lineno}:${e.colno}`));
window.addEventListener('unhandledrejection', (e) => {
  const r = e.reason as Error | undefined;
  showError(`unhandled promise: ${r?.message ?? String(e.reason)}`, r?.stack ?? '');
});
