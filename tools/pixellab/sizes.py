"""Fighter sizes: pack each fighter at native size, run the post-pack fixes (Estrella's covered top, Reyes's olive gear),
then shrink to the standing height in sizes.json (never enlarged), sprite strips and the standing still alike.
usage: python3 sizes.py equal|adjusted [fighter ...]      lineup: python3 sizes.py lineup OUT.png"""
import contextlib, glob, io, json, os, runpy, subprocess, sys
from PIL import Image, ImageDraw
import pack
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.join(HERE, "..", ".."); A = os.path.join(ROOT, "assets")
CFG = json.load(open(os.path.join(HERE, "sizes.json")))
ROSTER = ["karl", "keksan", "vizor", "padre", "zeke", "hecky", "lawslie", "rex", "kai", "estrella", "reyes", "mateo", "mike", "ivan", "padreteen2", "heckyfox", "zekeidol", "karl2", "mikecow"]


def idle_height(k):
    m = json.load(open(os.path.join(A, "fighters", k, "meta.json")))["anims"]["idle"]; st = Image.open(os.path.join(A, "fighters", k, "idle.png")).convert("RGBA")
    return max(st.crop((i * m["w"], 0, i * m["w"] + m["w"], m["h"])).getbbox()[3] - st.crop((i * m["w"], 0, i * m["w"] + m["w"], m["h"])).getbbox()[1] for i in range(m["n"]))


def native(k):
    with contextlib.redirect_stdout(io.StringIO()):
        pack.pack(k)
    im = Image.open(os.path.join(HERE, "raw", k, "east.png")).convert("RGBA"); im.crop(im.getchannel("A").getbbox()).save(os.path.join(A, k + "_spr.png"))
    if k == "estrella":
        subprocess.run([sys.executable, os.path.join(HERE, "cover_midriff.py")], check=True, stdout=subprocess.DEVNULL)
    if k == "mike":
        subprocess.run([sys.executable, os.path.join(HERE, "fix_mike.py")], check=True, stdout=subprocess.DEVNULL)
    if k == "reyes":
        subprocess.run([sys.executable, os.path.join(ROOT, "tools", "recolor_reyes.py")], check=True, stdout=subprocess.DEVNULL)


def resize(k, K):
    d = os.path.join(A, "fighters", k); meta = json.load(open(os.path.join(d, "meta.json")))
    for a, m in meta["anims"].items():
        st = Image.open(os.path.join(d, a + ".png")).convert("RGBA"); w2, h2 = round(m["w"] * K), round(m["h"] * K)
        out = Image.new("RGBA", (w2 * m["n"], h2), (0, 0, 0, 0))
        for i in range(m["n"]):
            fr = st.crop((i * m["w"], 0, i * m["w"] + m["w"], m["h"])); out.paste(fr.resize((w2, h2), Image.NEAREST) if K > 1 else pack.shrink(fr, w2, h2), (i * w2, 0))
        out.save(os.path.join(d, a + ".png"), optimize=True); m.update(w=w2, h=h2, ax=round(m["ax"] * K, 1), ay=round(m["ay"] * K))
    meta["H"], meta["W"] = round(meta["H"] * K), round(meta["W"] * K); meta["scale"] = round(K, 4)
    json.dump(meta, open(os.path.join(d, "meta.json"), "w"), indent=1)
    sp = Image.open(os.path.join(A, k + "_spr.png")).convert("RGBA"); (sp.resize((round(sp.width * K), round(sp.height * K)), Image.NEAREST) if K > 1 else pack.shrink(sp, round(sp.width * K), round(sp.height * K))).save(os.path.join(A, k + "_spr.png"))


def lineup(out):
    ks = [k for k in ROSTER if k not in ("padreteen2", "heckyfox", "zekeidol", "karl2", "mikecow")]; frames = []
    for k in ks:
        m = json.load(open(os.path.join(A, "fighters", k, "meta.json")))["anims"]["idle"]; st = Image.open(os.path.join(A, "fighters", k, "idle.png")).convert("RGBA")
        frames.append((k, st.crop((0, 0, m["w"], m["h"])), m["ax"], m["ay"]))
    W, G = 70 * len(ks) + 20, 130; im = Image.new("RGBA", (W, G + 14), (40, 40, 60, 255)); dr = ImageDraw.Draw(im)
    for y in range(G - 100, G, 10): dr.line([(0, y), (W, y)], fill=(60, 60, 85))
    for i, (k, f, ax, ay) in enumerate(frames):
        x = 45 + i * 70; im.alpha_composite(f, (round(x - ax), round(G - ay))); dr.text((x - 18, G + 2), f"{k[:8]} {idle_height(k)}", fill=(255, 230, 120))
    dr.line([(0, G), (W, G)], fill=(200, 200, 200)); im.resize((im.width * 2, im.height * 2), Image.NEAREST).save(out)


if __name__ == "__main__":
    mode, names = sys.argv[1], sys.argv[2:]
    if mode == "lineup":
        lineup(names[0]); sys.exit()
    for k in names or ROSTER:
        native(k); h = idle_height(k)
        if mode == "equal": t = CFG["equal"] if k not in CFG["skins"] else None
        else: t = CFG["adjusted"].get(k)
        base = CFG["skins"].get(k)
        if t is None and base:  # a costume: its base fighter's scale
            bh = CFG["equal"] if mode == "equal" else CFG["adjusted"][base]
            braw = max(Image.open(f).convert("RGBA").getbbox()[3] - Image.open(f).convert("RGBA").getbbox()[1] for f in glob.glob(os.path.join(HERE, "raw", base, "idle", "*.png")))
            K = min(1, bh / braw)
        else:
            K = t / h if k in CFG.get("upscale", []) else min(1, t / h)
        if K != 1: resize(k, K)
        print(f"{k:11s} native {h:3d} -> {idle_height(k):3d} px (x{K:.3f})")
