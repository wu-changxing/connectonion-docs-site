# REM native scheduling follow-up review — 24 October 2026

Independent AI role review from a technology founder / marketing / UI perspective;
no human founder participation is claimed. Code: openonion/connectonion#2674.
Guide/journal: wu-changxing/connectonion-docs-site#308. No new package or docs
production publication is claimed by this review.

| Priority | User impact and evidence | Improvement and recheck criterion |
| --- | --- | --- |
| P1, fixed | A running App Server and adopted ACTIVE task did not establish timer execution. Two normal-profile windows missed their runs. | Post-adoption Scheduled delivery passed the normal-profile marker/archive/pause control and a guarded desktop-only restart followed by initialization. The production REM scheduled pass completed. Exact timing and account mode remain separate. |
| P1, fixed | An acknowledgement could refer to a later concurrent request; delayed activation could look Stopped. | Bind acknowledgement to the expected snapshot, discover native state independently, and retain attention for pending ACTIVE/account-unknown states. Regression and independent AI recheck passed. |
| P1, fixed | Migration during Scheduled delivery could remove the old clock before storage eligibility was rechecked. | Recheck the same snapshot immediately before teardown. Private fixtures and independent review preserve the old clock for account migration and definition/index changes, retain ACTIVE updates and permit normal PAUSED handover. |
| Compatibility boundary, open | New account storage can replace IDs/remove TOML; the creation route was not reached in live enrollment trials. | Discover known migrated IDs and refuse legacy mutation. Account creation/update/pause/migration/archiving need their own live acceptance (framework issue2678). |
| P2, fixed | A guide reader could infer requested-minute precision from execution and exact rule pairs. | The guide now gives the requested20:35, indexed20:36:33, started20:36:34 example and explicitly limits the claim to execution. |
| P2, capture fixed | The first expanded-phone view needed a settled label/layout recheck. | Current label is complete; summary/paragraph geometry has an8px gap on desktop and phone. |
| P2, capture fixed | Scrolling to page bottom captured footer, not the new conclusion. | Target the actual paragraph. Current phone conclusion spans y96–568 above the floating control; receipt state names the real content. |
| P3, inherited | The existing star can overlap text during other mid-page reading positions. | Current required conclusion is fully readable; a global star redesign is outside this fix. |

The final independent AI recheck closed all three documentation P2 findings,
viewed all ten current wake-prefixed images at original size, and found no new
blocker in that scope. Its earlier source recheck closed the migration-during-open
P1. Local checks:262 scheduling/service/CLI command tests passed with3 existing
warnings;123 help-contract tests passed separately. Fixture checks are not live
account-mode acceptance.

Actual rendered coverage: `/cli/rem` compatibility collapsed and expanded;
`/blog/a-saved-schedule-still-has-to-run` follow-up beginning, cold-control
paragraph and complete conclusion, at1440×1100 and390×844. The full journal and
scheduling guide sources were also read. `wake-receipt.json` records settled
geometry, source/public/HTTP Markdown parity, no root overflow and no page
exceptions. Older screenshots remain historical evidence of earlier rounds.
Final browser captures used installed Chrome in an ephemeral loopback-only
context after shared co browser OIP requests failed; no shared tabs/cookies or
normal Codex profile were changed by the documentation check.

Production webpack build, blog source/build checks, lint (0 errors/155 existing
warnings) and full dependency audit (0 findings) passed. The inherited dev-only
Zod4.4.3 node was updated to4.6.7; parent range and audit gate are unchanged.
Earlier standalone TypeScript and472-page SEO checks also passed; CI checks the
current revision independently.

Not covered: actual native Scheduled/consent UI, live account lifecycle, exact
requested-minute precision, full server/machine restart or sleep/wake recovery,
remote project-history presentation, other viewports, unsampled page positions,
external-link validation and other disclosure/copy/keyboard interactions. The
normal desktop restart control retained the managed server. These are sample
rendered pages and states, not an all-page pass or a human founder review.
