/**
 * Character / NPC sprite pipeline (npm run assets:chars) — the NPC Sprite
 * Production Spec reconciled to the HD grid method (docs/npc-pipeline.md).
 * Draws four-facing walk/run cycles (S, N, W; E mirrored at runtime) on a
 * ~20×32 cell, packs them into the spec's sheet layout (3 frames × 3 dirs),
 * and writes an <id>.anim.json descriptor. Produces the slice cast first.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';
import { Grid } from '../gridart';
import { Sprite } from '../spritekit';

const CW = 20;
const CH = 32;
const ROOT = new URL('../..', import.meta.url).pathname;

type Tri = [string, string, string]; // hi, base, shadow
interface CharSpec {
  hair: string; hairDk: string;
  shirt: Tri;
  pants: Tri;
  cap?: 'goggle' | 'hat' | 'none';
  capCol?: string;
  bandana?: boolean;
  ponytail?: boolean;
  apron?: boolean;
  beard?: boolean;
  satchel?: boolean;
  mask?: boolean; // welding mask up
}
type Dir = 's' | 'n' | 'w';

/** Stride offsets per walk frame: [front-leg dy, back-leg dy, arm swing]. */
function stride(frame: number): [number, number, number] {
  if (frame === 1) return [1, -1, 1];
  if (frame === 2) return [-1, 1, -1];
  return [0, 0, 0];
}

function drawChar(spec: CharSpec, dir: Dir, frame: number, run: boolean): Sprite {
  const g = new Grid(CW, CH);
  const [jh, jb, js] = spec.shirt;
  const [ph, pb, ps] = spec.pants;
  const [fl, bl, arm] = stride(frame);
  const lean = run ? (dir === 'w' ? -1 : 0) : 0; // forward lean on run (profile)
  const big = run ? 1 : 0; // extra stride on run
  g.shadow(10, 31, 6, 2);

  if (dir === 's' || dir === 'n') {
    // legs (two), feet
    g.rect(7, 24 + fl, 2, 5 - fl, pb); g.vline(7, 24 + fl, 5 - fl, ph);
    g.rect(11, 24 + bl, 2, 5 - bl, pb); g.vline(12, 24 + bl, 5 - bl, ps);
    g.rect(6, 29 + fl, 3, 2, 'o'); g.hline(6, 30 + fl, 3, 'O');
    g.rect(11, 29 + bl, 3, 2, 'o'); g.hline(11, 30 + bl, 3, 'O');
    // torso
    g.box(6, 14, 8, 10, jh, jb, js);
    if (dir === 's') {
      if (spec.apron) g.rect(7, 16, 6, 7, 'w');
      else g.vline(9, 15, 8, js); // placket
    } else g.vline(9, 15, 8, js); // back seam
    // arms (swing)
    g.rect(4, 15 + arm, 2, 7, jb); g.vline(4, 15 + arm, 7, jh);
    g.rect(14, 15 - arm, 2, 7, jb); g.vline(15, 15 - arm, 7, js);
    g.rect(4, 21 + arm, 2, 2, 'S'); g.rect(14, 21 - arm, 2, 2, 'S');
    if (spec.satchel) { g.rect(5, 17, 9, 2, 'o'); g.rect(12, 18, 4, 4, 'O'); } // strap + bag
    // head
    g.rect(6, 4, 8, 8, 'S');
    g.set(6, 4, '.'); g.set(13, 4, '.'); g.set(6, 11, '.'); g.set(13, 11, '.');
    if (dir === 's') {
      g.vline(13, 5, 6, 's'); g.set(7, 11, 's'); g.set(12, 11, 's');
      g.rect(7, 7, 2, 2, 'X'); g.rect(11, 7, 2, 2, 'X'); g.set(7, 7, '*'); g.set(11, 7, '*');
      g.set(9, 10, 'x'); g.set(10, 10, 'x');
      if (spec.beard) { g.rect(7, 10, 6, 2, 'W'); g.set(9, 10, 'x'); }
    } else {
      g.rect(6, 4, 8, 8, spec.hair); g.hline(6, 11, 8, spec.hairDk); // back of head = hair
      g.set(9, 11, 'S'); g.set(10, 11, 'S'); // nape
    }
    // hair framing
    g.rect(6, 3, 8, 1, spec.hair); g.hline(6, 3, 8, spec.hairDk);
    g.vline(5, 4, 5, spec.hair); g.vline(14, 4, 5, spec.hair);
    if (dir === 's') { g.set(6, 4, spec.hair); g.set(13, 4, spec.hair); }
    if (spec.ponytail) { g.rect(dir === 'n' ? 9 : 14, 4, 3, 2, spec.hair); g.rect(dir === 'n' ? 9 : 15, 6, 2, 5, spec.hair); }
  } else {
    // ---- W profile (facing left) ----
    const dx = lean;
    // legs: front (left) + back (right), bigger stride
    g.rect(8 + dx, 24, 2, 5 + big + fl, pb); g.vline(8 + dx, 24, 5 + fl, ph); // front
    g.rect(10 + dx, 24, 2, 5 + big + bl, ps); // back
    g.rect(6 + dx + (frame === 1 ? -big : 0), 29 + fl + big, 4, 2, 'o'); g.hline(6 + dx, 30 + fl + big, 4, 'O');
    g.rect(11 + dx + (frame === 2 ? big : 0), 29 + bl + big, 4, 2, 'O');
    // torso (narrow)
    g.box(7 + dx, 14, 6, 10, jh, jb, js);
    if (spec.satchel) g.rect(11 + dx, 16, 3, 6, 'o');
    // front arm swinging
    g.rect(7 + dx - 1, 15 + arm, 2, 7, jb); g.vline(6 + dx - 1, 15 + arm, 7, jh);
    g.rect(6 + dx - 1, 21 + arm, 2, 2, 'S');
    // head profile
    g.rect(6 + dx, 4, 7, 8, 'S');
    g.set(6 + dx, 4, '.'); g.set(12 + dx, 4, '.'); g.set(6 + dx, 11, '.');
    g.set(7 + dx, 7, 'X'); g.set(8 + dx, 7, 'X'); // one eye
    g.set(6 + dx, 9, 's'); // nose/jaw
    g.set(8 + dx, 10, 'x'); // mouth
    // hair (top + back/right)
    g.rect(6 + dx, 3, 7, 1, spec.hair); g.hline(6 + dx, 3, 7, spec.hairDk);
    g.vline(12 + dx, 4, 7, spec.hair); g.set(11 + dx, 4, spec.hair);
    if (spec.ponytail) { g.rect(12 + dx, 5, 3, 5, spec.hair); g.vline(14 + dx, 6, 4, spec.hairDk); }
    if (spec.bandana) { g.rect(12 + dx, 12, 4, 2, 'b'); g.set(15 + dx, 13, 'B'); } // tail flutters back
  }

  // ---- headgear (all dirs) ----
  const hx = dir === 'w' ? lean : 0;
  if (spec.bandana && dir !== 'w') { g.rect(6, 12, 8, 1, 'b'); g.rect(7, 13, 6, 1, 'B'); }
  if (spec.cap === 'goggle') {
    g.rect(6 + hx, 1, 8 - (dir === 'w' ? 1 : 0), 2, spec.capCol ?? 'a');
    g.hline(5 + hx, 3, 10 - (dir === 'w' ? 2 : 0), 'A'); g.set(5 + hx, 3, 'l');
    if (dir === 's') { g.rect(6, 1, 2, 1, 'i'); g.rect(10, 1, 2, 1, 'i'); } // goggles up on brim
  } else if (spec.cap === 'hat') {
    g.rect(5 + hx, 1, 9, 2, spec.capCol ?? 'k'); g.hline(4 + hx, 3, 11, spec.capCol ?? 'k');
  }
  if (spec.mask && dir === 's') { g.rect(6, 2, 8, 3, 'a'); g.rect(7, 3, 6, 1, 'i'); } // welding mask up
  g.outline('X');
  return g.render();
}

