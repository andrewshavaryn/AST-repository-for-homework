import { test, expect } from "@playwright/test";

test(
  "VAR-0001 Order with 3 products and promotion product",
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
  "VAR-0002 Check that SKIP button not add new promo product to the Cart",

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
  "VAR-0003 Each subsequent discounted product (after first one) is added after adding 2 more products to the cart.",
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
  "VAR-0004 User can delete all products from the Cart and Cart is displayed as empty",
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
  "VAR-0005 User can increase and reduce quantity of products in the Cart",
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

test(
  "VAR-0006 Log in with valid email credentials",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Log in with valid credentials",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/register");

    //Create a new User
    const timestamp = Date.now();
    const testEmail = `user${timestamp}@gmail.com`;
    const testPassword = "test1234";
    const testUsername = `User${timestamp}`;

    await page.getByRole("textbox", { name: "Username" }).fill(testUsername);
    await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(testPassword);
    await page.getByRole("button", { name: "Sign up" }).click();

    //Wait for successful registration
    await expect(
      page
        .getByRole("navigation")
        .filter({ hasText: "conduit Home New Article" })
    ).toBeVisible();

    // Log out via Settings
    await page.getByRole("link", { name: "  Settings" }).click();
    await page
      .getByRole("button", { name: "Or click here to logout." })
      .click();

    //Verify log out
    await expect(
      page
        .getByRole("navigation")
        .filter({ hasText: "conduit Home Sign in Sign up" })
    ).toBeVisible();

    //Test login with valid credentials
    await page.goto("https://demo.learnwebdriverio.com/login");
    await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(testPassword);
    await page.getByRole("button", { name: "Sign in" }).click();

    //Verify successful login
    await page
      .getByRole("navigation")
      .filter({ hasText: "conduit Home New Article" })
      .click();
  }
);

test(
  "VAR-0007 User can't log in with empty password",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Negative cases for login functionality",
    },
  },

  //Navigate to Login page
  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/login");

    //Fill in valid email, leave password empty and try to log in
    await page.getByRole("textbox", { name: "Email" }).fill("test31@gmail.com");
    await page.getByRole("button", { name: "Sign in" }).click();

    //Verify error
    await expect(page.getByText("password can't be blank")).toBeVisible();

    // Verify user remains on login page
    await expect(page).toHaveURL("https://demo.learnwebdriverio.com/login");
  }
);

test(
  "VAR-0008 User can't log in with empty email",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Negative cases for login functionality",
    },
  },

  //Navigate to Login page
  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/login");

    //Fill in password, leave Email empty and try to log in
    await page.getByRole("textbox", { name: "Password" }).fill("test1234");
    await page.getByRole("button", { name: "Sign in" }).click();

    //Verify error
    await expect(page.getByText("email can't be blank")).toBeVisible();

    // Verify user remains on login page
    await expect(page).toHaveURL("/login");
  }
);

