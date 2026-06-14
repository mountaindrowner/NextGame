/**
 * World object builders, authored with the gridart toolkit (shared palette,
 * highlight/base/shadow per material). Returns spritekit Sprites so the world
 * composer (gen-world.ts) bakes them unchanged. Part of the 2026-06-14 art
 * retooling onto the grid method.
 */
import { Grid } from './gridart';
import type { Sprite } from './spritekit';

export function barn(): Sprite {
  const g = new Grid(46, 38);
  g.shadow(23, 37, 21, 3);
  // walls
  g.box(6, 16, 34, 21, 'q', 'e', 'E');
  // gambrel roof
  for (let i = 0; i <= 14; i++) {
    const inset = i < 7 ? 7 - i : 1 + (i - 7);
    const xL = 6 + inset;
    const xR = 39 - inset;
    g.hline(xL, 2 + i, xR - xL + 1, i < 4 ? 'E' : 'e');
    g.set(xL, 2 + i, 'q'); // lit left slope
  }
  g.rect(20, 23, 10, 14, 'O'); // door
  g.line(20, 23, 29, 36, 'n');
  g.line(29, 23, 20, 36, 'n'); // white-ish X (wood hi)
  g.rect(10, 20, 7, 7, 'i'); // windows
  g.rect(29, 20, 7, 7, 'i');
  g.set(22, 9, 'i'); // hayloft window
  g.set(23, 9, 'i');
  g.outline();
  return g.render();
}

export function storefront(wall: string, wallHi: string, wallSh: string): Sprite {
  const g = new Grid(34, 36);
  g.shadow(17, 35, 15, 3);
  g.box(6, 12, 22, 24, wallHi, wall, wallSh);
  g.rect(4, 4, 26, 9, wall); // false front
  g.hline(4, 4, 26, wallHi);
  g.hline(4, 12, 26, 'K'); // cornice shadow
  g.rect(9, 22, 7, 14, 'O'); // door
  g.set(15, 28, 'z'); // knob
  g.box(18, 16, 9, 8, 'l', 'i', 'I'); // window
  g.line(22, 16, 22, 23, 'A');
  g.rect(17, 12, 11, 2, 'e'); // awning
  g.set(17, 12, 'q');
  g.outline();
  return g.render();
}

export function house(): Sprite {
  const g = new Grid(32, 30);
  g.shadow(16, 29, 14, 3);
  g.box(5, 14, 22, 16, 'n', 'k', 'K'); // walls
  for (let i = 0; i <= 11; i++) {
    const xL = 4 + i;
    const xR = 27 - i;
    if (xL > xR) break;
    g.hline(xL, 14 - i, xR - xL + 1, i < 3 ? 'E' : 'e'); // gable roof
    g.set(xL, 14 - i, 'q');
  }
  g.rect(13, 21, 6, 9, 'O'); // door
  g.rect(8, 18, 5, 5, 'i'); // windows
  g.rect(19, 18, 5, 5, 'i');
  g.outline();
  return g.render();
}

export function windmill(): Sprite {
  const g = new Grid(24, 46);
  g.shadow(12, 45, 9, 3);
  // lattice tower
  g.line(6, 44, 10, 16, 'k');
  g.line(18, 44, 14, 16, 'k');
  for (let y = 20; y < 44; y += 6) g.line(7 + (y - 16) * 0.12, y, 17 - (y - 16) * 0.12, y, 'K');
  // hub + blades
  g.ellipse(12, 14, 2, 2, 'A');
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    g.line(12, 14, Math.round(12 + Math.cos(a) * 11), Math.round(14 + Math.sin(a) * 11), i % 2 ? 'k' : 'n');
  }
  g.line(12, 16, 17, 22, 'k'); // tail vane
  g.outline();
  return g.render();
}

export function watertower(): Sprite {
  const g = new Grid(30, 40);
  g.shadow(15, 39, 12, 3);
  g.line(7, 37, 11, 18, 'a');
  g.line(23, 37, 19, 18, 'a');
  g.line(13, 37, 13, 18, 'a');
  g.line(17, 37, 17, 18, 'a');
  g.hline(8, 30, 15, 'A'); // braces
  g.hline(8, 24, 15, 'A');
  g.box(8, 8, 14, 12, 'l', 'k', 'K'); // tank
  for (let i = 0; i <= 8; i++) g.hline(8 + i, 8 - Math.floor(i * 0.6), 14 - 2 * i, 'a'); // conical roof
  g.outline();
  return g.render();
}

/** Townsfolk NPC — same grid character style as the protagonists, varied. */
export function npcChar(opts: { shirt: [string, string, string]; hat: string; hair: string; hairDk: string; apron?: boolean }): Sprite {
  const g = new Grid(18, 28);
  const [sh, shHi, shSh] = opts.shirt;
  g.shadow(9, 27, 6, 2);
  // boots + legs
  g.rect(5, 25, 4, 3, 'o');
  g.rect(9, 25, 4, 3, 'o');
  g.rect(5, 20, 4, 5, 'u');
  g.rect(9, 20, 4, 5, 'u');
  g.vline(5, 20, 5, 'm');
  g.vline(12, 20, 5, 'U');
  // torso shirt
  g.box(4, 13, 10, 8, shHi, sh, shSh);
  g.rect(2, 14, 2, 6, sh); // arms
  g.rect(14, 14, 2, 6, sh);
  g.rect(2, 20, 2, 2, 'S'); // hands
  g.rect(14, 20, 2, 2, 'S');
  if (opts.apron) g.rect(6, 15, 6, 6, 'w'); // apron
  // face
  g.rect(6, 6, 6, 5, 'S');
  g.vline(11, 6, 4, 's');
  g.set(7, 8, 'X');
  g.set(10, 8, 'X');
  g.set(8, 10, 's');
  // hair + hat
  g.rect(6, 5, 6, 1, opts.hair);
  g.set(5, 6, opts.hair);
  g.set(12, 6, opts.hair);
  g.rect(6, 3, 6, 2, opts.hat);
  g.rect(4, 4, 10, 1, opts.hat);
  g.hline(6, 3, 6, opts.hairDk === opts.hair ? opts.hat : opts.hat);
  g.outline();
  return g.render();
}
