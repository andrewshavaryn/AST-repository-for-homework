import { Locator } from "@playwright/test";

export class BaseLocators {
  protected baseLocator: Locator;

  constructor(baseLocator: Locator) {
    this.baseLocator = baseLocator;
  }
}
