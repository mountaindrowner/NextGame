"""Paint Estrella's bare midriff over with her black top, in every packed frame.

The v2 sprite has a cropped top; the owner wants her covered, like the v1 design.
Runs on the packed strips in assets/fighters/estrella/ and on assets/estrella_spr.png
(run it again after pack.py or spr.py; run it once on fresh output, not twice).
  python3 tools/pixellab/cover_midriff.py            # rewrite the strips
  python3 tools/pixellab/cover_midriff.py --debug D  # write overlay sheets to D, change nothing
"""
import colorsys, json, sys
from collections import deque
from pathlib import Path
from PIL import Image

A = Path(__file__).resolve().parents[2] / "assets/fighters/estrella"
TOP = [(0x1c, 0x10, 0x25), (0x22, 0x17, 0x29), (0x29, 0x21, 0x2f), (0x33, 0x2e, 0x38)]  # dark -> light

def hsv(c):
    return colorsys.rgb_to_hsv(c[0] / 255, c[1] / 255, c[2] / 255)

def is_skin(c):
    h, s, v = hsv(c)
    return c[3] > 0 and v > 0.55 and 0.02 < h * 360 < 29.5 and 0.25 < s < 0.75

def is_gold(c):
    h, s, v = hsv(c)
    return c[3] > 0 and 29.5 <= h * 360 < 50 and s >= 0.55 and v > 0.6

def is_white(c):
    h, s, v = hsv(c)
    return c[3] > 0 and s < 0.25 and v > 0.78

def is_purple(c):
    h, s, v = hsv(c)
    return c[3] > 0 and 240 <= h * 360 <= 300 and s > 0.2 and 0.18 < v < 0.65

def is_blue(c):
    h, s, v = hsv(c)
    return c[3] > 0 and 200 <= h * 360 <= 240 and s > 0.4 and v > 0.35

def is_top(c):
    return c[3] > 0 and max(c[:3]) < 0x40

def skin_parts(f, belt=None, span=None):
    """Bare-belly skin found as regions: skin that sits on her belt or pants and is boxed in by
    clothes (a fist or a face pokes out into the empty background instead)."""
    w, h = f.size; px = f.load(); seen = set(); out = set()
    for sy in range(h):
        for sx in range(w):
            if (sx, sy) in seen or not is_skin(px[sx, sy]):
                continue
            comp = []; q = deque([(sx, sy)]); seen.add((sx, sy))
            while q:
                x, y = q.popleft(); comp.append((x, y))
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and is_skin(px[nx, ny]):
                        seen.add((nx, ny)); q.append((nx, ny))
            ys = [y for _, y in comp]
            if len(comp) < 5 or max(ys) - min(ys) > 11 or min(ys) < h * .3:
                continue
            onbelt = sum(1 for x, y in comp if any(0 <= y + d < h and (is_gold(px[x, y + d]) or is_purple(px[x, y + d])) for d in (1, 2)))
            near_bg = sum(1 for x, y in comp if any(not (0 <= x + dx < w and 0 <= y + dy < h) or px[x + dx, y + dy][3] == 0
                                                    for dx in (-2, -1, 0, 1, 2) for dy in (-2, -1, 0, 1, 2)))
            blue = sum(1 for x, y in comp for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)) if 0 <= x + dx < w and 0 <= y + dy < h and is_blue(px[x + dx, y + dy]))
            if belt is not None and (max(ys) < belt - 2 or not all(span[0] - 4 <= x <= span[1] + 4 for x, _ in comp)):
                continue
            if onbelt >= 2 and near_bg <= .4 * len(comp) and blue <= 2:
                out.update(comp)
    return out

