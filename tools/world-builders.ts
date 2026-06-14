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

/**
 * Human overworld sprite — Pokémon-style proportions: a large expressive head
 * with big eyes over a slim body (~3 heads tall). One builder for protagonists
 * (scavenger goggle-cap + bandana) and townsfolk (hat/hair). 18×30.
 */
export function human(o: {
  hair: string;
  hairDk: string;
  shirt: [string, string, string]; // hi, base, shadow
  pants: [string, string, string];
  scavenger?: boolean;
  hat?: string;
  ponytail?: boolean;
  apron?: boolean;
}): Sprite {
  const g = new Grid(18, 30);
  g.shadow(9, 29, 6, 2);
  const [jh, jb, js] = o.shirt;
  const [ph, pb, ps] = o.pants;

  // legs
  g.rect(6, 23, 3, 5, pb);
  g.rect(9, 23, 3, 5, pb);
  g.vline(6, 23, 5, ph);
  g.vline(11, 23, 5, ps);
  if (o.scavenger) {
    g.rect(6, 24, 3, 2, 'p'); // knee pads
    g.rect(9, 24, 3, 2, 'p');
  }
  // shoes
  g.rect(5, 27, 4, 2, 'o');
  g.rect(9, 27, 4, 2, 'o');
  g.hline(5, 28, 4, 'O');
  g.hline(9, 28, 4, 'O');

  // torso (slim)
  g.box(5, 13, 8, 10, jh, jb, js);
  if (o.apron) g.rect(6, 15, 6, 7, 'w');
  else if (o.scavenger) {
    g.vline(8, 14, 8, 't'); // zipper
    g.vline(9, 14, 8, 't');
    g.rect(6, 17, 2, 3, 'p'); // pouches
    g.rect(10, 17, 2, 3, 'p');
  } else g.vline(8, 14, 8, js);
  // arms
  g.rect(3, 14, 2, 7, jb);
  g.rect(13, 14, 2, 7, jb);
  g.vline(3, 14, 7, jh);
  g.vline(14, 14, 7, js);
  g.rect(3, 21, 2, 2, 'S'); // hands
  g.rect(13, 21, 2, 2, 'S');
  // bandana
  if (o.scavenger) {
    g.rect(5, 12, 8, 1, 'b');
    g.rect(6, 13, 6, 1, 'B');
    g.set(8, 12, 'b');
  }

  // head — large, expressive
  g.rect(5, 4, 8, 8, 'S'); // face
  g.set(5, 4, '.');
  g.set(12, 4, '.'); // rounded top corners
  g.set(5, 11, '.');
  g.set(12, 11, '.');
  g.vline(12, 5, 6, 's'); // shaded cheek
  g.set(6, 11, 's'); // chin
  g.set(11, 11, 's');
  // big Pokémon eyes
  g.rect(6, 7, 2, 3, 'X');
  g.rect(10, 7, 2, 3, 'X');
  g.set(6, 7, '*'); // catchlights
  g.set(10, 7, '*');
  g.set(8, 10, 'x'); // small mouth
  g.set(9, 10, 'x');
  // hair framing
  g.rect(5, 3, 8, 1, o.hair);
  g.hline(5, 3, 8, o.hairDk);
  g.vline(4, 4, 5, o.hair);
  g.vline(13, 4, 5, o.hair);
  g.set(5, 4, o.hair);
  g.set(12, 4, o.hair);
  if (o.ponytail) {
    g.rect(13, 4, 3, 2, o.hair);
    g.rect(14, 6, 3, 5, o.hair);
    g.vline(15, 7, 4, o.hairDk);
  }
  // cap / hat
  if (o.scavenger) {
    g.rect(5, 1, 8, 2, 'a'); // cap crown
    g.hline(4, 3, 10, 'A'); // brim
    g.set(4, 3, 'l');
    g.rect(6, 1, 2, 1, 'i'); // goggles
    g.rect(10, 1, 2, 1, 'i');
    g.hline(5, 2, 8, 'k');
  } else if (o.hat) {
    g.rect(5, 1, 8, 2, o.hat);
    g.hline(4, 3, 10, o.hat);
  }
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
