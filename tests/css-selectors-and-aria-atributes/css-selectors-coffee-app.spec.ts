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
    await page.goto("/");
    await page.locator('[aria-label="Espresso"]').click();
    await page.locator('[aria-label="Flat White"]').click();
    await page.locator('[aria-label="Americano"]').click();

    await expect(page.locator(".promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );

    await page.locator('button:has-text("Yes, of course!")').click();

    await page.locator('[aria-label="Proceed to checkout"]').click();

    await page.locator('input[name="name"]').fill("andrew");
    await page.locator('input[type="email"]').fill("andrew@gmail.com");

    await page.locator('[aria-label="Promotion checkbox"]').check();

    await page.locator('button[type="submit"]').click();

    await expect(page.locator(".snackbar.success")).toBeVisible();
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
    await page.goto("/");

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();

    await expect(page.locator(".promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );

    await expect(
      page.locator('button:has-text("Nah, I\'ll skip.")')
    ).toBeVisible();

    await page.locator('[aria-label="Cart page"]').click();

    await expect(page.locator("li.list-item:has(button.delete)")).toHaveCount(
      3
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
    await page.goto("/");

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();

    await expect(page.locator(".promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );

    await page.locator('button:has-text("Yes, of course!")').click();

    await page.locator('[aria-label="Cart page"]').click();

    await expect(
      page.locator("text=(Discounted) Mocha$4.00 x 1")
    ).toBeVisible();

    await page.locator('[aria-label="Menu page"]').click();

    await page.locator('[data-test="Mocha"]').click();
    await page.locator('[data-test="Flat_White"]').click();

    await expect(page.locator(".promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );

    await page.locator('button:has-text("Yes, of course!")').click();

    await page.locator('[aria-label="Cart page"]').click();

    await expect(
      page.locator("text=(Discounted) Mocha$4.00 x 2")
    ).toBeVisible();

    await page.locator('[aria-label="Menu page"]').click();

    await page.locator('[data-test="Cafe_Latte"]').click();
    await page.locator('[data-test="Espresso_Con Panna"]').click();

    await expect(page.locator(".promo")).toContainText(
      "It's your lucky day! Get an extra cup of Mocha for $4."
    );

    await page.locator('button:has-text("Yes, of course!")').click();

    await page.locator('[aria-label="Cart page"]').click();

    await expect(
      page.locator("text=(Discounted) Mocha$4.00 x 3")
    ).toBeVisible();
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
    await page.goto("/");
    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="Americano"]').click();

    await page.locator('[aria-label="Cart page"]').click();

    await expect(page.locator("li.list-item:has(button.delete)")).toHaveCount(
      2
    );

    await page.locator('button[aria-label="Remove all Americano"]').click();

    await expect(page.locator("li.list-item:has(button.delete)")).toHaveCount(
      1
    );

    await page.locator('button[aria-label="Remove all Flat White"]').click();

    await expect(page.locator("text=No coffee, go add some.")).toBeVisible();
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
    await page.goto("/");
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Flat_White"]').click();

    await page.locator('[aria-label="Cart page"]').click();

    await expect(page.locator("li.list-item:has(button.delete)")).toHaveCount(
      2
    );

    await expect(page.getByText("Espresso Macchiato$12.00 x 1")).toBeVisible();
    await expect(page.getByText("Flat White$18.00 x 1")).toBeVisible();

    await page
      .locator('li.list-item:has(button.delete):has-text("Espresso Macchiato")')
      .locator('button[aria-label="Add one Espresso Macchiato"]')
      .click();
    await expect(page.getByText("Espresso Macchiato$12.00 x 2")).toBeVisible();

    await page
      .locator('li.list-item:has(button.delete):has-text("Espresso Macchiato")')
      .locator('button[aria-label="Add one Espresso Macchiato"]')
      .click();
    await expect(page.getByText("Espresso Macchiato$12.00 x 3")).toBeVisible();

    await page
      .locator('li.list-item:has(button.delete):has-text("Espresso Macchiato")')
      .locator('button[aria-label="Remove one Espresso Macchiato"]')
      .click();
    await expect(page.getByText("Espresso Macchiato$12.00 x 2")).toBeVisible();

    await page
      .locator('li.list-item:has(button.delete):has-text("Flat White")')
      .locator('button[aria-label="Add one Flat White"]')
      .click();
    await expect(page.getByText("Flat White$18.00 x 2")).toBeVisible();

    await page
      .locator('li.list-item:has(button.delete):has-text("Flat White")')
      .locator('button[aria-label="Remove one Flat White"]')
      .click();
    await expect(page.getByText("Flat White$18.00 x 1")).toBeVisible();
  }
);
