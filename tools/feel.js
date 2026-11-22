// Hit feel, forgiving inputs and infinite protection: node feel.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = [], C = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
  const r = await p.evaluate(() => {
    const d = window.__dbg, R = {};
    const setup = (a, b, dummy = 'STAND') => { d.RUN = { mode: 'training', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = dummy; F.p1.x = 100; F.p2.x = 140; F.p1.face = 1; F.p2.face = -1;
      const step = (n = 1) => { for (let i = 0; i < n; i++) { d.tick(); upd(); } }; step(3); return { F, step }; };
    // hitstop by weight + hurt reaction by height
    const hit = (mv, dummy) => { const { F, step } = setup('karl', 'padre', dummy); d.startAtk(F.p1, mv); let hs = 0, k = null; for (let i = 0; i < 30; i++) { step(); if (F.hitstop > hs) { hs = F.hitstop; k = F.p2.hurtK; } } return { hs, k }; };
    R.jab = hit('jab'); R.kick = hit('kick'); R.sweep = hit('cjab'); R.cjab = hit('jab', 'CROUCH');
    { const { F, step } = setup('keksan', 'karl'); d.startSpecial(F.p1, F.p2, 1); let hs = 0; for (let i = 0; i < 60; i++) { step(); hs = Math.max(hs, F.hitstop); } R.heavy = hs; }
    // infinite protection: the same move landing a 4th time in one combo -> burst available
    { const { F, step } = setup('karl', 'padre'); const a = F.p2, def = F.p1; a.state = 'idle'; const B = [];
      for (let i = 0; i < 4; i++) { a.atk = { name: 'jab', id: 9000 + i }; a.state = 'attack'; d.applyHit(a, def, { dmg: 2, stun: 30, bs: 5, kb: 0, lv: 'mid' }, def.x, 100); B.push(!!def.burstOK); }
      R.ipsAt = B; R.def = def.state; }
    // tighter: a special landing a 3rd time in one combo is a loop
    { const { F } = setup('karl', 'padre'); const a = F.p2, def = F.p1; const B = [];
      for (let i = 0; i < 3; i++) { a.state = 'special'; a.sp = { kind: 'rush', id: 9100 + i, dim: 1 }; d.applyHit(a, def, { dmg: 2, stun: 30, bs: 5, kb: 0, lv: 'mid' }, def.x, 100); B.push(!!def.burstOK); }
      R.spLoop = B; }
    // stale pokes: the same normal landing on its own again and again does less each time
    { const { F, step } = setup('karl', 'padre'); const a = F.p1, def = F.p2; const D = [];
      for (let i = 0; i < 4; i++) { def.state = 'idle'; def.stun = 0; def.hp = def.mhp; a.state = 'attack'; a.atk = { name: 'kick', id: 9200 + i }; a.combo = 0;
        d.applyHit(a, def, { dmg: 8, stun: 20, bs: 5, kb: 0, lv: 'mid' }, def.x, 100); D.push(+(def.mhp - def.hp).toFixed(2)); step(30); }
      R.stale = D; }
    // repeated special: less damage and a longer cooldown each time
    { const { F, step } = setup('vizor', 'padre'); const f = F.p1; const C = [], M = [];
      for (let i = 0; i < 3; i++) { f.state = 'idle'; f.spCD = 0; d.startSpecial(f, F.p2, 1); C.push(f.spCD); M.push(f.sp.dim); step(60); }
      R.spCD = C; R.spDim = M; }
    return R;
  });
  C('HITSTOP grows with damage', r.jab.hs < r.kick.hs && r.kick.hs <= r.heavy, `jab ${r.jab.hs}, kick ${r.kick.hs}, iron charge ${r.heavy} frames`);
  C('HURT reactions by hit height', r.jab.k === 'high' && r.kick.k === 'mid' && r.sweep.k === 'low' && r.cjab.k === 'crouch', `jab ${r.jab.k}, kick ${r.kick.k}, low jab ${r.sweep.k}, vs crouching ${r.cjab.k}`);
  C('special LOOP on 3rd repeat', r.spLoop.join() === 'false,false,true', `burst after special hits 1-3: ${r.spLoop.join(', ')}`);
  C('STALE pokes lose damage', r.stale[1] < r.stale[0] && r.stale[2] < r.stale[1] && r.stale[3] >= r.stale[0] * .59, `same kick on its own: ${r.stale.join(' > ')}`);
  C('repeated special: dim + longer cooldown', r.spDim[2] < r.spDim[1] && r.spDim[1] < 1 && r.spCD[2] > r.spCD[1] && r.spCD[1] > r.spCD[0], `damage x${r.spDim.join(', x')}, cooldown ${r.spCD.join(' > ')}`);
  C('LOOP detected on 4th repeat', r.ipsAt.join() === 'false,false,false,true', `burst available after hits 1-4: ${r.ipsAt.join(', ')}`);
  // burst with a real key press, then SP key = A+B, through the real game loop
  const live = async (fn) => p.evaluate(fn);
  await live(() => { const d = window.__dbg; if (d.Fight.__u) d.Fight.update = d.Fight.__u; d.RUN = { mode: 'training', p1: 'karl', ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: 'karl', p2: 'padre', stage: 'padre' }); });
  await p.waitForTimeout(2600);
  await live(() => { const d = window.__dbg, F = d.F; F.p1.x = 100; F.p2.x = 140; const a = F.p2, def = F.p1;
    for (let i = 0; i < 4; i++) { a.atk = { name: 'jab', id: 9100 + i }; a.state = 'attack'; d.applyHit(a, def, { dmg: 1, stun: 60, bs: 5, kb: 0, lv: 'mid' }, def.x, 100); } a.atk = null; a.state = 'idle'; });
  await p.keyboard.press('x'); await p.waitForTimeout(250);
  const b = await live(() => { const F = window.__dbg.F; return { p1: F.p1.state, inv: F.p1.inv, p2: F.p2.state, txt: F.texts.map(t => t.s) }; });
  C('BURST escapes the loop', b.p1 !== 'hurt' && b.txt.includes('BURST!'), `after pressing A: me ${b.p1} (inv ${b.inv}), attacker ${b.p2}`);
  await p.waitForTimeout(800);
  await live(() => { const d = window.__dbg, F = d.F; F.p1.spCD = 0; F.p1.x = 100; F.p2.x = 160; F.p1.state = 'idle'; });
  await p.keyboard.press('c'); await p.waitForTimeout(200);
  const s = await live(() => { const F = window.__dbg.F; return { st: F.p1.state, k: F.p1.sp && F.p1.sp.kind }; });
  C('SP key = special in one press', s.st === 'special' && s.k === 'rush', `pressed C: ${s.st} ${s.k || ''}`);
  await live(() => window.__dbg.showBox(true)); await p.waitForTimeout(300); await live(() => window.__dbg.showBox(false));
  console.log(out.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(out.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
