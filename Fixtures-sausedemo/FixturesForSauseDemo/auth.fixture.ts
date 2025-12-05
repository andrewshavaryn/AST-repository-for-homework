import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../LoginPage/LoginPage";

type User = {
  username: string;
  password: string;
};

type AuthFixtures = {
  standardUser: User;
  lockedUser: User;
  problemUser: User;
  performanceGlitchUser: User;
  errorUser: User;
  visualUser: User;

  // Конфігурація - який користувач використовується (за замовчуванням standard)
  currentUser: User;

  // Чи робити автологін (за замовчуванням true)
  autoLogin: boolean;

  // Чи робити автологаут (за замовчуванням false)
  autoLogout: boolean;

  // Автоматично залогінена сторінка
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  standardUser: async ({}, use) => {
    await use({
      username: "standard_user",
      password: "secret_sauce",
    });
  },

  lockedUser: async ({}, use) => {
    await use({
      username: "locked_out_user",
      password: "secret_sauce",
    });
  },

  problemUser: async ({}, use) => {
    await use({
      username: "problem_user",
      password: "secret_sauce",
    });
  },

  performanceGlitchUser: async ({}, use) => {
    await use({
      username: "performance_glitch_user",
      password: "secret_sauce",
    });
  },

  errorUser: async ({}, use) => {
    await use({
      username: "error_user",
      password: "secret_sauce",
    });
  },

  visualUser: async ({}, use) => {
    await use({
      username: "visual_user",
      password: "secret_sauce",
    });
  },

  // За замовчуванням використовується standard_user
  currentUser: [
    async ({ standardUser }, use) => {
      await use(standardUser);
    },
    { auto: true },
  ], //auto: true означає, що створюється автоматично

  // За замовчуванням автологін увімкнений
  autoLogin: true,

  // За замовчуванням автологаут вимкнений
  autoLogout: false,

  // Автоматичний логін/логаут
  authenticatedPage: async (
    { page, currentUser, autoLogin, autoLogout },
    use
  ) => {
    const loginPage = new LoginPage(page);

    if (autoLogin) {
      console.log(`Автологін з користувачем: ${currentUser.username}`);
      await loginPage.goto();
      await loginPage.login(currentUser.username, currentUser.password);
      await page.waitForURL("**/inventory.html");
      console.log("Успішно залогінено");
    }

    // Передаємо сторінку в тест
    await use(page);

    if (autoLogout) {
      console.log("Автологаут...");

      // Клік на бургер-меню
      await page.click("#react-burger-menu-btn");

      // Чекаємо на появу меню
      await page.waitForSelector("#logout_sidebar_link", { state: "visible" });

      // Клік на Logout
      await page.click("#logout_sidebar_link");

      // Перевіряємо, що повернулись на логін сторінку
      await page.waitForURL("**/");

      console.log("Успішно вийшли з системи");
    }
  },
});

export { expect } from "@playwright/test";
