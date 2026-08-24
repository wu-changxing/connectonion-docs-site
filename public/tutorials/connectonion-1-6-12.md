# Your Servers, Your Regions, Your Shared Mailboxes

ConnectOnion 1.6.12 lets operators choose where a server is provisioned,
share one email address without handing over a private key, download Outlook
attachments safely, and keep scheduled model work bounded on a broken network.

## What changed

- `co server new prod --region asia-southeast1` chooses the provisioning region.
- `co email share <address> --with <account> --can send` grants scoped send access;
  `co email unshare` revokes it.
- `co outlook download <email> --to ./invoices` preserves duplicate filenames,
  stays inside its permitted directory, and skips inline signature images unless
  `--include-inline` is explicit.
- Every LLM provider client carries explicit connect, read, and retry bounds.
- Release notes retain permanent reviewed visual evidence when behavior is visible.

## One fix, every newer line

A stable patch and a feature train do not inherit each other automatically.
Applicable fixes from 1.6.12 are forward-ported into the stabilising 1.7 line
and `main`/1.8 with focused tests. The 1.6.12 version bump and release-only
metadata are not copied forward.

After 1.7 Stable is verified, its release branch is merged back into `main`.
This keeps every supported newer line at least as fixed as Stable without
letting an old version number overwrite a newer feature train.

## Upgrade Stable

```bash
pip install --upgrade connectonion
```

See the [release channels](https://docs.connectonion.com/releases) before
installing an opt-in preview.
