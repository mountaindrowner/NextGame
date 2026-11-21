#!/usr/bin/env python3
"""Home-screen / app icons from one picture.
usage: python3 tools/make_icon.py [IMAGE]
  IMAGE: any picture you choose (square works best). Without one, a pixel-art default is drawn from the game's art.
Writes branding/icon-512.png, icon-192.png, icon-180.png (iPhone home screen) and icon-32.png (browser tab).
tools/build.py embeds them in dist/index.html and writes dist/manifest.webmanifest (Android 'Add to Home screen')."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageChops
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "branding"; OUT.mkdir(exist_ok=True)

def default_icon():
    # 128x128 pixel art, scaled up without blur: "BB" in the game's fire lettering (dark outline, gold-to-red fill, a
    # bevel highlight, a drop shadow) over a bonfire, embers and the menu's diagonal stripes, inside a gold frame
    from PIL import ImageFilter
    S = 128; im = Image.new("RGBA", (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    tile = Image.new("L", (S, S), 0); ImageDraw.Draw(tile).rounded_rectangle((0, 0, S - 1, S - 1), radius=26, fill=255)
    bg = Image.new("RGBA", (S, S)); bd = ImageDraw.Draw(bg)
    for y in range(S):  # night indigo, warming toward the fire
        t = y / (S - 1); bd.line((0, y, S, y), fill=(int(22 + 38 * t * t), int(20 + 6 * t), int(52 - 8 * t), 255))
    st = Image.new("RGBA", (S, S), (0, 0, 0, 0)); sd = ImageDraw.Draw(st)
    for k in range(-S, S, 12): sd.line((k, 0, k + S, S), fill=(255, 255, 255, 12), width=5)  # the menu's stripes
    bg.alpha_composite(st); im.paste(bg, (0, 0), tile)
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0)); g = ImageDraw.Draw(glow)
    for r in range(56, 0, -4): g.ellipse((64 - r * 1.3, 128 - r, 64 + r * 1.3, 128 + r * .9), fill=(255, 110, 30, int(70 * (1 - r / 56)) + 6))
    glow.putalpha(Image.composite(glow.getchannel("A"), Image.new("L", (S, S), 0), tile)); im.alpha_composite(glow)
    # the bonfire: crossed logs, then layered flame tongues
    d.polygon([(26, 118), (34, 110), (100, 122), (94, 127)], fill=(92, 52, 34, 255)); d.polygon([(102, 118), (94, 110), (28, 122), (34, 127)], fill=(120, 70, 44, 255))
    for x, top, w in [(40, 92, 20), (52, 80, 24), (64, 70, 28), (77, 82, 24), (89, 94, 18)]:
        for k, col in enumerate([(176, 30, 24), (240, 90, 30), (255, 170, 50), (255, 236, 150)]):
            t = top + k * 6; ww = max(3, w - k * 6)
            d.polygon([(x - ww // 2, 116), (x - ww // 6, t + 4), (x, t), (x + ww // 4, t + 6), (x + ww // 2, 116)], fill=col + (255,))
    for ex, ey, c in [(30, 70, 0), (98, 62, 1), (22, 96, 1), (108, 88, 0), (44, 58, 1), (86, 50, 0), (60, 44, 1), (114, 70, 1)]:
        d.rectangle((ex, ey, ex + (1 if c else 0) + 1, ey + 1), fill=(255, 220, 120, 255) if c else (255, 140, 60, 255))
    # "BB": two chunky letters as a mask
    def B(m, x0, y0, w=44, h=62, st=12):
        md = ImageDraw.Draw(m); hu = h * 47 // 100
        md.rounded_rectangle((x0, y0, x0 + w - 5, y0 + hu + 2), radius=12, fill=255); md.rounded_rectangle((x0, y0 + hu - 2, x0 + w, y0 + h), radius=14, fill=255)
        md.rectangle((x0, y0, x0 + st + 4, y0 + h), fill=255)
        md.rounded_rectangle((x0 + st, y0 + 10, x0 + w - 5 - 11, y0 + hu - 6), radius=5, fill=0)  # upper counter
        md.rounded_rectangle((x0 + st, y0 + hu + 6, x0 + w - 12, y0 + h - 10), radius=5, fill=0)  # lower counter
    mask = Image.new("L", (S, S), 0); B(mask, 15, 17); B(mask, 68, 17)
    mask = mask.point(lambda v: 255 if v > 127 else 0)
    outline = mask.filter(ImageFilter.MaxFilter(7))
    shadow = Image.new("RGBA", (S, S), (40, 8, 30, 255)); im.paste(shadow, (5, 6), outline)
    im.paste(Image.new("RGBA", (S, S), (24, 10, 20, 255)), (0, 0), outline)
    fire = Image.new("RGBA", (S, S)); fd = ImageDraw.Draw(fire)
    for y in range(S):  # the title's fire gradient: pale gold -> gold -> orange -> red
        t = max(0, min(1, (y - 20) / 58)); stops = [(255, 246, 176), (255, 210, 60), (255, 128, 30), (214, 40, 30)]
        k = min(2, int(t * 3)); f = t * 3 - k; a, b = stops[k], stops[k + 1]
        fd.line((0, y, S, y), fill=tuple(int(a[i] + (b[i] - a[i]) * f) for i in range(3)) + (255,))
    im.paste(fire, (0, 0), mask)
    solid = mask.copy(); ImageDraw.floodfill(solid, (0, 0), 128); solid = solid.point(lambda v: 0 if v == 128 else 255)  # letters with their holes filled
    hi = ImageChops.multiply(ImageChops.subtract(solid, solid.transform((S, S), Image.AFFINE, (1, 0, -2, 0, 1, -2))), mask)  # bevel on the outer edge only
    im.paste(Image.new("RGBA", (S, S), (255, 255, 230, 255)), (0, 0), hi)
    lo = ImageChops.multiply(ImageChops.subtract(solid, solid.transform((S, S), Image.AFFINE, (1, 0, 2, 0, 1, 2))), mask)
    im.paste(Image.new("RGBA", (S, S), (150, 24, 24, 255)), (0, 0), lo)
    # the gold frame
    fr = Image.new("L", (S, S), 0); fdr = ImageDraw.Draw(fr); fdr.rounded_rectangle((3, 3, S - 4, S - 4), radius=23, outline=255, width=3)
    im.paste(Image.new("RGBA", (S, S), (232, 176, 48, 255)), (0, 0), fr)
    fr2 = Image.new("L", (S, S), 0); ImageDraw.Draw(fr2).rounded_rectangle((3, 3, S - 4, S - 4), radius=23, outline=255, width=1); im.paste(Image.new("RGBA", (S, S), (255, 236, 150, 255)), (0, 0), fr2)
    im.putalpha(ImageChops.multiply(im.getchannel("A"), tile))
    return im.resize((512, 512), Image.NEAREST)

src = Image.open(sys.argv[1]).convert("RGBA") if len(sys.argv) > 1 else default_icon()
w, h = src.size; s = min(w, h); src = src.crop(((w - s) // 2, (h - s) // 2, (w - s) // 2 + s, (h - s) // 2 + s))
for n in (512, 192, 180, 32):
    src.resize((n, n), Image.LANCZOS if s > n * 2 and len(sys.argv) > 1 else Image.NEAREST).save(OUT / f"icon-{n}.png")
print("wrote", ", ".join(f"branding/icon-{n}.png" for n in (512, 192, 180, 32)))
