#!/bin/sh
# Deploy the matchmaking worker to Cloudflare (needs CF API access: CF_ACCOUNT and an API token in Authorization).
set -e
A=${CF_ACCOUNT:-ec288a6a02dc7158129ffbbe7b819f48}; N=bonfire-bash-net; D=$(dirname "$0")
META='{"main_module":"worker.js","compatibility_date":"2024-11-01","bindings":[{"type":"durable_object_namespace","name":"ROOMS","class_name":"Room"}],"migrations":{"new_tag":"v1","new_sqlite_classes":["Room"]}}'
[ -n "$NO_MIGRATION" ] && META='{"main_module":"worker.js","compatibility_date":"2024-11-01","bindings":[{"type":"durable_object_namespace","name":"ROOMS","class_name":"Room"}]}'
curl -sS -X PUT "https://api.cloudflare.com/client/v4/accounts/$A/workers/scripts/$N" \
  -F "metadata=$META;type=application/json" -F "worker.js=@$D/worker.js;type=application/javascript+module"
curl -sS -X POST "https://api.cloudflare.com/client/v4/accounts/$A/workers/scripts/$N/subdomain" -H 'Content-Type: application/json' -d '{"enabled":true}'
