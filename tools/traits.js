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
    { // GRAPPLER: kick start-up absorbs a jab
      const { F, step } = setup('ivan', 'karl', 100, 136); d.startAtk(F.p1, 'kick'); F.p1.state = 'attack'; F.p1.st = 1; d.startAtk(F.p2, 'jab'); F.p2.st = 3; step(30);
      check('GRAPPLER  armored kick', F.p1.armorId != null && F.p1.hitDone, `armor used ${F.p1.armorId != null}, kick still landed ${F.p1.hitDone}`); }
    { // ZONER: longest punch reach
      const r = {}; for (const id of ['vizor', 'karl']) { const { F } = setup(id, 'ivan'); d.startAtk(F.p1, 'jab'); r[id] = F.p1.atk.reach; }
      check('ZONER     reach', r.vizor > r.karl, `vizor jab reach ${r.vizor}, karl ${r.karl}`); }
    { // POWERHOUSE: counter-hit kick knocks down
      const { F, step } = setup('padre', 'karl', 100, 150); d.startAtk(F.p2, 'kick'); d.startAtk(F.p1, 'kick'); F.p1.st = 6; F.p2.st = 1; step(3);
      check('POWERHOUSE counter knockdown', ['knock', 'down'].includes(F.p2.state), `karl state ${F.p2.state}`); }
    { // HIGH/LOW ZONER: a blocked Strike Ball reloads the special
      const { F, step } = setup('zeke', 'ivan', 60, 190, 'LOW BLOCK'); step(3); d.startSpecial(F.p1, F.p2, 1); let reloaded = false; for (let i = 0; i < 100; i++) { step(1); if (F.p1.spCD === 0 && i < 90) reloaded = true; }
      check('HIGH/LOW  spare (blocked ball reloads)', reloaded, `special ready again after a blocked ball: ${reloaded}`); }
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
    { // Taser: long stun; Cuffed!: no specials for a while; Enforcer: no chip, meter from blocking
      let r = setup('lawslie', 'ivan', 80, 160); d.startSpecial(r.F.p1, r.F.p2, 1); let maxStun = 0; for (let i = 0; i < 40; i++) { r.step(1); maxStun = Math.max(maxStun, r.F.p2.stun); }
      check('LAWSLIE   Taser (long stun)', maxStun >= 40 && r.F.p2.zap >= 0, `stun ${maxStun} frames (a jab stuns 15)`);
      r = setup('lawslie', 'vizor', 100, 136, 'BLOCK'); r.step(3); d.startSpecial(r.F.p1, r.F.p2, 2); r.step(40);
      const cuffed = r.F.p2.cuffed > 0, frames = r.F.p2.cuffed, hpAfter = r.F.p2.hp;
      const q = setup('vizor', 'ivan', 80, 200); q.F.p1.cuffed = 300; q.step(1, { a: 1, b: 1 }); const lockedOut = q.F.p1.state !== 'special';
      q.F.p1.cuffed = 0; q.step(30); q.step(1, { a: 1, b: 1 }); const freeAgain = q.F.p1.state === 'special';
      check('LAWSLIE   Cuffed! (beats block, locks specials)', cuffed && hpAfter < r.F.p2.mhp && lockedOut && freeAgain, `cuffed ${frames} frames through a block, specials locked ${lockedOut}, unlocked after ${freeAgain}`);
      r = setup('karl', 'lawslie', 100, 136); r.F.p2.holdBack = true; r.F.p2.cpu = false; r.F.dummy = 'BLOCK'; r.step(3); d.startSpecial(r.F.p1, r.F.p2, 1); r.step(50);
      check('ENFORCER  no chip, meter on block', r.F.p2.hp === r.F.p2.mhp && r.F.p2.meter > 5, `hp ${r.F.p2.hp | 0}/${r.F.p2.mhp}, meter ${r.F.p2.meter | 0}`); }
    { // RHYTHM: on-beat hits do more; Bass Drop hits both sides and is low; Mic Check reflects projectiles
      const lost = (r, n, who = 'p2') => { let m = r.F[who].hp; for (let i = 0; i < n; i++) { r.step(1); m = Math.min(m, r.F[who].hp); } return r.F[who].mhp - m; };
      const hit = beat => { const r = setup('rex', 'ivan', 100, 140); for (let i = 0; i < 40 && d.onBeat() !== beat; i++) r.step(1);
        r.F.p2.hp = r.F.p2.mhp; d.applyHit(r.F.p1, r.F.p2, { dmg: 10, stun: 10, bs: 5, kb: 1, lv: 'mid' }, 140, 100); return r.F.p2.mhp - r.F.p2.hp; };
      const on = hit(true), off = hit(false);
      check('RHYTHM    on-beat +25%', on > off * 1.2, `on beat ${on.toFixed(1)}, off beat ${off.toFixed(1)}`);
      let r = setup('rex', 'ivan', 140, 100); r.F.p1.face = 1; r.F.p2.face = 1; d.startSpecial(r.F.p1, r.F.p2, 1); const behind = lost(r, 40);
      r = setup('rex', 'ivan', 100, 150, 'BLOCK'); r.step(3); d.startSpecial(r.F.p1, r.F.p2, 1); const stBlock = lost(r, 40);
      r = setup('rex', 'ivan', 100, 150, 'LOW BLOCK'); r.step(3); d.startSpecial(r.F.p1, r.F.p2, 1); const lowBlock = lost(r, 40);
      r = setup('rex', 'ivan', 40, 220); d.startSpecial(r.F.p1, r.F.p2, 1); const far = lost(r, 90);
      check('REX       Bass Drop reaches full screen', far >= 7, `damage from 180px away ${far | 0}`);
      const reach = {}; for (const id of ['rex', 'vizor']) { const q = setup(id, 'ivan'); d.startAtk(q.F.p1, 'kick'); reach[id] = q.F.p1.atk.reach; }
      const slowest = d.ORDER.every(id => id === 'rex' || d.CH[id].speed > d.CH.rex.speed);
      check('LONG-RANGE reach + slowest walk', reach.rex > reach.vizor && slowest, `rex kick reach ${reach.rex | 0} (vizor ${reach.vizor | 0}), walk ${d.CH.rex.speed}, slowest ${slowest}`);
      check('REX       Bass Drop (both sides, low)', behind >= 7 && stBlock >= 7 && lowBlock < 4, `behind ${behind | 0}, vs stand block ${stBlock | 0}, vs low block ${lowBlock | 0}`);
      r = setup('rex', 'zeke', 50, 210); r.step(3); d.startSpecial(r.F.p2, r.F.p1, 1); r.step(14); d.startSpecial(r.F.p1, r.F.p2, 2);
      let refl = false, zMin = r.F.p2.hp, rMin = r.F.p1.hp; for (let i = 0; i < 90; i++) { r.step(1); if (r.F.proj.some(q => q.kind === 'ball' && q.owner === r.F.p1)) refl = true; zMin = Math.min(zMin, r.F.p2.hp); rMin = Math.min(rMin, r.F.p1.hp); }
      const zDmg = r.F.p2.mhp - zMin, rexDmg = r.F.p1.mhp - rMin;
      check('REX       Mic Check (reflects)', refl && zDmg > 0 && rexDmg === 0, `ball reflected ${refl}, zeke took ${zDmg | 0}, rex took ${rexDmg | 0}`); }
    { // playtest fixes: Hecky closes distance with an invincible Hostile Takeover; diminishing returns; Shutter Flash nerf; 3-hit Laser Glare
      const lost = (r, n, who = 'p2') => { let m = r.F[who].hp; for (let i = 0; i < n; i++) { r.step(1); m = Math.min(m, r.F[who].hp); } return r.F[who].mhp - m; };
      let r = setup('hecky', 'ivan', 60, 165); d.startSpecial(r.F.p1, r.F.p2, 1); const far = lost(r, 40);
      r = setup('hecky', 'karl', 100, 140); r.F.p2.cpu = false; d.startSpecial(r.F.p1, r.F.p2, 1); d.startAtk(r.F.p2, 'jab'); const heckyHit = lost(r, 12, 'p1');
      check('HECKY     Takeover gap-close + invincible', far > 0 && heckyHit === 0, `hit from 105px away ${far | 0} dmg, damage taken during start-up ${heckyHit | 0}`);
      r = setup('zeke', 'ivan', 60, 190); const one = () => { r.F.p1.spCD = 0; r.F.p1.state = 'idle'; d.startSpecial(r.F.p1, r.F.p2, 1); const v = lost(r, 70); r.step(60); r.F.p2.hp = r.F.p2.mhp; return v; };
      const d1 = one(), d2 = one(), d3 = one();
      check('DIMINISHING returns (same special)', d2 < d1 && d3 < d2, `strike ball x3 in a row: ${d1.toFixed(1)}, ${d2.toFixed(1)}, ${d3.toFixed(1)}`);
      r = setup('vizor', 'ivan', 80, 160); d.startSpecial(r.F.p1, r.F.p2, 1); let knocked = false, m = r.F.p2.hp; for (let i = 0; i < 40; i++) { r.step(1); m = Math.min(m, r.F.p2.hp); if (r.F.p2.state === 'knock') knocked = true; }
      check('VIZOR     Shutter Flash (nerfed)', r.F.p2.mhp - m > 0 && r.F.p2.mhp - m < 8 && !knocked, `dmg ${(r.F.p2.mhp - m).toFixed(1)}, knockdown ${knocked}`);
      r = setup('hecky', 'ivan', 50, 210); r.step(3); d.startSpecial(r.F.p1, r.F.p2, 4); let hits = 0; for (let i = 0; i < 80; i++) { r.step(1); hits = Math.max(hits, r.F.p1.sp ? r.F.p1.sp.hits : 0); }
      check('HECKY     Laser Glare (3 hits)', hits === 3, `beam hits ${hits}`); }
    { // HIGH FLYER: double jump; Bounce Pass comes back on a hit (quick recharge); Ankle Breaker leaves them stumbling
      const lost = (r, n, who = 'p2') => { let m = r.F[who].hp; for (let i = 0; i < n; i++) { r.step(1); m = Math.min(m, r.F[who].hp); } return r.F[who].mhp - m; };
      let r = setup('kai', 'ivan', 100, 200); r.step(1, { up: 1, h: { up: 1 } }); let top1 = 0; for (let i = 0; i < 12; i++) { r.step(1); top1 = Math.max(top1, r.F.p1.y); }
      r.step(1, { up: 1, h: { up: 1 } }); let top2 = top1; for (let i = 0; i < 30; i++) { r.step(1); top2 = Math.max(top2, r.F.p1.y); }
      check('HIGH FLYER double jump', r.F.p1.dj === 1 && top2 > top1 + 10, `first jump ${top1 | 0}px, after the second ${top2 | 0}px`);
      r = setup('kai', 'ivan', 60, 170); d.startSpecial(r.F.p1, r.F.p2, 1); const dmg = lost(r, 90); const cd = r.F.p1.spCD;
      check('DEVANTE   Bounce Pass (caught = recharge)', dmg > 0 && cd <= 18, `hit for ${dmg | 0}, cooldown after the catch ${cd} (normal 80)`);
      r = setup('kai', 'ivan', 100, 140); d.startSpecial(r.F.p1, r.F.p2, 2); let stun = 0, crossed = false; for (let i = 0; i < 40; i++) { r.step(1); stun = Math.max(stun, r.F.p2.stun); if (r.F.p1.x > r.F.p2.x) crossed = true; }
      check('DEVANTE   Ankle Breaker (through + stumble)', crossed && stun >= 40, `went through ${crossed}, opponent stunned ${stun} frames`); }
    { // STRIKER: shin kicks hit 20% harder; Tiger Knee flies in and launches; Thai Clinch grabs (unblockable) for three knees
      const lost = (r, n) => { let m = r.F.p2.hp; for (let i = 0; i < n; i++) { r.step(1); m = Math.min(m, r.F.p2.hp); } return r.F.p2.mhp - m; };
      const kick = (id) => { const r = setup(id, 'ivan', 100, 140); r.F.p1.c = { ...r.F.p1.c, power: 1 }; d.startAtk(r.F.p1, 'kick'); return lost(r, 40); };
      const kk = kick('keksan'), kz = kick('zeke');
      check('STRIKER   shin kicks (+15%)', kk > kz * 1.1, `kick ${kk.toFixed(1)} vs ${kz.toFixed(1)} for a fighter without the trait`);
      let r = setup('keksan', 'ivan', 60, 150); d.startSpecial(r.F.p1, r.F.p2, 1); let top = 0, x0 = r.F.p1.x, dmg = 0, air = 0; { let m = r.F.p2.hp; for (let i = 0; i < 40; i++) { r.step(1); top = Math.max(top, r.F.p1.y); air = Math.max(air, r.F.p2.y); m = Math.min(m, r.F.p2.hp); } dmg = r.F.p2.mhp - m; }
      check('KEKSAN    Tiger Knee (flies in, launches)', top > 20 && r.F.p1.x - x0 > 40 && dmg >= 8 && air > 10, `rose ${top | 0}px, moved ${(r.F.p1.x - x0) | 0}px, dmg ${dmg | 0}, lifted them ${air | 0}px`);
      r = setup('keksan', 'ivan', 100, 132); r.F.p2.state = 'block'; r.F.p2.st = 0; d.startSpecial(r.F.p1, r.F.p2, 2); let held = 0; { let m = r.F.p2.hp; for (let i = 0; i < 80; i++) { r.step(1); if (r.F.p2.state === 'grabbed') held++; m = Math.min(m, r.F.p2.hp); } dmg = r.F.p2.mhp - m; }
      check('KEKSAN    Thai Clinch (grab, 3 knees)', held > 20 && dmg >= 12, `held ${held} frames, dmg ${dmg | 0} through a block`); }
    return out;
  });
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
