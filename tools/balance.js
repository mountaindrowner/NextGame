// Full balance test: CPU vs CPU round robin, every matchup from both sides, at one difficulty.
// node balance.js [rounds per side, default 6] [difficulty 0-2, default 2] [ONLY fighter] [TWEAK js run in the page first, for experiments]
// Prints each fighter's win rate, a matchup table, and average damage / round length.
const { chromium } = require('playwright');
const path = require('path');
const N = +(process.argv[2] || 6), DIFF = +(process.argv[3] ?? 2), ONLY = process.argv[4] && process.argv[4] !== '-' ? process.argv[4] : null, TWEAK = process.argv[5] || '';
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.voice = false; d.SET.music = false; });
  if (TWEAK) await p.evaluate(TWEAK);
  const ids = await p.evaluate(o => [...window.__dbg.ORDER, ...(o && !window.__dbg.ORDER.includes(o) ? [o] : [])], ONLY);
  const W = {}, G = {}, M = {}, stat = {};
  for (const a of ids) { W[a] = 0; G[a] = 0; M[a] = {}; stat[a] = { dmg: 0, rounds: 0, kos: 0, frames: 0, sp: 0 }; for (const b of ids) M[a][b] = [0, 0]; }
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) for (let side = 0; side < 2; side++) {
    if (ONLY && ids[i] !== ONLY && ids[j] !== ONLY) continue;
    const [a, b] = side ? [ids[j], ids[i]] : [ids[i], ids[j]];
    const res = await p.evaluate(([a, b, N, DIFF]) => {
      const d = window.__dbg, out = [];
      for (let k = 0; k < N; k++) {
        d.SET.diff = DIFF; d.RUN = { mode: 'vs', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b });
        const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {};
        F.phase = 'play'; F.p1.cpu = true; F.p2.cpu = true; F.p1.ai = F.p1.ai || {}; F.p2.ai = F.p2.ai || {}; F.time = 99;
        let fr = 0; const LIM = 99 * 60;
        while (fr < LIM && F.p1.hp > 0 && F.p2.hp > 0) { d.tick(); upd(); fr++; F.time = 99; if (F.phase !== 'play') F.phase = 'play'; }
        const r1 = F.p1.hp / F.p1.mhp, r2 = F.p2.hp / F.p2.mhp, w = r1 === r2 ? -1 : r1 > r2 ? 0 : 1;
        out.push({ w, fr, ko: F.p1.hp <= 0 || F.p2.hp <= 0, dmg: [F.p2.mhp - Math.max(0, F.p2.hp), F.p1.mhp - Math.max(0, F.p1.hp)] });
      }
      return out;
    }, [a, b, N, DIFF]);
    for (const r of res) { G[a]++; G[b]++; if (r.w === 0) { W[a]++; M[a][b][0]++; } else if (r.w === 1) { W[b]++; M[b][a][0]++; }
      M[a][b][1]++; M[b][a][1]++;
      for (const [f, k] of [[a, 0], [b, 1]]) { stat[f].dmg += r.dmg[k]; stat[f].rounds++; stat[f].frames += r.fr; if (r.ko && r.w === k) stat[f].kos++; } }
    process.stderr.write('.');
  }
  process.stderr.write('\n');
  const rows = ids.filter(a => G[a]).map(a => ({ a, wr: W[a] / G[a] })).sort((x, y) => y.wr - x.wr);
  console.log(`\nBALANCE — CPU vs CPU, difficulty ${['EASY', 'NORMAL', 'HARD'][DIFF]}, ${N} rounds per side per matchup (${G[ids[0]]} rounds per fighter)\n`);
  console.log('fighter   win%   avg dmg/round  KO wins  avg round');
  for (const { a, wr } of rows) { const s = stat[a];
    console.log(`${a.padEnd(8)} ${(wr * 100).toFixed(0).padStart(4)}%   ${(s.dmg / s.rounds).toFixed(1).padStart(8)}       ${String(s.kos).padStart(4)}    ${(s.frames / s.rounds / 60).toFixed(1).padStart(5)} s  ${'#'.repeat(Math.round(wr * 40))}`); }
  console.log('\nmatchups (row fighter win % vs column)');
  console.log('         ' + ids.map(b => b.slice(0, 6).padStart(7)).join(''));
  for (const a of ids) console.log(a.padEnd(9) + ids.map(b => a === b ? '      -' : (M[a][b][1] ? Math.round(100 * M[a][b][0] / M[a][b][1]) + '%' : '').padStart(7)).join(''));
  const spread = rows[0].wr - rows[rows.length - 1].wr;
  console.log(`\nspread top-bottom: ${(spread * 100).toFixed(0)} points; outliers (outside 35-65%): ${rows.filter(r => r.wr > .65 || r.wr < .35).map(r => r.a + ' ' + Math.round(r.wr * 100) + '%').join(', ') || 'none'}`);
  console.log('errors:', errs.length ? errs.slice(0, 3) : 'none'); await br.close();
  if (!ONLY && !TWEAK) require('fs').writeFileSync(path.resolve(__dirname, '../release/balance.json'), JSON.stringify({ N, DIFF, W, G, M, stat }, null, 1));
})();
