import { test, expect } from "@playwright/test";

const baseUrl = "https://demo.learnwebdriverio.com";
const titleForLoggedinUser = "conduit Home New Article";
const timestamp = Date.now();
const uniqueEmail = `test${timestamp}@gmail.com`;
const uniqueUsername = `Andrew${timestamp}`;

test(
  "VAR-0006 Log in with valid email credentials",
  {
    tag: "@Regression",
    annotation: {
      type: "description",
      description: "Log in with valid credentials",
    },
  },
  async ({ page }) => {
    const settingsLink = page.getByRole("link", { name: "Settings" });
    const logoutButton = page.getByRole("button", { name: "Or click here to logout." });
    const signInButton = page.getByRole("button", { name: "Sign in" });
    const signUpButton = page.getByRole("button", { name: "Sign up" });
    const usernameTextbox = page.getByRole("textbox", { name: "Username" });
    const emailTextbox = page.getByRole("textbox", { name: "Email" });
    const passwordTextbox = page.getByRole("textbox", { name: "Password" });
    const loggedInNavigation = page.getByRole("navigation").filter({ hasText: titleForLoggedinUser });
    const loggedOutNavigation = page.getByRole("navigation").filter({ hasText: "conduit Home Sign in Sign up" });

    
    await page.goto(baseUrl + "/register");

    const timestamp = Date.now();
    const testEmail = `user${timestamp}@gmail.com`;
    const testPassword = "test1234";
    const testUsername = `User${timestamp}`;

   
    await usernameTextbox.fill(testUsername);
    await emailTextbox.fill(testEmail);
    await passwordTextbox.fill(testPassword);
    await signUpButton.click();

    
    await expect(loggedInNavigation).toBeVisible();

  
    await settingsLink.click();
    await logoutButton.click();

   
    await expect(loggedOutNavigation).toBeVisible();

   
    await page.goto(baseUrl + "/login");
    await emailTextbox.fill(testEmail);
    await passwordTextbox.fill(testPassword);
    await signInButton.click();

    
    await expect(loggedInNavigation).toBeVisible();
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
     const emailTextbox = page.getByRole("textbox", { name: "Email" });
     const signInButton = page.getByRole("button", { name: "Sign in" });
     const errorMessageForPassword = page.getByText("password can't be blank");


    await page.goto(baseUrl + "/login");

    await(emailTextbox).fill("test31@gmail.com");
    await(signInButton ).click();

    await expect(errorMessageForPassword).toBeVisible();

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
    const passwordTextbox = page.getByRole("textbox", { name: "Password" });
    const signInButton = page.getByRole("button", { name: "Sign in" });
    const errorMessageForBlankEmail = page.getByText("email can't be blank");
    await page.goto(baseUrl + "/login");

    await(passwordTextbox).fill("test1234");
    await(signInButton).click();

    await expect(errorMessageForBlankEmail).toBeVisible();

    await expect(page).toHaveURL(baseUrl + "/login");
  }
);

test(
  "VAR-0009 Sign up with valid credentials",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Sign up with valid credentials",
    },
  },

  async ({ page }) => {
    const usernameTextbox = page.getByRole("textbox", { name: "Username" });
    const emailTextbox = page.getByRole("textbox", { name: "Email" });
    const passwordTextbox = page.getByRole("textbox", { name: "Password" });
    const signUpButton = page.getByRole("button", { name: "Sign up" });
    const loggedInNavigation = page.getByRole("navigation").filter({ hasText: titleForLoggedinUser });
    await page.goto(baseUrl + "/register");

    await usernameTextbox.fill(uniqueUsername);
    await emailTextbox.fill(uniqueEmail);
    await passwordTextbox.fill("test1234");

    await signUpButton.click();

    await expect(loggedInNavigation).toBeVisible();
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
    const usernameTextbox = page.getByRole("textbox", { name: "Username" });
    const emailTextbox = page.getByRole("textbox", { name: "Email" });
    const passwordTextbox = page.getByRole("textbox", { name: "Password" });
    const signUpButton = page.getByRole("button", { name: "Sign up" });
    const loggedInNavigation = page.getByRole("navigation").filter({ hasText: titleForLoggedinUser });
    const errorMessageForTakenEmail = page.getByText("email is already taken.");
    await page.goto(baseUrl + "/register");

    const testEmail = `best${timestamp}@gmail.com`;
    const testUsername = `User${timestamp}`;

    await usernameTextbox.fill(testUsername);
    await emailTextbox.fill(testEmail);
    await passwordTextbox.fill("test1234");

    await signUpButton.click();

    await expect(loggedInNavigation).toBeVisible();

    await page.goto(baseUrl + "/register");

    const newUsername = `NewUser${timestamp}`;
    await usernameTextbox.fill(newUsername);
    await emailTextbox.fill(testEmail); // Той же email!
    await passwordTextbox.fill("test1234");
    await signUpButton.click();

    await expect(errorMessageForTakenEmail).toBeVisible();
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
    const usernameTextbox = page.getByRole("textbox", { name: "Username" });
    const emailTextbox = page.getByRole("textbox", { name: "Email" });
    const passwordTextbox = page.getByRole("textbox", { name: "Password" });
    const signUpButton = page.getByRole("button", { name: "Sign up" });
    const errorMessageForInvalidEmail = page.getByText("email is invalid");
    await page.goto(baseUrl+"/register");

    await usernameTextbox.fill(uniqueUsername);
    await emailTextbox.fill("DiCaprio");
    await passwordTextbox.fill("test1234");

    await signUpButton.click();

    await expect(errorMessageForInvalidEmail).toBeVisible();
  }
);
