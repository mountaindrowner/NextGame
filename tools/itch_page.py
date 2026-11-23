#!/usr/bin/env python3
"""Extra itch.io page art: header, page background, section titles, a fighter
roster card, a how-to-play card and an animated idle line-up GIF.
Everything is drawn at low resolution with the game's own font, sprites,
portraits and stages, then scaled up with nearest-neighbour.
Output: release/itch/page/"""
import json
from PIL import Image, ImageDraw
from itch_art import A, OUT as ITCH, FIRE, draw_text, text_w, fighter, place, stage, bar

OUT = ITCH / "page"
OUT.mkdir(parents=True, exist_ok=True)
RED = (208, 48, 26, 255)
GOLD = "#ffe66a"

ROSTER = [  # id, name, style, special 1, special 2, special 3
    ("karl", "PAPA-LÉGUAS", "KARATE", "LÉGUA RUSH", "LÉGUA STEP", "SKY LÉGUA"),
    ("keksan", "KEKSAN", "MUAY THAI", "TIGER KNEE", "THAI CLINCH", "TEEP"),
    ("vizor", "VIZOR", "TECH BRAWLER", "SHUTTER FLASH", "INSTANT REPLAY", "TRIPOD TRAP"),
    ("padre", "SAMSON", "SACRED BOXING", "HOLY TOME", "BENEDICTION", "AMEN SLAM"),
    ("zeke", "ZEKE", "BOWLING BRAWLER", "STRIKE BALL", "SPLIT SHOT", "BALL RETURN"),
    ("hecky", "HECKY XAVIER", "DAPPER BOXING", "HOSTILE TAKEOVER", "POWER SUIT", "LASER GLARE"),
    ("lawslie", "LAWSLIE", "POLICE DEFENSE", "TASER", "CUFF 'EM", "BATON SWEEP"),
    ("rex", "MARCUS", "BASS BRAWLER", "BASS DROP", "MIC CHECK", "HEADBANGER"),
    ("kai", "DEVANTÉ", "STREETBALL", "BOUNCE PASS", "ANKLE BREAKER", "BLOCK PARTY"),
    ("estrella", "ESTRELLA", "SHOWSTOPPER", "HIGH NOTE", "ENCORE", "SIREN SCREAM"),
    ("reyes", "REYES", "SABR COMBAT", "FRONTIER KNUCKLE", "DRONE STRIKE", "EAGLE RISE"),
    ("mateo", "PAEZANO", "FASTBALL", "FASTBALL", "STEAL HOME", "HOME RUN SWING"),
]


def save(im, name, k):
    im.resize((im.width * k, im.height * k), Image.NEAREST).convert("RGB").save(OUT / name)


def panel(w, h, top=(18, 14, 46), bottom=(10, 8, 26)):
    im = Image.new("RGBA", (w, h))
    d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / max(1, h - 1)
        d.line([(0, y), (w, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)) + (255,))
    return im


def frame(im, col=(255, 210, 58, 255)):
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, im.width - 1, im.height - 1), outline=(0, 0, 0, 255))
    d.rectangle((1, 1, im.width - 2, im.height - 2), outline=col)


