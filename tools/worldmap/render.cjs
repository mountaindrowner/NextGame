const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1130 } });
  await p.goto('file://' + process.argv[2]);
  await p.waitForFunction(() => document.title === 'done');
  await p.screenshot({ path: process.argv[3] });
  await b.close();
})();
