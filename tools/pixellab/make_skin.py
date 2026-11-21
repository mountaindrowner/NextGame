"""Create an alternate-costume (skin) character on PixelLab, styled after the base fighter (style_character_id = base).
usage: PL_BUDGET=<generations> python3 make_skin.py SKIN   (description and base fighter: SKINS below; id saved to chars.json)"""
import json, os, sys
from pl import call, wait_job
HERE = os.path.dirname(os.path.abspath(__file__))
TAIL = " Crisp 16-bit arcade fighting game sprite with strong contrast"
SKINS = {  # skin -> (base fighter, description)
    "zekeidol": ("zeke", "Zeke cosplaying a virtual pop idol: the same stocky muscular man with a short black high fade, a full trimmed black beard and a big confident grin, now wearing a very long bright teal twin-tail wig reaching his knees tied with black hair ties, a sleeveless silver-gray idol shirt with a teal necktie, black detached arm sleeves with teal trim, a short black pleated skirt over black bike shorts, black knee-high boots with teal soles, holding a glossy teal bowling ball in one hand, fighting stance." + TAIL),
    "padreteen2": ("padre", "A teenage rock-and-roll priest fighter: a skinny, lanky young man of about seventeen with very long straight black hair parted exactly in the middle, falling flat and straight past his shoulders on both sides, a clear center part, forehead fully visible, no bangs, no fringe, a cocky half smile, a black clerical shirt with a white roman collar worn open over a faded band t-shirt, a cream-white stole with gold crosses and gold fringe around his neck, black leather wristbands with studs, ripped black skinny jeans, worn black high-top sneakers, holding a big dark-red holy book with a gold cross under one arm, loose boxing stance." + TAIL),
    # a roster fighter made from text in another fighter's crisp style (estrella2: Lawslie's style), when a concept image loses detail
    "estrella2": ("lawslie", "Estrella, a pop singer fighter woman, side view facing right: clearly defined face in profile with big dark eyes, defined eyebrows and red lips, smiling confidently, long wavy dark brown hair falling down her back behind her shoulders so the face stays clear, a big gold hoop earring, a cropped cream-white bomber jacket with bold royal blue panels, gold trim and a big gold star on the shoulder, a black top, blue and gold wristbands, a gold belt with a gold chain, baggy dark purple cargo pants with a bright gold stripe down the side, black combat boots with gold laces, holding a black microphone with a silver head up near her chin in her front hand, other fist raised, fighting stance. Bold, high-contrast colors, crisp 16-bit arcade fighting game sprite with strong black outlines"),
    "karl2": ("keksan", "Papa-Leguas, a Brazilian karate fighter, side view facing right: athletic muscular man with short swept dark brown hair, thin black rectangular glasses, a clearly defined face in profile with a confident smile, a crisp bright white karate gi top with sleeves to the elbows and a small black kanji emblem with a red underline on the chest, a thin silver dog-tag chain necklace, a black belt with two gold stripes tied at the waist, dark navy fingerless fighting gloves, white gi pants, white and red sneakers, karate fighting stance with fists up, strong shading and folds in the white cloth" + TAIL),
    "padreteen": ("padre", "A teenage rock-and-roll priest fighter: a skinny, lanky young man of about seventeen with long straight black hair past his shoulders and a few bangs, a cocky half smile, a black clerical shirt with a white roman collar worn open over a faded band t-shirt, a cream-white stole with gold crosses and gold fringe around his neck, black leather wristbands with studs, ripped black skinny jeans, worn black high-top sneakers, holding a big dark-red holy book with a gold cross under one arm, loose boxing stance." + TAIL),
}
if __name__ == "__main__":
    k = sys.argv[1]; base, desc = SKINS[k]; path = os.path.join(HERE, "chars.json"); chars = json.load(open(path))
    if k in chars: sys.exit(f"{k} already exists: {chars[k]}")
    r = call("POST", "/create-character-pro", {"description": desc, "method": "create_with_style", "style_character_id": chars[base],
              "view": "side", "image_size": {"width": 112, "height": 112}, "no_background": True})
    cid = r.get("character_id") or r.get("id")
    for j in r.get("background_job_ids") or ([r["background_job_id"]] if r.get("background_job_id") else []):
        res = wait_job(j); print(k, "job", res.get("status"), res.get("usage"), flush=True)
    chars[k] = cid; json.dump(chars, open(path, "w"), indent=1); print(k, cid, flush=True)
