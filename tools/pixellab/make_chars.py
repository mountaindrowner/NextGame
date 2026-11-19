"""Create the World Dojo fighters on PixelLab (side view, from the original portraits)."""
import json, sys
from pl import call, b64img

A = "/home/user/NextGame/assets/"
STYLE = "detailed 16-bit arcade fighting game sprite, SNK / neo-geo style shading, black outline"
DESC = {
    "karl": "Karl, a Brazilian karate fighter: athletic man with short dark brown hair and thin rectangular glasses, confident smile, white karate gi with a small red emblem on the chest, black belt, dark navy fingerless fighting gloves, white pants, white and red sneakers. 16-bit arcade fighting game character",
    "akira": "Akira, a Japanese ninja fighter: lean man with long spiky dark navy hair tied in a high ponytail, sharp eyes, dark purple sleeveless ninja gi, magenta sash belt with hanging ends, dark arm wraps and bracers, baggy purple pants wrapped at the shins, dark tabi shoes. 16-bit arcade fighting game character",
    "ivan": "Ivan, a huge muscular Russian sambo wrestler: short blond crew cut, square jaw, scar on cheek, stern face, red sambo jacket with short sleeves and red belt, navy blue shorts, dark fingerless gloves, tall blue wrestling boots. 16-bit arcade fighting game character",
    "diego": "Diego, a Brazilian capoeira fighter: lean muscular man with brown skin and curly dark hair tied up, smiling, shirtless with an open green and yellow sleeveless vest, white capoeira pants with a yellow and green cord belt, bandaged hands, barefoot. 16-bit arcade fighting game character",
}
out = {}
for k in sys.argv[1:]:
    r = call("POST", "/create-character-pro", {
        "description": DESC[k], "method": "create_from_concept",
        "concept_image": b64img(A + k + "_por.png"), "reference_image": b64img(A + k + "_spr.png"),
        "style_description": STYLE, "view": "side", "image_size": {"width": 112, "height": 112}, "no_background": True})
    out[k] = r
    print(k, json.dumps(r), flush=True)
