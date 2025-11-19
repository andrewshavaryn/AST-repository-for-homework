import { Page } from "@playwright/test";
export class BasePage {
  protected page: Page;
  private someProp: string = "12515";

  constructor(page: Page) {
    this.page = page;
  }

  public async clickOnRegisterLink() {
    await this.page.locator('//a[@href="/register"]').click();
  }
}

// модифікатори доступ
// синтаксичний цукор
export class RegistrationPage extends BasePage {
  readonly url: string = "https://demo.learnwebdriverio.com/register";
  private fillUsername = async (username: string) =>
    await this.page.locator('//input[@placeholder="Username"]').fill(username);

  private fillEmail = async (email: string) =>
    await this.page.locator('//input[@placeholder="Email"]').fill(email);

  private fillPassword = async (password: string) =>
    await this.page.locator('//input[@placeholder="Password"]').fill(password);

  private clickSignUp = async () =>
    await this.page.locator(`//button[contains(text(), 'Sign up')]`).click();

  async register(username: string, email: string, password: string) {
    await this.fillUsername(`${username}`);
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignUp();
  }

  // this.consoleLogThis = () => console.log(this);
}