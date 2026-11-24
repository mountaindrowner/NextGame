// Dashes: every fighter has a forward and a back dash animation; forward travels ~58 px in 18 frames, back ~49 px in
// 20 frames and is invincible for its first 8.  node tools/dash.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = await p.evaluate(() => {
    const d = window.__dbg, res = [], dists = { close: [], mixed: [], ranged: [] }; d.SET.sound = false;
    const C = (n, ok, info) => res.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
    for (const id of [...d.ORDER, 'vex']) {
      d.RUN = { mode: 'training', p1: id, ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: id, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = 'STAND';
      const f = F.p1, step = n => { for (let i = 0; i < n; i++) { d.tick(); upd() } }; step(2);
      const run = (dir) => { f.x = 128; F.p2.x = dir > 0 ? 240 : 20; f.face = dir > 0 ? 1 : -1; F.p2.face = -f.face; f.state = 'idle'; f.inv = 0; const x0 = f.x; let n = 0, inv0 = 0, pose = null;
        const inp = { dz: dir > 0 ? f.face : -f.face }; d.doDash ? d.doDash(f, dir) : null; inv0 = f.inv; for (let i = 0; i < 40 && f.state === 'dash'; i++) { if (i === 6) pose = d.pose(f); step(1); n++ } return { dist: Math.abs(f.x - x0), n, inv0, pose } };
      const A = d.CH[id].anim, fw = run(1), bk = run(-1);
      C(`${id}: dash animations`, !!(A.dashf && A.dashb) && fw.pose && fw.pose.k === 'dashf' && bk.pose && bk.pose.k === 'dashb', `forward ${fw.pose && fw.pose.k}, back ${bk.pose && bk.pose.k}`);
      const g = d.RANGE_OF[id] || 'mixed', lo = { close: 48, mixed: 40, ranged: 30 }[g], hi = { close: 80, mixed: 64, ranged: 50 }[g];
      C(`${id} (${g}): forward ${fw.dist.toFixed(0)} px / back ${bk.dist.toFixed(0)} px`, fw.dist > lo && fw.dist < hi && bk.dist > lo * .8 && bk.dist < hi && fw.n >= 16 && bk.n >= 18 && bk.inv0 >= 8, `frames ${fw.n} / ${bk.n}, back invincible ${bk.inv0}`);
      C(`${id} (${g}): wait before the next dash`, f.dashCD === d.RANGE[g].cd, `${f.dashCD} frames`);
      dists[g].push(fw.dist);
    }
    // costumes and Mascot Mode: their own dash art, and the base fighter's dash group
    for (const [base, skin] of [['karl', 'karl2'], ['zeke', 'zekeidol'], ['hecky', 'heckyfox'], ['padre', 'padreteen2']]) {
      d.RUN = { mode: 'training', p1: base, ladder: ['padre'], idx: 0, cont: 0, skin: [1, 0] }; d.go(d.Fight, { p1: base, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play';
      const f = F.p1, ks = []; for (const dir of [1, -1]) { f.state = 'idle'; d.doDash(f, dir); for (let i = 0; i < 6; i++) { d.tick(); upd() } ks.push(d.pose(f).k) }
      C(`${skin}: dash animations`, f.c.skinKey === skin && ks[0] === 'dashf' && ks[1] === 'dashb', `${f.c.skinKey}: ${ks.join(', ')}`);
    }
    { const A = d.CH.mikecow.anim; C('mikecow: dash animations', !!(A.dashf && A.dashb), Object.keys(A).filter(k => k.startsWith('dash')).join(', ')) }
    const avg = a => a.reduce((x, y) => x + y, 0) / a.length, A = avg(dists.close), M = avg(dists.mixed), R = avg(dists.ranged);
    C('close > mixed > ranged (average forward)', A > M && M > R, `${A.toFixed(0)} / ${M.toFixed(0)} / ${R.toFixed(0)} px`);
    return res });
  console.log(out.join('\n')); console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none'); await br.close();
})();
