# Ikarmic Website Copilot Instructions

## Project context

- Stack: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui primitives.
- Package manager: npm (`package-lock.json` is present).
- Main app source is in `src/`.

## Code quality guardrails

- Prefer TypeScript-first solutions with explicit types for exported APIs.
- Keep components small and composable; split when a component exceeds one clear responsibility.
- Do not introduce heavy dependencies if native React or existing utilities can solve the task.
- Reuse UI primitives in `src/components/ui/` before creating new base components.
- Avoid breaking public route paths and existing section naming unless explicitly requested.

## Styling and UI

- Use existing Tailwind conventions and utility patterns already present in the codebase.
- Keep design direction consistent with current brand voice (ethical, human-centered, modern).
- Ensure responsive behavior for mobile and desktop for all UI changes.
- Prefer semantic HTML and accessible interactions (labels, focus visibility, keyboard support).

## SEO and content

- Use existing SEO utilities/components under `src/lib/seo.ts` and `src/components/seo/`.
- Keep page metadata coherent and avoid duplicate title/description patterns.

## Validation checklist before finishing

1. Run lint: `npm run lint`.
2. Run build: `npm run build`.
3. If UI changes were made, smoke test with `npm run dev`.

## Change discipline

- Keep edits minimal and scoped to the requested task.
- Do not refactor unrelated files unless needed to unblock correctness.
- Document assumptions in PR/task notes when requirements are ambiguous.
