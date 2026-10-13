# Scaffold boots

Before any screen exists, this proves a developer can get Inspect running: the app compiles and bundles for iOS, and the API Worker starts and answers HTTP.

## Sub-features

- `typecheck-app` and `typecheck-api`: both packages pass `tsc --noEmit`.
- `api-tests`: the Worker's vitest suite passes.
- `ios-bundle`: `expo export` produces an iOS Hermes bundle.
- `api-http`: `wrangler dev` serves `GET /` with a 200 and a body.

## How to get to it (user POV)

- A developer follows README "Run it": `pnpm install`, `pnpm --filter app run start`, `pnpm --filter api run dev`.

## Driving it with boot-check.sh

Preconditions:

- `pnpm install` has run, and port 8790 is free.

- **Run it.** Run `.claude/skills/verify/scripts/boot-check.sh`. It prints `VERIFY: pass` and five `flow: ... pass` lines and exits 0.
- **Check the Worker's answer.** Open `verify-output/<ts>/api-response.txt`. It currently reads `Hello World!`; update this when the Worker's root route changes.
- **Check the bundle.** The last line of `verify-output/<ts>/ios-export.log` lists the `.hbc` file and its size.

## Gotchas

- If `api/wrangler.jsonc` still has `<WORKER_NAME>` or `<COMPATIBILITY_DATE>`, C3 didn't finish. Fill them in and rerun `pnpm --filter api run cf-typegen`.
- The compatibility date can't be later than the installed workerd supports (workerd 1.20261006 means 2026-10-06 or earlier).
- `pnpm exec tsc` prints pnpm's "Done in …" banner even when tsc fails. Trust the exit code, not the banner.
