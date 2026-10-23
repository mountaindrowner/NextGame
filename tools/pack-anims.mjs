/**
 * Pack each character's animation frames into one sprite sheet per animation
 * (rows = directions, columns = frames), so the game makes ~1 request per
 * animation instead of one per frame (raw.githack throttles hundreds).
 *   node tools/pack-anims.mjs
 * Reads public/world/styles/<id>/anim.json + <anim>/<dir>/<i>.png (freshly
 * staged) or, once packed, assets/reference/styles/frames/<id>/<anim>/…; writes
 * <anim>.png, marks the entry { sheet: true, w, h }, and moves the loose frames
 * out of public/ into assets/reference/styles/frames/ (kept as source).
 */
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const ROOT = new URL('..', import.meta.url).pathname;
const STYLES = join(ROOT, 'public/world/styles');
const FRAMES = join(ROOT, 'assets/reference/styles/frames');
const ALL8 = ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'];

for (const id of readdirSync(STYLES)) {
  const animPath = join(STYLES, id, 'anim.json');
  if (!existsSync(animPath)) continue;
  const anim = JSON.parse(readFileSync(animPath, 'utf8'));
  for (const [name, info] of Object.entries(anim)) {
    const fresh = existsSync(join(STYLES, id, name));
    const srcRoot = fresh ? join(STYLES, id, name) : join(FRAMES, id, name);
    const dirs = (info.dirs ?? ALL8).filter((d) => existsSync(join(srcRoot, d)));
    if (!dirs.length) continue;
    const first = PNG.sync.read(readFileSync(join(srcRoot, dirs[0], '0.png')));
    const w = first.width, h = first.height, n = info.frames;
    const sheet = new PNG({ width: w * n, height: h * dirs.length });
    dirs.forEach((d, row) => {
      for (let i = 0; i < n; i++) {
        const f = join(srcRoot, d, `${i}.png`);
        if (!existsSync(f)) continue;
        const src = PNG.sync.read(readFileSync(f));
        PNG.bitblt(src, sheet, 0, 0, Math.min(w, src.width), Math.min(h, src.height), i * w, row * h);
      }
    });
    writeFileSync(join(STYLES, id, `${name}.png`), PNG.sync.write(sheet));
    anim[name] = { ...info, dirs, sheet: true, w, h };
    if (fresh) {
      mkdirSync(join(FRAMES, id), { recursive: true });
      rmSync(join(FRAMES, id, name), { recursive: true, force: true });
      renameSync(join(STYLES, id, name), join(FRAMES, id, name));
    }
  }
  writeFileSync(animPath, JSON.stringify(anim, null, 2));
  console.log(`${id}: ${Object.keys(anim).join(', ')}`);
}
