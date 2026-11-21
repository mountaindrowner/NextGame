"""Generate a select-screen portrait for a costume: PixelLab image from the costume's sprite (subject) in the style of the
base fighter's portrait. Saves raw/<skin>/portrait_take<N>.png.  usage: PL_BUDGET=<generations> python3 portrait.py SKIN"""
import base64, json, os, sys
from pl import call, wait_job, b64img
from PIL import Image
def ref(path, use=None):
    w, h = Image.open(path).size; r = {"image": b64img(path), "size": {"width": w, "height": h}}
    if use: r["usage_description"] = use
    return r
from make_skin import SKINS
HERE = os.path.dirname(os.path.abspath(__file__)); A = os.path.join(HERE, "..", "..", "assets")
POSE = {"zekeidol": "big confident grin, arms crossed over his chest, the teal bowling ball tucked under one arm",
        "padreteen": "cocky half smile, arms crossed over his chest, the red holy book held under one arm",
        "padreteen2": "cocky half smile, long straight black hair parted in the middle falling past his shoulders, no bangs, arms crossed over his chest, the red holy book held under one arm"}
k = sys.argv[1]; base, desc = SKINS[k]
d = ("16-bit arcade fighting game character select portrait, waist-up bust facing the viewer at a slight angle, "
     + desc.split(":", 1)[1].split(" Crisp")[0] + " " + POSE[k] + ", detailed pixel art with strong black outlines, plain transparent background")
r = call("POST", "/generate-image-v2", {"description": d, "image_size": {"width": 128, "height": 160}, "no_background": True,
          "reference_images": [ref(os.path.join(HERE, "raw", k, "east.png"), "the character to draw: same face, hair and outfit")],
          "style_image": ref(os.path.join(A, base + "_por.png"))})
j = wait_job(r["background_job_id"]); print(k, j.get("status"), j.get("usage"), flush=True)
res = j.get("last_response") or j.get("result") or j; imgs = res.get("images") or []
for i, im in enumerate(imgs):
    b = im.get("base64") if isinstance(im, dict) else im
    if isinstance(b, str) and b.startswith("data:"): b = b.split(",", 1)[1]
    if b: open(os.path.join(HERE, "raw", k, f"portrait_take{i+1}.png"), "wb").write(base64.b64decode(b))
print("saved", len(imgs))
