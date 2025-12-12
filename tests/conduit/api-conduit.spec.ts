import { test, expect } from "@playwright/test";

/**
 * Цей файл демонструє, як використовувати API запити в Playwright для отримання токена аутентифікації.
 * Це корисно для швидкого налаштування стану користувача без використання UI.
 */

//http client
// Тест на реєстрацію нового користувача та отримання токена
test("API-0001 - get auth token", async ({ request }) => {
  const response = await request.post(process.env.BASEURL_API + "/api/users", {
    data: {
      user: {
        email: "kante076@gmail.com",
        password: "test1234",
        username: "kante6",
      },
    },
    failOnStatusCode: true,
  });

  const responseBody = await response.json();
  const token = responseBody.user.token;

  console.log(token);

  expect(token).toBeTruthy();
});

// Тест на логін існуючого користувача та отримання токена
test("API-0002 - Login and get auth token", async ({ request }) => {
  // Відправляємо POST запит на логін
  const response = await request.post(
    process.env.BASEURL_API + "/api/users/login",
    {
      data: {
        user: {
          email: "kante072@gmail.com",
          password: "test1234",
        },
      },
      failOnStatusCode: true,
    }
  );

  const responseBody = await response.json();
  const token = responseBody.user.token;

  console.log(token);

  expect(token).toBeTruthy();

  // Чекаємо 3 секунди (просто для демонстрації)
  await new Promise((r) => setTimeout(r, 3000));

  //   await page.waitForTimeout(3000);

  // Отримуємо поточний стан сховища (cookies, local storage) з контексту запиту
  const storageState = await request.storageState();
  console.log(storageState);

  console.log("");
});
