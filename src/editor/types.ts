/**
 * Level-editor data model. Mirrors the runtime FieldData that FieldHDScene
 * reads from public/world/<map>.json, so anything exported here drops straight
 * back into the game. Kept dependency-free (no game/core imports) so the editor
 * is a standalone tool.
 */

export interface FieldData {
  tile: number;
  cols: number;
  rows: number;
  width: number;
  height: number;
  collision: number[];
  grass: number[];
  grassAny?: number[];
  water?: number[];
  placements?: Array<{ type: string; col: number; row: number }>;
  npcs?: Array<Record<string, unknown>>;
  trainers?: Array<Record<string, unknown>>;
  items?: Array<Record<string, unknown>>;
  signs?: Array<Record<string, unknown>>;
  spawn?: { x: number; y: number };
  exits?: Array<Record<string, unknown>>;
  interacts?: Array<Record<string, unknown>>;
  ledges?: Array<Record<string, unknown>>;
  zone?: string;
  [k: string]: unknown; // tolerate fields the editor doesn't model yet (round-trips them)
}

/** Maps the editor can load (paired png + json under public/world). */
export const MAP_IDS = [
  'the-field', 'farmroad', 'ohmstead', 'railhead', 'cistern',
  'bastion', 'redoubt', 'trinity', 'chancel',
] as const;
export type MapId = (typeof MAP_IDS)[number];

/** A cell layer is a 0/1 grid you paint (walls, grass, water). */
export interface CellLayer {
  key: 'collision' | 'grass' | 'grassAny' | 'water';
  label: string;
  color: string; // overlay fill
}
export const CELL_LAYERS: CellLayer[] = [
  { key: 'collision', label: 'Collision (walls)', color: 'rgba(220,40,40,0.45)' },
  { key: 'grass', label: 'Grass (encounters)', color: 'rgba(60,180,60,0.40)' },
  { key: 'grassAny', label: 'Grass (decor only)', color: 'rgba(120,200,90,0.30)' },
  { key: 'water', label: 'Water', color: 'rgba(60,130,210,0.40)' },
];

export type FieldType = 'number' | 'text' | 'textarea' | 'bool' | 'select' | 'lines' | 'team' | 'json';
export interface FieldSpec {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  suggest?: string[]; // datalist hints for free-text
}

/** An entity layer is an array of placed objects with a cell position. */
export interface EntityLayer {
  key: 'items' | 'npcs' | 'trainers' | 'signs' | 'interacts' | 'exits' | 'ledges' | 'placements';
  label: string;
  color: string; // marker colour
  glyph: string; // marker glyph
  /** which keys hold the cell coordinate (col/row vs x/y) */
  coord: ['col', 'row'] | ['x', 'y'];
  /** a fresh entity at (cx,cy) */
  make: (cx: number, cy: number) => Record<string, unknown>;
  /** editable property schema (beyond the coords, which are always editable) */
  fields: FieldSpec[];
}

const DIRS = ['n', 's', 'e', 'w'];
const CHARS = ['npc_rancher', 'npc_elder', 'npc_kid'];
const KINDS = ['bench', 'banjo', 'eli', 'bed', 'lift', 'heal', 'shop'];

export const ENTITY_LAYERS: EntityLayer[] = [
  {
    key: 'items', label: 'Items', color: '#ffd27a', glyph: '◆', coord: ['col', 'row'],
    make: (col, row) => ({ col, row, credits: 100, label: 'A node pickup', hidden: false }),
    fields: [
      { key: 'credits', label: 'Credits', type: 'number' },
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'hidden', label: 'Hidden', type: 'bool' },
    ],
  },
  {
    key: 'npcs', label: 'NPCs', color: '#7fe0ff', glyph: '☻', coord: ['col', 'row'],
    make: (col, row) => ({ char: 'npc_rancher', col, row, name: 'Someone', lines: ['...'] }),
    fields: [
      { key: 'char', label: 'Sprite', type: 'text', suggest: CHARS },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'lines', label: 'Dialogue (one line per row)', type: 'lines' },
      { key: 'shop', label: 'Shop tier (optional)', type: 'text' },
      { key: 'warden', label: 'Warden payload (JSON, optional)', type: 'json' },
    ],
  },
  {
    key: 'trainers', label: 'Trainers', color: '#ff7a6a', glyph: '✦', coord: ['col', 'row'],
    make: (col, row) => ({ char: 'npc_rancher', col, row, facing: 's', name: 'Trainer', team: [{ num: 10, level: 5 }] }),
    fields: [
      { key: 'char', label: 'Sprite', type: 'text', suggest: CHARS },
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'facing', label: 'Facing', type: 'select', options: DIRS },
      { key: 'range', label: 'Sight range', type: 'number' },
      { key: 'team', label: 'Team (one "num,level" per row)', type: 'team' },
      { key: 'bark', label: 'Pre-fight line', type: 'textarea' },
    ],
  },
  {
    key: 'signs', label: 'Signs', color: '#f4ecd8', glyph: '▤', coord: ['col', 'row'],
    make: (col, row) => ({ col, row, text: 'A sign.' }),
    fields: [{ key: 'text', label: 'Text', type: 'textarea' }],
  },
  {
    key: 'interacts', label: 'Interacts', color: '#c79bff', glyph: '✸', coord: ['x', 'y'],
    make: (x, y) => ({ x, y, kind: 'bench' }),
    fields: [
      { key: 'kind', label: 'Kind', type: 'text', suggest: KINDS },
      { key: 'tier', label: 'Tier (shop, optional)', type: 'text' },
    ],
  },
  {
    key: 'exits', label: 'Exits', color: '#ffa64d', glyph: '⇄', coord: ['x', 'y'],
    make: (x, y) => ({ x, y, scene: 'fieldhd', mapId: '', gate: '' }),
    fields: [
      { key: 'scene', label: 'Target scene', type: 'text', suggest: ['fieldhd', 'elevator'] },
      { key: 'mapId', label: 'Target map id', type: 'text', suggest: [...MAP_IDS] },
      { key: 'gate', label: 'Gate (e.g. warden)', type: 'text' },
      { key: 'to', label: 'Landing cell (JSON {x,y})', type: 'json' },
    ],
  },
  {
    key: 'ledges', label: 'Ledges', color: '#ffe14d', glyph: '▼', coord: ['col', 'row'],
    make: (col, row) => ({ col, row, dir: 's' }),
    fields: [{ key: 'dir', label: 'Hop direction', type: 'select', options: DIRS }],
  },
  {
    key: 'placements', label: 'Placements (trees…)', color: '#8fbf6f', glyph: '♣', coord: ['col', 'row'],
    make: (col, row) => ({ type: 'tree', col, row }),
    fields: [{ key: 'type', label: 'Type', type: 'text', suggest: ['tree'] }],
  },
];

export function layerByKey(key: string): EntityLayer | undefined {
  return ENTITY_LAYERS.find((l) => l.key === key);
}
