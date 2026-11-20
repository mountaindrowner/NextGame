#!/usr/bin/env python3
"""Measure every fighter's hitboxes and hurtbox from the sprites themselves -> assets/hitboxes.json

For each normal attack, the fully extended frame of its animation gives:
  reach  = how far the fist / foot gets in front of the fighter's centre (+ a small margin)
  y1, y2 = the height band (above the feet) the striking limb covers near its tip (+ margin)
The body's hurtbox half-width comes from the idle frame's solid columns (the visible torso, arms in guard).
The game uses these instead of one generic reach per move, so a hit lands when the limb visibly touches.
usage: hitboxes.py"""
import json, pathlib
import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
A = ROOT / "assets" / "fighters"
MARGIN, TIPBAND = 4, 14  # px added around the limb; how far back from the tip counts as "the limb"
BAND = {"jab": (.45, 1), "kick": (.3, .95), "cjab": (.25, .8), "sweep": (0, .42), "jpunch": (0, 1.2), "jkick": (0, 1.2)}
MOVES = {"jab": "punch", "kick": "kick", "cjab": "cpunch", "sweep": "lowkick", "jpunch": "airpunch", "jkick": "airkick"}
FIGHTERS = ["karl", "ivan", "vizor", "padre", "zeke", "hecky", "heckyfox", "lawslie", "rex"]


def frames(fid, anim):
    meta = json.loads((A / fid / "meta.json").read_text())["anims"].get(anim)
    if not meta:
        return None, None
    im = np.array(Image.open(A / fid / f"{anim}.png").convert("RGBA"))[:, :, 3] > 100
    return [im[:, i * meta["w"]:(i + 1) * meta["w"]] for i in range(meta["n"])], meta


def main():
    out = {}
    for fid in FIGHTERS:
        if not (A / fid / "meta.json").exists():
            continue
        idle, m = frames(fid, "idle")
        f = idle[0]; cols = f.sum(0); core = np.where(cols >= 0.3 * f.shape[0])[0]
        front, back = core.max() - m["ax"], m["ax"] - core.min()
        rec = {"hw": int(round((front + back) / 2)), "moves": {}}
        ifront = max(np.where(g.any(0))[0].max() - m["ax"] for g in idle)  # the standing silhouette's front edge
        H = m["ay"]
        for mv, anim in MOVES.items():
            fr, mm = frames(fid, anim)
            if not fr:
                continue
            lo, hi = BAND[mv]  # where this kind of strike can be, as a fraction of standing height above the feet
            best = None
            for i, g in enumerate(fr):
                rows = [r for r in range(g.shape[0]) if lo * H <= mm["ay"] - r <= hi * H]
                if not rows: continue
                sub = g[rows[0]:rows[-1] + 1]
                if not sub.any(): continue
                tip = np.where(sub.any(0))[0].max() - mm["ax"]
                if best is None or tip > best[0]: best = (tip, i, rows[0])
            tip, i, r0 = best
            sub = fr[i][r0:r0 + len([r for r in range(fr[i].shape[0]) if lo * H <= mm["ay"] - r <= hi * H])]
            c0 = int(mm["ax"] + tip - TIPBAND); rr = np.where(sub[:, max(0, c0):].any(1))[0] + r0
            y1, y2 = mm["ay"] - rr.max(), mm["ay"] - rr.min()
            rec["moves"][mv] = {"reach": int(tip + MARGIN), "y1": int(max(0, y1 - MARGIN)), "y2": int(y2 + MARGIN), "frame": int(i)}
        if fid == "heckyfox":  # a costume plays exactly like the base fighter
            rec = out["hecky"]
        out[fid] = rec
        print(f"{fid:9s} body ±{rec['hw']:2d} | " + "  ".join(f"{k} {v['reach']:3d} [{v['y1']:2d}-{v['y2']:2d}]" for k, v in rec["moves"].items()))
    (ROOT / "assets" / "hitboxes.json").write_text(json.dumps(out))


if __name__ == "__main__":
    main()
