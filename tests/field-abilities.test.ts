import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { partyHasFieldAbility, FIELD_ABILITY_SPECIES, HOVER_GIFT_SPECIES } from '../src/data/field-abilities';

describe('field abilities (HOVER)', () => {
  it('a Drone-line party has HOVER; others do not', () => {
    expect(partyHasFieldAbility([{ speciesNum: 4 }], 'HOVER')).toBe(true);
    expect(partyHasFieldAbility([{ speciesNum: 6 }], 'HOVER')).toBe(true);
    expect(partyHasFieldAbility([{ speciesNum: 7 }, { speciesNum: 1 }], 'HOVER')).toBe(false);
  });

  it('the gifted survey drone grants HOVER', () => {
    expect(FIELD_ABILITY_SPECIES.HOVER.has(HOVER_GIFT_SPECIES)).toBe(true);
  });
});

describe('the Cistern HOVER gate', () => {
  const cistern = JSON.parse(readFileSync(join(process.cwd(), 'public/world/cistern.json'), 'utf8')) as {
    cols: number; rows: number; collision: number[]; hover: number[]; spawn: { x: number; y: number };
    interacts?: Array<{ kind?: string }>; npcs?: Array<{ warden?: unknown }>;
  };

  function reachable(useHover: boolean): Set<string> {
    const { cols, rows, collision, hover, spawn } = cistern;
    const seen = new Set<string>([`${spawn.x},${spawn.y}`]);
    const q: Array<[number, number]> = [[spawn.x, spawn.y]];
    while (q.length) {
      const [x, y] = q.pop()!;
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]] as const) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        const k = `${nx},${ny}`;
        if (seen.has(k)) continue;
        const i = ny * cols + nx;
        if (collision[i] === 1 && !(hover[i] === 1 && useHover)) continue;
        seen.add(k);
        q.push([nx, ny]);
      }
    }
    return seen;
  }

  it('has a flooded band and a survey-drone gift', () => {
    expect(cistern.hover.reduce((a, b) => a + b, 0)).toBeGreaterThan(30);
    expect((cistern.interacts ?? []).some((i) => i.kind === 'hovergift')).toBe(true);
  });

  it('on foot you can reach the gift but NOT the Warden / north exit', () => {
    const onFoot = reachable(false);
    expect(onFoot.has('22,23')).toBe(true); // the drone cradle (south of the flood)
    expect(onFoot.has('7,7')).toBe(false); // Warden Bloom — gated
    expect(onFoot.has('20,1')).toBe(false); // north exit — gated
  });

  it('with HOVER the whole colony opens up', () => {
    const hovering = reachable(true);
    expect(hovering.has('7,7')).toBe(true);
    expect(hovering.has('20,1')).toBe(true);
  });
});
