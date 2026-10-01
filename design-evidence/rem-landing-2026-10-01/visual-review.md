# REM public page visual review — 2026-10-01

## Scope and evidence

- Task: replace the stale generic `/rem` article in [issue #193](https://github.com/wu-changxing/connectonion-docs-site/issues/193) with a page that explains REM's night-to-morning memory loop, shows the actual alpha reader, and provides an honest install path.
- Build under review: local `docs/rem-a11` worktree at `http://localhost:3005/rem`, prior to publication. The package release `1.9.0a11` must be public before this page is deployed.
- State: invented notebook fixture, no private content; English locale, logged out, reduced motion, browser zoom 100%.
- Before: [desktop](before-desktop.png) and [phone](before-phone.png). After: [desktop](after-desktop.png), [tablet](after-tablet.png), [phone](after-phone.png), and [phone with dark OS scheme](after-phone-dark-scheme.png). Full-page screenshots at 1440 × 900, 900 × 900, and 390 × 844 CSS pixels, DPR 1. The page intentionally uses the same theme in both OS schemes.
- References: [W01 Linear](https://linear.app/) and [W02 Raycast AI](https://www.raycast.com/core-features/ai), official public landing page captures from 2026-09-26 UTC, 1440 × 1000; local image paths and capture metadata are in the `web-page-design` skill's `references/sources.json`. These are composition references, not product assets or evidence of conversion.
- Comparison limit: the references are desktop marketing surfaces for different products. There is no matched mobile reference. REM's reader screenshot is from a local alpha fixture and does not prove the user's own overnight run will yield the same data.

## Three required comparison answers

| Question | Verdict | Specific visible evidence |
| --- | --- | --- |
| Did we achieve the intended effect? | Reached for the public page | The old page opened with a Markdown article and stale `co wiki` guidance. The new hero states the night-to-morning use, puts a single primary trial action beside it, and follows with a real reader frame and a three-step memory loop. |
| Is the relevant craft comparable in this state? | Partial | Like W01, the headline, explanation, action, and product evidence share a reading direction. Like W02, the trial action has nearby conditions and a concrete example. REM's product frame contains much denser text than either reference; it is evidence of a working reader but small at desktop page scale. |
| Where is the largest gap? | Ordered gaps | 1. Hero reader text is small at desktop page scale → users cannot inspect every claim from the landing page → offer a zoomable reader view or direct demo when the product supports it. 2. Phone image shows the latest pages but not the recall prompt in its first viewport → the third loop step relies on copy → capture a narrower, interactive demo state. 3. This page can describe page-level changes, but the product still lacks claim-level verification and durable recall tracking → address the linked product issues before stronger promises. |

## Functional checks

- Main flow: `Try the preview` navigated to `#start` at 390, 900, and 1440 CSS pixels; the source/storage disclosure opened; the visible product image loaded at all three widths.
- Production build smoke check: after release sync and the Next.js patch update, the `Read the CLI reference` action reached `/cli/rem` at 390 and 1440 CSS pixels; the route rendered without document overflow or page errors.
- Layout: one H1, no document horizontal overflow or terminal-code clipping at 390, 900, and 1440. The terminal command wraps at narrow widths.
- Errors: no browser page errors in those three runs. After exact-tag sync from public `v1.8.10` and `v1.9.0a11`, `npm ci`, `npm audit --audit-level=moderate` (zero vulnerabilities), `npm run test:blog`, `npm run lint` (zero errors; 155 pre-existing warnings), `npx tsc --noEmit`, `npm run build -- --webpack`, `npm run test:blog:build`, and `node scripts/check-seo.mjs --all` all passed.
- Reduced motion: tested in the above browser runs. The page uses no required animation.
- Accessible names and keyboard: product images have descriptive alt text; section headings and native disclosure are labeled. The primary action was reached on the third Tab, showed a visible 2px focus outline, and Enter navigated to `#start`.
- Contrast: calculated CSS color pairs for hero body text, primary action, general body copy, terminal hint, and terminal inline code at 10.91:1, 13.53:1, 5.66:1, 9.14:1, and 10.74:1 respectively. This sampled key text pairs; it is not a full automated page audit.
- Dark OS scheme: inspected at phone width; the page deliberately keeps its designed light site shell and midnight REM panel. It is not a separate dark theme.
- Real mail connection, scheduled run, authentication, and any actual memory outcome were outside this local page test; the page describes the opt-in CLI and links to the product audit for limitations.

## Independent design critique

- Reviewer: Codex (AI). I inspected the actual before/after desktop and phone images and the W01/W02 reference captures.
- Initial critique: the old article had no visual evidence and its release language was outdated. The first new phone rendering clipped the exact version command, and the terminal inline-code colors were too dim against the dark surface.
- Revision: wrapped terminal commands at every width, improved inline-code contrast, corrected the phone image alt text, and regenerated desktop, tablet, and phone screenshots. The latest browser check reports terminal `scrollWidth == clientWidth` at all three widths.
- Verdict: pass for a public alpha overview page in the named states; the remaining product gaps above are tracked rather than hidden by the landing page.

## Final status

- Functional verification: pass for local page navigation, keyboard primary action, sampled text contrast, disclosure, image load, responsive overflow, and absence of page errors at 390/900/1440; package behavior not retested here.
- Reference comparison: partial because the real reader frame is still hard to inspect at landing-page scale; no matched mobile reference.
- Independent visual review: pass for this page's desktop and phone presentation, with the terminal fixes included.
- Next check: review the deployed `/rem` and `/cli/rem` routes after the PR merges. The exact published tags are synced and local gates pass.
