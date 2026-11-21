"""Turn Agent Reyes' red gear (cap, vest, collar) green, keeping every pixel's shading.

His gear reds are very saturated (S >= 0.75, hue 325-8 degrees); his boots and skin shadows are
duller (S 0.5-0.7), so they stay. Safe to run again (green pixels don't match).
usage: python3 tools/recolor_reyes.py [file ...]   (default: every Reyes sprite strip, his standing sprite,
and the portraits, rebuilt from the full-size cut tools/pixellab/concept/reyes_por_cut.png)"""
import colorsys, glob, pathlib, sys
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent / "assets"
HUE = 135 / 360  # emerald green


def is_red(r, g, b):
    h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    return (h * 360 >= 325 or h * 360 <= 8) and s >= .75


def green(px, x, y):
    r, g, b, a = px[x, y]; h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    nr, ng, nb = colorsys.hsv_to_rgb(HUE, s * .85, v * .92); px[x, y] = (round(nr * 255), round(ng * 255), round(nb * 255), a)


def recolor_big(path, min_px=3000):
    """The full-size portrait: only big connected red areas (cap, vest, collar), so his lips and face shadows stay."""
    from collections import deque
    im = Image.open(path).convert("RGBA"); px = im.load(); W, H = im.size; seen = bytearray(W * H); n = 0
    for sy in range(H):
        for sx in range(W):
            if seen[sy * W + sx]: continue
            seen[sy * W + sx] = 1; r, g, b, a = px[sx, sy]
            if not a or not is_red(r, g, b): continue
            comp = [(sx, sy)]; q = deque(comp)
            while q:
                x, y = q.popleft()
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < W and 0 <= ny < H and not seen[ny * W + nx]:
                        r, g, b, a = px[nx, ny]
                        if a and is_red(r, g, b): seen[ny * W + nx] = 1; comp.append((nx, ny)); q.append((nx, ny))
            if len(comp) >= min_px:
                for x, y in comp: green(px, x, y)
                n += len(comp)
    im.save(path); return n


def recolor(path):
    im = Image.open(path); mode = im.mode; im = im.convert("RGBA"); px = im.load(); n = 0
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if not a:
                continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if (h * 360 >= 325 or h * 360 <= 8) and s >= .75:
                nr, ng, nb = colorsys.hsv_to_rgb(HUE, s * .85, v * .92)
                px[x, y] = (round(nr * 255), round(ng * 255), round(nb * 255), a); n += 1
    (im if mode == "RGBA" else im.convert(mode)).save(path)
    return n


def portraits():
    """Rebuild the select-screen portraits and head icon from the recoloured full-size cut (as made in v1.33)."""
    from PIL import ImageFilter
    cut_path = ROOT.parent / "tools/pixellab/concept/reyes_por_cut.png"; print("portrait cut", recolor_big(cut_path), "px")
    cut = Image.open(cut_path).convert("RGBA")
    for (w, h), k in (((124, 150), "por"), ((93, 112), "porm"), ((66, 80), "pors")):
        b = cut.resize((w, h), Image.LANCZOS); p = b.load()
        for y in range(h):
            for x in range(w):
                r, g, bb, al = p[x, y]; p[x, y] = (r, g, bb, 255) if al >= 150 else (0, 0, 0, 0)
        b.save(ROOT / f"reyes_{k}.png")
    hd = Image.new("RGBA", (400, 400), (40, 30, 70, 255)); hd.alpha_composite(cut.crop((230, 150, 630, 550)))
    hd.convert("RGB").resize((32, 32), Image.LANCZOS).filter(ImageFilter.UnsharpMask(1, 60, 2)).save(ROOT / "reyes_head.png")


if __name__ == "__main__":
    files = sys.argv[1:] or sorted(glob.glob(str(ROOT / "fighters/reyes/*.png"))) + [str(ROOT / "reyes_spr.png")]
    for f in files:
        print(f"{pathlib.Path(f).name:16s} {recolor(f)} px")
    if not sys.argv[1:]:
        portraits()
