# Independent founder, marketing and UI review — GitHub inbox PRs

Reviewed 2026-10-02. This is an independent **AI role-based review** from the perspective of a technology founder with marketing and UI experience. No human founder participated. The reviewer did not implement the changes and used fresh browser sessions against actual rendered production builds, rather than treating earlier screenshots or passing tests as a UI review.

Scope: framework PR openonion/connectonion#2155; docs PR wu-changxing/connectonion-docs-site#205; landing PR wu-changxing/connect-onion-landingpage#59. Local production URLs were http://localhost:32147 and http://localhost:32148. Browser: isolated Chrome through Playwright, desktop 1440×1000 and phone 390×844.

## Assessment after fixes

No remaining release-blocking issue found in the inspected changed website flows. The GitHub wall entry communicates an upcoming preview; its guide states that released packages do not yet include the commands, gives concrete setup/watch/check/listen/receive/done/consume steps, distinguishes local consumption from GitHub writes, and explains the polling and old-review performance limits. GitHub is not presented as already integrated with REM. Linear and Canny guides correctly identify stable 1.8.10 and explain preview-before-write behavior.

The walls preserve useful category hierarchy and readable labels at both sizes. The GitHub card routes to the guide; mobile navigation exposes Issues & Feedback; the landing directory opens to the same feature group and reveals the experimental GitHub description and subcommands. Guides and journal typography, spacing and code blocks remain readable. Twelve initial route/viewport states had no document horizontal overflow or pageerror events. This is sample coverage, not an all-page pass or a backend correctness review.

## Findings and rechecks

| Priority | Finding / user impact | Concrete evidence | Improvement and recheck criterion | Status |
| --- | --- | --- | --- | --- |
| P2 | Landing discovery promised 42 commands while the changed directory contained 50. A reader received contradictory inventory claims. | Fresh rendered CTA “See all 42 commands →”; same page directory “All 50 commands.” Source discover.tsx had a literal 42. | Derive CTA count from COMMANDS. Desktop and phone CTA must say 50, reach #commands, and agree with the 50 directory dt entries. | **Fixed and independently rechecked.** Both sizes say “See all 50 commands →”; ordinary link clicks reach #commands; expanded Issues & Feedback marks GitHub “Upcoming preview”. The adjacent obsolete 1.8.9 preview phrase for audit was removed. |
| P2 | GitHub journal was categorized as Remote Browser, obscuring the story's actual subject and weakening content discovery. Its generated intro was an abruptly truncated first paragraph. | Fresh desktop/mobile journal showed “REMOTE BROWSER”, tag “Remote Browser”, and intro ending “someone still had to…”. | Explicit scoped tags and a complete specific description. Journal category/tags and blog listing must describe GitHub inbox collection accurately. | **Fixed and independently rechecked.** Category GITHUB; tags GitHub / Inbox / CLI; complete scan/performance description. Desktop and phone blog cards use the same description and link to the journal. |
| P2 rollout dependency | Branch README's new GitHub/TikTok logo images cannot render until the landing production endpoints exist. Merging README first leaves broken visible assets. | Actual GitHub-rendered branch README HTTP 200; GitHub and TikTok plans img nodes had complete=true, naturalWidth=0. Other wall logos rendered. This matches the already documented landing deployment dependency. | Deploy landing endpoints before the README update becomes public on main, then verify /logos/github.svg?v=3 and /logos/tiktok.svg?v=3 return HTTP 200, and check actual GitHub-rendered images (including cached image responses), upcoming badge and docs targets. | **Pending deployment check; not a new code defect.** Do not claim all three public walls have deployed successfully. |
| P3 follow-up | Existing star promotion obscures the mobile guide's Limits section and can overlap the mobile menu. Dismissal is required before reading the covered content. | Screenshot independent-github-mobile-Lim.png and independent-github-mobile-menu.png: approximately 300×260 px overlay on a 390×844 viewport. It is scroll-triggered and dismissible. | Consider reducing/suppressing promotion on instructional/decision surfaces or keeping it out of open navigation. Recheck guide reading and menu with banner visible, then dismissed, at 390×844. | **Recorded follow-up.** Existing component outside these PRs' changed scope; not a release blocker. |

## Actual page and state coverage

- Docs homepage: actual GitHub/Linear/Canny wall section at desktop and phone; GitHub upcoming badge, labels and wrapping; clicked GitHub card and waited for /cli/github navigation.
- /cli/github: desktop and phone initial state, setup and claim/completion instructions; scrolled consumer and recovery/limits sections; observed visible mobile promotion state; opened mobile navigation with Issues & Feedback selected.
- /cli/linear and /cli/canny: desktop and phone initial rendering; read full rendered guide content and checked stable status, setup/read/write instructions, limits and safety confirmation text. No real workspace writes performed.
- /blog/the-project-with-no-github: desktop and phone initial rendering, full narrative text and source guide comparison; after fixes rechecked category, tags, full intro and body. Numeric scan evidence was checked for consistency with repository evidence, not reproduced in this UI review.
- /blog listing: after fixes desktop and phone journal card title/date/description and ordinary click navigation.
- Landing homepage: desktop and phone GitHub wall section, upcoming status and responsive category layout; navigated #commands via visible CTA; inspected collapsed directory, then expanded Issues & Feedback and its GitHub/Linear/Canny summaries/subcommands. After fixes rechecked count, destination and expanded state at both sizes.
- Actual GitHub branch README: desktop rendered page and image load state; inspected the branch's three new/updated feature rows and observed production image dependency. No claim of successful live GitHub/TikTok wall image rendering.
- Console documentation flow: independently ran source-tree github --help and github consume --help; verified supported verbs, explicit read-only/local queue behavior, no-reply default and documented cat/dispatcher examples. This reviewer did not run an authenticated continuous listener, backfill, or Codex task execution.

## Artifacts

Fresh initial observations: /tmp/github-independent-review-observations.json. Flow observations: /tmp/github-independent-flows.json. Independent post-fix rechecks: /tmp/github-independent-recheck.json (6 states).

Screenshots under /tmp/frontend-test-screenshots/:

- independent-{docs,landing,github,linear,canny,journal}-{desktop,mobile}.png
- independent-github-mobile-menu.png; independent-github-mobile-Lim.png
- independent-count-recheck-{desktop,mobile}.png
- independent-directory-expanded-{desktop,mobile}.png
- independent-journal-recheck-{desktop,mobile}.png
- independent-blog-listing-{desktop,mobile}.png
- independent-readme-desktop.png

## Remaining gaps

No all-page review, assistive-technology audit, cross-browser matrix, slow/offline-network visual states, clipboard/download execution, narrow widths below 390, real Linear/Canny account mutation, sustained listener reliability, GitHub Enterprise or Windows execution were tested here. GitHub README phone rendering and post-deployment new logo/cache behavior remain unverified. The recorded 58.09-second catch-up scan is evidence from the implementation trial; large-repository polling remains an explicit experiment requiring separate performance evaluation. Site production deployments and package publication were not performed by this reviewer.
