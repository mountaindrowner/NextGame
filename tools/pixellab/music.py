"""Stage songs via PixelLab's music generator (2 takes per request, $0.08).
usage: music.py STAGE_ID            -> generate, wait, download both takes to music/<id>_take1.mp3, _take2.mp3"""
import json, os, sys, time, urllib.request
from pl import call

HERE = os.path.dirname(os.path.abspath(__file__))
SONGS = {
    "reyes": dict(name="Sunset Outpost", bpm=136, style="16-bit arcade fighting game stage theme for a heroic patrol agent at a desert outpost: a bold 80s action-movie rock anthem with a marching snare cadence, a soaring brass fanfare melody, driving palm-muted guitar chugs, a punchy bass line and big tom fills. Proud, heroic and determined, steady all the way through."),
    "estrella": dict(name="Starlight Club", bpm=118, style="16-bit arcade fighting game stage theme for a glamorous nightclub concert: a confident pop and R&B diva anthem with a funky slap bass groove, punchy dance drums with claps, bright brass stabs, shimmering synth pads and a soaring, catchy vocal-like synth lead melody. Powerful, glamorous and energetic, steady all the way through."),
    "keksan": dict(name="Tiger Gym", bpm=140, style="16-bit arcade fighting game stage theme for a Muay Thai gym: traditional Thai fight music with a wailing pi java oboe-like synth lead and ching finger cymbals keeping time, fused with hard-hitting rock drums, a driving bass riff and crunchy guitar power chords. Fierce, proud and hypnotic, steady all the way through."),
    "kai": dict(name="Street Court", bpm=96, style="16-bit arcade fighting game stage theme for a streetball court at night: a hard-hitting boom-bap hip-hop beat with punchy drums and scratches, a funky bass line, sneaker squeak and ball bounce percussion, brass stabs and a catchy confident synth lead hook. Cool, swaggering and energetic, steady all the way through."),
    "select": dict(name="Choose Your Fighter", bpm=124, style="Catchy 16-bit arcade fighting game character select screen theme: a bouncy funk-rock groove with a punchy slap bass line, crisp drums with handclaps, bright brass stabs and a memorable, hooky synth-guitar lead melody that loops cleanly. Hyped and inviting but not frantic, like the moment before a big tournament, steady all the way through."),
    "rex": dict(name="Main Stage", bpm=128, style="16-bit arcade fighting game stage theme for a huge rock concert: a thick driving slap bass riff leads the song, punchy rock drums, crunchy power-chord guitars, a crowd-chant synth hook and a big stadium chorus melody. Loud, confident and anthemic, steady all the way through."),
    "lawslie": dict(name="Precinct 9", bpm=148, style="16-bit arcade fighting game stage theme for a police chase through the city at night: urgent 70s cop-show funk with driving drums and hi-hat, a punchy slap bass line, wailing brass hits like a siren, a wah guitar and a heroic synth lead. Tense, fast and heroic, steady all the way through."),
    "hecky": dict(name="Penthouse", bpm=136, style="16-bit arcade fighting game stage theme for a luxury penthouse at night: slick jazz-funk with a walking slap bass, tight drums with ride cymbal, sparkling electric piano chords, a smooth saxophone-like synth lead and brass stabs. Cool, smug and stylish, steady all the way through."),
    "zeke": dict(name="Strike Lanes", bpm=128, style="16-bit arcade fighting game stage theme for a retro neon bowling alley: funky disco bass, four-on-the-floor drums with handclaps, bright brass hits, a groovy wah guitar and a catchy synth lead melody. Fun, cocky and danceable, steady all the way through."),
    "title": dict(name="Title Theme", bpm=120, style="Epic 16-bit arcade fighting game title screen theme: a heroic electric guitar and brass melody over big rock drums and driving bass, with a short dramatic intro build. Bold and inviting, steady all the way through."),
    "karl": dict(name="Crossroads Dojo", bpm=150, style="Upbeat 16-bit arcade fighting game stage theme for a Brazilian karate dojo: driving samba-rock drums with surdo and shaker, a punchy slap bass groove, bright synth brass stabs, and a heroic electric guitar lead melody over fast funky chords. Energetic and confident, steady all the way through."),
    "akira": dict(name="Moonlit Temple", bpm=140, style="16-bit arcade fighting game stage theme for a moonlit Japanese temple: taiko drums and a fast rock beat, shakuhachi-style flute and koto plucks carrying a tense pentatonic melody, dark synth bass and electric guitar power chords. Mysterious and fierce, steady all the way through."),
    "ivan": dict(name="Iron Gym", bpm=132, style="16-bit arcade fighting game stage theme for a gritty Russian wrestling gym: heavy stomping drums, a pounding distorted bass riff, brass and choir-like synth pads with a bold minor-key melody, metal guitar chugs. Powerful and relentless, steady all the way through."),
    "diego": dict(name="Rio Plaza", bpm=146, style="16-bit arcade fighting game stage theme for a sunny Rio de Janeiro plaza: berimbau and pandeiro groove, capoeira atabaque drums, funky bass, bright synth lead melody and electric guitar. Playful and fast, steady all the way through."),
    "vizor": dict(name="Control Room", bpm=150, style="16-bit arcade fighting game stage theme for a high-tech surveillance control room: synthwave arpeggios, punchy electronic drums, a pulsing analog bass, glitchy digital stabs and a soaring synth lead. Cool and driving, steady all the way through."),
    "padre": dict(name="Old Chapel", bpm=138, style="16-bit arcade fighting game stage theme for a candle-lit old chapel: a dramatic church organ melody over hard rock drums and bass, electric guitar power chords and choir-like synth pads. Epic and righteous, steady all the way through."),
}


def get(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "curl/8.5.0"})
    with urllib.request.urlopen(req, timeout=120) as r, open(path, "wb") as f:
        f.write(r.read())


if __name__ == "__main__":
    sid = sys.argv[1]; s = SONGS[sid]
    r = call("POST", "/music", {"style": s["style"], "instrumental": True, "bpm": s["bpm"], "length_s": 100,
                               "exclude": "fade out, vocals, singing", "name": "Bonfire Bash - " + s["name"]})
    print(json.dumps(r)[:600], flush=True)
    ids = [t.get("id") or t.get("song_id") for t in (r.get("songs") or r.get("takes") or [])] or [r.get("song_id") or r.get("id")]
    ids = [i for i in ids if i]
    os.makedirs(os.path.join(HERE, "music"), exist_ok=True)
    for n, song_id in enumerate(ids, 1):
        t0 = time.time()
        while True:
            m = call("GET", f"/music/{song_id}")
            if m.get("status") in ("completed", "failed") or m.get("audio_url"):
                break
            if time.time() - t0 > 400:
                raise TimeoutError(song_id)
            time.sleep(10)
        print(n, m.get("status"), m.get("duration_ms"), (m.get("audio_url") or "")[:80], flush=True)
        if m.get("audio_url"):
            get(m["audio_url"], os.path.join(HERE, "music", f"{sid}_take{n}.mp3"))
