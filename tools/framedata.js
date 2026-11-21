// Frame data for every fighter's normals, measured by playing them in the real game:
// startup / active / recovery from the move's data, advantage on hit and on block measured
// (frames the attacker is free before the defender; + = attacker's turn). A move links into
// another when its hit advantage >= the next move's startup.
// usage: node tools/framedata.js [fighter]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 20000 });
  const only = process.argv[2];
  const rows = await p.evaluate(only => {
    const d = window.__dbg, K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'], out = [];
    const setup = (a, dummy) => { d.RUN = { mode: 'training', p1: a, ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.dummy = dummy; F.p1.x = 100; F.p2.x = 140; F.p1.face = 1; F.p2.face = -1;
      const { held, pressed } = d.inp; const step = () => { for (const k of K) { pressed[k] = false; held[k] = false; } d.tick(); upd(); }; return { F, step }; };
    const free = f => ['idle', 'crouch', 'walk'].includes(f.state);
    const measure = (id, n, dummy) => { const { F, step } = setup(id, dummy); for (let i = 0; i < 3; i++) step();
      const crouch = n === 'cjab' || n === 'sweep'; if (crouch) { F.p1.crouch = true; F.p1.state = 'crouch'; }
      d.startAtk(F.p1, n); const a = F.p1.atk; let t = 0, t1 = null, t2 = null, res = null;
      for (; t < 120 && (t1 === null || t2 === null); t++) { step(); if (!res && ['hurt', 'block', 'knock'].includes(F.p2.state)) res = F.p2.state;
        if (t1 === null && t > 1 && free(F.p1)) t1 = t; if (res && t2 === null && free(F.p2)) t2 = t; }
      return { a, res, adv: res === 'knock' ? 'KD' : (t1 !== null && t2 !== null ? t2 - t1 : null) }; };
    for (const id of only ? [only] : d.ORDER) for (const n of ['jab', 'cjab', 'kick', 'sweep', 'leap']) {
      if (!d.ATK[n]) continue;
      const h = measure(id, n, 'STAND'), b = measure(id, n, h.a.lv === 'low' ? 'LOW BLOCK' : h.a.lv === 'high' ? 'BLOCK' : 'BLOCK'),
        bad = measure(id, n, h.a.lv === 'low' ? 'BLOCK' : h.a.lv === 'high' ? 'LOW BLOCK' : 'LOW BLOCK');
      out.push({ id, n, s: h.a.s, a: h.a.a, r: h.a.r, dmg: h.a.dmg, lv: h.a.lv, hit: h.res ? h.adv : 'whiff', blk: b.res === 'block' ? b.adv : b.res || 'whiff', wrong: bad.res });
    }
    return out;
  }, only);
  const pad = (s, n) => String(s).padEnd(n);
  console.log(pad('fighter', 10) + pad('move', 6) + pad('start', 6) + pad('act', 5) + pad('rec', 5) + pad('dmg', 5) + pad('height', 7) + pad('on hit', 8) + pad('on block', 9) + 'blocked the wrong way');
  for (const r of rows) console.log(pad(r.id, 10) + pad(r.n, 6) + pad(r.s, 6) + pad(r.a, 5) + pad(r.r, 5) + pad(r.dmg, 5) + pad(r.lv, 7) + pad(typeof r.hit === 'number' && r.hit > 0 ? '+' + r.hit : r.hit, 8) + pad(typeof r.blk === 'number' && r.blk > 0 ? '+' + r.blk : r.blk, 9) + (r.wrong === 'block' ? 'blocked' : r.wrong || 'whiff'));
  console.log('errors:', errs.length ? errs : 'none'); await br.close();
})();
