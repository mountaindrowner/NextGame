# World Dojo

A handheld-styled pixel fighting game ("Dojo Boy") with four fighters — Karl, Akira, Ivan and Diego — playable in a browser on phone or desktop.

## Play

Open `dist/index.html` in a browser. It is a single self-contained file (also ready to upload to itch.io as an HTML game).

Controls: arrows/WASD move, `X`/`K` = A (punch), `Z`/`J` = B (kick), Enter = Start. On touch screens use the on-screen pad. A+B together, or down→forward+A, fires the special move.

## Layout

- `src/template.html` — page shell, handheld styling and on-screen controls
- `src/game.js` — the game
- `assets/` — PNG art (sprites, portraits, logos, stages)
- `tools/build.py` — inlines everything into `dist/index.html`
- `tools/smoke.js` — headless Playwright smoke test (boots the game, runs fights, screenshots)

## Build

```
python3 tools/build.py
node tools/smoke.js /tmp/shot
```
