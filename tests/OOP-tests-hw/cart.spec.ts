import test, { expect } from "@playwright/test";
import { LoginPage } from "../../OOP-classes-hw/LoginPage/LoginPage";
import { ProductsPage } from "../../OOP-classes-hw/ProductPage/ProductsPage";
import { CartPage } from "../../OOP-classes-hw/CartPage/CartPage";

test.describe("Cart Page Tests", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickLogin();

    // Додаємо продукт до кошика
    await productsPage.addToCartByTitle("Sauce Labs Backpack");
    
    // Переходимо до кошика
    await productsPage.goToCart();
  });

  test("CART-001 - Remove product from cart by title", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      const productName = "Sauce Labs Backpack";

      expect(await cartPage.isProductInCart(productName)).toBe(true);

      await cartPage.removeFromCartByTitle(productName);

      expect(await cartPage.isCartEmpty()).toBe(true);
    }
  );

  test("CART-002 - Checkout navigation", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      await cartPage.checkout();

      await expect(page).toHaveURL(/.*checkout-step-one/);
    }
  );

  test("CART-003 - Continue shopping navigation", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      await cartPage.continueShopping();

      await expect(page).toHaveURL(/.*inventory/);
      
      expect(await productsPage.getCartItemCount()).toBe(1);
    }
  );

  test("CART-004 - Remove multiple products from cart",
    { tag: ["@regression"] }, 
    async ({ page }) => {
      await cartPage.continueShopping();
      await productsPage.addToCartByTitle("Sauce Labs Bike Light");
      await productsPage.addToCartByTitle("Sauce Labs Bolt T-Shirt");
      
      await productsPage.goToCart();

      // Перевіряємо що 3 продукти в кошику
      expect(await cartPage.getCartItemsCount()).toBe(3);

      // Видаляємо по одному
      await cartPage.removeFromCartByTitle("Sauce Labs Backpack");
      expect(await cartPage.getCartItemsCount()).toBe(2);

      await cartPage.removeFromCartByTitle("Sauce Labs Bike Light");
      expect(await cartPage.getCartItemsCount()).toBe(1);

      await cartPage.removeFromCartByTitle("Sauce Labs Bolt T-Shirt");
      expect(await cartPage.isCartEmpty()).toBe(true);
    }
  );
});