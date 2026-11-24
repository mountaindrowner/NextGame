// Combo strings follow the Street Fighter rule: the next hit of a chain only starts once the last one's active frames are over,
// the third hit is the finisher (uppercut / rising kick: harder, a big shove) and nothing chains out of it, and pressing
// again after it starts a fresh string (jab, not the finisher again).  node tools/strings.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = await p.evaluate(() => {
    const d = window.__dbg, res = [], { held, pressed } = d.inp; d.SET.sound = false;
    const C = (n, ok, info) => res.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(40)} ${info}`);
    for (const id of ['vizor', 'mike', 'keksan']) {
      d.RUN = { mode: 'training', p1: id, ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: id, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = 'STAND'; F.p1.x = 100; F.p2.x = 140;
      const K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'];
      const step = (o = {}) => { for (const k of K) { pressed[k] = !!o[k]; held[k] = false } d.tick(); upd() };
      // mash A every 2 frames for 3 seconds and record every attack that comes out
      const seen = []; let lastId = null, startT = 0;
      for (let i = 0; i < 180; i++) { step(i % 2 === 0 ? { a: 1 } : {}); const a = F.p1.atk;
        if (a && a.id !== lastId) { lastId = a.id; seen.push({ t: i, anim: a.anim || a.name, fin: !!a.fin, gap: i - startT }); startT = i } }
      const anims = seen.map(s => s.anim + (s.fin ? '*' : '')).join(' ');
      const firstFin = seen.findIndex(s => s.fin);
      C(`${id}: third hit is the finisher`, firstFin === 2, anims.slice(0, 90));
      const after = seen[firstFin + 1];
      C(`${id}: after the finisher, a fresh string`, !!after && !after.fin && after.anim !== 'punch3', after ? `next: ${after.anim}` : 'nothing');
      const repeats = seen.some((s, i) => s.fin && seen[i + 1] && seen[i + 1].fin);
      C(`${id}: the finisher never repeats back to back`, !repeats, `${seen.length} attacks in 3 s`);
      // chain cadence: the gap between chained hits is at least startup + active frames of the previous one
      const g = seen.slice(1, 3).map(s => s.gap); C(`${id}: chain gap >= startup + active`, g.every(x => x >= 7), `gaps ${g.join(', ')} frames`);
    }
    // the finisher's shove: the opponent ends up further away than after a normal chain hit
    { d.RUN = { mode: 'training', p1: 'vizor', ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: 'vizor', p2: 'padre', stage: 'padre' }); const F = d.F; F.phase = 'play';
      const a = { s: 4, a: 3, r: 9, dmg: 4, kb: 1.6, stun: 18, bs: 10, lv: 'mid' }; F.p1.x = 100; F.p2.x = 140; d.applyHit(F.p1, F.p2, a, 140, 150); const v1 = Math.abs(F.p2.vx);
      F.p2.vx = 0; F.p2.state = 'idle'; d.applyHit(F.p1, F.p2, { ...a, kb: 4.6, heavy: true, fin: 1 }, 140, 150); const v2 = Math.abs(F.p2.vx);
      C('finisher shoves harder', v2 > v1 * 2, `push ${v1.toFixed(1)} -> ${v2.toFixed(1)}`) }
    return res });
  console.log(out.join('\n')); console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none'); await br.close();
})();
