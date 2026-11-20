"""Animation spec for every fighter (east-facing, side view) and a batch submitter.
usage: moves.py NAME [anim ...]   (default: every anim the character lacks)"""
import json, os, sys, threading
from pl import call, wait_job

HERE = os.path.dirname(os.path.abspath(__file__))
CHARS = json.load(open(os.path.join(HERE, "chars.json")))

COMMON = {
    "idle":   {"mode": "pixminimax", "template_action": "idle breathing"},
    "walk":   {"mode": "v3", "frame_count": 8, "action_description": "walking forward in a fighting stance with fists raised, light bouncing footwork"},
    "punch":  {"mode": "pixminimax", "template_action": "punch"},
    "kick":   {"mode": "pixminimax", "template_action": "high kick"},
    "sweep":  {"mode": "v3", "frame_count": 8, "action_description": "drops into a deep crouch and sweeps one leg forward low along the ground, a leg sweep, then returns to the crouch"},
    "crouch": {"mode": "v3", "frame_count": 4, "action_description": "crouching down low into a defensive guard with fists up, knees deeply bent"},
    "jump":   {"mode": "v3", "frame_count": 8, "action_description": "jumping high straight up with knees tucked to the chest, then landing back in a fighting stance"},
    "hurt":   {"mode": "v3", "frame_count": 4, "action_description": "recoiling backward in pain after being punched in the face, head snapping back"},
    "block":  {"mode": "v3", "frame_count": 4, "action_description": "raising both forearms in front of the face to block an attack, bracing"},
    "fall":   {"mode": "v3", "frame_count": 8, "action_description": "knocked off his feet by a heavy blow, falling backward and landing flat on his back lying on the ground"},
}
SPECIAL = {
    "karl":  {"special": "dashing forward fast throwing a rapid flurry of straight punches", "win": "victory pose: pumps one fist high in the air and smiles"},
    "akira": {"special": "throwing a ninja shuriken forward with a fast sidearm flick of the hand", "win": "victory pose: stands calmly with arms crossed, ponytail blowing"},
    "ivan":  {"special": "lunges forward and grabs with both arms, then lifts and throws overhead in a suplex slam", "win": "victory pose: flexes both biceps and roars"},
    "vizor": {"special": "thrusts one open hand forward with fingers spread, aiming like a camera, a glowing cyan targeting frame flashes in front of his palm", "win": "victory celebration: lifts the camera from his belt, snaps a photo with a bright flash, then pumps his fist in the air"},
    "padre": {"special": "raises the big holy book high overhead with both hands and smashes it down hard in front of him, a flash of golden light on impact", "special2": "kneels down on one knee and prays, holding the holy book to his chest, a soft golden light glowing around him", "win": "victory celebration: holds the holy book high in the air with one hand and raises his other fist, glowing golden light"},
    "zeke": {"special": "bowling throw: swings the bowling ball back and then forward low, releasing it to roll along the floor, finishing in a low bowler's follow-through pose", "special2": "lobs the bowling ball high into the air with a big two-handed underhand toss, watching it fly", "win": "victory celebration: pumps his fist like he just bowled a strike, grinning, then holds the bowling ball up proudly"},
    "hecky": {"special": "rising uppercut: dips low then springs upward driving one fist straight up over his head, white suit jacket flaring", "special2": "straightens his tie and pushes up his glasses with a smug smirk while a golden shine sparkles around him, powering up", "special3": "leans his head forward and stares intensely ahead, his eyes and glasses glowing bright red as he fires a laser beam from his eyes straight forward, hands at his sides in fists", "win": "victory pose: pushes up his glasses and adjusts his tie with a smug smirk"},
    "heckyfox": {"special": "rising uppercut: dips low then springs upward driving one fist straight up over his head, white suit jacket flaring", "special2": "straightens his tie and pushes up his glasses with a smug smirk while a golden shine sparkles around him, powering up", "special3": "leans his head forward and stares intensely ahead, his eyes and glasses glowing bright red as he fires a laser beam from his eyes straight forward, hands at his sides in fists", "win": "victory pose: pushes up his glasses and adjusts his tie with a smug smirk"},
    "lawslie": {"special": "pulls a taser from her belt and fires it straight forward with one arm extended, electric blue sparks crackling at the taser", "special2": "lunges forward and grabs with both hands, then snaps a pair of silver handcuffs shut in front of her", "win": "victory pose: spins silver handcuffs around one finger and smiles confidently"},
    "diego": {"special": "capoeira spinning hook kick, meia lua de compasso, rotating with one hand near the ground and the leg sweeping around high", "win": "victory pose: dances the capoeira ginga, swaying side to side with a smile"},
}


def spec(name):
    s = dict(COMMON)
    for k, v in SPECIAL[name].items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v}
    return s


def have(cid):
    c = call("GET", f"/characters/{cid}")
    return {a["display_name"] for a in (c.get("animations") or [])}


def submit(cid, anim, body, log):
    import time, random
    while True:
        try:
            r = call("POST", "/characters/animations", {"character_id": cid, "animation_name": anim, "directions": ["east"], **body})
            break
        except RuntimeError as e:
            if "429" not in str(e):
                print(anim, "FAILED", e, flush=True); return
            time.sleep(15 + random.random() * 10)
    for j in r.get("background_job_ids") or []:
        res = wait_job(j)
        log.append((anim, res.get("status"), (res.get("usage") or {}).get("usd")))
        print(anim, res.get("status"), res.get("usage"), flush=True)


if __name__ == "__main__":
    name = sys.argv[1]; cid = CHARS[name]; sp = spec(name)
    todo = sys.argv[2:] or [a for a in sp if a not in have(cid)]
    print("submitting", name, todo, flush=True)
    log = []; ts = []
    for a in todo:
        t = threading.Thread(target=submit, args=(cid, a, sp[a], log)); t.start(); ts.append(t)
    for t in ts: t.join()
    print("total usd", sum(x[2] or 0 for x in log), log)
