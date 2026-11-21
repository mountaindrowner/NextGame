"""Regenerate animations that don't match their move, two takes each (<anim>__a, <anim>__b).
usage: redo.py CHAR:ANIM [CHAR:ANIM ...]
Moves that start from another pose (crouch / jump apex) use that pose from raw/<char>/ as the start frame."""
import os, sys, threading
from pl import b64img
from moves import CHARS, submit, HERE

SPEC = {  # anim -> (start pose, start frame, frames, action)
    "crouch": (None, 0, 4, "drops straight down into a deep crouch: knees fully bent, hips low near the floor, back slightly hunched, both fists up guarding the face"),
    "hurt": (None, 0, 4, "gets punched hard in the face: the head snaps back, the upper body bends backward, the arms fly out to the sides and he staggers half a step back"),
    "cpunch": ("crouch", -1, 6, "stays in a deep crouch with knees bent and hips low the whole time and throws a fast straight punch forward with the front arm fully extended at waist height, then pulls it back"),
    "lowkick": ("crouch", -1, 6, "stays low to the ground leaning on one hand and sweeps the front leg forward along the floor at ankle height in a wide arc, a leg sweep with the leg fully straight and close to the ground, then pulls it back"),
    "airpunch": ("jump", 5, 4, "in mid-air with the legs tucked, throws a powerful diving punch forward and downward at a 45 degree angle with the front arm fully extended and the fist leading"),
    "airkick": ("jump", 5, 4, "in mid-air, a flying side kick: the front leg shoots out fully straight forward with the heel leading at chest height, the other leg tucked under, body leaning back; not a knee strike"),
}
# PixelLab preset motions (pixminimax), started from a pose: anim -> (start pose, start frame, template action)
PRESET = {
    "lowkick": (None, 0, "swoop kick"),
    "airkick": ("jump", 5, "high kick"),
    "airpunch": ("jump", 5, "punch"),
    "special": (None, 0, "uppercut"),
}
# per-fighter wording (e.g. Samson holds a book under one arm), used as CHAR:ANIM:alt, takes e/f
ALT = {
    ("keksan", "airkick"): ("jump", 5, 4, "in mid-air he whips a jumping Muay Thai roundhouse kick: the front leg swings forward fully extended at chest height striking with the shin, the other knee tucked, arms pulled in"),
    ("padreteen2", "airkick"): ("jump", 3, 4, "strict side view profile facing right: he leaps up and kicks his front leg out perfectly straight and horizontal at chest height in a flying side kick, the sole of the sneaker leading far in front, the back knee tucked, the book under his left arm, long straight hair streaming behind"),
    ("kai", "airkick"): ("jump", 5, 4, "in mid-air he straightens his front leg completely and thrusts it forward horizontally in a flying side kick, the leg fully extended and straight at chest height with the sneaker sole leading, other knee tucked"),
    ("rex", "airkick"): ("jump", 5, 4, "in mid-air, the bass slung on his back, he straightens his front leg completely and thrusts it forward horizontally in a flying side kick, the leg fully extended and straight at chest height with the sneaker sole leading, other knee tucked"),
    ("lawslie", "airkick"): ("jump", 5, 4, "in mid-air she straightens her front leg completely and thrusts it forward horizontally in a flying side kick, the leg fully extended and straight at chest height with the boot sole leading, body leaning back, other knee tucked"),
    ("zeke", "airkick"): ("jump", 5, 4, "in mid-air he straightens his front leg completely and thrusts it forward horizontally in a flying side kick, the leg fully extended and straight at chest height with the shoe sole leading, body leaning back, other knee tucked"),
    ("padreteen", "airkick"): ("jump", 5, 4, "in mid-air, holding the book tight under his left arm, he snaps his front leg out perfectly straight forward in a flying side kick, the sole of the sneaker leading at chest height, the other knee tucked up, long hair flying"),
    ("padreteen", "airpunch"): ("jump", 5, 4, "in mid-air, holding the book tight under his left arm, he throws a hard punch with his free right fist, the right arm fully extended forward and angled down, legs tucked, long hair flying"),
    ("zekeidol", "airkick"): ("jump", 5, 4, "in mid-air he straightens his front leg completely and thrusts it forward horizontally in a flying side kick, the leg fully extended and straight at chest height with the boot sole leading, body leaning back, other knee tucked, teal twin-tails flying"),
    ("padre", "airkick"): ("jump", 5, 4, "in mid-air, holding the book tight under his left arm, he snaps his front leg out perfectly straight forward in a flying side kick, the sole of the boot leading at chest height, the other knee tucked up"),
    ("padre", "airpunch"): ("jump", 5, 4, "in mid-air, holding the book tight under his left arm, he throws a hard punch with his free right fist, the right arm fully extended forward and angled down, legs tucked"),
}
# a second per-fighter wording (CHAR:ANIM:alt2, takes g/h)
ALT2 = {
    ("padreteen2", "airkick"): ("jump", 4, 4, "rising in mid-air, side view facing right, holding the book tight under his left arm, he snaps his front leg out perfectly straight forward in a flying side kick at chest height, sneaker sole leading, other knee tucked, long straight hair flying"),
    ("padreteen2", "airpunch"): ("jump", 4, 4, "rising in mid-air, side view facing right, holding the book tight under his left arm, he throws a hard punch forward and down with his free right fist, the arm fully extended, legs tucked, long straight hair flying"),
    ("padreteen", "airkick"): ("jump", 4, 4, "rising in mid-air, side view facing right, holding the book tight under his left arm, he snaps his front leg out perfectly straight forward in a flying side kick at chest height, sneaker sole leading, other knee tucked, long hair flying"),
    ("padreteen", "airpunch"): ("jump", 4, 4, "rising in mid-air, side view facing right, holding the book tight under his left arm, he throws a hard punch forward and down with his free right fist, the arm fully extended, legs tucked, long hair flying"),
    ("keksan", "airkick"): ("jump", 5, 4, "in mid-air a Muay Thai flying knee: both feet off the ground, he drives his right knee forward and up hard at chest height, the left leg trailing straight back, both hands pulling down in front of him, body leaning into the knee"),
}
SRC_OVERRIDE = {("ivan", "crouch"): "crouch__a"}  # use the regenerated crouch as the start pose


