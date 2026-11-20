"""MkDocs hooks for the Coded Motion site.

1. Links like ../docs/x.md work on GitHub (curriculum/, prompts/, checklists/ live at the
   repo root) but on the website those folders sit inside docs/. Rewrite them.
2. Publish the ten HTML demos, and the local CSS/JS they load, so each demo opens at
   /examples/<name>.html. The source files live in examples/html/ and point at
   ../../tokens and ../../library. One level up from /examples/ would leave the
   /coded-motion/ site, so the published copies step up only once (../tokens, ../library).
   CDN script tags are already absolute and are left alone.
"""
import re
from pathlib import Path

from mkdocs.structure.files import File

ROOT = Path(__file__).resolve().parents[1]


def on_page_markdown(markdown, page, config, files):
    if page.file.src_uri.split("/")[0] in ("curriculum", "prompts", "checklists"):
        markdown = re.sub(r"\]\(\.\./docs/", "](../", markdown)
    return markdown


def _published_demo(html: str) -> str:
    html = re.sub(
        r'(href|src)="\.\./\.\./(tokens|library)/',
        r'\1="../\2/',
        html,
    )
    # The source files have no icon. Without this, the browser asks for /favicon.ico
    # and logs a 404 in the console. An empty icon stops that request.
    if 'rel="icon"' not in html:
        html = html.replace("<head>", '<head>\n<link rel="icon" href="data:," />', 1)
    return html


def on_files(files, config):
    html_dir = ROOT / "examples" / "html"
    for path in sorted(html_dir.glob("*.html")):
        files.append(
            File.generated(
                config,
                f"examples/{path.name}",
                content=_published_demo(path.read_text(encoding="utf-8")),
            )
        )

    tokens_css = ROOT / "tokens" / "tokens.css"
    files.append(
        File.generated(config, "tokens/tokens.css", content=tokens_css.read_text(encoding="utf-8"))
    )

    for path in sorted((ROOT / "library" / "gsap").glob("*.js")):
        files.append(
            File.generated(
                config,
                f"library/gsap/{path.name}",
                content=path.read_text(encoding="utf-8"),
            )
        )
    return files
