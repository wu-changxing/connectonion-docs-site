# a21 release-page review — 2026-10-03

An independent AI reviewer took the perspective of a technology founder with
marketing and UI experience. No human founder participated. The review used
the actual locally rendered docs site at 1440px and 375px. The package and
public release were not available at the initial external check, so this is a
review of the local preview, not publication approval.

Final screenshots: [release page desktop](releases-desktop.png),
[release page phone](releases-phone.png), [a21 notes phone](notes-phone.png),
and [archive phone](archive-phone.png).

| Priority | Problem and user impact | Rendered evidence | Fix and final recheck |
| --- | --- | --- | --- |
| P1 | Preview-note and archive links opened raw Markdown, making phone content hard to scan and Markdown links noninteractive. | The first 1440px and 375px clicks reached `text/markdown` pages with literal syntax. | Added styled `/releases/[slug]` pages while keeping explicitly labelled Markdown source links. Rechecked a21 notes, archive, policy and an in-archive release link at both widths; all rendered as HTML with working links. |
| P2 | The exact preview version split within its token on a 375px phone, making the opt-in command hard to read. | The first phone render broke after `1.9.0a2`; the clipboard text itself was correct. | Placed the copy control below the command on phones. The final pin uses one visual line; both stable and preview copy controls return the exact full commands and show Copied feedback. |
| P2 | The a21 note gave the 1,193-address count without its 730-day scan window. | Compared the rendered note with the package release note. | Added the scan window next to the count and kept the distinction between raw addresses and confirmed people. |
| P2 | The first styled route nested a second main landmark, and its install code clipped on phones. | First styled render had two `main` elements; the a21 snippet had 510px scroll width in a 341px box. | The route now uses the shell's one main landmark. Shell continuation and code wrapping keep the pin visible; final 375px checks found no overflowing code blocks across the a21 note and archive. |
| P3 | The phone documentation menu did not announce open/closed state. | Initial button had no `aria-expanded`. | Final 44×44px toggle reports `false → true → false` and points to its drawer with `aria-controls`. |

The final review inspected `/releases`, `/releases/1.9.0a21` and
`/releases/archive` at both widths: initial and full-page layouts, stable and
preview cards, both clipboard actions, disclosure open/closed, phone menu
open/closed, notes/archive/policy navigation, sampled archive links, sources,
and page/code-block overflow. No browser page errors or page-level horizontal
overflow appeared in those flows. The stable recommendation and opt-in preview
remained distinct. The review did not inspect every historical release, a
keyboard-only or screen-reader session, other browsers, or widths below 375px.

After that visual review, the PR SEO gate found a P1 discovery gap: all 64
rendered release-note and archive routes were absent from the sitemap. This
could keep the new readable pages out of search results. We added those routes
to the generated sitemap; a fresh production build, `check-seo.mjs` over the
release routes (64 pages), and `test:blog:build` now pass. This CI finding was
not part of the independent visual review.

The gate then found a P2 content gap: the notes had generic search descriptions
that said only to read a version's changes. A reader searching for a specific
fix or capability could not tell which result mattered. Descriptions now draw
from each version's actual note. The built a21, 1.8.10, 1.8.9b1 and unpublished
1.8.8b10 examples were checked for distinct, accurate wording. The model gate
accepted 51 descriptions and identified 13 that still led with release-process
history or ended mid-sentence. Those 13 now use short, source-checked feature
summaries from their corresponding notes; the 64-page structural check passes.
The next model pass accepted 62 pages and identified only two truncated
descriptions; their summaries now name the actual owner-page mapping and REM
investigation fixes. Recheck: the PR's model-based SEO gate must accept all 64
descriptions. This finding also came from CI after the visual review.

**Publication gate:** verify the exact a21 PyPI package, GitHub release and
linked package-side review evidence after they are public, then check the
pinned installation in a clean environment before deploying this docs update.

## Live post-release review

An independent AI reviewer in the same founder role inspected the published
`/releases`, `/releases/1.9.0a21` and `/releases/archive` at 1440px and 375px,
including the stable and preview cards, copy actions, menu and disclosure
states, navigation and source links. The release workflow verified the pinned
wheel in a clean environment. Unauthenticated HTTP requests confirmed the
PyPI version page, GitHub release and linked review evidence each return 200.

| Priority | Live finding and user impact | Evidence | Follow-up and recheck criterion |
| --- | --- | --- | --- |
| P2 | A first-time evaluator could install a21 and run `co rem open` without ever building memory. | The published a21 note showed `co rem open` after the pin, while the package README puts `co rem init` before it. | Split first-time and existing-notebook next actions; link setup and name `co rem init` before open. Recheck a new visitor can find that order on phone and desktop. |
| P2 | The linked setup page understated a21's investigation allowance and suggested scheduling on every OS. | Its copy said roughly 20% of a week, and its terminal sequence ended with `co rem start`; the package default is 35 points with a 90% weekly-use stop, and scheduling raises a macOS-only error elsewhere. | Show the a21 default, separate macOS scheduling from manual `co rem sync` on Linux and Windows. Recheck the setup block and prose at both widths before a visitor runs the commands. |
| P3 | Earlier-release links were small phone tap targets. | Four links on the live 375px release page measured about 20px high. | Give each link a 44px minimum height. Recheck all four targets have room to tap without crowding or horizontal overflow. |

This live review sampled the listed pages and states; it did not inspect every
historical note, a keyboard-only or screen-reader session, other browsers or
widths below 375px. An AI took the founder role; no human founder participated.
