"""Remove the leftover background from Papa-Leguas's portraits: a blue/purple slab behind his raised fist and a purple
blob on top of his head (bright blue/purple pixels inside those areas; his navy gloves are darker and stay).
Boxes are in the 124x150 portrait's coordinates and scale to the smaller portraits. Originals: tools/pixellab/raw/karl_v1_assets/."""
import colorsys, pathlib
from PIL import Image
A = pathlib.Path(__file__).resolve().parent.parent / "assets"
BOXES = [((16, 38, 62, 74), 195, 300, .42), ((28, 0, 54, 12), 240, 320, .3)]  # (box, hue from, hue to, min brightness)
BLUE = (16, 40, 62, 74)  # the slab's blue fill: hue 205-245, saturated, not the dark navy of his gloves
for k in ("por", "porm", "pors"):
    im = Image.open(A / f"karl_{k}.png").convert("RGBA"); px = im.load(); W, H = im.size; sx, sy = W / 124, H / 150; n = 0
    x0, y0, x1, y1 = BLUE
    for y in range(int(y0 * sy), min(H, int(y1 * sy) + 1)):
        for x in range(int(x0 * sx), min(W, int(x1 * sx) + 1)):
            r, g, b, a = px[x, y]
            if not a: continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if 205 <= h * 360 <= 245 and s > .45 and v > .35: px[x, y] = (0, 0, 0, 0); n += 1
    # the slab's outline and purple top band (between his fist and neck), and blue-grey specks under the wrist
    for (x0, y0, x1, y1), keep in (((34, 51, 50, 59), lambda h, s, v: (h < 40 or h > 340) and v > .35), ((24, 58, 40, 68), lambda h, s, v: not (200 <= h <= 260 and s > .25 and v > .3))):
        for y in range(int(y0 * sy), min(H, int(y1 * sy) + 1)):
            for x in range(int(x0 * sx), min(W, int(x1 * sx) + 1)):
                r, g, b, a = px[x, y]
                if not a: continue
                h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                if not keep(h * 360, s, v): px[x, y] = (0, 0, 0, 0); n += 1
    # the purple blob on top of his head, then lone specks left near the fist
    for y in range(0, int(12 * sy) + 1):
        for x in range(int(28 * sx), min(W, int(54 * sx) + 1)):
            r, g, b, a = px[x, y]
            if a:
                h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
                if 235 <= h * 360 <= 310 and s > .2 and v > .25: px[x, y] = (36, 22, 24, 255) if v < .45 else (78, 48, 36, 255); n += 1  # part of his hair: recoloured brown
    for y in range(int(44 * sy), int(62 * sy) + 1):
        for x in range(int(30 * sx), int(52 * sx) + 1):
            if px[x, y][3] and sum(1 for dx in (-1, 0, 1) for dy in (-1, 0, 1) if (dx or dy) and 0 <= x + dx < W and 0 <= y + dy < H and px[x + dx, y + dy][3]) <= 2:
                px[x, y] = (0, 0, 0, 0); n += 1
    # the halo round his hair (top and left of his head): purple/lavender edge pixels, background blended into the brown
    # outline; within 2 px of the outside they're recoloured to his dark brown hair outline
    def edge(x, y):
        return any(not (0 <= x + dx < W and 0 <= y + dy < H) or px[x + dx, y + dy][3] == 0 for dx in range(-2, 3) for dy in range(-2, 3))
    hal = []
    for y in range(0, int(36 * sy) + 1):
        for x in range(int(26 * sx), min(W, int(76 * sx) + 1)):
            r, g, b, a = px[x, y]
            if not a: continue
            h, s, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            if 200 <= h * 360 <= 350 and s > .12 and v > .18 and edge(x, y): hal.append((x, y, v))
    for x, y, v in hal:
        px[x, y] = (36, 22, 24, 255) if v < .5 else (62, 38, 32, 255); n += 1
    im.save(A / f"karl_{k}.png"); print(k, n, "px")
