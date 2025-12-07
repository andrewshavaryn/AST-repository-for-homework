import { test, expect } from '../../Fixtures-sausedemo/FixturesForSauseDemo';

test.describe('Checkout Step Two Tests with Fixtures', () => {
  
  test('Checkout-0004 - Order Summary is displayed correctly', async ({ 
    pageWithItemsInCart,
    checkoutInfo 
  }) => {
    // Проходимо весь шлях до step two
    await pageWithItemsInCart.goto('https://www.saucedemo.com/cart.html');
    await pageWithItemsInCart.click('[data-test="checkout"]');
    
    // Step One
    await pageWithItemsInCart.fill('[data-test="firstName"]', checkoutInfo.firstName);
    await pageWithItemsInCart.fill('[data-test="lastName"]', checkoutInfo.lastName);
    await pageWithItemsInCart.fill('[data-test="postalCode"]', checkoutInfo.postalCode);
    await pageWithItemsInCart.click('[data-test="continue"]');
    
    // Step Two - перевіряємо
    await expect(pageWithItemsInCart).toHaveURL(/.*checkout-step-two\.html/);
    
    const items = await pageWithItemsInCart.locator('.cart_item').count();
    expect(items).toBe(2);
    
    const subtotal = await pageWithItemsInCart.locator('.summary_subtotal_label');
    await expect(subtotal).toBeVisible();
    
    console.log('Підсумок замовлення відображається');
  });

  test('Checkout-0005 - Order Complete page is displayed correctly', async ({ 
    pageWithItemsInCart,
    checkoutInfo 
  }) => {
    // Проходимо до step two
    await pageWithItemsInCart.goto('https://www.saucedemo.com/cart.html');
    await pageWithItemsInCart.click('[data-test="checkout"]');
    
    await pageWithItemsInCart.fill('[data-test="firstName"]', checkoutInfo.firstName);
    await pageWithItemsInCart.fill('[data-test="lastName"]', checkoutInfo.lastName);
    await pageWithItemsInCart.fill('[data-test="postalCode"]', checkoutInfo.postalCode);
    await pageWithItemsInCart.click('[data-test="continue"]');
    
    // Клікаємо Finish
    await pageWithItemsInCart.click('[data-test="finish"]');
    
    // Перевіряємо success page
    await expect(pageWithItemsInCart).toHaveURL(/.*checkout-complete\.html/);
    
    const successMessage = await pageWithItemsInCart.locator('.complete-header');
    await expect(successMessage).toHaveText('Thank you for your order!');
    
    console.log('Покупка завершена успішно');
  });
});