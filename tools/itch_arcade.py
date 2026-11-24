#!/usr/bin/env python3
"""itch.io page kit, "arcade" direction: the whole page is dressed as the game's own fighting-game screens.
  background  a VS screen over Bonfire City at night (Papa-Leguas and Vex stand in the margins)
  header      the logo under a fight HUD (health bars, round timer)
  cover       two fighters trading hits under the HUD
  rounds      section titles as round-announcer banners, the health bar running down each round
  story       Vex's WANTED poster on a city street wall
  crt-*       gameplay GIFs inside an arcade screen bezel
  select      SELECT YOUR FIGHTER grid (portraits, name logos, three specials each, the secret slot)
  movelist    the arcade command card
  controls    keyboard, gamepad and phone with the game's button colours
  modes       SELECT MODE menu, the cursor stepping through (GIF)
  scores      HIGH SCORES credits with a blinking INSERT COIN (GIF)
Everything is drawn at low resolution with the game's own font, sprites, portraits, name logos and stages,
then scaled up with nearest-neighbour. usage: itch_arcade.py SRC_GIF_DIR  (old kit GIFs to reframe)
Output: release/itch/arcade/"""
import random, sys, pathlib
from PIL import Image, ImageDraw, ImageEnhance, ImageSequence
from itch_art import A, FIRE, draw_text, text_w, fighter, place

OUT = A.parent / "release" / "itch" / "arcade"
OUT.mkdir(parents=True, exist_ok=True)
PAGE_BG = (11, 8, 24)        # #0b0818, the theme's page background (the background image fades into it)
INNER = (18, 14, 44)         # #120e2c, the theme's inner column
BTN = {"A": "#ff6a6a", "B": "#6ae08a", "SP": "#ffd23a", "FOCUS": "#6ab4ff"}  # as in the game
GOLD, RED = "#ffe66a", (208, 48, 26, 255)


def rgb(h, a=255):
    h = h.lstrip("#"); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4)) + (a,)


def up(im, k):
    return im.resize((im.width * k, im.height * k), Image.NEAREST)


def save(im, name, k):
    up(im, k).convert("RGB").save(OUT / name); print("wrote", name, im.width * k, "x", im.height * k)


def vgrad(w, h, stops):
    """vertical gradient through [(t, (r,g,b)), ...]"""
    im = Image.new("RGBA", (w, h)); d = ImageDraw.Draw(im)
    for y in range(h):
        t = y / max(1, h - 1)
        for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
            if t0 <= t <= t1:
                u = (t - t0) / max(1e-6, t1 - t0); c = tuple(round(a + (b - a) * u) for a, b in zip(c0, c1)); break
        d.line([(0, y), (w, y)], fill=c + (255,))
    return im


def glow(im, cx, cy, r, col, strength=0.6):
    """an additive round glow (fire light)"""
    px = im.load()
    for y in range(max(0, cy - r), min(im.height, cy + r)):
        for x in range(max(0, cx - r), min(im.width, cx + r)):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** .5 / r
            if d < 1:
                k = strength * (1 - d) ** 2; p = px[x, y]
                px[x, y] = tuple(min(255, round(p[i] + col[i] * k)) for i in range(3)) + (p[3],)


def embers(im, n, box, seed):
    rnd = random.Random(seed); d = ImageDraw.Draw(im)
    for _ in range(n):
        x, y = rnd.randint(box[0], box[2]), rnd.randint(box[1], box[3])
        d.point((x, y), fill=rgb(rnd.choice(FIRE[:5])))
        if rnd.random() < .3: d.point((x, y + 1), fill=rgb(FIRE[5]))


def skyline(im, base, hmin, hmax, col, lit, seed, x0=0, x1=None):
    rnd = random.Random(seed); d = ImageDraw.Draw(im); x = x0; x1 = x1 or im.width
    while x < x1:
        w = rnd.randint(14, 34); h = rnd.randint(hmin, hmax)
        d.rectangle([x, base - h, x + w, base], fill=col)
        for wy in range(base - h + 4, base - 3, 5):
            for wx in range(x + 3, x + w - 2, 4):
                if rnd.random() < lit: d.point((wx, wy), fill=(255, 196, 90, 255)); d.point((wx + 1, wy), fill=(230, 160, 70, 255))
        x += w + rnd.randint(0, 3)


def big(id_, anim="idle", frame=0, flip=False, k=2):
    f, ax, ay = fighter(id_, anim, frame, flip)
    return up(f, k), ax * k, ay * k


def hp_bar(im, x, y, w, h, frac, flip=False):
    d = ImageDraw.Draw(im)
    d.rectangle([x - 1, y - 1, x + w, y + h], fill=(20, 10, 10, 255), outline=(255, 240, 200, 255))
    d.rectangle([x, y, x + w - 1, y + h - 1], fill=(150, 20, 20, 255))
    fw = round(w * frac)
    if fw:
        bx = x + w - fw if flip else x
        d.rectangle([bx, y, bx + fw - 1, y + h - 1], fill=rgb("#ffd23a"))
        d.line([(bx, y), (bx + fw - 1, y)], fill=rgb("#fff6b0"))


def asset(name):
    return Image.open(A / name).convert("RGBA")


