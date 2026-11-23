// The third specials (BK+SP) added in 1.56: each one does its job.  node tools/sp3.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = await p.evaluate(() => {
    const d = window.__dbg, res = []; d.SET.sound = false; d.SET.music = false; d.SET.voice = false;
    const C = (n, ok, info) => res.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
    const setup = (a, b, x1 = 100, x2 = 140) => { d.RUN = { mode: 'training', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: a });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = 'STAND';
      F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1; F.p2.cpu = false; F.p1.cpu = false; const step = n => { for (let i = 0; i < n; i++) { d.tick(); upd() } }; step(2); return { F, step } };
    const jumper = (F) => { const o = F.p2; o.state = 'jump'; o.y = 40; o.vy = 0; o.vx = 0 };
    // anti-airs: Sky Légua, Ball Return, Headbanger, Block Party hit a jumping opponent
    for (const [id, nm] of [['karl', 'SKY LÉGUA'], ['zeke', 'BALL RETURN'], ['rex', 'HEADBANGER'], ['kai', 'BLOCK PARTY']]) {
      const { F, step } = setup(id, 'padre'); jumper(F); const h0 = F.p2.hp; d.startSpecial(F.p1, F.p2, 4); let st = null;
      for (let i = 0; i < 40; i++) { if (F.p2.state === 'jump') { F.p2.y = Math.max(F.p2.y, 30); F.p2.vy = 0 } step(1); if (['knock', 'hurt'].includes(F.p2.state)) st = st || F.p2.state }
      C(nm + ' (anti-air)', F.p2.hp < h0 && F.p1.c.sp3Name === nm, `damage ${(h0 - F.p2.hp).toFixed(1)}, opponent ${st}`) }
    // Amen Slam: a grab that goes through blocking
    { const { F, step } = setup('padre', 'karl', 100, 132); F.p2.holdBack = true; F.p2.state = 'block'; F.p2.stun = 0; F.p2.state = 'idle'; const h0 = F.p2.hp; d.startSpecial(F.p1, F.p2, 4);
      let grabbed = false; for (let i = 0; i < 70; i++) { step(1); if (F.p2.state === 'grabbed') grabbed = true }
      C('AMEN SLAM (grab vs block)', grabbed && F.p2.hp < h0 - 8, `grabbed ${grabbed}, damage ${(h0 - F.p2.hp).toFixed(1)}`) }
    // Baton Sweep: long and low (hits 80 px away; a standing block doesn't stop it)
    { const { F, step } = setup('lawslie', 'karl', 100, 178); F.p2.holdBack = true; const h0 = F.p2.hp; d.startSpecial(F.p1, F.p2, 4); let st = null;
      for (let i = 0; i < 30; i++) { step(1); st = st || (['knock', 'block'].includes(F.p2.state) ? F.p2.state : null) }
      C('BATON SWEEP (long, low)', F.p2.hp < h0 && st === 'knock', `78 px away: damage ${(h0 - F.p2.hp).toFixed(1)}, ${st}`) }
    // Tripod Trap: set, then the opponent walks into it and gets stunned
    { const { F, step } = setup('vizor', 'karl', 80, 200); d.startSpecial(F.p1, F.p2, 4); step(36); const tp = F.proj.find(q => q.kind === 'tripod');
      let stunned = false; if (tp) { F.p2.x = tp.x + 60; for (let i = 0; i < 60; i++) { F.p2.x -= 1.5; step(1); if (F.p2.state === 'hurt') stunned = true } }
      C('TRIPOD TRAP (flash stun)', !!tp && stunned, `tripod ${!!tp}, stunned ${stunned}`) }
    // every fighter on the roster now has three specials
    const miss = d.ORDER.filter(id => !d.CH[id].special3); C('every fighter has BK+SP', !miss.length, miss.length ? 'missing: ' + miss : d.ORDER.length + ' fighters');
    return res });
  console.log(out.join('\n')); console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none'); await br.close();
})();
