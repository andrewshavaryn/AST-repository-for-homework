import { BaseComponent } from "./BaseComponent";
import { ProductCardLocators } from "./ProductCardLocators";

export class ProductCardComponent extends BaseComponent {
  locators: ProductCardLocators = new ProductCardLocators(this.baseLocator);

  async clickAddToCart() {
    await this.locators.addToCartButtonLocator.click();
  }

  async getImage() {}

  async getPrice() {}

  async clickRemove() {}
}