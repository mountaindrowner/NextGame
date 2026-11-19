// Headless smoke test: boot, jump straight into a fight, simulate input, screenshot.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || 'shot';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 460, height: 860 } });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const shots = [];
  for (const [p1, p2] of [['karl', 'ivan'], ['akira', 'diego']]) {
    await p.evaluate(([a, c]) => { const d = window.__dbg; d.RUN = { mode: 'vs', p1: a, ladder: [c], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: c, stage: c }); }, [p1, p2]);
    await p.waitForTimeout(2200);
    const seq = ['KeyD', 'KeyD', 'KeyX', 'KeyZ', 'KeyS', 'KeyZ', 'KeyW', 'KeyX'];
    for (const k of seq) { await p.keyboard.down(k); await p.waitForTimeout(120); await p.keyboard.up(k); await p.waitForTimeout(80); }
    await p.evaluate(() => { const d = window.__dbg; d.startSpecial(d.F.p1, d.F.p2); });
    for (let i = 0; i < 4; i++) {
      await p.waitForTimeout(250);
      const f = `${out}-${p1}-${i}.png`;
      await p.locator('#screen').screenshot({ path: f });
      shots.push(f);
    }
    const st = await p.evaluate(() => { const F = window.__dbg.F; return { hp: [F.p1.hp, F.p2.hp], phase: F.phase, s: [F.p1.state, F.p2.state] }; });
    console.log(p1, 'vs', p2, JSON.stringify(st));
  }
  console.log('errors:', errs.length ? errs : 'none');
  console.log(shots.join('\n'));
  await b.close();
})();
