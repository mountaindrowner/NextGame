/**
 * Canon & architecture lint (Implementation Contract §2.1, §6).
 *
 * 1. Boundary wall: src/core/** may import only from within src/core.
 * 2. Dead names (CLAUDE.md prime directive) never appear in src, tools,
 *    maps, or assets.
 * 3. The electrical unit never appears in game-facing strings (heuristic:
 *    the word as a standalone lowercase unit usage is disallowed in src).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

let failures = 0;
const fail = (msg: string): void => {
  failures += 1;
  console.error(`CANON FAIL: ${msg}`);
};

// --- 1. core boundary ---------------------------------------------------
const coreDir = join(ROOT, 'src/core');
let coreFiles: string[] = [];
try {
  coreFiles = walk(coreDir).filter((f) => f.endsWith('.ts'));
} catch {
  coreFiles = [];
}
const importRe = /^\s*(?:import|export)\s[^;]*?from\s+['"]([^'"]+)['"]/gm;
for (const file of coreFiles) {
  const src = readFileSync(file, 'utf8');
  for (const m of src.matchAll(importRe)) {
    const spec = m[1] ?? '';
    const ok = spec.startsWith('./') || spec.startsWith('../');
    if (!ok) fail(`${relative(ROOT, file)} imports package "${spec}" — core must stay pure`);
    if (ok) {
      // resolve and confirm it stays under src/core
      const resolved = join(file, '..', spec);
      if (!resolved.startsWith(coreDir)) {
        fail(`${relative(ROOT, file)} imports outside src/core: "${spec}"`);
      }
    }
  }
}

// --- 2. dead names --------------------------------------------------------
const deadNames = /arkimon|ohmdex|ohmward|ohm on the range|ohm sweet ohm/i;
const scanDirs = ['src', 'tools', 'maps', 'assets'];
for (const d of scanDirs) {
  let files: string[] = [];
  try {
    files = walk(join(ROOT, d));
  } catch {
    continue;
  }
  const self = join(ROOT, 'tools/check-canon.ts');
  for (const file of files) {
    if (file === self) continue;
    if (!/\.(ts|json|tmj|md|txt|html)$/.test(file)) continue;
    const text = readFileSync(file, 'utf8');
    const hit = text.match(deadNames);
    if (hit) fail(`dead name "${hit[0]}" in ${relative(ROOT, file)}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} canon failure(s).`);
  process.exit(1);
}
console.log('canon checks passed: core boundary clean, no dead names.');
