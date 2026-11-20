// Every fighter's super does its own thing: node supers.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const res = await p.evaluate(() => {
    const d = window.__dbg, out = [];
    const run = (id, x1, x2, dummy = 'STAND', foe = 'vizor') => {
      d.RUN = { mode: 'training', p1: id, ladder: [foe], idx: 0, cont: 0 }; d.go(d.Fight, { p1: id, p2: foe, stage: id });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.dummy = dummy; F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1; for (const f of [F.p1, F.p2]) f.hp = f.mhp = f.trail = 100;
      for (let i = 0; i < 3; i++) { d.tick(); upd(); }
      F.p1.meter = 100; d.startSpecial(F.p1, F.p2, 3); const info = { minHp: 100, maxY: 0, giant: false, pillars: 0, cuffed: 0, healed: false };
      const hp0 = F.p1.hp; F.p1.hp = 80; F.p1.trail = 80;
      for (let i = 0; i < 260; i++) { d.tick(); upd(); info.minHp = Math.min(info.minHp, F.p2.hp); info.maxY = Math.max(info.maxY, F.p2.y); if (F.proj.some(q => q.kind === 'giant')) info.giant = true;
        if (F.p1.sp && F.p1.sp.pil) info.pillars = F.p1.sp.pil.length; info.cuffed = Math.max(info.cuffed, F.p2.cuffed || 0); if (F.p1.hp > 80) info.healed = true; if (F.p1.sp && F.p1.sp.ph === 'jam') info.landed = true; }
      return { dmg: Math.round(100 - info.minHp), ...info, end: F.p1.state };
    };
    const C = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(34)} ${info}`);
    let r = run('karl', 90, 160); C('PAPA-LEGUAS Mil Leguas (blinks)', r.dmg >= 18, `dmg ${r.dmg}`);
    r = run('ivan', 110, 150); C('IVAN Siberian Storm (3 slams)', r.dmg >= 20 && r.maxY > 80, `dmg ${r.dmg}, top slam ${r.maxY | 0}px`);
    r = run('ivan', 110, 150, 'BLOCK'); C('IVAN  ...unblockable', r.dmg >= 20, `dmg vs blocking ${r.dmg}`);
    r = run('vizor', 40, 220); C('VIZOR Full Exposure (full screen)', r.dmg >= 18, `dmg from 180px away ${r.dmg}`);
    r = run('padre', 60, 200); C('SAMSON Final Sermon (pillars+heal)', r.dmg >= 18 && r.pillars === 4 && r.healed, `dmg ${r.dmg}, pillars ${r.pillars}, healed ${r.healed}`);
    r = run('zeke', 60, 200); C('ZEKE Perfect Game (giant ball)', r.dmg >= 18 && r.giant, `dmg ${r.dmg}, giant ball ${r.giant}`);
    r = run('hecky', 100, 140); C('HECKY Golden Parachute (juggle)', r.dmg >= 18 && r.maxY > 40, `dmg ${r.dmg}, held ${r.maxY | 0}px up`);
    r = run('lawslie', 70, 170); C('LAWSLIE Full Arrest (cuffed 8s)', r.dmg >= 15 && r.cuffed > 400, `dmg ${r.dmg}, cuffed ${r.cuffed} frames`);
    r = run('rex', 60, 180); C('REX Stage Dive (homing leap + jam)', r.dmg >= 18 && r.landed, `dmg ${r.dmg} from 120px away`);
    r = run('kai', 70, 170); C('DEVANTE Fast Break (alley-oop dunk)', r.dmg >= 18 && r.maxY > 40, `dmg ${r.dmg}, popped ${r.maxY | 0}px up`);
    r = run('keksan', 70, 170); C('KEKSAN Eight Limbs (8 strikes + knee)', r.dmg >= 20 && r.maxY > 15, `dmg ${r.dmg}, knee lifted them ${r.maxY | 0}px`);
    return out;
  });
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
