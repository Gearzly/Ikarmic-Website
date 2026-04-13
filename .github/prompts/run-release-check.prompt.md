---
mode: ask
model: GPT-5.3-Codex
description: Execute a release-readiness pass and summarize blockers.
---

Run a release-readiness check for this repository.

Requirements:

- Run lint and build.
- Verify key public deployment files exist.
- List blockers first, then warnings, then informational notes.

Return:

1. Pass/fail matrix.
2. Blocking issues with file references.
3. Recommended fix order.
