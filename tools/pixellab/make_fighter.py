"""Create a roster fighter on PixelLab from a concept image, in the roster's style (Vizor's style character).
usage: PL_BUDGET=<generations> python3 make_fighter.py NAME   (concept: concept/NAME.png, description: make_chars.DESC[NAME])"""
import json, os, sys
from pl import call, wait_job, b64img
from make_chars import DESC
HERE = os.path.dirname(os.path.abspath(__file__))
k = sys.argv[1]; path = os.path.join(HERE, "chars.json"); chars = json.load(open(path))
if k in chars: sys.exit(f"{k} already exists: {chars[k]}")
r = call("POST", "/create-character-pro", {"description": DESC[k], "method": "create_from_concept", "concept_image": b64img(os.path.join(HERE, "concept", k + ".png")),
          "style_character_id": chars["vizor"], "view": "side", "image_size": {"width": 112, "height": 112}, "no_background": True})
cid = r.get("character_id") or r.get("id")
for j in r.get("background_job_ids") or ([r["background_job_id"]] if r.get("background_job_id") else []):
    res = wait_job(j); print(k, "job", res.get("status"), res.get("usage"), flush=True)
chars[k] = cid; json.dump(chars, open(path, "w"), indent=1); print(k, cid, flush=True)
