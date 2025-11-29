import test, { expect } from "@playwright/test";
import { LoginPage } from "../OOP-classes-hw/LoginPage";

test(
  "Login as standard user - should be logged",
  { tag: ["@regression"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword("secret_sause");
    await loginPage.clickLogin();

    //де робити перевірки ?
    await expect(loginPage.usernameInputLocator).toBeVisible();
  }
);
