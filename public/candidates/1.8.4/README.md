# 1.8.4 candidate guide

This is an unreleased implementation candidate. Stable remains 1.8.3. These guides
do not provide an install pin for an unpublished package or a working hosting URL.

- [Global env selection and migration](cli/environment.md): cwd never selects `.env`;
  inherited process settings remain explicit, and provider records stay together.
- [Initialization](cli/init.md): plain `co init` initializes global configuration.
- [Project creation](cli/create.md): project scaffolding remains an explicit action.
- [Gmail](cli/gmail.md): frozen listing IDs, mailbox actions, bounded downloads,
  exact-content draft review and uncertain-send recovery.
- [Drive](cli/gdrive.md): account-bound listings and managed draft links.
- [Synology](cli/synology.md): 20 command leaves, profiles/TLS, inspection sources,
  safe transfers and durable operation IDs. Real NAS acceptance is still required.
- [Control Center](network/control-center.md): immutable apps, runtime review,
  parent-owned conversation actions, history/rollback and internal update schedules.

Local validation includes coordinated Core/React/O Chat/API tests, an installed
Core wheel and nine production-build browser scenarios. A tiny synthetic app also
passed the real reviewer subprocess. Live Gmail writes, real NAS operations, and
deployed static hosting remain separate acceptance steps.

Mail scheduling, Personal Wiki, Sync Knowledge, TikTok and new messaging adapters
are outside the confirmed implementation scope. See the
[release tracker](https://github.com/openonion/connectonion/issues/1445).
