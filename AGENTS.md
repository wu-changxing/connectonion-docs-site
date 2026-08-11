# Repository Guidelines

## Project Structure & Modules
- `app/`: App Router pages and routes (e.g., `app/quickstart/page.tsx`).
- `components/`: Reusable React components (PascalCase, e.g., `DocsSidebar.tsx`).
- `public/`: Static assets served at `/`.
- `utils/`: Small helpers (e.g., `utils/copyAllDocs.ts`).
- Config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, Tailwind 4.

## Build, Test, and Development
- `npm run dev`: Start local dev server with Turbopack.
- `npm run build`: Production build (`.next/`).
- `npm start`: Run the built app.
- `npm run lint`: ESLint via Next.js rules.

Examples:
```
# develop
npm run dev
# validate before PR
npm run lint && npm run build
```

## Coding Style & Naming
- TypeScript, strict mode enabled; prefer explicit types for public APIs.
- React components: PascalCase files and exports (`Navigation.tsx`).
- Route segments: kebab-case folders with `page.tsx` (`app/blog/trust-keyword/page.tsx`).
- Indentation: 2 spaces; avoid trailing whitespace.
- Styling: Tailwind CSS v4; prefer utility classes over ad-hoc CSS.
- Linting: fix issues surfaced by `npm run lint` before committing.

## Testing Guidelines
- No unit test framework configured yet. Use:
  - Type checks: `tsc --noEmit` (implicit via Next build).
  - Lint/build as acceptance gates: `npm run lint && npm run build`.
- If adding tests, follow React Testing Library + Vitest/Jest patterns and mirror `app/` or `components/` structure (e.g., `components/Navigation.test.tsx`).

## Commit & Pull Requests
- Commits: prefer Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Keep messages imperative and scoped (e.g., `feat(docs): add quickstart examples`).
- PRs must include:
  - Clear description, motivation, and screenshots/GIFs for UI changes.
  - Linked issue (if applicable) and checklist: `lint` + `build` passing.
  - Scope small and focused; avoid unrelated refactors.

## Security & Configuration
- Secrets: never commit them. Use `.env.local` (gitignored). Example: `DISCORD_WEBHOOK_URL=...`.
- Validate external links and untrusted content. Do not expose internal env values to client components.
- Static assets go in `public/`; avoid importing large binaries into the bundle.

## Adding Content
- New docs page: create a route under `app/<section>/page.tsx` and reuse shared components (e.g., `CommandBlock`, `DocsSidebar`). Keep titles concise and URLs kebab-case.

## Release Documentation

- `app/releases/page.tsx` and `public/releases.md` explain the stable,
  alpha, beta, RC, and LTS channels. Keep them aligned with the package
  repository's `docs/releases.md` and `VERSIONING.md`; refresh current-channel
  wording on every publication.
- `lib/version.ts` keeps `STABLE_VERSION` and `PREVIEW_VERSION` separate.
  Homepage and structured-data consumers use stable only. An alpha, beta, or
  RC updates the preview field without changing stable; a final release updates
  stable and clears an obsolete preview. Deploy only after the matching PyPI
  package and GitHub Release are public.
- Preview versions use canonical Python spelling such as `1.7.0a1`,
  `1.7.0b1`, and `1.7.0rc1`. Do not describe `1.6.x` patches as progress toward
  1.7, and do not describe 1.7.1 as a new-feature release before 1.7.0 is stable.
- Normal `pip install connectonion` examples always mean stable. Preview
  instructions must require `--pre` or an exact candidate pin and must not
  imply that an unpublished candidate already exists.

## Design Journal Publications

- A meaningful feature-train launch, first beta, first RC, stable release, or
  material architecture/workflow decision must create or substantially update
  a post under `app/blog/<slug>/page.tsx` with a matching Markdown source under
  `public/tutorials/`.
- Record the problem, alternatives, decision, tradeoffs, evidence, current
  limitations, and the condition that would make us revisit the decision.
  Release notes say what changed; the journal explains why.
- Every new post must be linked from the blog index, navigation, site search,
  `app/sitemap.ts`, `public/sitemap.xml`, `public/llms.txt`, and any relevant
  full AI-readable index. Give the page unique metadata, a canonical URL,
  social-card metadata, and `TechArticle` or `BlogPosting` structured data.
- Draft before publication, but do not claim that a package or preview is
  available until its PyPI artifact and GitHub Release are public. Maintenance
  patches need only release notes unless they contain a reusable design lesson.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
