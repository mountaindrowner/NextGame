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
    # FOCUS ATTACK: frames 0-3 = the charge (looped while the button is held), 4-7 = the release
    "focus":  {"mode": "v3", "frame_count": 8, "action_description": "plants his feet wide and pulls his fist far back at the hip, coiling his whole body to gather power, then explodes forward with a huge lunging straight punch, arm fully extended"},
}
SPECIAL = {
    "mikecow": {"special": "stampede: lowers his horned cow hood and charges forward fast in a running headbutt, black hooves pounding, then skids to a stop",
                "win": "victory pose: flexes both arms in the cow costume and lets out a big proud grin"},
    "mike": {"special": "reaches behind his back, pulls out a round brown plastic serving tray and flings it forward sidearm like a frisbee, the flat tray spinning away out of his hand, then returns to a fighting stance",
             "special2": "pulls a sandwich wrapped in white paper out of his apron pocket and lobs it forward underhand in a high arc, then returns to a fighting stance",
             "special3": "pulls a big paper cup of lemonade with a straw from behind his back and splashes the yellow lemonade forward out of the cup in a wide spray, then returns to a fighting stance",
             "suitup": "spins around once on the spot with his arms out wide, then plants his feet and throws both fists up high in a triumphant pose",
             "win": "victory pose: tips his black visor with two fingers, then gives a big friendly thumbs up with a wide smile"},
    "karl":  {"special": "dashing forward fast throwing a rapid flurry of straight punches", "win": "victory pose: pumps one fist high in the air and smiles"},
    "karl2": {"special": "dashing forward fast throwing a rapid flurry of straight karate punches, glasses glinting, white gi flapping", "win": "victory pose: pumps one fist high in the air and smiles, pushing his glasses up with the other hand"},
    "akira": {"special": "throwing a ninja shuriken forward with a fast sidearm flick of the hand", "win": "victory pose: stands calmly with arms crossed, ponytail blowing"},
    "ivan":  {"special": "lunges forward and grabs with both arms, then lifts and throws overhead in a suplex slam", "win": "victory pose: flexes both biceps and roars"},
    "vizor": {"special3": "kneels down on one knee and sets a small camera on a tripod on the floor in front of him, then stands back up", "special": "thrusts one open hand forward with fingers spread, aiming like a camera, a glowing cyan targeting frame flashes in front of his palm", "win": "victory celebration: lifts the camera from his belt, snaps a photo with a bright flash, then pumps his fist in the air"},
    "padre": {"special3": "command grab: lunges forward with both arms, then lifts an opponent high overhead and slams them down to the ground in front of him", "special": "raises the big holy book high overhead with both hands and smashes it down hard in front of him, a flash of golden light on impact", "special2": "kneels down on one knee and prays, holding the holy book to his chest, a soft golden light glowing around him", "win": "victory celebration: holds the holy book high in the air with one hand and raises his other fist, glowing golden light"},
    "zeke": {"special3": "swings the bowling ball up from low behind him in a big rising arc, all the way up over his head, an upward bowling swing", "special": "bowling throw: swings the bowling ball back and then forward low, releasing it to roll along the floor, finishing in a low bowler's follow-through pose", "special2": "lobs the bowling ball high into the air with a big two-handed underhand toss, watching it fly", "win": "victory celebration: pumps his fist like he just bowled a strike, grinning, then holds the bowling ball up proudly"},
    "hecky": {"special": "rising uppercut: dips low then springs upward driving one fist straight up over his head, white suit jacket flaring", "special2": "straightens his tie and pushes up his glasses with a smug smirk while a golden shine sparkles around him, powering up", "special3": "leans his head forward and stares intensely ahead, his eyes and glasses glowing bright red as he fires a laser beam from his eyes straight forward, hands at his sides in fists", "win": "victory pose: pushes up his glasses and adjusts his tie with a smug smirk"},
    "heckyfox": {"special": "rising uppercut: dips low then springs upward driving one fist straight up over his head, white suit jacket flaring", "special2": "straightens his tie and pushes up his glasses with a smug smirk while a golden shine sparkles around him, powering up", "special3": "leans his head forward and stares intensely ahead, his eyes and glasses glowing bright red as he fires a laser beam from his eyes straight forward, hands at his sides in fists", "win": "victory pose: pushes up his glasses and adjusts his tie with a smug smirk"},
    "lawslie": {"special3": "crouches low and swings a long black police baton in a wide sweep along the floor at ankle height, the baton fully extended", "special": "pulls a taser from her belt and fires it straight forward with one arm extended, electric blue sparks crackling at the taser", "special2": "lunges forward and grabs with both hands, then snaps a pair of silver handcuffs shut in front of her", "win": "victory pose: spins silver handcuffs around one finger and smiles confidently"},
    "rex": {"special3": "swings the bass guitar up from low to high in a big rising arc over his head, like a headbanging guitar swing", "special": "raises the bass guitar and slams a hard power note, swinging the bass down toward the ground with a shockwave of sound around his feet", "special2": "leans forward and shouts loudly into his headset microphone, one hand cupped near the mic, a ring of sound blasting forward", "win": "victory pose: plays a fast bass solo then raises the bass high over his head with one hand, crown shining"},
    "kai": {"special3": "leaps high straight up and swats one hand forward and down in the air like blocking a basketball shot, the basketball tucked under his other arm, then lands", "special": "throws a hard two-handed bounce pass forward: steps in and snaps the basketball from his chest down and forward so it bounces on the floor ahead of him, arms extending forward",
            "special2": "a quick low crossover dribble: bounces the basketball fast from one hand to the other between his legs while lunging forward low, shoulders dipping",
            "win": "victory pose: spins the basketball on one fingertip above his head and smirks"},
    "keksan": {"kick": "Muay Thai roundhouse kick: pivots on the standing foot and swings the rear leg around high, striking with the shin at head height, the same-side arm swinging down for power, then returns to guard",
               "special": "flying knee: takes one quick step and leaps forward, driving one knee up high and forward at head height, both hands pulling down in front of him, the red sash flying",
               "special2": "Thai clinch knees: reaches forward with both hands as if gripping behind an opponent's neck and drives his knee up hard into their body three times, rocking forward",
               "win": "bows respectfully with palms pressed together in front of his chest, then raises both red-wrapped fists high with a big smile",
               "special3": "teep push kick: lifts his front knee high, then thrusts the front leg straight forward at chest height, the sole of the bare foot pushing out like a spear, body leaning back, then sets the foot down"},
    "zekeidol": {"special": "bowling throw: swings the glossy teal bowling ball back and then forward low, releasing it to roll along the floor, long teal twin-tails swinging, finishing in a low bowler's follow-through pose", "special2": "lobs the teal bowling ball high into the air with a big two-handed underhand toss, twin-tails flying, watching it fly", "win": "idol victory pose: winks, makes a heart shape with both hands over his head, then grins and holds the teal bowling ball up proudly, twin-tails swinging"},
    "padreteen": {"special": "raises the big holy book high overhead with both hands and smashes it down hard in front of him, a flash of golden light on impact, long hair flying", "special2": "kneels down on one knee and prays, holding the holy book to his chest, head bowed, long hair falling forward, a soft golden light glowing around him", "win": "victory celebration: holds the holy book high in the air with one hand and raises his other fist like at a rock concert, long hair flying, cocky grin"},
    "padreteen2": {"special": "raises the big holy book high overhead with both hands and smashes it down hard in front of him, a flash of golden light on impact, long straight hair flying", "special2": "kneels down on one knee and prays, holding the holy book to his chest, head bowed, long straight hair falling forward, a soft golden light glowing around him", "win": "victory celebration: holds the holy book high in the air with one hand and raises his other fist like at a rock concert, long straight hair flying, cocky grin"},
    "mateo": {"batswing": "pulls a wooden baseball bat from behind his back with both hands, cocks it back over his rear shoulder in a batting stance, then swings it hard and level all the way through in front of him, finishing with the bat wrapped around over his front shoulder in a big follow-through", "special": "baseball pitch: lifts his front knee high in a windup with the ball hidden in his glove, rears his throwing arm back, then strides forward and whips the arm over the top releasing the baseball forward, finishing bent forward in a follow-through",
              "special2": "baseball slide: runs forward two steps then drops and slides feet-first along the ground on his back hip, front leg straight out, one arm raised, a cloud of dust behind him",
              "special3": "snags a ball out of the air: thrusts the open baseball glove up in front of his face, snaps it shut to catch, then pulls the ball out and fires a quick sidearm throw forward",
              "win": "victory pose: points both index fingers up to the sky, then tips his blue cap and smiles"},
    "reyes": {"special": "dashing knuckle: dips his shoulder, then dashes forward low and drives a huge straight right punch with his whole body behind it, the gloved fist glowing with orange energy, his red vest flapping",
              "special2": "taps a controller on his left wrist, then thrusts his left arm up high and points forward with two fingers, giving an order",
              "special3": "rising anti-air: crouches low, then springs straight up off the ground driving a rising uppercut with one fist high over his head, his body twisting upward, legs trailing below",
              "win": "victory pose: tips the brim of his red cap with two gloved fingers and grins confidently, then gives a thumbs up"},
    "estrella": {"walk": "walking forward in a fighting stance, holding the black microphone in her right hand near her chin, her left fist raised, light bouncy steps, long hair swaying",
                 "punch": "a fast straight jab with her free left fist while her right hand keeps the black microphone held close to her chest",
                 "kick": "a high roundhouse kick at head height, keeping the black microphone held in her right hand, long hair whipping around",
                 "crouch": "crouching down low into a defensive guard, the black microphone held in her right hand near her chin, left fist up",
                 "jump": "jumping high straight up with knees tucked, holding the black microphone in her right hand, then landing back in a fighting stance",
                 "hurt": "recoiling backward in pain after being hit in the face, head snapping back, still gripping the black microphone in her right hand",
                 "block": "raising her left forearm in front of her face to block, the black microphone held tight in her right hand",
                 "fall": "knocked off her feet by a heavy blow, falling backward and landing flat on her back, the black microphone still in her right hand",
                 "special": "raises the black microphone to her lips and sings a long high note, her free left hand stretched forward with the palm open, a glowing gold music note appearing in front of her hand, long hair flowing",
                 "special2": "drops into a low crouch and holds the black microphone down toward the floor in front of her, singing a powerful note, rings of sound rippling outward along the ground",
                 "special3": "leans forward and screams into the black microphone with all her might, a cone of blue sound waves blasting forward, her long hair blown straight back",
                 "win": "lifts the black microphone up toward the crowd, takes a bow, then blows a kiss and smiles, gold hoop earrings shining"},
    "goon": {},
    "chain": {"punch": "swings the heavy steel bike chain forward in a wide whipping lash at head height, the chain stretching far out in front of him, then pulls it back"},
    "kicker": {"special": "runs two steps and leaps forward through the air in a flying side kick, one leg extended straight out in front, then lands"},
    "vex": {"punch": "swings his black walking cane forward in a fast horizontal strike at head height, then returns to standing",
            "special": "raises the walking cane high with both hands and slams its tip down hard on the floor in front of him, a burst of purple energy at the impact",
            "kneel": "drops slowly down onto both knees, head bowed, the cane falling to the floor beside him, defeated and humbled",
            "taunt": "laughs arrogantly, spreading both arms wide, cane in one hand",
            # playable Vex (secret character): the rest of a fighter's set
            "kick": "a hard stiff front kick at waist height with his polished black shoe, the black walking cane held in his right hand, purple suit jacket flaring, then returns to standing",
            "crouch": "crouching down low into a guarded stance with knees deeply bent, the black walking cane held across his body in both hands",
            "jump": "jumping high straight up with knees tucked, gripping the black walking cane, purple suit jacket flaring, then landing back in a standing stance",
            "block": "raising the black walking cane horizontally in both hands in front of his face to block an attack, bracing",
            "focus": "plants his feet wide and draws the black walking cane far back at the hip, purple energy gathering along it, then lunges forward thrusting the cane tip straight ahead with the arm fully extended",
            "special2": "tosses a handful of shiny gold coins forward with a smug sidearm flick of the wrist, the coins spraying out in front of him, cane in the other hand",
            "special3": "snaps his fingers with one hand raised, a swirl of purple smoke bursting up around his whole body",
            "win": "victory pose: straightens his tie, then leans on the black walking cane with both hands on its gold handle and smirks"},
    "slinger": {"special": "throws a glass bottle forward overhand: winds the arm back behind the head and hurls the bottle forward, releasing it at head height"},
    "bruiser": {"special": "lowers his head and shoulder and charges forward in a powerful running shoulder tackle, leaning far forward"},
    "diego": {"special": "capoeira spinning hook kick, meia lua de compasso, rotating with one hand near the ground and the leg sweeping around high", "win": "victory pose: dances the capoeira ginga, swaying side to side with a smile"},
}


