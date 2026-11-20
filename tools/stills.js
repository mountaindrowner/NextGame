// Clean gameplay stills for page art: node stills.js OUTDIR
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  const br = await chromium.launch(); const p = await br.newPage();
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const shot = n => p.locator('#screen').screenshot({ path: path.join(out, n + '.png') });
  const setup = (a, b, mode, x1, x2, stage) => p.evaluate(([a, b, mode, x1, x2, stage]) => {
    const d = window.__dbg; for (const k of d.BADGE_KEYS) d.rec.badges[k] = 1; d.setTwo(mode === '2p');
    d.RUN = { mode, p1: a, ladder: [b], idx: 0, cont: 0, score: [0, 0] }; d.go(d.Fight, { p1: a, p2: b, stage: stage || b });
    const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update); window.__upd = orig.bind(sc); sc.update = () => {};
    F.phase = 'play'; F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1;
  }, [a, b, mode, x1, x2, stage]);
  const step = (n, o1 = {}, o2 = {}) => p.evaluate(([n, o1, o2]) => { const d = window.__dbg, { held, pressed } = d.inp, { held2, pressed2 } = d.inp2;
    for (let i = 0; i < n; i++) { for (const k of ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select']) { pressed[k] = i === 0 && !!o1[k]; held[k] = !!(o1.h && o1.h[k]); pressed2[k] = i === 0 && !!o2[k]; held2[k] = !!(o2.h && o2.h[k]); } d.tick(); window.__upd(); } }, [n, o1, o2]);
  const settle = () => p.waitForTimeout(150);
  // super cinematic
  await setup('padre', 'ivan', 'vs', 96, 150, 'padre'); await p.evaluate(() => { const F = window.__dbg.F; F.p2.cpu = false; F.p1.meter = 100; F.p2.meter = 40; F.time = 37; F.p2.hp = F.p2.trail = 64; F.p1.hp = F.p1.trail = 81; });
  await step(1, { a: 1, b: 1, h: { right: 1 } }); await step(18); await settle(); await shot('super');
  // throw, mid-air
  await setup('ivan', 'vizor', '2p', 110, 146, 'ivan'); await p.evaluate(() => { const F = window.__dbg.F; F.time = 52; F.p2.hp = F.p2.trail = 77; });
  await step(1, { b: 1, h: { left: 1 } }); await step(26); await settle(); await shot('throw');
  // 2 players
  await setup('vizor', 'lawslie', '2p', 100, 150, 'lawslie'); await p.evaluate(() => { const F = window.__dbg.F; F.time = 48; F.wins = [1, 0]; F.p1.hp = F.p1.trail = 58; F.p2.hp = F.p2.trail = 71; F.p1.meter = 60; F.p2.meter = 100; });
  await step(1, {}, { b: 1 }); await step(9); await settle(); await shot('two-players');
  // trials
  await setup('karl', 'ivan', 'trials', 100, 140, 'karl'); await step(1, { a: 1 }); await step(9); await step(1, { a: 1 }); await step(9); await step(1, { b: 1 }); await step(4); await settle(); await shot('trials');
  console.log('ok'); await br.close();
})();
