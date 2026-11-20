#!/usr/bin/env python3
"""Voice lines with Kokoro (open-source TTS, runs locally): assets/voice/<key>.mp3

Setup (once):  pip install kokoro-onnx soundfile
  model files from https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
  (kokoro-v1.0.int8.onnx + voices-v1.0.bin) -> set KOKORO_DIR or pass it as the first argument.
usage: voices.py [KOKORO_DIR] [only_key ...]
"""
import os, subprocess, sys, tempfile, pathlib
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "voice"
KDIR = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 and os.path.isdir(sys.argv[1]) else os.environ.get("KOKORO_DIR", "."))
ONLY = [a for a in sys.argv[1:] if not os.path.isdir(a)]

ANNOUNCER = ("am_fenrir", 0.85)
# key -> spoken text (phonetic spelling where English TTS would mangle a name)
ANN = {
    "world_dojo": "World... Dojo!", "round_one": "Round one!", "round_two": "Round two!", "round_three": "Round three!",
    "round_four": "Round four!", "round_five": "Round five!", "final_round": "Final round!", "fight": "Fight!",
    "ko": "K. O.!", "perfect": "Perfect!", "time": "Time!", "you_win": "You win!", "you_lose": "You lose.",
    "player_one_wins": "Player one wins!", "player_two_wins": "Player two wins!", "game_over": "Game over.",
    "congratulations": "Congratulations!", "versus": "versus", "announcer_on": "Announcer on.",
    "name_karl": "Pah-pah Lay-gwahs!", "name_akira": "Akira!", "name_ivan": "Ivan!", "name_diego": "Diego!",
    "name_vizor": "Vizor!", "name_padre": "Samson!", "name_zeke": "Zeke!",
}
# fighter -> (voice, speed, {line: text})
CAST = {
    "karl": ("am_puck", 1.05, {"sp1": "Lay-gwah rush!", "sp2": "Lay-gwah step!", "super": "Meel Lay-gwahs!", "win": "Too slow!", "ko": "I ran out of road..."}),
    "akira": ("am_liam", 1.0, {"sp1": "Shuriken!", "sp2": "Shadow counter!", "super": "Thousand shadows!", "win": "You never saw me coming.", "ko": "The shadow... fades."}),
    "ivan": ("am_onyx", 0.9, {"sp1": "Bear slam!", "sp2": "Iron charge!", "super": "Siberian storm!", "win": "Say hello to the floor.", "ko": "Next time... bigger bear."}),
    "diego": ("am_adam", 1.05, {"sp1": "May-ah loo-ah!", "sp2": "Mar-teh-lo!", "super": "Beh-reem-bow fury!", "win": "The roda never stops!", "ko": "Lost the rhythm..."}),
    "vizor": ("am_eric", 1.0, {"sp1": "Shutter flash!", "sp2": "Instant replay!", "super": "Full exposure!", "win": "Smile. You're on camera.", "ko": "Signal... lost."}),
    "zeke": ("am_michael", 1.0, {"sp1": "Strike ball!", "sp2": "Split shot!", "super": "Perfect game!", "win": "That's a strike, baby!", "ko": "Gutter ball..."}),
    "padre": ("bm_george", 0.9, {"sp1": "Holy tome!", "sp2": "Benediction!", "super": "Final sermon!", "win": "Go in peace, my son.", "ko": "Forgive me..."}),
}
TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"
FX_ANN = TRIM + ",asetrate=24000*0.93,aresample=24000,acompressor=threshold=-20dB:ratio=4:attack=5:release=80,aecho=0.8:0.55:60|120:0.22|0.1,volume=2.2,alimiter"
FX_FIGHTER = TRIM + ",acompressor=threshold=-20dB:ratio=3:attack=5:release=80,volume=1.8,alimiter"


def render(K, key, text, voice, speed, fx):
    if ONLY and key not in ONLY:
        return
    a, sr = K.create(text, voice=voice, speed=speed, lang="en-us")
    with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
        sf.write(tmp.name, a, sr)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp.name, "-af", fx, "-ac", "1", "-ar", "24000", "-b:a", "40k",
                        str(OUT / f"{key}.mp3")], check=True)
    print(f"{key:22s} {voice:10s} {len(a) / sr:4.2f}s  {text}")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    K = Kokoro(str(KDIR / "kokoro-v1.0.int8.onnx"), str(KDIR / "voices-v1.0.bin"))
    for key, text in ANN.items():
        render(K, "ann_" + key, text, *ANNOUNCER, FX_ANN)
    for fid, (voice, speed, lines) in CAST.items():
        for k, text in lines.items():
            render(K, f"{fid}_{k}", text, voice, speed, FX_FIGHTER)
