---
name: seo-page-update
description: Update page metadata and SEO surface consistently using project utilities.
---

# SEO Page Update Skill

## When to use

- Updating title/description/canonical metadata for one or more pages.
- Improving consistency between route content and metadata.

## Inputs expected

- Route/page file target.
- Preferred title and meta description.
- Optional canonical URL and social preview text.

## Workflow

1. Locate metadata wiring (`src/lib/seo.ts`, `src/components/seo/PageSeo.tsx`, page files).
2. Apply metadata changes with consistent naming and tone.
3. Ensure no duplicate/conflicting values across pages.
4. Confirm build passes after updates.

## Output format

- Updated metadata summary by page.
- Files touched.
- Notes on unresolved SEO assumptions.
