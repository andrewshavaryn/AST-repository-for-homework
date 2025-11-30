import { ProductCardComponent } from "../TestComponents/ProductCardComponent";
import { BasePage } from "../BaseClasses/BasePage";
import { ProductsPageLocators } from "./ProductsPageLocators";

export class ProductsPage extends BasePage {
  private getBaseCardLocator = (productName: string) =>
    `//*[@data-test="inventory-item-name" and text() = '${productName}']/ancestor::div[@data-test="inventory-item"]`;

  getProductCard(productName: string) {
    const card = new ProductCardComponent(
      this.page.locator(this.getBaseCardLocator(productName))
    );

    return card;
  }
}