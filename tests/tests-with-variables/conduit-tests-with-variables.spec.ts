import { test, expect } from "@playwright/test";

const baseUrl = "https://demo.learnwebdriverio.com";
const titleForLoggedinUser = "conduit Home New Article";
const settings = "  Settings";
const logout = "Or click here to logout.";
const signInButton = "Sign in";
const signUpButton = "Sign up";
const emailField = "Email";
const passwordField = "Password";
const usernameField = "Username";
const errorMessageForPassword = "password can't be blank";
const errorMessageForBlankEmail = "email can't be blank";
const errorMessageForTakenEmail = "email is already taken.";
const errorMessageForInvalidEmail = "email is invalid"
const timestamp = Date.now();
const uniqueEmail = `test${timestamp}@gmail.com`;
const uniqueUsername = `Andrew${timestamp}`;

test(
  "VAR-0006 Log in with valid email credentials",
  {
    tag: ["@Regression"],
    annotation: {
      type: "description",
      description: "Log in with valid credentials",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl + "/register");

    const timestamp = Date.now();
    const testEmail = `user${timestamp}@gmail.com`;
    const testPassword = "test1234";
    const testUsername = `User${timestamp}`;

    await page.getByRole("textbox", { name: "Username" }).fill(testUsername);
    await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
    await page.getByRole("textbox", { name: "Password" }).fill(testPassword);
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(
      page.getByRole("navigation").filter({ hasText: titleForLoggedinUser })
    ).toBeVisible();

    await page.getByRole("link", { name: settings }).click();

    await page.getByRole("button", { name: logout }).click();

    await expect(
      page
        .getByRole("navigation")
        .filter({ hasText: "conduit Home Sign in Sign up" })
    ).toBeVisible();

    await page.goto(baseUrl + "/login");
    await page.getByRole("textbox", { name: emailField }).fill(testEmail);
    await page.getByRole("textbox", { name: passwordField }).fill(testPassword);
    await page.getByRole("button", { name: signInButton }).click();

    await page
      .getByRole("navigation")
      .filter({ hasText: titleForLoggedinUser })
      .click();
  }
);

test(
  "VAR-0007 User can't log in with empty password",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Negative cases for login functionality",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl + "/login");

    await page
      .getByRole("textbox", { name: emailField })
      .fill("test31@gmail.com");
    await page.getByRole("button", { name: signInButton }).click();

    await expect(page.getByText(errorMessageForPassword)).toBeVisible();

    await expect(page).toHaveURL(baseUrl + "/login");
  }
);

test(
  "VAR-0008 User can't log in with empty email",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Negative cases for login functionality",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl + "/login");

    await page.getByRole("textbox", { name: passwordField }).fill("test1234");
    await page.getByRole("button", { name: signInButton }).click();

    await expect(page.getByText(errorMessageForBlankEmail)).toBeVisible();

    await expect(page).toHaveURL(baseUrl + "/login");
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

  async ({ page }) => {
    await page.goto(baseUrl + "/register");

    await page
      .getByRole("textbox", { name: usernameField })
      .fill(uniqueUsername);
    await page.getByRole("textbox", { name: emailField }).fill(uniqueEmail);
    await page.getByRole("textbox", { name: passwordField }).fill("test1234");

    await page.getByRole("button", { name: signUpButton }).click();

    await expect(
      page.getByRole("navigation").filter({ hasText: titleForLoggedinUser })
    ).toBeVisible();
  }
);

test(
  "VAR-0010 Sign up with already taken email",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Sign up with already taken email",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl + "/register");

    const testEmail = `best${timestamp}@gmail.com`;
    const testUsername = `User${timestamp}`;

    await page.getByRole("textbox", {name: usernameField }).fill(testUsername);
    await page.getByRole("textbox", {name: emailField }).fill(testEmail);
    await page.getByRole("textbox", {name: passwordField }).fill("test1234");

    await page.getByRole("button", {name: signUpButton }).click();

    await expect(
      page.getByRole("navigation").filter({hasText: titleForLoggedinUser })
    ).toBeVisible();

    await page.goto(baseUrl + "/register");

    const newUsername = `NewUser${timestamp}`;
    await page.getByRole("textbox", { name: usernameField }).fill(newUsername);
    await page.getByRole("textbox", { name: emailField }).fill(testEmail); // Той же email!
    await page.getByRole("textbox", { name: passwordField }).fill("test1234");
    await page.getByRole("button", { name: signUpButton }).click();

    await expect(page.getByText(errorMessageForTakenEmail)).toBeVisible();
  }
);



test(
  "VAR-0011 Sign up with invalid email format",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Verify error message when email format is invalid",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl+"/register");

    await page.getByRole("textbox", {name: usernameField }).fill(uniqueUsername);
    await page.getByRole("textbox", {name: emailField}).fill("DiCaprio");
    await page.getByRole("textbox", {name: passwordField}).fill("test1234");

    await page.getByRole("button", {name: signUpButton}).click();

    await expect(page.getByText(errorMessageForInvalidEmail)).toBeVisible();
  }
);
