#!/usr/bin/env python3
"""Copy the pages that come from the framework, at one release tag.

    python scripts/sync-from-release.py --framework ../connectonion v1.8.9b14

The CLI pages, the co wiki help, and the release notes on this site are copies
of files in the framework repo. They were copied once and never again, so by
1.8.9b14 the site told people `co wiki open` opens a page it no longer opens,
had no word on `co browser import`, and named a default model two releases
old (openonion/connectonion#1868). Run this after every release, from the tag
PyPI published, never from main: main carries features nobody can install yet.

What it copies, from the tag:
- docs/cli/<name>.md -> public/cli/<name>.md, for every page this site already
  publishes (a new framework page is listed, not published: some are internal)
- connectonion/cli/commands/wiki_help.md -> public/cli/wiki-help.md when the
  tag still contains it, keeping this site's own introduction above the first
  `## ` heading. New REM previews no longer ship this stable-channel file.
- docs/releases/<version>.md and its assets/v<version>/ for 1.8.8 and later,
  when the site does not have that version yet. A note already here is kept:
  once published, a note is edited for the site (image links, "## Install
  after publication" becomes "## Install"), and a re-sync must not undo that.
- docs/releases.md -> public/releases.md
- PREVIEW_VERSION in lib/version.ts, when the tag is a preview

It prints every file it changed. Commit what it changed; nothing else is touched.
"""

import argparse
import io
import re
import subprocess
import sys
import tarfile
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OLDEST = (1, 8, 8)


def version_key(name: str):
    match = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)(?:(a|b|rc)(\d+))?", name)
    return tuple(int(x) for x in match.group(1, 2, 3)) if match else None


def files_at(framework: Path, tag: str) -> dict:
    """{path: bytes} for the paths this script copies, as they are at `tag`."""
    paths = ["docs/cli", "docs/releases", "docs/releases.md"]
    wiki_help = "connectonion/cli/commands/wiki_help.md"
    if subprocess.run(
        ["git", "-C", str(framework), "cat-file", "-e", f"{tag}:{wiki_help}"],
        capture_output=True,
    ).returncode == 0:
        paths.append(wiki_help)
    archive = subprocess.run(
        ["git", "-C", str(framework), "archive", tag, *paths], capture_output=True, check=True).stdout
    with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
        return {m.name: tar.extractfile(m).read() for m in tar.getmembers() if m.isfile()}


def write(path: Path, data: bytes, changed: list) -> None:
    if path.exists() and path.read_bytes() == data:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    changed.append(str(path.relative_to(SITE)))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("tag", help="a published release tag, e.g. v1.8.9b14")
    parser.add_argument("--framework", type=Path, required=True, help="a checkout of openonion/connectonion")
    args = parser.parse_args()
    src = files_at(args.framework, args.tag)
    changed, unpublished = [], []

    for path, data in src.items():
        if path.startswith("docs/cli/") and path.count("/") == 2 and path.endswith(".md"):
            target = SITE / "public/cli" / Path(path).name
            if target.exists():
                write(target, data, changed)
            else:
                unpublished.append(path)

    wiki_help = src.get("connectonion/cli/commands/wiki_help.md")
    if wiki_help:
        help_page = SITE / "public/cli/wiki-help.md"
        body = wiki_help.decode()
        site_intro = help_page.read_text().split("\n## ", 1)[0]
        write(help_page, (site_intro + "\n## " + body.split("\n## ", 1)[1]).encode(), changed)

    # Notes first, so a new version's assets follow its note in.
    added = set()
    for path, data in sorted(src.items(), key=lambda item: not item[0].endswith(".md")):
        rel = path.removeprefix("docs/releases/")
        if path == rel:
            continue
        version = rel.removesuffix(".md") if "/" not in rel else rel.split("/")[1].removeprefix("v")
        key = version_key(version)
        note = SITE / "public/releases" / f"{version}.md"
        if not key or key < OLDEST or (note.exists() and f"{version}.md" not in added):
            continue
        if rel.endswith(".md"):
            data = data.replace(b"## Install after publication", b"## Install")
            added.add(rel)
        write(SITE / "public/releases" / rel, data, changed)
    write(SITE / "public/releases.md", src["docs/releases.md"], changed)

    version = args.tag.removeprefix("v")
    if re.search(r"(a|b|rc)\d+$", version):
        ts = SITE / "lib/version.ts"
        text = ts.read_text()
        updated = re.sub(r"(PREVIEW_VERSION: string \| null = )'[^']*'", rf"\g<1>'{version}'", text)
        write(ts, updated.encode(), changed)

    print(f"{len(changed)} file(s) changed from {args.tag}:")
    for path in changed:
        print("  " + path)
    if unpublished:
        print("Framework CLI pages this site does not publish (add one to public/cli/ to publish it):")
        for path in sorted(unpublished):
            print("  " + path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