/** Pack S/N/W × 3 frames into one sheet (3 cols × 3 rows). */
function sheet(spec: CharSpec, run: boolean): Sprite {
  const s = new Sprite(CW * 3, CH * 3);
  (['s', 'n', 'w'] as Dir[]).forEach((dir, row) => {
    for (let f = 0; f < 3; f++) {
      const fr = drawChar(spec, dir, f, run);
      for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) { const c = fr.get(x, y); if ((c[3] ?? 0) === 0) continue; s.set(f * CW + x, row * CH + y, c); }
    }
  });
  return s;
}

const ANIM = {
  cell: [CW, CH], asym: false,
  walk: { fps: 7, loop: true, s: [0, 1, 0, 2], n: [0, 1, 0, 2], w: [0, 1, 0, 2], e: { mirror: 'w' } },
  run: { fps: 11, loop: true, s: [0, 1, 0, 2], n: [0, 1, 0, 2], w: [0, 1, 0, 2], e: { mirror: 'w' } },
  idle: { s: [0], n: [0], w: [0], e: { mirror: 'w' } },
};

// ---- the slice cast ------------------------------------------------------
const scavenger = (hair: string, hairDk: string, ponytail = false): CharSpec => ({
  hair, hairDk, shirt: ['h', 'j', 'J'], pants: ['m', 'u', 'U'], cap: 'goggle', capCol: 'a', bandana: true, ponytail,
});
const CAST: Array<{ id: string; spec: CharSpec; run?: boolean }> = [
  { id: 'char.principal.sal', spec: scavenger('r', 'R'), run: true },
  { id: 'char.principal.wren', spec: scavenger('y', 'Y', true), run: true },
  { id: 'char.principal.mabel_vane', spec: { hair: 'w', hairDk: 'W', shirt: ['w', 'W', 'A'], pants: ['W', 'A', 'x'], apron: true } },
  { id: 'char.principal.boone', spec: { hair: 'w', hairDk: 'W', shirt: ['h', 'j', 'J'], pants: ['o', 'O', 'x'], cap: 'hat', capCol: 'k', beard: true } },
  { id: 'char.principal.odessa', spec: { hair: 'R', hairDk: 'X', shirt: ['m', 'u', 'U'], pants: ['A', 'x', 'x'], satchel: true } },
  { id: 'char.principal.cass', spec: { hair: 'r', hairDk: 'R', shirt: ['q', 'e', 'E'], pants: ['m', 'u', 'U'] } },
  { id: 'char.service.garage_tech', spec: { hair: 'r', hairDk: 'R', shirt: ['l', 'a', 'A'], pants: ['a', 'A', 'x'], apron: true, cap: 'goggle', capCol: 'a' } },
  { id: 'char.service.quartermaster', spec: { hair: 'w', hairDk: 'W', shirt: ['F', 'g', 'G'], pants: ['o', 'O', 'x'], cap: 'hat', capCol: 'k' } },
  { id: 'char.service.courier', spec: { hair: 'y', hairDk: 'Y', shirt: ['b', 'B', 'x'], pants: ['m', 'u', 'U'], satchel: true }, run: true },
  { id: 'char.class.runner', spec: { hair: 'r', hairDk: 'R', shirt: ['h', 'j', 'J'], pants: ['m', 'u', 'U'], cap: 'goggle', capCol: 'k' }, run: true },
  { id: 'char.class.scrapper', spec: { hair: 'w', hairDk: 'W', shirt: ['o', 'O', 'x'], pants: ['a', 'A', 'x'], mask: true } },
  { id: 'char.class.picker', spec: { hair: 'y', hairDk: 'Y', shirt: ['F', 'g', 'G'], pants: ['o', 'O', 'x'], satchel: true } },
];

