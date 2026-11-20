// Checks the v1.1 features: node features.js [SHOTDIR]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const shotDir = process.argv[2]; if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(() => { localStorage.removeItem('worlddojo_rec'); });
  const shot = async (n) => { if (shotDir) await p.locator('#screen').screenshot({ path: path.join(shotDir, n + '.png') }); };
  const out = [];
  const T = (name, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${name.padEnd(28)} ${info}`);
  // shared harness: a frozen fight we step by hand with explicit inputs for both players
  const setup = (a, b, mode, x1 = 100, x2 = 140) => p.evaluate(([a, b, mode, x1, x2]) => {
    const d = window.__dbg; d.setTwo(mode === '2p'); d.RUN = { mode, p1: a, ladder: [b], idx: 0, cont: 0, score: [0, 0] };
    d.go(d.Fight, { p1: a, p2: b, stage: b }); const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update);
    window.__upd = orig.bind(sc); sc.update = () => {}; F.phase = 'play'; F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1; for (const f of [F.p1, F.p2]) f.hp = f.mhp = f.trail = 100;
  }, [a, b, mode, x1, x2]);
  const step = (n, o1 = {}, o2 = {}) => p.evaluate(([n, o1, o2]) => {
    const d = window.__dbg, { held, pressed } = d.inp, { held2, pressed2 } = d.inp2, K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'];
    for (let i = 0; i < n; i++) { for (const k of K) { pressed[k] = i === 0 && !!o1[k]; held[k] = !!(o1.h && o1.h[k]); pressed2[k] = i === 0 && !!o2[k]; held2[k] = !!(o2.h && o2.h[k]); } d.tick(); window.__upd(); }
    const F = d.F; return { s1: F.p1.state, s2: F.p2.state, hp1: F.p1.hp, hp2: F.p2.hp, m1: F.p1.meter, x1: F.p1.x, x2: F.p2.x, cine: !!F.cine };
  }, [n, o1, o2]);

  // 1. SUPER: full meter, forward + A+B -> cinematic, then a big multi-hit
  await setup('karl', 'ivan', 'training', 100, 150);
  await p.evaluate(() => { const F = window.__dbg.F; F.p1.meter = 100; F.dummy = 'STAND'; });
  let r = await step(1, { a: 1, b: 1, h: { right: 1 } });
  const cine = r.cine; await step(20); await shot('super-cinematic');
  r = await step(120);
  T('SUPER', cine && r.hp2 < 85, `cinematic ${cine}, ivan hp ${r.hp2 | 0}, meter after ${r.m1 | 0} (refills in training)`);

  // 2. meter builds from hits
  await setup('vizor', 'ivan', 'vs', 100, 140);
  await p.evaluate(() => { const F = window.__dbg.F; F.p2.cpu = false; });
  await step(1, { a: 1 }); r = await step(20);
  T('METER GAIN', r.m1 > 0, `meter after one hit: ${r.m1}`);

  // 3. THROW: forward + B next to the opponent
  await setup('zeke', 'vizor', '2p', 100, 136);
  await step(1, { b: 1, h: { right: 1 } }); r = await step(60);
  T('THROW', r.hp2 < 100 && r.s1 !== 'throwing', `vizor hp ${r.hp2 | 0}`);

  // 4. THROW BREAK: player 2 presses A right after being grabbed
  await setup('zeke', 'vizor', '2p', 100, 136);
  await step(1, { b: 1, h: { right: 1 } }); await step(5); await step(1, {}, { a: 1 });
  let broke = false; for (let i = 0; i < 70; i++) { const q = await step(1); if (q.s2 === 'block') broke = true; } r = await step(1);
  // and without the break, the throw lands
  await setup('zeke', 'vizor', '2p', 100, 136); await step(1, { b: 1, h: { right: 1 } }); const nob = await step(80);
  T('THROW BREAK', broke && r.hp2 === 100 && nob.hp2 < 100, `broken: ${broke}, hp ${r.hp2 | 0} (unbroken throw: ${nob.hp2 | 0})`);

  // 5. player-2 input slots (what online play drives): player 2's inputs move and attack
  await setup('vizor', 'padre', '2p', 80, 180);
  r = await step(30, {}, { h: { left: 1 } }); const moved = r.x2 < 175;
  await p.evaluate(() => { const F = window.__dbg.F; F.p2.x = F.p1.x + 40; });
  await step(1, {}, { a: 1 }); r = await step(20);
  T('P2 INPUT SLOTS', moved && r.hp1 < 100, `p2 walked to x ${r.x2 | 0}, p1 hp ${r.hp1 | 0}`);
  await shot('two-players');

  // 6. TRIALS: Papa-Leguas trial 1 = JAB > KICK
  await setup('karl', 'ivan', 'trials', 100, 140);
  await step(1, { a: 1 }); for (let i = 0; i < 40; i++) { const q = await p.evaluate(() => { const F = window.__dbg.F; return F.p1.hitDone && F.hitstop === 0; }); if (q) break; await step(1); }
  await step(1, { b: 1 }); await step(30); await shot('trials');
  r = await p.evaluate(() => { const T = window.__dbg.F.trial; return { i: T.i, clear: T.clear, step: T.step }; });
  await step(100);
  const after = await p.evaluate(() => window.__dbg.F.trial.i);
  T('TRIALS', r.clear > 0 && after === 1, `trial 1 cleared: ${r.clear > 0}, now on trial ${after + 1}`);

  // 7. RECORDS + UNLOCK: clearing arcade unlocks the alt color and a badge
  r = await p.evaluate(() => { const d = window.__dbg; d.RUN = { mode: 'arcade', p1: 'ivan', ladder: [], idx: 0, cont: 0 }; d.go(d.Ending); return { clear: d.rec.ch.ivan.clear, badge: !!d.rec.badges.clear, stored: !!localStorage.getItem('worlddojo_rec') }; });
  T('RECORDS + UNLOCK', r.clear === 1 && r.badge && r.stored, JSON.stringify(r));
  await p.waitForTimeout(300); await shot('badge-toast');
  await p.evaluate(() => { const d = window.__dbg; d.go(d.Records); }); await p.waitForTimeout(300); await shot('records');
  await p.evaluate(() => { const d = window.__dbg; d.go(d.Select, 'arcade'); d.Select.cur = 2; }); await p.waitForTimeout(300); await shot('select-unlocked');
  await p.evaluate(() => { const d = window.__dbg; d.go(d.Title); d.Title.ph = 'menu'; }); await p.waitForTimeout(400); await shot('title');
  await p.evaluate(() => { const d = window.__dbg; d.RUN = { mode: '2p', p1: 'karl', ladder: ['ivan'], idx: 0, cont: 0, score: [1, 0] }; d.go(d.Result, 1, { p1: 'karl', p2: 'ivan', stage: 'ivan' }); }); await p.waitForTimeout(1200); await shot('rematch');
  await p.evaluate(() => { localStorage.removeItem('worlddojo_rec'); });
  console.log(out.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(out.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