# COMBO STRINGS: each hit of a chain has its own animation. punch2 = the 2nd punch (a cross), punch3 = the 3rd (a hook or uppercut
# finisher), kick2 = a kick that ends a chain, kick3 = a rising kick (Story mode's launcher, or a 2nd kick in a chain).
_END = ", then returns to a fighting stance"
COMBO = {
    "mike": {"punch2": "a hard straight right cross with the rear fist at head height, the arm fully extended, his black apron swinging",
             "kick2": "a side kick to the body: lifts the front knee, then thrusts the white sneaker straight out at waist height, the leg fully extended, both fists up in guard",
             "kick3": "a high front kick: the front leg snaps straight up in front of him, the white sneaker rising above head height, the leg fully extended"},
    "karl": {"special3": "rising flying kick: springs up off the ground and drives one leg up and forward in a high flying side kick, rising into the air, white gi flapping, then lands", "punch2": "karate reverse punch: drives the rear fist straight forward at chest height with a sharp twist of the hips", "punch3": "karate rising uppercut: dips low and drives the lead fist straight up to chin height",
             "kick2": "karate roundhouse kick: pivots and swings the rear leg around high, striking with the top of the foot at head height", "kick3": "karate front snap kick that rises high, the foot snapping straight up above head height"},
    "keksan": {"punch2": "Muay Thai straight right cross, the rear fist driving forward at head height", "punch3": "Muay Thai upward elbow strike: steps in and drives the point of the elbow up through head height",
               "kick2": "Muay Thai switch kick: switches feet and slams the shin into the body at waist height", "kick3": "Muay Thai straight knee: grabs forward with both hands and drives the knee straight up to chest height"},
    "vizor": {"punch2": "a fast straight right cross with the rear fist at head height", "punch3": "a tight left hook swinging around to the side of the head",
              "kick2": "a sharp side kick to the body, the heel leading at waist height", "kick3": "a rising crescent kick sweeping the leg up and over at head height"},
    "padre": {"punch2": "a heavy boxing straight right cross at head height", "punch3": "a big boxing uppercut, dipping low and driving the fist up to chin height",
              "kick2": "a strong front push kick to the stomach, the sole of the foot leading", "kick3": "a rising knee strike, driving the knee straight up to chest height"},
    "zeke": {"punch2": "a looping overhand right punch at head height", "punch3": "a wide swinging uppercut from the hip like a bowling follow-through, the fist rising up high",
             "kick2": "a low roundhouse kick to the thigh", "kick3": "a rising front kick, the foot snapping straight up above head height"},
    "hecky": {"punch2": "a crisp boxing straight right cross, white suit jacket flaring", "punch3": "a sharp boxing uppercut, dipping low and driving the fist up to the chin, tie flying",
              "kick2": "a stylish spinning hook kick, the heel whipping around at head height", "kick3": "a rising front kick, the polished shoe snapping straight up above head height"},
    "lawslie": {"punch2": "a palm-heel strike, the rear palm driving straight forward at chin height", "punch3": "a forearm smash swinging across at head height",
                "kick2": "a police front push kick to the stomach", "kick3": "a rising knee strike, grabbing forward and driving the knee up to chest height"},
    "rex": {"punch2": "a straight right cross at head height, the bass guitar still strapped on in front of him", "punch3": "a swinging uppercut driving the fist up to chin height, the bass guitar still strapped on in front of him",
            "kick2": "a stomping front kick to the stomach, the bass guitar still strapped on in front of him", "kick3": "a rising front kick, the foot snapping up above head height, the bass guitar still strapped on in front of him"},
    "kai": {"punch2": "a quick straight right cross at head height, the basketball held in the other hand", "punch3": "a leaping uppercut, springing up off the toes and driving the fist up high, the basketball held in the other hand",
            "kick2": "a sharp roundhouse kick to the body, the basketball held in the other hand", "kick3": "a high rising front kick, the sneaker snapping up above head height, the basketball held in the other hand"},
    "estrella": {"punch2": "a left backfist strike at head height with her free left hand, the black microphone held in her right hand near her chest", "punch3": "a rising left uppercut with her free left fist, the black microphone held in her right hand, long hair flying",
                 "kick2": "a spinning heel kick at head height, the black microphone held in her right hand, long hair whipping around", "kick3": "a rising front kick, the foot snapping up above head height, the black microphone held in her right hand"},
    "reyes": {"punch2": "a hard straight right cross with the gloved fist at head height", "punch3": "a driving left uppercut with the gloved fist up to chin height",
              "kick2": "a tactical front kick to the stomach, the combat boot leading", "kick3": "a rising knee strike, driving the knee straight up to chest height"},
    "mateo": {"punch2": "a straight right cross with the throwing hand at head height, the baseball glove on the other hand", "punch3": "a swinging uppercut with the bare right fist rising up to the chin, the baseball glove on the other hand",
              "kick2": "a roundhouse kick to the body, cleats leading", "kick3": "a rising front kick, the cleat snapping up above head height"},
    "vex": {"punch2": "a backhand swing of the black walking cane at head height, sweeping it back across", "punch3": "an overhead chop: raises the black walking cane high and brings it straight down in front of him",
            "kick2": "a hard stomp kick with the heel of his polished shoe at knee height, the black walking cane in his right hand", "kick3": "a rising knee strike to the chest, the black walking cane held in his right hand"},
}


