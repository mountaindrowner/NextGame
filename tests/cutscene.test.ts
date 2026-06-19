import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { cutsceneImages, type Cutscene } from '../src/cutscene/types';
import { COLD_OPEN, grounded, SPEAKERS } from '../src/cutscene/script';

const ROOT = new URL('..', import.meta.url).pathname;
const SCENES = new Set(['title', 'newgame', 'bench', 'nameentry', 'cutscene', 'fieldhd', 'elevator']);

const all: Array<[string, Cutscene]> = [
  ['COLD_OPEN', COLD_OPEN],
  ['grounded(SAL)', grounded('SAL')],
  ['grounded(WREN)', grounded('WREN')],
];

describe('opening cutscene scripts', () => {
  it('every line has text and a known speaker', () => {
    for (const [name, c] of all) {
      for (const s of c.steps) {
        if (s.kind !== 'line') continue;
        expect(s.text.trim().length, `${name}: empty line`).toBeGreaterThan(0);
        expect(SPEAKERS.has(s.speaker ?? ''), `${name}: unknown speaker "${s.speaker}"`).toBe(true);
      }
    }
  });

  it('each cutscene hands off to a real scene', () => {
    for (const [name, c] of all) expect(SCENES.has(c.next), `${name}: next "${c.next}"`).toBe(true);
  });

  it('every referenced image exists on disk', () => {
    for (const [name, c] of all) {
      for (const img of cutsceneImages(c)) {
        expect(existsSync(join(ROOT, 'public', img)), `${name}: missing ${img}`).toBe(true);
      }
    }
  });

  it('has at least the cold-open beats and the Mabel grounded beat', () => {
    expect(COLD_OPEN.steps.filter((s) => s.kind === 'line').length).toBeGreaterThanOrEqual(5);
    const g = grounded('SAL');
    expect(g.steps.some((s) => s.kind === 'line' && s.speaker === 'GRANDMA MABEL')).toBe(true);
    expect(g.steps.some((s) => s.kind === 'line' && /Ohm.s Law/.test(s.text))).toBe(true);
  });

  it('the protagonist + Mabel portraits exist and are non-trivially sized', () => {
    for (const p of ['sal_96', 'wren_96', 'mabel_96']) {
      const buf = readFileSync(join(ROOT, 'public/world/char', `${p}.png`));
      expect(buf.readUInt32BE(16), `${p} width`).toBeGreaterThanOrEqual(48); // PNG IHDR width
      expect(buf.readUInt32BE(20), `${p} height`).toBeGreaterThanOrEqual(64); // PNG IHDR height
    }
  });

  it('no stale "Harlan" name and no dead names in the cutscene scripts', () => {
    const dead = /arkimon|ohmdex|ohmward|ohm on the range|ohm sweet ohm|\bharlan\b/i;
    const dir = join(ROOT, 'src/cutscene');
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
      const text = readFileSync(join(dir, f), 'utf8');
      const hit = text.match(dead);
      expect(hit, `${f}: "${hit?.[0]}"`).toBeNull();
    }
  });
});
