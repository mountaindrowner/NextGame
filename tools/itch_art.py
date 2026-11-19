#!/usr/bin/env python3
"""itch.io page art: cover (630x500) and banner (960x240), drawn at low res
with the game's own 5x7 pixel font, fighters and stages, then scaled up with
nearest-neighbour so it stays crisp.  Output: release/itch/"""
import json, pathlib, re
from PIL import Image, ImageEnhance

ROOT = pathlib.Path(__file__).resolve().parent.parent
A = ROOT / "assets"
OUT = ROOT / "release" / "itch"
OUT.mkdir(parents=True, exist_ok=True)

# --- the game's font (FD table in src/game.js) ---
src = (ROOT / "src" / "game.js").read_text()
FONT = {k: [int(r, 2) for r in v.split()] for k, v in re.findall(r"'?(.)'?:'([01 ]{41})'", src)}
FIRE = ["#fffbc0", "#ffe66a", "#ffc93a", "#ffa22a", "#ff7a1e", "#f0501c", "#c8301a"]


def text_w(s, sc):
    return len(s) * 6 * sc - sc


def draw_text(im, s, x, y, sc=1, col="#ffffff", grad=None, outline=None, center=False):
    s = s.upper()
    if center:
        x -= text_w(s, sc) // 2
    px = im.load()

    def put(cx, cy, c):
        for yy in range(cy, cy + sc):
            for xx in range(cx, cx + sc):
                if 0 <= xx < im.width and 0 <= yy < im.height:
                    px[xx, yy] = c

    def rgb(h):
        h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (255,)

    def pas(dx, dy, c, g):
        for i, ch in enumerate(s):
            rows = FONT.get(ch)
            if not rows:
                continue
            for r, bits in enumerate(rows):
                for b in range(5):
                    if bits & (16 >> b):
                        put(x + i * 6 * sc + b * sc + dx, y + r * sc + dy, rgb(g[r]) if g else rgb(c))

    if outline:
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (1, 1), (-1, 1), (1, -1), (0, 2), (1, 2)]:
            pas(dx, dy, outline, None)
    else:
        pas(1, 1, "#000000", None)
    pas(0, 0, col, grad)


def fighter(id_, anim="idle", frame=0, flip=False):
    meta = json.loads((A / "fighters" / id_ / "meta.json").read_text())["anims"][anim]
    strip = Image.open(A / "fighters" / id_ / f"{anim}.png").convert("RGBA")
    f = strip.crop((frame * meta["w"], 0, (frame + 1) * meta["w"], meta["h"]))
    ax = meta["ax"]
    if flip:
        f = f.transpose(Image.FLIP_LEFT_RIGHT); ax = meta["w"] - ax
    return f, ax, meta["ay"]


def place(im, id_, x, ground, **kw):
    f, ax, ay = fighter(id_, **kw)
    # soft shadow
    sh = Image.new("RGBA", (44, 6), (0, 0, 0, 0))
    from PIL import ImageDraw
    ImageDraw.Draw(sh).ellipse((0, 0, 43, 5), fill=(0, 0, 0, 90))
    im.alpha_composite(sh, (int(x - 22), ground - 3))
    im.alpha_composite(f, (int(round(x - ax)), ground - ay))


def stage(name, w, h, dark=0.55):
    s = Image.open(A / f"{name}_stage.png").convert("RGBA")
    k = max(w / s.width, h / s.height)
    s = s.resize((round(s.width * k), round(s.height * k)), Image.NEAREST)
    s = s.crop(((s.width - w) // 2, s.height - h, (s.width - w) // 2 + w, s.height))
    return ImageEnhance.Brightness(s).enhance(dark)


def bar(im, y, w, col):
    for x in range((im.width - w) // 2, (im.width + w) // 2):
        im.putpixel((x, y), col); im.putpixel((x, y + 1), col)


# --- cover 630x500 (drawn at 315x250, x2) ---
W, H = 315, 250
c = stage("akira", W, H, 0.5)
draw_text(c, "WORLD", W // 2, 14, 5, grad=FIRE, outline="#3a0808", center=True)
draw_text(c, "DOJO", W // 2, 54, 6, grad=FIRE, outline="#3a0808", center=True)
bar(c, 101, 150, (208, 48, 26, 255))
draw_text(c, "PIXEL FIGHTERS", W // 2, 108, 1, col="#ffe66a", center=True)
ground = H - 12
for i, (id_, flip) in enumerate([("karl", False), ("akira", False), ("vizor", False), ("padre", True), ("ivan", True), ("diego", True)]):
    place(c, id_, 30 + i * 51, ground - (i % 2) * 7, anim="idle", flip=flip)
c.resize((W * 2, H * 2), Image.NEAREST).convert("RGB").save(OUT / "cover-630x500.png")

# --- banner 960x240 (drawn at 480x120, x2) ---
W, H = 480, 120
b = stage("karl", W, H, 0.45)
draw_text(b, "WORLD DOJO", W // 2, 26, 4, grad=FIRE, outline="#3a0808", center=True)
bar(b, 63, 200, (208, 48, 26, 255))
draw_text(b, "6 FIGHTERS - 12 POWERS - 1 CHAMPION", W // 2, 70, 1, col="#ffe66a", center=True)
place(b, "karl", 52, H - 6, anim="punch", frame=4)
place(b, "ivan", 436, H - 6, anim="kick", frame=4, flip=True)
b.resize((W * 2, H * 2), Image.NEAREST).convert("RGB").save(OUT / "banner-960x240.png")
print("wrote", *sorted(p.name for p in OUT.glob("*.png")))
