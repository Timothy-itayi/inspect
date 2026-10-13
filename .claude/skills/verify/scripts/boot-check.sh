#!/usr/bin/env bash
# Scaffold boot check for Inspect: proves the app bundles for iOS and the API Worker
# answers HTTP. Run from anywhere: .claude/skills/verify/scripts/boot-check.sh
# Evidence lands in verify-output/<timestamp>/ (gitignored) and survives cleanup.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
OUT="${ROOT}/verify-output/$(date +%Y%m%d-%H%M%S)"
PORT="${VERIFY_API_PORT:-8790}"
mkdir -p "$OUT"
cd "$ROOT"

WRANGLER_PID=""
cleanup() {
  # Kill only the Worker this script started; never by process name.
  if [ -n "$WRANGLER_PID" ] && kill -0 "$WRANGLER_PID" 2>/dev/null; then
    kill "$WRANGLER_PID" 2>/dev/null; wait "$WRANGLER_PID" 2>/dev/null
  fi
  rm -rf "${OUT}/ios-bundle/_expo"   # bulky; the export log and metadata stay as evidence
}
trap cleanup EXIT

declare -a RESULTS
FAIL=0
record() {  # record <flow> <pass|fail> <evidence>
  RESULTS+=("$1 $2 ($3)")
  [ "$2" = pass ] || FAIL=1
}

# Doctor: is the port free, so the Worker we drive is ours?
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "doctor: port $PORT is already in use; set VERIFY_API_PORT to a free port" | tee "$OUT/doctor.log"
  exit 2
fi

# 1. Typecheck both packages
if pnpm --filter app exec tsc --noEmit >"$OUT/typecheck-app.log" 2>&1; then r=pass; else r=fail; fi
record typecheck-app "$r" "$OUT/typecheck-app.log"
if pnpm --filter api exec tsc --noEmit >"$OUT/typecheck-api.log" 2>&1; then r=pass; else r=fail; fi
record typecheck-api "$r" "$OUT/typecheck-api.log"

# 2. Worker unit tests
if pnpm --filter api exec vitest run >"$OUT/api-tests.log" 2>&1; then r=pass; else r=fail; fi
record api-tests "$r" "$OUT/api-tests.log"

# 3. iOS bundle builds
if (cd app && CI=1 pnpm exec expo export --platform ios --output-dir "$OUT/ios-bundle") >"$OUT/ios-export.log" 2>&1 \
   && ls "$OUT"/ios-bundle/_expo/static/js/ios/*.hbc >/dev/null 2>&1; then
  ls -l "$OUT"/ios-bundle/_expo/static/js/ios/*.hbc >>"$OUT/ios-export.log"; r=pass
else r=fail; fi
record ios-bundle "$r" "$OUT/ios-export.log"

# 4. Worker answers HTTP on a real dev server
CI=1 WRANGLER_SEND_METRICS=false api/node_modules/.bin/wrangler dev --cwd api --ip 127.0.0.1 --port "$PORT" >"$OUT/wrangler.log" 2>&1 &
WRANGLER_PID=$!
ready=0
for _ in $(seq 1 60); do
  if curl -fsS "http://127.0.0.1:${PORT}/" -o "$OUT/api-response.txt" 2>/dev/null; then ready=1; break; fi
  sleep 1
done
if [ "$ready" = 1 ] && [ -s "$OUT/api-response.txt" ]; then r=pass; else r=fail; fi
record api-http "$r" "$OUT/api-response.txt"

echo "VERIFY: $([ $FAIL = 0 ] && echo pass || echo fail)" | tee "$OUT/report.txt"
for line in "${RESULTS[@]}"; do echo "flow: $line" | tee -a "$OUT/report.txt"; done
echo "evidence: $OUT" | tee -a "$OUT/report.txt"
exit $FAIL
