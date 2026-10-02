# GitHub docs discovery evidence

The homepage wall has 53 connection cards, matching the landing inventory.
GitHub is marked upcoming preview; the guide does not advertise an available
package pin. Linear/Canny gain source-backed guides so their wall links resolve.
The repository-owned GitHub guide and Design Journal are synced from the
framework PR; the existing blog pipeline generates discovery and metadata.

- `npm run lint`: 0 errors, 155 existing warnings.
- `npm run build -- --webpack`: passed. Webpack supports this isolated worktree's
  node_modules symlink outside the Turbopack project root.
- `npm run test:blog`: 120 Markdown files, 136 canonical routes passed.
- `npm run test:blog:build`: 112 generated articles, 136 feed/sitemap entries passed.
- Browser checks at 1440×1200 and 390×844: 53 cards, no horizontal overflow.
- Both screenshots were captured from the production build; all wall links
  have matching source routes.

No package availability/channel constants changed. GitHub remains unreleased.

The GitHub, Linear and Canny guides and Design Journal returned HTTP 200 from
the final production build, with the expected unique titles and canonical URLs.
The journal was also captured at 1440×1000 and 390×844 without horizontal
 overflow. Its screenshots are included alongside the homepage wall captures.

Merged main's co rem canonical-route and branding update (`a9b0813`) before
review. Rebuilt with Webpack and reran blog checks: 121 Markdown files,
137 canonical/feed/sitemap entries and 113 generated pages passed. Refreshed
homepage screenshots; final checks still show 53 cards and no desktop/mobile
horizontal overflow. The co rem card keeps main's `/rem` canonical target.

Independent AI founder/marketing/UI review is recorded in `independent-review.md`.
The wrong journal category and truncated generated intro were fixed with
explicit GitHub/Inbox/CLI metadata in the canonical source. Production build,
blog checks, and independent desktop/phone journal and listing rechecks passed.
Updated journal screenshots and JSON flow/viewport observations are included.
The existing dismissible mobile star banner is a scoped follow-up. README new
image rendering remains an explicit check after landing endpoint deployment.
