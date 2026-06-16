/**
 * Scene screenshotter (npm run screenshots) — boots the built game in headless
 * Chromium, drives it through the scenes with scripted key presses, and saves a
 * filmstrip to playtest-shots/. Lets us actually *see* the dynamic scenes
 * (title, Bench, field, menu, world-map, battle) that the static map PNGs don't
 * show. Requires a Playwright browser: `npx playwright install chromium`. If the
 * browser isn't installed (e.g. its download is blocked) the tool explains how
 * to enable it and exits cleanly. Key map (src/input/controls): a=Space, b=X,
 * start=Enter, arrows=move. Tweak STEPS to reach the scene you care about.
 */
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const ROOT = new URL('..', import.meta.url).pathname;
const SHOTS = join(ROOT, 'playtest-shots');
const PORT = 4188;
const URL_ = `http://localhost:${PORT}/`;

// A best-effort tour. Each step presses keys (then waits) and snaps a frame.
// Adjust freely — scene transitions are timing/sequence dependent.
const STEPS: Array<{ label: string; keys: string[]; wait?: number }> = [
  { label: 'title', keys: [], wait: 1200 },
  { label: 'new-game', keys: ['Enter'], wait: 700 },
  { label: 'preset-pick', keys: ['Space'], wait: 700 },
  { label: 'bench-loco', keys: ['Space'], wait: 500 },
  { label: 'bench-core', keys: ['Space'], wait: 500 },
  { label: 'bench-plating', keys: ['Space'], wait: 500 },
  { label: 'bench-confirm', keys: ['Space'], wait: 700 },
  { label: 'elevator', keys: ['Enter', 'Enter', 'Enter', 'Enter'], wait: 900 },
  { label: 'field', keys: [], wait: 900 },
  { label: 'field-walk', keys: ['ArrowDown', 'ArrowDown', 'ArrowLeft'], wait: 600 },
  { label: 'menu', keys: ['Enter'], wait: 500 },
  { label: 'menu-party', keys: ['Space'], wait: 400 },
  { label: 'menu-back', keys: ['X'], wait: 300 },
  { label: 'menu-map', keys: ['ArrowDown', 'ArrowDown', 'ArrowDown', 'Space'], wait: 500 },
  { label: 'world-map', keys: [], wait: 700 },
];

async function main(): Promise<void> {
  let chromium: typeof import('playwright').chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.log('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
    return;
  }
  mkdirSync(SHOTS, { recursive: true });

  // serve the built game (run `npm run build` first)
  const srv = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: ROOT, stdio: 'ignore' });
  const stop = (): void => { try { srv.kill(); } catch { /* noop */ } };
  await sleep(2500); // let the preview server come up

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.log('Could not launch a browser:', (e as Error).message);
    console.log('Install the browser binary with: npx playwright install chromium');
    console.log('(In this sandbox the browser download is blocked; run the tool on a networked machine.)');
    stop();
    return;
  }

  const page = await browser.newPage({ viewport: { width: 960, height: 640 } });
  await page.goto(URL_, { waitUntil: 'load' }).catch(() => undefined);
  await page.waitForSelector('canvas', { timeout: 8000 }).catch(() => undefined);
  await page.locator('canvas').click().catch(() => undefined); // focus for key input

  let i = 0;
  for (const step of STEPS) {
    for (const k of step.keys) { await page.keyboard.press(k); await sleep(120); }
    await sleep(step.wait ?? 500);
    const file = join(SHOTS, `${String(i).padStart(2, '0')}_${step.label}.png`);
    await page.screenshot({ path: file }).catch(() => undefined);
    console.log(`shot → ${file}`);
    i++;
  }

  await browser.close();
  stop();
  console.log(`\n${i} frames → playtest-shots/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