const writePng = (s: Sprite, path: string): void => { const p = new PNG({ width: s.w, height: s.h }); p.data.set(s.data); writeFileSync(path, PNG.sync.write(p)); };
for (const c of CAST) {
  const role = c.id.split('.')[1] ?? 'misc';
  const id = c.id.split('.').slice(2).join('_');
  const dir = join(ROOT, 'assets/sprites', role, id);
  mkdirSync(dir, { recursive: true });
  writePng(sheet(c.spec, false), join(dir, `${c.id}__walk.png`));
  if (c.run) writePng(sheet(c.spec, true), join(dir, `${c.id}__run.png`));
  const anim = { ...ANIM };
  if (!c.run) delete (anim as Partial<typeof ANIM>).run;
  writeFileSync(join(dir, `${c.id}.anim.json`), JSON.stringify(anim, null, 2));
}

// runtime copies the engine loads (public/) — the two presets walk in-world,
// and the three generic townsfolk back the map NPC slots
const pub = join(ROOT, 'public/world/char');
mkdirSync(pub, { recursive: true });
const runtime: Array<[string, string]> = [
  ['char.principal.sal', 'sal'], ['char.principal.wren', 'wren'],
  ['char.service.quartermaster', 'npc_rancher'], ['char.principal.boone', 'npc_elder'], ['char.principal.cass', 'npc_kid'],
];
for (const [cid, key] of runtime) {
  const spec = CAST.find((c) => c.id === cid)!.spec;
  writePng(sheet(spec, false), join(pub, `${key}_walk.png`));
}

// ---- contact sheet (each char: S, N, W idle, ×3) -------------------------
const SC = 3;
const colW = CW * 3 * SC + 8;
const rowH = CH * SC + 8;
const sheetImg = new Sprite(colW * Math.ceil(CAST.length / 3) + 8, rowH * 3 + 8);
sheetImg.rect(0, 0, sheetImg.w, sheetImg.h, [150, 142, 120, 255]);
CAST.forEach((c, i) => {
  const col = Math.floor(i / 3);
  const row = i % 3;
  (['s', 'n', 'w'] as Dir[]).forEach((dir, di) => {
    const fr = drawChar(c.spec, dir, 0, false);
    const ox = 8 + col * colW + di * (CW * SC + 2);
    const oy = 8 + row * rowH;
    for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) { const cc = fr.get(x, y); if ((cc[3] ?? 0) === 0) continue; for (let dy = 0; dy < SC; dy++) for (let dx = 0; dx < SC; dx++) sheetImg.set(ox + x * SC + dx, oy + y * SC + dy, cc); }
  });
});
mkdirSync(join(ROOT, 'assets/sprites'), { recursive: true });
{ const p = new PNG({ width: sheetImg.w, height: sheetImg.h }); p.data.set(sheetImg.data); writeFileSync(join(ROOT, 'assets/sprites/_contact.png'), PNG.sync.write(p)); }

console.log(`character sprites: ${CAST.length} cast members (walk${CAST.filter((c) => c.run).length ? '+run' : ''}) → assets/sprites/`);
