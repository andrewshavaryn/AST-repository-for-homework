import { Locator } from "@playwright/test";
import { BaseLocators } from "./Base/BaseLocators";

export class LoginPageLocators extends BaseLocators {
  readonly usernameInputLocator: Locator = this.baseLocator.getByRole(
    "textbox",
    {
      name: "Username",
    }
  );

  readonly passwordInputLocator: Locator = this.baseLocator.getByRole(
    "textbox",
    {
      name: "Password",
    }
  );

  readonly loginButtonLocator: Locator = baseLocator.getByRole("button", {
    name: "Login",
  });
}
