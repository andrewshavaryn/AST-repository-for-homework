import { test, expect } from "@playwright/test";

// Змінна для зберігання slug статті між тестами
let articleSlug: string;
let authToken: string;
let testUserEmail: string;
let testUserPassword: string;

/**
 * Цей файл демонструє, як використовувати API запити в Playwright для отримання токена аутентифікації.
 * Це корисно для швидкого налаштування стану користувача без використання UI.
 */

//http client

test.describe.serial("Conduit API - Articles CRUD", () => {
  // Створюємо нового користувача перед всіма тестами
  test.beforeAll(async ({ request }) => {
    const timestamp = Date.now();
    testUserEmail = `testuser_${timestamp}@test.com`;
    testUserPassword = "Test123456!";

    const newUser = {
      username: `user${timestamp}`,
      email: testUserEmail,
      password: testUserPassword,
    };

    console.log("Creating new user:", testUserEmail);

    const response = await request.post(
      `${process.env.BASEURL_API}/api/users`,
      {
        data: { user: newUser },
      }
    );

    // Перевіряємо чи успішно створився користувач
    if (!response.ok()) {
      const errorBody = await response.text();
      console.error("Registration failed:", response.status(), errorBody);
      throw new Error(`Registration failed: ${response.status()}`);
    }

    const body = await response.json();
    authToken = body.user.token;

    console.log("User created successfully, token received");
  });

  // Тест на реєстрацію нового користувача та отримання токена
  test("API-0001 - Register unique user and get auth token", async ({
    request,
  }) => {
    const timestamp = Date.now().toString().slice(-8);
    const uniqueUser = {
      username: `user${timestamp}`,
      email: `testuser_${Date.now()}@test.com`,
      password: process.env.TEST_USER_PASSWORD!,
    };

    const response = await request.post(
      process.env.BASEURL_API + "/api/users",
      {
        data: { user: uniqueUser },
        failOnStatusCode: true,
      }
    );

    const responseBody = await response.json();
    const token = responseBody.user.token;

    console.log(token);

    expect(token).toBeTruthy();

    console.log("User created successfully!");
  });

  // Тест на логін існуючого користувача та отримання токена
  test("API-0002 - Login and get auth token", async ({ request }) => {
    // Логінимося з користувачем, створеним в beforeAll
    const response = await request.post(
      process.env.BASEURL_API + "/api/users/login",
      {
        data: {
          user: {
            email: testUserEmail, 
            password: testUserPassword, 
          },
        },
        failOnStatusCode: false,
      }
    );

    // Перевіряємо статус
    if (!response.ok()) {
      const errorBody = await response.text();
      console.error("Login failed:", response.status(), errorBody);
    }

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    const token = responseBody.user.token;

    console.log("Login token:", token);

    expect(token).toBeTruthy();

    // Чекаємо 3 секунди (просто для демонстрації)
    await new Promise((r) => setTimeout(r, 3000));

    // Отримуємо поточний стан сховища
    const storageState = await request.storageState();
    console.log(storageState);
  });

  test("API-0003 - Create new article", async ({ request }) => {
    const timestamp = Date.now();
    const article = {
      title: `Test Article ${timestamp}`,
      description: "This is a test article created via API",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is the full content of the test article.",
      tagList: ["testing", "automation", "playwright"],
    };

    const response = await request.post(
      `${process.env.BASEURL_API}/api/articles`,
      {
        data: { article },
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.article.title).toBe(article.title);
    expect(body.article.description).toBe(article.description);
    expect(body.article.body).toBe(article.body);
    expect(body.article.slug).toBeTruthy();

    //slug для наступних тестів
    articleSlug = body.article.slug;

    console.log("Article created!");
    console.log("Title:", body.article.title);
    console.log("Slug:", articleSlug);
  });

  test("API-0004 - Update article", async ({ request }) => {
    expect(articleSlug).toBeTruthy(); // Перевіряємо що є slug з попереднього тесту

    const updatedArticle = {
      title: `Updated Article ${Date.now()}`,
      description: "This article has been updated via API",
      body: "This is the updated content of the article. New information added here.",
    };

    const response = await request.put(
      `${process.env.BASEURL_API}/api/articles/${articleSlug}`,
      {
        data: { article: updatedArticle },
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.article.title).toBe(updatedArticle.title);
    expect(body.article.description).toBe(updatedArticle.description);
    expect(body.article.body).toBe(updatedArticle.body);

    articleSlug = body.article.slug;

    console.log("Article updated!");
    console.log("New title:", body.article.title);
    console.log("New slug:", articleSlug);
  });

  test("API-0005 - Delete article", async ({ request }) => {
    expect(articleSlug).toBeTruthy(); // Перевіряємо що є slug

    const response = await request.delete(
      `${process.env.BASEURL_API}/api/articles/${articleSlug}`,
      {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );

    expect(response.status()).toBe(204); // 204 No Content = успішне видалення

    console.log("Article deleted!");
    console.log("Deleted slug:", articleSlug);

    // Перевіряємо, що стаття справді видалена
    const getResponse = await request.get(
      `${process.env.BASEURL_API}/api/articles/${articleSlug}`,
      { failOnStatusCode: false }
    );

    expect(getResponse.status()).toBe(404); // Стаття не знайдена
    console.log("Confirmed: Article no longer exists");
  });
});
