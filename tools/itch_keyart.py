#!/usr/bin/env python3
"""Key art for the itch.io page: wide key art, a tall poster, a new cover, info badges and a features card.
Backdrops: tools/pixellab/concept/arena_wide.png + arena_tall.png (PixelLab). Fighters, logo text and the
feature stills come from the game itself.
usage: itch_keyart.py STILLS_DIR SUPER_FRAME.png   -> release/itch/page/"""
import json, sys, pathlib
from PIL import Image, ImageDraw
from itch_art import A, FIRE, draw_text, text_w, fighter

ROOT = pathlib.Path(__file__).resolve().parent.parent
CON = ROOT / "tools" / "pixellab" / "concept"
OUT = ROOT / "release" / "itch" / "page"
OUT.mkdir(parents=True, exist_ok=True)
VER = (ROOT / "VERSION").read_text().strip()
GOLD, RED = "#ffe66a", (208, 48, 26, 255)


def sprite(id_, anim, frame, flip, k):
    f, ax, ay = fighter(id_, anim, frame, flip)
    return f.resize((f.width * k, f.height * k), Image.NEAREST), ax * k, ay * k


def put(im, id_, x, ground, anim="idle", frame=0, flip=False, k=3, shadow=True):
    f, ax, ay = sprite(id_, anim, frame, flip, k)
    if shadow:
        sh = Image.new("RGBA", (int(48 * k), int(7 * k)), (0, 0, 0, 0))
        ImageDraw.Draw(sh).ellipse((0, 0, sh.width - 1, sh.height - 1), fill=(0, 0, 0, 110))
        im.alpha_composite(sh, (int(x - sh.width / 2), int(ground - sh.height / 2)))
    im.alpha_composite(f, (int(round(x - ax)), int(ground - ay)))


def bg(name, k):
    b = Image.open(CON / name).convert("RGBA")
    return b.resize((b.width * k, b.height * k), Image.NEAREST)


