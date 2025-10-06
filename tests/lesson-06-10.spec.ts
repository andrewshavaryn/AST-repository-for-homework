// CDP - Chrome DevTool Protocol

// Puppeteer
// Playwright

import { chromium, test } from "@playwright/test";

// DRY - don`t repeat your self

//2 + 1 (2обов'язкові елементи будь якого тесту і 1 опційний);

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

test("test page", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await browser.newPage();

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
