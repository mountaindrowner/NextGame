import type { Rng } from './rng';

/**
 * The IFF Recalibration node puzzle (GDD §10.6): rotate segments to connect
 * the device port (west edge) to the Ohm's core port (east edge) before the
 * timer ends. Pure model — the scene only renders and rotates.
 */

export type CellKind = 'straight' | 'corner' | 'blank';
export type Dir = 'N' | 'E' | 'S' | 'W';

export interface Cell {
  kind: CellKind;
  rotation: number; // 0..3
}

export interface Puzzle {
  size: number;
  cells: Cell[]; // row-major
  startY: number; // west port row
  endY: number; // east port row
  /** rotations that restore the carved path (headless solver / debug) */
  solution: number[];
}

const OPPOSITE: Record<Dir, Dir> = { N: 'S', S: 'N', E: 'W', W: 'E' };

export function connections(cell: Cell): ReadonlySet<Dir> {
  if (cell.kind === 'straight') return cell.rotation % 2 === 0 ? new Set(['W', 'E']) : new Set(['N', 'S']);
  if (cell.kind === 'corner') {
    const table: Dir[][] = [
      ['N', 'E'],
      ['E', 'S'],
      ['S', 'W'],
      ['W', 'N'],
    ];
    return new Set(table[cell.rotation % 4]);
  }
  return new Set();
}

function shapeFor(entry: Dir, exit: Dir): Cell {
  if (OPPOSITE[entry] === exit) {
    return { kind: 'straight', rotation: entry === 'W' || entry === 'E' ? 0 : 1 };
  }
  const pairs: Array<[Dir, Dir, number]> = [
    ['N', 'E', 0],
    ['E', 'S', 1],
    ['S', 'W', 2],
    ['W', 'N', 3],
  ];
  for (const [a, b, rot] of pairs) {
    if ((entry === a && exit === b) || (entry === b && exit === a)) return { kind: 'corner', rotation: rot };
  }
  throw new Error(`no shape for ${entry}->${exit}`);
}

export function generatePuzzle(size: number, rng: Rng): Puzzle {
  const startY = rng.int(0, size - 1);
  const cells: Cell[] = Array.from({ length: size * size }, () => ({
    kind: (['straight', 'corner', 'blank'] as CellKind[])[rng.int(0, 2)] ?? 'blank',
    rotation: rng.int(0, 3),
  }));

  // carve a guaranteed path column by column
  let y = startY;
  let entry: Dir = 'W';
  for (let x = 0; x < size; x++) {
    const targetY = x === size - 1 ? y : rng.int(Math.max(0, y - 2), Math.min(size - 1, y + 2));
    // vertical run inside this column
    while (y !== targetY) {
      const step: Dir = targetY < y ? 'N' : 'S';
      cells[y * size + x] = shapeFor(entry, step);
      y += step === 'N' ? -1 : 1;
      entry = OPPOSITE[step];
    }
    cells[y * size + x] = shapeFor(entry, 'E');
    entry = 'W';
  }
  const endY = y;

  // scramble rotations (still solvable by construction: every piece rotates)
  const solution = cells.map((c) => c.rotation);
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i];
    if (c) cells[i] = { kind: c.kind, rotation: rng.int(0, 3) };
  }
  return { size, cells, startY, endY, solution };
}

export function rotateCell(puzzle: Puzzle, x: number, yy: number): void {
  const c = puzzle.cells[yy * puzzle.size + x];
  if (c && c.kind !== 'blank') c.rotation = (c.rotation + 1) % 4;
}

export function isSolved(p: Puzzle): boolean {
  const at = (x: number, yy: number): Cell | undefined =>
    x < 0 || yy < 0 || x >= p.size || yy >= p.size ? undefined : p.cells[yy * p.size + x];
  const start = at(0, p.startY);
  if (!start || !connections(start).has('W')) return false;
  const seen = new Set<string>();
  const stack: Array<[number, number]> = [[0, p.startY]];
  while (stack.length > 0) {
    const [x, yy] = stack.pop() as [number, number];
    const key = `${x},${yy}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const cell = at(x, yy);
    if (!cell) continue;
    const conns = connections(cell);
    if (x === p.size - 1 && yy === p.endY && conns.has('E')) return true;
    const deltas: Record<Dir, [number, number]> = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };
    for (const dir of conns) {
      const [dx, dy] = deltas[dir];
      const n = at(x + dx, yy + dy);
      if (n && connections(n).has(OPPOSITE[dir])) stack.push([x + dx, yy + dy]);
    }
  }
  return false;
}

/** Solve by restoring the carved path — used by the headless smoke test. */
export function solve(p: Puzzle): void {
  p.cells.forEach((c, i) => {
    c.rotation = p.solution[i] ?? c.rotation;
  });
}
