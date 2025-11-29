import test from "@playwright/test";
import { LoginPage } from "../OOP-classes-hw/LoginPage";

test(
  "Login as standard user - should be logged",
  { tag: ["@regression"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.usernameInputLocator.fill("standard_user");
    await loginPage.passwordInputLocator.fill("secret_sause");
    await loginPage.usernameInputLocator.click;
  }
);
