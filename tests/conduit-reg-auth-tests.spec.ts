import { test, expect } from "@playwright/test";

test(
  "REG-0001 Sign up with valid credentials",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Sign up with valid credentials",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/register");

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
  "REG-0002 Sign up with already taken email",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Sign up with already taken email",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/register");

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
    await page.goto("https://demo.learnwebdriverio.com/register");

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
  "REG-0003 Sign up with invalid email format",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Verify error message when email format is invalid",
    },
  },

  //Navigate to registration page
  async ({ page }) => {
    await page.goto("https://demo.learnwebdriverio.com/register");

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
