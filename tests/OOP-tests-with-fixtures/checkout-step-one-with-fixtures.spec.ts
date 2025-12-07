import { test, expect } from '../../Fixtures-sausedemo/FixturesForSauseDemo';

test.describe('Checkout Step One Tests with Fixtures', () => {
  
  test('Checkout-001- Fill in valid data', async ({ 
    pageWithItemsInCart,
    checkoutStepOnePage,
    checkoutInfo 
  }) => {
    // Товари вже в кошику
    await pageWithItemsInCart.goto('https://www.saucedemo.com/cart.html');
    await pageWithItemsInCart.click('[data-test="checkout"]');
    
    // Заповнюємо форму даними з фікстури
    await pageWithItemsInCart.fill('[data-test="firstName"]', checkoutInfo.firstName);
    await pageWithItemsInCart.fill('[data-test="lastName"]', checkoutInfo.lastName);
    await pageWithItemsInCart.fill('[data-test="postalCode"]', checkoutInfo.postalCode);
    
    await pageWithItemsInCart.click('[data-test="continue"]');
    
    // Перевіряємо перехід на step two
    await expect(pageWithItemsInCart).toHaveURL(/.*checkout-step-two\.html/);
    console.log('Форма заповнена успішно');
  });

  test('Checkout-0002- Erros message with empty fields', async ({ 
    pageWithItemsInCart,
    invalidCheckoutInfo 
  }) => {
    await pageWithItemsInCart.goto('https://www.saucedemo.com/cart.html');
    await pageWithItemsInCart.click('[data-test="checkout"]');
    
    // Заповнюємо порожніми даними
    await pageWithItemsInCart.fill('[data-test="firstName"]', invalidCheckoutInfo.firstName);
    await pageWithItemsInCart.fill('[data-test="lastName"]', invalidCheckoutInfo.lastName);
    await pageWithItemsInCart.fill('[data-test="postalCode"]', invalidCheckoutInfo.postalCode);
    
    await pageWithItemsInCart.click('[data-test="continue"]');
    
    // Перевіряємо помилку
    const error = await pageWithItemsInCart.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    
    const errorText = await error.textContent();
    expect(errorText).toContain('First Name is required');
    console.log('Помилка відображається правильно');
  });
});

test.describe('Checkout with different data', () => {
  
  test('Checkout-0003 - Use validCheckoutInfo during Checkout', async ({ 
    pageWithItemsInCart,
    validCheckoutInfo 
  }) => {
    await pageWithItemsInCart.goto('https://www.saucedemo.com/cart.html');
    await pageWithItemsInCart.click('[data-test="checkout"]');
    
    await pageWithItemsInCart.fill('[data-test="firstName"]', validCheckoutInfo.firstName);
    await pageWithItemsInCart.fill('[data-test="lastName"]', validCheckoutInfo.lastName);
    await pageWithItemsInCart.fill('[data-test="postalCode"]', validCheckoutInfo.postalCode);
    
    await pageWithItemsInCart.click('[data-test="continue"]');
    
    await expect(pageWithItemsInCart).toHaveURL(/.*checkout-step-two\.html/);
    console.log('Альтернативні дані теж працюють');
  });
});