import { SignInPage } from "../../app/ui/pages/SignInPage";
import { test, expect, Request, Response } from "@playwright/test";

test("приклади роботи з request", async ({ page }) => {
  const loginPage = new SignInPage(page);

  // Слухач подій (Event Listener) для перехоплення всіх запитів на сторінці.
  // Дозволяє логувати, аналізувати або моніторити трафік в реальному часі.
  page.on("request", (req: Request) => {
    if (req.resourceType() === "xhr") {
      console.log(req.timing());
    }
  });

  await loginPage.navigateToSignInPage();
  await loginPage.fillInputFields({ email: "psp@gm.com", password: "1234" });

  // https://conduit-api.learnwebdriverio.com/api/users/login

  // Glob patterns (шаблони пошуку):
  // *  - замінює будь-яку кількість символів в межах однієї частини шляху (не включає /)
  // ** - замінює будь-яку кількість символів, включаючи вкладені папки (включає /)

  // Приклади:
  // **/login       -> знайде будь-який шлях, що закінчується на /login (наприклад, api/users/login)
  // **/users/login -> знайде будь-який шлях, що закінчується на /users/login
  // Правильний патерн очікування відповіді:
  // 1. Створюємо проміс очікування (waitForResponse) ДО виконання дії.
  // 2. Виконуємо дію, що тригерить запит (клік).
  // 3. Чекаємо на виконання промісу (await promise).
  // Це гарантує, що ми не пропустимо відповідь, якщо вона прийде дуже швидко.
  let promise = page.waitForResponse("**/users/login");
  await loginPage.clickSignUpButton();
  let response: Response = await promise;

  await page.getByRole("link", { name: "  New Article" }).click();
  await page.getByRole("textbox", { name: "Write your article (in" }).fill("t");
  await page.getByTestId("editor-title").fill("test");

  // Аналогічний патерн для перехоплення ЗАПИТУ (Request), а не відповіді.
  // Корисно, коли треба перевірити, що саме ми відправляємо на сервер (payload, headers).
  const reqPromise = page.waitForRequest("**/articles");
  await page.getByTestId("editor-publish").click();
  const request: Request = await reqPromise;

  // Отримуємо тіло відповіді як JSON об'єкт для перевірки даних
  const slug = (await response.json()).article.slug;
  expect(slug).toBeTruthy();

  // Отримуємо масив з останніх 100 запитів та фільтруємо їх.
  // Це дозволяє знайти "повільні" запити, що виконувались довше 400мс.
  const requests = await page.requests();

  const filteredRequest = requests.filter((request) => {
    if (request.timing().responseEnd > 400) {
      console.warn(
        `${request.url()} takes  ${request.timing().responseEnd} to execute`
      );
      return request;
    }
  });
});
