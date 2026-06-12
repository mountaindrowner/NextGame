/**
 * ASCII → Tiled (.tmj) test maps. Real maps are authored in Tiled from
 * M10 on; these placeholders keep the loader honest against the actual
 * Tiled JSON format. Run: npm run gen:maps
 *
 * Legend: . dirt · , tall grass · ; debris pile · # rubble wall ·
 *         = road · D door/warp · G garage heal spot · N npc spawn ·
 *         P player spawn · E elevator
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const TILE: Record<string, number> = { '.': 1, ',': 3, ';': 4, '#': 2, '=': 5, D: 6, G: 7, P: 1, N: 1, E: 6 };
const SOLID = new Set(['#']);
const ZONE: Record<string, number> = { ',': 1, ';': 2 };

const THE_FIELD = `
##############################
#,,,,..........=..........,,,#
#,,,,..,,,..N..=...;;;....,,,#
#,,,...,,,.....=...;;;;...,,,#
#......,,,.....=....;;;......#
#..####........=.........####
#..#..#....,,,.=..,,,.....#..#
#..#..#....,,,.=..,,,.....#G.#
#..####....,,,.=..........#..#
#..........................D#
#.....,,,,.....=...;;.......##
#.....,,,,.....=...;;;....,,,#
#.....,,,,..P..=....;....,,,,#
#..............E.........,,,#
##############################
`;

const OHMSTEAD_GARAGE = `
############
#..........#
#..N.......#
#..........#
#....P.....#
#..........#
#####DD#####
`;

interface ObjectSpawn {
  id: number;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

function build(name: string, ascii: string): void {
  const rows = ascii.trim().split('\n').map((r) => r.trimEnd());
  const height = rows.length;
  const width = Math.max(...rows.map((r) => r.length));
  const ground: number[] = [];
  const collision: number[] = [];
  const zones: number[] = [];
  const objects: ObjectSpawn[] = [];
  let oid = 1;
  rows.forEach((row, y) => {
    for (let x = 0; x < width; x++) {
      const ch = row[x] ?? '#';
      ground.push(TILE[ch] ?? 1);
      collision.push(SOLID.has(ch) ? 1 : 0);
      zones.push(ZONE[ch] ?? 0);
      if ('PNDGE'.includes(ch) && ch !== '.') {
        objects.push({ id: oid++, name: ch, type: ch, x: x * 16, y: y * 16, width: 16, height: 16 });
      }
    }
  });
  const tmj = {
    type: 'map',
    version: '1.10',
    orientation: 'orthogonal',
    renderorder: 'right-down',
    width,
    height,
    tilewidth: 16,
    tileheight: 16,
    infinite: false,
    layers: [
      { type: 'tilelayer', name: 'ground', width, height, data: ground, visible: true, opacity: 1, x: 0, y: 0 },
      { type: 'tilelayer', name: 'collision', width, height, data: collision, visible: false, opacity: 1, x: 0, y: 0 },
      { type: 'tilelayer', name: 'encounters', width, height, data: zones, visible: false, opacity: 1, x: 0, y: 0 },
      { type: 'objectgroup', name: 'spawns', objects, visible: true, opacity: 1, x: 0, y: 0 },
    ],
    tilesets: [{ firstgid: 1, name: 'placeholder', tilewidth: 16, tileheight: 16, tilecount: 8, columns: 8 }],
  };
  const dir = join(ROOT, 'public/maps');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${name}.tmj`), JSON.stringify(tmj));
  console.log(`built ${name}.tmj (${width}x${height})`);
}

build('the-field', THE_FIELD);
build('ohmstead-garage', OHMSTEAD_GARAGE);
