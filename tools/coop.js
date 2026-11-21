// Online co-op Story mode, without the network: two pages are wired together in-process (each page's netSend is
// captured and handed to the other page's netMsg), then both players mash through the prologue and into Stage 1.
// Checks that both games stay frame-identical (the game's own state hashes every 60 frames), that there are two
// fighters, and that a co-op boss duel plays inside the brawl.  node tools/coop.js [SHOTDIR]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const shotDir = process.argv[2]; if (shotDir) fs.mkdirSync(shotDir, { recursive: true });
  const br = await chromium.launch();
  const mk = async () => { const p = await br.newPage({ viewport: { width: 460, height: 860 } }); p.errs = []; p.on('pageerror', e => p.errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
    await p.goto('file://' + path.resolve(__dirname, '../dist/index.html')); await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
    await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.music = false; d.SET.voice = false; window.__out = []; window.netSend = m => window.__out.push(JSON.stringify(m)); });
    return p; };
  const A = await mk(), B = await mk();
  const out = [], C = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
  await A.evaluate(() => { const N = window.__dbg.NET; N.role = 'host'; N.status = 'connected'; N.mode = 'coop'; N.D = 4; });
  await B.evaluate(() => { const N = window.__dbg.NET; N.role = 'guest'; N.status = 'connected'; N.D = 4; });
  let live = true;
  const pump = async () => { while (live) { try { const a = await A.evaluate(() => window.__out.splice(0)), b = await B.evaluate(() => window.__out.splice(0));
      if (a.length) await B.evaluate(ms => ms.forEach(m => window.netMsg(JSON.parse(m))), a); if (b.length) await A.evaluate(ms => ms.forEach(m => window.netMsg(JSON.parse(m))), b); } catch (e) {} await new Promise(r => setTimeout(r, 8)); } };
  const pumping = pump();
  // the host starts a co-op story: Papa-Léguas (host) and Mateo (guest)
  const cfg = { t: 'start', s: 7, D: 4, p1: 'karl', p2: 'mateo', skin: [false, false], mode: 'coop', diff: 1 };
  await A.evaluate(c => { window.netSend(c); window.netBegin(c); }, cfg);
  const st = p => p.evaluate(() => { const d = window.__dbg, N = d.NET, B = d.Brawl; return { sim: N.sim, desyncs: N.desyncs || 0, scene: d.scene === d.Brawl ? 'brawl' : d.scene === d.Cutscene ? 'cut:' + d.Cutscene.k : '?',
    coop: !!(d.RUN && d.RUN.coop), ps: d.scene === d.Brawl ? B.ps.map(q => q.c.id + ' ' + Math.round(q.hp)) : [], foes: d.scene === d.Brawl ? B.foes.length : 0, score: d.RUN && d.RUN.score, wi: B.wi }; });
  // the host skips the cutscene (START), then both players fight
  for (let i = 0; i < 40; i++) { const a = await st(A); if (a.scene === 'brawl') break; await A.keyboard.press('Enter'); await A.waitForTimeout(250); }
  await A.waitForTimeout(1500);
  const keys = ['KeyD', 'KeyD', 'KeyD', 'KeyX', 'KeyX', 'KeyZ', 'KeyS', 'KeyW', 'KeyX', 'KeyA', 'KeyV', 'KeyC'];
  const mash = async (p, n, seed) => { let r = seed; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < n; i++) { const k = keys[(rnd() * keys.length) | 0]; await p.keyboard.down(k); await p.waitForTimeout(30 + rnd() * 80); await p.keyboard.up(k); } };
  await Promise.all([mash(A, 220, 11), mash(B, 220, 23)]);
  await A.waitForTimeout(600);
  // a second session: both co-op fighters on the autoplayer, a real fight through Stage 1 (throws, hazards, allies, the ride)
  const a0 = await st(A), b0 = await st(B);
  const cfg2 = { t: 'start', s: 8, D: 4, p1: 'kai', p2: 'lawslie', skin: [false, false], mode: 'coop', diff: 1, bots: true };
  await A.evaluate(c => { window.netSend(c); window.netBegin(c); }, cfg2);
  for (let i = 0; i < 40; i++) { const x = await st(A); if (x.scene === 'brawl') break; await A.keyboard.press('Enter'); await A.waitForTimeout(250); }
  let far = null; for (let i = 0; i < 90; i++) { await A.waitForTimeout(1000); far = await st(A); if (far.wi >= 3 || far.scene !== 'brawl') break; }
  const a2 = await st(A), b2 = await st(B);
  C('autoplayed co-op stays in sync', a2.desyncs === 0 && b2.desyncs === 0 && a2.sim > 2000, `frame ${a2.sim}/${b2.sim}, waves ${a2.wi}, score ${a2.score}/${b2.score}, mismatches ${a2.desyncs}/${b2.desyncs}`);
  C('autoplayed co-op: real fighting', a2.score > 3000 && a2.score === b2.score, `score ${a2.score} on both`);
  const a = a0, b = b0;
  if (shotDir) { await A.locator('#screen').screenshot({ path: path.join(shotDir, 'coop-host.png') }); await B.locator('#screen').screenshot({ path: path.join(shotDir, 'coop-guest.png') }); }
  C('both in the co-op brawl', a.scene === 'brawl' && b.scene === 'brawl' && a.coop && b.coop, `host ${a.scene}, guest ${b.scene}`);
  C('two fighters on both screens', a.ps.length === 2 && b.ps.length === 2, `host [${a.ps}] guest [${b.ps}]`);
  C('lockstep ran', a.sim > 900 && Math.abs(a.sim - b.sim) < 30, `host frame ${a.sim}, guest ${b.sim}`);
  C('no drift between the two games', a.desyncs === 0 && b.desyncs === 0, `state checks every 60 frames: ${a.desyncs} / ${b.desyncs} mismatches`);
  C('same score on both', a.score === b.score, `${a.score} / ${b.score}`);
  live = false; await pumping;
  // co-op boss: the rival comes into the brawl (offline check on one page)
  const duel = await A.evaluate(() => { const d = window.__dbg, K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap', 'jump', 'dl', 'dr']; d.NET.lock = false; d.NET.role = null;
    d.startStory('karl', [false, false], [false, false]); const R = d.RUN; R.coop = true; R.p2 = 'mateo'; R.level = 0; R.ladder = ['keksan']; R.shadow = false;
    d.go(d.Cutscene, 'rival1'); d.Cutscene.done(); return new Promise(res => setTimeout(() => { const B = d.scene; const ok1 = B === d.Brawl;
      let saw = null, cl = false; for (let i = 0; i < 3000 && B.ph !== 'clear'; i++) { for (const e of B.foes) { if (d.FOES[e.kind].boss) { saw = saw || e.name; if (e.state !== 'yield') { e.inv = 0; B.P = B.ps[0]; B.hitFoe(e, 40, true, 1, null, { env: true }); } } }
        d.tick(); B.update(); } cl = B.ph === 'clear'; for (let i = 0; i < 120 && d.scene === B; i++) { d.tick(); B.update(); }
      setTimeout(() => res({ ok1, saw, cl, next: d.scene === d.Cutscene ? d.Cutscene.k : '?', lvl: R.level }), 700); }, 700)); });
  C('co-op boss fight in the brawl', duel.ok1 && duel.saw === 'KEKSAN' && duel.cl && duel.next === 'post1' && duel.lvl === 1, `brawl ${duel.ok1}, boss ${duel.saw}, beaten ${duel.cl}, then ${duel.next} (level ${duel.lvl})`);
  console.log(out.join('\n'));
  const errs = [...A.errs, ...B.errs]; console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none');
  await br.close();
})();
