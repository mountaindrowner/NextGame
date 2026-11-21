"""Generate a fighter's 256x192 stage background on PixelLab and save it to raw/stages/<id>_take<N>.png.
usage: PL_BUDGET=<generations> python3 stage.py ID"""
import base64, json, os, sys, urllib.request
from pl import call, wait_job
HERE = os.path.dirname(os.path.abspath(__file__))
STAGES = {
    "mateo": "16-bit arcade fighting game stage background, side view: a hometown minor league baseball park at night, standing on the dirt in front of the pitcher's mound with the green outfield grass and a blue outfield wall behind, a big old-fashioned scoreboard reading MOUNDWORKS, tall stadium light towers glowing, a packed crowd in the bleachers, a starry night sky, warm summer night, flat open ground for fighting, detailed pixel art, no characters",
    "reyes": "16-bit arcade fighting game stage background, side view: a desert patrol outpost at sunset, a concrete helipad in the foreground with small quadcopter drones parked on it, a tall steel watchtower with a searchlight and a big red white and blue striped flag flapping on a pole, a radar dish and an olive green patrol jeep, red mesas and saguaro cacti on the horizon under an orange and purple sunset sky, warm heroic light, flat open ground for fighting, detailed pixel art, no characters, no text",
    "estrella": "16-bit arcade fighting game stage background, side view: a glamorous nightclub concert stage at night, a raised stage with a standing microphone and stage monitors in the background, a big glowing gold star sign and a shimmering curtain of blue and purple lights, spotlights sweeping through haze, a crowd of fans silhouetted at the edges holding up glowing phones, a polished dark wooden dance floor across the bottom quarter, detailed pixel art in the style of classic SNK fighting games, no fighters in the foreground",
    "keksan": "16-bit arcade fighting game stage background, side view: a gritty Muay Thai gym at night, a raised boxing ring with red and blue ropes in the background, red heavy bags hanging from chains, wooden walls with hand-painted tiger banners and faded fight posters, warm hanging lanterns and a string of bulbs, a small shrine shelf with flowers and candles, wooden plank floor across the bottom quarter, detailed pixel art in the style of classic SNK fighting games, no fighters in the foreground",
}
if __name__ == "__main__":
    k = sys.argv[1]
    r = call("POST", "/generate-image-v2", {"description": STAGES[k], "image_size": {"width": 256, "height": 192}, "no_background": False})
    j = wait_job(r["background_job_id"]); print(k, j.get("status"), j.get("usage"), flush=True)
    d = os.path.join(HERE, "raw", "stages"); os.makedirs(d, exist_ok=True)
    res = j.get("last_response") or j.get("result") or j
    imgs = res.get("images") or ([res["image"]] if res.get("image") else [])
    for i, im in enumerate(imgs):
        b = im.get("base64") if isinstance(im, dict) else im
        if isinstance(b, str) and b.startswith("data:"): b = b.split(",", 1)[1]
        if b: open(os.path.join(d, f"{k}_take{i+1}.png"), "wb").write(base64.b64decode(b))
        elif isinstance(im, dict) and im.get("url"):
            urllib.request.urlretrieve(im["url"], os.path.join(d, f"{k}_take{i+1}.png"))
    print("saved", len(imgs), "takes;", "keys:", list(res.keys())[:12], flush=True)
    json.dump(j, open(os.path.join(d, k + "_job.json"), "w"))
