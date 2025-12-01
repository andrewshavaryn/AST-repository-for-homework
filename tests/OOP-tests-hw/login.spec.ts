import test, { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../OOP-classes-hw/LoginPage/LoginPage";
import { ProductsPage } from "../../OOP-classes-hw/ProductPage/ProductsPage";

test(
  "AUTH-001 - Login as standard user - should be logged",
  { tag: ["@regression"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickLogin();

    const productsPage = new ProductsPage(page);

    //перевіряємо чи юзер залогінений наявністю бургер меню (бо він є тільки в авторизованого юзера)
    await expect(productsPage.locators.burgerMenuLocator).toBeVisible();
  }
);

test(
  "AUTH-002 - Login as standard user with incorrect password",
  { tag: ["@regression"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword(faker.internet.password());
    await loginPage.clickLogin();

    //перевіряємо, що юзер не залогінений через валідаційну помилку
    await expect(loginPage.locators.errorMessageLocator).toBeVisible();
  }
);
