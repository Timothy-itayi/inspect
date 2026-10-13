# Decisions

Written via the case-study-log skill. Newest at the top.

## 2026-10-13: List wins the results-screen layout
- Context: three coded prototypes of the results screen, built from one fixture, needed comparing before Build.
- Options: List, On the photo, Checklist
- Chosen: List, because Timothy picked it after seeing the verify screenshots (PR #8). No further reason recorded.
- Decided by: Timothy
- Links: #3, PR #8, kill-pile/2026-10-13-results-on-the-photo, kill-pile/2026-10-13-results-checklist

## 2026-10-13: Unsure confidence outline uses a 3px dot gap
- Context: design/style.md said only "dotted"; the prototypes needed a number, so 3 was guessed and put in design/tokens.json.
- Options: keep 3, pick another gap
- Chosen: keep 3; Timothy approved the value used in the prototypes.
- Decided by: Timothy
- Links: #3, PR #8

## 2026-10-13: Six v1 issue types approved
- Context: the model schema and eval labels need a fixed list of what Inspect may flag in a photo.
- Options: all 11 photographable types from the research, or a smaller v1 allowlist
- Chosen: six types (mould-signs, damp-signs, crack-signs, water-entry-signs, blind-cord-loop, window-covering-damage), because each has a visible sign and they keep the 40-50 photo eval set at about 7-8 photos per type.
- Decided by: Timothy
- Links: #1, PR #7, docs/research/issue-types.md