def frame_mask(f, extra=None):
    """Return the set of pixels to repaint in one frame."""
    w, h = f.size; px = f.load()
    gold = [[is_gold(px[x, y]) for x in range(w)] for y in range(h)]
    # the belt: a horizontal run of gold with her purple pants right under it
    # (the gold star on her shoulder has white and blue under it; the pants stripes run up and down)
    belt, best_score, span = None, 0, None
    for y in range(int(h * .25), int(h * .85)):
        x = 0
        while x < w:
            if not gold[y][x]:
                x += 1; continue
            x2 = x
            while x2 < w and gold[y][x2]: x2 += 1
            if x2 - x >= 3:
                under = sum(is_purple(px[i, j]) for j in range(y + 1, min(h, y + 6)) for i in range(max(0, x - 2), min(w, x2 + 2)))
                if under >= 4 and x2 - x > best_score:
                    belt, best_score, span = y, x2 - x, (x, x2 - 1)
            x = x2
    if belt is None:
        return skin_parts(f), None
    while belt > 0 and any(gold[belt - 1][i] for i in range(span[0], span[1] + 1)):  # the belt's top edge
        belt -= 1
    x0, x1 = span[0] - 4, span[1] + 4
    # seeds: skin pixels in the 3 rows right above the belt, inside the belt's span
    seeds = [(x, y) for y in range(belt - 3, belt + 1) for x in range(max(0, x0), min(w, x1 + 1)) if is_skin(px[x, y])]
    out = set(seeds); q = deque(seeds); ytop = belt - 10
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if (nx, ny) in out or not (x0 <= nx <= x1 and ytop <= ny < belt and 0 <= nx < w):
                continue
            if is_skin(px[nx, ny]) or (extra == "white" and is_white(px[nx, ny])):
                out.add((nx, ny)); q.append((nx, ny))
    return {(x, y) for x, y in out | skin_parts(f, belt, span) if y < belt}, belt

def paint(f, mask):
    px = f.load()
    for x, y in mask:
        v = hsv(px[x, y])[2]
        px[x, y] = TOP[min(3, int((v - 0.55) / 0.45 * 4))] + (255,)

# Hand-placed fixes for frames the detector can't read: (anim, frame) -> list of
# (x0, y0, x1, y1, flags); flags: "w" also paints her white crop top, "g" for the
# glowing High Note frames (the glow turns skin yellow), "-" marks a box to keep (a fist).
MANUAL = {
    ("cpunch", 3): [(44, 25, 58, 45, "w"), (28, 33, 45, 42, "-")],
    ("cpunch", 4): [(42, 24, 58, 46, "w"), (28, 34, 45, 42, "-")],
    ("cpunch", 5): [(46, 24, 63, 46, "w"), (33, 34, 49, 42, "-")],
    ("kick", 3): [(22, 44, 34, 48, "")],
    ("kick", 4): [(26, 43, 40, 47, "")],
    ("kick", 5): [(24, 41, 40, 45, "")],
    ("kick", 6): [(22, 41, 40, 44, "")],
    ("kick", 7): [(28, 41, 42, 44, "")],
    ("kick", 8): [(25, 41, 38, 45, "")],
    ("lowkick", 3): [(27, 26, 37, 44, ""), (17, 42, 29, 52, "-")],
    ("lowkick", 4): [(25, 26, 36, 45, "")],
    ("lowkick", 5): [(26, 26, 36, 45, "")],
    ("lowkick", 6): [(27, 26, 37, 45, "")],
    ("special", 3): [(22, 43, 38, 49, "g")],
    ("special", 4): [(22, 43, 38, 49, "g")],
    ("special", 5): [(22, 43, 38, 49, "g")],
    ("special", 6): [(22, 43, 38, 49, "g")],
    ("special", 7): [(18, 43, 34, 46, "g")],
    ("special", 8): [(18, 43, 34, 46, "g")],
    ("fall", 3): [(47, 44, 60, 50, "")],
    ("fall", 4): [(48, 47, 62, 52, "")],
    ("airkick", 2): [(28, 43, 46, 48, "")],
    ("airkick", 3): [(33, 49, 48, 52, "")],
    ("airkick", 4): [(33, 54, 48, 57, "")],
    ("punch", 5): [(29, 44, 46, 48, "")],
    ("jump", 6): [(22, 34, 36, 42, "")],
    ("airpunch", 3): [(28, 48, 42, 53, ""), (10, 42, 28, 51, "-")],
    ("airpunch", 4): [(25, 52, 42, 56, ""), (12, 45, 26, 54, "-")],
}

# Generation leftovers (a white smudge and a dark blot behind her legs when she's knocked
# down): erase white and near-black pixels inside these boxes.
CLEAN = {("fall", 6): (20, 62, 38, 78), ("fall", 7): (16, 58, 42, 76), ("fall", 8): (22, 66, 38, 76)}