test(
  "VAR-0009 Sign up with valid credentials",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Sign up with valid credentials",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("/register");

    //Generate unique email to avoid conflicts
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@gmail.com`;
    const uniqueUsername = `Andrew${timestamp}`;

    //Fill in registration form
    await page.getByRole("textbox", { name: "Username" }).fill(uniqueUsername);
    await page.getByRole("textbox", { name: "Email" }).fill(uniqueEmail);
    await page.getByRole("textbox", { name: "Password" }).fill("test1234");

    //Submit form
    await page.getByRole("button", { name: "Sign up" }).click();

    //Wait for navigation and successful registration
    await expect(
      page
        .getByRole("navigation")
        .filter({ hasText: "conduit Home New Article" })
    ).toBeVisible();
  }
);

test(
  "VAR-0010 Sign up with already taken email",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Sign up with already taken email",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("/register");

    //Create new User
    const timestamp = Date.now();
    const testEmail = `best${timestamp}@gmail.com`;
    const testUsername = `User${timestamp}`;

    //Fill in registration form
    await page.getByRole("textbox", { name: "Username" }).fill(testUsername);
    await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Password" }).fill("test1234");

    //Submit form
    await page.getByRole("button", { name: "Sign up" }).click();

    //Wait for navigation and successful registration
    await expect(
      page
        .getByRole("navigation")
        .filter({ hasText: "conduit Home New Article" })
    ).toBeVisible();

    // Try to register with the same User
    await page.goto("/register");

    const newUsername = `NewUser${timestamp}`;
    await page.getByRole("textbox", { name: "Username" }).fill(newUsername);
    await page.getByRole("textbox", { name: "Email" }).fill(testEmail); // Той же email!
    await page.getByRole("textbox", { name: "Password" }).fill("test1234");
    await page.getByRole("button", { name: "Sign up" }).click();

    //Verify error message
    await expect(page.getByText("email is already taken.")).toBeVisible();
  }
);

test(
  "VAR-0011 Sign up with invalid email format",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Verify error message when email format is invalid",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("/register");

    //Generate unique username
    const timestamp = Date.now();
    const uniqueUsername = `Leonardo${timestamp}`;

    //Fill in registration form with invalid email
    await page.getByRole("textbox", { name: "Username" }).fill(uniqueUsername);
    await page.getByRole("textbox", { name: "Email" }).fill("DiCaprio");
    await page.getByRole("textbox", { name: "Password" }).fill("test1234");

    //Submit form
    await page.getByRole("button", { name: "Sign up" }).click();

    //Verify error message is visible
    await expect(page.getByText("email is invalid")).toBeVisible();
  }
);

test(
  "VAR-0012 User can submit the form with valid data",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Positive case for submit the form",
    },
  },

  async ({ page }) => {
    await page.goto("/text-box");

    await expect(page.locator("//*[@id='userName']")).toBeVisible();
    await page.locator("//*[@id='userName']").fill("Andrew");

    await expect(page.locator("//*[@id='userEmail']")).toBeVisible();
    await page.locator("//*[@id='userEmail']").fill("andrewtest@gmail.com");

    await expect(page.locator("//*[@id='currentAddress']")).toBeVisible();
    await page.locator("//*[@id='currentAddress']").fill("Paradise City");

    await expect(page.locator("//*[@id='permanentAddress']")).toBeVisible();
    await page.locator("//*[@id='permanentAddress']").fill("Unvgvar, Ukraine");

    await page.locator("//*[@id='submit']").click();
    await expect(page.locator("//div[@id='output']")).toBeVisible();
  }
);

test(
  "VAR-0013 All checkboxes can be selected",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Checkboxes functionality",
    },
  },

  async ({ page }) => {
    await page.goto("/checkbox");

    await page.locator("//button[@title='Expand all']").click();

    await page
      .locator("//span[text()='Home']/..//span[@class='rct-checkbox']")
      .click();

    const labels = [
      "Home",
      "Desktop",
      "Notes",
      "Commands",
      "Documents",
      "WorkSpace",
      "React",
      "Angular",
      "Veu",
      "Office",
      "Public",
      "Private",
      "Classified",
      "General",
      "Downloads",
      "Word File.doc",
      "Excel File.doc",
    ];

    for (const label of labels) {
      await expect(page.getByLabel(label)).toBeChecked();
    }
  }
);

test(
  "VAR-0014 All radio buttons can be selected one by one",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Radio Buttons functionality",
    },
  },

  async ({ page }) => {
    await page.goto("/radio-button");

    await page.locator("//label[@for='yesRadio']").click();
    await expect(page.locator("//input[@id='yesRadio']")).toBeChecked();
    await expect(
      page.locator("//p[contains(text(), 'You have selected')]")
    ).toBeVisible();

    await page.locator("//label[@for='impressiveRadio']").click();
    await expect(page.locator("//input[@id='impressiveRadio']")).toBeChecked();
    await expect(page.locator("//span[text()='Impressive']")).toBeVisible();

    await expect(page.locator("//input[@id='noRadio']")).toBeDisabled();
  }
);