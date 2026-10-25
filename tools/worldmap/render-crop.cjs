// Renders part of a map page at 2× for the in-game travel card:
// node tools/worldmap/render-crop.cjs <page.html> <out.png> x y w h
const { chromium } = require('playwright');
(async () => {
  const [page, out, x, y, w, h] = process.argv.slice(2);
  const b = await chromium.launch().catch(() => chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }));
  const p = await b.newPage({ viewport: { width: 1600, height: 1130 }, deviceScaleFactor: 2 });
  await p.goto('file://' + page);
  await p.waitForFunction(() => document.title === 'done');
  await p.screenshot({ path: out, clip: { x: +x, y: +y, width: +w, height: +h } });
  await b.close();
})();
