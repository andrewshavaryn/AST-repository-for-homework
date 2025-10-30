import { test, expect } from "@playwright/test";

const baseURL = "https://coffee-cart.app";

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
    const promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    const promoAcceptButton = page.getByRole("button", {
      name: "Yes, of course!",
    });
    const checkout = page.locator('[data-test="checkout"]');
    const successMessage = page.getByRole("button", {
      name: "Thanks for your purchase.",
    });
    const nameField = page.getByRole("textbox", { name: "Name" });
    const emailField = page.getByRole("textbox", { name: "Emai" });
    const promoCheckbox = page.getByRole("checkbox", {
      name: "Promotion checkbox",
    });
    const submitButton = page.getByRole("button", { name: "Submit" });

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
    const espressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
    const espresso = page.locator('[data-test="Espresso"]');
    const cappuccino = page.locator('[data-test="Cappuccino"]');
    const promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    const app = page.locator("#app");
    const skipButton = page.getByRole("button", { name: "Nah, I'll skip." });

    await page.goto(baseURL);
    await espresso.click();
    await espressoMacchiato.click();
    await cappuccino.click();

    await expect(promoMessage).toBeVisible();

    await skipButton.click();
    await expect(app).toContainText(cartContent);
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
    const espressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
    const espresso = page.locator('[data-test="Espresso"]');
    const cappuccino = page.locator('[data-test="Cappuccino"]');
    const promoMessage = page.getByText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );
    const yesPromoButton = page.getByRole("button", {
      name: "Yes, of course!",
    });
    const cart = page.getByRole("link", { name: "Cart page" });
    const promoItem = (quantity: number) =>
      `(Discounted) Mocha$4.00 x ${quantity}`;
    const menu = page.getByRole("link", { name: "Menu page" });
    const mocha = page.locator('[data-test="Mocha"]');
    const flatWhite = page.locator('[data-test="Flat_White"]');
    const cafeLatte = page.locator('[data-test="Cafe_Latte"]');
    const espressoConPanna = page.locator('[data-test="Espresso_Con Panna"]');

    await espresso.click();
    await espressoMacchiato.click();
    await cappuccino.click();

    await expect(promoMessage).toBeVisible();

    await yesPromoButton.click();
    await cart.click();

    await expect(page.getByText(promoItem(1))).toBeVisible();
    await menu.click();

    await mocha.click();
    await flatWhite.click();

    await expect(promoMessage).toBeVisible();

    await yesPromoButton.click();
    await cart.click();

    await expect(page.getByText(promoItem(2))).toBeVisible();
    await menu.click();

    await cafeLatte.click();
    await espressoConPanna.click();

    await expect(promoMessage).toBeVisible();

    await yesPromoButton.click();

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
    const flatWhite = page.locator('[data-test="Flat_White"]');
    const americano = page.locator('[data-test="Americano"]');
    const cart = page.getByRole("link", { name: "Cart page" });
    const emptyCart = page.getByText("No coffee, go add some.");
    const removeAmericano = page.getByRole("button", {
      name: "Remove all Americano",
    });
    const removeFlatWhite = page.getByRole("button", {
      name: "Remove all Flat White",
    });

    await flatWhite.click();
    await americano.click();
    await cart.click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: "Americano x 1+-Flat White x 1" })
        .nth(1)
    ).toBeVisible();

    await removeAmericano.click();

    await expect(
      page
        .locator("div")
        .filter({ hasText: "Flat White x 1+-Total: $18." })
        .nth(1)
    ).toBeVisible();

    await removeFlatWhite.click();

    await expect(emptyCart).toBeVisible();
  }
);

test(
  "VAR-0005 User can increase and reduce quantity of products in the Cart",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Cart functionality",
    },
  },
  async ({ page }) => {
    const espressoMacchiato = page.locator('[data-test="Espresso_Macchiato"]');
    const flatWhite = page.locator('[data-test="Flat_White"]');
    const cart = page.getByRole("link", { name: "Cart page" });
    const addOneEspressoMacchiato = page.getByRole("button", {
      name: "Add one Espresso Macchiato",
    });
    const removeOneEspressoMacchiato = page.getByRole("button", {
      name: "Remove one Espresso Macchiato",
    });
    const addOneFlatWhite = page.getByRole("button", {
      name: "Add one Flat White",
    });
    const removeOneFlatWhite = page.getByRole("button", {
      name: "Remove one Flat White",
    });
    const espressoMacchiatoQuantity = (quantity: number) =>
      page.getByText(`Espresso Macchiato$12.00 x ${quantity}`);
    const flatWhiteQuantity = (quantity: number) =>
      page.getByText(`Flat White$18.00 x ${quantity}`);
    const cartItems = page
      .locator("div")
      .filter({ hasText: "Espresso Macchiato x 1+-Flat" })
      .nth(1);
    await page.goto(baseURL);

    await espressoMacchiato.click();
    await flatWhite.click();

    await cart.click();
    await expect(cartItems).toBeVisible();

    await addOneEspressoMacchiato.click();
    await expect(espressoMacchiatoQuantity(2)).toBeVisible();

    await addOneEspressoMacchiato.click();
    await expect(espressoMacchiatoQuantity(3)).toBeVisible();

    await removeOneEspressoMacchiato.click();
    await expect(espressoMacchiatoQuantity(2)).toBeVisible();

    await flatWhiteQuantity(1).click();

    await addOneFlatWhite.click();
    await expect(flatWhiteQuantity(2)).toBeVisible();

    await removeOneFlatWhite.click();
    await expect(flatWhiteQuantity(1)).toBeVisible();
  }
);
