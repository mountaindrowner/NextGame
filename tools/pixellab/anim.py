"""Submit one character animation (east direction) and wait for it.
usage: anim.py CHAR_ID NAME JSON_EXTRA"""
import json, sys
from pl import call, wait_job

cid, name, extra = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
body = {"character_id": cid, "animation_name": name, "directions": ["east"], **extra}
r = call("POST", "/characters/animations", body)
print("submitted", name, json.dumps(r)[:600], flush=True)
jobs = r.get("background_job_ids") or ([r["background_job_id"]] if r.get("background_job_id") else [])
for j in jobs:
    res = wait_job(j)
    print(name, "job", j, res.get("status"), json.dumps(res.get("usage")), (json.dumps(res.get("last_response"))[:300] if res.get("status") != "completed" else ""), flush=True)
