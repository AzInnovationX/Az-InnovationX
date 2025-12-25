
import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Get the absolute path to the HTML file
        file_path = f'file://{os.path.abspath("index.html")}'

        # Desktop screenshot
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto(file_path, wait_until='domcontentloaded')
        page.locator('.video-container').screenshot(path='verification/desktop_video.png')

        # Mobile screenshot
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto(file_path, wait_until='domcontentloaded')

        # Close the mobile menu
        if page.locator('.mobile-menu.active').is_visible():
            page.locator('.mobile-menu').click()

        page.locator('.video-container').screenshot(path='verification/mobile_video.png')

        browser.close()

if __name__ == "__main__":
    run()
