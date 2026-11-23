#!/usr/bin/env python3
"""Check every fighter's normal attacks against the move style guide (docs/MOVE_STYLE_GUIDE.md).

For each attack it finds the strike frame (the frame where the fist or foot is furthest out) and measures, as a
fraction of the fighter's standing height (floor = 0, top of the head = 1):
  strike  how high the fist / foot is at the tip
  reach   how far the tip gets past the front of the guard pose
  top     how high the highest point of the body or limb is (an uppercut rises above the head, a crouch stays low)
  pk      whether the game's hit frame (meta pk) is the strike frame
and prints PASS / FAIL per rule. The numbers are hints: a bent knee or a shifted stance can fool them, so also look
at the comparison sheets (--sheets=DIR writes one image per move with every fighter side by side).
usage: move_standard.py [fighter ...] [--json] [--sheets=DIR]"""
import json, sys, pathlib
import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
A = ROOT / "assets" / "fighters"
FIGHTERS = ["karl", "keksan", "vizor", "padre", "zeke", "hecky", "lawslie", "rex", "kai", "estrella", "reyes", "mateo", "vex",
            "heckyfox", "karl2", "padreteen2", "zekeidol"]
TIP = 8  # px back from the tip that count as the fist / foot

# THE STANDARD (keep in step with docs/MOVE_STYLE_GUIDE.md). Heights are fractions of standing height (floor 0, head 1).
#   limb: which limb strikes ("arm" or "leg")   strike: (min, max) height of the fist / foot / knee on the hit frame
#   reach: min distance the strike gets past the front of the guard   top: (min, max) highest point of the body (crouch)
#   up: an upward strike, scored at its highest point
STD = {
    "punch":    {"name": "standing punch", "limb": "arm", "strike": (.55, .95), "reach": .08, "top": (.85, 1.2)},
    "punch2":   {"name": "second punch (cross)", "limb": "arm", "strike": (.55, .95), "reach": .08, "top": (.85, 1.2)},
    "punch3":   {"name": "uppercut finisher", "limb": "arm", "up": True, "strike": (.85, 1.6)},
    "kick":     {"name": "standing high kick", "limb": "leg", "strike": (.55, 1.2), "reach": .08},
    "kick2":    {"name": "second kick (body kick)", "limb": "leg", "strike": (.3, .78), "reach": .05},
    "kick3":    {"name": "rising kick / knee finisher", "limb": "leg", "strike": (.52, 1.3)},
    "cpunch":   {"name": "crouching punch", "limb": "arm", "strike": (.3, .72), "reach": .05, "top": (.4, .93)},
    "lowkick":  {"name": "low sweep", "limb": "leg", "strike": (0, .27), "reach": .1},
    "airpunch": {"name": "jumping punch", "limb": "arm", "air": True, "reach": .03},
    "airkick":  {"name": "jumping kick", "limb": "leg", "air": True, "reach": .03},
}
BASE_HB = {"punch": "jab", "kick": "kick", "cpunch": "cjab", "lowkick": "sweep", "airpunch": "jpunch", "airkick": "jkick"}
HBX = json.loads((ROOT / "assets" / "hitboxes.json").read_text()) if (ROOT / "assets" / "hitboxes.json").exists() else {}
SKINS = {"heckyfox", "karl2", "padreteen2", "zekeidol"}


def load(fid, anim):
    mp = A / fid / "meta.json"
    if not mp.exists(): return None, None
    m = json.loads(mp.read_text())["anims"].get(anim)
    if not m: return None, None
    im = np.array(Image.open(A / fid / f"{anim}.png").convert("RGBA"))[:, :, 3] > 100
    return [im[:, i * m["w"]:(i + 1) * m["w"]] for i in range(m["n"])], m


def canvas(g, m, W=260, Hc=200):
    """a frame on a common canvas: its anchor (between the feet) at x=W/2, the floor at y=Hc-10"""
    c = np.zeros((Hc, W), bool); x0, y0 = int(round(W / 2 - m["ax"])), int(round(Hc - 10 - m["ay"]))
    h, w = g.shape; xs, ys = max(0, x0), max(0, y0); xe, ye = min(W, x0 + w), min(Hc, y0 + h)
    c[ys:ye, xs:xe] = g[ys - y0:ye - y0, xs - x0:xe - x0]; return c


def dilate(a, r):
    out = a.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out |= np.roll(np.roll(a, dy, 0), dx, 1)
    return out


