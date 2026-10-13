# Feature map

Every user-facing feature: how to reach it, the selectors or test IDs that matter, and its gotchas.
Updated in the same PR as any feature change. Used by the verify skill.

| Feature | How to reach it | Test IDs / selectors | Gotchas |
| --- | --- | --- | --- |
| Scaffold boots (live) | `.claude/skills/verify/scripts/boot-check.sh` | n/a | See verify/features/scaffold-boot.md |
| capture (todo) | Camera screen, take photo | TBD | Simulator image; must show queued |
| offline (todo) | Airplane mode with queued photos | TBD | Copy: "Saved. Will analyse when you're back online." |
| Results prototypes (live) | Open the app; switcher, then a variant. `.claude/skills/verify/scripts/screens.sh` | `variant-list`, `variant-overlay`, `variant-checklist`, `back`, `row-<issueType>`, `circle-<issueType>`, `issue-detail`, `check-<issueType>` | Confidence is word plus hatch, never colour alone. Fixture only; see verify/features/results-explore.md |
| correct (todo) | Mark an issue "Not an issue" | TBD | Removes it and logs the correction |
| questions (todo) | Questions list from flagged issues | TBD | Must be shareable |
| evals (todo) | `pnpm --filter evals run eval` | n/a | No eval script yet; prints per-issue accuracy |
