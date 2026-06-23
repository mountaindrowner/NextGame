# PixelLab AI integration

PixelLab (https://www.pixellab.ai) generates pixel art from text/prompts. It
slots into OHMFRONT's existing art pipeline: PixelLab makes the **source** art,
our tools slice/import it into the game format (same as the hand-made Retro
Diffusion sheets).

There are two ways to use it; we can run either or both.

## What you need (one time)

- A PixelLab account + **API key** (account → API).
- The key set as **`PIXELLAB_API_KEY`**. Preferred: set it as an *environment
  secret* in the Claude Code web environment (so it's available to tools and
  never touches git). Local alternative: copy `.env.example` → `.env` (gitignored).
- Network: this environment can already reach `api.pixellab.ai` (verified).

**Never paste the key into chat or commit it.** `.env` is gitignored.

## Path A — the REST pipeline (reproducible, in-repo)

A committed CLI that calls the API and drops art into `assets/reference/`, with
the prompt saved beside it. Then the normal importers take over.

```bash
# single image (props, tiles, one-off sprites) — v1, synchronous
npm run pixellab -- --prompt "a rusty steel barrel, top-down, game asset" --out barrel --size 64 --no-bg
# → assets/reference/barrel.png  +  barrel.prompt.json
```

Then feed it onward:
- **Character walk sheets** → `assets/reference/<name>_walk_source.png` →
  `npm run import:chars`-style step (tools/import-chars.ts) → `world/char/*`.
- **Portrait busts** → `tools/import-portraits.ts`.
- **Props / tiles** → the asset kits / map generators.

The CLI today covers single-image generation (`generate-image-pixflux`). The
**4/8-direction character** and **animation** endpoints (v2, job-based) are the
next extension — best built once we've confirmed the live request/response with
a real key, so the field shapes are exact.

## Path B — the MCP server (interactive, in-session)

PixelLab ships an MCP server at `https://api.pixellab.ai/mcp` (HTTP transport,
Bearer auth) exposing tools for **character creation (4/8 directions)**,
**animation** (walk/run/idle), and **Wang tilesets**. Adding it to Claude Code's
MCP config lets me call PixelLab directly during our sessions — "make a 4-way
walk sheet for an NPC blacksmith" — and wire the result straight in.

This is the fastest for iteration; Path A is the reproducible record. They share
the same API key.

## Recommended rollout

1. You set `PIXELLAB_API_KEY` (env secret).
2. I run one live `npm run pixellab` call to confirm the response shape, fix any
   field names, and commit a verified single-image generator.
3. Extend to character sheets + animation (Path A v2), and/or wire the MCP
   server (Path B) for interactive generation.
