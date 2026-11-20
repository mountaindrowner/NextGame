// Checks every fighter's archetype trait: node traits.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const res = await p.evaluate(() => {
    const d = window.__dbg, out = [], K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap'];
    const setup = (a, b, x1 = 100, x2 = 150, dummy = 'STAND') => {
      d.RUN = { mode: 'training', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: b });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.dummy = dummy; F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1;
      const { held, pressed } = d.inp;
      const step = (n = 1, o = {}) => { for (let i = 0; i < n; i++) { for (const k of K) { pressed[k] = i === 0 && !!o[k]; held[k] = !!(o.h && o.h[k]); } d.tick(); upd(); } };
      return { F, step };
    };
    const check = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
    const hp = {}; for (const id of d.ORDER) { const { F } = setup(id, 'ivan'); hp[id] = F.p1.mhp; }
    check('HEALTH DIFFERS', new Set(Object.values(hp)).size >= 5, JSON.stringify(hp));
    { // RUSHDOWN: 4 chained jabs/kicks
      const { F, step } = setup('karl', 'ivan', 100, 140); let n = 0;
      for (const b of ['a', 'a', 'a', 'b']) { step(1, { [b]: 1 }); for (let w = 0; w < 30 && !(F.p1.hitDone && F.hitstop === 0); w++) step(1); }
      step(40); check('RUSHDOWN  4-hit chain', F.tBest >= 4, `best ${F.tBest}`); }
    { // NINJA: double jump goes higher than a single jump
      let r = setup('akira', 'ivan', 60, 200); r.step(1, { up: 1, h: { up: 1 } }); let top1 = 0; for (let i = 0; i < 70; i++) { r.step(1); top1 = Math.max(top1, r.F.p1.y); }
      r = setup('akira', 'ivan', 60, 200); r.step(1, { up: 1, h: { up: 1 } }); r.step(12); r.step(1, { up: 1, h: { up: 1 } }); let top2 = 0; for (let i = 0; i < 90; i++) { r.step(1); top2 = Math.max(top2, r.F.p1.y); }
      check('NINJA     double jump', top2 > top1 + 15, `single ${top1 | 0}px, double ${top2 | 0}px`); }
    { // GRAPPLER: kick start-up absorbs a jab
      const { F, step } = setup('ivan', 'karl', 100, 136); d.startAtk(F.p1, 'kick'); F.p1.state = 'attack'; F.p1.st = 1; d.startAtk(F.p2, 'jab'); F.p2.st = 3; step(30);
      check('GRAPPLER  armored kick', F.p1.armorId != null && F.p1.hitDone, `armor used ${F.p1.armorId != null}, kick still landed ${F.p1.hitDone}`); }
    { // MIX-UP: Akira's shuriken flies over crouching Diego, hits a crouching Ivan
      const run = id => { const { F, step } = setup('akira', id, 60, 170, 'LOW BLOCK'); step(4); d.startSpecial(F.p1, F.p2); let touched = false; for (let i = 0; i < 70; i++) { step(1); if (F.p2.state === 'block' || F.p2.state === 'hurt') touched = true; } return touched; };
      const diego = run('diego'), ivan = run('vizor');
      check('MIX-UP    low profile', !diego && ivan, `shuriken hits crouching Diego: ${diego}, crouching Vizor: ${ivan}`); }
    { // ZONER: longest punch reach
      const r = {}; for (const id of ['vizor', 'karl']) { const { F } = setup(id, 'ivan'); d.startAtk(F.p1, 'jab'); r[id] = F.p1.atk.reach; }
      check('ZONER     reach', r.vizor > r.karl, `vizor jab reach ${r.vizor}, karl ${r.karl}`); }
    { // POWERHOUSE: counter-hit kick knocks down
      const { F, step } = setup('padre', 'karl', 100, 150); d.startAtk(F.p2, 'kick'); d.startAtk(F.p1, 'kick'); F.p1.st = 6; F.p2.st = 1; step(3);
      check('POWERHOUSE counter knockdown', ['knock', 'down'].includes(F.p2.state), `karl state ${F.p2.state}`); }
    { // HIGH/LOW ZONER: strike ball beats a shuriken
      const { F, step } = setup('zeke', 'akira', 60, 200); F.p2.cpu = false; d.startSpecial(F.p1, F.p2, 1); d.startSpecial(F.p2, F.p1, 1); step(60);
      check('HIGH/LOW  balls win clashes', F.p2.hp < F.p2.mhp || F.p2.state === 'knock' || F.p2.state === 'down', `akira hp ${F.p2.hp | 0}/${F.p2.mhp}`); }
    { // TECHNICIAN: tapping forward right before a hit parries it (no damage, meter gain)
      const { F, step } = setup('hecky', 'ivan', 100, 140); F.p2.cpu = false; d.startAtk(F.p2, 'jab'); step(1, { right: 1, h: { right: 1 } }); step(12);
      check('TECHNICIAN parry', F.p1.hp === F.p1.mhp && F.p1.meter > 0, `hecky hp ${F.p1.hp | 0}/${F.p1.mhp}, meter ${F.p1.meter | 0}`); }
    { // Hostile Takeover launches high enough to juggle; Power Suit boosts damage
      const { F, step } = setup('hecky', 'ivan', 100, 136); d.startSpecial(F.p1, F.p2, 1); let top = 0; for (let i = 0; i < 40; i++) { step(1); top = Math.max(top, F.p2.y); }
      check('HECKY     Hostile Takeover launch', top > 50, `launch height ${top | 0}px`);
      const dmg = buff => { const r = setup('hecky', 'ivan', 100, 140); r.F.p1.buff = buff; d.startAtk(r.F.p1, 'jab'); r.step(30); return r.F.p2.mhp - r.F.p2.hp; };
      const plain = dmg(0), suit = dmg(300); check('HECKY     Power Suit +damage', suit > plain * 1.2, `jab ${plain.toFixed(1)} -> ${suit.toFixed(1)}`); }
    { // Laser Glare: hits a standing opponent across the screen, a crouching one ducks it
      const run = crouch => { const { F, step } = setup('hecky', 'ivan', 50, 210, crouch ? 'CROUCH' : 'STAND'); step(4); d.startSpecial(F.p1, F.p2, 4); step(50); return F.p2.mhp - F.p2.hp; };
      const stand = run(false), duck = run(true);
      check('HECKY     Laser Glare (eye beams)', stand > 5 && duck === 0, `damage to standing Ivan ${stand.toFixed(1)}, to crouching ${duck.toFixed(1)}`); }
    return out;
  });
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
