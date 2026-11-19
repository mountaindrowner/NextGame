"""Download a character's east rotation + east animations into raw/<id>/."""
import json, os, sys, urllib.request
from pl import call

RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")


def get(url, path):
    if not os.path.exists(path):
        req = urllib.request.Request(url, headers={"User-Agent": "curl/8.5.0"})
        with urllib.request.urlopen(req, timeout=120) as r, open(path, "wb") as f:
            f.write(r.read())


def fetch(name, cid):
    c = call("GET", f"/characters/{cid}")
    d = os.path.join(RAW, name); os.makedirs(d, exist_ok=True)
    get(c["rotation_urls"]["east"], os.path.join(d, "east.png"))
    got = []
    for a in c.get("animations") or []:
        for di in a["directions"]:
            if di["direction"] != "east":
                continue
            nm = a["display_name"] or a["animation_type"].split(":")[-1]; ad = os.path.join(d, nm); os.makedirs(ad, exist_ok=True)
            for i, u in enumerate(di["frames"]):
                get(u, os.path.join(ad, f"{i:02d}.png"))
            got.append((nm, len(di["frames"])))
    return got


if __name__ == "__main__":
    chars = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "chars.json")))
    for n in (sys.argv[1:] or chars):
        print(n, fetch(n, chars[n]))