def body(name, anim, seed, preset=False, alt=False):
    if alt:
        src, idx, n, action = (ALT2 if alt == 2 else ALT)[(name, anim)]
        d = os.path.join(HERE, "raw", name, src); files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
        return {"mode": "v3", "frame_count": n, "action_description": action, "keep_first_frame": True, "seed": seed,
                "custom_start_frame": b64img(os.path.join(d, files[idx]))}
    if preset:
        src, idx, action = PRESET[anim]
        b = {"mode": "pixminimax", "template_action": action, "seed": seed}
        if src:
            d = os.path.join(HERE, "raw", name, SRC_OVERRIDE.get((name, src), src))
            files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
            b["custom_start_frame"] = b64img(os.path.join(d, files[idx]))
        return b
    src, idx, n, action = SPEC[anim]
    b = {"mode": "v3", "frame_count": n, "action_description": action, "keep_first_frame": True, "seed": seed}
    if src:
        d = os.path.join(HERE, "raw", name, SRC_OVERRIDE.get((name, src), src))
        files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
        b["custom_start_frame"] = b64img(os.path.join(d, files[idx]))
    return b


if __name__ == "__main__":
    log, ts = [], []
    for item in sys.argv[1:]:  # CHAR:ANIM (described motion, takes a/b) or CHAR:ANIM:preset (preset motion, takes c/d)
        name, anim, *mode = item.split(":")
        pre, alt = bool(mode and mode[0] == "preset"), (2 if mode and mode[0] == "alt2" else 1 if mode and mode[0] == "alt" else 0)
        tags = (("g", 707), ("h", 808)) if alt == 2 else (("e", 505), ("f", 606)) if alt else (("c", 303), ("d", 404)) if pre else (("a", 101), ("b", 202))
        for tag, seed in tags:
            t = threading.Thread(target=submit, args=(CHARS[name], f"{anim}__{tag}", body(name, anim, seed, pre, alt), log)); t.start(); ts.append(t)
    for t in ts: t.join()
    print("total usd", round(sum(x[2] or 0 for x in log), 3), len(log), "jobs", [x for x in log if x[1] != "completed"])
