"""Post-pack fixes for Mike-Fila's strips (run by sizes.py after packing): erase the generation leftovers PixelLab drew
around a few moves (cyan rings over the crouching punch, a stray yellow crescent in the forward throw, specks after the
second kick). His back throw was drawn with a black sack in every take, so it is left out (the game reuses the forward throw)."""
import json, os, sys
import numpy as np
from PIL import Image
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
from anim_edit import _islands_clean
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "assets", "fighters", "mike")
FIX = {"cpunch": ([(170, 200)], 80), "throwf": ([(40, 60)], 120), "kick2": ([], 80)}  # anim: (hue ranges to erase, smallest piece kept)


def fix(anim, hues, keep_min):
    m = json.load(open(os.path.join(A, "meta.json")))["anims"].get(anim)
    if not m: return
    st = Image.open(os.path.join(A, anim + ".png")).convert("RGBA"); out = st.copy()
    for i in range(m["n"]):
        a = np.array(st.crop((i * m["w"], 0, (i + 1) * m["w"], m["h"]))); rgb = a[..., :3] / 255.0
        mx, mn = rgb.max(-1), rgb.min(-1); s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0); d = np.maximum(mx - mn, 1e-6)
        r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
        h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
        kill = np.zeros(mx.shape, bool)
        for lo, hi in hues: kill |= (h >= lo) & (h <= hi) & (s > .45) & (mx > .45)
        a[kill & (a[..., 3] > 0)] = 0
        out.paste(_islands_clean(Image.fromarray(a), keep_min), (i * m["w"], 0))
    out.save(os.path.join(A, anim + ".png"))


PK = {"punch2": 4, "kick2": 6, "kick3": 5}  # the chain moves' strike frames (moves.py takes come without one)


if __name__ == "__main__":
    for k, (hues, keep) in FIX.items(): fix(k, hues, keep)
    meta = json.load(open(os.path.join(A, "meta.json")))
    for k, v in PK.items():
        if k in meta["anims"]: meta["anims"][k]["pk"] = v
    json.dump(meta, open(os.path.join(A, "meta.json"), "w"), indent=1)
