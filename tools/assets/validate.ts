/**
 * Asset manifest compiler + validator (Asset Bible Part A §3 R1–R12, §8).
 *
 * Manifest-level checks run here: record schema, naming (R10), uniqueness
 * (R12), palette discipline (R7), layer law (R5), autotile completeness (R11),
 * obstacle completeness (R9), and per-kit budget (R8). The map-level rules
 * (R1 sec-scope, R2 two-tileset, R3 overlay gating, R4 biome match, R6
 * collision/elevation) are enforced at COMPOSE time by `validateMap` when a
 * generator assembles an area from the manifest.
 */
import { AREAS, BUDGET, type AreaDef, type AssetRecord, type Kit, TEMPLATES } from './types';

export interface Violation {
  rule: string;
  id: string;
  msg: string;
}

const PRIMARY_PALS = new Set([0, 1, 2, 3, 4, 5]);
const SECONDARY_PALS = new Set([6, 7, 8, 9, 10, 11, 12]);
const ID_RE = /^[a-z0-9]+(\.[a-z0-9_]+)+$/;
const isPrimaryClass = (kit: Kit): boolean => kit === 'primary';

/** Blocks (metatiles) a record contributes, accounting for template + variants. */
export function blockCount(r: AssetRecord): number {
  let base = 1;
  if (r.type === 'autotile' && r.template) base = TEMPLATES[r.template];
  else if (r.type === 'prop' && r.footprint) base = r.footprint[0] * r.footprint[1];
  const v = r.variants && r.variants.length > 0 ? r.variants.length : 1;
  return base * v;
}

export function validate(records: AssetRecord[]): Violation[] {
  const v: Violation[] = [];
  const seen = new Set<string>();
  const gateBases = new Map<string, Set<string>>();

  for (const r of records) {
    // schema / required fields
    for (const f of ['id', 'display_name', 'kit', 'biome', 'type', 'layer', 'collision', 'elev', 'pal', 'phase', 'gen_prompt'] as const) {
      if (r[f] === undefined || r[f] === null || r[f] === '') v.push({ rule: 'schema', id: r.id || '(no id)', msg: `missing ${f}` });
    }
    // R10 naming + R12 uniqueness
    if (!ID_RE.test(r.id)) v.push({ rule: 'R10', id: r.id, msg: 'id not lowercase.snake.dotted' });
    if (seen.has(r.id)) v.push({ rule: 'R12', id: r.id, msg: 'duplicate id' });
    seen.add(r.id);
    // R7 palette discipline
    const pals = isPrimaryClass(r.kit) ? PRIMARY_PALS : SECONDARY_PALS;
    if (!pals.has(r.pal)) v.push({ rule: 'R7', id: r.id, msg: `pal ${r.pal} illegal for kit ${r.kit} (expect ${isPrimaryClass(r.kit) ? '0–5' : '6–12'})` });
    // R5 layer law — top tiles carry no collision
    if (r.layer === 'top' && r.collision !== 'pass') v.push({ rule: 'R5', id: r.id, msg: `top layer must be collision:pass (got ${r.collision})` });
    if (r.layer === 'object' && !(r.type === 'object' || r.type === 'anim')) v.push({ rule: 'R5', id: r.id, msg: 'object layer requires type object/anim' });
    // R11 autotile completeness (must declare a known template)
    if (r.type === 'autotile' && (!r.template || !(r.template in TEMPLATES))) v.push({ rule: 'R11', id: r.id, msg: 'autotile missing/unknown template' });
    // prop integrity
    if (r.type === 'prop' && !r.footprint) v.push({ rule: 'schema', id: r.id, msg: 'prop missing footprint' });
    // gate tracking (R9)
    if (r.gate && r.gate !== 'none') {
      if (!r.state) v.push({ rule: 'R9', id: r.id, msg: 'gate obstacle missing state' });
      const base = r.id.replace(/\.(blocked|cleared)$/, '');
      if (!gateBases.has(base)) gateBases.set(base, new Set());
      if (r.state) gateBases.get(base)!.add(r.state);
    }
  }
  // R9 — every gate base ships both states
  for (const [base, states] of gateBases)
    if (!(states.has('blocked') && states.has('cleared')))
      v.push({ rule: 'R9', id: base, msg: `gate obstacle needs both states (has ${[...states].join(',') || 'none'})` });

  // R8 — per-kit budget
  const byKit = new Map<Kit, number>();
  for (const r of records) byKit.set(r.kit, (byKit.get(r.kit) ?? 0) + blockCount(r));
  for (const [kit, n] of byKit) {
    const cap = isPrimaryClass(kit) ? BUDGET.primaryClass : BUDGET.secondaryClass;
    if (n > cap) v.push({ rule: 'R8', id: String(kit), msg: `kit ${kit} = ${n} blocks > cap ${cap}` });
  }
  return v;
}

