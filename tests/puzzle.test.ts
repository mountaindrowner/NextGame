import { describe, expect, it } from 'vitest';
import { generatePuzzle, isSolved, rotateCell, solve } from '../src/core/puzzle';
import { Rng } from '../src/core/rng';

describe('IFF node puzzle', () => {
  it('always generates a solvable board (1000 seeds, all grid sizes)', () => {
    for (let seed = 1; seed <= 1000; seed++) {
      const size = 4 + (seed % 3);
      const p = generatePuzzle(size, new Rng(seed));
      solve(p);
      expect(isSolved(p), `seed ${seed} size ${size}`).toBe(true);
    }
  });

  it('scrambled boards are usually unsolved and rotation changes state', () => {
    let solvedAtStart = 0;
    for (let seed = 1; seed <= 200; seed++) {
      const p = generatePuzzle(5, new Rng(seed));
      if (isSolved(p)) solvedAtStart += 1;
    }
    expect(solvedAtStart).toBeLessThan(40); // scramble does its job
    const p = generatePuzzle(5, new Rng(3));
    const before = JSON.stringify(p.cells);
    rotateCell(p, 0, p.startY);
    expect(JSON.stringify(p.cells)).not.toBe(before);
  });
});
