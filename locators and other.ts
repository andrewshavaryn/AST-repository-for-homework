// CDP - Chrome DevTool Protocol

// Puppeteer
// Playwright

import { chromium, test, expect } from "@playwright/test";

// DRY - don`t repeat your self

//2 + 1 (2 обов'язкові елементи будь якого тесту: назва і функція і 1 опційний - це теги і/або анотації);

test.describe("ordering", { tag: "@smoke" }, async () => {
  test("run browsers", async ({ page, baseURL }) => {
    console.log(baseURL);
    const browser = await chromium.launch({ headless: false });
    console.log(1);
    const context = await browser.newContext();

    const page1 = await browser.newPage();
    const page2 = await browser.newPage();

    const page3 = await context.newPage();
    const page4 = await context.newPage();
  });
});

test("test page", async ({ page }) => {

  // ElementHandle (don't use it)
  await page.click('[data-testid = "Ok"]');
  await page.$("");
  await page.$$("");
  await page.fill("1", "as");

  // Locator, getBy... (please use it) (найпопулярніші click and fill, використовуються найчастіше);
  await page.locator("css selector, xpath").click();
  await page.getByRole("button").click();

  //
  await page.getByRole("button").click({ clickCount: 10 });
  await page.getByRole("button").dblclick();

  await page.getByRole("button").check();
  await page.getByRole("button").uncheck();

  await page.getByRole("button").selectOption(["blue"]);

  await page.locator("css selector, xpath").fill("this is my first fill");
  await page
    .locator("css selector, xpath")
    .pressSequentially("this is my first fill");
});




// Як створити Locator?
//const header = page.locator("h1");
// await expect(header).toHaveText("Example Domain");

//Основні методи Locator:

// 1. Дії з елементами
//locator.click(); // Клік
// locator.fill("Текст"); // Введення тексту
// locator.pressSequentially("Текст"); // Імітація набору
//locator.hover(); // Наведення миші
//locator.check(); // Вибір чекбокса
// locator.uncheck(); // Зняття вибору
// locator.selectOption("value"); // Вибір опції;

//2. Очікування:
// await locator.waitFor(); // Чекає, поки елемент стане доступним;

//3. Отримання інформації:
// await locator.textContent(); // Отримання тексту
// await locator.getAttribute("href"); // Отримання атрибута
// await locator.isVisible(); // Перевірка видимості

//4. Перевірки (Assertions):
// expect(locator).toHaveText("Example");
//expect(locator).toBeVisible();
//expect(locator).toBeEnabled();

//5. Робота зі списками:
//locator.nth(1); // Отримання конкретного елемента
//locator.first(); // Перший елемент
//locator.last(); // Останній елемент
//locator.count(); // Кількість елементів

//6. Інтерактивні методи:
//locator.focus(); // Фокус на елементі
// locator.blur(); // Зняття фокуса


//Особливості Locator:
//- Автоматичне повторення дій, якщо елемент тимчасово недоступний.
//- Підтримка складних селекторів: CSS, XPath, текстові селектори.
// Locator робить тести стабільнішими та ефективнішими, зменшуючи кількість помилок


//Запуск конкретних тестів у Playwright:

// 1. Запуск одного тестового файлу

//Щоб запустити один тестовий файл, передайте його ім'я у команду:
//npx playwright test landing-page.spec.ts

//2. Запуск тестів з кількох директорій

//Щоб запустити набір тестових файлів з різних директорій, передайте їхні шляхи:
//npx playwright test tests/todo-page/ tests/landing-page/

//3.Запуск файлів, що містять певні ключові слова у назві
// Щоб запустити файли, які містять у назві landing або login, просто передайте ці ключові слова у CLI:
// npx playwright test landing login

//4. Запуск тесту з конкретним заголовком
// Щоб запустити тест із певною назвою, використовуйте прапорець -g, після якого вкажіть заголовок тесту:
// npx playwright test -g "add a todo item"

//5. Запуск конкретних тестів у Playwright

// Запуск одного тестового файлу
// Щоб запустити один тестовий файл, передайте його ім'я у команду:
// npx playwright test landing-page.spec.ts

//6. Запуск тестів з кількох директорій
// Щоб запустити набір тестових файлів з різних директорій, передайте їхні шляхи:
// npx playwright test tests/todo-page/ tests/landing-page/