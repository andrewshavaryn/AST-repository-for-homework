import { test, expect, Page } from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";

test(
  "WL-1 user registration, should be successful",
  { tag: ["@prod"] },
  async ({ page }) => {
    const randomNumber = Math.floor(Math.random() * 9999);
    const username = `coach${randomNumber}`; // Coach1214

    const registrationPage = new RegistrationPage(page);

    await page.goto("https://demo.learnwebdriverio.com/", {
      timeout: 60_000,
    });

    await registrationPage.clickOnRegisterLink();
    await registrationPage.register(username, username + "@gm.com", "1234");

    await expect(
      page.locator(`//a[contains(text(), '${username}')]`)
    ).toBeVisible();
  }
);
