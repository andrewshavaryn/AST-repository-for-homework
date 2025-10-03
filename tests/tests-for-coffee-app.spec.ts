import { test, expect } from '@playwright/test';

//jira ticket id
//test rail id
test('AS-0001 Order espresso should be successful', 
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Checkout flow with one product"
    },
  },

  async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click(); //css selector
  await page.locator('[data-test="checkout"]').click();

  await page.getByRole('textbox', { name: 'Name' }).fill('test31');
  await page.getByRole('textbox', { name: 'Email' }).fill('test31@gmail.com');

  await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(
    page.getByRole('button', { name: 'Thanks for your purchase.' })
  ).toBeVisible();
});


test('AS-0002 Check prices', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

 
  await expect(page.locator('#app')).toContainText('Espresso $10.00');
  
  await expect(page.locator('#app')).toContainText('Cappuccino $19.00');
  await expect(page.locator('#app')).toContainText('Mocha $8.00');
});