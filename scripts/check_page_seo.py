"""seo-gate's second door: would a searcher click this?

The deterministic check proves the tags exist; this judges whether they
earn the click. A title like "CLI" or a description that restates the
title fails. A good title carries the query someone would actually type;
a good description answers it with something concrete.

Usage: python3 scripts/check_page_seo.py <built-html-path>...
"""

import re
import sys
from pathlib import Path

from connectonion import llm_do

RUBRIC = (
    "You are the SEO quality gate for a developer docs site "
    "(docs.connectonion.com, a Python AI-agent framework). Judge ONLY the "
    "<title> and meta description below. Pass when the title carries a query "
    "a developer would actually type into a search engine, and the "
    "description answers that query with something concrete (a command, a "
    "capability, a number) rather than restating the title or listing vague "
    "marketing adjectives. Titles up to ~65 characters are fine. "
    "Reply with exactly one line:\n"
    "  SEO_OK: <what earns the click, one clause>\n"
    "or\n"
    "  SEO_FIX: <the single biggest fix, one sentence, concrete>\n"
)


def main() -> int:
    failed = False
    for name in sys.argv[1:]:
        path = Path(name)
        if not path.is_file():
            continue
        head = path.read_text(errors="replace").split("</head>")[0]
        title = re.search(r"<title[^>]*>([^<]*)</title>", head)
        desc = re.search(r'<meta name="description" content="([^"]*)"', head)
        if not title or not desc:
            continue  # the deterministic gate already failed this page
        verdict = llm_do(
            f"{RUBRIC}\n---\nPage: {name}\nTitle: {title.group(1)}\n"
            f"Description: {desc.group(1)}",
            model="co/gemini-3.7-flash",
        ).strip()
        print(f"{name}: {verdict}")
        if not verdict.startswith("SEO_OK"):
            fix = verdict.split(":", 1)[-1].strip()
            print(
                "::error::The page's title/description would not earn a "
                f"click from search. Model's one fix: {fix}"
            )
            failed = True
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
