"""Make assets/<name>_spr.png (the standing still) from raw/<name>/east.png: cropped to the figure, scaled like pack.py.
usage: spr.py NAME [NAME ...]"""
import os, sys
from PIL import Image
from pack import SCALE, shrink
HERE = os.path.dirname(os.path.abspath(__file__))
for n in sys.argv[1:]:
    im = Image.open(os.path.join(HERE, "raw", n, "east.png")).convert("RGBA"); im = im.crop(im.getchannel("A").getbbox())
    s = SCALE.get(n, 1.0)
    if s != 1.0: im = shrink(im, round(im.width * s), round(im.height * s))
    im.save(os.path.join(HERE, "..", "..", "assets", n + "_spr.png")); print(n, im.size)
