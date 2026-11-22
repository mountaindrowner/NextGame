// itch.io page: Story mode shots (2x) and Vex's entrance as frames for a GIF.  node tools/story_shots.js
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const out = path.resolve(__dirname, '../release/itch/page/story'); fs.mkdirSync(out + '/vex', { recursive: true });
  const br = await chromium.launch(); const p = await br.newPage({ viewport: { width: 460, height: 860 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const shots = await p.evaluate(() => {
    const d = window.__dbg, o = {}; d.SET.sound = false; d.SET.music = false; d.SET.voice = false;
    const cap = () => { d.render(); return document.getElementById('screen').toDataURL() };
    const run = (B, n) => { for (let i = 0; i < n; i++) { d.tick(); B.update() } };
    const story = (p1, lv) => { d.startStory(p1, [false, false], [false, false]); d.RUN.level = lv; d.go(d.Brawl); const B = d.scene; run(B, 90); return B };
    // 1. Streets: a crowd, the hydrant spraying, a crate
    let B = story('karl', 0); B.foes = []; B.cx = 230; B.P.x = 290; B.P.z = 22; B.P.face = 1;
    for (const [k, x, z] of [['goon', 330, 14], ['shield', 370, 30], ['slinger', 430, 8], ['goon', 250, 36]]) { B.spawn(k); const e = B.foes[B.foes.length - 1]; e.x = x; e.z = z; e.inside = true; e.wait = 999; e.face = e.x > B.P.x ? -1 : 1 }
    const h = B.hyd.find(h => h.x > 300) || B.hyd[0]; if (h) { h.ph = 'spray'; h.len = 70; h.dir = -1 }
    B.P.state = 'attack'; B.P.st = 6; B.P.atk = { ...d.ATK.jab, name: 'jab', s: 5, a: 4, r: 8, id: 1 }; o.streets = cap();
    // 2. the Docks: Paezano's learned-move list and a launcher juggle
    B = story('mateo', 1); B.foes = []; d.RUN.abil = ['keksan', 'ivan']; B.cx = 200; B.P.x = 260; B.P.z = 20;
    for (const [k, x, z] of [['bruiser', 300, 20], ['grappler', 360, 10], ['blade', 420, 34]]) { B.spawn(k); const e = B.foes[B.foes.length - 1]; e.x = x; e.z = z; e.inside = true; e.wait = 999; e.face = -1 }
    const b0 = B.foes[0]; b0.state = 'knock'; b0.st = 10; b0.y = 40; b0.vy = 0; b0.jugMax = 3; b0.floaty = true; B.addT('LAUNCH!', b0.x, b0.z, '#ffe66a'); o.docks = cap();
    // 3. Vex's entrance
    B = story('keksan', 3); B.foes = []; B.wi = 1; B.q = []; B.wave = B.L.waves[1]; B.spawn('vex'); const fr = [];
    for (let t = 0; t < 300 && B.cine; t++) { d.tick(); B.update(); if (t >= 20 && t % 3 === 0) fr.push(cap()) } o.vexFrames = fr;
    // 4. phase 3: the room goes red, the boss bar, a vanish
    const V = B.foes.find(e => e.kind === 'vex'); V.hp = V.mhp * .3; V.phase = 3; run(B, 30); V.state = 'special'; V.st = 4; V.sp = { kind: 'roar', id: 9 }; V.inv = 99; B.P.x = V.x - 60; B.P.z = V.z; d.F.camFlash = 0; o.phase3 = cap();
    return o });
  const save = (u, f) => fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64'));
  for (const k of ['streets', 'docks', 'phase3']) save(shots[k], path.join(out, k + '.png'));
  shots.vexFrames.forEach((u, i) => save(u, path.join(out, 'vex', String(i).padStart(3, '0') + '.png')));
  console.log('frames', shots.vexFrames.length, errs.length ? errs : 'errors: none'); await br.close();
})();
