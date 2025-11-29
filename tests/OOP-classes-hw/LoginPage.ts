import { Locator, Page } from "@playwright/test";

//назва елементу (label, placeholder, name) + тип елементу (input, buttn, anchor, checkbox)

export class LoginPage {
  page: Page
  usernameInputLocator: Locator;
  passwordInputLocator: Locator;
  loginButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInputLocator = this.page.getByRole("textbox", {
      name: "Username",
    });
    this.passwordInputLocator = this.page.getByRole("textbox", {
      name: "Password",
    });
    this.loginButtonLocator = this.page.getByRole("button", {
      name: "Login",
    });
  }
}