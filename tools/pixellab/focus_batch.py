"""Focus-attack animation for every fighter and costume in one budgeted job: PL_BUDGET=80 python3 focus_batch.py"""
import json, threading
from moves import COMMON, CHARS, submit, have
NAMES = ["karl", "keksan", "vizor", "padre", "zeke", "hecky", "lawslie", "rex", "kai", "estrella", "reyes", "mateo", "ivan", "padreteen2", "heckyfox", "zekeidol", "karl2"]
log = []; ts = []
for n in NAMES:
    cid = CHARS[n]
    if "focus" in have(cid):
        print(n, "already has focus"); continue
    t = threading.Thread(target=submit, args=(cid, "focus", COMMON["focus"], log)); t.start(); ts.append(t)
for t in ts: t.join()
print("done", len(log), log)
