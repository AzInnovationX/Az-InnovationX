import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Set a mobile viewport
        page.set_viewport_size({"width": 375, "height": 667})

        # Load the local HTML file
        file_path = f'file://{os.path.abspath("index.html")}'
        page.goto(file_path, wait_until='domcontentloaded')

        # Take a screenshot of the video facade element
        element = page.locator('#video-facade')
        os.makedirs("verification", exist_ok=True)
        element.screenshot(path='verification/hero-mobile-view.png')

        browser.close()

if __name__ == "__main__":
    run()
