import { test, expect } from "@playwright/test";

test(
  "DEMOQA-0001 User can submit the form with valid data",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Positive cases for submit the form",
    },
  },

  async ({ page }) => {
    await page.goto("/text-box");

    await expect(page.locator("//*[@id='userName']")).toBeVisible();
    await page.locator("//*[@id='userName']").fill("Andrew");

    await expect(page.locator("//*[@id='userEmail']")).toBeVisible();
    await page.locator("//*[@id='userEmail']").fill("andrewtest@gmail.com");

    await expect(page.locator("//*[@id='currentAddress']")).toBeVisible();
    await page.locator("//*[@id='currentAddress']").fill("Paradise City");

    await expect(page.locator("//*[@id='permanentAddress']")).toBeVisible();
    await page.locator("//*[@id='permanentAddress']").fill("Unvgvar, Ukraine");

    await page.locator("//*[@id='submit']").click();
    await expect(page.locator("//div[@id='output']")).toBeVisible();
  }
);



test(
  "DEMOQA-0002",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Checkboxes functionality",
    },
  },

  async ({ page }) => {
  await page.goto("/checkbox");
  await page.getByRole('button', { name: 'Expand all' }).click();
  await page.locator('label').filter({ hasText: 'Home' }).getByRole('img').first().click();
  await expect(page.locator('#result')).toBeVisible();
});