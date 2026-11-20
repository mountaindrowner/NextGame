// Checks that every fighter's special powers do their unique thing: node powers.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch();
  const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const res = await p.evaluate(() => {
    const d = window.__dbg, out = [];
    const setup = (a, b, x1 = 100, x2 = 140) => {
      d.RUN = { mode: 'training', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1; for (const f of [F.p1, F.p2]) f.hp = f.mhp = f.trail = 100;
      const { held, pressed } = d.inp; const K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'];
      const step = (n = 1, o = {}) => { for (let i = 0; i < n; i++) { for (const k of K) { pressed[k] = i === 0 && !!o[k]; held[k] = !!(o.h && o.h[k]); } d.tick(); upd(); } };
      return { F, step };
    };
    const check = (name, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${name.padEnd(30)} ${info}`);
    { // Légua Step goes through the opponent untouched
      const { F, step } = setup('karl', 'padre'); step(1, { a: 1, b: 1, h: { down: 1 } }); step(6); d.startAtk(F.p2, 'jab'); step(30);
      check('PAPA-LEGUAS  Légua Step', F.p1.x > F.p2.x && F.p1.hp === 100, `x ${F.p1.x | 0} vs ${F.p2.x | 0}, hp ${F.p1.hp | 0}`); }
    { // Instant Replay: rewinds position and recent damage
      const { F, step } = setup('vizor', 'padre', 100, 140); step(60); const x0 = F.p1.x;
      for (let i = 0; i < 3; i++) { d.applyHit(F.p2, F.p1, { dmg: 6, stun: 6, kb: 2, lv: 'mid' }, 120, 100); step(10); }
      F.p1.state = 'idle'; F.p1.stun = 0; step(2); const hp1 = F.p1.hp, x1 = F.p1.x; step(1, { a: 1, b: 1, h: { down: 1 } }); step(40);
      check('VIZOR        Instant Replay', F.p1.hp > hp1 && Math.abs(F.p1.x - x0) < Math.abs(x1 - x0), `hp ${hp1 | 0} -> ${F.p1.hp | 0}, x ${x1 | 0} -> ${F.p1.x | 0} (was ${x0 | 0})`); }
    { // Benediction heals over time
      const { F, step } = setup('padre', 'padre', 60, 200); F.p1.hp = 50; step(1, { a: 1, b: 1, h: { down: 1 } }); step(85);
      check('SAMSON       Benediction', F.p1.hp > 60, `hp 50 -> ${F.p1.hp | 0}`); }
    { // Holy Tome is an overhead: beats a crouching block, loses to a standing one
      let r = setup('padre', 'padre', 100, 140), F = r.F; F.dummy = 'LOW BLOCK'; r.step(3); d.startSpecial(F.p1, F.p2); r.step(34);
      const crouchHit = F.p2.hp < 100;
      r = setup('padre', 'padre', 100, 140); F = r.F; F.dummy = 'BLOCK'; r.step(3); d.startSpecial(F.p1, F.p2); r.step(34);
      const standBlocked = F.p2.hp > 95;
      check('SAMSON       Holy Tome (overhead)', crouchHit && standBlocked, `hits crouch-block: ${crouchHit}, blocked standing: ${standBlocked}`); }
    for (const [kind, which, lowOk, label] of [['strike', 1, true, 'ZEKE         Strike Ball (low)'], ['split', 2, false, 'ZEKE         Split Shot (overhead)']]) {
      // low: hits a standing block, blocked crouching. overhead: hits a crouching block, blocked standing.
      let r = setup('zeke', 'padre', 70, 170), F = r.F; F.dummy = 'BLOCK'; r.step(3); d.startSpecial(F.p1, F.p2, which); r.step(90); const vsStand = F.p2.hp;
      r = setup('zeke', 'padre', 70, 170); F = r.F; F.dummy = 'LOW BLOCK'; r.step(3); d.startSpecial(F.p1, F.p2, which); r.step(90); const vsLow = F.p2.hp;
      const ok = lowOk ? (vsStand < 95 && vsLow > 95) : (vsLow < 95 && vsStand > 95);
      check(label, ok, `vs standing block: samson hp ${vsStand | 0}, vs crouching block: ${vsLow | 0}`);
    }
    return out;
  });
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none');
  await br.close(); process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
