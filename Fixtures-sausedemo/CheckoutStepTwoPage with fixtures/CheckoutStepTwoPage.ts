import { BasePage } from "../BaseClasses/BasePage";
import { CheckoutStepTwoLocators } from "./CheckoutStepTwoLocators";
import { Page } from "@playwright/test";

export class CheckoutStepTwoPage extends BasePage {
  locators: CheckoutStepTwoLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutStepTwoLocators(page.locator("body"));
  }

  async finish(): Promise<void> {
    await this.locators.finishButton.click();
  }

  async cancel(): Promise<void> {
    await this.locators.cancelButton.click();
  }

  async getPaymentInfo(): Promise<string> {
    const paymentText = await this.locators.paymentInfoValue.textContent();
    return paymentText?.trim() || "";
  }

  async getShippingInfo(): Promise<string> {
    const shippingText = await this.locators.shippingInfoValue.textContent();
    return shippingText?.trim() || "";
  }

  async getSubtotal(): Promise<string> {
    const subtotalText = await this.locators.subtotalLabel.textContent();
    return subtotalText?.trim() || "";
  }

  async getTax(): Promise<string> {
    const taxText = await this.locators.taxLabel.textContent();
    return taxText?.trim() || "";
  }

  async getTotal(): Promise<string> {
    const totalText = await this.locators.totalLabel.textContent();
    return totalText?.trim() || "";
  }

  async getProductPrice(productName: string): Promise<string> {
    const priceText = await this.locators
      .getProductPriceLocator(productName)
      .textContent();
    return priceText?.trim() || "";
  }

  async isProductInOverview(productName: string): Promise<boolean> {
    return await this.locators.getCartItemLocator(productName).isVisible();
  }

  async getItemsCount(): Promise<number> {
    return await this.locators.cartItems.count();
  }

  async isOnCheckoutStepTwoPage(): Promise<boolean> {
    const title = await this.locators.pageTitle.textContent();
    return title?.trim() === "Checkout: Overview";
  }
}