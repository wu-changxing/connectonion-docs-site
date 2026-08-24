# Release channels

ConnectOnion keeps normal stable installs separate from opt-in release work.
More than one feature train can be public at once: 1.7 is stabilizing while
new 1.8 work remains available as the highest preview.

**Current channels:** stable is `1.6.12`; the exact candidate being stabilized
for 1.7 is `1.7.0rc11`; the latest opt-in preview is `1.8.0a1`. RC11 becomes
installable only after its reviewed tag publishes; stable and 1.8 remain public.

## Version meanings

| Version | Meaning |
|---|---|
| `1.6.12` | Current stable 1.6 maintenance release |
| `1.7.0rc11` | Exact 1.7 candidate that may become stable unchanged after acceptance |
| `1.7.0` | Stable/LTS 1.7 release |
| `1.7.1` | Maintenance fix after stable 1.7 |
| `1.8.0a1` | Latest incomplete, opt-in feature preview |

Patch numbers are not progress toward the next feature version. Alpha, beta,
and RC suffixes describe confidence in one feature train.

## Install stable

```bash
python -m pip install --upgrade connectonion
```

This remains on stable even after an alpha, beta, or RC is published.

## Test the stabilizing 1.7 candidate

Use the exact pin. This is the reproducible command for the 1.7 release gates:

```bash
python -m pip install --upgrade connectonion==1.7.0rc11
co --version
```

Do not replace that command with a broad `--pre` upgrade. Package resolution
chooses the highest published version, so `--pre` currently follows 1.8 rather
than the stabilizing 1.7 line.

## Join the latest preview track

```bash
python -m pip install --pre --upgrade connectonion
```

The `--pre` flag is an explicit opt-in to the latest feature train. For a
reproducible 1.8 test, use an exact pin:

```bash
python -m pip install connectonion==1.8.0a1
```

## How a candidate earns promotion

Each release gate starts from the exact published package, launches its real
`co ai` Host, and connects the production O Chat build through a real browser.
The acceptance flow exercises a deterministic catalog search and attachment
download through `co browser`, C, C++, and Rust projects, native Codex
delegation, permission modes, cancellation, Host restart, and reconnect
without resending the last prompt.

The run produces screenshots, sanitized logs, and a hash-addressed manifest.
UI text alone cannot mark the gate as passed: process state, workspace output,
reconnect state, and the absence of a duplicate input are checked independently.
A failed gate stays failed and feeds the next issue and PR.

Backend promotion also collects the complete mocked `oo-api` test tree.
Integration and live-provider cases stay explicit, but a new billing or API
contract test cannot sit outside CI just because it was added in a separate
test module.

## Stabilizing 1.7.0rc11

The 1.7 product path uses OIP across Core, `@connectonion/react`, and O Chat.
The beta has passed the protected Python 3.10–3.13 matrix, native Windows
browser transport, Windows and macOS installed-wheel E2E, trusted publishing,
and independent public-byte verification.

