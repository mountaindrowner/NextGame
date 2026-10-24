import { chromium } from '../../node_modules/playwright/index.mjs';
const [,, url, outPrefix] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
await p.goto(url);
await p.waitForFunction(() => window.__ready === true && window.__hd2d.arena, null, { timeout: 120000 });
await p.waitForTimeout(2000);
// advance game time in 1/30 s steps without waiting on the slow renderer
const run = (secs) => p.evaluate((s) => { const a = window.__hd2d.arena; for (let i = 0; i < Math.round(s * 30) && a; i++) a.update(1 / 30); }, secs);
const press = (k) => p.evaluate((key) => { window.dispatchEvent(new KeyboardEvent('keydown', { key })); window.dispatchEvent(new KeyboardEvent('keyup', { key })); }, k);
const state = () => p.evaluate(() => { const a = window.__hd2d.arena; if (!a) return 'ended'; return `me ${a.me.b.integrity}/${a.me.b.stats.integrity} @${a.me.cell.col},${a.me.cell.row} | foe ${a.foe.b.integrity}/${a.foe.b.stats.integrity} @${a.foe.cell.col},${a.foe.cell.row} | warn ${JSON.stringify(a.telegraph)} | ${document.querySelector('.bt-banner')?.textContent}`; });
await run(2.0);
await press('d');
let shot = 0, log = [];
for (let i = 0; i < 40; i++) {
  const s = await p.evaluate(() => { const a = window.__hd2d.arena; return a ? { warn: a.telegraph, me: a.me.cell, foe: a.foe.cell } : null; });
  if (!s) break;
  // a tiny bot: dodge out of red panels, otherwise line up with the foe and fire
  const inDanger = s.warn.some((c) => c.col === s.me.col && c.row === s.me.row);
  if (inDanger) await press(s.me.row > 0 ? 'w' : 's');
  else if (s.me.row !== s.foe.row) await press(s.me.row < s.foe.row ? 's' : 'w');
  await press(['k', 'j', 'l'][i % 3]);
  await run(0.5);
  const st = await state();
  log.push(`${i}: ${st}`);
  if ((i === 3 || i === 9 || s.warn.length) && shot < 4) await p.waitForTimeout(1500), await p.screenshot({ path: `${outPrefix}${shot++}.png` });
  if (st === 'ended' || st.includes('powered down') || st.includes('out of charge')) { await p.waitForTimeout(1500); await p.screenshot({ path: `${outPrefix}end.png` }); break; }
}
console.log(log.join('\n'));
await b.close();
