#!/usr/bin/env python3
"""Build Bonfire Bash into one self-contained HTML file.

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
    music = {}
    for p in sorted(ASSETS.rglob("*.mp3")):
        key = p.relative_to(ASSETS).with_suffix("").as_posix().replace("/", "_")
        music[key] = "data:audio/mpeg;base64," + base64.b64encode(p.read_bytes()).decode()
    data = {}
    for p in sorted(ASSETS.rglob("*.json")):
        key = p.relative_to(ASSETS).with_suffix("").as_posix().replace("/", "_")
        data[key] = json.loads(p.read_text())
    assets_js = ("const ASSETS=" + json.dumps(imgs) + ";\nconst ASSET_DATA=" + json.dumps(data) + ";\nconst MUSIC="
                 + json.dumps(music) + ";")
    version = (ROOT / "VERSION").read_text().strip()
    assets_js += "\nconst GAME_VERSION=" + json.dumps(version) + ";"
    html = (ROOT / "src" / "template.html").read_text()
    game = (ROOT / "src" / "game.js").read_text()
    html = html.replace("/*ASSETS*/", assets_js, 1).replace("/*GAME*/", game, 1)
    # home-screen icons (tools/make_icon.py): iPhone and the browser tab read them from the page; Android reads the manifest
    br = ROOT / "branding"
    if (br / "icon-180.png").exists():
        import shutil
        b64 = lambda n: "data:image/png;base64," + base64.b64encode((br / f"icon-{n}.png").read_bytes()).decode()
        links = (f'<link rel="apple-touch-icon" href="{b64(180)}">\n<link rel="icon" type="image/png" href="{b64(32)}">\n'
                 '<link rel="manifest" href="manifest.webmanifest">\n<meta name="apple-mobile-web-app-title" content="Bonfire Bash">\n')
        html = html.replace("<title>", links + "<title>", 1)
        OUT.parent.mkdir(exist_ok=True)
        for n in (192, 512): shutil.copy(br / f"icon-{n}.png", OUT.parent / f"icon-{n}.png")
        (OUT.parent / "manifest.webmanifest").write_text(json.dumps({"name": "Bonfire Bash", "short_name": "Bonfire Bash", "start_url": "index.html", "display": "fullscreen",
            "orientation": "any", "background_color": "#1a1824", "theme_color": "#1a1824",
            "icons": [{"src": f"icon-{n}.png", "sizes": f"{n}x{n}", "type": "image/png", "purpose": "any"} for n in (192, 512)]}, indent=1))
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html)
    print(f"wrote {OUT.relative_to(ROOT)} v{version} ({OUT.stat().st_size/1024:.0f} KB, {len(imgs)} images, {len(data)} data files, {sum(1 for k in music if not k.startswith('voice_'))} songs, {sum(1 for k in music if k.startswith('voice_'))} voice clips)")


if __name__ == "__main__":
    main()
