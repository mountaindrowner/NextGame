import { chromium } from '../../node_modules/playwright/index.mjs';
const [,, url, out] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
await p.goto(url);
await p.waitForFunction(() => window.__ready === true && window.__hd2d.arena && window.__hd2d.arena.ready, null, { timeout: 180000 });
// step the battle clock until the foe winds up an attack
const warned = await p.evaluate(() => { const a = window.__hd2d.arena; for (let i = 0; i < 30 * 12; i++) { a.update(1 / 30); if (a.telegraph.length && a.foeWind && a.foeWind.at - a.t < 0.5) return true; } return false; });
await p.waitForTimeout(2500);
await p.screenshot({ path: out });
console.log(out, 'telegraph:', warned);
await b.close();