The public 1.7.0b4 gate exposed one difference between hosted and headless Auto:
without a dialog channel, an outside-workspace write could skip the classifier.
Beta 5 applied the deterministic boundary in both paths. Its exact public wheel
passed a denied outside Auto write, left the target absent, and then completed
the same outside read and write plus Todo lifecycle under explicit bounded Full
access. Beta 10 was the final published beta. Its exact Core package and
O Chat build at `3eb9bbb` passed localhost first-run invite authentication, real
browser/C/C++/Rust work, native Codex delegation, Full access, Read only, Auto,
Stop, Host restart, Reconnect, conversation/composer checks, and independent
desktop/tablet/mobile UI review. RC1 synchronizes the Work Room client/composer
correction, the normalized managed-usage reader, and the expanded deterministic
browser gate. None of those changes count as accepted merely because RC1 exists:
the exact installed RC must repeat real browser catalog search and attachment
download plus the complete acceptance window before stable promotion, as recorded in
[issue #792](https://github.com/openonion/connectonion/issues/792).

Work Room is the remote client for that native provider session, not a status
panel. Attributed user/provider messages and the provider-targeted composer stay
visible through running, approval, Stop, reconnect, and terminal states. A state
that cannot accept input disables the composer and explains why; it does not
delete the conversation controls.

Installed RC1 review also found that outer COAI permission was visible while
the opened Work Room lacked its provider-native selector, so RC1 cannot promote
unchanged. RC2 retains the outer mode as the Host ceiling, exposes
revision-bound Codex and Claude Code native choices inside Work Room, waits for
Host acknowledgement, and separately confirms elevated profiles. Its paired
React reader is `0.4.3-rc.0`; O Chat `88ba1a362ce299942268275785b628dfe2cd96e9`
passed final-head desktop, tablet, mobile, and continuous invite/mode/Control
Center evidence before deployment.

RC3 lets an authenticated invited owner change its own Work Room provider
profile within the outer Host ceiling. It remains a synchronization and testing
candidate, not stable approval: the exact RC3 gate exposed
[issue #1222](https://github.com/openonion/connectonion/issues/1222), where an
already-open Codex Work Room did not receive the provider downgrade revision
after the outer mode changed from Full access to Auto. That authority defect
must be fixed and the exact installed-artifact gate repeated before promotion.

RC4 contains that provider downgrade correction together with the bounded
follow-up fixes found by the repeated gate: native Auto mapping for Claude Code,
optional hosted working directories, and coalesced transactional session
snapshots so long provider runs cannot hide the next approval or terminal
composer behind superseded state. The accepted pre-publication candidate passed
fresh invite onboarding, real browser work, strict C11/C++20/Rust, native Codex
and Claude Code, provider follow-up, Stop, reconnect, and manual review of 22
hashed desktop, tablet, and mobile screenshots. Publication and the final
unchanged-candidate window remain controlled by
[issue #792](https://github.com/openonion/connectonion/issues/792).

The repeated RC4 native Stop gate then found a narrower authority-ordering
defect. A stopped continuation may omit an unchanged permission catalog; the
next outer Full Access to Auto transaction could first stream a repair under
the old ceiling and only then stream the final downgrade. RC5 commits the new
outer mode before reconciling provider permissions, so each affected Work Room
receives one observable permission result at the final ceiling. Its coordinated
O Chat client keeps the latest Host-verified selector and composer visible in
terminal Work Rooms, but replaces that fallback immediately when the Host sends
a newer narrowed snapshot. RC4 cannot promote unchanged; the complete public
RC5 native-provider, browser, compiled-language, reconnect, responsive UI, and
manual design-review gate had to pass first.

That exact RC5 run reached real Codex Stop and found a different state-boundary
bug. The isolated provider-only continuation copied the outer `full-access`
name without the positive `turns_left` value that makes the bounded grant
valid. Canonical validation safely showed Auto in the browser, while the
durable Host and provider ceiling still retained Full Access. RC6 copies the
complete Host-validated mode tuple into direct Codex and Claude Code turns. It
does not renew or consume the outer grant, and malformed Full Access still
fails closed. RC5 cannot promote unchanged; the complete exact public RC6 gate
must prove that Stop preserves the real outer state until an acknowledged Auto
transaction immediately narrows provider authority.

The exact RC6 gate passed browser search/download, strict C/C++/Rust work,
native Codex, provider Stop, permission changes, and responsive layouts. Native
Claude Code then completed its scoped project and returned success, but the
parent model supplied no user-facing final text. The provider work was real;
the outer conversation still lacked a valid terminal answer and never restored
its composer. RC7 makes one bounded recovery call asking only for a conclusion
grounded in recorded tool results. A second empty response fails explicitly
instead of fabricating success or emitting an unusable empty outcome. RC6
cannot promote unchanged; RC7 must repeat the complete parent and Work Room
journey from the exact public artifact.

The RC7 journey then exposed a measurement error at the browser boundary.
Repeated state queries and cleanup looked as though they were queued behind a
stuck daemon, but an absent-daemon `co browser status` still took 40.82 seconds:
the client was importing Agent, Playwright, the terminal UI, and provider
integrations before it ever reached the socket. RC8 keeps direct browser RPCs
on a lightweight transport path and loads the full schema only for help,
natural-language `do`, and the long-lived daemon. The same cold status check
takes 2.91 seconds; an isolated real-browser smoke completes warm page-state
queries and per-tab cleanup in 4.50 and 4.44 seconds. RC7 cannot promote
unchanged; the exact public RC8 bytes must repeat the complete browser, native
provider, compiled-language, reconnect, permission, and responsive UI gate.
Whole-browser graceful teardown latency is separately bounded by the owned-PID
cleanup and tracked for the 1.7.1 reliability patch.

RC8's exact public journey completed browser search and download, strict
C/C++/Rust work, Codex permission and Stop flows, and a real Claude Code
project. Claude returned successfully, but the following parent-model
settlement call never returned, so the Work Room remained stopped without a
composer. RC9 bounds post-Codex and post-Claude settlement calls to 90 seconds,
abandons late results, and makes one concise retry grounded only in the recorded
provider result. If that retry also times out, the turn now fails explicitly.
RC8 cannot promote unchanged; the exact public RC9 bytes must repeat the full
end-to-end gate before stable promotion.

The RC9 installed-wheel gate refined that failure after Claude Code completed
its real C11 project: the parent received the provider result, then opened a
new outer tool chain and stranded the Workroom composer beyond the release
timeout. RC10 makes native-provider completion a terminal settlement boundary.
The parent may return only a concise final response grounded in the recorded
provider result; one attempted non-provider tool batch is discarded and
retried once, while a repeated attempt fails explicitly so Host can publish a
terminal outcome. The exact pre-publication candidate restored the composer
and passed fresh invite onboarding, real Co-browser search/download, strict
C11/C++20/Rust, native Codex and Claude Code projects, both provider-scoped Stop
controls, Codex permission ceilings, voice recovery, outer Stop, reconnect,
responsive layout, and review of 28 hashed screenshots with O Chat
`aa435040be6166dd946afff9cee63b59cfb68057`. RC9 cannot promote unchanged; the
exact public RC10 bytes must repeat this complete journey before Stable is
considered.

The release-line audit before that promotion found a different class of gap:
RC10 did not contain every applicable fix already published in 1.6.12. RC11
forwards server-region selection, scoped mailbox sharing, explicit provider
network bounds, Outlook inline-signature filtering, the AI implementation
contract, template-first delivery guidance, and durable release evidence while
leaving 1.6 version metadata behind. Main/1.8 receives the missing subset too.
RC11 is therefore a new candidate, not an unchanged RC10 promotion. Its exact
public bytes must repeat the complete installed-artifact gate before Stable.

Real Codex and Claude provider smokes, upgrade and
rollback coverage, backend reconciliation, release protection, and the full
release-candidate acceptance window must all close before stable promotion.
Historical-secret alerts have been cleared. Stable 1.7.0 follows only after an
exercised RC can ship unchanged.

## Design journal policy

Release notes record what changed. A Design Journal post records the problem,
alternatives, decision, tradeoffs, evidence, and the condition that would make
us revisit it. Meaningful feature launches, phase promotions, stable releases,
and material architecture decisions receive a public entry only after the
claimed PyPI package and GitHub Release are visible.

For the OIP boundary and remote-client UI contract, see
[The Work Room Is a Client, Not a Status Panel](/blog/workroom-is-a-view).
