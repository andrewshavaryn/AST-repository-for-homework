import { test, expect } from '../../Fixtures-sausedemo/FixturesForSauseDemo';

  test('FIXT-PLP-001-перевірка заголовка сторінки після логіну', async ({ 
    authenticatedPage,
    productsPage 
  }) => {
    // Ми вже на inventory.html завдяки authenticatedPage
    const title = await authenticatedPage.locator('.title').textContent();
    expect(title).toBe('Products');
    console.log('✅ Заголовок сторінки правильний');
  });


  test('FIXT-PLP-002-Standard User - перегляд товарів', async ({ 
    authenticatedPage 
  }) => {
    const items = await authenticatedPage.locator('.inventory_item').count();
    expect(items).toBeGreaterThan(0);
    console.log('✅ Standard User бачить товари');
  });
