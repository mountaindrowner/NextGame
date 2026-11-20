"""Tiny PixelLab v2 REST helper. Auth is injected by the environment's proxy;
set PIXELLAB_TOKEN to use it elsewhere.

SPENDING LOCK: every call except GET can cost generations (or dollar credits), so it is refused unless
  PL_BUDGET=<max generations for this job>   is set, e.g.  PL_BUDGET=80 python3 moves.py kai ...
The budget is shared by every script run during the job (a snapshot in .spend_job.json, reset after 6 hours
or with  python3 pl.py reset ). A paid call is also refused when:
  - the subscription has fewer than PL_RESERVE generations left (default 100), so jobs never spill over
    into the dollar credit, or
  - the dollar credit has gone down since the job started (stop and ask the owner).
Every paid call is appended to spend_log.jsonl."""
import base64, json, os, sys, time, urllib.request, urllib.error

API = "https://api.pixellab.ai/v2"


HERE = os.path.dirname(os.path.abspath(__file__))
JOB = os.path.join(HERE, ".spend_job.json")
LOG = os.path.join(HERE, "spend_log.jsonl")


class SpendBlocked(RuntimeError):
    pass


def _balance():
    b = _raw("GET", "/balance")
    return (b.get("subscription") or {}).get("generations", 0.0), (b.get("credits") or {}).get("usd", 0.0)


def guard(method, path):
    """Raise SpendBlocked unless this paid call fits the job's budget and can't touch dollar credits."""
    budget = float(os.environ.get("PL_BUDGET", "0") or 0)
    if budget <= 0:
        raise SpendBlocked(f"PixelLab spending is locked ({method} {path}). Set PL_BUDGET=<max generations> for this job.")
    gens, usd = _balance()
    job = json.load(open(JOB)) if os.path.exists(JOB) else None
    if not job or time.time() - job["at"] > 6 * 3600 or job.get("budget") != budget:
        job = {"at": time.time(), "gens": gens, "usd": usd, "budget": budget}
        json.dump(job, open(JOB, "w"))
    spent = job["gens"] - gens
    reserve = float(os.environ.get("PL_RESERVE", "100"))
    if usd < job["usd"] - 1e-6:
        raise SpendBlocked(f"Dollar credit went down (${job['usd']:.4f} -> ${usd:.4f}). Stopping: ask the owner.")
    if gens < reserve:
        raise SpendBlocked(f"Only {gens:.0f} subscription generations left (reserve {reserve:.0f}): refusing so dollar credits are never used.")
    if spent >= budget:
        raise SpendBlocked(f"Job budget used up: {spent:.0f} of {budget:.0f} generations.")
    with open(LOG, "a") as f:
        f.write(json.dumps({"t": time.strftime("%Y-%m-%d %H:%M:%S"), "call": f"{method} {path}", "gens_left": gens, "usd": usd, "job_spent": spent, "budget": budget}) + "\n")


def call(method, path, body=None, raw=False):
    if method.upper() != "GET":
        guard(method.upper(), path)
    return _raw(method, path, body, raw)


def _raw(method, path, body=None, raw=False):
    req = urllib.request.Request(API + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None)
    req.add_header("Content-Type", "application/json")
    req.add_header("Authorization", "Bearer " + os.environ.get("PIXELLAB_TOKEN", "proxy-injected"))
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = r.read()
            return data if raw else json.loads(data or b"null")
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors="replace")
        raise RuntimeError(f"{method} {path} -> {e.code}: {msg[:2000]}") from None


def b64img(path):
    return {"type": "base64", "base64": base64.b64encode(open(path, "rb").read()).decode(), "format": "png"}


def wait_job(job_id, every=8, limit=1200):
    t0 = time.time()
    while True:
        j = call("GET", f"/background-jobs/{job_id}")
        if j.get("status") in ("completed", "failed", "cancelled"):
            return j
        if time.time() - t0 > limit:
            raise TimeoutError(job_id)
        time.sleep(every)


if __name__ == "__main__":
    if sys.argv[1:] == ["reset"]:
        os.path.exists(JOB) and os.remove(JOB); print("job budget snapshot cleared"); sys.exit()
    print(json.dumps(call(sys.argv[1], sys.argv[2], json.loads(sys.argv[3]) if len(sys.argv) > 3 else None), indent=1)[:4000])
