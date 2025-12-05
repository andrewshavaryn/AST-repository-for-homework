import { ProductCardComponent } from "../TestComponents/ProductCardComponent";
import { BasePage } from "../BaseClasses/BasePage";
import { ProductsPageLocators } from "./ProductsPageLocators";
import { Page } from "@playwright/test";

export class ProductsPage extends BasePage {
  locators: ProductsPageLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductsPageLocators(page.locator("body"));
  }

  private getBaseCardLocator = (productName: string) =>
    `//*[@data-test="inventory-item-name" and text() = '${productName}']/ancestor::div[@data-test="inventory-item"]`;

  getProductCard(productName: string) {
    const card = new ProductCardComponent(
      this.page.locator(this.getBaseCardLocator(productName))
    );
    return card;
  }

   async addToCartByTitle(productName: string): Promise<void> {
    await this.locators.getAddToCartButtonLocator(productName).click();
  }

  async removeFromCartByTitle(productName: string): Promise<void> {
    await this.locators.getRemoveButtonLocator(productName).click();
  }

  async getPriceByTitle(productName: string): Promise<string> {
    const priceText = await this.locators.getPriceLocator(productName).textContent();
    return priceText?.trim() || "";
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

  async goToCart(): Promise<void> {
    await this.locators.shoppingCartLink.click();
  }

  async isProductInCart(productName: string): Promise<boolean> {
    return await this.locators.getRemoveButtonLocator(productName).isVisible();
  }
}

