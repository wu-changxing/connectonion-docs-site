# REM native scheduling follow-up review

Independent AI role review from a technology founder / marketing / UI perspective;
no human founder participation is claimed. Code: openonion/connectonion#2674.
Guide and journal: wu-changxing/connectonion-docs-site#308. Both remain drafts.

## Findings and rechecks

| Priority | User impact and evidence | Improvement / recheck |
| --- | --- | --- |
| Release blocker | Two normal-desktop trials registered ACTIVE but produced no timed execution in their six-minute windows. | Keep the release blocked; complete an unlocked, visible-main-window comparison. A subsequent locked-console observation is a condition to test, not an established cause. |
| P1, fixed | A concurrent ACTIVE definition could acknowledge a pending PAUSED operation and disable its worker. | Bind the wait to the requested definition/version and native snapshot. The concurrent-activation regression must error while leaving the worker enabled. |
| P1, fixed | A delayed first activation without a worker record could be displayed as Stopped. | Discover the native task independently of worker provider. The delayed-adoption regression must show attention. |
| P1, fixed | A stopped native worker with a new, unacknowledged ACTIVE request could still display Stopped. | The reactivation-phase test and twelve provider/intent/observation combinations require attention for pending/active/account-unknown states. Confirmed PAUSED still displays Stopped. |
| Compatibility blocker | Account migration can remove the legacy file and replace its ID. Only cached account state is currently available to this adapter. | Discover a known legacy association and refuse legacy mutation or a second timer. This is a guard, not verified account-mode creation/pause support. |
| P2, clarified | The first journal wording could imply visibility was the only timer-start gate. | State that a timer-start fallback also exists and keep visibility as an untested condition. The final rendered paragraph uses that qualification. |
| P2, baseline, nonblocking | The existing floating star can overlap a line during mid-page phone reading. | No global component change. In `journal-phone-tail-readable.png`, the complete final paragraph is visible at y275–684, above the fixed control at y780–828. Temporary overlap remains a minor reading nuisance. |

Final code review found no remaining P0/P1 in its limited scope. Local targeted
regression finished with 257 passed and three existing deprecation warnings.
These tests are not a native execution acceptance pass.

## Actual rendered coverage

- `/cli/rem`: 1440×1100 compatibility expanded; 390×844 expanded and collapsed.
  Both summaries had distinct rectangles; document width equaled viewport width.
- Existing journal `/blog/a-saved-schedule-still-has-to-run`: desktop follow-up
  heading through account-registration discussion; phone follow-up opening;
  phone visibility / acceptance tail and the complete tail after scrolling.
- Screenshots are the PNGs alongside this record. The final qualifier was
  rebuilt, rendered again, and read against the source.

Production build, blog source checks and blog build/discovery checks passed.
Lint reported zero errors and 155 existing warnings. Production dependency
audit reported no vulnerabilities; this is not a blanket development audit.

Not covered: native Scheduled UI or desktop accessibility, unlocked control,
account creation/migration/update/pause, restart/sync persistence, account-task
archiving, remote project history, lower guide sections, copy/link/keyboard
interactions, or the page-review disclosure expanded. Screenshots are sample
coverage and do not constitute an all-page pass.