def hud(im, y, w_bar, left="karl", right="vex", timer="99", logos=True):
    """the fight HUD: heads, health bars, names, round timer"""
    W = im.width; d = ImageDraw.Draw(im)
    for side, id_ in ((0, left), (1, right)):
        head = asset(f"{id_}_head.png").resize((20, 20), Image.NEAREST)
        hx = 6 if side == 0 else W - 26
        d.rectangle([hx - 1, y - 1, hx + 20, y + 20], fill=(255, 240, 200, 255))
        im.alpha_composite(head if side == 0 else head.transpose(Image.FLIP_LEFT_RIGHT), (hx, y))
        bx = 30 if side == 0 else W // 2 + 18
        hp_bar(im, bx, y + 2, W // 2 - 48, 7, 1.0 if side == 0 else 0.72, flip=side == 0)
        if logos:
            lg = asset(f"{id_}_logo.png"); lg = lg.resize((lg.width * 2 // 3, lg.height * 2 // 3), Image.NEAREST)
            im.alpha_composite(lg, (bx if side == 0 else W - 30 - lg.width, y + 11))
    d.rectangle([W // 2 - 13, y - 2, W // 2 + 12, y + 15], fill=(10, 6, 20, 255), outline=(255, 240, 200, 255))
    draw_text(im, timer, W // 2, y + 1, 2, grad=FIRE, outline="#200404", center=True)


def spark(im, cx, cy, r):
    d = ImageDraw.Draw(im)
    for i, (dx, dy) in enumerate([(1, 0), (0, 1), (1, 1), (1, -1), (2, 1), (1, 2), (2, -1), (1, -2)]):
        L = r if i < 4 else r * 2 // 3
        n = (dx * dx + dy * dy) ** .5
        for s in (1, -1):
            d.line([(cx, cy), (cx + s * dx / n * L, cy + s * dy / n * L)], fill=rgb("#fffbc0"), width=2 if i < 4 else 1)
    d.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=rgb("#ffffff"))


def street(w, h, x0=0, dark=0.5):
    s = asset("story_lvl1.png"); s = s.crop((x0, s.height - h, x0 + w, s.height)) if h <= s.height else s
    return ImageEnhance.Brightness(s).enhance(dark)


# ---------------------------------------------------------------- theme
def background():
    W, H = 640, 360  # x3 = 1920x1080; the 960 column covers x 160-480 here, so the art lives in the margins
    im = vgrad(W, H, [(0, (6, 4, 20)), (.45, (26, 12, 56)), (.8, (70, 22, 30)), (.93, (40, 14, 20)), (1, PAGE_BG)])
    rnd = random.Random(7); d = ImageDraw.Draw(im)
    for _ in range(140):
        x, y = rnd.randint(0, W), rnd.randint(0, 170); d.point((x, y), fill=(255, 255, 255, rnd.randint(60, 200)))
    skyline(im, 300, 50, 150, (24, 14, 50, 255), .12, 1)
    # Vex Tower: the tallest building, his penthouse lit purple, on the right
    d.rectangle([548, 46, 600, 300], fill=(16, 10, 36, 255)); d.rectangle([560, 30, 588, 46], fill=(16, 10, 36, 255))
    d.line([(574, 8), (574, 30)], fill=(16, 10, 36, 255), width=2); d.point((574, 7), fill=(255, 60, 60, 255))
    d.rectangle([552, 50, 596, 62], fill=(150, 80, 230, 255)); d.rectangle([552, 58, 596, 59], fill=(90, 40, 160, 255))
    glow(im, 574, 56, 40, (120, 60, 200), .5)
    skyline(im, 336, 24, 80, (12, 8, 26, 255), .2, 2)
    d.rectangle([0, 336, W, H], fill=(14, 9, 22, 255))
    for y in range(336, H): d.line([(0, y), (W, y)], fill=tuple(round(14 + (PAGE_BG[i] - 14) * (y - 336) / 24) for i in range(3)) + (255,))
    # the bonfire: a burning barrel on the left, lighting the street
    glow(im, 40, 330, 120, (255, 120, 40), .55)  # bonfire light from off-screen left
    embers(im, 90, (0, 160, 150, 330), 3); embers(im, 40, (490, 200, 640, 330), 4)
    # VS screen: the hero in the left margin, the boss in the right one, facing each other across the page
    for id_, x, flip, tag in (("karl", 82, False, "1P"), ("vex", 560, True, "BOSS")):
        f, ax, ay = big(id_, flip=flip)
        sh = Image.new("RGBA", (120, 12)); ImageDraw.Draw(sh).ellipse((0, 0, 119, 11), fill=(0, 0, 0, 120)); im.alpha_composite(sh, (x - 60, 342))
        im.alpha_composite(f, (int(x - ax), 348 - ay))
        draw_text(im, tag, x, 348 - ay - 16, 2, grad=FIRE if tag == "BOSS" else None, col="#ffffff", outline="#200404", center=True)
    save(im, "background-1920x1080.png", 3)


def header():
    W, H = 480, 160
    im = street(W, H, 140, .42)
    shade = vgrad(W, H, [(0, (0, 0, 0)), (1, (0, 0, 0))]); shade.putalpha(Image.linear_gradient("L").resize((W, H)).point(lambda v: 170 - v // 2))
    im.alpha_composite(shade)
    glow(im, W // 2, H + 30, 200, (255, 110, 40), .45)
    hud(im, 6, 0)
    draw_text(im, "BONFIRE BASH", W // 2, 58, 5, grad=FIRE, outline="#3a0808", center=True)
    ImageDraw.Draw(im).line([(W // 2 - 170, 100), (W // 2 + 170, 100)], fill=RED, width=2)
    draw_text(im, "STREET FIGHTING + BEAT EM UP - IN YOUR BROWSER", W // 2, 106, 1, col=GOLD, center=True)
    place(im, "karl", 30, H - 4, anim="punch", frame=4)
    place(im, "vex", W - 30, H - 4, anim="idle", flip=True)
    embers(im, 50, (60, 120, 420, 158), 9)
    save(im, "header-960x320.png", 2)


def cover():
    W, H = 315, 250
    im = vgrad(W, H, [(0, (6, 4, 20)), (.4, (30, 12, 56)), (1, (60, 18, 24))])
    skyline(im, 120, 30, 80, (20, 12, 44, 255), .15, 5)
    st = street(W, 150, 300, .5); im.alpha_composite(st, (0, H - 150))
    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0)); ImageDraw.Draw(shade).rectangle([0, 0, W, 120], fill=(0, 0, 0, 60)); im.alpha_composite(shade)
    glow(im, W // 2, H, 170, (255, 110, 40), .5)
    hud(im, 5, 0, logos=False)
    draw_text(im, "BONFIRE", W // 2, 34, 5, grad=FIRE, outline="#3a0808", center=True)
    draw_text(im, "BASH", W // 2, 74, 6, grad=FIRE, outline="#3a0808", center=True)
    draw_text(im, "12 FIGHTERS - STORY - ONLINE", W // 2, 122, 1, col=GOLD, center=True)
    place(im, "karl", 120, H - 8, anim="punch", frame=4)
    place(im, "keksan", 196, H - 8, anim="kick", frame=4, flip=True)
    spark(im, 158, H - 62, 12)
    embers(im, 40, (10, 140, 305, 240), 11)
    save(im, "cover-630x500.png", 2)


# ---------------------------------------------------------------- description
def round_banner(n, label, title, frac):
    W, H = 480, 48
    im = vgrad(W, H, [(0, (26, 16, 60)), (1, INNER)]); d = ImageDraw.Draw(im)
    d.rectangle([0, 0, 3, H], fill=RED)
    draw_text(im, label, 12, 7, 1, col=GOLD)
    draw_text(im, title, 12, 17, 3, grad=FIRE, outline="#2a0606")
    hp_bar(im, 12, 42, W - 24, 3, frac)
    save(im, f"{n}.png", 2)


def wanted():
    W, H = 480, 192
    im = street(W, H, 0, .62)
    glow(im, 380, 100, 140, (255, 120, 50), .25)
    px, py, pw, ph = 318, 14, 108, 166  # the poster, pasted on the wall
    pp = Image.new("RGBA", (pw, ph), (226, 206, 160, 255)); d = ImageDraw.Draw(pp); rnd = random.Random(3)
    for _ in range(500):  # paper grain and stains
        x, y = rnd.randrange(pw), rnd.randrange(ph); c = rnd.randint(-28, 10); p = pp.getpixel((x, y))
        d.point((x, y), fill=tuple(max(0, min(255, v + c)) for v in p[:3]) + (255,))
    d.rectangle([0, 0, pw - 1, ph - 1], outline=(150, 120, 80, 255)); d.rectangle([3, 3, pw - 4, ph - 4], outline=(120, 70, 40, 255))
    draw_text(pp, "WANTED", pw // 2, 8, 2, col="#5a1a0c", outline="#e8d6a8", center=True)
    por = asset("vex_pors.png"); d.rectangle([pw // 2 - 35, 25, pw // 2 + 34, 106], fill=(40, 24, 30, 255)); pp.alpha_composite(por, (pw // 2 - por.width // 2, 26))
    draw_text(pp, "VEX", pw // 2, 112, 2, col="#7a1a10", outline="#e8d6a8", center=True)
    for i, t in enumerate(["FOR OWNING", "BONFIRE CITY"]): draw_text(pp, t, pw // 2, 130 + i * 9, 1, col="#3a2010", outline="#e8d6a8", center=True)
    draw_text(pp, "REWARD: IT BACK", pw // 2, 151, 1, col="#7a1a10", outline="#e8d6a8", center=True)
    for cx, cy in ((0, 0), (pw - 1, 0), (0, ph - 1), (pw - 1, ph - 1)):  # torn corners
        for k in range(5): d.line([(cx, cy + (k if cy == 0 else -k)), (cx + ((4 - k) if cx == 0 else -(4 - k)), cy + (k if cy == 0 else -k))], fill=(0, 0, 0, 0))
    sh = Image.new("RGBA", (pw, ph), (0, 0, 0, 110)); im.alpha_composite(sh, (px + 3, py + 3)); im.alpha_composite(pp, (px, py))
    ImageDraw.Draw(im).ellipse([px + pw // 2 - 2, py + 1, px + pw // 2 + 2, py + 5], fill=RED)
    place(im, "lawslie", 214, H - 6, anim="idle")
    place(im, "karl", 262, H - 6, anim="idle")
    save(im, "story-wanted.png", 2)


def crt(src, name, label, step=1):
    """a gameplay GIF inside an arcade screen bezel, with a marquee label"""
    g = Image.open(src); fw, fh = g.size; pad, top = 24, 44
    W, H = fw + 2 * pad, fh + top + pad
    bz = Image.new("RGBA", (W // 2, H // 2), (0, 0, 0, 0)); d = ImageDraw.Draw(bz)
    d.rounded_rectangle([0, 0, W // 2 - 1, H // 2 - 1], 8, fill=(30, 24, 52, 255), outline=(90, 70, 150, 255))
    d.rounded_rectangle([2, 2, W // 2 - 3, H // 2 - 3], 7, outline=(48, 38, 84, 255))
    d.rectangle([pad // 2 - 2, top // 2 - 2, (pad + fw) // 2 + 1, (top + fh) // 2 + 1], fill=(0, 0, 0, 255))
    d.rectangle([12, 4, W // 2 - 13, top // 2 - 6], fill=(10, 6, 20, 255), outline=RED)
    draw_text(bz, label, W // 4, 6, 1, grad=FIRE, outline="#200404", center=True)
    for x in (8, W // 2 - 9): d.ellipse([x - 2, H // 2 - 8, x + 2, H // 2 - 4], fill=rgb("#ff6a6a"))
    bz = up(bz, 2)
    frames, durs = [], []
    for i, fr in enumerate(ImageSequence.Iterator(g)):
        if i % step: continue
        c = bz.copy(); c.alpha_composite(fr.convert("RGBA"), (pad, top)); frames.append(c.convert("RGB"))
        durs.append(fr.info.get("duration", 60) * step)
    # start on an ordinary frame (not a white super flash), so the still preview itch shows isn't blank
    import statistics
    lum = [statistics.mean(f.convert("L").crop((pad, top, pad + fw, top + fh)).resize((32, 24)).getdata()) for f in frames]
    med = statistics.median(lum); k = min(range(len(frames)), key=lambda i: abs(lum[i] - med) + (999 if lum[i] > med * 1.3 else 0))
    frames, durs = frames[k:] + frames[:k], durs[k:] + durs[:k]
    frames[0].save(OUT / name, save_all=True, append_images=frames[1:], duration=durs, loop=0, optimize=True)
    print("wrote", name, W, "x", H, len(frames), "frames", round((OUT / name).stat().st_size / 1e6, 1), "MB")


ROSTER = [("karl", "KARATE", "LÉGUA RUSH", "LÉGUA STEP", "SKY LÉGUA"), ("keksan", "MUAY THAI", "TIGER KNEE", "THAI CLINCH", "TEEP"),
          ("vizor", "TECH BRAWLER", "SHUTTER FLASH", "INSTANT REPLAY", "TRIPOD TRAP"), ("padre", "SACRED BOXING", "HOLY TOME", "BENEDICTION", "AMEN SLAM"),
          ("zeke", "BOWLING", "STRIKE BALL", "SPLIT SHOT", "BALL RETURN"), ("hecky", "DAPPER BOXING", "HOSTILE TAKEOVER", "POWER SUIT", "LASER GLARE"),
          ("lawslie", "POLICE DEFENSE", "TASER", "CUFF EM", "BATON SWEEP"), ("rex", "BASS BRAWLER", "BASS DROP", "MIC CHECK", "HEADBANGER"),
          ("kai", "STREETBALL", "BOUNCE PASS", "ANKLE BREAKER", "BLOCK PARTY"), ("estrella", "SHOWSTOPPER", "HIGH NOTE", "ENCORE", "SIREN SCREAM"),
          ("reyes", "SABR COMBAT", "FRONTIER KNUCKLE", "DRONE STRIKE", "EAGLE RISE"), ("mateo", "FASTBALL", "FASTBALL", "STEAL HOME", "HOME RUN SWING")]
SPC = ["#ffd23a", "#ff9a2a", "#ff5a3a"]


def select():
    cw, ch, cols = 120, 152, 4
    W = cw * cols; H = 18 + ch * 3 + 66
    im = Image.new("RGBA", (W, H), INNER + (255,)); d = ImageDraw.Draw(im)
    x = 8
    for c, t in zip(SPC, ["SP", "DOWN+SP", "BACK+SP"]):
        d.rectangle([x, 6, x + 5, 11], fill=rgb(c)); draw_text(im, t, x + 9, 5, 1); x += text_w(t, 1) + 22
    draw_text(im, "3 SPECIALS + A SUPER EACH", W - 8 - text_w("3 SPECIALS + A SUPER EACH", 1), 5, 1, col=GOLD)
    for i, (id_, style, *sp) in enumerate(ROSTER):
        cx, cy = (i % cols) * cw, 18 + (i // cols) * ch
        card = vgrad(cw - 4, ch - 4, [(0, (40, 26, 84)), (.55, (22, 16, 50)), (1, (14, 10, 34))]); cd = ImageDraw.Draw(card)
        por = asset(f"{id_}_porm.png"); por = por.crop((0, 0, por.width, 84)); card.alpha_composite(por, ((cw - 4 - por.width) // 2, 2))
        cd.rectangle([0, 72, cw - 5, 86], fill=(14, 10, 34, 160))
        lg = asset(f"{id_}_logo.png"); card.alpha_composite(lg, ((cw - 4 - lg.width) // 2, 60))
        draw_text(card, style, (cw - 4) // 2, 98, 1, col=GOLD, center=True)
        for j, s in enumerate(sp):
            cd.rectangle([5, 112 + j * 11, 9, 116 + j * 11], fill=rgb(SPC[j])); draw_text(card, s, 14, 111 + j * 11, 1)
        cd.rectangle([0, 0, cw - 5, ch - 5], outline=(70, 56, 130, 255))
        if i == 0:
            cd.rectangle([0, 0, cw - 5, ch - 5], outline=RED); cd.rectangle([1, 1, cw - 6, ch - 6], outline=RED)
            cd.rectangle([0, 0, 15, 10], fill=RED); draw_text(card, "1P", 2, 2, 1)
        im.alpha_composite(card, (cx + 2, cy + 2))
    # the secret slot
    y = 18 + ch * 3 + 4
    d.rectangle([2, y, W - 3, H - 4], fill=(10, 6, 20, 255), outline=(70, 56, 130, 255))
    f, ax, ay = fighter("vex", "idle", 0)
    sil = Image.new("RGBA", f.size, (0, 0, 0, 0)); sil.paste((60, 30, 100, 255), mask=f.split()[3])
    sil = sil.resize((sil.width * 3 // 5, sil.height * 3 // 5), Image.NEAREST)
    im.alpha_composite(sil, (28, H - 6 - sil.height))
    draw_text(im, "?", 104, y + 14, 4, grad=FIRE, outline="#200404")
    draw_text(im, "SECRET FIGHTER", 140, y + 14, 2, grad=FIRE, outline="#200404")
    draw_text(im, "BEAT STORY MODE TO UNLOCK", 140, y + 36, 1, col=GOLD)
    save(im, "select-your-fighter.png", 2)


def pill(im, x, y, t, col=None):
    """a button (round, in the game's colour) or a direction (grey)"""
    d = ImageDraw.Draw(im); w = text_w(t, 1) + 8
    if col:
        d.rounded_rectangle([x, y, x + w, y + 11], 5, fill=rgb(col)); d.rounded_rectangle([x, y + 9, x + w, y + 11], 2, fill=tuple(v // 2 for v in rgb(col)[:3]) + (255,))
        draw_text(im, t, x + 5, y + 2, 1, col="#1a1020", outline=col)
    else:
        d.rectangle([x, y, x + w, y + 11], fill=(60, 52, 90, 255), outline=(120, 110, 170, 255)); draw_text(im, t, x + 5, y + 2, 1)
    return x + w + 3


def movelist():
    rows = [([("A", "A")], "PUNCH", "A, A, A: JAB > CROSS > UPPERCUT"),
            ([("B", "B")], "KICK", "B, B, B: BODY KICK > HIGH KICK"),
            ([("DOWN", None), ("A", "A")], "LOW JAB", "BLOCK IT CROUCHING"),
            ([("DOWN", None), ("B", "B")], "SWEEP", "LOW, KNOCKS DOWN"),
            ([("FWD", None), ("A", "A")], "OVERHEAD", "BLOCK IT STANDING"),
            ([("BACK", None), ("A", "A")], "COMMAND MOVE", "EVERY FIGHTER HAS THEIR OWN"),
            ([("FWD", None), ("B", "B")], "THROW", "UP CLOSE"),
            ([("SP", "SP")], "SPECIAL 1", ""), ([("DOWN", None), ("SP", "SP")], "SPECIAL 2", ""), ([("BACK", None), ("SP", "SP")], "SPECIAL 3", ""),
            ([("FWD", None), ("SP", "SP")], "SUPER", "FULL BAR. CANCEL A SPECIAL INTO IT"),
            ([("FOCUS", "FOCUS")], "FOCUS ATTACK", "HOLD: SOAK A HIT, RELEASE TO STRIKE"),
            ([("FOCUS", "FOCUS"), ("SP", "SP")], "EX SPECIAL", "A THIRD OF THE BAR")]
    W = 480; H = 30 + len(rows) * 15 + 8
    im = Image.new("RGBA", (W, H), (10, 8, 22, 255)); d = ImageDraw.Draw(im)
    d.rectangle([2, 2, W - 3, H - 3], outline=rgb("#ffd23a")); d.rectangle([5, 5, W - 6, H - 6], outline=(70, 56, 130, 255))
    draw_text(im, "INSTRUCTIONS - EVERY FIGHTER", 26, 12, 2, grad=FIRE, outline="#200404")
    for i, (keys, name, note) in enumerate(rows):
        y = 32 + i * 15; x = 14
        if i % 2: d.rectangle([8, y - 2, W - 9, y + 12], fill=(20, 16, 40, 255))
        for k, c in keys:
            x = pill(im, x, y, k, BTN.get(k) if c else None)
        draw_text(im, name, 128, y + 2, 1, col="#ffffff")
        draw_text(im, note, 230, y + 2, 1, col="#b8b0e0")
    save(im, "move-list.png", 2)


def keycap(im, x, y, t, col=None, w=None):
    d = ImageDraw.Draw(im); w = w or max(14, text_w(t, 1) + 8)
    d.rounded_rectangle([x, y, x + w, y + 14], 3, fill=rgb(col) if col else (70, 62, 104, 255), outline=(20, 14, 34, 255))
    d.rounded_rectangle([x + 1, y + 1, x + w - 1, y + 11], 2, fill=(tuple(min(255, v + 30) for v in rgb(col)[:3]) + (255,)) if col else (96, 88, 136, 255))
    draw_text(im, t, x + w // 2, y + 3, 1, col="#1a1020" if col else "#ffffff", outline=col or "#3a3260", center=True)
    return x + w + 2


def controls():
    W, H = 480, 150
    im = Image.new("RGBA", (W, H), INNER + (255,)); d = ImageDraw.Draw(im)
    cols = [(4, "KEYBOARD"), (164, "GAMEPAD"), (324, "PHONE")]
    for x, t in cols:
        d.rectangle([x, 4, x + 151, H - 5], fill=(10, 8, 22, 255), outline=(70, 56, 130, 255)); draw_text(im, t, x + 76, 10, 2, grad=FIRE, outline="#200404", center=True)
    # keyboard: WASD or arrows, U J I K
    x0 = 14
    keycap(im, x0 + 18, 34, "W"); [keycap(im, x0 + i * 18, 51, k) for i, k in enumerate("ASD")]
    draw_text(im, "MOVE", x0 + 28, 70, 1, col="#b8b0e0", center=True)
    for i, (k, b, lab) in enumerate([("U", "A", "PUNCH"), ("J", "B", "KICK"), ("I", "SP", "SPECIAL"), ("K", "FOCUS", "FOCUS")]):
        y = 32 + i * 18; keycap(im, x0 + 66, y, k, BTN[b]); draw_text(im, lab, x0 + 86, y + 4, 1)
    draw_text(im, "OR ARROWS", x0 + 28, 80, 1, col="#b8b0e0", center=True); keycap(im, x0, 110, "ESC", w=26); draw_text(im, "PAUSE", x0 + 32, 114, 1)
    # gamepad: the face buttons in a diamond
    cx, cy = 262, 66
    for (dx, dy), k, b, lab in [((0, -18), "Y", "SP", "SPECIAL"), ((-18, 0), "X", "A", "PUNCH"), ((18, 0), "B", "FOCUS", "FOCUS"), ((0, 18), "A", "B", "KICK")]:
        d.ellipse([cx + dx - 8, cy + dy - 8, cx + dx + 8, cy + dy + 8], fill=rgb(BTN[b]), outline=(20, 14, 34, 255))
        draw_text(im, k, cx + dx, cy + dy - 3, 1, col="#1a1020", outline=BTN[b], center=True)
    for i, (k, b, lab) in enumerate([("X", "A", "PUNCH"), ("A", "B", "KICK"), ("Y", "SP", "SPECIAL"), ("B", "FOCUS", "FOCUS")]):
        draw_text(im, k, 178, 104 + i * 9, 1, col=BTN[b]); draw_text(im, lab, 190, 104 + i * 9, 1)
    d.rounded_rectangle([180, 40, 206, 92], 6, outline=(90, 80, 130, 255)); d.rectangle([189, 54, 197, 78], fill=(90, 80, 130, 255)); d.rectangle([181, 62, 205, 70], fill=(90, 80, 130, 255))
    # phone: the on-screen pad and buttons
    px0 = 344; d.rounded_rectangle([px0, 30, px0 + 112, 110], 8, fill=(30, 24, 52, 255), outline=(120, 110, 170, 255))
    d.rectangle([px0 + 8, 36, px0 + 104, 104], fill=(16, 12, 34, 255))
    d.ellipse([px0 + 14, 60, px0 + 44, 90], outline=(120, 110, 170, 255)); d.ellipse([px0 + 24, 70, px0 + 34, 80], fill=(120, 110, 170, 255))
    for (dx, dy), b in [((70, 78), "A"), ((86, 70), "B"), ((78, 56), "SP"), ((94, 54), "FOCUS")]:
        d.ellipse([px0 + dx - 6, dy - 6, px0 + dx + 6, dy + 6], fill=rgb(BTN[b]))
    draw_text(im, "ON-SCREEN PAD", px0 + 56, 116, 1, col="#b8b0e0", center=True); draw_text(im, "TURN IT UPRIGHT", px0 + 56, 126, 1, col="#b8b0e0", center=True)
    save(im, "controls.png", 2)


MODES = [("STORY", "THE BEAT EM UP. SOLO OR ONLINE CO-OP"), ("ARCADE", "BEAT EVERYONE. BE THE CHAMPION"), ("VERSUS CPU", "PICK BOTH FIGHTERS"),
         ("ONLINE", "FIGHT A FRIEND WITH A 4-LETTER CODE"), ("TRAINING", "DUMMY + DAMAGE AND COMBO READOUT"), ("TRIALS", "COMBO CHALLENGES FOR EVERY FIGHTER"),
         ("RECORDS", "WINS, BEST COMBOS AND BADGES")]


def modes():
    W, H = 480, 24 + len(MODES) * 16 + 10
    frames = []
    for k in range(len(MODES)):
        im = Image.new("RGBA", (W, H), (10, 8, 22, 255)); d = ImageDraw.Draw(im)
        d.rectangle([2, 2, W - 3, H - 3], outline=(70, 56, 130, 255))
        draw_text(im, "- SELECT MODE -", W // 2, 8, 1, col=GOLD, center=True)
        for i, (m, t) in enumerate(MODES):
            y = 24 + i * 16
            if i == k:
                d.rectangle([8, y - 3, W - 9, y + 10], fill=(60, 20, 30, 255), outline=RED); draw_text(im, ">", 14, y, 1, grad=FIRE)
                draw_text(im, m, 26, y, 1, grad=FIRE, outline="#200404")
            else:
                draw_text(im, m, 26, y, 1, col="#b8b0e0")
            draw_text(im, t, 120, y, 1, col="#ffffff" if i == k else "#8a80b8")
        frames.append(up(im, 2).convert("RGB"))
    frames[0].save(OUT / "select-mode.gif", save_all=True, append_images=frames[1:], duration=900, loop=0, optimize=True)
    print("wrote select-mode.gif", W * 2, "x", H * 2)


def scores():
    W, H = 480, 118
    rows = [("1ST", "FIGHTER ART", "PIXELLAB"), ("2ND", "BUILT WITH", "CLAUDE"), ("3RD", "NEXT CHAMPION", "YOU")]
    frames = []
    for blink in (0, 1):
        im = Image.new("RGBA", (W, H), (6, 4, 16, 255))
        draw_text(im, "RANK   CREDIT            NAME", 70, 10, 1, col="#6ab4ff")
        for i, (r, what, who) in enumerate(rows):
            y = 26 + i * 16; col = ["#ffd23a", "#d8d8f0", "#ff9a5a"][i]
            draw_text(im, r, 70, y, 1, col=col); draw_text(im, what, 112, y, 1, col=col)
            draw_text(im, "." * 8, 210, y, 1, col="#4a4070"); draw_text(im, who, 262, y, 1, col=col)
        if blink == 0:
            draw_text(im, "INSERT COIN", W // 2, 82, 3, grad=FIRE, outline="#200404", center=True)
        draw_text(im, "^  PLAY IT ABOVE, IN YOUR BROWSER  ^", W // 2, 106, 1, col=GOLD, center=True)
        frames.append(up(im, 2).convert("RGB"))
    frames[0].save(OUT / "high-scores.gif", save_all=True, append_images=frames[1:], duration=[700, 400], loop=0, optimize=True)
    print("wrote high-scores.gif", W * 2, "x", H * 2)



# ================================================================ the arcade cabinet edition
# On an itch page the header sits on top, the game runs right under it and the description follows, so the page
# is one cabinet: the header is the lit marquee, the game is the screen, the first description image is the
# control panel and the page ends on the coin door. The background draws the cabinet body around the column.
BODY, BODY2, TRIM = (20, 13, 34, 255), (30, 20, 50, 255), rgb("#ff7a1e")


def tmold(im, x0, y0, x1, y1, col=TRIM):
    """the glowing T-molding edge of the cabinet"""
    d = ImageDraw.Draw(im); d.rectangle([x0, y0, x1, y1], outline=col)
    d.rectangle([x0 + 1, y0 + 1, x1 - 1, y1 - 1], outline=tuple(v // 2 for v in col[:3]) + (255,))


def room(W, H):
    """a dark arcade at night: neon on the back wall, other cabinets glowing at the edges, carpet"""
    im = vgrad(W, H, [(0, (8, 5, 20)), (.6, (18, 10, 36)), (1, PAGE_BG)]); d = ImageDraw.Draw(im); rnd = random.Random(5)
    for y, c in ((40, (255, 60, 160)), (46, (60, 200, 255))):
        d.line([(0, y), (W, y)], fill=c + (255,)); glow(im, W // 2, y, W // 2, tuple(v // 3 for v in c), .25)
    for x0, sc in ((-30, (255, 90, 170)), (W - 50, (80, 210, 255))):  # neighbouring cabinets
        d.rectangle([x0, 120, x0 + 80, H - 60], fill=(12, 8, 24, 255)); d.rectangle([x0 + 8, 170, x0 + 72, 230], fill=sc + (255,))
        glow(im, x0 + 40, 200, 60, sc, .35); d.rectangle([x0 + 8, 170, x0 + 72, 230], outline=(0, 0, 0, 255))
        d.rectangle([x0, 120, x0 + 80, 150], fill=(40, 20, 60, 255))
    for _ in range(300):  # arcade carpet specks
        x, y = rnd.randrange(W), rnd.randrange(H - 70, H); c = rgb(rnd.choice(["#ff6a6a", "#6ab4ff", "#ffd23a", "#6ae08a"])); d.point((x, y), fill=tuple(v * 2 // 5 for v in c[:3]) + (255,))
    return im


def cab_background():
    W, H = 640, 720  # x3 = 1920x2160. The column covers x 160-480; itch's top bar ~ y 0-14; header 14-121
    im = room(W, H); d = ImageDraw.Draw(im)
    L, R = 92, 548
    # marquee housing (the header image sits in its middle) and the lit marquee ends either side of it
    d.rectangle([L - 6, 4, R + 6, 130], fill=BODY)
    for x0, x1 in ((L, 160), (480, R)):
        m = vgrad(x1 - x0, 108, [(0, (255, 210, 120)), (.5, (255, 120, 40)), (1, (150, 30, 20))]); im.alpha_composite(m, (x0, 14))
        rays = Image.new("RGBA", (x1 - x0, 108)); rd = ImageDraw.Draw(rays)
        for k in range(-30, x1 - x0, 6): rd.line([(k, 0), (k + 20, 107)], fill=(255, 240, 200, 70))  # sunburst, kept inside the panel
        im.alpha_composite(rays, (x0, 14))
    glow(im, W // 2, 68, 330, (255, 140, 60), .35)
    tmold(im, L - 6, 4, R + 6, 130)
    for x in (L + 4, R - 30): d.rectangle([x, 124, x + 26, 128], fill=(8, 4, 14, 255))  # speaker grilles
    # screen bezel: printed bezel art either side of the game
    d.rectangle([L, 130, R, 372], fill=BODY2)
    for id_, x, flip in (("karl", 128, False), ("vex", 512, True)):
        por = asset(f"{id_}_por.png"); por = por.transpose(Image.FLIP_LEFT_RIGHT) if flip else por
        por = ImageEnhance.Brightness(por).enhance(.85); im.alpha_composite(por, (x - por.width // 2, 150))
        lg = asset(f"{id_}_logo.png"); im.alpha_composite(lg, (x - lg.width // 2 + (8 if flip else -8), 300))
        draw_text(im, "1P" if not flip else "2P", x + (14 if flip else -14), 338, 2, grad=FIRE, outline="#200404", center=True)
    tmold(im, L - 6, 130, R + 6, 372)
    # control panel: flares out wider, a stick and four buttons per player in the margins
    d.polygon([(L - 6, 372), (R + 6, 372), (R + 34, 420), (L - 34, 420)], fill=(48, 30, 80, 255))
    d.polygon([(L - 34, 420), (R + 34, 420), (R + 34, 440), (L - 34, 440)], fill=(26, 16, 44, 255))
    d.line([(L - 6, 372), (L - 34, 420)], fill=TRIM); d.line([(R + 6, 372), (R + 34, 420)], fill=TRIM); d.line([(L - 34, 420), (R + 34, 420)], fill=TRIM)
    for side, x in ((0, 92), (1, 548)):
        sx = x - 28 if side == 0 else x - 30
        d.ellipse([sx - 7, 393, sx + 7, 401], fill=(10, 6, 16, 255)); d.line([(sx, 397), (sx, 384)], fill=(200, 200, 210, 255), width=2)
        d.ellipse([sx - 5, 378, sx + 5, 388], fill=rgb("#ff3a3a")); d.point((sx - 2, 381), fill=(255, 200, 200, 255))
        for j, b in enumerate(["A", "B", "SP", "FOCUS"]):
            bx = sx + 18 + j * 11 if side == 0 else sx - 18 - (3 - j) * 11 - 22 + 22
            if side == 1: bx = sx + 16 + j * 11
            if 160 <= bx <= 480: continue
            d.ellipse([bx - 4, 392 - (j % 2) * 4, bx + 4, 400 - (j % 2) * 4], fill=rgb(BTN[b]), outline=(10, 6, 16, 255))
    # lower body with the coin door's lit slots
    d.rectangle([L, 440, R, 680], fill=BODY); tmold(im, L - 6, 440, R + 6, 680)
    for x in (L + 22, R - 40):
        d.rectangle([x, 470, x + 18, 500], fill=(60, 60, 70, 255), outline=(120, 120, 130, 255))
        d.rectangle([x + 6, 476, x + 12, 494], fill=(255, 40, 30, 255)); glow(im, x + 9, 485, 26, (255, 40, 30), .6)
        draw_text(im, "25", x + 9, 504, 1, col="#d0d0e0", center=True)
    for x0, x1 in ((L, 160), (480, R)):  # flame side art licking up the lower cabinet
        fl = Image.new("RGBA", (x1 - x0, 130)); fd = ImageDraw.Draw(fl); rnd = random.Random(x0)
        for layer, c in enumerate(FIRE[6:1:-1]):
            for fx in range(-6, x1 - x0 + 6, 9):
                hgt = rnd.randint(50, 120) - layer * 16
                fd.polygon([(fx - 7 + layer, 130), (fx + 2, 130 - hgt), (fx + 11 - layer, 130)], fill=rgb(c))
        im.alpha_composite(fl, (x0, 508))
        draw_text(im, "INSERT COIN", (x0 + x1) // 2, 450, 1, col=GOLD, outline="#200404", center=True)
    for i, c in enumerate(["#ff6a6a", "#6ab4ff"]):  # kick-plate stripes
        d.rectangle([L, 640 + i * 6, R, 642 + i * 6], fill=rgb(c))
    sh = Image.new("RGBA", (R - L + 80, 16)); ImageDraw.Draw(sh).ellipse((0, 0, R - L + 79, 15), fill=(0, 0, 0, 140)); im.alpha_composite(sh, (L - 40, 676))
    d.rectangle([L - 6, 680, R + 6, 683], fill=(8, 4, 14, 255))
    save(im, "background-cabinet-1920x2160.png", 3)


def cab_marquee():
    W, H = 480, 160  # the header: a backlit marquee
    im = vgrad(W, H, [(0, (110, 30, 30)), (.45, (60, 14, 40)), (1, (20, 6, 26))]); d = ImageDraw.Draw(im)
    import math
    rays = Image.new("RGBA", (W, H)); rd = ImageDraw.Draw(rays)
    for a in range(0, 360, 12):  # sunburst from behind the logo, blended on its own layer
        r = 600; x1, y1 = W // 2 + r * math.cos(math.radians(a)), 78 + r * math.sin(math.radians(a))
        x2, y2 = W // 2 + r * math.cos(math.radians(a + 5)), 78 + r * math.sin(math.radians(a + 5))
        rd.polygon([(W // 2, 78), (x1, y1), (x2, y2)], fill=(255, 150, 80, 46))
    im.alpha_composite(rays)
    glow(im, W // 2, 70, 190, (255, 120, 50), .45)
    skyline(im, H, 20, 60, (40, 8, 20, 255), .1, 8)
    draw_text(im, "BONFIRE BASH", W // 2, 50, 5, grad=FIRE, outline="#2a0404", center=True)
    draw_text(im, "1 OR 2 PLAYERS - 12 FIGHTERS - STORY MODE", W // 2, 96, 1, col="#fff6d0", outline="#5a1004", center=True)
    for x, id_ in ((58, "keksan"), (26, "karl")):
        place(im, id_, x, H - 2, anim="idle")
    for x, id_ in ((W - 58, "reyes"), (W - 26, "vex")):
        place(im, id_, x, H - 2, anim="idle", flip=True)
    for x in range(0, W, 2):  # light leaking along the top edge, the marquee tube
        d.point((x, 0), fill=(255, 255, 230, 255)); d.point((x, 1), fill=(255, 230, 160, 200))
    d.rectangle([0, 0, W - 1, H - 1], outline=(40, 10, 16, 255))
    save(im, "header-marquee-960x320.png", 2)


def cabinet(im, cx, top, w, screen_fill):
    """a front-view cabinet: marquee, screen, control panel, coin door. screen_fill(img, w, h) paints the screen"""
    d = ImageDraw.Draw(im); L, R = cx - w // 2, cx + w // 2; mh = 34
    d.rectangle([L, top, R, im.height], fill=BODY)
    m = vgrad(w - 8, mh - 6, [(0, (255, 210, 120)), (.5, (240, 110, 40)), (1, (120, 20, 20))]); im.alpha_composite(m, (L + 4, top + 3))
    glow(im, cx, top + 16, w, (255, 140, 60), .2)
    draw_text(im, "BONFIRE BASH", cx, top + 10, 3 if w >= 230 else 2, grad=FIRE, outline="#2a0404", center=True)
    tmold(im, L, top, R, top + mh)
    sw, sh = w - 30, int((w - 30) * .62); sx, sy = L + 15, top + mh + 10
    d.rectangle([L, top + mh, R, sy + sh + 12], fill=BODY2); tmold(im, L, top + mh, R, sy + sh + 12)
    scr = Image.new("RGBA", (sw, sh), (0, 0, 0, 255)); screen_fill(scr, sw, sh)
    for y in range(0, sh, 3): ImageDraw.Draw(scr).line([(0, y), (sw, y)], fill=(0, 0, 0, 22))
    d.rectangle([sx - 3, sy - 3, sx + sw + 2, sy + sh + 2], fill=(0, 0, 0, 255)); im.alpha_composite(scr, (sx, sy))
    py = sy + sh + 12
    d.polygon([(L, py), (R, py), (R + 14, py + 24), (L - 14, py + 24)], fill=(48, 30, 80, 255)); d.line([(L - 14, py + 24), (R + 14, py + 24)], fill=TRIM)
    d.line([(L, py), (L - 14, py + 24)], fill=TRIM); d.line([(R, py), (R + 14, py + 24)], fill=TRIM)
    for side in (0, 1):
        bx = L + 18 if side == 0 else cx + 18
        d.ellipse([bx - 4, py + 12, bx + 4, py + 17], fill=(10, 6, 16, 255)); d.line([(bx, py + 14), (bx, py + 6)], fill=(200, 200, 210, 255), width=2)
        d.ellipse([bx - 3, py + 2, bx + 3, py + 8], fill=rgb("#ff3a3a"))
        for j, b in enumerate(["A", "B", "SP", "FOCUS"]):
            x = bx + 14 + j * 9; d.ellipse([x - 3, py + 10 - (j % 2) * 3, x + 3, py + 16 - (j % 2) * 3], fill=rgb(BTN[b]))
    d.rectangle([L - 14, py + 24, R + 14, py + 30], fill=(26, 16, 44, 255))
    ky = py + 30; d.rectangle([L, ky, R, im.height], fill=BODY); tmold(im, L, ky, R, im.height + 2)
    for x in (cx - 26, cx + 12):
        d.rectangle([x, ky + 12, x + 14, ky + 34], fill=(60, 60, 70, 255), outline=(120, 120, 130, 255))
        d.rectangle([x + 5, ky + 16, x + 9, ky + 30], fill=(255, 40, 30, 255)); glow(im, x + 7, ky + 23, 16, (255, 40, 30), .6)


def cab_cover():
    W, H = 315, 250
    im = room(W, H)

    def scr(s, w, h):  # the game running on the screen: a clash in the street under the HUD
        st = street(w, h, 330, 1.05); s.alpha_composite(st)
        hud(s, 3, 0, logos=False)
        place(s, "karl", w // 2 - 22, h - 4, anim="punch", frame=4); place(s, "keksan", w // 2 + 30, h - 4, anim="kick", frame=4, flip=True)
        spark(s, w // 2 + 6, h - 56, 9)
    cabinet(im, W // 2, 8, 250, scr)
    save(im, "cover-cabinet-630x500.png", 2)


def control_panel():
    """the first thing under the game: the cabinet's control panel, which is the how-to-play"""
    W, H = 480, 176
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.polygon([(10, 0), (W - 10, 0), (W - 1, 120), (0, 120)], fill=(48, 30, 80, 255))
    pan = vgrad(W - 20, 118, [(0, (62, 40, 100)), (1, (40, 26, 70))]); m = Image.new("L", (W, 120), 0)
    ImageDraw.Draw(m).polygon([(10, 0), (W - 10, 0), (W - 1, 120), (0, 120)], fill=255)
    full = Image.new("RGBA", (W, 120)); full.paste(pan.resize((W, 120)), (0, 0)); im.paste(full, (0, 0), m)
    d.line([(10, 0), (0, 120)], fill=TRIM, width=2); d.line([(W - 10, 0), (W - 1, 120)], fill=TRIM, width=2); d.line([(0, 120), (W, 120)], fill=TRIM, width=2)
    d.rectangle([0, 121, W - 1, 134], fill=(26, 16, 44, 255))
    for side, ox in ((0, 30), (1, 262)):
        draw_text(im, "1P" if side == 0 else "2P", ox + 4, 8, 2, grad=FIRE, outline="#200404")
        sx, sy = ox + 28, 70
        d.ellipse([sx - 14, sy + 6, sx + 14, sy + 18], fill=(10, 6, 16, 255)); d.line([(sx, sy + 12), (sx, sy - 10)], fill=(210, 210, 220, 255), width=3)
        d.ellipse([sx - 10, sy - 24, sx + 10, sy - 4], fill=rgb("#ff3a3a")); d.ellipse([sx - 6, sy - 20, sx - 1, sy - 15], fill=(255, 190, 190, 255))
        draw_text(im, "MOVE", sx, sy + 24, 1, col="#ffffff", center=True); draw_text(im, "WASD / ARROWS" if side == 0 else "D-PAD / STICK", sx, sy + 34, 1, col="#b8b0e0", center=True)
        for j, (b, lab, key) in enumerate([("A", "PUNCH", "U / X"), ("B", "KICK", "J / A"), ("SP", "SPECIAL", "I / Y"), ("FOCUS", "FOCUS", "K / B")]):
            bx, by = ox + 68 + j * 42, 48 - (j % 2) * 8
            d.ellipse([bx - 11, by + 2, bx + 11, by + 22], fill=(10, 6, 16, 255))
            d.ellipse([bx - 11, by - 2, bx + 11, by + 18], fill=rgb(BTN[b])); d.ellipse([bx - 7, by + 1, bx + 3, by + 7], fill=tuple(min(255, v + 60) for v in rgb(BTN[b])[:3]) + (255,))
            draw_text(im, lab, bx, by + 28, 1, col=BTN[b], outline="#100818", center=True); draw_text(im, key, bx, by + 38, 1, col="#b8b0e0", center=True)
    for j, t in enumerate(["1P", "2P"]):  # start buttons in the middle
        x = 214 + j * 20; d.rounded_rectangle([x, 10, x + 16, 20], 3, fill=(230, 230, 240, 255)); draw_text(im, t, x + 8, 12, 1, col="#202030", outline="#e6e6f0", center=True)
    draw_text(im, "START", 232, 24, 1, col="#b8b0e0", center=True)
    # the instruction strip along the front edge
    d.rectangle([0, 138, W - 1, H - 1], fill=(10, 8, 22, 255), outline=(70, 56, 130, 255))
    draw_text(im, "KEYBOARD: KEY / GAMEPAD: BUTTON     ESC PAUSE", W // 2, 146, 1, col=GOLD, center=True)
    draw_text(im, "PHONE: ON-SCREEN PAD AND BUTTONS, TURN IT UPRIGHT", W // 2, 160, 1, col="#b8b0e0", center=True)
    up(im, 2).save(OUT / "control-panel.png"); print("wrote control-panel.png", W * 2, H * 2)


def coin_door():
    W, H = 480, 168
    frames = []
    for blink in (0, 1):
        im = Image.new("RGBA", (W, H), BODY); d = ImageDraw.Draw(im)
        tmold(im, 0, 0, W - 1, H - 1)
        d.rounded_rectangle([140, 10, 340, 158], 6, fill=(70, 70, 82, 255), outline=(140, 140, 155, 255))
        d.rounded_rectangle([146, 16, 334, 152], 4, outline=(100, 100, 112, 255))
        for k, x in enumerate((170, 262)):
            d.rectangle([x, 26, x + 48, 70], fill=(40, 40, 48, 255), outline=(150, 150, 165, 255))
            on = blink == k or blink == 0
            d.rectangle([x + 20, 32, x + 28, 64], fill=(255, 40, 30, 255) if on else (90, 20, 20, 255))
            if on: glow(im, x + 24, 48, 34, (255, 40, 30), .55)
            draw_text(im, "25", x + 24, 76, 1, col="#e0e0ea", center=True)
        d.ellipse([234, 30, 246, 42], fill=(30, 30, 36, 255), outline=(160, 160, 170, 255)); d.line([(240, 33), (240, 39)], fill=(160, 160, 170, 255))
        d.rectangle([162, 92, 318, 142], fill=(236, 228, 200, 255), outline=(120, 100, 70, 255))  # the credits sticker
        draw_text(im, "CREDITS", 240, 96, 1, col="#7a1a10", outline="#ece4c8", center=True)
        draw_text(im, "FIGHTER ART: PIXELLAB", 240, 108, 1, col="#2a2030", outline="#ece4c8", center=True)
        draw_text(im, "BUILT WITH CLAUDE", 240, 118, 1, col="#2a2030", outline="#ece4c8", center=True)
        draw_text(im, "NEXT CHAMPION: YOU", 240, 130, 1, col="#7a1a10", outline="#ece4c8", center=True)
        if blink == 0:
            draw_text(im, "INSERT", 70, 54, 2, grad=FIRE, outline="#200404", center=True); draw_text(im, "COIN", 70, 74, 2, grad=FIRE, outline="#200404", center=True)
            draw_text(im, "PLAY IT", 410, 54, 2, grad=FIRE, outline="#200404", center=True); draw_text(im, "ABOVE ^", 410, 74, 2, grad=FIRE, outline="#200404", center=True)
        frames.append(up(im, 2).convert("RGB"))
    frames[0].save(OUT / "coin-door.gif", save_all=True, append_images=frames[1:], duration=[700, 450], loop=0, optimize=True)
    print("wrote coin-door.gif", W * 2, H * 2)


def instruction_card():
    """the printed card under the cabinet glass: the command list, with screws"""
    movelist()
    im = Image.open(OUT / "move-list.png").convert("RGBA"); d = ImageDraw.Draw(im)
    for x, y in ((20, 20), (im.width - 21, 20), (20, im.height - 21), (im.width - 21, im.height - 21)):
        d.ellipse([x - 5, y - 5, x + 5, y + 5], fill=(150, 150, 165, 255), outline=(60, 60, 70, 255)); d.line([(x - 3, y), (x + 3, y)], fill=(60, 60, 70, 255), width=2)
    im.convert("RGB").save(OUT / "instruction-card.png"); print("wrote instruction-card.png")


if __name__ == "__main__":
    src = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
    background(); header(); cover()
    round_banner("round-1", "ROUND 1", "TAKE BACK THE CITY", 1.0)
    round_banner("round-2", "ROUND 2", "SELECT YOUR FIGHTER", .8)
    round_banner("round-3", "ROUND 3", "COMMAND LIST", .6)
    round_banner("round-4", "ROUND 4", "HOW TO PLAY", .4)
    round_banner("round-5", "FINAL ROUND", "SELECT MODE", .15)
    round_banner("round-6", "GAME OVER", "HIGH SCORES", 0)
    wanted(); select(); movelist(); controls(); modes(); scores()
    cab_background(); cab_marquee(); cab_cover(); control_panel(); coin_door(); instruction_card()
    round_banner("round-4", "FINAL ROUND", "SELECT MODE", .15)
    if src:
        crt(src / "09-combos.gif", "crt-combos.gif", "NOW PLAYING: COMBOS")
        crt(src / "03-vex-entrance.gif", "crt-story.gif", "STORY MODE: VEX TOWER")
        crt(src / "08-supers.gif", "crt-supers.gif", "SUPERS", step=2)
