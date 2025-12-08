import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  const browser = await chromium.launch({ 
    headless: false,  // Відкритий браузер щоб бачити що відбувається
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("📝 Going to login page...");
    await page.goto("https://demo.learnwebdriverio.com/login");

    console.log("📧 Filling email...");
    await page.getByPlaceholder("Email").fill("kante@gmail.com");
    
    console.log("🔑 Filling password...");
    await page.getByPlaceholder("Password").fill("test1234");
    
    console.log("⏎ Pressing Enter...");
    await page.getByPlaceholder("Password").press("Enter");

    console.log("⏳ Waiting for redirect...");
    await page.waitForURL("https://demo.learnwebdriverio.com/", { 
      timeout: 15000 
    });

    console.log("✅ URL changed to home page");
    console.log("Current URL:", page.url());

    // ВАЖЛИВО: Перевіряємо що ми РЕАЛЬНО залогінені
    console.log("🔍 Checking if logged in...");
    
    // Шукаємо елемент який є тільки для залогінених користувачів
    const profileLink = page.locator('a[href*="profile"]').first();
    
    try {
      await profileLink.waitFor({ state: "visible", timeout: 5000 });
      console.log("✅ Profile link found - user is logged in!");
    } catch (error) {
      console.error("❌ Profile link NOT found - login failed!");
      await page.screenshot({ path: "login-failed.png", fullPage: true });
      throw new Error("Login verification failed - user is not logged in");
    }

    // Тільки якщо логін успішний - зберігаємо storageState
    console.log("💾 Saving storage state...");
    await context.storageState({ path: "storageState.json" });
    console.log("✅ Storage state saved successfully");

  } catch (error) {
    console.error("❌ Global setup failed:", error);
    await page.screenshot({ path: "globalSetup-error.png", fullPage: true });
    console.log("Current URL:", page.url());
    throw error;
  } finally {
    await page.waitForTimeout(3000);
    await browser.close();
  }

  console.log("🎉 Global setup completed!");
}

export default globalSetup;