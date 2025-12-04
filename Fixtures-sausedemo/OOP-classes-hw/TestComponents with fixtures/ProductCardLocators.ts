import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

export class ProductCardLocators extends BaseLocators {
  readonly addToCartButtonLocator: Locator = this.baseLocator.getByRole(
    "button",
    {
      name: "Add to cart",
    }
  );
}