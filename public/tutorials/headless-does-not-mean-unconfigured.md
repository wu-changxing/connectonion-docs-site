# Headless does not mean unconfigured

A 1.6 cron job upgraded to 1.7 RC11 and stopped at its first `co browser
status`. Auto wanted a live approval; launchd had no dialog; the operator's
standing command grant was ignored.

Headless Auto now honors operator-configured `Bash(...)` permissions for
ordinary commands. The broad historical `Bash(co *)` compatibility entry is
accepted only for `co status` and `co browser ...`; it does not silently grant
deployment, publication, email, account, server, or payment authority.

The exact no-IO path, a permitted command chain, and denied `co deploy`, `co
publish`, and `co email send` paths are covered together. Unknown, destructive,
credential, network, and external-effect calls continue to fail closed.
