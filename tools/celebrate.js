// Contact sheet of the victory celebration: match-winning KO, result screen and ending.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2];
  const br = await chromium.launch();
  const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const shots = []; const g = async () => shots.push(await p.evaluate(() => document.getElementById('screen').toDataURL()));
  await p.evaluate(() => { const d = window.__dbg; d.RUN = { mode: 'vs', p1: 'vizor', ladder: ['ivan'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: 'vizor', p2: 'ivan', stage: 'vizor' });
    const F = d.F; F.phase = 'play'; F.wins = [1, 0]; F.p1.x = 110; F.p2.x = 150; F.p2.hp = 3; F.p2.state = 'idle';
    d.applyHit(F.p1, F.p2, { dmg: 20, stun: 20, bs: 10, kb: 3, lv: 'mid', knock: true, heavy: true }, 140, 100); });
  for (let i = 0; i < 8; i++) { await p.waitForTimeout(450); await g(); }
  await p.evaluate(() => { const d = window.__dbg; d.go(d.Result, 0, { p1: 'vizor', p2: 'ivan', stage: 'vizor' }); });
  await p.waitForTimeout(1500); await g(); await p.waitForTimeout(1200); await g();
  await p.evaluate(() => { const d = window.__dbg; d.RUN = { mode: 'arcade', p1: 'diego', ladder: [], idx: 0, cont: 0 }; d.go(d.Ending); });
  await p.waitForTimeout(2500); await g(); await p.waitForTimeout(1500); await g();
  await p.setContent('<canvas id=c></canvas>');
  await p.evaluate(async (shots) => { const c = document.getElementById('c'); c.width = 256 * 4; c.height = 192 * Math.ceil(shots.length / 4); const x = c.getContext('2d');
    for (let i = 0; i < shots.length; i++) { const im = new Image(); im.src = shots[i]; await im.decode(); x.drawImage(im, (i % 4) * 256, Math.floor(i / 4) * 192); } }, shots);
  await p.locator('#c').screenshot({ path: out });
  console.log(out, 'errors:', errs.length ? errs : 'none'); await br.close();
})();
