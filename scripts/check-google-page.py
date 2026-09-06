"""Verify the local Google docs page with an isolated browser, never real auth."""
from pathlib import Path
from playwright.sync_api import sync_playwright

shots = Path('/tmp/frontend-test-screenshots')
shots.mkdir(parents=True, exist_ok=True)
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, channel='chrome')
    for width in (390, 768, 1440):
        page = browser.new_page(viewport={'width': width, 'height': 900})
        response = page.goto('http://127.0.0.1:3218/google-integration', wait_until='networkidle')
        assert response.status == 200
        assert page.get_by_role('heading', name='One local Google login').count() == 1
        assert page.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')
        for target in ('/cli/gcalendar.md', '/cli/youtube.md', '/integrations/google.md'):
            assert page.request.get('http://127.0.0.1:3218' + target).status == 200
        page.screenshot(path=str(shots / f'google-docs-{width}.png'), full_page=True)
        print(f'{width}px: heading, links and no horizontal overflow passed')
        page.close()
    browser.close()
