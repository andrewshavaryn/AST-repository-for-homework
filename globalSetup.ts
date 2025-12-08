import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("📝 Logging in...");
  await page.goto("https://demo.learnwebdriverio.com/login");

  // Чекаємо поки сторінка повністю завантажиться
  await page.waitForLoadState("networkidle");

  // Заповнюємо форму
  await page.fill('input[placeholder="Email"]', "kante@gmail.com");
  await page.fill('input[placeholder="Password"]', "test1234");

  // Чекаємо на кнопку і клікаємо з більшим timeout
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.waitFor({ state: "visible", timeout: 10000 });
  await submitButton.click({ timeout: 10000 });

  // Чекаємо на успішний логін
  await page.waitForURL("**/", { timeout: 15000 });
  console.log("✅ Login successful!");

  // Зберігаємо storageState
  await context.storageState({ path: "storageState.json" });
  console.log("💾 Storage state saved to storageState.json");

  await browser.close();
  console.log("🎉 Global setup completed!");
}

export default globalSetup;
