import { Locator } from "@playwright/test";

export class BaseComponent {
  protected baseLocator: Locator;

  constructor(baseLocator: Locator) {
    this.baseLocator = baseLocator;
  }
}