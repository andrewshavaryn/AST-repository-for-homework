import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

export class CartPageLocators extends BaseLocators {
  readonly checkoutButton: Locator = this.baseLocator.locator(
    '[data-test="checkout"]'
  );

  readonly continueShoppingButton: Locator = this.baseLocator.locator(
    '[data-test="continue-shopping"]'
  );

  // Badge кошика
  readonly shoppingCartBadge: Locator = this.baseLocator.locator(
    ".shopping_cart_badge"
  );

  // Заголовок сторінки
  readonly cartTitle: Locator = this.baseLocator.locator(
    '.title'
  );

  // Методи для отримання локаторів конкретного продукту

  // Елемент продукту в кошику за назвою
  getCartItemLocator(productName: string): Locator {
    return this.baseLocator.locator('[data-test="inventory-item"]').filter({
      hasText: productName
    });
  }

  // Кнопка Remove для конкретного продукту
  getRemoveButtonLocator(productName: string): Locator {
    const productId = productName.toLowerCase().replace(/\s+/g, "-");
    return this.baseLocator.locator(`[data-test="remove-${productId}"]`);
  }

  // Ціна конкретного продукту в кошику
  getPriceLocator(productName: string): Locator {
    return this.getCartItemLocator(productName).locator(
      '[data-test="inventory-item-price"]'
    );
  }

  // Назва продукту
  getProductNameLocator(productName: string): Locator {
    return this.getCartItemLocator(productName).locator(
      '[data-test="inventory-item-name"]'
    );
  }

  // Кількість (quantity) продукту
  getProductQuantityLocator(productName: string): Locator {
    return this.getCartItemLocator(productName).locator(
      '.cart_quantity'
    );
  }
}