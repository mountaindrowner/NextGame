// Film one fighter's special move against a close opponent: node special.js OUT.png p1 p2
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [out, a = 'ivan', b = 'karl', which = '1'] = process.argv.slice(2);
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 460, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(([a, b]) => { const d = window.__dbg; d.RUN = { mode: 'vs', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b }); }, [a, b]);
  await p.waitForTimeout(1900);
  // freeze the CPU and step the game manually so every frame is captured
  const shots = await p.evaluate(async (W) => {
    const d = window.__dbg, F = d.F; F.phase = 'play'; F.p1.x = 110; F.p2.x = 150; F.p2.cpu = true;
    const sc = d.scene, upd = sc.update.bind(sc); sc.update = () => {};
    d.startSpecial(F.p1, F.p2, W); const out = [];
    for (let i = 0; i < 64; i++) { upd(); if (i % 3 === 0) { await new Promise(r => requestAnimationFrame(r)); out.push(document.getElementById('screen').toDataURL()); } }
    sc.update = upd; return out;
  }, +which);
  await p.setContent('<canvas id=c></canvas>');
  await p.evaluate(async (shots) => { const c = document.getElementById('c'); c.width = 256 * 4; c.height = 192 * Math.ceil(shots.length / 4); const x = c.getContext('2d');
    for (let i = 0; i < shots.length; i++) { const im = new Image(); im.src = shots[i]; await im.decode(); x.drawImage(im, (i % 4) * 256, Math.floor(i / 4) * 192); } }, shots);
  await p.locator('#c').screenshot({ path: out });
  console.log(out, 'errors:', errs.length ? errs : 'none');
  await br.close();
})();
