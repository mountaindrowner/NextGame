"""Add new animations to a fighter's shipped sprites without repacking the rest: packs raw/<name>/<anim>/ with the same
anchor and pack scale as pack.py, then the fighter's sizes.py scale (meta "scale"), and writes the strike frame (pk).
The pk is the frame where the limb reaches furthest forward (plus height, for rising moves).
usage: addanims.py NAME anim [anim ...]"""
import glob, json, os, sys
from PIL import Image
import pack


def step(im, w, h, K):
    return im.resize((w, h), Image.NEAREST) if K > 1 else pack.shrink(im, w, h)


def add(name, anims):
    src, od = os.path.join(pack.RAW, name), os.path.join(pack.OUT, name)
    meta = json.load(open(os.path.join(od, "meta.json")))
    base = Image.open(os.path.join(src, "east.png")).convert("RGBA"); bx0, by0, bx1, by1 = base.getbbox()
    K0, K1 = pack.SCALE.get(name, 1), meta.get("scale", 1)
    for a in anims:
        raw, a = a.split(":") if ":" in a else (a, a)  # raw take dir : packed name (e.g. punch2b:punch2)
        files = sorted(glob.glob(os.path.join(src, raw, "*.png")))
        if not files:
            print(f"  {name}/{a}: no raw frames"); continue
        frames = [Image.open(f).convert("RGBA") for f in files]
        ox, oy = pack.find_offset(base, frames[0]); ax, ay = ox + (bx0 + bx1) / 2, oy + by1
        boxes = [f.getbbox() for f in frames if f.getbbox()]
        ux0, uy0 = min(b[0] for b in boxes), min(b[1] for b in boxes); ux1, uy1 = max(b[2] for b in boxes), max(b[3] for b in boxes)
        w, h = ux1 - ux0, uy1 - uy0
        w1, h1 = (round(w * K0), round(h * K0)) if K0 != 1 else (w, h)
        w2, h2 = (round(w1 * K1), round(h1 * K1)) if K1 != 1 else (w1, h1)
        strip = Image.new("RGBA", (w2 * len(frames), h2), (0, 0, 0, 0))
        for i, f in enumerate(frames):
            fr = f.crop((ux0, uy0, ux1, uy1))
            if K0 != 1: fr = pack.shrink(fr, w1, h1)
            if K1 != 1: fr = step(fr, w2, h2, K1)
            strip.paste(fr, (i * w2, 0))
        strip.save(os.path.join(od, a + ".png"), optimize=True)
        # strike frame: furthest reach forward, with height counting for rising moves (uppercut, rising kick)
        def score(f):
            b = f.getbbox(); return (b[2] - ax) + (0.6 if a in ("punch3", "kick3") else 0.15) * (ay - b[1]) if b else -1e9
        pk = max(range(len(frames)), key=lambda i: score(frames[i]))
        pk = min(max(pk, 1), len(frames) - 2)
        meta["anims"][a] = {"n": len(frames), "w": w2, "h": h2, "ax": round(round((ax - ux0) * K0, 1) * K1, 1), "ay": round(round((ay - uy0) * K0) * K1), "pk": pk}
        print(f"  {name}/{a}: {len(frames)}f {w2}x{h2} pk {pk}")
    json.dump(meta, open(os.path.join(od, "meta.json"), "w"), indent=1)


if __name__ == "__main__":
    add(sys.argv[1], sys.argv[2:])