def vignette(im, strength=150):
    v = Image.new("RGBA", im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(v)
    for i in range(40):
        a = int(strength * (1 - i / 40) ** 2)
        d.rectangle((i * im.width // 160, i * im.height // 160, im.width - 1 - i * im.width // 160, im.height - 1 - i * im.height // 160), outline=(6, 4, 18, a), width=max(1, im.width // 160))
    im.alpha_composite(v)


def logo(im, cx, y, k, two_lines=False, sub=True):
    if two_lines:
        draw_text(im, "WORLD", cx, y, k, grad=FIRE, outline="#3a0808", center=True)
        draw_text(im, "DOJO", cx, y + 8 * k + k, int(k * 1.2), grad=FIRE, outline="#3a0808", center=True)
        y2 = y + 8 * k + k + 8 * int(k * 1.2)
    else:
        draw_text(im, "WORLD DOJO", cx, y, k, grad=FIRE, outline="#3a0808", center=True)
        y2 = y + 8 * k
    w = text_w("WORLD DOJO" if not two_lines else "WORLD", k) + 4 * k
    ImageDraw.Draw(im).rectangle((cx - w // 2, y2 + k // 2, cx + w // 2, y2 + k // 2 + max(2, k // 3)), fill=RED)
    if sub:
        s = "7 FIGHTERS - 14 POWERS - 1 CHAMPION"
        sk = max(1, k // 3)
        while sk > 1 and text_w(s, sk) > im.width - 24:
            sk -= 1
        draw_text(im, s, cx, y2 + k + 4, sk, col=GOLD, outline="#000", center=True)
    return y2


# poses that show each fighter's style; left side faces right, right side faces left
POSE = {"zeke": ("special", 7), "karl": ("punch", 4), "akira": ("special", 6), "vizor": ("special", 4),
        "padre": ("special", 6), "ivan": ("kick", 4), "diego": ("special", 5)}


def keyart():  # 1376x768
    im = bg("arena_wide.png", 2)
    vignette(im, 170)
    logo(im, im.width // 2, 28, 11)
    g = im.height - 34
    for id_, x in (("karl", 140), ("akira", 320), ("vizor", 500)):
        put(im, id_, x, g, *POSE[id_], flip=False)
    put(im, "zeke", 688, g - 18, "win", 8, flip=False)
    for id_, x in (("padre", 870), ("ivan", 1055), ("diego", 1240)):
        put(im, id_, x, g, *POSE[id_], flip=True)
    draw_text(im, f"PLAY IN YOUR BROWSER  -  V{VER}", im.width // 2, im.height - 22, 2, col="#ffffff", outline="#000", center=True)
    im.convert("RGB").save(OUT / "keyart-1376x768.png")


def poster():  # 768x1024
    im = bg("arena_tall.png", 2)
    vignette(im, 150)
    logo(im, im.width // 2, 36, 12, two_lines=True)
    back, front = im.height - 190, im.height - 26
    for id_, x, anim, fr, fl in (("karl", 110, "win", 8, False), ("ivan", 290, "win", 8, False), ("zeke", 478, "win", 8, False), ("vizor", 660, "idle", 0, True)):
        put(im, id_, x, back, anim, fr, fl, k=3)
    for id_, x in (("akira", 130), ("padre", 384), ("diego", 636)):
        an, fr = POSE[id_]
        put(im, id_, x, front, an, fr, flip=x > 384, k=3)
    im.convert("RGB").save(OUT / "poster-768x1024.png")


def cover():  # 630x500, new cover on the arena backdrop
    b = Image.open(CON / "arena_wide.png").convert("RGBA")
    im = b.crop((186, 134, 501, 384))
    vignette(im, 120)
    draw_text(im, "WORLD", 157, 12, 5, grad=FIRE, outline="#3a0808", center=True)
    draw_text(im, "DOJO", 157, 52, 6, grad=FIRE, outline="#3a0808", center=True)
    ImageDraw.Draw(im).rectangle((93, 99, 221, 100), fill=RED)
    draw_text(im, "PIXEL FIGHTERS", 157, 105, 1, col=GOLD, center=True)
    for i, (id_, flip) in enumerate([("karl", False), ("akira", False), ("vizor", False), ("zeke", False), ("padre", True), ("ivan", True), ("diego", True)]):
        put(im, id_, 26 + i * 44, 238 - (i % 2) * 7, "idle", 0, flip, k=1)
    im.resize((630, 500), Image.NEAREST).convert("RGB").save(OUT / "cover-arena-630x500.png")


def chip(text, col_bg, col_bd, w=None):
    w = w or text_w(text, 1) + 16
    c = Image.new("RGBA", (w, 15), (0, 0, 0, 0)); d = ImageDraw.Draw(c)
    d.rectangle((1, 0, w - 2, 14), fill=col_bg); d.rectangle((0, 1, w - 1, 13), fill=col_bg)
    d.rectangle((1, 0, w - 2, 14), outline=col_bd)
    draw_text(c, text, w // 2, 4, 1, col="#ffffff", center=True)
    return c


def badges():  # 960x? row of info chips
    chips = [chip("PLAY IN YOUR BROWSER", (150, 30, 30, 255), (255, 210, 58, 255)),
             chip("PHONE - KEYBOARD - GAMEPAD", (40, 40, 110, 255), (122, 216, 255, 255)),
             chip("LOCAL 2 PLAYERS", (30, 90, 50, 255), (122, 255, 138, 255)),
             chip(f"NEW IN V{VER}: REAL VOICES", (90, 30, 110, 255), (255, 138, 216, 255))]
    W = 480; rows = [[]]; x = 0
    for c in chips:
        if x + c.width > W - 8 and rows[-1]:
            rows.append([]); x = 0
        rows[-1].append(c); x += c.width + 6
    im = Image.new("RGBA", (W, len(rows) * 19 + 4), (14, 11, 34, 255))
    for r, row in enumerate(rows):
        tw = sum(c.width for c in row) + 6 * (len(row) - 1); x = (W - tw) // 2
        for c in row:
            im.alpha_composite(c, (x, 3 + r * 19)); x += c.width + 6
    im.resize((im.width * 2, im.height * 2), Image.NEAREST).convert("RGB").save(OUT / "badges.png")


def features(stills, super_frame):  # 960 wide card: 4 rows of real gameplay + caption
    rows = [(super_frame, "SUPER MOVES", ["FILL YOUR METER, THEN", "FORWARD + A+B FOR A", "CINEMATIC 6-HIT SUPER.", "EVERY FIGHTER HAS ONE."]),
            (stills / "throw.png", "THROWS", ["GRAB A BLOCKER WITH", "FORWARD OR BACK + B.", "PRESS A OR B WHEN", "GRABBED TO BREAK IT."]),
            (stills / "two-players.png", "2 PLAYERS", ["ONE KEYBOARD OR TWO", "GAMEPADS. REMATCH", "MENU AND A RUNNING", "SET SCORE."]),
            (stills / "trials.png", "COMBO TRIALS", ["3 TRIALS PER FIGHTER,", "AN INPUT DISPLAY AND", "BADGES AND COLORS", "TO UNLOCK."])]
    W, RH = 480, 200
    im = Image.new("RGBA", (W, RH * len(rows) + 4), (14, 11, 34, 255)); d = ImageDraw.Draw(im)
    for i, (src, title, lines) in enumerate(rows):
        y = 4 + i * RH; left = i % 2 == 0
        shot = Image.open(src).convert("RGBA").resize((256, 192), Image.NEAREST)
        sx = 4 if left else W - 260
        d.rectangle((sx - 2, y - 2, sx + 257, y + 193), fill=(255, 210, 58, 255)); im.alpha_composite(shot, (sx, y))
        tx = 272 if left else 12
        draw_text(im, title, tx, y + 40, 2, grad=FIRE, outline="#200")
        for j, l in enumerate(lines):
            draw_text(im, l, tx, y + 66 + j * 12, 1, col="#e8e6f0")
    im.resize((W * 2, im.height * 2), Image.NEAREST).convert("RGB").save(OUT / "features.png")


if __name__ == "__main__":
    stills, sframe = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    keyart(); poster(); cover(); badges(); features(stills, sframe)
    for n in ("keyart-1376x768.png", "poster-768x1024.png", "cover-arena-630x500.png", "badges.png", "features.png"):
        p = OUT / n; print(f"{n:26s} {Image.open(p).size} {p.stat().st_size // 1024} KB")
