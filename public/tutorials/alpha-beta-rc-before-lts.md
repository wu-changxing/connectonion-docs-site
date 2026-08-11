# Why Alpha, Beta, and RC Come Before ConnectOnion 1.7 LTS

*August 11, 2026 · Design Decision*

ConnectOnion will keep the 1.6 line stable while the next feature train moves
through `1.7.0aN`, `1.7.0bN`, and `1.7.0rcN` before `1.7.0` becomes stable and
long-term supported.

That sounds like a small naming choice. It is really a promise about who
receives experimental AI-agent behavior, how Python package installers treat
it, and what we are willing to support.

## The question that exposed the problem

We wanted to validate a large set of ACP and coding-agent features before
calling ConnectOnion 1.7 stable. A tempting plan was to ship those experiments
as `1.6.1`, `1.6.2`, and `1.6.3`, then rename the result `1.7.0` after the bugs
were gone.

The numbers would show progress, but they would make the wrong promise.

A patch such as `1.6.2` tells users that it is a compatible maintenance update
for the stable 1.6 line. Normal `pip install --upgrade connectonion` commands
consider that patch. If it contains unfinished 1.7 behavior, stable users become
preview testers without choosing to be.

## The decision

We will run two release lanes at the same time:

```text
1.6.0 ─────→ 1.6.1 ─────→ 1.6.2
stable fixes   stable fixes   stable fixes

       1.7.0a1 → 1.7.0a2 → 1.7.0b1 → 1.7.0rc1 → 1.7.0
       incomplete preview   feature complete   stable / LTS
```

The version is a compatibility promise, not a progress counter.

- `1.6.x` receives backward-compatible bug, security, documentation, and
  compatibility fixes.
- `1.7.0aN` exposes incomplete but usable 1.7 slices to opt-in developers.
- `1.7.0bN` begins only after the planned feature set is complete.
- `1.7.0rcN` accepts release blockers, not planned new features.
- `1.7.0` becomes the stable and long-term-supported release after real
  end-to-end acceptance.
- After that, `1.7.1+` maintains 1.7 while new features move toward 1.8.

## Why this protects existing users

Python packaging already understands this distinction. A normal upgrade stays
on stable releases:

```bash
python -m pip install --upgrade connectonion
```

A developer has to opt into a published preview:

```bash
python -m pip install --pre --upgrade connectonion
```

An exact pin such as `connectonion==1.7.0a1` is also an explicit choice.

The first preview, `1.7.0a1`, was published on August 11, 2026. PyPI and the
[GitHub Prerelease](https://github.com/openonion/connectonion/releases/tag/v1.7.0a1)
carry the same wheel and source archive hashes. The latest stable GitHub Release
remains `1.6.0`, so publishing the alpha did not move normal users onto 1.7.

## What the 1.7 train is validating

The product theme is one complete coding-agent and Agent Client Protocol (ACP)
experience:

- delegate coding work to Claude and Codex;
- track tasks and structured results;
- stop, resume, and recover sessions;
- stream ordered ACP updates and final agent messages;
- approve tools and switch modes without losing session state;
- connect authorized MCP servers;
- keep the Python host, React SDK, and chat UI compatible with the same events.

All changes merged to the release commit will physically ship in the package.
The theme tells users what the release is trying to prove; the release notes
must still disclose every user-visible change.

## How we keep the scope understandable

The [1.7.0 milestone](https://github.com/openonion/connectonion/milestone/7)
contains feature issues and release gates. The
[integration checklist](https://github.com/openonion/connectonion/issues/792)
contains the exact PR inventory, cross-repository dependencies, and the evidence
required to move from alpha to beta, RC, and stable.

We deliberately do not add every implementation PR to the milestone. Counting
both a feature issue and its five implementation PRs makes progress look larger
without making the remaining work clearer.

## Publication is part of the engineering work

A release is not complete when the code merges. The exact artifact must pass the
test and build gates, publish through PyPI Trusted Publishing, install cleanly,
and appear in a GitHub Release. Only then does the documentation site advertise
that exact preview or stable version.

The design journal has a different job from release notes:

- release notes say what changed;
- the design journal records the problem, alternatives, decision, tradeoffs,
  evidence, and what would make us revisit the decision.

From now on, every meaningful feature-train launch, phase promotion, stable
release, or architecture change will create or substantially update a design
journal entry. Small maintenance patches remain in release notes unless they
teach a reusable design lesson. This keeps the journal useful instead of
turning it into duplicate changelog pages.

## The rule we will carry forward

Stable users should never become experiment participants because we wanted a
convenient sequence of numbers. Preview users should know exactly what promise
they are accepting. Maintainers should be able to point to one public record of
why a release was shaped this way.

That is why ConnectOnion 1.7 starts with an alpha, earns its way through beta
and RC, and becomes LTS only after the experience is proven.

## Follow the release

- [Release channels](https://docs.connectonion.com/releases)
- [1.7.0a1 verified artifacts](https://github.com/openonion/connectonion/releases/tag/v1.7.0a1)
- [1.7 roadmap](https://docs.connectonion.com/roadmap)
- [1.7.0 milestone](https://github.com/openonion/connectonion/milestone/7)
- [1.7 integration and release checklist](https://github.com/openonion/connectonion/issues/792)
