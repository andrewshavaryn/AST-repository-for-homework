import { test as base, request, Page } from "@playwright/test";
import { access, readFile, writeFile } from "fs/promises";

/**
 * Цей файл визначає кастомну тестову фікстуру, використовуючи Playwright test.extend.
 * Фікстури дозволяють нам налаштовувати середовище, сторінки та дані, необхідні для тестів,
 * у багаторазовий та модульний спосіб.
 */

// Визначення типів для наших кастомних фікстур
type MyFixture = {
  email: string | undefined;
  before: void;
  after: void;
  token: string;
  user1Email: string;
};

// lazy fixture
export const test = base.extend<MyFixture>({
  email: undefined,

  // Кастомна фікстура контексту запиту.
  // Корисна для виконання API викликів всередині тестів.
  request: async ({}, use) => {
    const requestContext = await request.newContext({
      failOnStatusCode: true,
    });

    await use(requestContext);
  },

  /*
  Ця фікстура обробляє стан аутентифікації (storageState).
  Вона перевіряє, чи існує файл токена для даного email.
  Якщо існує, вона намагається використати його повторно. Якщо ні, або якщо токен недійсний,
  вона виконує вхід через API, зберігає токен у файл і налаштовує стан сховища.
  Це дозволяє уникнути входу через UI для кожного тесту, прискорюючи виконання.
  */
  storageState: async ({ email }, use) => {
    const defaultTokenPath = `${email}.txt`;
    let token: string;
    const requestContext = await request.newContext();

    if (await isFileExist(defaultTokenPath)) {
      token = await readFile(defaultTokenPath, { encoding: "utf-8" });

      try {
        await requestContext.get(process.env.BASEURL_API + "/api/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
          failOnStatusCode: true,
        });
      } catch (e) {
        const response = await requestContext.post(
          process.env.BASEURL_API + "/api/users/login",
          {
            data: {
              user: { email, password: process.env.TEST_USER_PASSWORD },
            },
            failOnStatusCode: true,
          }
        );

        const responseBody = await response.json();
        token = responseBody.user.token;

        await writeFile(defaultTokenPath, token);
      }
    } else {
      const response = await requestContext.post(
        process.env.BASEURL_API + "/api/users/login",
        {
          data: {
            user: { email, password: process.env.TEST_USER_PASSWORD},
          },
          failOnStatusCode: true,
        }
      );

      const responseBody = await response.json();
      token = responseBody.user.token;

      await writeFile(defaultTokenPath, token);
    }

    await use(createStorageState(token));
  },

  /*
  Фікстура 'before' діє як хук beforeEach.
  Вона переходить на сторінку входу та виконує вхід перед початком тесту.
  { auto: false } означає, що її потрібно явно запитати в тесті для запуску.
  before: [
    async ({ signInPage, email }, use) => {
      beforeEach це все що до await use();
      await signInPage.navigateToSignInPage();
      await signInPage.fillInputFields({
        email: email!,
        password: "1234",
      });
      await signInPage.clickSignUpButton();

      await use();
      afterEach це все що після await use();
    },
    { auto: false, title: "executing before test are finished" },
  ],

*/
  // Фікстура 'after' діє як хук afterEach.
  // Вона виконує дії з очищення, такі як вихід із системи, після завершення тесту.
  after: [
    async ({ page }, use) => {
      await use();

      console.log("test");
      await page.getByRole("link", { name: "  Settings" }).click();
      await page
        .getByRole("button", { name: "Or click here to logout." })
        .click({ delay: 1000 });

      // afterEach це все що після await use();
    },
    { auto: false, title: "executing after test are finished" },
  ],
});

async function isFileExist(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (e) {
    return false;
  }
}

function createStorageState(token: string) {
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: process.env.BASEURL!,
        localStorage: [
          {
            name: "id_token",
            value: token,
          },
        ],
      },
    ],
  };

  return storageState;
}
