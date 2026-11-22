// Film every fighter's super from the real game: node super_gif.js OUTDIR  (PNG frames; itch_page.py --gif turns them into a GIF)
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const CAST = [['karl', 'keksan'], ['estrella', 'reyes'], ['mateo', 'kai'], ['reyes', 'zeke'], ['kai', 'hecky'], ['lawslie', 'vizor']];
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true }); for (const f of fs.readdirSync(out)) fs.unlinkSync(path.join(out, f));
  const br = await chromium.launch(); const p = await br.newPage();
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  let n = 0;
  for (const [a, b] of CAST) {
    const frames = await p.evaluate(async ([a, b]) => {
      const d = window.__dbg, shots = [];
      for (const b of d.BADGE_KEYS || []) d.rec.badges[b] = 1; window.__saved = JSON.stringify(d.rec.badges); d.RUN = { mode: 'training', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: a });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.cinema = true; F.dummy = 'STAND'; F.time = 42; F.p1.x = 92; F.p2.x = 150; F.p2.cpu = false; F.p1.meter = 100; F.p2.meter = 35; F.p2.hp = 70; F.p2.trail = 70; F.p2.x = {vizor: 210, zeke: 200, padre: 190, lawslie: 165, rex: 200, kai: 170}[a] || F.p2.x;
      d.startSpecial(F.p1, F.p2, 3); let fc = 0;
      for (let i = 0; i < 150; i++) { d.tick(); upd(); d.scene.t++;
        if (fc++ % 4 === 0) { await new Promise(r => requestAnimationFrame(r)); shots.push(document.getElementById('screen').toDataURL()); }
        if (i > 60 && F.p1.state !== 'special' && i > 120) break; }
      return shots;
    }, [a, b]);
    for (const s of frames) fs.writeFileSync(path.join(out, String(n++).padStart(4, '0') + '.png'), Buffer.from(s.split(',')[1], 'base64'));
  }
  console.log(n, 'frames'); await br.close();
})();
