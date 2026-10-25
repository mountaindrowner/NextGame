// Measure the built game against the scope benchmarks (docs/design/scope-benchmarks.md).
// Needs dist/ served on :8765 (see README). Prints a markdown table of what's actually built.
import { chromium } from '../../node_modules/playwright/index.mjs';
import { execSync } from 'node:child_process';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await b.newPage({ viewport: { width: 480, height: 270 } });
await p.goto('http://localhost:8765/hd2d.html?area=field&hud=0');
await p.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
const m = await p.evaluate(async () => {
  const h = window.__hd2d, out = { maps: 0, kinds: {}, npcs: 0, named: new Set(), wardens: 0, looks: 0, roamers: 0, bosses: 0, zones: new Set(), exits: 0, heal: 0, shops: 0 };
  for (const id of h.areas) {
    if (id === 'overworld') continue;
    await h.enter(id, 'start', false);
    const a = h.area;
    out.maps++;
    out.kinds[a.kind ?? 'town'] = (out.kinds[a.kind ?? 'town'] ?? 0) + 1;
    out.npcs += a.npcs.length;
    for (const n of a.npcs) { out.named.add(n.name); if (n.warden) out.wardens++; }
    out.looks += a.things.filter((t) => !t.go && t.label === 'Look').length;
    out.heal += a.things.filter((t) => t.action === 'heal' || /rest|recharge/i.test(t.label)).length;
    out.shops += a.things.filter((t) => /trade|supply|shop/i.test(t.label)).length;
    out.roamers += (a.roamers ?? []).length;
    out.bosses += (a.roamers ?? []).filter((r) => r.level >= 10).length;
    if (a.zone) out.zones.add(a.zone);
    out.exits += a.triggers.filter((t) => t.go).length + a.things.filter((t) => t.go).length;
  }
  return { ...out, named: out.named.size, zones: out.zones.size };
});
await b.close();
const data = JSON.parse(execSync(`npx tsx -e "import {SPECIES} from './src/data/species'; import {MOVES} from './src/data/moves'; import {ITEMS} from './src/data/items'; import {ENCOUNTER_ZONES} from './src/data/encounters'; console.log(JSON.stringify({species: SPECIES.length, moves: MOVES.length, items: ITEMS.length, tables: ENCOUNTER_ZONES.length}))"`, { encoding: 'utf8' }).trim().split('\n').pop());
const k = m.kinds;
console.log(`| Metric | Built (measured ${new Date().toISOString().slice(0, 10)}) |
|---|---|
| Maps (sections + interiors + floors) | ${m.maps} — towns ${k.town ?? 0} · home ${k.home ?? 0} · roads ${k.road ?? 0} · side spots ${k.side ?? 0} · dungeon maps ${k.dungeon ?? 0} · travel ${k.travel ?? 0} |
| Connections (exits, doors, stairs) | ${m.exits} |
| NPCs placed / distinct names | ${m.npcs} / ${m.named} (Wardens ${m.wardens}) |
| Things to look at | ${m.looks} |
| Heal spots / shops | ${m.heal} / ${m.shops} |
| Visible wild Ohms (roamers) / tough ones (L10+) | ${m.roamers} / ${m.bosses} |
| Encounter tables (in data / used by maps) | ${data.tables} / ${m.zones} |
| Ohm species / moves / items (data) | ${data.species} / ${data.moves} / ${data.items} |
| Side quests | 0 wired (6 named in the beats) |
| Trainer battles | 0 wired |`);
