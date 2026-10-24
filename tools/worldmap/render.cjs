const { chromium } = require('playwright');
(async () => {
  // the repo's playwright may not match the installed browser: fall back to the system Chromium
  const b = await chromium.launch().catch(() => chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }));
  const p = await b.newPage({ viewport: { width: 1600, height: 1130 } });
  await p.goto('file://' + process.argv[2]);
  await p.waitForFunction(() => document.title === 'done');
  await p.screenshot({ path: process.argv[3] });
  await b.close();
})();
