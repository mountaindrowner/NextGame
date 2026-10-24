import { chromium } from '../../node_modules/playwright/index.mjs';
const [,, url, pre] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
await p.goto(url);
await p.waitForFunction(() => window.__ready === true, null, { timeout: 180000 });
await p.waitForTimeout(3000);
await p.evaluate(() => { const h = window.__hd2d; h.player.root.position.set(22.8, 0, 25.0); h.player.face(0, -1); });
await p.waitForTimeout(1200);
await p.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' })));
await p.waitForTimeout(2500);
for (let i = 0; i < 3; i++) { await p.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }))); await p.waitForTimeout(400); }
await p.evaluate(() => { const h = window.__hd2d; h.player.root.position.set(18.5, 0, 21.0); });
await p.waitForTimeout(3500);
await p.screenshot({ path: `${pre}ride.png` });
console.log('on water y =', await p.evaluate(() => window.__hd2d.player.root.position.y.toFixed(2)));
await p.evaluate(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' })));
const t0 = Date.now();
while (Date.now() - t0 < 40000) { const z = await p.evaluate(() => window.__hd2d.player.root.position.z); if (z < 19.4) break; await p.waitForTimeout(500); }
await p.evaluate(() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'w' })));
console.log('reached z =', await p.evaluate(() => window.__hd2d.player.root.position.z.toFixed(2)));
await b.close();
