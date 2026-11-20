// Online lobby: two browsers join the lobby, see each other, one challenges, the other accepts, and they fight.
// node lobby.js [SHOTDIR]            against the live server
// NET=http://127.0.0.1:8787 node lobby.js   against a local `wrangler dev` copy of server/worker.js
// RELAY=1 ...                        forbid direct links, so the whole match runs through the server relay
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const shotDir = process.argv[2]; if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
  const local = process.env.NET, relay = !!process.env.RELAY, px = process.env.HTTPS_PROXY || process.env.https_proxy;
  const br = await chromium.launch({ args: ['--disable-features=WebRtcHideLocalIpsWithMdns', '--autoplay-policy=no-user-gesture-required'], ...(px && !local ? { proxy: { server: px } } : {}) });
  const q = [local ? 'net=' + encodeURIComponent(local) : '', relay ? 'relay=1' : ''].filter(Boolean).join('&');
  const mk = async () => { const ctx = await br.newContext({ ignoreHTTPSErrors: true, viewport: { width: 460, height: 860 } }); const p = await ctx.newPage(); p.errs = [];
    p.on('pageerror', e => p.errs.push(e.message)); await p.goto('file://' + path.resolve(__dirname, '../dist/index.html') + (q ? '?' + q : ''));
    await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
    await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.music = false; d.SET.voice = false; }); return p; };
  const A = await mk(), B = await mk();
  const out = [], C = (n, ok, info) => { out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(28)} ${info}`); };
  const st = p => p.evaluate(() => { const d = window.__dbg, N = d.NET, L = d.LOB;
    return { scene: d.scene === d.Fight ? 'fight' : d.scene === d.OnlineSelect ? 'select' : d.scene === d.Online ? 'online:' + d.Online.ph : d.scene === d.VS ? 'vs' : '?',
      lob: L.id ? 'in' : 'out', name: L.name, players: L.players.map(p => p.name + (p.busy ? '*' : '')), inc: L.inc && L.inc.name, out: L.out && L.out.name, vs: L.vs && L.vs.name,
      status: N.status, via: N.via, vsName: N.vsName, sim: N.sim, desyncs: N.desyncs, rtt: N.rtt, err: N.err, note: L.noteT > 0 ? L.note : '' }; });
  const until = async (fn, ms = 20000) => { for (let t = 0; t < ms; t += 250) { if (await fn()) return true; await A.waitForTimeout(250); } return false; };
  const shot = async (p, n) => { if (shotDir) await p.locator('#screen').screenshot({ path: path.join(shotDir, n + '.png') }); };
  // both open ONLINE > LOBBY
  for (const p of [A, B]) await p.evaluate(() => { const d = window.__dbg; d.go(d.Online); });
  await A.keyboard.press('KeyX'); await A.waitForTimeout(800); await B.keyboard.press('KeyX');
  let ok = await until(async () => { const a = await st(A), b = await st(B); return a.players.includes(b.name) && b.players.includes(a.name); });
  let a = await st(A), b = await st(B);
  C('both in the lobby', ok, `A "${a.name}" sees [${a.players}], B "${b.name}" sees [${b.players}]`); await shot(A, 'lobby-list');
  // A: rename once (first row), then move to B and challenge
  const before = a.name; await A.keyboard.press('KeyX'); await A.waitForTimeout(7000); a = await st(A); const bSees = (await st(B)).players;
  C('new name', a.name !== before && bSees.includes(a.name), `${before} -> ${a.name}, B sees [${bSees}]`);
  const row = (await A.evaluate(n => window.__dbg.LOB.players.findIndex(p => p.name === n), b.name)) + 1;
  for (let i = 0; i < row; i++) { await A.keyboard.press('ArrowDown'); await A.waitForTimeout(80); }
  await A.keyboard.press('KeyX');
  ok = await until(async () => !!(await st(B)).inc, 8000); b = await st(B); a = await st(A);
  C('challenge arrives', ok && b.inc === a.name && a.out === b.name, `B sees "${b.inc}" challenging, A waiting on "${a.out}"`); await shot(B, 'lobby-challenged'); await shot(A, 'lobby-challenging');
  await B.keyboard.press('KeyX');
  ok = await until(async () => (await st(A)).scene === 'select' && (await st(B)).scene === 'select', 40000); a = await st(A); b = await st(B);
  C('accepted: both connected', ok, `A ${a.scene} via ${a.via} vs ${a.vsName}; B ${b.scene} via ${b.via} vs ${b.vsName}`);
  C(relay ? 'link: server relay' : 'link: direct', ok && a.via === (relay ? 'relay' : 'direct') && b.via === a.via, `${a.via} / ${b.via}`);
  C('left the lobby list', a.lob === 'out' && b.lob === 'out', `${a.lob} / ${b.lob}`);
  await A.waitForTimeout(600); await shot(A, 'lobby-select');
  // pick and fight for ~12 s
  await A.keyboard.press('ArrowRight'); await A.keyboard.press('KeyX'); await B.waitForTimeout(300);
  for (let i = 0; i < 6; i++) { await B.keyboard.press('ArrowRight'); await B.waitForTimeout(60); } await B.keyboard.press('KeyX');
  ok = await until(async () => (await st(A)).scene === 'fight' && (await st(B)).scene === 'fight', 20000);
  await A.waitForTimeout(2500);
  const keys = ['KeyD', 'KeyA', 'KeyX', 'KeyZ', 'KeyX', 'KeyS', 'KeyW', 'KeyZ'];
  const mash = async (p, n) => { for (let i = 0; i < n; i++) { const k = keys[(Math.random() * keys.length) | 0]; await p.keyboard.down(k); await p.waitForTimeout(40 + Math.random() * 90); await p.keyboard.up(k); } };
  await Promise.all([mash(A, 90), mash(B, 90)]); await shot(A, 'lobby-fight');
  a = await st(A); b = await st(B);
  C('match runs in sync', ok && a.sim > 300 && b.sim > 300 && !a.desyncs && !b.desyncs, `frames ${a.sim}/${b.sim}, desyncs ${a.desyncs}/${b.desyncs}, ping ${a.rtt}/${b.rtt} ms`);
  await B.context().close(); let lost = ''; for (let i = 0; i < 30 && !lost; i++) { await A.waitForTimeout(500); lost = await A.evaluate(() => { const d = window.__dbg; return d.scene === d.Online ? d.Online.msg : ''; }); }
  C('opponent leaves', lost === 'OPPONENT DISCONNECTED', lost || '(still waiting)');
  console.log(out.join('\n')); console.log('errors:', A.errs.length || B.errs.length ? [...A.errs, ...B.errs].slice(0, 5) : 'none');
  await br.close(); process.exit(out.some(l => l.startsWith('FAIL')) || A.errs.length || B.errs.length ? 1 : 0);
})();
