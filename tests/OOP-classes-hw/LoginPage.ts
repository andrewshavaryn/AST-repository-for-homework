import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

//назва елементу (label, placeholder, name) + тип елементу (input, buttn, anchor, checkbox)

//реалізовуємо патерни FACADE, ADAPTER

//IS A
//HAS A
export class LoginPage extends BasePage {
  readonly usernameInputLocator: Locator = this.page.getByRole("textbox", {
    name: "Username",
  });

  readonly passwordInputLocator: Locator = this.page.getByRole("textbox", {
    name: "Password",
  });

  readonly loginButtonLocator: Locator = this.page.getByRole("button", {
    name: "Login",
  });

  constructor(page: Page) {
    super(page);
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInputLocator.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInputLocator.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButtonLocator.click();
  }
}
