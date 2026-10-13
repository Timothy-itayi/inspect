# Queue

Problems noticed but not fixed on sight. Newest at the bottom.
Format: `- YYYY-MM-DD | file or area | one line`



## issue-1-issue-types (second pass), 2026-10-13

- 2026-10-13 | docs/research/issue-types.md | Future-standard table (lines 83-96) should be moved to separate document (critic). Kept for now: it's clearly labelled not current and excluded from the schema; revisit if the doc grows
- 2026-10-13 | docs/research/issue-types.md | Add pre-commit check: every requirement and issue row must contain a direct source link
- 2026-10-13 | evals (#4) | Specify positive/negative photo counts per issue type, multi-label handling and the minimum clean-photo count for false-alarm rates (critic on #1)

- 2026-10-13 | app/features/results-explore | More tests for reduced-motion and nearest-circle tap resolution (critic on #3)

## Resolved

- 2026-10-13 | design/tokens.json | confidence.unsure.outlineDotGap = 3 was invented (style.md says only "dotted"); confirm in design/style.md (resolved 2026-10-13: Timothy kept 3; now in style.md)
  Fixed in PR #9 (commit 95bf362): design/style.md now states the 3px dotted gap.
- 2026-10-13 | app/features/results-explore/ListVariant.tsx | Thumb.index only feeds an idPrefix the non-interactive PhotoCanvas never uses; drop it (critic on #3)
  Fixed in the issue #19 PR: Thumb no longer takes index; idPrefix is optional.
- 2026-10-13 | app/app.json | expo-font config plugin added by `expo install` is unneeded with useFonts; remove if it stays unused (critic on #3)
  Kept on purpose (issue #19): the expo-font plugin is how fonts get built into the app once it is a real install, not just Expo Go.
- 2026-10-13 | app/features/results-explore/PlaceholderPhoto.tsx | List thumbnails still show a cropped "Placeh…" inside the image, redundant now the caption sits below
  Fixed in the issue #19 PR: the List photos hide the in-image text; the caption stays, On the photo keeps its label.
