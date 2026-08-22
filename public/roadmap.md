# Roadmap

ConnectOnion keeps stable maintenance separate from the next feature train.
Current stable is 1.6.12. The exact 1.7 candidate being stabilized is 1.7.0b9,
while the latest opt-in feature preview is 1.8.0a1. Normal pip installs never
select either prerelease without explicit opt-in.
See [Release Channels](/releases) for installation and version meanings.

## 1.7 stable gates

1. One authenticated OIP browser connection and one React state owner.
2. Native Codex and Claude Code adapters with exact provider resume.
3. Running, completed, failed, expanded, and mobile coding-tool cards.
4. Published-wheel installation and real `co ai` browser acceptance.
5. Alpha, beta, release-candidate, then stable promotion based on evidence.
6. Reader-before-writer old/new and rollback checks over Direct and Relay.

The 1.7 candidate is promoted unchanged from RC to stable only after every gate
passes. Afterward, 1.7.x carries maintenance fixes; new remote-browser and
hosted-execution feature work continues in 1.8 previews.

## Longer-term work

- secure agent-to-agent networking and relay transport;
- production deployment, health monitoring, and environment management;
- stronger interactive debugging and time-travel inspection;
- Microsoft OAuth and additional managed integrations;
- documentation and tutorial expansion.
