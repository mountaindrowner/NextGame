import { connections, generatePuzzle, isSolved, rotateCell, solve, type Puzzle } from '../../core/puzzle';
import type { Rng } from '../../core/rng';

/**
 * IFF Recalibration on the grid (GDD §10.6): the fight freezes, the node
 * opens a puzzle — rotate segments to route the device port (west) to the
 * Ohm's core (east) before the timer runs out. The budget (timer, grid size)
 * comes from core/capture.ts's Gen 3 catch value. Click/tap a segment to turn
 * it, or move with the arrow keys and turn with Space/Enter.
 */
export function runCapturePuzzle(host: HTMLElement, rng: Rng, opts: { size: number; seconds: number; name: string }): Promise<boolean> {
  const p: Puzzle = generatePuzzle(opts.size, rng);
  const wrap = document.createElement('div');
  wrap.className = 'cap';
  wrap.innerHTML = `
    <div class="cap-card">
      <div class="cap-head"><b>Clearing the static</b><span>${opts.name}</span></div>
      <div class="cap-timer"><div></div></div>
      <div class="cap-board"><i class="cap-port cap-in"></i><div class="cap-grid"></div><i class="cap-port cap-out"></i></div>
      <div class="cap-help">Turn the segments to link your device to its core · click / tap · or arrows + Space</div>
    </div>`;
  host.appendChild(wrap);
  const grid = wrap.querySelector('.cap-grid') as HTMLDivElement;
  const bar = wrap.querySelector('.cap-timer div') as HTMLDivElement;
  grid.style.gridTemplateColumns = `repeat(${p.size}, 1fr)`;
  const cellPx = Math.min(64, Math.floor(320 / p.size));
  grid.style.setProperty('--cell', `${cellPx}px`);
  (wrap.querySelector('.cap-in') as HTMLElement).style.top = `${(p.startY + 0.5) * (cellPx + 4) + 2}px`;
  (wrap.querySelector('.cap-out') as HTMLElement).style.top = `${(p.endY + 0.5) * (cellPx + 4) + 2}px`;
  let cx = 0, cy = p.startY;
  const tiles: HTMLDivElement[] = [];

  /** Which tiles are fed from the device port right now (for the glow). */
  const live = (): Set<number> => {
    const on = new Set<number>();
    const OPP = { N: 'S', S: 'N', E: 'W', W: 'E' } as const;
    const D = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] } as const;
    const start = p.cells[p.startY * p.size]!;
    if (!connections(start).has('W')) return on;
    const stack: Array<[number, number]> = [[0, p.startY]];
    while (stack.length) {
      const [x, y] = stack.pop()!;
      const i = y * p.size + x;
      if (on.has(i)) continue;
      on.add(i);
      for (const d of connections(p.cells[i]!)) {
        const [dx, dy] = D[d];
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= p.size || ny >= p.size) continue;
        if (connections(p.cells[ny * p.size + nx]!).has(OPP[d])) stack.push([nx, ny]);
      }
    }
    return on;
  };

  const draw = (): void => {
    const on = live();
    p.cells.forEach((c, i) => {
      const t = tiles[i]!;
      t.className = `cap-cell ${c.kind}${on.has(i) ? ' on' : ''}${i === cy * p.size + cx ? ' cur' : ''}`;
      t.style.setProperty('--rot', `${c.rotation * 90}deg`);
    });
  };
  p.cells.forEach((_, i) => {
    const t = document.createElement('div');
    t.innerHTML = '<span></span>';
    t.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      cx = i % p.size; cy = Math.floor(i / p.size);
      rotateCell(p, cx, cy);
      draw();
      check();
    });
    grid.appendChild(t);
    tiles.push(t);
  });

  let finish: (ok: boolean) => void = () => undefined;
  const done = new Promise<boolean>((r) => { finish = r; });
  let over = false;
  const end = (ok: boolean): void => {
    if (over) return;
    over = true;
    wrap.classList.add(ok ? 'win' : 'lose');
    window.removeEventListener('keydown', onKey, true);
    setTimeout(() => { wrap.remove(); finish(ok); }, ok ? 900 : 700);
  };
  const check = (): void => { if (isSolved(p)) end(true); };
  const onKey = (e: KeyboardEvent): void => {
    const k = e.key.toLowerCase();
    const mv = { arrowleft: [-1, 0], a: [-1, 0], arrowright: [1, 0], d: [1, 0], arrowup: [0, -1], w: [0, -1], arrowdown: [0, 1], s: [0, 1] }[k];
    if (mv) { cx = Math.max(0, Math.min(p.size - 1, cx + mv[0]!)); cy = Math.max(0, Math.min(p.size - 1, cy + mv[1]!)); draw(); }
    else if (k === ' ' || k === 'enter' || k === 'j') { rotateCell(p, cx, cy); draw(); check(); }
    else return;
    e.preventDefault();
    e.stopPropagation(); // the fight underneath is frozen; keep its keys out
  };
  window.addEventListener('keydown', onKey, true);
  draw();
  // headless test hook (mirrors the smoke test's solver)
  Object.assign(window, { __capSolve: () => { solve(p); draw(); check(); } });

  const t0 = performance.now();
  const tick = (): void => {
    if (over) return;
    const left = Math.max(0, 1 - (performance.now() - t0) / (opts.seconds * 1000));
    bar.style.width = `${left * 100}%`;
    bar.classList.toggle('low', left < 0.3);
    if (left <= 0) end(false);
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  return done;
}
