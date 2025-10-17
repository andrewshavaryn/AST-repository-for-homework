import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demoqa.com/text-box");

  await expect(page.getByRole("textbox", { name: "Full Name" })).toBeVisible();
  await page.getByRole("textbox", { name: "Full Name" }).fill("Andrew");

  await expect(
    page.getByRole("textbox", { name: "name@example.com" })
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "name@example.com" })
    .fill("andrewtest@gmail.com");

  await expect(
    page.getByRole("textbox", { name: "Current Address" })
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Current Address" })
    .fill("Paradise City");

  await expect(page.locator("#permanentAddress")).toBeVisible();
  await page.locator("#permanentAddress").fill("Unvgvar, Ukraine");

  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Name:AndrewEmail:andrewtest@")).toBeVisible();
});
