import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  // Створюємо браузер
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Логінимось на сайті
  console.log("📝 Logging in...");
  await page.goto("https://demo.learnwebdriverio.com/login");

  // Заповнюємо форму логіну
  await page.fill('input[placeholder="Email"]', "kante@gmail.com");
  await page.fill('input[placeholder="Password"]', "test1234");
  await page.click('button[type="submit"]');

  // Чекаємо на успішний логін (редирект на головну)
  await page.waitForURL("**/", { timeout: 10000 });
  console.log("✅ Login successful!");

  // Зберігаємо storageState в файл
  await context.storageState({ path: "storageState.json" });
  console.log("💾 Storage state saved to storageState.json");

  // Закриваємо браузер
  await browser.close();
  console.log("🎉 Global setup completed!");
}

export default globalSetup;