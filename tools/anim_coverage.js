// Every fighter and costume: every special (SP, DN+SP, BK+SP) and the super is drawn from animation frames,
// never the stick-figure fallback.  node tools/anim_coverage.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const bad = await p.evaluate(() => {
    const d = window.__dbg, out = []; d.SET.sound = false;
    for (const id of [...d.ORDER, 'vex']) { const c = d.CH[id]; for (const sk of [false].concat(c.skin2 && d.CH[c.skin2] ? [true] : [])) {
      for (const [w, lab] of [[1, 'SP'], [2, 'DN+SP'], [4, 'BK+SP'], [3, 'SUPER']]) {
        d.RUN = { mode: 'training', p1: id, ladder: ['padre'], idx: 0, cont: 0, skin: [sk, false] }; d.go(d.Fight, { p1: id, p2: 'padre', stage: id }); const F = d.F;
        const sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = 'STAND'; F.p1.x = 110; F.p2.x = 150;
        const step = n => { for (let i = 0; i < n; i++) { d.tick(); upd() } }; step(2); if (w === 3) F.p1.meter = 100; d.startSpecial(F.p1, F.p2, w); let nul = 0;
        for (let i = 0; i < 160 && (F.p1.state === 'special' || F.p1.state === 'slamming'); i++) { step(1); if (F.cine) continue; if (!d.pose(F.p1)) nul++ }
        if (nul) out.push(`${id}${sk ? '/' + c.skin2 : ''} ${lab}: ${nul} frames without animation`) } } }
    return out });
  console.log(bad.length ? bad.map(x => 'FAIL ' + x).join('\n') : 'OK   every fighter and costume animates every special and super');
  console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none'); await br.close();
})();
