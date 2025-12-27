
import os
from playwright.sync_api import sync_playwright

def verify_hero_gif():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Get the absolute path to the HTML file
        file_path = f'file://{os.path.abspath("index.html")}'
        page.goto(file_path, wait_until='domcontentloaded')

        # Locate the hero section and take a screenshot
        hero_section = page.locator('#inicio')
        hero_section.screenshot(path='verification/hero_section.png')

        browser.close()

if __name__ == "__main__":
    # Ensure the verification directory exists
    if not os.path.exists('verification'):
        os.makedirs('verification')
    verify_hero_gif()
    print("Screenshot of the hero section has been saved to verification/hero_section.png")
