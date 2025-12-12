import { test, expect } from "@playwright/test";

/**
 * Цей файл демонструє, як використовувати API запити в Playwright для отримання токена аутентифікації.
 * Це корисно для швидкого налаштування стану користувача без використання UI.
 */

// Приклад використання нативного fetch API (для порівняння або налагодження поза Playwright)
fetch("https://conduit-api.learnwebdriverio.com/api/users/login", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,uk;q=0.7",
    authorization:
      "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5M2IzNTcxZGI0MTIyYTUwNGYzZDE3ZSIsInVzZXJuYW1lIjoia2FudGUiLCJleHAiOjE3NzA2NzQyNjYsImlhdCI6MTc2NTQ5MDI2Nn0.S1ctg6DBAW_wK9U0nGRCkPRac3s4Vb6X0nvVk-9G9MY",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua":
      '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    Referer: "https://demo.learnwebdriverio.com/",
  },
  body: '{"user":{"email":"kante072@gmail.com","password":"test1234"}}',
  method: "POST",
});

//http client
// Тест на реєстрацію нового користувача та отримання токена
test("API-0001 - get auth token", async ({ request }) => {
  const response = await request.post(
    process.env.BASEURL_API + "/api/users",
    {
      data: {
        user: {
          email: "kante076@gmail.com",
          password: "test1234",
          username: "kante6",
        },
      },
      failOnStatusCode: true,
    }
  );

  const responseBody = await response.json();
  const token = responseBody.user.token;

  console.log(token);

  expect(token).toBeTruthy();
});

// Тест на логін існуючого користувача та отримання токена
test("login and get auth token", async ({ request }) => {
  // Відправляємо POST запит на логін
  const response = await request.post(
    "https://conduit-api.learnwebdriverio.com/api/users/login",
    {
      data: {
        user: { email: "kante073@gmail.com", password: "test1234" },
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
