import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { TitleScene } from './scenes/TitleScene';

export const NATIVE_W = 240;
export const NATIVE_H = 160;

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
  scene: [BootScene, TitleScene],
});

window.addEventListener('resize', () => {
  game.scale.setZoom(integerZoom());
});