# second takes for combo moves whose first take didn't read (props got in the way, or too little motion): <move>b -> packed as <move>
_BIG = ", a big clear committed strike with the whole body behind it"
RETRY = {
    "vizor": {"punch2b": "steps in and throws a long straight right cross, the rear arm fully extended at head height" + _BIG},
    "padre": {"punch3b": "crouches low and explodes upward with a huge uppercut, the fist rising high above his head" + _BIG,
              "kick2b": "a powerful front push kick, lifting the knee high and thrusting the sole of the foot straight forward at stomach height, the leg fully extended" + _BIG,
              "kick3b": "a jumping knee strike, springing up and driving one knee high and forward to chest height" + _BIG},
    "zeke": {"kick2b": "a heavy roundhouse kick: pivots and swings the rear leg around, the shin striking at waist height, the leg fully extended" + _BIG},
    "hecky": {"punch3b": "a big boxing uppercut: dips low and drives the fist straight up above his head, white suit jacket flaring" + _BIG,
              "kick2b": "a high roundhouse kick at head height, the polished shoe swinging around, the leg fully extended, white suit jacket flaring" + _BIG,
              "kick3b": "a high front kick, snapping the polished shoe straight up above his head, the leg fully extended" + _BIG},
    "lawslie": {"kick2b": "a strong front push kick, thrusting the boot straight forward at stomach height, the leg fully extended" + _BIG},
    "rex": {"punch2b": "lets the bass guitar hang from its strap and throws a straight right punch, the arm fully extended at head height" + _BIG,
            "punch3b": "lets the bass guitar hang from its strap and throws a big rising uppercut, the fist driving up above his head" + _BIG,
            "kick2b": "a heavy roundhouse kick at waist height, the bass guitar swinging on its strap, the leg fully extended" + _BIG},
    "kai": {"punch2b": "keeps the basketball tucked under his left arm (no dribbling) and throws a straight right punch, the arm fully extended at head height" + _BIG,
            "punch3b": "keeps the basketball tucked under his left arm (no dribbling) and leaps into a rising uppercut, the right fist driving up above his head" + _BIG,
            "kick2b": "keeps the basketball tucked under his left arm (no dribbling) and throws a roundhouse kick at waist height, the leg fully extended" + _BIG,
            "kick3b": "keeps the basketball tucked under his left arm (no dribbling) and snaps a high front kick, the sneaker rising straight up above his head" + _BIG},
    "estrella": {"punch2b": "throws a long straight punch with her free left fist, the arm fully extended at head height, the black microphone held in her right hand" + _BIG},
    "reyes": {"punch3b": "crouches and drives a huge rising uppercut with the gloved fist, rising above his head" + _BIG,
              "kick2b": "a strong roundhouse kick at waist height, the combat boot swinging around, the leg fully extended" + _BIG},
    "mateo": {"punch2b": "no ball in his hand: throws a straight right punch with his bare fist, the arm fully extended at head height, the baseball glove staying on his left hand" + _BIG,
              "punch3b": "no ball in his hand: dips and drives a rising uppercut with his bare right fist up above his head, the glove staying on his left hand" + _BIG,
              "kick2b": "no throwing: a roundhouse kick at waist height, the cleat swinging around, the leg fully extended" + _BIG,
              "kick3b": "no throwing: a high front kick, the cleat snapping straight up above his head, the leg fully extended" + _BIG},
}