def stripes(w, h, c1=(18, 15, 48), c2=(25, 21, 64), step=16):
    im = Image.new("RGBA", (w, h), c1 + (255,))
    d = ImageDraw.Draw(im)
    for x in range(-h, w + h, step):
        d.polygon([(x, 0), (x + step // 2, 0), (x + step // 2 - h, h), (x - h, h)], fill=c2 + (255,))
    return im


def header():  # 960x320 (480x160 x2)
    W, H = 480, 160
    im = stage("zeke", W, H, 0.45)
    draw_text(im, "BONFIRE BASH", W // 2, 12, 5, grad=FIRE, outline="#3a0808", center=True)
    bar(im, 51, 260, RED)
    draw_text(im, f"{len(ROSTER)} FIGHTERS + 1 SECRET - STORY MODE - ONLINE", W // 2, 57, 1, col=GOLD, center=True)
    for i, (id_, *_rest) in enumerate(ROSTER):
        place(im, id_, round(W / len(ROSTER) * (i + .5)), H - 6 - (i % 2) * 4, anim="idle", flip=i >= len(ROSTER) // 2)
    save(im, "header-960x320.png", 2)


def background():  # 1920x1080 (480x270 x4): stripes, darker in the middle where the page column sits
    W, H = 480, 270
    im = stripes(W, H)
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(shade)
    for x in range(W):
        dist = abs(x - W / 2) / (W / 2)
        a = round(150 * max(0, 1 - dist * 1.6))
        d.line([(x, 0), (x, H)], fill=(6, 5, 16, a))
    im.alpha_composite(shade)
    # faint fighters standing along the bottom edges
    for i, (id_, *_rest) in enumerate(ROSTER):
        f, ax, ay = fighter(id_, "idle", 0, flip=i >= len(ROSTER) // 2)
        f = f.copy(); f.putalpha(f.getchannel("A").point(lambda v: v * 45 // 255))
        h = len(ROSTER) // 2
        x = 26 + i * 44 if i < h else W - 26 - (len(ROSTER) - 1 - i) * 44
        im.alpha_composite(f, (int(x - ax), H - 6 - ay))
    save(im, "background-1920x1080.png", 4)


def title(text, name):  # 960x72 section titles (480x36 x2)
    W, H = 480, 36
    im = Image.new("RGBA", (W, H), (14, 11, 34, 255))
    draw_text(im, text, W // 2, 6, 3, grad=FIRE, outline="#3a0808", center=True)
    bar(im, 30, text_w(text, 3) + 40, RED)
    save(im, name, 2)


def roster():  # 960x? roster card, 3 x 2 fighter cards (drawn at 1x, scaled x2)
    CW, CH, G = 152, 160, 6
    items = ROSTER + [("vex", "???", "SECRET FIGHTER", "CLEAR STORY MODE", "TO UNLOCK", "")]
    rows = -(-len(items) // 3)
    W, H = CW * 3 + G * 4, CH * rows + G * (rows + 1)
    im = Image.new("RGBA", (W, H), (14, 11, 34, 255))
    for i, (id_, name, style, s1, s2, s3) in enumerate(items):
        last = len(items) - (rows - 1) * 3 if i >= (rows - 1) * 3 else 3
        x0, y0 = G + (i % 3) * (CW + G) + (3 - last) * (CW + G) // 2, G + (i // 3) * (CH + G)
        card = panel(CW, CH)
        secret = name == "???"
        art = stage(id_, CW, 88, 0.8 if secret else 0.55)
        if secret:  # a dark silhouette with a purple rim and a question mark
            f, ax, ay = fighter(id_, "idle", 0, flip=True)
            sil = Image.new("RGBA", f.size, (10, 6, 20, 255)); sil.putalpha(f.getchannel("A"))
            rim = Image.new("RGBA", f.size, (176, 74, 255, 255)); rim.putalpha(f.getchannel("A"))
            for dx, dy in ((-1, 0), (1, 0), (0, -1)):
                art.alpha_composite(rim, (int(CW // 2 - ax + dx), int(86 - ay + dy)))
            art.alpha_composite(sil, (int(CW // 2 - ax), int(86 - ay)))
            draw_text(art, "?", CW // 2 + 34, 20, 4, grad=["#ffffff", "#f4dcff", "#e0a0ff", "#c070ff", "#a040f0", "#7a20c0", "#501090"], outline="#1a0026", center=True)
        else:
            por = Image.open(A / f"{id_}_porm.png").convert("RGBA")
            art.alpha_composite(por, (-6, 88 - por.height + 8) if por.height > 88 else (-6, 88 - por.height))
            place(art, id_, 118, 84, anim="idle")
        card.alpha_composite(art.crop((0, 0, CW, 88)), (0, 0))
        ImageDraw.Draw(card).line([(0, 88), (CW, 88)], fill=RED)
        draw_text(card, name, 6, 93, 2 if text_w(name, 2) < CW - 10 else 1, grad=FIRE, outline="#200")
        draw_text(card, style, 6, 111, 1, col="#bbbbdd")
        draw_text(card, s1 if secret else "SP     " + s1, 6, 124, 1, col="#e0a0ff" if secret else "#ff9a6a")
        draw_text(card, s2 if secret else "DN+SP  " + s2, 6, 135, 1, col="#e0a0ff" if secret else "#7ad8ff")
        if not secret: draw_text(card, "BK+SP  " + s3, 6, 146, 1, col="#ff7a8a")
        frame(card)
        im.alpha_composite(card, (x0, y0))
    save(im, "roster.png", 2)


def controls():  # how to play card
    W, H = 480, 226
    im = panel(W, H)
    rows_l = [("MOVE", "WASD / ARROWS"), ("PUNCH (A)", "U"), ("KICK (B)", "J"), ("SPECIAL (SP)", "I"), ("FOCUS / JUMP", "K"),
              ("PAUSE", "ESC"), ("START", "ENTER"), ("BLOCK", "HOLD BACK"), ("DASH", "TAP FWD/BACK TWICE")]
    rows_r = [("SPECIAL 1", "SP"), ("SPECIAL 2", "DOWN + SP"), ("SPECIAL 3", "BACK + SP"), ("SUPER (FULL BAR)", "FWD + SP"),
              ("EX SPECIAL", "FOCUS + SP"), ("FOCUS ATTACK", "HOLD K"), ("CHAIN", "A > B, HIT > SP"), ("THROW (CLOSE)", "FWD/BACK + B"),
              ("JUMP ATTACK", "UP, THEN A OR B")]
    draw_text(im, "KEYBOARD", 120, 8, 2, grad=FIRE, outline="#200", center=True)
    draw_text(im, "FIGHTING", 360, 8, 2, grad=FIRE, outline="#200", center=True)
    for col, rows in ((0, rows_l), (1, rows_r)):
        for j, (k, v) in enumerate(rows):
            y = 30 + j * 12
            draw_text(im, k, 10 + col * 240, y, 1, col="#ff9a6a")
            draw_text(im, v, 230 + col * 240 - text_w(v, 1), y, 1, col="#ffffff")
    ImageDraw.Draw(im).line([(240, 28), (240, 124)], fill=(60, 50, 110, 255))
    # story, gamepads and phones
    y0 = 140
    draw_text(im, "STORY MODE", 120, y0, 2, grad=FIRE, outline="#200", center=True)
    draw_text(im, "PADS / PHONES", 360, y0, 2, grad=FIRE, outline="#200", center=True)
    for j, (k, v) in enumerate((("DEPTH", "UP / DOWN"), ("GUARD", "HOLD K"), ("LEARNED MOVES", "SP, DN+SP, BK+SP"), ("BREAKER", "SP WHILE HIT"), ("ALLY", "TAB (SELECT)"))):
        draw_text(im, k, 10, y0 + 22 + j * 12, 1, col="#ff9a6a"); draw_text(im, v, 230 - text_w(v, 1), y0 + 22 + j * 12, 1, col="#ffffff")
    draw_text(im, "GAMEPAD: X PUNCH  A KICK", 360, y0 + 22, 1, col="#bbbbdd", center=True)
    draw_text(im, "Y SPECIAL  B FOCUS", 360, y0 + 34, 1, col="#bbbbdd", center=True)
    d = ImageDraw.Draw(im)
    cx, cy = 290, y0 + 66
    d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=(196, 189, 205, 255))
    d.rectangle((cx - 12, cy - 4, cx + 12, cy + 4), fill=(42, 41, 54, 255)); d.rectangle((cx - 4, cy - 12, cx + 4, cy + 12), fill=(42, 41, 54, 255))
    for (bx, by, lab, col) in ((350, cy + 6, "B", (42, 154, 90)), (372, cy - 6, "A", (208, 48, 48)), (396, cy + 6, "SP", (224, 176, 32)), (418, cy - 6, "K", (60, 120, 220))):
        d.ellipse((bx - 10, by - 10, bx + 10, by + 10), fill=col + (255,), outline=(20, 16, 30, 255))
        draw_text(im, lab, bx, by - 3, 1, col="#ffffff", center=True)
    ImageDraw.Draw(im).line([(240, y0 - 4), (240, H - 8)], fill=(60, 50, 110, 255))
    frame(im)
    save(im, "how-to-play.png", 2)


def story_card():  # Story mode: four shots from the game in a gold frame (1x, 2 x 2)
    S = OUT / "story"
    ims = [Image.open(S / f).convert("RGBA") for f in ("streets.png", "docks.png", "vex/030.png", "phase3.png")]
    w, h = ims[0].size; G = 8
    im = Image.new("RGBA", (w * 2 + G * 3, h * 2 + G * 3), (14, 11, 34, 255))
    for i, s_ in enumerate(ims):
        im.alpha_composite(s_, (G + (i % 2) * (w + G), G + (i // 2) * (h + G)))
    frame(im)
    im.convert("RGB").save(OUT / "story-mode.png")


def gif_frames(frames, colors=256):
    """Quantize all frames to one shared 256-colour palette built from every frame (keeps colours true)."""
    sheet = Image.new("RGB", (frames[0].width, frames[0].height * len(frames)))
    for i, f in enumerate(frames):
        sheet.paste(f, (0, i * f.height))
    pal = sheet.quantize(colors=colors, method=Image.Quantize.FASTOCTREE, kmeans=2)
    return [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames]


def lineup_gif():  # animated idle line-up, 960x320
    W, H = 480, 160
    bg = stage("lawslie", W, H, 0.5)
    draw_text(bg, "CHOOSE YOUR FIGHTER", W // 2, 10, 2, grad=FIRE, outline="#3a0808", center=True)
    metas = {id_: json.loads((A / "fighters" / id_ / "meta.json").read_text())["anims"]["idle"]["n"] for id_, *_ in ROSTER}
    frames = []
    for t in range(16):
        im = bg.copy()
        for i, (id_, name, *_r) in enumerate(ROSTER):
            x = round(W / len(ROSTER) * (i + .5))
            place(im, id_, x, H - 18, anim="idle", frame=(t // 2 + i) % metas[id_], flip=i >= len(ROSTER) // 2)
            draw_text(im, name, x, H - 12, 1, col=GOLD, center=True)
        frames.append(im.resize((W * 2, H * 2), Image.NEAREST).convert("RGB"))
    frames = gif_frames(frames)
    frames[0].save(OUT / "lineup.gif", save_all=True, append_images=frames[1:], duration=110, loop=0, optimize=True)


def frames_gif(src, name, scale=2, colors=96, ms=33):
    import glob
    files = sorted(glob.glob(str(src) + "/*.png"))
    frames = [Image.open(f).convert("RGB") for f in files]
    frames = [f.resize((f.width * scale, f.height * scale), Image.NEAREST) for f in frames]
    frames = gif_frames(frames, colors)
    frames[0].save(OUT / name, save_all=True, append_images=frames[1:], duration=ms, loop=0, optimize=True)


def combo_gif(src):
    """Combo GIF from frames filmed by tools/combo_gif.js (256x192 each, shown at 2x)."""
    import glob
    files = sorted(glob.glob(str(src) + "/*.png"))
    frames = [Image.open(f).convert("RGB").resize((512, 384), Image.NEAREST) for f in files]
    frames = gif_frames(frames, 96)
    frames[0].save(OUT / "combos.gif", save_all=True, append_images=frames[1:], duration=33, loop=0, optimize=True)


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 3 and sys.argv[1] == "--gif":
        frames_gif(sys.argv[2], sys.argv[3], ms=50); sys.exit()
    if len(sys.argv) > 2 and sys.argv[1] == "--combo":
        combo_gif(sys.argv[2]); sys.exit()
    header(); background(); roster(); controls(); lineup_gif(); story_card(); frames_gif(OUT / "story" / "vex", "vex-entrance.gif", scale=2, colors=128, ms=50)
    for t, n in (("THE FIGHTERS", "title-fighters.png"), ("HOW TO PLAY", "title-how-to-play.png"), ("STORY MODE", "title-story.png"),
                 ("POWERS & COMBOS", "title-powers.png"), ("GAME MODES", "title-modes.png")):
        title(t, n)
    for p in sorted(x for x in OUT.iterdir() if x.suffix in (".png", ".gif")):
        print(f"{p.name:28s} {Image.open(p).size}  {p.stat().st_size // 1024} KB")
