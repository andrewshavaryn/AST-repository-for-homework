import { Locator } from "@playwright/test";
import { BaseLocators } from "../BaseClasses/BaseLocators";

export class CheckoutStepOneLocators extends BaseLocators {
 
  readonly firstNameInput: Locator = this.baseLocator.locator(
    '[data-test="firstName"]'
  );

  readonly lastNameInput: Locator = this.baseLocator.locator(
    '[data-test="lastName"]'
  );

  readonly zipCodeInput: Locator = this.baseLocator.locator(
    '[data-test="postalCode"]'
  );

  readonly continueButton: Locator = this.baseLocator.locator(
    '[data-test="continue"]'
  );

  readonly cancelButton: Locator = this.baseLocator.locator(
    '[data-test="cancel"]'
  );

  readonly errorMessage: Locator = this.baseLocator.locator(
    '[data-test="error"]'
  );

  readonly pageTitle: Locator = this.baseLocator.locator('.title');
}