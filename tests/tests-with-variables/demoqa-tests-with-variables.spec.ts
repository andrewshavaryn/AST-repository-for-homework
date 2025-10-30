import { test, expect } from "@playwright/test";

const baseUrl = "https://demoqa.com";

test(
  "VAR-0012 User can submit the form with valid data",
  {
    tag: ["@smoke"],
    annotation: {
      type: "description",
      description: "Positive case for submit the form",
    },
  },

  async ({ page }) => {
    const userNameInput = page.locator("//*[@id='userName']");
    const userEmailInput = page.locator("//*[@id='userEmail']");
    const currentAddressInput = page.locator("//*[@id='currentAddress']");
    const permanentAddressInput = page.locator("//*[@id='permanentAddress']");
    const submitButton = page.locator("//*[@id='submit']");
    const outputSection = page.locator("//div[@id='output']");

    await page.goto(baseUrl + "/text-box");

    await userNameInput.fill("Andrew");
    await userEmailInput.fill("andrewtest@gmail.com");
    await currentAddressInput.fill("Paradise City");
    await permanentAddressInput.fill("Unvgvar, Ukraine");

    await submitButton.click();
    await expect(outputSection).toBeVisible();
  }
);

test(
  "VAR-0013 All checkboxes can be selected",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Checkboxes functionality",
    },
  },

  async ({ page }) => {
    const expandAllCheckboxes = page.locator("//button[@title='Expand all']");
    const checkAllCheckboxes = page.locator(
      "//span[text()='Home']/..//span[@class='rct-checkbox']"
    );
    const checkboxLabels = [
      "Home",
      "Desktop",
      "Notes",
      "Commands",
      "Documents",
      "WorkSpace",
      "React",
      "Angular",
      "Veu",
      "Office",
      "Public",
      "Private",
      "Classified",
      "General",
      "Downloads",
      "Word File.doc",
      "Excel File.doc",
    ].map((label) => page.getByLabel(label));

    await page.goto(baseUrl + "/checkbox");
    await expandAllCheckboxes.click();
    await checkAllCheckboxes.click();

     for (const checkbox of checkboxLabels) {
      await expect(checkbox).toBeChecked();
    }
  }
);

test(
  "VAR-0014 All radio buttons can be selected one by one",
  {
    tag: ["@regression"],
    annotation: {
      type: "description",
      description: "Radio Buttons functionality",
    },
  },

  async ({ page }) => {
    await page.goto(baseUrl + "/radio-button");
    const yesRadioLabel = page.locator("//label[@for='yesRadio']");
    const yesRadioInput = page.locator("//input[@id='yesRadio']");
    const yesChoosenRadio = page.locator(
      "//p[contains(text(), 'You have selected')]"
    );
    const impressiveRadioLabel = page.locator(
      "//label[@for='impressiveRadio']"
    );
    const impressiveRadioInput = page.locator("//input[@id='impressiveRadio']");
    const impressiveChoosenRadio = page.locator("//span[text()='Impressive']");
    const noRadio = page.locator("//input[@id='noRadio']");

    await yesRadioLabel.click();
    await expect(yesRadioInput).toBeChecked();
    await expect(yesChoosenRadio).toBeVisible();

    await impressiveRadioLabel.click();
    await expect(impressiveRadioInput).toBeChecked();
    await expect(impressiveChoosenRadio).toBeVisible();

    await expect(noRadio).toBeDisabled();
  }
);
