---
name: verify
description: Verify Inspect (Expo iOS app in app/, Cloudflare Worker in api/, eval runner in evals/). Use after any change and before the critic, to prove the scaffold still boots and, as screens land, that the user flows in features/ work. Today it proves the iOS bundle builds and the Worker answers HTTP; the results-explore screen flow is live via `scripts/screens.sh`.
---

# Verify Inspect

Inspect is a pnpm workspace: `app/` (Expo, React Native, TypeScript; primary surface, iOS), `api/` (Cloudflare Worker), `evals/` (eval runner, not built yet). The app has no screens yet, so verification covers the scaffold. Each flow in `features/` says whether it's live or todo.

## Launch

One script runs launch, drive, evidence and cleanup for the scaffold:

```bash
.claude/skills/verify/scripts/boot-check.sh
```

- Installs nothing. Run `pnpm install` at the repo root first if `node_modules/` is missing.
- Starts the Worker with `wrangler dev` on `127.0.0.1:8790` (override with `VERIFY_API_PORT`). It counts as ready when `GET /` returns 200 with a non-empty body, polling for up to 60s.
- Builds the iOS JS bundle with `expo export --platform ios`. No simulator is needed for this.
- Exit 0 means every flow passed, 1 means a flow failed, and 2 means the doctor refused to run.

## Doctor

Run this first if anything looks off. It's read-only.

```bash
lsof -nP -iTCP:${VERIFY_API_PORT:-8790} -sTCP:LISTEN   # must print nothing: the port must be ours to take
ls node_modules/.pnpm >/dev/null && echo deps-ok
node --version                                         # 22+
grep -E '"name"|compatibility_date' api/wrangler.jsonc # name inspect-api, a real date (no <PLACEHOLDER>)
```

The script runs the port check itself and refuses to double-drive a port somebody else owns.

## Drive

Live today (scaffold):
- `typecheck-app`, `typecheck-api`: `pnpm --filter <pkg> exec tsc --noEmit`
- `api-tests`: `pnpm --filter api exec vitest run`
- `ios-bundle`: `cd app && CI=1 pnpm exec expo export --platform ios --output-dir <dir>`; passes when a `.hbc` bundle exists
- `api-http`: `curl -fsS http://127.0.0.1:$PORT/` against the running Worker

Live screen flow (`results-explore`):

```bash
.claude/skills/verify/scripts/screens.sh
```

It boots `iPhone 15 Pro` (shutting it down afterwards only if it booted it), starts Metro on a free port, installs Expo Go from Expo's cache, runs `.maestro/results-explore.yaml`, and saves screenshots to `verify-output/<ts>-screens/`. Look at them: the script proves the flow ran, not that the hatch, circles and words look right.

For further screens, drive the app in the iOS Simulator with Maestro (installed; needs Java on PATH from `~/.zshrc`). Select by `testID` and accessibility labels, never by coordinates. Put flows in `.maestro/<feature>.yaml` and add them to `boot-check.sh` (or a sibling script) as the features in `features/` go live. Prefer `iPhone 15 Pro` (`xcrun simctl list devices available`).

## Evidence

Everything goes to `verify-output/<YYYYMMDD-HHMMSS>/` (gitignored):
- `report.txt`: VERIFY pass|fail plus one line per flow with its evidence path. Link it in the PR.
- `typecheck-*.log`, `api-tests.log`, `ios-export.log` (lists the built bundle and its size), `wrangler.log`, `api-response.txt` (the Worker's actual body).

Proof standards: exercise the real path, not test-only endpoints. Capture the action and the resulting state. Screen flows must save a Maestro screenshot of the end state and check side effects, such as a row in expo-sqlite's queue or the logged correction, alongside what's visible. Mock Claude's vision API only with a fixture at the Worker boundary, which is where production isolates it.

## Cleanup

The script's `EXIT` trap kills only the wrangler PID it started (never by name). It also deletes the bulky exported bundle but keeps `ios-export.log` and every other evidence file. Afterwards, `lsof -nP -iTCP:8790 -sTCP:LISTEN` should print nothing. Delete old `verify-output/` folders only by hand.

## Feature map

`features/README.md` indexes every user-facing flow. The planned flows from the brief are also tracked in `docs/feature-map.md`. Keep both in step with `/maintain-verification-skill` whenever a feature changes.
