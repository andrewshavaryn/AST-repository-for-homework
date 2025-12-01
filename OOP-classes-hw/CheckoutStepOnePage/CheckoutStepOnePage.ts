import { BasePage } from "../BaseClasses/BasePage";
import { CheckoutStepOneLocators } from "./CheckoutStepOneLocators";
import { Page } from "@playwright/test";

export class CheckoutStepOnePage extends BasePage {
  locators: CheckoutStepOneLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutStepOneLocators(page.locator("body"));
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.locators.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.locators.lastNameInput.fill(lastName);
  }

  async fillZipCode(zipCode: string): Promise<void> {
    await this.locators.zipCodeInput.fill(zipCode);
  }

  async continue(): Promise<void> {
    await this.locators.continueButton.click();
  }

  // Заповнити всю форму одразу
  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillZipCode(zipCode);
  }

  async cancel(): Promise<void> {
    await this.locators.cancelButton.click();
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.locators.errorMessage.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    const errorText = await this.locators.errorMessage.textContent();
    return errorText?.trim() || "";
  }

  async isOnCheckoutStepOnePage(): Promise<boolean> {
    const title = await this.locators.pageTitle.textContent();
    return title?.trim() === "Checkout: Your Information";
  }
}