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

## Auto-merge

Some changes can merge by themselves once every check passes, the reviewers find nothing that must be fixed, and the evaluator signs off. Only changes where **every file** matches one of these patterns qualify:

- `docs/**`: documentation, research notes and screenshots
- `kitchen/**`: the decision log, AI log, kill pile and problems list
- `**/*.test.ts`: tests on their own
- `.maestro/**`: the screen tests

Everything else waits for Timothy. That covers anything you'd see in the app, new or upgraded dependencies, the AI prompt and response format, and CI. Rule changes (this file, `.claude/`, `.github/`, dependency files) are never merged by the loop, even with Timothy's approval; he merges those himself on GitHub. `scripts/merge_gate.py` in the kitchen repo reads the list below from `main` and makes the call.

```auto-merge
docs/**
kitchen/**
**/*.test.ts
.maestro/**
```
