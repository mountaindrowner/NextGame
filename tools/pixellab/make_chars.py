"""Create the Bonfire Bash fighters on PixelLab (side view, from the original portraits)."""
import json, sys
from pl import call, b64img

A = "/home/user/NextGame/assets/"
STYLE = "detailed 16-bit arcade fighting game sprite, SNK / neo-geo style shading, black outline"
DESC = {
    "karl": "Karl, a Brazilian karate fighter: athletic man with short dark brown hair and thin rectangular glasses, confident smile, white karate gi with a small red emblem on the chest, black belt, dark navy fingerless fighting gloves, white pants, white and red sneakers. 16-bit arcade fighting game character",
    "akira": "Akira, a Japanese ninja fighter: lean man with long spiky dark navy hair tied in a high ponytail, sharp eyes, dark purple sleeveless ninja gi, magenta sash belt with hanging ends, dark arm wraps and bracers, baggy purple pants wrapped at the shins, dark tabi shoes. 16-bit arcade fighting game character",
    "ivan": "Ivan, a huge muscular Russian sambo wrestler: short blond crew cut, square jaw, scar on cheek, stern face, red sambo jacket with short sleeves and red belt, navy blue shorts, dark fingerless gloves, tall blue wrestling boots. 16-bit arcade fighting game character",
    "diego": "Diego, a Brazilian capoeira fighter: lean muscular man with brown skin and curly dark hair tied up, smiling, shirtless with an open green and yellow sleeveless vest, white capoeira pants with a yellow and green cord belt, bandaged hands, barefoot. 16-bit arcade fighting game character",
    # Vizor was created with the concept image tools/pixellab/concept/vizor.png and style_character_id = karl's id
    "vizor": "Vizor, a tech brawler: stocky young man with short dark curly hair and a thin mustache, a high-tech cybernetic camera monocle over his right eye glowing cyan, black t-shirt with a white camera-shutter logo, dark diagonal harness strap with a small camera, chrome forearm gauntlet with cyan lights, black fingerless gloves, belt with a camera on the hip, baggy blue cargo jeans with gray tech knee pads, white and teal sneakers. 16-bit arcade fighting game character",
    # Padre: concept image tools/pixellab/concept/padre.png on a dark background, style_character_id = karl's id
    "padre": "Padre, a fighting priest: muscular man with short slicked-back black hair, a thin mustache and a stern face, black clerical shirt with a white roman collar, rolled short sleeves, a cream-white stole with gold crosses and gold fringe draped around his neck, black wristbands, black belt with silver buckle, baggy black trousers, black boots, holding a big dark-red holy book with a gold cross under one arm. 16-bit arcade fighting game character",
    # Zeke: concept tools/pixellab/concept/zeke.png on a dark background, style_character_id = karl's id
    "zeke": "Zeke, a bowling champion fighter: stocky muscular man with short black hair in a high fade, a full trimmed beard and a big confident grin, black bowling jersey shirt with a red and white vertical stripe and a bowling pins logo on the sleeve, a white towel with gold trim over one shoulder, black fingerless wrist-support gloves, black shorts, black socks, black white and red bowling shoes, holding a glossy purple bowling ball in one hand. 16-bit arcade fighting game character",
    # Hecky: concept tools/pixellab/concept/hecky.png on a dark background, style_character_id = karl's id
    "hecky": "Hecky Xavier, a smug suave fighter: slim young man with messy brown hair and thin silver rectangular glasses, confident smirk, an open white double-breasted suit jacket, black dress shirt and black tie, black belt with silver buckle, white suit trousers, polished black dress shoes, fists raised in a loose stylish boxing stance. 16-bit arcade fighting game character",
    # Hecky's fox costume: create_with_style with style_character_id = hecky's id (no concept image)
    "heckyfox": "an anthropomorphic red fox fighter standing upright like a man: orange-red fur, white muzzle and chest fur, pointed black-tipped ears, a big fluffy fox tail with a white tip, thin silver rectangular glasses, smug smirk, wearing an open white double-breasted suit jacket, black dress shirt and black tie, white suit trousers, black dress shoes, fists raised in a loose stylish boxing stance. 16-bit arcade fighting game character",
    # Lawslie: concept tools/pixellab/concept/lawslie.png, style_character_id = karl's id
    "lawslie": "Lawslie, a police officer fighter woman: long wavy dark brown hair, confident smile, navy blue police uniform shirt with short sleeves, a gold badge on the chest and a POLICE shoulder patch, a radio on her shoulder, black fingerless gloves, black duty belt with holster pouches and silver handcuffs hanging on it, navy blue cargo pants, black combat boots, fists raised in a boxing stance. 16-bit arcade fighting game character",
    # Rex: concept tools/pixellab/concept/rex.png on a dark background, style_character_id = vizor's id
    "rex": "Rex, a rock bass player fighter: stocky young man with short dark curly twisted hair and a small gold crown with red jewels on his head, a black headset microphone, serious confident face, maroon t-shirt with a white logo, black fingerless wrist gloves, a cream white electric bass guitar with a maple neck worn on a black strap across his body, baggy blue jeans, black and white skate sneakers, fighting stance holding the bass. Crisp 16-bit arcade fighting game sprite with strong contrast",
}
out = {}
for k in sys.argv[1:]:
    r = call("POST", "/create-character-pro", {
        "description": DESC[k], "method": "create_from_concept",
        "concept_image": b64img(A + k + "_por.png"), "reference_image": b64img(A + k + "_spr.png"),
        "style_description": STYLE, "view": "side", "image_size": {"width": 112, "height": 112}, "no_background": True})
    out[k] = r
    print(k, json.dumps(r), flush=True)
