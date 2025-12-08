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

    console.log("⏳ Waiting for page load...");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(2000);

    console.log("📧 Filling email...");
    // Використовуємо getByPlaceholder або getByLabel
    await page.getByPlaceholder("Email").fill("kante@gmail.com");

    console.log("🔑 Filling password...");
    await page.getByPlaceholder("Password").fill("test1234");

    console.log("📸 Screenshot before submit...");
    await page.screenshot({ path: "before-submit.png", fullPage: true });

    // Пробуємо знайти кнопку Sign in або Submit
    console.log("🔍 Looking for button...");
    
    // Спробуємо getByRole
    const signInButton = page.getByRole("button", { name: /sign in/i });
    
    const buttonExists = await signInButton.count();
    console.log("Button count:", buttonExists);

    if (buttonExists > 0) {
      console.log("👆 Clicking Sign In button...");
      await signInButton.click();
    } else {
      console.log("⏎ Button not found, pressing Enter...");
      await page.getByPlaceholder("Password").press("Enter");
    }

    console.log("⏳ Waiting for URL change...");
    await page.waitForURL((url) => !url.pathname.includes("/login"), { 
      timeout: 15000 
    });
    
    console.log("✅ Login successful! URL:", page.url());

    await context.storageState({ path: "storageState.json" });
    console.log("💾 Storage state saved");

  } catch (error) {
    console.error("❌ Error:", error);
    await page.screenshot({ path: "error-screenshot.png", fullPage: true });
    console.log("Current URL:", page.url());
    throw error;
  } finally {
    await page.waitForTimeout(3000);
    await browser.close();
  }

  console.log("🎉 Global setup completed!");
}

export default globalSetup;