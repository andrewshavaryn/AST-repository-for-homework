import test, { expect } from "@playwright/test";
import { LoginPage } from "../OOP-classes-hw/LoginPage/LoginPage";
import { ProductsPage } from "../OOP-classes-hw/ProductPage/ProductsPage";

test(
  "Login as standard user - should be logged",
  { tag: ["@regression"] },
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickLogin();

    //де робити перевірки ?
    await expect(loginPage.locators.passwordInputLocator).toBeVisible();
  }
);


test("add to cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productPage = new ProductsPage(page);

  await page.goto("https://www.saucedemo.com/");
  await loginPage.fillUsername("standard_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickLogin();

  await productPage.getProductCard("Sauce Labs Backpack").clickAddToCart();
});