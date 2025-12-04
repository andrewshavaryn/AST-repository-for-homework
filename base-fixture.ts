import { test as base } from "@playwright/test";
import {SignInPage} from //треба створити десь клас SignInPage і тоді можна імпортнути буде
//fixtures - це будь що, що може бути корисне під час виконання тесту
//тут будуть приклади створення своїх фікстур, а потім їх по назві можна викликати у своїх тестах
//викликати власні фікстури можна на початку тесту через import {назва твоєї фікстури}

type MyFixture = {
  email: string | undefined;
  signInPage: SignInPage;
  before: void;
  after: void;
  token: string;
  user1Email: string;
};

// lazy fixture
export const test = base.extend<MyFixture>({
  email: undefined,
  user1Email: "test@gm.com",
  page: async ({ page }, use) => {
    console.log("page");
    await use(page);
  },
  context: async ({ context }, use) => {
    console.log("context");
    await use(context);
  },
  browser: async ({ browser }, use) => {
    console.log("browser");
    await use(browser);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },

  token: async ({}, use) => {
    const tokens = {
      access_token: "testasasfkmasko[mnfg",
      refresh_token: "asfasfasfasfasf",
      expiration: 900,
    };

    await use(tokens.access_token);
  },

  before: [
    async ({ signInPage, email }, use) => {
      // beforeEach це все що до await use();
      await signInPage.navigateToSignInPage();
      await signInPage.fillInputFields({
        email: email!,
        password: "1234",
      });
      await signInPage.clickSignUpButton();

      await use();
      // afterEach це все що після await use();
    },
    { auto: true, title: "executing before test are finished" },
  ],

  after: [
    async ({ page }, use) => {
      await use();

      console.log("test");
      await page.getByRole("link", { name: "  Settings" }).click();
      await page
        .getByRole("button", { name: "Or click here to logout." })
        .click({ delay: 1000 });

      // afterEach це все що після await use();
    },
    { auto: true, title: "executing after test are finished" },
  ],
})
