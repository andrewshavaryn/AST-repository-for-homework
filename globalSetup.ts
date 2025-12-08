import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  const browser = await chromium.launch({ headless: true });
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

    console.log("✅ Redirected to home page");

    // Перевіряємо що користувач залогінений — шукаємо кнопку "New Article"
    console.log("🔍 Verifying login...");
    const newArticleLink = page.locator('a[href="/editor"]');
    await newArticleLink.waitFor({ state: "visible", timeout: 10000 });
    console.log("✅ 'New Article' button found - user is logged in!");

    // Зберігаємо storageState
    console.log("💾 Saving storage state...");
    await context.storageState({ path: "storageState.json" });
    console.log("✅ Storage state saved to storageState.json");

  } catch (error) {
    console.error("❌ Global setup failed:", error);
    await page.screenshot({ path: "globalSetup-error.png", fullPage: true });
    console.log("Current URL:", page.url());
    throw error;
  } finally {
    await browser.close();
  }

  console.log("🎉 Global setup completed!");
}

export default globalSetup;