# third takes: say exactly where the striking limb ends up, and pin the prop down
_HOLD = ", the fist clearly extended far in front of him at the end of the strike"
RETRY2 = {
    "vizor": {"punch2c": "plants his feet and throws a hard straight right cross, the right arm snapping fully out at head height" + _HOLD,
              "kick3c": "a high front kick, the leg rising straight up in front of him with the sneaker above head height, no glowing effects"},
    "lawslie": {"kick2c": "a side kick: lifts the knee and thrusts the boot straight out at waist height, the leg fully extended in front of her, both fists up in guard"},
    "rex": {"punch3c": "takes his right hand off the bass guitar and swings a big rising uppercut, the right fist driving up high above his head, the bass hanging on its strap in front of him"},
    "kai": {"punch3c": "holds the basketball still against his left hip with his left hand, never dribbling or passing it; bends his knees and drives a big rising uppercut with the right fist straight up above his head",
            "kick3c": "holds the basketball still against his left hip with his left hand, never dribbling or passing it; snaps a high front kick, the sneaker rising straight up above his head"},
    "reyes": {"punch2c": "steps forward and throws a long straight right cross, the gloved right fist fully extended far in front of him at head height",
              "punch3c": "bends his knees, then drives a big rising uppercut, the gloved right fist rising straight up above his head"},
    "mateo": {"punch3c": "his right hand is an empty closed fist, no baseball anywhere; dips and drives a big rising uppercut with the right fist straight up above his head, the baseball glove staying on his left hand",
              "kick2c": "a roundhouse kick: pivots and swings the right leg around at waist height, the cleat leading, the leg fully extended, both hands up in guard; no throwing and no baseball"},
}


