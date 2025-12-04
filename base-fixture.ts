import { test as base } from "@playwright/test";
import {SignInPage} from //треба створити десь клас SignInPage і тоді можна імпортнути буде
//fixtures - це будь що, що може бути корисне під час виконання тесту
//тут будуть приклади створення своїх фікстур, а потім їх по назві можна викликати у своїх тестах
//викликати власні фікстури можна на початку тесту через import {назва твоєї фікстури}

type MyFixture = {
  qa_senpai: string;
  signInPage: SignInPage;
};

// lazy fixture
export const test = base.extend<MyFixture>({
  qa_senpai: "Pavlo Safonov",
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
    console.log("--im in signInPage fixture ---");
    const signInPage = new SignInPage(page);

    await use(signInPage);

    console.log("--im out signInPage fixture ---");
  },
});
