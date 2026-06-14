import { describe, expect, it } from 'vitest';
import { CATALOG } from '../tools/assets/catalog';
import { blockCount, validate, validateMap } from '../tools/assets/validate';
import { AREAS, BUDGET, type Kit } from '../tools/assets/types';

describe('asset system (Asset Bible Part A)', () => {
  it('the catalog compiles with zero rule violations', () => {
    const v = validate(CATALOG);
    expect(v, v.map((x) => `${x.rule}:${x.id}:${x.msg}`).join('\n')).toEqual([]);
  });

  it('every id is unique', () => {
    const ids = CATALOG.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps palette discipline (R7): shared kits 0–5, per-area 6–12', () => {
    for (const r of CATALOG) {
      const shared = r.kit === 'primary' || r.kit.startsWith('clutter.');
      if (shared) expect(r.pal, r.id).toBeLessThanOrEqual(5);
      else expect(r.pal, r.id).toBeGreaterThanOrEqual(6);
    }
  });

  it('every gate obstacle ships both states (R9)', () => {
    const bases = new Map<string, Set<string>>();
    for (const r of CATALOG)
      if (r.gate && r.gate !== 'none') {
        const base = r.id.replace(/\.(blocked|cleared)$/, '');
        (bases.get(base) ?? bases.set(base, new Set()).get(base)!).add(r.state ?? '');
      }
    for (const [, s] of bases) expect(s.has('blocked') && s.has('cleared')).toBe(true);
  });

  it('stays within the per-kit block budget (R8)', () => {
    const byKit = new Map<Kit, number>();
    for (const r of CATALOG) byKit.set(r.kit, (byKit.get(r.kit) ?? 0) + blockCount(r));
    for (const [kit, n] of byKit) {
      const cap = kit === 'primary' ? BUDGET.primaryClass : BUDGET.secondaryClass;
      expect(n, `${kit}=${n}`).toBeLessThanOrEqual(cap);
    }
  });

  it('compose-time scope (R1): a sec kit cannot be used outside its area', () => {
    const field = AREAS.find((a) => a.area === 'field')!;
    const bad = validateMap(field, ['primary', 'sec.ohmstead'], CATALOG);
    expect(bad.some((x) => x.rule === 'R1')).toBe(true);
    const ok = validateMap(field, ['primary', 'sec.field'], CATALOG);
    expect(ok.filter((x) => x.rule === 'R1')).toEqual([]);
  });

  it('compose-time overlay gating (R3): no hive on a clean map', () => {
    const field = AREAS.find((a) => a.area === 'field')!;
    expect(validateMap(field, ['primary', 'sec.field', 'overlay.hive'], CATALOG).some((x) => x.rule === 'R3')).toBe(true);
  });

  it('every area in the matrix has its secondary kit enumerated', () => {
    const kits = new Set(CATALOG.map((r) => r.kit));
    for (const a of AREAS) expect(kits.has(a.secondary), a.secondary).toBe(true);
  });

  it('clutter planes derive the right layer (D4)', () => {
    for (const r of CATALOG)
      if (r.plane) {
        const want = { floor: 'bottom', object: 'object', occluder: 'top', fx: 'top' }[r.plane];
        expect(r.layer, r.id).toBe(want);
      }
  });

  it('dressing kits are area-locked (D1)', () => {
    const field = AREAS.find((a) => a.area === 'field')!;
    expect(validateMap(field, ['primary', 'sec.field', 'dressing.redbed'], CATALOG).some((x) => x.rule === 'D1')).toBe(true);
    expect(validateMap(field, ['primary', 'sec.field', 'dressing.field', 'clutter.universal'], CATALOG).filter((x) => x.rule === 'D1' || x.rule === 'R1')).toEqual([]);
  });
});
