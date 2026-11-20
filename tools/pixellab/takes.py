"""Compare song takes by loudness over time (5 s windows) and silence: takes.py a.mp3 b.mp3 ..."""
import subprocess, sys
import numpy as np
SR = 11025
for f in sys.argv[1:]:
    x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout, dtype=np.float32)
    w = 5 * SR
    rms = [20 * np.log10(np.sqrt(np.mean(x[i:i + w] ** 2)) + 1e-9) for i in range(0, len(x) - w + 1, w)]
    quiet = sum(1 for v in rms if v < -30)
    print(f"{f.split('/')[-1]:22s} start {rms[0]:6.1f}  mean {np.mean(rms):6.1f}  spread {np.std(rms):4.1f}  quiet windows {quiet}  |", " ".join(f"{v:.0f}" for v in rms))
