// Dashes: every fighter has a forward and a back dash animation; forward travels ~58 px in 18 frames, back ~49 px in
// 20 frames and is invincible for its first 8.  node tools/dash.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = await p.evaluate(() => {
    const d = window.__dbg, res = []; d.SET.sound = false;
    const C = (n, ok, info) => res.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
    for (const id of [...d.ORDER, 'vex']) {
      d.RUN = { mode: 'training', p1: id, ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: id, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = 'STAND';
      const f = F.p1, step = n => { for (let i = 0; i < n; i++) { d.tick(); upd() } }; step(2);
      const run = (dir) => { f.x = 128; F.p2.x = dir > 0 ? 240 : 20; f.face = dir > 0 ? 1 : -1; F.p2.face = -f.face; f.state = 'idle'; f.inv = 0; const x0 = f.x; let n = 0, inv0 = 0, pose = null;
        const inp = { dz: dir > 0 ? f.face : -f.face }; d.doDash ? d.doDash(f, dir) : null; inv0 = f.inv; for (let i = 0; i < 40 && f.state === 'dash'; i++) { if (i === 6) pose = d.pose(f); step(1); n++ } return { dist: Math.abs(f.x - x0), n, inv0, pose } };
      const A = d.CH[id].anim, fw = run(1), bk = run(-1);
      C(`${id}: dash animations`, !!(A.dashf && A.dashb) && fw.pose && fw.pose.k === 'dashf' && bk.pose && bk.pose.k === 'dashb', `forward ${fw.pose && fw.pose.k}, back ${bk.pose && bk.pose.k}`);
      C(`${id}: forward ${fw.dist.toFixed(0)} px / back ${bk.dist.toFixed(0)} px`, fw.dist > 40 && fw.dist < 80 && bk.dist > 34 && bk.dist < 70 && fw.n >= 16 && bk.n >= 18 && bk.inv0 >= 8, `frames ${fw.n} / ${bk.n}, back invincible ${bk.inv0}`);
    }
    return res });
  console.log(out.join('\n')); console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none'); await br.close();
})();
