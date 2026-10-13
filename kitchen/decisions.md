# Decisions

Written via the case-study-log skill. Newest at the top.

## 2026-10-14: Keep the expo-font setting the reviewer suggested removing
- Context: the outside reviewer on #3 said the `expo-font` setting in `app/app.json` was unneeded, since fonts load with `useFonts` in Expo Go.
- Options: remove it now; keep it
- Chosen: keep it, because once Inspect is a real install (not Expo Go) this setting is how the fonts get built into the app. Removing it now would mean adding it back in Build.
- Decided by: head chef, in the #19 spec; Timothy has the final say when he merges PR #21
- Links: #19, PR #21, #3

## 2026-10-13: Replace the clipboard look with a clean, Airbnb-inspired style
- Context: the clipboard look (kraft board, paper sheets, serif headings, ballpoint ink) was not helping the product.
- Options: keep the clipboard look; blend it with a cleaner style; a fresh style that keeps the pen circle; a fully fresh style with no pen circle
- Chosen: a fresh style that keeps only the pen circle, with one deep teal accent (#0E6B6B). Timothy said the UI "was not helping our cause".
- Decided by: Timothy
- Links: #11, kill-pile/2026-10-13-clipboard-look

## 2026-10-13: List wins the results-screen layout
- Context: three coded prototypes of the results screen, built from one fixture, needed comparing before Build.
- Options: List, On the photo, Checklist
- Chosen: List, because it is easier to scan (Timothy, after seeing the verify screenshots in PR #8). To revisit once real results exist in Build.
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

