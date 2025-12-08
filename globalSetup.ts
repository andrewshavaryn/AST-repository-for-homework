import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global setup...");

  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000, // Уповільнюємо на 1 секунду між діями
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log("📝 Navigating to login page...");
    await page.goto("https://demo.learnwebdriverio.com/login", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    console.log("⏳ Waiting for page to be ready...");
    await page.waitForLoadState("networkidle", { timeout: 10000 });

    // Додаткова пауза
    await page.waitForTimeout(2000);

    console.log("🔍 Looking for email field...");
    const emailField = page.getByPlaceholder("Email");
    await emailField.waitFor({ state: "visible", timeout: 10000 });

    console.log("📧 Typing email...");
    await emailField.click(); // Клікаємо перед заповненням
    await emailField.fill("kante@gmail.com");

    // Перевіряємо що заповнилось
    const emailValue = await emailField.inputValue();
    console.log("Email value:", emailValue);

    console.log("🔍 Looking for password field...");
    const passwordField = page.getByPlaceholder("Password");
    await passwordField.waitFor({ state: "visible", timeout: 10000 });

    console.log("🔑 Typing password...");
    await passwordField.click();
    await passwordField.fill("test1234");

    // Перевіряємо що заповнилось
    const passwordValue = await passwordField.inputValue();
    console.log("Password length:", passwordValue.length);

    console.log("📸 Taking screenshot before submit...");
    await page.screenshot({ path: "before-submit.png", fullPage: true });

    console.log("🔍 Looking for Sign in button...");
    const signInButton = page.getByRole("button", { name: "Sign in" });
    await signInButton.waitFor({ state: "visible", timeout: 10000 });

    // Перевіряємо що кнопка enabled
    const isEnabled = await signInButton.isEnabled();
    console.log("Button is enabled:", isEnabled);

    console.log("🖱️ Clicking Sign in button...");
    await signInButton.click();

    console.log("⏳ Waiting for navigation...");
    await page.waitForURL((url) => !url.pathname.includes("/login"), {
      timeout: 20000,
    });

    console.log("✅ Login successful!");
    console.log("Current URL:", page.url());

    console.log("💾 Saving storage state...");
    await context.storageState({ path: "storageState.json" });
    console.log("✅ Storage state saved!");
  } catch (error) {
    console.error("❌ Error:", error);
    await page.screenshot({ path: "error.png", fullPage: true });
    console.log("Current URL:", page.url());
    console.log("Page title:", await page.title());
    throw error;
  } finally {
    await page.waitForTimeout(3000);
    await browser.close();
  }

  console.log("🎉 Global setup completed!");
}

export default globalSetup;