def comps(mask):
    """connected pieces of a mask, biggest first"""
    lab = np.zeros(mask.shape, int); n = 0; H, W = mask.shape; out = []
    for y, x in zip(*np.where(mask)):
        if lab[y, x]: continue
        n += 1; st = [(y, x)]; lab[y, x] = n; pts = []
        while st:
            cy, cx = st.pop(); pts.append((cy, cx))
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < H and 0 <= nx < W and mask[ny, nx] and not lab[ny, nx]: lab[ny, nx] = n; st.append((ny, nx))
        out.append(np.array(pts))
    return sorted(out, key=len, reverse=True)


def measure(c, idle_c, H, s):
    floor = c.shape[0] - 10; mid = c.shape[1] // 2
    ys, xs = np.where(c)
    if not len(xs): return None
    hgt = lambda y: (floor - y) / H
    top = hgt(ys.min())
    if s.get("air"):  # a jump attack: the striking limb is whatever sticks out in front of the jumping body
        y0, y1 = ys.min(), ys.max(); tip = xs.max(); rows = ys[xs >= tip - TIP]
        core = np.where(c.sum(0) >= .25 * (y1 - y0))[0]
        return {"strike": float((y1 - rows.mean()) / max(1, y1 - y0)), "reach": float((tip - core.max()) / H), "top": float(top)}
    new = c & ~dilate(idle_c, 2)  # what moved away from the guard pose
    pieces = [p for p in comps(new) if len(p) >= 12]
    if s["limb"] == "leg":  # a kicking leg reaches below the waist; arms don't
        pieces = [p for p in pieces if hgt(p[:, 0].max()) < .5 and p[:, 1].max() > mid]
    else:
        pieces = [p for p in pieces if hgt(p[:, 0].min()) > .3 and p[:, 1].max() > mid - 4]
    if not pieces:
        return {"strike": None, "reach": None, "top": float(top)}
    pts = np.concatenate(pieces)
    if s.get("up"):
        front = pts[pts[:, 1] >= mid - 6]
        if not len(front): return {"strike": None, "reach": None, "top": float(top)}
        y = front[:, 0].min(); return {"strike": float(hgt(y)), "reach": float((front[:, 1].max() - mid) / H), "top": float(top)}
    tip = pts[:, 1].max(); near = pts[pts[:, 1] >= tip - TIP]
    if s["limb"] == "leg" and s.get("strike", (0,))[0] >= .5:  # a rising kick or knee: score the highest part of the leg out front
        fr = pts[pts[:, 1] >= mid]; y = fr[:, 0].min() if len(fr) else near[:, 0].mean()
        return {"strike": float(hgt(y)), "reach": float((tip - mid) / H - 0.0), "top": float(top)}
    return {"strike": float(hgt(near[:, 0].mean())), "reach": float((tip - mid) / H), "top": float(top)}


