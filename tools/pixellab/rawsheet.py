"""Labeled sheet of raw take folders: rawsheet.py CHAR OUT.png [dir ...] (default: every take folder with __)"""
import glob, os, sys
from PIL import Image, ImageDraw
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")
c, out = sys.argv[1], sys.argv[2]
dirs = sys.argv[3:] or sorted(d for d in os.listdir(os.path.join(RAW, c)) if "__" in d)
rows = []
for d in dirs:
    fs = sorted(glob.glob(os.path.join(RAW, c, d, "*.png"))); ims = [Image.open(f).convert("RGBA") for f in fs]
    cw = max(i.width for i in ims); ch = max(i.height for i in ims)
    r = Image.new("RGBA", (90 + cw * len(ims), ch), (40, 40, 60, 255)); dr = ImageDraw.Draw(r); dr.text((3, ch // 2), d, fill=(255, 230, 100, 255))
    for i, im in enumerate(ims): r.alpha_composite(im, (90 + i * cw, 0)); dr.text((92 + i * cw, 2), str(i), fill=(150, 150, 170, 255))
    rows.append(r)
W = max(r.width for r in rows); s = Image.new("RGBA", (W, sum(r.height for r in rows)), (40, 40, 60, 255)); y = 0
for r in rows: s.alpha_composite(r, (0, y)); y += r.height
k = min(1.0, 1300 / W); s = s.resize((round(W * k), round(s.height * k)), Image.LANCZOS) if k < 1 else s
s.save(out); print(out, s.size)
