"""Create story-mode characters (henchmen and Vex) on PixelLab in the henchmen's style (Vizor's style character).
usage: PL_BUDGET=<generations> python3 make_foes.py NAME [NAME ...]   (ids are saved to chars.json)"""
import json, os, sys
from pl import call, wait_job

HERE = os.path.dirname(os.path.abspath(__file__))
TAIL = " Crisp 16-bit arcade beat 'em up enemy sprite with strong contrast"
DESC = {
    "chain": "Street punk henchman for a beat 'em up: wiry lean man with a tall spiked green mohawk, a sleeveless torn black t-shirt, a studded leather wristband, a heavy steel bike chain wrapped around one fist with the end hanging down, camo cargo pants, red high-top sneakers, sneering, hunched brawler stance." + TAIL,
    "kicker": "Street kickboxer henchwoman for a beat 'em up: athletic young woman with a high black ponytail, a purple zip-up hooded track jacket with white stripes, black athletic leggings, white hand wraps, white sneakers, light bouncing kickboxing stance with fists up, cold confident stare." + TAIL,
    "vex": "Vex, a crime boss: tall broad-shouldered man in his fifties with slicked-back silver hair and a short silver beard, cold eyes, a sharp dark purple pinstripe three-piece suit, a black shirt and a gold tie, gold rings, polished black shoes, holding a black walking cane with a gold handle, standing tall and arrogant. Crisp 16-bit arcade fighting game boss sprite with strong contrast",
}
if __name__ == "__main__":
    path = os.path.join(HERE, "chars.json"); chars = json.load(open(path))
    for k in sys.argv[1:]:
        if k in chars:
            print(k, "already exists", chars[k]); continue
        r = call("POST", "/create-character-pro", {"description": DESC[k], "method": "create_with_style", "style_character_id": chars["vizor"],
                                                  "view": "side", "image_size": {"width": 112, "height": 112}, "no_background": True})
        cid = r.get("character_id") or r.get("id")
        for j in r.get("background_job_ids") or ([r["background_job_id"]] if r.get("background_job_id") else []):
            res = wait_job(j); print(k, "job", res.get("status"), res.get("usage"), flush=True)
        chars[k] = cid; json.dump(chars, open(path, "w"), indent=1)
        print(k, cid, json.dumps(r)[:200], flush=True)
