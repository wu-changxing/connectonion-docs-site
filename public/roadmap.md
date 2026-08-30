# Roadmap

ConnectOnion keeps stable maintenance separate from the next feature train.
Current stable is 1.7.1 and the latest published opt-in feature preview is
1.8.0a3. The next candidate is 1.8.0a4; it is not published yet.
Normal pip installs never select the preview without explicit opt-in.
See [Release Channels](/releases) for installation and version meanings.

## 1.7 maintenance contract

1. One authenticated OIP browser connection and one React state owner.
2. Native Codex and Claude Code adapters with exact provider resume.
3. Running, completed, failed, expanded, and mobile coding-tool cards.
4. Published-wheel installation and real `co ai` browser acceptance.
5. Alpha, beta, release-candidate, then stable promotion based on evidence.
6. Reader-before-writer old/new and rollback checks over Direct and Relay.

The accepted RC12 product source became 1.7.0, and 1.7.1 carries its first
maintenance fixes. Applicable stable fixes must be forward-ported into the
active 1.8 line before a newer preview can publish.

## Pending 1.8.0a4 browser candidate

1. Free system browser remains the no-argument default.
2. Explicit `auto` may select paid Onion after preflight; explicit `onion`
   requires it without fallback.
3. Paid runtime price is `$0.025 / 15 min`; artifact checking costs `$0`.
4. Preview API, signed manifest, exact Onionwright wheel, catalogue, and runtime
   channel fail closed before download, execution, or charging.
5. The public artifact target is Chromium 151 on Linux x86_64. macOS signing
   and notarization remain internal work.
6. Promotion waits for exact PyPI/GitHub prerelease bytes, isolated preview API
   deployment, and installed-artifact browser and billing reconciliation.

The candidate keeps the synchronous `BrowserAutomation` API while moving its
implementation onto one internal async runtime. See
[Preview Is Not a Production Alias](/blog/preview-is-not-a-production-alias)
for the trust-boundary decision.

## Longer-term work

- public signed/notarized Onion Browser support beyond Linux x86_64;
- secure agent-to-agent networking and relay transport;
- production deployment, health monitoring, and environment management;
- stronger interactive debugging and time-travel inspection;
- Microsoft OAuth and additional managed integrations;
- documentation and tutorial expansion.
