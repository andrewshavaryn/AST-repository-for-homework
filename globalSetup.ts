import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("Starting global setup...");

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Going to login page...");
    await page.goto("https://demo.learnwebdriverio.com/login", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log("⏳ Waiting for page to load...");
    await page.waitForTimeout(2000);

    await page.screenshot({ path: "debug-1-before-fill.png" });

    console.log("📧 Filling email...");
    await page.fill('input[placeholder="Email"]', "kante@gmail.com");

    console.log("🔑 Filling password...");
    await page.fill('input[placeholder="Password"]', "test1234");

    await page.screenshot({ path: "debug-2-after-fill.png" });

    console.log("Looking for submit button...");

    const submitButton = page.locator('button[type="submit"]');
    const isVisible = await submitButton.isVisible();
    console.log("Button visible:", isVisible);

    if (isVisible) {
      console.log("Clicking submit button...");
      await submitButton.click();
    } else {
      console.log("Button not visible, trying Enter key...");
      await page.press('input[placeholder="Password"]', "Enter");
    }

    await page.screenshot({ path: "debug-3-after-click.png" });

    console.log("⏳ Waiting for redirect...");
    await page.waitForURL("https://demo.learnwebdriverio.com/", {
      timeout: 15000,
    });

    console.log("✅ Login successful!");

    await context.storageState({ path: "storageState.json" });
    console.log("Storage state saved");
  } catch (error) {
    const err = error as Error;
    console.error("Error:", err.message);
    await page.screenshot({ path: "globalSetup-error.png" });

    console.log("Current URL:", page.url());

    throw error;
  } finally {
    await page.waitForTimeout(3000);
    await browser.close();
  }

  console.log("Global setup completed!");
}

export default globalSetup;
