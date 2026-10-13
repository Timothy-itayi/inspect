#!/usr/bin/env bash
# Screen flows for Inspect: boots the iPhone 15 Pro simulator, starts Metro, installs Expo Go, runs the Maestro flows in .maestro/, and saves screenshots.
# Run from anywhere: .claude/skills/verify/scripts/screens.sh
# Tears down only what it started: Metro, and the simulator only if this script booted it.
# Env: VERIFY_SIM_UDID picks a specific simulator. Exit 0 pass, 1 flow failed, 2 doctor refused.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/../../../.." && pwd)"
OUT="${ROOT}/verify-output/$(date +%Y%m%d-%H%M%S)-screens"
mkdir -p "$OUT"
cd "$ROOT"

export PATH="/opt/homebrew/opt/openjdk/bin:$PATH:$HOME/.maestro/bin"

EXPO_PID=""
BOOTED_BY_US=""
UDID="${VERIFY_SIM_UDID:-}"

cleanup() {
  # Kill only the Metro process group this script started; never by name.
  if [ -n "$EXPO_PID" ] && kill -0 "$EXPO_PID" 2>/dev/null; then
    pkill -P "$EXPO_PID" 2>/dev/null
    kill "$EXPO_PID" 2>/dev/null; wait "$EXPO_PID" 2>/dev/null
  fi
  if [ -n "$BOOTED_BY_US" ] && [ -n "$UDID" ]; then xcrun simctl shutdown "$UDID" 2>/dev/null; fi
}
trap cleanup EXIT

declare -a RESULTS
FAIL=0
record() { RESULTS+=("$1 $2 ($3)"); [ "$2" = pass ] || FAIL=1; }
finish() {
  echo "VERIFY: $([ $FAIL = 0 ] && echo pass || echo fail)" | tee "$OUT/report.txt"
  for line in "${RESULTS[@]}"; do echo "flow: $line" | tee -a "$OUT/report.txt"; done
  echo "evidence: $OUT" | tee -a "$OUT/report.txt"
  exit $FAIL
}

# Doctor
for tool in maestro java xcrun; do
  command -v "$tool" >/dev/null || { echo "doctor: $tool not on PATH" | tee "$OUT/doctor.log"; exit 2; }
done
if [ -z "$UDID" ]; then
  UDID="$(xcrun simctl list devices available | grep -m1 'iPhone 15 Pro (' | sed -E 's/.*\(([0-9A-F-]{36})\).*/\1/')"
fi
[ -n "$UDID" ] || { echo "doctor: no iPhone 15 Pro simulator" | tee "$OUT/doctor.log"; exit 2; }

# Boot the simulator unless it's already up (then leave it running afterwards).
if xcrun simctl list devices | grep "$UDID" | grep -q Booted; then
  echo "simulator $UDID already booted; will leave it running" >"$OUT/simulator.log"
else
  xcrun simctl boot "$UDID" >"$OUT/simulator.log" 2>&1 && BOOTED_BY_US=1
  xcrun simctl bootstatus "$UDID" -b >>"$OUT/simulator.log" 2>&1
fi
# expo start --ios needs the Simulator app window running; opening it is harmless if it already is.
open -a Simulator --args -CurrentDeviceUDID "$UDID" 2>/dev/null
for _ in $(seq 1 30); do pgrep -x Simulator >/dev/null && break; sleep 1; done
sleep 5

# Metro on a free port. shortcut: `expo start --ios` asks System Events whether Simulator is running and
# crashes without automation permission (it did here), so Metro starts plain and Expo Go is installed
# with simctl from Expo's own download cache (`expo start --ios` fills it once; run it by hand if empty).
PORT="$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')"
(cd app && CI=1 EXPO_NO_TELEMETRY=1 exec pnpm exec expo start --port "$PORT") >"$OUT/metro.log" 2>&1 &
EXPO_PID=$!
ready=0
for _ in $(seq 1 90); do
  if curl -fsS "http://127.0.0.1:${PORT}/status" 2>/dev/null | grep -q running; then ready=1; break; fi
  sleep 1
done
if [ "$ready" != 1 ]; then record metro fail "$OUT/metro.log"; finish; fi
record metro pass "$OUT/metro.log"

if ! xcrun simctl listapps "$UDID" 2>/dev/null | grep -q host.exp.Exponent; then
  GO_APP="$(ls -dt "$HOME"/.expo/ios-simulator-app-cache/*.app 2>/dev/null | head -1)"
  if [ -z "$GO_APP" ] || ! xcrun simctl install "$UDID" "$GO_APP" >"$OUT/expo-go-install.log" 2>&1; then
    record expo-go-install fail "$OUT/expo-go-install.log"; finish
  fi
fi

# Maestro flow. Screenshots land in $OUT as <name>.png.
if maestro --device "$UDID" test -e PORT="$PORT" --test-output-dir "$OUT/maestro" \
     "$ROOT/.maestro/results-explore.yaml" >"$OUT/maestro.log" 2>&1; then r=pass; else r=fail; fi
cp "$OUT"/maestro/*/results-explore/takeScreenshot/*.png "$OUT/" 2>/dev/null
for n in 00-switcher 01-list 02-list-lower 03-overlay 04-overlay-detail 05-checklist 06-checklist-lower; do
  [ -s "$OUT/$n.png" ] || { r=fail; echo "missing screenshot $n.png" >>"$OUT/maestro.log"; }
done
record results-explore "$r" "$OUT/maestro.log, screenshots $OUT/*.png"

finish
