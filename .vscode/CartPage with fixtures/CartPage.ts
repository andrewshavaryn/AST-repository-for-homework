import { BasePage } from "../BaseClasses/BasePage";
import { CartPageLocators } from "./CartPageLocators";
import { Page } from "@playwright/test";

export class CartPage extends BasePage {
  locators: CartPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartPageLocators(page.locator("body"));
  }

  async removeFromCartByTitle(productName: string): Promise<void> {
    await this.locators.getRemoveButtonLocator(productName).click();
  }

  async getPriceByTitle(productName: string): Promise<string> {
    const priceText = await this.locators
      .getPriceLocator(productName)
      .textContent();
    return priceText?.trim() || "";
  }

  async checkout(): Promise<void> {
    await this.locators.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.locators.continueShoppingButton.click();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    return await this.locators.getCartItemLocator(productName).isVisible();
  }

  async getCartItemCount(): Promise<number> {
    const badge = this.locators.shoppingCartBadge;
    const isVisible = await badge.isVisible();

    if (!isVisible) {
      return 0;
    }

    const count = await badge.textContent();
    return parseInt(count || "0", 10);
  }

  async getCartItemsCount(): Promise<number> {
    const items = await this.page
      .locator('[data-test="inventory-item"]')
      .count();
    return items;
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.getCartItemsCount();
    return count === 0;
  }
}
