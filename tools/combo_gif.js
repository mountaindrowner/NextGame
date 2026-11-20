// Film combos from the real game for the itch.io page: node combo_gif.js OUTDIR
// Writes numbered PNG frames (every 2nd game frame); tools/itch_page.py --combo turns them into a GIF.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const CLIPS = [
  { p1: 'karl', p2: 'ivan', stage: 'karl', seq: [['a'], ['a'], ['b'], ['a', 'b']] },
  { p1: 'vizor', p2: 'zeke', stage: 'vizor', seq: [['a'], ['b'], ['a', 'b']] },
];
(async () => {
  const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(out)) fs.unlinkSync(path.join(out, f));
  const br = await chromium.launch(); const p = await br.newPage();
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  let n = 0;
  for (const clip of CLIPS) {
    const frames = await p.evaluate(async (clip) => {
      const d = window.__dbg, { held, pressed } = d.inp, shots = [];
      d.RUN = { mode: 'training', p1: clip.p1, ladder: [clip.p2], idx: 0, cont: 0 };
      d.go(d.Fight, { p1: clip.p1, p2: clip.p2, stage: clip.stage });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.tBest = 0; F.cinema = true; F.p1.x = 96; F.p2.x = 142;
      const K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'];
      let fc = 0;
      const frame = async (o = {}) => { for (const k of K) { pressed[k] = !!o[k]; held[k] = !!(o.h && o.h[k]); } d.tick(); upd(); d.scene.t++;
        if (fc++ % 2 === 0) { await new Promise(r => requestAnimationFrame(r)); shots.push(document.getElementById('screen').toDataURL()); } };
      for (let i = 0; i < 10; i++) await frame();
      let before = null;
      for (let i = 0; i < clip.seq.length; i++) {
        for (let w = 0; w < 60 && i > 0; w++) { const f = F.p1; if (f.atk && f.atk.id !== before && f.hitDone && F.hitstop === 0) break; await frame(); }
        before = F.p1.atk ? F.p1.atk.id : null; const o = {}; for (const b of clip.seq[i]) o[b] = 1; await frame(o);
      }
      for (let i = 0; i < 44; i++) await frame();
      return shots;
    }, clip);
    for (const s of frames) fs.writeFileSync(path.join(out, String(n++).padStart(4, '0') + '.png'), Buffer.from(s.split(',')[1], 'base64'));
  }
  console.log(n, 'frames'); await br.close();
})();
