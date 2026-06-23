/**
 * PixelLab AI — asset generation client + CLI (npm run pixellab).
 *
 * Generates pixel art from a text prompt via PixelLab's REST API and drops it
 * into assets/reference/ alongside a .prompt.json sidecar (per the project's
 * "store the generation prompt beside every generated asset" rule). From there
 * the existing pipeline takes over — e.g. tools/import-chars.ts for character
 * sheets, tools/import-portraits.ts for busts, or the asset kits for props.
 *
 * The key is read from PIXELLAB_API_KEY (set it as an environment secret, or in
 * a gitignored .env). Never commit the key.
 *
 *   npm run pixellab -- --prompt "a rusty barrel, top-down" --out barrel --size 64
 *   npm run pixellab -- --prompt "..." --out windmill --size 128 --no-bg
 *
 * v1: single-image generation (create/generate-image-pixflux). Character sheets
 * and animations (the v2 job-based endpoints) are the next step once this path
 * is confirmed live against a real key.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUTDIR = join(ROOT, 'assets/reference');
const API = 'https://api.pixellab.ai/v1/generate-image-pixflux';

function apiKey(): string {
  if (process.env.PIXELLAB_API_KEY) return process.env.PIXELLAB_API_KEY;
  // fall back to a gitignored .env (KEY=value lines)
  const envPath = join(ROOT, '.env');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const m = line.match(/^\s*PIXELLAB_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1]!.replace(/^["']|["']$/g, '');
    }
  }
  throw new Error('PIXELLAB_API_KEY not set. Set it as an environment secret or in a gitignored .env (see .env.example).');
}

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const flag = (name: string): boolean => process.argv.includes(`--${name}`);

/** Pull a base64 PNG out of PixelLab's response, tolerating field-name shapes. */
function extractBase64(json: unknown): string {
  const j = json as Record<string, unknown>;
  const img = (j['image'] ?? j['data'] ?? j) as Record<string, unknown>;
  const b64 = (img?.['base64'] ?? img?.['b64'] ?? j['base64'] ?? j['image_base64']) as string | undefined;
  if (!b64) throw new Error(`No image in response. Top-level keys: ${Object.keys(j).join(', ')}\n${JSON.stringify(json).slice(0, 400)}`);
  return b64.replace(/^data:image\/\w+;base64,/, '');
}

async function main(): Promise<void> {
  const prompt = arg('prompt');
  const out = arg('out');
  if (!prompt || !out) {
    console.error('usage: npm run pixellab -- --prompt "<text>" --out <name> [--size 96] [--negative "<text>"] [--no-bg]');
    process.exit(1);
  }
  const size = parseInt(arg('size', '96')!, 10);
  const body: Record<string, unknown> = {
    description: prompt,
    image_size: { width: size, height: size },
  };
  if (arg('negative')) body['negative_description'] = arg('negative');
  if (flag('no-bg')) body['no_background'] = true;

  console.log(`PixelLab: generating "${prompt}" (${size}x${size}) → assets/reference/${out}.png`);
  const res = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 401) throw new Error('401 Unauthorized — check PIXELLAB_API_KEY.');
  if (!res.ok) throw new Error(`PixelLab ${res.status}: ${(await res.text()).slice(0, 500)}`);

  const json = (await res.json()) as unknown;
  const png = Buffer.from(extractBase64(json), 'base64');
  mkdirSync(OUTDIR, { recursive: true });
  writeFileSync(join(OUTDIR, `${out}.png`), png);
  writeFileSync(join(OUTDIR, `${out}.prompt.json`), JSON.stringify({ source: 'pixellab', endpoint: API, body, at: new Date().toISOString() }, null, 2));
  const usage = (json as Record<string, unknown>)['usage'];
  console.log(`wrote assets/reference/${out}.png (${(png.length / 1024).toFixed(1)} KB)${usage ? `  usage: ${JSON.stringify(usage)}` : ''}`);
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e));
  process.exit(1);
});
