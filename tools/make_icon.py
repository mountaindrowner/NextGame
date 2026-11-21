#!/usr/bin/env python3
"""Home-screen / app icons from one picture.
usage: python3 tools/make_icon.py [IMAGE]
  IMAGE: any picture you choose (square works best). Without one, a pixel-art default is drawn from the game's art.
Writes branding/icon-512.png, icon-192.png, icon-180.png (iPhone home screen) and icon-32.png (browser tab).
tools/build.py embeds them in dist/index.html and writes dist/manifest.webmanifest (Android 'Add to Home screen')."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "branding"; OUT.mkdir(exist_ok=True)

def default_icon():
    # 64x64 pixel art, scaled up without blur: night-indigo tile, a bonfire, Papa-Léguas's face over it
    S = 64; im = Image.new("RGBA", (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, S - 1, S - 1), radius=12, fill=(26, 24, 52, 255))
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0)); g = ImageDraw.Draw(glow)
    for y in range(26, S - 4):  # a soft glow rising from the fire
        g.line((6, y, S - 7, y), fill=(255, 120, 40, min(90, (y - 26) * 4)))
    mask = Image.new("L", (S, S), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, S - 1, S - 1), radius=12, fill=255)
    glow.putalpha(Image.composite(glow.getchannel("A"), Image.new("L", (S, S), 0), mask)); im.alpha_composite(glow)
    flames = [(10, 44, 12), (18, 36, 14), (26, 30, 16), (35, 33, 15), (44, 38, 13), (51, 46, 10)]
    for x, top, w in flames:
        for k, col in enumerate([(200, 40, 30), (255, 110, 30), (255, 200, 60), (255, 245, 170)]):
            t = top + k * 4; ww = max(2, w - k * 4)
            d.polygon([(x - ww // 2, 58), (x, t), (x + ww // 2, 58)], fill=col + (255,))
    d.rectangle((8, 56, 55, 59), fill=(70, 40, 30, 255)); d.rectangle((14, 54, 49, 56), fill=(110, 64, 40, 255))
    head = Image.open(ROOT / "assets" / "karl_head.png").convert("RGBA").resize((30, 30), Image.NEAREST)
    d.ellipse((15, 7, 49, 41), fill=(255, 210, 58, 255)); d.ellipse((17, 9, 47, 39), fill=(26, 24, 52, 255))
    mask = Image.new("L", (30, 30), 0); ImageDraw.Draw(mask).ellipse((0, 0, 29, 29), fill=255)
    im.paste(head, (17, 9), mask)
    return im.resize((512, 512), Image.NEAREST)

src = Image.open(sys.argv[1]).convert("RGBA") if len(sys.argv) > 1 else default_icon()
w, h = src.size; s = min(w, h); src = src.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))
for n in (512, 192, 180, 32):
    src.resize((n, n), Image.LANCZOS if s > n * 2 and len(sys.argv) > 1 else Image.NEAREST).save(OUT / f"icon-{n}.png")
print("wrote", ", ".join(f"branding/icon-{n}.png" for n in (512, 192, 180, 32)))
