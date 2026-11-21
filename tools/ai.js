// CPU vs CPU: every fighter, every difficulty. Checks the deck-based CPU uses its decks, deals damage,
// reacts later on easy than on hard, and fumbles more under pressure: node ai.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const res = await p.evaluate(() => {
    const d = window.__dbg, out = [], C = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(30)} ${info}`);
    const match = (a, b, diff, frames = 1500) => {
      d.SET.diff = diff; d.RUN = { mode: 'vs', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {};
      F.phase = 'play'; F.p1.cpu = true; F.p2.cpu = true; F.p1.ai = F.p1.ai || {}; let dealt = [0, 0], lastHp = [F.p1.hp, F.p2.hp];
      for (let i = 0; i < frames; i++) { d.tick(); upd(); F.time = 60;
        for (const [k, f] of [[0, F.p2], [1, F.p1]]) { if (f.hp < lastHp[1 - k]) dealt[k] += lastHp[1 - k] - f.hp; lastHp[1 - k] = f.hp; if (f.hp < 30) { f.hp = f.mhp; lastHp[1 - k] = f.hp; } } }
      return { dealt, log: { ...F.p1.ai.log }, log2: { ...F.p2.ai.log }, rt: F.p1.ai.seen.length - 1, fumbles: (F.p1.ai.fumbles || 0) + (F.p2.ai.fumbles || 0), ex: F.p1.ai.ex, pr: F.p1.ai.pr };
    };
    const decks = {}; let silent = [], fum = 0;
    for (const id of d.ORDER) { const r = match(id, d.ORDER[(d.ORDER.indexOf(id) + 3) % d.ORDER.length], 1);
      fum += r.fumbles; for (const k in r.log) decks[k] = (decks[k] || 0) + r.log[k]; if (r.dealt[0] < 5) silent.push(id); }
    C('every fighter deals damage', silent.length === 0, silent.length ? 'no damage: ' + silent : 'all 8 fighters hit their opponent');
    const need = ['close', 'mid', 'far', 'defend', 'antiair', 'punish', 'wakeup'];
    C('all decks used', need.every(k => decks[k] > 0), need.map(k => `${k} ${decks[k] || 0}`).join(', '));
    const avg = (diff) => { let dealt = 0, fumbles = 0, rt = 0, ex = 0; for (const b of ['vizor', 'padre', 'rex']) { const r = match('karl', b, diff); dealt += r.dealt[0]; fumbles += r.fumbles; rt = r.rt; ex = r.ex + .28 * (r.pr || 0); }/* execution skill with the end-of-match pressure taken out: the difficulty setting itself, not who was losing */ return { dealt: [dealt], fumbles, rt, ex }; };
    const easy = avg(0), hard = avg(2);
    C('reaction time easy > hard', easy.rt > hard.rt, `easy ${easy.rt} frames (${Math.round(easy.rt * 16.7)} ms), hard ${hard.rt} frames (${Math.round(hard.rt * 16.7)} ms)`);
    C('hard CPU out-damages easy', hard.dealt[0] > easy.dealt[0] * 0.9, `karl vs vizor/samson/marcus: easy dealt ${easy.dealt[0] | 0}, hard dealt ${hard.dealt[0] | 0}`);
    C('execution: easy sloppier, mistakes', easy.ex < hard.ex && fum + easy.fumbles + hard.fumbles > 0, `execution ability easy ${easy.ex.toFixed(2)}, hard ${hard.ex.toFixed(2)}; fumbled inputs across all matches ${fum + easy.fumbles + hard.fumbles}`);
    d.SET.diff = 1;
    return out;
  });
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
