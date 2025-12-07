import { test, expect } from "@playwright/test";

test(
  "AUTH-0001 Log in with valid email credentials",
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
  "AUTH-0002 User can't log in with empty password",
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
  "AUTH-0003 User can't log in with empty email",
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