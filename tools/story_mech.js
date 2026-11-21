// Story mode (beat 'em up) mechanics from the v1.40 research pass: each one set up directly and checked.
// node tools/story_mech.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = await p.evaluate(() => {
    const d = window.__dbg, K = ['up', 'down', 'left', 'right', 'a', 'b', 'start', 'select', 'tap', 'jump', 'dl', 'dr'], res = [];
    d.SET.sound = false; d.SET.voice = false; d.SET.music = false; d.SET.diff = 1;
    const C = (n, ok, info) => res.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(36)} ${info}`);
    // a fresh stage with the waves switched off; foes placed by hand
    const FZ0 = 48;
    const stage = (lv = 0) => { d.startStory('karl', [false, false], [false, false]); const R = d.RUN; R.level = lv; R.lives = 3; d.go(d.Brawl); const B = d.scene;
      B.ph = 'play'; B.pt = 100; B.L = { ...B.L, waves: [{ at: 0, foes: [] }] }; B.wave = B.L.waves[0]; B.q = []; B.wi = 0; B.items = []; B.hyd = []; B.P.inv = 0; B.P.x = 100; B.P.z = 18; B.P.face = 1;
      const step = (o = {}) => { for (const k of K) { d.inp.pressed[k] = !!o[k]; d.inp.held[k] = !!(o.h && o.h[k]); } d.tick(); B.update(); };
      const foe = (kind, x, z = 18) => { B.spawn(kind); const e = B.foes[B.foes.length - 1]; e.x = x; e.z = z; e.inside = true; e.wait = 999; e.tok = false; e.vari = null; e.reachB = 0; e.dmgM = 1; e.H = d.FOES[kind] ? e.H : e.H; return e; };
      return { B, P: B.P, step, foe }; };
    const run = (q, n, o) => { for (let i = 0; i < n; i++) q.step(o); };

    // 1. forgiving depth: a jab lands 12 px off your line (it used to need 10 or less)
    { const q = stage(), e = q.foe('goon', 130, 30); const h0 = e.hp; q.step({ a: 1 }); run(q, 20); C('forgiving depth (12 px off line)', e.hp < h0, `hp ${h0.toFixed(0)} -> ${e.hp.toFixed(0)}`); }
    // 2. back attack: JUMP + A hits the man behind you and knocks him down
    { const q = stage(), e = q.foe('goon', 75); const h0 = e.hp; q.step({ jump: 1 }); q.step({ a: 1 }); let st = null; for (let i = 0; i < 24; i++) { q.step(); st = st || (e.state === 'knock' ? 'knock' : null); }
      C('back attack (JUMP + A)', e.hp < h0 && st === 'knock', `hp ${h0.toFixed(0)} -> ${e.hp.toFixed(0)}, ${st}`); }
    // 3. launcher: A, A, JUMP pops him up and he can be juggled
    { const q = stage(), e = q.foe('goon', 128); e.hp = e.mhp = 200; q.step({ a: 1 }); let t = 0; while (!q.P.hitDone && t++ < 20) q.step(); q.step({ a: 1 }); t = 0; while (!(q.P.hitDone && q.P.chainN === 1) && t++ < 20) q.step(); q.step({ jump: 1 });
      let peak = 0, jm = 0; for (let i = 0; i < 60 && !(peak > 30 && e.vy < 0 && e.y < 52); i++) { q.step(); peak = Math.max(peak, e.y); jm = Math.max(jm, e.jugMax || 0); }
      q.P.state = 'idle'; q.P.atk = null; q.P.x = e.x - 28; q.P.face = 1; q.step({ a: 1 }); let jug = false; for (let i = 0; i < 14; i++) { q.step(); jug = jug || (e.jug || 0) >= 1; }
      C('launcher (A, A, JUMP) + juggle', peak > 30 && jm === 3 && jug, `height ${peak.toFixed(0)}, juggle hits allowed ${jm}, juggled ${jug}`); }
    // 4. sidestep: tap down twice slips out of the line, untouchable while moving
    { const q = stage(); q.P.z = 6; q.step({ down: 1, h: { down: 1 } }); q.step(); q.step({ down: 1, h: { down: 1 } }); const inv = q.P.inv; run(q, 10); C('sidestep (tap down twice)', q.P.z > 25 && inv > 0, `z 6 -> ${q.P.z.toFixed(0)}, invincible ${inv} frames`); }
    // 5. desperation: the health goes grey and comes back as you land hits; a hit takes it away
    { const q = stage(); q.foe('goon', 140); q.foe('goon', 150, 22); const h0 = q.P.hp; q.step({ a: 1, b: 1 }); const h1 = q.P.hp, g1 = q.P.grey; run(q, 34);
      for (let k = 0; k < 4; k++) { const e = q.B.foes.find(f => !f.dead && f.state !== 'knock' && f.state !== 'down'); if (e) { e.x = q.P.x + 26; e.z = q.P.z; } q.step({ a: 1 }); run(q, 18); }
      C('desperation costs grey health', h1 < h0 && g1 > 0 && q.P.hp > h1, `hp ${h0} -> ${h1} (grey ${g1}), after hits ${q.P.hp.toFixed(1)}`);
      q.P.grey = 4; q.P.inv = 0; q.P.state = 'idle'; q.B.hurtP(2, false, 1); C('a hit burns the grey health', q.P.grey === 0, `grey ${q.P.grey}`); }
    // 6. telegraph: committed enemy attacks show "!" first
    { const q = stage(), e = q.foe('bruiser', 180); e.state = 'special'; e.st = 0; e.sp = { kind: 'charge', id: 1 }; const w = q.B.windup(e); C('telegraph (! before charges)', w === true, `windup ${w}`); }
    // 7. RIOT: front hits are blocked, a jump kick gets over, and two blocks earn a bash
    { const q = stage(), e = q.foe('shield', 130); e.face = -1; const h0 = e.hp; q.step({ a: 1 }); run(q, 16); const blocked = e.hp === h0; q.P.state = 'idle'; e.x = q.P.x + 30; q.step({ a: 1 }); run(q, 16);
      C('RIOT blocks frontal hits, bashes back', blocked && (e.state === 'special' && e.sp.kind === 'bash' || e.blockN === 0), `hp ${e.hp.toFixed(0)}/${h0.toFixed(0)}, state ${e.state} ${e.sp ? e.sp.kind : ''}`);
      const q2 = stage(), e2 = q2.foe('shield', 150); e2.face = -1; const h2 = e2.hp; q2.step({ jump: 1, right: 1, h: { right: 1 } }); let t = 0; while (q2.P.state !== 'jump' && t++ < 10) q2.step({ h: { right: 1 } }); run(q2, 6, { h: { right: 1 } }); q2.step({ b: 1 }); run(q2, 30);
      C('RIOT: a jump kick gets over the shield', e2.hp < h2, `hp ${h2.toFixed(0)} -> ${e2.hp.toFixed(0)}`); }
    // 8. GRAPPLER: grabs, mashing breaks free; no mashing = slam
    { const q = stage(), e = q.foe('grappler', 124); e.tok = true; e.wait = 0; e.cool = 0; let held = false; for (let i = 0; i < 40 && !held; i++) { q.step(); held = q.P.state === 'grabbed'; }
      let esc = false; for (let i = 0; i < 40 && !esc; i++) { q.step({ a: i % 2 === 0 }); esc = q.P.state !== 'grabbed'; }
      C('GRAPPLER grabs, mash A/B to escape', held && esc && q.P.hp === q.P.mhp, `held ${held}, escaped ${esc}, hp ${q.P.hp}/${q.P.mhp}`);
      const q2 = stage(), e2 = q2.foe('grappler', 124); e2.tok = true; e2.wait = 0; e2.cool = 0; let h2 = false; for (let i = 0; i < 40 && !h2; i++) { q2.step(); h2 = q2.P.state === 'grabbed'; } run(q2, 90);
      C('GRAPPLER slams if you don\'t mash', h2 && q2.P.hp < q2.P.mhp, `hp ${q2.P.hp.toFixed(0)}/${q2.P.mhp}`); }
    // 9. MEDIC heals and pumps up the henchmen near him
    { const q = stage(), g = q.foe('goon', 220), m = q.foe('medic', 200); g.hp = 5; m.cool = 0; m.wait = 0; run(q, 60); C('MEDIC heals and pumps up allies', g.hp > 5 && g.pump > 0, `goon hp 5 -> ${g.hp.toFixed(0)}, pumped ${g.pump > 0}`); }
    // 10. trash can: hit it and it rolls, bowling over the henchmen in its path
    { const q = stage(), e = q.foe('goon', 190); q.B.items.push({ kind: 'can', x: 128, z: 18, y: 0 }); const h0 = e.hp; q.step({ a: 1 }); for (let i = 0; i < 40; i++) { if (e.state === 'walk' || e.state === 'idle') { e.x = 190; e.z = 18; } q.step(); }
      C('trash can rolls and bowls them over', e.hp < h0 && ['knock', 'down'].includes(e.state), `goon hp ${h0.toFixed(0)} -> ${e.hp.toFixed(0)}, ${e.state}`); }
    // 11. Streets hydrant: the jet knocks down everyone in the front lane
    { const q = stage(0), e = q.foe('goon', 170, FZ0 - 2); e.hp = e.mhp = 100; q.P.z = 4; q.B.hyd = [{ x: 120, ph: 'warn', t: 2 }]; for (let i = 0; i < 50; i++) { if (e.state === 'walk' || e.state === 'idle') { e.z = FZ0 - 2; e.x = 170; } q.step(); }
      C('Streets hydrant knocks them down', e.hp < 100 && q.P.hp === q.P.mhp, `goon hp 100 -> ${e.hp.toFixed(0)}, you ${q.P.hp}/${q.P.mhp} (out of the lane)`); }
    // 12. Vex Tower wet floor: a henchman who walks onto it slips; you slide
    { const q = stage(2), e = q.foe('goon', 330, 18); e.hp = e.mhp = 100; q.P.x = 200; for (let i = 0; i < 90 && e.hp === 100; i++) { e.tok = false; q.step(); }
      const q3 = stage(2); q3.P.x = 250; q3.P.state = 'idle'; const P = q3.P; for (let i = 0; i < 10; i++) q3.step({ h: { right: 1 } }); const v1 = P.vx; for (let i = 0; i < 6; i++) q3.step(); const slide = Math.abs(P.vx) > .2;
      C('wet floor: they slip, you slide', e.hp < 100 && v1 < 1.4 && slide, `goon hp 100 -> ${e.hp.toFixed(0)}, your speed builds to ${v1.toFixed(2)}, still sliding after letting go ${slide}`); }
    // 13. allies: the last man of a wave kneels; help him up, then SELECT sends him in
    { const q = stage(1), e = q.foe('goon', 130); e.hp = 1; q.step({ a: 1 }); run(q, 100); const knelt = e.state === 'yield' && e.ally;
      q.P.x = e.x - 24; q.P.z = e.z; q.P.state = 'idle'; q.step({ a: 1 }); const got = d.RUN.allyQ.length; run(q, 10);
      const t = q.foe('goon', 190); const h0 = t.hp; q.step({ select: 1 }); run(q, 70);
      C('mercy ally: help up, then SELECT', knelt && got === 1 && t.hp < h0 && d.RUN.allyQ.length === 0, `knelt ${knelt}, allies ${got}, tackled ${h0.toFixed(0)} -> ${t.hp.toFixed(0)}`); }
    // 15. block: hold JUMP to guard; a hit from the front does nothing, enough of them break the guard
    { const q = stage(), e = q.foe('goon', 126); e.face = -1; for (let i = 0; i < 9; i++) q.step({ jump: i === 0, h: { jump: 1 } }); const st = q.P.state, h0 = q.P.hp; const r = q.B.hurtP(6, false, -1), h1 = q.P.hp;
      for (let i = 0; i < 4; i++) q.B.hurtP(6, false, -1); C('block (hold JUMP), guard break', st === 'block' && r === 'block' && h1 === h0 && q.P.state === 'hurt', `${st}, hit -> ${r}, hp ${h1}/${h0}, after 5 hits ${q.P.state}`);
      const q2 = stage(); q2.step({ jump: 1, h: { jump: 1 } }); q2.step(); let jumped = false; for (let i = 0; i < 8; i++) { q2.step(); jumped = jumped || q2.P.state === 'jump'; } C('a tap of JUMP still jumps', jumped, q2.P.state); }
    // 16. throw: grab, then a lift over the head and a sling (forward or behind)
    { const q = stage(), e = q.foe('goon', 116); e.state = 'hurt'; e.stun = 40; q.step({ a: 1 }); const grabbed = q.P.state === 'throwing'; q.step({ a: 1, left: 1, h: { left: 1 } }); let top = 0, rot = 0;
      for (let i = 0; i < 18; i++) { q.step(); top = Math.max(top, e.y); rot = Math.max(rot, Math.abs(e.rot || 0)); } let flew = false; for (let i = 0; i < 20; i++) { q.step(); flew = flew || e.state === 'knock'; }
      C('animated throw (lift, spin, sling)', grabbed && top > 40 && rot > 2 && flew && e.x < q.P.x, `grab ${grabbed}, lifted ${top.toFixed(0)} px, spun ${rot.toFixed(1)} rad, thrown behind ${e.x < q.P.x}`); }
    // 17. nobody dies: a beaten henchman gets up dazed and staggers off the screen
    { const q = stage(1); q.foe('goon', 130); const x = q.foe('goon', 220); x.hp = 1; x.wait = 999; q.B.hitFoe(x, 5, true, 1); let dz = false, gone = false; for (let i = 0; i < 300; i++) { q.step(); dz = dz || !!x.dazed; gone = gone || x.dead; }
      C('KO: up dazed, staggers off', dz && gone, `dazed ${dz}, left the screen ${gone}`); }
    // 18. rides: at the end of the stage you board the subway car; its waves clear the stage
    { const q = stage(0); q.B.L = d.LEVELS[0]; q.B.wi = q.B.L.waves.length; q.B.wave = null; q.B.rf = 21; q.step(); const R = q.B.ride; let n = 0;
      for (let i = 0; i < 4000 && q.B.ph !== 'clear'; i++) { for (const e of q.B.foes) if (!e.dead && !e.ko && e.state !== 'leave') { e.hp = 0.1; e.inv = 0; if (q.B.hitFoe(e, 1, true, 1, null, { env: true })) n++; else if (e.state === 'yield') { e.state = 'leave'; e.st = 60; } } q.step(); }
      C('ride: subway car to the end', !!R && R.kind === 'train' && q.B.ph === 'clear' && n >= 7, `ride ${R && R.kind}, ${n} enemies, ${q.B.ph}`); }
    // 19. screen smash: grab + DOWN + A throws him at the camera; he splats on the glass and slides away
    { const q = stage(1), e = q.foe('goon', 126); e.state = 'hurt'; e.stun = 60; q.step({ a: 1 }); q.step(); q.step({ a: 1, down: 1, h: { down: 1 } }); const sm = !!e.smash; let cracks = 0;
      for (let i = 0; i < 140 && !e.dead; i++) { q.step(); cracks = Math.max(cracks, e.smash ? e.smash.cr.length : 0); }
      C('screen smash (grab + DOWN + A)', sm && cracks > 5 && e.dead, `flew at the screen ${sm}, cracks ${cracks}, gone ${!!e.dead}`); }
    // 14. results: a rank and a bonus when the stage is clear
    { const q = stage(); q.B.stat = { f: 54 * 50, dmg: 5, maxC: 9, spared: 1, lost: 0 }; q.B.ph = 'clear'; q.B.doneT = 0; run(q, 45); const r = q.B.res;
      C('stage results: rank + bonus', !!r && r.r === 'S' && r.bonus === 5000, r ? `rank ${r.r}, bonus ${r.bonus}` : 'no results'); }
    return res;
  });
  console.log(out.join('\n'));
  console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none');
  await br.close();
})();
