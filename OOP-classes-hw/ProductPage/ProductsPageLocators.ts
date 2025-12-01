import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

export class ProductsPageLocators extends BaseLocators {
  readonly burgerMenuLocator: Locator = this.baseLocator.locator(
    "#react-burger-menu-btn"
  );

  readonly shoppingCartBadge: Locator = this.baseLocator.locator(
    ".shopping_cart_badge"
  );

  readonly shoppingCartLink: Locator = this.baseLocator.locator(
    ".shopping_cart_link"
  );

  getProductItemLocator(productName: string): Locator {
    return this.baseLocator.locator(`[data-test="inventory-item"]`).filter({
      hasText: productName
    });
  }

  getAddToCartButtonLocator(productName: string): Locator {
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
    return this.baseLocator.locator(`[data-test="add-to-cart-${productId}"]`);
  }

  getRemoveButtonLocator(productName: string): Locator {
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
    return this.baseLocator.locator(`[data-test="remove-${productId}"]`);
  }


  getPriceLocator(productName: string): Locator {
    return this.getProductItemLocator(productName).locator(
      `[data-test="inventory-item-price"]`
    );
  }

  getProductNameLocator(productName: string): Locator {
    return this.getProductItemLocator(productName).locator(
      `[data-test="inventory-item-name"]`
    );
  }

  getProductDescriptionLocator(productName: string): Locator {
    return this.getProductItemLocator(productName).locator(
      `[data-test="inventory-item-desc"]`
    );
  }

  getProductImageLocator(productName: string): Locator {
    return this.getProductItemLocator(productName).locator("img");
  }
}
