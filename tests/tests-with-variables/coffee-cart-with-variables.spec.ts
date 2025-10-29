import { test, expect } from "@playwright/test";

const baseURL = "https://coffee-cart.app";
const espressoMacchiato = '[data-test="Espresso_Macchiato"]';
const cappuccino = '[data-test="Cappuccino"]';
const mocha = '[data-test="Mocha"]';
const cafeLatte = '[data-test="Cafe_Latte"]';
const espressoConPanna = '[data-test="Espresso_Con Panna"]';
const yesPromoButton = "Yes, of course!";
const skipButton = "Nah, I'll skip.";
const app = "#app";
const cart = "Cart page";
const promoItem = (quantity: number) => `(Discounted) Mocha$4.00 x ${quantity}`;
const menu = "Menu page";
const emptyCart = "No coffee, go add some.";

test(
  "VAR-0001 Order with 3 products and promotion product",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Order with 3 products and promotion product",
    },
  },

  async ({ page }) => {
    await page.goto(baseURL);
    const espresso = page.locator('[data-test="Espresso"]');
    const flatWhite = page.locator('[data-test="Flat_White"]');
    const americano = page.locator('[data-test="Americano"]');
    const promoMessage = page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    const promoAcceptButton = page.getByRole("button", { name: "Yes, of course!" });
    const checkout = page.locator('[data-test="checkout"]');
    const successMessage = page.getByRole("button", { name: "Thanks for your purchase."});
    const nameField = page.getByRole("textbox", { name: "Name"});
    const emailField = page.getByRole("textbox", { name: "Emai"});
    const promoCheckbox = page.getByRole("checkbox", { name: "Promotion checkbox" });
    const submitButton = page.getByRole("button", { name: "Submit"});
    

    await espresso.click();
    await flatWhite.click();
    await americano.click();

    await expect(promoMessage).toBeVisible();

    await promoAcceptButton.click();
    await checkout.click();

    await nameField.fill("andrew");
    await emailField.fill("andrew@gmail.com");
    await promoCheckbox.check();
    await submitButton.click();

    await expect(successMessage).toBeVisible();
  }
);

test(
  "VAR-0002 Check that SKIP button not add new promo product to the Cart",

  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description:
        "Check that SKIP button not add new promo product to the Cart",
    },
  },

  async ({ page }) => {
    const cartContent =
      "Cappuccino x 1+-Espresso x 1+-Espresso Macchiato x 1+-";
    await page.goto(baseURL);
    await page.locator(espresso).click();
    await page.locator(espressoMacchiato).click();
    await page.locator(cappuccino).click();

    await expect(page.getByText(promoMessage)).toBeVisible();

    await expect(page.locator(app)).toContainText(skipButton);
    await page.getByRole("button", { name: skipButton }).click();
    await expect(page.locator(app)).toContainText(cartContent);
  }
);

test(
  "VAR-0003 Each subsequent discounted product (after first one) is added after adding 2 more products to the cart.",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Discount logic",
    },
  },

  async ({ page }) => {
    await page.goto(baseURL);

    await page.locator(espresso).click();
    await page.locator(espressoMacchiato).click();
    await page.locator(cappuccino).click();

    await expect(page.getByText(promoMessage)).toBeVisible();

    await page.getByRole("button", { name: yesPromoButton }).click();
    await page.getByRole("link", { name: cart }).click();

    await expect(page.getByText(promoItem(1))).toBeVisible();
    await page.getByRole("link", { name: menu }).click();

    await page.locator(mocha).click();
    await page.locator(flatWhite).click();

    await expect(page.getByText(promoMessage)).toBeVisible();

    await page.getByRole("button", { name: yesPromoButton }).click();
    await page.getByRole("link", { name: cart }).click();

    await expect(page.getByText(promoItem(2))).toBeVisible();
    await page.getByRole("link", { name: menu }).click();

    await page.locator(cafeLatte).click();
    await page.locator(espressoConPanna).click();

    await expect(page.getByText(promoMessage)).toBeVisible();

    await page.getByRole("button", { name: yesPromoButton }).click();

    await page.getByRole("listitem").filter({ hasText: "cart (10)" }).click();
    await expect(page.getByText(promoItem(3))).toBeVisible();
  }
);

test(
  "VAR-0004 User can delete all products from the Cart and Cart is displayed as empty",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Delete functionality",
    },
  },

  async ({ page }) => {
    await page.goto(baseURL);

    await page.locator(flatWhite).click();
    await page.locator(americano).click();
    await page.getByRole("link", { name: cart }).click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: "Americano x 1+-Flat White x 1" })
        .nth(1)
    ).toBeVisible();

    await page.getByRole("button", { name: "Remove all Americano" }).click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: "Flat White x 1+-Total: $18." })
        .nth(1)
    ).toBeVisible();

    await page.getByRole("button", { name: "Remove all Flat White" }).click();

    await expect(
      page.locator("div").filter({ hasText: emptyCart }).first()
    ).toBeVisible();
  }
);

test(
  "VAR-0005 User can increase and reduce quantity of products in the Cart",
  {
    tag: ["@іmoke"],
    annotation: {
      type: "description",
      description: "Cart functionality",
    },
  },
  async ({ page }) => {
    const addOneEspressoMacchiato = "Add one Espresso Macchiato";
    const removeOneEspressoMacchiato = "Remove one Espresso Macchiato";
    const addOneFlatWhite = "Add one Flat White";
    const removeOneFlatWhite = "Remove one Flat White";
    await page.goto(baseURL);

    await page.locator(espressoMacchiato).click();
    await page.locator(flatWhite).click();

    await page.getByRole("link", { name: cart }).click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: "Espresso Macchiato x 1+-Flat" })
        .nth(1)
    ).toBeVisible();

    await page.getByRole("button", {name: addOneEspressoMacchiato }).click();

    await expect(page.getByText("Espresso Macchiato$12.00 x 2")).toBeVisible();

    await page.getByRole("button", {name: addOneEspressoMacchiato }).click();

    await expect(page.getByText("Espresso Macchiato$12.00 x 3")).toBeVisible();

    await page
      .getByRole("button", { name: removeOneEspressoMacchiato })
      .click();

    await expect(page.getByText("Espresso Macchiato$12.00 x 2")).toBeVisible();

    await page.getByText("Flat White$18.00 x 1+-$18.00x").click();

    await page.getByRole("button", { name: addOneFlatWhite }).click();

    await expect(page.getByText("Flat White$18.00 x 2+-$36.00x")).toBeVisible();

    await page.getByRole("button", { name: removeOneFlatWhite }).click();

    await expect(page.getByText("Flat White$18.00 x 1+-$18.00x")).toBeVisible();
  }
);
