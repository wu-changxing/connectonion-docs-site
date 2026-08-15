# Roadmap

ConnectOnion keeps stable maintenance separate from the next feature train.
The current public stable version is 1.6.9. The opt-in preview is 1.7.0a2, and
normal pip installs never select it unless the user explicitly opts in.
See [Release Channels](/releases) for installation and version meanings.

## Stable: 1.6

The 1.6 line receives backward-compatible bug, security, documentation,
packaging, and compatibility fixes. It does not receive planned 1.7 features.

## In validation: 1.7.0

- Completed coding-agent delegation and structured resume contracts
- ACP lifecycle, ordered streaming, cancellation, and persistent resume
- ACP approvals and session mode authority
- Authorized stdio MCP and official SDK conformance are complete
- Native authenticated browser ACP, fail-closed transport discovery, bounded
  session/attachment storage, and payment onboarding are merged
- `@connectonion/react@0.4.2-alpha.2` owns the browser protocol state and O Chat
  pins and exercises that exact artifact
- Relay encryption, the beta conformance matrix, docs/security release gates,
  and remaining real editor/provider smoke remain
- Alpha → beta → RC → stable/LTS; ACP is not a 1.7.1 feature release

See the live [1.7 milestone](https://github.com/openonion/connectonion/milestone/7)
and [release checklist #792](https://github.com/openonion/connectonion/issues/792).

## Next feature train: 1.8.0

- Async, concurrent browser execution
- Encrypted and revocable browser login-session capture
- Remote session injection with explicit revocation
- Verified free/licensed browser-engine selection
- Authenticated hosted Agent sessions with per-user isolation and Safe mode

A public webpage never launches a local process directly. Hosted web Agents run
in isolated server-owned environments and stream events back to the browser.

## Contributing

Want to contribute? Check [open issues](https://github.com/openonion/connectonion/issues) or join our [Discord](https://discord.gg/4xfD9k8AUF).
