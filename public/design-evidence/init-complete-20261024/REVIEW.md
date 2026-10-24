# Initialization completion review — 24 October 2026

This is an independent AI role review using a technology founder's marketing
and UI perspective. No human founder participation is claimed. Source issue:
openonion/connectonion#2675; source PR: openonion/connectonion#2677.

| Priority | User impact and evidence | Improvement and recheck criterion |
| --- | --- | --- |
| P1, fixed | Raw Markdown omitted the unreleased boundary, so an agent could attribute proposed behavior to stable. | All four exports begin with the same unreleased notice and issue URL. Source/public/HTTP bytes match 4/4; rendered pages show one status badge. |
| P2, fixed | Setup/skills exports drifted from the source's env-selector and metadata-preservation rules. | Copy the current guides verbatim; the independent parity recheck passes all four. |
| P2, fixed | See Also routes led to missing pages; headings did not populate section navigation. | Converted links return HTTP 200 and the index anchor exists. All section headings expose navigation classes; real phone section jumping reaches recovery below the sticky header. |
| P2, fixed | Long commands were hard to copy on a phone; adjacent examples looked like a sequence. | Each of 28 rendered code blocks has a copy control, and setup alternatives are separate. A trusted click plus clipboard read equals the complete command. |
| P2, fixed | Publishing wording could imply nothing leaves the machine. | The guide distinguishes local setup, profile announcement and deployment. Review the complete guide's publication section. |
| P3, fixed | The journal inherited unrelated browser/permissions categories. | Explicit CLI/onboarding/skills frontmatter is included; rebuilt desktop/phone journal renders are rechecked. |
| P3, capture timing | A bottom screenshot still highlighted Quick Start during scroll notification. | After a 600 ms settle, Skills highlights How it composes and Setup highlights Authentication and recovery. Screenshots were retaken after the actual scroll. |

The independent reviewer read all four complete guides and the journal, checked
the complete served HTML and Markdown, and inspected all fourteen final images
at original resolution. All original P1/P2 findings were closed. The two P3
follow-ups above are recorded separately from that completed review.

Actual rendered coverage: `/cli/{init,setup,create,skills}` at 1440×1080 and
390×844 first fold; Setup and Skills desktop bottoms; Setup phone recovery
section and expanded navigation; the initialization journal's desktop and phone
entry. All eight guide layouts fit the viewport width. The recorder also tested
real command/page clipboard readback, a real desktop Markdown download, section
jumping and phone menu open/close. `receipt.json` records these checks; the
reviewer did not independently replay those interactions.

Shared `co browser` rejected OIP requests during the final round. Final captures
used the installed Chrome in an ephemeral headless context for loopback docs
only; existing shared tabs, cookies and the normal Codex profile were untouched.
This is not a native Codex UI review. Uncaptured middle sections, other viewport
sizes, live authentication and Windows filesystem behavior remain outside this
visual scope. Sample coverage is not an all-page pass.

Production webpack build, blog source/build checks and all four export parity
checks passed. Lint had zero errors and 155 existing warnings. The full
dependency audit had zero findings after the inherited dev-only Zod node was
updated from 4.4.3 to 4.6.7 without changing the parent range or audit gate.
The guides remain explicitly unreleased; no package or deployment is claimed.
