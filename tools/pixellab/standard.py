"""Generate moves that miss the move style guide (docs/MOVE_STYLE_GUIDE.md), two takes each: <anim>__s1, <anim>__s2.
Pick the better take with tools/move_standard.py and pack it with  addanims.py NAME <anim>__s1:<anim>.
usage: PL_BUDGET=<generations> [TAKES=1|2|retry] python3 standard.py NAME anim [anim ...]   (TAKES=1: one take __s1; 2: a second pair __s3/__s4; retry: __s5)

How each kind of move is made (what worked before, see the guide):
  punch3   PixelLab's built-in "uppercut" motion (written uppercut descriptions came out as straight punches)
  lowkick  starts from the fighter's own crouch frame and kicks low along the floor
  air*     starts from the top of the fighter's jump
  kicks    a written description, the fighter's prop kept out of the way"""
import os, sys, threading
from pl import b64img
from moves import CHARS, submit, HERE, PROP, _END

PROP.update({"heckyfox": "", "padreteen2": "holding the book tight under his left arm the whole time", "lawslie": "",
             "padre": "the book strapped at his side"})
_B = ", a big clear committed strike, the striking leg fully extended"
# anim -> (start pose, start frame, frames, action, or None for a built-in motion)
KIND = {
    "punch3":   (None, 0, 0, None),
    "lowkick":  ("crouch", -1, 6, "from a low crouch, kicks the front leg straight forward low along the ground in a fast leg sweep at ankle height, the leg fully straight, then pulls it back, staying crouched"),
    "airpunch": ("jump", 5, 4, "in mid-air with knees tucked, throws a strong straight punch forward and down with the free fist, the arm fully extended"),
    "airkick":  ("jump", 5, 4, "in mid-air, a flying side kick: the front leg shoots out fully straight forward at chest height, the other leg tucked under, body leaning back"),
    "kick2":    (None, 0, 8, "a side kick to the body: lifts the front knee, then thrusts the foot straight out at waist height, the leg fully extended in front, both fists up in guard" + _B + _END),
    "dashf":    (None, 0, 6, "a fast forward dash: pushes off the back foot and surges forward in a low burst, body leaning forward, both fists up guarding, the back leg trailing behind, then plants the front foot back into a fighting stance, facing right the whole time"),
    "dashb":    (None, 0, 6, "a quick back dash: hops backward off the front foot, leaning back slightly with both fists up guarding the face, both feet just off the ground, then lands back in a fighting stance, still facing right the whole time while moving backward"),
    "kick3":    (None, 0, 8, "a high front kick: the front leg snaps straight up in front of him, the foot rising above head height" + _B + _END),
}
# per-fighter wording
ACTION = {
    ("keksan", "kick3"): "a Muay Thai jumping knee: springs off the back foot and drives the right knee high and forward to chest height, both hands pulling down in front of him, body leaning into the knee, a big clear strike" + _END,
}
# per-fighter built-in motions, where a description keeps failing (Kai's kicks kept turning into dribbles)
TEMPLATE = {("kai", "kick3"): "high kick"}
# start poses edited by hand: Kai's jump frame with the ball erased, so the jump punch doesn't turn into a dribble
START = {("kai", "airpunch"): ("jump_noball", 0)}
ACTION.update({
    ("estrella", "airkick"): "at the top of her jump she kicks: the right leg snaps out perfectly straight and horizontal in front of her at chest height, the boot sole leading far ahead, the left knee tucked up under her, both fists up",
    ("padre", "dashb"): "a quick backpedal hop away from an opponent on his right: he keeps facing right toward them the whole time, his chest and face toward the right, leans his upper body back with both fists up guarding, pushes off the front foot and hops backward to the left, then lands in a fighting stance; he never turns around and never shows his back",
    ("padreteen2", "dashb"): "a quick backpedal hop away from an opponent on his right: the teenager keeps facing right toward them the whole time, his chest and face toward the right, leans back with both fists up guarding, pushes off the front foot and hops backward to the left, then lands in a fighting stance; he never turns around and never shows his back",
    ("vex", "dashb"): "a quick backpedal step away from an opponent on his right: the old man keeps facing right toward them the whole time, leans back with his chin up, his cane held in front of him, and skips backward to the left on light feet, then settles back into his stance; he never turns around and never runs forward",
    ("padreteen2", "lowkick"): "drops into a very deep crouch with one hand touching the floor and sweeps the front leg straight out along the floor at ankle height, the sneaker skimming the ground far in front, staying low",
})
SEEDS = {"1": (("s1", 1101),), "2": (("s3", 3303), ("s4", 4404)), "retry": (("s5", 5505),)}.get(os.environ.get("TAKES", ""), (("s1", 1101), ("s2", 2202)))


def body(name, anim, seed):
    src, idx, n, action = KIND[anim]
    if action is None or (name, anim) in TEMPLATE:  # a built-in PixelLab motion
        return {"mode": "pixminimax", "template_action": TEMPLATE.get((name, anim), "uppercut"), "seed": seed}
    action = ACTION.get((name, anim), action)
    if PROP.get(name) and (name, anim) not in START:
        action += "; " + PROP[name]
    if (name, anim) in START:
        src, idx = START[(name, anim)]
    b = {"mode": "v3", "frame_count": n, "action_description": action, "seed": seed}
    if src:
        d = os.path.join(HERE, "raw", name, src)
        files = sorted(f for f in os.listdir(d) if f.endswith(".png"))
        b["custom_start_frame"] = b64img(os.path.join(d, files[idx])); b["keep_first_frame"] = (name, anim) not in START
    return b


if __name__ == "__main__":
    name, anims = sys.argv[1], sys.argv[2:]
    if not anims:
        sys.exit("name the animations to make")
    log, ts = [], []
    for a in anims:
        for tag, seed in SEEDS:
            t = threading.Thread(target=submit, args=(CHARS[name], f"{a}__{tag}", body(name, a, seed), log)); t.start(); ts.append(t)
    for t in ts: t.join()
    print("done", name, [x for x in log if x[1] != "completed"] or "all completed")
