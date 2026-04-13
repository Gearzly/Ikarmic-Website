---
name: release-readiness
description: Perform a lightweight release readiness pass for this Vite app.
---

# Release Readiness Skill

## Goal

Reduce deployment risk by checking build quality, lint hygiene, and static assets before release.

## Checklist

1. Run `npm run lint`.
2. Run `npm run build`.
3. Confirm public assets are present (`robots.txt`, `sitemap.xml`, redirects file).
4. Capture unresolved warnings/errors and triage by severity.

## Output format

- Pass/fail per check.
- Blocking issues.
- Suggested next steps for release.
