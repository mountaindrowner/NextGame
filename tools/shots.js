// itch.io screenshots straight from the game canvas, 3x nearest-neighbour: node shots.js OUTDIR
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = path.resolve(process.argv[2] || path.join(__dirname, '../release/itch'));
  const br = await chromium.launch();
  const p = await br.newPage({ viewport: { width: 460, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const grab = async (name) => {
    const url = await p.evaluate(() => { const s = document.getElementById('screen'), c = document.createElement('canvas'); c.width = 768; c.height = 576;
      const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(s, 0, 0, 768, 576); return c.toDataURL('image/png'); });
    require('fs').writeFileSync(path.join(out, name), Buffer.from(url.split(',')[1], 'base64')); console.log(name);
  };
  const run = (fn, arg) => p.evaluate(fn, arg);
  // 1 title menu
  await run(() => { const d = window.__dbg; d.go(d.Title); d.Title.ph = 'menu'; });
  await p.waitForTimeout(900); await grab('shot-1-title.png');
  // 2 character select
  await run(() => { const d = window.__dbg; d.go(d.Select, 'arcade'); d.Select.cur = 5; });
  await p.waitForTimeout(700); await grab('shot-2-select.png');
  // 3 versus screen
  await run(() => { const d = window.__dbg; d.RUN = { mode: 'arcade', p1: 'diego', ladder: ['akira'], idx: 0, cont: 0 }; d.go(d.VS); });
  await p.waitForTimeout(1600); await grab('shot-3-versus.png');
  // fight poses: freeze the scene and set both fighters by hand
  const pose = (cfg) => run((c) => new Promise(res => {
    const d = window.__dbg; d.RUN = { mode: 'vs', p1: c.a, ladder: [c.b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: c.a, p2: c.b, stage: c.stage || c.b });
    const F = d.F; F.phase = 'play'; F.pt = 200; F.time = c.time || 47; const sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
    const [f, g] = [F.p1, F.p2]; f.x = c.x1; g.x = c.x2; f.hp = c.hp1; g.hp = c.hp2; f.trail = f.hp; g.trail = g.hp; F.wins = c.wins || [0, 0];
    if (c.p1) { d.startAtk(f, c.p1); f.st = c.st1; }
    if (c.g) { g.state = c.g; g.st = c.gst || 4; g.stun = c.gstun || 9; }
    if (c.sp) { f.x = c.x1; d.startSpecial(f, g); F.superFlash = 0; for (let i = 0; i < c.sp; i++) upd(); }
    if (c.hitfx) { F.hitFx.push({ x: c.hitfx[0], y: c.hitfx[1], l: 5, big: true }); for (let i = 0; i < 10; i++) F.parts.push({ x: c.hitfx[0], y: c.hitfx[1], vx: 0, vy: 0, l: 9, c: i % 2 ? '#fff' : '#ffe66a', g: 0 }); F.parts.forEach((q, i) => { const a = i * 0.63; q.x += Math.cos(a) * 9; q.y += Math.sin(a) * 9; }); }
    F.hitstop = 0; F.shake = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => { res(); }));
  }), cfg);
  await pose({ a: 'karl', b: 'ivan', x1: 104, x2: 168, hp1: 72, hp2: 41, p1: 'kick', st1: 9, g: 'hurt', hitfx: [158, 90], wins: [1, 0] });
  await grab('shot-4-fight.png');
  await pose({ a: 'ivan', b: 'karl', x1: 110, x2: 150, hp1: 58, hp2: 33, g: 'hurt', gst: 20, gstun: 60, sp: 26, time: 21, stage: 'ivan' });
  await grab('shot-5-bear-slam.png');
  await pose({ a: 'diego', b: 'akira', x1: 100, x2: 150, hp1: 64, hp2: 52, sp: 16, time: 35, stage: 'diego' });
  await grab('shot-6-meia-lua.png');
  await pose({ a: 'vizor', b: 'diego', x1: 96, x2: 176, hp1: 77, hp2: 61, g: 'hurt', gst: 20, gstun: 60, sp: 9, time: 52, stage: 'vizor' });
  await grab('shot-7-shutter-flash.png');
  await pose({ a: 'padre', b: 'akira', x1: 104, x2: 150, hp1: 69, hp2: 48, g: 'crouch', gst: 4, sp: 27, time: 33, stage: 'padre' });
  await grab('shot-8-holy-tome.png');
  console.log('errors:', errs.length ? errs : 'none');
  await br.close();
})();
