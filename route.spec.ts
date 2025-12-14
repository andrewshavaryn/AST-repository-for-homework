import { test, expect, Request, Response } from "@playwright/test";

const responseJson = {
  articles: [
    {
      slug: "test-article-kpi9z5",
      title: "THIS IS MOCKED RESPONSE",
      description: "some description",
      body: "NEW BODY UPDATE",
      createdAt: "2025-12-12T06:46:59.587Z",
      updatedAt: "2025-12-12T06:46:59.905Z",
      tagList: ["qa", "dojo", "cool"],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "adminteo6",
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: false,
      },
    },
  ],
  articlesCount: 1,
};

// документація https://playwright.dev/docs/api/class-route

test("підміна тіла реквесту перед відправкою на сервер", async ({ page }) => {
  const reqBody = `{"article":{"author":{},"title":"psp1","description":"test","body":"test","tagList":[]}}`;
  const loginPage = new SignInPage(page);

  // Використовуємо page.route для перехоплення запитів до '**/articles'.
  // route.continue() дозволяє модифікувати запит перед тим, як він полетить на сервер.
  // У цьому випадку ми підміняємо тіло запиту (postData) на наші дані (reqBody)
  // та додаємо кастомний хедер 'test'.
  await page.route("**/articles", async (route, request) => {
    route.continue({
      headers: { ...request.headers(), test: "test" },
      postData: reqBody,
      method: "POST",
    });
  });

  await page.goto("https://demo.learnwebdriverio.com/");

  await loginPage.navigateToSignInPage();
  await loginPage.fillInputFields({ email: "psp@gm.com", password: "1234" });
  await loginPage.clickSignUpButton();

  await page.getByRole("link", { name: "  New Article" }).click();
  await page.getByTestId("editor-title").fill("test");
  await page.getByTestId("editor-publish").click();

  // створиться артікл з данними зі змінної reqBody
});

test("підміна резспонзу с сервера", async ({ page }) => {
  // Перехоплюємо запити на отримання статей ('**/articles?*').
  await page.route("**/articles?*", async (route) => {
    // route.fetch() виконує реальний запит до сервера і отримує відповідь.
    const response = await route.fetch();

    // route.fulfill() підміняє відповідь, яку отримає браузер.
    // Ми повертаємо статус 201 та наш підготовлений JSON (responseJson) замість реальних даних,
    // але зберігаємо оригінальні хедери відповіді.
    await route.fulfill({
      headers: { ...response.headers() },
      status: 201,
      json: responseJson,
    });
  });
});

test("abort request png, jpg, jpeg", async ({ page }) => {
  // route.abort() скасовує мережевий запит.
  // Це корисно для блокування важких ресурсів (картинки, стилі, аналітика),
  // щоб пришвидшити виконання тестів, якщо візуальна складова не важлива.
  await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());

  // Перехоплюємо запити на стилі (css) і також скасовуємо їх
  await page.route("**/*.css?*", (route) => route.abort());

  await page.goto("https://telemart.ua/ua/laptops/filter/discrete/");

  // на сторінці не будуть завантажені картинки і css
});
