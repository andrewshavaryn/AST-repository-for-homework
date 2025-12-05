import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../LoginPage/LoginPage';
import { ProductsPage } from '../ProductPage/ProductsPage';

type CartFixtures = {
  pageWithItemsInCart: Page;
  itemsCount: number;
};

export const test = base.extend<CartFixtures>({
  // За замовчуванням додаємо 2 товари
  itemsCount: 2,

  pageWithItemsInCart: async ({ page, itemsCount }, use) => {
    // 1. Логінимось
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('**/inventory.html');

    // 2. Додаємо товари в кошик
    const productsPage = new ProductsPage(page);
    
    for (let i = 0; i < itemsCount; i++) {
      // Припускаю, що у тебе є метод для додавання товару за індексом
      // Якщо метод називається інакше - підкажи
      await productsPage.addProductToCartByIndex(i);
    }

    await use(page);
  }
});

export { expect } from '@playwright/test';