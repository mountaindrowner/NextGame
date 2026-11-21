// The Tier 1 combo tools, played with real button presses for every fighter:
//  overhead > jab > kick > SP   (the overhead links into the jab, then a chain and a special cancel)
//  low jab beats a standing guard, the overhead beats a crouching guard
//  counter-hit kick > kick      (the counter-hit stun makes the kick link)
//  SP > super                   (super cancel)
//  plus each fighter's signature link from tools/framedata.js (e.g. Samson's kick > jab)
// usage: node tools/links.js [fighter]
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 20000 });
  const res = await p.evaluate(only => {
    const d = window.__dbg, K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap', 'jump', 'dl', 'dr'], out = [];
    const setup = (a, dummy = 'STAND', x2 = 138) => { d.RUN = { mode: 'training', p1: a, ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.dummy = dummy; F.p1.x = 100; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1;
      const { held, pressed } = d.inp; const step = (o = {}) => { for (const k of K) { pressed[k] = !!o[k]; held[k] = !!(o.h && o.h[k]); } d.tick(); upd(); };
      for (let i = 0; i < 3; i++) step(); return { F, step }; };
    const free = f => ['idle', 'crouch', 'walk'].includes(f.state);
    // play a sequence: each entry is pressed as soon as the attacker can act (frame-perfect, as the input buffer makes it)
    // or, for cancels, as soon as the previous hit connects
    const play = (id, seq, dummy, x2) => { const { F, step } = setup(id, dummy, x2); let best = 0;
      for (const [btn, how, dir] of seq) { let t = 0;
        if (how === 'link') while (!free(F.p1) && t++ < 80) step();
        else if (how === 'cancel') while (!((F.p1.hitDone && F.hitstop === 0) || (F.p1.sp && F.p1.sp.conn != null)) && t++ < 80) step();
        const o = { h: {} }; for (const k of btn.split('+')) o[k] = 1; if (dir) { o[dir] = 1; o.h[dir] = 1; }
        const prev = F.p1.atk ? F.p1.atk.id : F.p1.sp ? F.p1.sp.id : null;
        step(o); best = Math.max(best, F.p1.combo || 0);
        for (let i = 0; i < 30 && (F.p1.atk ? F.p1.atk.id : F.p1.sp ? F.p1.sp.id : null) === prev; i++) { step({ h: dir ? { [dir]: 1 } : {} }); best = Math.max(best, F.p1.combo || 0); }
        F.p1.hitDone = false; }
      for (let i = 0; i < 90; i++) { step(); best = Math.max(best, F.p1.combo || 0); }
      return { combo: best, F }; };
    const check = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(44)} ${info}`);
    for (const id of only ? [only] : d.ORDER) {
      let r = play(id, [['a', 'link', 'right'], ['a', 'link'], ['b', 'cancel'], ['a+b', 'cancel']]);
      check(`${id.padEnd(9)} overhead > jab > kick > SP`, r.combo >= 4, `${r.combo} hits`);
      r = setup(id, 'BLOCK'); r.F.p1.crouch = true; r.F.p1.state = 'crouch'; d.startAtk(r.F.p1, 'cjab'); let st = null; for (let i = 0; i < 20; i++) { r.step(); st = st || (['hurt', 'block'].includes(r.F.p2.state) ? r.F.p2.state : null); }
      const lowOk = st === 'hurt'; r = setup(id, 'LOW BLOCK'); d.startAtk(r.F.p1, 'leap'); st = null; for (let i = 0; i < 30; i++) { r.step(); st = st || (['hurt', 'block'].includes(r.F.p2.state) ? r.F.p2.state : null); }
      check(`${id.padEnd(9)} low jab vs stand guard, overhead vs crouch`, lowOk && st === 'hurt', `low jab ${lowOk ? 'hit' : 'blocked'}, overhead ${st === 'hurt' ? 'hit' : 'blocked'}`);
      { const q = setup(id, 'STAND', 140); d.startAtk(q.F.p2, 'kick'); q.F.p2.state = 'attack'; q.F.p2.st = 0; q.F.p2.atk.s = 40; d.startAtk(q.F.p1, 'kick'); q.F.p1.state = 'attack'; q.F.p1.st = 0;
        let best = 0, t = 0; while (!free(q.F.p1) && t++ < 80) { q.step(); best = Math.max(best, q.F.p1.combo || 0); } q.step({ b: 1 }); for (let i = 0; i < 40; i++) { q.step(); best = Math.max(best, q.F.p1.combo || 0); }
        check(`${id.padEnd(9)} counter-hit kick > kick (link)`, best >= 2 || (id === 'padre' && ['knock','down'].includes(q.F.p2.state)), id === 'padre' ? 'his counter-hit kick knocks down (trait)' : `${best} hits`); }
      { const q = setup(id, 'STAND', 140); q.F.p1.meter = 100; d.startSpecial(q.F.p1, q.F.p2, id === 'rex' ? 2 : 1); /* Marcus: Mic Check (his Bass Drop knocks down) */ let t = 0, sup = false, best = 0;
        while (t++ < 120) { const c = q.F.p1.sp && q.F.p1.sp.conn != null && q.F.p1.sp.kind !== 'super'; q.step(c ? { a: 1, b: 1, right: 1, h: { right: 1 } } : {}); sup = sup || !!(q.F.p1.sp && q.F.p1.sp.kind === 'super'); best = Math.max(best, q.F.p1.combo || 0); if (sup && t > 60 && free(q.F.p1)) break; }
        for (let i = 0; i < 150; i++) { q.step(); best = Math.max(best, q.F.p1.combo || 0); }
        check(`${id.padEnd(9)} SP > super cancel`, sup && best >= 2, `super came out ${sup}, ${best} hits`); }
    }
    // signature links
    for (const [id, seq, n, want] of [['padre', [['b', 'link'], ['a', 'link'], ['b', 'cancel']], 'kick > jab > kick (link)', 3], ['mateo', [['b', 'link'], ['a', 'link'], ['b', 'cancel']], 'kick > jab > kick (link)', 3],
      ['estrella', [['a', 'link', 'down'], ['a', 'link'], ['b', 'cancel']], 'low jab > jab > kick (link)', 3], ['zeke', [['a', 'link', 'down'], ['a', 'link', 'down'], ['b', 'cancel', 'down']], 'low jab > low jab (link) > sweep', 3],
      ['reyes', [['a', 'link'], ['a', 'link'], ['b', 'cancel'], ['a+b', 'cancel']], 'jab > jab > kick > SP (link)', 4]])
      if (!only || only === id) { const r = play(id, seq); check(`${id.padEnd(9)} ${n}`, r.combo >= want, `${r.combo} hits`); }
    // every trial can be cleared: play each one with real inputs (specials/super cancelled on contact, everything else linked)
    // Tier 2: each fighter's command normal (back + A) and target combo (kick, then a button)
    for (const id of only ? [only] : d.ORDER) { const C = d.CMD[id], T = d.TCM[id];
      { const air = C.hy >= .75, q = setup(id, C.lv === 'low' ? 'BLOCK' : 'STAND', air ? 132 : 138); if (air) { q.F.p2.state = 'jump'; q.F.p2.y = 30; q.F.p2.vy = 0.5; }
        let st = null, i = 0; q.step({ a: 1, left: 1, h: { left: 1 } }); const name = q.F.p1.atk && q.F.p1.atk.name;
        for (; i < 40; i++) { q.step({ h: { left: 1 } }); st = st || (['hurt', 'knock', 'block'].includes(q.F.p2.state) ? q.F.p2.state : null); }
        const want = C.launch || air ? 'knock' : 'hurt';
        check(`${id.padEnd(9)} back+A ${C.nm}${C.lv === 'low' ? ' (beats a standing guard)' : air ? ' (anti-air)' : C.launch ? ' (launcher)' : ''}`, name === 'cmd' && st === want, `${name}, opponent ${st}`); }
      { const r = play(id, [['a', 'link'], ['b', 'cancel'], [T.btn, 'cancel']]); const tcOk = r.combo >= 3 + (T.m.multi ? T.m.multi - 1 : 0);
        let extra = ''; if (T.m.cuff) extra = r.F.p2.cuffed > 0 ? ', cuffed' : ', NOT cuffed'; if (T.m.knock || T.m.launch) extra = ['knock', 'down', 'rise'].includes(r.F.p2.state) || r.F.p2.state === 'idle' ? ', knocked down' : '';
        check(`${id.padEnd(9)} jab > kick > ${T.btn.toUpperCase()}: ${T.m.nm}`, tcOk && !extra.includes('NOT'), `${r.combo} hits${extra}`); }
      if (T.m.stun >= 30) { const r = play(id, [['a', 'link'], ['b', 'cancel'], [T.btn, 'cancel'], ['b', 'link']]); check(`${id.padEnd(9)} ${T.m.nm} links into kick`, r.combo >= 4, `${r.combo} hits`); }
    }
    // FOCUS (hold the focus button, let go): armor, crumple, dash cancel, focus cancel, unblockable level 3
    for (const id of only ? [only] : d.ORDER) {
      const hold = (q, n, o = {}) => { q.step({ jump: 1, h: { jump: 1 } }); for (let i = 1; i < n; i++) q.step({ h: { jump: 1 }, ...o }); };
      { const q = setup(id, 'STAND', 136); hold(q, 6); const h0 = q.F.p1.hp; d.startAtk(q.F.p2, 'jab'); q.F.p2.state = 'attack'; q.F.p2.st = 0; for (let i = 0; i < 10; i++) q.step({ h: { jump: 1 } });
        check(`${id.padEnd(9)} focus absorbs a hit`, q.F.p1.state === 'focus' && q.F.p1.hp < h0 && q.F.p1.hp > h0 - 4, `still charging ${q.F.p1.state === 'focus'}, took ${(h0 - q.F.p1.hp).toFixed(1)}`); }
      { const q = setup(id, 'STAND', 140); hold(q, 24); let crumple = false, down = false; for (let i = 0; i < 140; i++) { q.step(); crumple = crumple || !!q.F.p2.crumple; down = down || q.F.p2.state === 'down'; }
        check(`${id.padEnd(9)} level-2 focus crumples, then they fall`, crumple && down, `crumpled ${crumple}, fell ${down}`); }
      { const q = setup(id, 'STAND', 140); hold(q, 8); q.step({ right: 1, dr: 1, h: { right: 1 } }); let dashed = false; for (let i = 0; i < 4; i++) { q.step({ h: { right: 1 } }); dashed = dashed || q.F.p1.state === 'dash'; }
        check(`${id.padEnd(9)} dash cancels the focus`, dashed, dashed ? 'dashed' : q.F.p1.state); }
      { const q = setup(id, 'STAND', 140); q.F.p1.meter = 100; d.startSpecial(q.F.p1, q.F.p2, 1); for (let i = 0; i < 30 && q.F.p1.st < 8 && q.F.p1.sp && q.F.p1.sp.conn == null; i++) q.step();/* past the EX window (FOCUS in the first frames upgrades to EX instead) */ const fly = q.F.p1.y > 0 || (q.F.p1.sp && q.F.p1.sp.fly); q.step({ jump: 1, h: { jump: 1 } }); for (let i = 0; i < 14 && q.F.p1.state !== 'focus'; i++) q.step({ h: { jump: 1 } });
        check(`${id.padEnd(9)} focus cancel (half the bar)`, fly || (q.F.p1.state === 'focus' && q.F.p1.meter === 50), fly ? 'airborne special: not cancellable' : `${q.F.p1.state}, meter ${q.F.p1.meter}`); }
      { const q = setup(id, 'BLOCK', 140); q.F.p1.x = 192; q.F.p2.x = 229; hold(q, 48); let st = null; for (let i = 0; i < 20; i++) { q.step(); st = st || (['hurt', 'block'].includes(q.F.p2.state) ? q.F.p2.state : null); }
        check(`${id.padEnd(9)} level-3 focus is unblockable`, st === 'hurt', `opponent ${st}`); }
    }
    // EX SPECIALS (Tier 3): hold FOCUS + SP, or FOCUS right after SP. A third of the bar, works on cooldown, harder hits, one hit of armor.
    // (training mode: the dummy stands still; p1's meter refills only while idle, so the cost is read once the move is out)
    const runFree = (q, n, f) => { for (let i = 0; i < n; i++) { q.step(); f && f(); } };
    for (const id of only ? [only] : d.ORDER) {
      const exDmg = ex => { const q = setup(id, 'STAND', 138), F = q.F; let lo = F.p2.hp, m = null; const h0 = F.p2.hp;
        d.startSpecial(F.p1, F.p2, 1, ex); m = F.p1.meter; runFree(q, 140, () => { lo = Math.min(lo, F.p2.hp); }); return { dmg: h0 - lo, meter: m }; };
      const rh = d.ARCH[id].rhythm; d.ARCH[id].rhythm = false;/* Marcus's on-beat bonus would make the two runs differ */ const a = exDmg(false), b = exDmg(true); d.ARCH[id].rhythm = rh;
      check(`${id.padEnd(9)} EX special: costs a third, hits harder`, a.meter - b.meter === 34 && (b.dmg > a.dmg * 1.15 || (a.dmg === 0 && b.dmg === 0)), `normal ${a.dmg.toFixed(1)} dmg, EX ${b.dmg.toFixed(1)} dmg, meter ${a.meter} vs ${b.meter}`);
      { const q = setup(id, 'STAND', 140), F = q.F; F.p1.spCD = 200; q.step({ jump: 1, h: { jump: 1 } }); q.step({ h: { jump: 1 } }); const m0 = F.p1.meter; q.step({ a: 1, b: 1, h: { jump: 1 } });
        const ok = F.p1.state === 'special' && F.p1.sp && F.p1.sp.ex; check(`${id.padEnd(9)} hold FOCUS + SP: EX even on cooldown`, ok && m0 - F.p1.meter === 34, `${F.p1.state}${F.p1.sp && F.p1.sp.ex ? ' EX' : ''}, paid ${m0 - F.p1.meter}`); }
      { const q = setup(id, 'STAND', 140), F = q.F; q.step({ a: 1, b: 1 }); const m0 = F.p1.meter, s0 = F.p1.sp; q.step({ jump: 1, h: { jump: 1 } }); for (let i = 0; i < 16 && !(s0 && s0.ex); i++) q.step();
        check(`${id.padEnd(9)} SP, then FOCUS: upgrades to EX`, !!(s0 && s0.ex) && m0 - F.p1.meter === 34 && F.p1.state === 'special', `${F.p1.state}${s0 && s0.ex ? ' EX' : ''}, paid ${m0 - F.p1.meter}`); }
      { const q = setup(id, 'STAND', 136), F = q.F; d.startSpecial(F.p1, F.p2, 1, true); const s0 = F.p1.sp; F.superFlash = 0; d.startAtk(F.p2, 'jab'); F.p2.state = 'attack'; F.p2.st = 0; const h0 = F.p1.hp;
        let armored = false; const inv = F.p1.inv > 0; for (let i = 0; i < 12; i++) { q.step(); armored = armored || (s0.exArm === 0); }
        check(`${id.padEnd(9)} EX armor absorbs a hit`, inv ? (F.p1.hp === h0 || armored) : armored && F.p1.hp > h0 - 4, inv ? `invincible start (${s0.kind}), took ${(h0 - F.p1.hp).toFixed(1)}` : armored ? `took ${(h0 - F.p1.hp).toFixed(1)}` : `no hit reached him (${s0.kind} moves him out of range)`); }
    }
    const KEY = { focus: ['jump'], cmd: ['a', 'left'], tc: null, jab: ['a'], kick: ['b'], cjab: ['a', 'down'], sweep: ['b', 'down'], leap: ['a', 'right'], ex: ['a+b+jump'], sp1: ['a+b'], sp2: ['a+b', 'down'], sp3: ['a+b', 'left'], super: ['a+b', 'right'] };
    for (const id of only ? [only] : d.ORDER) d.TRIALS[id].forEach((seq, i) => {
      d.RUN = { mode: 'trials', p1: id, ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: id, p2: 'padre', stage: 'padre' });
      const F = d.F, sc = d.scene, orig = d.Fight.__u || (d.Fight.__u = d.Fight.update), upd = orig.bind(sc); sc.update = () => {};
      F.phase = 'play'; F.dummy = 'STAND'; F.trial = { i, step: 0, clear: 0 }; F.p1.x = 100; F.p2.x = 138; F.p1.face = 1; F.p2.face = -1;
      const { held, pressed } = d.inp; const step = (o = {}) => { for (const k of K) { pressed[k] = !!o[k]; held[k] = !!(o.h && o.h[k]); } d.tick(); upd(); };
      for (let k = 0; k < 3; k++) step(); let cleared = false;
      let last = null;
      for (const tag of seq) { const [btn, dir] = tag === 'tc' ? [d.TCM[id].btn] : KEY[tag], chain = (['jab', 'cjab'].includes(last) && ['jab', 'cjab', 'kick', 'sweep'].includes(tag)) || tag === 'tc', sp = /^sp|super|^ex/.test(tag) || chain; let t = 0; last = tag;
        if (sp) { while (!((F.p1.hitDone && F.hitstop === 0) || (F.p1.sp && F.p1.sp.conn != null) || free(F.p1)) && t++ < 80) step(); }
        else while (!free(F.p1) && t++ < 80) step();
        if (tag === 'focus') { step({ jump: 1, h: { jump: 1 } }); for (let k = 0; k < 23; k++) step({ h: { jump: 1 } }); step(); last = tag; continue; }
        if (tag === 'super') { F.p1.meter = 100; for (let k = 0; k < 40 && !(F.p1.sp && F.p1.sp.kind === 'super'); k++) step({ a: 1, b: 1, right: 1, h: { right: 1 } }); cleared = cleared || !!F.trial.clear; continue; }// pressed until it comes out, like a player would
        const prev = F.p1.atk ? F.p1.atk.id : F.p1.sp ? F.p1.sp.id : null, o = { h: {} }; for (const k of btn.split('+')) o[k] = 1; if (dir) { o[dir] = 1; o.h[dir] = 1; }
        if (dir === 'down' && !sp) { step({ down: 1, h: { down: 1 } }); }
        step(o); for (let k = 0; k < 30 && (F.p1.atk ? F.p1.atk.id : F.p1.sp ? F.p1.sp.id : null) === prev; k++) step({ h: dir ? { [dir]: 1 } : {} });
        F.p1.hitDone = false; cleared = cleared || !!F.trial.clear || F.trial.i > i; }
      for (let k = 0; k < 160 && !cleared; k++) { step(); cleared = !!F.trial.clear || F.trial.i > i; }
      check(`${id.padEnd(9)} trial ${i + 1}: ${seq.join(' > ')}`, cleared, cleared ? 'cleared' : `stuck at step ${F.trial.step + 1}`); });
    return out;
  }, process.argv[2]);
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
