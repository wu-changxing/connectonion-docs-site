# RC22 publication candidate review — 24 October 2026

This is an independent AI technology-founder/marketing/UI role review, not a
human founder review. Framework release PR: openonion/connectonion#2679.
The candidate includes the reviewed docs drafts308and309. Public artifacts,
actual-tag synchronization and production deployment remain separate gates.

| Priority | User impact and evidence | Improvement and recheck criterion |
| --- | --- | --- |
| P2, fixed | A newly single-sourced Email copy block mixed reads, state changes and sends; a second block copied two alternative sends. | Upstream examples separate each action and transfer role. The first copied block contains only reads; each send variant copies exactly one command. Real clipboard readback matches both variants. |
| P2, fixed | Email copy/download lost the preview context shown by the webpage badge. | The upstream raw guide names rc22, stable1.9.2 and release notes; all6guide source/public/HTTP copies match. Real whole-page copy and desktop download equal source bytes and retain the preface. The webpage shows one short badge. |
| P3, capture fixed | A Setup phone capture had a blank badge/copy row while HTML was correct. | Current settled capture visibly shows Preview1.9.3rc22andCopy page. All first-fold captures wait for fonts and a500ms paint settle. |
| Release gate, pending | A candidate preview label must not imply a package exists before publication. | Hold deployment until the immutable-tag workflow publishes/imports/byte-compares PyPI artifacts and creates a GitHub prerelease. Run the real published-tag sync and verify public channels afterwards. |

The independent reviewer inspected the original16images, then rechecked the five
changed images (including the new send-variants view), full Email source, local
production HTML and receipt. Both P2findings and the P3gap were closed. Prior
unchanged coverage stands, for17current images. No remaining UI blocker was
found in that reviewed scope. Source/public parity was independently checked;
HTTP and clipboard/download results are recorder-supplied, not independently
replayed by the reviewer.

Actual current captures: all four onboarding guides on390×844, plus Init on
1440×1080; REM compatibility expanded on both sizes; Email entry on both sizes,
phone budget explanation and separated send variants; release channels and
rc22notes on both sizes, plus phone copied-install state and CLI evidence image.
The short preview badge links the exact rc22notes. Stable remains1.9.2. The
Email page now renders the same guide it exports, replacing the inherited
claims that reads mark messages, see only100recent records, and lack replies.
No email, billing or address action was executed in this documentation check.

`receipt.json` records6/6source/public/HTTP guide parity, no root overflow or
page exceptions, real exact-pin installation copy, read-only Email example copy,
each single-send variant copy, and whole-page Email copy/download. The sitemap
includes the new release and journal; all four release image files return200.
The release evidence caption calls the images terminal transcripts, not native
Codex UI. Canonical links match the actual release URLs.

Validation: webpack production build657pages, blog source/build checks,474emitted
page SEO checks, lint0errors/155existing warnings, and full dependency audit0.
Final native/initialization runtime code passed17326local offline tests with334
skipped;13fresh-installed-wheel checks passed. A final docs-only upstream change
adds the Email boundary;17version-contract checks pass and cloudCIreruns.

Not covered: every page position/viewport, negative clipboard permission states,
all keyboard/disclosure interactions, actual native App UI, remote project-history
presentation, live mail/billing, new account-managed scheduling, exact-minute
execution or full machine/server restart. The desktop-restart evidence includes
automatic REM initialization afterwards. These are sampled rendered pages and
states, not an all-page or broad native startup-recovery pass.

Final browser checks used an ephemeral installed Chrome context for loopback
pages after sharedco browser OIPrequests failed; shared tabs/cookies and the
normal Codex profile were untouched. A supplemental export harness initially
used a wrong Playwright parameter; that attempt was corrected and is not counted
as a pass. The corrected copy/download check completed successfully.
