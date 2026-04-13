---
applyTo: 'src/**/*.{ts,tsx}'
---

# Testing and Validation Instructions

## Minimum validation

- Lint must pass for touched files.
- Production build must succeed.
- New logic should include deterministic behavior and clear edge-case handling.

## Risk checks

- Verify route/page changes do not break navigation.
- Confirm SEO-related updates keep canonical metadata intact.
- Ensure added dependencies are justified and compatible with Vite + TypeScript.

## Regression prevention

- Preserve existing exported names unless a rename is explicitly requested.
- If changing shared utilities, verify all known call sites still compile.
