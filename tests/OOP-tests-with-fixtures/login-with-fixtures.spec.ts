import { test, expect } from '../../Fixtures-sausedemo/FixturesForSauseDemo';
import { LoginPage } from '../../Fixtures-sausedemo/LoginPage/LoginPage';
import { ProductsPage } from '../../Fixtures-sausedemo/ProductPage/ProductsPage';

test.describe('Всі 5 користувачів - логін та логаут', () => {
  
  const users = [
    { username: 'standard_user', password: 'secret_sauce', description: 'Standard User' },
    { username: 'problem_user', password: 'secret_sauce', description: 'Problem User' },
    { username: 'performance_glitch_user', password: 'secret_sauce', description: 'Performance Glitch User' },
    { username: 'error_user', password: 'secret_sauce', description: 'Error User' },
    { username: 'visual_user', password: 'secret_sauce', description: 'Visual User' }
  ];

  for (const user of users) {
    test(`${user.description} - FIXT-AUTH-001 - логін, додавання товару, логаут`, async ({ page }) => {
      // 1. Логін
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      
      await expect(page).toHaveURL(/.*inventory\.html/);
      console.log(`${user.description} залогінився`);
      
      // 2. Додавання товару
      const productsPage = new ProductsPage(page);
      await productsPage.addToCartByIndex(0);
      
      const badge = await productsPage.getCartItemCount();
      expect(badge).toBe('1');
      console.log(`${user.description} додав товар`);
      
      // 3. Логаут
      await page.click('#react-burger-menu-btn');
      await page.waitForSelector('#logout_sidebar_link', { state: 'visible' });
      await page.click('#logout_sidebar_link');
      
      await page.waitForURL(/.*saucedemo\.com\/?$/);
      console.log(`${user.description} вийшов з системи\n`);
    });
  }

  // 6-й користувач - locked_out_user (негативний тест)
  test('FIXT-AUTH-002 - Locked Out User - помилка при логіні', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out');
    
    await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
    console.log('Locked Out User - правильна помилка');
  });
});
