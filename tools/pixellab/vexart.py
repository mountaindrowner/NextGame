"""Vex as a playable fighter: a select-screen portrait (styled after Hecky's) and his own stage.
Saves raw/vex/portrait_take<N>.png and raw/stages/vex_take<N>.png.  usage: PL_BUDGET=<generations> python3 vexart.py [portrait] [stage]"""
import base64, os, sys
from pl import call, wait_job, b64img
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); A = os.path.join(HERE, "..", "..", "assets")
def ref(path, use=None):
    w, h = Image.open(path).size; r = {"image": b64img(path), "size": {"width": w, "height": h}}
    if use: r["usage_description"] = use
    return r
def save(j, d, stem):
    res = j.get("last_response") or j.get("result") or j; imgs = res.get("images") or ([res["image"]] if res.get("image") else [])
    os.makedirs(d, exist_ok=True)
    for i, im in enumerate(imgs):
        b = im.get("base64") if isinstance(im, dict) else im
        if isinstance(b, str) and b.startswith("data:"): b = b.split(",", 1)[1]
        if b: open(os.path.join(d, f"{stem}_take{i+1}.png"), "wb").write(base64.b64decode(b))
    print(stem, "saved", len(imgs), flush=True)
todo = sys.argv[1:] or ["portrait", "stage"]
if "portrait" in todo:
    d = ("16-bit arcade fighting game character select portrait, waist-up bust facing the viewer at a slight angle: Vex, a crime boss in his fifties "
         "with slicked-back silver hair, a short silver beard and cold grey eyes, a dark purple pinstripe three-piece suit and a gold tie, one hand resting on the gold handle "
         "of a black walking cane, a cruel confident smirk, faint purple energy glowing around his other hand, detailed pixel art with strong black outlines, plain transparent background")
    r = call("POST", "/generate-image-v2", {"description": d, "image_size": {"width": 128, "height": 160}, "no_background": True,
              "reference_images": [ref(os.path.join(HERE, "raw", "vex", "east.png"), "the character to draw: same face, hair, beard, suit and cane")],
              "style_image": ref(os.path.join(A, "hecky_por.png"))})
    j = wait_job(r["background_job_id"]); print("portrait", j.get("status"), j.get("usage"), flush=True); save(j, os.path.join(HERE, "raw", "vex"), "portrait")
if "stage" in todo:
    d = ("16-bit arcade fighting game stage background, side view: a crime boss's penthouse office at night on the top floor of a skyscraper, huge floor-to-ceiling windows "
         "over a glittering city skyline under a purple night sky, a heavy gold-trimmed black desk, purple velvet curtains, a lit glass trophy case holding a golden trophy, "
         "a chandelier, moody purple and gold light, a polished black marble floor across the bottom quarter, flat open ground for fighting, detailed pixel art in the style of classic SNK fighting games, no characters, no text")
    r = call("POST", "/generate-image-v2", {"description": d, "image_size": {"width": 256, "height": 192}, "no_background": False})
    j = wait_job(r["background_job_id"]); print("stage", j.get("status"), j.get("usage"), flush=True); save(j, os.path.join(HERE, "raw", "stages"), "vex")
