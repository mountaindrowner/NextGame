/**
 * Contact sheet of the 8-direction styled Ohms: one row per Ohm, in
 * encounter order, every direction, 3× nearest-neighbour.
 *   node tools/ohm-contact.cjs [out.png] [id ...]
 */
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUB = path.join(ROOT, 'public/world/styles');
const DIRS = ['south', 'south-east', 'east', 'north-east', 'north', 'north-west', 'west', 'south-west'];
const [out = path.join(ROOT, 'assets/reference/styles/ohms/_contact.png'), ...only] = process.argv.slice(2);
const order = only.length ? only : (fs.readFileSync(path.join(ROOT, 'tools/gen-ohms-style.mjs'), 'utf8').match(/\[\d+, '([a-z]+)'/g) || []).map((m) => m.match(/'([a-z]+)'/)[1]);
const ids = order.filter((id) => fs.existsSync(path.join(PUB, id, 'south.png')));
const S = 3, CELL = 64 * S, PAD = 6;
const W = DIRS.length * CELL + PAD * 2, H = ids.length * CELL + PAD * 2;
const img = new PNG({ width: W, height: H });
for (let i = 0; i < img.data.length; i += 4) { img.data[i] = 54; img.data[i + 1] = 58; img.data[i + 2] = 66; img.data[i + 3] = 255; }
ids.forEach((id, r) => DIRS.forEach((d, c) => {
  const src = PNG.sync.read(fs.readFileSync(path.join(PUB, id, `${d}.png`)));
  const ox = PAD + c * CELL + (CELL - src.width * S) / 2, oy = PAD + r * CELL + (CELL - src.height * S) / 2;
  for (let y = 0; y < src.height * S; y++) for (let x = 0; x < src.width * S; x++) {
    const s = (((y / S) | 0) * src.width + ((x / S) | 0)) * 4;
    if (src.data[s + 3] < 100) continue;
    const t = ((oy + y) * W + ox + x) * 4;
    for (let k = 0; k < 4; k++) img.data[t + k] = src.data[s + k];
  }
}));
fs.writeFileSync(out, PNG.sync.write(img));
console.log(`${ids.length} Ohms → ${out}`);
