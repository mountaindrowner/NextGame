// Two browsers play an online match through the live matchmaking server: node online.js [SHOTDIR]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const shotDir = process.argv[2]; if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
  const px = process.env.HTTPS_PROXY || process.env.https_proxy;
  const br = await chromium.launch({ args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--autoplay-policy=no-user-gesture-required'], ...(px ? { proxy: { server: px } } : {}) });
  const mk = async () => { const ctx = await br.newContext({ ignoreHTTPSErrors: true, viewport: { width: 460, height: 860 } }); const p = await ctx.newPage(); p.errs = [];
    p.on('pageerror', e => p.errs.push(e.message)); await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
    await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 }); return p; };
  const A = await mk(), B = await mk();
  const st = p => p.evaluate(() => { const d = window.__dbg, N = d.NET; return { status: N.status, code: N.code, err: N.err, lock: N.lock, sim: N.sim, desyncs: N.desyncs, rtt: N.rtt, scene: d.scene === d.Fight ? 'fight' : d.scene === d.OnlineSelect ? 'select' : '?', hp: d.F && d.F.p1 ? [Math.round(d.F.p1.hp), Math.round(d.F.p2.hp)] : null }; });
  await A.evaluate(() => { const d = window.__dbg; d.go(d.Online); d.Online.ph = 'host'; d.netHost(); });
  let code = ''; for (let i = 0; i < 40 && !code; i++) { await A.waitForTimeout(500); code = (await st(A)).code; }
  console.log('room code:', code);
  await B.evaluate(c => { const d = window.__dbg; d.go(d.Online); d.Online.ph = 'wait'; d.netJoin(c); }, code);
  for (let i = 0; i < 60; i++) { await A.waitForTimeout(500); const a = await st(A), b = await st(B); if (a.scene === 'select' && b.scene === 'select') break; if (b.status === 'error' || a.status === 'error') { console.log('ERR', a, b); break; } }
  console.log('connected:', JSON.stringify(await st(A)), JSON.stringify(await st(B)));
  if (shotDir) await A.locator('#screen').screenshot({ path: path.join(shotDir, 'online-select.png') });
  // host picks Ivan, guest picks Lawslie
  await A.keyboard.press('ArrowRight'); await A.keyboard.press('KeyX'); await B.waitForTimeout(300);
  for (let i = 0; i < 6; i++) { await B.keyboard.press('ArrowRight'); await B.waitForTimeout(60); } await B.keyboard.press('KeyX');
  for (let i = 0; i < 40; i++) { await A.waitForTimeout(500); if ((await st(A)).scene === 'fight' && (await st(B)).scene === 'fight') break; }
  await A.waitForTimeout(2500);
  // both players mash for ~15 s
  const keys = ['KeyD', 'KeyA', 'KeyX', 'KeyZ', 'KeyX', 'KeyS', 'KeyW', 'KeyZ'];
  const mash = async (p, n) => { for (let i = 0; i < n; i++) { const k = keys[(Math.random() * keys.length) | 0]; await p.keyboard.down(k); await p.waitForTimeout(40 + Math.random() * 90); await p.keyboard.up(k); } };
  await Promise.all([mash(A, 120), mash(B, 120)]);
  if (shotDir) { await A.locator('#screen').screenshot({ path: path.join(shotDir, 'online-host.png') }); await B.locator('#screen').screenshot({ path: path.join(shotDir, 'online-guest.png') }); }
  // compare the two simulations at the same frame: pause both on a common frame by reading their logs
  const a = await st(A), b = await st(B);
  console.log('host :', JSON.stringify(a)); console.log('guest:', JSON.stringify(b));
  const same = await Promise.all([A, B].map(p => p.evaluate(() => { const N = window.__dbg.NET; return N.sim; })));
  console.log('sim frames', same, 'desyncs host/guest', a.desyncs, b.desyncs, 'errors', A.errs, B.errs);
  const picks = await A.evaluate(() => [window.__dbg.F.p1.c.id, window.__dbg.F.p2.c.id]); console.log('fighters', picks);
  await B.context().close(); let lost = ''; for (let i = 0; i < 20 && !lost; i++) { await A.waitForTimeout(500); lost = await A.evaluate(() => { const d = window.__dbg; return d.scene === d.Online ? d.Online.msg : ''; }); }
  console.log('host after guest left:', lost || '(still waiting)');
  const ok = lost === 'OPPONENT DISCONNECTED' && picks[0] === 'keksan' && picks[1] === 'lawslie' && a.scene !== '?' && a.sim > 300 && b.sim > 300 && a.desyncs === 0 && b.desyncs === 0 && !A.errs.length && !B.errs.length;
  console.log(ok ? 'ONLINE OK' : 'ONLINE FAIL'); await br.close(); process.exit(ok ? 0 : 1);
})();
