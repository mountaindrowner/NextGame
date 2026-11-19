// Render a grid of fighter poses for visual checking: node poses.js OUT.png p1 p2
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [out, a = 'karl', b = 'karl'] = process.argv.slice(2);
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 460, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(([a, b]) => { const d = window.__dbg; d.RUN = { mode: 'vs', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b }); d.F.phase = 'play'; d.F.pt = 200; }, [a, b]);
  const states = [
    ['idle', {}], ['walk', { vx: 1.3 }], ['crouch', { st: 20, crouch: true }], ['attack', { atk: 'jab', st: 5 }], ['attack', { atk: 'kick', st: 9 }], ['attack', { atk: 'sweep', st: 10 }],
    ['attack', { atk: 'cjab', st: 5 }], ['jump', { y: 40, vy: 0.5 }], ['jump', { y: 40, vy: 0.5, atk: 'jkick', ast: 6 }], ['hurt', { st: 8 }], ['block', { st: 6 }], ['knock', { y: 20, st: 10 }],
    ['down', { st: 30 }], ['win', { st: 40 }], ['special', { st: 14 }], ['special', { st: 24 }],
  ];
  const shots = [];
  for (const [st, o] of states) {
    const shot = await p.evaluate(([st, o]) => {
      const d = window.__dbg, F = d.F, f = F.p1, g = F.p2;
      F.hitstop = 0; F.superFlash = 0; F.slow = 0; F.shake = 0; F.parts = []; F.texts = []; F.hitFx = []; F.proj = []; F.paused = false;
      f.x = 100; g.x = 170; g.y = 0; g.state = 'idle'; f.face = 1; g.face = -1; f.y = o.y || 0; f.vy = o.vy || 0; f.vx = o.vx || 0; f.crouch = !!o.crouch; f.flash = 0; f.inv = 0;
      f.state = st; f.st = o.st || 0; f.atk = null; f.sp = null; f.ghosts = [];
      if (o.atk) { d.startAtk(f, o.atk); f.state = st; f.st = o.st || 0; f.ast = o.ast || 0; }
      if (st === 'special') f.sp = { kind: f.c.special, hits: 0, last: -99, id: 1 };
      const sc = d.scene; const save = sc.update; sc.update = () => {}; // freeze
      return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => { sc.update = save; r(document.getElementById('screen').toDataURL()); })));
    }, [st, o]);
    shots.push(shot);
  }
  // stitch into a grid
  await p.setContent('<canvas id=c></canvas>');
  await p.evaluate(async (shots) => {
    const c = document.getElementById('c'); c.width = 256 * 4; c.height = 192 * Math.ceil(shots.length / 4); const x = c.getContext('2d');
    for (let i = 0; i < shots.length; i++) { const im = new Image(); im.src = shots[i]; await im.decode(); x.drawImage(im, (i % 4) * 256, Math.floor(i / 4) * 192); }
  }, shots);
  await p.locator('#c').screenshot({ path: out });
  console.log(out, 'errors:', errs.length ? errs : 'none');
  await br.close();
})();
