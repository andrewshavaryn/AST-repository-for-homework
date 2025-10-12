import { test, expect } from "@playwright/test";

test(
  "CSS-0001 Order with 3 products and promotion product",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Order with 3 products and promotion product",
    },
  },

  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="Americano"]').click();
    await expect(
      page.getByText(
        "It's your lucky day! Get an extra cup of Mocha for $4.espressochocolate"
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Yes, of course!" }).click();
    await page.locator('[data-test="checkout"]').click();
    await page.getByRole("textbox", { name: "Name" }).fill("andrew");
    await page.getByRole("textbox", { name: "Email" }).fill("andrew@gmail.com");
    await page.getByRole("checkbox", { name: "Promotion checkbox" }).check();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(
      page.getByRole("button", { name: "Thanks for your purchase." })
    ).toBeVisible();
  }
);

test(
  "CSS-0002 Check that SKIP button not add new promo product to the Cart",

  {
    tag: ["@Smoke"],
    annotation: {
      type: "description",
      description:
        "Check that SKIP button not add new promo product to the Cart",
    },
  },

  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(
      page.getByText(
        "It's your lucky day! Get an extra cup of Mocha for $4.espressochocolate"
      )
    ).toBeVisible();
    await expect(page.locator("#app")).toContainText("Nah, I'll skip.");
    await page.getByRole("button", { name: "Nah, I'll skip." }).click();
    await expect(page.locator("#app")).toContainText(
      "Cappuccino x 1+-Espresso x 1+-Espresso Macchiato x 1+-"
    );
  }
);

test(
  "CSS-0003 Each subsequent discounted product (after first one) is added after adding 2 more products to the cart.",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Discount logic",
    },
  },

  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(
      page.getByText(
        "It's your lucky day! Get an extra cup of Mocha for $4.espressochocolate"
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Yes, of course!" }).click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(page.getByText("(Discounted) Mocha$4.00 x 1")).toBeVisible();
    await page.getByRole("link", { name: "Menu page" }).click();
    await page.locator('[data-test="Mocha"]').click();
    await page.locator('[data-test="Flat_White"]').click();
    await expect(
      page.getByText(
        "It's your lucky day! Get an extra cup of Mocha for $4.espressochocolate"
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Yes, of course!" }).click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(page.getByText("(Discounted) Mocha$4.00 x 2")).toBeVisible();
    await page.getByRole("link", { name: "Menu page" }).click();
    await page.locator('[data-test="Cafe_Latte"]').click();
    await page.locator('[data-test="Espresso_Con Panna"]').click();
    await expect(
      page.getByText(
        "It's your lucky day! Get an extra cup of Mocha for $4.espressochocolate"
      )
    ).toBeVisible();
    await page.getByRole("button", { name: "Yes, of course!" }).click();
    await page.getByRole("listitem").filter({ hasText: "cart (10)" }).click();
    await expect(page.getByText("(Discounted) Mocha$4.00 x 3")).toBeVisible();
  }
);

test(
  "CSS-0004 User can delete all products from the Cart and Cart is displayed as empty",
  {
    tag: ["@Smoke"],
    annotation: {
      type: "description",
      description: "Delete functionality",
    },
  },

  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="Americano"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();

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
      page.locator("div").filter({ hasText: /^No coffee, go add some\.$/ })
    ).toBeVisible();
  }
);

test(
  "CSS-0005 User can increase and reduce quantity of products in the Cart",
  {
    tag: ["@Smoke"],
    annotation: {
      type: "description",
      description: "Cart functionality",
    },
  },
  async ({ page }) => {
    await page.goto("https://coffee-cart.app/");
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Flat_White"]').click();
    await page.getByRole("link", { name: "Cart page" }).click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: "Espresso Macchiato x 1+-Flat" })
        .nth(1)
    ).toBeVisible();
    await page
      .getByRole("button", { name: "Add one Espresso Macchiato" })
      .click();
    await expect(page.getByText("Espresso Macchiato$12.00 x 2")).toBeVisible();
    await page
      .getByRole("button", { name: "Add one Espresso Macchiato" })
      .click();
    await expect(page.getByText("Espresso Macchiato$12.00 x 3")).toBeVisible();
    await page
      .getByRole("button", { name: "Remove one Espresso Macchiato" })
      .click();
    await expect(page.getByText("Espresso Macchiato$12.00 x 2")).toBeVisible();
    await page.getByText("Flat White$18.00 x 1+-$18.00x").click();
    await page.getByRole("button", { name: "Add one Flat White" }).click();
    await expect(page.getByText("Flat White$18.00 x 2+-$36.00x")).toBeVisible();
    await page.getByRole("button", { name: "Remove one Flat White" }).click();
    await expect(page.getByText("Flat White$18.00 x 1+-$18.00x")).toBeVisible();
  }
);
