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
import { FieldHDScene } from './scenes/FieldHDScene';
import { ElevatorScene } from './scenes/ElevatorScene';
import { WorldMapScene } from './scenes/WorldMapScene';

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
  scene: [BootScene, FieldHDScene, TitleScene, NewGameScene, BenchScene, ElevatorScene, OverworldScene, BattleScene, PuzzleScene, EvolutionScene, MenuScene, WorldMapScene],
});

window.addEventListener('resize', () => {
  game.scale.setZoom(integerZoom());
});
