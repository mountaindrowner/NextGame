// Frame-exact combo checks in Training mode: node combos.js
// Each combo is a list of steps; a step presses buttons on one frame (holding a direction if given),
// after waiting until the previous attack has connected (or a fixed number of frames).
const { chromium } = require('playwright');
const path = require('path');
const COMBOS = {
  karl:  [['a'], ['a'], ['b'], ['a', 'b']],
  ivan:  [['jump'], ['b', { wait: 'air' }], ['a', { wait: 'land' }], ['b']],
  vizor: [['a'], ['b'], ['a', 'b']],
  padre: [['a'], ['b'], ['a', 'b']],
  zeke: [['a'], ['b'], ['a', 'b']],
  hecky: [['a', { down: 1 }], ['a'], ['b'], ['a', 'b']],
  lawslie: [['a'], ['b'], ['a', 'b']],
  rex: [['a'], ['b'], ['a', 'b']],
};
(async () => {
  const br = await chromium.launch();
  const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  let fails = 0;
  for (const [id, seq] of Object.entries(COMBOS)) {
    const r = await p.evaluate(([id, seq]) => {
      const d = window.__dbg, { held, pressed } = d.inp;
      d.RUN = { mode: 'training', p1: id, ladder: ['ivan'], idx: 0, cont: 0 };
      d.go(d.Fight, { p1: id, p2: 'ivan', stage: 'ivan' });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.tBest = 0; F.p1.x = 100; F.p2.x = seq[0][0] === 'jump' ? 168 : 146; F.p2.hp = F.p2.mhp;
      const K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'];
      const frame = (o = {}) => { for (const k of K) { pressed[k] = !!o[k]; held[k] = !!(o.h && o.h[k]); } d.tick(); upd(); };
      const log = []; let before = null;
      for (let i = 0; i < seq.length; i++) {
        const step = seq[i], opt = typeof step[step.length - 1] === 'object' ? step[step.length - 1] : {}, btns = step.filter(x => typeof x === 'string');
        // wait for the previous move to connect, or for the jump/landing
        for (let w = 0; w < 60 && i > 0; w++) {
          const f = F.p1;
          if (opt.wait === 'air') { if (f.state === 'jump' && f.vy < -2.4) break; }
          else if (opt.wait === 'land') { if (f.state !== 'jump') break; }
          else if (f.atk && f.atk.id !== before && f.hitDone && F.hitstop === 0) break;
          frame({ h: { down: !!opt.down } });
        }
        if (btns[0] === 'jump') { frame({ up: 1, right: 1, h: { up: 1, right: 1 } }); continue; }
        before = F.p1.atk ? F.p1.atk.id : null;
        const o = { h: { down: !!opt.down } }; for (const b of btns) o[b] = 1; frame(o);
        log.push(`${btns.join('+')}->${F.p1.state}${F.p1.atk ? ':' + F.p1.atk.name : ''}`);
      }
      for (let w = 0; w < 90; w++) frame();
      return { hits: F.tBest, dmg: Math.round(F.tDmg), log: log.join(' ') };
    }, [id, seq]);
    const ok = r.hits >= seq.filter(s => s[0] !== 'jump').length;
    if (!ok) fails++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${id.padEnd(6)} ${String(r.hits).padStart(2)} hits ${String(r.dmg).padStart(3)} dmg   ${r.log}`);
  }
  console.log('errors:', errs.length ? errs : 'none');
  await br.close();
  process.exit(fails ? 1 : 0);
})();
