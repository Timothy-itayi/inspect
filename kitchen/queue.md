# Queue

Problems noticed but not fixed on sight. Newest at the bottom.
Format: `- YYYY-MM-DD | file or area | one line`



## issue-1-issue-types (second pass), 2026-10-13

- 2026-10-13 | docs/research/issue-types.md | Future-standard table (lines 83-96) should be moved to separate document (critic). Kept for now: it's clearly labelled not current and excluded from the schema; revisit if the doc grows
- 2026-10-13 | docs/research/issue-types.md | Add pre-commit check: every requirement and issue row must contain a direct source link
- 2026-10-13 | evals (#4) | Specify positive/negative photo counts per issue type, multi-label handling and the minimum clean-photo count for false-alarm rates (critic on #1)

- 2026-10-13 | app/features/results-explore | More tests for reduced-motion and nearest-circle tap resolution (critic on #3)

- 2026-10-14 | app (tooling) | No code formatter in the repo: files drift in layout (porter on #19). Add Prettier with a format check, or decide not to
- 2026-10-14 | .claude/skills/verify/scripts/screens.sh | A screen check that is force-killed (kill -9) leaves its Metro server running, because the clean-up never gets to run. The simulator lock is still freed. Kill stray `expo start` processes by hand if it happens

## Resolved

- 2026-10-13 | design/tokens.json | confidence.unsure.outlineDotGap = 3 was invented (style.md says only "dotted"); confirm in design/style.md (resolved 2026-10-13: Timothy kept 3; now in style.md)
  Fixed in PR #9 (commit 95bf362): design/style.md now states the 3px dotted gap.
- 2026-10-13 | app/features/results-explore/ListVariant.tsx | Thumb.index only feeds an idPrefix the non-interactive PhotoCanvas never uses; drop it (critic on #3)
  Fixed in PR #21: Thumb no longer takes index; idPrefix is optional.
- 2026-10-13 | app/app.json | expo-font config plugin added by `expo install` is unneeded with useFonts; remove if it stays unused (critic on #3)
  Kept on purpose (PR #21): the expo-font plugin is how fonts get built into the app once it is a real install, not just Expo Go.
- 2026-10-13 | app/features/results-explore/PlaceholderPhoto.tsx | List thumbnails still show a cropped "Placeh…" inside the image, redundant now the caption sits below
  Fixed in PR #21: the List photos hide the in-image text; the caption stays, On the photo keeps its label.
- 2026-10-16 | api/src/schema.ts | evidence and suggestedQuestion may contain line breaks though the spec calls each "one short line"; reject them if multi-line answers show up (critic on #24)
- 2026-10-16 | api/src/schema.ts | before handing the format to Claude, check which JSON-schema rules its structured output honours (minimum, maximum, exclusiveMinimum, minLength, maxLength, maxItems, pattern); checkAnswer stays the real check either way (porter on #24)
- 2026-10-16 | app/features/results-explore/tokens.ts | confidenceTokens is exported only as a type guard and nothing reads it; use it in ConfidenceMark or make it a type-only check (porter and critic on #24)
- 2026-10-16 | .claude/skills/verify/scripts/screens.sh | Expo's developer-tools button covers the switcher title and card corners in screenshots; hide it during the run (porter on #24)
- 2026-10-16 | api/test/schema.spec.ts | no test asserts ANSWER_JSON_SCHEMA's maxItems, maxLength, 0..1 bounds and exclusiveMinimum match checkAnswer's limits; low risk because both read MAX_ISSUES and MAX_TEXT, but the 0..1 bounds are written twice. Add the test when the Worker starts sending this schema to Claude (critic on #24)
