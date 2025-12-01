import test, { expect } from "@playwright/test";
import { LoginPage } from "../../OOP-classes-hw/LoginPage/LoginPage";
import { ProductsPage } from "../../OOP-classes-hw/ProductPage/ProductsPage";
import { CartPage } from "../../OOP-classes-hw/CartPage/CartPage";
import { CheckoutStepOnePage } from "../../OOP-classes-hw/CheckoutStepOnePage/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../../OOP-classes-hw/CheckoutStepTwoPage/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../../OOP-classes-hw/CheckoutCompletePage/CheckoutCompletePage";

test.describe("Checkout Step Two and Complete Tests", () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await page.goto("https://www.saucedemo.com/");
    await loginPage.fillUsername("standard_user");
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickLogin();

    await productsPage.addToCartByTitle("Sauce Labs Backpack");
    await productsPage.goToCart();
    await cartPage.checkout();

    await checkoutStepOnePage.fillCheckoutInfo("John", "Doe", "12345");
    await checkoutStepOnePage.continue();
  });


  test("CHECKOUT-STEP2-001 - Verify product is in overview", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      const productName = "Sauce Labs Backpack";

      expect(await checkoutStepTwoPage.isProductInOverview(productName)).toBe(true);
      expect(await checkoutStepTwoPage.getItemsCount()).toBe(1);
    }
  );

  test("CHECKOUT-STEP2-002 - Verify payment and shipping info", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      const paymentInfo = await checkoutStepTwoPage.getPaymentInfo();
      const shippingInfo = await checkoutStepTwoPage.getShippingInfo();

      expect(paymentInfo).toBeTruthy();
      expect(shippingInfo).toBeTruthy();
    }
  );


  test("CHECKOUT-STEP2-003 - Verify product price", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      const productName = "Sauce Labs Backpack";
      const price = await checkoutStepTwoPage.getProductPrice(productName);

      expect(price).toBe("$29.99");
    }
  );

  test("CHECKOUT-STEP2-004 - Cancel and return to products", 
    { tag: ["@regression"] }, 
    async ({ page }) => {
      await checkoutStepTwoPage.cancel();

      await expect(page).toHaveURL(/.*inventory/);
    }
  );

  test("CHECKOUT-STEP2-005 - Complete order successfully", 
    { tag: ["@regression", "@smoke", "@e2e"] }, 
    async ({ page }) => {
      await checkoutStepTwoPage.finish();

      await expect(page).toHaveURL(/.*checkout-complete/);
      expect(await checkoutCompletePage.isOnCheckoutCompletePage()).toBe(true);
    }
  );

  test("CHECKOUT-COMPLETE-001 - Verify order success message", 
    { tag: ["@regression", "@smoke"] }, 
    async ({ page }) => {
      await checkoutStepTwoPage.finish();

      const header = await checkoutCompletePage.getCompleteHeader();
      const text = await checkoutCompletePage.getCompleteText();

      expect(header.toLowerCase()).toContain("thank you");
      expect(text).toBeTruthy();
      expect(await checkoutCompletePage.isSuccessIconVisible()).toBe(true);
    }
  );

  test("CHECKOUT-COMPLETE-002 - Verify order is successful", 
    { tag: ["@regression", "@smoke"] }, 
    async ({ page }) => {
      await checkoutStepTwoPage.finish();

      expect(await checkoutCompletePage.isOrderSuccessful()).toBe(true);
    }
  );


  test("E2E-001 - Full checkout flow from product to order complete", 
    { tag: ["@e2e", "@smoke"] }, 
    async ({ page }) => {
    
      expect(await checkoutStepTwoPage.isProductInOverview("Sauce Labs Backpack")).toBe(true);
      await checkoutStepTwoPage.finish();

      expect(await checkoutCompletePage.isOrderSuccessful()).toBe(true);
      expect(await checkoutCompletePage.isSuccessIconVisible()).toBe(true);

      await checkoutCompletePage.backHome();
      await expect(page).toHaveURL(/.*inventory/);
    }
  );
});