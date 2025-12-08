import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("📝 Going to login page...");
    await page.goto("https://demo.learnwebdriverio.com/login");

    console.log("⏳ Waiting for form...");
    await page.waitForSelector('form', { timeout: 10000 });

    console.log("📧 Filling email...");
    // Пробуємо різні способи заповнення
    const emailInput = page.locator('input[type="email"]');
    await emailInput.waitFor({ state: "visible", timeout: 5000 });
    await emailInput.fill("kante@gmail.com");

    console.log("🔑 Filling password...");
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.waitFor({ state: "visible", timeout: 5000 });
    await passwordInput.fill("test1234");

    console.log("📸 Taking screenshot before submit...");
    await page.screenshot({ path: "before-submit.png" });

    // СПРОБУЄМО БЕЗ КЛІКУ - просто натиснемо Enter
    console.log("⏎ Pressing Enter...");
    await passwordInput.press("Enter");

    console.log("⏳ Waiting for navigation...");
    await page.waitForNavigation({ timeout: 15000 });
    
    console.log("✅ Current URL:", page.url());

    // Перевіряємо чи ми на головній
    if (page.url().includes("/login")) {
      throw new Error("Still on login page - login failed!");
    }

    console.log("✅ Login successful!");

    await context.storageState({ path: "storageState.json" });
    console.log("💾 Storage state saved");

  } catch (error) {
    console.error("❌ Error:", error);
    await page.screenshot({ path: "globalSetup-error.png" });
    console.log("Current URL:", page.url());
    
    // Виводимо HTML щоб побачити структуру
    const html = await page.content();
    console.log("Page HTML:", html.substring(0, 500));
    
    throw error;
  } finally {
    await page.waitForTimeout(5000);
    await browser.close();
  }

  console.log("🎉 Global setup completed!");
}

export default globalSetup;