def clean(f, box):
    px = f.load(); x0, y0, x1, y1 = box
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            c = px[x, y]
            if c[3] and (is_white(c) or max(c[:3]) < 0x40):
                px[x, y] = (0, 0, 0, 0)
    w, h = f.size
    for y in range(max(0, y0 - 6), min(h, y1 + 8)):  # the smudge's white tail runs into her legs
        for x in range(max(0, x0 - 4), min(w, x1 + 6)):
            if px[x, y][3] and is_white(px[x, y]) and hsv(px[x, y])[1] < .12:
                px[x, y] = (0, 0, 0, 0)
    seen = set()  # and drop specks left floating on their own
    for sy in range(h):
        for sx in range(w):
            if (sx, sy) in seen or not px[sx, sy][3]:
                continue
            comp = []; q = deque([(sx, sy)]); seen.add((sx, sy))
            while q:
                x, y = q.popleft(); comp.append((x, y))
                for dx in (-1, 0, 1):
                    for dy in (-1, 0, 1):
                        n = (x + dx, y + dy)
                        if 0 <= n[0] < w and 0 <= n[1] < h and n not in seen and px[n][3]:
                            seen.add(n); q.append(n)
            if len(comp) < 6:
                for p in comp: px[p] = (0, 0, 0, 0)

def is_warm(c, glow=False):
    h, s, v = hsv(c); h *= 360
    if c[3] == 0 or v < 0.4:
        return False
    if glow:
        return 5 <= h <= 55 and s >= 0.15
    return 5 <= h <= 45 and 0.2 <= s <= 0.8 and not is_gold(c)

def manual_mask(f, boxes):
    w, h = f.size; px = f.load(); keep = set(); out = set()
    for x0, y0, x1, y1, fl in boxes:
        if "-" in fl:
            keep |= {(x, y) for x in range(x0, x1 + 1) for y in range(y0, y1 + 1)}
    for x0, y0, x1, y1, fl in boxes:
        if "-" in fl:
            continue
        for y in range(y0, min(h, y1 + 1)):
            for x in range(x0, min(w, x1 + 1)):
                c = px[x, y]
                if (x, y) not in keep and (is_warm(c, "g" in fl) or ("w" in fl and is_white(c))):
                    out.add((x, y))
    return out

def run(debug=None):
    meta = json.loads((A / "meta.json").read_text())["anims"]
    sheets = []
    for k, m in meta.items():
        strip = Image.open(A / f"{k}.png").convert("RGBA"); w, h, n = m["w"], m["h"], m["n"]
        for i in range(n):
            f = strip.crop((i * w, 0, i * w + w, h))
            mask, belt = frame_mask(f)
            if (k, i) in MANUAL:
                mask = mask - {p for b in MANUAL[(k, i)] if "-" in b[4] for p in [(x, y) for x in range(b[0], b[2] + 1) for y in range(b[1], b[3] + 1)]}
                mask |= manual_mask(f, MANUAL[(k, i)])
            if debug:
                g = f.copy(); gp = g.load()
                for p in mask: gp[p] = (255, 0, 255, 255)
                if belt is not None:
                    for x in range(w):
                        if gp[x, belt][3] == 0: gp[x, belt] = (0, 255, 0, 120)
                a = f.copy(); paint(a, mask)
                sheets.append((k, i, f, g, a))
            else:
                paint(f, mask)
                if (k, i) in CLEAN:
                    clean(f, CLEAN[(k, i)])
                strip.paste(f, (i * w, 0))
        if not debug:
            strip.save(A / f"{k}.png")
    if not debug:  # the standing still (cutscenes, silhouettes), made by spr.py
        still = A.parent.parent / "estrella_spr.png"
        f = Image.open(still).convert("RGBA"); paint(f, frame_mask(f)[0]); f.save(still)
    if debug:
        D = Path(debug); D.mkdir(parents=True, exist_ok=True)
        by = {}
        for k, i, f, g, a in sheets: by.setdefault(k, []).append((f, g, a))
        for k, fr in by.items():
            W = sum(f.width for f, *_ in fr); H = fr[0][0].height
            S = Image.new("RGBA", (W, H * 3), (70, 70, 90, 255)); x = 0
            for f, g, a in fr:
                S.alpha_composite(f, (x, 0)); S.alpha_composite(g, (x, H)); S.alpha_composite(a, (x, 2 * H)); x += f.width
            S.resize((S.width * 4, S.height * 4), Image.NEAREST).save(D / f"{k}.png")

if __name__ == "__main__":
    run(sys.argv[2] if len(sys.argv) > 2 and sys.argv[1] == "--debug" else None)
