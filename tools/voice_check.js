// Plays through title -> select -> VS -> fight -> special, super, KO -> result and lists which voice clips played.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
  const log = await p.evaluate(async () => {
    const d = window.__dbg, w = ms => new Promise(r => setTimeout(r, ms));
    d.go(d.Title); d.Title.ph = 'press'; d.inp.pressed.start = true; d.Title.update(); await w(400);
    d.go(d.Select, 'arcade'); d.Select.cur = 5; d.inp.pressed.a = true; d.Select.update(); d.inp.pressed.a = false; await w(400);
    d.RUN = { mode: 'arcade', p1: 'padre', ladder: ['ivan'], idx: 0, cont: 0 }; d.go(d.VS); await w(2600);
    d.go(d.Fight, { p1: 'padre', p2: 'ivan', stage: 'padre' }); await w(2500);
    const F = d.F; F.phase = 'play'; d.startSpecial(F.p1, F.p2, 1); await w(900); d.startSpecial(F.p1, F.p2, 2); await w(900);
    F.p1.meter = 100; F.p1.state = 'idle'; d.startSpecial(F.p1, F.p2, 3); await w(1200);
    d.startSpecial(F.p2, F.p1, 1); await w(900);
    F.p2.hp = 1; F.p1.state = 'idle'; F.p2.state = 'idle'; d.applyHit(F.p1, F.p2, { dmg: 20, stun: 10, kb: 2, lv: 'mid', knock: true }, 140, 100); await w(4500);
    d.go(d.Result, 1, { p1: 'padre', p2: 'ivan', stage: 'padre' }); await w(2500);
    return d.vox.log;
  });
  console.log(log.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
})();
