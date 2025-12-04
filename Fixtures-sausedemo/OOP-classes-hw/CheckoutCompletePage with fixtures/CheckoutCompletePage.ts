import { BasePage } from "../BaseClasses/BasePage";
import { CheckoutCompleteLocators } from "./CheckoutCompleteLocators";
import { Page } from "@playwright/test";

export class CheckoutCompletePage extends BasePage {
  locators: CheckoutCompleteLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutCompleteLocators(page.locator("body"));
  }

  async backHome(): Promise<void> {
    await this.locators.backHomeButton.click();
  }

  async getCompleteHeader(): Promise<string> {
    const headerText = await this.locators.completeHeader.textContent();
    return headerText?.trim() || "";
  }

  async getCompleteText(): Promise<string> {
    const text = await this.locators.completeText.textContent();
    return text?.trim() || "";
  }

  async isSuccessIconVisible(): Promise<boolean> {
    return await this.locators.ponyExpressImage.isVisible();
  }

  async isOnCheckoutCompletePage(): Promise<boolean> {
    const title = await this.locators.pageTitle.textContent();
    return title?.trim() === "Checkout: Complete!";
  }

  async isOrderSuccessful(): Promise<boolean> {
    const header = await this.getCompleteHeader();
    return header.toLowerCase().includes("thank you") || 
           header.toLowerCase().includes("complete");
  }
}