import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

export class CartPageLocators extends BaseLocators {
  readonly checkoutButton: Locator = this.baseLocator.locator(
    '[data-test="checkout"]'
  );

  readonly continueShoppingButton: Locator = this.baseLocator.locator(
    '[data-test="continue-shopping"]'
  );

  readonly shoppingCartBadge: Locator = this.baseLocator.locator(
    ".shopping_cart_badge"
  );

  readonly cartTitle: Locator = this.baseLocator.locator(
    '.title'
  );


  getCartItemLocator(productName: string): Locator {
    return this.baseLocator.locator('[data-test="inventory-item"]').filter({
      hasText: productName
    });
  }

  getRemoveButtonLocator(productName: string): Locator {
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
    return this.baseLocator.locator(`[data-test="remove-${productId}"]`);
  }

  getPriceLocator(productName: string): Locator {
    return this.getCartItemLocator(productName).locator(
      '[data-test="inventory-item-price"]'
    );
  }

  getProductNameLocator(productName: string): Locator {
    return this.getCartItemLocator(productName).locator(
      '[data-test="inventory-item-name"]'
    );
  }

  getProductQuantityLocator(productName: string): Locator {
    return this.getCartItemLocator(productName).locator(
      '.cart_quantity'
    );
  }
}