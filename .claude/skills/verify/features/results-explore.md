# Results screen prototypes

The app opens on a switcher with three ways to see one fixture's four possible issues: a list on a paper sheet, circles drawn on a placeholder photo, and a checklist of the six v1 issue types. Each shows a confidence word plus a hatch swatch, never colour alone. These are prototypes for choosing a design (#3); there's no navigation, saving or model call.

## Sub-features

- `variant-list`: rows with a cropped, circled thumbnail, confidence word and hatch, evidence and the suggested question.
- `variant-overlay`: the photo with a pen circle per region (`circle-<issueType>`); tapping one fills `issue-detail` with name, confidence, position, evidence and question.
- `variant-checklist`: the six v1 types (`check-<issueType>`); flagged ones say "Worth asking", the rest say "Nothing spotted in these photos", never "OK" or "Passed".
- Accessibility: each issue has a label like "Possible signs of damp. Confidence: possible. Lower left of photo." and touch targets are at least 44pt.

## How to get to it (user POV)

- Open the app. The switcher is the first screen. Pick a variant, and tap Back (`back`) to return.

## Driving it with Maestro

Preconditions:

- `pnpm install` has run, Maestro and Java are on `PATH`, and an `iPhone 15 Pro` simulator exists. Expo Go must be in `~/.expo/ios-simulator-app-cache` (run `expo start --ios` once if not).

- **Run it.** Run `.claude/skills/verify/scripts/screens.sh`. It prints `VERIFY: pass` plus `flow: metro` and `flow: results-explore` lines.
- **Check the screenshots.** `verify-output/<ts>-screens/` holds `00-switcher` to `06-checklist-lower`. Confirm the hatch (dense for Possible, sparse and dotted for Unsure, solid for Likely), the ink circles with highlight, and the words beside each swatch. `04-overlay-detail` is the state after tapping `circle-damp-signs`.
- **Unit test.** `pnpm --filter app test` covers region-to-position naming.

## Gotchas

- `expo start --ios` crashes here ("Simulator app did not open fast enough"), so the script starts plain Metro and installs Expo Go with `simctl`.
- Expo Go opens its developer menu on first launch; the flow swipes it away when "Reload" is visible. Its floating gear button shows in screenshots.
- Maestro `takeScreenshot` paths must be relative; files land under `maestro/<run>/results-explore/takeScreenshot/` and the script copies them up.
- Accessible rows hide child text from Maestro, so assertions match the row label (regex), not the inner text.
- If node_modules reads fail with `dataless` files (full disk), delete `node_modules` and reinstall.
