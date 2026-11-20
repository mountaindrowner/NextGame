// Check every stage song decodes and loops in the game: node music_check.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.keyboard.press('Enter'); await p.waitForTimeout(300);
  const r = await p.evaluate(async () => {
    const d = window.__dbg, out = [];
    for (const id of ['karl', 'akira', 'ivan', 'diego', 'vizor', 'padre', 'zeke', 'hecky', 'lawslie']) {
      d.RUN = { mode: 'vs', p1: 'akira', ladder: [id], idx: 0, cont: 0 }; d.go(d.Fight, { p1: 'akira', p2: id, stage: id });
      for (let i = 0; i < 40 && !d.track.src && d.track.id; i++) await new Promise(r => setTimeout(r, 100));
      const t = d.track;
      out.push(t.src ? `${id.padEnd(6)} song  ${t.buf[id].duration.toFixed(1)}s, loops ${t.src.loopStart.toFixed(2)}-${t.src.loopEnd.toFixed(2)}s` : `${id.padEnd(6)} chiptune (${d.mus.name})`);
    }
    return out;
  });
  console.log(r.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
})();
