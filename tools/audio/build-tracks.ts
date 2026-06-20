/**
 * Renders the full OHMFRONT soundtrack to public/audio/**. Run: `npm run audio:build`.
 * Each track id maps to a path by dotting → slashing (bgm.area.ohmstead →
 * bgm/area/ohmstead.wav), which the runtime manifest mirrors. Output is cleared
 * first so nothing stale lingers.
 */
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import type { Track } from './synth';
import { writeTrackWav } from './synth';
import { AREA_TRACKS } from './tracks-area';
import { BATTLE_TRACKS } from './tracks-battle';
import { MENU_TRACKS } from './tracks-menu';
import { JINGLE_TRACKS_DATA } from './tracks-jingle';
import { CUE_TRACKS } from './tracks-cue';
import { AMBIENCE_TRACKS } from './tracks-ambience';
import { SFX_TRACKS_DATA } from './tracks-sfx';

const ROOT = new URL('../..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/audio');

const ALL: Record<string, Track> = {
  ...AREA_TRACKS, ...BATTLE_TRACKS, ...MENU_TRACKS, ...JINGLE_TRACKS_DATA, ...CUE_TRACKS, ...AMBIENCE_TRACKS, ...SFX_TRACKS_DATA,
};

export const pathFor = (id: string): string => id.replace(/\./g, '/') + '.wav';

rmSync(OUT, { recursive: true, force: true });

let total = 0;
const sizes: Array<[string, number]> = [];
for (const [id, track] of Object.entries(ALL)) {
  const bytes = writeTrackWav(join(OUT, pathFor(id)), track);
  total += bytes;
  sizes.push([id, bytes]);
}
sizes.sort((a, b) => b[1] - a[1]);
console.log('  largest:');
for (const [id, b] of sizes.slice(0, 5)) console.log(`    ${id.padEnd(28)} ${(b / 1024).toFixed(0)} KB`);
console.log(`audio: wrote ${sizes.length} tracks, ${(total / 1024 / 1024).toFixed(1)} MB → public/audio/`);
if (total > 30 * 1024 * 1024) console.warn('  ⚠ over 30 MB — consider lowering the sample rate for area beds');
