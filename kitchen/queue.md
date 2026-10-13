# Queue

Problems noticed but not fixed on sight. Newest at the bottom.
Format: `- YYYY-MM-DD | file or area | one line`

- 2026-10-13 | app/features/results-explore/ListVariant.tsx | Thumb.index only feeds an idPrefix the non-interactive PhotoCanvas never uses; drop it (critic on #3)
- 2026-10-13 | app/app.json | expo-font config plugin added by `expo install` is unneeded with useFonts; remove if it stays unused (critic on #3)
- 2026-10-13 | app/features/results-explore | More tests for reduced-motion and nearest-circle tap resolution (critic on #3)
- 2026-10-13 | app/features/results-explore/PlaceholderPhoto.tsx | List thumbnails still show a cropped "Placeh…" inside the image, redundant now the caption sits below
- 2026-10-13 | design/tokens.json | confidence.unsure.outlineDotGap = 3 was invented (style.md says only "dotted"); confirm in design/style.md
