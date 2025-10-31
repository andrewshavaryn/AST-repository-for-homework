import { test, expect, Page } from "@playwright/test";


  export function getAllLocators(page: Page) {
  const espresso = page.locator('[data-test="Espresso"]');
  const flatWhite = page.locator('[data-test="Flat_White"]');
  const americano = page.locator('[data-test="Americano"]');
  const promoMessage = page.getByText(
    "It's your lucky day! Get an extra cup of Mocha for $4."
  );
  const promoAcceptButton = page.getByRole("button", {
    name: "Yes, of course!",
  });
  const checkout = page.locator('[data-test="checkout"]');
  const successMessage = page.getByRole("button", {
    name: "Thanks for your purchase.",
  });
  const nameField = page.getByRole("textbox", { name: "Name" });
  const emailField = page.getByRole("textbox", { name: "Emai" });
  const promoCheckbox = page.getByRole("checkbox", {
    name: "Promotion checkbox",
  });
  const submitButton = page.getByRole("button", { name: "Submit" });

  return espresso
}

export async function clickOnEspresso(page: Page) {
  await page.locator('[data-test="Espresso"]');
}