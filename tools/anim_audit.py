#!/usr/bin/env python3
"""Audit packed animation strips for glitches: off-model frames (colours drift from the fighter's idle pose), floating
pieces, feet that jump, and starts/ends that don't match the guard (so chained moves connect).
usage: anim_audit.py [fighter ...] [--anims a,b,c]"""
import json, sys
import numpy as np
from PIL import Image
A = "assets/fighters/"
args = [a for a in sys.argv[1:] if not a.startswith("--")]
anims = next((a.split("=", 1)[1].split(",") for a in sys.argv[1:] if a.startswith("--anims=")), ["punch2", "punch3", "kick2", "kick3"])
FIGHTERS = args or ["karl", "keksan", "vizor", "padre", "zeke", "hecky", "lawslie", "rex", "kai", "estrella", "reyes", "mateo", "vex"]


def frames(k, a, m):
    st = Image.open(f"{A}{k}/{a}.png").convert("RGBA")
    return [np.array(st.crop((i * m["w"], 0, (i + 1) * m["w"], m["h"]))) for i in range(m["n"])]


def placed(fr, m, W=200, H=160):
    """the frame on a common canvas, its anchor (feet) at the bottom centre"""
    c = np.zeros((H, W, 4), np.uint8); x0, y0 = int(W / 2 - m["ax"]), int(H - 4 - m["ay"]); h, w = fr.shape[:2]
    xs, ys = max(0, x0), max(0, y0); xe, ye = min(W, x0 + w), min(H, y0 + h)
    c[ys:ye, xs:xe] = fr[ys - y0:ye - y0, xs - x0:xe - x0]; return c


def hist(fr):
    a = fr[..., 3] > 0; px = fr[a][:, :3].astype(int) // 32
    h = np.bincount(px[:, 0] * 64 + px[:, 1] * 8 + px[:, 2], minlength=512).astype(float); return h / max(1, h.sum())


def islands(fr):
    a = fr[..., 3] > 0; H, W = a.shape; seen = np.zeros_like(a); sizes = []
    for y in range(H):
        for x in range(W):
            if a[y, x] and not seen[y, x]:
                st = [(y, x)]; seen[y, x] = 1; n = 0
                while st:
                    cy, cx = st.pop(); n += 1
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < H and 0 <= nx < W and a[ny, nx] and not seen[ny, nx]: seen[ny, nx] = 1; st.append((ny, nx))
                sizes.append(n)
    sizes.sort(reverse=True); return [s for s in sizes[1:] if s >= 6]


def iou(a, b):
    a, b = a[..., 3] > 0, b[..., 3] > 0; return (a & b).sum() / max(1, (a | b).sum())


report = []
for k in FIGHTERS:
    meta = json.load(open(f"{A}{k}/meta.json"))["anims"]; idle = placed(frames(k, "idle", meta["idle"])[0], meta["idle"]); hi = hist(idle)
    for a in anims:
        if a not in meta: continue
        m = meta[a]; fr = [placed(f, m) for f in frames(k, a, m)]; issues = []
        for i, f in enumerate(fr):
            d = np.abs(hist(f) - hi).sum()
            if d > .55: issues.append(f"f{i} off-model ({d:.2f})")
            isl = islands(f)
            if isl: issues.append(f"f{i} {len(isl)} loose piece(s) {isl[:3]}")
        s0, s1 = iou(fr[0], idle), iou(fr[-1], idle)
        if s0 < .55: issues.append(f"starts away from guard ({s0:.2f})")
        if s1 < .45: issues.append(f"ends away from guard ({s1:.2f})")
        report.append((k, a, issues))
for k, a, iss in report:
    print(f"{'OK  ' if not iss else 'FLAG'} {k:9s} {a:7s} " + ("; ".join(iss)))
