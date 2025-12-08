import { test, expect } from "@playwright/test";

test("StorageState-0001- Can create new article", async ({ page }) => {
  await page.goto("/editor");

  // Заповнюємо форму
  await page.fill(
    'input[placeholder="Article Title"]',
    "Test Article via Storage State"
  );
  await page.fill(
    'input[placeholder="What\'s this article about?"]',
    "Testing automation"
  );
  await page.fill(
    'textarea[placeholder="Write your article (in markdown)"]',
    "This is a test article"
  );
  await page.fill('input[placeholder="Enter tags"]', "test");

  // Публікуємо (доступно тільки залогіненому)
  await page.click('button:has-text("Publish Article")');

  // Перевіряємо що стаття створена
  await expect(page.locator("h1")).toContainText(
    "Test Article via Storage State"
  );

  console.log("Article created successfully!");
});
