#!/usr/bin/env python3
"""Generate a public, invented REM reader from an exact framework release.

    python3 scripts/generate-rem-sample.py \
      --framework ../connectonion --tag v1.9.0a13 --date 2026-10-02

The output is a frozen, self-contained HTML snapshot. This command refuses a
checkout whose package or fixture differs from the named tag, and replaces
local paths before publishing it. Never point it at a personal notebook.
"""

import argparse
import os
import re
import subprocess
import sys
import tempfile
from datetime import date, datetime, timezone
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OUTPUT = SITE / "public" / "rem" / "sample-reader.html"


def run_git(framework: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["git", "-C", str(framework), *args], capture_output=True, text=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--framework", type=Path, required=True)
    parser.add_argument("--tag", required=True)
    parser.add_argument("--date", type=date.fromisoformat, required=True, help="Frozen invented notebook date, YYYY-MM-DD")
    args = parser.parse_args()
    framework = args.framework.resolve()

    tag = run_git(framework, "rev-parse", "--verify", f"{args.tag}^{{commit}}")
    if tag.returncode:
        parser.error(f"release tag {args.tag!r} does not exist in {framework}")
    diff = run_git(framework, "diff", "--quiet", args.tag, "--", "connectonion", "tests/fixtures/rem_reader_notebook.py")
    if diff.returncode:
        parser.error("the framework package or invented fixture differs from the release tag; use a clean checkout of that tag")

    real_home = str(Path.home())
    os.environ["HOME"] = "/sample-owner"
    os.environ["CODEX_HOME"] = "/sample-owner/.codex"
    os.environ["CLAUDE_CONFIG_DIR"] = "/sample-owner/.claude"
    sys.path.insert(0, str(framework))
    sys.path.insert(0, str(framework / "tests" / "fixtures"))
    from connectonion.rem.reader import render  # pylint: disable=import-outside-toplevel
    from rem_reader_notebook import build  # pylint: disable=import-outside-toplevel

    with tempfile.TemporaryDirectory(prefix="rem-sample-") as tmp:
        root = build(Path(tmp) / "rem", now=datetime(args.date.year, args.date.month, args.date.day, tzinfo=timezone.utc))
        html = render(root)
        html = html.replace("<head>", '<head>\n<meta name="robots" content="noindex, nofollow">', 1)
        html = html.replace(str(root), "/sample-notebook")
        html = html.replace("/sample-owner/", "~/").replace("/sample-owner", "~")
        # The fixture contains an illustrative completed pass but has no actual
        # consent or scheduler. Explain that combination in the public sample.
        html = html.replace(
            "Not started — run `co rem start` to authorize sources and begin",
            "Sample notebook — illustrative pass; no schedule is active",
        )
        forbidden = (real_home, tmp, "/var/folders/", "Bearer ")
        if any(token and token in html for token in forbidden) or re.search(r"\bsk-[A-Za-z0-9]{20,}\b", html):
            raise RuntimeError("rendered sample contains a local path or credential-shaped string")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(html, encoding="utf-8")
    print(f"{OUTPUT.relative_to(SITE)}: {OUTPUT.stat().st_size:,} bytes from {args.tag} ({tag.stdout.strip()[:12]})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
