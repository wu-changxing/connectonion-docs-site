# Release Channels

ConnectOnion keeps the current stable line separate from the next feature
train. Preview releases are opt-in and do not replace the version normal users
receive from pip.

**Current channels:** stable is `1.6.4`; the opt-in preview is `1.7.0a2`.

## Version meanings

| Version | Meaning |
|---|---|
| `1.6.4` | Current stable 1.6 maintenance release |
| `1.7.0a2` | Current incomplete, opt-in 1.7 alpha |
| `1.7.0b1` | Feature-complete 1.7 beta |
| `1.7.0rc1` | Candidate that may become stable unchanged |
| `1.7.0` | Stable/LTS 1.7 release |
| `1.7.1` | Maintenance fix after stable 1.7 |

Patch numbers are not progress toward the next feature version. New 1.7
features are tested as `1.7.0aN`, `1.7.0bN`, and `1.7.0rcN`.

## Install stable

```bash
python -m pip install --upgrade connectonion
```

This remains on stable even after an alpha, beta, or RC is published.

## Join the preview track

```bash
python -m pip install --pre --upgrade connectonion
```

The `--pre` flag is the explicit opt-in. If no preview exists yet, pip simply
keeps the newest stable release.

For reproducible testing, install the current exact candidate. Exact pins do
not need `--pre`:

```bash
python -m pip install connectonion==1.7.0a2
```

## The 1.7 train

The first preview added audience-scoped HTTP routes, expanded ACP support,
Telegram messaging, safer attachment handling, and tighter account-safety
boundaries. The second delivers the first end-to-end native browser ACP slice:
an authenticated `/acp` WebSocket selected through explicit, fail-closed
discovery; a caller-bound virtual workspace and private, bounded session and
attachment storage; verified payment onboarding; and the shared permission,
cancellation, mode, thought, plan, tool, reconnect, and resume lifecycle.

`@connectonion/react@0.4.2-alpha.2` owns the browser protocol state and O Chat
pins that exact reviewed artifact. The retired standalone TypeScript SDK is not
on the release path. Direct loopback or TLS/WSS is preview scope; this release
does not claim end-to-end encryption through an untrusted relay. It remains
opt-in while the complete 1.7 experience is exercised end to end.

Local stdio ACP acceptance can use `co ai --acp --state-dir PATH` to isolate
mutable session snapshots, logs, and evals without moving identity,
configuration, skills, credentials, the workspace, or provider tools. Turn
logs and evaluation evidence now measure the current user-input boundary rather
than double-counting earlier activity from the cumulative conversation. Stdio
and authenticated WebSocket Host entry points also reject coerced or
out-of-range raw `protocolVersion` values before SDK routing while preserving
normal negotiation for valid integers.

The second alpha candidate also includes the bounded downward `acp_agent`
adapter used by `co ai` to delegate one turn through ACP to exact-version
Claude Code, Codex, and Gemini children. Process commands, approval policy, and
workspace roots remain operator-owned; child thoughts and plans do not replace
the outer session's canonical state. Claude Code and Codex pass real resume and
exact `co ai` handoff tests. Pinned Codex ACP is Full-Access-only because its
read-only mode cannot reliably gate shell or outbound network work; the native
`codex` tool remains the approval-aware route. Pinned Gemini is one-turn and
requires API-key, Vertex, or enterprise Code Assist authentication because
individual OAuth service has been retired.

- Alpha: ACP and coding-agent capabilities arrive in usable slices.
- Beta: the feature set is complete; integration and compatibility are tested.
- RC: only release blockers change.
- 1.7.0: stable/LTS release.

ACP is part of 1.7.0, not a separate 1.7.1 feature release. After 1.7.0,
maintenance uses 1.7.1 and later patches while new remote-browser work advances
toward 1.8.0 previews.

The live [1.7 milestone](https://github.com/openonion/connectonion/milestone/7)
tracks feature scope. [Issue #792](https://github.com/openonion/connectonion/issues/792)
tracks the exact PR inventory and alpha/beta/RC/stable gates.

Preview GitHub Releases are marked Prerelease automatically. Only stable
releases are marked Latest.

## Why We Publish a Design Journal

Release notes record what changed. A Design Journal post records the problem,
alternatives, decision, tradeoffs, evidence, and the condition that would make
us revisit it. Meaningful feature-train launches, the first beta and RC, stable
releases, and material architecture or workflow decisions receive a new or
substantially updated post.

Maintenance-only patches stay in release history unless they contain a reusable
design lesson. Drafts may be prepared with the candidate, but the public post
must not claim that a version is available until PyPI and its GitHub Release are
visible.

Read the decision behind the current train:
[Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS](/blog/alpha-beta-rc-before-lts).
