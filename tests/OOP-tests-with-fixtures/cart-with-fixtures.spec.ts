import { test, expect } from '../../Fixtures-sausedemo/FixturesForSauseDemo';

test.describe('Cart Tests with Fixtures', () => {
  
  test('FIXT-CART-001- перевірка порожнього кошика', async ({ 
    authenticatedPage,
    cartPage 
  }) => {
    // Йдемо в кошик
    await authenticatedPage.goto('https://www.saucedemo.com/cart.html');
    
    // Перевіряємо що кошик порожній
    const items = await authenticatedPage.locator('.cart_item').count();
    expect(items).toBe(0);
    console.log('Кошик порожній');
  });

  test('FIXT-CART-002 - перехід до checkout з порожнім кошиком', async ({ 
    authenticatedPage 
  }) => {
    await authenticatedPage.goto('https://www.saucedemo.com/cart.html');
    
    // Кнопка Checkout має бути доступна навіть з порожнім кошиком
    const checkoutButton = authenticatedPage.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    
    await checkoutButton.click();
    await expect(authenticatedPage).toHaveURL(/.*checkout-step-one\.html/);
    console.log('Перехід до checkout працює');
  });
});

test.describe('Cart з товарами - мануальне додавання', () => {
  
  test('FIXT-CART-003 - додавання товару та перевірка кошика', async ({ 
    authenticatedPage,
    productsPage 
  }) => {
    
    // Додаємо 1 товар
    await productsPage.addToCartByIndex(0);
    
    // Перевіряємо badge
    const count = await productsPage.getCartItemCount();
    expect(count).toBe(1);
    console.log('Badge показує 1 товар');

    await authenticatedPage.goto('https://www.saucedemo.com/cart.html');
    
    const items = await authenticatedPage.locator('.cart_item').count();
    expect(items).toBe(1);
    console.log('У кошику 1 товар');
  });

  test('FIXT-AUTH-004-видалення товару з кошика', async ({ 
    authenticatedPage,
    productsPage 
  }) => {
    // Додаємо товар
    await productsPage.addToCartByIndex(0);
    
    // Йдемо в кошик
    await authenticatedPage.goto('https://www.saucedemo.com/cart.html');
    
    // Видаляємо товар
    await authenticatedPage.click('[data-test^="remove"]');
    
    // Перевіряємо
    const items = await authenticatedPage.locator('.cart_item').count();
    expect(items).toBe(0);
    console.log('Товар видалено з кошика');
  });
});