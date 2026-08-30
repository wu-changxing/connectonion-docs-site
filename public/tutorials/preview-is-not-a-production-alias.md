# Preview is not a production alias

ConnectOnion 1.8.0a4 is a pending browser-preview candidate, not a published
package. This note records the boundary it must prove before publication.

The first cross-repository test gave a preview client the ordinary `OO_API_URL`
setting. The package version and wheel were preview-labelled, but the request
followed that ambient setting back to the production control plane. Its
checksum could still be correct while the API choosing the artifact, creating
the metered session, and signing runtime policy was the wrong authority.

## Alternatives we rejected

We could have treated the preview version string as enough. That would prove
which Python package ran, not which service chose executable bytes or charged
the account.

We could also have reused production API and storage with a preview query or
header. That keeps deployment simpler, but a missing flag silently becomes
production traffic and makes rollback, billing evidence, and catalogue state
share one blast radius.

The candidate instead carries channel identity through every trust boundary.

## The decision

The preview client calls only the dedicated browser-preview API. It accepts an
Ed25519-signed manifest whose own channel is `preview`, installs the exact
Onionwright preview wheel by checksum, resolves the matching browser catalogue,
and checks the runtime channel before browser preparation or billing begins.

The general `OO_API_URL` override is ignored. Tests have a separate override
that accepts only loopback origins; remote credentials, paths, queries,
fragments, malformed ports, and other hosts fail closed.

Engine choice is explicit too. A bare `co browser` or `BrowserAutomation()`
uses the free system engine and returns before the paid preview path. Explicit
`auto` may select Onion after non-billing preflight. Explicit `onion` requires
it and never silently falls back. Artifact checks cost `$0`; a paid session
costs `$0.025 / 15 min`, and status names that price and the live session.

System and Onion engines keep separate profiles. Blocking Service Workers
improves request visibility, but it is best-effort and is not the security
boundary. The paid runtime is bounded by a loopback-authenticated egress
gateway and native preflight.

## Evidence and current limitations

Focused preview, version, security, package, and cross-repository tests prove
the client-side failure order. They do not prove a hosted release. The exact
1.8.0a4 wheel must still pass the isolated preview API, catalogue, browser
create/navigation/download/renewal/close flow, and billing reconciliation after
the package and GitHub prerelease exist.

The first public Onion artifact target is Chromium 151 on Linux x86_64. macOS
signing and notarization remain internal and are not part of the candidate's
public support claim.

This separation costs an extra API deployment, bucket/catalogue lifecycle, and
cross-repository release coordinate. We would revisit it only if one service
can provide cryptographically scoped channel authority, isolated billing and
rollback, and a missing channel can no longer degrade into production. Until
then, a different version string is evidence, not a trust boundary.

See [Release Channels](/releases), [co browser](/cli/browser-command), and
[BrowserAutomation](/useful-tools/browser-tools) for the prepared candidate
interface. Those pages keep 1.8.0a3 as the latest published preview until the
1.8.0a4 artifacts and acceptance evidence are public.
