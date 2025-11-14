import { test, expect, Page } from "@playwright/test";

test("test", async ({ page }) => {
  const elementsToFind = [
    "Article-22-1762948558717",
    "Test Article 2 Test_1763093832568",
  ];

  await page.goto("https://demo.learnwebdriverio.com/");

  let isVisible = false;

  for (const elementToFind of elementsToFind) {
    for (let i = 1; i <= 6; i++) {
      if (isVisible) {
        break;
      }

      await page
        .locator(`[data-test="page-link-${i}"]`)
        .getByRole("link", { name: `${i}` })
        .click();

      try {
        await expect(
          page.getByRole("link", { name: elementToFind })
        ).toBeVisible({ timeout: 500 });

        isVisible = true;
      } catch (e) {}
    }
  }

  expect(isVisible, "").toBeTruthy();
});