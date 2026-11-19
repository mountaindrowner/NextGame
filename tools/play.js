// Mash random inputs through a fight and collect a contact sheet: node play.js OUT.png p1 p2 [seconds]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [out, a = 'karl', b = 'ivan', secs = '12'] = process.argv.slice(2);
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 460, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(([a, b]) => { const d = window.__dbg; d.RUN = { mode: 'vs', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b }); }, [a, b]);
  await p.waitForTimeout(1900);
  const keys = ['KeyD', 'KeyD', 'KeyA', 'KeyX', 'KeyZ', 'KeyX', 'KeyZ', 'KeyW', 'KeyS'];
  const shots = []; const t0 = Date.now(); let n = 0;
  while (Date.now() - t0 < +secs * 1000) {
    const k = keys[Math.floor(Math.random() * keys.length)], k2 = Math.random() < .3 ? 'KeyS' : null;
    if (k2) await p.keyboard.down(k2);
    await p.keyboard.down(k); await p.waitForTimeout(60 + Math.random() * 120); await p.keyboard.up(k); if (k2) await p.keyboard.up(k2);
    if (Math.random() < .08) await p.evaluate(() => { const d = window.__dbg; if (d.F && d.F.phase === 'play' && d.F.p1.state === 'idle') d.startSpecial(d.F.p1, d.F.p2); });
    if (++n % 4 === 0 && shots.length < 24) shots.push(await p.evaluate(() => document.getElementById('screen').toDataURL()));
  }
  const st = await p.evaluate(() => { const d = window.__dbg, F = d.F; return { scene: Object.keys(d).length && (d.scene === d.Fight ? 'fight' : 'other'), round: F.round, wins: F.wins, hp: [F.p1.hp | 0, F.p2.hp | 0], s: [F.p1.state, F.p2.state] }; });
  await p.setContent('<canvas id=c></canvas>');
  await p.evaluate(async (shots) => { const c = document.getElementById('c'); c.width = 256 * 4; c.height = 192 * Math.ceil(shots.length / 4); const x = c.getContext('2d');
    for (let i = 0; i < shots.length; i++) { const im = new Image(); im.src = shots[i]; await im.decode(); x.drawImage(im, (i % 4) * 256, Math.floor(i / 4) * 192); } }, shots);
  await p.locator('#c').screenshot({ path: out });
  console.log(a, 'vs', b, JSON.stringify(st), 'errors:', errs.length ? errs : 'none');
  await br.close();
})();
