// The touch stick, with real touch events on a phone-sized page: in fights the zones (wide walk bands, the far
// edge dashes, up jumps, down-back crouch-blocks); in story mode and menus a plain 8-way stick.
// usage: node tools/touch.js
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const br = await chromium.launch(); const ctx = await br.newContext({ viewport: { width: 400, height: 860 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 20000 });
  const res = await p.evaluate(() => {
    const d = window.__dbg, out = [], el = document.getElementById('dpad'), r = el.getBoundingClientRect(), R = r.width / 2, cx = r.left + R, cy = r.top + R;
    const touch = (type, fx, fy) => { const t = new Touch({ identifier: 1, target: el, clientX: cx + fx * R, clientY: cy + fy * R });
      document.dispatchEvent(new TouchEvent(type, { touches: type === 'touchend' ? [] : [t], changedTouches: [t], bubbles: true, cancelable: true })); };
    const read = (fx, fy) => { touch('touchstart', fx, fy); d.poll(); d.tick(); const h = d.inp.held, pr = d.inp.pressed;
      const s = ['up', 'down', 'left', 'right'].filter(k => h[k]).join('+') + (pr.dr || pr.dl || h.dr || h.dl ? ' DASH' : ''); touch('touchend', fx, fy); d.poll(); d.tick(); d.poll(); return s || 'none'; };
    const check = (n, got, want) => out.push(`${got === want ? 'OK  ' : 'FAIL'} ${n.padEnd(44)} ${got}${got === want ? '' : ' (want ' + want + ')'}`);
    // FIGHT
    d.RUN = { mode: 'versus', p1: 'karl', ladder: ['padre'], idx: 0, cont: 0 }; d.go(d.Fight, { p1: 'karl', p2: 'padre', stage: 'karl' }); d.F.phase = 'play';
    check('fight: halfway right walks', read(.6, 0), 'right'); check('fight: far right dashes', read(1.2, 0), 'right DASH');
    check('fight: far left dashes back', read(-1.2, 0), 'left DASH'); check('fight: slightly up-right still walks', read(.6, -.3), 'right');
    check('fight: up jumps', read(0, -.6), 'up'); check('fight: up-forward jumps forward', read(.45, -.45), 'up+right');
    check('fight: down crouches', read(0, .6), 'down'); check('fight: down-back crouch-blocks', read(-.45, .45), 'down+left');
    check('fight: centre is neutral', read(.1, .05), 'none'); check('fight: wider reach (1.6 R) still counts', read(1.6, 0), 'right DASH');
    { d.F.p1.x = 80; d.F.p2.x = 180; touch('touchstart', 1.2, 0); const before = d.F.p1.x; let dashed = false; for (let i = 0; i < 6; i++) { d.poll(); d.tick(); d.F.update(); dashed = dashed || d.F.p1.state === 'dash'; } touch('touchend', 1.2, 0); d.tick();
      check('fight: the edge makes the fighter dash', dashed ? 'dash' : d.F.p1.state, 'dash'); }
    // STORY (beat 'em up): 8-way, no dash
    d.RUN = { mode: 'story', p1: 'karl', level: 0, ladder: [], idx: 0, cont: 0 }; d.go(d.Brawl);
    check('story: slightly up-right walks right', read(.6, -.2), 'right'); check('story: up-right moves diagonally', read(.42, -.42), 'up+right');
    check('story: far right does not dash', read(1.2, 0), 'right'); check('story: up moves in (no jump zone)', read(0, -.6), 'up');
    // MENU
    d.go(d.Options); check('menu: down', read(0, .6), 'down');
    return out; });
  console.log(res.join('\n')); console.log('errors:', errs.length ? errs : 'none'); await br.close();
  process.exit(res.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
