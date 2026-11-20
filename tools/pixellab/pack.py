"""Pack raw PixelLab frames into game sprite strips.

raw/<name>/east.png + raw/<name>/<anim>/NN.png  ->  assets/fighters/<name>/<anim>.png
(one horizontal strip per animation, cropped to the union of its frames) and
assets/fighters/<name>/meta.json with, per animation, frame count, frame size and
the anchor (feet centre) in frame pixels, so every animation lines up with the
character's standing rotation.

usage: pack.py [name ...]
"""
import glob, json, os, sys
from PIL import Image, ImageChops

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(HERE, "raw")
OUT = os.path.join(HERE, "..", "..", "assets", "fighters")


def diff_score(a, b):
    """Sum of alpha mismatch between two same-size RGBA images (lower = better)."""
    d = ImageChops.difference(a.getchannel("A"), b.getchannel("A"))
    return sum(i * n for i, n in enumerate(d.histogram()))


def find_offset(base, frame0):
    """Where the standing rotation sits inside an animation canvas."""
    cw, ch = frame0.size
    bw, bh = base.size
    cx, cy = (cw - bw) // 2, (ch - bh) // 2
    best = None
    for dy in range(-6, 7):
        for dx in range(-6, 7):
            x, y = cx + dx, cy + dy
            if x < 0 or y < 0 or x + bw > cw or y + bh > ch:
                continue
            crop = frame0.crop((x, y, x + bw, y + bh))
            s = diff_score(crop, base)
            if best is None or s < best[0]:
                best = (s, x, y)
    return (best[1], best[2]) if best else (cx, cy)


# raw animation dir -> game animation name (None = not shipped)
RENAME = {"fall2": "fall", "fall": None, "sweep": None, "falling-back-death": None, "throw": None}
PER_CHAR = {"diego": {"spin2": "special", "special": None, "fall4": "fall", "fall2": None}}
# per-fighter size: sprites are shrunk at pack time (attack reach is set in the game, so it is unchanged)
SCALE = {"lawslie": 0.80, "goon": 0.92, "slinger": 0.90}


def shrink(im, w, h):
    """Area-average downscale, then snap alpha so edges stay crisp pixel art."""
    out = im.resize((w, h), Image.BOX)
    a = out.getchannel("A").point(lambda v: 255 if v >= 110 else 0)
    out.putalpha(a)
    return out


# picks.json: {char: {anim: {"take": "<raw dir>", "pk": strike frame}}} — the chosen regenerated take per move
PICKS = json.load(open(os.path.join(HERE, "picks.json"))) if os.path.exists(os.path.join(HERE, "picks.json")) else {}


def pack(name):
    src = os.path.join(RAW, name)
    base = Image.open(os.path.join(src, "east.png")).convert("RGBA")
    bx0, by0, bx1, by1 = base.getbbox()
    K = SCALE.get(name, 1)
    meta = {"H": round((by1 - by0) * K), "W": round((bx1 - bx0) * K), "anims": {}}
    od = os.path.join(OUT, name)
    os.makedirs(od, exist_ok=True)
    anims = sorted(d for d in os.listdir(src) if os.path.isdir(os.path.join(src, d)))
    for o in os.listdir(od):
        os.remove(os.path.join(od, o))
    picks = PICKS.get(name, {})
    chosen = {v["take"]: k for k, v in picks.items()}
    for raw in anims:
        if raw in chosen:
            a = chosen[raw]
        elif "__" in raw or raw in picks:
            continue  # an unpicked take, or a move replaced by a picked take
        else:
            a = {**RENAME, **PER_CHAR.get(name, {})}.get(raw, raw)
        if a is None:
            continue
        files = sorted(glob.glob(os.path.join(src, raw, "*.png")))
        frames = [Image.open(f).convert("RGBA") for f in files]
        ox, oy = find_offset(base, frames[0])
        ax, ay = ox + (bx0 + bx1) / 2, oy + by1
        boxes = [f.getbbox() for f in frames if f.getbbox()]
        ux0 = min(b[0] for b in boxes); uy0 = min(b[1] for b in boxes)
        ux1 = max(b[2] for b in boxes); uy1 = max(b[3] for b in boxes)
        w, h = ux1 - ux0, uy1 - uy0
        w2, h2 = (round(w * K), round(h * K)) if K != 1 else (w, h)
        strip = Image.new("RGBA", (w2 * len(frames), h2), (0, 0, 0, 0))
        for i, f in enumerate(frames):
            fr = f.crop((ux0, uy0, ux1, uy1))
            strip.paste(shrink(fr, w2, h2) if K != 1 else fr, (i * w2, 0))
        strip.save(os.path.join(od, a + ".png"), optimize=True)
        meta["anims"][a] = {"n": len(frames), "w": w2, "h": h2, "ax": round((ax - ux0) * K, 1), "ay": round((ay - uy0) * K)}
        if a in picks and picks[a].get("pk") is not None:
            meta["anims"][a]["pk"] = picks[a]["pk"]
        print(f"  {name}/{a}: {len(frames)}f {w}x{h} anchor {meta['anims'][a]['ax']},{meta['anims'][a]['ay']} (offset {ox},{oy})")
    json.dump(meta, open(os.path.join(od, "meta.json"), "w"), indent=1)


if __name__ == "__main__":
    for n in sys.argv[1:] or sorted(os.listdir(RAW)):
        print(n)
        pack(n)
