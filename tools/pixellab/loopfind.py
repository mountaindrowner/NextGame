"""Find seamless loop points in a song and write a small game-ready MP3 + loop json.
usage: loopfind.py IN.mp3 OUT_BASENAME [bpm]
Picks loop_start a few bars in and the loop_end near the end whose following audio best
matches the audio after loop_start (so jumping back is seamless), then encodes mono 64 kbps."""
import json, subprocess, sys
import numpy as np

src, out = sys.argv[1], sys.argv[2]
bpm = float(sys.argv[3]) if len(sys.argv) > 3 else 140
SR = 11025
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
x = np.frombuffer(pcm, dtype=np.float32)
dur = len(x) / SR
# energy envelope (10 ms hops) for robust matching
hop = SR // 100
env = np.sqrt(np.convolve(x * x, np.ones(hop) / hop, mode="same"))[::hop]
# measure the real tempo (onset autocorrelation) near the requested bpm
h2 = SR // 200
e2 = np.sqrt(np.convolve(x * x, np.ones(h2) / h2, mode="same"))[::h2]
on = np.maximum(0, np.diff(e2)); on = on - on.mean(); on = on[:200 * 60]
ac = np.correlate(on, on, mode="full")[len(on) - 1:]
lo, hi = int(200 * 60 / (bpm * 1.06)), int(200 * 60 / (bpm * 0.94))
beat = (lo + int(np.argmax(ac[lo:hi]))) / 200
bpm = 60 / beat
bar = 4 * beat
W = int(6 / 0.01)  # compare 6 s of envelope


def score(a, b):
    A, B = env[a:a + W], env[b:b + W]
    if len(A) < W or len(B) < W:
        return -1
    A = (A - A.mean()) / (A.std() + 1e-9); B = (B - B.mean()) / (B.std() + 1e-9)
    return float((A * B).mean())


best = (-2, 0, 0)
for s in np.arange(1.0, 14.0, 0.01):  # loop start candidates
    si = int(s / 0.01)
    # loop end candidates: whole bars later, landing 6-14 s before the end
    for nbar in range(int((dur - 30 - s) / bar), int((dur - 7 - s) / bar) + 1):
        for jitter in np.arange(-0.15, 0.151, 0.01):
            e = s + nbar * bar + jitter
            if e + 6.5 > dur:
                continue
            sc = score(si, int(e / 0.01))
            if sc > best[0]:
                best = (sc, s, e)
sc, s, e = best
# refine to sample level with waveform cross-correlation around the end point
w = int(0.25 * SR); si, ei = int(s * SR), int(e * SR)
ref = x[si:si + w]
cands = range(ei - int(0.03 * SR), ei + int(0.03 * SR))
ei = max(cands, key=lambda k: float(np.dot(ref, x[k:k + w])))
e = ei / SR
keep = e + 0.5
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-t", f"{keep:.3f}", "-ac", "1", "-ar", "32000", "-b:a", "64k", out + ".mp3"], check=True)
json.dump({"loopStart": round(s, 4), "loopEnd": round(e, 4), "match": round(sc, 3), "bpm": round(bpm, 2)}, open(out + ".json", "w"))
print(f"bpm {bpm:.2f}  loop {s:.2f}s -> {e:.2f}s  (match {sc:.3f}, song {dur:.1f}s, kept {keep:.1f}s)")
