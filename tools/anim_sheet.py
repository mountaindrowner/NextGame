#!/usr/bin/env python3
"""Labeled contact sheet of every packed animation for a fighter: anim_sheet.py ID OUT.png [anim ...]"""
import json, sys, pathlib
from PIL import Image, ImageDraw
A = pathlib.Path(__file__).resolve().parent.parent / "assets" / "fighters"
fid, out = sys.argv[1], sys.argv[2]
meta = json.loads((A / fid / "meta.json").read_text())["anims"]
names = sys.argv[3:] or sorted(meta)
cell = 112
rows = []
for n in names:
    m = meta[n]; strip = Image.open(A / fid / f"{n}.png").convert("RGBA")
    row = Image.new("RGBA", (70 + cell * m["n"], cell), (40, 40, 60, 255))
    d = ImageDraw.Draw(row); d.text((4, 50), n, fill=(255, 230, 100, 255))
    for i in range(m["n"]):
        f = strip.crop((i * m["w"], 0, (i + 1) * m["w"], m["h"]))
        x = 70 + i * cell + cell // 2 - round(m["ax"]); y = cell - 6 - m["ay"]
        row.alpha_composite(f, (max(0, x), max(0, y)))
        d.text((70 + i * cell + 2, 2), str(i), fill=(150, 150, 170, 255))
    rows.append(row)
W = max(r.width for r in rows)
sheet = Image.new("RGBA", (W, cell * len(rows)), (40, 40, 60, 255))
for i, r in enumerate(rows): sheet.alpha_composite(r, (0, i * cell))
sc = 1 if W > 1300 else 2
sheet.resize((sheet.width * sc // 1, sheet.height * sc // 1), Image.NEAREST).save(out)
print(out, sheet.size)
