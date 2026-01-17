import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        file_path = f'file://{os.path.abspath("index.html")}'
        await page.goto(file_path, wait_until='domcontentloaded')

        # Check for console errors
        if console_errors:
            print(f"Console errors found: {console_errors}")
            await browser.close()
            exit(1)

        # Check for navigation menu
        nav_menu = await page.query_selector('.nav-menu-horizontal')
        if not nav_menu:
            print("Navigation menu not found.")
            await browser.close()
            exit(1)

        # Check for video facade
        video_facade = await page.query_selector('#video-facade')
        if not video_facade:
            print("Video facade not found.")
            await browser.close()
            exit(1)

        # Check that chatbot is gone
        chatbot_toggle = await page.query_selector('#chatbot-toggle')
        if chatbot_toggle:
            print("Chatbot toggle button is still present.")
            await browser.close()
            exit(1)

        print("Validation successful: No console errors, and key elements are present. Chatbot is gone.")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
