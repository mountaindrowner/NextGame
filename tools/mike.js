// Mike-Fila's kit does its job: Order Up! (tray), Combo Meal (lobbed sandwich, snack heal), Lemonade Splash (sticky slow),
// Mascot Mode (cow suit: stronger, tougher, no knockdowns, Stampede, back to normal when the shift ends).  node tools/mike.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const out = await p.evaluate(() => {
    const d = window.__dbg, res = []; d.SET.sound = false; d.SET.music = false; d.SET.voice = false;
    const C = (n, ok, info) => res.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(36)} ${info}`);
    const setup = (a, b, x1 = 100, x2 = 140) => { d.RUN = { mode: 'training', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: a });
      const F = d.F, sc = d.scene, upd = (d.Fight.__u || (d.Fight.__u = d.Fight.update)).bind(sc); sc.update = () => {}; F.phase = 'play'; F.dummy = 'STAND';
      F.p1.x = x1; F.p2.x = x2; F.p1.face = 1; F.p2.face = -1; F.p2.cpu = false; F.p1.cpu = false; const step = n => { for (let i = 0; i < n; i++) { d.tick(); upd() } }; step(2); return { F, step } };
    const m = d.CH.mike;
    C('roster entry', d.ORDER.includes('mike') && m.anim && m.anim.special && m.anim.suitup, `anims ${Object.keys(m.anim || {}).length}`);
    C('cow suit sprite set', !!(d.CH.mikecow && d.CH.mikecow.anim && d.CH.mikecow.anim.special && d.CH.mikecow.anim.cpunch), `anims ${Object.keys((d.CH.mikecow || {}).anim || {}).length}`);
    // Order Up!: a tray flies across the screen and hits
    { const { F, step } = setup('mike', 'karl', 60, 200); const h0 = F.p2.hp; d.startSpecial(F.p1, F.p2, 1); let tray = false;
      for (let i = 0; i < 80; i++) { step(1); if (F.proj.some(q => q.kind === 'tray')) tray = true }
      C('ORDER UP (tray projectile)', tray && F.p2.hp < h0, `tray ${tray}, damage ${(h0 - F.p2.hp).toFixed(1)}`) }
    // Combo Meal: lobbed, an overhead (a crouching block doesn't stop it)
    { const { F, step } = setup('mike', 'karl', 80, 170); F.p2.state = 'crouch'; F.p2.crouch = true; F.p2.holdBack = true; const h0 = F.p2.hp; d.startSpecial(F.p1, F.p2, 2);
      for (let i = 0; i < 90; i++) { if (F.p2.state === 'crouch' || F.p2.state === 'idle') { F.p2.crouch = true; F.p2.state = 'crouch' } step(1) }
      C('COMBO MEAL (overhead lob)', F.p2.hp < h0, `crouch-blocking: damage ${(h0 - F.p2.hp).toFixed(1)}`) }
    // a sandwich that misses lands as a snack; Mike walks over it and heals
    { const { F, step } = setup('mike', 'karl', 60, 230); F.p1.hp = 50; d.startSpecial(F.p1, F.p2, 2); F.p2.x = 250; F.p2.inv = 400;// it misses
      let snack = null; for (let i = 0; i < 170; i++) { step(1); snack = snack || F.proj.find(q => q.kind === 'snack') }
      let healed = false; if (snack) { F.p2.x = 30; F.p1.x = snack.x - 20; for (let i = 0; i < 30; i++) { F.p1.x += 1; step(1); if (F.p1.hp > 50) healed = true } }
      C('SNACK BREAK (dropped sandwich heals)', !!snack && healed, `snack ${!!snack}, hp 50 -> ${F.p1.hp.toFixed(1)}`) }
    // Lemonade Splash: short range, makes them sticky (slow)
    { const { F, step } = setup('mike', 'karl', 100, 140); const h0 = F.p2.hp; d.startSpecial(F.p1, F.p2, 4); step(30);
      C('LEMONADE SPLASH (sticky)', F.p2.hp < h0 && F.p2.sticky > 0, `damage ${(h0 - F.p2.hp).toFixed(1)}, sticky ${F.p2.sticky}`) }
    // Mascot Mode: the suit goes on, the smoke knocks back a close opponent, then he's stronger and tougher
    { const { F, step } = setup('mike', 'karl', 100, 140); F.p1.meter = 100; const h0 = F.p2.hp; d.startSuper(F.p1, F.p2); step(110);
      C('MASCOT MODE (suits up)', F.p1.c === d.CH.mikecow && F.p1.mascot > 400 && F.p2.hp < h0, `suit ${F.p1.c === d.CH.mikecow}, timer ${F.p1.mascot}, smoke damage ${(h0 - F.p2.hp).toFixed(1)}`);
      // every special is a Stampede; it knocks down
      F.p2.x = F.p1.x + 60; F.p2.state = 'idle'; F.p2.stun = 0; F.p2.y = 0; step(40); F.p1.spCD = 0; const h1 = F.p2.hp; d.startSpecial(F.p1, F.p2, 2); const kind = F.p1.sp && F.p1.sp.kind; let st = null;
      for (let i = 0; i < 40; i++) { step(1); st = st || (F.p2.state === 'knock' ? 'knock' : null) }
      C('STAMPEDE (in the suit)', kind === 'stampede' && F.p2.hp < h1 && st === 'knock', `kind ${kind}, damage ${(h1 - F.p2.hp).toFixed(1)}, ${st}`);
      // the suit: a sweep (a knockdown move) doesn't knock him down, and he takes less damage
      F.p1.state = 'idle'; F.p1.stun = 0; F.p1.y = 0; step(30); const hp1 = F.p1.hp;
      d.applyHit(F.p2, F.p1, { dmg: 10, stun: 20, bs: 10, kb: 2, lv: 'mid', knock: true }, F.p1.x, 150); step(2);
      C('MASCOT ARMOR (no knockdown, -25%)', F.p1.state !== 'knock' && hp1 - F.p1.hp < 10 * 0.8, `state ${F.p1.state}, took ${(hp1 - F.p1.hp).toFixed(1)} of 10`);
      // the shift ends: back to the uniform
      F.p1.mascot = 3; F.p1.state = 'idle'; step(10);
      C("SHIFT'S OVER (suit comes off)", F.p1.c === d.CH.mike && !F.p1.mascot, `back to ${F.p1.c.skinKey || F.p1.c.id}`) }
    return res });
  console.log(out.join('\n')); console.log(errs.length ? 'errors:\n' + errs.join('\n') : 'errors: none'); await br.close();
})();