/**
 * Compose-time map validation (R1–R4, R6). A map declares its area; this
 * checks the kits/tiles it pulls are all allowed. Returns violations.
 */
export function validateMap(
  area: AreaDef,
  usedKits: Kit[],
  records: AssetRecord[],
): Violation[] {
  const v: Violation[] = [];
  const byId = new Map(records.map((r) => [r.id, r]));
  const allowedSecondary = new Set<Kit>([area.secondary]);
  if (area.building) allowedSecondary.add('building');
  if (area.dungeon === 'cave') allowedSecondary.add('dungeon.cave');
  if (area.dungeon === 'mine') allowedSecondary.add('dungeon.mine');
  const secondaryUsed = usedKits.filter((k) => k !== 'primary' && k !== 'overlay.hive');
  // R2 — at most one secondary-class kit beyond the shared building/dungeon helpers
  const ownSec = secondaryUsed.filter((k) => k.startsWith('sec.'));
  if (ownSec.length > 1) v.push({ rule: 'R2', id: area.area, msg: `>1 sec kit on map: ${ownSec.join(',')}` });
  for (const k of usedKits) {
    if (k === 'primary') continue;
    if (k === 'overlay.hive') {
      if (area.saturation === 'none') v.push({ rule: 'R3', id: area.area, msg: 'hive overlay on a clean map' });
      continue;
    }
    if (!allowedSecondary.has(k)) v.push({ rule: 'R1', id: area.area, msg: `kit ${k} not allowed in area ${area.area}` });
  }
  // R4 — every used record's biome must match the map biome (or be multi)
  for (const id of records.filter((r) => usedKits.includes(r.kit)).map((r) => r.id)) {
    const r = byId.get(id);
    if (r && r.biome !== 'multi' && r.biome !== area.biome) v.push({ rule: 'R4', id, msg: `biome ${r.biome} != map ${area.biome}` });
  }
  return v;
}

/** Budget + scope report (Asset Bible §8 counts). */
export function report(records: AssetRecord[]): string {
  const byKit = new Map<Kit, { blocks: number; records: number }>();
  for (const r of records) {
    const e = byKit.get(r.kit) ?? { blocks: 0, records: 0 };
    e.blocks += blockCount(r);
    e.records += 1;
    byKit.set(r.kit, e);
  }
  const lines: string[] = [];
  lines.push('KIT                       records   blocks / cap');
  for (const [kit, e] of [...byKit].sort()) {
    const cap = isPrimaryClass(kit) ? BUDGET.primaryClass : BUDGET.secondaryClass;
    lines.push(`${kit.padEnd(24)} ${String(e.records).padStart(6)} ${String(e.blocks).padStart(8)} / ${cap}`);
  }
  const authored = new Set(records.map((r) => r.kit));
  const pendingSec = AREAS.map((a) => a.secondary).filter((s) => !authored.has(s));
  lines.push('');
  lines.push(`areas in matrix: ${AREAS.length}`);
  lines.push(`secondary kits authored: ${[...authored].filter((k) => k.startsWith('sec.')).length}  pending: ${pendingSec.length}`);
  lines.push(`pending sec kits (build order): ${pendingSec.join(', ')}`);
  return lines.join('\n');
}
