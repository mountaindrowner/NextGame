# Bonfire Bash: rules for Claude sessions

## Spending: never cost the owner money by accident

Services this project's environment can reach, and what each can cost:

| Service | Credential | Can it charge money? | Guard |
|---|---|---|---|
| **PixelLab** (`api.pixellab.ai`) | proxy-injected token | **Yes.** Every POST spends subscription generations, and if those run out, dollar credits. The API has no endpoint that buys credits. | `tools/pixellab/pl.py` refuses every paid call unless `PL_BUDGET=<generations>` is set for the job; refuses below a 100-generation reserve so dollar credits are never touched; stops if the dollar credit drops; logs every paid call to `tools/pixellab/spend_log.jsonl`. |
| **Cloudflare** (`api.cloudflare.com`) | proxy-injected token | Only through Workers usage if the account were on a paid plan. The token **cannot** read or change billing, subscriptions, domain purchases, R2, Stream, Images or Workers AI (checked: all refused). It can manage Workers and Durable Objects. | `server/deploy.sh` refuses unless `CONFIRM_DEPLOY=bonfire-bash-net`; it only replaces that one worker. Never create other workers, namespaces, storage, domains or plans. Never touch the owner's other workers (`bonfire`, `holyhuddle`, `sparkwars`). |
| **itch.io** (`api.itch.io`, butler) | proxy-injected key | No. Uploads are free; nothing here sets prices or buys anything. | Never change the game's price or payment settings. |
| **GitHub** | repo access | No. The repo has no Actions workflows (the only thing that could use paid minutes). | Don't add CI workflows without asking. |
| **Claude usage** (this session) | n/a | Uses the owner's Claude plan. | No multi-agent workflows or agent swarms without the owner asking. |

Rules:
1. **Ask before any paid PixelLab job** unless the owner already asked for that art. Give an estimate. A full new fighter is about 80 generations; a 256×192 stage is about 10; a wide 768×192 level is more.
2. Run PixelLab scripts with an explicit budget, e.g. `PL_BUDGET=80 python3 moves.py kai ...`. Never edit or bypass the guard in `pl.py`, and never call the PixelLab API with curl for POSTs.
3. **After every full job, report the PixelLab balance**: subscription generations left and the dollar credit (`python3 tools/pixellab/pl.py GET /balance`).
4. If a guard refuses, stop and tell the owner. Don't raise the budget or lower the reserve on your own.
