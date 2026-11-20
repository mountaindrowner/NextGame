#!/bin/sh
# Deploy the matchmaking worker to Cloudflare (needs CF API access: CF_ACCOUNT and an API token in Authorization).
set -e
# Spending guard: deploying only replaces this one worker (free on Cloudflare's Workers Free plan), but it is an
# outward action, so it needs an explicit go-ahead. It never creates other workers, storage, domains or plans.
[ "$CONFIRM_DEPLOY" = "bonfire-bash-net" ] || { echo "Refusing: set CONFIRM_DEPLOY=bonfire-bash-net after the owner approves this deploy." >&2; exit 1; }
A=${CF_ACCOUNT:-ec288a6a02dc7158129ffbbe7b819f48}; N=bonfire-bash-net; D=$(dirname "$0")
B='[{"type":"durable_object_namespace","name":"ROOMS","class_name":"Room"},{"type":"durable_object_namespace","name":"LOBBY","class_name":"Lobby"}]'
# Durable Object migrations: v1 added Room, v2 added Lobby (both live). A normal deploy ships code only;
# a future new class needs a v3 migration here (old_tag v2).
META='{"main_module":"worker.js","compatibility_date":"2024-11-01","bindings":'$B'}'
curl -sS -X PUT "https://api.cloudflare.com/client/v4/accounts/$A/workers/scripts/$N" \
  -F "metadata=$META;type=application/json" -F "worker.js=@$D/worker.js;type=application/javascript+module"
curl -sS -X POST "https://api.cloudflare.com/client/v4/accounts/$A/workers/scripts/$N/subdomain" -H 'Content-Type: application/json' -d '{"enabled":true}'
