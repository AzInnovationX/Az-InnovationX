
import asyncio
import os
from playwright.async_api import async_playwright

async def main():
    # Create the verification directory if it doesn't exist
    if not os.path.exists("verification"):
        os.makedirs("verification")

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the index.html file
        file_path = f"file://{os.path.abspath('index.html')}"

        resolutions = {
            "mobile": {"width": 400, "height": 800},
            "desktop": {"width": 1920, "height": 1080}
        }

        for name, resolution in resolutions.items():
            await page.set_viewport_size(resolution)
            await page.goto(file_path, wait_until="domcontentloaded")

            # Wait for the hero section to be visible
            hero_selector = ".hero-content"
            await page.wait_for_selector(hero_selector)

            # Take a screenshot of the hero section
            screenshot_path = f"verification/{name}_hero_section.png"
            await page.locator(hero_selector).screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
