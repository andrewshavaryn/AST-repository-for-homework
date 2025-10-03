import { test, expect } from '@playwright/test';

test('AS-0002 Check prices', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

 
  await expect(page.locator('#app')).toContainText('Espresso $10.00');
  
  await expect(page.locator('#app')).toContainText('Cappuccino $19.00');
  await expect(page.locator('#app')).toContainText('Mocha $8.00');
});