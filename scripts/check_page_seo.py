"""seo-gate's second door: would a searcher click this?

The deterministic check proves the tags exist; this judges whether they
earn the click. A title like "CLI" or a description that restates the
title fails. A good title carries the query someone would actually type;
a good description answers it with something concrete.

Usage: python3 scripts/check_page_seo.py <built-html-path>...
"""

import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
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
    "Judge the presence of searchable technical terms, not whether a title "
    "is phrased as a question, imperative, or declarative sentence. Product "
    "and API names are valid search terms when the description explains the "
    "capability. A concrete mechanism or capability is sufficient; do not "
    "require a command, code snippet, or metric in every description. "
    "Reply with exactly one line:\n"
    "  SEO_OK: <what earns the click, one clause>\n"
    "or\n"
    "  SEO_FIX: <the single biggest fix, one sentence, concrete>\n"
)


def review_page(name: str) -> tuple[str, str]:
    path = Path(name)
    head = path.read_text(errors="replace").split("</head>")[0]
    title = re.search(r"<title[^>]*>([^<]*)</title>", head)
    desc = re.search(r'<meta name="description" content="([^"]*)"', head)
    if not title or not desc:
        return name, "SEO_FIX: Missing title or description"
    verdict = llm_do(
        f"{RUBRIC}\n---\nPage: {name}\nTitle: {title.group(1)}\n"
        f"Description: {desc.group(1)}",
        model="co/gemini-3.7-flash",
    ).strip()
    return name, verdict


def main() -> int:
    failed = False
    # Each page is independent; bound concurrency to avoid serial full-site runs.
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = {
            executor.submit(review_page, name): name
            for name in dict.fromkeys(sys.argv[1:])
        }
        for future in as_completed(futures):
            name = futures[future]
            try:
                _, verdict = future.result()
            except Exception as exc:
                verdict = f"SEO_FIX: Review failed ({type(exc).__name__})"
            print(f"{name}: {verdict}", flush=True)
            if not verdict.startswith("SEO_OK"):
                print(f"::error::{name}: {verdict}", flush=True)
                failed = True
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
