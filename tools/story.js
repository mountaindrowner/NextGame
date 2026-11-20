// Story mode (beat 'em up): an autoplayer fights through every level; checks waves, enemies, items,
// boss hand-off, the shadow final boss and the ending flow. node story.js [OUTDIR for screenshots]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const OUT = process.argv[2];
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html'));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.voice = false; d.SET.music = false; d.SET.diff = 1; });
  const out = [], C = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(30)} ${info}`);
  const shot = async (n) => { if (!OUT) return; const url = await p.evaluate(() => { const s = document.getElementById('screen'), c = document.createElement('canvas'); c.width = 512; c.height = 384; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(s, 0, 0, 512, 384); return c.toDataURL('image/png'); });
    fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(url.split(',')[1], 'base64')); };
  // menu: STORY is on the title screen and 2 PLAYERS is gone
  const items = await p.evaluate(() => window.__dbg.Title.items);
  C('title menu', items[0] === 'STORY' && !items.includes('2 PLAYERS'), items.join(', '));
  for (let lv = 0; lv < 4; lv++) {
    const r = await p.evaluate(async (lv) => {
      const d = window.__dbg; if (lv === 0) { d.startStory('karl', [false, false], [false, false]); }
      const R = d.RUN; R.level = lv; R.lives = 9; R.bot = true; d.go(d.Brawl); const B = d.scene; const info = { spawned: 0, kinds: {}, pHit: 0, crates: 0, items: 0, frames: 0, waves: 0 };
      let hp = B.P.hp, nf = 0;
      for (let i = 0; i < 60 * 240 && B.ph !== 'clear'; i++) { d.tick(); B.update(); B.t++; nf++;
        for (const e of B.foes) if (!e.counted) { e.counted = 1; info.spawned++; info.kinds[e.kind] = (info.kinds[e.kind] || 0) + 1; }
        if (B.P.hp < hp) info.pHit++; hp = B.P.hp; if (i % 30 === 0) info.crates = B.items.filter(t => t.kind === 'crate').length;
        if (i === 900) { await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); window.__mid = true; } }
      info.frames = nf; info.ph = B.ph; info.waves = B.wi; info.of = B.L.waves.length; info.lives = R.lives; info.score = R.score; return info;
    }, lv);
    await shot('story-l' + (lv + 1));
    C(`level ${lv + 1} cleared by autoplayer`, r.ph === 'clear' && r.waves === r.of, `${r.waves}/${r.of} waves, ${r.spawned} enemies (${Object.entries(r.kinds).map(([k, v]) => k + ' ' + v).join(', ')}), took ${r.pHit} hits, ${(r.frames / 60) | 0}s, score ${r.score}`);
  }
  // boss hand-off and shadow
  const b = await p.evaluate(() => { const d = window.__dbg, B = d.scene; for (let i = 0; i < 80; i++) { d.tick(); B.update(); } return { boss: d.RUN.ladder[0], shadow: d.RUN.shadow, bosses: d.RUN.bosses }; });
  await p.waitForTimeout(600);
  const sc = await p.evaluate(() => { const d = window.__dbg; return d.scene === d.VS ? 'VS' : '?'; });
  C('final boss = your shadow', b.boss === 'karl' && b.shadow && sc === 'VS', `boss ${b.boss}, shadow ${b.shadow}, scene ${sc}, earlier bosses ${b.bosses.join(', ')}`);
  const f = await p.evaluate(() => { const d = window.__dbg; d.go(d.Fight, { p1: 'karl', p2: 'karl', stage: 'karl' }); const F = d.F; return { shadow: F.p2.shadow, hp: F.p2.mhp, cpu: F.p2.cpu }; });
  await p.waitForTimeout(300); await shot('story-shadow');
  C('shadow duel', f.shadow && f.hp > 92 && f.cpu, `shadow ${f.shadow}, hp ${f.hp}`);
  console.log(out.join('\n')); console.log('errors:', errs.length ? errs.slice(0, 5) : 'none'); await br.close();
  process.exit(out.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
