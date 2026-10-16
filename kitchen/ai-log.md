# AI log

Where AI helped, where it was wrong, and where Timothy overruled it. Written via the case-study-log skill.

## 2026-10-16: The reviewer blamed the change for files it never touched
- Tool/model: critic (GPT-5.6 through Cursor)
- What it did: on #24 it marked the simulator turn-taking files (`screens.sh`, the verify skill) as a must-fix scope breach and asked for them to be removed
- Why it was wrong: it compared the branch against an out-of-date local copy of main (9d5ae4f) that didn't have PR #23 yet. Against GitHub's main the branch changed only the 5 allowed files.
- Caught by: head chef, rerunning the comparison against origin/main
- Fix: tell the critic to compare against origin/main by name

## 2026-10-13: Screen tests waited for text the test runner couldn't see, three times
- Tool/model: line-cook (Sonnet) writing Maestro flows
- What it did: on #11 it waited for the second card's question, which was below the first screenful once cards got taller. On #14 it did the same, then switched to the card heading, which sits inside a group VoiceOver reads as one combined label, so Maestro can't match the heading text.
- Why it was wrong: a test step must wait for text that is on screen when the view opens and is its own accessible element. The app was fine every time; only the test failed, costing three full simulator runs.
- Caught by: verify (porter), cause found by the head chef from the failure screenshot
- Fix: the flows now wait for the first card's question text. Rule added to the verify skill's results-explore notes: wait on an on-screen question or a testID, never a heading inside an accessible group or text below the fold.

