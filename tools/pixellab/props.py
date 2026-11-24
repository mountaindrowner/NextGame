"""Generate Story-mode props (hydrant, trash can, crate, wet-floor sign, food, cash) as transparent PixelLab images.
Saves raw/props/<name>_take<N>.png.  usage: PL_BUDGET=<generations> python3 props.py [NAME ...]"""
import base64, os, sys
from pl import call, wait_job
HERE = os.path.dirname(os.path.abspath(__file__))
STYLE = "16-bit arcade beat 'em up game prop in the style of Streets of Rage 2 and Final Fight, side view, crisp pixel art with a dark outline and strong shading, lit from the upper left, single object, centered, plain transparent background, no text"
PROPS = {
    "hydrant": (48, 48, "a classic red cast-iron city fire hydrant with a yellow cap, chunky side nozzles and bolts, slightly scuffed paint"),
    "can":     (48, 48, "a dented galvanized steel street trash can with a lid and side handles, grey metal with ridges"),
    "crate":   (48, 48, "a sturdy wooden shipping crate made of planks with a diagonal brace and metal corner brackets"),
    "wet":     (48, 48, "a yellow plastic wet floor caution sign, A-frame folding stand, with a black slipping person pictogram"),
    "pizza":   (32, 32, "a single slice of pepperoni pizza with melted cheese and a golden crust"),
    "chicken": (32, 32, "a whole roast chicken on a small plate, golden brown and steaming"),
    "tray":    (32, 32, "a round brown plastic fast food serving tray seen at a slight angle, a flat disc with a raised rim, plain, no logo"),
    "sandwich": (32, 32, "a fast food chicken sandwich wrapped in white paper, a golden fried chicken fillet and a toasted bun peeking out of the paper wrapper, no logo"),
    "lemonade": (32, 32, "a large white paper fast food cup full of yellow lemonade with a lid and a red and white striped straw, a lemon slice on the side, no logo"),
    "fries":   (32, 32, "a red paper carton of golden crinkle-cut french fries, overflowing, plain, no logo"),
    "cash":    (32, 32, "a thick stack of green dollar bills held with a paper band"),
}
names = sys.argv[1:] or list(PROPS)
d = os.path.join(HERE, "raw", "props"); os.makedirs(d, exist_ok=True)
for k in names:
    w, h, desc = PROPS[k]
    r = call("POST", "/generate-image-v2", {"description": desc + ", " + STYLE, "image_size": {"width": w, "height": h}, "no_background": True})
    j = wait_job(r["background_job_id"]); print(k, j.get("status"), j.get("usage"), flush=True)
    res = j.get("last_response") or j.get("result") or j; imgs = res.get("images") or ([res["image"]] if res.get("image") else [])
    for i, im in enumerate(imgs):
        b = im.get("base64") if isinstance(im, dict) else im
        if isinstance(b, str) and b.startswith("data:"): b = b.split(",", 1)[1]
        if b: open(os.path.join(d, f"{k}_take{i+1}.png"), "wb").write(base64.b64decode(b))
    print("saved", len(imgs), flush=True)
