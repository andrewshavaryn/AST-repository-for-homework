import { BasePage } from "../BaseClasses/BasePage";
import { LoginPageLocators } from "./LoginPageLocators";

//назва елементу (label, placeholder, name) + тип елементу (input, button, anchor, checkbox)

//реалізовуємо патерни FACADE + ADAPTER = PageObject

//IS A — успадкування
//HAS A — композиція

export class LoginPage extends BasePage {
  readonly locators: LoginPageLocators = new LoginPageLocators(
    this.page.locator('[data-test="login-container"]')
  );

  // Метод переходу на тестовий сайт
  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com/");
  }

  //метод логіну (об'єднано всі інші методи)
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator('[data-test="error"]');
    return (await errorLocator.textContent()) || "";
  }

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
