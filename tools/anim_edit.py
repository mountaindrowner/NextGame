#!/usr/bin/env python3
"""Fix a packed animation strip in place: reorder or drop frames (a frame index can repeat, e.g. end on frame 0 = back to
guard), set the strike frame (pk), erase small loose pieces, or remove the animation (the game falls back to the base move).
usage (from python): edit(fighter, anim, order=[...], pk=n, clean=True) / drop(fighter, anim)"""
import json, os
import numpy as np
from PIL import Image
A = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "fighters")


def _islands_clean(fr, keep_min=80):
    a = np.array(fr); al = a[..., 3] > 0; H, W = al.shape; lab = np.zeros((H, W), int); n = 0; sizes = {}
    for y in range(H):
        for x in range(W):
            if al[y, x] and not lab[y, x]:
                n += 1; st = [(y, x)]; lab[y, x] = n; c = 0
                while st:
                    cy, cx = st.pop(); c += 1
                    for dy in (-1, 0, 1):
                        for dx in (-1, 0, 1):
                            ny, nx = cy + dy, cx + dx
                            if 0 <= ny < H and 0 <= nx < W and al[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; st.append((ny, nx))
                sizes[n] = c
    if not sizes: return fr
    main = max(sizes, key=sizes.get)
    for k, c in sizes.items():
        if k != main and c < keep_min: a[lab == k] = 0
    return Image.fromarray(a)


def edit(k, anim, order=None, pk=None, clean=False):
    p = os.path.join(A, k, "meta.json"); meta = json.load(open(p)); m = meta["anims"][anim]
    st = Image.open(os.path.join(A, k, anim + ".png")).convert("RGBA"); fr = [st.crop((i * m["w"], 0, (i + 1) * m["w"], m["h"])) for i in range(m["n"])]
    if order is not None: fr = [fr[i] for i in order]
    if clean: fr = [_islands_clean(f) for f in fr]
    out = Image.new("RGBA", (m["w"] * len(fr), m["h"]), (0, 0, 0, 0))
    for i, f in enumerate(fr): out.paste(f, (i * m["w"], 0))
    out.save(os.path.join(A, k, anim + ".png"), optimize=True); m["n"] = len(fr)
    if pk is not None: m["pk"] = pk
    json.dump(meta, open(p, "w"), indent=1)


def drop(k, anim):
    p = os.path.join(A, k, "meta.json"); meta = json.load(open(p)); meta["anims"].pop(anim, None); json.dump(meta, open(p, "w"), indent=1)
    f = os.path.join(A, k, anim + ".png")
    if os.path.exists(f): os.remove(f)
