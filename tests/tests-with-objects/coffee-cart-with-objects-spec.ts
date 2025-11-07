import { test, expect, Page } from "@playwright/test";

const baseURL = "https://coffee-cart.app";

const testData = [
  {
    id: 1,
    coffee: ["Espresso"],
    orderInfo: {
      name: "Pavlo",
      email: "test@gm.com",
    },
    expect: async (page: Page) =>
      await expect(page.locator('[class="snackbar success"]')).toBeVisible(),
  },
  {
    id: 2,
    coffee: ["Flat_White", "Americano", "Cafe_Latte"],
    orderInfo: {
      email: "test@gm.com",
    },
    expect: async (page: Page) =>
      await expect(page.locator('[class="snackbar success"]')).toBeVisible({
        visible: false,
      }),
  },
];

// деструктурізація обʼєкту
// for (const { id, coffee, orderInfo } of testData) {
for (const data of testData) {
  test(`PS-001${data.id} param`, async ({ page }) => {
    await page.goto("https://coffee-cart.app/");

    for (const drink of data.coffee) {
      await page.locator(`[data-test="${drink}"]`).click();
    }
    await page.locator('[data-test="checkout"]').click();

    for (const key in data.orderInfo) {
      await page.getByRole("textbox", { name: key }).fill(data.orderInfo[key]);
    }

    await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
    await page.getByRole("button", { name: "Submit" }).click();

    await data.expect(page);
  });
}

