import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../LoginPage/LoginPage';

type AuthFixtures = {
  standardUser: { username: string; password: string };
  lockedUser: { username: string; password: string };
  problemUser: { username: string; password: string };
  performanceGlitchUser: { username: string; password: string };
  errorUser: { username: string; password: string };
  visualUser: { username: string; password: string };
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  standardUser: async ({}, use) => {
    await use({ 
      username: 'standard_user', 
      password: 'secret_sauce' 
    });
  },

  lockedUser: async ({}, use) => {
    await use({ 
      username: 'locked_out_user', 
      password: 'secret_sauce' 
    });
  },

  problemUser: async ({}, use) => {
    await use({ 
      username: 'problem_user', 
      password: 'secret_sauce' 
    });
  },

  performanceGlitchUser: async ({}, use) => {
    await use({ 
      username: 'performance_glitch_user', 
      password: 'secret_sauce' 
    });
  },

  errorUser: async ({}, use) => {
    await use({ 
      username: 'error_user', 
      password: 'secret_sauce' 
    });
  },

  visualUser: async ({}, use) => {
    await use({ 
      username: 'visual_user', 
      password: 'secret_sauce' 
    });
  },

  // Автоматично залогінена сторінка зі standard_user
  authenticatedPage: async ({ page, standardUser }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(standardUser.username, standardUser.password);
    
    // Чекаємо успішний редірект на inventory
    await page.waitForURL('**/inventory.html');
    
    await use(page);
  }
});

export { expect } from '@playwright/test';