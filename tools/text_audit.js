// Text audit: draws every screen (for every fighter where it matters) and flags text that runs off the
// screen, out of the box it sits in, or uses a character the pixel font doesn't have. node text_audit.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  const res = await p.evaluate(() => {
    const d = window.__dbg, W = 256, H = 192, bad = [], seen = new Set(); let screens = 0;
    d.SET.sound = false; d.SET.voice = false; d.SET.music = false;
    const check = (name) => { screens++; d.clearToast && d.clearToast(); const A = d.textAudit(true); try { d.render(); } catch (e) { bad.push(`${name}: render error ${e.message}`); } d.textAudit(false);
      for (const t of A.t) { const tag = `${name}: "${t.s}"`; let why = null;
        if (t.miss) why = `missing glyph(s) ${t.miss}`;
        else if (t.x < -1 || t.x + t.w > W + 1) why = `off screen x ${t.x}..${t.x + t.w}`;
        else if (t.y < -1 || t.y + t.h > H + 1) why = `off screen y ${t.y}..${t.y + t.h}`;
        else { const inb = A.b.slice(0, t.nb).filter(b => t.x + 1 >= b.x && t.x + 1 <= b.x + b.w && t.y + 1 >= b.y && t.y + 1 <= b.y + b.h).sort((a, b) => a.w * a.h - b.w * b.h)[0];
          if (inb && (t.x + t.w > inb.x + inb.w + 0.5 || t.y + t.h > inb.y + inb.h + 0.5)) why = `out of its box (${inb.x},${inb.y} ${inb.w}x${inb.h}) by ${Math.max(t.x + t.w - inb.x - inb.w, t.y + t.h - inb.y - inb.h) | 0}px`; }
        if (why) { const k = name.split(' ')[0] + t.s + why.split(' ')[0]; if (!seen.has(k)) { seen.add(k); bad.push(`${tag} ${why}`); } } } };
    const at = (scene, t, fn) => { d.go(scene, ...(fn ? [] : [])); };
    const O = d.ORDER;
    d.go(d.Title); d.Title.t = 99; check('title'); d.Title.ph = 'menu'; check('title-menu');
    d.go(d.Intro); for (const t of [40, 120, 200, 300, 400]) { d.Intro.t = t; check('intro@' + t); }
    d.go(d.Options); check('options'); d.go(d.Records); check('records');
    for (const mode of ['arcade', 'vs', 'story', 'training']) { d.go(d.Select, mode); d.Select.slide = 0; for (let i = 0; i < O.length; i++) { d.Select.cur = i; d.Select.t = 200; check(`select-${mode}-${O[i]}`); } }
    for (let i = 0; i < O.length; i++) { const a = O[i], b = O[(i + 1) % O.length];
      d.RUN = { mode: 'arcade', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.VS); d.VS.t = 120; check(`vs-${a}-${b}`);
      d.go(d.Fight, { p1: a, p2: b, stage: a }); const F = d.F; F.phase = 'play'; F.pt = 300; check(`fight-${a}`); F.paused = true; F.psel = 0; check(`pause-${a}`); F.paused = false;
      d.RUN = { mode: 'trials', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Fight, { p1: a, p2: b, stage: a }); d.F.phase = 'play'; d.F.pt = 300; for (let k = 0; k < 3; k++) { if (d.F.trial) d.F.trial.i = k; check(`trial${k + 1}-${a}`); }
      d.RUN = { mode: 'arcade', p1: a, ladder: [b], idx: 0, cont: 0 }; d.go(d.Result, 0, { p1: a, p2: b, stage: a }); d.Result.t = 400; check(`result-win-${a}`);
      d.go(d.Result, 1, { p1: a, p2: b, stage: b }); d.Result.t = 400; check(`result-lose-${a}`);
      d.go(d.Ending); for (const t of [100, 400, 900, 1600]) { d.Ending.t = t; check(`ending@${t}-${a}`); }
      d.startStory(a, [0, 0], [0, 0]); for (let lv = 0; lv <= 4; lv++) { d.RUN.level = lv; d.go(d.StoryCard); d.StoryCard.t = 400; d.StoryCard.n = 9999; check(`story-card${lv}-${a}`); }
      d.RUN.level = 0; d.go(d.Brawl); const B = d.scene; check(`brawl-intro-${a}`); B.ph = 'play'; B.goT = 100; check(`brawl-${a}`); B.paused = true; check(`brawl-pause-${a}`); B.paused = false;
      B.ph = 'continue'; check(`brawl-continue-${a}`); B.ph = 'clear'; check(`brawl-clear-${a}`); }
    d.RUN = { mode: 'arcade', p1: 'karl', ladder: ['ivan'], idx: 0, cont: 0 }; d.go(d.Continue); d.Continue.t = 10; check('continue'); d.go(d.GameOver); d.GameOver.t = 50; check('gameover');
    for (const ph of ['menu', 'host', 'join', 'msg']) { d.go(d.Online); d.Online.ph = ph; d.Online.msg = 'COULD NOT REACH THE MATCHMAKING SERVER'; d.NET.code = 'ABCD'; d.NET.status = 'waiting'; check('online-' + ph); }
    d.go(d.Title); return { bad, screens };
  });
  console.log(`checked ${res.screens} screens`); console.log(res.bad.length ? res.bad.join('\n') : 'no text problems');
  console.log('errors:', errs.length ? errs.slice(0, 5) : 'none'); await br.close(); process.exit(res.bad.length || errs.length ? 1 : 0);
})();