# THROWS: the game moves the opponent, so the thrower's hands stay empty (no second person in the frames)
_TF = "forward throw, hands empty: reaches forward and grabs with both hands at chest height, pulls in close, then heaves both arms up and over to the front as if hurling something heavy forward, ending in a fighting stance"
_TB = "back throw, hands empty: reaches forward and grabs with both hands at chest height, then pivots his whole body around and swings both arms over his shoulder to throw something heavy behind him, ending facing forward in a fighting stance"
PROP = {"estrella": "the black microphone held in her right hand the whole time", "vex": "the black walking cane hooked over his left forearm the whole time",
        "kai": "the basketball tucked tight under his left arm the whole time, never dribbling", "rex": "the bass guitar hanging on its strap in front of him the whole time",
        "mateo": "the baseball glove on his left hand, no baseball anywhere"}
THROWS = {k: {"throwf": _TF + (", " + PROP[k] if k in PROP else ""), "throwb": _TB + (", " + PROP[k] if k in PROP else "")}
          for k in ["karl", "keksan", "vizor", "padre", "zeke", "hecky", "lawslie", "rex", "kai", "estrella", "reyes", "mateo", "vex", "mike"]}
for _k in ("estrella", "lawslie"):
    THROWS[_k] = {a: v.replace(" his ", " her ").replace("his whole", "her whole") for a, v in THROWS[_k].items()}


