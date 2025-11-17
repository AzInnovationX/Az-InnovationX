
import re
from playwright.sync_api import Page, expect
import os

def test_homepage(page: Page):
    # 1. Navigate to the local index.html file.
    page.goto(f"file://{os.getcwd()}/index.html")

    # 2. Check that the initial page load is clean.
    # The white screen with symbols was caused by a script tag in the wrong place.
    # The fix moved it. A simple check for the body tag being present is enough.
    expect(page.locator("body")).to_be_visible()

    # Check for unexpected characters ('n') at the start of the body, which was a symptom of the original problem.
    body_content = page.inner_html('body')
    assert not body_content.strip().startswith('n'), "Stray 'n' characters found at the beginning of the body."


    # 3. Disable animation on chatbot toggle and then click it.
    chatbot_toggle = page.locator("#chatbot-toggle")
    chatbot_toggle.evaluate("element => element.style.animation = 'none'")
    chatbot_toggle.click()
    expect(page.locator("#chatbot-window")).to_be_visible()

    # 4. Click the expand button on the chatbot.
    page.locator("#chatbot-expand-toggle").click()
    chatbot_window = page.locator("#chatbot-window")
    expect(chatbot_window).to_have_class(re.compile(r'expanded'))

    # 5. Take a screenshot of the expanded chatbot to visually verify it fits within the viewport.
    page.screenshot(path="verifications/chatbot_expanded.png")

    # 6. Check the dimensions of the expanded chatbot window to ensure they are within the expected limits.
    viewport_size = page.viewport_size
    chatbot_box = chatbot_window.bounding_box()

    assert chatbot_box['width'] <= viewport_size['width'] * 0.95, "Chatbot width exceeds 95% of viewport width"
    assert chatbot_box['height'] <= viewport_size['height'] * 0.95, "Chatbot height exceeds 95% of viewport height"
    assert chatbot_box['x'] >= 0, "Chatbot is off-screen horizontally (left)"
    assert chatbot_box['y'] >= 0, "Chatbot is off-screen vertically (top)"
    assert (chatbot_box['x'] + chatbot_box['width']) <= viewport_size['width'], "Chatbot is off-screen horizontally (right)"
    assert (chatbot_box['y'] + chatbot_box['height']) <= viewport_size['height'], "Chatbot is off-screen vertically (bottom)"

    # 7. Close the chatbot and ensure the page returns to its normal state.
    page.locator("#chatbot-close-btn").click()
    expect(page.locator("#chatbot-window")).not_to_be_visible()
