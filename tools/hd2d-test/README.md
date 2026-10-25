# HD-2D headless test scripts

Software-rendered (swiftshader) Chromium screenshots and scripted runs of
`dist/hd2d.html`. Build first (`npx vite build`), then serve `dist/` on :8765
(`cd dist && python3 -m http.server 8765`). Playwright's own browser isn't
installed here; the scripts launch `/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

- `shot.mjs <url> <out.png> [w] [h] [waitMs] [evalJs]` — screenshot after load (optional JS run first)
- `ow.mjs <url> <out.png> [evalJs]` — same, prints load time; for overworld walks
- `fight2.mjs <url> <prefix>` — bot fights a grid battle with stepped game time
- `cap.mjs <url> <prefix>` — opens capture, solves via `window.__capSolve`, checks party
- `hover2.mjs <url> <prefix>` — takes the Cistern drone and rides across the flood
- `flaky.mjs <url> <out>` — loads under a delayed, lossy network (drops ~8% of png/json)
- `arena.mjs <url> <out>` — battle arena screenshot mid-telegraph
- `scope.mjs` — walks every built map and prints what's there (maps, NPCs, looks, roamers, exits, data counts) for `docs/design/scope-benchmarks.md`
- `stitch.py` — joins per-area `?topdown=1` shots into the old world map (ImageMagick)

Rendering is ~1–3 fps, so real-time timers (the capture puzzle) can expire —
the scripts step `arena.update()` directly where timing matters. Debug hooks:
`window.__hd2d` (scene, arena, party, roamers, player, enter(id, spawn)).