def hit_frame(fid, anim, m):
    """the frame the game shows while the hit is active (see akOf in src/game.js)"""
    h = BASE_HB.get(anim) and HBX.get(fid, {}).get("moves", {}).get(BASE_HB[anim])
    if h and fid not in SKINS: return min(h["frame"], m["n"] - 1)
    return m.get("pk") if m.get("pk") is not None else {"punch": 4, "kick": 4, "lowkick": 3, "cpunch": 2, "airkick": 2, "airpunch": 2}.get(anim, m["n"] // 2)


def check(fid):
    idle, im = load(fid, "idle")
    if not idle: return None
    idle_c = canvas(idle[0], im); ys, xs = np.where(idle_c)
    H = float(idle_c.shape[0] - 10 - ys.min())
    out = {}
    for anim, s in STD.items():
        fr, m = load(fid, anim)
        if not fr:
            out[anim] = {"missing": True}; continue
        k = hit_frame(fid, anim, m)
        ms = [measure(canvas(f, m), idle_c, H, s) for f in fr]
        v = dict(ms[k] or {}); v["frame"] = k; v["n"] = m["n"]
        # the best frame: furthest out (highest, for rising moves)
        key = lambda i: -9 if not ms[i] or ms[i]["strike"] is None else (ms[i]["strike"] if s.get("up") or (s["limb"] == "leg" and s.get("strike", (0,))[0] >= .5) else (ms[i]["reach"] or -9))
        v["best"] = max(range(len(ms)), key=key)
        fails = []
        if v.get("strike") is None:
            fails.append("no striking " + s["limb"] + " visible on the hit frame")
        else:
            if "strike" in s and not (s["strike"][0] <= v["strike"] <= s["strike"][1]):
                fails.append(f"strike height {v['strike']:.2f} outside {s['strike'][0]:.2f}-{s['strike'][1]:.2f}")
            if "reach" in s and v["reach"] is not None and v["reach"] < s["reach"]:
                fails.append(f"reach {v['reach']:.2f} under {s['reach']:.2f}")
        if "top" in s and not (s["top"][0] <= v["top"] <= s["top"][1]):
            fails.append(f"body height {v['top']:.2f} outside {s['top'][0]:.2f}-{s['top'][1]:.2f}")
        b = ms[v["best"]]
        if not fails and b and b.get("strike") is not None and v["best"] != k and abs(v["best"] - k) > 1:
            fails.append(f"hit frame {k} but the strike peaks on frame {v['best']}")
        v["fails"] = fails
        out[anim] = v
    return out


def sheet(anim, out, fids):
    """one image: every fighter's hit frame for this move side by side, with guide lines at the low (0.25),
    chest (0.55) and head (1.0) heights, so a move that breaks the standard stands out at a glance"""
    from PIL import ImageDraw
    Z, CW, CH, cols = 2, 130, 120, 6
    tiles = []
    for fid in fids:
        idle, im = load(fid, "idle"); fr, m = load(fid, anim)
        if not idle or not fr: continue
        ic = canvas(idle[0], im); H = ic.shape[0] - 10 - np.where(ic)[0].min()
        k = hit_frame(fid, anim, m)
        img = Image.open(A / fid / f"{anim}.png").convert("RGBA").crop((k * m["w"], 0, (k + 1) * m["w"], m["h"]))
        t = Image.new("RGBA", (CW, CH), (70, 70, 80, 255)); gy = CH - 6
        t.alpha_composite(img, (max(0, int(40 - m["ax"])), max(0, int(gy - m["ay"]))))
        t = t.resize((CW * Z, CH * Z), Image.NEAREST); d = ImageDraw.Draw(t)
        for f, col in ((.25, (80, 160, 255)), (.55, (255, 200, 60)), (1.0, (255, 90, 90))):
            y = (gy - f * H) * Z; d.line([(0, y), (CW * Z, y)], fill=col)
        d.text((4, 3), f"{fid}  hit frame {k}", fill=(255, 255, 255)); tiles.append(t)
    W = CW * Z * cols; rows = (len(tiles) + cols - 1) // cols
    sh = Image.new("RGB", (W, CH * Z * rows + 24), (30, 30, 30)); ImageDraw.Draw(sh).text((6, 6), f"{anim}: {STD[anim]['name']}   (blue = shin 0.25, yellow = chest 0.55, red = top of head)", fill=(255, 255, 255))
    for i, t in enumerate(tiles): sh.paste(t, ((i % cols) * CW * Z, 24 + (i // cols) * CH * Z))
    sh.save(out)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    sd = next((a.split("=", 1)[1] for a in sys.argv[1:] if a.startswith("--sheets=")), None)
    if sd:  # e.g. --sheets=/tmp/out : one comparison image per move
        pathlib.Path(sd).mkdir(parents=True, exist_ok=True)
        for anim in STD: sheet(anim, f"{sd}/{anim}.png", args or FIGHTERS)
        print("sheets written to", sd); return
    res = {}
    total = bad = 0
    for fid in args or FIGHTERS:
        r = check(fid)
        if r is None: continue
        res[fid] = r
        for anim, v in r.items():
            if v.get("missing"): continue
            total += 1
            st = "PASS" if not v["fails"] else "FAIL"
            bad += st == "FAIL"
            if "--json" not in sys.argv:
                f2 = lambda x: "  -- " if x is None else f"{x:5.2f}"
                print(f"{st} {fid:10s} {anim:8s} strike {f2(v.get('strike'))} reach {f2(v.get('reach'))} top {f2(v.get('top'))} "
                      f"hit f{v['frame']} (peak f{v['best']})  {'; '.join(v['fails'])}")
    if "--json" in sys.argv:
        print(json.dumps(res, indent=1))
    else:
        print(f"\n{total - bad}/{total} pass")


if __name__ == "__main__":
    main()
