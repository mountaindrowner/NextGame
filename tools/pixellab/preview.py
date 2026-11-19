"""Contact sheet of raw frames: preview.py OUT.png name/anim [name/anim ...]"""
import glob, os, sys
from PIL import Image
RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")
rows = [sorted(glob.glob(os.path.join(RAW, r, "*.png"))) for r in sys.argv[2:]]
fw = max(Image.open(f).width for r in rows for f in r); fh = max(Image.open(f).height for r in rows for f in r)
n = max(len(r) for r in rows)
s = Image.new("RGBA", (fw * n, fh * len(rows)), (40, 40, 60, 255))
for y, r in enumerate(rows):
    for x, f in enumerate(r):
        im = Image.open(f).convert("RGBA"); s.paste(im, (x * fw, y * fh), im)
sc = 2 if s.width * 2 <= 2000 else 1
s.resize((s.width * sc, s.height * sc), Image.NEAREST).save(sys.argv[1])
print(sys.argv[1], s.size, [len(r) for r in rows])
