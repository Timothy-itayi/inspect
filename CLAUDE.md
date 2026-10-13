House rules: ~/.claude/CLAUDE.md applies. These add to it.

# Inspect

An AI companion for Melbourne rental inspections that shows what it isn't sure about.

## Project rules

- The model's output must match the JSON schema in `api/src/schema.ts`; the app never parses free text.
- Every issue shown to the user carries a confidence level and the region of the photo it came from.
- Confidence is shown with a pattern or label as well as colour.
- Photos are resized before upload; originals stay on device unless the user saves an inspection.
- Prompt or schema changes must rerun the eval suite; the PR includes before/after numbers.
- Never claim a property breaches the law. Phrase findings as "possible issue, worth asking about".

## Layout

- `app/` Expo app (features in `app/features/<name>/`)
- `api/` Cloudflare Worker
- `evals/` eval runner, `photos/` and `labels/`

## Design

Follow design/style.md and design/tokens.json; never hard-code colours or font sizes.
