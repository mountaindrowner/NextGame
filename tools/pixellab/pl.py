"""Tiny PixelLab v2 REST helper. Auth is injected by the environment's proxy;
set PIXELLAB_TOKEN to use it elsewhere."""
import base64, json, os, sys, time, urllib.request, urllib.error

API = "https://api.pixellab.ai/v2"


def call(method, path, body=None, raw=False):
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
    print(json.dumps(call(sys.argv[1], sys.argv[2], json.loads(sys.argv[3]) if len(sys.argv) > 3 else None), indent=1)[:4000])
