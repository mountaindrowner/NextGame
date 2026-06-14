/**
 * Asset build (npm run assets:build) — Asset Bible §7 pipeline, manifest stage.
 *
 * Compiles the catalog into assets/manifest.json, validates against the R-rules
 * (§3/§8), writes assets/asset_index.json (counts vs budget + scope), and fails
 * the process on any violation so CI can gate on it. Tile-art generation per
 * record (the grid-method PNGs) runs in the per-kit generators that follow, in
 * the locked production order.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATALOG } from './catalog';
import { blockCount, report, validate } from './validate';
import { AREAS } from './types';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'assets');
mkdirSync(OUT, { recursive: true });

const manifest = CATALOG.map((r) => ({ ...r, blocks: blockCount(r) }));
writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));

const violations = validate(CATALOG);
const rep = report(CATALOG);
console.log(rep);

const index = {
  generated: new Date().toISOString().slice(0, 10),
  records: CATALOG.length,
  blocks: CATALOG.reduce((n, r) => n + blockCount(r), 0),
  areas: AREAS.length,
  kits: [...new Set(CATALOG.map((r) => r.kit))].sort(),
  violations: violations.length,
};
writeFileSync(join(OUT, 'asset_index.json'), JSON.stringify(index, null, 2));

if (violations.length) {
  console.error(`\n${violations.length} RULE violation(s):`);
  for (const x of violations) console.error(`  RULE ${x.rule} violated by ${x.id}: ${x.msg}`);
  process.exit(1);
}
console.log(`\n✓ manifest valid — ${CATALOG.length} records, ${index.blocks} blocks, 0 violations`);
