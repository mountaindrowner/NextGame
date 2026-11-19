#!/usr/bin/env python3
"""Build World Dojo into one self-contained HTML file.

Inlines every PNG in assets/ (and any JSON in assets/, as ASSET_DATA) into
src/template.html together with src/game.js, writing dist/index.html.
"""
import base64
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
OUT = ROOT / "dist" / "index.html"


def main():
    imgs = {}
    for p in sorted(ASSETS.rglob("*.png")):
        key = p.relative_to(ASSETS).with_suffix("").as_posix().replace("/", "_")
        imgs[key] = "data:image/png;base64," + base64.b64encode(p.read_bytes()).decode()
    data = {}
    for p in sorted(ASSETS.rglob("*.json")):
        key = p.relative_to(ASSETS).with_suffix("").as_posix().replace("/", "_")
        data[key] = json.loads(p.read_text())
    assets_js = "const ASSETS=" + json.dumps(imgs) + ";\nconst ASSET_DATA=" + json.dumps(data) + ";"
    html = (ROOT / "src" / "template.html").read_text()
    game = (ROOT / "src" / "game.js").read_text()
    html = html.replace("/*ASSETS*/", assets_js, 1).replace("/*GAME*/", game, 1)
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html)
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size/1024:.0f} KB, {len(imgs)} images, {len(data)} data files)")


if __name__ == "__main__":
    main()
