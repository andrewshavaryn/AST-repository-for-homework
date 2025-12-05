import { test as base } from '@playwright/test';
import { LoginPage } from '../LoginPage/LoginPage';
import { ProductsPage } from '../ProductPage/ProductsPage';
import { CartPage } from '../CartPage/CartPage';
import { CheckoutStepOnePage } from '../CheckoutStepOnePage/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../CheckoutStepTwoPage/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../CheckoutCompletePage/CheckoutCompletePage';

type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  }
});

export { expect } from '@playwright/test';