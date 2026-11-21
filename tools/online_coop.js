// Online co-op Story mode through the live matchmaking server: the host picks HOST CO-OP STORY in the Online menu,
// the guest joins with the code, both pick fighters, skip the prologue and fight through Stage 1 together.
// node tools/online_coop.js [SHOTDIR]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const shotDir = process.argv[2]; if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
  const px = process.env.HTTPS_PROXY || process.env.https_proxy;
  const br = await chromium.launch({ args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--autoplay-policy=no-user-gesture-required'], ...(px ? { proxy: { server: px } } : {}) });
  const mk = async () => { const ctx = await br.newContext({ ignoreHTTPSErrors: true, viewport: { width: 460, height: 860 } }); const p = await ctx.newPage(); p.errs = [];
    p.on('pageerror', e => p.errs.push(e.message)); await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
    await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
    await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.music = false; d.SET.voice = false; }); return p; };
  const A = await mk(), B = await mk();
  const st = p => p.evaluate(() => { const d = window.__dbg, N = d.NET, Bw = d.Brawl; return { status: N.status, code: N.code, mode: N.mode, lock: N.lock, sim: N.sim, desyncs: N.desyncs || 0, via: N.via,
    scene: d.scene === d.Brawl ? 'brawl' : d.scene === d.OnlineSelect ? 'select' : d.scene === d.Cutscene ? 'cut' : d.scene === d.Online ? 'online' : '?', ps: d.scene === d.Brawl ? Bw.ps.map(q => q.c.id) : [], score: d.RUN && d.RUN.score }; });
  // host: Online menu, third item (HOST CO-OP STORY)
  await A.evaluate(() => { const d = window.__dbg; d.go(d.Online); });
  await A.keyboard.press('ArrowDown'); await A.waitForTimeout(80); await A.keyboard.press('ArrowDown'); await A.waitForTimeout(80); await A.keyboard.press('KeyX');
  let code = ''; for (let i = 0; i < 40 && !code; i++) { await A.waitForTimeout(500); code = (await st(A)).code; }
  console.log('room code:', code, 'mode', (await st(A)).mode);
  await B.evaluate(c => { const d = window.__dbg; d.go(d.Online); d.Online.ph = 'wait'; d.netJoin(c); }, code);
  for (let i = 0; i < 60; i++) { await A.waitForTimeout(500); const a = await st(A), b = await st(B); if (a.scene === 'select' && b.scene === 'select' && b.mode === 'coop') break; }
  console.log('connected:', JSON.stringify(await st(A)), JSON.stringify(await st(B)));
  if (shotDir) await B.locator('#screen').screenshot({ path: path.join(shotDir, 'coop-select.png') });
  await A.keyboard.press('KeyX'); await B.waitForTimeout(300); for (let i = 0; i < 11; i++) { await B.keyboard.press('ArrowRight'); await B.waitForTimeout(60); } await B.keyboard.press('KeyX');
  for (let i = 0; i < 40; i++) { await A.waitForTimeout(400); const a = await st(A); if (a.scene === 'brawl') break; await A.keyboard.press('Enter'); }
  await A.waitForTimeout(1500);
  const keys = ['KeyD', 'KeyD', 'KeyD', 'KeyX', 'KeyX', 'KeyZ', 'KeyS', 'KeyW', 'KeyX', 'KeyA'];
  const mash = async (p, n, seed) => { let r = seed; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < n; i++) { const k = keys[(rnd() * keys.length) | 0]; await p.keyboard.down(k); await p.waitForTimeout(30 + rnd() * 80); await p.keyboard.up(k); } };
  await Promise.all([mash(A, 200, 5), mash(B, 200, 9)]);
  await A.waitForTimeout(800);
  const a = await st(A), b = await st(B);
  if (shotDir) { await A.locator('#screen').screenshot({ path: path.join(shotDir, 'coop-net-host.png') }); await B.locator('#screen').screenshot({ path: path.join(shotDir, 'coop-net-guest.png') }); }
  console.log('host :', JSON.stringify(a)); console.log('guest:', JSON.stringify(b));
  const ok = a.scene === 'brawl' && b.scene === 'brawl' && a.ps.length === 2 && b.ps.join() === a.ps.join() && a.desyncs === 0 && b.desyncs === 0 && a.sim > 600 && A.errs.length + B.errs.length === 0;
  console.log('errors', A.errs, B.errs); console.log(ok ? 'ONLINE CO-OP OK' : 'ONLINE CO-OP FAILED');
  await br.close();
})();
