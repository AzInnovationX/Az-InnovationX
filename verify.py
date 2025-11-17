
import asyncio
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Go to the page and wait for the DOM to be loaded
        await page.goto("file:///app/index.html", wait_until="domcontentloaded")

        # Wait for the welcome modal to disappear
        welcome_modal = page.locator("#welcome-modal")
        await expect(welcome_modal).to_be_hidden(timeout=10000)

        # Take a screenshot to verify the page loaded correctly
        await page.screenshot(path="screenshot_load.png")

        # Disable the animation on the chatbot toggle button to make it stable
        chatbot_toggle = page.locator("#chatbot-toggle")
        await chatbot_toggle.evaluate("element => element.style.animation = 'none'")

        # Click the chatbot toggle button
        await chatbot_toggle.click()

        # Click the expand button
        await page.click("#chatbot-expand-toggle")

        # Verify the chatbot is expanded and take a screenshot
        await expect(page.locator("#chatbot-window.expanded")).to_be_visible()
        await page.screenshot(path="screenshot_chatbot.png")

        # Close the chatbot
        await page.click("#chatbot-close-btn")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
