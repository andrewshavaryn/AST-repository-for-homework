import { test as base } from "@playwright/test";
import { LoginPage } from "../LoginPage/LoginPage";
import { ProductsPage } from "../ProductPage/ProductsPage";
import { CartPage } from "../CartPage/CartPage";
import { CheckoutStepOnePage } from "../CheckoutStepOnePage/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../CheckoutStepTwoPage/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../CheckoutCompletePage/CheckoutCompletePage";
import type { Page } from "@playwright/test";

type User = {
  username: string;
  password: string;
};

type AllFixtures = {
  // Pages
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;

  // Auth
  standardUser: User;
  lockedUser: User;
  problemUser: User;
  performanceGlitchUser: User;
  errorUser: User;
  visualUser: User;
  currentUser: User;
  autoLogin: boolean;
  autoLogout: boolean;
  authenticatedPage: Page;

  // Cart
  pageWithItemsInCart: Page;
  itemsCount: number;

  // Test Data
  checkoutInfo: { firstName: string; lastName: string; postalCode: string };
  validCheckoutInfo: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
  invalidCheckoutInfo: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
};

export const test = base.extend<AllFixtures>({
  // === PAGE OBJECTS ===
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  // === AUTH USERS ===
  standardUser: async ({}, use) => {
    await use({ username: "standard_user", password: "secret_sauce" });
  },

  lockedUser: async ({}, use) => {
    await use({ username: "locked_out_user", password: "secret_sauce" });
  },

  problemUser: async ({}, use) => {
    await use({ username: "problem_user", password: "secret_sauce" });
  },

  performanceGlitchUser: async ({}, use) => {
    await use({
      username: "performance_glitch_user",
      password: "secret_sauce",
    });
  },

  errorUser: async ({}, use) => {
    await use({ username: "error_user", password: "secret_sauce" });
  },

  visualUser: async ({}, use) => {
    await use({ username: "visual_user", password: "secret_sauce" });
  },

  // === AUTH CONFIG ===
  currentUser: [
    async ({ standardUser }, use) => {
      await use(standardUser);
    },
    { auto: true },
  ],

  autoLogin: true,

  autoLogout: false,

  // === AUTHENTICATED PAGE ===
  authenticatedPage: async (
    { page, currentUser, autoLogin, autoLogout },
    use
  ) => {
    const loginPage = new LoginPage(page);

    // SETUP: Автологін
    if (autoLogin) {
      await loginPage.goto();
      await loginPage.login(currentUser.username, currentUser.password);
      await page.waitForURL("**/inventory.html");
    }

    // Передаємо сторінку в тест
    await use(page);

    // TEARDOWN: Автологаут
    if (autoLogout) {
      await page.click("#react-burger-menu-btn");
      await page.waitForSelector("#logout_sidebar_link", { state: "visible" });
      await page.click("#logout_sidebar_link");
      await page.waitForURL("**/");
    }
  },

  // === CART ===
  itemsCount: 2,

  pageWithItemsInCart: async ({ page, itemsCount }, use) => {
    // Логін
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await page.waitForURL("**/inventory.html");

    // Додавання товарів
    const productsPage = new ProductsPage(page);
    for (let i = 0; i < itemsCount; i++) {
      await productsPage.addToCartByIndex(i);
    }

    await use(page);
  },

  // === TEST DATA ===
  checkoutInfo: async ({}, use) => {
    await use({
      firstName: "John",
      lastName: "Doe",
      postalCode: "12345",
    });
  },

  validCheckoutInfo: async ({}, use) => {
    await use({
      firstName: "Test",
      lastName: "User",
      postalCode: "54321",
    });
  },

  invalidCheckoutInfo: async ({}, use) => {
    await use({
      firstName: "",
      lastName: "",
      postalCode: "",
    });
  },
});

export { expect } from "@playwright/test";
