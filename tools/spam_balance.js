// Big balance + spam audit: CPU vs CPU round robin over every fighter (Vex included), every matchup from both sides,
// with per-move damage tracking. Reports win rates and the spam signals fighting games watch for:
//   top-move share  = share of a fighter's damage from their single most-damaging move (industry rule of thumb: <= ~40%)
//   specials/round  = how often specials are thrown;  stale% = hits reduced by the stale-poke rule;  loops = burst-able loops
// node tools/spam_balance.js [rounds per side, default 6] [difficulty 0-2, default 2] [TWEAK js]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const N = +(process.argv[2] || 6), DIFF = +(process.argv[3] ?? 2), TWEAK = process.argv[4] || '';
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.voice = false; d.SET.music = false; d.setStat({}); });
  if (TWEAK) await p.evaluate(TWEAK);
  const ids = await p.evaluate(() => [...window.__dbg.ORDER, 'vex']);
  const W = {}, G = {}, M = {}, R = {};
  for (const a of ids) { W[a] = 0; G[a] = 0; R[a] = { rounds: 0, frames: 0 }; M[a] = {}; for (const b of ids) M[a][b] = [0, 0]; }
  for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) for (let side = 0; side < 2; side++) {
    const [a, b] = side ? [ids[j], ids[i]] : [ids[i], ids[j]];
    const res = await p.evaluate(([a, b, N, DIFF]) => { const d = window.__dbg, out = [];
      for (let k = 0; k < N; k++) { d.SET.diff = DIFF; d.RUN = { mode: 'vs', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b });
        const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {};
        F.phase = 'play'; F.p1.cpu = true; F.p2.cpu = true; F.p1.ai = F.p1.ai || {}; F.p2.ai = F.p2.ai || {}; F.time = 99;
        let fr = 0; while (fr < 99 * 60 && F.p1.hp > 0 && F.p2.hp > 0) { d.tick(); upd(); fr++; F.time = 99; if (F.phase !== 'play') F.phase = 'play'; }
        const r1 = F.p1.hp / F.p1.mhp, r2 = F.p2.hp / F.p2.mhp; out.push({ w: r1 === r2 ? -1 : r1 > r2 ? 0 : 1, fr }); }
      return out }, [a, b, N, DIFF]);
    for (const r of res) { G[a]++; G[b]++; if (r.w === 0) { W[a]++; M[a][b][0]++ } else if (r.w === 1) { W[b]++; M[b][a][0]++ } M[a][b][1]++; M[b][a][1]++;
      for (const f of [a, b]) { R[f].rounds++; R[f].frames += r.fr } }
    process.stderr.write('.');
  }
  process.stderr.write('\n');
  const S = await p.evaluate(() => window.__dbg.getStat());
  const rows = ids.map(a => { const s = S[a] || { moves: {}, uses: {}, dmg: 0, hits: 0, stale: 0, loops: 0, blocked: 0 }, mv = Object.entries(s.moves).sort((x, y) => y[1].dmg - x[1].dmg), top = mv[0] || ['-', { dmg: 0 }];
    const spDmg = mv.filter(([k]) => !['jab', 'kick', 'sweep', 'cjab', 'leap', 'jkick', 'jpunch', 'cmd', 'tc', 'throw', 'super', 'focus', 'overhead', 'other'].includes(k)).reduce((t, [, v]) => t + v.dmg, 0);
    return { a, wr: W[a] / G[a], top: top[0], topShare: s.dmg ? top[1].dmg / s.dmg : 0, spShare: s.dmg ? spDmg / s.dmg : 0, spRound: Object.values(s.uses).reduce((t, v) => t + v, 0) / R[a].rounds,
      stale: s.hits ? s.stale / s.hits : 0, loops: s.loops / R[a].rounds, blocked: s.blocked / Math.max(1, s.blocked + s.hits), mv } }).sort((x, y) => y.wr - x.wr);
  const L = [];
  L.push(`SPAM + BALANCE AUDIT — CPU vs CPU, ${['EASY', 'NORMAL', 'HARD'][DIFF]}, ${N} rounds per side per matchup (${G[ids[0]]} rounds per fighter)\n`);
  L.push('fighter    win%  top move (share)          special dmg  specials/rd  blocked  stale hits  loops/rd');
  for (const r of rows) L.push(`${r.a.padEnd(9)} ${(r.wr * 100).toFixed(0).padStart(4)}%  ${(r.top + ' ' + (r.topShare * 100).toFixed(0) + '%').padEnd(24)}  ${(r.spShare * 100).toFixed(0).padStart(6)}%      ${r.spRound.toFixed(1).padStart(5)}     ${(r.blocked * 100).toFixed(0).padStart(4)}%     ${(r.stale * 100).toFixed(1).padStart(5)}%    ${r.loops.toFixed(2)}`);
  L.push('\nmatchups (row win % vs column)'); L.push('         ' + ids.map(b => b.slice(0, 6).padStart(7)).join(''));
  for (const a of ids) L.push(a.padEnd(9) + ids.map(b => a === b ? '      -' : Math.round(100 * M[a][b][0] / Math.max(1, M[a][b][1])) + '%').map(x => x.padStart(7)).join(''));
  const spread = rows[0].wr - rows[rows.length - 1].wr;
  L.push(`\nspread top-bottom: ${(spread * 100).toFixed(0)} points; outside 40-60%: ${rows.filter(r => r.wr > .6 || r.wr < .4).map(r => r.a + ' ' + Math.round(r.wr * 100) + '%').join(', ') || 'none'}`);
  L.push(`top move over 40% of damage: ${rows.filter(r => r.topShare > .4).map(r => r.a + ' ' + r.top + ' ' + Math.round(r.topShare * 100) + '%').join(', ') || 'none'}`);
  L.push('\nper-fighter damage by move (top 5):'); for (const r of rows) { const tot = r.mv.reduce((t, [, v]) => t + v.dmg, 0); L.push(`  ${r.a.padEnd(9)} ` + r.mv.slice(0, 5).map(([k, v]) => `${k} ${(100 * v.dmg / tot).toFixed(0)}%`).join(', ')) }
  L.push('errors: ' + (errs.length ? errs.slice(0, 3).join(' | ') : 'none'));
  console.log(L.join('\n')); fs.writeFileSync(path.resolve(__dirname, '../release/spam-balance.txt'), L.join('\n') + '\n'); await br.close();
})();
