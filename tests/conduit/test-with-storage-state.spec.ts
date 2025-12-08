import { test, expect } from "@playwright/test";

test.describe("Tests with Storage State", () => {
  
  test("Should be logged in automatically", async ({ page }) => {
    // Переходимо на головну сторінку
    await page.goto("/");

    // Перевіряємо що ми залогінені (є кнопкаProfile або інший індикатор)
    const profileLink = page.locator('a[href*="profile"]').first();
    await expect(profileLink).toBeVisible();

    console.log("✅ User is logged in via storage state!");
  });

  test("Can access protected page without login", async ({ page }) => {
    // Переходимо на сторінку створення статті (потребує авторизації)
    await page.goto("/editor");

    // Перевіряємо що ми на сторінці editor (не редиректнуло на login)
    await expect(page).toHaveURL(/.*editor.*/);
    
    console.log("✅ Can access protected pages!");
  });

  test("Can create new article", async ({ page }) => {
    await page.goto("/editor");

    // Заповнюємо форму
    await page.fill('input[placeholder="Article Title"]', "Test Article via Storage State");
    await page.fill('input[placeholder="What\'s this article about?"]', "Testing automation");
    await page.fill('textarea[placeholder="Write your article (in markdown)"]', "This is a test article");
    await page.fill('input[placeholder="Enter tags"]', "test");

    // Публікуємо
    await page.click('button:has-text("Publish Article")');

    // Перевіряємо що стаття створена
    await expect(page.locator('h1')).toContainText("Test Article via Storage State");
    
    console.log("✅ Article created successfully!");
  });
});