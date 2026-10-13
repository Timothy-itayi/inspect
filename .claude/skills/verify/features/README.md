# Inspect verification map

This directory is the maintained source for verifying what Inspect's users can do. Read this index before driving anything, then use the matching feature file as the recipe.

## Baseline preconditions

- `pnpm install` has run at the repo root.
- Port 8790 (or `VERIFY_API_PORT`) is free. Never drive a Worker this run didn't start.
- For screen flows (once live): an `iPhone 15 Pro` simulator, Maestro on `PATH`, and Java from `~/.zshrc`.

## Driving conventions

- Scaffold checks run through `.claude/skills/verify/scripts/boot-check.sh`.
- Screen flows will run through Maestro, selecting by `testID` and accessibility label, never coordinates.
- Claude's vision API is replaced only by a fixture at the Worker boundary.

## Proof and skip reporting

- Every run writes `verify-output/<timestamp>/report.txt` with one line per flow and its evidence path.
- Screen proof: the action, a Maestro screenshot of the end state, and the side effect (queue row, logged correction).
- A todo flow is reported as `todo`, never as passed.

## Feature entry contract

Each feature file has an H1, one paragraph on the user-visible behaviour, then exactly four H2s in this order: `Sub-features`, `How to get to it (user POV)`, `Driving it with <harness>`, `Gotchas`.

## Features

Live:
- [Scaffold boots](./scaffold-boot.md): the iOS bundle builds and the API Worker answers.

Todo (from the brief; add a feature file when the screen exists):
- capture: open the camera screen, take a photo (simulator image), see it queued
- offline: in airplane mode, queued photos show with "Saved. Will analyse when you're back online."
- results: a fixture response renders issues with confidence (word plus hatch) and the evidence region circled
- correct: marking an issue wrong removes it and logs the correction
- questions: the questions list builds from flagged issues and can be shared
- evals: `pnpm --filter evals run eval` prints per-issue accuracy (no `eval` script yet)
