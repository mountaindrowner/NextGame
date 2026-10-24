import { chromium } from '../../node_modules/playwright/index.mjs';
const [,, url, out, w = '1280', h = '720', wait = '6000', evalJs = ''] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
p.on('console', (m) => console.log('[console]', m.type(), m.text()));
p.on('pageerror', (e) => console.log('[pageerror]', e.message));
p.on('requestfailed', (r) => console.log('[reqfail]', r.url()));
await p.goto(url);
await p.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await p.waitForTimeout(+wait);
if (evalJs) { console.log('[eval]', JSON.stringify(await p.evaluate(evalJs))); await p.waitForTimeout(1500); }
await p.screenshot({ path: out });
await b.close();
