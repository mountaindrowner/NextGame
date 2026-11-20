#!/usr/bin/env python3
"""Draw a fighter name logo in the style of the original logos (italic fire
lettering, dark outline, red brush swoosh).  usage: make_logo.py TEXT OUT.png [width height]"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

text, out = sys.argv[1], sys.argv[2]
W, H = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (100, 36)
S = 8  # supersample
FONT = "/usr/share/fonts/opentype/inter/InterDisplay-BlackItalic.otf"
OUTLINE = (18, 14, 30, 255)
GRAD = [(255, 236, 150), (252, 205, 100), (251, 188, 72), (250, 160, 40), (246, 130, 36), (240, 95, 36)]
RED = (200, 25, 29, 255)
DARK_RED = (120, 14, 24, 255)

# letters: render big, squeeze to fit the box above the swoosh.
# "PAPA-LÉGUAS" style names (with a hyphen) stack: small first word over a big second word.
txt_h = int(H * 0.72)
f = ImageFont.truetype(FONT, 200)


def word(s):
    l, t, r, b = f.getbbox(s)
    im = Image.new("L", (r - l + 40, b - t + 40), 0)
    ImageDraw.Draw(im).text((20 - l, 20 - t), s, font=f, fill=255)
    return im.crop(im.getbbox())


mask = Image.new("L", ((W - 4) * S, txt_h * S), 0)
if "-" in text or "|" in text:
    top, main = text.split("|", 1) if "|" in text else text.split("-", 1)
    tb, mb = word(top if "|" in text else top + "-"), word(main)
    th_top, th_main = int(txt_h * 0.36), int(txt_h * 0.66)
    mw = min((W - 6) * S, int(mb.width * th_main * S / mb.height * 1.05))
    tw_ = int(tb.width * th_top * S / tb.height * 1.1)
    mask.paste(tb.resize((tw_, th_top * S), Image.LANCZOS), (4 * S, 0))
    mask.paste(mb.resize((mw, th_main * S), Image.LANCZOS), ((W - 4) * S - mw, (txt_h - th_main) * S))
else:
    b = word(text)
    mask.paste(b.resize(((W - 6) * S, (txt_h - 2) * S), Image.LANCZOS), (0, 0))
# swoosh: tapered stroke under the letters
sw = Image.new("L", (W * S, H * S), 0)
d = ImageDraw.Draw(sw)
y0 = int(H * 0.70) * S
d.polygon([(3 * S, y0 + 7 * S), ((W - 2) * S, y0 - 2 * S), ((W - 4) * S, y0 + 2 * S), (8 * S, y0 + 9 * S)], fill=255)


def down(m):  # supersampled mask -> crisp 1-bit at native size
    return m.resize((m.width // S, m.height // S), Image.BOX).point(lambda v: 255 if v > 110 else 0)


letters = Image.new("L", (W, H), 0)
letters.paste(down(mask), (2, 1))
swoosh = down(sw)

img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
px = img.load()
grow = lambda m: m.filter(ImageFilter.MaxFilter(3))
sw_o, le_o = grow(swoosh), grow(letters)
for y in range(H):
    for x in range(W):
        if sw_o.getpixel((x, y)):
            px[x, y] = DARK_RED
        if swoosh.getpixel((x, y)):
            px[x, y] = RED
        if le_o.getpixel((x, y)):
            px[x, y] = OUTLINE
for y in range(H):
    g = GRAD[min(len(GRAD) - 1, max(0, (y - 1) * len(GRAD) // max(1, txt_h - 2)))]
    for x in range(W):
        if letters.getpixel((x, y)):
            # light edge on the left side of strokes for a bit of brush feel
            lit = x > 0 and not letters.getpixel((x - 1, y))
            px[x, y] = (255, 246, 200, 255) if lit and y < txt_h * 0.6 else g + (255,)
img.save(out)
print(out, img.size)
