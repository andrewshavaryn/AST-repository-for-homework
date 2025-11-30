import { BasePage } from "./Base/BasePage";
import { LoginPageLocators } from "./LoginPageLocators";

//назва елементу (label, placeholder, name) + тип елементу (input, buttn, anchor, checkbox)

//реалізовуємо патерни FACADE + ADAPTER = PageObject

//IS A - успадкування
//HAS A - композиція
export class LoginPage extends BasePage {
readonly locators: LoginPageLocators = new LoginPageLocators(this.page);

  async fillUsername(username: string): Promise<void> {
    await this.locators.usernameInputLocator.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.locators.passwordInputLocator.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.locators.loginButtonLocator.click();
  }
}


