import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

//SOLID
//Single responsibility

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

  readonly loginButtonLocator: Locator = this.baseLocator.getByRole("button", {
    name: "Login",
  });

  readonly errorMessageLocator: Locator = this.baseLocator.locator(
    ".error-message-container h3"
  );
}
