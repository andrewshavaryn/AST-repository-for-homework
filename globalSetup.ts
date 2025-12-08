import { chromium, FullConfig } from "@playwright/test";
import * as fs from "fs";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  const storageStatePath = "storageState.json";

  // Завжди видаляємо старий файл
  if (fs.existsSync(storageStatePath)) {
    console.log("Removing old storageState.json");
    fs.unlinkSync(storageStatePath);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("Going to login page...");
    await page.goto("https://demo.learnwebdriverio.com/login");

    console.log("Filling email...");
    await page.getByPlaceholder("Email").fill("kante@gmail.com");

    console.log("Filling password...");
    await page.getByPlaceholder("Password").fill("test1234");

    console.log("Pressing Enter...");
    await page.getByPlaceholder("Password").press("Enter");

    console.log("Waiting for redirect...");
    await page.waitForURL((url) => !url.pathname.includes("/login"), {
      timeout: 15000,
    });

    console.log("Redirected to home page");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    console.log("🔍 Verifying login...");
    const newArticleLink = page.locator('a[href="/editor"]');
    await newArticleLink.waitFor({ state: "visible", timeout: 5000 });
    console.log("'New Article' button found!");

    console.log("💾 Saving storage state...");
    await context.storageState({ path: storageStatePath });

    // Перевіряємо що файл створився
    if (fs.existsSync(storageStatePath)) {
      const size = fs.statSync(storageStatePath).size;
      console.log(`Storage state saved (${size} bytes)`);
    } else {
      throw new Error("Failed to create storageState.json!");
    }
  } catch (error) {
    console.error("Global setup failed:", error);
    await page.screenshot({ path: "globalSetup-error.png" });
    throw error;
  } finally {
    await browser.close();
  }

  console.log("Global setup completed!");
}

export default globalSetup;
