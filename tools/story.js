// Story mode (beat 'em up): an autoplayer fights through every level; checks waves, enemies, items,
// boss hand-off, the shadow final boss and the ending flow. node story.js [OUTDIR for screenshots]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const OUT = process.argv[2];
(async () => {
  const br = await chromium.launch(); const p = await br.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]));
  await p.goto('file://' + path.resolve(__dirname, '../dist/index.html') + (process.env.LAYOUT ? '?layout=' + process.env.LAYOUT : ''));
  await p.waitForFunction(() => window.__dbg && window.__dbg.CH.karl.spr, null, { timeout: 15000 });
  await p.evaluate(() => { const d = window.__dbg; d.SET.sound = false; d.SET.voice = false; d.SET.music = false; d.SET.diff = 1; });
  const out = [], C = (n, ok, info) => out.push(`${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(30)} ${info}`);
  const shot = async (n) => { if (!OUT) return; const url = await p.evaluate(() => { const s = document.getElementById('screen'), c = document.createElement('canvas'); c.width = 512; c.height = 384; const x = c.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(s, 0, 0, 512, 384); return c.toDataURL('image/png'); });
    fs.writeFileSync(path.join(OUT, n + '.png'), Buffer.from(url.split(',')[1], 'base64')); };
  // menu: STORY is on the title screen and 2 PLAYERS is gone
  const items = await p.evaluate(() => window.__dbg.Title.items);
  C('title menu', items[0] === 'STORY' && !items.includes('2 PLAYERS'), items.join(', '));
  // press A through the cutscene on screen; returns the beats seen
  const talk = async () => p.evaluate(() => { const d = window.__dbg, Cs = d.Cutscene, seen = [];
    for (let i = 0; i < 3000 && d.scene === Cs && Cs.i < Cs.S.beats.length; i++) { const b = Cs.beat(); if (b && !seen.includes(b)) seen.push(b);
      d.inp.pressed.a = i % 3 === 0; Cs.update(); Cs.t++; d.inp.pressed.a = false; } return { k: Cs.k, n: seen.length, of: Cs.S.beats.filter(b => Cs.shows(b)).length }; });
  const sceneName = () => p.evaluate(() => { const d = window.__dbg; return d.scene === d.Cutscene ? 'Cutscene:' + d.Cutscene.k : d.scene === d.Brawl ? 'Brawl' : d.scene === d.VS ? 'VS' : d.scene === d.StoryEnd ? 'StoryEnd' : d.scene === d.Title ? 'Title' : '?'; });
  await p.evaluate(() => window.__dbg.startStory('karl', [false, false], [false, false]));
  let sc0 = await sceneName(); const tk = await talk(); await p.waitForTimeout(500); await shot('story-intro');
  C('prologue cutscene', sc0 === 'Cutscene:intro' && tk.n === tk.of && (await sceneName()) === 'Brawl', `${sc0}, ${tk.n}/${tk.of} beats, then ${await sceneName()}`);
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
    if (lv === 1) { // the Docks boss: Ivan, after a face-off scene
      await p.evaluate(() => { const d = window.__dbg, B = d.scene; for (let i = 0; i < 80; i++) { d.tick(); B.update(); } }); await p.waitForTimeout(600);
      const s1 = await sceneName(); const tk = await talk(); await p.waitForTimeout(600); const s2 = await sceneName();
      const iv = await p.evaluate(() => { const d = window.__dbg; return { boss: d.RUN.ladder[0], roster: d.ORDER.includes('ivan') }; });
      const fb = await p.evaluate(() => { const d = window.__dbg; d.go(d.Fight, { p1: 'karl', p2: 'ivan', stage: 'ivan' }); const F = d.F; return { hp: F.p2.mhp, boss: !!F.p2.boss, cpu: F.p2.cpu, spr: !!d.CH.ivan.spr }; });
      C('Docks boss: Ivan', s1 === 'Cutscene:ivan' && tk.n === tk.of && s2 === 'VS' && iv.boss === 'ivan' && !iv.roster && fb.boss && fb.hp > 118 && fb.cpu && fb.spr,
        `${s1}, ${tk.n}/${tk.of} beats, then ${s2}; boss ${iv.boss} (on roster: ${iv.roster}), hp ${fb.hp}, sprites ${fb.spr}`);
      await p.evaluate(() => { const d = window.__dbg; d.go(d.Brawl); }); }
    if (lv === 0) { // your first rival: a face-off scene, then the duel
      await p.evaluate(() => { const d = window.__dbg, B = d.scene; for (let i = 0; i < 80; i++) { d.tick(); B.update(); } }); await p.waitForTimeout(600);
      const s1 = await sceneName(); const tk = await talk(); await p.waitForTimeout(600); const s2 = await sceneName(); const who = await p.evaluate(() => [window.__dbg.RUN.ladder[0], window.__dbg.ARCS.karl.r1]);
      C('rival 1: face-off, then duel', s1 === 'Cutscene:rival1' && tk.n === tk.of && s2 === 'VS' && who[0] === who[1], `${s1}, ${tk.n}/${tk.of} beats, then ${s2} vs ${who[0]}`);
      await p.evaluate(() => { const d = window.__dbg; d.go(d.Brawl); const B = d.scene; B.ph = 'clear'; }); }
    if (lv === 0) { const m = await p.evaluate(() => window.__dbg.RUN.mercy); C('mercy: helped the last man up', !!m && !!m.name, m ? `${m.name} the ${m.kind}` : 'nobody spared'); }
    C(`level ${lv + 1} cleared by autoplayer`, r.ph === 'clear' && r.waves === r.of, `${r.waves}/${r.of} waves, ${r.spawned} enemies (${Object.entries(r.kinds).map(([k, v]) => k + ' ' + v).join(', ')}), took ${r.pHit} hits, ${(r.frames / 60) | 0}s, score ${r.score}`);
  }
  // boss hand-off and shadow
  const b = await p.evaluate(() => { const d = window.__dbg, B = d.scene; for (let i = 0; i < 80; i++) { d.tick(); B.update(); } return { boss: d.RUN.ladder[0], shadow: d.RUN.shadow, bosses: d.RUN.bosses }; });
  await p.waitForTimeout(600);
  const sc1 = await sceneName(); const tk2 = await talk(); await p.waitForTimeout(600); const sc = await sceneName();
  C('final boss = your shadow', b.boss === 'karl' && b.shadow && sc1 === 'Cutscene:shadow' && tk2.n === tk2.of && sc === 'VS', `boss ${b.boss}, shadow ${b.shadow}, ${sc1} then ${sc}, earlier bosses ${b.bosses.join(', ')}`);
  // every chapter cutscene plays between levels (Result -> next chapter)
  for (const lv of [1, 2, 3]) { await p.evaluate(lv => { const d = window.__dbg; d.RUN.level = lv - 1; d.go(d.Result, 0, { p1: 'karl', p2: 'padre', stage: 'karl' }); d.Result.next(); }, lv);
    const s1 = await sceneName(); const t3 = await talk(); await p.waitForTimeout(500); let s2 = await sceneName(), t4 = { n: 0, of: 0 };
    if (s1.includes('post')) { t4 = await talk(); await p.waitForTimeout(500); }
    const want = ['', 'Cutscene:post1', 'Cutscene:ch3', 'Cutscene:post3'][lv], next = ['', 'Cutscene:ch2', 'Brawl', 'Cutscene:final'][lv];
    C(`after duel ${lv}: ${want.slice(9)}`, s1 === want && t3.n === t3.of && s2 === next && (await sceneName()) === 'Brawl', `${s1} (${t3.n}/${t3.of}) -> ${s2}${t4.of ? ` (${t4.n}/${t4.of})` : ''} -> ${await sceneName()}`); }
  // every fighter has a story: two rivals of their own, a personal scene in every act
  const arcs = await p.evaluate(() => { const d = window.__dbg, out = {}, keep = d.RUN; for (const id of d.ORDER) { const A = d.ARCS[id]; d.startStory(id, [0, 0], [0, 0]);
      out[id] = { r: d.RUN.bosses.join('/'), ok: !!A && d.ORDER.includes(A.r1) && d.ORDER.includes(A.r3) && A.r1 !== id && A.r3 !== id && A.r1 !== A.r3 && A.why.length >= 2 && !!A.shadow && !!A.end }; } d.RUN = keep; return out; });
  C('every fighter has an arc', Object.values(arcs).every(a => a.ok), Object.entries(arcs).map(([k, v]) => `${k} ${v.r}${v.ok ? '' : ' MISSING'}`).join(', '));
  // the ending: beat the shadow, offer your hand, the chapel, the credits
  await p.evaluate(() => { const d = window.__dbg; d.RUN.level = 3; d.RUN.vexLit = false; d.go(d.Result, 0, { p1: 'karl', p2: 'karl', stage: 'karl' }); d.Result.next(); });
  const s2 = await sceneName(); const t4 = await talk(); await p.waitForTimeout(600);
  const end = await p.evaluate(() => { const d = window.__dbg; return { lit: d.RUN.vexLit, badge: !!d.rec.badges.story, story: d.rec.ch.karl.story || 0 }; });
  C('ending: offer your hand', s2 === 'Cutscene:ending' && t4.n === t4.of && end.lit, `${s2}, ${t4.n}/${t4.of} beats, Vex redeemed ${end.lit}`);
  const s3 = await sceneName(); await p.evaluate(() => { const d = window.__dbg, E = d.StoryEnd; E.t = E.stop + 60; }); await p.waitForTimeout(200); await shot('story-credits');
  await p.evaluate(() => { const d = window.__dbg; d.inp.pressed.start = true; d.StoryEnd.update(); d.inp.pressed.start = false; }); await p.waitForTimeout(900);
  C('credits, THE END, back to title', s3 === 'StoryEnd' && end.badge && end.story > 0 && (await sceneName()) === 'Title', `${s3}, badge REDEEMED ${end.badge}, story clears ${end.story}, then ${await sceneName()}`);
  const f = await p.evaluate(() => { const d = window.__dbg; d.go(d.Fight, { p1: 'karl', p2: 'karl', stage: 'karl' }); const F = d.F; return { shadow: F.p2.shadow, hp: F.p2.mhp, cpu: F.p2.cpu }; });
  await p.waitForTimeout(300); await shot('story-shadow');
  C('shadow duel', f.shadow && f.hp > 92 && f.cpu, `shadow ${f.shadow}, hp ${f.hp}`);
  // henchman variety: sizes, outfits and headgear vary; no weapons in Story mode (none carried, none dropped)
  const v = await p.evaluate(() => { const d = window.__dbg; d.startStory('karl', [0, 0], [0, 0]); d.RUN.level = 1; d.go(d.Brawl); const B = d.scene; B.ph = 'play';
    const keys = new Set(), sizes = new Set(); let armed = 0; for (const k of ['goon', 'bruiser', 'blade', 'enforcer', 'chain']) for (let i = 0; i < 12; i++) { B.spawn(k); const e = B.foes.pop(); if (e.vari) { keys.add(e.vari.key); sizes.add(e.vari.sc); if (e.vari.w) armed++; } }
    B.spawn('goon'); const e = B.foes[0]; e.x = B.P.x + 30; e.z = B.P.z; B.hitFoe(e, 1, true, 1); const drops = B.items.filter(it => it.kind.startsWith('w_')).length;
    return { keys: keys.size, sizes: sizes.size, armed, drops }; });
  C('henchman variety', v.keys >= 10 && v.sizes >= 3, `${v.keys} different looks and ${v.sizes} sizes`);
  C('no weapons in Story mode', v.armed === 0 && v.drops === 0, `${v.armed} of 60 henchmen armed, ${v.drops} weapons dropped`);
  console.log(out.join('\n')); console.log('errors:', errs.length ? errs.slice(0, 5) : 'none'); await br.close();
  process.exit(out.some(l => l.startsWith('FAIL')) || errs.length ? 1 : 0);
})();
