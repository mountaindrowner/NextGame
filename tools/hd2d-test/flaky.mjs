import { chromium } from '../../node_modules/playwright/index.mjs';
const [,, url, out] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
let reqs = 0, dropped = 0;
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
await p.route('**/*', async (route) => {
  reqs++;
  await new Promise((r) => setTimeout(r, 120 + Math.random() * 250));
  // drop ~8% of image/json requests (never the page or its JS) — a throttled host
  const u = route.request().url();
  if (/\.(png|json)(\?|$)/.test(u) && Math.random() < 0.08) { dropped++; return route.abort(); }
  return route.continue();
});
await p.goto(url);
try { await p.waitForFunction(() => window.__ready === true, null, { timeout: 180000 }); } catch { errors.push('never became ready'); }
await p.waitForTimeout(12000);
const overlay = await p.evaluate(() => [...document.querySelectorAll('pre')].map((e) => e.textContent).join(' / '));
await p.screenshot({ path: out });
console.log(JSON.stringify({ reqs, dropped, errors, overlay: overlay.slice(0, 300) }));
await b.close();