# second takes for BACK+SP moves that borrowed other art
SP3B = {
    "padre": {"sp3b": "command grab with empty hands, nothing in his arms: lunges forward and clutches with both hands, then raises both arms high overhead as if lifting something heavy, then slams both arms down hard to the floor in front of him, ending in a fighting stance"},
    "kai": {"sp3b": "the basketball tucked tight under his left arm the whole time, never dribbling or passing: leaps high straight up with the right arm raised, swats the right hand forward and down hard like blocking a shot, then lands in a fighting stance"},
    "lawslie": {"sp3b": "crouches low and swings a short black police nightstick in one hand like a club in a wide flat sweep along the floor at ankle height, never pointing it like a gun, then stands back up in a fighting stance"},
}


# dedicated art for moves that were built from other frames
DEDICATED = {
    "karl": {"step2": "dashes forward extremely fast in a low crouched sprint, body leaning far forward, both arms swept back behind him, white gi flapping, a blur of speed, then stops in a fighting stance"},
    "vizor": {"replay2": "taps a glowing button on his wrist gadget with the other hand, a cyan rewind glow and digital static flicker around his whole body like a paused video, then returns to a fighting stance"},
}


def spec(name):
    s = dict(COMMON)
    for k, v in SPECIAL[name].items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v}
    for k, v in COMBO.get(name, {}).items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v + _END}
    for k, v in RETRY.get(name, {}).items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v + _END}
    for k, v in RETRY2.get(name, {}).items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v + _END}
    for k, v in THROWS.get(name, {}).items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v}
    for k, v in SP3B.get(name, {}).items():
        s[k] = {"mode": "v3", "frame_count": 8, "action_description": v}
    for k, v in DEDICATED.get(name, {}).items():
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
