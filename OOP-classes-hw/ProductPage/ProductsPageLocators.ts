import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

export class ProductsPageLocators extends BaseLocators {
    readonly burgerMenuLocator: Locator = this.baseLocator.locator(
    "#react-burger-menu-btn"
  );
}
