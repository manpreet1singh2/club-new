import asyncio
from playwright.async_api import async_playwright
import os

async def capture_mobile_booking():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # iPhone 12 Pro Max viewport
        context = await browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent='Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
        )
        page = await context.new_page()

        # Base URL
        base_url = "http://localhost:3000"

        # Step 1: Schedule
        await page.goto(f"{base_url}/booking/1")
        await page.wait_for_selector("text=Select Date & Time")
        await page.screenshot(path="home/jules/verification/resp_Mobile_booking_step1.png", full_page=True)

        # Move to Step 2
        await page.click("button:has-text('Select Date & Time')")
        await page.wait_for_selector("text=Choose Your Package")
        await page.screenshot(path="home/jules/verification/resp_Mobile_booking_step2.png", full_page=True)

        # Move to Step 3
        await page.click("button:has-text('Confirm Package')")
        await page.wait_for_selector("text=Transport Options")
        await page.screenshot(path="home/jules/verification/resp_Mobile_booking_step3.png", full_page=True)

        # Move to Step 4
        await page.click("button:has-text('Select Transport')")
        await page.wait_for_selector("text=Payment Details")
        await page.screenshot(path="home/jules/verification/resp_Mobile_booking_step4.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    if not os.path.exists("home/jules/verification"):
        os.makedirs("home/jules/verification")
    asyncio.run(capture_mobile_booking())
