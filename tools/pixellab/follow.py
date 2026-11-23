"""Second-pass moves that start from another animation's pose (custom_start_frame).
usage: follow.py NAME [anim ...]"""
import json, os, sys, threading
from pl import b64img
from moves import CHARS, have, submit, HERE

# anim -> (source anim, source frame, frames, action)
FOLLOW = {
    "lowkickc": ("crouch", -1, 6, "stays low in a deep crouch and sweeps the black walking cane forward along the floor at ankle height, the cane fully extended in front of him, facing forward the whole time, never turning his back"),
    "swat":     ("jump", 5, 6, "in mid-air at the top of a jump, the basketball tucked under his left arm, swings his right arm up and then swats the right hand forward and down hard like blocking a shot, staying in the air"),
    "lowkick":  ("crouch", -1, 6, "from a low crouch, kicks the front leg straight forward low along the ground in a fast leg sweep, then pulls it back, staying crouched"),
    "cpunch":   ("crouch", -1, 4, "from a low crouch, throws a quick straight punch forward at waist height, then pulls back, staying crouched"),
    "airkick":  ("jump", 5, 4, "in mid-air with knees tucked, extends the front leg straight forward in a flying side kick"),
    "airpunch": ("jump", 5, 4, "in mid-air with knees tucked, throws a strong straight punch forward and down"),
    "throw":    ("special", -1, 8, "lifts the grabbed opponent up overhead with both arms and slams them down to the ground behind him in a suplex throw"),
    "spin2":    (None, 0, 10, "capoeira armada: turns his back and spins a full circle on one foot, swinging one straight leg around high in a spinning crescent kick, then lands back in a low stance"),
    "fall4":    (None, 0, 8, "takes a hard hit to the chest and is knocked backward off his feet, toppling over backward to the left and landing on his back, lying face up"),
    "fall2":    (None, 0, 8, "is hit hard and knocked off his feet, his body flies backward to the left and he lands flat on his back, lying face up with his head on the left side"),
}
# frame index overrides per character, e.g. which jump frame is the apex
SRC_FRAME = {}
# per-character wording (cane fighter)
ACTION = {("vex", "lowkick"): "from a low crouch, sweeps the black walking cane low along the floor at ankle height in a wide fast arc, staying crouched",
          ("vex", "cpunch"): "from a low crouch, jabs the tip of the black walking cane straight forward at waist height, then pulls it back, staying crouched",
          ("vex", "airpunch"): "in mid-air with knees tucked, swings the black walking cane down hard in a diving overhead strike"}


def body(name, anim):
    src, idx, n, action = FOLLOW[anim]
    action = ACTION.get((name, anim), action)
    b = {"mode": "v3", "frame_count": n, "action_description": action, "keep_first_frame": True}
    if src:
        d = os.path.join(HERE, "raw", name, src)
        files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
        idx = SRC_FRAME.get((name, anim), idx)
        b["custom_start_frame"] = b64img(os.path.join(d, files[idx]))
    return b


if __name__ == "__main__":
    name = sys.argv[1]; cid = CHARS[name]
    todo = sys.argv[2:] or [a for a in FOLLOW if a not in have(cid) and a not in ("throw", "spin2", "fall4")]
    print("submitting", name, todo, flush=True)
    log = []; ts = []
    for a in todo:
        t = threading.Thread(target=submit, args=(cid, a, body(name, a), log)); t.start(); ts.append(t)
    for t in ts: t.join()
    print("total usd", sum(x[2] or 0 for x in log), log)
