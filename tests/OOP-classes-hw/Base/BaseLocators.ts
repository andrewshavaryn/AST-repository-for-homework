import {Page} from "@playwright/test"

export class BaseLocators {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
   
  }
}